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
    id: 0, title: "1. Hỗ trợ & Kháng cự",
    content: (
      <>
        <SectionHead icon={<TrendingUp size={16}/>} title="Hỗ trợ & Kháng cự" desc="Sàn nhà và Trần nhà của giá. Nền tảng quan trọng nhất trong PTKT." />
        <StoryBox label="Ví dụ siêu dễ hiểu" icon={<Building size={16}/>}>
          Hãy tưởng tượng một <strong>quả bóng nảy</strong> trong phòng. Sàn nhà = Hỗ trợ (Support) — quả bóng chạm sàn thì nảy lên. Trần nhà = Kháng cự (Resistance) — quả bóng bay lên chạm trần thì rơi xuống.<br/><br/>
          Nhưng trong trading, sàn và trần <em>không cố định</em> — chúng có thể bị phá vỡ. Và khi trần bị phá, nó trở thành sàn mới. Đây là nguyên tắc <strong>Đổi Vai (Role Reversal)</strong>.
        </StoryBox>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4"><strong>Hỗ trợ (Support)</strong> là vùng giá mà nhiều người mua sẵn sàng mua vào — họ nghĩ "giá thế này là rẻ, mình mua". Lực cầu lớn → giá bật lên.</p>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6"><strong>Kháng cự (Resistance)</strong> là vùng giá mà nhiều người muốn bán ra — họ nghĩ "giá đã lên cao, mình chốt lời". Lực cung lớn → giá bị đẩy xuống.</p>
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">Những vùng này tồn tại vì <em>con người nhớ giá</em>. Ai từng mua BTC ở $50,000 rồi bị kẹt khi giá rơi về $30,000 thường sẽ muốn bán khi giá quay lại $50,000 để thoát hàng. Khi nhiều người cùng nghĩ như vậy, vùng kháng cự hình thành.</p>
        <div className="space-y-4 mb-6">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">1</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">Kháng cự $2,000 (nhiều người đặt lệnh SELL ở đây). Giá tăng lên $2,000, bị đẩy xuống → <strong>Kháng cự xác nhận.</strong></p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">2</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">Sau nhiều lần, giá vượt qua $2,000 và <strong>đóng cửa trên đó</strong>. Những người SELL bị thua — họ phải mua lại để cắt lỗ.</p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">3</div><p className="text-[16px] text-gray-800 dark:text-[#EAECEF] pt-1">$2,000 giờ là <strong>hỗ trợ mới</strong>. Nếu giá về lại, những người đã mua sẽ mua thêm, người chờ cơ hội cũng mua vào.</p></div>
        </div>
        <Callout type="ok" title="Kỹ thuật thực chiến:">Sau khi kháng cự bị phá, đợi giá <em>pullback về test lại</em> vùng đó (giờ là hỗ trợ) + có nến xác nhận → đây là entry đẹp nhất, SL nhỏ, R:R cao.</Callout>

        <SectionHead icon={<Ruler size={16}/>} title="Cách vẽ S/R đúng" desc="5 loại phổ biến nhất" />
        <CyberTable 
          headers={["Loại S/R", "Cách nhận biết", "Ví dụ"]}
          rows={[
            ["Đỉnh/Đáy cũ", "Vùng giá từng là đỉnh hoặc đáy rõ ràng trên D1+", "BTC đỉnh 2021 = $69,000"],
            ["Số tròn", "xx,000 hoặc xx,500 — tâm lý con người", "Vàng $2,000, BTC $100k"],
            ["Đã test nhiều lần", "Giá đã chạm và phản ứng ≥ 3 lần", "Vùng $1,920–1,940 vàng"],
            ["Gap giá", "Khoảng trống giá do tin tức hoặc mở cửa; giá thường quay lại kiểm tra", "Gap mở cửa sáng thứ Hai"],
            ["Moving Average", "EMA21, EMA50, EMA200 đóng vai trò động", "EMA200 D1 = hỗ trợ lớn"]
          ]}
        />
        <Callout type="warn" title="Lỗi phổ biến:">Vẽ quá nhiều đường → không biết đường nào quan trọng. Quy tắc: chỉ giữ 2–4 vùng quan trọng nhất trên D1, ưu tiên vùng có phản ứng rõ và nằm trên khung Weekly/Daily.</Callout>

        <ExerciseBox title="Vẽ S/R trên TradingView" desc="Thực hiện từng bước dưới đây và ghi lại kết quả:" steps={[
          {d:'Chuyển sang D1. Tìm đỉnh cao nhất trong 6 tháng gần nhất. Vẽ một đường ngang (Horizontal Line). Đây là kháng cự mạnh nhất.'},
          {d:'Tìm đáy thấp nhất trong cùng kỳ. Vẽ đường ngang. Đây là hỗ trợ mạnh nhất.'},
          {d:'Tìm 2–3 vùng mà giá đã phản ứng ít nhất 2 lần. Vẽ <strong>vùng</strong> (Rectangle tool), không phải đường điểm.'},
          {d:'Kiểm tra xem có vùng nào từng là kháng cự rồi đổi vai thành hỗ trợ không. Đó là Role Reversal đang hoạt động.'}
        ]}/>

        <SimpleQuiz q='Vùng $1,960 đã từng là kháng cự 3 lần. Hôm nay giá đóng cửa ở $1,965 — vừa vượt qua $1,960. Ngày hôm sau giá pullback về $1,960. Bạn nên làm gì?' context='Gợi ý: Nghĩ đến Role Reversal.' opts={['SELL — vì đây vẫn là kháng cự cũ','Chờ tín hiệu xác nhận rồi BUY — $1,960 vừa đổi vai thành hỗ trợ','Không làm gì, đứng ngoài','Chờ giá giảm thêm về $1,900']} correctIdx={1} explanation='Role Reversal: kháng cự cũ đã bị phá và có thể trở thành hỗ trợ mới. Entry tốt hơn khi có nến xác nhận, SL nằm dưới vùng.' />
        <SimpleQuiz q='Giá BTC đang test vùng $100,000 lần thứ 4. Lần 1, 2, 3 đều bị đẩy xuống. Bạn có thể rút ra điều gì?' opts={['$100k chắc chắn sẽ bị phá','$100k là kháng cự rất quan trọng — càng nhiều lần test, vùng càng được thị trường chú ý; nếu phá thật, lực đi có thể rất mạnh','Không bao giờ phá được','Test nhiều lần vô nghĩa']} correctIdx={1} explanation='Một vùng được test nhiều lần là vùng có ý nghĩa, nhưng không có nghĩa là bất khả xâm phạm. Mỗi lần retest có thể tiêu thụ bớt lệnh chờ; khi breakout thật xảy ra, stop loss và lệnh breakout có thể làm giá chạy nhanh.' />
        <SimpleQuiz q='Bạn vẽ một đường kháng cự và giá vừa nhú lên trên đường đó 5 pip rồi đóng cửa lại dưới. Đây có phải breakout thật không?' opts={['Có — giá đã vượt qua, nên BUY ngay','Không — đây có thể là wick rejection hoặc fake breakout. Cần giá đóng cửa rõ ràng trên kháng cự mới xác nhận','Có thể là breakout, vào lệnh với SL nhỏ','Không quan trọng, chỉ cần giá tăng là được']} correctIdx={1} explanation='Bóng nến nhú qua không phải breakout. Với người mới, ưu tiên chờ nến đóng cửa hẳn bên kia vùng S/R để giảm rủi ro fakeout.' />
      </>
    )
  },
  {
    id: 1, title: "2. Xu hướng & Cấu trúc",
    content: (
      <>
        <SectionHead icon={<TrendingUp size={16}/>} title="3 loại xu hướng" desc="Giao dịch thuận xu hướng là cách dễ kiếm tiền nhất." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-green-50 dark:bg-[#0A0D13] border border-green-200 dark:border-[#0ECB81]/30 p-6 rounded-2xl">
            <div className="text-green-700 dark:text-[#0ECB81] font-mono text-xs font-bold mb-4">UPTREND (Phe Mua)</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Đỉnh sau &gt; đỉnh trước (HH)<br/>Đáy sau &gt; đáy trước (HL)</p>
            <div className="font-bold text-green-700 dark:text-[#0ECB81]">→ Chỉ BUY tại HL</div>
          </div>
          <div className="bg-red-50 dark:bg-[#0A0D13] border border-red-200 dark:border-[#F6465D]/30 p-6 rounded-2xl">
            <div className="text-red-700 dark:text-[#F6465D] font-mono text-xs font-bold mb-4">DOWNTREND (Phe Bán)</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Đỉnh sau &lt; đỉnh trước (LH)<br/>Đáy sau &lt; đáy trước (LL)</p>
            <div className="font-bold text-red-700 dark:text-[#F6465D]">→ Chỉ SELL tại LH</div>
          </div>
          <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl">
            <div className="text-gray-500 dark:text-[#848E9C] font-mono text-xs font-bold mb-4">SIDEWAY <MinusCircle size={14} className="inline mr-1 text-gray-500"/></div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Đỉnh ≈ đỉnh trước<br/>Đáy ≈ đáy trước</p>
            <div className="font-bold text-yellow-600 dark:text-[#FCD535]">→ Buy S/R / Đứng ngoài</div>
          </div>
        </div>

        <SectionHead icon={<Search size={16}/>} title="BOS & CHoCH" desc="Đọc cấu trúc chuyên sâu" />
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">Hai khái niệm này giúp bạn <em>đọc sớm hơn</em> khi xu hướng thay đổi — thay vì chờ đến khi quá rõ ràng (và đã muộn).</p>
        <CyberTable 
          headers={["Khái niệm", "Định nghĩa", "Hành động"]}
          rows={[
            ["BOS (Break of Structure)", "Giá phá vỡ đỉnh/đáy trước = xu hướng tiếp diễn", "Tiếp tục giao dịch theo chiều cũ"],
            ["CHoCH (Change of Character)", "Lần đầu tiên xu hướng bị phá: uptrend thủng đáy HL hoặc downtrend phá đỉnh LH", "Dời SL chặt lại, không mở lệnh mới theo chiều cũ. Đây là cảnh báo, chưa phải xác nhận 100%."],
            ["Full Reversal", "CHoCH được xác nhận rồi thị trường BOS theo chiều ngược lại", "Có thể bắt đầu tìm setup theo xu hướng mới."]
          ]}
        />
        
        <SimpleQuiz q='Sau chuỗi HH-HL-HH trong uptrend, giá đóng cửa dưới đáy HL gần nhất. Đây là tín hiệu gì?' opts={['BOS — xu hướng tăng tiếp tục, mua thêm','CHoCH — cảnh báo đảo chiều, không mở lệnh Buy mới và dời SL chặt lại','Không có ý nghĩa gì, thị trường vẫn uptrend','Tín hiệu SELL chắc chắn, vào lệnh ngay']} correctIdx={1} explanation='Đóng cửa dưới HL là CHoCH: cấu trúc uptrend bị phá lần đầu. Nó là cảnh báo mạnh, nhưng vẫn cần xác nhận thêm trước khi đảo chiều vị thế.' />
        <SimpleQuiz q='Đang theo dõi USD/JPY. D1 đang downtrend rõ ràng. Trên H1 có setup tăng R:R = 1:3 rất đẹp. Bạn làm gì?' opts={['BUY ngay vì H1 đẹp','Bỏ qua — KHÔNG BAO GIỜ ngược chiều D1','Vào size nhỏ thử','Chờ thêm 1 nến']} correctIdx={1} explanation='Nguyên tắc sống còn: D1 là luật pháp. Đừng chống lại khung lớn.' />
      </>
    )
  },
  {
    id: 2, title: "3. Volume",
    content: (
      <>
        <SectionHead icon={<BarChart2 size={16}/>} title="Tiếng ồn hay tín hiệu thật?" desc="Volume là 'bằng chứng' của giá." />
        <StoryBox label="Ví dụ" icon={<Users size={16} className="inline mr-1 text-purple-500" />}>
          Giá vàng tăng $20. Nếu volume chỉ bằng <strong>10% bình thường</strong> — rất ít người tham gia, có thể là bẫy. Ngược lại: Giá tăng $15 nhưng volume <strong>gấp 3 lần</strong> → hàng triệu giao dịch xảy ra, thị trường thật sự đi lên.
        </StoryBox>
        <VolumeChart />
        <CyberTable
          headers={["Tình huống", "Giá", "Volume", "Ý nghĩa", "Hành động"]}
          rows={[
            ["Breakout xác nhận", "Tăng mạnh vượt kháng cự", "Cao bất thường", "Có nhiều người mua thật sự tham gia", "Có thể tìm BUY sau khi giá giữ được vùng phá vỡ"],
            ["Fake Breakout", "Tăng vượt kháng cự", "Thấp", "Ít người tham gia, breakout đáng nghi", "Chờ thêm nến xác nhận"],
            ["Xu hướng suy yếu", "Giá tăng nhưng biên độ nhỏ dần", "Giảm dần", "Động lực đang cạn", "Cân nhắc chốt lời dần"],
            ["Selling Climax", "Giảm rất mạnh trong một phiên", "Cực cao", "Đám đông bán hoảng loạn, thường gần đáy ngắn hạn", "Chỉ tìm BUY sau khi giá ổn định lại"]
          ]}
        />
        <Callout type="tip">Với Crypto, volume trên sàn lớn như Binance/OKX khá hữu ích. Với Forex, MT4/MT5 thường chỉ có <strong>tick volume</strong> — số lần giá thay đổi, không phải volume giao dịch thật. Dùng volume như bộ lọc xác nhận, không dùng làm lý do vào lệnh độc lập.</Callout>
        <SimpleQuiz q='BTC tăng 8%, phá kháng cự $95k nhưng Volume chỉ bằng 60% trung bình. Đánh giá?' opts={['Breakout mạnh, BUY full','Thận trọng, volume thấp = nguy cơ Fake Breakout','Crypto không cần volume','SELL ngay vì sẽ sập']} correctIdx={1} explanation='Breakout có volume thấp hơn bình thường là tín hiệu đáng nghi. Chờ thêm 1-2 nến, xem giá có giữ được trên kháng cự cũ và volume có tăng lên không.' />
      </>
    )
  },
  {
    id: 3, title: "4. EMA & WMA",
    content: (
      <>
        <SectionHead icon={<Ruler size={16}/>} title="Đường trung bình thông minh" desc="EMA21 là trụ cột của phương pháp NNN." />
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">Tưởng tượng bạn theo dõi điểm số của một học sinh qua 5 bài kiểm tra: <strong>60, 70, 65, 80, 90</strong>. Cách bạn tính trung bình sẽ quyết định dữ liệu mới nhất có được ưu tiên hay không.</p>
        <CyberTable
          headers={["Loại MA", "Cách hiểu", "Điểm mạnh", "Điểm yếu"]}
          rows={[
            ["SMA (Simple)", "Trung bình cộng đơn giản. Tất cả dữ liệu có trọng số bằng nhau.", "Dễ hiểu, mượt", "Lag nhiều nhất"],
            ["EMA (Exponential)", "Giá gần nhất được tính nặng hơn theo hàm mũ.", "Phản ứng nhanh, hợp trading ngắn-trung hạn", "Dễ nhiễu hơn SMA"],
            ["WMA (Weighted)", "Giá gần nhất được tính nặng hơn theo trọng số tuyến tính.", "Nhanh hơn SMA, dễ giải thích", "Ít phổ biến hơn EMA"]
          ]}
        />
        <Callout type="tip" title="Công thức EMA">Multiplier = 2 / (N + 1). Ví dụ EMA21 có multiplier = 2 / 22 ≈ 0.0909. EMA hôm nay = Close × multiplier + EMA hôm qua × (1 - multiplier).</Callout>
        {/* 3-EMA Static Diagram */}
        <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-8">
          <div className="text-[12px] text-gray-400 font-mono uppercase tracking-widest mb-2">// Bộ 3 EMA — Thứ tự xếp chồng xác định xu hướng</div>
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
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-white opacity-30 inline-block"></span> Giá</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#d97706] inline-block"></span> EMA21 (nhanh nhất)</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#4a9eff] inline-block"></span> EMA50</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#b57bee] inline-block"></span> EMA200 (chậm nhất)</span>
          </div>
        </div>
        <EMAVisualizer />
        
        <SectionHead icon={<Target size={16}/>} title="Bộ 3 EMA Chuẩn" desc="EMA21 (ngắn), EMA50 (trung), EMA200 (dài)" />
        <CyberTable 
          headers={["Trạng thái 3 EMA", "Ý nghĩa", "Chiến lược"]}
          rows={[
            ["<span class='text-green-600 dark:text-[#0ECB81] font-bold'>EMA21 > 50 > 200</span>", "Strong Uptrend", "Chỉ BUY. Mua mọi pullback về EMA21."],
            ["<span class='text-red-600 dark:text-[#F6465D] font-bold'>EMA21 < 50 < 200</span>", "Strong Downtrend", "Chỉ SELL. Bán mọi rebound lên EMA21."],
            ["<span class='text-yellow-600 dark:text-[#FCD535] font-bold'>Đan xen nhau</span>", "Sideway / Chuyển đổi", "Thận trọng. Đứng ngoài."],
            ["<span class='text-[#d97706] dark:text-[#f5a623] font-mono'>Golden Cross</span>", "EMA21 cắt EMA50 từ dưới lên (cả 2 đang dốc lên)", "Tín hiệu mạnh — chỉ tìm BUY, không SELL"],
            ["<span class='text-red-600 dark:text-[#F6465D] font-mono'>Death Cross</span>", "EMA21 cắt EMA50 từ trên xuống (cả 2 đang dốc xuống)", "Tín hiệu giảm — chỉ tìm SELL, cẩn thận với BUY"]
          ]}
        />
        <Callout type="warn" title="Đừng thần thánh hóa EMA">EMA21 pullback là vùng canh entry, không phải lệnh tự động. Nếu thị trường sideway, EMA liên tục bị cắt qua lại và tạo rất nhiều tín hiệu giả.</Callout>
        <Callout type="tip" title="Golden Cross & Death Cross">EMA21 cắt lên EMA50 = Golden Cross, cảnh báo xu hướng tăng có thể hình thành. EMA21 cắt xuống EMA50 = Death Cross, cảnh báo xu hướng giảm có thể hình thành. Cả hai cần được kiểm tra trong bối cảnh D1.</Callout>
        <ExerciseBox title="Thiết lập và đọc Bộ 3 EMA" desc="Thực hành thêm EMA vào biểu đồ và tập đọc tín hiệu:" steps={[
          {d:'TradingView → Indicators → thêm EMA 3 lần với period <strong>21, 50, 200</strong>. Đổi màu: 21=vàng, 50=xanh dương, 200=tím.'},
          {d:'Mở XAU/USD D1. Tìm thời điểm EMA21 cắt EMA50 trong 1 năm gần nhất. Giá đã đi tiếp hay quay đầu?'},
          {d:'Zoom vào 3 tháng gần nhất. Nhận xét giá đang trên hay dưới EMA21, có đang ride theo EMA21 không.'},
          {d:'Bật thêm WMA21 và so sánh với EMA21: đường nào phản ứng nhanh hơn khi giá biến động mạnh?'}
        ]}/>
        <SimpleQuiz q='EUR/USD D1 đang có EMA21 > EMA50 > EMA200 và cả 3 đường đều dốc lên. Giá pullback về EMA21 và xuất hiện nến Hammer. Bạn nên làm gì?' opts={['SELL — giá đang kéo về, xu hướng đang yếu đi','BUY thận trọng — bộ 3 EMA xác nhận uptrend, pullback EMA21 + Hammer là setup đẹp nếu quản trị rủi ro đúng','Chờ giá về EMA50 rồi mới được mua','Đứng ngoài vì giá đang pullback']} correctIdx={1} explanation='Đây là setup thuận xu hướng: EMA xếp thứ tự tăng, giá pullback về EMA21 và có nến xác nhận. Vẫn cần SL dưới low của Hammer và kiểm tra vùng S/R.' />
        <SimpleQuiz q='Tại sao EMA thường được ưa chuộng hơn SMA trong trading ngắn-trung hạn?' opts={['EMA cho tín hiệu nhiều hơn nên chắc chắn hơn','EMA phản ứng nhanh hơn với giá gần đây do trọng số hàm mũ, nên tín hiệu đến sớm hơn SMA','EMA chính xác 100%','Vì tất cả trader chuyên nghiệp đều dùng EMA nên phải theo']} correctIdx={1} explanation='EMA ưu tiên dữ liệu gần nhất, nên ít lag hơn SMA trong thị trường có xu hướng. Nhưng phản ứng nhanh hơn cũng đồng nghĩa dễ nhiễu hơn.' />
      </>
    )
  },
  {
    id: 4, title: "5. RSI — Chuyên sâu",
    content: (
      <>
        <SectionHead icon={<Thermometer size={16}/>} title="RSI - Nhiệt kế thị trường" desc="Đo sức nóng để biết khi nào bão hòa." />
        <StoryBox label="Khái niệm" icon={<Thermometer size={16}/>}>
          Trên 70 = "Sốt" (Overbought) — mua quá nhiều, có thể điều chỉnh.<br/>Dưới 30 = "Hạ thân nhiệt" (Oversold) — bán quá nhiều, có thể phục hồi.
        </StoryBox>
        <SectionHead icon={<Calculator size={16}/>} title="RSI hoạt động như thế nào?" desc="Công thức đơn giản để hiểu bản chất." />
        <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-6 font-mono text-[14px] text-gray-200 leading-[1.8]">
          <div>RS = Trung bình tăng 14 ngày / Trung bình giảm 14 ngày</div>
          <div>RSI = 100 - (100 / (1 + RS))</div>
          <div className="mt-4 text-[#FCD535]">Ví dụ: RS = 1.5 / 0.8 = 1.875 → RSI ≈ 65.2 → Neutral-Bullish</div>
        </div>
        
        <RSISimulator />

        <SectionHead icon={<Search size={16}/>} title="RSI Divergence (Phân kỳ)" desc="Tín hiệu MẠNH NHẤT của RSI" />
        <DivergenceDemo />
        <Callout type="warn">Divergence là cảnh báo, KHÔNG PHẢI điểm vào lệnh ngay. Phải chờ nến xác nhận trên Price Action.</Callout>

        <SectionHead icon={<Microscope size={16}/>} title="Thực hành RSI Lab" />
        <RSILab />

        <SectionHead icon={<AlertTriangle size={16}/>} title="Những sai lầm phổ biến nhất khi dùng RSI" />
        <div className="space-y-4 my-8">
          {[
            ['Mua ngay khi RSI < 30, bán ngay khi RSI > 70', 'RSI có thể ở dưới 30 nhiều tuần trong downtrend mạnh. Oversold không nghĩa là sẽ tăng ngay.'],
            ['Bỏ qua xu hướng tổng thể', 'RSI = 80 trong strong uptrend có thể là bình thường. RSI cực cao sau một cú spike ngắn hạn mới đáng cảnh báo hơn.'],
            ['Chỉ dùng RSI một mình', 'RSI là chỉ báo xác nhận, không phải hệ thống giao dịch độc lập. Hãy kết hợp với S/R, EMA và price action.'],
            ['Không điều chỉnh ngưỡng theo bối cảnh', 'Trong uptrend mạnh, vùng 40-50 có thể là oversold tương đối. Trong downtrend mạnh, vùng 50-60 có thể là overbought tương đối.']
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-4 items-start bg-red-50 dark:bg-[#F6465D]/10 border border-red-100 dark:border-[#F6465D]/20 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D] font-bold flex items-center justify-center shrink-0">×</div>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-gray-800 dark:text-[#EAECEF]"><strong>{title}</strong> — {desc}</p>
            </div>
          ))}
        </div>

        <ExerciseBox title="Tìm RSI Divergence" desc="Bật RSI (14) trên chart thực tế:" steps={[
          {d:'Mở BTC/USD H4. Kéo về 3 tháng trước.'},
          {d:'Tìm 1 chỗ <strong>Giá tạo đỉnh cao hơn nhưng RSI đỉnh thấp hơn</strong> (Bearish Divergence).'},
          {d:'Tìm 1 chỗ <strong>Giá tạo đáy thấp hơn nhưng RSI đáy cao hơn</strong> (Bullish Divergence).'},
          {d:'Quan sát: Giá có đảo chiều sau đó không? Mất bao nhiêu nến/ngày? Ghi kết quả vào Journal.'}
        ]}/>
      </>
    )
  },
  {
    id: 5, title: "6. MACD",
    content: (
      <>
        <SectionHead icon={<Zap size={16}/>} title="Đo Momentum" desc="Moving Average Convergence Divergence" />
        <CyberTable 
          headers={["Thành phần", "Cách tính", "Ý nghĩa"]}
          rows={[
            ["MACD Line", "EMA12 - EMA26", "Khoảng cách giữa xu hướng ngắn và dài"],
            ["Signal Line", "EMA9 của MACD", "Làm mượt để tạo tín hiệu Crossover"],
            ["Histogram", "MACD - Signal", "Cột xanh/đỏ thể hiện đà tăng/giảm"]
          ]}
        />
        <MACDChart />
        <SectionHead icon={<Radio size={16} className="inline mr-1 text-blue-500" />} title="4 tín hiệu MACD quan trọng nhất" />
        <CyberTable
          headers={["Tín hiệu", "Điều kiện", "Ý nghĩa", "Độ tin cậy"]}
          rows={[
            ["Golden Cross", "MACD Line cắt Signal Line từ dưới lên", "Momentum chuyển từ bearish sang bullish", "⭐⭐⭐⭐"],
            ["Death Cross", "MACD Line cắt Signal Line từ trên xuống", "Momentum chuyển từ bullish sang bearish", "⭐⭐⭐⭐"],
            ["Zero Line Cross", "MACD Line vượt qua 0", "Xu hướng trung hạn có thể đã đổi pha", "⭐⭐⭐"],
            ["MACD Divergence", "Giá và MACD đi ngược chiều", "Cảnh báo đảo chiều giống RSI divergence", "⭐⭐⭐⭐⭐"]
          ]}
        />
        <Callout type="tip">MACD hoạt động tốt nhất trong thị trường trending. Trong sideway, nó cắt lên cắt xuống liên tục và tạo nhiều tín hiệu giả. Luôn kiểm tra xu hướng D1 trước khi dùng MACD trên H1/H4.</Callout>
        <SimpleQuiz q='MACD Line vừa cắt Signal Line từ dưới lên trong khi cả hai đường đang ở vùng âm. Histogram chuyển từ đỏ sang xanh. Tín hiệu này cho biết điều gì?' opts={['Tín hiệu SELL mạnh — giá sắp giảm','Bullish Golden Cross ở vùng âm — momentum đang chuyển sang bullish, có thể tìm BUY nếu price action xác nhận','Không có ý nghĩa vì đang ở vùng âm','Sideway — không nên giao dịch']} correctIdx={1} explanation='Golden Cross ở vùng âm cho thấy momentum giảm đang suy yếu và có thể chuyển sang tăng. Đây là tín hiệu tiềm năng, không phải lý do BUY mù quáng.' />
      </>
    )
  },
  {
    id: 6, title: "7. DCA Strategy",
    content: (
      <>
        <SectionHead icon={<DollarSign size={16}/>} title="Đầu tư không cần Timing" desc="Dollar Cost Averaging - Kỷ luật tạo ra lợi nhuận." />
        <StoryBox label="Ví dụ" icon={<ShoppingCart size={16} className="inline mr-1 text-orange-500" />}>
          Thay vì đi chợ một lần mua đồ ăn cả tháng, bạn đi chợ đều đặn mỗi ngày. Khi giá rẻ → mua được nhiều hơn. Khi giá đắt → mua ít hơn. DCA trong đầu tư cũng vậy: mua cố định theo tuần/tháng để giảm áp lực phải đoán đúng đỉnh đáy.
        </StoryBox>
        <DCACalculator />
        <SectionHead icon={<Scale size={16}/>} title="DCA vs Lump Sum vs Active Trading" desc="Khi nào dùng gì?" />
        <CyberTable
          headers={["Chiến lược", "Phù hợp khi", "Ưu điểm", "Nhược điểm"]}
          rows={[
            ["DCA", "Không có thời gian phân tích, mới bắt đầu, muốn tích lũy dài hạn", "Kỷ luật tự động, giảm stress timing", "Trong bull run mạnh có thể kém Lump Sum"],
            ["Lump Sum", "Có vốn nhàn rỗi lớn và chấp nhận biến động", "Tối đa hóa lợi nhuận nếu vào đúng vùng giá tốt", "Rủi ro cao nếu mua gần đỉnh"],
            ["Active Trading", "Có kỹ năng kỹ thuật, thời gian theo dõi và vốn rủi ro", "Có thể kiếm lời cả khi thị trường đi ngang/giảm", "Đòi hỏi tâm lý, kỷ luật và quản trị rủi ro rất cao"]
          ]}
        />
        <Callout type="ok">Giai đoạn 6-12 tháng đầu học trading: cân nhắc dùng phần vốn chính cho Spot/Hold/DCA dài hạn, còn phần nhỏ để luyện active trading trên demo hoặc tài khoản nhỏ. DCA không dùng để gồng lỗ futures/margin.</Callout>
        <SimpleQuiz q='Bạn dùng DCA mua ETH: tháng 1 mua $200 ở $3,000, tháng 2 mua $200 ở $2,000, tháng 3 mua $200 ở $1,500. Giá ETH trung bình bạn mua được là bao nhiêu?' context='Số ETH mua được = $200/$3000 + $200/$2000 + $200/$1500. Giá TB = Tổng tiền / Tổng ETH.' opts={['$2,167 (trung bình cộng đơn giản của 3 mức giá)','$2,000 (giá trung bình thực tế thấp hơn trung bình cộng vì mua được nhiều ETH hơn khi giá rẻ)','$1,500 (giá thấp nhất)','$3,000 (giá cao nhất)']} correctIdx={1} explanation='Bạn mua tổng 0.3 ETH bằng $600, nên giá trung bình thực tế là $600 / 0.3 = $2,000. Bản tính đúng quan trọng hơn nhớ công thức.' />
      </>
    )
  },
  {
    id: 7, title: "8. Tài liệu tham khảo",
    content: (
      <>
        <SectionHead icon={<Library size={16}/>} title="Sách & Video chọn lọc" desc="Không phải Google, đây là những nguồn thực sự đáng giá." />
        <div className="space-y-4">
          <ResourceCard type="YouTube · Kháng Cự & Hỗ Trợ" name="How To Trade Support And Resistance (Mới Nhất 2024)" lang="Video thực chiến (Có Vietsub) · Nhanh gọn" desc='Hướng dẫn cực kỳ trực quan về cách vẽ Hỗ trợ/Kháng cự, nguyên tắc Role Reversal và cách tránh bị "quét stoploss" (Fakeout) tại các vùng này.' why="Click vào xem ngay để biết cách không vẽ sai S/R. Đây là nền tảng số 1." link="https://www.youtube.com/watch?v=8-x2S8owxYQ"/>
          <ResourceCard type="YouTube · EMA & WMA" name="Moving Average Strategy for 2024" lang="Video thực chiến (Có Vietsub) · Nhanh gọn" desc="Cách sử dụng Moving Average (EMA/SMA) để xác định xu hướng, điểm vào lệnh (pullback) và điểm chốt lời một cách thực dụng nhất." why="Giúp bạn hiểu ngay cách dùng bộ 3 EMA thay vì chỉ lý thuyết suông." link="https://www.youtube.com/watch?v=bO_qQi-NJEo"/>
          <ResourceCard type="YouTube · RSI" name="RSI Indicator Strategy 2024" lang="Video thực chiến (Có Vietsub) · Nhanh gọn" desc="Phá bỏ những sai lầm kinh điển như 'RSI > 70 là bán'. Hướng dẫn cách dùng RSI để tìm phân kỳ (Divergence) và xác nhận sức mạnh xu hướng." why="Video thực chiến giải quyết bài toán dùng RSI bị sai lầm mà đa số người mới mắc phải." link="https://www.youtube.com/watch?v=JWcX8YA0G3A"/>
          <ResourceCard type="YouTube · MACD" name="MACD Trading Strategy (Mới Nhất 2024)" lang="Video thực chiến (Có Vietsub) · Nhanh gọn" desc="Hướng dẫn trực tiếp trên biểu đồ cách đọc Histogram, sự giao cắt giữa MACD Line và Signal Line để bắt những đợt sóng lớn." why="Xem xong áp dụng được luôn vào biểu đồ để đo động lượng (momentum)." link="https://www.youtube.com/watch?v=rf_EQvubKlk"/>
          <ResourceCard type="Website Thực hành" name="Investopedia — Technical Analysis 2024 Guide" lang="Bài viết Tiếng Anh · miễn phí" desc="Bài viết tổng hợp cực kỳ chất lượng về nến Nhật, khối lượng (Volume) và các chỉ báo cơ bản kèm ví dụ thực tế trên thị trường thật." why='Khi cần đọc lại lý thuyết nhanh chóng, đây là bài viết tốt nhất để tra cứu.' link="https://www.investopedia.com/articles/active-trading/102914/technical-analysis-strategies-beginners.asp"/>
          <ResourceCard type="Tool Thực Chiến" name="TradingView Chart" lang="Công cụ biểu đồ · Miễn phí" desc="Nền tảng phân tích kỹ thuật số 1 thế giới. Đừng chỉ học, hãy mở chart lên và tự mình vẽ các đường hỗ trợ kháng cự ngay lúc này." why="Học phải đi đôi với hành. Click mở biểu đồ ngay!" link="https://www.tradingview.com/chart/"/>
        </div>
      </>
    )
  },
  {
    id: 8, title: "9. Quiz tổng kết",
    content: (
      <>
        <SectionHead icon={<Star size={16}/>} title="Kiểm tra năng lực Chương 2" desc="12 câu hỏi cốt lõi." />
        <FinalQuizCh2 />
      </>
    )
  }
];


export default CHAPTER_2_DATA;
