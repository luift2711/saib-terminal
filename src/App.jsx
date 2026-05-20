import React, { useState } from 'react';
import Academy from './components/Academy';
import DailyQuiz from './components/DailyQuiz';
import TradingGym from './components/TradingGym';
import Flashcards from './components/Flashcards';
import TradingJournal from './components/TradingJournal';

const App = () => {
  const [activeTab, setActiveTab] = useState('journal'); // Mặc định mở luôn tab Journal mới tinh để kiểm tra
  const [balance, setBalance] = useState(10000);

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] font-sans selection:bg-[#F6465D] selection:text-white">
      {/* NAVBAR PHÂN CHIA 5 KHU VỰC ĐỘC LẬP */}
      <nav className="bg-[#181A20] border-b border-[#2B3139] px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-xl">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-black tracking-tighter text-[#EAECEF]">SAIB<span className="text-[#F6465D]">.</span></h1>
          <div className="flex space-x-1.5 bg-[#0B0E11] p-1 rounded-full border border-white/5">
            <button onClick={() => setActiveTab('academy')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'academy' ? 'bg-[#F6465D] text-white' : 'text-[#848E9C] hover:text-white'}`}>📚 HOC VIEN</button>
            <button onClick={() => setActiveTab('flashcards')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'flashcards' ? 'bg-white/10 text-white' : 'text-[#848E9C] hover:text-white'}`}>🎴 FLASHCARD</button>
            <button onClick={() => setActiveTab('quiz')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'quiz' ? 'bg-[#FCD535] text-black shadow-md' : 'text-[#848E9C] hover:text-[#FCD535]'}`}>🎯 DAILY QUIZ</button>
            <button onClick={() => setActiveTab('journal')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'journal' ? 'bg-[#378ADD] text-white shadow-lg' : 'text-[#848E9C] hover:text-white'}`}>📊 JOURNAL & COACH</button>
            <button onClick={() => setActiveTab('gym')} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all ${activeTab === 'gym' ? 'bg-[#0ECB81] text-black font-bold' : 'text-[#848E9C] hover:text-white'}`}>⚔️ TRADING GYM</button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-[#848E9C] uppercase tracking-widest">Vốn Cấp Phát</p>
          <p className="text-base font-mono font-bold text-[#0ECB81]">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
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