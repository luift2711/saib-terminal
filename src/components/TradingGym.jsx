import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw, BarChart2, AlertTriangle, TrendingUp, TrendingDown, MinusCircle, Dices, PartyPopper, Dumbbell, Library, Trophy, Users, Radio, ShoppingCart, BookOpen, Zap, Landmark, DollarSign, Brain, Scale, FileText, Clock, Lightbulb, Lock, ArrowRight, Skull, Flame, Edit2, Compass, Star, Shield, Activity, Flag, Award, Crosshair, Hammer, Wind, Eye, Sun, Moon, Briefcase } from 'lucide-react';

import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const COINS = [
  { symbol: 'BTC', tvSymbol: 'BINANCE:BTCUSDT', name: 'Bitcoin', type: 'crypto', basePrice: 65000 },
  { symbol: 'VNINDEX', tvSymbol: 'HOSE:VNINDEX', name: 'Chỉ số VN-Index', type: 'stock', basePrice: 1250.5, vol: 1.5 },
  { symbol: 'VIC', tvSymbol: 'HOSE:VIC', name: 'Vingroup', type: 'stock', basePrice: 42500, vol: 150 },
  { symbol: 'NVDA', tvSymbol: 'NASDAQ:NVDA', name: 'NVIDIA Corp', type: 'stock', basePrice: 950.5, vol: 1.2 },
  { symbol: 'US30', tvSymbol: 'CAPITALCOM:US30', name: 'Dow Jones (US30)', type: 'stock', basePrice: 39500, vol: 12 },
  { symbol: 'XAU/USD', tvSymbol: 'OANDA:XAUUSD', name: 'Vàng Giao Ngay', type: 'forex', basePrice: 2350.5, vol: 0.8 }
];

// --- THÔNG SỐ LUẬT QUỸ ---
const INITIAL_BALANCE = 10000;
const PROFIT_TARGET_PERCENT = 10; // Mục tiêu BƯỚC 1: 10%
const DAILY_LOSS_PERCENT = 5;     // Lỗ tối đa ngày: 5%
const MAX_LOSS_PERCENT = 10;      // Lỗ tối đa tổng: 10%

const TradingGym = ({ balance, setBalance, isDarkMode, lang = 'vi' }) => {
  const [activeCoin, setActiveCoin] = useState(COINS[0]);
  
  // Trạng thái Quản lý Nhiều Tài sản
  const [prices, setPrices] = useState(
    COINS.reduce((acc, c) => ({ ...acc, [c.symbol]: c.basePrice }), {})
  );
  const currentPrice = prices[activeCoin.symbol] || activeCoin.basePrice;

  const [positions, setPositions] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  const dict = {
    vi: {
      failAlert: 'Sếp đã bị tước quyền thi quỹ. Vui lòng Reset!',
      slAlert: 'Kỷ luật thép: Bắt buộc nhập Stoploss!',
      hlAlert: "Nhập đủ High/Low của nến tín hiệu!",
      passTitle: "VƯỢT QUA BƯỚC 1",
      failTitle: "VI PHẠM LUẬT QUỸ",
      failDailyDesc: "Lỗi: Vượt quá mức lỗ tối đa trong ngày (5%)",
      failMaxDesc: "Lỗi: Vượt quá mức lỗ tối đa tài khoản (10%)",
      passDesc: "Tuyệt vời! Sếp đã đạt mục tiêu lợi nhuận 10% an toàn.",
      resetBtn: "Thử Lại (Reset Account)",
      profitTarget: "Mục Tiêu Lợi Nhuận (10%)",
      dailyLoss: "Lỗ Tối Đa Ngày (5%)",
      maxLoss: "Lỗ Tối Đa (10%)",
      manualBtn: "Thủ Công",
      autoBtn: "Bẫy H/L",
      riskLevel: "Mức Rủi Ro",
      slLabel: "Stoploss (Bắt buộc)",
      tpLabel: "Take Profit (Tùy chọn)",
      waitLabel: "⏳ Chờ",
      cancelBtn: "Hủy",
      closeBtn: "Chốt"
    },
    en: {
      failAlert: 'You have been disqualified. Please Reset!',
      slAlert: 'Iron Discipline: Stoploss is mandatory!',
      hlAlert: "Enter both High and Low of the signal candle!",
      passTitle: "PASSED PHASE 1",
      failTitle: "CHALLENGE FAILED",
      failDailyDesc: "Error: Exceeded daily max loss (5%)",
      failMaxDesc: "Error: Exceeded max loss (10%)",
      passDesc: "Excellent! You have safely reached the 10% profit target.",
      resetBtn: "Try Again (Reset)",
      profitTarget: "Profit Target (10%)",
      dailyLoss: "Daily Max Loss (5%)",
      maxLoss: "Max Loss (10%)",
      manualBtn: "Manual",
      autoBtn: "H/L Trap",
      riskLevel: "Risk Level",
      slLabel: "Stoploss (Required)",
      tpLabel: "Take Profit (Optional)",
      waitLabel: "⏳ Waiting",
      cancelBtn: "Cancel",
      closeBtn: "Close"
    }
  };
  const t = dict[lang];

  // Trạng thái Form Đặt lệnh
  const [orderType, setOrderType] = useState('MANUAL');
  const [riskPercent, setRiskPercent] = useState(1);
  const [slInput, setSlInput] = useState('');
  const [tpInput, setTpInput] = useState('');
  const [highInput, setHighInput] = useState('');
  const [lowInput, setLowInput] = useState('');
  const [bufferInput, setBufferInput] = useState('10');
  const [rrInput, setRrInput] = useState('2');

  const [challengeStatus, setChallengeStatus] = useState('ACTIVE');

  // Tính PnL cho TẤT CẢ lệnh đang mở
  const totalPnL = positions.reduce((acc, pos) => {
    const cp = prices[pos.coin] || pos.entryPrice;
    if (pos.type === 'LONG') return acc + (cp - pos.entryPrice) * pos.volume;
    return acc + (pos.entryPrice - cp) * pos.volume;
  }, 0);
  
  const equity = balance + totalPnL;

  // Giới hạn
  const profitTarget = INITIAL_BALANCE * (1 + PROFIT_TARGET_PERCENT / 100);
  const maxDailyLossLimit = INITIAL_BALANCE * (1 - DAILY_LOSS_PERCENT / 100);
  const maxTotalLossLimit = INITIAL_BALANCE * (1 - MAX_LOSS_PERCENT / 100);

  // 1. CẬP NHẬT GIÁ LIVE CHO TẤT CẢ COIN
  useEffect(() => {
    let ws; 
    const btc = COINS.find(c => c.symbol === 'BTC');
    if (btc) {
      ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`);
      ws.onmessage = (e) => {
        const p = parseFloat(JSON.parse(e.data).p);
        setPrices(prev => ({ ...prev, BTC: p }));
      };
    }

    const interval = setInterval(() => {
      setPrices(prev => {
        const next = { ...prev };
        COINS.filter(c => c.type !== 'crypto').forEach(c => {
          const p = next[c.symbol];
          next[c.symbol] = Number((p + (Math.random() * c.vol * 2) - c.vol).toFixed(2));
        });
        return next;
      });
    }, 1500);

    return () => { if (ws) ws.close(); clearInterval(interval); };
  }, []);

  // 2. LÒ LÕI QUÉT LỆNH
  useEffect(() => {
    if (challengeStatus !== 'ACTIVE') return;

    // A. Quét Luật Quỹ
    if (equity <= maxTotalLossLimit) {
      setChallengeStatus('FAILED_MAX');
      if (positions.length > 0) { setBalance(equity); setPositions([]); setPendingOrders([]); }
      return;
    }

    // B. Quét Lệnh Chờ
    if (pendingOrders.length > 0) {
      let remaining = [];
      let triggered = [];
      pendingOrders.forEach(order => {
        const cp = prices[order.coin] || order.entryPrice;
        let hit = false;
        if (order.type === 'LONG' && cp >= order.entryPrice) hit = true;
        if (order.type === 'SHORT' && cp <= order.entryPrice) hit = true;
        
        if (hit) triggered.push({ ...order, time: new Date().toLocaleTimeString() });
        else remaining.push(order);
      });
      if (triggered.length > 0) {
        setPositions(prev => [...prev, ...triggered]);
        setPendingOrders(remaining);
      }
    }

    // C. Quét SL/TP
    if (positions.length > 0) {
      let closed = [];
      let kept = [];
      let newBalance = balance;

      positions.forEach(pos => {
        const cp = prices[pos.coin] || pos.entryPrice;
        let isHit = false;
        if (pos.type === 'LONG') {
          if (pos.sl && cp <= pos.sl) isHit = true;
          else if (pos.tp && cp >= pos.tp) isHit = true;
        } else {
          if (pos.sl && cp >= pos.sl) isHit = true;
          else if (pos.tp && cp <= pos.tp) isHit = true;
        }

        if (isHit) {
          const pnl = pos.type === 'LONG' ? (cp - pos.entryPrice) * pos.volume : (pos.entryPrice - cp) * pos.volume;
          newBalance += pnl;
          closed.push(pos);
        } else {
          kept.push(pos);
        }
      });

      if (closed.length > 0) {
        setBalance(newBalance);
        setPositions(kept);
      }
    }
  }, [prices, positions, pendingOrders, equity, balance, setBalance, challengeStatus, maxTotalLossLimit]);

  // 3. HÀM VÀO LỆNH
  const openManualPosition = (type) => {
    if (challengeStatus !== 'ACTIVE') return alert(t.failAlert);
    const sl = Number(slInput); const tp = Number(tpInput);
    if (!sl) return alert(t.slAlert);

    const riskAmount = balance * (riskPercent / 100);
    const volume = riskAmount / Math.abs(currentPrice - sl);
    setPositions(prev => [...prev, { id: Date.now() + Math.random(), type, entryPrice: currentPrice, coin: activeCoin.symbol, sl, tp, volume, riskAmount }]);
  };

  const placePendingOrder = (type) => {
    if (challengeStatus !== 'ACTIVE') return alert(t.failAlert);
    const H = Number(highInput); const L = Number(lowInput); const buffer = Number(bufferInput); const rr = Number(rrInput);
    if (!H || !L) return alert(t.hlAlert);
    
    let entry, sl, tp;
    if (type === 'LONG') { entry = H + buffer; sl = L - buffer; tp = entry + ((entry - sl) * rr); } 
    else { entry = L - buffer; sl = H + buffer; tp = entry - ((sl - entry) * rr); }

    // KIỂM TRA CHỐNG CẮN LỆNH LẬP TỨC
    if (type === 'LONG' && currentPrice >= entry) {
      return alert(`❌ Lỗi đặt lệnh: Giá hiện tại ($${currentPrice.toLocaleString()}) đã CAO HƠN điểm vào lệnh ($${entry.toLocaleString()}). \nLệnh BUY STOP phải được đặt cao hơn giá hiện tại!`);
    }
    if (type === 'SHORT' && currentPrice <= entry) {
      return alert(`❌ Lỗi đặt lệnh: Giá hiện tại ($${currentPrice.toLocaleString()}) đã THẤP HƠN điểm vào lệnh ($${entry.toLocaleString()}). \nLệnh SELL STOP phải được đặt thấp hơn giá hiện tại!`);
    }
    
    const riskAmount = balance * (riskPercent / 100);
    const volume = riskAmount / Math.abs(entry - sl);
    setPendingOrders(prev => [...prev, { id: Date.now() + Math.random(), type, entryPrice: entry, coin: activeCoin.symbol, sl, tp, volume, riskAmount }]);
  };

  const closePositionManual = (id) => {
    const pos = positions.find(p => p.id === id);
    if (!pos) return;
    const cp = prices[pos.coin] || pos.entryPrice;
    const pnl = pos.type === 'LONG' ? (cp - pos.entryPrice) * pos.volume : (pos.entryPrice - cp) * pos.volume;
    setBalance(prev => prev + pnl);
    setPositions(prev => prev.filter(p => p.id !== id));
  };

  const resetChallenge = () => {
    setBalance(INITIAL_BALANCE);
    setPositions([]);
    setPendingOrders([]);
    setChallengeStatus('ACTIVE');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* THANH TRẠNG THÁI QUỸ */}
      <div className="bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {challengeStatus !== 'ACTIVE' && (
           <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm ${challengeStatus === 'PASSED' ? 'bg-[#0ECB81]/20' : 'bg-[#F6465D]/20'}`}>
              <h2 className={`text-4xl font-black mb-2 tracking-widest uppercase ${challengeStatus === 'PASSED' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                {challengeStatus === 'PASSED' ? <><Trophy size={18} className="inline mr-1 text-yellow-500" /> {t.passTitle}</> : <><Skull size={24} className="inline mr-1"/> {t.failTitle}</>}
              </h2>
              <p className="text-[#0f1117] dark:text-white font-bold mb-6">
                {challengeStatus === 'FAILED_DAILY' ? t.failDailyDesc : 
                 challengeStatus === 'FAILED_MAX' ? t.failMaxDesc : 
                 t.passDesc}
              </p>
              <button onClick={resetChallenge} className="bg-[#0f1117] dark:bg-white text-white dark:text-black font-black px-8 py-3 rounded-full hover:scale-105 transition-transform uppercase">{t.resetBtn}</button>
           </div>
        )}

        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#378ADD]/20 text-[#378ADD] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">Phase 1 Challenge</span>
              <h2 className="text-xl font-bold text-[#0f1117] dark:text-white">SAIB.Funding</h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider block">Current Equity</span>
              <span className={`text-3xl font-mono font-black ${equity >= INITIAL_BALANCE ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                ${equity.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#faf9f6] dark:bg-[#0B0E11] p-4 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]">
               <div className="flex justify-between text-xs mb-2">
                 <span className="text-[#636878] dark:text-[#848E9C]">{t.profitTarget}</span>
                 <span className="text-[#0ECB81] font-bold">${profitTarget.toLocaleString()}</span>
               </div>
               <div className="w-full bg-[#fff] dark:bg-[#111827] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0ECB81] h-full transition-all" style={{width: `${Math.max(0, Math.min(100, ((equity - INITIAL_BALANCE) / (profitTarget - INITIAL_BALANCE)) * 100))}%`}}></div>
               </div>
            </div>
            <div className="bg-[#faf9f6] dark:bg-[#0B0E11] p-4 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]">
               <div className="flex justify-between text-xs mb-2">
                 <span className="text-[#636878] dark:text-[#848E9C]">{t.dailyLoss}</span>
                 <span className="text-[#d97706] dark:text-[#00d084] font-bold">${maxDailyLossLimit.toLocaleString()}</span>
               </div>
               <div className="w-full bg-[#fff] dark:bg-[#111827] h-2 rounded-full overflow-hidden flex justify-end">
                  <div className="bg-[#d97706] dark:bg-[#00d084] h-full transition-all" style={{width: `${Math.max(0, Math.min(100, ((INITIAL_BALANCE - equity) / (INITIAL_BALANCE * DAILY_LOSS_PERCENT / 100)) * 100))}%`}}></div>
               </div>
            </div>
            <div className="bg-[#faf9f6] dark:bg-[#0B0E11] p-4 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]">
               <div className="flex justify-between text-xs mb-2">
                 <span className="text-[#636878] dark:text-[#848E9C]">{t.maxLoss}</span>
                 <span className="text-[#F6465D] font-bold">${maxTotalLossLimit.toLocaleString()}</span>
               </div>
               <div className="w-full bg-[#fff] dark:bg-[#111827] h-2 rounded-full overflow-hidden flex justify-end">
                  <div className="bg-[#F6465D] h-full transition-all" style={{width: `${Math.max(0, Math.min(100, ((INITIAL_BALANCE - equity) / (INITIAL_BALANCE * MAX_LOSS_PERCENT / 100)) * 100))}%`}}></div>
               </div>
            </div>
        </div>
      </div>

      {/* COIN SELECTOR */}
      <div className="flex flex-wrap gap-2">
        {COINS.map(c => (
          <button key={c.symbol} onClick={() => setActiveCoin(c)} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeCoin.symbol === c.symbol ? 'bg-gradient-to-br from-white to-[#FDFBF7] text-[#D4AF37] border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.4)] dark:bg-[#2B3139] dark:from-[#2B3139] dark:to-[#2B3139] dark:text-white dark:border-[#848E9C] dark:shadow-md' : 'bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] text-[#636878] dark:text-[#848E9C] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] dark:hover:bg-[#2B3139]/50'}`}>{c.symbol}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* CHART AREA */}
        <div className="lg:col-span-3 bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] flex justify-between bg-[#faf9f6] dark:bg-[#0B0E11]">
            <h2 className="font-bold text-[#0f1117] dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0ECB81] animate-pulse"></span> {activeCoin.name}
            </h2>
            <span className="font-mono font-bold text-[#0ECB81] text-xl">${currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
          <div className="h-[550px]">
            <AdvancedRealTimeChart key={`${activeCoin.tvSymbol}-${isDarkMode ? "dark" : "light"}`} theme={isDarkMode ? "dark" : "light"} symbol={activeCoin.tvSymbol} interval="15" autosize hide_top_toolbar={false} hide_side_toolbar={false} />
          </div>
        </div>
        
        {/* ORDER PANEL */}
        <div className="bg-[#fff] dark:bg-[#111827] p-6 rounded-2xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] flex flex-col shadow-lg">
           <div className="flex space-x-2 mb-6 bg-[#faf9f6] dark:bg-[#0B0E11] p-1.5 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]">
              <button onClick={() => setOrderType('MANUAL')} className={`flex-1 text-[11px] py-2.5 rounded-lg font-bold transition-all uppercase tracking-wider ${orderType === 'MANUAL' ? 'bg-gradient-to-br from-white to-[#FDFBF7] text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.3)] dark:bg-[#2B3139] dark:from-[#2B3139] dark:to-[#2B3139] dark:text-[#00d084] dark:border-transparent dark:shadow-sm' : 'border border-transparent text-[#636878] dark:text-[#848E9C] hover:text-[#D4AF37] dark:hover:text-[#00d084]'}`}>{t.manualBtn}</button>
              <button onClick={() => setOrderType('AUTO')} className={`flex-1 text-[11px] py-2.5 rounded-lg font-bold transition-all uppercase tracking-wider ${orderType === 'AUTO' ? 'bg-gradient-to-br from-white to-[#FDFBF7] text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.3)] dark:bg-[#2B3139] dark:from-[#2B3139] dark:to-[#2B3139] dark:text-[#00d084] dark:border-transparent dark:shadow-sm' : 'border border-transparent text-[#636878] dark:text-[#848E9C] hover:text-[#D4AF37] dark:hover:text-[#00d084]'}`}>{t.autoBtn}</button>
           </div>
           
           <div className="mb-6">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#636878] dark:text-[#848E9C] flex justify-between mb-3">
                <span>{t.riskLevel}</span> 
                <span className="text-[#F6465D] bg-[#F6465D]/10 px-2 py-0.5 rounded">{riskPercent}% (${(balance * riskPercent / 100).toFixed(0)})</span>
              </label>
              <input type="range" min="0.5" max="5" step="0.5" value={riskPercent} onChange={(e) => setRiskPercent(Number(e.target.value))} className="w-full accent-[#F6465D]" />
           </div>

           {orderType === 'MANUAL' ? (
             <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">{t.slLabel}</label>
                  <input type="number" value={slInput} onChange={e => setSlInput(e.target.value)} className="w-full bg-[#faf9f6] dark:bg-[#0B0E11] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] p-3 text-sm text-[#0f1117] dark:text-white rounded-xl focus:border-[#F6465D] focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">{t.tpLabel}</label>
                  <input type="number" value={tpInput} onChange={e => setTpInput(e.target.value)} className="w-full bg-[#faf9f6] dark:bg-[#0B0E11] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] p-3 text-sm text-[#0f1117] dark:text-white rounded-xl focus:border-[#0ECB81] focus:outline-none" />
                </div>
                <div className="flex gap-3 pt-4 border-t border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]">
                  <button onClick={() => openManualPosition('LONG')} className="flex-1 bg-[#0ECB81]/10 border border-[#0ECB81]/30 hover:border-[#0ECB81] text-[#0ECB81] py-4 rounded-xl font-black text-[13px] tracking-wider transition-all">LONG</button>
                  <button onClick={() => openManualPosition('SHORT')} className="flex-1 bg-[#F6465D]/10 border border-[#F6465D]/30 hover:border-[#F6465D] text-[#F6465D] py-4 rounded-xl font-black text-[13px] tracking-wider transition-all">SHORT</button>
                </div>
             </div>
           ) : (
             <div className="space-y-3 bg-[#faf9f6] dark:bg-[#0B0E11] p-4 rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">High</label>
                    <input type="number" value={highInput} onChange={e => setHighInput(e.target.value)} className="bg-[#fff] dark:bg-[#111827] p-2 text-xs text-[#0f1117] dark:text-white rounded-lg w-full border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">Low</label>
                    <input type="number" value={lowInput} onChange={e => setLowInput(e.target.value)} className="bg-[#fff] dark:bg-[#111827] p-2 text-xs text-[#0f1117] dark:text-white rounded-lg w-full border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">Buffer</label>
                    <input type="number" value={bufferInput} onChange={e => setBufferInput(e.target.value)} className="bg-[#fff] dark:bg-[#111827] p-2 text-xs text-[#0f1117] dark:text-white rounded-lg w-full border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#636878] dark:text-[#848E9C] uppercase tracking-wider mb-1 block">R:R</label>
                    <input type="number" value={rrInput} onChange={e => setRrInput(e.target.value)} className="bg-[#fff] dark:bg-[#111827] p-2 text-xs text-[#0f1117] dark:text-white rounded-lg w-full border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]" />
                  </div>
                </div>
                <div className="flex gap-2 pt-3">
                  <button onClick={() => placePendingOrder('LONG')} className="flex-1 bg-[#d97706]/10 dark:bg-[#00d084]/10 text-[#d97706] dark:text-[#00d084] py-3 text-[10px] uppercase tracking-wider font-black rounded-lg border border-[#d97706]/30 dark:border-[#00d084]/30 hover:border-[#d97706] dark:hover:border-[#00d084]">BUY STOP</button>
                  <button onClick={() => placePendingOrder('SHORT')} className="flex-1 bg-[#d97706]/10 dark:bg-[#00d084]/10 text-[#d97706] dark:text-[#00d084] py-3 text-[10px] uppercase tracking-wider font-black rounded-lg border border-[#d97706]/30 dark:border-[#00d084]/30 hover:border-[#d97706] dark:hover:border-[#00d084]">SELL STOP</button>
                </div>
             </div>
           )}

           <div className="mt-6 flex-1">
             <div className="p-4 bg-[#faf9f6] dark:bg-[#0B0E11] rounded-xl border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]">
               <h3 className="text-xs font-bold text-[#0f1117] dark:text-white mb-2 flex items-center gap-2"><Briefcase size={14}/> Thống Kê Tổng Quan</h3>
               <div className="flex justify-between text-xs mb-1">
                 <span className="text-[#636878] dark:text-[#848E9C]">Số dư (Balance)</span>
                 <span className="font-mono font-bold">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
               </div>
               <div className="flex justify-between text-xs mb-1">
                 <span className="text-[#636878] dark:text-[#848E9C]">Lãi/Lỗ Tạm Tính</span>
                 <span className={`font-mono font-bold ${totalPnL >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>{totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}</span>
               </div>
             </div>
           </div>
        </div>

        {/* BẢNG TÀI SẢN (PORTFOLIO) */}
        <div className="lg:col-span-4 bg-[#fff] dark:bg-[#111827] border border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] rounded-2xl overflow-hidden shadow-lg mt-2">
           <div className="p-4 border-b border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] flex justify-between bg-[#faf9f6] dark:bg-[#0B0E11]">
             <h2 className="font-bold text-[#0f1117] dark:text-white flex items-center gap-2">
               <Briefcase size={16} className="text-[#D4AF37]" /> Quản Lý Tài Sản (Portfolio)
             </h2>
             <span className="text-xs bg-[#0f1117] dark:bg-white text-white dark:text-black px-3 py-1 rounded-full font-bold">{positions.length + pendingOrders.length} Lệnh</span>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-[#636878] dark:text-[#848E9C] uppercase bg-[#faf9f6] dark:bg-[#0B0E11]">
                 <tr>
                   <th className="px-4 py-3">Tài sản</th>
                   <th className="px-4 py-3">Loại lệnh</th>
                   <th className="px-4 py-3">Entry</th>
                   <th className="px-4 py-3">Giá Hiện Tại</th>
                   <th className="px-4 py-3">SL / TP</th>
                   <th className="px-4 py-3">PnL</th>
                   <th className="px-4 py-3 text-right">Hành động</th>
                 </tr>
               </thead>
               <tbody>
                 {positions.length === 0 && pendingOrders.length === 0 && (
                   <tr><td colSpan="7" className="text-center py-8 text-[#636878] dark:text-[#848E9C]">Chưa có tài sản hoặc lệnh chờ nào</td></tr>
                 )}
                 
                 {/* Lệnh đang chạy */}
                 {positions.map(pos => {
                   const cp = prices[pos.coin] || pos.entryPrice;
                   const pnl = pos.type === 'LONG' ? (cp - pos.entryPrice) * pos.volume : (pos.entryPrice - cp) * pos.volume;
                   return (
                     <tr key={pos.id} className="border-b border-[rgba(15,17,23,0.05)] dark:border-[#2B3139]/50 hover:bg-[#faf9f6] dark:hover:bg-[#0B0E11]">
                       <td className="px-4 py-3 font-bold text-[#0f1117] dark:text-white flex items-center gap-2">
                         <span className={`w-1.5 h-1.5 rounded-full ${pos.type === 'LONG' ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'}`}></span>
                         {pos.coin}
                       </td>
                       <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${pos.type === 'LONG' ? 'bg-[#0ECB81]/10 text-[#0ECB81]' : 'bg-[#F6465D]/10 text-[#F6465D]'}`}>{pos.type}</span></td>
                       <td className="px-4 py-3 font-mono">${pos.entryPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                       <td className="px-4 py-3 font-mono text-[#D4AF37]">${cp.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                       <td className="px-4 py-3 font-mono text-[11px] text-[#636878] dark:text-[#848E9C]">SL: {pos.sl}<br/>TP: {pos.tp || '-'}</td>
                       <td className={`px-4 py-3 font-mono font-black ${pnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>{pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}</td>
                       <td className="px-4 py-3 text-right">
                         <button onClick={() => closePositionManual(pos.id)} className="bg-[#0f1117] dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-lg hover:scale-105 transition-transform text-xs font-bold uppercase tracking-wider">{t.closeBtn}</button>
                       </td>
                     </tr>
                   )
                 })}

                 {/* Lệnh chờ */}
                 {pendingOrders.map(order => (
                     <tr key={order.id} className="border-b border-[rgba(15,17,23,0.05)] dark:border-[#2B3139]/50 bg-[#d97706]/5 dark:bg-[#00d084]/5">
                       <td className="px-4 py-3 font-bold text-[#0f1117] dark:text-white flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] dark:bg-[#00d084]"></span>
                         {order.coin}
                       </td>
                       <td className="px-4 py-3"><span className="px-2 py-1 rounded text-[10px] font-black tracking-widest bg-[#d97706]/10 text-[#d97706] dark:bg-[#00d084]/10 dark:text-[#00d084]">{t.waitLabel} {order.type}</span></td>
                       <td className="px-4 py-3 font-mono">${order.entryPrice.toLocaleString()}</td>
                       <td className="px-4 py-3 font-mono text-[#636878] dark:text-[#848E9C]">-</td>
                       <td className="px-4 py-3 font-mono text-[11px] text-[#636878] dark:text-[#848E9C]">SL: {order.sl}<br/>TP: {order.tp || '-'}</td>
                       <td className="px-4 py-3 font-mono text-[#636878] dark:text-[#848E9C]">-</td>
                       <td className="px-4 py-3 text-right">
                         <button onClick={() => setPendingOrders(prev => prev.filter(p => p.id !== order.id))} className="bg-[#F6465D]/10 text-[#F6465D] px-4 py-1.5 rounded-lg hover:bg-[#F6465D] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">{t.cancelBtn}</button>
                       </td>
                     </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TradingGym;