import React, { useState, useEffect } from 'react';

// ==========================================
// 1. CÁC COMPONENT GIAO DIỆN (HỖ TRỢ DARK/LIGHT MODE)
// ==========================================
const Callout = ({ type, title, children }) => {
  const styles = {
    tip: "bg-blue-50 dark:bg-[#378ADD]/10 border-blue-500 dark:border-[#378ADD] text-blue-700 dark:text-[#378ADD]",
    warn: "bg-yellow-50 dark:bg-[#FCD535]/10 border-yellow-500 dark:border-[#FCD535] text-yellow-700 dark:text-[#FCD535]",
    ok: "bg-green-50 dark:bg-[#0ECB81]/10 border-green-500 dark:border-[#0ECB81] text-green-700 dark:text-[#0ECB81]",
    bad: "bg-red-50 dark:bg-[#F6465D]/10 border-red-500 dark:border-[#F6465D] text-red-700 dark:text-[#F6465D]"
  };
  const icons = { tip: "💡", warn: "⚠️", ok: "✅", bad: "🚫" };
  return (
    <div className={`border-l-4 p-4 rounded-r-xl my-5 text-[14px] flex gap-3 shadow-sm dark:shadow-lg transition-colors ${styles[type]}`}>
      <span className="text-xl">{icons[type]}</span>
      <div className="flex-1 text-gray-800 dark:text-[#EAECEF]">
        {title && <strong className={`block mb-1 ${styles[type].split(' ')[4]}`}>{title}</strong>}
        {children}
      </div>
    </div>
  );
};

const StoryBox = ({ label, icon, children }) => (
  <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6 relative overflow-hidden shadow-lg dark:shadow-2xl transition-colors">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FCD535]/20 dark:bg-[#FCD535]/10 rounded-full blur-2xl pointer-events-none"></div>
    <div className="text-[10px] font-black tracking-[0.12em] uppercase text-[#c8922a] dark:text-[#FCD535] mb-3 flex items-center gap-2">
      <span className="text-base">{icon}</span> {label}
    </div>
    <div className="text-[14px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">{children}</div>
  </div>
);

const SectionHead = ({ icon, title, desc }) => (
  <div className="mt-10 mb-6 flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#FCD535]/10 text-gray-800 dark:text-[#FCD535] border border-gray-200 dark:border-[#FCD535]/30 flex items-center justify-center text-xl shrink-0 shadow-sm dark:shadow-[0_0_10px_rgba(252,213,53,0.2)] transition-colors">{icon}</div>
    <div>
      <h2 className="text-xl font-bold text-black dark:text-white tracking-tight transition-colors">{title}</h2>
      {desc && <p className="text-[13px] text-gray-500 dark:text-[#848E9C] mt-1 transition-colors">{desc}</p>}
    </div>
  </div>
);

// ==========================================
// 2. CÁC COMPONENT TƯƠNG TÁC 
// ==========================================

// 2.1. Quiz Cơ bản
const SimpleQuiz = ({ id, q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden my-6 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-4 flex items-center gap-3 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <span className="text-[10px] font-black tracking-widest uppercase text-[#c8922a] dark:text-[#FCD535] bg-[#c8922a]/10 dark:bg-[#FCD535]/10 border border-[#c8922a]/30 dark:border-[#FCD535]/30 px-3 py-1 rounded-full">✏️ CÂU HỎI KIỂM TRA</span>
      </div>
      <div className="p-6">
        <div className="text-[15px] font-bold text-black dark:text-white mb-4 leading-relaxed transition-colors">
          {q}
          {context && <span className="block text-[13px] text-gray-500 dark:text-[#848E9C] font-normal mt-2 italic transition-colors">{context}</span>}
        </div>
        <div className="flex flex-col gap-2">
          {opts.map((opt, i) => {
            const isChosen = selected === i;
            let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-600 dark:text-[#848E9C] hover:border-[#c8922a] dark:hover:border-[#FCD535] hover:bg-yellow-50 dark:hover:bg-[#FCD535]/5 bg-white dark:bg-transparent";
            let letterClass = "bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C]";
            if (selected !== null) {
              if (i === correctIdx) { btnClass = "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-700 dark:text-[#0ECB81] font-bold"; letterClass = "bg-green-500 dark:bg-[#0ECB81] text-white"; }
              else if (isChosen) { btnClass = "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-700 dark:text-[#F6465D]"; letterClass = "bg-red-500 dark:bg-[#F6465D] text-white"; }
              else { btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-400 dark:text-[#2B3139] opacity-50 cursor-not-allowed bg-white dark:bg-transparent"; }
            }
            return (
              <button key={i} disabled={selected !== null} onClick={() => setSelected(i)} className={`flex items-start gap-3 p-3 border-2 rounded-xl text-left transition-all ${btnClass}`}>
                <div className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-black shrink-0 transition-colors ${letterClass}`}>{String.fromCharCode(65+i)}</div>
                <span className="text-[14px] leading-relaxed mt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className={`mt-4 p-4 rounded-xl text-[14px] leading-relaxed animate-in slide-in-from-top-2 ${selected === correctIdx ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
            <strong>{selected === correctIdx ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

// 2.2. Accordion Thuật Ngữ
const TermCard = ({ name, eng, simple, example }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-xl overflow-hidden mb-3 transition-all shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between p-4 bg-white dark:bg-[#181A20] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B3139]/50 transition-colors">
        <span className="text-[14px] font-black font-mono text-black dark:text-white">{name}</span>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-500 dark:text-[#848E9C] hidden md:block">{eng}</span>
          <span className={`text-gray-500 dark:text-[#848E9C] transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
        </div>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-[#0B0E11] border-t border-gray-200 dark:border-[#2B3139] animate-in fade-in transition-colors">
          <div className="text-[14px] text-gray-800 dark:text-[#EAECEF] leading-relaxed mb-3" dangerouslySetInnerHTML={{__html: simple}}></div>
          <div className="text-[13px] text-gray-600 dark:text-[#848E9C] bg-white dark:bg-[#181A20] border border-gray-200 dark:border-transparent rounded-lg p-3 leading-relaxed" dangerouslySetInnerHTML={{__html: example}}></div>
        </div>
      )}
    </div>
  );
};

// 2.3. Trò chơi Ghép Cặp
const MatchGame = () => {
  const leftItems = [{id:0, t:"💱 EUR/USD"}, {id:1, t:"₿ Bitcoin"}, {id:2, t:"🥇 XAU/USD"}, {id:3, t:"📈 VIC (Vingroup)"}];
  const rightItems = [{id:0, t:"Mở 24/7, không trung tâm"}, {id:1, t:"Giao dịch qua sàn HOSE (VN)"}, {id:2, t:"Cặp tiền lớn nhất, spread thấp"}, {id:3, t:"Trú ẩn an toàn khi bất ổn"}];
  const pairs = {0:2, 1:0, 2:3, 3:1}; // L -> R
  
  const [selL, setSelL] = useState(null);
  const [selR, setSelR] = useState(null);
  const [matched, setMatched] = useState([]);
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (selL !== null && selR !== null) {
      if (pairs[selL] === selR) {
        setMatched([...matched, selL]);
        setSelL(null); setSelR(null);
      } else {
        setFlash({ l: selL, r: selR });
        setTimeout(() => { setFlash(null); setSelL(null); setSelR(null); }, 500);
      }
    }
  }, [selL, selR, matched]);

  const getStatus = () => {
    if (matched.length === 4) return "🎉 Xuất sắc! Ghép đúng tất cả 4 cặp!";
    if (flash) return "❌ Chưa đúng, thử lại nhé!";
    return `Chọn 1 mục bên trái, rồi 1 mục bên phải để ghép cặp. (${matched.length}/4)`;
  };

  const btnClass = (side, id) => {
    if (side === 'L' && matched.includes(id)) return "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-700 dark:text-[#0ECB81] pointer-events-none";
    if (side === 'R' && matched.some(lId => pairs[lId] === id)) return "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-700 dark:text-[#0ECB81] pointer-events-none";
    if (flash && ((side === 'L' && flash.l === id) || (side === 'R' && flash.r === id))) return "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-700 dark:text-[#F6465D] opacity-50";
    if ((side === 'L' && selL === id) || (side === 'R' && selR === id)) return "border-blue-500 dark:border-[#378ADD] bg-blue-50 dark:bg-[#378ADD]/20 text-blue-700 dark:text-[#378ADD]";
    return "border-gray-200 dark:border-[#2B3139] bg-white dark:bg-[#181A20] text-gray-800 dark:text-[#EAECEF] hover:border-[#c8922a] dark:hover:border-[#FCD535] hover:bg-yellow-50 dark:hover:bg-[#FCD535]/10";
  };

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] bg-gray-50 dark:bg-[#0B0E11] rounded-2xl p-6 my-6 shadow-md dark:shadow-xl transition-colors">
      <h3 className="text-[15px] font-bold text-black dark:text-white mb-4">🧩 Bài tập: Ghép đúng cặp</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-[11px] text-gray-500 dark:text-[#848E9C] uppercase tracking-widest font-bold mb-3">Thị trường</div>
          {leftItems.map(i => <div key={i.id} onClick={() => !matched.includes(i.id) && setSelL(i.id)} className={`p-3 border-2 rounded-xl text-[13px] cursor-pointer transition-all mb-2 shadow-sm dark:shadow-none ${btnClass('L', i.id)}`}>{i.t}</div>)}
        </div>
        <div>
          <div className="text-[11px] text-gray-500 dark:text-[#848E9C] uppercase tracking-widest font-bold mb-3">Đặc điểm</div>
          {rightItems.map(i => {
            const isRMatched = matched.some(lId => pairs[lId] === i.id);
            return <div key={i.id} onClick={() => !isRMatched && setSelR(i.id)} className={`p-3 border-2 rounded-xl text-[13px] cursor-pointer transition-all mb-2 shadow-sm dark:shadow-none ${btnClass('R', i.id)}`}>{i.t}</div>;
          })}
        </div>
      </div>
      <div className={`mt-4 text-[13px] font-bold ${matched.length === 4 ? 'text-green-600 dark:text-[#0ECB81]' : flash ? 'text-red-600 dark:text-[#F6465D]' : 'text-gray-500 dark:text-[#848E9C]'}`}>{getStatus()}</div>
    </div>
  );
};

// 2.4. Máy tính Leverage
const LeverageSim = () => {
  const [bal, setBal] = useState(1000);
  const [lev, setLev] = useState(100);
  const [move, setMove] = useState(1);

  const controlled = bal * lev;
  const loss = controlled * (move / 100);
  const pct = Math.min((loss / bal) * 100, 100);

  let statusColor = "text-green-700 dark:text-[#0ECB81]"; let bgStatus = "bg-green-50 dark:bg-[#0ECB81]/10";
  let msg = `✅ <strong>Rủi ro hợp lý.</strong> Mất chỉ ${pct.toFixed(1)}% tài khoản — trong phạm vi quản lý được.`;
  if (pct >= 100) { statusColor = "text-red-700 dark:text-[#F6465D]"; bgStatus = "bg-red-50 dark:bg-[#F6465D]/10"; msg = `💀 <strong>Account Blown!</strong> Chỉ cần giá đi ngược ${move}% là mất toàn bộ $${bal.toLocaleString()}. Với leverage ${lev}:1, đây là rủi ro thực sự.`; }
  else if (pct >= 50) { statusColor = "text-red-700 dark:text-[#F6465D]"; bgStatus = "bg-red-50 dark:bg-[#F6465D]/10"; msg = `⚠️ <strong>Rủi ro cao!</strong> Mất ${pct.toFixed(0)}% tài khoản chỉ vì giá đi ngược ${move}%.`; }
  else if (pct >= 10) { statusColor = "text-yellow-700 dark:text-[#FCD535]"; bgStatus = "bg-yellow-50 dark:bg-[#FCD535]/10"; msg = `⚠️ <strong>Chấp nhận được nhưng cẩn thận.</strong> Mất ${pct.toFixed(0)}% là đáng kể.`; }

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden my-6 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-4 flex items-center gap-3 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <span className="text-xl">🧮</span><h3 className="font-bold text-black dark:text-white text-[14px] flex-1">Máy tính Leverage</h3>
        <span className="text-[10px] bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-3 py-1 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div><label className="text-[11px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Tài khoản ($)</label><input type="number" value={bal} onChange={e=>setBal(Number(e.target.value)||0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[11px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Đòn bẩy</label><select value={lev} onChange={e=>setLev(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value={1}>1:1</option><option value={5}>1:5</option><option value={10}>1:10</option><option value={30}>1:30</option><option value={50}>1:50</option><option value={100}>1:100</option><option value={500}>1:500 (Nguy hiểm)</option></select></div>
          <div><label className="text-[11px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Giá đi ngược (%)</label><input type="number" step="0.1" value={move} onChange={e=>setMove(Number(e.target.value)||0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 dark:bg-[#378ADD]/10 p-3 rounded-xl text-center border border-blue-100 dark:border-transparent"><div className="text-[11px] text-blue-700 dark:text-[#378ADD] font-bold uppercase mb-1">Kiểm soát</div><div className="text-lg font-black text-blue-700 dark:text-[#378ADD] font-mono">${controlled.toLocaleString()}</div></div>
          <div className="bg-red-50 dark:bg-[#F6465D]/10 p-3 rounded-xl text-center border border-red-100 dark:border-transparent"><div className="text-[11px] text-red-700 dark:text-[#F6465D] font-bold uppercase mb-1">Lỗ dự kiến</div><div className="text-lg font-black text-red-700 dark:text-[#F6465D] font-mono">${loss.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
          <div className={`${bgStatus} p-3 rounded-xl text-center border border-transparent`}><div className={`text-[11px] font-bold uppercase mb-1 ${statusColor}`}>% TK Mất</div><div className={`text-lg font-black font-mono ${statusColor}`}>{pct.toFixed(1)}%</div></div>
        </div>
        <div className={`p-4 rounded-xl text-[13px] leading-relaxed ${bgStatus} ${statusColor}`} dangerouslySetInnerHTML={{__html: msg}}></div>
      </div>
    </div>
  );
};

// 2.5. Lab Nến (CSS Candles)
const CandleLab = () => {
  const candles = [
    { t: 'Tăng mạnh', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[12px]"></div><div className="w-[18px] bg-green-500 dark:bg-[#0ECB81] h-[52px] rounded-[3px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[8px]"></div></> },
    { t: 'Giảm mạnh', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[8px]"></div><div className="w-[18px] bg-red-500 dark:bg-[#F6465D] h-[50px] rounded-[3px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[14px]"></div></> },
    { t: 'Doji', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[24px]"></div><div className="w-[18px] bg-gray-500 dark:bg-[#8b949e] h-[3px] rounded-[1px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[24px]"></div></> },
    { t: 'Búa 🔨', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[6px]"></div><div className="w-[18px] bg-green-500 dark:bg-[#0ECB81] h-[26px] rounded-[3px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[34px]"></div></> },
    { t: 'Sao băng ☄️', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[36px]"></div><div className="w-[18px] bg-red-500 dark:bg-[#F6465D] h-[26px] rounded-[3px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[6px]"></div></> },
    { t: 'Búa ngược', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[6px]"></div><div className="w-[18px] bg-red-500 dark:bg-[#F6465D] h-[26px] rounded-[3px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[34px]"></div></> },
    { t: 'Spinning', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[14px]"></div><div className="w-[18px] bg-green-500 dark:bg-[#0ECB81] h-[16px] rounded-[3px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[14px]"></div></> },
    { t: 'Dragonfly', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[20px]"></div><div className="w-[18px] bg-red-500 dark:bg-[#F6465D] h-[4px] opacity-50 rounded-[1px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[20px]"></div></> }
  ];
  const info = [
    { n: 'Nến Tăng Mạnh (Bullish Marubozu)', d: 'Thân nến xanh dài, bóng rất ngắn hoặc không có. Phe mua hoàn toàn áp đảo từ đầu đến cuối phiên. Mở cửa gần đáy, đóng cửa gần đỉnh.<br><br>🟢 <strong>Tín hiệu:</strong> Momentum tăng rất mạnh. Đặc biệt mạnh khi xuất hiện sau khi giá break out khỏi vùng kháng cự.' },
    { n: 'Nến Giảm Mạnh (Bearish Marubozu)', d: 'Thân nến đỏ dài, bóng rất ngắn. Phe bán hoàn toàn áp đảo.<br><br>🔴 <strong>Tín hiệu:</strong> Momentum giảm rất mạnh. Cực kỳ bearish khi phá vỡ vùng hỗ trợ quan trọng.' },
    { n: 'Doji Thập Tự', d: 'Giá mở cửa = giá đóng cửa. Thân nến gần như không có, bóng trên và bóng dưới đối xứng nhau.<br><br>⚖️ <strong>Tín hiệu:</strong> Phe mua và bán đang cân bằng hoàn toàn. <strong>Đặc biệt quan trọng</strong> khi xuất hiện ở vùng hỗ trợ/kháng cự → tín hiệu đảo chiều tiềm năng.' },
    { n: 'Nến Búa (Hammer) 🔨', d: 'Thân nến nhỏ ở phía trên, bóng dưới dài ≥ 2× thân.<br><br>🔨 <strong>Tín hiệu Bullish:</strong> Giá đã bị kéo xuống thấp nhưng phe mua đã phản công mạnh. <strong>Mạnh nhất khi xuất hiện ở vùng hỗ trợ sau downtrend</strong>.' },
    { n: 'Nến Sao Băng (Shooting Star) ☄️', d: 'Thân nến nhỏ ở phía dưới, bóng trên dài ≥ 2× thân.<br><br>☄️ <strong>Tín hiệu Bearish:</strong> Phe bán kéo giá về gần đáy khi đóng cửa. <strong>Mạnh nhất khi xuất hiện ở vùng kháng cự sau uptrend</strong>.' },
    { n: 'Nến Búa Ngược (Inverted Hammer)', d: 'Thân nến nhỏ ở phía dưới, bóng trên dài. Xuất hiện ở đáy.<br><br>🔄 <strong>Tín hiệu:</strong> Lực mua đã bắt đầu xuất hiện — cần nến xác nhận tăng tiếp theo. Ít tin cậy hơn Hammer.' },
    { n: 'Spinning Top (Con Quay)', d: 'Thân nến nhỏ ở giữa, bóng trên và bóng dưới tương đối dài.<br><br>⚖️ <strong>Tín hiệu:</strong> Tương tự Doji — lưỡng lự, không bên nào thắng rõ ràng. Thường thấy trước các biến động lớn.' },
    { n: 'Dragonfly Doji 🐲', d: 'Doji đặc biệt: bóng dưới rất dài, không có bóng trên.<br><br>🐲 <strong>Tín hiệu Bullish cực mạnh</strong> khi xuất hiện ở đáy/vùng hỗ trợ: sức mua áp đảo hoàn toàn.' }
  ];
  const [active, setActive] = useState(null);

  return (
    <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6 shadow-md dark:shadow-xl transition-colors">
      <div className="text-[13px] font-bold text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-6">Biểu đồ minh họa — Click vào nến để xem</div>
      <div className="flex flex-wrap items-end justify-center gap-6 min-h-[120px] pb-4">
        {candles.map((c, i) => (
          <div key={i} onClick={() => setActive(i)} className={`flex flex-col items-center cursor-pointer transition-all hover:scale-110 ${active !== null && active !== i ? 'opacity-40' : 'opacity-100'}`}>
            {c.c}
            <div className="text-[10px] text-gray-500 dark:text-[#848E9C] mt-2 font-mono text-center leading-tight" dangerouslySetInnerHTML={{__html: c.t}}></div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-5 rounded-xl min-h-[100px] transition-colors text-[13px] text-gray-800 dark:text-[#EAECEF] leading-relaxed shadow-sm">
        {active === null ? "👆 Nhấp vào bất kỳ cây nến nào bên trên để xem ý nghĩa chi tiết" : (
          <div><div className="font-bold text-black dark:text-white text-[15px] mb-2">{info[active].n}</div><div dangerouslySetInnerHTML={{__html: info[active].d}}></div></div>
        )}
      </div>
    </div>
  );
};

// 2.6. Quiz Cuối Khóa
const FinalQuiz = () => {
  const qs = [
    {q:'Giá cổ phiếu của công ty A tăng liên tục trong 2 tuần trước khi kết quả kinh doanh tốt được công bố. Khi kết quả chính thức ra, giá lại giảm. Hiện tượng này được gọi là gì?', opts:['Lỗi thị trường','Buy the rumor, sell the news','Insider trading','Bong bóng giá'], c:1},
    {q:'Bạn SELL EUR/USD ở 1.0900, SL ở 1.0930, TP ở 1.0810. R:R của lệnh này là bao nhiêu?', opts:['1:1','1:2','1:3','1:4'], c:2},
    {q:'Phiên giao dịch nào có thanh khoản cao nhất trong ngày?', opts:['5:00–9:00 (Tokyo)','14:00–17:00 (London)','19:00–23:00 (London + NY)','23:00–3:00 (Đêm)'], c:2},
    {q:'Leverage 1:50 với tài khoản $2,000. Giá đi ngược 2%. Bạn mất bao nhiêu?', opts:['$40','$200','$2,000 (mất trắng)','$100'], c:2},
    {q:'Sau uptrend dài, xuất hiện nến có bóng trên rất dài, thân nhỏ ở dưới, tại kháng cự. Đây là gì?', opts:['Tiếp tục tăng','Shooting Star (Đảo chiều giảm)','Không có ý nghĩa','Cần bán ngay'], c:1},
    {q:'Theo Top-Down Analysis, D1 đang downtrend. Trên M15 có setup tăng rất đẹp. Bạn làm gì?', opts:['BUY ngay vì M15 đẹp','KHÔNG BUY vì ngược chiều D1','SELL theo D1 mù quáng','Xem M1'], c:1},
    {q:'Doji xuất hiện sau downtrend dài tại vùng hỗ trợ mạnh. Bạn nên làm gì?', opts:['BUY ngay lập tức','Chờ nến tiếp theo xác nhận tăng rồi mới vào','SELL tiếp','Bỏ qua'], c:1}
  ];
  const [answers, setAnswers] = useState({});
  const [showRes, setShowRes] = useState(false);
  const score = Object.keys(answers).filter(k => answers[k] === qs[k].c).length;

  const handleSelect = (qIdx, oIdx) => {
    if (showRes) return;
    setAnswers({...answers, [qIdx]: oIdx});
  };

  return (
    <div className="mt-8">
      {qs.map((q, qIdx) => (
        <div key={qIdx} className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 mb-4 shadow-sm dark:shadow-lg transition-colors">
          <div className="flex items-center gap-3 mb-4"><span className="bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] text-[10px] font-bold px-3 py-1 rounded-full uppercase">Câu {qIdx+1}</span></div>
          <p className="text-[14px] font-bold text-black dark:text-white mb-4">{q.q}</p>
          <div className="grid grid-cols-1 gap-2">
            {q.opts.map((opt, oIdx) => {
              const isSelected = answers[qIdx] === oIdx;
              const isCorrect = showRes && q.c === oIdx;
              const isWrong = showRes && isSelected && q.c !== oIdx;
              let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-600 dark:text-[#848E9C] hover:border-[#c8922a] dark:hover:border-[#FCD535] hover:bg-yellow-50 dark:hover:bg-[#FCD535]/5 bg-white dark:bg-transparent";
              if (showRes) {
                if (isCorrect) btnClass = "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-700 dark:text-[#0ECB81] font-bold";
                else if (isWrong) btnClass = "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-700 dark:text-[#F6465D] opacity-60";
                else btnClass = "border-gray-200 dark:border-[#2B3139] opacity-30 bg-white dark:bg-transparent";
              } else if (isSelected) {
                btnClass = "border-blue-500 dark:border-[#378ADD] bg-blue-50 dark:bg-[#378ADD]/10 text-blue-700 dark:text-[#378ADD] font-bold";
              }
              return (
                <button key={oIdx} onClick={() => handleSelect(qIdx, oIdx)} className={`text-left p-3 border-2 rounded-xl text-[13px] transition-all ${btnClass}`}>
                  {String.fromCharCode(65+oIdx)}. {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!showRes ? (
        <button onClick={() => Object.keys(answers).length === qs.length ? setShowRes(true) : alert("Hãy trả lời hết các câu!")} className="w-full bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black py-4 rounded-xl uppercase tracking-widest hover:brightness-110 shadow-md">Nộp Bài Kiểm Tra</button>
      ) : (
        <div className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-[#0B0E11] dark:to-[#181A20] border border-yellow-500 dark:border-[#FCD535] rounded-2xl text-center shadow-lg dark:shadow-[0_0_30px_rgba(252,213,53,0.1)] transition-colors">
          <h2 className="text-3xl font-black text-black dark:text-white mb-2">Kết quả: {score}/{qs.length}</h2>
          <p className="text-gray-600 dark:text-[#848E9C] text-sm mb-6">{score >= 6 ? "Tuyệt vời! Sếp đã nắm chắc nền tảng, sẵn sàng vào Gym." : "Cần ôn tập lại các khái niệm sai sếp nhé."}</p>
          <button onClick={() => {setAnswers({}); setShowRes(false);}} className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-xs hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors">Làm lại</button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. DATABASE CHƯƠNG 1 (8 BÀI HỌC THEO HTML GỐC)
// ==========================================
const ACADEMY_DATA = [
  {
    id: 0, title: "1. Thị trường là gì?", 
    content: (
      <>
        <SectionHead icon="🏪" title="Thị trường là gì?" desc="Trước khi học cách kiếm tiền, hãy hiểu thị trường thực sự là gì. Đơn giản hơn bạn nghĩ — giống hệt chợ bán cá." />
        <StoryBox label="Câu chuyện bắt đầu" icon="🐟">
          Hãy tưởng tượng bạn đang ở <strong>chợ Bến Thành</strong>. Cô bán cá cần bán 10 kg cá trước 10h sáng — nếu không, cá ươn, mất trắng. Bạn muốn mua cá tươi cho bữa trưa.<br/><br/>
          Cô cần bán → Bạn cần mua → Hai người thỏa thuận giá → <strong>Giao dịch xảy ra.</strong><br/><br/>
          Thị trường tài chính hoạt động y hệt như vậy. Chỉ khác là thứ được mua bán không phải cá — mà là <strong>tiền tệ, cổ phiếu, vàng, crypto...</strong>
        </StoryBox>
        <p className="text-gray-600 dark:text-[#848E9C] text-[14px] leading-relaxed mb-4 transition-colors"><strong>Thị trường tài chính = Nơi người mua và người bán gặp nhau để trao đổi các sản phẩm tài chính.</strong><br/>Giá của mọi thứ đều được quyết định bởi <em>cung và cầu</em> tại mỗi thời điểm.</p>
        <ul className="list-disc pl-5 text-gray-600 dark:text-[#848E9C] text-[14px] space-y-2 mb-6 transition-colors">
          <li><strong>Nhiều người muốn mua hơn bán</strong> → Giá tăng (vì người mua phải trả cao hơn để mua được hàng)</li>
          <li><strong>Nhiều người muốn bán hơn mua</strong> → Giá giảm (vì người bán phải hạ giá để bán được hàng)</li>
        </ul>
        <Callout type="tip"><strong>Bài học số 1:</strong> Giá không phải do ai "quyết định" — giá là kết quả tự nhiên của hàng triệu người mua và bán cùng lúc. Nhiệm vụ của trader là <em>dự đoán</em> xu hướng cung-cầu này trước khi nó xảy ra.</Callout>
        
        <SectionHead icon="❓" title="Tại sao giá lại đi trước thực tế?" />
        <p className="text-gray-600 dark:text-[#848E9C] text-[14px] leading-relaxed mb-4 transition-colors">Đây là điều nhiều người không biết và hay bị bẫy: <strong>Thị trường tài chính luôn nhìn về phía trước</strong> — nó phản ánh kỳ vọng tương lai, không phải thực tế hiện tại.</p>
        <StoryBox label="Tình huống thực tế" icon="📰">
          Công ty A vừa công bố lợi nhuận tăng 50% — tin cực tốt! Nhưng giá cổ phiếu lại <strong>giảm</strong> sau tin này. Tại sao?<br/><br/>
          Vì thị trường <em>đã biết trước</em> (qua dự báo, tin tức) và đã đẩy giá lên <em>trước khi tin ra</em>. Khi tin tốt thực sự ra → không còn gì để mua nữa → người đã mua trước chốt lời → giá giảm.<br/><br/>
          Câu nói kinh điển: <strong>"Buy the rumor, sell the news"</strong> — Mua khi có tin đồn, bán khi tin chính thức ra.
        </StoryBox>
        <SimpleQuiz 
          q="Tin tức vừa ra: 'Lạm phát Mỹ thấp hơn dự báo' (tin tốt). Nhưng giá vàng lại tăng vọt. Tại sao?"
          opts={["Thị trường bị lỗi kỹ thuật", "Thị trường kỳ vọng lạm phát cao hơn, lạm phát thấp = bất ngờ tích cực, USD yếu, vàng tăng", "Vàng luôn tăng bất kể tin tức", "Người ta mua vàng vì không hiểu tin"]}
          correctIdx={1}
          explanation='Thị trường đã "discount" (tính giá trước) lạm phát cao. Thực tế thấp hơn kỳ vọng = bất ngờ.'
        />
      </>
    )
  },
  {
    id: 1, title: "2. Các loại thị trường",
    content: (
      <>
        <SectionHead icon="🌍" title="Các loại thị trường tài chính" desc="Có hàng chục loại. Bạn chỉ cần biết 6 loại quan trọng nhất." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-4 rounded-xl hover:border-blue-500 dark:hover:border-[#378ADD] transition-colors shadow-sm dark:shadow-none"><div className="text-2xl mb-2">💱</div><div className="font-bold text-black dark:text-white mb-1">Forex</div><div className="text-xs text-gray-500 dark:text-[#848E9C]">Lớn nhất thế giới. 24/5. Mua bán tiền tệ.</div></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-4 rounded-xl hover:border-yellow-500 dark:hover:border-[#FCD535] transition-colors shadow-sm dark:shadow-none"><div className="text-2xl mb-2">₿</div><div className="font-bold text-black dark:text-white mb-1">Crypto</div><div className="text-xs text-gray-500 dark:text-[#848E9C]">24/7. Biến động cực cao. Bitcoin, ETH...</div></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-4 rounded-xl hover:border-green-500 dark:hover:border-[#0ECB81] transition-colors shadow-sm dark:shadow-none"><div className="text-2xl mb-2">🥇</div><div className="font-bold text-black dark:text-white mb-1">Hàng hóa</div><div className="text-xs text-gray-500 dark:text-[#848E9C]">Vàng (XAU/USD), Dầu. Phụ thuộc địa chính trị.</div></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-4 rounded-xl hover:border-gray-500 dark:hover:border-[#848E9C] transition-colors shadow-sm dark:shadow-none"><div className="text-2xl mb-2">📈</div><div className="font-bold text-black dark:text-white mb-1">Cổ phiếu</div><div className="text-xs text-gray-500 dark:text-[#848E9C]">Có giờ cố định. Phụ thuộc báo cáo doanh nghiệp.</div></div>
        </div>
        <Callout type="ok"><strong>Khuyến nghị cho bạn:</strong> Đã có kinh nghiệm crypto/vàng, hãy bắt đầu bằng <strong>XAU/USD</strong> (vàng) và <strong>EUR/USD</strong>. Thanh khoản cao, PTKT rất chuẩn.</Callout>
        
        <SectionHead icon="⏰" title="Các phiên giao dịch trong ngày" />
        <p className="text-gray-600 dark:text-[#848E9C] text-[14px] mb-4 transition-colors">Forex mở 24/5 nhưng không phải lúc nào cũng sôi động.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 dark:border-[#2B3139] bg-white dark:bg-transparent p-4 rounded-xl shadow-sm dark:shadow-none"><div className="text-xs text-gray-500 dark:text-[#848E9C] mb-1">🌏 Sydney / Tokyo</div><div className="font-bold text-black dark:text-white font-mono">5:00 – 14:00 (VN)</div><div className="text-xs text-gray-400 dark:text-[#666] mt-1">Ít biến động.</div></div>
          <div className="border border-yellow-200 dark:border-[#FCD535]/30 bg-yellow-50 dark:bg-[#FCD535]/5 p-4 rounded-xl shadow-sm dark:shadow-none"><div className="text-xs text-yellow-700 dark:text-[#FCD535] mb-1">🌍 London ⭐</div><div className="font-bold text-black dark:text-white font-mono">14:00 – 23:00 (VN)</div><div className="text-xs text-yellow-700 dark:text-[#FCD535] mt-1">Sôi động. EUR, GBP mạnh.</div></div>
          <div className="border-2 border-yellow-400 dark:border-[#FCD535]/50 bg-yellow-100 dark:bg-[#FCD535]/10 p-4 rounded-xl shadow-sm dark:shadow-none"><div className="text-xs text-yellow-800 dark:text-[#FCD535] mb-1">🌎 New York ⭐⭐</div><div className="font-bold text-black dark:text-white font-mono">19:00 – 24:00+ (VN)</div><div className="text-xs text-yellow-800 dark:text-[#FCD535] mt-1">Volume cực đỉnh. USD chi phối.</div></div>
          <div className="border border-blue-200 dark:border-[#378ADD]/30 bg-blue-50 dark:bg-[#378ADD]/5 p-4 rounded-xl shadow-sm dark:shadow-none"><div className="text-xs text-blue-700 dark:text-[#378ADD] mb-1">🔄 London + NY overlap</div><div className="font-bold text-black dark:text-white font-mono">19:00 – 23:00 (VN)</div><div className="text-xs text-blue-700 dark:text-[#378ADD] mt-1">Thanh khoản cao nhất ngày.</div></div>
        </div>
        <Callout type="warn"><strong>Tránh giao dịch</strong> từ 24:00–5:00 sáng (giờ VN) — giai đoạn "chết", spread cực rộng, dễ bị bẫy quét SL.</Callout>
        
        <MatchGame />
      </>
    )
  },
  {
    id: 2, title: "3. Ai tham gia thị trường?",
    content: (
      <>
        <SectionHead icon="🏛️" title="4 nhóm người chơi chính" desc="Biết đối thủ của mình là ai. Thị trường không fair nhưng hiểu luật sẽ thắng." />
        <div className="space-y-4 mb-6">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-5 rounded-xl shadow-sm dark:shadow-none"><h4 className="text-black dark:text-white font-bold mb-1">🏛️ Ngân hàng TW (Fed, ECB...) <span className="text-yellow-600 dark:text-[#FCD535] text-xs font-normal ml-2">~35% Vol</span></h4><p className="text-gray-600 dark:text-[#848E9C] text-[13px]">Quyết định lãi suất. Như "ông trời". Tin cấp 1 mọi trader phải xem.</p></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-5 rounded-xl shadow-sm dark:shadow-none"><h4 className="text-black dark:text-white font-bold mb-1">🏦 Tổ chức lớn (Smart Money) <span className="text-green-600 dark:text-[#0ECB81] text-xs font-normal ml-2">~55% Vol</span></h4><p className="text-gray-600 dark:text-[#848E9C] text-[13px]">"Cá voi". Giao dịch khối lượng khổng lồ. Thường đi ngược đám đông để dọn thanh khoản trước khi đẩy giá.</p></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-5 rounded-xl shadow-sm dark:shadow-none"><h4 className="text-black dark:text-white font-bold mb-1">🏢 Quỹ Đầu Tư & DN <span className="text-blue-600 dark:text-[#378ADD] text-xs font-normal ml-2">~8% Vol</span></h4><p className="text-gray-600 dark:text-[#848E9C] text-[13px]">Hedging rủi ro tỷ giá cho xuất nhập khẩu.</p></div>
          <div className="bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30 p-5 rounded-xl shadow-sm dark:shadow-none"><h4 className="text-yellow-700 dark:text-[#FCD535] font-bold mb-1">🙋 Retail Trader (Chúng ta) <span className="text-red-600 dark:text-[#F6465D] text-xs font-normal ml-2">&lt;2% Vol</span></h4><p className="text-gray-800 dark:text-[#EAECEF] text-[13px]">Mỗi lệnh của bạn không ảnh hưởng gì đến thị trường. Lợi thế: Có thể "vô hình" vào ra nhanh chóng.</p></div>
        </div>
        <StoryBox label="Sự thật quan trọng" icon="⚠️">
          "Smart Money" cần thanh khoản để khớp khối lượng khổng lồ. Họ tạo <em>bẫy Breakout</em> lên trên kháng cự → Đám đông fomo BUY → Smart Money xả (SELL) toàn bộ vào lệnh Buy đó → Giá sập mạnh. Đó là lý do Breakout cơ bản thất bại 70% thời gian.
        </StoryBox>
        <Callout type="tip">Thay vì "đuổi" Breakout, hãy chờ giá quay lại Test để xác nhận (Kỹ thuật NNN Chương 3).</Callout>
      </>
    )
  },
  {
    id: 3, title: "4. Thuật ngữ cốt lõi",
    content: (
      <>
        <SectionHead icon="📖" title="12 Thuật ngữ Sinh tồn" desc="Học 1 lần, dùng cả đời. Click để mở chi tiết." />
        <TermCard name="BID / ASK" eng="Giá Mua / Bán của sàn" simple="<strong>Bid</strong> = Giá sàn Mua (Bạn Bán). <strong>Ask</strong> = Giá sàn Bán (Bạn Mua)." example="EUR/USD Bid: 1.0850 / Ask: 1.0852. Mua ngay sẽ khớp Ask 1.0852." />
        <TermCard name="SPREAD" eng="Chi phí giao dịch ẩn" simple="Spread = Ask - Bid. Đây là lợi nhuận của Sàn." example="Vừa mở lệnh xong bạn luôn thấy bị Âm tiền ngay lập tức, đó là do phải trả phí Spread cho sàn." />
        <TermCard name="PIP / POINT" eng="Đơn vị thay đổi giá" simple="Đơn vị nhỏ nhất của giá. Giống như 'mm' trong cây thước." example="EUR/USD từ 1.0850 lên 1.0851 là tăng 1 Pip." />
        <TermCard name="LOT" eng="Khối lượng giao dịch" simple="Standard = 100k đơn vị. Mini (0.1) = 10k. Micro (0.01) = 1k." example="Người mới TUYỆT ĐỐI chỉ dùng Micro Lot (0.01) để rủi ro nhỏ nhất." />
        <TermCard name="LONG / SHORT" eng="Mua / Bán" simple="<strong>Long (Buy)</strong>: Cược giá tăng. <strong>Short (Sell)</strong>: Cược giá giảm." example="Bạn có thể kiếm tiền ngay cả khi thị trường sụp đổ bằng nút Short." />
        <TermCard name="STOP LOSS (SL)" eng="Cắt lỗ tự động" simple="Lệnh đóng vị thế khi giá đi ngược chiều đến mức định sẵn. <strong>Bắt buộc!</strong>" example="Mua Vàng $2000, SL $1990. Mất tối đa 10$ nếu sai. Không có SL là cờ bạc." />
        <TermCard name="TAKE PROFIT (TP)" eng="Chốt lời tự động" simple="Lệnh đóng vị thế khi đạt lợi nhuận mong muốn." example="Đặt TP xong đi ngủ, giá chạm tự khớp." />
        <TermCard name="RISK:REWARD (R:R)" eng="Tỷ lệ Rủi ro/Lợi nhuận" simple="Thua thì mất 1, Thắng thì được mấy? R:R = 1:2 là tiêu chuẩn." example="SL 30 pip, TP 60 pip => R:R 1:2. Thắng 35% số lệnh vẫn có lãi." />
        <TermCard name="DRAWDOWN" eng="Sụt giảm tài khoản" simple="Tỷ lệ % vốn mất đi từ đỉnh tài khoản." example="Từ 10k$ thua còn 8k$ => Drawdown 20%. Quá 20% là hệ thống có vấn đề nặng." />
      </>
    )
  },
  {
    id: 4, title: "5. Đòn bẩy & Margin",
    content: (
      <>
        <SectionHead icon="⚡" title="Đòn bẩy (Leverage)" desc="Con dao hai lưỡi nguy hiểm nhất thị trường." />
        <StoryBox label="Ví dụ Bất động sản" icon="🏠">
          Bạn có $10,000, muốn mua nhà $100,000. Ngân hàng cho vay 90% (Đòn bẩy 1:10).<br/>
          Nhà tăng 10% → Bạn lời $10,000 = <strong>100% lợi nhuận</strong> trên vốn.<br/>
          Nhà giảm 10% → Bạn lỗ $10,000 = <strong>Mất trắng toàn bộ vốn</strong>.<br/>
          Trading y hệt vậy, nhưng biến động 10% diễn ra trong vài giờ!
        </StoryBox>
        <LeverageSim />
        <Callout type="bad">Khuyến nghị cho người mới: Tối đa 1:10. Những quảng cáo đòn bẩy 1:1000 là bẫy cháy túi cực nhanh.</Callout>
      </>
    )
  },
  {
    id: 5, title: "6. Đọc Nến Nhật",
    content: (
      <>
        <SectionHead icon="🕯️" title="Ngôn ngữ của thị trường" desc="Mọi hành vi mua bán đều nén trong cây nến." />
        <CandleLab />
        <Callout type="tip"><strong>Nguyên tắc:</strong> Thân dài = áp lực mạnh. Thân ngắn/Doji = lưỡng lự. Râu dài = Sự từ chối giá (Rejection).</Callout>
      </>
    )
  },
  {
    id: 6, title: "7. Khung thời gian",
    content: (
      <>
        <SectionHead icon="🔭" title="Bản đồ vs Ảnh vệ tinh" desc="Cùng một thị trường, nhìn khung thời gian khác nhau sẽ thấy câu chuyện khác nhau." />
        <StoryBox label="Phép so sánh" icon="🗺️">
          Lái xe HN vào HCM: Nhìn bản đồ toàn quốc (D1) để biết hướng đi Nam. Gần đến nơi nhìn bản đồ đường phố (M15) để tìm ngõ. Không ai chỉ nhìn bản đồ phố mà lái cả chặng đường dài.
        </StoryBox>
        <div className="my-6">
          <h4 className="text-black dark:text-white font-bold mb-4 transition-colors">Top-Down Analysis (Bắt buộc)</h4>
          <div className="space-y-3">
            <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-4 rounded-xl flex gap-4 items-center shadow-sm dark:shadow-none transition-colors">
              <span className="w-8 h-8 rounded-full bg-yellow-400 dark:bg-[#FCD535] text-black font-black flex items-center justify-center shrink-0">1</span>
              <div><strong className="text-black dark:text-white block transition-colors">Mở D1 (Daily)</strong><span className="text-xs text-gray-500 dark:text-[#848E9C] transition-colors">Xác định xu hướng tổng thể. Đang Uptrend hay Downtrend? Kẻ S/R.</span></div>
            </div>
            <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-4 rounded-xl flex gap-4 items-center shadow-sm dark:shadow-none transition-colors">
              <span className="w-8 h-8 rounded-full bg-blue-500 dark:bg-[#378ADD] text-white font-black flex items-center justify-center shrink-0">2</span>
              <div><strong className="text-black dark:text-white block transition-colors">Chuyển xuống H4</strong><span className="text-xs text-gray-500 dark:text-[#848E9C] transition-colors">Đợi giá hồi (Pullback) về vùng hợp lưu cản.</span></div>
            </div>
            <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-4 rounded-xl flex gap-4 items-center shadow-sm dark:shadow-none transition-colors">
              <span className="w-8 h-8 rounded-full bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black flex items-center justify-center shrink-0">3</span>
              <div><strong className="text-black dark:text-white block transition-colors">Dùng H1/M15 để Entry</strong><span className="text-xs text-gray-500 dark:text-[#848E9C] transition-colors">Tìm cụm nến đảo chiều (Nến Ôm, Pinbar) để bấm nút.</span></div>
            </div>
          </div>
        </div>
        <Callout type="warn"><strong>Lỗi kinh điển:</strong> Nhìn M15 thấy nến tăng đẹp quá, BUY ngay. Hóa ra D1 đang Downtrend cắm mặt. Kết quả: Mua đúng đỉnh sóng hồi rồi sập.</Callout>
      </>
    )
  },
  {
    id: 7, title: "8. Quiz Tổng kết",
    content: (
      <>
        <SectionHead icon="⭐" title="Kiểm tra năng lực Chương 1" desc="Hãy đạt 7/10 trước khi vào Gym hoặc sang Chương tiếp theo." />
        <FinalQuiz />
      </>
    )
  }
];

// ==========================================
// 4. COMPONENT CHÍNH (ACADEMY CONTAINER)
// ==========================================
const Academy = () => {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <div className="bg-[#faf9f6] dark:bg-[#0B0E11] min-h-[calc(100vh-80px)] p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR TỐI GIẢN */}
        <div className="lg:col-span-3 space-y-2">
            <h3 className="text-gray-500 dark:text-[#848E9C] font-black uppercase text-[10px] tracking-[0.2em] mb-4 pl-2 border-b border-gray-200 dark:border-[#2B3139] pb-3 transition-colors">Chương 1: Nền Tảng</h3>
            {ACADEMY_DATA.map((lesson, idx) => (
                <button 
                  key={idx} onClick={() => setSelectedId(idx)} 
                  className={`w-full text-left px-5 py-4 rounded-2xl text-[13px] font-bold transition-all border ${selectedId === idx ? 'bg-white dark:bg-[#2B3139]/40 border-gray-300 dark:border-white/10 text-black dark:text-white shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-transparent border-transparent text-gray-500 dark:text-[#666] hover:bg-gray-100 dark:hover:bg-[#2B3139]/30 hover:text-black dark:hover:text-[#848E9C]'}`}
                >
                  {lesson.title}
                </button>
            ))}
        </div>

        {/* NỘI DUNG CHÍNH (BỌC KEY ĐỂ RESET STATE KHI CHUYỂN BÀI) */}
        <div className="lg:col-span-9 bg-white dark:bg-[#181A20]/40 border border-gray-200 dark:border-[#2B3139]/50 rounded-3xl p-8 lg:p-12 min-h-[600px] shadow-xl dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-colors duration-300">
            {/* Thanh màu trang trí */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 dark:from-[#378ADD] via-green-500 dark:via-[#0ECB81] to-yellow-400 dark:to-[#FCD535]"></div>
            
            <div key={selectedId} className="animate-in slide-in-from-right-4 fade-in duration-500 pb-10 custom-scrollbar overflow-y-auto max-h-[75vh] pr-4">
               {ACADEMY_DATA[selectedId].content}
               
               {/* Điều hướng Next/Prev */}
               <div className="mt-12 pt-6 border-t border-gray-200 dark:border-[#2B3139] flex justify-between items-center transition-colors">
                  <button onClick={() => setSelectedId(prev => Math.max(0, prev - 1))} disabled={selectedId === 0} className="px-6 py-3 rounded-xl text-xs font-bold bg-white dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C] hover:text-black dark:hover:text-white border border-gray-200 dark:border-[#2B3139] disabled:opacity-30 transition-all shadow-sm dark:shadow-none">← Bài trước</button>
                  <button onClick={() => setSelectedId(prev => Math.min(ACADEMY_DATA.length - 1, prev + 1))} disabled={selectedId === ACADEMY_DATA.length - 1} className="px-6 py-3 rounded-xl text-xs font-bold bg-black dark:bg-[#EAECEF] text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white transition-all shadow-md dark:shadow-none">Bài tiếp theo →</button>
               </div>
            </div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #2B3139; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #848E9C; }
      `}} />
    </div>
  );
};

export default Academy;