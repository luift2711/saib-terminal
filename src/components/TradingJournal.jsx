import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, Skull, Flame, Edit2, Compass, Star, Shield, Activity, Flag, Award, Crosshair, Hammer, Zap, Wind, Eye, Sun, Moon, Bot } from 'lucide-react';


const TradingJournal = ({ lang = 'vi' }) => {
  const [logs, setLogs] = useState([]);
  const [note, setNote] = useState('');
  const [streak, setStreak] = useState(0);
  
  const dict = {
    vi: {
      defaultCoach: 'Chào sếp. Tôi là SAIBot Cyborg Coach. Sếp hãy nhập nhật ký hoặc hỏi tôi về lỗi hệ thống tâm lý, tôi sẽ bóc tách và tinh chỉnh cho sếp ngay.',
      goodDiscipline: "Hệ thống ghi nhận lệnh chuẩn quy trình. Phát huy sếp nhé.",
      fomoWarn: "Cảnh báo: Sếp đang bị thị trường dẫn dắt tâm lý sợ lỡ cơ hội. Hạ 50% khối lượng ở lệnh sau!",
      revengeWarn: "Nguy hiểm: Dấu hiệu giao dịch trả thù (Revenge Trading). SAIBot đề xuất sếp đóng máy nghỉ ngơi 2 tiếng.",
      notFound: "SAIBot chưa tìm thấy mô hình tương đương trong giáo trình. Sếp hãy bám sát quy tắc quản lý vốn 1%.",
      holdLoss: "Gồng lỗ là sai lầm diệt vong. Tư duy cốt lõi của hệ thống NNN: Lỗ trung bình phải nhỏ hơn Lãi trung bình để giữ Kỳ vọng (Edge) luôn dương. Chạm SL bắt buộc cắt!",
      cureFomo: "Để trị FOMO: Sếp tuyệt đối không vào lệnh market khi nến đang bay. Chỉ đặt lệnh chờ LIMIT hoặc PENDING ORDER tại vùng hợp lưu (EMA21 + Fibonacci 62%). Không khớp thì bỏ!",
      dayStreak: "Day-Streak",
      winRate: "Win-Rate thực tế",
      profitFactor: "Profit Factor",
      netPnl: "Net PnL (Ước tính)",
      matrixTitle: "Ma trận phân tích khuyết tật tâm lý",
      fomoErr: "Lỗi vào lệnh FOMO",
      revengeErr: "Giao dịch trả thù (Revenge)",
      discipline: "Lệnh chuẩn kỷ luật hệ thống",
      orders: "lệnh",
      logTitle: "Luồng nhật ký giao dịch",
      noData: "Chưa có dữ liệu giao dịch được ghi nhận.",
      journalTitle: "Ghi Sổ Nhật Ký",
      placeholderLog: "Hôm nay vào mã gì? Cảm xúc ra sao sếp? (Ví dụ: Thấy giá chạy mạnh quá, fomo vào luôn...)",
      saveBtn: "Lưu Vào Ma Trận",
      placeholderCoach: "Hỏi Coach về 'Fomo', 'Gồng lỗ'...",
      askBtn: "HỎI",
      tagDiscipline: "KỶ LUẬT"
    },
    en: {
      defaultCoach: 'Hello boss. I am SAIBot Cyborg Coach. Enter your journal or ask me about psychological system errors, and I will dissect and refine them for you immediately.',
      goodDiscipline: "System records standard process order. Keep it up boss.",
      fomoWarn: "Warning: You are being led by the market's FOMO. Reduce volume by 50% on the next trade!",
      revengeWarn: "Danger: Signs of Revenge Trading. SAIBot suggests closing the machine and resting for 2 hours.",
      notFound: "SAIBot has not found a corresponding pattern in the syllabus. Stick to the 1% risk management rule.",
      holdLoss: "Holding losses is a fatal mistake. Core mindset of NNN system: Avg Loss must be smaller than Avg Win to keep Edge positive. Hit SL, must cut!",
      cureFomo: "To cure FOMO: Never enter market orders when the candle is flying. Only set LIMIT or PENDING ORDER at confluence zones (EMA21 + Fibonacci 62%). If not filled, let it go!",
      dayStreak: "Day-Streak",
      winRate: "Actual Win-Rate",
      profitFactor: "Profit Factor",
      netPnl: "Net PnL (Est.)",
      matrixTitle: "Psychological Defect Analysis Matrix",
      fomoErr: "FOMO Entry Error",
      revengeErr: "Revenge Trading",
      discipline: "Standard Disciplined Order",
      orders: "orders",
      logTitle: "Trading Log Stream",
      noData: "No trading data recorded yet.",
      journalTitle: "Journal Entry",
      placeholderLog: "What did you trade today? How was your emotion? (e.g., Price moved too fast, fomo'd in...)",
      saveBtn: "Save to Matrix",
      placeholderCoach: "Ask Coach about 'Fomo', 'Holding loss'...",
      askBtn: "ASK",
      tagDiscipline: "DISCIPLINE"
    }
  };
  const t = dict[lang];

  // State của Huấn luyện viên AI được xử lý bởi FloatingCoach
  const triggerSAIBotAnalysis = () => {
    const prompt = lang === 'vi' 
      ? `SAIBot, hãy phân tích nhật ký giao dịch của tôi. Tổng số lệnh: ${logs.length}, Tỉ lệ thắng: ${logs.length > 0 ? ((logs.filter(l => l.pnl > 0).length / logs.length) * 100).toFixed(1) : 0}%. Tôi mắc ${logs.filter(l => l.tag === 'FOMO').length} lỗi FOMO và ${logs.filter(l => l.tag === 'REVENGE').length} lỗi Revenge trading. Chẩn đoán cho tôi đi!`
      : `SAIBot, analyze my trading journal. Total trades: ${logs.length}, WinRate: ${logs.length > 0 ? ((logs.filter(l => l.pnl > 0).length / logs.length) * 100).toFixed(1) : 0}%. I made ${logs.filter(l => l.tag === 'FOMO').length} FOMO errors and ${logs.filter(l => l.tag === 'REVENGE').length} Revenge errors. Diagnose me!`;
      
    window.dispatchEvent(new CustomEvent('saibot-trigger', {
      detail: { prompt }
    }));
  };

  useEffect(() => {
    // Tải dữ liệu từ LocalStorage ổ cứng
    const savedLogs = JSON.parse(localStorage.getItem('SAIB_trading_logs') || '[]');
    setLogs(savedLogs);
    
    // Đồng bộ Day-streak
    const savedStreak = Number(localStorage.getItem('SAIB_day_streak') || 0);
    const lastStreakDate = localStorage.getItem('SAIB_last_streak_date');
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Nếu quá 2 ngày không luyện tập -> Reset streak về 0
    if (lastStreakDate) {
      const diffTime = Math.abs(new Date(todayStr) - new Date(lastStreakDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        localStorage.setItem('SAIB_day_streak', 0);
        setStreak(0);
      } else {
        setStreak(savedStreak);
      }
    } else {
      setStreak(savedStreak);
    }
  }, []);

  // Tính toán chỉ số tài chính chuyên sâu (Data Analytics Expert)
  const totalTrades = logs.length;
  const winTrades = logs.filter(l => l.pnl > 0).length;
  const winRate = totalTrades > 0 ? ((winTrades / totalTrades) * 100).toFixed(1) : 0;
  const grossProfit = logs.filter(l => l.pnl > 0).reduce((sum, l) => sum + l.pnl, 0);
  const grossLoss = Math.abs(logs.filter(l => l.pnl < 0).reduce((sum, l) => sum + l.pnl, 0));
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? grossProfit.toFixed(2) : 0;
  const netPnL = grossProfit - grossLoss;

  // Đếm lỗi hệ thống tâm lý
  const fomoCount = logs.filter(l => l.tag === 'FOMO').length;
  const revengeCount = logs.filter(l => l.tag === 'REVENGE').length;
  const disciplineCount = logs.filter(l => l.tag === 'KỶ LUẬT').length;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    
    // Giả lập SAIBot tự động quét từ khóa phân tích tâm lý sếp vừa gõ
    let inferredTag = t.tagDiscipline;
    let coachDiagnosis = t.goodDiscipline;
    
    if (note.toLowerCase().includes('fomo') || note.toLowerCase().includes('đu đuổi')) {
      inferredTag = 'FOMO';
      coachDiagnosis = t.fomoWarn;
    } else if (note.toLowerCase().includes('cay') || note.toLowerCase().includes('gỡ') || note.toLowerCase().includes('revenge')) {
      inferredTag = 'REVENGE';
      coachDiagnosis = t.revengeWarn;
    }

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      note: note,
      tag: inferredTag,
      pnl: inferredTag === 'FOMO' ? -100 : inferredTag === 'REVENGE' ? -200 : 150, // Giả lập PNL
      diagnosis: coachDiagnosis
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('SAIB_trading_logs', JSON.stringify(updatedLogs));
    setNote('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto text-[#0f1117] dark:text-[#EAECEF] animate-in fade-in duration-500">
      
      {/* 1. KHU VỰC DASHBOARD BIỂU ĐỒ CHUYÊN GIA */}
      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider block mb-1">{t.dayStreak}</span>
             <div className="text-2xl font-black text-[#d97706] dark:text-[#00d084] flex items-center gap-1"><Flame size={16} className="inline mr-1 text-orange-500"/> {streak}</div>
          </div>
          <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider block mb-1">{t.winRate}</span>
             <div className="text-2xl font-black text-[#0ECB81] font-mono">{winRate}%</div>
          </div>
          <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider block mb-1">{t.profitFactor}</span>
             <div className="text-2xl font-black text-[#378ADD] font-mono">{profitFactor}</div>
          </div>
          <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider block mb-1">{t.netPnl}</span>
             <div className={`text-2xl font-black font-mono ${netPnL >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
               {netPnL >= 0 ? '+' : ''}${netPnL}
             </div>
          </div>
        </div>

        {/* Biểu đồ phân tích lỗi dạng thanh trực quan */}
        <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] p-6 rounded-3xl backdrop-blur-xl">
           <h3 className="text-xs font-black text-[#0f1117] dark:text-white uppercase tracking-widest mb-6 border-b border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] pb-2">{t.matrixTitle}</h3>
           <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1"><span>{t.fomoErr}</span><span className="text-[#d97706] dark:text-[#00d084]">{fomoCount} {t.orders}</span></div>
                <div className="w-full bg-[rgba(15,17,23,0.02)] dark:bg-[rgba(255,255,255,0.02)] h-2 rounded-full overflow-hidden"><div className="bg-[#d97706] dark:bg-[#00d084] h-full transition-all" style={{width: `${totalTrades > 0 ? (fomoCount/totalTrades)*100 : 0}%`}}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>{t.revengeErr}</span><span className="text-[#F6465D]">{revengeCount} {t.orders}</span></div>
                <div className="w-full bg-[rgba(15,17,23,0.02)] dark:bg-[rgba(255,255,255,0.02)] h-2 rounded-full overflow-hidden"><div className="bg-[#F6465D] h-full transition-all" style={{width: `${totalTrades > 0 ? (revengeCount/totalTrades)*100 : 0}%`}}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>{t.discipline}</span><span className="text-[#0ECB81]">{disciplineCount} {t.orders}</span></div>
                <div className="w-full bg-[rgba(15,17,23,0.02)] dark:bg-[rgba(255,255,255,0.02)] h-2 rounded-full overflow-hidden"><div className="bg-[#0ECB81] h-full transition-all" style={{width: `${totalTrades > 0 ? (disciplineCount/totalTrades)*100 : 0}%`}}></div></div>
              </div>
           </div>
        </div>

        {/* Biểu đồ Luồng dữ liệu nhật ký */}
        <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] p-6 rounded-3xl backdrop-blur-xl space-y-3">
          <h3 className="text-xs font-black text-[#0f1117] dark:text-white uppercase tracking-widest border-b border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] pb-2">{t.logTitle}</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {logs.length === 0 ? (
              <p className="text-xs text-[#9ba0ad] dark:text-[#666] italic text-center py-6">{t.noData}</p>
            ) : (
              logs.map(l => (
                <div key={l.id} className="p-3 bg-[#faf9f6] dark:bg-[#0B0E11] rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[#9ba0ad] dark:text-[#666]">{l.date}</span>
                    <p className="text-xs text-[#0f1117] dark:text-white mt-1">{l.note}</p>
                    <p className="text-[10px] text-[#636878] dark:text-[#848E9C] italic mt-1 font-mono">// SAIBot Note: {l.diagnosis}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase text-[10px] ${l.tag === 'FOMO' ? 'bg-[#d97706] dark:bg-[#00d084]/10 text-[#d97706] dark:text-[#00d084]' : l.tag === 'REVENGE' ? 'bg-[#F6465D]/10 text-[#F6465D]' : 'bg-[#0ECB81]/10 text-[#0ECB81]'}`}>
                    {l.tag}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 2. KHU VỰC TRỢ LÝ COACH ĐA NHIỆM */}
      <div className="lg:col-span-4 space-y-6">
        {/* Khung nhập Note nhanh */}
        <div className="bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] p-5 rounded-3xl backdrop-blur-xl">
          <h3 className="text-xs font-black text-[#0f1117] dark:text-white uppercase tracking-widest mb-4">{t.journalTitle}</h3>
          <form onSubmit={handleAddNote} className="space-y-3">
            <textarea 
              value={note} onChange={e => setNote(e.target.value)}
              placeholder={t.placeholderLog} 
              className="w-full bg-[#faf9f6] dark:bg-[#0B0E11] border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-xs text-[#0f1117] dark:text-white h-24 focus:outline-none focus:border-[#d97706] dark:border-[#00d084]"
            />
            <button type="submit" className="w-full bg-[rgba(15,17,23,0.05)] dark:bg-[rgba(255,255,255,0.05)] active:bg- md:hover:bg-[#d97706] dark:bg-[#00d084] active:text- md:hover:text-white dark:text-black py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider">{t.saveBtn}</button>
          </form>
        </div>

        {/* Giao diện Cyborg Coach (Nút gọi SAIBot) */}
        <div className="bg-[#fff]/80 dark:bg-gradient-to-br dark:from-[#0B0E11] dark:to-[#181A20] border border-[#D4AF37]/50 dark:border-[#00d084]/30 p-6 rounded-3xl shadow-[0_4px_20px_rgba(212,175,55,0.15)] dark:shadow-lg flex flex-col justify-center items-center text-center space-y-4 backdrop-blur-xl">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] dark:from-[#00d084] dark:to-[#0ECB81] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] dark:shadow-[0_0_20px_rgba(0,208,132,0.4)] mb-2 relative">
              <Bot size={32} className="text-white dark:text-[#0B0E11]" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ECB81] dark:bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0ECB81] dark:bg-white border-2 border-white dark:border-[#0B0E11]"></span>
              </span>
           </div>
           
           <div>
             <h3 className="text-sm font-black text-[#1C2C44] dark:text-[#EAECEF] uppercase tracking-widest mb-2">
               {lang === 'vi' ? 'Báo Cáo Phân Tích Tâm Lý' : 'Psychological Analysis Report'}
             </h3>
             <p className="text-xs text-[#1C2C44]/80 dark:text-[#EAECEF]/70 leading-relaxed max-w-[250px] mx-auto">
               {lang === 'vi' 
                 ? 'SAIBot sẽ tổng hợp nhật ký, đánh giá tỷ lệ Win-Rate, và bóc tách các sai lầm tâm lý sếp đang gặp phải.' 
                 : 'SAIBot will summarize your journal, evaluate your Win-Rate, and dissect the psychological mistakes you are making.'}
             </p>
           </div>

           <button 
             onClick={triggerSAIBotAnalysis}
             className="mt-4 w-full bg-white dark:bg-gradient-to-r dark:from-[#00d084] dark:to-[#0ECB81] text-[#D4AF37] dark:text-[#0B0E11] border border-[#D4AF37]/50 dark:border-transparent active:bg- md:hover:bg-yellow-50 active:shadow- md:hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] dark:active:shadow- md:hover:shadow-none dark:hover:opacity-90 py-3 rounded-xl text-xs font-black transition-all duration-500 uppercase tracking-widest flex items-center justify-center gap-2"
           >
              <Activity size={16} />
              {lang === 'vi' ? 'Gọi SAIBot Chẩn Đoán' : 'Summon SAIBot For Diagnosis'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default TradingJournal;