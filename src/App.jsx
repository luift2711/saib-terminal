import React, { useState, useEffect } from 'react';
import Academy from './components/Academy';
import DailyQuiz from './components/DailyQuiz';
import TradingGym from './components/TradingGym';
import Flashcards from './components/Flashcards';
import TradingJournal from './components/TradingJournal';

const App = () => {
  const [activeTab, setActiveTab] = useState('academy');
  const [balance, setBalance] = useState(10000);
  
  // STATE DARK MODE
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Khôi phục cài đặt Theme từ LocalStorage khi mở app
  useEffect(() => {
    const savedTheme = localStorage.getItem('SAIB_theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
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

  const getTabClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `px-4 py-1.5 rounded-full text-[11px] font-black transition-all border ${
      isActive 
        ? 'bg-[#b45309] dark:bg-[#00d084]/15 border-[#b45309] dark:border-[#00d084]/30 text-white dark:text-[#00d084] shadow-sm' 
        : 'border-transparent text-[#636878] dark:text-[#9ca3b0] hover:text-[#0f1117] dark:hover:text-[#e8eaf0] hover:bg-[rgba(15,17,23,0.04)] dark:hover:bg-[rgba(255,255,255,0.04)]'
    }`;
  };

  return (
    <div className="h-screen flex flex-col bg-[#faf9f6] dark:bg-[#0e1117] text-[#0f1117] dark:text-[#e8eaf0] font-sans font-medium subpixel-antialiased selection:bg-[#b45309]/30 dark:selection:bg-[#00d084]/30 transition-colors duration-300">
      
      {/* NAVBAR */}
      <nav className="bg-[#fff]/80 dark:bg-[#0e1117]/80 backdrop-blur-md border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] px-6 py-3 flex justify-between items-center shrink-0 z-20 transition-colors duration-300">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-black tracking-tighter text-[#0f1117] dark:text-[#e8eaf0]">SAIB<span className="text-[#b45309] dark:text-[#00d084]">.</span></h1>
          <div className="flex space-x-1 bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] p-1 rounded-full border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)]">
            <button onClick={() => setActiveTab('academy')} className={getTabClass('academy')}>📚 HOC VIEN</button>
            <button onClick={() => setActiveTab('flashcards')} className={getTabClass('flashcards')}>🎴 FLASHCARD</button>
            <button onClick={() => setActiveTab('quiz')} className={getTabClass('quiz')}>🎯 DAILY QUIZ</button>
            <button onClick={() => setActiveTab('journal')} className={getTabClass('journal')}>📊 JOURNAL & COACH</button>
            <button onClick={() => setActiveTab('gym')} className={getTabClass('gym')}>⚔️ TRADING GYM</button>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          
          {/* NÚT CÔNG TẮC DARK/LIGHT MODE */}
          <button onClick={toggleTheme} className="text-xl p-2 rounded-full bg-[rgba(15,17,23,0.03)] hover:bg-[rgba(15,17,23,0.08)] dark:bg-[rgba(255,255,255,0.03)] dark:hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] transition-all shadow-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="text-right">
            <p className="text-[9px] font-bold text-[#636878] dark:text-[#9ca3b0] uppercase tracking-widest">Vốn Cấp Phát</p>
            <p className="text-base font-mono font-bold text-[#b45309] dark:text-[#00d084]">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
        </div>
      </nav>

      {/* ROUTER NỘI DUNG */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {activeTab === 'academy' && <Academy />}
        {activeTab !== 'academy' && (
          <div className="max-w-7xl mx-auto p-6">
            {activeTab === 'flashcards' && <Flashcards />}
            {activeTab === 'quiz' && <DailyQuiz />}
            {activeTab === 'journal' && <TradingJournal />}
            {activeTab === 'gym' && <TradingGym balance={balance} setBalance={setBalance} isDarkMode={isDarkMode} />}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;