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
          {context && <span className="block text-[17.5px] text-gray-500 dark:text-[#848E9C] font-medium mt-3 italic transition-colors">{context}</span>}
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 transition-colors ${letterClass}`}>{String.fromCharCode(65 + i)}</div>
                <span className="text-[18.5px] leading-[1.7] mt-1">{opt}</span>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className={`mt-6 p-6 rounded-2xl text-[18.5px] leading-relaxed animate-in slide-in-from-top-2 ${selected === correctIdx ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
            <strong className="block text-lg mb-2">{selected === correctIdx ? '<CheckCircle size={18} className="inline mr-2"/> Correct!' : '<XCircle size={18} className="inline mr-2"/> Incorrect.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

const SRChart = () => {
  const [active, setActive] = useState(null);
  const zones = [
    { y: 40, c: '#F6465D', l: 'Resistance 2 — $2,080', msg: '<XCircle size={14} className="inline mr-1 text-red-500"/> RESISTANCE $2,080: Price was pushed down here twice. Sellers are very strong in this zone. If price breaks and closes above → it will flip into new support.' },
    { y: 90, c: '#FCD535', l: 'Resistance → Support $2,020', msg: '<RefreshCw size={14} className="inline mr-1 text-blue-500"/> ROLE REVERSAL $2,020: This zone was once resistance (price pushed down twice). After being broken, it became support — price pulled back here and bounced up. This is a beautiful entry point according to Role Reversal principle.' },
    { y: 155, c: '#0ECB81', l: 'Strong Support — $1,960', msg: '<CheckCircle size={14} className="inline mr-1 text-green-500"/> SUPPORT $1,960: Price reacted multiple times at this zone, making it a notable area. Do not buy blindly just because it touches support; wait for confirmation candles, larger trend support, and place SL below the zone.' }
  ];
  return (
    <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-8">
      <div className="text-[14.5px] text-gray-400 font-mono uppercase tracking-widest mb-4">// XAU/USD — Click on the bright zones to see explanations</div>
      <svg viewBox="0 0 700 220" className="w-full h-auto cursor-pointer mb-4">
        {zones.map((z, i) => (
          <g key={i} onClick={() => setActive(i)}>
            <line x1="0" y1={z.y} x2="700" y2={z.y} stroke={z.c} strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
            <rect x="5" y={z.y - 12} width="220" height="24" fill="#000" opacity="0.8" rx="4" />
            <text x="15" y={z.y + 4} fill={z.c} fontSize="11" fontFamily="monospace" fontWeight="bold">{z.l}</text>
          </g>
        ))}
        <path d="M20,100 L60,95 L100,88 L140,82 L180,75 L220,80 L260,88 L300,82 L340,72 L380,65 L420,58 L460,50 L500,55 L540,48 L580,40 L620,35 L660,28" stroke="rgba(255,255,255,0.7)" strokeWidth="3" fill="none" pointerEvents="none" />
        {[[20, 100], [60, 95], [100, 88], [140, 82], [180, 75], [220, 80], [260, 88], [300, 82], [340, 72], [380, 65], [420, 58], [460, 50], [500, 55], [540, 48], [580, 40], [620, 35], [660, 28]].map((p, i, arr) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={(i > 0 && p[1] <= arr[i - 1][1]) ? '#0ECB81' : '#F6465D'} pointerEvents="none" />
        ))}
      </svg>
      <div className="bg-[#181A20] text-[#EAECEF] p-4 rounded-xl text-[16.5px] leading-relaxed border border-[#2B3139] min-h-[60px]">
        {active === null ? " Click on support/resistance zones on the chart to see explanations" : zones[active].msg}
      </div>
    </div>
  );
};

const VolumeChart = () => {
  const [active, setActive] = useState(null);
  const bars = [
    { x: 30, ph: 40, pb: true, vh: 30, vc: '#848E9C', info: '<BarChart2 size={14} className="inline mr-1 text-gray-500"/> Normal Volume: Price rises slightly with average volume. No special signal.' },
    { x: 80, ph: 35, pb: true, vh: 25, vc: '#848E9C', info: '<BarChart2 size={14} className="inline mr-1 text-gray-500"/> Low Volume: Price rises but few participants. Be cautious.' },
    { x: 130, ph: 45, pb: true, vh: 70, vc: '#0ECB81', info: '<CheckCircle size={14} className="inline mr-1 text-green-500"/> BREAKOUT CONFIRMED: Price breaks resistance with sudden volume spike (~3x normal). This is a real breakout — trust it and look for BUY entries.' },
    { x: 180, ph: 40, pb: true, vh: 15, vc: '#F6465D', info: '<XCircle size={14} className="inline mr-1 text-red-500"/> FAKE BREAKOUT: Price crosses resistance but volume is extremely low. High chance Smart Money is baiting retail to enter before reversing. DO NOT BUY.' },
    { x: 230, ph: 25, pb: false, vh: 80, vc: '#0ECB81', info: '<CheckCircle size={14} className="inline mr-1 text-green-500"/> SELLING CLIMAX: Price drops sharply in 1 candle with extreme volume. This is when the crowd panic sells. Usually a short-term bottom — price often recovers after. Look for cautious BUY signals once price stabilizes.' },
    { x: 280, ph: 30, pb: true, vh: 20, vc: '#848E9C', info: '<BarChart2 size={14} className="inline mr-1 text-gray-500"/> Decreasing Volume in uptrend: Price rises but each candle\'s volume is smaller. Trend is losing momentum. Consider taking partial profits.' },
    { x: 330, ph: 35, pb: true, vh: 18, vc: '#FCD535', info: '<AlertTriangle size={14} className="inline mr-1 text-yellow-500"/> DIVERGENCE: Price makes a new high but volume is lower than previous high. Momentum is weakening — reversal warning.' },
    { x: 380, ph: 28, pb: false, vh: 45, vc: '#F6465D', info: '<XCircle size={14} className="inline mr-1 text-red-500"/> Increasing Volume in downtrend: Price drops with high volume. Sellers are very strong. Do not counter-trade.' }
  ];
  return (
    <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-8">
      <div className="text-[14.5px] text-gray-400 font-mono uppercase tracking-widest mb-4">// Price + Volume Chart — Click on volume bars to see analysis</div>
      <svg viewBox="0 0 450 200" className="w-full h-auto cursor-pointer mb-4">
        {bars.map((b, i) => (
          <g key={i} onClick={() => setActive(i)}>
            <rect x={b.x - 10} y={80 - b.ph} width="20" height={b.ph} fill={b.pb ? '#0ECB81' : '#F6465D'} opacity="0.8" rx="2" pointerEvents="none" />
            <rect x={b.x - 12} y={190 - b.vh} width="24" height={b.vh} fill={b.vc} opacity="0.9" rx="2" />
          </g>
        ))}
        <line x1="0" y1="190" x2="450" y2="190" stroke="#2B3139" strokeWidth="2" />
        <line x1="0" y1="80" x2="450" y2="80" stroke="#2B3139" strokeWidth="1" strokeDasharray="4 4" />
        <text x="5" y="75" fill="#848E9C" fontSize="10" fontFamily="monospace">Price</text>
        <text x="5" y="185" fill="#848E9C" fontSize="10" fontFamily="monospace">Volume</text>
      </svg>
      <div className="bg-[#181A20] text-[#EAECEF] p-4 rounded-xl text-[16.5px] leading-relaxed border border-[#2B3139] min-h-[60px]">
        {active === null ? " Click on the colored volume bars above to see explanations" : bars[active].info}
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
    for (let i = 0; i < N; i++) {
      if (market === 'bull') p += Math.random() * 4 - 1.2;
      else if (market === 'bear') p += Math.random() * 4 - 2.8;
      else { d += Math.random() * 0.4 - 0.2; if (p > 140) d = -Math.abs(d); if (p < 100) d = Math.abs(d); p += d; }
      prices.push(Math.max(p, 60));
    }

    const minP = Math.min(...prices) - 5, maxP = Math.max(...prices) + 5;
    const scaleY = h => 220 - ((h - minP) / (maxP - minP)) * 200;
    const scaleX = i => (i / (N - 1)) * W;

    ctx.clearRect(0, 0, W, 240);
    // Draw Price
    ctx.beginPath(); ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 2;
    prices.forEach((pr, i) => i === 0 ? ctx.moveTo(scaleX(i), scaleY(pr)) : ctx.lineTo(scaleX(i), scaleY(pr)));
    ctx.stroke();

    const drawLine = (data, color, width) => {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = width;
      let started = false;
      data.forEach((pr, i) => {
        if (pr === null) return;
        if (!started) { ctx.moveTo(scaleX(i), scaleY(pr)); started = true; }
        else ctx.lineTo(scaleX(i), scaleY(pr));
      });
      ctx.stroke();
    };

    // Tính MA
    const ema = [prices[0]]; const k = 2 / (period + 1);
    for (let i = 1; i < N; i++) ema.push(prices[i] * k + ema[i - 1] * (1 - k));

    const sma = prices.map((pr, i) => i < period - 1 ? null : prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period);

    const wma = prices.map((pr, i) => {
      if (i < period - 1) return null;
      let num = 0, den = 0;
      for (let j = 0; j < period; j++) { num += (j + 1) * prices[i - period + 1 + j]; den += j + 1; }
      return num / den;
    });

    if (maType === 'all' || maType === 'ema') drawLine(ema, '#FCD535', 3);
    if (maType === 'all' || maType === 'sma') drawLine(sma, '#378ADD', 2);
    if (maType === 'all' || maType === 'wma') drawLine(wma, '#b57bee', 2);

  }, [maType, period, market]);

  const notes = {
    bull: { ema: '<TrendingUp size={14} className="inline mr-1 text-green-500"/> Uptrend: EMA21 sloping up, price frequently stays above EMA21. Pullbacks to EMA21 are BUY zones, but price action confirmation is still needed.', sma: '<TrendingUp size={14} className="inline mr-1 text-green-500"/> SMA in an uptrend lags more than EMA — signals arrive later.', wma: '<TrendingUp size={14} className="inline mr-1 text-green-500"/> WMA prioritizes recent prices more than SMA, but calculated differently from EMA.', all: 'Comparison: EMA (gold) reacts fastest, WMA (purple) in the middle, SMA (blue) slowest. MAs are trend-following tools, not guaranteed winning signals.' },
    bear: { ema: '<TrendingDown size={14} className="inline mr-1 text-red-500"/> Downtrend: EMA21 sloping down, price frequently stays below. Rebounds to EMA21 are SELL zones if bearish structure holds.', sma: '<TrendingDown size={14} className="inline mr-1 text-red-500"/> SMA in a downtrend gives slower signals.', wma: '<TrendingDown size={14} className="inline mr-1 text-red-500"/> WMA reacts faster than SMA but is still a lagging indicator.', all: 'All 3 lines are useful for confirming trends, but all lag and are susceptible to noise when the market reverses quickly.' },
    chop: { ema: '<MinusCircle size={14} className="inline mr-1 text-gray-500"/> Sideway: EMA21 is flat, price constantly crosses it. DO NOT use EMA for trading in sideways markets!', sma: '<MinusCircle size={14} className="inline mr-1 text-gray-500"/> SMA in sideways is also unreliable.', wma: '<MinusCircle size={14} className="inline mr-1 text-gray-500"/> WMA in sideways.', all: 'In sideways: all 3 lines give many "false signals" (whipsaws). Better to stay out or use range trading strategies instead of following MAs.' }
  };

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <Ruler size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-lg text-black dark:text-white flex-1">EMA/SMA/WMA Visualizer</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-3 py-1 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div><label className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">MA Type</label><select value={maType} onChange={e => setMaType(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white outline-none"><option value="all">Show All</option><option value="ema">EMA Only</option><option value="sma">SMA Only</option><option value="wma">WMA Only</option></select></div>
        <div><label className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Period</label><select value={period} onChange={e => setPeriod(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white outline-none"><option value="9">9 (Very Fast)</option><option value="21">21 (NNN Standard)</option><option value="50">50 (Medium Term)</option></select></div>
        <div><label className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Market</label><select value={market} onChange={e => setMarket(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white outline-none"><option value="bull">Uptrend</option><option value="bear">Downtrend</option><option value="chop">Sideways</option></select></div>
      </div>
      <canvas ref={canvasRef} className="w-full bg-gray-900 dark:bg-[#0A0D13] rounded-xl mb-4"></canvas>
      <div className="flex gap-6 mb-4 text-sm font-mono text-gray-600 dark:text-[#EAECEF]">
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-white opacity-50"></span> Price</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#FCD535]"></span> EMA</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#378ADD]"></span> SMA</div>
        <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#b57bee]"></span> WMA</div>
      </div>
      <div className="bg-gray-50 dark:bg-[#0B0E11] text-gray-800 dark:text-[#EAECEF] p-5 rounded-xl text-[17.5px] leading-relaxed border border-gray-200 dark:border-[#2B3139]">
        {notes[market][maType]}
      </div>
    </div>
  );
};

const RSISimulator = () => {
  const [val, setVal] = useState(65);

  let status, color, detail;
  if (val < 20) { status = 'EXTREME OVERSOLD'; color = '#0ECB81'; detail = 'RSI under 20 = extremely oversold. DO NOT buy immediately. Wait for a strong reversal candle.'; }
  else if (val < 30) { status = 'OVERSOLD — Cautious'; color = '#0ECB81'; detail = 'RSI 20-30 = standard oversold. In a strong downtrend, RSI can stay here for weeks. Need confirmation from reversal candles.'; }
  else if (val < 45) { status = 'NEUTRAL — Slightly Bearish'; color = '#848E9C'; detail = 'RSI 30-45 = leaning bearish. In an uptrend: normal pullback, can BUY if there is a good setup.'; }
  else if (val < 55) { status = 'NEUTRAL — Balanced'; color = '#848E9C'; detail = 'RSI 45-55 = buying and selling pressure are balanced. The market is "resting".'; }
  else if (val < 70) { status = 'NEUTRAL — Bullish Momentum'; color = '#FCD535'; detail = 'RSI 55-70 = positive bullish momentum. In a strong uptrend: price usually "lives" in the 50-80 zone.'; }
  else if (val < 80) { status = 'OVERBOUGHT — Cautious'; color = '#F6465D'; detail = 'RSI 70-80 = overbought. Warning: buying too much. Do not SELL just because RSI > 70. Need Bearish Divergence.'; }
  else { status = 'EXTREME OVERBOUGHT'; color = '#F6465D'; detail = 'RSI over 80 = market has a very high "fever". Very risky to BUY fresh here. Divergence in this zone is a strong warning, but still need candle confirmation before counter-trading.'; }

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <Thermometer size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-lg text-black dark:text-white flex-1">RSI Simulator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-3 py-1 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>

      <div className="relative h-6 rounded-full bg-gradient-to-r from-[#0ECB81] via-[#FCD535] to-[#F6465D] mb-4 mx-2">
        <div className="absolute top-[-8px] w-2 h-10 bg-white border-2 border-black rounded-full shadow-lg transition-all duration-300" style={{ left: `${val}%`, transform: 'translateX(-50%)' }}></div>
      </div>
      <div className="flex justify-between text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] mb-8 px-2">
        <span>0</span><span>30</span><span>50</span><span>70</span><span>100</span>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-black font-mono transition-colors duration-300" style={{ color }}>{val}</div>
        <div className="text-lg font-bold mt-2 transition-colors duration-300" style={{ color }}>{status}</div>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="range" min="1" max="99" value={val} onChange={e => setVal(e.target.value)} className="w-full accent-[#0ECB81]" />
        <button onClick={() => setVal(Math.floor(Math.random() * 98) + 1)} className="px-6 py-2 bg-gray-100 dark:bg-[#2B3139] text-black dark:text-white font-bold rounded-xl whitespace-nowrap"><Dices size={16} className="inline mr-1" /> Random</button>
      </div>

      <div className="bg-gray-50 dark:bg-[#0B0E11] text-gray-800 dark:text-[#EAECEF] p-5 rounded-xl text-[17.5px] leading-relaxed border border-gray-200 dark:border-[#2B3139]">
        {detail}
      </div>
    </div>
  );
};

const DivergenceDemo = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <div className="bg-white dark:bg-[#181A20] border border-green-500 dark:border-[#0ECB81] rounded-2xl p-6 shadow-lg">
      <div className="text-xs font-mono text-green-700 dark:text-[#0ECB81] tracking-widest mb-4 font-bold">BULLISH DIVERGENCE (Buyers)</div>
      <p className="text-[17.5px] text-gray-700 dark:text-[#EAECEF] mb-6">Price makes a <strong className="text-black dark:text-white">lower low</strong> but RSI makes a <strong className="text-green-600 dark:text-[#0ECB81]">higher low</strong>. Sellers are weakening. UPWARD reversal warning.</p>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-xl">
        <div className="text-xs font-mono text-gray-400 mb-2">// Price (down)</div>
        <div className="flex items-end gap-2 h-16 mb-4 border-b border-gray-700"><div className="w-10 bg-[#F6465D] h-12 rounded-t-sm"></div><div className="w-10 bg-[#F6465D] h-6 rounded-t-sm"></div><span className="text-xs text-red-500 ml-2 mb-1">Lower Low</span></div>
        <div className="text-xs font-mono text-gray-400 mb-2">// RSI (up)</div>
        <div className="flex items-end gap-2 h-16"><div className="w-10 bg-[#0ECB81]/60 h-4 rounded-t-sm"></div><div className="w-10 bg-[#0ECB81] h-10 rounded-t-sm"></div><span className="text-xs text-green-500 ml-2 mb-1">Higher Low <CheckCircle size={18} className="inline mr-2" /></span></div>
      </div>
    </div>
    <div className="bg-white dark:bg-[#181A20] border border-red-500 dark:border-[#F6465D] rounded-2xl p-6 shadow-lg">
      <div className="text-xs font-mono text-red-700 dark:text-[#F6465D] tracking-widest mb-4 font-bold">BEARISH DIVERGENCE (Sellers)</div>
      <p className="text-[17.5px] text-gray-700 dark:text-[#EAECEF] mb-6">Price makes a <strong className="text-black dark:text-white">higher high</strong> but RSI makes a <strong className="text-red-600 dark:text-[#F6465D]">lower high</strong>. Buyers are weakening. DOWNWARD reversal warning.</p>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-xl">
        <div className="text-xs font-mono text-gray-400 mb-2">// Price (up)</div>
        <div className="flex items-end gap-2 h-16 mb-4 border-b border-gray-700"><div className="w-10 bg-[#0ECB81] h-10 rounded-t-sm"></div><div className="w-10 bg-[#0ECB81] h-14 rounded-t-sm"></div><span className="text-xs text-green-500 ml-2 mb-1">Higher High</span></div>
        <div className="text-xs font-mono text-gray-400 mb-2">// RSI (down)</div>
        <div className="flex items-end gap-2 h-16"><div className="w-10 bg-[#F6465D] h-12 rounded-t-sm"></div><div className="w-10 bg-[#F6465D]/60 h-6 rounded-t-sm"></div><span className="text-xs text-red-500 ml-2 mb-1">Lower High <AlertTriangle size={14} className="inline mr-1 text-yellow-500" /></span></div>
      </div>
    </div>
  </div>
);

const RSILab = () => {
  const scenarios = [
    { title: 'Scenario 1: Gold XAU/USD H4 after a 2-week downtrend', p: [70, 65, 58, 52, 48, 44, 50, 55], r: [55, 48, 40, 35, 28, 30, 42, 51], q: 'RSI just touched 28 (oversold) and is rising to 30. Price also has 2 small bullish candles. What should you do?', opts: ['BUY full size immediately because RSI is oversold', 'Wait for more confirmation: a long-bodied bullish candle closing higher + RSI crossing above 35 → then BUY cautiously', 'SELL more because RSI 28 can continue down to 20', 'BUY immediately because 2 bullish candles are enough'], c: 1, exp: 'RSI 28 is an oversold warning, not a BUY signal. You need clear candle confirmation, RSI starting to recover, and ideally price being at a support zone.' },
    { title: 'Scenario 2: EUR/USD D1 — Uptrend, RSI correcting', p: [40, 50, 60, 70, 75, 65, 60, 68], r: [48, 55, 62, 72, 75, 62, 55, 65], q: 'EUR/USD is in a strong D1 uptrend. RSI corrects from 75 to 55. What does this mean?', opts: ['Uptrend has ended — should SELL', 'RSI 55 in an uptrend = normal, momentum resting; can still BUY if price pulls back nicely', 'RSI must drop to 30 before buying', 'Means nothing'], c: 1, exp: 'In a strong uptrend, RSI usually lives in the 50-80 zone. RSI dropping to 55 is a normal pullback, especially if price drops to EMA21 or support.' },
    { title: 'Scenario 3: BTC/USD — Bearish RSI Divergence', p: [50, 58, 66, 72, 76, 80, 82], r: [52, 58, 64, 70, 68, 65, 61], q: 'BTC makes a higher high ($82k) but RSI makes a lower high (61 compared to previous 70). What do you read?', opts: ['BUY signal — price is rising strongly', 'Bearish Divergence — momentum is weakening despite higher prices. Warning of a DOWNWARD reversal', 'Normal, nothing to worry about', 'RSI 61 is still bullish, no need to worry'], c: 1, exp: 'This is a Bearish Divergence: price makes a higher high but RSI makes a lower high. Do not FOMO BUY; wait for price action confirmation before considering a SELL.' },
    { title: 'Scenario 4: XAU/USD M15 — RSI is at 85', p: [50, 58, 66, 73, 79, 84, 88, 90], r: [55, 62, 70, 76, 80, 84, 87, 85], q: 'Gold just spiked after news. M15 RSI is at 85. You want to catch the momentum to BUY. Should you?', opts: ['BUY immediately — momentum is very strong', 'No — RSI 85 is extremely overbought, high risk of buying the top. Wait for RSI to correct to 50-60 before considering a BUY', 'SELL immediately because RSI is too high', 'RSI does not matter when there is good news'], c: 1, exp: 'RSI 85 after a news spike is a very dangerous FOMO zone. Waiting for price to stabilize, RSI to cool down, and a new support to form is much safer.' },
    { title: 'Scenario 5: EUR/USD D1 — RSI crosses the midline', p: [62, 58, 55, 52, 50, 54, 58, 63], r: [38, 35, 32, 30, 34, 42, 50, 55], q: 'EUR/USD after a long downtrend. RSI just crossed above 50 for the first time in 3 months. What does this mean?', opts: ['No special meaning', 'RSI crossing 50 = momentum shifting from bearish to bullish; this is an important signal for a potential long-term trend reversal', 'SELL because this is resistance', 'BUY immediately because RSI 55 is high'], c: 1, exp: 'RSI crossing 50 after a long time below 50 shows momentum has changed phases. The signal is stronger if accompanied by a CHoCH and price crossing above D1 EMA21.' }
  ];
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const s = scenarios[qIdx];
  const isDone = qIdx >= scenarios.length;

  const handleNext = () => {
    if (selected === s.c) setScore(s => s + 1);
    setSelected(null); setQIdx(i => i + 1);
  };

  if (isDone) return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-10 rounded-3xl text-center shadow-lg my-8 transition-colors">
      <div className="text-5xl mb-4">{score === scenarios.length ? '<PartyPopper size={48} className="mx-auto text-green-500 mb-4" />' : '<Dumbbell size={48} className="mx-auto text-blue-500 mb-4" />'}</div>
      <h3 className="text-2xl font-black text-green-600 dark:text-[#0ECB81] mb-2">RSI Lab: {score}/{scenarios.length}</h3>
      <p className="text-gray-600 dark:text-[#848E9C]">{score === scenarios.length ? 'Excellent! You read RSI very well.' : 'Please re-read the RSI section and practice the failed scenarios again.'}</p>
      <button onClick={() => { setQIdx(0); setScore(0); }} className="mt-6 bg-gray-900 dark:bg-[#2B3139] text-white px-6 py-2 rounded-xl font-bold">Retry</button>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-md transition-colors">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <h3 className="font-bold text-lg text-black dark:text-white flex items-center gap-2"><Microscope size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /> RSI Lab</h3>
        <span className="text-xs font-mono text-gray-500 dark:text-[#848E9C]">Question {qIdx + 1}/{scenarios.length}</span>
      </div>
      <div className="text-xs font-mono text-gray-500 dark:text-[#848E9C] mb-4">{s.title}</div>
      <div className="bg-gray-900 dark:bg-[#0A0D13] p-4 rounded-2xl mb-6">
        <div className="flex items-end gap-1 h-16 border-b border-gray-700 mb-2 pb-1">
          {s.p.map((v, i) => <div key={i} className={`flex-1 rounded-t-sm opacity-90 ${i > 0 && v >= s.p[i - 1] ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'}`} style={{ height: `${v}%` }}></div>)}
        </div>
        <div className="relative flex items-end gap-1 h-12 pt-1">
          <div className="absolute top-[30%] w-full border-t border-dashed border-red-500/50"></div>
          <div className="absolute top-[70%] w-full border-t border-dashed border-green-500/50"></div>
          {s.r.map((v, i) => <div key={i} className={`flex-1 rounded-t-sm z-10 ${v >= 70 ? 'bg-[#F6465D]' : v <= 30 ? 'bg-[#0ECB81]' : 'bg-[#FCD535]'}`} style={{ height: `${v}%` }}></div>)}
        </div>
      </div>
      <div className="text-[18.5px] font-bold text-black dark:text-white mb-6">{s.q}</div>
      <div className="space-y-3 mb-6">
        {s.opts.map((o, i) => {
          let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#0B0E11] bg-white dark:bg-[#0B0E11]";
          if (selected !== null) {
            if (i === s.c) btnClass = "border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]";
            else if (selected === i) btnClass = "border-transparent dark:border-[#F6465D] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#F6465D]/10 text-[#5A1A1A] dark:text-[#F6465D] shadow-[0_4px_15px_rgba(181,59,59,0.2)] dark:shadow-none font-bold relative overflow-hidden";
            else btnClass = "border-gray-200 dark:border-[#2B3139] opacity-50 bg-white dark:bg-transparent";
          }
          return <button key={i} disabled={selected !== null} onClick={() => setSelected(i)} className={`w-full text-left p-4 border-2 rounded-xl text-[17.5px] transition-all ${btnClass}`}>{String.fromCharCode(65 + i)}. {o}</button>
        })}
      </div>
      {selected !== null && (
        <div className={`p-5 rounded-xl mb-6 text-[17.5px] leading-relaxed ${selected === s.c ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
          {s.exp}
        </div>
      )}
      <button onClick={handleNext} disabled={selected === null} className="w-full bg-blue-600 dark:bg-[#378ADD] text-white py-4 rounded-xl font-bold disabled:opacity-30">Next</button>
    </div>
  );
};

const MACDChart = () => (
  <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-3xl p-6 my-8 shadow-xl">
    <div className="text-[14.5px] text-gray-400 font-mono uppercase tracking-widest mb-6">// MACD Illustration — Crossover</div>
    <svg viewBox="0 0 700 220" className="w-full h-auto">
      <polyline points="20,90 60,80 100,68 140,55 180,48 220,54 260,62 300,52 340,42 380,35 420,40 460,48 500,55 540,50 580,40 620,32 660,25" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
      <line x1="0" y1="165" x2="700" y2="165" stroke="#2B3139" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points="20,170 60,165 100,158 140,150 180,155 220,160 260,155 300,148 340,142 380,145 420,150 460,155 500,158 540,153 580,145 620,138 660,132" stroke="#FCD535" strokeWidth="2" fill="none" />
      <polyline points="20,172 60,168 100,162 140,155 180,154 220,157 260,154 300,150 340,146 380,146 420,149 460,153 500,156 540,154 580,148 620,142 660,135" stroke="#378ADD" strokeWidth="2" fill="none" />
      {[4, -7, -7, 5, 3, -2, -5, -4, 3, 4].map((h, i) => <rect key={i} x={55 + i * 40} y={h < 0 ? 165 : 165 - h * 2} width="10" height={Math.abs(h * 2)} fill={h < 0 ? '#0ECB81' : '#F6465D'} opacity="0.8" rx="2" />)}
      <line x1="300" y1="115" x2="300" y2="210" stroke="#0ECB81" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
      <text x="310" y="130" fill="#0ECB81" fontSize="12" fontFamily="monospace" fontWeight="bold">Golden Cross → BUY</text>
      <rect x="295" y="181" width="10" height="10" fill="#0ECB81" rx="2" />
    </svg>
  </div>
);

const DCACalculator = () => {
  const [amt, setAmt] = useState(100); const [freq, setFreq] = useState(30);
  const [months, setMonths] = useState(12); const [growth, setGrowth] = useState(30);

  const rate = Math.pow(1 + growth / 100, 1 / (365 / freq)) - 1;
  let inv = 0, val = 0;
  for (let m = 1; m <= months; m++) {
    for (let p = 0; p < Math.round(30 / freq); p++) { inv += amt; val = (val + amt) * (1 + rate); }
  }
  const pct = inv > 0 ? ((val - inv) / inv) * 100 : 0;

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-8 shadow-lg transition-colors">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-[#2B3139] pb-4">
        <Calculator size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-lg text-black dark:text-white flex-1">DCA Simulator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-3 py-1 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Amount per period ($)</label><input type="number" value={amt} onChange={e => setAmt(Number(e.target.value) || 0)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none focus:border-green-500 dark:focus:border-[#0ECB81]" /></div>
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Frequency</label><select value={freq} onChange={e => setFreq(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none"><option value={7}>Weekly</option><option value={30}>Monthly</option></select></div>
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Duration (months)</label><input type="number" value={months} onChange={e => setMonths(Number(e.target.value) || 0)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none focus:border-green-500 dark:focus:border-[#0ECB81]" /></div>
        <div><label className="text-xs font-bold text-gray-500 dark:text-[#848E9C] uppercase block mb-2">Yearly Growth (%)</label><input type="number" value={growth} onChange={e => setGrowth(Number(e.target.value) || 0)} className="w-full bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-xl p-3 text-black dark:text-white font-mono outline-none focus:border-green-500 dark:focus:border-[#0ECB81]" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-5 rounded-2xl text-center"><div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2">Total Invested</div><div className="text-2xl font-black text-black dark:text-white font-mono">${inv.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div></div>
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 p-5 rounded-2xl text-center"><div className="text-xs text-green-700 dark:text-[#0ECB81] uppercase font-bold mb-2">Final Value</div><div className="text-2xl font-black text-green-700 dark:text-[#0ECB81] font-mono">${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div></div>
        <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-5 rounded-2xl text-center"><div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2">Total Return</div><div className={`text-2xl font-black font-mono ${pct >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{pct >= 0 ? '+' : ''}{pct.toFixed(1)}%</div></div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[400px] text-[15.5px] border border-gray-200 dark:border-[#2B3139] rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C] text-[13.5px] uppercase tracking-wider border-b border-gray-200 dark:border-[#2B3139]">
              <th className="p-3 font-bold">Month</th>
              <th className="p-3 font-bold">Invested</th>
              <th className="p-3 font-bold">Value</th>
              <th className="p-3 font-bold">Return</th>
            </tr>
          </thead>
          <tbody className="text-[15.5px]">
            {Array.from({ length: Math.min(months, 24) }, (_, i) => {
              const m = i + 1;
              const kPerPeriod = Math.round(30 / freq);
              let invested = 0, value = 0;
              const monthRate = Math.pow(1 + growth / 100, 1 / (365 / freq)) - 1;
              for (let mm = 1; mm <= m; mm++) {
                for (let p = 0; p < kPerPeriod; p++) { invested += amt; value = (value + amt) * (1 + monthRate); }
              }
              const pctM = invested > 0 ? ((value - invested) / invested) * 100 : 0;
              const isLast = m === Math.min(months, 24);
              return (
                <tr key={m} className={`border-b border-gray-100 dark:border-[#2B3139]/50 last:border-0 ${isLast ? 'bg-green-50 dark:bg-[#0ECB81]/10 font-bold' : 'hover:bg-gray-50 dark:hover:bg-[#1A2639]/20'
                  }`}>
                  <td className="p-3 font-mono text-gray-600 dark:text-[#848E9C]">M{m}</td>
                  <td className="p-3 font-mono text-black dark:text-white">${invested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className={`p-3 font-mono font-bold ${value >= invested ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className={`p-3 font-mono font-bold ${pctM >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{pctM >= 0 ? '+' : ''}{pctM.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-center text-[16.5px] text-gray-600 dark:text-[#848E9C] mt-4">DCA is the discipline key that helps beginners survive and win psychologically.</div>
    </div>
  );
};

const ResourceCard = ({ type, name, lang, desc, why, link }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden mb-4 bg-white dark:bg-[#181A20] shadow-sm hover:shadow-md dark:shadow-none transition-all">
      <div onClick={() => setOpen(!open)} className="p-5 flex gap-4 items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B3139]/40">
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] flex justify-center items-center text-xl shrink-0"><Library size={20} className="text-[#d97706] dark:text-[#00d084]" /></div>
        <div className="flex-1">
          <div className="text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1">{type}</div>
          <div className="font-bold text-[18.5px] text-black dark:text-white">{name}</div>
          <div className="text-[15.5px] text-gray-500 dark:text-[#64748B] mt-1">{lang}</div>
        </div>
        <div className={`text-2xl text-gray-400 transform transition-transform ${open ? 'rotate-90' : ''}`}>›</div>
      </div>
      {open && (
        <div className="p-6 bg-gray-50 dark:bg-[#0B0E11] border-t border-gray-200 dark:border-[#2B3139] animate-in fade-in text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
          <p className="mb-4">{desc}</p>
          <div className="text-green-700 dark:text-[#0ECB81] font-bold mb-6">→ {why}</div>
          <a href={link} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 dark:bg-[#378ADD] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90">Access Resource</a>
        </div>
      )}
    </div>
  );
};

const FinalQuizCh2 = () => {
  const qs = [
    { q: 'Gold $2,000 resistance is broken and price closes at $2,010. The next day price pulls back to $2,000. What is this opportunity?', opts: ['SELL opportunity because it is old resistance', 'BUY opportunity based on Role Reversal — $2,000 just became new support', 'Stay out because it is uncertain', 'Wait for price to drop to $1,980 to buy'], c: 1, exp: 'Based on the Role Reversal principle, once a clear resistance is broken, it turns into a new support. When price pulls back to test this area, it presents a BUY opportunity.' },
    { q: 'BTC D1 trend is downtrend (LH-LL). On H1 there is a nice BUY setup with RSI 28. What should you do?', opts: ['BUY based on H1 because RSI is extremely oversold', 'Do not BUY — D1 is in downtrend = do not trade against D1', 'SELL based on D1 if H1 gives a SELL signal', 'Wait 1 more week'], c: 1, exp: 'Always respect the trend of the higher timeframe (D1). If D1 is in a downtrend, you should not BUY on H1 even if RSI is oversold, as counter-trend trading is high risk.' },
    { q: 'EMA21 > EMA50 > EMA200 and all 3 are sloping up. What is the market condition?', opts: ['Strong Sideway', 'Strong Downtrend', 'Strong Uptrend — only look for BUY opportunities', 'Trend transitioning'], c: 2, exp: 'The arrangement of EMAs (short > medium > long) all sloping upwards is a clear indication of a strong uptrend.' },
    { q: 'RSI = 72 after price rises for 5 consecutive days in a strong uptrend. What should you do?', opts: ['SELL immediately because RSI is overbought', 'BUY because in a strong uptrend RSI 70+ is normal', 'Stay out completely', 'Place a SELL pending order'], c: 1, exp: 'In a strong uptrend, RSI can remain in the overbought territory (>70) for a long time. You should not blindly SELL against the trend. Wait for a pullback to BUY.' },
    { q: 'EUR/USD price makes a new lower low ($1.05) but RSI makes a higher low (29 vs 22 previously). What is this?', opts: ['Bearish Divergence — should SELL', 'Bullish RSI Divergence — warning of an upward reversal', 'Means nothing', 'RSI is broken'], c: 1, exp: 'When price makes a lower low while the indicator makes a higher low, this is called Bullish Divergence. It warns that selling momentum is weakening and an upward reversal may happen.' },
    { q: 'Volume in a breakout session = 80% of the 20-day average. How do you evaluate this breakout?', opts: ['Strong breakout, high reliability', 'Possible fake breakout — lower than average volume on breakout is suspicious', 'Volume is not important', 'Enter full size'], c: 1, exp: 'A valid breakout needs to be confirmed by higher-than-average volume. If the volume is lower than the average, it is highly suspicious and could be a fake breakout.' },
    { q: 'MACD Line just crossed the Signal Line downwards (Death Cross) while both are above 0. What is this signal?', opts: ['BUY signal', 'SELL signal — Bearish Death Cross confirms momentum is shifting downwards', 'Neutral signal', 'MACD is unreliable'], c: 1, exp: 'The downward crossover of the MACD line below the Signal line is a Death Cross, confirming that momentum is shifting to the downside.' },
    { q: 'You DCA into BTC: M1 buy $500 at $60,000; M2 buy $500 at $40,000; M3 buy $500 at $30,000. What is your closest average buy price for BTC?', opts: ['$43,333 (simple arithmetic average)', '$40,000 (actual is lower than simple average because you buy more BTC when cheap)', '$30,000 (lowest price)', '$60,000 (highest price)'], c: 1, exp: 'When Dollar-Cost Averaging (DCA), you buy more units of an asset when the price is lower. Therefore, the actual average cost per unit will be lower than the simple arithmetic average of the prices.' },
    { q: 'How is WMA different from EMA?', opts: ['WMA is exactly like SMA', 'WMA uses linear weights (1,2,3...N) while EMA uses exponential weights — both prioritize recent prices but calculate differently', 'WMA is slower than SMA', 'EMA and WMA are the same'], c: 1, exp: 'Both WMA and EMA prioritize recent prices, but WMA uses linear weights (adding up linearly), whereas EMA applies exponential weighting, making EMA smoother.' },
    { q: 'Price rises strongly but MACD Histogram gets smaller every day. What is the signal?', opts: ['Uptrend is strengthening', 'Momentum is weakening despite higher prices — MACD Divergence pattern, beware of reversal', 'MACD has technical error', 'Means nothing'], c: 1, exp: 'When the MACD Histogram shrinks while price is still rising, it indicates that the upward momentum is weakening (a form of divergence), signaling potential reversal or correction risk.' },
    { q: 'When does a CHoCH occur in an uptrend?', opts: ['Price makes a new higher high', 'Price closes below the most recent HL — uptrend structure broken for the first time', 'EMA21 crosses below EMA50', 'RSI drops below 50'], c: 1, exp: 'Change of Character (CHoCH) in an uptrend happens when price breaks and closes below the most recent Higher Low (HL), indicating a break in the bullish market structure.' },
    { q: 'You want to BUY XAU/USD. How many of the following confluence conditions are ideal? (A) Clear D1 uptrend. (B) Price pulls back to EMA21. (C) RSI corrects to 45-50. (D) Hammer at Fibonacci 62%. (E) Volume increases slightly on confirmation candle.', opts: ['A is enough', 'A + B is enough', 'A + B + C + D + E — the more confluence conditions, the higher the setup probability', 'D + E are most important'], c: 2, exp: 'Trading with Confluence means the more tools, indicators, and timeframes align (agree) in the same direction, the higher the probability of a successful trade setup.' }
  ];
  const [answers, setAnswers] = useState({});
  const [showRes, setShowRes] = useState(false);
  const score = Object.keys(answers).filter(k => answers[k] === qs[k].c).length;

  return (
    <div className="mt-10">
      {qs.map((q, qIdx) => (
        <div key={qIdx} className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 mb-6 shadow-sm dark:shadow-lg transition-colors">
          <div className="flex items-center gap-3 mb-5"><span className="bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Question {qIdx + 1}</span></div>
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
              return <button key={oIdx} onClick={() => !showRes && setAnswers({ ...answers, [qIdx]: oIdx })} className={`text-left p-4 border-2 rounded-2xl text-[18.5px] transition-all ${btnClass}`}>{String.fromCharCode(65 + oIdx)}. {opt}</button>;
            })}
          </div>
          {showRes && answers[qIdx] !== undefined && q.exp && (
             <div className={`mt-6 p-6 rounded-2xl text-[18.5px] leading-relaxed animate-in slide-in-from-top-2 ${answers[qIdx] === q.c ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
               <strong className="block text-lg mb-2">{answers[qIdx] === q.c ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.exp}
             </div>
          )}
        </div>
      ))}
      {!showRes ? (
        <button onClick={() => Object.keys(answers).length === qs.length ? setShowRes(true) : alert("Please answer all questions!")} className="w-full bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black py-5 rounded-2xl text-lg uppercase tracking-widest shadow-lg mt-4 hover:opacity-90">Submit Quiz</button>
      ) : (
        <div className="p-10 bg-gradient-to-br from-white to-gray-50 dark:from-[#0B0E11] dark:to-[#181A20] border border-yellow-500 dark:border-[#FCD535] rounded-3xl text-center shadow-lg mt-8">
          <h2 className="text-4xl font-black text-black dark:text-white mb-4">Score: {score}/{qs.length}</h2>
          <p className="text-gray-600 dark:text-[#848E9C] text-[18.5px] mb-6">{score >= 10 ? <><Trophy size={18} className="inline mr-1 text-yellow-500" /> Excellent! Mastered Chapter 2! Ready to learn NNN Methods.</> : <><Dumbbell size={48} className="mx-auto text-blue-500 mb-4" /> Did not pass 10/12. Reread the lessons for wrong questions, especially RSI and S/R.</>}</p>
          <button onClick={() => { setAnswers({}); setShowRes(false); }} className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:bg-black transition-colors">Retry</button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// CHAPTER 2: NỘI DUNG
// ==========================================

const CHAPTER_2_DATA_EN = [
  {
    id: 0, title: "1. Support & Resistance",
    content: (
      <>
        <SectionHead icon={<TrendingUp size={16} />} title="Support & Resistance" desc="The Floor and Ceiling of price. The most important foundation in Technical Analysis." />
        <StoryBox label="A Simple Analogy" icon={<Building size={16} />}>
          Imagine a <strong>bouncing ball</strong> in a room. The floor = Support — when the ball hits the floor, it bounces up. The ceiling = Resistance — when the ball hits the ceiling, it drops down.<br /><br />
          But in trading, the floor and ceiling are <em>not fixed</em> — they can be broken. And when a ceiling is broken, it becomes a new floor. This is the principle of <strong>Role Reversal</strong>.
        </StoryBox>
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4"><strong>Support</strong> is a price zone where many buyers are willing to buy — they think "this price is cheap, I'll buy". High demand → price bounces up.</p>
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6"><strong>Resistance</strong> is a price zone where many sellers want to sell — they think "the price is high, I'll take profits". High supply → price is pushed down.</p>
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">These zones exist because <em>people remember prices</em>. Someone who bought BTC at $50,000 and got stuck when price dropped to $30,000 will often want to sell when price returns to $50,000 to break even. When many people think alike, a resistance zone forms.</p>
        <div className="space-y-4 mb-6">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">1</div><p className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] pt-1">Resistance $2,000 (many place SELL orders here). Price rises to $2,000, gets pushed down → <strong>Resistance confirmed.</strong></p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">2</div><p className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] pt-1">After several times, price breaks above $2,000 and <strong>closes above it</strong>. Sellers are losing — they have to buy back to cut losses.</p></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0">3</div><p className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] pt-1">$2,000 is now <strong>new support</strong>. If price returns, previous buyers will buy more, and those waiting for a chance will also buy.</p></div>
        </div>
        <Callout type="ok" title="Practical Technique:">After a resistance is broken, wait for price to <em>pullback and retest</em> that zone (now support) + wait for confirmation candle → this is the best entry, tight SL, high R:R.</Callout>

        <SectionHead icon={<Ruler size={16} />} title="How to Draw S/R correctly" desc="5 most common types" />
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
          { d: 'Switch to D1. Find the highest peak in the last 6 months. Draw a Horizontal Line. This is the strongest resistance.' },
          { d: 'Find the lowest bottom in the same period. Draw a horizontal line. This is the strongest support.' },
          { d: 'Find 2-3 zones where price has reacted at least twice. Draw a <strong>zone</strong> (Rectangle tool), not a single point line.' },
          { d: 'Check if any zone was once resistance then switched role to support. That is Role Reversal in action.' }
        ]} />

        <SimpleQuiz q='The $1,960 zone was resistance 3 times. Today price closed at $1,965 — breaking above $1,960. The next day price pulls back to $1,960. What should you do?' context='Hint: Think about Role Reversal.' opts={['SELL — because it is still old resistance', 'Wait for confirmation then BUY — $1,960 just flipped into new support', 'Do nothing, stay out', 'Wait for price to drop to $1,900']} correctIdx={1} explanation='Role Reversal: old resistance was broken and can become new support. Better entry with confirmation candle, SL below the zone.' />
        <SimpleQuiz q='BTC is testing the $100,000 zone for the 4th time. Times 1, 2, 3 were all pushed down. What can you conclude?' opts={['$100k will definitely be broken', '$100k is a very important resistance — the more tests, the more market attention; if it breaks, the move can be very strong', 'Will never break', 'Testing multiple times means nothing']} correctIdx={1} explanation='A heavily tested zone is significant, but not impenetrable. Each retest can consume pending orders; when a real breakout happens, stop losses and breakout orders can make price move fast.' />
        <SimpleQuiz q='You draw a resistance line and price just peeks above it by 5 pips then closes back below. Is this a real breakout?' opts={['Yes — price went above, so BUY immediately', 'No — this could be a wick rejection or fake breakout. Need a clear close above resistance to confirm', 'Maybe a breakout, enter with tight SL', 'Does not matter, as long as price goes up']} correctIdx={1} explanation='A wick poking through is not a breakout. For beginners, wait for a clear close on the other side of the S/R zone to reduce fakeout risk.' />
      </>
    )
  },
  {
    id: 1, title: "2. Trend & Structure",
    content: (
      <>
        <SectionHead icon={<TrendingUp size={16} />} title="3 Types of Trends" desc="Trading with the trend is the easiest way to make money." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-green-50 dark:bg-[#0A0D13] border border-green-200 dark:border-[#0ECB81]/30 p-6 rounded-2xl">
            <div className="text-green-700 dark:text-[#0ECB81] font-mono text-xs font-bold mb-4">UPTREND (Buyers)</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Higher Highs (HH)<br />Higher Lows (HL)</p>
            <div className="font-bold text-green-700 dark:text-[#0ECB81]">→ Only BUY at HL</div>
          </div>
          <div className="bg-red-50 dark:bg-[#0A0D13] border border-red-200 dark:border-[#F6465D]/30 p-6 rounded-2xl">
            <div className="text-red-700 dark:text-[#F6465D] font-mono text-xs font-bold mb-4">DOWNTREND (Sellers)</div>
            <p className="text-sm dark:text-[#848E9C] mb-4">Lower Highs (LH)<br />Lower Lows (LL)</p>
            <div className="font-bold text-red-700 dark:text-[#F6465D]">→ Only SELL at LH</div>
          </div>
          <div className="bg-gray-50 dark:bg-[#0A0D13] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl">
            <div className="text-gray-500 dark:text-[#848E9C] font-mono text-xs font-bold mb-4">SIDEWAY <MinusCircle size={14} className="inline mr-1 text-gray-500" /></div>
            <p className="text-sm dark:text-[#848E9C] mb-4">High ≈ Previous High<br />Low ≈ Previous Low</p>
            <div className="font-bold text-yellow-600 dark:text-[#FCD535]">→ Trade S/R / Stay out</div>
          </div>
        </div>

        <SectionHead icon={<Search size={16} />} title="BOS & CHoCH" desc="Advanced structure reading" />
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">These two concepts help you <em>read earlier</em> when a trend changes — instead of waiting until it's too obvious (and late).</p>
        <CyberTable
          headers={["Concept", "Definition", "Action"]}
          rows={[
            ["BOS (Break of Structure)", "Price breaks previous High/Low = trend continuation", "Continue trading in the same direction"],
            ["CHoCH (Change of Character)", "First time trend is broken: uptrend breaks HL or downtrend breaks LH", "Tighten SL, do not open new trades in old direction. This is a warning, not 100% confirmation."],
            ["Full Reversal", "CHoCH confirmed then market BOS in opposite direction", "Can start finding setups in the new trend direction."]
          ]}
        />

        <SimpleQuiz q='After a HH-HL-HH sequence in an uptrend, price closes below the most recent HL. What is this signal?' opts={['BOS — uptrend continues, buy more', 'CHoCH — reversal warning, do not open new Buy and tighten SL', 'Means nothing, market is still in uptrend', 'Definite SELL signal, enter immediately']} correctIdx={1} explanation='Closing below HL is a CHoCH: the uptrend structure is broken for the first time. It is a strong warning, but still needs further confirmation before reversing positions.' />
        <SimpleQuiz q='Watching USD/JPY. D1 is clearly downtrending. On H1 there is a nice Buy setup with R:R = 1:3. What do you do?' opts={['BUY immediately because H1 looks good', 'Skip it — NEVER trade against D1', 'Enter with a small size to try', 'Wait for 1 more candle']} correctIdx={1} explanation='Vital rule: D1 is the law. Do not fight the higher timeframe.' />
      </>
    )
  },
  {
    id: 2, title: "3. Volume",
    content: (
      <>
        <SectionHead icon={<BarChart2 size={16} />} title="Noise or Real Signal?" desc="Volume is the 'evidence' of price." />
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
        <SimpleQuiz q='BTC jumps 8%, breaking $95k resistance but Volume is only 60% of average. Assessment?' opts={['Strong breakout, full BUY', 'Cautious, low volume = Fake Breakout risk', 'Crypto does not need volume', 'SELL immediately because it will dump']} correctIdx={1} explanation='A breakout with lower than average volume is suspicious. Wait 1-2 candles, see if price holds above old resistance and if volume increases.' />
      </>
    )
  },
  {
    id: 3, title: "4. EMA & WMA",
    content: (
      <>
        <SectionHead icon={<Ruler size={16} />} title="Smart Moving Averages" desc="EMA21 is the pillar of the NNN method." />
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">Imagine tracking a student's scores over 5 tests: <strong>60, 70, 65, 80, 90</strong>. How you calculate the average determines whether recent data is prioritized.</p>
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
          <div className="text-[14.5px] text-gray-400 font-mono uppercase tracking-widest mb-2">// 3 EMAs — Stacking order determines trend</div>
          <svg viewBox="0 0 700 160" className="w-full h-auto min-w-[500px]" role="img">
            {/* STRONG UPTREND annotation zone */}
            <rect x="350" y="10" width="320" height="130" fill="#00d08408" rx="4" />
            <text x="490" y="30" fill="#00d084" fontSize="11" fontFamily="monospace" textAnchor="middle" opacity="0.7">STRONG UPTREND</text>
            <text x="490" y="45" fill="#00d084" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.5">EMA21 &gt; EMA50 &gt; EMA200</text>
            {/* Price line */}
            <polyline points="20,130 60,125 100,118 140,110 180,105 220,98 260,92 300,88 340,80 380,70 420,58 460,45 500,35 540,28 580,22 640,15" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" />
            {/* EMA200 - purple (slowest) */}
            <polyline points="20,148 80,145 140,140 200,135 260,128 320,120 380,110 440,98 500,88 560,80 640,72" stroke="#b57bee" strokeWidth="2.5" fill="none" opacity="0.9" />
            <text x="648" y="76" fill="#b57bee" fontSize="11" fontFamily="monospace">EMA200</text>
            {/* EMA50 - blue */}
            <polyline points="20,142 80,138 140,132 200,124 260,116 320,106 380,94 440,80 500,68 560,58 640,50" stroke="#4a9eff" strokeWidth="2.5" fill="none" opacity="0.9" />
            <text x="648" y="54" fill="#4a9eff" fontSize="11" fontFamily="monospace">EMA50</text>
            {/* EMA21 - gold (fastest) */}
            <polyline points="20,135 80,128 140,120 200,110 260,100 320,88 380,74 440,58 500,44 560,32 640,22" stroke="#d97706" strokeWidth="3" fill="none" />
            <text x="648" y="26" fill="#d97706" fontSize="11" fontFamily="monospace">EMA21</text>
            {/* Dividing line showing trend boundary */}
            <line x1="340" y1="0" x2="340" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          <div className="flex gap-6 mt-3 text-[15.5px] font-mono text-gray-400 flex-wrap">
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-white opacity-30 inline-block"></span> Price</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#d97706] inline-block"></span> EMA21 (Fastest)</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#4a9eff] inline-block"></span> EMA50</span>
            <span className="flex items-center gap-2"><span className="w-4 h-0.5 bg-[#b57bee] inline-block"></span> EMA200 (Slowest)</span>
          </div>
        </div>
        <EMAVisualizer />

        <SectionHead icon={<Target size={16} />} title="Standard 3 EMAs" desc="EMA21 (Short), EMA50 (Mid), EMA200 (Long)" />
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
          { d: 'TradingView → Indicators → add EMA 3 times with periods <strong>21, 50, 200</strong>. Change colors: 21=gold, 50=blue, 200=purple.' },
          { d: 'Open XAU/USD D1. Find a time EMA21 crossed EMA50 in the last year. Did price continue or reverse?' },
          { d: 'Zoom into last 3 months. Notice if price is above or below EMA21, is it riding the EMA21.' },
          { d: 'Turn on WMA21 and compare with EMA21: which one reacts faster when price moves sharply?' }
        ]} />
        <SimpleQuiz q='EUR/USD D1 has EMA21 > EMA50 > EMA200 and all 3 are sloping up. Price pulls back to EMA21 and a Hammer candle appears. What should you do?' opts={['SELL — price is pulling back, trend is weakening', 'BUY cautiously — 3 EMAs confirm uptrend, EMA21 pullback + Hammer is a great setup with proper risk management', 'Wait for price to hit EMA50 before buying', 'Stay out because price is pulling back']} correctIdx={1} explanation='This is a trend-following setup: EMAs stacked bullish, price pulls back to EMA21 with confirmation candle. Still need SL below Hammer low and check S/R zones.' />
        <SimpleQuiz q='Why are EMAs often preferred over SMAs in short-medium term trading?' opts={['EMA gives more signals so it is more certain', 'EMA reacts faster to recent prices due to exponential weighting, so signals arrive earlier than SMA', 'EMA is 100% accurate', 'Because all pro traders use EMA so we must follow']} correctIdx={1} explanation='EMA prioritizes most recent data, so it lags less than SMA in trending markets. But faster reaction also means more noise.' />
      </>
    )
  },
  {
    id: 4, title: "5. Advanced RSI",
    content: (
      <>
        <SectionHead icon={<Thermometer size={16} />} title="RSI - Market Thermometer" desc="Measure the heat to know when it's saturated." />
        <StoryBox label="Concept" icon={<Thermometer size={16} />}>
          Above 70 = "Fever" (Overbought) — buying too much, might correct.<br />Below 30 = "Hypothermia" (Oversold) — selling too much, might recover.
        </StoryBox>
        <SectionHead icon={<Calculator size={16} />} title="How does RSI work?" desc="Simple formula to understand the nature." />
        <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-6 my-6 font-mono text-[16.5px] text-gray-200 leading-[1.8]">
          <div>RS = Average Gain of 14 days / Average Loss of 14 days</div>
          <div>RSI = 100 - (100 / (1 + RS))</div>
          <div className="mt-4 text-[#FCD535]">Example: RS = 1.5 / 0.8 = 1.875 → RSI ≈ 65.2 → Neutral-Bullish</div>
        </div>

        <RSISimulator />

        <SectionHead icon={<Search size={16} />} title="RSI Divergence" desc="The STRONGEST signal of RSI" />
        <DivergenceDemo />
        <Callout type="warn">Divergence is a warning, NOT an immediate entry point. Must wait for confirmation candle on Price Action.</Callout>

        <SectionHead icon={<Microscope size={16} />} title="RSI Lab Practice" />
        <RSILab />

        <SectionHead icon={<AlertTriangle size={16} />} title="Most common mistakes when using RSI" />
        <div className="space-y-4 my-8">
          {[
            ['Buy immediately when RSI < 30, sell immediately when RSI > 70', 'RSI can stay below 30 for weeks in a strong downtrend. Oversold does not mean it will go up right away.'],
            ['Ignoring overall trend', 'RSI = 80 in a strong uptrend can be normal. Extremely high RSI after a short-term spike is more concerning.'],
            ['Using RSI alone', 'RSI is a confirmation indicator, not a standalone trading system. Combine it with S/R, EMAs, and price action.'],
            ['Not adjusting thresholds to context', 'In a strong uptrend, the 40-50 zone can be relatively oversold. In a strong downtrend, 50-60 can be relatively overbought.']
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-4 items-start bg-red-50 dark:bg-[#F6465D]/10 border border-red-100 dark:border-[#F6465D]/20 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D] font-bold flex items-center justify-center shrink-0">×</div>
              <p className="text-[17.5px] md:text-[18.5px] leading-[1.7] text-gray-800 dark:text-[#EAECEF]"><strong>{title}</strong> — {desc}</p>
            </div>
          ))}
        </div>

        <ExerciseBox title="Find RSI Divergence" desc="Turn on RSI (14) on a real chart:" steps={[
          { d: 'Open BTC/USD H4. Scroll back 3 months.' },
          { d: 'Find 1 spot where <strong>Price makes a higher high but RSI makes a lower high</strong> (Bearish Divergence).' },
          { d: 'Find 1 spot where <strong>Price makes a lower low but RSI makes a higher low</strong> (Bullish Divergence).' },
          { d: 'Observe: Did price reverse afterwards? How many candles/days did it take? Log results in Journal.' }
        ]} />
      </>
    )
  },
  {
    id: 5, title: "6. MACD",
    content: (
      <>
        <SectionHead icon={<Zap size={16} />} title="Measuring Momentum" desc="Moving Average Convergence Divergence" />
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
        <SimpleQuiz q='MACD Line just crossed above Signal Line while both are in the negative zone. Histogram turns from red to green. What does this signal mean?' opts={['Strong SELL signal — price about to drop', 'Bullish Golden Cross in negative zone — momentum shifting to bullish, can look for BUY if price action confirms', 'Means nothing because it is in negative zone', 'Sideway — do not trade']} correctIdx={1} explanation='A Golden Cross in the negative zone shows bearish momentum is fading and might shift to bullish. This is a potential signal, not a reason to blindly BUY.' />
      </>
    )
  },
  {
    id: 6, title: "7. DCA Strategy",
    content: (
      <>
        <SectionHead icon={<DollarSign size={16} />} title="Investing without Timing" desc="Dollar Cost Averaging - Discipline creates profits." />
        <StoryBox label="Example" icon={<ShoppingCart size={16} className="inline mr-1 text-orange-500" />}>
          Instead of going to the market once to buy food for the whole month, you go regularly every day. When prices are cheap → you buy more. When prices are expensive → you buy less. DCA in investing is similar: buy a fixed amount weekly/monthly to reduce the pressure of guessing tops and bottoms.
        </StoryBox>
        <DCACalculator />
        <SectionHead icon={<Scale size={16} />} title="DCA vs Lump Sum vs Active Trading" desc="When to use what?" />
        <CyberTable
          headers={["Strategy", "Suitable when", "Pros", "Cons"]}
          rows={[
            ["DCA", "No time to analyze, beginner, want long-term accumulation", "Automatic discipline, reduces timing stress", "In strong bull runs, may underperform Lump Sum"],
            ["Lump Sum", "Have large idle capital and accept volatility", "Maximizes profit if entered at a good price zone", "High risk if buying near the top"],
            ["Active Trading", "Have technical skills, time to monitor, and risk capital", "Can profit even when market goes sideways/down", "Requires very high psychology, discipline, and risk management"]
          ]}
        />
        <Callout type="ok">First 6-12 months of learning trading: consider using main capital for Spot/Hold/DCA long-term, and a small portion to practice active trading on demo or small accounts. DCA is NOT used for holding losing futures/margin positions.</Callout>
        <SimpleQuiz q='You use DCA to buy ETH: Month 1 buy $200 at $3,000, Month 2 buy $200 at $2,000, Month 3 buy $200 at $1,500. What is your average ETH buy price?' context='ETH bought = $200/$3000 + $200/$2000 + $200/$1500. Avg Price = Total Money / Total ETH.' opts={['$2,167 (simple arithmetic average of 3 prices)', '$2,000 (actual average is lower than simple average because you buy more ETH when cheap)', '$1,500 (lowest price)', '$3,000 (highest price)']} correctIdx={1} explanation='You bought a total of 0.3 ETH for $600, so the actual average price is $600 / 0.3 = $2,000. The true calculation is more important than memorizing formulas.' />
      </>
    )
  },
  {
    id: 7, title: "8. References & Materials",
    content: (
      <>
        <SectionHead icon={<Library size={16} />} title="Selected Books & Videos" desc="Not just Google, these are truly valuable resources." />
        <div className="space-y-4">
          <ResourceCard type="YouTube · Support & Resistance" name="How To Trade Support And Resistance (Latest 2024)" lang="Practical Video (Vietsub) · Quick & Concise" desc='Extremely visual guide on how to draw Support/Resistance, the Role Reversal principle, and how to avoid being "stop-loss hunted" (Fakeout) at these zones.' why="Click to watch now to know how not to draw wrong S/R. This is the #1 foundation." link="https://www.youtube.com/watch?v=8-x2S8owxYQ" />
          <ResourceCard type="YouTube · EMA & WMA" name="Moving Average Strategy for 2024" lang="Practical Video (Vietsub) · Quick & Concise" desc="How to use Moving Averages (EMA/SMA) to determine trends, entry points (pullbacks), and profit-taking points most practically." why="Helps you immediately understand how to use the 3 EMA system instead of just pure theory." link="https://www.youtube.com/watch?v=bO_qQi-NJEo" />
          <ResourceCard type="YouTube · RSI" name="RSI Indicator Strategy 2024" lang="Practical Video (Vietsub) · Quick & Concise" desc="Breaking classic mistakes like 'RSI > 70 means sell'. Guide on using RSI to find Divergence and confirm trend strength." why="Practical video solving the problem of misusing RSI that most beginners make." link="https://www.youtube.com/watch?v=JWcX8YA0G3A" />
          <ResourceCard type="YouTube · MACD" name="MACD Trading Strategy (Latest 2024)" lang="Practical Video (Vietsub) · Quick & Concise" desc="Direct on-chart guide on reading the Histogram, the crossover between MACD Line and Signal Line to catch big waves." why="Watch and apply immediately to the chart to measure momentum." link="https://www.youtube.com/watch?v=rf_EQvubKlk" />
          <ResourceCard type="Practice Website" name="Investopedia — Technical Analysis 2024 Guide" lang="English Article · Free" desc="High-quality comprehensive article on Japanese candlesticks, volume, and basic indicators with real examples in the real market." why='When you need a quick theory refresher, this is the best article to look up.' link="https://www.investopedia.com/articles/active-trading/102914/technical-analysis-strategies-beginners.asp" />
          <ResourceCard type="Practical Tool" name="TradingView Chart" lang="Charting Tool · Free" desc="The world's #1 technical analysis platform. Don't just learn, open the chart and draw support/resistance lines yourself right now." why="Learning must go hand in hand with practice. Click to open the chart now!" link="https://www.tradingview.com/chart/" />
        </div>
      </>
    )
  },
  {
    id: 8, title: "9. Final Quiz",
    content: (
      <>
        <SectionHead icon={<Star size={16} />} title="Chapter 2 Competency Test" desc="12 core questions." />
        <FinalQuizCh2 />
      </>
    )
  }
];


export default CHAPTER_2_DATA_EN;
