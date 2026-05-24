import React, { useState, useEffect } from 'react';
import Academy from './components/Academy';
import DailyQuiz from './components/DailyQuiz';
import TradingGym from './components/TradingGym';
import Flashcards from './components/Flashcards';
import TradingJournal from './components/TradingJournal';
import FloatingCoach from './components/FloatingCoach';
import { auth, provider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged, updatePassword, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Mail, Eye, EyeOff } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('academy');
  const [balance, setBalance] = useState(10000);
  const [lastBailoutDate, setLastBailoutDate] = useState(null);
  const [lockedUntil, setLockedUntil] = useState(null);

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

  // State cho Form Login/Register
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Thêm state cho Register
  const [regName, setRegName] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  // State cho Welcome / Splash Screen
  const [showNameInput, setShowNameInput] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [tempName, setTempName] = useState('');
  const [userName, setUserName] = useState('');
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  // States cho việc tạo mật khẩu lần đầu
  const [setupStep, setSetupStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States cho Profile Modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editConfirmPassword, setEditConfirmPassword] = useState('');
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showEditConfirmPassword, setShowEditConfirmPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        // --- Tích hợp Firestore: Đọc hoặc tạo Balance ---
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            let currentBalance = data.balance;
            let currentLock = data.lockedUntil || null;
            
            // Nếu đã hết hạn khóa 2 ngày -> Tự động hồi phục về 8000
            if (currentLock && Date.now() >= currentLock) {
              currentBalance = 8000;
              currentLock = null;
              updateDoc(userRef, { balance: 8000, lockedUntil: null }).catch(console.error);
            }

            setBalance(currentBalance);
            setLastBailoutDate(data.lastBailoutDate || null);
            setLockedUntil(currentLock);
          } else {
            await setDoc(userRef, { balance: 10000, lastBailoutDate: null, lockedUntil: null });
            setBalance(10000);
            setLastBailoutDate(null);
            setLockedUntil(null);
          }
        } catch (error) {
          console.error("Lỗi đồng bộ Firestore:", error);
        }

        const storedName = localStorage.getItem(`SAIB_trader_name_${currentUser.uid}`);
        if (!storedName) {
          setShowNameInput(true);
        } else {
          setUserName(storedName);
          setShowSplash(true);
          setTimeout(() => setShowSplash(false), 3000); // Tắt splash sau 3s
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Logic Hệ thống Rank
  const getRank = (bal) => {
    if (bal >= 100000) return { name: 'Grandmaster', style: 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30' };
    if (bal >= 50000) return { name: 'Professional', style: 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30' };
    if (bal >= 20000) return { name: 'Intermediate', style: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30' };
    return { name: 'Beginner', style: 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30' };
  };
  const currentRank = getRank(balance);

  // Sync Balance lên Firestore mỗi khi balance thay đổi
  useEffect(() => {
    if (user && balance !== undefined) {
      const userRef = doc(db, 'users', user.uid);
      
      // KIỂM TRA HÌNH PHẠT KHÓA TÀI KHOẢN (Chỉ áp dụng cho Beginner khi Balance < 5000)
      if (balance < 5000 && currentRank.name === 'Beginner' && !lockedUntil) {
        const lockTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // Khóa 2 ngày
        setLockedUntil(lockTime);
        updateDoc(userRef, { balance, lockedUntil: lockTime }).catch(console.error);
      } else {
        updateDoc(userRef, { balance }).catch(console.error);
      }
    }
  }, [balance, user, currentRank.name, lockedUntil]);

  const handleSaveName = () => {
    if (tempName.trim() && user) {
      const name = tempName.trim();
      localStorage.setItem(`SAIB_trader_name_${user.uid}`, name);
      setUserName(name);
      setSetupStep(2); // Luôn chuyển qua bước 2 vì đây là luồng đăng nhập mới
    }
  };

  const handleSavePassword = async () => {
    if (newPassword.length < 6) {
      alert(lang === 'vi' ? 'Mật khẩu phải từ 6 ký tự' : 'Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert(lang === 'vi' ? 'Mật khẩu xác nhận không khớp' : 'Passwords do not match');
      return;
    }
    try {
      const hasPasswordProvider = user.providerData.some(p => p.providerId === 'password');
      if (hasPasswordProvider) {
        await updatePassword(user, newPassword);
      } else {
        const credential = EmailAuthProvider.credential(user.email, newPassword);
        await linkWithCredential(user, credential);
      }
      setIsFirstLogin(true);
      setShowNameInput(false);
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 3000);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/requires-recent-login') {
        alert(lang === 'vi' ? 'Lý do bảo mật: Phiên đăng nhập đã cũ. Vui lòng đăng xuất và đăng nhập lại bằng Google để tạo mật khẩu!' : 'Security: Session is old. Please log out and log in again with Google to create a password!');
      } else {
        alert(`Lỗi tạo mật khẩu: ${error.code} - ${error.message}`);
      }
    }
  };

  const handleOpenProfile = () => {
    setEditName(userName || user.displayName || '');
    setEditPassword('');
    setEditConfirmPassword('');
    setShowProfileModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      if (editName.trim() && editName.trim() !== userName) {
        const name = editName.trim();
        localStorage.setItem(`SAIB_trader_name_${user.uid}`, name);
        setUserName(name);
        await updateProfile(user, { displayName: name });
      }

      if (editPassword) {
        if (editPassword.length < 6) {
          alert(lang === 'vi' ? 'Mật khẩu phải từ 6 ký tự!' : 'Password must be at least 6 characters!');
          return;
        }
        if (editPassword !== editConfirmPassword) {
          alert(lang === 'vi' ? 'Mật khẩu xác nhận không khớp!' : 'Passwords do not match!');
          return;
        }
        
        try {
          const hasPasswordProvider = user.providerData.some(p => p.providerId === 'password');
          if (hasPasswordProvider) {
            await updatePassword(user, editPassword);
          } else {
            const credential = EmailAuthProvider.credential(user.email, editPassword);
            await linkWithCredential(user, credential);
          }
        } catch (err) {
          if (err.code === 'auth/requires-recent-login') {
            alert(lang === 'vi' ? 'Vì lý do bảo mật, vui lòng ĐĂNG XUẤT và ĐĂNG NHẬP LẠI bằng Google trước khi đổi mật khẩu.' : 'For security reasons, please LOG OUT and LOG IN again with Google before changing password.');
            return;
          }
          throw err;
        }
        alert(lang === 'vi' ? 'Cập nhật thông tin thành công! Giờ bạn có thể dùng mật khẩu này để đăng nhập.' : 'Profile updated successfully! You can now use this password to log in.');
      }

      setShowProfileModal(false);
    } catch (error) {
      console.error(error);
      alert(lang === 'vi' ? `Lỗi cập nhật Profile: ${error.code} - ${error.message}` : `Update error: ${error.code} - ${error.message}`);
    }
  };


  const getGreeting = () => {
    const storedName = userName || (user ? user.displayName : 'Trader');

    if (isFirstLogin) {
      return lang === 'vi' ? `Chào mừng đến SAIB, ${storedName}` : `Welcome to SAIB, ${storedName}`;
    }

    const hour = new Date().getHours();
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

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert(lang === 'vi' ? 'Vui lòng nhập Email/Username và Mật khẩu!' : 'Please enter Email/Username and Password!');
      return;
    }
    
    // Xử lý nếu người dùng nhập Username thay vì Email
    const cleanEmail = email.trim();
    const loginEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@saib.user`;

    try {
      await signInWithEmailAndPassword(auth, loginEmail, password);
    } catch (error) {
      console.error(error);
      alert(lang === 'vi' ? `Đăng nhập thất bại: ${error.code}` : `Login failed: ${error.code}`);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert(lang === 'vi' ? 'Vui lòng nhập Email để nhận link đổi mật khẩu!' : 'Please enter your Email to reset password!');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert(lang === 'vi' ? `Đã gửi link đổi mật khẩu tới ${email}. Vui lòng kiểm tra hộp thư (hoặc thư mục Spam).` : `Password reset link sent to ${email}. Please check your inbox (or Spam folder).`);
    } catch (error) {
      console.error(error);
      alert('Lỗi: ' + error.message);
    }
  };

  const handleRegister = async () => {
    if (!regName || !email || !password || !regConfirmPassword) {
      alert(lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin!' : 'Please fill in all fields!');
      return;
    }
    if (password !== regConfirmPassword) {
      alert(lang === 'vi' ? 'Mật khẩu xác nhận không khớp!' : 'Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      alert(lang === 'vi' ? 'Mật khẩu phải từ 6 ký tự!' : 'Password must be at least 6 characters!');
      return;
    }
    
    // Xử lý nếu người dùng nhập Username thay vì Email
    const cleanEmail = email.trim();
    const registerEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@saib.user`;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: regName });
      localStorage.setItem(`SAIB_trader_name_${user.uid}`, regName);
      setUserName(regName);
      setIsFirstLogin(true); // Gắn cờ hiện splash lần đầu
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 3000);
    } catch (error) {
      console.error(error);
      alert(lang === 'vi' ? `Đăng ký thất bại: ${error.code}` : `Registration failed: ${error.code}`);
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

          <h2 className="text-2xl font-black text-[#1C2C44] dark:text-white mb-6 uppercase tracking-widest">
            {isRegisterMode ? (lang === 'vi' ? 'Đăng Ký' : 'Register') : 'Login'}
          </h2>

          <div className="w-full space-y-6 mb-8">
            {isRegisterMode && (
              <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 flex items-center group focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
                <input
                  type="text"
                  placeholder={lang === 'vi' ? 'Tên hiển thị' : 'Your Name'}
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/40 dark:placeholder-white/40 focus:outline-none"
                />
              </div>
            )}

            {/* Email Input */}
            <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 flex items-center group focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
              <input
                type="text"
                placeholder="Email / Username"
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

            {isRegisterMode && (
              <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 flex items-center group focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
                <input
                  type={showRegConfirm ? "text" : "password"}
                  placeholder={lang === 'vi' ? 'Xác nhận mật khẩu' : 'Confirm Password'}
                  value={regConfirmPassword}
                  onChange={e => setRegConfirmPassword(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/40 dark:placeholder-white/40 focus:outline-none pr-8"
                />
                <button onClick={() => setShowRegConfirm(!showRegConfirm)} className="absolute right-0 text-[#1C2C44]/40 dark:text-white/40 hover:text-[#1C2C44] dark:hover:text-white focus:outline-none transition-colors">
                  {showRegConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {/* Remember & Forgot (Chỉ hiện khi Đăng nhập) */}
            {!isRegisterMode && (
              <div className="flex justify-between items-center text-[10px] font-bold">
                <label className="flex items-center gap-2 cursor-pointer text-[#1C2C44]/70 dark:text-white/70 hover:text-[#1C2C44] dark:hover:text-white transition-colors">
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-3.5 h-3.5 rounded border-[#1C2C44]/20 dark:border-white/20 accent-[#D4AF37] dark:accent-[#00d084]" />
                  Remember Me
                </label>
                <button onClick={handleForgotPassword} className="text-[#1C2C44]/70 dark:text-white/70 hover:text-[#D4AF37] dark:hover:text-[#00d084] transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {isRegisterMode ? (
            <button onClick={handleRegister} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:from-[#00d084] dark:to-[#00a86b] text-white dark:text-[#0e1117] py-3.5 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-md mb-6">
              {lang === 'vi' ? 'Đăng Ký' : 'Register'}
            </button>
          ) : (
            <button onClick={handleEmailLogin} className="w-full bg-gradient-to-r from-[#1C2C44] to-[#2A3F5C] dark:from-[#D4AF37] dark:to-[#C59B27] text-white dark:text-[#0e1117] py-3.5 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-md mb-6">
              Login
            </button>
          )}

          <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 bg-white/60 dark:bg-[rgba(15,17,23,0.4)] text-[#1C2C44] dark:text-white border border-white/50 dark:border-white/10 py-3.5 rounded-xl font-bold hover:bg-white dark:hover:bg-[#111827] hover:scale-[1.02] transition-all shadow-sm">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" /><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" /><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" /><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" /></g></svg>
            {isRegisterMode ? (lang === 'vi' ? 'Đăng ký bằng Google' : 'Sign up with Google') : 'Sign in with Google'}
          </button>

          <div className="mt-8 text-center text-[11px] font-bold text-[#1C2C44]/70 dark:text-white/70">
            {isRegisterMode ? (
              <>
                {lang === 'vi' ? 'Đã có tài khoản?' : 'Already have an Account?'} <button onClick={() => setIsRegisterMode(false)} className="text-[#D4AF37] dark:text-[#00d084] hover:underline ml-1">{lang === 'vi' ? 'Đăng nhập' : 'Login'}</button>
              </>
            ) : (
              <>
                {lang === 'vi' ? 'Chưa có tài khoản?' : "Don't have an Account?"} <button onClick={() => setIsRegisterMode(true)} className="text-[#D4AF37] dark:text-[#00d084] hover:underline ml-1">{lang === 'vi' ? 'Đăng ký' : 'Register'}</button>
              </>
            )}
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
          {setupStep === 1 ? (
            <>
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
            </>
          ) : (
            <>
              <h2 className="text-3xl font-serif font-bold text-[#1C2C44] dark:text-white mb-8">
                {lang === 'vi' ? 'Tạo mật khẩu' : 'Create Password'}
              </h2>
              
              <div className="w-full space-y-4 mb-8 text-left">
                <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 flex items-center group focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder={lang === 'vi' ? 'Mật khẩu mới' : 'New Password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/40 dark:placeholder-white/40 focus:outline-none pr-8"
                  />
                  <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-0 text-[#1C2C44]/40 dark:text-white/40 hover:text-[#1C2C44] dark:hover:text-white focus:outline-none transition-colors">
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 flex items-center group focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={lang === 'vi' ? 'Xác nhận mật khẩu' : 'Confirm Password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/40 dark:placeholder-white/40 focus:outline-none pr-8"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSavePassword(); }}
                  />
                  <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 text-[#1C2C44]/40 dark:text-white/40 hover:text-[#1C2C44] dark:hover:text-white focus:outline-none transition-colors">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSavePassword}
                className="w-full bg-gradient-to-r from-[#1C2C44] to-[#2A3F5C] dark:from-[#D4AF37] dark:to-[#C59B27] text-white dark:text-[#0e1117] py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-md"
              >
                {lang === 'vi' ? 'Hoàn tất' : 'Complete'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // GIAO DIỆN KHÓA TÀI KHOẢN (PENALTY SCREEN)
  if (lockedUntil && Date.now() < lockedUntil) {
    const hoursLeft = Math.ceil((lockedUntil - Date.now()) / (1000 * 60 * 60));
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0e1117] text-white p-6 text-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#0e1117] to-[#0e1117] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0, #ef4444 1px, transparent 1px, transparent 10px)' }}></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black text-red-500 mb-6 uppercase tracking-widest animate-pulse">
            Tài Khoản Bị Khóa
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
            Bạn đã vi phạm kỷ luật giao dịch và làm mất hơn <span className="text-red-500 font-bold">50% số vốn</span>.
            <br />Trong thế giới chuyên nghiệp, đây là một lỗi lầm không thể dung thứ.
          </p>
          
          <div className="bg-red-500/10 border-2 border-red-500/30 rounded-3xl p-8 md:p-12 mb-10 w-full shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <p className="text-lg uppercase tracking-widest font-bold text-red-400 mb-4">Thời gian thi hành án phạt còn lại</p>
            <p className="text-7xl md:text-9xl font-mono font-black text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              {hoursLeft}H
            </p>
          </div>
          
          <p className="text-sm md:text-base text-gray-500 italic px-4">
            Sau khi hết thời hạn 2 ngày, tài khoản của bạn sẽ được ân xá và cấp lại mức vốn sinh tồn <span className="text-white font-bold">$8,000</span> để làm lại từ đầu.
          </p>
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
      <nav className={`relative shrink-0 w-full bg-[#fff]/80 dark:bg-[#0e1117]/80 backdrop-blur-md border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center z-10 transition-all duration-300 md:gap-0 ${hideNav ? 'gap-0' : 'gap-3'}`}>
        
        {/* HIỆU ỨNG NHẤP NHÁY ĐỎ CẢNH BÁO CHO BEGINNER */}
        {currentRank.name === 'Beginner' && balance >= 8000 && balance <= 9500 && (
          <div className="absolute inset-0 pointer-events-none z-[-1] animate-pulse bg-red-500/10 dark:bg-red-500/20 border-b-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"></div>
        )}

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
              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${currentRank.style}`}>
                {currentRank.name}
              </span>
              <img src={user.photoURL || 'https://via.placeholder.com/30'} alt="Avatar" className="w-4 h-4 rounded-full ml-1" />
              <span 
                className="text-[10px] font-bold text-[#1C2C44] dark:text-[#e8eaf0] truncate max-w-[80px] cursor-pointer hover:text-[#D4AF37] dark:hover:text-[#00d084] transition-colors"
                onClick={handleOpenProfile}
                title={lang === 'vi' ? 'Nhấn để sửa Profile' : 'Click to edit Profile'}
              >
                {userName || user.displayName || 'Trader'}
              </span>
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
            {activeTab === 'gym' && <TradingGym lang={lang} balance={balance} setBalance={setBalance} isDarkMode={isDarkMode} />}
          </div>
        )}
      </main>

      <FloatingCoach lang={lang} />

      {/* PROFILE EDIT MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-[#faf9f6] dark:bg-[#111827] w-full max-w-sm rounded-[2rem] p-8 border border-[rgba(15,17,23,0.1)] dark:border-white/10 shadow-2xl relative">
            <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-5 text-2xl font-bold text-[#1C2C44]/50 dark:text-white/50 hover:text-red-500 transition-colors">&times;</button>
            <h2 className="text-2xl font-black text-[#1C2C44] dark:text-white mb-6 uppercase tracking-widest text-center">
              {lang === 'vi' ? 'Hồ Sơ Của Bạn' : 'Your Profile'}
            </h2>

            {/* Nút Xin Trợ Cấp Hàng Tháng */}
            <div className="mb-6 p-4 rounded-xl bg-[#D4AF37]/10 dark:bg-[#00d084]/10 border border-[#D4AF37]/20 dark:border-[#00d084]/20 text-center">
              <p className="text-xs font-bold text-[#D4AF37] dark:text-[#00d084] mb-2">
                {lang === 'vi' ? 'Đặc quyền Trợ Cấp Vốn (1 lần/tháng)' : 'Monthly Funding Allowance'}
              </p>
              <button 
                onClick={async () => {
                  const now = Date.now();
                  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
                  
                  if (lastBailoutDate && (now - lastBailoutDate < thirtyDays)) {
                    const daysLeft = Math.ceil((thirtyDays - (now - lastBailoutDate)) / (1000 * 60 * 60 * 24));
                    alert(lang === 'vi' ? `Đặc quyền đã được sử dụng. Vui lòng quay lại sau ${daysLeft} ngày nữa!` : `Allowance used. Please come back in ${daysLeft} days!`);
                    return;
                  }

                  let bailoutAmount = 2000; // Beginner
                  if (currentRank.name === 'Intermediate') bailoutAmount = 4000;
                  if (currentRank.name === 'Professional') bailoutAmount = 10000;
                  if (currentRank.name === 'Grandmaster') bailoutAmount = 20000;

                  if (window.confirm(lang === 'vi' ? `Nhận ngay trợ cấp $${bailoutAmount.toLocaleString()} cho Rank ${currentRank.name}?` : `Receive $${bailoutAmount.toLocaleString()} allowance for ${currentRank.name}?`)) {
                    const newBalance = balance + bailoutAmount;
                    setBalance(newBalance);
                    setLastBailoutDate(now);
                    
                    try {
                      const userRef = doc(db, 'users', user.uid);
                      await updateDoc(userRef, { balance: newBalance, lastBailoutDate: now });
                      alert(lang === 'vi' ? `Đã cộng thêm $${bailoutAmount.toLocaleString()} vào tài khoản!` : `Added $${bailoutAmount.toLocaleString()}!`);
                    } catch (e) {
                      console.error(e);
                    }
                  }
                }}
                className="w-full bg-[#1C2C44] dark:bg-white text-white dark:text-[#0e1117] hover:scale-[1.02] font-black uppercase text-xs tracking-widest py-3 rounded-lg transition-transform shadow-md"
              >
                {lang === 'vi' ? 'Nhận Trợ Cấp Ngay' : 'Claim Allowance'}
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              {/* Tên */}
              <div>
                <label className="text-[10px] font-bold text-[#636878] dark:text-[#9ca3b0] uppercase tracking-widest mb-2 block">
                  {lang === 'vi' ? 'Tên hiển thị' : 'Display Name'}
                </label>
                <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div className="pt-4">
                <label className="text-[10px] font-bold text-[#636878] dark:text-[#9ca3b0] uppercase tracking-widest mb-2 block">
                  {lang === 'vi' ? 'Đổi mật khẩu (Bỏ trống nếu không đổi)' : 'Change Password (Leave blank to keep)'}
                </label>
                <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 mb-4 focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
                  <input
                    type={showEditPassword ? "text" : "password"}
                    placeholder={lang === 'vi' ? 'Mật khẩu mới...' : 'New password...'}
                    value={editPassword}
                    onChange={e => setEditPassword(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/30 dark:placeholder-white/30 focus:outline-none pr-8"
                  />
                  <button onClick={() => setShowEditPassword(!showEditPassword)} className="absolute right-0 text-[#1C2C44]/40 dark:text-white/40 hover:text-[#1C2C44] dark:hover:text-white">
                    {showEditPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative border-b border-[#1C2C44]/20 dark:border-white/20 pb-2 focus-within:border-[#D4AF37] dark:focus-within:border-[#00d084] transition-colors">
                  <input
                    type={showEditConfirmPassword ? "text" : "password"}
                    placeholder={lang === 'vi' ? 'Xác nhận mật khẩu mới...' : 'Confirm new password...'}
                    value={editConfirmPassword}
                    onChange={e => setEditConfirmPassword(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-[#1C2C44] dark:text-white placeholder-[#1C2C44]/30 dark:placeholder-white/30 focus:outline-none pr-8"
                  />
                  <button onClick={() => setShowEditConfirmPassword(!showEditConfirmPassword)} className="absolute right-0 text-[#1C2C44]/40 dark:text-white/40 hover:text-[#1C2C44] dark:hover:text-white">
                    {showEditConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:from-[#00d084] dark:to-[#00a86b] text-white dark:text-[#0e1117] py-3.5 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-md">
              {lang === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

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