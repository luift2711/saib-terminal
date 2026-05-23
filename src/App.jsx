import React, { useState, useEffect } from 'react';
import Academy from './components/Academy';
import DailyQuiz from './components/DailyQuiz';
import TradingGym from './components/TradingGym';
import Flashcards from './components/Flashcards';
import TradingJournal from './components/TradingJournal';
import FloatingCoach from './components/FloatingCoach';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Mail, Eye, EyeOff } from 'lucide-react';

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

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // State cho Form Login Glassmorphism
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // State cho Welcome / Splash Screen
  const [showNameInput, setShowNameInput] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        const storedName = localStorage.getItem('SAIB_trader_name');
        if (!storedName) {
          setShowNameInput(true);
        } else {
          setShowSplash(true);
          setTimeout(() => setShowSplash(false), 3000); // Tắt splash sau 3s
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSaveName = () => {
    if (tempName.trim()) {
      localStorage.setItem('SAIB_trader_name', tempName.trim());
      setShowNameInput(false);
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 3000);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    const storedName = localStorage.getItem('SAIB_trader_name') || 'Trader';

    if (lang === 'vi') {
      if (hour >= 5 && hour < 7) return `Dậy sớm thế, ${storedName}!`;
      if (hour >= 7 && hour < 12) return `Mừng bạn trở lại, ${storedName}!`;
      if (hour >= 12 && hour < 14) return `Bạn hẳn là một chú ong chăm chỉ, ${storedName}!`;
      if (hour >= 14 && hour < 18) return `Chào buổi chiều, ${storedName}`;
      if (hour >= 18 && hour < 23) return `Chào buổi tối, ${storedName}`;
      return `Khuya rồi đấy Cú đêm, ${storedName}`;
    } else {
      if (hour >= 5 && hour < 7) return `Morning, Early bird, ${storedName}`;
      if (hour >= 7 && hour < 12) return `Welcome back, I'm waiting for you, ${storedName}!`;
      if (hour >= 12 && hour < 14) return `You're such a Hustler, ${storedName}!`;
      if (hour >= 14 && hour < 18) return `Good afternoon, ${storedName}`;
      if (hour >= 18 && hour < 23) return `Good evening, ${storedName}`;
      return `It's quite late, Nightowl, ${storedName}`;
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại. Vui lòng cập nhật đúng Firebase Config trong file .env!");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

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
      : 'border-transparent text-[#636878] dark:text-[#9ca3b0] hover:text-[#1C2C44] dark:hover:text-[#e8eaf0] hover:bg-white/60 dark:hover:bg-[rgba(255,255,255,0.04)]'
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

  if (authLoading) {
    return <div className="h-screen flex items-center justify-center bg-[#faf9f6] dark:bg-[#0e1117] text-[#1C2C44] dark:text-[#e8eaf0] font-bold">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#faf9f6] dark:bg-[#0e1117] transition-colors duration-300 relative overflow-hidden">
        {/* Dark mode background */}
        <div className="fixed inset-0 z-0 hidden dark:block opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="fixed inset-0 z-0 hidden dark:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00d084]/15 via-[#0e1117] to-[#0e1117] pointer-events-none"></div>

        {/* Light mode exclusive background */}
        <div className="fixed inset-0 z-0 block dark:hidden pointer-events-none bg-[#F4EFE6]">
          <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-[#F3E5AB]/20 to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#1C2C44]/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #1C2C44 19px, #1C2C44 20px)' }}></div>
        </div>

        {/* GLASSMORPHISM LOGIN CARD */}
        <div className="relative z-10 flex flex-col items-center bg-white/40 dark:bg-[#111827]/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] max-w-sm w-full mx-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black tracking-tighter text-[#1C2C44] dark:text-[#e8eaf0] mb-1">SAIB<span className="text-[#D4AF37] dark:text-[#00d084]">.</span></h1>
            <p className="text-[10px] text-[#636878] dark:text-[#9ca3b0] font-bold uppercase tracking-widest">Trading Gym & Academy</p>
          </div>

          <h2 className="text-2xl font-black text-[#1C2C44] dark:text-white mb-6 uppercase tracking-widest">Login</h2>

          <div className="w-full space-y-6 mb-8">
            {/* Email Input */}
            <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 flex items-center group focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/40 dark:placeholder-white/40 focus:outline-none"
              />
              <Mail size={16} className="text-[#1C2C44]/40 dark:text-white/40 group-focus-within:text-[#D4AF37] dark:group-focus-within:text-[#00d084] transition-colors" />
            </div>

            {/* Password Input */}
            <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 flex items-center group focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/40 dark:placeholder-white/40 focus:outline-none pr-8"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-0 text-[#1C2C44]/40 dark:text-white/40 hover:text-[#1C2C44] dark:hover:text-white focus:outline-none transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center text-[10px] font-bold">
              <label className="flex items-center gap-2 cursor-pointer text-[#1C2C44]/70 dark:text-white/70 hover:text-[#1C2C44] dark:hover:text-white transition-colors">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-3.5 h-3.5 rounded border-[#1C2C44]/20 dark:border-white/20 accent-[#D4AF37] dark:accent-[#00d084]" />
                Remember Me
              </label>
              <button className="text-[#1C2C44]/70 dark:text-white/70 hover:text-[#D4AF37] dark:hover:text-[#00d084] transition-colors">
                Forgot Password?
              </button>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#1C2C44] to-[#2A3F5C] dark:from-[#D4AF37] dark:to-[#C59B27] text-white dark:text-[#0e1117] py-3.5 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-md mb-6">
            Login
          </button>

          <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 bg-white/60 dark:bg-[rgba(15,17,23,0.4)] text-[#1C2C44] dark:text-white border border-white/50 dark:border-white/10 py-3.5 rounded-xl font-bold hover:bg-white dark:hover:bg-[#111827] hover:scale-[1.02] transition-all shadow-sm">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" /><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" /><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" /><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" /></g></svg>
            Sign in with Google
          </button>

          <div className="mt-8 text-center text-[11px] font-bold text-[#1C2C44]/70 dark:text-white/70">
            Don't have an Account? <button className="text-[#D4AF37] dark:text-[#00d084] hover:underline ml-1">Register</button>
          </div>
        </div>
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#faf9f6] dark:bg-[#0e1117] transition-colors duration-300 relative overflow-hidden">
        <div className="fixed inset-0 z-0 hidden dark:block opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="fixed inset-0 z-0 hidden dark:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00d084]/15 via-[#0e1117] to-[#0e1117] pointer-events-none"></div>

        <div className="fixed inset-0 z-0 block dark:hidden pointer-events-none bg-[#F4EFE6]">
          <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-[#F3E5AB]/20 to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#1C2C44]/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #1C2C44 19px, #1C2C44 20px)' }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center bg-white/40 dark:bg-[#111827]/40 backdrop-blur-2xl p-10 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] max-w-md w-full mx-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#1C2C44] dark:text-white mb-2">
            {lang === 'vi' ? 'Chào mừng đến SAIB' : 'Welcome to SAIB'}
          </h2>
          <p className="text-[16px] text-[#636878] dark:text-[#9ca3b0] mb-8 font-semibold">
            {lang === 'vi' ? 'Chúng tôi có thể xưng hô với bạn thế nào?' : 'How can we call you?'}
          </p>
          <input
            type="text"
            value={tempName}
            onChange={e => setTempName(e.target.value)}
            placeholder={lang === 'vi' ? 'Tên của bạn...' : 'Your name...'}
            className="w-full bg-white/50 dark:bg-[#0B0E11]/50 border border-[#1C2C44]/20 dark:border-white/20 rounded-xl px-5 py-4 text-xl text-center text-[#1C2C44] dark:text-white font-bold outline-none focus:border-[#D4AF37] dark:focus:border-[#00d084] mb-8 transition-colors"
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter') handleSaveName(); }}
          />
          <button
            onClick={handleSaveName}
            className="w-full bg-gradient-to-r from-[#1C2C44] to-[#2A3F5C] dark:from-[#D4AF37] dark:to-[#C59B27] text-white dark:text-[#0e1117] py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-md"
          >
            {lang === 'vi' ? 'Bắt đầu hành trình' : 'Start Journey'}
          </button>
        </div>
      </div>
    );
  }

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
            <button onClick={() => toggleLang('vi')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'vi' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:bg-none dark:bg-[#00d084] text-white dark:text-black shadow-[0_2px_4px_rgba(212,175,55,0.3)] dark:shadow-sm' : 'text-[#636878] dark:text-[#9ca3b0] hover:text-[#1C2C44] dark:hover:text-white'}`}>VN</button>
            <button onClick={() => toggleLang('en')} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:bg-none dark:bg-[#00d084] text-white dark:text-black shadow-[0_2px_4px_rgba(212,175,55,0.3)] dark:shadow-sm' : 'text-[#636878] dark:text-[#9ca3b0] hover:text-[#1C2C44] dark:hover:text-white'}`}>EN</button>
          </div>

          {/* NÚT CÔNG TẮC DARK/LIGHT MODE */}
          <button onClick={toggleTheme} className="text-xl p-1.5 rounded-full bg-[rgba(15,17,23,0.03)] hover:bg-[rgba(15,17,23,0.08)] dark:bg-[rgba(255,255,255,0.03)] dark:hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] transition-all shadow-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <div className="text-right ml-2 flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1 bg-white/50 dark:bg-[rgba(255,255,255,0.03)] px-2 py-1 rounded-full border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)]">
              <img src={user.photoURL || 'https://via.placeholder.com/30'} alt="Avatar" className="w-4 h-4 rounded-full" />
              <span className="text-[10px] font-bold text-[#1C2C44] dark:text-[#e8eaf0] truncate max-w-[80px]">{user.displayName || 'Trader'}</span>
              <button onClick={handleLogout} className="text-[9px] font-bold text-[#F6465D] hover:text-white hover:bg-[#F6465D] px-1.5 py-0.5 rounded transition-colors uppercase tracking-widest ml-1">Đăng xuất</button>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-[9px] font-bold text-[#636878] dark:text-[#9ca3b0] uppercase tracking-widest">{t.capital}</p>
              <p className="text-base font-mono font-bold text-[#D4AF37] dark:text-[#00d084] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] dark:drop-shadow-none">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
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

      {/* SPLASH SCREEN OVERLAY */}
      {showSplash && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#faf9f6] dark:bg-[#0e1117] pointer-events-none" style={{ animation: "splash-overlay 3s ease-in-out forwards" }}>

          <div className="absolute inset-0 z-0 hidden dark:block opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="absolute inset-0 z-0 hidden dark:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00d084]/15 via-[#0e1117] to-[#0e1117] pointer-events-none"></div>

          <div className="absolute inset-0 z-0 block dark:hidden pointer-events-none bg-[#F4EFE6]">
            <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-[#F3E5AB]/20 to-transparent"></div>
            <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#1C2C44]/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #1C2C44 19px, #1C2C44 20px)' }}></div>
          </div>

          <div className="relative z-10 flex flex-col items-center" style={{ animation: "splash-text-flow 3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1C2C44] dark:text-white mb-6 text-center px-4 tracking-tight">
              {getGreeting()}
            </h1>
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:from-[#00d084] dark:to-[#00b371] rounded-full shadow-lg" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}></div>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes splash-overlay {
              0% { opacity: 1; }
              66% { opacity: 1; }
              100% { opacity: 0; visibility: hidden; }
            }
            @keyframes splash-text-flow {
              0% { opacity: 0; transform: translateY(40px); }
              33% { opacity: 1; transform: translateY(0); }
              66% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-40px); }
            }
          `}} />
        </div>
      )}
    </div>
  );
};

export default App;