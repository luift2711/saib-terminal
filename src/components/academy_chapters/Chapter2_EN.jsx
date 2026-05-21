import { AlertTriangle, Zap, Star, Calculator, TrendingUp, Building, BarChart2, Ruler, Thermometer, Target, DollarSign, Search, Scale, Microscope, Library, CheckCircle, XCircle, RefreshCw, TrendingDown, MinusCircle, Dices, PartyPopper, Dumbbell, Trophy, Users, Radio, ShoppingCart, BookOpen, Landmark, Brain, FileText, Clock, Lightbulb } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  Callout, StoryBox, SectionHead, CyberTable, ExerciseBox
} from '../Sharedcomponents.jsx';

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
          {context && <span className="block text-[15px] text-gray-500 dark:text-[#848E9C] font-medium mt-3 italic transition-colors">{context}</span>}
        </div>
        <div className="flex flex-col gap-3">
          {opts.map((opt, i) => {
            const isChosen = selected === i;
            let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#0B0E11] bg-white dark:bg-[#0B0E11]";
            let letterClass = "bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C]";
            if (selected !== null) {
              if (i === correctIdx) { btnClass = "border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]"; letterClass = "bg-green-500 dark:bg-[#0ECB81] text-white"; }
              else if (isChosen) { btnClass = "border-transparent dark:border-[#F6465D] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#F6465D]/10 text-[#5A1A1A] dark:text-[#F6465D] shadow-[0_4px_15px_rgba(181,59,59,0.2)] dark:shadow-none font-bold relative overflow-hidden"; letterClass = "bg-red-500 dark:bg-[#F6465D] text-white"; }
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
            <strong className="block text-lg mb-2">{selected === correctIdx ? '<CheckCircle size={18} className="inline mr-2"/> Chính xác!' : '<XCircle size={18} className="inline mr-2"/> Chưa đúng.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

const SRChart = () => {
  const [active, setActive] = useState(null);
  const zones = [
    {y:40, c:'#F6465D', l:'Kháng cự 2 — $2,080', msg:'<XCircle size={14} className="inline mr-1 text-red-500"/> KHÁNG CỰ $2,080: Giá đã bị đẩy xuống tại đây 2 lần. Phe bán rất mạnh ở vùng này. Nếu giá vượt qua và đóng cửa trên → sẽ đổi vai thành hỗ trợ mới.'},
    {y:90, c:'#FCD535', l:'Kháng cự → Hỗ trợ $2,020', msg:'<RefreshCw size={14} className="inline mr-1 text-blue-500"/> ROLE REVERSAL $2,020: Vùng này từng là kháng cự (giá bị đẩy xuống 2 lần). Sau khi bị phá vỡ, nó đã trở thành hỗ trợ — giá pullback về đây và bật lên. Đây là điểm entry đẹp theo đúng nguyên tắc Role Reversal.'},
    {y:155, c:'#0ECB81', l:'Hỗ trợ mạnh — $1,960', msg:'<CheckCircle size={14} className="inline mr-1 text-green-500"/> HỖ TRỢ $1,960: Giá đã phản ứng nhiều lần tại vùng này nên đây là vùng đáng chú ý. Không mua mù quáng chỉ vì chạm hỗ trợ; hãy chờ nến xác nhận, xu hướng lớn ủng hộ và đặt SL dưới vùng.'}
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
        {active === null ? " Nhấp vào các vùng hỗ trợ/kháng cự trên biểu đồ để xem giải thích" : zones[active].msg}
      </div>
    </div>
  );
};

const VolumeChart = () => {
  const [active, setActive] = useState(null);
  const bars = [
    {x:30, ph:40, pb:true, vh:30, vc:'#848E9C', info:'<BarChart2 size={14} className="inline mr-1 text-gray-500"/> Volume bình thường: Giá tăng nhẹ với volume trung bình. Không có tín hiệu đặc biệt.'},
    {x:80, ph:35, pb:true, vh:25, vc:'#848E9C', info:'<BarChart2 size={14} className="inline mr-1 text-gray-500"/> Volume thấp: Giá tăng nhưng ít người tham gia. Cần thận trọng.'},
    {x:130, ph:45, pb:true, vh:70, vc:'#0ECB81', info:'<CheckCircle size={14} className="inline mr-1 text-green-500"/> BREAKOUT XÁC NHẬN: Giá phá kháng cự với volume đột biến (~3× bình thường). Đây là breakout thật — nên tin tưởng và tìm entry theo chiều tăng.'},
    {x:180, ph:40, pb:true, vh:15, vc:'#F6465D', info:'<XCircle size={14} className="inline mr-1 text-red-500"/> FAKE BREAKOUT: Giá vượt kháng cự nhưng volume cực thấp. Khả năng rất cao là Smart Money "dụ" retail vào, rồi sẽ quay đầu. KHÔNG vào lệnh Buy.'},
    {x:230, ph:25, pb:false, vh:80, vc:'#0ECB81', info:'<CheckCircle size={14} className="inline mr-1 text-green-500"/> SELLING CLIMAX: Giá giảm rất mạnh 1 nến kèm volume cực cao. Đây là lúc mọi người hoảng loạn bán (panic sell). Thường đây là đáy ngắn hạn — sau đó giá thường phục hồi. Tín hiệu mua vào thận trọng sau khi giá ổn định.'},
    {x:280, ph:30, pb:true, vh:20, vc:'#848E9C', info:'<BarChart2 size={14} className="inline mr-1 text-gray-500"/> Volume giảm dần trong uptrend: Giá tăng nhưng mỗi nến volume nhỏ hơn trước. Xu hướng đang mất động lực. Cân nhắc chốt lời dần.'},
    {x:330, ph:35, pb:true, vh:18, vc:'#FCD535', info:'<AlertTriangle size={14} className="inline mr-1 text-yellow-500"/> DIVERGENCE: Giá tạo đỉnh mới nhưng volume thấp hơn đỉnh trước. Momentum đang yếu đi — cảnh báo đảo chiều.'},
    {x:380, ph:28, pb:false, vh:45, vc:'#F6465D', info:'<XCircle size={14} className="inline mr-1 text-red-500"/> Volume tăng trong downtrend: Giá giảm với volume cao. Phe bán đang rất mạnh. Không nên counter-trade.'}
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
        {active === null ? " Nhấp vào cột volume màu sắc bên trên để xem giải thích" : bars[active].info}
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
    bull: {ema:'<TrendingUp size={14} className="inline mr-1 text-green-500"/> Uptrend: EMA21 dốc lên, giá thường xuyên nằm trên EMA21. Pullback về EMA21 là vùng canh BUY, nhưng vẫn cần price action xác nhận.', sma:'<TrendingUp size={14} className="inline mr-1 text-green-500"/> SMA trong uptrend lag nhiều hơn EMA — tín hiệu đến muộn hơn.', wma:'<TrendingUp size={14} className="inline mr-1 text-green-500"/> WMA ưu tiên giá gần hơn SMA, nhưng cách tính khác EMA.', all:'So sánh: EMA (vàng) phản ứng nhanh, WMA (tím) ở giữa, SMA (xanh) chậm nhất. MA là công cụ bám xu hướng, không phải tín hiệu chắc thắng.'},
    bear: {ema:'<TrendingDown size={14} className="inline mr-1 text-red-500"/> Downtrend: EMA21 dốc xuống, giá thường nằm dưới. Rebound lên EMA21 là vùng canh SELL nếu cấu trúc giảm vẫn còn.', sma:'<TrendingDown size={14} className="inline mr-1 text-red-500"/> SMA trong downtrend cho tín hiệu chậm hơn.', wma:'<TrendingDown size={14} className="inline mr-1 text-red-500"/> WMA phản ứng nhanh hơn SMA nhưng vẫn là chỉ báo trễ.', all:'Cả 3 đường đều hữu ích để xác nhận xu hướng, nhưng đều lag và dễ nhiễu khi thị trường đảo chiều nhanh.'},
    chop: {ema:'<MinusCircle size={14} className="inline mr-1 text-gray-500"/> Sideway: EMA21 phẳng, giá liên tục cắt qua lại. KHÔNG dùng EMA để trading trong sideway!', sma:'<MinusCircle size={14} className="inline mr-1 text-gray-500"/> SMA trong sideway cũng không đáng tin.', wma:'<MinusCircle size={14} className="inline mr-1 text-gray-500"/> WMA trong sideway.', all:'Trong sideway: cả 3 đường đều cho rất nhiều "tín hiệu giả" (false crossovers). Nên đứng ngoài hoặc dùng chiến lược range trading thay vì follow MA.'}
  };

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <Ruler size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-lg text-black dark:text-white flex-1">EMA/SMA/WMA Visualizer</h3>
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
  
  let status, color, detail;
  if(val < 20) { status = 'OVERSOLD CỰC ĐỘ'; color = '#0ECB81'; detail = 'RSI dưới 20 = bán quá mức nghiêm trọng. KHÔNG vào lệnh ngay. Chờ nến đảo chiều mạnh.'; }
  else if(val < 30) { status = 'OVERSOLD — Cẩn thận'; color = '#0ECB81'; detail = 'RSI 20-30 = oversold tiêu chuẩn. Trong downtrend mạnh, RSI có thể ở đây hàng tuần. Cần xác nhận từ nến đảo chiều.'; }
  else if(val < 45) { status = 'NEUTRAL — Hơi yếu'; color = '#848E9C'; detail = 'RSI 30-45 = nghiêng về giảm. Trong uptrend: pullback bình thường, có thể BUY nếu có setup tốt.'; }
  else if(val < 55) { status = 'NEUTRAL — Cân bằng'; color = '#848E9C'; detail = 'RSI 45-55 = lực mua bán cân bằng. Thị trường đang "nghỉ ngơi".'; }
  else if(val < 70) { status = 'NEUTRAL — Bullish Momentum'; color = '#FCD535'; detail = 'RSI 55-70 = bullish momentum tích cực. Trong uptrend mạnh: giá thường "sống" trong vùng 50-80.'; }
  else if(val < 80) { status = 'OVERBOUGHT — Cẩn thận'; color = '#F6465D'; detail = 'RSI 70-80 = overbought. Cảnh báo: đang mua quá nhiều. Không SELL chỉ vì RSI > 70. Cần Bearish Divergence.'; }
  else { status = 'OVERBOUGHT CỰC ĐỘ'; color = '#F6465D'; detail = 'RSI trên 80 = thị trường đang "sốt" rất cao. Rất rủi ro nếu BUY mới ở đây. Divergence tại vùng này là cảnh báo mạnh, nhưng vẫn cần nến xác nhận trước khi vào lệnh ngược chiều.'; }

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <Thermometer size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-lg text-black dark:text-white flex-1">RSI Simulator</h3>
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
        <button onClick={()=>setVal(Math.floor(Math.random()*98)+1)} className="px-6 py-2 bg-gray-100 dark:bg-[#2B3139] text-black dark:text-white font-bold rounded-xl whitespace-nowrap"><Dices size={16} className="inline mr-1"/> Random</button>
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
      <div className="text-xs font-mono text-green-700 dark:text-[#0ECB81] tracking-widest mb-4 font-bold">BULLISH DIVERGENCE (Phe Mua)</div>
      <p className="text-[15px] text-gray-700 dark:text-[#EAECEF] mb-6">Giá tạo đáy <strong className="text-black dark:text-white">thấp hơn</strong> nhưng RSI tạo đáy <strong className="text-green-600 dark:text-[#0ECB81]">cao hơn</strong>. Phe bán yếu dần. Cảnh báo đảo chiều TĂNG.</p>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-xl">
        <div className="text-xs font-mono text-gray-400 mb-2">// Giá (xuống)</div>
        <div className="flex items-end gap-2 h-16 mb-4 border-b border-gray-700"><div className="w-10 bg-[#F6465D] h-12 rounded-t-sm"></div><div className="w-10 bg-[#F6465D] h-6 rounded-t-sm"></div><span className="text-xs text-red-500 ml-2 mb-1">Đáy 2 thấp hơn</span></div>
        <div className="text-xs font-mono text-gray-400 mb-2">// RSI (lên)</div>
        <div className="flex items-end gap-2 h-16"><div className="w-10 bg-[#0ECB81]/60 h-4 rounded-t-sm"></div><div className="w-10 bg-[#0ECB81] h-10 rounded-t-sm"></div><span className="text-xs text-green-500 ml-2 mb-1">RSI 2 cao hơn <CheckCircle size={18} className="inline mr-2"/></span></div>
      </div>
    </div>
    <div className="bg-white dark:bg-[#181A20] border border-red-500 dark:border-[#F6465D] rounded-2xl p-6 shadow-lg">
      <div className="text-xs font-mono text-red-700 dark:text-[#F6465D] tracking-widest mb-4 font-bold">BEARISH DIVERGENCE (Phe Bán)</div>
      <p className="text-[15px] text-gray-700 dark:text-[#EAECEF] mb-6">Giá tạo đỉnh <strong className="text-black dark:text-white">cao hơn</strong> nhưng RSI tạo đỉnh <strong className="text-red-600 dark:text-[#F6465D]">thấp hơn</strong>. Phe mua yếu dần. Cảnh báo đảo chiều GIẢM.</p>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-xl">
        <div className="text-xs font-mono text-gray-400 mb-2">// Giá (lên)</div>
        <div className="flex items-end gap-2 h-16 mb-4 border-b border-gray-700"><div className="w-10 bg-[#0ECB81] h-10 rounded-t-sm"></div><div className="w-10 bg-[#0ECB81] h-14 rounded-t-sm"></div><span className="text-xs text-green-500 ml-2 mb-1">Đỉnh 2 cao hơn</span></div>
        <div className="text-xs font-mono text-gray-400 mb-2">// RSI (xuống)</div>
        <div className="flex items-end gap-2 h-16"><div className="w-10 bg-[#F6465D] h-12 rounded-t-sm"></div><div className="w-10 bg-[#F6465D]/60 h-6 rounded-t-sm"></div><span className="text-xs text-red-500 ml-2 mb-1">RSI 2 thấp hơn <AlertTriangle size={14} className="inline mr-1 text-yellow-500"/></span></div>
      </div>
    </div>
  </div>
);

const RSILab = () => {
  const scenarios = [
    {title:'Tình huống 1: Vàng XAU/USD H4 sau downtrend 2 tuần', p:[70,65,58,52,48,44,50,55], r:[55,48,40,35,28,30,42,51], q:'RSI vừa chạm 28 (oversold) và đang tăng lên 30. Giá cũng có 2 nến tăng nhỏ. Bạn nên làm gì?', opts:['Vào BUY full size ngay vì RSI oversold','Chờ thêm xác nhận: nến tăng thân dài đóng cửa cao hơn + RSI vượt 35 → rồi mới BUY thận trọng','SELL thêm vì RSI 28 có thể tiếp tục xuống 20','Vào BUY ngay vì 2 nến tăng là đủ'], c:1, exp:'RSI 28 là cảnh báo oversold, không phải lệnh BUY. Cần nến xác nhận rõ, RSI bắt đầu hồi và lý tưởng là giá đang ở vùng hỗ trợ.'},
    {title:'Tình huống 2: EUR/USD D1 — Uptrend, RSI điều chỉnh', p:[40,50,60,70,75,65,60,68], r:[48,55,62,72,75,62,55,65], q:'EUR/USD đang trong strong uptrend D1. RSI điều chỉnh từ 75 về 55. Điều này có nghĩa là gì?', opts:['Xu hướng tăng đã kết thúc — nên SELL','RSI 55 trong uptrend = bình thường, momentum nghỉ ngơi; vẫn có thể BUY nếu giá pullback đẹp','RSI phải về 30 mới có thể mua được','Không có ý nghĩa gì'], c:1, exp:'Trong uptrend mạnh, RSI thường sống ở vùng 50-80. RSI về 55 là pullback bình thường, nhất là khi giá về EMA21 hoặc hỗ trợ.'},
    {title:'Tình huống 3: BTC/USD — Bearish RSI Divergence', p:[50,58,66,72,76,80,82], r:[52,58,64,70,68,65,61], q:'BTC tạo đỉnh mới cao hơn ($82k) nhưng RSI tạo đỉnh thấp hơn (61 so với 70 trước đó). Bạn đọc được gì?', opts:['Tín hiệu BUY — giá đang tăng mạnh','Bearish Divergence — momentum đang yếu dù giá cao hơn. Cảnh báo đảo chiều GIẢM','Bình thường, không đáng lo','RSI 61 vẫn là bullish, không cần lo'], c:1, exp:'Đây là Bearish Divergence: giá tạo đỉnh cao hơn nhưng RSI tạo đỉnh thấp hơn. Không nên BUY đuổi; hãy chờ price action xác nhận trước khi nghĩ đến SELL.'},
    {title:'Tình huống 4: XAU/USD M15 — RSI đang ở 85', p:[50,58,66,73,79,84,88,90], r:[55,62,70,76,80,84,87,85], q:'Vàng vừa tăng mạnh sau tin. RSI M15 đang ở 85. Bạn muốn bắt đà vào BUY. Có nên không?', opts:['Vào BUY ngay — momentum rất mạnh','Không — RSI 85 là overbought cực độ, rủi ro mua đỉnh cao. Chờ RSI điều chỉnh về 50-60 rồi mới xem xét BUY','SELL ngay vì RSI quá cao','RSI không quan trọng khi có tin tức tốt'], c:1, exp:'RSI 85 sau spike tin tức là vùng FOMO rất nguy hiểm. Chờ giá ổn định, RSI hạ nhiệt và hình thành hỗ trợ mới sẽ an toàn hơn.'},
    {title:'Tình huống 5: EUR/USD D1 — RSI vượt đường giữa', p:[62,58,55,52,50,54,58,63], r:[38,35,32,30,34,42,50,55], q:'EUR/USD sau downtrend dài. RSI vừa vượt lên trên 50 lần đầu tiên trong 3 tháng. Điều này có ý nghĩa gì?', opts:['Không có ý nghĩa đặc biệt','RSI vượt 50 = momentum chuyển từ bearish sang bullish; đây là tín hiệu quan trọng cho khả năng đảo chiều xu hướng dài hạn','SELL vì đây là kháng cự','Mua ngay vì RSI 55 là cao'], c:1, exp:'RSI vượt 50 sau thời gian dài nằm dưới 50 cho thấy momentum đã đổi pha. Tín hiệu mạnh hơn nếu đi cùng CHoCH và giá vượt EMA21 D1.'}
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
      <div className="text-5xl mb-4">{score === scenarios.length ? '<PartyPopper size={48} className="mx-auto text-green-500 mb-4" />' : '<Dumbbell size={48} className="mx-auto text-blue-500 mb-4" />'}</div>
      <h3 className="text-2xl font-black text-green-600 dark:text-[#0ECB81] mb-2">RSI Lab: {score}/{scenarios.length}</h3>
      <p className="text-gray-600 dark:text-[#848E9C]">{score === scenarios.length ? 'Xuất sắc! Bạn đọc RSI rất tốt.' : 'Hãy đọc lại phần RSI và luyện lại các tình huống bị sai.'}</p>
      <button onClick={()=>{setQIdx(0);setScore(0);}} className="mt-6 bg-gray-900 dark:bg-[#2B3139] text-white px-6 py-2 rounded-xl font-bold">Làm lại</button>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-md transition-colors">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <h3 className="font-bold text-lg text-black dark:text-white flex items-center gap-2"><Microscope size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /> RSI Lab</h3>
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
          let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#0B0E11] bg-white dark:bg-[#0B0E11]";
          if(selected !== null) {
            if(i === s.c) btnClass = "border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]";
            else if(selected === i) btnClass = "border-transparent dark:border-[#F6465D] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#F6465D]/10 text-[#5A1A1A] dark:text-[#F6465D] shadow-[0_4px_15px_rgba(181,59,59,0.2)] dark:shadow-none font-bold relative overflow-hidden";
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
        <Calculator size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-lg text-black dark:text-white flex-1">DCA Simulator</h3>
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
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[400px] text-[13px] border border-gray-200 dark:border-[#2B3139] rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C] text-[11px] uppercase tracking-wider border-b border-gray-200 dark:border-[#2B3139]">
              <th className="p-3 font-bold">Tháng</th>
              <th className="p-3 font-bold">Đã bỏ vào</th>
              <th className="p-3 font-bold">Giá trị</th>
              <th className="p-3 font-bold">Lợi nhuận</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {Array.from({length: Math.min(months, 24)}, (_, i) => {
              const m = i + 1;
              const kPerPeriod = Math.round(30/freq);
              let invested = 0, value = 0;
              const monthRate = Math.pow(1 + growth/100, 1/(365/freq)) - 1;
              for(let mm=1; mm<=m; mm++) {
                for(let p=0; p<kPerPeriod; p++) { invested+=amt; value=(value+amt)*(1+monthRate); }
              }
              const pctM = invested > 0 ? ((value-invested)/invested)*100 : 0;
              const isLast = m === Math.min(months, 24);
              return (
                <tr key={m} className={`border-b border-gray-100 dark:border-[#2B3139]/50 last:border-0 ${
                  isLast ? 'bg-green-50 dark:bg-[#0ECB81]/10 font-bold' : 'hover:bg-gray-50 dark:hover:bg-[#1A2639]/20'
                }`}>
                  <td className="p-3 font-mono text-gray-600 dark:text-[#848E9C]">T{m}</td>
                  <td className="p-3 font-mono text-black dark:text-white">${invested.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                  <td className={`p-3 font-mono font-bold ${value >= invested ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>${value.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                  <td className={`p-3 font-mono font-bold ${pctM >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{pctM >= 0 ? '+' : ''}{pctM.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] flex justify-center items-center text-xl shrink-0"><Library size={20} className="text-[#d97706] dark:text-[#00d084]"/></div>
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
    {q:'Bạn DCA mua BTC: T1 mua $500 ở $60,000; T2 mua $500 ở $40,000; T3 mua $500 ở $30,000. Giá BTC trung bình bạn mua được gần nhất là bao nhiêu?', opts:['$43,333 (trung bình cộng đơn giản)','$40,000 (thực tế thấp hơn trung bình cộng vì mua được nhiều BTC hơn khi giá rẻ)','$30,000 (giá thấp nhất)','$60,000 (giá cao nhất)'], c:1},
    {q:'WMA khác EMA như thế nào?', opts:['WMA giống SMA hoàn toàn','WMA dùng trọng số tuyến tính (1,2,3...N) còn EMA dùng trọng số hàm mũ — cả 2 đều ưu tiên giá gần hơn nhưng khác cách tính','WMA chậm hơn SMA','EMA và WMA là một'], c:1},
    {q:'Giá tăng mạnh nhưng Histogram MACD đang nhỏ dần mỗi ngày. Tín hiệu gì?', opts:['Xu hướng tăng đang mạnh lên','Momentum đang yếu dần dù giá cao hơn — dạng MACD Divergence, cẩn thận đảo chiều','MACD bị lỗi kỹ thuật','Không có ý nghĩa'], c:1},
    {q:'CHoCH trong uptrend xảy ra khi nào?', opts:['Giá tạo đỉnh mới cao hơn','Giá đóng cửa dưới đáy HL gần nhất — cơ cấu uptrend bị phá lần đầu tiên','EMA21 cắt xuống EMA50','RSI về dưới 50'], c:1},
    {q:'Bạn muốn vào BUY vàng XAU/USD. Bao nhiêu điều kiện hội tụ sau đây là lý tưởng nhất? (A) D1 uptrend rõ. (B) Giá pullback về EMA21. (C) RSI điều chỉnh về 45-50. (D) Có Hammer tại Fibonacci 62%. (E) Volume tăng nhẹ trên nến xác nhận.', opts:['Chỉ cần A là đủ','A + B là đủ','A + B + C + D + E — càng nhiều điều kiện hội tụ, xác suất setup càng cao','D + E là quan trọng nhất'], c:2}
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
              let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#0B0E11] bg-white dark:bg-[#0B0E11]";
              if (showRes) {
                if (isCorrect) btnClass = "border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]";
                else if (isWrong) btnClass = "border-transparent dark:border-[#F6465D] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#F6465D]/10 text-[#5A1A1A] dark:text-[#F6465D] shadow-[0_4px_15px_rgba(181,59,59,0.2)] dark:shadow-none font-bold relative overflow-hidden opacity-60";
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
          <p className="text-gray-600 dark:text-[#848E9C] text-[16px] mb-6">{score >= 10 ? <><Trophy size={18} className="inline mr-1 text-yellow-500" /> Xuất sắc! Nắm vững Chương 2! Sẵn sàng học Phương pháp NNN.</> : <><Dumbbell size={48} className="mx-auto text-blue-500 mb-4" /> Chưa đạt 10/12. Đọc lại các bài có câu sai, đặc biệt là RSI và S/R.</>}</p>
          <button onClick={() => {setAnswers({}); setShowRes(false);}} className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:bg-black transition-colors">Làm lại</button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// CHAPTER 2: NỘI DUNG
// ==========================================

const CHAPTER_2_DATA = [
  {
    id: 0, title: "1. Support & Resistance",
    content: (
      <>
        <SectionHead icon={<TrendingUp size={16}/>} title="Support & Resistance" desc="The Floor and Ceiling of price. The most important foundation in Technical Analysis." />
        <StoryBox label="A Simple Analogy" icon={<Building size={16}/>}>
          Imagine a <strong>bouncing ball</strong> in a room. The floor = Support — when the ball hits the floor, it bounces up. The ceiling = Resistance — when the ball hits the ceiling, it drops down.<br/><br/>
          But in trading, the floor and ceiling are <em>not fixed</em> — they can be broken. And when a ceiling is broken, it becomes a new floor. This is the principle of <strong>Role Reversal</strong>.
        </StoryBox>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4"><strong>Support</strong> is a price zone where many buyers are willing to buy — they think "this price is cheap, I'll buy". High demand → price bounces up.</p>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6"><strong>Resistance</strong> is a price zone where many sellers want to sell — they think "the price is high, I'll take profits". High supply → price is pushed down.</p>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">These zones exist because <em>people remember prices</em>. Someone who bought BTC at $50,000 and got stuck when price dropped to $30,000 will often want to sell when price returns to $50,000 to break even. When many people think alike, a resistance zone forms.</p>
        <div className="space-y-4 mb-6">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">1</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">Resistance $2,000 (many place SELL orders here). Price rises to $2,000, gets pushed down → <strong>Resistance confirmed.</strong></p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">2</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">After several times, price breaks above $2,000 and <strong>closes above it</strong>. Sellers are losing — they have to buy back to cut losses.</p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">3</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">$2,000 is now <strong>new support</strong>. If price returns, previous buyers will buy more, and those waiting for a chance will also buy.</p></div>
        </div>
        <Callout type="ok" title="Practical Technique:">After a resistance is broken, wait for price to <em>pullback and retest</em> that zone (now support) + wait for confirmation candle → this is the best entry, tight SL, high R:R.</Callout>

        <SectionHead icon={<Ruler size={16}/>} title="How to Draw S/R correctly" desc="5 most common types" />
        <CyberTable 
          headers={["S/R Type", "How to identify", "Example"]}
          rows={[
            ["Old High/Low", "Price zone that was clearly a high or low on D1+", "BTC 2021 peak = $69,000"],
            ["Round Numbers", "xx,000 or xx,500 — human psychology", "Gold $2,000, BTC $100k"],
            ["Tested Multiple Times", "Price touched and reacted ≥ 3 times", "$1,920–1,940 Gold zone"],
            ["Price Gap", "Price gap due to news or market open; price often returns to test", "Monday opening gap"],
            ["Moving Average", "EMA21, EMA50, EMA200 act as dynamic S/R", "EMA200 D1 = major support"]
          ]}
        />
        <Callout type="warn" title="Common Mistake:">Drawing too many lines → not knowing which one is important. Rule: keep only 2-4 most important zones on D1, prioritize zones with clear reactions on Weekly/Daily.</Callout>

        <ExerciseBox title="Draw S/R on TradingView" desc="Follow these steps and note down the results:" steps={[
          {d:'Switch to D1. Find the highest peak in the last 6 months. Draw a Horizontal Line. This is the strongest resistance.'},
          {d:'Find the lowest bottom in the same period. Draw a horizontal line. This is the strongest support.'},
          {d:'Find 2-3 zones where price has reacted at least twice. Draw a <strong>zone</strong> (Rectangle tool), not a single point line.'},
          {d:'Check if any zone was once resistance then switched role to support. That is Role Reversal in action.'}
        ]}/>

        <SimpleQuiz q='The $1,960 zone was resistance 3 times. Today price closed at $1,965 — breaking above $1,960. The next day price pulls back to $1,960. What should you do?' context='Hint: Think about Role Reversal.' opts={['SELL — because it is still old resistance','Wait for confirmation then BUY — $1,960 just flipped into new support','Do nothing, stay out','Wait for price to drop to $1,900']} correctIdx={1} explanation='Role Reversal: old resistance was broken and can become new support. Better entry with confirmation candle, SL below the zone.' />
        <SimpleQuiz q='BTC is testing the $100,000 zone for the 4th time. Times 1, 2, 3 were all pushed down. What can you conclude?' opts={['$100k will definitely be broken','$100k is a very important resistance — the more tests, the more market attention; if it breaks, the move can be very strong','Will never break','Testing multiple times means nothing']} correctIdx={1} explanation='A heavily tested zone is significant, but not impenetrable. Each retest can consume pending orders; when a real breakout happens, stop losses and breakout orders can make price move fast.' />
        <SimpleQuiz q='You draw a resistance line and price just peeks above it by 5 pips then closes back below. Is this a real breakout?' opts={['Yes — price went above, so BUY immediately','No — this could be a wick rejection or fake breakout. Need a clear close above resistance to confirm','Maybe a breakout, enter with tight SL','Does not matter, as long as price goes up']} correctIdx={1} explanation='A wick poking through is not a breakout. For beginners, wait for a clear close on the other side of the S/R zone to reduce fakeout risk.' />
      </>
    )
  },
  {
    id: 1, title: "2. Trend & Structure",
    content: (
      <>
        <SectionHead icon={<TrendingUp size={16}/>} title="3 Types of Trends" desc="Trading with the trend is the easiest way to make money." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-green-50 dark:bg-[#0A0D13] border border-green-200 dark:border-[#0ECB81]/30 p-6 rounded-2xl">
            <div className="text-green-700 dark:text-[#0ECB81] font-mono text-xs font-bold mb-4">UPTREND (Buyers)</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Higher Highs (HH)<br/>Higher Lows (HL)</p>
            <div className="font-bold text-green-700 dark:text-[#0ECB81]">→ Only BUY at HL</div>
          </div>
          <div className="bg-red-50 dark:bg-[#0A0D13] border border-red-200 dark:border-[#F6465D]/30 p-6 rounded-2xl">
            <div className="text-red-700 dark:text-[#F6465D] font-mono text-xs font-bold mb-4">DOWNTREND (Sellers)</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Lower Highs (LH)<br/>Lower Lows (LL)</p>
            <div className="font-bold text-red-700 dark:text-[#F6465D]">→ Only SELL at LH</div>
          </div>
          <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl">
            <div className="text-gray-500 dark:text-[#848E9C] font-mono text-xs font-bold mb-4">SIDEWAY <MinusCircle size={14} className="inline mr-1 text-gray-500"/></div>
            <p className="text-sm dark:text-[#848E9C] mb-4">High ≈ Previous High<br/>Low ≈ Previous Low</p>
            <div className="font-bold text-yellow-600 dark:text-[#FCD535]">→ Trade S/R / Stay out</div>
          </div>
        </div>

        <SectionHead icon={<Search size={16}/>} title="BOS & CHoCH" desc="Advanced structure reading" />
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">These two concepts help you <em>read earlier</em> when a trend changes — instead of waiting until it's too obvious (and late).</p>
        <CyberTable 
          headers={["Concept", "Definition", "Action"]}
          rows={[
            ["BOS (Break of Structure)", "Price breaks previous High/Low = trend continuation", "Continue trading in the same direction"],
            ["CHoCH (Change of Character)", "First time trend is broken: uptrend breaks HL or downtrend breaks LH", "Tighten SL, do not open new trades in old direction. This is a warning, not 100% confirmation."],
            ["Full Reversal", "CHoCH confirmed then market BOS in opposite direction", "Can start finding setups in the new trend direction."]
          ]}
        />
        
        <SimpleQuiz q='After a HH-HL-HH sequence in an uptrend, price closes below the most recent HL. What is this signal?' opts={['BOS — uptrend continues, buy more','CHoCH — reversal warning, do not open new Buy and tighten SL','Means nothing, market is still in uptrend','Definite SELL signal, enter immediately']} correctIdx={1} explanation='Closing below HL is a CHoCH: the uptrend structure is broken for the first time. It is a strong warning, but still needs further confirmation before reversing positions.' />
        <SimpleQuiz q='Watching USD/JPY. D1 is clearly downtrending. On H1 there is a nice Buy setup with R:R = 1:3. What do you do?' opts={['BUY immediately because H1 looks good','Skip it — NEVER trade against D1','Enter with a small size to try','Wait for 1 more candle']} correctIdx={1} explanation='Vital rule: D1 is the law. Do not fight the higher timeframe.' />
      </>
    )
  },
  {
    id: 2, title: "3. Volume",
    content: (
      <>
        <SectionHead icon={<BarChart2 size={16}/>} title="Noise or Real Signal?" desc="Volume is the 'evidence' of price." />
        <StoryBox label="Example" icon={<Users size={16} className="inline mr-1 text-purple-500" />}>
          Gold price rises $20. If volume is only <strong>10% of normal</strong> — very few participants, could be a trap. Conversely: Price rises $15 but volume is <strong>3x normal</strong> → millions of trades happened, the market is truly going up.
        </StoryBox>
        <VolumeChart />
        <CyberTable
          headers={["Scenario", "Price", "Volume", "Meaning", "Action"]}
          rows={[
            ["Confirmed Breakout", "Strong rise above resistance", "Unusually high", "Many real buyers participating", "Can look for BUY after price holds the breakout zone"],
            ["Fake Breakout", "Rise above resistance", "Low", "Few participants, suspicious breakout", "Wait for further confirmation candles"],
            ["Weakening Trend", "Price rises but range shrinks", "Decreasing", "Momentum is fading", "Consider taking partial profits"],
            ["Selling Climax", "Very strong drop in one session", "Extremely high", "Crowd panic selling, often near short-term bottom", "Only look for BUY after price stabilizes"]
          ]}
        />
        <Callout type="tip">For Crypto, volume on major exchanges like Binance/OKX is quite useful. For Forex, MT4/MT5 often only have <strong>tick volume</strong> — the number of price changes, not actual traded volume. Use volume as a confirmation filter, not a standalone entry reason.</Callout>
        <SimpleQuiz q='BTC jumps 8%, breaking $95k resistance but Volume is only 60% of average. Assessment?' opts={['Strong breakout, full BUY','Cautious, low volume = Fake Breakout risk','Crypto does not need volume','SELL immediately because it will dump']} correctIdx={1} explanation='A breakout with lower than average volume is suspicious. Wait 1-2 candles, see if price holds above old resistance and if volume increases.' />
      </>
    )
  },
  {
    id: 3, title: "4. EMA & WMA",
    content: (
      <>
        <SectionHead icon={<Ruler size={16}/>} title="Smart Moving Averages" desc="EMA21 is the pillar of the NNN method." />
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">Imagine tracking a student's scores over 5 tests: <strong>60, 70, 65, 80, 90</strong>. How you calculate the average determines whether recent data is prioritized.</p>
        <CyberTable
          headers={["MA Type", "Meaning", "Strengths", "Weaknesses"]}
          rows={[
            ["SMA (Simple)", "Simple arithmetic average. All data weighted equally.", "Easy to understand, smooth", "Most lagging"],
            ["EMA (Exponential)", "Recent prices weighted heavier exponentially.", "Fast reaction, fits short-medium term trading", "More noise than SMA"],
            ["WMA (Weighted)", "Recent prices weighted heavier linearly.", "Faster than SMA, easy to explain", "Less popular than EMA"]
          ]}
        />
        <Callout type="tip" title="EMA Formula">Multiplier = 2 / (N + 1). E.g. EMA21 has multiplier = 2 / 22 ≈ 0.0909. Today's EMA = Close × multiplier + Yesterday's EMA × (1 - multiplier).</Callout>
        {/* 3-EMA Static Diagram */}
        <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-8">
          <div className="text-[12px] text-gray-400 font-mono uppercase tracking-widest mb-2">// 3 EMAs — Stacking order determines trend</div>
          <svg viewBox="0 0 700 160" className="w-full h-auto min-w-[500px]" role="img">
            {/* STRONG UPTREND annotation zone */}
            <rect x="350" y="10" width="320" height="130" fill="#00d08408" rx="4"/>
            <text x="490" y="30" fill="#00d084" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.7">STRONG UPTREND</text>
            <text x="490" y="45" fill="#00d084" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.5">EMA21 &gt; EMA50 &gt; EMA200</text>
            {/* Price line */}
            <polyline points="20,130 60,125 100,118 140,110 180,105 220,98 260,92 300,88 340,80 380,70 420,58 460,45 500,35 540,28 580,22 640,15" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none"/>
            {/* EMA200 - purple (slowest) */}
            <polyline points="20,148 80,145 140,140 200,135 260,128 320,120 380,110 440,98 500,88 560,80 640,72" stroke="#b57bee" strokeWidth="2.5" fill="none" opacity="0.9"/>
            <text x="648" y="76" fill="#b57bee" fontSize="11" fontFamily="monospace">EMA200</text>
            {/* EMA50 - blue */}
            <polyline points="20,142 80,138 140,132 200,124 260,116 320,106 380,94 440,80 500,68 560,58 640,50" stroke="#4a9eff" strokeWidth="2.5" fill="none" opacity="0.9"/>
            <text x="648" y="54" fill="#4a9eff" fontSize="11" fontFamily="monospace">EMA50</text>
            {/* EMA21 - gold (fastest) */}
            <polyline points="20,135 80,128 140,120 200,110 260,100 320,88 380,74 440,58 500,44 560,32 640,22" stroke="#d97706" strokeWidth="3" fill="none"/>
            <text x="648" y="26" fill="#d97706" fontSize="11" fontFamily="monospace">EMA21</text>
            {/* Dividing line showing trend boundary */}
            <line x1="340" y1="0" x2="340" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
          </svg>
          <div className="flex gap-6 mt-3 text-[13px] font-mono text-gray-400 flex-wrap">
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-white opacity-30 inline-block"></span> Price</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#d97706] inline-block"></span> EMA21 (Fastest)</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#4a9eff] inline-block"></span> EMA50</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#b57bee] inline-block"></span> EMA200 (Slowest)</span>
          </div>
        </div>
        <EMAVisualizer />
        
        <SectionHead icon={<Target size={16}/>} title="Standard 3 EMAs" desc="EMA21 (Short), EMA50 (Mid), EMA200 (Long)" />
        <CyberTable 
          headers={["3 EMA Status", "Meaning", "Strategy"]}
          rows={[
            ["<span class='text-green-600 dark:text-[#0ECB81] font-bold'>EMA21 > 50 > 200</span>", "Strong Uptrend", "Only BUY. Buy every pullback to EMA21."],
            ["<span class='text-red-600 dark:text-[#F6465D] font-bold'>EMA21 < 50 < 200</span>", "Strong Downtrend", "Only SELL. Sell every rebound to EMA21."],
            ["<span class='text-yellow-600 dark:text-[#FCD535] font-bold'>Tangled together</span>", "Sideway / Transition", "Cautious. Stay out."],
            ["<span class='text-[#d97706] dark:text-[#f5a623] font-mono'>Golden Cross</span>", "EMA21 crosses above EMA50 (both sloping up)", "Strong signal — only look for BUY, no SELL"],
            ["<span class='text-red-600 dark:text-[#F6465D] font-mono'>Death Cross</span>", "EMA21 crosses below EMA50 (both sloping down)", "Bearish signal — only look for SELL, careful with BUY"]
          ]}
        />
        <Callout type="warn" title="Do not idolize EMAs">EMA21 pullback is an entry watching zone, not an automatic order. If market is sideway, EMAs will be constantly crossed and create many false signals.</Callout>
        <Callout type="tip" title="Golden Cross & Death Cross">EMA21 crossing above EMA50 = Golden Cross, warning uptrend might form. EMA21 crossing below EMA50 = Death Cross, warning downtrend might form. Both need checking in D1 context.</Callout>
        <ExerciseBox title="Setup and read 3 EMAs" desc="Practice adding EMAs to chart and reading signals:" steps={[
          {d:'TradingView → Indicators → add EMA 3 times with periods <strong>21, 50, 200</strong>. Change colors: 21=gold, 50=blue, 200=purple.'},
          {d:'Open XAU/USD D1. Find a time EMA21 crossed EMA50 in the last year. Did price continue or reverse?'},
          {d:'Zoom into last 3 months. Notice if price is above or below EMA21, is it riding the EMA21.'},
          {d:'Turn on WMA21 and compare with EMA21: which one reacts faster when price moves sharply?'}
        ]}/>
        <SimpleQuiz q='EUR/USD D1 has EMA21 > EMA50 > EMA200 and all 3 are sloping up. Price pulls back to EMA21 and a Hammer candle appears. What should you do?' opts={['SELL — price is pulling back, trend is weakening','BUY cautiously — 3 EMAs confirm uptrend, EMA21 pullback + Hammer is a great setup with proper risk management','Wait for price to hit EMA50 before buying','Stay out because price is pulling back']} correctIdx={1} explanation='This is a trend-following setup: EMAs stacked bullish, price pulls back to EMA21 with confirmation candle. Still need SL below Hammer low and check S/R zones.' />
        <SimpleQuiz q='Why are EMAs often preferred over SMAs in short-medium term trading?' opts={['EMA gives more signals so it is more certain','EMA reacts faster to recent prices due to exponential weighting, so signals arrive earlier than SMA','EMA is 100% accurate','Because all pro traders use EMA so we must follow']} correctIdx={1} explanation='EMA prioritizes most recent data, so it lags less than SMA in trending markets. But faster reaction also means more noise.' />
      </>
    )
  },
  {
    id: 4, title: "5. Advanced RSI",
    content: (
      <>
        <SectionHead icon={<Thermometer size={16}/>} title="RSI - Market Thermometer" desc="Measure the heat to know when it's saturated." />
        <StoryBox label="Concept" icon={<Thermometer size={16}/>}>
          Above 70 = "Fever" (Overbought) — buying too much, might correct.<br/>Below 30 = "Hypothermia" (Oversold) — selling too much, might recover.
        </StoryBox>
        <SectionHead icon={<Calculator size={16}/>} title="How does RSI work?" desc="Simple formula to understand the nature." />
        <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-6 font-mono text-[14px] text-gray-200 leading-[1.8]">
          <div>RS = Average Gain of 14 days / Average Loss of 14 days</div>
          <div>RSI = 100 - (100 / (1 + RS))</div>
          <div className="mt-4 text-[#FCD535]">Example: RS = 1.5 / 0.8 = 1.875 → RSI ≈ 65.2 → Neutral-Bullish</div>
        </div>
        
        <RSISimulator />

        <SectionHead icon={<Search size={16}/>} title="RSI Divergence" desc="The STRONGEST signal of RSI" />
        <DivergenceDemo />
        <Callout type="warn">Divergence is a warning, NOT an immediate entry point. Must wait for confirmation candle on Price Action.</Callout>

        <SectionHead icon={<Microscope size={16}/>} title="RSI Lab Practice" />
        <RSILab />

        <SectionHead icon={<AlertTriangle size={16}/>} title="Most common mistakes when using RSI" />
        <div className="space-y-4 my-8">
          {[
            ['Buy immediately when RSI < 30, sell immediately when RSI > 70', 'RSI can stay below 30 for weeks in a strong downtrend. Oversold does not mean it will go up right away.'],
            ['Ignoring overall trend', 'RSI = 80 in a strong uptrend can be normal. Extremely high RSI after a short-term spike is more concerning.'],
            ['Using RSI alone', 'RSI is a confirmation indicator, not a standalone trading system. Combine it with S/R, EMAs, and price action.'],
            ['Not adjusting thresholds to context', 'In a strong uptrend, the 40-50 zone can be relatively oversold. In a strong downtrend, 50-60 can be relatively overbought.']
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-4 items-start bg-red-50 dark:bg-[#F6465D]/10 border border-red-100 dark:border-[#F6465D]/20 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D] font-bold flex items-center justify-center shrink-0">×</div>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-gray-800 dark:text-[#EAECEF]"><strong>{title}</strong> — {desc}</p>
            </div>
          ))}
        </div>

        <ExerciseBox title="Find RSI Divergence" desc="Turn on RSI (14) on a real chart:" steps={[
          {d:'Open BTC/USD H4. Scroll back 3 months.'},
          {d:'Find 1 spot where <strong>Price makes a higher high but RSI makes a lower high</strong> (Bearish Divergence).'},
          {d:'Find 1 spot where <strong>Price makes a lower low but RSI makes a higher low</strong> (Bullish Divergence).'},
          {d:'Observe: Did price reverse afterwards? How many candles/days did it take? Log results in Journal.'}
        ]}/>
      </>
    )
  },
  {
    id: 5, title: "6. MACD",
    content: (
      <>
        <SectionHead icon={<Zap size={16}/>} title="Measuring Momentum" desc="Moving Average Convergence Divergence" />
        <CyberTable 
          headers={["Component", "Calculation", "Meaning"]}
          rows={[
            ["MACD Line", "EMA12 - EMA26", "Distance between short and long trend"],
            ["Signal Line", "9 EMA of MACD", "Smoothed to create Crossover signals"],
            ["Histogram", "MACD - Signal", "Green/red bars showing bullish/bearish momentum"]
          ]}
        />
        <MACDChart />
        <SectionHead icon={<Radio size={16} className="inline mr-1 text-blue-500" />} title="4 most important MACD signals" />
        <CyberTable
          headers={["Signal", "Condition", "Meaning", "Reliability"]}
          rows={[
            ["Golden Cross", "MACD Line crosses above Signal Line", "Momentum shifts from bearish to bullish", "⭐⭐⭐⭐"],
            ["Death Cross", "MACD Line crosses below Signal Line", "Momentum shifts from bullish to bearish", "⭐⭐⭐⭐"],
            ["Zero Line Cross", "MACD Line crosses 0", "Medium-term trend may have shifted phase", "⭐⭐⭐"],
            ["MACD Divergence", "Price and MACD move in opposite directions", "Reversal warning similar to RSI divergence", "⭐⭐⭐⭐⭐"]
          ]}
        />
        <Callout type="tip">MACD works best in trending markets. In sideways, it crosses up and down constantly creating false signals. Always check D1 trend before using MACD on H1/H4.</Callout>
        <SimpleQuiz q='MACD Line just crossed above Signal Line while both are in the negative zone. Histogram turns from red to green. What does this signal mean?' opts={['Strong SELL signal — price about to drop','Bullish Golden Cross in negative zone — momentum shifting to bullish, can look for BUY if price action confirms','Means nothing because it is in negative zone','Sideway — do not trade']} correctIdx={1} explanation='A Golden Cross in the negative zone shows bearish momentum is fading and might shift to bullish. This is a potential signal, not a reason to blindly BUY.' />
      </>
    )
  },
  {
    id: 6, title: "7. DCA Strategy",
    content: (
      <>
        <SectionHead icon={<DollarSign size={16}/>} title="Investing without Timing" desc="Dollar Cost Averaging - Discipline creates profits." />
        <StoryBox label="Example" icon={<ShoppingCart size={16} className="inline mr-1 text-orange-500" />}>
          Instead of going to the market once to buy food for the whole month, you go regularly every day. When prices are cheap → you buy more. When prices are expensive → you buy less. DCA in investing is similar: buy a fixed amount weekly/monthly to reduce the pressure of guessing tops and bottoms.
        </StoryBox>
        <DCACalculator />
        <SectionHead icon={<Scale size={16}/>} title="DCA vs Lump Sum vs Active Trading" desc="When to use what?" />
        <CyberTable
          headers={["Strategy", "Suitable when", "Pros", "Cons"]}
          rows={[
            ["DCA", "No time to analyze, beginner, want long-term accumulation", "Automatic discipline, reduces timing stress", "In strong bull runs, may underperform Lump Sum"],
            ["Lump Sum", "Have large idle capital and accept volatility", "Maximizes profit if entered at a good price zone", "High risk if buying near the top"],
            ["Active Trading", "Have technical skills, time to monitor, and risk capital", "Can profit even when market goes sideways/down", "Requires very high psychology, discipline, and risk management"]
          ]}
        />
        <Callout type="ok">First 6-12 months of learning trading: consider using main capital for Spot/Hold/DCA long-term, and a small portion to practice active trading on demo or small accounts. DCA is NOT used for holding losing futures/margin positions.</Callout>
        <SimpleQuiz q='You use DCA to buy ETH: Month 1 buy $200 at $3,000, Month 2 buy $200 at $2,000, Month 3 buy $200 at $1,500. What is your average ETH buy price?' context='ETH bought = $200/$3000 + $200/$2000 + $200/$1500. Avg Price = Total Money / Total ETH.' opts={['$2,167 (simple arithmetic average of 3 prices)','$2,000 (actual average is lower than simple average because you buy more ETH when cheap)','$1,500 (lowest price)','$3,000 (highest price)']} correctIdx={1} explanation='You bought a total of 0.3 ETH for $600, so the actual average price is $600 / 0.3 = $2,000. The true calculation is more important than memorizing formulas.' />
      </>
    )
  },
  {
    id: 7, title: "8. References & Materials",
    content: (
      <>
        <SectionHead icon={<Library size={16}/>} title="Selected Books & Videos" desc="Not just Google, these are truly valuable resources." />
        <div className="space-y-4">
          <ResourceCard type="YouTube · Support & Resistance" name="How To Trade Support And Resistance (Latest 2024)" lang="Practical Video (Vietsub) · Quick & Concise" desc='Extremely visual guide on how to draw Support/Resistance, the Role Reversal principle, and how to avoid being "stop-loss hunted" (Fakeout) at these zones.' why="Click to watch now to know how not to draw wrong S/R. This is the #1 foundation." link="https://www.youtube.com/watch?v=8-x2S8owxYQ"/>
          <ResourceCard type="YouTube · EMA & WMA" name="Moving Average Strategy for 2024" lang="Practical Video (Vietsub) · Quick & Concise" desc="How to use Moving Averages (EMA/SMA) to determine trends, entry points (pullbacks), and profit-taking points most practically." why="Helps you immediately understand how to use the 3 EMA system instead of just pure theory." link="https://www.youtube.com/watch?v=bO_qQi-NJEo"/>
          <ResourceCard type="YouTube · RSI" name="RSI Indicator Strategy 2024" lang="Practical Video (Vietsub) · Quick & Concise" desc="Breaking classic mistakes like 'RSI > 70 means sell'. Guide on using RSI to find Divergence and confirm trend strength." why="Practical video solving the problem of misusing RSI that most beginners make." link="https://www.youtube.com/watch?v=JWcX8YA0G3A"/>
          <ResourceCard type="YouTube · MACD" name="MACD Trading Strategy (Latest 2024)" lang="Practical Video (Vietsub) · Quick & Concise" desc="Direct on-chart guide on reading the Histogram, the crossover between MACD Line and Signal Line to catch big waves." why="Watch and apply immediately to the chart to measure momentum." link="https://www.youtube.com/watch?v=rf_EQvubKlk"/>
          <ResourceCard type="Practice Website" name="Investopedia — Technical Analysis 2024 Guide" lang="English Article · Free" desc="High-quality comprehensive article on Japanese candlesticks, volume, and basic indicators with real examples in the real market." why='When you need a quick theory refresher, this is the best article to look up.' link="https://www.investopedia.com/articles/active-trading/102914/technical-analysis-strategies-beginners.asp"/>
          <ResourceCard type="Practical Tool" name="TradingView Chart" lang="Charting Tool · Free" desc="The world's #1 technical analysis platform. Don't just learn, open the chart and draw support/resistance lines yourself right now." why="Learning must go hand in hand with practice. Click to open the chart now!" link="https://www.tradingview.com/chart/"/>
        </div>
      </>
    )
  },
  {
    id: 8, title: "9. Final Quiz",
    content: (
      <>
        <SectionHead icon={<Star size={16}/>} title="Chapter 2 Competency Test" desc="12 core questions." />
        <FinalQuizCh2 />
      </>
    )
  }
];


export default CHAPTER_2_DATA;
