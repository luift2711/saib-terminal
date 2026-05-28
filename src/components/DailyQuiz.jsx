import React, { useState, useEffect, useRef } from 'react';
import { Target, CheckCircle, XCircle, RefreshCw, BarChart2, AlertTriangle, TrendingUp, TrendingDown, MinusCircle, Dices, PartyPopper, Dumbbell, Library, Trophy, Users, Radio, ShoppingCart, BookOpen, Zap, Landmark, DollarSign, Brain, Scale, FileText, Clock, Lightbulb, Lock, ArrowRight, Skull, Flame, Edit2, Compass, Star, Shield, Activity, Flag, Award, Crosshair, Hammer, Wind, Eye, Sun, Moon } from 'lucide-react';
import { createChart } from 'lightweight-charts';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// --- ENGINE SINH TÌNH HUỐNG NGẪU NHIÊN ---
const SYMBOLS = ['BTC', 'ETH', 'XAU', 'NVDA', 'VNINDEX'];
const TIMEFRAMES = ['5m', '15m', 'H1', 'H4'];
const SITUATIONS = ['BREAKOUT', 'PULLBACK', 'FALSE_BREAKOUT'];

const generateDynamicScenario = (lang) => {
  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  const tf = TIMEFRAMES[Math.floor(Math.random() * TIMEFRAMES.length)];
  const sit = SITUATIONS[Math.floor(Math.random() * SITUATIONS.length)];
  const isSupport = Math.random() > 0.5;

  return {
    symbol, tf, sit,
    task: lang === 'en' ? `FIND ${isSupport ? 'SUPPORT' : 'RESISTANCE'}` : `TÌM ${isSupport ? 'HỖ TRỢ (SUPPORT)' : 'KHÁNG CỰ (RESISTANCE)'}`,
    desc: lang === 'en' ? `Symbol: ${symbol} | TF: ${tf}. Scenario: ${sit}. Click to plant flag at optimal zone.` : `Mã: ${symbol} | Khung: ${tf}. Kịch bản: ${sit}. Click cắm cờ vào vùng Cản tối ưu.`,
    correctPrice: 1000 + Math.random() * 500,
    tolerance: 25,
    explanation: lang === 'en' ? `This price zone has been tested multiple times. Any Breakout or Fakeout here provides an ideal R:R ratio for entry.` : `Vùng giá này đã được test nhiều lần. Bất kỳ sự phá vỡ (Breakout) hay rút chân (Fakeout) nào tại đây cũng cho tỷ lệ R:R cực kỳ lý tưởng để vào lệnh.`
  };
};

const DailyQuiz = ({ lang = 'vi', user }) => {
  const UID = user?.uid || 'guest';
  const QUIZ_DATE_KEY = `SAIB_last_quiz_date_${UID}`;
  const STREAK_KEY = `SAIB_day_streak_${UID}`;
  const STREAK_DATE_KEY = `SAIB_last_streak_date_${UID}`;
  const TOTAL_QUESTIONS = 10;
  const todayStr = new Date().toISOString().split('T')[0];

  const [quizActive, setQuizActive] = useState(false);
  const [isLockedToday, setIsLockedToday] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(null);
  
  const [userPrice, setUserPrice] = useState(null);
  const [drillStatus, setDrillStatus] = useState('idle');

  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const userLineRef = useRef(null);
  const answerLineRef = useRef(null);

  // Dùng ref để giữ status không bị kẹt khi click
  const drillStatusRef = useRef('idle');
  useEffect(() => { drillStatusRef.current = drillStatus; }, [drillStatus]);

  // Kiểm tra khóa ngày khi mở tab
  // Thay đoạn useEffect cũ bằng đoạn này:
useEffect(() => {
  const checkStatus = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastQuizDate = localStorage.getItem(QUIZ_DATE_KEY);
    if (lastQuizDate === todayStr) {
      setIsLockedToday(true);
    } else {
      setIsLockedToday(false); // Tự mở khóa khi qua ngày mới
    }
  };
  
  checkStatus();
  // Lắng nghe sự kiện quay lại tab
  window.addEventListener('focus', checkStatus);
  return () => window.removeEventListener('focus', checkStatus);
}, [QUIZ_DATE_KEY]);

  const startQuiz = () => {
    if (isLockedToday) return;
    setScore(0);
    setQuestionIndex(1);
    setCurrentScenario(generateDynamicScenario(lang));
    setDrillStatus('idle');
    setUserPrice(null);
    setQuizActive(true);
  };

  const handleNext = () => {
    if (questionIndex >= TOTAL_QUESTIONS) {
      localStorage.setItem(QUIZ_DATE_KEY, todayStr);
      setIsLockedToday(true);
      setQuizActive(false);
      
      // Kích hoạt cộng điểm streak
      const currentStreak = Number(localStorage.getItem(STREAK_KEY) || 0);
      const newStreak = currentStreak + 1;
      localStorage.setItem(STREAK_KEY, newStreak);
      localStorage.setItem(STREAK_DATE_KEY, todayStr);

      // [C16] Sync streak lên Firestore
      if (user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        updateDoc(userRef, {
          quizStreak: newStreak,
          lastQuizDate: todayStr
        }).catch(console.error);
      }
      return;
    }
    
    // Dọn cờ cũ
    if (seriesRef.current) {
        if (userLineRef.current) seriesRef.current.removePriceLine(userLineRef.current);
        if (answerLineRef.current) seriesRef.current.removePriceLine(answerLineRef.current);
    }

    setQuestionIndex(prev => prev + 1);
    setCurrentScenario(generateDynamicScenario(lang));
    setUserPrice(null);
    setDrillStatus('idle');
  };

  const checkAnswer = () => {
    if (!userPrice || !seriesRef.current) return alert(lang === 'en' ? "Boss, you need to plant a flag on the chart first!" : "Sếp phải cắm cờ vào biểu đồ đã!");
    
    const isCorrect = Math.abs(userPrice - currentScenario.correctPrice) <= currentScenario.tolerance;
    setDrillStatus(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(prev => prev + 1);

    // Vẽ đáp án chuẩn màu Xanh
    if (answerLineRef.current) seriesRef.current.removePriceLine(answerLineRef.current);
    answerLineRef.current = seriesRef.current.createPriceLine({
      price: currentScenario.correctPrice, 
      color: '#0ECB81', lineWidth: 2, lineStyle: 0, title: lang === 'en' ? 'CORRECT ANSWER' : 'ĐÁP ÁN CHUẨN'
    });

    // Đổi màu đường của người dùng (Đúng = Xanh, Sai = Đỏ)
    if (userLineRef.current) {
      userLineRef.current.applyOptions({ 
          color: isCorrect ? '#0ECB81' : '#F6465D',
          title: isCorrect ? (lang === 'en' ? 'YOURS (CORRECT)' : 'BẠN CHỌN (ĐÚNG)') : (lang === 'en' ? 'YOURS (WRONG)' : 'BẠN CHỌN (SAI)')
      });
    }
  };

  // --- VẼ BIỂU ĐỒ (ĐÃ FIX LỖI CRASH) ---
  useEffect(() => {
    if (!quizActive || !currentScenario || !containerRef.current) return;
    
    if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
    }
    userLineRef.current = null;
    answerLineRef.current = null;

    // Đợi 50ms để DOM render xong kích thước div mới vẽ chart (Chống lỗi defaultOnUncaughtError)
    const timeoutId = setTimeout(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
          layout: { background: { type: 'solid', color: '#0B0E11' }, textColor: '#848E9C' },
          width: containerRef.current.clientWidth, height: 280,
          grid: { vertLines: { color: '#1F2226' }, horzLines: { color: '#1F2226' } },
          timeScale: { borderColor: '#2B3139' },
          handleScroll: false, handleScale: false
        });
        
        const series = chart.addCandlestickSeries({ 
            upColor: '#0ECB81', downColor: '#F6465D', borderVisible: false,
            wickUpColor: '#0ECB81', wickDownColor: '#F6465D'
        });
        seriesRef.current = series;

        const mockData = [];
        let base = currentScenario.correctPrice;
        for(let i=1; i<=30; i++) {
          const open = base; const close = base + (Math.random()*40 - 20);
          mockData.push({ 
              time: `2024-01-${String(i).padStart(2,'0')}`, // Fix lỗi ngày tháng
              open, high: Math.max(open,close)+10, low: Math.min(open,close)-10, close 
          });
          base = close;
        }
        series.setData(mockData);
        chart.timeScale().fitContent();

        chart.subscribeClick((p) => {
          if (drillStatusRef.current !== 'idle' || !p.point) return;
          const price = series.coordinateToPrice(p.point.y);
          setUserPrice(price);
          
          if (userLineRef.current) series.removePriceLine(userLineRef.current);
          userLineRef.current = series.createPriceLine({ 
              price: price, color: '#FCD535', lineWidth: 2, lineStyle: 2, title: lang === 'en' ? 'YOUR CHOICE' : 'BẠN CHỌN' 
          });
        });

        chartRef.current = chart;
    }, 50);

    return () => { 
        clearTimeout(timeoutId);
        if (chartRef.current) { chartRef.current.remove(); chartRef.current = null; } 
    };
  }, [quizActive, currentScenario]);

  const dict = {
    vi: {
      missionComplete: "Nhiệm vụ hoàn tất",
      missionDesc: "Sếp đã rèn luyện xong 10 tình huống của ngày hôm nay. Kỷ luật là sức mạnh, hãy quay lại vào ngày mai để duy trì Chuỗi Streak!",
      title: "Huấn Luyện Nhãn Quan Hàng Ngày",
      subtitle: "Mỗi ngày 10 tình huống ngẫu nhiên. Trả lời sai hệ thống sẽ vạch rõ đường đáp án.",
      startBtn: "BẮT ĐẦU THỬ THÁCH",
      progress: "Tiến độ",
      clickChart: "Click lên biểu đồ để vẽ đường cản",
      waiting: "Đang chờ...",
      flagged: "Đã cắm cờ: $",
      gradeBtn: "Chấm Điểm",
      viewResultBtn: "Xem Kết Quả",
      nextQBtn: "Câu Tiếp Theo",
      correctTitle: "CHÍNH XÁC TỐI ĐA!",
      wrongTitle: "BẠN ĐÃ CHỌN SAI!"
    },
    en: {
      missionComplete: "Mission Accomplished",
      missionDesc: "You have completed 10 scenarios for today. Discipline is power, come back tomorrow to maintain your Streak!",
      title: "Daily Vision Training",
      subtitle: "10 random scenarios daily. Wrong answers will reveal the correct lines.",
      startBtn: "START CHALLENGE",
      progress: "Progress",
      clickChart: "Click on the chart to draw the line",
      waiting: "Waiting...",
      flagged: "Flagged: $",
      gradeBtn: "Grade Answer",
      viewResultBtn: "View Results",
      nextQBtn: "Next Question",
      correctTitle: "PERFECTLY CORRECT!",
      wrongTitle: "YOU CHOSE WRONG!"
    }
  };
  const t = dict[lang];

  // Màn hình đã khóa
  if (isLockedToday && !quizActive) {
    return (
      <div className="max-w-xl mx-auto p-12 bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-3xl text-center backdrop-blur-xl shadow-2xl mt-10">
        <div className="text-6xl mb-6"><Lock size={16} className="inline mr-1"/></div>
        <h3 className="text-xl font-black text-[#0f1117] dark:text-white uppercase tracking-widest mb-3">{t.missionComplete}</h3>
        <p className="text-sm text-[#636878] dark:text-[#848E9C] mb-4">{t.missionDesc}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-3xl p-6 max-w-3xl mx-auto backdrop-blur-xl shadow-2xl mt-6">
      {!quizActive ? (
        <div className="text-center p-10">
          <div className="w-20 h-20 rounded-full border-2 border-[#d97706] dark:border-[#00d084] border-dashed flex items-center justify-center mx-auto mb-6"><Target size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /></div>
          <h2 className="text-2xl font-black text-[#0f1117] dark:text-white tracking-widest uppercase mb-4">{t.title}</h2>
          <p className="text-sm text-[#636878] dark:text-[#848E9C] mb-8">{t.subtitle}</p>
          <button onClick={startQuiz} className="bg-[#d97706] dark:bg-[#00d084] text-white dark:text-black font-mono font-black px-10 py-4 rounded-xl hover:scale-105 transition-all shadow-[0_0_15px_rgba(180,83,9,0.4)] dark:shadow-[0_0_15px_rgba(0,208,132,0.4)]">{t.startBtn}</button>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] pb-3">
            <div>
              <span className={`text-[10px] uppercase font-black tracking-widest ${currentScenario.task.includes('HỖ TRỢ') || currentScenario.task.includes('SUPPORT') ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>{currentScenario.task}</span>
              <p className="text-xs text-[#0f1117] dark:text-[#EAECEF] mt-1">{currentScenario.desc}</p>
            </div>
            <div className="text-right">
                <span className="text-[#636878] dark:text-[#848E9C] text-[10px] uppercase font-bold tracking-widest">{t.progress}</span>
                <p className="text-lg font-mono font-bold text-[#d97706] dark:text-[#00d084]">{questionIndex} / {TOTAL_QUESTIONS}</p>
            </div>
          </div>
          
          {/* Biểu đồ */}
          <div className="h-[280px] bg-[#faf9f6] dark:bg-[#0B0E11] rounded-xl overflow-hidden relative" ref={containerRef}>
              {drillStatus === 'idle' && !userPrice && (
                  <div className="absolute top-2 left-2 z-10 text-[10px] bg-[#2B3139]/90 text-[#0f1117] dark:text-white px-2 py-1 rounded">{t.clickChart}</div>
              )}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className={`text-xs font-bold ${userPrice ? 'text-[#d97706] dark:text-[#00d084]' : 'text-[#636878] dark:text-[#848E9C]'}`}>{userPrice ? `${t.flagged}${userPrice.toFixed(0)}` : t.waiting}</span>
            
            {drillStatus === 'idle' ? (
              <button onClick={checkAnswer} className="bg-[rgba(15,17,23,0.05)] dark:bg-[rgba(255,255,255,0.05)] hover:bg-[#d97706] dark:bg-[#00d084] text-[#0f1117] dark:text-white hover:text-white dark:text-black text-[11px] uppercase tracking-wider font-bold px-8 py-3 rounded-xl transition-all border border-white/10 hover:border-[#d97706] dark:border-[#00d084]">{t.gradeBtn}</button>
            ) : (
              <button onClick={handleNext} className="bg-[#0ECB81] hover:brightness-110 text-white dark:text-black text-[11px] uppercase tracking-wider font-bold px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(14,203,129,0.3)] transition-all">
                  {questionIndex === TOTAL_QUESTIONS ? <>{t.viewResultBtn} <ArrowRight size={16} className="inline mr-1"/></> : <>{t.nextQBtn} <ArrowRight size={16} className="inline mr-1"/></>}
              </button>
            )}
          </div>

          {drillStatus !== 'idle' && (
            <div className={`p-4 rounded-xl border border-l-4 text-xs mt-4 animate-in slide-in-from-top-2 ${drillStatus === 'correct' ? 'bg-[#0ECB81]/10 border-[#0ECB81]/30 border-l-[#0ECB81]' : 'bg-[#F6465D]/10 border-[#F6465D]/30 border-l-[#F6465D]'}`}>
              <span className={`font-black uppercase block mb-2 ${drillStatus === 'correct' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                  {drillStatus === 'correct' ? <><CheckCircle size={18} className="inline mr-2"/> {t.correctTitle}</> : <><XCircle size={18} className="inline mr-2"/> {t.wrongTitle}</>}
              </span>
              <p className="text-[#0f1117] dark:text-[#EAECEF] leading-relaxed">{currentScenario.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;