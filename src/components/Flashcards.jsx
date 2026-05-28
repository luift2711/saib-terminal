import React, { useState, useEffect } from 'react';
import { Database, Lock, CheckCircle } from 'lucide-react';

const LESSON_FILE_MAP_VN = {
  "0-0": "FlashCards_Chapter1_VN/ThiTruongLaGi.md",
  "0-1": "FlashCards_Chapter1_VN/CacLoaiThiTruongTaiChinh.md",
  "0-2": "FlashCards_Chapter1_VN/AiDangThamGiaThiTruong.md",
  "0-3": "FlashCards_Chapter1_VN/ThuatNguCotLoi.md",
  "0-4": "FlashCards_Chapter1_VN/DonBayVaMargin.md",
  "0-5": "FlashCards_Chapter1_VN/DocNenNhat.md",
  "0-6": "FlashCards_Chapter1_VN/KhungThoiGian.md",

  "1-0": "FlashCards_Chapter2_VN/XuHuongVaCauTruc.md",
  "1-1": "FlashCards_Chapter2_VN/HoTroVaKhangCu.md",
  "1-2": "FlashCards_Chapter2_VN/Volume.md",
  "1-3": "FlashCards_Chapter2_VN/EmaVaWma.md",
  "1-4": "FlashCards_Chapter2_VN/RsiChuyenSau.md",
  "1-5": "FlashCards_Chapter2_VN/Macd.md",
  "1-6": "FlashCards_Chapter2_VN/DcaStrategy.md",

  "2-0": "FlashCards_Chapter3_VN/NenThanNgan.md",
  "2-1": "FlashCards_Chapter3_VN/NenOm.md",
  "2-2": "FlashCards_Chapter3_VN/Ema21.md",
  "2-3": "FlashCards_Chapter3_VN/Fibonacci.md",
  "2-4": "FlashCards_Chapter3_VN/Engulfing.md",
  "2-5": "FlashCards_Chapter3_VN/HammerAndShootingStar.md",
  "2-6": "FlashCards_Chapter3_VN/DojiVaBienThe.md",
  "2-7": "FlashCards_Chapter3_VN/MorningAndEveningStar.md",
  "2-8": "FlashCards_Chapter3_VN/HaramiAndThreeSoldiers.md",

  "3-0": "FlashCards_Chapter4_VN/TaiSaoQuanLyVonLaSo1.md",
  "3-1": "FlashCards_Chapter4_VN/QuyTac1Den2PhanTramVaPositionSizing.md",
  "3-2": "FlashCards_Chapter4_VN/RiskRewardThucChien.md",
  "3-3": "FlashCards_Chapter4_VN/KhiNaoTangRisk.md",
  "3-4": "FlashCards_Chapter4_VN/FixedFractionalVaKelly.md",
  "3-5": "FlashCards_Chapter4_VN/PyramidingVaScaling.md",
  "3-6": "FlashCards_Chapter4_VN/DrawdownManagement.md",
  "3-7": "FlashCards_Chapter4_VN/ForexGoldCryptoStocks.md",
  "3-8": "FlashCards_Chapter4_VN/KhauViRuiRoVaRiskProfile.md",

  "4-0": "FlashCards_Chapter5_VN/KhoaHocThanKinh.md",
  "4-1": "FlashCards_Chapter5_VN/Quy1_Fomo.md",
  "4-2": "FlashCards_Chapter5_VN/Quy2_RevengeTrading.md",
  "4-3": "FlashCards_Chapter5_VN/Quy3_Overconfidence.md",
  "4-4": "FlashCards_Chapter5_VN/Quy4_LossAversion.md",
  "4-5": "FlashCards_Chapter5_VN/Quy5_ConfirmationBias.md",
  "4-6": "FlashCards_Chapter5_VN/Quy6_Herding.md",
  "4-7": "FlashCards_Chapter5_VN/Quy7_Overtrading.md",
  "4-8": "FlashCards_Chapter5_VN/TradingJournal.md",
};

const LESSON_FILE_MAP_EN = {
  "0-0": "FlashCards_Chapter1_EN/ThiTruongLaGi.md",
  "0-1": "FlashCards_Chapter1_EN/CacLoaiThiTruongTaiChinh.md",
  "0-2": "FlashCards_Chapter1_EN/AiDangThamGiaThiTruong.md",
  "0-3": "FlashCards_Chapter1_EN/ThuatNguCotLoi.md",
  "0-4": "FlashCards_Chapter1_EN/DonBayVaMargin.md",
  "0-5": "FlashCards_Chapter1_EN/DocNenNhat.md",
  "0-6": "FlashCards_Chapter1_EN/KhungThoiGian.md",

  "1-0": "FlashCards_Chapter2_EN/XuHuongVaCauTruc.md",
  "1-1": "FlashCards_Chapter2_EN/HoTroVaKhangCu.md",
  "1-2": "FlashCards_Chapter2_EN/Volume.md",
  "1-3": "FlashCards_Chapter2_EN/EmaVaWma.md",
  "1-4": "FlashCards_Chapter2_EN/RsiChuyenSau.md",
  "1-5": "FlashCards_Chapter2_EN/Macd.md",
  "1-6": "FlashCards_Chapter2_EN/DcaStrategy.md",

  "2-0": "FlashCards_Chapter3_EN/NenThanNgan.md",
  "2-1": "FlashCards_Chapter3_EN/NenOm.md",
  "2-2": "FlashCards_Chapter3_EN/Ema21.md",
  "2-3": "FlashCards_Chapter3_EN/Fibonacci.md",
  "2-4": "FlashCards_Chapter3_EN/Engulfing.md",
  "2-5": "FlashCards_Chapter3_EN/HammerAndShootingStar.md",
  "2-6": "FlashCards_Chapter3_EN/DojiVaBienThe.md",
  "2-7": "FlashCards_Chapter3_EN/MorningAndEveningStar.md",
  "2-8": "FlashCards_Chapter3_EN/HaramiAndThreeSoldiers.md",

  "3-0": "FlashCards_Chapter4_EN/TaiSaoQuanLyVonLaSo1.md",
  "3-1": "FlashCards_Chapter4_EN/QuyTac1Den2PhanTramVaPositionSizing.md",
  "3-2": "FlashCards_Chapter4_EN/RiskRewardThucChien.md",
  "3-3": "FlashCards_Chapter4_EN/KhiNaoTangRisk.md",
  "3-4": "FlashCards_Chapter4_EN/FixedFractionalVaKelly.md",
  "3-5": "FlashCards_Chapter4_EN/PyramidingVaScaling.md",
  "3-6": "FlashCards_Chapter4_EN/DrawdownManagement.md",
  "3-7": "FlashCards_Chapter4_EN/ForexGoldCryptoStocks.md",
  "3-8": "FlashCards_Chapter4_EN/KhauViRuiRoVaRiskProfile.md",

  "4-0": "FlashCards_Chapter5_EN/KhoaHocThanKinh.md",
  "4-1": "FlashCards_Chapter5_EN/Quy1_Fomo.md",
  "4-2": "FlashCards_Chapter5_EN/Quy2_RevengeTrading.md",
  "4-3": "FlashCards_Chapter5_EN/Quy3_Overconfidence.md",
  "4-4": "FlashCards_Chapter5_EN/Quy4_LossAversion.md",
  "4-5": "FlashCards_Chapter5_EN/Quy5_ConfirmationBias.md",
  "4-6": "FlashCards_Chapter5_EN/Quy6_Herding.md",
  "4-7": "FlashCards_Chapter5_EN/Quy7_Overtrading.md",
  "4-8": "FlashCards_Chapter5_EN/TradingJournal.md",
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

const Flashcards = ({ lang = 'vi', user }) => {
  const ACADEMY_KEY = `SAIB_academy_progress_${user?.uid || 'guest'}`;
  const DATE_KEY = `SAIB_flashcards_date_${user?.uid || 'guest'}`;
  const PROGRESS_KEY = `SAIB_flashcards_progress_${user?.uid || 'guest'}`;
  const INDICES_KEY = `SAIB_flashcards_indices_${user?.uid || 'guest'}`;

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
    const saved = localStorage.getItem(ACADEMY_KEY);
    const completedSet = saved ? new Set(JSON.parse(saved)) : new Set();

    // 2. Find which files are unlocked
    let unlockedCards = [];
    let unlockedModuleCount = 0;

    completedSet.forEach(lessonId => {
      const fileMap = lang === 'en' ? LESSON_FILE_MAP_EN : LESSON_FILE_MAP_VN;
      const relativePath = fileMap[lessonId];
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
      const cachedDate = localStorage.getItem(DATE_KEY);
      const cachedProgress = localStorage.getItem(PROGRESS_KEY);

      // Nếu cùng ngày và số lượng bài học đã mở khóa không đổi, load lại đúng các index thẻ đó
      if (cachedDate === todayStr && cachedProgress === String(unlockedModuleCount)) {
        const cachedIndices = JSON.parse(localStorage.getItem(INDICES_KEY) || '[]');
        if (cachedIndices.length > 0) {
          const loadedCards = cachedIndices.map(i => unlockedCards[i]).filter(Boolean);
          if (loadedCards.length > 0) {
            setFlashcards(loadedCards);
            // Cố tình KHÔNG reset cardIndex ở đây để khi đổi ngôn ngữ, vẫn ở nguyên thẻ hiện tại!
            return;
          }
        }
      }

      // Nếu qua ngày mới hoặc vừa học xong bài mới, xáo trộn array chứa index và bốc 15 thẻ mới
      const allIndices = unlockedCards.map((_, i) => i);
      const shuffledIndices = shuffleArray(allIndices);
      const selectedIndices = shuffledIndices.slice(0, 15);

      localStorage.setItem(DATE_KEY, todayStr);
      localStorage.setItem(PROGRESS_KEY, String(unlockedModuleCount));
      localStorage.setItem(INDICES_KEY, JSON.stringify(selectedIndices));

      const selectedCards = selectedIndices.map(i => unlockedCards[i]);
      setFlashcards(selectedCards);
    } else {
      setFlashcards([]);
    }

    // Chỉ reset về thẻ đầu tiên khi là ngày mới hoặc thêm bài mới
    setCardIndex(0);
    setIsFlipped(false);
  }, [lang]);

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
    <div className="max-w-xl mx-auto p-4 md:p-6 bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-3xl backdrop-blur-xl shadow-xl dark:shadow-none text-center transition-colors duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.08)] pb-4 mb-6 gap-4">
        <h4 className="text-[12.5px] font-black text-[#636878] dark:text-[#9ca3b0] uppercase tracking-[0.2em] w-full md:w-auto text-center md:text-left">
          <Database size={12} className="inline mr-2" /> {t.system}
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-[12.5px] font-bold px-3 py-1 bg-green-100 dark:bg-[#0ECB81]/10 text-green-700 dark:text-[#0ECB81] rounded-full uppercase flex items-center gap-1">
            <CheckCircle size={10} /> {t.unlocked} {totalUnlocked} {t.modules}
          </span>
        </div>
      </div>

      <div className="relative w-full h-[320px] md:h-64 cursor-pointer [perspective:1000px] active:scale-[0.98] transition-transform" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Mặt trước */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#faf9f6] dark:bg-[#0e1117] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.05)] rounded-2xl flex flex-col items-center justify-center p-6 md:p-8 shadow-inner transition-colors duration-300">
            <p className="font-bold text-lg md:text-xl text-[#0f1117] dark:text-[#e8eaf0] leading-relaxed">{flashcards[cardIndex].front}</p>
            <span className="absolute bottom-4 text-[11.5px] text-[#636878] dark:text-[#9ca3b0] uppercase tracking-wider bg-[#0f1117]/5 dark:bg-[#e8eaf0]/5 px-3 py-1 rounded-full">{t.clickToFlip}</span>
          </div>
          {/* Mặt sau */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[rgba(180,83,9,0.08)] to-[#faf9f6] dark:from-[rgba(0,208,132,0.15)] dark:to-[#0e1117] border border-[#d97706]/30 dark:border-[#00d084]/30 rounded-2xl flex items-center justify-center p-6 md:p-8 shadow-xl transition-colors duration-300">
            <p className="font-bold text-base md:text-lg text-[#d97706] dark:text-[#00d084] leading-relaxed overflow-y-auto max-h-full custom-scrollbar pr-2">{flashcards[cardIndex].back}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 px-1 md:px-2 gap-2">
        <button onClick={handlePrev} className="flex items-center justify-center min-h-[44px] min-w-[44px] text-[#636878] dark:text-[#9ca3b0] hover:text-[#0f1117] dark:hover:text-white text-[13.5px] font-bold px-4 md:px-5 py-2.5 bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.05)] transition-colors active:bg-[rgba(15,17,23,0.08)]">{t.prev}</button>
        <span className="text-[13.5px] font-mono font-bold text-[#636878] dark:text-[#9ca3b0] bg-[rgba(15,17,23,0.04)] dark:bg-[rgba(255,255,255,0.05)] px-4 py-1.5 rounded-full shrink-0">
          {cardIndex + 1} / {flashcards.length}
        </span>
        <button onClick={handleNext} className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white dark:text-black text-[13.5px] font-bold px-4 md:px-6 py-2.5 bg-[#d97706] dark:bg-[#00d084] rounded-xl active:scale-95 shadow-md transition-all">{t.next}</button>
      </div>
    </div>
  );
};

export default Flashcards;