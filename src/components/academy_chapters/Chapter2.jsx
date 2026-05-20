import React, { useState, useEffect, useRef } from 'react';
import {
  Callout, StoryBox, SectionHead, CyberTable, SimpleQuiz, TermCard
} from './SharedComponents.jsx';

// ==========================================
// CHAPTER 2: CÁC COMPONENT TƯƠNG TÁC
// ==========================================

const SimpleQuiz = ({ q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="p-8">
        <div className="text-lg md:text-xl font-bold text-black dark:text-white mb-6 leading-relaxed transition-colors">
          {q}
          {context && <span className="block text-[15px] text-gray-500 dark:text-[#848E9C] font-normal mt-3 italic transition-colors">{context}</span>}
        </div>
        <div className="flex flex-col gap-3">
          {opts.map((opt, i) => {
            const isChosen = selected === i;
            let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-yellow-500 dark:hover:border-[#FCD535] hover:bg-yellow-50 dark:hover:bg-[#FCD535]/5 bg-white dark:bg-transparent";
            let letterClass = "bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C]";
            if (selected !== null) {
              if (i === correctIdx) { btnClass = "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81] font-bold"; letterClass = "bg-green-500 dark:bg-[#0ECB81] text-white"; }
              else if (isChosen) { btnClass = "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]"; letterClass = "bg-red-500 dark:bg-[#F6465D] text-white"; }
              else { btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-400 dark:text-[#64748B] opacity-50 cursor-not-allowed bg-white dark:bg-transparent"; }
            }
            return (
              <button key={i} disabled={selected !== null} onClick={() => setSelected(i)} className={`flex items-start gap-4 p-5 border-2 rounded-2xl text-left transition-all ${btnClass}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 transition-colors ${letterClass}`}>{String.fromCharCode(65+i)}</div>
                <span className="text-[16px] leading-[1.7] mt-1">{opt}</span>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className={`mt-6 p-6 rounded-2xl text-[16px] leading-relaxed animate-in slide-in-from-top-2 ${selected === correctIdx ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

const SRChart = () => {
  const [active, setActive] = useState(null);
  const zones = [
    {y:40, c:'#F6465D', l:'Kháng cự 2 — $2,080', msg:'🔴 KHÁNG CỰ $2,080: Giá đã bị đẩy xuống tại đây 2 lần. Phe bán rất mạnh ở vùng này. Nếu giá vượt qua và đóng cửa trên → sẽ đổi vai thành hỗ trợ mới.'},
    {y:90, c:'#FCD535', l:'Kháng cự → Hỗ trợ $2,020', msg:'🔄 ROLE REVERSAL $2,020: Vùng này từng là kháng cự (giá bị đẩy xuống 2 lần). Sau khi bị phá vỡ, nó đã trở thành hỗ trợ — giá pullback về đây và bật lên. Đây là điểm entry đẹp theo đúng nguyên tắc Role Reversal.'},
    {y:155, c:'#0ECB81', l:'Hỗ trợ mạnh — $1,960', msg:'🟢 HỖ TRỢ $1,960: Vùng hỗ trợ cực mạnh — giá đã test 3 lần và bật lên mỗi lần. Đây là vùng "mua vào" lý tưởng theo xu hướng lớn. Nếu bị phá vỡ → tín hiệu bearish rất mạnh.'}
  ];
  return (
    <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-8">
      <div className="text-[12px] text-gray-400 font-mono uppercase tracking-widest mb-4">// XAU/USD — Nhấp vào các vùng màu sáng để xem giải thích</div>
      <svg viewBox="0 0 700 220" className="w-full h-auto cursor-pointer mb-4">
        {zones.map((z, i) => (
          <g key={i} onClick={() => setActive(i)}>
            <line x1="0" y1={z.y} x2="700" y2={z.y} stroke={z.c} strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
            <rect x="5" y={z.y-12} width="220" height="24" fill="#000" opacity="0.8" rx="4" />
            <text x="15" y={z.y+4} fill={z.c} fontSize="11" fontFamily="monospace" fontWeight="bold">{z.l}</text>
          </g>
        ))}
        <path d="M20,100 L60,95 L100,88 L140,82 L180,75 L220,80 L260,88 L300,82 L340,72 L380,65 L420,58 L460,50 L500,55 L540,48 L580,40 L620,35 L660,28" stroke="rgba(255,255,255,0.7)" strokeWidth="3" fill="none" pointerEvents="none" />
        {[[20,100],[60,95],[100,88],[140,82],[180,75],[220,80],[260,88],[300,82],[340,72],[380,65],[420,58],[460,50],[500,55],[540,48],[580,40],[620,35],[660,28]].map((p,i,arr) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={(i>0&&p[1]<=arr[i-1][1]) ? '#0ECB81' : '#F6465D'} pointerEvents="none" />
        ))}
      </svg>
      <div className="bg-[#181A20] text-[#EAECEF] p-4 rounded-xl text-[14px] leading-relaxed border border-[#2B3139] min-h-[60px]">
        {active === null ? "👆 Nhấp vào các vùng hỗ trợ/kháng cự trên biểu đồ để xem giải thích" : zones[active].msg}
      </div>
    </div>
  );
};

const VolumeChart = () => {
  const [active, setActive] = useState(null);
  const bars = [
    {x:30, ph:40, pb:true, vh:30, vc:'#848E9C', info:'📊 Volume bình thường: Giá tăng nhẹ với volume trung bình. Không có tín hiệu đặc biệt.'},
    {x:80, ph:35, pb:true, vh:25, vc:'#848E9C', info:'📊 Volume thấp: Giá tăng nhưng ít người tham gia. Cần thận trọng.'},
    {x:130, ph:45, pb:true, vh:70, vc:'#0ECB81', info:'🟢 BREAKOUT XÁC NHẬN: Giá phá kháng cự với volume đột biến (~3× bình thường). Đây là breakout thật — nên tin tưởng và tìm entry theo chiều tăng.'},
    {x:180, ph:40, pb:true, vh:15, vc:'#F6465D', info:'🔴 FAKE BREAKOUT: Giá vượt kháng cự nhưng volume cực thấp. Khả năng rất cao là Smart Money "dụ" retail vào, rồi sẽ quay đầu. KHÔNG vào lệnh Buy.'},
    {x:230, ph:25, pb:false, vh:80, vc:'#0ECB81', info:'🟢 SELLING CLIMAX: Giá giảm rất mạnh 1 nến kèm volume cực cao. Đây là lúc mọi người hoảng loạn bán (panic sell). Thường đây là đáy ngắn hạn — sau đó giá thường phục hồi. Tín hiệu mua vào thận trọng sau khi giá ổn định.'},
    {x:280, ph:30, pb:true, vh:20, vc:'#848E9C', info:'📊 Volume giảm dần trong uptrend: Giá tăng nhưng mỗi nến volume nhỏ hơn trước. Xu hướng đang mất động lực. Cân nhắc chốt lời dần.'},
    {x:330, ph:35, pb:true, vh:18, vc:'#FCD535', info:'⚠️ DIVERGENCE: Giá tạo đỉnh mới nhưng volume thấp hơn đỉnh trước. Momentum đang yếu đi — cảnh báo đảo chiều.'},
    {x:380, ph:28, pb:false, vh:45, vc:'#F6465D', info:'🔴 Volume tăng trong downtrend: Giá giảm với volume cao. Phe bán đang rất mạnh. Không nên counter-trade.'}
  ];
  return (
    <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-8">
      <div className="text-[12px] text-gray-400 font-mono uppercase tracking-widest mb-4">// Biểu đồ giá + Volume — Nhấp vào cột volume để xem phân tích</div>
      <svg viewBox="0 0 450 200" className="w-full h-auto cursor-pointer mb-4">
        {bars.map((b, i) => (
          <g key={i} onClick={() => setActive(i)}>
            <rect x={b.x-10} y={80-b.ph} width="20" height={b.ph} fill={b.pb?'#0ECB81':'#F6465D'} opacity="0.8" rx="2" pointerEvents="none" />
            <rect x={b.x-12} y={190-b.vh} width="24" height={b.vh} fill={b.vc} opacity="0.9" rx="2" />
          </g>
        ))}
        <line x1="0" y1="190" x2="450" y2="190" stroke="#2B3139" strokeWidth="2" />
        <line x1="0" y1="80" x2="450" y2="80" stroke="#2B3139" strokeWidth="1" strokeDasharray="4 4" />
        <text x="5" y="75" fill="#848E9C" fontSize="10" fontFamily="monospace">Price</text>
        <text x="5" y="185" fill="#848E9C" fontSize="10" fontFamily="monospace">Volume</text>
      </svg>
      <div className="bg-[#181A20] text-[#EAECEF] p-4 rounded-xl text-[14px] leading-relaxed border border-[#2B3139] min-h-[60px]">
        {active === null ? "👆 Nhấp vào cột volume màu sắc bên trên để xem giải thích" : bars[active].info}
      </div>
    </div>
  );
};

const EMAVisualizer = () => {
  const canvasRef = useRef(null);
  const [maType, setMaType] = useState('all');
  const [period, setPeriod] = useState(21);
  const [market, setMarket] = useState('bull');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || 700;
    canvas.width = W; canvas.height = 240;
    
    // Tạo data giả lập
    const N = 80; let prices = []; let p = market === 'bull' ? 100 : market === 'bear' ? 160 : 120;
    let d = 1;
    for(let i=0; i<N; i++) {
      if(market === 'bull') p += Math.random()*4-1.2;
      else if(market === 'bear') p += Math.random()*4-2.8;
      else { d += Math.random()*0.4-0.2; if(p>140)d=-Math.abs(d); if(p<100)d=Math.abs(d); p+=d; }
      prices.push(Math.max(p, 60));
    }
    
    const minP = Math.min(...prices)-5, maxP = Math.max(...prices)+5;
    const scaleY = h => 220 - ((h-minP)/(maxP-minP))*200;
    const scaleX = i => (i/(N-1))*W;

    ctx.clearRect(0,0,W,240);
    // Draw Price
    ctx.beginPath(); ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 2;
    prices.forEach((pr, i) => i===0 ? ctx.moveTo(scaleX(i), scaleY(pr)) : ctx.lineTo(scaleX(i), scaleY(pr)));
    ctx.stroke();

    const drawLine = (data, color, width) => {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = width;
      let started = false;
      data.forEach((pr, i) => {
        if(pr===null) return;
        if(!started) { ctx.moveTo(scaleX(i), scaleY(pr)); started = true; }
        else ctx.lineTo(scaleX(i), scaleY(pr));
      });
      ctx.stroke();
    };

    // Tính MA
    const ema = [prices[0]]; const k = 2/(period+1);
    for(let i=1; i<N; i++) ema.push(prices[i]*k + ema[i-1]*(1-k));
    
    const sma = prices.map((pr, i) => i<period-1 ? null : prices.slice(i-period+1, i+1).reduce((a,b)=>a+b,0)/period);
    
    const wma = prices.map((pr, i) => {
      if(i<period-1) return null;
      let num=0, den=0;
      for(let j=0; j<period; j++){ num+=(j+1)*prices[i-period+1+j]; den+=j+1; }
      return num/den;
    });

    if(maType==='all'||maType==='ema') drawLine(ema, '#FCD535', 3);
    if(maType==='all'||maType==='sma') drawLine(sma, '#378ADD', 2);
    if(maType==='all'||maType==='wma') drawLine(wma, '#b57bee', 2);

  }, [maType, period, market]);

  const notes = {
    bull: {ema:'📈 Uptrend: EMA21 dốc lên, giá thường xuyên "nằm trên" EMA21. Pullback về EMA21 = cơ hội BUY lý tưởng.', sma:'📈 SMA trong uptrend "lag" nhiều hơn EMA — tín hiệu đến muộn hơn.', wma:'📈 WMA trong uptrend — gần giống EMA nhưng phản ứng hơi chậm hơn.', all:'So sánh: EMA (vàng) phản ứng nhanh nhất, WMA (tím) ở giữa, SMA (xanh) chậm nhất. Trong trending market, EMA cho entry/exit sớm hơn.'},
    bear: {ema:'📉 Downtrend: EMA21 dốc xuống, giá thường "nằm dưới". Rebound lên EMA21 = cơ hội SELL.', sma:'📉 SMA trong downtrend.', wma:'📉 WMA trong downtrend.', all:'Cả 3 đường đều hữu ích để xác nhận downtrend. EMA thường "chỉ hướng" sớm nhất khi xu hướng bắt đầu.'},
    chop: {ema:'😑 Sideway: EMA21 phẳng, giá liên tục cắt qua lại. KHÔNG dùng EMA để trading trong sideway!', sma:'😑 SMA trong sideway cũng không đáng tin.', wma:'😑 WMA trong sideway.', all:'Trong sideway: cả 3 đường đều cho rất nhiều "tín hiệu giả" (false crossovers). Nên đứng ngoài hoặc dùng chiến lược range trading thay vì follow MA.'}
  };

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <span className="text-2xl">📐</span><h3 className="font-bold text-lg text-black dark:text-white flex-1">EMA/SMA/WMA Visualizer</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-3 py-1 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div><label className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Loại MA</label><select value={maType} onChange={e=>setMaType(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white outline-none"><option value="all">Hiển thị tất cả</option><option value="ema">Chỉ EMA</option><option value="sma">Chỉ SMA</option><option value="wma">Chỉ WMA</option></select></div>
        <div><label className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Chu kỳ</label><select value={period} onChange={e=>setPeriod(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white outline-none"><option value="9">9 (Rất nhanh)</option><option value="21">21 (NNN standard)</option><option value="50">50 (Trung hạn)</option></select></div>
        <div><label className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Thị trường</label><select value={market} onChange={e=>setMarket(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white outline-none"><option value="bull">Uptrend</option><option value="bear">Downtrend</option><option value="chop">Sideway</option></select></div>
      </div>
      <canvas ref={canvasRef} className="w-full bg-gray-900 dark:bg-[#0A0D13] rounded-xl mb-4"></canvas>
      <div className="flex gap-6 mb-4 text-sm font-mono text-gray-600 dark:text-[#EAECEF]">
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-white opacity-50"></span> Giá</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#FCD535]"></span> EMA</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#378ADD]"></span> SMA</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#b57bee]"></span> WMA</div>
      </div>
      <div className="bg-gray-50 dark:bg-[#0B0E11] text-gray-800 dark:text-[#EAECEF] p-5 rounded-xl text-[15px] leading-relaxed border border-gray-200 dark:border-[#2B3139]">
        {notes[market][maType]}
      </div>
    </div>
  );
};

const RSISimulator = () => {
  const [val, setVal] = useState(65);
  
  let status = 'NEUTRAL', color = '#848E9C', detail = '';
  if(val < 20) { status = 'OVERSOLD CỰC ĐỘ'; color = '#0ECB81'; detail = 'RSI dưới 20 = bán quá mức nghiêm trọng. KHÔNG vào lệnh ngay. Chờ nến đảo chiều mạnh.'; }
  else if(val < 30) { status = 'OVERSOLD — Cẩn thận'; color = '#0ECB81'; detail = 'RSI 20-30 = oversold tiêu chuẩn. Trong downtrend mạnh, RSI có thể ở đây hàng tuần. Cần xác nhận từ nến đảo chiều.'; }
  else if(val < 45) { status = 'NEUTRAL — Hơi yếu'; color = '#848E9C'; detail = 'RSI 30-45 = nghiêng về giảm. Trong uptrend: pullback bình thường, có thể BUY nếu có setup tốt.'; }
  else if(val < 55) { status = 'NEUTRAL — Cân bằng'; color = '#848E9C'; detail = 'RSI 45-55 = lực mua bán cân bằng. Thị trường đang "nghỉ ngơi".'; }
  else if(val < 70) { status = 'NEUTRAL — Bullish Momentum'; color = '#FCD535'; detail = 'RSI 55-70 = bullish momentum tích cực. Trong uptrend mạnh: giá thường "sống" trong vùng 50-80.'; }
  else if(val < 80) { status = 'OVERBOUGHT — Cẩn thận'; color = '#F6465D'; detail = 'RSI 70-80 = overbought. Cảnh báo: đang mua quá nhiều. Không SELL chỉ vì RSI > 70. Cần Bearish Divergence.'; }
  else { status = 'OVERBOUGHT CỰC ĐỘ'; color = '#F6465D'; detail = 'RSI trên 80 = "sốt" rất cao. Rất rủi ro nếu BUY ở đây. RSI divergence ở đây = đảo chiều mạnh.'; }

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <span className="text-2xl">🌡️</span><h3 className="font-bold text-lg text-black dark:text-white flex-1">RSI Simulator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-3 py-1 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      
      <div className="relative h-6 rounded-full bg-gradient-to-r from-[#0ECB81] via-[#FCD535] to-[#F6465D] mb-4 mx-2">
        <div className="absolute top-[-8px] w-2 h-10 bg-white border-2 border-black rounded-full shadow-lg transition-all duration-300" style={{left: `${val}%`, transform: 'translateX(-50%)'}}></div>
      </div>
      <div className="flex justify-between text-[11px] font-mono text-gray-500 dark:text-[#848E9C] mb-8 px-2">
        <span>0</span><span>30</span><span>50</span><span>70</span><span>100</span>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-black font-mono transition-colors duration-300" style={{color}}>{val}</div>
        <div className="text-lg font-bold mt-2 transition-colors duration-300" style={{color}}>{status}</div>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="range" min="1" max="99" value={val} onChange={e=>setVal(e.target.value)} className="w-full accent-[#0ECB81]" />
        <button onClick={()=>setVal(Math.floor(Math.random()*98)+1)} className="px-6 py-2 bg-gray-100 dark:bg-[#2B3139] text-black dark:text-white font-bold rounded-xl whitespace-nowrap">🎲 Random</button>
      </div>

      <div className="bg-gray-50 dark:bg-[#0B0E11] text-gray-800 dark:text-[#EAECEF] p-5 rounded-xl text-[15px] leading-relaxed border border-gray-200 dark:border-[#2B3139]">
        {detail}
      </div>
    </div>
  );
};

const DivergenceDemo = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <div className="bg-white dark:bg-[#181A20] border border-green-500 dark:border-[#0ECB81] rounded-2xl p-6 shadow-lg">
      <div className="text-xs font-mono text-green-700 dark:text-[#0ECB81] tracking-widest mb-4 font-bold">BULLISH DIVERGENCE 🐂</div>
      <p className="text-[15px] text-gray-700 dark:text-[#EAECEF] mb-6">Giá tạo đáy <strong className="text-black dark:text-white">thấp hơn</strong> nhưng RSI tạo đáy <strong className="text-green-600 dark:text-[#0ECB81]">cao hơn</strong>. Phe bán yếu dần. Cảnh báo đảo chiều TĂNG.</p>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-xl">
        <div className="text-xs font-mono text-gray-400 mb-2">// Giá (xuống)</div>
        <div className="flex items-end gap-2 h-16 mb-4 border-b border-gray-700"><div className="w-10 bg-[#F6465D] h-12 rounded-t-sm"></div><div className="w-10 bg-[#F6465D] h-6 rounded-t-sm"></div><span className="text-xs text-red-500 ml-2 mb-1">Đáy 2 thấp hơn</span></div>
        <div className="text-xs font-mono text-gray-400 mb-2">// RSI (lên)</div>
        <div className="flex items-end gap-2 h-16"><div className="w-10 bg-[#0ECB81]/60 h-4 rounded-t-sm"></div><div className="w-10 bg-[#0ECB81] h-10 rounded-t-sm"></div><span className="text-xs text-green-500 ml-2 mb-1">RSI 2 cao hơn ✅</span></div>
      </div>
    </div>
    <div className="bg-white dark:bg-[#181A20] border border-red-500 dark:border-[#F6465D] rounded-2xl p-6 shadow-lg">
      <div className="text-xs font-mono text-red-700 dark:text-[#F6465D] tracking-widest mb-4 font-bold">BEARISH DIVERGENCE 🐻</div>
      <p className="text-[15px] text-gray-700 dark:text-[#EAECEF] mb-6">Giá tạo đỉnh <strong className="text-black dark:text-white">cao hơn</strong> nhưng RSI tạo đỉnh <strong className="text-red-600 dark:text-[#F6465D]">thấp hơn</strong>. Phe mua yếu dần. Cảnh báo đảo chiều GIẢM.</p>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-xl">
        <div className="text-xs font-mono text-gray-400 mb-2">// Giá (lên)</div>
        <div className="flex items-end gap-2 h-16 mb-4 border-b border-gray-700"><div className="w-10 bg-[#0ECB81] h-10 rounded-t-sm"></div><div className="w-10 bg-[#0ECB81] h-14 rounded-t-sm"></div><span className="text-xs text-green-500 ml-2 mb-1">Đỉnh 2 cao hơn</span></div>
        <div className="text-xs font-mono text-gray-400 mb-2">// RSI (xuống)</div>
        <div className="flex items-end gap-2 h-16"><div className="w-10 bg-[#F6465D] h-12 rounded-t-sm"></div><div className="w-10 bg-[#F6465D]/60 h-6 rounded-t-sm"></div><span className="text-xs text-red-500 ml-2 mb-1">RSI 2 thấp hơn ⚠️</span></div>
      </div>
    </div>
  </div>
);

const RSILab = () => {
  const scenarios = [
    {title:'Tình huống 1: Vàng H4 sau downtrend 2 tuần', p:[70,65,58,52,48,44,50,55], r:[55,48,40,35,28,30,42,51], q:'RSI vừa chạm 28 (oversold) và đang tăng lên 30. Giá cũng có 2 nến tăng nhỏ. Bạn làm gì?', opts:['Vào BUY full size ngay','Chờ thêm xác nhận: nến tăng thân dài + RSI vượt 35 → mới BUY','SELL thêm','Vào BUY ngay vì 2 nến tăng là đủ'], c:1, exp:'RSI oversold không đủ để BUY ngay. Cần xác nhận nến + vùng hỗ trợ.'},
    {title:'Tình huống 2: EUR/USD D1 — Uptrend', p:[40,50,60,70,75,65,60,68], r:[48,55,62,72,75,62,55,65], q:'Trong strong uptrend D1, RSI điều chỉnh từ 75 về 55. Ý nghĩa?', opts:['Xu hướng tăng kết thúc','RSI 55 trong uptrend = bình thường, vẫn có thể BUY','RSI phải về 30 mới mua','Không ý nghĩa'], c:1, exp:'Trong uptrend mạnh, RSI "sống" vùng 50-80. Về 55 là pullback bình thường, cơ hội BUY đẹp.'},
    {title:'Tình huống 3: BTC/USD — Đỉnh mới', p:[50,58,66,72,76,80,82], r:[52,58,64,70,68,65,61], q:'BTC tạo đỉnh cao hơn ($82k) nhưng RSI tạo đỉnh thấp hơn (61 vs 70 trước). Bạn đọc được gì?', opts:['Tín hiệu BUY','Bearish Divergence — cảnh báo GIẢM','Bình thường','RSI 61 vẫn là bullish'], c:1, exp:'Bearish Divergence! Động lực tăng đã kiệt, rủi ro cao nếu BUY mới.'}
  ];
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const s = scenarios[qIdx];
  const isDone = qIdx >= scenarios.length;

  const handleNext = () => {
    if(selected === s.c) setScore(s => s+1);
    setSelected(null); setQIdx(i => i+1);
  };

  if(isDone) return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-10 rounded-3xl text-center shadow-lg my-8 transition-colors">
      <div className="text-5xl mb-4">{score === 3 ? '🎉' : '💪'}</div>
      <h3 className="text-2xl font-black text-green-600 dark:text-[#0ECB81] mb-2">RSI Lab: {score}/3</h3>
      <p className="text-gray-600 dark:text-[#848E9C]">{score === 3 ? 'Xuất sắc! Bạn đọc RSI rất tốt.' : 'Hãy đọc lại Bài RSI và thử lại nhé.'}</p>
      <button onClick={()=>{setQIdx(0);setScore(0);}} className="mt-6 bg-gray-900 dark:bg-[#2B3139] text-white px-6 py-2 rounded-xl font-bold">Làm lại</button>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-md transition-colors">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <h3 className="font-bold text-lg text-black dark:text-white flex items-center gap-2"><span className="text-2xl">🔬</span> RSI Lab</h3>
        <span className="text-xs font-mono text-gray-500 dark:text-[#848E9C]">Câu {qIdx+1}/{scenarios.length}</span>
      </div>
      <div className="text-xs font-mono text-gray-500 dark:text-[#848E9C] mb-4">{s.title}</div>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-2xl mb-6">
        <div className="flex items-end gap-1 h-16 border-b border-gray-700 mb-2 pb-1">
          {s.p.map((v,i) => <div key={i} className={`flex-1 rounded-t-sm opacity-90 ${i>0&&v>=s.p[i-1]?'bg-[#0ECB81]':'bg-[#F6465D]'}`} style={{height:`${v}%`}}></div>)}
        </div>
        <div className="relative flex items-end gap-1 h-12 pt-1">
          <div className="absolute top-[30%] w-full border-t border-dashed border-red-500/50"></div>
          <div className="absolute top-[70%] w-full border-t border-dashed border-green-500/50"></div>
          {s.r.map((v,i) => <div key={i} className={`flex-1 rounded-t-sm z-10 ${v>=70?'bg-[#F6465D]':v<=30?'bg-[#0ECB81]':'bg-[#FCD535]'}`} style={{height:`${v}%`}}></div>)}
        </div>
      </div>
      <div className="text-[16px] font-bold text-black dark:text-white mb-6">{s.q}</div>
      <div className="space-y-3 mb-6">
        {s.opts.map((o,i) => {
          let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-blue-500 dark:hover:border-[#378ADD] bg-white dark:bg-transparent";
          if(selected !== null) {
            if(i === s.c) btnClass = "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]";
            else if(selected === i) btnClass = "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]";
            else btnClass = "border-gray-200 dark:border-[#2B3139] opacity-50 bg-white dark:bg-transparent";
          }
          return <button key={i} disabled={selected!==null} onClick={()=>setSelected(i)} className={`w-full text-left p-4 border-2 rounded-xl text-[15px] transition-all ${btnClass}`}>{String.fromCharCode(65+i)}. {o}</button>
        })}
      </div>
      {selected !== null && (
        <div className={`p-5 rounded-xl mb-6 text-[15px] leading-relaxed ${selected === s.c ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
          {s.exp}
        </div>
      )}
      <button onClick={handleNext} disabled={selected===null} className="w-full bg-blue-600 dark:bg-[#378ADD] text-white py-4 rounded-xl font-bold disabled:opacity-30">Tiếp theo</button>
    </div>
  );
};

const MACDChart = () => (
  <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-3xl p-6 my-8 shadow-xl">
    <div className="text-[12px] text-gray-400 font-mono uppercase tracking-widest mb-6">// MACD Minh họa — Crossover</div>
    <svg viewBox="0 0 700 220" className="w-full h-auto">
      <polyline points="20,90 60,80 100,68 140,55 180,48 220,54 260,62 300,52 340,42 380,35 420,40 460,48 500,55 540,50 580,40 620,32 660,25" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
      <line x1="0" y1="165" x2="700" y2="165" stroke="#2B3139" strokeWidth="2" strokeDasharray="4 4"/>
      <polyline points="20,170 60,165 100,158 140,150 180,155 220,160 260,155 300,148 340,142 380,145 420,150 460,155 500,158 540,153 580,145 620,138 660,132" stroke="#FCD535" strokeWidth="2" fill="none"/>
      <polyline points="20,172 60,168 100,162 140,155 180,154 220,157 260,154 300,150 340,146 380,146 420,149 460,153 500,156 540,154 580,148 620,142 660,135" stroke="#378ADD" strokeWidth="2" fill="none"/>
      {[4,-7,-7,5,3,-2,-5,-4,3,4].map((h, i) => <rect key={i} x={55 + i*40} y={h<0?165:165-h*2} width="10" height={Math.abs(h*2)} fill={h<0?'#0ECB81':'#F6465D'} opacity="0.8" rx="2" />)}
      <line x1="300" y1="115" x2="300" y2="210" stroke="#0ECB81" strokeWidth="2" strokeDasharray="4 4" opacity="0.8"/>
      <text x="310" y="130" fill="#0ECB81" fontSize="12" fontFamily="monospace" fontWeight="bold">Golden Cross → BUY</text>
      <rect x="295" y="181" width="10" height="10" fill="#0ECB81" rx="2"/>
    </svg>
  </div>
);

const DCACalculator = () => {
  const [amt, setAmt] = useState(100); const [freq, setFreq] = useState(30);
  const [months, setMonths] = useState(12); const [growth, setGrowth] = useState(30);

  const rate = Math.pow(1 + growth/100, 1/(365/freq)) - 1;
  let inv = 0, val = 0;
  for(let m=1; m<=months; m++){
    for(let p=0; p<Math.round(30/freq); p++) { inv+=amt; val=(val+amt)*(1+rate); }
  }
  const pct = inv>0 ? ((val-inv)/inv)*100 : 0;

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <span className="text-2xl">🧮</span><h3 className="font-bold text-lg text-black dark:text-white flex-1">DCA Simulator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-3 py-1 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Tiền mỗi kỳ ($)</label><input type="number" value={amt} onChange={e=>setAmt(Number(e.target.value)||0)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none focus:border-green-500 dark:focus:border-[#0ECB81]"/></div>
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Tần suất</label><select value={freq} onChange={e=>setFreq(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none"><option value={7}>Mỗi tuần</option><option value={30}>Mỗi tháng</option></select></div>
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Thời gian (tháng)</label><input type="number" value={months} onChange={e=>setMonths(Number(e.target.value)||0)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none focus:border-green-500 dark:focus:border-[#0ECB81]"/></div>
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Tăng trưởng/năm (%)</label><input type="number" value={growth} onChange={e=>setGrowth(Number(e.target.value)||0)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none focus:border-green-500 dark:focus:border-[#0ECB81]"/></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-5 rounded-2xl text-center"><div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2">Tổng vốn bỏ vào</div><div className="text-2xl font-black text-black dark:text-white font-mono">${inv.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 p-5 rounded-2xl text-center"><div className="text-xs text-green-700 dark:text-[#0ECB81] uppercase font-bold mb-2">Giá trị cuối</div><div className="text-2xl font-black text-green-700 dark:text-[#0ECB81] font-mono">${val.toLocaleString(undefined,{maximumFractionDigits:0})}</div></div>
        <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-5 rounded-2xl text-center"><div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2">Lợi nhuận</div><div className={`text-2xl font-black font-mono ${pct>=0?'text-green-600 dark:text-[#0ECB81]':'text-red-600 dark:text-[#F6465D]'}`}>{pct>=0?'+':''}{pct.toFixed(1)}%</div></div>
      </div>
      <div className="text-center text-[14px] text-gray-600 dark:text-[#848E9C] mt-4">DCA là chìa khóa kỷ luật giúp người mới sống sót và chiến thắng tâm lý.</div>
    </div>
  );
};

const ResourceCard = ({ type, name, lang, desc, why, link }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden mb-4 bg-white dark:bg-[#181A20] shadow-sm hover:shadow-md dark:shadow-none transition-all">
      <div onClick={()=>setOpen(!open)} className="p-5 flex gap-4 items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B3139]/40">
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] flex justify-center items-center text-xl shrink-0">📚</div>
        <div className="flex-1">
          <div className="text-[11px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1">{type}</div>
          <div className="font-bold text-[16px] text-black dark:text-white">{name}</div>
          <div className="text-[13px] text-gray-500 dark:text-[#64748B] mt-1">{lang}</div>
        </div>
        <div className={`text-2xl text-gray-400 transform transition-transform ${open?'rotate-90':''}`}>›</div>
      </div>
      {open && (
        <div className="p-6 bg-gray-50 dark:bg-[#0B0E11] border-t border-gray-200 dark:border-[#2B3139] animate-in fade-in text-[15px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
          <p className="mb-4">{desc}</p>
          <div className="text-green-700 dark:text-[#0ECB81] font-bold mb-6">→ {why}</div>
          <a href={link} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 dark:bg-[#378ADD] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90">Truy cập tài liệu</a>
        </div>
      )}
    </div>
  );
};

const FinalQuizCh2 = () => {
  const qs = [
    {q:'Vùng kháng cự $2,000 vàng bị phá và giá đóng cửa ở $2,010. Hôm sau giá pullback về $2,000. Đây là cơ hội gì?', opts:['Cơ hội SELL vì đây là kháng cự cũ','Cơ hội BUY theo Role Reversal — $2,000 vừa trở thành hỗ trợ mới','Đứng ngoài vì không chắc chắn','Chờ giá về $1,980 mới mua'], c:1},
    {q:'Xu hướng BTC D1 đang downtrend (LH-LL). Trên H1 có setup BUY đẹp với RSI 28. Bạn nên làm gì?', opts:['BUY theo H1 vì RSI oversold rất mạnh','Không BUY — D1 downtrend = không giao dịch ngược chiều D1','SELL theo D1 nếu H1 cho tín hiệu SELL','Chờ thêm 1 tuần'], c:1},
    {q:'EMA21 > EMA50 > EMA200 và cả 3 đều dốc lên. Tình trạng thị trường là gì?', opts:['Sideway mạnh','Strong Downtrend','Strong Uptrend — chỉ tìm cơ hội BUY','Chuyển đổi xu hướng'], c:2},
    {q:'RSI = 72 sau khi giá tăng liên tiếp 5 ngày trong strong uptrend. Bạn nên làm gì?', opts:['SELL ngay vì RSI overbought','BUY vào vì trong strong uptrend RSI 70+ là bình thường','Đứng ngoài hoàn toàn','Đặt lệnh SELL pending'], c:1},
    {q:'Giá EUR/USD tạo đáy mới thấp hơn ($1.05) nhưng RSI tạo đáy cao hơn (29 vs 22 trước). Đây là gì?', opts:['Bearish Divergence — nên SELL','Bullish RSI Divergence — cảnh báo đảo chiều tăng','Không có ý nghĩa','RSI bị lỗi'], c:1},
    {q:'Volume trong một phiên breakout = 80% trung bình 20 ngày. Bạn đánh giá breakout này thế nào?', opts:['Breakout mạnh, tin tưởng cao','Fake breakout có thể — volume thấp hơn bình thường khi breakout = nghi ngờ','Volume không quan trọng','Nên vào lệnh full size'], c:1},
    {q:'MACD Line vừa cắt Signal Line từ trên xuống (Death Cross) khi cả 2 đang ở trên 0. Tín hiệu này là gì?', opts:['Tín hiệu BUY','Tín hiệu SELL — Bearish Death Cross xác nhận momentum chuyển xuống','Tín hiệu trung lập','MACD không đáng tin'], c:1},
    {q:'WMA khác EMA như thế nào?', opts:['WMA giống SMA hoàn toàn','WMA dùng trọng số tuyến tính (1,2,3...N) còn EMA dùng trọng số hàm mũ — cả 2 đều ưu tiên giá gần hơn nhưng khác cách tính','WMA chậm hơn SMA','EMA và WMA là một'], c:1},
    {q:'Giá tăng mạnh nhưng Histogram MACD đang nhỏ dần mỗi ngày. Tín hiệu gì?', opts:['Xu hướng tăng đang mạnh lên','Momentum đang yếu dần dù giá cao hơn — dạng MACD Divergence, cẩn thận đảo chiều','MACD bị lỗi kỹ thuật','Không có ý nghĩa'], c:1},
    {q:'CHoCH trong uptrend xảy ra khi nào?', opts:['Giá tạo đỉnh mới cao hơn','Giá đóng cửa dưới đáy HL gần nhất — cơ cấu uptrend bị phá lần đầu tiên','EMA21 cắt xuống EMA50','RSI về dưới 50'], c:1}
  ];
  const [answers, setAnswers] = useState({});
  const [showRes, setShowRes] = useState(false);
  const score = Object.keys(answers).filter(k => answers[k] === qs[k].c).length;

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
              let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-yellow-500 dark:hover:border-[#FCD535] bg-white dark:bg-transparent";
              if (showRes) {
                if (isCorrect) btnClass = "border-green-500 dark:border-[#0ECB81] bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81] font-bold";
                else if (isWrong) btnClass = "border-red-500 dark:border-[#F6465D] bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D] opacity-60";
                else btnClass = "border-gray-200 dark:border-[#2B3139] opacity-30 bg-white dark:bg-transparent";
              } else if (isSelected) btnClass = "border-blue-500 dark:border-[#378ADD] bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] font-bold";
              return <button key={oIdx} onClick={() => !showRes && setAnswers({...answers, [qIdx]: oIdx})} className={`text-left p-4 border-2 rounded-2xl text-[16px] transition-all ${btnClass}`}>{String.fromCharCode(65+oIdx)}. {opt}</button>;
            })}
          </div>
        </div>
      ))}
      {!showRes ? (
        <button onClick={() => Object.keys(answers).length === qs.length ? setShowRes(true) : alert("Hãy trả lời hết các câu!")} className="w-full bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black py-5 rounded-2xl text-lg uppercase tracking-widest shadow-lg mt-4 hover:opacity-90">Nộp Bài Kiểm Tra</button>
      ) : (
        <div className="p-10 bg-gradient-to-br from-white to-gray-50 dark:from-[#0B0E11] dark:to-[#181A20] border border-yellow-500 dark:border-[#FCD535] rounded-3xl text-center shadow-lg mt-8">
          <h2 className="text-4xl font-black text-black dark:text-white mb-4">Kết quả: {score}/{qs.length}</h2>
          <p className="text-gray-600 dark:text-[#848E9C] text-[16px] mb-6">{score >= 8 ? "🏆 Xuất sắc! Nắm vững Chương 2! Sẵn sàng học Phương pháp NNN." : "💪 Chưa đạt 8/10. Đọc lại các bài có câu sai, đặc biệt là RSI và S/R."}</p>
          <button onClick={() => {setAnswers({}); setShowRes(false);}} className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:bg-black transition-colors">Làm lại</button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// CHAPTER 2: NỘI DUNG
// ==========================================

export const CHAPTER_2_DATA = [
  {
    id: 0, title: "1. Hỗ trợ & Kháng cự",
    content: (
      <>
        <SectionHead icon="📈" title="Hỗ trợ & Kháng cự" desc="Sàn nhà và Trần nhà của giá. Nền tảng quan trọng nhất trong PTKT." />
        <StoryBox label="Ví dụ siêu dễ hiểu" icon="🏢">
          Hãy tưởng tượng một <strong>quả bóng nảy</strong> trong phòng. Sàn nhà = Hỗ trợ (Support) — quả bóng chạm sàn thì nảy lên. Trần nhà = Kháng cự (Resistance) — quả bóng bay lên chạm trần thì rơi xuống.<br/><br/>
          Nhưng trong trading, sàn và trần <em>không cố định</em> — chúng có thể bị phá vỡ. Và khi trần bị phá, nó trở thành sàn mới. Đây là nguyên tắc <strong>Đổi Vai (Role Reversal)</strong>.
        </StoryBox>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4"><strong>Hỗ trợ (Support)</strong> là vùng giá mà nhiều người mua sẵn sàng mua vào — họ nghĩ "giá thế này là rẻ, mình mua". Lực cầu lớn → giá bật lên.</p>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6"><strong>Kháng cự (Resistance)</strong> là vùng giá mà nhiều người muốn bán ra — họ nghĩ "giá đã lên cao, mình chốt lời". Lực cung lớn → giá bị đẩy xuống.</p>
        
        <SRChart />

        <SectionHead icon="🔄" title="Nguyên tắc Đổi Vai (Role Reversal)" desc="Quan trọng nhất trong S/R" />
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">Kháng cự bị phá vỡ → trở thành hỗ trợ mới. Hỗ trợ bị phá vỡ → trở thành kháng cự mới.</p>
        <div className="space-y-4 mb-6">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">1</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">Kháng cự $2,000 (nhiều người đặt lệnh SELL ở đây). Giá tăng lên $2,000, bị đẩy xuống → <strong>Kháng cự xác nhận.</strong></p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">2</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">Sau nhiều lần, giá vượt qua $2,000 và <strong>đóng cửa trên đó</strong>. Những người SELL bị thua — họ phải mua lại để cắt lỗ.</p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">3</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">$2,000 giờ là <strong>hỗ trợ mới</strong>. Nếu giá về lại, những người đã mua sẽ mua thêm, người chờ cơ hội cũng mua vào.</p></div>
        </div>
        <Callout type="ok" title="Kỹ thuật thực chiến:">Sau khi kháng cự bị phá, đợi giá <em>pullback về test lại</em> vùng đó (giờ là hỗ trợ) + có nến xác nhận → đây là entry đẹp nhất, SL nhỏ, R:R cao.</Callout>

        <SectionHead icon="📐" title="Cách vẽ S/R đúng" desc="5 loại phổ biến nhất" />
        <CyberTable 
          headers={["Loại S/R", "Cách nhận biết", "Ví dụ"]}
          rows={[
            ["Đỉnh/Đáy cũ", "Vùng giá từng là đỉnh hoặc đáy rõ ràng trên D1+", "BTC đỉnh 2021 = $69,000"],
            ["Số tròn", "xx,000 hoặc xx,500 — tâm lý con người", "Vàng $2,000, BTC $100k"],
            ["Đã test nhiều lần", "Giá đã chạm và phản ứng ≥ 3 lần", "Vùng $1,920–1,940 vàng"],
            ["Moving Average", "EMA21, EMA50, EMA200 đóng vai trò động", "EMA200 D1 = hỗ trợ lớn"]
          ]}
        />
        <Callout type="warn" title="Lỗi phổ biến:">Vẽ quá nhiều đường → không biết đường nào quan trọng. Quy tắc: chỉ vẽ 2–4 vùng quan trọng nhất trên D1.</Callout>

        <ExerciseBox title="Vẽ S/R trên TradingView" desc="Thực hiện từng bước dưới đây và ghi lại kết quả:" steps={[
          {d:'Chuyển sang D1. Tìm đỉnh cao nhất trong 6 tháng gần nhất. Vẽ một đường ngang (Horizontal Line). Đây là kháng cự mạnh nhất.'},
          {d:'Tìm đáy thấp nhất trong cùng kỳ. Vẽ đường ngang. Đây là hỗ trợ mạnh nhất.'},
          {d:'Tìm 2–3 vùng mà giá đã phản ứng ít nhất 2 lần. Vẽ <strong>vùng</strong> (Rectangle tool), không phải đường điểm.'}
        ]}/>

        <SimpleQuiz q='Giá BTC đang test vùng $100,000 lần thứ 4. Lần 1, 2, 3 đều bị đẩy xuống. Bạn có thể rút ra điều gì?' opts={['$100k chắc chắn sẽ bị phá','$100k là kháng cự rất mạnh — nhưng càng test nhiều, phá vỡ sẽ càng mạnh','Không bao giờ phá được','Test nhiều lần vô nghĩa']} correctIdx={1} explanation='S/R test càng nhiều càng cứng, nhưng khi vỡ thì lực đi cực kỳ mạnh do quét Stoploss.' />
      </>
    )
  },
  {
    id: 1, title: "2. Xu hướng & Cấu trúc",
    content: (
      <>
        <SectionHead icon="📈" title="3 loại xu hướng" desc="Giao dịch thuận xu hướng là cách dễ kiếm tiền nhất." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-green-50 dark:bg-[#0A0D13] border border-green-200 dark:border-[#0ECB81]/30 p-6 rounded-2xl">
            <div className="text-green-700 dark:text-[#0ECB81] font-mono text-xs font-bold mb-4">UPTREND 🐂</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Đỉnh sau &gt; đỉnh trước (HH)<br/>Đáy sau &gt; đáy trước (HL)</p>
            <div className="font-bold text-green-700 dark:text-[#0ECB81]">→ Chỉ BUY tại HL</div>
          </div>
          <div className="bg-red-50 dark:bg-[#0A0D13] border border-red-200 dark:border-[#F6465D]/30 p-6 rounded-2xl">
            <div className="text-red-700 dark:text-[#F6465D] font-mono text-xs font-bold mb-4">DOWNTREND 🐻</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Đỉnh sau &lt; đỉnh trước (LH)<br/>Đáy sau &lt; đáy trước (LL)</p>
            <div className="font-bold text-red-700 dark:text-[#F6465D]">→ Chỉ SELL tại LH</div>
          </div>
          <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl">
            <div className="text-gray-500 dark:text-[#848E9C] font-mono text-xs font-bold mb-4">SIDEWAY 😑</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Đỉnh ≈ đỉnh trước<br/>Đáy ≈ đáy trước</p>
            <div className="font-bold text-yellow-600 dark:text-[#FCD535]">→ Buy S/R / Đứng ngoài</div>
          </div>
        </div>

        <SectionHead icon="🔍" title="BOS & CHoCH" desc="Đọc cấu trúc chuyên sâu" />
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">Hai khái niệm này giúp bạn <em>đọc sớm hơn</em> khi xu hướng thay đổi — thay vì chờ đến khi quá rõ ràng (và đã muộn).</p>
        <CyberTable 
          headers={["Khái niệm", "Định nghĩa", "Hành động"]}
          rows={[
            ["BOS (Break of Structure)", "Giá phá vỡ đỉnh/đáy trước = xu hướng tiếp diễn", "Tiếp tục giao dịch theo chiều cũ"],
            ["CHoCH (Change of Character)", "Lần đầu tiên xu hướng bị phá: uptrend thủng đáy HL", "Dời SL chặt lại, chờ xác nhận. Cảnh báo đảo chiều."]
          ]}
        />
        
        <SimpleQuiz q='Đang theo dõi USD/JPY. D1 đang downtrend rõ ràng. Trên H1 có setup tăng R:R = 1:3 rất đẹp. Bạn làm gì?' opts={['BUY ngay vì H1 đẹp','Bỏ qua — KHÔNG BAO GIỜ ngược chiều D1','Vào size nhỏ thử','Chờ thêm 1 nến']} correctIdx={1} explanation='Nguyên tắc sống còn: D1 là luật pháp. Đừng chống lại khung lớn.' />
      </>
    )
  },
  {
    id: 2, title: "3. Volume",
    content: (
      <>
        <SectionHead icon="📊" title="Tiếng ồn hay tín hiệu thật?" desc="Volume là 'bằng chứng' của giá." />
        <StoryBox label="Ví dụ" icon="🎭">
          Giá vàng tăng $20. Nếu volume chỉ bằng <strong>10% bình thường</strong> — rất ít người tham gia, có thể là bẫy. Ngược lại: Giá tăng $15 nhưng volume <strong>gấp 3 lần</strong> → hàng triệu giao dịch xảy ra, thị trường thật sự đi lên.
        </StoryBox>
        <VolumeChart />
        <Callout type="tip">Với Crypto, Volume trên Binance rất chuẩn. Với Forex, nó chỉ là tick volume nhưng vẫn phản ánh tương quan mạnh yếu.</Callout>
        <SimpleQuiz q='BTC tăng 8%, phá kháng cự $95k nhưng Volume chỉ bằng 60% trung bình. Đánh giá?' opts={['Breakout mạnh, BUY full','Thận trọng, volume thấp = nguy cơ Fake Breakout','Crypto không cần volume','SELL ngay vì sẽ sập']} correctIdx={1} explanation='Breakout KHÔNG CÓ volume hậu thuẫn tỷ lệ xịt lên đến 80%.' />
      </>
    )
  },
  {
    id: 3, title: "4. EMA & WMA",
    content: (
      <>
        <SectionHead icon="📐" title="Đường trung bình thông minh" desc="EMA21 là trụ cột của phương pháp NNN." />
        <EMAVisualizer />
        
        <SectionHead icon="🎯" title="Bộ 3 EMA Chuẩn" desc="EMA21 (ngắn), EMA50 (trung), EMA200 (dài)" />
        <CyberTable 
          headers={["Trạng thái 3 EMA", "Ý nghĩa", "Chiến lược"]}
          rows={[
            ["<span class='text-green-600 dark:text-[#0ECB81] font-bold'>EMA21 > 50 > 200</span>", "Strong Uptrend", "Chỉ BUY. Mua mọi pullback về EMA21."],
            ["<span class='text-red-600 dark:text-[#F6465D] font-bold'>EMA21 < 50 < 200</span>", "Strong Downtrend", "Chỉ SELL. Bán mọi rebound lên EMA21."],
            ["<span class='text-yellow-600 dark:text-[#FCD535] font-bold'>Đan xen nhau</span>", "Sideway / Chuyển đổi", "Thận trọng. Đứng ngoài."]
          ]}
        />
        <Callout type="tip" title="Golden Cross & Death Cross">EMA21 cắt lên EMA50 = Golden Cross (Tăng dài hạn). Cắt xuống = Death Cross (Giảm).</Callout>
      </>
    )
  },
  {
    id: 4, title: "5. RSI — Chuyên sâu",
    content: (
      <>
        <SectionHead icon="🌡️" title="RSI - Nhiệt kế thị trường" desc="Đo sức nóng để biết khi nào bão hòa." />
        <StoryBox label="Khái niệm" icon="🌡️">
          Trên 70 = "Sốt" (Overbought) — mua quá nhiều, có thể điều chỉnh.<br/>Dưới 30 = "Hạ thân nhiệt" (Oversold) — bán quá nhiều, có thể phục hồi.
        </StoryBox>
        
        <RSISimulator />

        <SectionHead icon="🔍" title="RSI Divergence (Phân kỳ)" desc="Tín hiệu MẠNH NHẤT của RSI" />
        <DivergenceDemo />
        <Callout type="warn">Divergence là cảnh báo, KHÔNG PHẢI điểm vào lệnh ngay. Phải chờ nến xác nhận trên Price Action.</Callout>

        <SectionHead icon="🔬" title="Thực hành RSI Lab" />
        <RSILab />

        <ExerciseBox title="Tìm RSI Divergence" desc="Bật RSI (14) trên chart thực tế:" steps={[
          {d:'Mở BTC/USD H4. Kéo về 3 tháng trước.'},
          {d:'Tìm 1 chỗ <strong>Giá tạo đỉnh cao hơn nhưng RSI đỉnh thấp hơn</strong> (Bearish Divergence).'},
          {d:'Quan sát: Giá có đảo chiều sau đó không? Ghi chép lại xác suất vào Journal.'}
        ]}/>
      </>
    )
  },
  {
    id: 5, title: "6. MACD",
    content: (
      <>
        <SectionHead icon="⚡" title="Đo Momentum" desc="Moving Average Convergence Divergence" />
        <CyberTable 
          headers={["Thành phần", "Cách tính", "Ý nghĩa"]}
          rows={[
            ["MACD Line", "EMA12 - EMA26", "Khoảng cách giữa xu hướng ngắn và dài"],
            ["Signal Line", "EMA9 của MACD", "Làm mượt để tạo tín hiệu Crossover"],
            ["Histogram", "MACD - Signal", "Cột xanh/đỏ thể hiện đà tăng/giảm"]
          ]}
        />
        <MACDChart />
        <Callout type="tip">MACD cực kỳ kém hiệu quả trong Sideway (cắt nhau liên tục). Chỉ dùng khi thị trường có Trend rõ ràng.</Callout>
      </>
    )
  },
  {
    id: 6, title: "7. DCA Strategy",
    content: (
      <>
        <SectionHead icon="💰" title="Đầu tư không cần Timing" desc="Dollar Cost Averaging - Kỷ luật tạo ra lợi nhuận." />
        <StoryBox label="Ví dụ" icon="🛒">
          Thay vì mua 1 cục sợ đu đỉnh, bạn chia tiền mua đều mỗi tháng. Khi giá rẻ → mua được nhiều coin hơn. Khi đắt → mua ít lại. Cuối cùng, <strong>Giá trung bình luôn thấp hơn</strong> so với mua 1 lần.
        </StoryBox>
        <DCACalculator />
        <Callout type="ok">Giai đoạn học nghề (6-12 tháng đầu): Hãy DCA 80% vốn vào Spot/Hold dài hạn. Chỉ dùng 20% vốn để tập trade Active (Future/Margin).</Callout>
      </>
    )
  },
  {
    id: 7, title: "8. Tài liệu tham khảo",
    content: (
      <>
        <SectionHead icon="📚" title="Sách & Video chọn lọc" desc="Không phải Google, đây là những nguồn thực sự đáng giá." />
        <div className="space-y-4">
          <ResourceCard type="Sách Kinh Điển" name="Technical Analysis of the Financial Markets (John Murphy)" lang="Tiếng Anh (600 trang)" desc='Cuốn "Bible" của phân tích kỹ thuật. Bao phủ tất cả mọi thứ từ nến Nhật đến Fibonacci.' why="Nền tảng lý thuyết vững chắc nhất." link="#"/>
          <ResourceCard type="Sách Tâm Lý" name="Trading in the Zone (Mark Douglas)" lang="Tiếng Anh (240 trang)" desc="Tại sao trader có hệ thống tốt vẫn thua? Sách đổi mindset hoàn toàn." why="80% thành công là tâm lý." link="#"/>
          <ResourceCard type="YouTube" name="RSI Indicator Explained (Rayner Teo)" lang="Video (20 phút)" desc="Giải thích RSI từ cơ bản đến filter tín hiệu giả cực kỳ dễ hiểu." why="Hiểu RSI đúng cách." link="#"/>
          <ResourceCard type="Website" name="Investopedia" lang="Free Website" desc="Wikipedia của tài chính. Có mọi định nghĩa sâu sắc nhất." why="Tra cứu thuật ngữ." link="#"/>
        </div>
      </>
    )
  },
  {
    id: 8, title: "9. Quiz tổng kết",
    content: (
      <>
        <SectionHead icon="⭐" title="Kiểm tra năng lực Chương 2" desc="10 câu hỏi cốt lõi." />
        <FinalQuizCh2 />
      </>
    )
  }
];


export default CHAPTER_2_DATA;