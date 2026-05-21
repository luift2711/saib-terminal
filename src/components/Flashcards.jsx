import React, { useState, useEffect } from 'react';
import { Database, Lock, CheckCircle } from 'lucide-react';

const LESSON_FILE_MAP = {
  "0-0": "FlashCards_Chapter1/ThiTruongLaGi.md",
  "0-1": "FlashCards_Chapter1/CacLoaiThiTruongTaiChinh.md",
  "0-2": "FlashCards_Chapter1/AiDangThamGiaThiTruong.md",
  "0-3": "FlashCards_Chapter1/ThuatNguCotLoi.md",
  "0-4": "FlashCards_Chapter1/DonBayVaMargin.md",
  "0-5": "FlashCards_Chapter1/DocNenNhat.md",
  "0-6": "FlashCards_Chapter1/KhungThoiGian.md",

  "1-0": "FlashCards_Chapter2/XuHuongVaCauTruc.md",
  "1-1": "FlashCards_Chapter2/HoTroVaKhangCu.md",
  "1-2": "FlashCards_Chapter2/Volume.md",
  "1-3": "FlashCards_Chapter2/EmaVaWma.md",
  "1-4": "FlashCards_Chapter2/RsiChuyenSau.md",
  "1-5": "FlashCards_Chapter2/Macd.md",
  "1-6": "FlashCards_Chapter2/DcaStrategy.md",

  "2-0": "FlashCards_Chapter3/NenThanNgan.md",
  "2-1": "FlashCards_Chapter3/NenOm.md",
  "2-2": "FlashCards_Chapter3/Ema21.md",
  "2-3": "FlashCards_Chapter3/Fibonacci.md",
  "2-4": "FlashCards_Chapter3/Engulfing.md",
  "2-5": "FlashCards_Chapter3/HammerAndShootingStar.md",
  "2-6": "FlashCards_Chapter3/DojiVaBienThe.md",
  "2-7": "FlashCards_Chapter3/MorningAndEveningStar.md",
  "2-8": "FlashCards_Chapter3/HaramiAndThreeSoldiers.md",

  "3-0": "FlashCards_Chapter4/TaiSaoQuanLyVonLaSo1.md",
  "3-1": "FlashCards_Chapter4/QuyTac1Den2PhanTramVaPositionSizing.md",
  "3-2": "FlashCards_Chapter4/RiskRewardThucChien.md",
  "3-3": "FlashCards_Chapter4/KhiNaoTangRisk.md",
  "3-4": "FlashCards_Chapter4/FixedFractionalVaKelly.md",
  "3-5": "FlashCards_Chapter4/PyramidingVaScaling.md",
  "3-6": "FlashCards_Chapter4/DrawdownManagement.md",
  "3-7": "FlashCards_Chapter4/ForexGoldCryptoStocks.md",
  "3-8": "FlashCards_Chapter4/KhauViRuiRoVaRiskProfile.md",

  "4-0": "FlashCards_Chapter5/KhoaHocThanKinh.md",
  "4-1": "FlashCards_Chapter5/Quy1_Fomo.md",
  "4-2": "FlashCards_Chapter5/Quy2_RevengeTrading.md",
  "4-3": "FlashCards_Chapter5/Quy3_Overconfidence.md",
  "4-4": "FlashCards_Chapter5/Quy4_LossAversion.md",
  "4-5": "FlashCards_Chapter5/Quy5_ConfirmationBias.md",
  "4-6": "FlashCards_Chapter5/Quy6_Herding.md",
  "4-7": "FlashCards_Chapter5/Quy7_Overtrading.md",
  "4-8": "FlashCards_Chapter5/TradingJournal.md",
};

// Use import.meta.glob to eagerly load all markdown files as raw strings
const markdownFiles = import.meta.glob('/src/components/FlashCardsData/**/*.md', { eager: true, query: '?raw', import: 'default' });

function parseMarkdownFlashcards(markdownString) {
  const cards = [];
  const qMatches = markdownString.matchAll(/Q:\s*(.*?)\n+A:\s*([\s\S]*?)(?=\n+Q:|\n+#|$)/g);
  for (const match of qMatches) {
    cards.push({ front: match[1].trim(), back: match[2].trim() });
  }
  return cards;
}

// Shuffle array randomly
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const Flashcards = ({ lang = 'vi' }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [totalUnlocked, setTotalUnlocked] = useState(0);

  const dict = {
    vi: {
      noCards: "Chưa có Flashcards nào được mở khóa",
      noCardsDesc: "Hãy quay lại phần HỌC VIỆN (Academy) và đánh dấu hoàn thành các bài học (Mark Module Completed) để mở khóa thẻ ghi nhớ tại đây.",
      system: "Hệ thống thẻ phản xạ 3D",
      unlocked: "Đã mở khóa",
      modules: "học phần",
      clickToFlip: "Click để lật",
      prev: "← Trôi Lại",
      next: "Tiếp →"
    },
    en: {
      noCards: "No Flashcards Unlocked Yet",
      noCardsDesc: "Please go back to the Academy and mark modules as completed to unlock flashcards here.",
      system: "3D Reflex Card System",
      unlocked: "Unlocked",
      modules: "modules",
      clickToFlip: "Click to flip",
      prev: "← Previous",
      next: "Next →"
    }
  };
  const t = dict[lang];

  useEffect(() => {
    // 1. Read completed lessons from localStorage
    const saved = localStorage.getItem('SAIB_academy_progress');
    const completedSet = saved ? new Set(JSON.parse(saved)) : new Set();

    // 2. Find which files are unlocked
    let unlockedCards = [];
    let unlockedModuleCount = 0;

    completedSet.forEach(lessonId => {
      const relativePath = LESSON_FILE_MAP[lessonId];
      if (relativePath) {
        unlockedModuleCount++;
        // Find the matching file in markdownFiles
        const fullPathMatch = Object.keys(markdownFiles).find(key => key.endsWith(relativePath));

        if (fullPathMatch) {
          const rawContent = markdownFiles[fullPathMatch];
          const cardsFromModule = parseMarkdownFlashcards(rawContent);
          unlockedCards = [...unlockedCards, ...cardsFromModule];
        }
      }
    });

    setTotalUnlocked(unlockedModuleCount);

    // 3. Select up to 15 cards randomly, with Daily Cache
    if (unlockedCards.length > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const cachedDate = localStorage.getItem('SAIB_flashcards_date');
      const cachedProgress = localStorage.getItem('SAIB_flashcards_progress');
      
      // Nếu cùng ngày và số lượng bài học đã mở khóa không đổi, thì dùng lại bộ 15 thẻ cũ
      if (cachedDate === todayStr && cachedProgress === String(unlockedModuleCount)) {
        const cachedCards = JSON.parse(localStorage.getItem('SAIB_flashcards_cache') || '[]');
        if (cachedCards.length > 0) {
          setFlashcards(cachedCards);
          setCardIndex(0);
          setIsFlipped(false);
          return;
        }
      }

      // Nếu qua ngày mới (hoặc vừa học xong bài mới), xáo trộn và bốc 15 thẻ mới
      const shuffled = shuffleArray(unlockedCards);
      const selectedCards = shuffled.slice(0, 15);
      
      localStorage.setItem('SAIB_flashcards_date', todayStr);
      localStorage.setItem('SAIB_flashcards_progress', String(unlockedModuleCount));
      localStorage.setItem('SAIB_flashcards_cache', JSON.stringify(selectedCards));
      
      setFlashcards(selectedCards);
    } else {
      setFlashcards([]);
    }

    setCardIndex(0);
    setIsFlipped(false);
  }, []);

  const handleNext = () => {
    if (flashcards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => setCardIndex(prev => prev < flashcards.length - 1 ? prev + 1 : 0), 150);
  };
  const handlePrev = () => {
    if (flashcards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => setCardIndex(prev => prev > 0 ? prev - 1 : flashcards.length - 1), 150);
  };

  if (flashcards.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-10 bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-3xl backdrop-blur-xl shadow-xl dark:shadow-none text-center transition-colors duration-500">
        <Lock className="w-16 h-16 mx-auto text-[#636878] dark:text-[#848E9C] mb-6 opacity-50" />
        <h3 className="text-xl font-bold text-[#0f1117] dark:text-[#e8eaf0] mb-4">{t.noCards}</h3>
        <p className="text-[#636878] dark:text-[#9ca3b0] leading-relaxed">
          {t.noCardsDesc}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-3xl backdrop-blur-xl shadow-xl dark:shadow-none text-center transition-colors duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.08)] pb-4 mb-6 gap-4">
        <h4 className="text-[10px] font-black text-[#636878] dark:text-[#9ca3b0] uppercase tracking-[0.2em] flex-1 text-left">
          <Database size={12} className="inline mr-2" /> {t.system}
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold px-3 py-1 bg-green-100 dark:bg-[#0ECB81]/10 text-green-700 dark:text-[#0ECB81] rounded-full uppercase flex items-center gap-1">
            <CheckCircle size={10} /> {t.unlocked} {totalUnlocked} {t.modules}
          </span>
        </div>
      </div>

      <div className="relative w-full h-64 cursor-pointer [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Mặt trước */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#faf9f6] dark:bg-[#0e1117] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.05)] hover:border-[#d97706]/50 dark:hover:border-[#00d084]/50 rounded-2xl flex flex-col items-center justify-center p-8 shadow-inner transition-colors duration-300">
            <p className="font-bold text-lg md:text-xl text-[#0f1117] dark:text-[#e8eaf0] leading-relaxed">{flashcards[cardIndex].front}</p>
            <span className="absolute bottom-4 text-[9px] text-[#636878] dark:text-[#9ca3b0] uppercase tracking-wider bg-[#0f1117]/5 dark:bg-[#e8eaf0]/5 px-3 py-1 rounded-full">{t.clickToFlip}</span>
          </div>
          {/* Mặt sau */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[rgba(180,83,9,0.08)] to-[#faf9f6] dark:from-[rgba(0,208,132,0.15)] dark:to-[#0e1117] border border-[#d97706]/30 dark:border-[#00d084]/30 rounded-2xl flex items-center justify-center p-8 shadow-xl transition-colors duration-300">
            <p className="font-bold text-base md:text-lg text-[#d97706] dark:text-[#00d084] leading-relaxed overflow-y-auto max-h-full custom-scrollbar pr-2">{flashcards[cardIndex].back}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 px-2">
        <button onClick={handlePrev} className="text-[#636878] dark:text-[#9ca3b0] hover:text-[#0f1117] dark:hover:text-white text-[11px] font-bold px-5 py-2.5 bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.05)] transition-colors">{t.prev}</button>
        <span className="text-[11px] font-mono font-bold text-[#636878] dark:text-[#9ca3b0] bg-[rgba(15,17,23,0.04)] dark:bg-[rgba(255,255,255,0.05)] px-4 py-1.5 rounded-full">
          {cardIndex + 1} / {flashcards.length}
        </span>
        <button onClick={handleNext} className="text-white dark:text-black text-[11px] font-bold px-6 py-2.5 bg-[#d97706] dark:bg-[#00d084] rounded-xl hover:brightness-110 shadow-md transition-all">{t.next}</button>
      </div>
    </div>
  );
};

export default Flashcards;