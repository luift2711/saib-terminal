import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Database, Check, ChevronLeft, Cpu, Bitcoin, DollarSign, Star, Menu, X } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import CHAPTER_0_DATA_VN from './academy_chapters/Chapter0_VN';
import CHAPTER_0_DATA_EN from './academy_chapters/Chapter0_EN';
import CHAPTER_1_DATA_VN from './academy_chapters/Chapter1_VN';
import CHAPTER_1_DATA_EN from './academy_chapters/Chapter1_EN';
import CHAPTER_2_DATA_VN from './academy_chapters/Chapter2_VN';
import CHAPTER_2_DATA_EN from './academy_chapters/Chapter2_EN';
import CHAPTER_3_DATA_VN from './academy_chapters/Chapter3_VN';
import CHAPTER_3_DATA_EN from './academy_chapters/Chapter3_EN';
import CHAPTER_4_DATA_VN from './academy_chapters/Chapter4_VN';
import CHAPTER_4_DATA_EN from './academy_chapters/Chapter4_EN';
import CHAPTER_5_DATA_VN from './academy_chapters/Chapter5_VN';
import CHAPTER_5_DATA_EN from './academy_chapters/Chapter5_EN';
import CHAPTER_6_DATA_VN from './academy_chapters/Chapter6_VN';
import CHAPTER_6_DATA_EN from './academy_chapters/Chapter6_EN';
import { AcademyContext } from './AcademyContext';



const getChapters = (lang) => [
  { title: lang === 'en' ? 'Curriculum Overview' : 'Tổng quan Lộ trình', data: lang === 'en' ? CHAPTER_0_DATA_EN : CHAPTER_0_DATA_VN },
  { title: lang === 'en' ? 'Chapter 1: Foundation' : 'Chương 1: Nền Tảng', data: lang === 'en' ? CHAPTER_1_DATA_EN : CHAPTER_1_DATA_VN },
  { title: lang === 'en' ? 'Chapter 2: Technical Analysis' : 'Chương 2: Phân Tích Kỹ Thuật', data: lang === 'en' ? CHAPTER_2_DATA_EN : CHAPTER_2_DATA_VN },
  { title: lang === 'en' ? 'Chapter 3: Price Action & Candles' : 'Chương 3: PP NNN & Nến', data: lang === 'en' ? CHAPTER_3_DATA_EN : CHAPTER_3_DATA_VN },
  { title: lang === 'en' ? 'Chapter 4: Risk Management' : 'Chương 4: Quản lý vốn & rủi ro', data: lang === 'en' ? CHAPTER_4_DATA_EN : CHAPTER_4_DATA_VN },
  { title: lang === 'en' ? 'Chapter 5: Trading Psychology' : 'Chương 5: Tâm lý giao dịch', data: lang === 'en' ? CHAPTER_5_DATA_EN : CHAPTER_5_DATA_VN },
  { title: lang === 'en' ? 'Chapter 6: Building Your System & Going Live' : 'Chương 6: Xây dựng Hệ thống & Thực chiến', data: lang === 'en' ? CHAPTER_6_DATA_EN : CHAPTER_6_DATA_VN },
];



const Academy = ({ lang = 'vi', user }) => {
  const STORAGE_KEY = `SAIB_academy_progress_${user?.uid || 'guest'}`;
  const LAST_LESSON_KEY = `SAIB_last_lesson_id_${user?.uid || 'guest'}`;

  // [C16] Helper sync lên Firestore (debounce nhẹ bằng timeout)
  const syncTimeout = useRef(null);
  const syncToCloud = (progressSet, lessonId) => {
    if (!user?.uid) return;
    clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => {
      const userRef = doc(db, 'users', user.uid);
      const payload = {};
      if (progressSet !== undefined) payload.academyProgress = [...progressSet];
      if (lessonId !== undefined) payload.lastLessonId = lessonId;
      updateDoc(userRef, payload).catch(console.error);
    }, 800); // debounce 800ms tránh spam Firestore
  };

  const readCompletedLessons = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  };

  const [selectedId, setSelectedId] = useState(() => {
    return localStorage.getItem(LAST_LESSON_KEY) || '0-0';
  });
  const [completedLessons, setCompletedLessons] = useState(readCompletedLessons);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const mainScrollRef = useRef(null);
  const lastScrollY = useRef(0);

  const [activeExercises, setActiveExercises] = useState(new Set());
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const registerExercise = (id) => setActiveExercises((prev) => new Set(prev).add(id));
  const completeExercise = (id) => setCompletedExercises((prev) => new Set(prev).add(id));
  
  const isExercisesCompleted = activeExercises.size === 0 || activeExercises.size <= completedExercises.size;

  const handleScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    if (currentScrollY > 100 && currentScrollY > lastScrollY.current + 10) {
      if (!hideNav) {
        setHideNav(true);
        window.dispatchEvent(new CustomEvent('app-scroll', { detail: { hide: true } }));
      }
    } else if (currentScrollY < lastScrollY.current - 10) {
      if (hideNav) {
        setHideNav(false);
        window.dispatchEvent(new CustomEvent('app-scroll', { detail: { hide: false } }));
      }
    }
    lastScrollY.current = currentScrollY;
  };

  // Scroll to top on lesson change & save progress
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
    localStorage.setItem(LAST_LESSON_KEY, selectedId);
    syncToCloud(undefined, selectedId); // [C16] Sync vị trí bài đang học
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
      syncToCloud(updated, undefined); // [C16]
      return updated;
    });
  };

  const markLessonCompleted = (id) => {
    setCompletedLessons((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
      syncToCloud(updated, undefined); // [C16]
      return updated;
    });
  };

  const goToLesson = (nextIndex) => {
    markLessonCompleted(selectedLesson.id);
    const nextLesson = allLessons[nextIndex];
    if (nextLesson) {
      setActiveExercises(new Set());
      setCompletedExercises(new Set());
      setSelectedId(nextLesson.id);
    }
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

  const renderSidebarContent = () => (
    <>
      {/* System Sync / Progress */}
      <div className="p-5 border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] bg-[#faf9f6]/90 dark:bg-[#0e1117]/90 backdrop-blur-md relative z-20 shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-[#fff]/60 dark:bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-[#d97706]/40 dark:border-[rgba(255,255,255,0.1)] relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] dark:via-[#00d084] to-transparent"></div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] dark:text-[#00d084] flex items-center gap-2 font-black">
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
            <h3 className="text-[12.5px] font-mono uppercase tracking-[0.18em] text-[#B8860B] dark:text-[#00d084] border-b border-[#D4AF37]/30 dark:border-[#00d084]/20 pb-2 mb-3 px-2 flex items-center gap-2 font-black">
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
                    onClick={() => {
                      setActiveExercises(new Set());
                      setCompletedExercises(new Set());
                      setSelectedId(id);
                      if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${active
                      ? 'bg-gradient-to-r from-[#D4AF37]/15 to-transparent dark:bg-none dark:bg-[#00d084]/10 border border-[#D4AF37]/50 dark:border-[#00d084]/30 text-[#1C2C44] dark:text-[#00d084] shadow-[inset_2px_0_0_#D4AF37] dark:shadow-none'
                      : 'border border-transparent text-[#636878] dark:text-[#9ca3b0] hover:text-[#1C2C44] dark:hover:text-[#e8eaf0] hover:bg-[#D4AF37]/5 dark:hover:bg-[rgba(255,255,255,0.04)]'
                      }`}
                  >
                    <span className={`text-[15px] leading-snug ${active ? 'font-bold' : 'font-medium'}`}>
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
                            style={{ perspective: '800px' }}
                          >
                            {/* Vòng sáng nhấp nháy phía sau */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-full blur-md opacity-40 animate-pulse"></div>
                            
                            {/* Coin 3D Container (Spin + Bounce) */}
                            <motion.div
                              animate={{ 
                                rotateY: [0, 360], 
                                y: [0, -6, 0] 
                              }}
                              transition={{ 
                                rotateY: { duration: 3.5, repeat: Infinity, ease: "linear" },
                                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                              }}
                              style={{ transformStyle: 'preserve-3d' }}
                              className="w-[28px] h-[28px] relative z-10"
                            >
                              {/* 4 layers để tạo độ dày siêu mỏng (khoảng 2px) như đồng xu thật */}
                              {[...Array(4)].map((_, i) => (
                                <img 
                                  key={i}
                                  src="/bitcoin.png" 
                                  onError={(e) => { e.target.onerror = null; e.target.src = "https://cryptologos.cc/logos/bitcoin-btc-logo.png"; }}
                                  alt=""
                                  className="absolute inset-0 w-full h-full rounded-full"
                                  style={{ 
                                    transform: `translateZ(${(i - 1.5) * 0.8}px) ${i === 0 ? 'rotateY(180deg)' : ''}`,
                                    filter: (i === 1 || i === 2) ? 'brightness(0.6)' : 'drop-shadow(0 2px 4px rgba(212,175,55,0.4))'
                                  }}
                                />
                              ))}
                            </motion.div>
                            
                            {/* Các ngôi sao lấp lánh xung quanh */}
                            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], rotate: [0, 90, 180] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-1 -right-1 text-[#F3E5AB] drop-shadow-[0_0_3px_#D4AF37] z-20">
                              <Star size={10} fill="currentColor" />
                            </motion.div>
                            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3], rotate: [0, -90, -180] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute -bottom-1 -left-1 text-[#D4AF37] drop-shadow-[0_0_2px_#D4AF37] z-20">
                              <Star size={8} fill="currentColor" />
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
    </>
  );

  return (
    // Root: fixed viewport height, no window scroll
    <div className="h-full flex flex-col overflow-hidden bg-[#faf9f6] dark:bg-[#0e1117] text-[#0f1117] dark:text-[#e8eaf0] font-sans selection:bg-[#d97706]/30 dark:selection:bg-[#00d084]/30 transition-colors duration-500">

      {/* ── MOBILE DRAWER SIDEBAR ────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="w-[300px] max-w-[85vw] h-full flex flex-col bg-[#faf9f6] dark:bg-[#0e1117] relative z-50 shadow-2xl"
          >
            <div className="flex justify-between items-center p-4 border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] shrink-0">
              <h2 className="text-[13px] font-black tracking-[0.15em] text-[#1C2C44] dark:text-[#e8eaf0]">MENU</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 rounded-full bg-[rgba(15,17,23,0.05)] dark:bg-[rgba(255,255,255,0.05)] z-10 hover:bg-[rgba(15,17,23,0.1)] transition-colors"
              >
                 <X size={20} className="text-[#0f1117] dark:text-[#e8eaf0]" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              {renderSidebarContent()}
            </div>
          </motion.aside>
        </div>
      )}

      {/* Mobile Header (Only visible on small screens) */}
      <div className={`lg:hidden flex items-center justify-between p-4 border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] bg-[#faf9f6]/90 dark:bg-[#0e1117]/90 backdrop-blur-md relative z-20 transition-all duration-500 ease-in-out origin-top overflow-hidden ${hideNav ? 'max-h-0 opacity-0 !py-0 !border-0 pointer-events-none' : 'max-h-[100px] opacity-100'}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-xl bg-white dark:bg-[rgba(255,255,255,0.05)] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] shadow-sm">
             <Menu size={20} className="text-[#0f1117] dark:text-[#e8eaf0]" />
          </button>
          <span className="font-black text-sm uppercase tracking-widest text-[#D4AF37] dark:text-[#00d084] flex items-center gap-2">
            <Database size={14} /> {t.systemSync}
          </span>
        </div>
        <span className="font-mono font-bold text-sm text-[#0f1117] dark:text-[#00d084]">{progressPct}%</span>
      </div>

      {/* Full-height flex layout: sidebar | main */}
      <AcademyContext.Provider value={{ registerExercise, completeExercise }}>
      <div className="flex-1 overflow-hidden flex relative z-10">

        {/* ── DESKTOP SIDEBAR ────────────────────────────────── */}
        <aside className="hidden lg:flex w-72 shrink-0 h-full flex-col border-r border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] bg-[#faf9f6]/80 dark:bg-[#0e1117]/80 backdrop-blur-sm">
          {renderSidebarContent()}
        </aside>

        {/* ── MAIN CONTENT ───────────────────────────── */}
        {/* This is the one true scrollable container */}
        <main
          ref={mainScrollRef}
          onScroll={handleScroll}
          className="flex-1 h-full overflow-y-auto custom-scrollbar"
        >
          <div className="max-w-4xl mx-auto p-4 md:p-10">
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
              <div className="p-4 md:p-12">
                {selectedLesson.content}
              </div>

              {/* Bottom nav */}
              <div className="px-4 md:px-12 pb-4 md:pb-12 pt-6 border-t border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.08)] flex flex-col gap-4">
                <button
                  onClick={() => toggleComplete(selectedLesson.id)}
                  className={`w-full py-3.5 rounded-xl font-mono text-[14.5px] tracking-[0.12em] transition-all duration-300 uppercase flex items-center justify-center gap-2 ${completedLessons.has(selectedLesson.id)
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
                    className="px-5 py-2.5 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#636878] dark:text-[#9ca3b0] hover:bg-[rgba(15,17,23,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-[#0f1117] dark:hover:text-[#e8eaf0] disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 text-[15.5px] font-medium transition-all"
                  >
                    <ChevronLeft size={15} /> {t.prev}
                  </button>
                  <button
                    disabled={currentIndex === allLessons.length - 1 || !isExercisesCompleted}
                    onClick={() => goToLesson(currentIndex + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#0f1117] dark:text-[#e8eaf0] hover:bg-[rgba(15,17,23,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 text-[15.5px] font-medium transition-all"
                  >
                    {!isExercisesCompleted ? "HOÀN THÀNH BÀI TẬP ĐỂ ĐI TIẾP" : <>{t.next} <ChevronRight size={15} /></>}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

      </div>
      </AcademyContext.Provider>

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
        .custom-scrollbar::-webkit-scrollbar { width: 14px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background-color: rgba(15,17,23,0.15); 
          border-radius: 10px; 
          border: 5px solid transparent; 
          background-clip: padding-box;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.15); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background-color: rgba(217,119,6,0.4); 
          border-width: 2px; 
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background-color: rgba(0,208,132,0.4); 
          border-width: 2px; 
        }
      `}</style>
    </div>
  );
};

export default Academy;
