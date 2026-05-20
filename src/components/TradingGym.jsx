import React, { useState, useEffect } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const COINS = [
  { symbol: 'BTC', tvSymbol: 'BINANCE:BTCUSDT', name: 'Bitcoin', type: 'crypto' },
  { symbol: 'VNINDEX', tvSymbol: 'HOSE:VNINDEX', name: 'Chỉ số VN-Index', type: 'stock', basePrice: 1250.5, vol: 1.5 },
  { symbol: 'VIC', tvSymbol: 'HOSE:VIC', name: 'Vingroup', type: 'stock', basePrice: 42500, vol: 150 },
  { symbol: 'NVDA', tvSymbol: 'NASDAQ:NVDA', name: 'NVIDIA Corp', type: 'stock', basePrice: 950.5, vol: 1.2 },
  { symbol: 'US30', tvSymbol: 'CAPITALCOM:US30', name: 'Dow Jones (US30)', type: 'stock', basePrice: 39500, vol: 12 },
  { symbol: 'XAU/USD', tvSymbol: 'OANDA:XAUUSD', name: 'Vàng Giao Ngay', type: 'forex', basePrice: 2350.5, vol: 0.8 }
];

// --- THÔNG SỐ LUẬT QUỸ (Dựa theo yêu cầu của sếp) ---
const INITIAL_BALANCE = 10000;
const PROFIT_TARGET_PERCENT = 10; // Mục tiêu BƯỚC 1: 10%
const DAILY_LOSS_PERCENT = 5;     // Lỗ tối đa ngày: 5%
const MAX_LOSS_PERCENT = 10;      // Lỗ tối đa tổng: 10%

const TradingGym = ({ balance, setBalance }) => {
  const [activeCoin, setActiveCoin] = useState(COINS[0]);
  const [currentPrice, setCurrentPrice] = useState(65000);
  const [position, setPosition] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);
  
  // Trạng thái Form Đặt lệnh
  const [orderType, setOrderType] = useState('MANUAL');
  const [riskPercent, setRiskPercent] = useState(1);
  const [slInput, setSlInput] = useState('');
  const [tpInput, setTpInput] = useState('');
  const [highInput, setHighInput] = useState('');
  const [lowInput, setLowInput] = useState('');
  const [bufferInput, setBufferInput] = useState('10');
  const [rrInput, setRrInput] = useState('2');

  // --- TRẠNG THÁI THI QUỸ (PROP FIRM CHALLENGE) ---
  const [challengeStatus, setChallengeStatus] = useState('ACTIVE'); // 'ACTIVE', 'PASSED', 'FAILED_DAILY', 'FAILED_MAX'
  
  // Tính toán Equity (Vốn + Lãi/Lỗ tạm tính)
  const currentPnL = position 
    ? (position.type === 'LONG' ? (currentPrice - position.entryPrice) * position.volume : (position.entryPrice - currentPrice) * position.volume)
    : 0;
  const equity = balance + currentPnL;

  // Giới hạn thi Quỹ
  const profitTarget = INITIAL_BALANCE * (1 + PROFIT_TARGET_PERCENT / 100);
  const maxDailyLossLimit = INITIAL_BALANCE * (1 - DAILY_LOSS_PERCENT / 100); // Tạm tính trên vốn gốc cho đơn giản
  const maxTotalLossLimit = INITIAL_BALANCE * (1 - MAX_LOSS_PERCENT / 100);

  // 1. LẤY GIÁ LIVE
  useEffect(() => {
    let ws; let interval;
    if (activeCoin.type === 'crypto') {
      ws = new WebSocket(`wss://stream.binance.com:9443/ws/${activeCoin.symbol.toLowerCase()}usdt@trade`);
      ws.onmessage = (e) => setCurrentPrice(parseFloat(JSON.parse(e.data).p));
    } else {
      setCurrentPrice(activeCoin.basePrice);
      interval = setInterval(() => {
        setCurrentPrice((prev) => Number((prev + (Math.random() * activeCoin.vol * 2) - activeCoin.vol).toFixed(2)));
      }, 1500);
    }
    return () => { if (ws) ws.close(); if (interval) clearInterval(interval); };
  }, [activeCoin]);

  // 2. LÒ LÕI QUÉT LỆNH & KIỂM TRA LUẬT QUỸ
  useEffect(() => {
    if (challengeStatus !== 'ACTIVE') return;

    // A. Quét Luật Quỹ (Cháy là tước bằng ngay)
    if (equity <= maxDailyLossLimit && equity > maxTotalLossLimit) {
      setChallengeStatus('FAILED_DAILY');
      if (position) { setBalance(equity); setPosition(null); } // Thanh lý lệnh ngay lập tức
      return;
    }
    if (equity <= maxTotalLossLimit) {
      setChallengeStatus('FAILED_MAX');
      if (position) { setBalance(equity); setPosition(null); }
      return;
    }
    if (equity >= profitTarget) {
      setChallengeStatus('PASSED');
      if (position) { setBalance(equity); setPosition(null); }
      return;
    }

    // B. Quét Lệnh chờ H/L
    if (pendingOrder && !position) {
      let isTriggered = false;
      if (pendingOrder.type === 'LONG' && currentPrice >= pendingOrder.entryPrice) isTriggered = true;
      if (pendingOrder.type === 'SHORT' && currentPrice <= pendingOrder.entryPrice) isTriggered = true;
      if (isTriggered) {
        setPosition({ ...pendingOrder, time: new Date().toLocaleTimeString() });
        setPendingOrder(null);
      }
    }

    // C. Quét SL/TP
    if (!position) return;
    let isHit = false;
    if (position.type === 'LONG') {
      if (position.sl && currentPrice <= position.sl) isHit = true;
      else if (position.tp && currentPrice >= position.tp) isHit = true;
    } else {
      if (position.sl && currentPrice >= position.sl) isHit = true;
      else if (position.tp && currentPrice <= position.tp) isHit = true;
    }

    if (isHit) {
      setBalance(equity);
      setPosition(null);
    }
  }, [currentPrice, position, pendingOrder, equity, balance, setBalance, challengeStatus, maxDailyLossLimit, maxTotalLossLimit, profitTarget]);

  // 3. HÀM VÀO LỆNH
  const openManualPosition = (type) => {
    if (challengeStatus !== 'ACTIVE') return alert('Sếp đã bị tước quyền thi quỹ. Vui lòng Reset!');
    if (position || pendingOrder) return alert('Kỷ luật: Chỉ được mở 1 lệnh tại 1 thời điểm!');
    const sl = Number(slInput); const tp = Number(tpInput);
    if (!sl) return alert('Kỷ luật thép: Bắt buộc nhập Stoploss!');

    const riskAmount = balance * (riskPercent / 100);
    const volume = riskAmount / Math.abs(currentPrice - sl);
    setPosition({ type, entryPrice: currentPrice, coin: activeCoin.symbol, sl, tp, volume, riskAmount });
  };

  const placePendingOrder = (type) => {
    if (challengeStatus !== 'ACTIVE') return alert('Sếp đã bị tước quyền thi quỹ. Vui lòng Reset!');
    if (position || pendingOrder) return alert('Kỷ luật: Chỉ được mở 1 lệnh tại 1 thời điểm!');
    const H = Number(highInput); const L = Number(lowInput); const buffer = Number(bufferInput); const rr = Number(rrInput);
    if (!H || !L) return alert("Nhập đủ High/Low của nến tín hiệu!");
    
    let entry, sl, tp;
    if (type === 'LONG') { entry = H + buffer; sl = L - buffer; tp = entry + ((entry - sl) * rr); } 
    else { entry = L - buffer; sl = H + buffer; tp = entry - ((sl - entry) * rr); }
    
    const riskAmount = balance * (riskPercent / 100);
    const volume = riskAmount / Math.abs(entry - sl);
    setPendingOrder({ type, entryPrice: entry, coin: activeCoin.symbol, sl, tp, volume, riskAmount });
  };

  const closePositionManual = () => {
    setBalance(equity);
    setPosition(null);
  };

  const resetChallenge = () => {
    setBalance(INITIAL_BALANCE);
    setPosition(null);
    setPendingOrder(null);
    setChallengeStatus('ACTIVE');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* THANH TRẠNG THÁI QUỸ (PROP FIRM DASHBOARD) */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Lớp mờ nếu Fail hoặc Pass */}
        {challengeStatus !== 'ACTIVE' && (
           <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm ${challengeStatus === 'PASSED' ? 'bg-[#0ECB81]/20' : 'bg-[#F6465D]/20'}`}>
              <h2 className={`text-4xl font-black mb-2 tracking-widest uppercase ${challengeStatus === 'PASSED' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                {challengeStatus === 'PASSED' ? '🏆 VƯỢT QUA BƯỚC 1' : '💀 VI PHẠM LUẬT QUỸ'}
              </h2>
              <p className="text-white font-bold mb-6">
                {challengeStatus === 'FAILED_DAILY' ? 'Lỗi: Vượt quá mức lỗ tối đa trong ngày (5%)' : 
                 challengeStatus === 'FAILED_MAX' ? 'Lỗi: Vượt quá mức lỗ tối đa tài khoản (10%)' : 
                 'Tuyệt vời! Sếp đã đạt mục tiêu lợi nhuận 10% an toàn.'}
              </p>
              <button onClick={resetChallenge} className="bg-white text-black font-black px-8 py-3 rounded-full hover:scale-105 transition-transform uppercase">Thử Lại (Reset Account)</button>
           </div>
        )}

        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#378ADD]/20 text-[#378ADD] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">Phase 1 Challenge</span>
              <h2 className="text-xl font-bold text-white">SAIB.Funding</h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#848E9C] uppercase tracking-wider block">Current Equity</span>
              <span className={`text-3xl font-mono font-black ${equity >= INITIAL_BALANCE ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                ${equity.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
            </div>
        </div>

        {/* Thanh Progress và Luật quỹ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lợi nhuận */}
            <div className="bg-[#0B0E11] p-4 rounded-xl border border-[#2B3139]">
               <div className="flex justify-between text-xs mb-2">
                 <span className="text-[#848E9C]">Mục Tiêu Lợi Nhuận (10%)</span>
                 <span className="text-[#0ECB81] font-bold">${profitTarget.toLocaleString()}</span>
               </div>
               <div className="w-full bg-[#181A20] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0ECB81] h-full transition-all" style={{width: `${Math.max(0, Math.min(100, ((equity - INITIAL_BALANCE) / (profitTarget - INITIAL_BALANCE)) * 100))}%`}}></div>
               </div>
            </div>
            {/* Drawdown Ngày */}
            <div className="bg-[#0B0E11] p-4 rounded-xl border border-[#2B3139]">
               <div className="flex justify-between text-xs mb-2">
                 <span className="text-[#848E9C]">Lỗ Tối Đa Ngày (5%)</span>
                 <span className="text-[#FCD535] font-bold">${maxDailyLossLimit.toLocaleString()}</span>
               </div>
               <div className="w-full bg-[#181A20] h-2 rounded-full overflow-hidden flex justify-end">
                  <div className="bg-[#FCD535] h-full transition-all" style={{width: `${Math.max(0, Math.min(100, ((INITIAL_BALANCE - equity) / (INITIAL_BALANCE * DAILY_LOSS_PERCENT / 100)) * 100))}%`}}></div>
               </div>
            </div>
            {/* Drawdown Tổng */}
            <div className="bg-[#0B0E11] p-4 rounded-xl border border-[#2B3139]">
               <div className="flex justify-between text-xs mb-2">
                 <span className="text-[#848E9C]">Lỗ Tối Đa (10%)</span>
                 <span className="text-[#F6465D] font-bold">${maxTotalLossLimit.toLocaleString()}</span>
               </div>
               <div className="w-full bg-[#181A20] h-2 rounded-full overflow-hidden flex justify-end">
                  <div className="bg-[#F6465D] h-full transition-all" style={{width: `${Math.max(0, Math.min(100, ((INITIAL_BALANCE - equity) / (INITIAL_BALANCE * MAX_LOSS_PERCENT / 100)) * 100))}%`}}></div>
               </div>
            </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {COINS.map(c => (
          <button key={c.symbol} onClick={() => { if(!position && !pendingOrder) setActiveCoin(c); }} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeCoin.symbol === c.symbol ? 'bg-[#2B3139] text-white border border-[#848E9C]' : 'bg-[#181A20] border border-[#2B3139] text-[#848E9C] hover:bg-[#2B3139]/50'}`}>{c.symbol}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* CHART AREA */}
        <div className="lg:col-span-3 bg-[#181A20] border border-[#2B3139] rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-[#2B3139] flex justify-between bg-[#0B0E11]">
            <h2 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0ECB81] animate-pulse"></span> {activeCoin.name}
            </h2>
            <span className="font-mono font-bold text-[#0ECB81] text-xl">${currentPrice.toLocaleString()}</span>
          </div>
          <div className="h-[550px]">
            <AdvancedRealTimeChart theme="dark" symbol={activeCoin.tvSymbol} interval="15" autosize hide_top_toolbar={false} hide_side_toolbar={false} />
          </div>
        </div>
        
        {/* ORDER PANEL */}
        <div className="bg-[#181A20] p-6 rounded-2xl border border-[#2B3139] flex flex-col shadow-lg">
           <div className="flex space-x-2 mb-6 bg-[#0B0E11] p-1.5 rounded-xl border border-[#2B3139]">
              <button onClick={() => setOrderType('MANUAL')} className={`flex-1 text-[11px] py-2.5 rounded-lg font-bold transition-all uppercase tracking-wider ${orderType === 'MANUAL' ? 'bg-[#2B3139] text-white shadow-sm' : 'text-[#848E9C]'}`}>Thủ Công</button>
              <button onClick={() => setOrderType('AUTO')} className={`flex-1 text-[11px] py-2.5 rounded-lg font-bold transition-all uppercase tracking-wider ${orderType === 'AUTO' ? 'bg-[#2B3139] text-[#FCD535] shadow-sm' : 'text-[#848E9C]'}`}>Bẫy H/L</button>
           </div>
           
           <div className="mb-6">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#848E9C] flex justify-between mb-3">
                <span>Mức Rủi Ro</span> 
                <span className="text-[#F6465D] bg-[#F6465D]/10 px-2 py-0.5 rounded">{riskPercent}% (${(balance * riskPercent / 100).toFixed(0)})</span>
              </label>
              <input type="range" min="0.5" max="5" step="0.5" value={riskPercent} onChange={(e) => setRiskPercent(Number(e.target.value))} className="w-full accent-[#F6465D]" />
           </div>

           {orderType === 'MANUAL' ? (
             <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-1 block">Stoploss (Bắt buộc)</label>
                  <input type="number" value={slInput} onChange={e => setSlInput(e.target.value)} className="w-full bg-[#0B0E11] border border-[#2B3139] p-3 text-sm text-white rounded-xl focus:border-[#F6465D] focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] text-[#848E9C] uppercase tracking-wider mb-1 block">Take Profit (Tùy chọn)</label>
                  <input type="number" value={tpInput} onChange={e => setTpInput(e.target.value)} className="w-full bg-[#0B0E11] border border-[#2B3139] p-3 text-sm text-white rounded-xl focus:border-[#0ECB81] focus:outline-none" />
                </div>
                <div className="flex gap-3 pt-4 border-t border-[#2B3139]">
                  <button onClick={() => openManualPosition('LONG')} className="flex-1 bg-[#0ECB81]/10 border border-[#0ECB81]/30 hover:border-[#0ECB81] text-[#0ECB81] py-4 rounded-xl font-black text-[13px] tracking-wider transition-all">LONG</button>
                  <button onClick={() => openManualPosition('SHORT')} className="flex-1 bg-[#F6465D]/10 border border-[#F6465D]/30 hover:border-[#F6465D] text-[#F6465D] py-4 rounded-xl font-black text-[13px] tracking-wider transition-all">SHORT</button>
                </div>
             </div>
           ) : (
             <div className="space-y-3 bg-[#0B0E11] p-4 rounded-xl border border-[#2B3139]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] text-[#848E9C] uppercase tracking-wider mb-1 block">High</label>
                    <input type="number" value={highInput} onChange={e => setHighInput(e.target.value)} className="bg-[#181A20] p-2 text-xs text-white rounded-lg w-full border border-[#2B3139]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#848E9C] uppercase tracking-wider mb-1 block">Low</label>
                    <input type="number" value={lowInput} onChange={e => setLowInput(e.target.value)} className="bg-[#181A20] p-2 text-xs text-white rounded-lg w-full border border-[#2B3139]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#848E9C] uppercase tracking-wider mb-1 block">Buffer</label>
                    <input type="number" value={bufferInput} onChange={e => setBufferInput(e.target.value)} className="bg-[#181A20] p-2 text-xs text-white rounded-lg w-full border border-[#2B3139]" />
                  </div>
                  <div>
                    <label className="text-[9px] text-[#848E9C] uppercase tracking-wider mb-1 block">R:R</label>
                    <input type="number" value={rrInput} onChange={e => setRrInput(e.target.value)} className="bg-[#181A20] p-2 text-xs text-white rounded-lg w-full border border-[#2B3139]" />
                  </div>
                </div>
                <div className="flex gap-2 pt-3">
                  <button onClick={() => placePendingOrder('LONG')} className="flex-1 bg-[#FCD535]/10 text-[#FCD535] py-3 text-[10px] uppercase tracking-wider font-black rounded-lg border border-[#FCD535]/30 hover:border-[#FCD535]">BUY STOP</button>
                  <button onClick={() => placePendingOrder('SHORT')} className="flex-1 bg-[#FCD535]/10 text-[#FCD535] py-3 text-[10px] uppercase tracking-wider font-black rounded-lg border border-[#FCD535]/30 hover:border-[#FCD535]">SELL STOP</button>
                </div>
             </div>
           )}

           {/* HIỂN THỊ LỆNH ĐANG CHẠY */}
           <div className="mt-auto pt-6">
              {pendingOrder && (
                <div className="p-4 border border-dashed border-[#FCD535]/50 bg-[#FCD535]/5 rounded-xl mb-3 flex justify-between items-center">
                  <div className="text-[11px]">
                    <span className="text-[#FCD535] font-bold block mb-1">⏳ Chờ {pendingOrder.type}</span>
                    <span className="text-[#848E9C] font-mono">${pendingOrder.entryPrice.toLocaleString()}</span>
                  </div>
                  <button onClick={() => setPendingOrder(null)} className="text-[#F6465D] text-xs font-bold bg-[#F6465D]/10 px-3 py-1.5 rounded-lg hover:bg-[#F6465D] hover:text-white transition-colors">Hủy</button>
                </div>
              )}
              {position && (
                <div className="p-5 bg-gradient-to-br from-[#181A20] to-[#0B0E11] rounded-xl border border-[#2B3139] shadow-inner relative overflow-hidden">
                   <div className={`absolute top-0 left-0 w-1 h-full ${position.type === 'LONG' ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'}`}></div>
                   <p className="text-[#848E9C] text-[10px] uppercase tracking-widest mb-1">{position.type} {position.coin}</p>
                   <p className={`text-3xl font-mono font-black mb-1 tracking-tighter ${currentPnL >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                      {currentPnL >= 0 ? '+' : ''}${currentPnL.toFixed(2)}
                   </p>
                   <div className="flex justify-between text-[10px] font-mono text-[#848E9C] mb-5">
                      <span>Entry: ${position.entryPrice}</span>
                      <span>SL: ${position.sl}</span>
                   </div>
                   <button onClick={closePositionManual} className="w-full bg-white text-black py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#848E9C] transition-colors">Chốt Lệnh</button>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TradingGym;