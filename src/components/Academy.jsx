import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Database, Check, ChevronLeft, Cpu } from 'lucide-react';
import CHAPTER_1_DATA from './academy_chapters/Chapter1';
import CHAPTER_2_DATA from './academy_chapters/Chapter2';
import CHAPTER_3_DATA from './academy_chapters/Chapter3';

const STORAGE_KEY = 'SAIB_academy_progress';

const chapters = [
  { title: 'Chương 1: Nền Tảng', data: CHAPTER_1_DATA },
  { title: 'Chương 2: Phân Tích Kỹ Thuật', data: CHAPTER_2_DATA },
  { title: 'Chương 3: PP NNN & Nến', data: CHAPTER_3_DATA },
];

const readCompletedLessons = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
};

const Academy = () => {
  const [selectedId, setSelectedId] = useState('0-0');
  const [completedLessons, setCompletedLessons] = useState(readCompletedLessons);
  const mainScrollRef = useRef(null);

  // Scroll to top on lesson change — scroll the main content area
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [selectedId]);

  const allLessons = useMemo(
    () =>
      chapters.flatMap((chapter, chapterIndex) =>
        chapter.data.map((lesson, lessonIndex) => ({
          ...lesson,
          id: `${chapterIndex}-${lessonIndex}`,
        }))
      ),
    []
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

  return (
    // Root: fixed viewport height, no window scroll
    <div className="h-screen overflow-hidden bg-[#faf9f6] dark:bg-[#0e1117] text-[#0f1117] dark:text-[#e8eaf0] font-sans selection:bg-[#c8922a]/30 dark:selection:bg-[#00d084]/30 transition-colors duration-500">

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.04] dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e2c078]/20 via-[#faf9f6] to-[#faf9f6] dark:from-[#00d084]/10 dark:via-[#0e1117] dark:to-[#0e1117] pointer-events-none"></div>

      {/* Full-height flex layout: sidebar | main */}
      <div className="h-full flex relative z-10">

        {/* ── SIDEBAR ────────────────────────────────── */}
        <aside className="w-72 shrink-0 h-full flex flex-col border-r border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] bg-[#faf9f6]/80 dark:bg-[#0e1117]/80 backdrop-blur-sm">

          {/* System Sync / Progress */}
          <div className="p-5 border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-[#fff]/60 dark:bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-[#e2c078] dark:border-[rgba(255,255,255,0.1)] relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c8922a] dark:via-[#00d084] to-transparent"></div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c8922a] dark:text-[#00d084] flex items-center gap-2">
                  <Database size={12}/> SYSTEM SYNC
                </span>
                <span className="font-mono text-[#0f1117] dark:text-[#00d084] font-bold dark:font-normal text-sm">{progressPct}%</span>
              </div>
              <div className="h-1 rounded-full bg-[rgba(15,17,23,0.1)] dark:bg-[rgba(255,255,255,0.05)] overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-[#c8922a] dark:bg-[#00d084] shadow-[0_0_10px_rgba(200,146,42,0.5)] dark:shadow-[0_0_10px_rgba(0,208,132,0.5)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Navigation — scrollable */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
            {chapters.map((chapter, chapterIndex) => (
              <motion.section
                key={chapter.title}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: chapterIndex * 0.1 }}
              >
                <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#636878] dark:text-[#5a6275] border-b border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.05)] pb-2 mb-3 px-2 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#9ba0ad] dark:bg-[#5a6275] rounded-full"></span>
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
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                          active
                            ? 'bg-[rgba(200,146,42,0.12)] dark:bg-[#00d084]/10 border border-[#e2c078] dark:border-[#00d084]/30 text-[#0f1117] dark:text-[#00d084]'
                            : 'border border-transparent text-[#636878] dark:text-[#9ca3b0] hover:text-[#0f1117] dark:hover:text-[#e8eaf0] hover:bg-[rgba(15,17,23,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)]'
                        }`}
                      >
                        <span className={`text-[12.5px] leading-snug ${active ? 'font-medium' : 'font-light'}`}>
                          {lesson.title.split('. ')[1] || lesson.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {done && <Check size={12} className="text-[#c8922a] dark:text-[#00d084] opacity-80" />}
                          {active && <ChevronRight size={12} className="text-[#c8922a] dark:text-[#00d084]" />}
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
              className="bg-[#fff]/80 dark:bg-[#111827]/60 backdrop-blur-xl border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-3xl shadow-lg dark:shadow-none relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#c8922a] dark:via-[#00d084] to-transparent" />

              {/* Lesson content */}
              <div className="p-8 md:p-12">
                {selectedLesson.content}
              </div>

              {/* Bottom nav */}
              <div className="px-8 md:px-12 pb-8 md:pb-12 pt-6 border-t border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.08)] flex flex-col gap-4">
                <button
                  onClick={() => toggleComplete(selectedLesson.id)}
                  className={`w-full py-3.5 rounded-xl font-mono text-[12px] tracking-[0.12em] transition-all duration-300 uppercase flex items-center justify-center gap-2 ${
                    completedLessons.has(selectedLesson.id)
                      ? 'bg-transparent border border-[#c8922a] dark:border-[#00d084]/50 text-[#c8922a] dark:text-[#00d084]'
                      : 'bg-[#0f1117] dark:bg-[#00d084]/10 border border-[#0f1117] dark:border-[#00d084]/30 text-[#fff] dark:text-[#00d084] hover:bg-[#2a2e3a] dark:hover:bg-[#00d084]/20'
                  }`}
                >
                  {completedLessons.has(selectedLesson.id) ? (
                    <><Check size={15}/> MODULE COMPLETED</>
                  ) : (
                    <><Cpu size={15}/> MARK MODULE COMPLETED</>
                  )}
                </button>

                <div className="flex justify-between gap-4">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => goToLesson(currentIndex - 1)}
                    className="px-5 py-2.5 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#636878] dark:text-[#9ca3b0] hover:bg-[rgba(15,17,23,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] hover:text-[#0f1117] dark:hover:text-[#e8eaf0] disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 text-[13px] font-medium transition-all"
                  >
                    <ChevronLeft size={15}/> PREVIOUS
                  </button>
                  <button
                    disabled={currentIndex === allLessons.length - 1}
                    onClick={() => goToLesson(currentIndex + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.1)] text-[#0f1117] dark:text-[#e8eaf0] hover:bg-[rgba(15,17,23,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 text-[13px] font-medium transition-all"
                  >
                    NEXT MODULE <ChevronRight size={15}/>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(15,17,23,0.15); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(200,146,42,0.4); }
        .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(0,208,132,0.4); }
      `}</style>
    </div>
  );
};

export default Academy;
