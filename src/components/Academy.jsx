import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Database, Check, ChevronLeft, Cpu, Bitcoin, DollarSign, Star, Menu, X } from 'lucide-react';
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

const STORAGE_KEY = 'SAIB_academy_progress';
const PASSED_QUIZZES_KEY = 'SAIB_academy_passed_quizzes';

export const AcademyContext = React.createContext(null);

const getChapters = (lang) => [
  { title: lang === 'en' ? 'Curriculum Overview' : 'Tổng quan Lộ trình', data: lang === 'en' ? CHAPTER_0_DATA_EN : CHAPTER_0_DATA_VN },
  { title: lang === 'en' ? 'Chapter 1: Foundation' : 'Chương 1: Nền Tảng', data: lang === 'en' ? CHAPTER_1_DATA_EN : CHAPTER_1_DATA_VN },
  { title: lang === 'en' ? 'Chapter 2: Technical Analysis' : 'Chương 2: Phân Tích Kỹ Thuật', data: lang === 'en' ? CHAPTER_2_DATA_EN : CHAPTER_2_DATA_VN },
  { title: lang === 'en' ? 'Chapter 3: Price Action & Candles' : 'Chương 3: PP NNN & Nến', data: lang === 'en' ? CHAPTER_3_DATA_EN : CHAPTER_3_DATA_VN },
  { title: lang === 'en' ? 'Chapter 4: Risk Management' : 'Chương 4: Quản lý vốn & rủi ro', data: lang === 'en' ? CHAPTER_4_DATA_EN : CHAPTER_4_DATA_VN },
  { title: lang === 'en' ? 'Chapter 5: Trading Psychology' : 'Chương 5: Tâm lý giao dịch', data: lang === 'en' ? CHAPTER_5_DATA_EN : CHAPTER_5_DATA_VN },
  { title: lang === 'en' ? 'Chapter 6: Building Your System & Going Live' : 'Chương 6: Xây dựng Hệ thống & Thực chiến', data: lang === 'en' ? CHAPTER_6_DATA_EN : CHAPTER_6_DATA_VN },
];

const Academy = ({ lang = 'vi' }) => {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const [passedQuizzes, setPassedQuizzes] = useState(() => {
    try {
      const saved = localStorage.getItem(PASSED_QUIZZES_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const chapters = getChapters(lang);
  const allLessons = useMemo(() =>
      chapters.flatMap((chapter, chapterIndex) =>
        chapter.data.map((lesson, lessonIndex) => ({
          ...lesson,
          id: `${chapterIndex}-${lessonIndex}`,
        }))
      ),
    [lang]
  );

  const initialLessonId = useMemo(() => {
    let lastCompletedIndex = -1;
    for (let i = 0; i < allLessons.length; i++) {
      if (completedLessons.has(allLessons[i].id)) lastCompletedIndex = i;
    }
    if (lastCompletedIndex === -1) return allLessons[0].id;
    if (lastCompletedIndex < allLessons.length - 1) return allLessons[lastCompletedIndex + 1].id;
    return allLessons[lastCompletedIndex].id;
  }, [lang, completedLessons, allLessons]);

  const [selectedId, setSelectedId] = useState(initialLessonId);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const mainScrollRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    if (currentScrollY > 100 && currentScrollY > lastScrollY.current + 10) {
      if (!hideNav) {
        setHideNav(true);
      }
    } else if (currentScrollY < lastScrollY.current - 10) {
      if (hideNav) {
        setHideNav(false);
      }
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    if (mainScrollRef.current) {
      setTimeout(() => {
        if (mainScrollRef.current) mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [selectedId]);

  const selectedLesson = allLessons.find((lesson) => lesson.id === selectedId) || allLessons[0];
  const currentIndex = allLessons.findIndex((lesson) => lesson.id === selectedLesson.id);
  const progressPct = allLessons.length ? Math.round((completedLessons.size / allLessons.length) * 100) : 0;

  const [activeExercises, setActiveExercises] = useState(new Set());
  useEffect(() => { setActiveExercises(new Set()); }, [selectedId]);

  const registerExercise = (exId) => { setActiveExercises(prev => new Set(prev).add(exId)); };
  const completeExercise = (exId) => { setActiveExercises(prev => { const next = new Set(prev); next.delete(exId); return next; }); };

  const toggleComplete = (id) => {
    setCompletedLessons((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
      return updated;
    });
  };

  const markQuizPassed = (id) => {
    setPassedQuizzes((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      localStorage.setItem(PASSED_QUIZZES_KEY, JSON.stringify([...updated]));
      return updated;
    });
  };

  const hasIncompleteExercises = activeExercises.size > 0 && !completedLessons.has(selectedId);
  const isNextDisabled = (hasIncompleteExercises) || (selectedLesson.requireQuizPass && !passedQuizzes.has(selectedId));

  const goToLesson = (nextIndex, markCurrentAsCompleted = false) => {
    if (hasIncompleteExercises) {
      alert(lang === 'vi' ? 'Vui lòng hoàn thành tất cả bài tập!' : 'Please complete all exercises!');
      return;
    }
    if (selectedLesson.requireQuizPass && !passedQuizzes.has(selectedId)) {
      alert(lang === 'vi' ? 'Vui lòng hoàn thành bài tập tổng kết!' : 'Please complete the final quiz!');
      return;
    }
    if (markCurrentAsCompleted) {
      setCompletedLessons((prev) => {
        const updated = new Set(prev);
        updated.add(selectedId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
        return updated;
      });
    }
    const nextLesson = allLessons[nextIndex];
    if (nextLesson) setSelectedId(nextLesson.id);
  };

  const t = {
    vi: { systemSync: "SYSTEM SYNC", markCompleted: "ĐÁNH DẤU ĐÃ HỌC XONG", completed: "ĐÃ HỌC XONG", prev: "BÀI TRƯỚC", next: "BÀI TIẾP THEO" },
    en: { systemSync: "SYSTEM SYNC", markCompleted: "MARK MODULE COMPLETED", completed: "MODULE COMPLETED", prev: "PREVIOUS", next: "NEXT MODULE" }
  }[lang];

  const renderSidebarContent = () => (
    <>
      <div className="p-5 border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] bg-[#faf9f6]/90 dark:bg-[#0e1117]/90 backdrop-blur-md relative z-20 shrink-0">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#fff]/60 dark:bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-[#d97706]/40 dark:border-[rgba(255,255,255,0.1)] relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[12.5px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] dark:text-[#00d084] flex items-center gap-2 font-black"><Database size={12} /> {t.systemSync}</span>
            <span className="font-mono text-[#0f1117] dark:text-[#00d084] font-bold text-sm">{progressPct}%</span>
          </div>
          <div className="h-1 rounded-full bg-[rgba(15,17,23,0.1)] dark:bg-[rgba(255,255,255,0.05)] overflow-hidden relative">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C59B27] to-[#D4AF37] dark:bg-[#00d084]" />
          </div>
        </motion.div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {chapters.map((chapter, chapterIndex) => (
          <section key={chapterIndex}>
            <h3 className="text-[12.5px] font-mono uppercase tracking-[0.18em] text-[#B8860B] dark:text-[#00d084] border-b border-[#D4AF37]/30 pb-2 mb-3 px-2 font-black">{chapter.title}</h3>
            <div className="space-y-0.5">
              {chapter.data.map((lesson, lessonIndex) => {
                const id = `${chapterIndex}-${lessonIndex}`;
                const active = selectedLesson.id === id;
                return (
                  <button key={id} onClick={() => { setSelectedId(id); setIsMobileMenuOpen(false); }} className={`w-full text-left px-3 py-2.5 rounded-xl ${active ? 'bg-[#D4AF37]/10 dark:bg-[#00d084]/10 border border-[#D4AF37]/50' : ''}`}>
                    <span className="text-[15px]">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#faf9f6] dark:bg-[#0e1117] text-[#0f1117] dark:text-[#e8eaf0] font-sans">
      <div className="flex-1 overflow-hidden flex relative z-10">
        <aside className="hidden lg:flex w-72 shrink-0 h-full flex-col border-r border-[rgba(15,17,23,0.08)] bg-[#faf9f6]/80 dark:bg-[#0e1117]/80">{renderSidebarContent()}</aside>
        <main ref={mainScrollRef} onScroll={handleScroll} className="flex-1 h-full overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto p-4 md:p-10">
            <motion.div key={selectedLesson.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#FDFBF7]/80 dark:bg-[#111827]/60 border border-[#D4AF37]/30 rounded-3xl overflow-hidden">
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] dark:via-[#00d084] to-transparent" />
              <div className="p-4 md:p-12">
                <AcademyContext.Provider value={{ selectedId, markQuizPassed, registerExercise, completeExercise }}>
                    {selectedLesson.content}
                </AcademyContext.Provider>
              </div>
              <div className="px-4 md:px-12 pb-4 md:pb-12 pt-6 border-t border-[rgba(15,17,23,0.08)] flex flex-col gap-4">
                <button onClick={() => toggleComplete(selectedLesson.id)} className={`w-full py-3.5 rounded-xl font-mono text-[14.5px] uppercase flex items-center justify-center gap-2 ${completedLessons.has(selectedLesson.id) ? 'border border-[#D4AF37]' : 'bg-[#1C2C44]'}`}>
                  {completedLessons.has(selectedLesson.id) ? <><Check size={15} /> {t.completed}</> : <><Cpu size={15} /> {t.markCompleted}</>}
                </button>
                <div className="flex justify-between gap-4">
                  <button disabled={currentIndex === 0} onClick={() => goToLesson(currentIndex - 1)} className="px-5 py-2.5 rounded-xl border border-[rgba(15,17,23,0.1)] flex items-center gap-2">
                    <ChevronLeft size={15} /> {t.prev}
                  </button>
                  <button disabled={isNextDisabled} onClick={() => goToLesson(currentIndex + 1, true)} className="px-6 py-3 bg-[#1C2C44] dark:bg-[#00d084] text-[#FDFBF7] dark:text-[#0B0E11] rounded-xl font-bold flex items-center gap-2 hover:shadow-lg disabled:opacity-40">
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
