import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Database, Check, ChevronLeft, Cpu, Bitcoin, DollarSign, Star } from 'lucide-react';
import CHAPTER_1_DATA from './academy_chapters/Chapter1_VN';
import CHAPTER_1_DATA_EN from './academy_chapters/Chapter1_EN';
import CHAPTER_2_DATA from './academy_chapters/Chapter2_VN';
import CHAPTER_2_DATA_EN from './academy_chapters/Chapter2_EN';
import CHAPTER_3_DATA from './academy_chapters/Chapter3_VN';
import CHAPTER_3_DATA_EN from './academy_chapters/Chapter3_EN';
import CHAPTER_4_DATA from './academy_chapters/Chapter4_VN';
import CHAPTER_4_DATA_EN from './academy_chapters/Chapter4_EN';
import CHAPTER_5_DATA from './academy_chapters/Chapter5_VN';
import CHAPTER_5_DATA_EN from './academy_chapters/Chapter5_EN';

const STORAGE_KEY = 'SAIB_academy_progress';

const getChapters = (lang) => [
  { title: lang === 'en' ? 'Chapter 1: Foundation' : 'Chương 1: Nền Tảng', data: lang === 'en' ? CHAPTER_1_DATA_EN : CHAPTER_1_DATA },
  { title: lang === 'en' ? 'Chapter 2: Technical Analysis' : 'Chương 2: Phân Tích Kỹ Thuật', data: lang === 'en' ? CHAPTER_2_DATA_EN : CHAPTER_2_DATA },
  { title: lang === 'en' ? 'Chapter 3: Price Action & Candles' : 'Chương 3: PP NNN & Nến', data: lang === 'en' ? CHAPTER_3_DATA_EN : CHAPTER_3_DATA },
  { title: lang === 'en' ? 'Chapter 4: Risk Management' : 'Chương 4: Quản lý vốn & rủi ro', data: lang === 'en' ? CHAPTER_4_DATA_EN : CHAPTER_4_DATA },
  { title: lang === 'en' ? 'Chapter 5: Trading Psychology' : 'Chương 5: Tâm lý giao dịch', data: lang === 'en' ? CHAPTER_5_DATA_EN : CHAPTER_5_DATA },
];

const readCompletedLessons = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
};

const Academy = ({ lang = 'vi' }) => {
  const [selectedId, setSelectedId] = useState('0-0');
  const [completedLessons, setCompletedLessons] = useState(readCompletedLessons);
  const mainScrollRef = useRef(null);

  // Scroll to top on lesson change — scroll the main content area
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [selectedId]);

  const chapters = getChapters(lang);

  const allLessons = useMemo(
    () =>
      chapters.flatMap((chapter, chapterIndex) =>
        chapter.data.map((lesson, lessonIndex) => ({
          ...lesson,
          id: `${chapterIndex}-${lessonIndex}`,
        }))
      ),
    [lang]
  );

  const selectedLesson =
    allLessons.find((lesson) => lesson.id === selectedId) || allLessons[0];

  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === selectedLesson.id
  );

  const progressPct = allLessons.length
    ? Math.round((completedLessons.size / allLessons.length) * 100)
    : 0;

  const toggleComplete = (id) => {
    setCompletedLessons((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
      return updated;
    });
  };

  const goToLesson = (nextIndex) => {
    const nextLesson = allLessons[nextIndex];
    if (nextLesson) setSelectedId(nextLesson.id);
  };

  const t = {
    vi: {
      systemSync: "SYSTEM SYNC",
      markCompleted: "ĐÁNH DẤU ĐÃ HỌC XONG",
      completed: "ĐÃ HỌC XONG",
      prev: "BÀI TRƯỚC",
      next: "BÀI TIẾP THEO"
    },
    en: {
      systemSync: "SYSTEM SYNC",
      markCompleted: "MARK MODULE COMPLETED",
      completed: "MODULE COMPLETED",
      prev: "PREVIOUS",
      next: "NEXT MODULE"
    }
  }[lang];

  return (
    // Root: fixed viewport height, no window scroll
    <div className="h-full overflow-hidden bg-[#faf9f6] dark:bg-[#0e1117] text-[#0f1117] dark:text-[#e8eaf0] font-sans selection:bg-[#d97706]/30 dark:selection:bg-[#00d084]/30 transition-colors duration-500">

      {/* Full-height flex layout: sidebar | main */}
      <div className="h-full flex relative z-10">

        {/* ── SIDEBAR ────────────────────────────────── */}
        <aside className="w-72 shrink-0 h-full flex flex-col border-r border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] bg-[#faf9f6]/80 dark:bg-[#0e1117]/80 backdrop-blur-sm">

          {/* System Sync / Progress */}
          <div className="p-5 border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-[#fff]/60 dark:bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-[#d97706]/40 dark:border-[rgba(255,255,255,0.1)] relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] dark:via-[#00d084] to-transparent"></div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] dark:text-[#00d084] flex items-center gap-2 font-black">
                  <Database size={12} /> {t.systemSync}
                </span>
                <span className="font-mono text-[#0f1117] dark:text-[#00d084] font-bold dark:font-medium text-sm">{progressPct}%</span>
              </div>
              <div className="h-1 rounded-full bg-[rgba(15,17,23,0.1)] dark:bg-[rgba(255,255,255,0.05)] overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C59B27] to-[#D4AF37] dark:from-[#00d084] dark:to-[#00d084] shadow-[0_0_12px_rgba(212,175,55,0.6)] dark:shadow-[0_0_10px_rgba(0,208,132,0.5)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Navigation — scrollable */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
            {chapters.map((chapter, chapterIndex) => (
              <motion.section
                key={chapterIndex}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: chapterIndex * 0.1 }}
              >
                <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#B8860B] dark:text-[#00d084] border-b border-[#D4AF37]/30 dark:border-[#00d084]/20 pb-2 mb-3 px-2 flex items-center gap-2 font-black">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] dark:bg-[#00d084] rounded-full shadow-[0_0_6px_rgba(212,175,55,0.8)] dark:shadow-[0_0_4px_rgba(0,208,132,0.5)]"></span>
                  {chapter.title}
                </h3>
                <div className="space-y-0.5">
                  {chapter.data.map((lesson, lessonIndex) => {
                    const id = `${chapterIndex}-${lessonIndex}`;
                    const active = selectedLesson.id === id;
                    const done = completedLessons.has(id);
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedId(id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${active
                          ? 'bg-gradient-to-r from-[#D4AF37]/15 to-transparent dark:bg-none dark:bg-[#00d084]/10 border border-[#D4AF37]/50 dark:border-[#00d084]/30 text-[#1C2C44] dark:text-[#00d084] shadow-[inset_2px_0_0_#D4AF37] dark:shadow-none'
                          : 'border border-transparent text-[#636878] dark:text-[#9ca3b0] hover:text-[#1C2C44] dark:hover:text-[#e8eaf0] hover:bg-[#D4AF37]/5 dark:hover:bg-[rgba(255,255,255,0.04)]'
                          }`}
                      >
                        <span className={`text-[12.5px] leading-snug ${active ? 'font-bold' : 'font-medium'}`}>
                          {lesson.title.split('. ')[1] || lesson.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2 perspective-1000">
                          {done && <Check size={12} className="text-[#d97706] dark:text-[#00d084] opacity-80" />}
                          {active && (
                            <>
                              <DollarSign size={14} className="hidden dark:block text-[#00d084] animate-fade-pulse" />
                              <motion.div
                                initial={{ y: 20, opacity: 0, rotateX: 180 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="block dark:hidden shrink-0 relative"
                              >
                                {/* Hào quang vàng ròng (Outer glow) */}
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-full blur-sm opacity-50 animate-pulse"></div>
                                
                                {/* Đồng tiền vàng (The Gold Coin) */}
                                <motion.div 
                                  animate={{ rotateY: 360 }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                  className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[#FFF8E7] via-[#D4AF37] to-[#8B6508] p-[1.5px] shadow-[0_4px_10px_rgba(212,175,55,0.6)] relative z-10"
                                >
                                  {/* Viền trong chạm khắc (Inner Coin Bezel) */}
                                  <div className="w-full h-full rounded-full bg-gradient-to-tl from-[#D4AF37] via-[#F3E5AB] to-[#996515] border-[0.5px] border-[#FFF8E7]/70 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]">
                                    {/* Lõi kim loại quý (Core) */}
                                    <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] border border-[#996515]/60 relative overflow-hidden">
                                      {/* Hiệu ứng chói sáng vắt chéo */}
                                      <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-[#FFF8E7]/40 to-transparent rotate-45"></div>
                                      <Bitcoin size={12} className="text-[#FFFDF5] drop-shadow-[0_1px_1.5px_rgba(139,101,8,0.9)] relative z-10" strokeWidth={2.5} />
                                    </div>
                                  </div>
                                </motion.div>

                                {/* Lấp lánh sang chảnh (Bling Sparkles) */}
                                <motion.div 
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], rotate: [0, 90, 180] }} 
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="absolute -top-1 -right-1 text-[#F3E5AB] drop-shadow-[0_0_3px_#D4AF37] z-20"
                                >
                                  <Star size={8} fill="currentColor" />
                                </motion.div>
                                <motion.div 
                                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3], rotate: [0, -90, -180] }} 
                                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                  className="absolute -bottom-1 -left-1 text-[#D4AF37] drop-shadow-[0_0_2px_#D4AF37] z-20"
                                >
                                  <Star size={6} fill="currentColor" />
                                </motion.div>
                              </motion.div>
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </div>
        </aside>

        {/* ── MAIN CONTENT ───────────────────────────── */}
        {/* This is the one true scrollable container */}
        <main
          ref={mainScrollRef}
          className="flex-1 h-full overflow-y-auto custom-scrollbar"
        >
          <div className="max-w-4xl mx-auto p-6 md:p-10">
            <motion.div
              key={selectedLesson.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-[#FDFBF7]/80 dark:bg-[#111827]/60 backdrop-blur-xl border border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.08)] rounded-3xl shadow-xl dark:shadow-none relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] dark:via-[#00d084] to-transparent" />

              {/* Lesson content */}
              <div className="p-8 md:p-12">
                {selectedLesson.content}
              </div>

              {/* Bottom nav */}
              <div className="px-8 md:px-12 pb-8 md:pb-12 pt-6 border-t border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.08)] flex flex-col gap-4">
                <button
                  onClick={() => toggleComplete(selectedLesson.id)}
                  className={`w-full py-3.5 rounded-xl font-mono text-[12px] tracking-[0.12em] transition-all duration-300 uppercase flex items-center justify-center gap-2 ${completedLessons.has(selectedLesson.id)
                    ? 'bg-transparent border border-[#D4AF37] dark:border-[#00d084]/50 text-[#D4AF37] dark:text-[#00d084]'
                    : 'bg-[#1C2C44] dark:bg-[#00d084]/10 border border-[#1C2C44] dark:border-[#00d084]/30 text-[#FDFBF7] dark:text-[#00d084] hover:bg-[#2A4365] dark:hover:bg-[#00d084]/20 shadow-md dark:shadow-none'
                    }`}
                >
                  {completedLessons.has(selectedLesson.id) ? (
                    <><Check size={15} /> {t.completed}</>
                  ) : (
                    <><Cpu size={15} /> {t.markCompleted}</>
                  )}
                </button>

                <div className="flex justify-between gap-4">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => goToLesson(currentIndex - 1)}
                    className="px-5 py-2.5 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#636878] dark:text-[#9ca3b0] hover:bg-[rgba(15,17,23,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-[#0f1117] dark:hover:text-[#e8eaf0] disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 text-[13px] font-medium transition-all"
                  >
                    <ChevronLeft size={15} /> {t.prev}
                  </button>
                  <button
                    disabled={currentIndex === allLessons.length - 1}
                    onClick={() => goToLesson(currentIndex + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#0f1117] dark:text-[#e8eaf0] hover:bg-[rgba(15,17,23,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 text-[13px] font-medium transition-all"
                  >
                    {t.next} <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

      </div>

      <style>{`
        @keyframes spin-y {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-spin-y {
          animation: spin-y 2.5s linear infinite;
        }
        @keyframes fade-out-in {
          0%, 100% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 6px rgba(0, 208, 132, 0.8)); }
          50% { opacity: 0; transform: scale(0.9); filter: drop-shadow(0 0 0px rgba(0, 208, 132, 0)); }
        }
        .animate-fade-pulse {
          animation: fade-out-in 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(15,17,23,0.15); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(217,119,6,0.4); }
        .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(0,208,132,0.4); }
      `}</style>
    </div>
  );
};

export default Academy;
