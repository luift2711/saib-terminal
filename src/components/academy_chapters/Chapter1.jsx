import React, { useState } from 'react';
import {
  Callout, StoryBox, SectionHead, CyberTable, SimpleQuiz, TermCard
} from 'D:/AI_Trading_Apps/trading-gym/src/components/Sharedcomponents.jsx';

// ==========================================
// CHAPTER 1: CÁC COMPONENT TƯƠNG TÁC
// ==========================================

const MatchGame = () => {
  const leftItems = [{id:0, t:"💱 EUR/USD"}, {id:1, t:"₿ Bitcoin"}, {id:2, t:"🥇 XAU/USD"}, {id:3, t:"📈 VIC (Vingroup)"}];
  const rightItems = [{id:0, t:"Mở 24/7, không trung tâm"}, {id:1, t:"Giao dịch qua sàn HOSE (VN)"}, {id:2, t:"Cặp tiền lớn nhất, spread thấp"}, {id:3, t:"Trú ẩn an toàn khi bất ổn"}];
  const pairs = {0:2, 1:0, 2:3, 3:1}; 
  const [selL, setSelL] = useState(null); const [selR, setSelR] = useState(null);
  const [matched, setMatched] = useState([]); const [flash, setFlash] = useState(null);

  React.useEffect(() => {
    if (selL !== null && selR !== null) {
      if (pairs[selL] === selR) { setMatched([...matched, selL]); setSelL(null); setSelR(null); } 
      else { setFlash({ l: selL, r: selR }); setTimeout(() => { setFlash(null); setSelL(null); setSelR(null); }, 500); }
    }
  }, [selL, selR, matched]);

  const getStatus = () => {
    if (matched.length === 4) return "🎉 Xuất sắc! Ghép đúng tất cả 4 cặp!";
    if (flash) return "❌ Chưa đúng, thử lại nhé!";
    return `Chọn 1 mục bên trái, rồi 1 mục bên phải để ghép cặp. (${matched.length}/4)`;
  };

  const btnClass = (side, id) => {
    if ((side === 'L' && matched.includes(id)) || (side === 'R' && matched.some(lId => pairs[lId] === id))) return "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-700 dark:text-[#0ECB81] pointer-events-none";
    if (flash && ((side === 'L' && flash.l === id) || (side === 'R' && flash.r === id))) return "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-700 dark:text-[#F6465D] opacity-50";
    if ((side === 'L' && selL === id) || (side === 'R' && selR === id)) return "border-blue-500 dark:border-[#378ADD] bg-blue-50 dark:bg-[#378ADD]/20 text-blue-700 dark:text-[#378ADD]";
    return "border-gray-200 dark:border-[#2B3139] bg-white dark:bg-[#181A20] text-gray-800 dark:text-[#EAECEF] hover:border-yellow-500 dark:hover:border-[#FCD535] hover:bg-yellow-50 dark:hover:bg-[#FCD535]/10";
  };

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] bg-gray-50 dark:bg-[#0B0E11] rounded-3xl p-8 my-10 shadow-md dark:shadow-xl transition-colors">
      <h3 className="text-lg font-bold text-black dark:text-white mb-6">🧩 Bài tập: Ghép đúng cặp</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase tracking-widest font-bold mb-4">Thị trường</div>
          {leftItems.map(i => <div key={i.id} onClick={() => !matched.includes(i.id) && setSelL(i.id)} className={`p-5 border-2 rounded-xl text-[15px] cursor-pointer transition-all mb-3 shadow-sm dark:shadow-none ${btnClass('L', i.id)}`}>{i.t}</div>)}
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase tracking-widest font-bold mb-4">Đặc điểm</div>
          {rightItems.map(i => <div key={i.id} onClick={() => !matched.some(lId => pairs[lId] === i.id) && setSelR(i.id)} className={`p-5 border-2 rounded-xl text-[15px] cursor-pointer transition-all mb-3 shadow-sm dark:shadow-none ${btnClass('R', i.id)}`}>{i.t}</div>)}
        </div>
      </div>
      <div className={`mt-6 text-[15px] font-bold ${matched.length === 4 ? 'text-green-600 dark:text-[#0ECB81]' : flash ? 'text-red-600 dark:text-[#F6465D]' : 'text-gray-500 dark:text-[#848E9C]'}`}>{getStatus()}</div>
    </div>
  );
};

const LeverageSim = () => {
  const [bal, setBal] = useState(1000); const [lev, setLev] = useState(100); const [move, setMove] = useState(1);
  const controlled = bal * lev; const loss = controlled * (move / 100); const pct = Math.min((loss / bal) * 100, 100);

  let statusColor = "text-green-700 dark:text-[#0ECB81]"; let bgStatus = "bg-green-50 dark:bg-[#0ECB81]/10";
  let msg = `✅ <strong>Rủi ro hợp lý.</strong> Mất chỉ ${pct.toFixed(1)}% tài khoản — trong phạm vi quản lý được.`;
  if (pct >= 100) { statusColor = "text-red-700 dark:text-[#F6465D]"; bgStatus = "bg-red-50 dark:bg-[#F6465D]/10"; msg = `💀 <strong>Account Blown!</strong> Chỉ cần giá đi ngược ${move}% là mất toàn bộ $${bal.toLocaleString()}. Với leverage ${lev}:1, đây là rủi ro thực sự.`; }
  else if (pct >= 50) { statusColor = "text-red-700 dark:text-[#F6465D]"; bgStatus = "bg-red-50 dark:bg-[#F6465D]/10"; msg = `⚠️ <strong>Rủi ro cao!</strong> Mất ${pct.toFixed(0)}% tài khoản chỉ vì giá đi ngược ${move}%.`; }
  else if (pct >= 10) { statusColor = "text-yellow-700 dark:text-[#FCD535]"; bgStatus = "bg-yellow-50 dark:bg-[#FCD535]/10"; msg = `⚠️ <strong>Chấp nhận được nhưng cẩn thận.</strong> Mất ${pct.toFixed(0)}% là đáng kể.`; }

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-10 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <span className="text-2xl">🧮</span><h3 className="font-bold text-black dark:text-white text-lg flex-1">Máy tính Leverage</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div><label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Tài khoản ($)</label><input type="number" value={bal} onChange={e=>setBal(Number(e.target.value)||0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Đòn bẩy</label><select value={lev} onChange={e=>setLev(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value={1}>1:1</option><option value={5}>1:5</option><option value={10}>1:10</option><option value={30}>1:30</option><option value={50}>1:50</option><option value={100}>1:100</option><option value={500}>1:500 (Nguy hiểm)</option></select></div>
          <div><label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Giá đi ngược (%)</label><input type="number" step="0.1" value={move} onChange={e=>setMove(Number(e.target.value)||0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-[#378ADD]/10 p-5 rounded-2xl text-center border border-blue-100 dark:border-transparent"><div className="text-[12px] text-blue-700 dark:text-[#378ADD] font-bold uppercase mb-2">Kiểm soát</div><div className="text-xl md:text-2xl font-black text-blue-700 dark:text-[#378ADD] font-mono">${controlled.toLocaleString()}</div></div>
          <div className="bg-red-50 dark:bg-[#F6465D]/10 p-5 rounded-2xl text-center border border-red-100 dark:border-transparent"><div className="text-[12px] text-red-700 dark:text-[#F6465D] font-bold uppercase mb-2">Lỗ dự kiến</div><div className="text-xl md:text-2xl font-black text-red-700 dark:text-[#F6465D] font-mono">${loss.toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
          <div className={`${bgStatus} p-5 rounded-2xl text-center border border-transparent`}><div className={`text-[12px] font-bold uppercase mb-2 ${statusColor}`}>% TK Mất</div><div className={`text-xl md:text-2xl font-black font-mono ${statusColor}`}>{pct.toFixed(1)}%</div></div>
        </div>
        <div className={`p-5 rounded-2xl text-[16px] leading-relaxed ${bgStatus} ${statusColor}`} dangerouslySetInnerHTML={{__html: msg}}></div>
      </div>
    </div>
  );
};

const CandleLab = () => {
  const candles = [
    { t: 'Tăng mạnh', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[16px]"></div><div className="w-[24px] bg-green-500 dark:bg-[#0ECB81] h-[64px] rounded-[4px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[10px]"></div></> },
    { t: 'Giảm mạnh', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[10px]"></div><div className="w-[24px] bg-red-500 dark:bg-[#F6465D] h-[60px] rounded-[4px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[20px]"></div></> },
    { t: 'Doji', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[30px]"></div><div className="w-[24px] bg-gray-500 dark:bg-[#8b949e] h-[4px] rounded-[2px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[30px]"></div></> },
    { t: 'Búa 🔨', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[8px]"></div><div className="w-[24px] bg-green-500 dark:bg-[#0ECB81] h-[30px] rounded-[4px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[40px]"></div></> },
    { t: 'Sao băng ☄️', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[40px]"></div><div className="w-[24px] bg-red-500 dark:bg-[#F6465D] h-[30px] rounded-[4px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[8px]"></div></> },
    { t: 'Búa ngược', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[8px]"></div><div className="w-[24px] bg-red-500 dark:bg-[#F6465D] h-[30px] rounded-[4px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[40px]"></div></> },
    { t: 'Spinning', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[18px]"></div><div className="w-[24px] bg-green-500 dark:bg-[#0ECB81] h-[20px] rounded-[4px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[18px]"></div></> },
    { t: 'Dragonfly', c: <><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[24px]"></div><div className="w-[24px] bg-red-500 dark:bg-[#F6465D] h-[4px] opacity-50 rounded-[2px]"></div><div className="w-[2px] bg-gray-400 dark:bg-[#6e7681] h-[24px]"></div></> }
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
    <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-10 shadow-md dark:shadow-xl transition-colors">
      <div className="text-[14px] font-bold text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-8">Biểu đồ minh họa — Click vào nến để xem</div>
      <div className="flex flex-wrap items-end justify-center gap-8 min-h-[140px] pb-6">
        {candles.map((c, i) => (
          <div key={i} onClick={() => setActive(i)} className={`flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 ${active !== null && active !== i ? 'opacity-30' : 'opacity-100'}`}>
            {c.c}
            <div className="text-[12px] text-gray-500 dark:text-[#848E9C] mt-3 font-mono text-center leading-tight" dangerouslySetInnerHTML={{__html: c.t}}></div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl min-h-[120px] transition-colors text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8] shadow-sm">
        {active === null ? "👆 Nhấp vào bất kỳ cây nến nào bên trên để xem ý nghĩa chi tiết" : (
          <div className="animate-in fade-in"><div className="font-bold text-black dark:text-white text-[18px] mb-3">{info[active].n}</div><div dangerouslySetInnerHTML={{__html: info[active].d}}></div></div>
        )}
      </div>
    </div>
  );
};

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

  const handleSelect = (qIdx, oIdx) => { if (showRes) return; setAnswers({...answers, [qIdx]: oIdx}); };

  return (
    <div className="mt-10">
      {qs.map((q, qIdx) => (
        <div key={qIdx} className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 mb-6 shadow-sm dark:shadow-lg transition-colors">
          <div className="flex items-center gap-3 mb-5"><span className="bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Câu {qIdx+1}</span></div>
          <p className="text-lg font-bold text-black dark:text-white mb-6">{q.q}</p>
          <div className="grid grid-cols-1 gap-3">
            {q.opts.map((opt, oIdx) => {
              const isSelected = answers[qIdx] === oIdx;
              const isCorrect = showRes && q.c === oIdx;
              const isWrong = showRes && isSelected && q.c !== oIdx;
              let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-[#c8922a] dark:hover:border-[#FCD535] hover:bg-yellow-50 dark:hover:bg-[#FCD535]/5 bg-white dark:bg-transparent";
              if (showRes) {
                if (isCorrect) btnClass = "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81] font-bold";
                else if (isWrong) btnClass = "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D] opacity-60";
                else btnClass = "border-gray-200 dark:border-[#2B3139] opacity-30 bg-white dark:bg-transparent";
              } else if (isSelected) { btnClass = "border-blue-500 dark:border-[#378ADD] bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] font-bold"; }
              return <button key={oIdx} onClick={() => handleSelect(qIdx, oIdx)} className={`text-left p-4 border-2 rounded-2xl text-[16px] transition-all ${btnClass}`}>{String.fromCharCode(65+oIdx)}. {opt}</button>;
            })}
          </div>
        </div>
      ))}
      {!showRes ? (
        <button onClick={() => Object.keys(answers).length === qs.length ? setShowRes(true) : alert("Hãy trả lời hết các câu!")} className="w-full bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black py-5 rounded-2xl text-lg uppercase tracking-widest hover:brightness-110 shadow-lg mt-4">Nộp Bài Kiểm Tra</button>
      ) : (
        <div className="p-10 bg-gradient-to-br from-white to-gray-50 dark:from-[#0B0E11] dark:to-[#181A20] border border-yellow-500 dark:border-[#FCD535] rounded-3xl text-center shadow-lg dark:shadow-[0_0_30px_rgba(252,213,53,0.1)] transition-colors mt-8">
          <h2 className="text-4xl font-black text-black dark:text-white mb-4">Kết quả: {score}/{qs.length}</h2>
          <p className="text-gray-600 dark:text-[#848E9C] text-[16px] mb-8">{score >= 6 ? "Tuyệt vời! Sếp đã nắm chắc nền tảng, sẵn sàng vào Gym." : "Cần ôn tập lại các khái niệm sai sếp nhé."}</p>
          <button onClick={() => {setAnswers({}); setShowRes(false);}} className="bg-gray-800 dark:bg-[#2B3139] text-white px-10 py-4 rounded-2xl font-bold uppercase text-[15px] hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors shadow-md">Làm lại</button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// CHAPTER 1: NỘI DUNG
// ==========================================

export const CHAPTER_1_DATA = [
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
        <p className="text-gray-800 dark:text-[#EAECEF] text-[16px] md:text-[17px] leading-[1.8] mb-5 transition-colors"><strong>Thị trường tài chính = Nơi người mua và người bán gặp nhau để trao đổi các sản phẩm tài chính.</strong><br/>Giá của mọi thứ đều được quyết định bởi <em>cung và cầu</em> tại mỗi thời điểm.</p>
        <ul className="list-disc pl-6 text-gray-800 dark:text-[#EAECEF] text-[16px] md:text-[17px] leading-[1.8] space-y-3 mb-8 transition-colors">
          <li><strong>Nhiều người muốn mua hơn bán</strong> → Giá tăng (vì người mua phải trả cao hơn để mua được hàng)</li>
          <li><strong>Nhiều người muốn bán hơn mua</strong> → Giá giảm (vì người bán phải hạ giá để bán được hàng)</li>
        </ul>
        <Callout type="tip"><strong>Bài học số 1:</strong> Giá không phải do ai "quyết định" — giá là kết quả tự nhiên của hàng triệu người mua và bán cùng lúc. Nhiệm vụ của trader là <em>dự đoán</em> xu hướng cung-cầu này trước khi nó xảy ra.</Callout>
        
        <SectionHead icon="❓" title="Tại sao giá lại đi trước thực tế?" />
        <p className="text-gray-800 dark:text-[#EAECEF] text-[16px] md:text-[17px] leading-[1.8] mb-5 transition-colors">Đây là điều nhiều người không biết và hay bị bẫy: <strong>Thị trường tài chính luôn nhìn về phía trước</strong> — nó phản ánh kỳ vọng tương lai, không phải thực tế hiện tại.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"><div className="text-3xl mb-3">💱</div><div className="font-bold text-black dark:text-white text-lg mb-2">Forex</div><div className="text-[15px] text-gray-500 dark:text-[#848E9C]">Lớn nhất thế giới. 24/5. Mua bán tiền tệ.</div></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"><div className="text-3xl mb-3">₿</div><div className="font-bold text-black dark:text-white text-lg mb-2">Crypto</div><div className="text-[15px] text-gray-500 dark:text-[#848E9C]">24/7. Biến động cực cao. Bitcoin, ETH...</div></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"><div className="text-3xl mb-3">🥇</div><div className="font-bold text-black dark:text-white text-lg mb-2">Hàng hóa</div><div className="text-[15px] text-gray-500 dark:text-[#848E9C]">Vàng (XAU/USD), Dầu. Phụ thuộc địa chính trị.</div></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"><div className="text-3xl mb-3">📈</div><div className="font-bold text-black dark:text-white text-lg mb-2">Cổ phiếu</div><div className="text-[15px] text-gray-500 dark:text-[#848E9C]">Có giờ cố định. Phụ thuộc báo cáo doanh nghiệp.</div></div>
        </div>
        
        <CyberTable 
          headers={["Đặc điểm", "💱 Forex", "₿ Crypto", "🥇 Vàng (XAU/USD)"]}
          rows={[
            ["Giờ giao dịch", "24/5 (T2–T6)", "24/7 (không nghỉ)", "24/5 (qua broker CFD)"],
            ["Thanh khoản", "⭐⭐⭐⭐⭐ Cao nhất", "⭐⭐⭐ Trung bình–cao", "⭐⭐⭐⭐ Rất cao"],
            ["Biến động", "Vừa phải (0.5–1%/ngày)", "Rất cao (5–20%/ngày)", "Vừa (0.5–2%/ngày)"],
            ["Phù hợp với bạn?", "✅ Rất phù hợp để bắt đầu", "✅ Đã quen — tiếp tục học", "✅ Bước chuyển tiếp lý tưởng"]
          ]}
        />
        <Callout type="ok"><strong>Khuyến nghị cho bạn:</strong> Đã có kinh nghiệm crypto/vàng, hãy bắt đầu bằng <strong>XAU/USD</strong> (vàng) và <strong>EUR/USD</strong>. Thanh khoản cao, PTKT rất chuẩn.</Callout>
        
        <SectionHead icon="⏰" title="Các phiên giao dịch trong ngày" />
        <p className="text-gray-800 dark:text-[#EAECEF] text-[16px] md:text-[17px] leading-[1.8] mb-5 transition-colors">Forex mở 24/5 nhưng không phải lúc nào cũng sôi động.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="border border-gray-200 dark:border-[#2B3139] bg-white dark:bg-transparent p-5 rounded-2xl shadow-sm dark:shadow-none"><div className="text-[13px] text-gray-500 dark:text-[#848E9C] mb-2 uppercase tracking-wider font-bold">🌏 Sydney / Tokyo</div><div className="font-bold text-black dark:text-white text-lg font-mono">5:00 – 14:00 (VN)</div><div className="text-[14px] text-gray-500 dark:text-[#64748B] mt-2">Ít biến động.</div></div>
          <div className="border border-yellow-200 dark:border-[#FCD535]/30 bg-yellow-50 dark:bg-[#FCD535]/5 p-5 rounded-2xl shadow-sm dark:shadow-none"><div className="text-[13px] text-yellow-700 dark:text-[#FCD535] mb-2 uppercase tracking-wider font-bold">🌍 London ⭐</div><div className="font-bold text-black dark:text-white text-lg font-mono">14:00 – 23:00 (VN)</div><div className="text-[14px] text-yellow-700 dark:text-[#FCD535] mt-2">Sôi động. EUR, GBP mạnh.</div></div>
          <div className="border-2 border-yellow-400 dark:border-[#FCD535]/50 bg-yellow-100 dark:bg-[#FCD535]/10 p-5 rounded-2xl shadow-sm dark:shadow-none"><div className="text-[13px] text-yellow-800 dark:text-[#FCD535] mb-2 uppercase tracking-wider font-bold">🌎 New York ⭐⭐</div><div className="font-bold text-black dark:text-white text-lg font-mono">19:00 – 24:00+ (VN)</div><div className="text-[14px] text-yellow-800 dark:text-[#FCD535] mt-2">Volume cực đỉnh. USD chi phối.</div></div>
          <div className="border border-blue-200 dark:border-[#378ADD]/30 bg-blue-50 dark:bg-[#378ADD]/5 p-5 rounded-2xl shadow-sm dark:shadow-none"><div className="text-[13px] text-blue-700 dark:text-[#378ADD] mb-2 uppercase tracking-wider font-bold">🔄 London + NY overlap</div><div className="font-bold text-black dark:text-white text-lg font-mono">19:00 – 23:00 (VN)</div><div className="text-[14px] text-blue-700 dark:text-[#378ADD] mt-2">Thanh khoản cao nhất ngày.</div></div>
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
        <div className="space-y-5 mb-8">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"><h4 className="text-black dark:text-white font-bold text-lg mb-2">🏛️ Ngân hàng TW (Fed, ECB...) <span className="text-yellow-600 dark:text-[#FCD535] text-[14px] font-normal ml-2">~35% Vol</span></h4><p className="text-gray-600 dark:text-[#848E9C] text-[15px] leading-[1.7]">Quyết định lãi suất. Như "ông trời". Tin cấp 1 mọi trader phải xem.</p></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"><h4 className="text-black dark:text-white font-bold text-lg mb-2">🏦 Tổ chức lớn (Smart Money) <span className="text-green-600 dark:text-[#0ECB81] text-[14px] font-normal ml-2">~55% Vol</span></h4><p className="text-gray-600 dark:text-[#848E9C] text-[15px] leading-[1.7]">"Cá voi". Giao dịch khối lượng khổng lồ. Thường đi ngược đám đông để dọn thanh khoản trước khi đẩy giá.</p></div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"><h4 className="text-black dark:text-white font-bold text-lg mb-2">🏢 Quỹ Đầu Tư & DN <span className="text-blue-600 dark:text-[#378ADD] text-[14px] font-normal ml-2">~8% Vol</span></h4><p className="text-gray-600 dark:text-[#848E9C] text-[15px] leading-[1.7]">Hedging rủi ro tỷ giá cho xuất nhập khẩu.</p></div>
          <div className="bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30 p-6 rounded-2xl shadow-sm dark:shadow-none"><h4 className="text-yellow-700 dark:text-[#FCD535] font-bold text-lg mb-2">🙋 Retail Trader (Chúng ta) <span className="text-red-600 dark:text-[#F6465D] text-[14px] font-normal ml-2">&lt;2% Vol</span></h4><p className="text-gray-800 dark:text-[#EAECEF] text-[15px] leading-[1.7]">Mỗi lệnh của bạn không ảnh hưởng gì đến thị trường. Lợi thế: Có thể "vô hình" vào ra nhanh chóng.</p></div>
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
          Bạn có $10,000, muốn mua nhà $100,000. Ngân hàng cho vay 90% (Đòn bẩy 1:10).<br/><br/>
          Nhà tăng 10% → Bạn lời $10,000 = <strong>100% lợi nhuận</strong> trên vốn.<br/>
          Nhà giảm 10% → Bạn lỗ $10,000 = <strong>Mất trắng toàn bộ vốn</strong>.<br/><br/>
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
        
        <CyberTable 
          headers={["Ký hiệu", "Tên đầy đủ", "Ý nghĩa"]}
          rows={[
            ["<span class='bg-gray-200 dark:bg-[#e8e4da] text-gray-800 dark:text-[#2a2e3a] px-2 py-1 rounded'>O</span>", "Open — Mở cửa", "Giá giao dịch đầu tiên của phiên."],
            ["<span class='bg-green-100 dark:bg-[#d4eddf] text-green-700 dark:text-[#2d7a4f] px-2 py-1 rounded'>H</span>", "High — Cao nhất", "Giá cao nhất trong phiên. Lực đẩy của phe Mua."],
            ["<span class='bg-red-100 dark:bg-[#fae0e0] text-red-700 dark:text-[#b53b3b] px-2 py-1 rounded'>L</span>", "Low — Thấp nhất", "Giá thấp nhất trong phiên. Lực kéo của phe Bán."],
            ["<span class='bg-blue-100 dark:bg-[#dce8fa] text-blue-700 dark:text-[#2a5fad] px-2 py-1 rounded'>C</span>", "Close — Đóng cửa", "<strong>Quan trọng nhất</strong> — kết quả cuối cùng của phiên."]
          ]}
        />

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
        <div className="my-8">
          <h4 className="text-black dark:text-white font-bold text-xl mb-6 transition-colors">Top-Down Analysis (Bắt buộc)</h4>
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl flex gap-5 items-center shadow-sm dark:shadow-none transition-colors">
              <span className="w-10 h-10 rounded-xl bg-yellow-400 dark:bg-[#FCD535] text-black font-black flex items-center justify-center shrink-0 text-lg">1</span>
              <div><strong className="text-black dark:text-white block text-lg mb-1 transition-colors">Mở D1 (Daily)</strong><span className="text-[15px] text-gray-500 dark:text-[#848E9C] transition-colors">Xác định xu hướng tổng thể. Đang Uptrend hay Downtrend? Kẻ S/R.</span></div>
            </div>
            <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl flex gap-5 items-center shadow-sm dark:shadow-none transition-colors">
              <span className="w-10 h-10 rounded-xl bg-blue-500 dark:bg-[#378ADD] text-white font-black flex items-center justify-center shrink-0 text-lg">2</span>
              <div><strong className="text-black dark:text-white block text-lg mb-1 transition-colors">Chuyển xuống H4</strong><span className="text-[15px] text-gray-500 dark:text-[#848E9C] transition-colors">Đợi giá hồi (Pullback) về vùng hợp lưu cản.</span></div>
            </div>
            <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl flex gap-5 items-center shadow-sm dark:shadow-none transition-colors">
              <span className="w-10 h-10 rounded-xl bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black flex items-center justify-center shrink-0 text-lg">3</span>
              <div><strong className="text-black dark:text-white block text-lg mb-1 transition-colors">Dùng H1/M15 để Entry</strong><span className="text-[15px] text-gray-500 dark:text-[#848E9C] transition-colors">Tìm cụm nến đảo chiều (Nến Ôm, Pinbar) để bấm nút.</span></div>
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

export default CHAPTER_1_DATA;