import React, { useState, useEffect } from 'react';
import Academy from './components/Academy';
import DailyQuiz from './components/DailyQuiz';
import TradingGym from './components/TradingGym';
import Flashcards from './components/Flashcards';
import TradingJournal from './components/TradingJournal';
import FloatingCoach from './components/FloatingCoach';

const App = () => {
  const [activeTab, setActiveTab] = useState('academy');
  const [balance, setBalance] = useState(10000);

  // STATE DARK MODE
  const [isDarkMode, setIsDarkMode] = useState(true);

  // STATE LANGUAGE
  const [lang, setLang] = useState('vi');

  // Khôi phục cài đặt Theme và Language từ LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('SAIB_theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    const savedLang = localStorage.getItem('SAIB_lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // Hàm chuyển đổi Theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('SAIB_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('SAIB_theme', 'light');
    }
  };

  // Hàm chuyển đổi Language
  const toggleLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('SAIB_lang', newLang);
  };

  const getTabClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `px-4 py-1.5 rounded-full text-[11px] font-black transition-all border ${isActive
        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:from-transparent dark:bg-[#00d084]/15 border-[#D4AF37]/50 dark:border-[#00d084]/30 text-white dark:text-[#00d084] shadow-[0_2px_8px_rgba(212,175,55,0.4)] dark:shadow-sm'
        : 'border-transparent text-[#636878] dark:text-[#9ca3b0] active:text- md:hover:text-[#1C2C44] dark:active:text- md:hover:text-[#e8eaf0] active:bg- md:hover:bg-white/60 dark:active:bg- md:hover:bg-[rgba(255,255,255,0.04)]'
      }`;
  };

  const t = {
    vi: {
      academy: "📚 HỌC VIỆN",
      flashcards: "🎴 THẺ NHỚ",
      quiz: "🎯 DAILY PUZZLES",
      journal: "📊 NHẬT KÝ TRADING & HUẤN LUYỆN",
      gym: "⚔️ TRADING GYM",
      capital: "Vốn Cấp Phát"
    },
    en: {
      academy: "📚 ACADEMY",
      flashcards: "🎴 FLASHCARDS",
      quiz: "🎯 DAILY PUZZLES",
      journal: "📊 JOURNAL & COACH",
      gym: "⚔️ TRADING GYM",
      capital: "Allocated Capital"
    }
  }[lang];

  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const handleAppScroll = (e) => {
      setHideNav(e.detail.hide);
    };
    window.addEventListener('app-scroll', handleAppScroll);
    return () => window.removeEventListener('app-scroll', handleAppScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#faf9f6] dark:bg-[#0e1117] text-[#0f1117] dark:text-[#e8eaf0] font-sans font-semibold subpixel-antialiased selection:bg-[#d97706]/30 dark:selection:bg-[#00d084]/30 transition-colors duration-300">

      {/* GLOBAL BACKGROUND (VIBE SYNC) */}
      {/* Dark mode background */}
      <div className="fixed inset-0 z-0 hidden dark:block opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="fixed inset-0 z-0 hidden dark:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00d084]/10 via-[#0e1117] to-[#0e1117] pointer-events-none"></div>

      {/* Light mode exclusive background: Gentleman, wealthy, professional, luxurious vibe */}
      <div className="fixed inset-0 z-0 block dark:hidden pointer-events-none bg-[#F4EFE6]">
          {/* Subtle gold and navy gradient meshes */}
          <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-[#F3E5AB]/20 to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#1C2C44]/20 via-transparent to-transparent"></div>
          {/* Elegant pinstripe pattern for the gentleman suit vibe */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #1C2C44 19px, #1C2C44 20px)' }}></div>
          {/* subtle gold vertical threads */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, #D4AF37 39px, #D4AF37 40px)' }}></div>
      </div>

      {/* NAVBAR */}
      <nav className={`shrink-0 w-full bg-[#fff]/80 dark:bg-[#0e1117]/80 backdrop-blur-md border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center z-10 transition-all duration-300 md:gap-0 ${hideNav ? 'gap-0' : 'gap-3'}`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-xl font-black tracking-tighter text-[#1C2C44] dark:text-[#e8eaf0]">SAIB<span className="text-[#D4AF37] dark:text-[#00d084]">.</span></h1>
          
          <div className="flex md:hidden items-center space-x-3">
             {/* NÚT CÔNG TẮC NGÔN NGỮ EN/VN (Mobile) */}
             <div className="flex items-center space-x-1 bg-white/50 dark:bg-[rgba(255,255,255,0.03)] p-1 rounded-full border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)]">
               <button onClick={() => toggleLang('vi')} className={`px-2 py-1 rounded-full text-[9px] font-bold transition-all ${lang === 'vi' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:bg-none dark:bg-[#00d084] text-white dark:text-black' : 'text-[#636878] dark:text-[#9ca3b0]'}`}>VN</button>
               <button onClick={() => toggleLang('en')} className={`px-2 py-1 rounded-full text-[9px] font-bold transition-all ${lang === 'en' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:bg-none dark:bg-[#00d084] text-white dark:text-black' : 'text-[#636878] dark:text-[#9ca3b0]'}`}>EN</button>
             </div>
             {/* NÚT CÔNG TẮC DARK/LIGHT MODE (Mobile) */}
             <button onClick={toggleTheme} className="text-lg p-1.5 rounded-full bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)]">
               {isDarkMode ? '☀️' : '🌙'}
             </button>
          </div>
        </div>

        <div className={`w-full md:w-auto overflow-x-auto custom-scrollbar transition-all duration-500 ease-in-out origin-top overflow-hidden ${hideNav ? 'max-h-0 opacity-0 pointer-events-none lg:max-h-[100px] lg:opacity-100 lg:pointer-events-auto' : 'max-h-[100px] opacity-100 pb-1 md:pb-0'}`}>
          <div className="flex space-x-1 bg-white/50 dark:bg-[rgba(255,255,255,0.03)] p-1 rounded-full border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] shadow-sm dark:shadow-none min-w-max">
            <button onClick={() => setActiveTab('academy')} className={getTabClass('academy')}>{t.academy}</button>
            <button onClick={() => setActiveTab('flashcards')} className={getTabClass('flashcards')}>{t.flashcards}</button>
            <button onClick={() => setActiveTab('quiz')} className={getTabClass('quiz')}>{t.quiz}</button>
            <button onClick={() => setActiveTab('journal')} className={getTabClass('journal')}>{t.journal}</button>
            <button onClick={() => setActiveTab('gym')} className={getTabClass('gym')}>{t.gym}</button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">

          {/* NÚT CÔNG TẮC NGÔN NGỮ EN/VN */}
          <div className="flex items-center space-x-1 bg-white/50 dark:bg-[rgba(255,255,255,0.03)] p-1 rounded-full border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] shadow-sm dark:shadow-none">
            <button onClick={() => toggleLang('vi')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'vi' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:bg-none dark:bg-[#00d084] text-white dark:text-black shadow-[0_2px_4px_rgba(212,175,55,0.3)] dark:shadow-sm' : 'text-[#636878] dark:text-[#9ca3b0] active:text- md:hover:text-[#1C2C44] dark:active:text- md:hover:text-white'}`}>VN</button>
            <button onClick={() => toggleLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:bg-none dark:bg-[#00d084] text-white dark:text-black shadow-[0_2px_4px_rgba(212,175,55,0.3)] dark:shadow-sm' : 'text-[#636878] dark:text-[#9ca3b0] active:text- md:hover:text-[#1C2C44] dark:active:text- md:hover:text-white'}`}>EN</button>
          </div>

          {/* NÚT CÔNG TẮC DARK/LIGHT MODE */}
          <button onClick={toggleTheme} className="text-xl p-1.5 rounded-full bg-[rgba(15,17,23,0.03)] active:bg- md:hover:bg-[rgba(15,17,23,0.08)] dark:bg-[rgba(255,255,255,0.03)] dark:active:bg- md:hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] transition-all shadow-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <div className="text-right ml-2">
            <p className="text-[9px] font-bold text-[#636878] dark:text-[#9ca3b0] uppercase tracking-widest">{t.capital}</p>
            <p className="text-base font-mono font-bold text-[#D4AF37] dark:text-[#00d084] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] dark:drop-shadow-none">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </nav>

      {/* ROUTER NỘI DUNG */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar z-20">
        {activeTab === 'academy' && <Academy lang={lang} />}
        {activeTab !== 'academy' && (
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            {activeTab === 'flashcards' && <Flashcards lang={lang} />}
            {activeTab === 'quiz' && <DailyQuiz lang={lang} />}
            {activeTab === 'journal' && <TradingJournal lang={lang} />}
            {activeTab === 'gym' && <TradingGym balance={balance} setBalance={setBalance} isDarkMode={isDarkMode} lang={lang} />}
          </div>
        )}
      </main>
      <FloatingCoach lang={lang} />
    </div>
  );
};

export default App;