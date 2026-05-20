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

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#0B0E11] text-[#1a1a18] dark:text-[#EAECEF] font-sans selection:bg-[#F6465D] selection:text-white transition-colors duration-300">
      
      {/* NAVBAR */}
      <nav className="bg-white dark:bg-[#181A20] border-b border-gray-200 dark:border-[#2B3139] px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm dark:shadow-xl transition-colors duration-300">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-black tracking-tighter text-black dark:text-[#EAECEF]">SAIB<span className="text-[#F6465D]">.</span></h1>
          <div className="flex space-x-1.5 bg-gray-100 dark:bg-[#0B0E11] p-1 rounded-full border border-gray-200 dark:border-white/5">
            <button onClick={() => setActiveTab('academy')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'academy' ? 'bg-[#F6465D] text-white' : 'text-gray-500 dark:text-[#848E9C] hover:text-black dark:hover:text-white'}`}>📚 HOC VIEN</button>
            <button onClick={() => setActiveTab('flashcards')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'flashcards' ? 'bg-gray-300 dark:bg-white/10 text-black dark:text-white' : 'text-gray-500 dark:text-[#848E9C] hover:text-black dark:hover:text-white'}`}>🎴 FLASHCARD</button>
            <button onClick={() => setActiveTab('quiz')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'quiz' ? 'bg-[#FCD535] text-black shadow-md' : 'text-gray-500 dark:text-[#848E9C] hover:text-[#c8922a] dark:hover:text-[#FCD535]'}`}>🎯 DAILY QUIZ</button>
            <button onClick={() => setActiveTab('journal')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'journal' ? 'bg-[#378ADD] text-white shadow-lg' : 'text-gray-500 dark:text-[#848E9C] hover:text-black dark:hover:text-white'}`}>📊 JOURNAL & COACH</button>
            <button onClick={() => setActiveTab('gym')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'gym' ? 'bg-[#0ECB81] text-black font-bold' : 'text-gray-500 dark:text-[#848E9C] hover:text-black dark:hover:text-white'}`}>⚔️ TRADING GYM</button>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          
          {/* NÚT CÔNG TẮC DARK/LIGHT MODE */}
          <button onClick={toggleTheme} className="text-xl p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#181A20] dark:hover:bg-[#2B3139] border border-gray-200 dark:border-[#2B3139] transition-all shadow-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="text-right">
            <p className="text-[9px] font-bold text-gray-500 dark:text-[#848E9C] uppercase tracking-widest">Vốn Cấp Phát</p>
            <p className="text-base font-mono font-bold text-[#2d7a4f] dark:text-[#0ECB81]">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
        </div>
      </nav>

      {/* ROUTER NỘI DUNG */}
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'academy' && <Academy />}
        {activeTab === 'flashcards' && <Flashcards />}
        {activeTab === 'quiz' && <DailyQuiz />}
        {activeTab === 'journal' && <TradingJournal />}
        {activeTab === 'gym' && <TradingGym balance={balance} setBalance={setBalance} />}
      </main>
    </div>
  );
};

export default App;