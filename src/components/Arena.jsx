import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Crosshair, Swords, Eye, Briefcase, Users, Flag } from 'lucide-react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const COINS = [
  { symbol: 'BTC', tvSymbol: 'BINANCE:BTCUSDT', name: 'Bitcoin', type: 'crypto', basePrice: 65000 },
  { symbol: 'VNINDEX', tvSymbol: 'HOSE:VNINDEX', name: 'Chỉ số VN-Index', type: 'stock', basePrice: 1250.5, vol: 1.5 },
  { symbol: 'VIC', tvSymbol: 'HOSE:VIC', name: 'Vingroup', type: 'stock', basePrice: 42500, vol: 150 },
  { symbol: 'NVDA', tvSymbol: 'NASDAQ:NVDA', name: 'NVIDIA Corp', type: 'stock', basePrice: 950.5, vol: 1.2 },
  { symbol: 'US30', tvSymbol: 'CAPITALCOM:US30', name: 'Dow Jones (US30)', type: 'stock', basePrice: 39500, vol: 12 },
  { symbol: 'XAU/USD', tvSymbol: 'OANDA:XAUUSD', name: 'Vàng Giao Ngay', type: 'forex', basePrice: 2350.5, vol: 0.8 }
];

const Arena = ({ lang, balance, setBalance, isDarkMode, user }) => {
  // LOBBY, SEARCHING, BATTLE, FINISHED
  const [matchState, setMatchState] = useState('LOBBY');
  const [arenaMode, setArenaMode] = useState('PvP'); // 'PvP' or 'PvE'
  const [matchDuration, setMatchDuration] = useState(15); // minutes
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  
  const [myPnL, setMyPnL] = useState(0);
  const [opponentPnL, setOpponentPnL] = useState(0);
  
  // Trạng thái Quản lý Tài sản và Đặt lệnh
  const [activeCoin, setActiveCoin] = useState(COINS[0]);
  const [prices, setPrices] = useState(
    COINS.reduce((acc, c) => ({ ...acc, [c.symbol]: c.basePrice }), {})
  );
  const currentPrice = prices[activeCoin.symbol] || activeCoin.basePrice;

  const [orderType, setOrderType] = useState('MANUAL');
  const [riskPercent, setRiskPercent] = useState(1);
  const [slInput, setSlInput] = useState('');
  const [tpInput, setTpInput] = useState('');
  
  // Lệnh thật của người chơi trong trận
  const [myPositions, setMyPositions] = useState([]);
  
  // Chỉ lưu những lệnh đối thủ đã CHỐT
  const [opponentClosedPositions, setOpponentClosedPositions] = useState([]);
  
  const [matchResult, setMatchResult] = useState(null); // WIN, LOSE, DRAW
  const [balanceChangeAmount, setBalanceChangeAmount] = useState(0);
  const [opponentData, setOpponentData] = useState({ name: 'Opponent', avatar: null });
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState(false);

  // Guard: chặn finishMatch bị gọi nhiều lần [A4]
  const finishMatchCalled = useRef(false);
  // Balance tại thời điểm bắt đầu trận (để tính PnL tương đối)
  const battleStartBalance = useRef(balance);
  // [C11] Guard chặn double-click tìm đối thủ
  const isSearching = useRef(false);

  const t = {
    vi: {
      title: "ĐẤU TRƯỜNG 1v1",
      subtitle: "Nơi kỹ năng quyết định tất cả. Kẻ thắng lấy lợi nhuận, người thua mất tiền.",
      findMatch: "TÌM ĐỐI THỦ",
      searching: "Đang tìm đối thủ...",
      cancel: "HỦY",
      modeTitle: "Chế độ chơi",
      pvp: "⚔️ Đấu Người (PvP)",
      pve: "🤖 Đấu Máy (PvE)",
      duration: "Thời gian trận đấu",
      min15: "15 Phút",
      min30: "30 Phút",
      min60: "60 Phút",
      battleRing: "VÒNG ĐẤU SINH TỬ",
      timeLeft: "THỜI GIAN CÒN LẠI",
      myStats: "Thống kê của bạn",
      oppStats: "Thống kê đối thủ",
      hiddenPositions: "Vị thế đang bị ẩn (Chỉ xem được khi kết thúc trận)",
      win: "CHIẾN THẮNG!",
      lose: "THẤT BẠI!",
      draw: "HÒA!",
      returnLobby: "VỀ SẢNH CHỜ",
      manualBtn: "Thủ Công",
      autoBtn: "Bẫy H/L",
      riskLevel: "Mức Rủi Ro",
      slLabel: "Stoploss (Bắt buộc)",
      tpLabel: "Take Profit (Tùy chọn)",
      surrenderBtn: "🏳️ ĐẦU HÀNG",
      surrenderConfirmTitle: "Thật sự muốn đầu hàng?",
      surrenderConfirmMsg: "Bạn sẽ ngay lập tức thua trận này. Đối thủ sẽ được tuyên bố chiến thắng.",
      surrenderConfirmYes: "Xác nhận Đầu Hàng",
      surrenderConfirmNo: "Quay lại chiến đấu",
      surrenderTag: "BỎ CUỘC"
    },
    en: {
      title: "1V1 ARENA",
      subtitle: "Where skills matter. Winner takes profit, loser loses money.",
      findMatch: "FIND MATCH",
      searching: "Searching for opponent...",
      cancel: "CANCEL",
      modeTitle: "Game Mode",
      pvp: "⚔️ Player vs Player",
      pve: "🤖 Player vs AI",
      duration: "Match Duration",
      min15: "15 Mins",
      min30: "30 Mins",
      min60: "60 Mins",
      battleRing: "THE BATTLE RING",
      timeLeft: "TIME REMAINING",
      myStats: "Your Stats",
      oppStats: "Opponent's Stats",
      hiddenPositions: "Positions hidden (Revealed after match)",
      win: "VICTORY!",
      lose: "DEFEAT!",
      draw: "DRAW!",
      returnLobby: "RETURN TO LOBBY",
      manualBtn: "Manual",
      autoBtn: "H/L Trap",
      riskLevel: "Risk Level",
      slLabel: "Stoploss (Required)",
      tpLabel: "Take Profit (Optional)",
      surrenderBtn: "🏳️ SURRENDER",
      surrenderConfirmTitle: "Really want to surrender?",
      surrenderConfirmMsg: "You will immediately lose this match. The opponent will be declared the winner.",
      surrenderConfirmYes: "Confirm Surrender",
      surrenderConfirmNo: "Keep Fighting",
      surrenderTag: "FORFEIT"
    }
  }[lang];

  // [C3] Kết nối Binance WebSocket để lấy giá BTC thật trong trận
  useEffect(() => {
    if (matchState !== 'BATTLE') return;
    // WebSocket cho BTC (giá thật)
    let ws;
    try {
      ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
      ws.onmessage = (e) => {
        const p = parseFloat(JSON.parse(e.data).p);
        if (!isNaN(p)) setPrices(prev => ({ ...prev, BTC: p }));
      };
      ws.onerror = () => { /* silent fail, fallback to random below */ };
    } catch (e) { /* ignore */ }
    // Fallback random cho các coin khác (non-BTC)
    const interval = setInterval(() => {
      setPrices(prev => {
        const next = { ...prev };
        COINS.filter(c => c.symbol !== 'BTC').forEach(c => {
          const p = next[c.symbol] || c.basePrice;
          next[c.symbol] = Number((p + (Math.random() * c.vol * 2) - c.vol).toFixed(2));
        });
        return next;
      });
    }, 1500);
    return () => { if (ws) ws.close(); clearInterval(interval); };
  }, [matchState]);

  // Đồng hồ đếm ngược
  useEffect(() => {
    let timer;
    if (matchState === 'BATTLE' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (matchState === 'BATTLE' && timeLeft === 0) {
      // End game
      finishMatch();
    }
    return () => clearInterval(timer);
  }, [matchState, timeLeft]);

  const getRankLevel = (bal) => {
    if (bal >= 100000) return 4;
    if (bal >= 50000) return 3;
    if (bal >= 20000) return 2;
    return 1;
  };

  const startSearching = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để chơi Đấu Trường.");
      return;
    }
    // [C11] Chặn double-click
    if (isSearching.current) return;
    isSearching.current = true;
    setMatchState('SEARCHING');

    if (arenaMode === 'PvE') {
      window.searchCancelled = false;
      setTimeout(() => {
        if (window.searchCancelled) return;
        setOpponentData({ name: 'Alpha AI Bot', avatar: '🤖' });
        startBattle();
      }, 2000);
      return;
    }

    // PvP Matchmaking via Firestore
    window.searchCancelled = false;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : {};
      const myRank = getRankLevel(balance);
      const myWinRate = userData.arenaWinRate || 50;

      const q = query(
        collection(db, 'matchmaking'),
        where('status', '==', 'WAITING'),
        where('mode', '==', 'PvP'),
        where('rankLevel', 'in', [Math.max(1, myRank - 1), myRank, Math.min(4, myRank + 1)])
      );
      
      const querySnapshot = await getDocs(q);
      let matchedRoomId = null;
      let matchedRoomData = null;

      for (const docSnap of querySnapshot.docs) {
        const room = docSnap.data();
        // Kiểm tra Win Rate tương đương (+- 20%)
        if (Math.abs(room.winRate - myWinRate) <= 20 && room.player1 !== user.uid) {
           matchedRoomId = docSnap.id;
           matchedRoomData = room;
           break;
        }
      }

      if (window.searchCancelled) return;

      if (matchedRoomId) {
        // Tham gia phòng có sẵn
        const roomRef = doc(db, 'matchmaking', matchedRoomId);
        await updateDoc(roomRef, {
          status: 'MATCHED',
          player2: user.uid,
          player2Name: user.displayName || 'Trader',
          player2Avatar: user.photoURL || ''
        });
        
        setOpponentData({ name: matchedRoomData.player1Name, avatar: matchedRoomData.player1Avatar });
        startBattle();
      } else {
        // Tạo phòng mới và đợi
        const roomRef = await addDoc(collection(db, 'matchmaking'), {
          status: 'WAITING',
          mode: 'PvP',
          rankLevel: myRank,
          winRate: myWinRate,
          player1: user.uid,
          player1Name: user.displayName || 'Trader',
          player1Avatar: user.photoURL || '',
          createdAt: new Date().toISOString()
        });

        window.currentRoomId = roomRef.id;

        const unsubscribe = onSnapshot(roomRef, (docSnap) => {
          if (window.searchCancelled) {
             unsubscribe();
             return;
          }
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.status === 'MATCHED' && data.player2) {
              setOpponentData({ name: data.player2Name, avatar: data.player2Avatar });
              startBattle();
              unsubscribe();
            }
          }
        });
        window.currentMatchListener = unsubscribe;
      }
    } catch (e) {
      console.error("Matchmaking error:", e);
      setMatchState('LOBBY');
    }
  };

  const cancelSearch = async () => {
    window.searchCancelled = true;
    setMatchState('LOBBY');
    if (window.currentMatchListener) {
      window.currentMatchListener();
      window.currentMatchListener = null;
    }
    if (window.currentRoomId) {
      try {
        await deleteDoc(doc(db, 'matchmaking', window.currentRoomId));
      } catch (e) {
        console.error("Lỗi xóa room:", e);
      }
      window.currentRoomId = null;
    }
  };

  const startBattle = () => {
    finishMatchCalled.current = false;
    battleStartBalance.current = balance;
    setMatchState('BATTLE');
    setTimeLeft(matchDuration * 60);
    setMyPnL(0);
    setOpponentPnL(0);
    setMyPositions([]);
    setOpponentClosedPositions([]);
  };

  const finishMatch = async (isSurrender = false) => {
    // Guard: tránh gọi nhiều lần [A4]
    if (finishMatchCalled.current) return;
    finishMatchCalled.current = true;
    isSearching.current = false; // [C11] reset guard
    setMatchState('FINISHED');
    let res = 'DRAW';
    let balanceChange = 0;
    
    if (isSurrender) {
      res = 'LOSE';
      // [C2] Surrender penalty: dùng PnL thật nếu có, nếu chưa có lệnh thì phạt cố định 3% balance
      if (opponentPnL !== 0) {
        balanceChange = opponentPnL > 0 ? -(opponentPnL * 0.5) : -Math.abs(opponentPnL);
      } else if (myPnL !== 0) {
        balanceChange = myPnL < 0 ? myPnL : -(balance * 0.03);
      } else {
        // Cả 2 chưa vào lệnh: phạt 3% balance làm phí đầu hàng
        balanceChange = arenaMode === 'PvP' ? -(balance * 0.03) : 0;
      }
    } else {
      if (myPnL > opponentPnL) {
        res = 'WIN';
        if (myPnL > 0) balanceChange = myPnL * 0.5;
        else balanceChange = Math.abs(myPnL); // Cả 2 lỗ, đối thủ bù lỗ cho tôi
      } else if (myPnL < opponentPnL) {
        res = 'LOSE';
        if (opponentPnL > 0) balanceChange = -(opponentPnL * 0.5);
        else balanceChange = -Math.abs(opponentPnL); // Cả 2 lỗ, tôi bù lỗ cho đối thủ
      }
    }

    setMatchResult(res);
    setBalanceChangeAmount(balanceChange);

    if (!user) return;

    if (arenaMode === 'PvP') {
      try {
        const newBalance = balance + balanceChange;
        if (balanceChange !== 0) setBalance(newBalance);
        
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const totalArena = (data.totalArenaMatches || 0) + 1;
          const totalWins = (data.arenaWins || 0) + (res === 'WIN' ? 1 : 0);
          const winRate = (totalWins / totalArena) * 100;
          await updateDoc(userRef, {
            balance: newBalance,
            totalArenaMatches: totalArena,
            arenaWins: totalWins,
            arenaWinRate: winRate
          });
        }
      } catch(e) {
        console.error("Lỗi cập nhật Arena Firebase:", e);
      }
    } else if (arenaMode === 'PvE') {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const totalArena = (data.totalPveMatches || 0) + 1;
          const totalWins = (data.pveWins || 0) + (res === 'WIN' ? 1 : 0);
          const winRate = (totalWins / totalArena) * 100;
          await updateDoc(userRef, {
            totalPveMatches: totalArena,
            pveWins: totalWins,
            pveWinRate: winRate
          });
        }
      } catch(e) {
        console.error("Lỗi cập nhật PvE Firebase:", e);
      }
    }
  };

  const handleSurrender = () => {
    setShowSurrenderConfirm(false);
    // Đóng hết lệnh đang mở trước khi tính kết quả
    if (myPositions.length > 0) {
      let closingPnL = 0;
      myPositions.forEach(pos => {
        const cp = prices[pos.coin] || pos.entryPrice;
        closingPnL += pos.type === 'LONG'
          ? (cp - pos.entryPrice) * pos.volume
          : (pos.entryPrice - cp) * pos.volume;
      });
      setMyPnL(prev => prev + closingPnL);
      setMyPositions([]);
    }
    finishMatch(true);
  };

  // [A2] Hàm vào lệnh LONG/SHORT trong Arena
  const openArenaPosition = (type) => {
    if (matchState !== 'BATTLE') return;
    const sl = Number(slInput);
    const tp = Number(tpInput);
    if (!sl) {
      alert(lang === 'vi' ? 'Bắt buộc phải nhập Stoploss!' : 'Stoploss is required!');
      return;
    }
    const slDiff = Math.abs(currentPrice - sl);
    if (slDiff < 0.0001) {
      alert(lang === 'vi' ? 'SL không được đặt bằng giá hiện tại!' : 'SL cannot equal current price!');
      return;
    }
    const riskAmount = balance * (riskPercent / 100);
    const volume = riskAmount / slDiff;
    const newPos = {
      id: Date.now() + Math.random(),
      type,
      coin: activeCoin.symbol,
      entryPrice: currentPrice,
      sl,
      tp: tp || null,
      volume,
    };
    setMyPositions(prev => [...prev, newPos]);
  };

  // [A2] Tính PnL thời gian thực từ các lệnh đang mở
  useEffect(() => {
    if (matchState !== 'BATTLE' || myPositions.length === 0) return;
    const livePnL = myPositions.reduce((acc, pos) => {
      const cp = prices[pos.coin] || pos.entryPrice;
      const pnl = pos.type === 'LONG'
        ? (cp - pos.entryPrice) * pos.volume
        : (pos.entryPrice - cp) * pos.volume;
      return acc + pnl;
    }, 0);
    setMyPnL(Math.round(livePnL * 100) / 100);
  }, [prices, myPositions, matchState]);

  // [A2] Quét SL/TP lệnh trong Arena
  useEffect(() => {
    if (matchState !== 'BATTLE' || myPositions.length === 0) return;
    let kept = [];
    let closedPnL = 0;
    let hadClose = false;
    myPositions.forEach(pos => {
      const cp = prices[pos.coin] || pos.entryPrice;
      let hit = false;
      if (pos.type === 'LONG') {
        if (pos.sl && cp <= pos.sl) hit = true;
        else if (pos.tp && cp >= pos.tp) hit = true;
      } else {
        if (pos.sl && cp >= pos.sl) hit = true;
        else if (pos.tp && cp <= pos.tp) hit = true;
      }
      if (hit) {
        const pnl = pos.type === 'LONG'
          ? (cp - pos.entryPrice) * pos.volume
          : (pos.entryPrice - cp) * pos.volume;
        closedPnL += pnl;
        hadClose = true;
      } else {
        kept.push(pos);
      }
    });
    if (hadClose) {
      setMyPositions(kept);
      setMyPnL(prev => Math.round((prev + closedPnL) * 100) / 100);
    }
  }, [prices, matchState]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER TỔNG */}
      <div className="bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl p-6 shadow-xl text-center">
        <h1 className="text-3xl font-black text-[#1C2C44] dark:text-white uppercase tracking-widest flex items-center justify-center gap-3">
          <Swords className="text-[#F6465D]" size={32} /> {t.title} <Swords className="text-[#F6465D]" size={32} />
        </h1>
        <p className="text-[#636878] dark:text-[#848E9C] mt-2 font-bold">{t.subtitle}</p>
      </div>

      {matchState === 'LOBBY' && (
        <div className="max-w-xl mx-auto bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl p-8 shadow-lg text-center">
          
          <h2 className="text-xl font-bold mb-4 text-[#1C2C44] dark:text-white uppercase">{t.modeTitle}</h2>
          <div className="flex bg-[#faf9f6] dark:bg-[#0B0E11] p-1 rounded-xl mb-8 border border-[rgba(15,17,23,0.05)] dark:border-[rgba(255,255,255,0.05)]">
            <button 
              onClick={() => setArenaMode('PvP')} 
              className={`flex-1 py-3 rounded-lg font-black uppercase text-xs md:text-sm transition-all ${arenaMode === 'PvP' ? 'bg-gradient-to-r from-[#F6465D] to-[#D92643] text-white shadow-md' : 'text-[#636878] dark:text-[#848E9C] hover:text-[#1C2C44] dark:hover:text-white'}`}
            >
              {t.pvp}
            </button>
            <button 
              onClick={() => setArenaMode('PvE')} 
              className={`flex-1 py-3 rounded-lg font-black uppercase text-xs md:text-sm transition-all ${arenaMode === 'PvE' ? 'bg-gradient-to-r from-[#0ECB81] to-[#0A9D63] text-white shadow-md' : 'text-[#636878] dark:text-[#848E9C] hover:text-[#1C2C44] dark:hover:text-white'}`}
            >
              {t.pve}
            </button>
          </div>

          {/* MÔ TẢ CHI TIẾT TỪNG CHẾ ĐỘ */}
          {arenaMode === 'PvP' ? (
            <div className="mb-6 text-left bg-[#F6465D]/5 dark:bg-[#F6465D]/10 border border-[#F6465D]/20 rounded-2xl p-5 space-y-3 animate-in fade-in duration-300">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#F6465D] mb-2">⚔️ {lang === 'vi' ? 'Luật Đấu PvP — Thực Chiến Sinh Tử' : 'PvP Rules — Real Stakes'}</p>
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <span className="text-[#0ECB81] font-black text-sm shrink-0">✓</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'Ghép cặp công bằng: Rank ±1 + Win Rate tương đương.' : 'Fair matchmaking: Rank ±1 + similar Win Rate.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0ECB81] font-black text-sm shrink-0">✓</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'So sánh tổng lợi nhuận sinh ra trong trận (không tính vốn gốc).' : 'Compare total profit generated during the match (excluding starting capital).'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-black text-sm shrink-0">🏆</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'Người thắng nhận 50% lợi nhuận của bên thắng từ túi người thua.' : 'Winner receives 50% of their profit, deducted from the loser.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#F6465D] font-black text-sm shrink-0">⚠</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'Cả 2 cùng lỗ: Người lỗ nhiều hơn bù lỗ cho người lỗ ít hơn.' : 'Both lose: The bigger loser compensates the smaller loser.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#F6465D] font-black text-sm shrink-0">🚫</span>
                  <p className="text-xs font-bold text-[#636878] dark:text-[#848E9C]">
                    {lang === 'vi' ? 'Thắng/thua sẽ cộng/trừ tiền thật vào tài khoản ngay lập tức.' : 'Win/loss directly affects your real account balance.'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 text-left bg-[#0ECB81]/5 dark:bg-[#0ECB81]/10 border border-[#0ECB81]/20 rounded-2xl p-5 space-y-3 animate-in fade-in duration-300">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0ECB81] mb-2">🤖 {lang === 'vi' ? 'Luật Đấu PvE — Luyện Tập An Toàn' : 'PvE Rules — Safe Practice'}</p>
              <div className="space-y-2 text-left">
                <div className="flex items-start gap-2">
                  <span className="text-[#0ECB81] font-black text-sm shrink-0">✓</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'Đối thủ là AI Bot được tùy chỉnh theo Rank + Win Rate của bạn.' : 'Opponent is an AI Bot calibrated to your Rank & Win Rate.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0ECB81] font-black text-sm shrink-0">✓</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'Bot học hỏi từ thao tác và tâm lý giao dịch của bạn.' : 'Bot learns from your trading patterns and psychology.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0ECB81] font-black text-sm shrink-0">🛡️</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'Kết quả thắng/thua KHÔNG ảnh hưởng đến số dư tài khoản.' : 'Match result does NOT affect your account balance.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-black text-sm shrink-0">📊</span>
                  <p className="text-xs font-bold text-[#1C2C44] dark:text-[#e8eaf0]">
                    {lang === 'vi' ? 'Thống kê PvE (số trận, win rate) được ghi nhận riêng trong Hồ Sơ.' : 'PvE stats (matches, win rate) tracked separately in your Profile.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#636878] font-black text-sm shrink-0">💡</span>
                  <p className="text-xs font-bold text-[#636878] dark:text-[#848E9C]">
                    {lang === 'vi' ? 'Lý tưởng để làm nóng trước khi bước vào đấu trường PvP thật sự.' : 'Ideal warm-up before entering real PvP battles.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-xl font-bold mb-6 text-[#1C2C44] dark:text-white uppercase">{t.duration}</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[15, 30, 60].map(time => (
              <button 
                key={time}
                onClick={() => setMatchDuration(time)}
                className={`py-3 rounded-xl font-black transition-all border ${matchDuration === time ? 'bg-[#F6465D]/10 text-[#F6465D] border-[#F6465D]' : 'bg-transparent text-[#636878] dark:text-[#848E9C] border-[#2B3139] hover:border-[#F6465D]/50'}`}
              >
                {time} {lang === 'vi' ? 'Phút' : 'Mins'}
              </button>
            ))}
          </div>
          <button 
            onClick={startSearching}
            className="w-full py-4 bg-gradient-to-r from-[#F6465D] to-[#D92643] text-white rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(246,70,93,0.4)]"
          >
            {t.findMatch}
          </button>
        </div>
      )}

      {matchState === 'SEARCHING' && (
        <div className="max-w-xl mx-auto bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl p-12 shadow-lg text-center flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#F6465D] border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-black text-[#1C2C44] dark:text-white uppercase animate-pulse mb-6">{t.searching}</h2>
          <button 
            onClick={cancelSearch}
            className="px-8 py-3 bg-[#111827] dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            {t.cancel}
          </button>
        </div>
      )}

      {(matchState === 'BATTLE' || matchState === 'FINISHED') && (
        <div className="space-y-6 relative">
          
          {matchState === 'FINISHED' && (
            <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white rounded-2xl">
              <h1 className={`text-6xl font-black uppercase tracking-widest mb-4 ${matchResult === 'WIN' ? 'text-[#0ECB81]' : matchResult === 'LOSE' ? 'text-[#F6465D]' : 'text-[#FCD535]'}`}>
                {matchResult === 'WIN' ? t.win : matchResult === 'LOSE' ? t.lose : t.draw}
              </h1>
              {arenaMode === 'PvP' && balanceChangeAmount !== 0 && (
                <p className={`text-2xl font-bold mb-6 font-mono ${balanceChangeAmount > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                  {balanceChangeAmount > 0 ? '+' : ''}{balanceChangeAmount.toLocaleString()} $
                </p>
              )}
              {arenaMode === 'PvE' && (
                <p className="text-sm font-bold mb-6 text-gray-400">
                  (Chế độ PvE: Không thay đổi tài sản)
                </p>
              )}
              <button onClick={() => setMatchState('LOBBY')} className="px-8 py-3 bg-white text-black rounded-full font-black uppercase hover:scale-105 transition-transform">
                {t.returnLobby}
              </button>
            </div>
          )}

          {/* BATTLE RING HEADER - Bảng điểm chung phía trên */}
          <div className="bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl p-4 shadow-lg flex justify-center items-center relative overflow-hidden">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-[#636878] dark:text-[#848E9C] uppercase tracking-widest">{t.timeLeft}</span>
              <span className={`text-4xl font-mono font-black text-[#F6465D] drop-shadow-[0_0_10px_rgba(246,70,93,0.4)] ${matchState === 'FINISHED' ? 'animate-pulse' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            {matchState === 'BATTLE' && (
              <button
                onClick={() => setShowSurrenderConfirm(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-xl border border-[#F6465D]/40 bg-[#F6465D]/10 text-[#F6465D] text-xs font-black uppercase tracking-widest hover:bg-[#F6465D]/20 hover:border-[#F6465D] hover:scale-105 active:scale-95 transition-all duration-150 shadow-sm"
              >
                <Flag size={14} />
                {t.surrenderBtn}
              </button>
            )}
          </div>

          {/* SURRENDER CONFIRM DIALOG */}
          {showSurrenderConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowSurrenderConfirm(false)}
              />
              {/* Modal */}
              <div className="relative z-10 bg-[#111827] border border-[#F6465D]/60 rounded-3xl p-8 max-w-sm w-full mx-4 shadow-[0_0_60px_rgba(246,70,93,0.35)] animate-in zoom-in-90 fade-in duration-200">
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full bg-[#F6465D]/15 border-2 border-[#F6465D]/50 flex items-center justify-center">
                    <Flag size={28} className="text-[#F6465D]" />
                  </div>
                </div>
                {/* Tag */}
                <p className="text-[10px] font-black tracking-[0.25em] text-[#F6465D] uppercase text-center mb-2">{t.surrenderTag}</p>
                {/* Title */}
                <h2 className="text-xl font-black text-white text-center mb-3 leading-snug">{t.surrenderConfirmTitle}</h2>
                {/* Message */}
                <p className="text-sm text-[#848E9C] text-center mb-8 leading-relaxed">{t.surrenderConfirmMsg}</p>
                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSurrender}
                    className="w-full py-3.5 bg-gradient-to-r from-[#F6465D] to-[#D92643] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(246,70,93,0.4)]"
                  >
                    {t.surrenderConfirmYes}
                  </button>
                  <button
                    onClick={() => setShowSurrenderConfirm(false)}
                    className="w-full py-3 border border-[#2B3139] text-[#848E9C] rounded-2xl font-black uppercase tracking-widest text-sm hover:border-[#0ECB81] hover:text-[#0ECB81] hover:scale-105 active:scale-95 transition-all"
                  >
                    {t.surrenderConfirmNo}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SPLIT SCREEN LAYOUT THỰC SỰ (2/3 vs 1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CỘT TRÁI (2/3): TÍNH NĂNG CỦA TÔI */}
            <div className="lg:col-span-2 flex flex-col space-y-4">
              
              {/* 1. CHỌN MÃ */}
              <div className="flex flex-wrap gap-2">
                {COINS.map(c => (
                  <button key={c.symbol} onClick={() => setActiveCoin(c)} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeCoin.symbol === c.symbol ? 'bg-gradient-to-br from-[#F6465D] to-[#D92643] text-white shadow-md' : 'bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] text-[#636878] dark:text-[#848E9C]'}`}>{c.symbol}</button>
                ))}
              </div>

              {/* 2. CHART CỦA TÔI */}
              <div className="bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl overflow-hidden shadow-lg flex-1 min-h-[450px] flex flex-col">
                <div className="p-3 border-b border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] flex justify-between bg-[#faf9f6] dark:bg-[#0B0E11]">
                  <h2 className="font-bold text-[#0f1117] dark:text-white flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#F6465D] animate-pulse"></span> {activeCoin.name}
                  </h2>
                  <span className="font-mono font-bold text-[#F6465D] text-lg">${currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex-1 min-h-[450px]">
                  <AdvancedRealTimeChart key={`my-${activeCoin.tvSymbol}-${isDarkMode ? "dark" : "light"}`} theme={isDarkMode ? "dark" : "light"} symbol={activeCoin.tvSymbol} interval="15" autosize hide_top_toolbar={false} hide_side_toolbar={false} />
                </div>
              </div>

              {/* 3 & 4. BOX VÀO LỆNH + DAO ĐỘNG TÀI SẢN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 {/* ORDER BOX */}
                 <div className="bg-[#fff] dark:bg-[#111827] p-5 rounded-2xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] shadow-lg flex flex-col">
                    <h3 className="font-black text-[#1C2C44] dark:text-white mb-4 uppercase flex items-center gap-2 text-sm"><Swords size={16} className="text-[#F6465D]"/> Vào Lệnh</h3>
                    
                    <div className="mb-4">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#636878] dark:text-[#848E9C] flex justify-between mb-2">
                        <span>{t.riskLevel}</span> 
                        <span className="text-[#F6465D] bg-[#F6465D]/10 px-2 py-0.5 rounded">{riskPercent}%</span>
                      </label>
                      <input type="range" min="0.5" max="5" step="0.5" value={riskPercent} onChange={(e) => setRiskPercent(Number(e.target.value))} className="w-full accent-[#F6465D]" />
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="text-[9px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">{t.slLabel}</label>
                        <input type="number" value={slInput} onChange={e => setSlInput(e.target.value)} className="w-full bg-[#faf9f6] dark:bg-[#0B0E11] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] p-2 text-xs text-[#0f1117] dark:text-white rounded-lg focus:border-[#F6465D] focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-[9px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">{t.tpLabel}</label>
                        <input type="number" value={tpInput} onChange={e => setTpInput(e.target.value)} className="w-full bg-[#faf9f6] dark:bg-[#0B0E11] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] p-2 text-xs text-[#0f1117] dark:text-white rounded-lg focus:border-[#0ECB81] focus:outline-none" />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => openArenaPosition('LONG')} className="flex-1 bg-[#0ECB81]/10 border border-[#0ECB81]/30 hover:border-[#0ECB81] text-[#0ECB81] py-3 rounded-xl font-black text-xs tracking-wider transition-all active:scale-95">LONG</button>
                      <button onClick={() => openArenaPosition('SHORT')} className="flex-1 bg-[#F6465D]/10 border border-[#F6465D]/30 hover:border-[#F6465D] text-[#F6465D] py-3 rounded-xl font-black text-xs tracking-wider transition-all active:scale-95">SHORT</button>
                    </div>
                 </div>
                 
                 {/* MY POSITIONS & PNL */}
                 <div className="bg-[#fff] dark:bg-[#111827] border border-[#0ECB81]/30 rounded-2xl p-5 shadow-lg flex flex-col h-[280px]">
                    <div className="flex justify-between items-center mb-4 shrink-0">
                      <h3 className="font-black text-[#0ECB81] uppercase flex items-center gap-2 text-sm"><Trophy size={16} /> Tài sản & Lệnh</h3>
                      <span className="text-xl font-mono font-black text-[#0ECB81]">{myPnL >= 0 ? '+' : ''}{myPnL}</span>
                    </div>
                    <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
                      {myPositions.map(pos => {
                        const cp = prices[pos.coin] || pos.entryPrice;
                        const livePnl = pos.type === 'LONG'
                          ? (cp - pos.entryPrice) * pos.volume
                          : (pos.entryPrice - cp) * pos.volume;
                        return (
                          <div key={pos.id} className="bg-[#faf9f6] dark:bg-[#0B0E11] p-3 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${pos.type === 'LONG' ? 'bg-[#0ECB81]/10 text-[#0ECB81]' : 'bg-[#F6465D]/10 text-[#F6465D]'}`}>{pos.type}</span>
                              <span className="font-bold text-xs">{pos.coin}</span>
                            </div>
                            <span className={`font-mono font-bold text-xs ${livePnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>{livePnl >= 0 ? '+' : ''}{livePnl.toFixed(2)}</span>
                          </div>
                        );
                      })}
                      {myPositions.length === 0 && <div className="text-center text-xs text-[#636878] dark:text-[#848E9C] py-2">Chưa có lệnh mở</div>}
                    </div>
                 </div>

              </div>
            </div>

            {/* CỘT PHẢI (1/3): ĐỐI THỦ */}
            <div className="lg:col-span-1 flex flex-col space-y-4">
              
              {/* OPPONENT INFO & TOTAL PNL */}
              <div className="bg-[#fff] dark:bg-[#111827] border border-[#F6465D]/30 rounded-2xl p-4 shadow-lg flex justify-between items-center shrink-0">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F6465D]/20 rounded-full flex items-center justify-center shrink-0 overflow-hidden text-xl">
                      {opponentData.avatar && opponentData.avatar.startsWith('http') ? (
                        <img src={opponentData.avatar} alt="avatar" className="w-full h-full object-cover" />
                      ) : opponentData.avatar ? (
                        opponentData.avatar
                      ) : (
                        <Users size={20} className="text-[#F6465D]" />
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#636878] dark:text-[#848E9C] uppercase">{t.oppStats}</div>
                      <div className="font-bold text-sm text-[#1C2C44] dark:text-white truncate max-w-[80px]">{opponentData.name || 'Ẩn danh'}</div>
                    </div>
                 </div>
                 <span className="text-2xl font-mono font-black text-[#F6465D] shrink-0">{opponentPnL >= 0 ? '+' : ''}{opponentPnL}</span>
              </div>

              {/* OPPONENT CHART */}
              <div className="bg-[#fff] dark:bg-[#111827] border border-[#F6465D]/30 rounded-2xl overflow-hidden shadow-lg flex-1 min-h-[300px] flex flex-col">
                 <div className="p-2 border-b border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] bg-[#faf9f6] dark:bg-[#0B0E11] flex items-center gap-2">
                    <Eye size={14} className="text-[#F6465D]" />
                    <h2 className="font-bold text-[#1C2C44] dark:text-white text-[11px] uppercase">
                      Đối thủ đang xem: BTC
                    </h2>
                 </div>
                 <div className="flex-1 pointer-events-none opacity-80 min-h-[250px]">
                   <AdvancedRealTimeChart key={`opp-BINANCE:BTCUSDT-${isDarkMode ? "dark" : "light"}`} theme={isDarkMode ? "dark" : "light"} symbol="BINANCE:BTCUSDT" interval="15" autosize hide_top_toolbar={true} hide_side_toolbar={true} hide_legend={true} />
                 </div>
              </div>

              {/* OPPONENT CLOSED POSITIONS (Chỉ hiện khi đã ăn/lỗ) */}
              <div className="bg-[#fff] dark:bg-[#111827] border border-[#F6465D]/30 rounded-2xl p-4 shadow-lg flex-1 flex flex-col min-h-[250px]">
                 <div className="shrink-0 mb-3">
                   <h3 className="font-black text-[#F6465D] uppercase flex items-center gap-2 text-sm mb-1"><Crosshair size={16} /> Lịch sử lệnh đối thủ</h3>
                   <p className="text-[10px] font-bold text-[#636878] dark:text-[#848E9C]">* Chỉ hiện lệnh khi đối thủ đã chốt (ăn/lỗ).</p>
                 </div>
                 
                 <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
                    {opponentClosedPositions.map(pos => (
                      <div key={pos.id} className="bg-[#faf9f6] dark:bg-[#0B0E11] p-3 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] flex justify-between items-center text-sm animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${pos.type === 'LONG' ? 'bg-[#0ECB81]/10 text-[#0ECB81]' : 'bg-[#F6465D]/10 text-[#F6465D]'}`}>{pos.type}</span>
                          <span className="font-bold">{pos.coin}</span>
                        </div>
                        <span className={`font-mono font-bold ${pos.pnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>{pos.pnl >= 0 ? '+' : ''}{pos.pnl}</span>
                      </div>
                    ))}
                    {opponentClosedPositions.length === 0 && <div className="text-center text-xs text-[#636878] dark:text-[#848E9C] py-4">Chưa có lệnh nào được chốt</div>}
                 </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Arena;
