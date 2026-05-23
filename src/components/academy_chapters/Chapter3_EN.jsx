import { Brain, BookOpen, Map, Star, TrendingUp, Ruler, Target, FileText, Scale, CheckCircle, XCircle, RefreshCw, BarChart2, AlertTriangle, TrendingDown, MinusCircle, Dices, PartyPopper, Dumbbell, Library, Trophy, Users, Radio, ShoppingCart, Zap, Landmark, DollarSign, Clock, Lightbulb, Lock, ArrowRight, Skull, Flame, Edit2, Compass, Shield, Activity, Flag, Award, Crosshair, Hammer, Wind, Eye, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { SectionHead, StoryBox, Callout, CyberTable, ExerciseBox } from '../Sharedcomponents.jsx';

// ==========================================
// EXCLUSIVE INTERACTIVE COMPONENTS FOR CHAPTER 3
// ==========================================

const SimpleQuiz = ({ q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-5 flex items-center gap-3 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <span className="text-xs font-black tracking-widest uppercase text-yellow-600 dark:text-[#FCD535] bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30 px-4 py-1.5 rounded-full shadow-sm"><Edit2 size={16} className="inline mr-1" /> KNOWLEDGE CHECK</span>
      </div>
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

const FibCalculator = () => {
  const [low, setLow] = useState(1900);
  const [high, setHigh] = useState(2050);
  const [dir, setDir] = useState('bull');

  const rng = high - low;
  let rows, note;

  if (dir === 'bull') {
    const m62 = high - rng * 0.62, m79 = high - rng * 0.79, m88 = high - rng * 0.88;
    const e127 = high + rng * 0.27, e162 = high + rng * 0.62;
    rows = [
      { lbl: 'Swing Low (0%)', val: low.toFixed(2), color: 'text-gray-500 dark:text-[#848E9C]', type: 'Starting Point' },
      { lbl: '88% Retracement', val: m88.toFixed(2), color: 'text-yellow-600 dark:text-[#FCD535]', type: '<AlertTriangle size={14} className="inline mr-1 text-yellow-500"/> Cautious Entry' },
      { lbl: '79% Retracement', val: m79.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: 'Entry zone' },
      { lbl: '62% Retracement', val: m62.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: '⭐ Priority Entry' },
      { lbl: 'Swing High (100%)', val: high.toFixed(2), color: 'text-black dark:text-white', type: 'Resistance' },
      { lbl: '127% Extension', val: e127.toFixed(2), color: 'text-blue-600 dark:text-[#378ADD]', type: 'TP1 — Take 50%' },
      { lbl: '162% Extension', val: e162.toFixed(2), color: 'text-blue-600 dark:text-[#378ADD]', type: 'TP2 — Take all' },
    ];
    note = `📐 Uptrend: Best entry at $${m62.toFixed(0)}-$${m79.toFixed(0)} (62-79%). SL below $${(low - 10).toFixed(0)} (Swing Low-10pip). TP1=$${e127.toFixed(0)}, TP2=$${e162.toFixed(0)}.`;
  } else {
    const m62 = low + rng * 0.62, m79 = low + rng * 0.79, m88 = low + rng * 0.88;
    const e127 = low - rng * 0.27, e162 = low - rng * 0.62;
    rows = [
      { lbl: 'Swing High (0%)', val: high.toFixed(2), color: 'text-gray-500 dark:text-[#848E9C]', type: 'Starting Point' },
      { lbl: '62% Retracement', val: m62.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: '⭐ Priority SELL zone' },
      { lbl: '79% Retracement', val: m79.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: 'SELL zone' },
      { lbl: '88% Retracement', val: m88.toFixed(2), color: 'text-yellow-600 dark:text-[#FCD535]', type: '<AlertTriangle size={14} className="inline mr-1 text-yellow-500"/> Cautious SELL' },
      { lbl: 'Swing Low (100%)', val: low.toFixed(2), color: 'text-black dark:text-white', type: 'Support' },
      { lbl: '127% Extension', val: e127.toFixed(2), color: 'text-red-600 dark:text-[#F6465D]', type: 'TP1 — Take 50%' },
      { lbl: '162% Extension', val: e162.toFixed(2), color: 'text-red-600 dark:text-[#F6465D]', type: 'TP2 — Take all' },
    ];
    note = `📐 Downtrend: Best SELL at $${m62.toFixed(0)}-$${m79.toFixed(0)} (62-79%). SL above $${(high + 10).toFixed(0)} (Swing High+10pip). TP1=$${e127.toFixed(0)}, TP2=$${e162.toFixed(0)}.`;
  }

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Ruler size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-black dark:text-white text-lg flex-1">NNN Fibonacci Calculator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Swing Low ($)</label><input type="number" value={low} onChange={e => setLow(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Swing High ($)</label><input type="number" value={high} onChange={e => setHigh(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Direction</label><select value={dir} onChange={e => setDir(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="bull">Uptrend (Low→High)</option><option value="bear">Downtrend (High→Low)</option></select></div>
        </div>
        <div className="overflow-x-auto border border-gray-200 dark:border-[#2B3139] rounded-2xl mb-6">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead><tr className="bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C] text-[15.5px] uppercase tracking-widest border-b border-gray-200 dark:border-[#2B3139]">
              <th className="p-4 font-black">Fibonacci Level</th><th className="p-4 font-black">Price ($)</th><th className="p-4 font-black">Type</th>
            </tr></thead>
            <tbody className="text-[17.5px]">
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-[#2B3139]/50 last:border-0 hover:bg-white dark:hover:bg-[#1A2639]/30">
                  <td className={`p-4 font-bold ${r.color}`}>{r.lbl}</td><td className={`p-4 font-mono font-black ${r.color}`}>${r.val}</td><td className="p-4 text-gray-600 dark:text-[#848E9C]" dangerouslySetInnerHTML={{ __html: r.type }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 rounded-2xl text-[17.5px] leading-relaxed bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] border border-blue-200 dark:border-transparent">{note}</div>
      </div>
    </div>
  );
};

const PatternCard = ({ svgCandles, name, type, badgeClass, essence, steps, isWarning }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden mb-6 transition-all shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-white dark:bg-[#181A20]">
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B3139]/50 transition-colors">
        <div className="flex items-center gap-6">
          <div className="flex items-end gap-2 h-16">{svgCandles}</div>
          <div>
            <div className="text-lg md:text-xl font-black text-black dark:text-white mb-2">{name}</div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[13.5px] font-black tracking-widest uppercase ${badgeClass}`}>{type.split('|')[0]}</span>
              <span className="text-[15.5px] text-gray-500 dark:text-[#848E9C] hidden md:block">{type.split('|')[1]}</span>
            </div>
          </div>
        </div>
        <span className={`text-2xl text-gray-400 transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
      </div>
      {isOpen && (
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#0B0E11] border-t border-gray-200 dark:border-[#2B3139] animate-in fade-in transition-colors">
          <div className="bg-gray-100 dark:bg-[#1A2639]/50 border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 mb-6">
            <div className="text-[13.5px] font-mono font-black tracking-[0.15em] text-yellow-600 dark:text-[#FCD535] mb-3 uppercase">Essence</div>
            <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]" dangerouslySetInnerHTML={{ __html: essence }}></div>
          </div>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 border border-yellow-300 dark:border-[#FCD535]/50 text-yellow-800 dark:text-[#FCD535] text-xs font-bold flex items-center justify-center shrink-0 mt-1">{idx + 1}</div>
                <div className="text-[18.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF]" dangerouslySetInnerHTML={{ __html: step }}></div>
              </div>
            ))}
          </div>
          {isWarning && <div className="mt-6 p-4 bg-red-50 dark:bg-[#F6465D]/10 border border-red-200 dark:border-[#F6465D]/30 text-red-800 dark:text-[#F6465D] rounded-xl text-[16.5px] leading-relaxed" dangerouslySetInnerHTML={{ __html: isWarning }}></div>}
        </div>
      )}
    </div>
  );
};

const FinalQuizCh3 = () => {
  const qs = [
    { q: 'A short-bodied candle appears at gold $2,050 resistance after an uptrend. D1 is uptrend. You place Buy Stop at H+10 and Sell Stop at L-10. Price breaks down below L and triggers Sell Stop. What do you do next?', opts: ['Keep both orders', 'Cancel Buy Stop immediately, keep Sell Stop and manage the trade', 'Close Sell Stop because D1 trend is still bullish', 'Add to Sell Stop'], c: 1, exp: 'According to NNN① rules, when one of the Stop orders is triggered (here, the Sell Stop), you must IMMEDIATELY CANCEL the remaining Stop order (Buy Stop) to avoid getting caught on both sides if price whipsaws.' },
    { q: 'What is the EXACT condition for an Inside Bar (NNN②)?', opts: ['Following candle body is smaller than previous body', 'H_mother ≥ H_baby AND L_mother ≤ L_baby (compare total H and L)', 'Following candle color is opposite', 'Following candle closes inside previous body'], c: 1, exp: 'The exact definition of an Inside Bar is that the entire baby candle (both body and wicks) must be completely contained within the High-Low range of the mother candle.' },
    { q: 'EMA21 is sloping up. Price pulls back to test EMA21 then a Dragonfly Doji forms. What setup is this according to NNN?', opts: ['Only NNN① (short-bodied candle)', 'Only NNN③ (EMA21)', 'NNN① + NNN③ simultaneously converge = much stronger signal', 'No setup because Doji is not strong enough'], c: 2, exp: 'This is Confluence. A short-bodied candle (NNN①) combining with EMA21 (NNN③) at the same point creates a setup with a much higher win probability than relying on just 1 signal.' },
    { q: 'Price pulls back to 62% Fibonacci and a Bullish Engulfing appears. What is the R:R in NNN system (TP1 = 127%, SL = below Swing Low)?', opts: ['Depends on specific Swing Low and Swing High', 'Always 1:2', 'Always 1:3', 'R:R is not important in NNN'], c: 0, exp: 'The R:R ratio depends on the actual distance between Entry (at 62%), SL (below 100% Swing Low), and TP (127%). It varies based on the specific wave structure on the chart.' },
    { q: 'Where is Morning Star most valuable?', opts: ['Anywhere on chart', 'After uptrend at resistance', 'After downtrend at support — especially converging with Fibonacci 62/79%', 'Middle of sideway range'], c: 2, exp: 'The Morning Star reversal pattern reaches its maximum strength when it appears after a clear downtrend and at a strong support zone (e.g., Fibo 62% or 79%).' },
    { q: 'Why does Mr. NNN use the 88% Fibonacci level even though it is near 100% (Swing Low)?', opts: ['88% is a standard Fibonacci level', 'To have a wider SL, preventing stopout when price dips to 88% before bouncing', '88% is not important', 'To get bigger TP'], c: 1, exp: 'In many cases, price "sweeps" liquidity very deeply before reversing. The 88% level serves as the last entry opportunity or an early warning before the Swing Low (100%) is broken.' },
    { q: 'Bullish Engulfing appears in the middle of an uptrend, not near any S/R. What signal is this?', opts: ['Strong BUY — Engulfing is always a good signal', 'Unreliable — Engulfing needs proper context (after downtrend/at S/R)', 'SELL — this is the top', 'Trend continuation, buy more'], c: 1, exp: 'Candlestick patterns require Context. A Bullish Engulfing floating in the middle of a rising cycle, without support from S/R, is generally unreliable and prone to failure.' },
    { q: 'You see: D1 uptrend + 62% Fibonacci + EMA21 converging at the same zone + Hammer + bullish RSI divergence. How many convergence signals is this?', opts: ['2 signals', '3 signals', '4 signals', '5 signals — A++ graded setup, deserves a larger size'], c: 3, exp: 'D1 (1) + Fibo 62% (2) + EMA21 (3) + Hammer (4) + RSI Divergence (5) = 5 converging factors. This is a very high-quality Setup.' },
    { q: 'Three White Soldiers appear after a Morning Star at the bottom. RSI is at 78. Should you BUY?', opts: ['BUY full size — 3 green candles = massive momentum', 'Cautious — RSI 78 (overbought). Wait for pullback to EMA21 instead of chasing price', 'Never BUY when RSI >70', 'SELL because RSI is overbought'], c: 1, exp: 'Although the price action is very bullish, RSI 78 shows price has rallied too fast. FOMO buying now is risky. Be patient and wait for price to pull back to EMA21.' },
    { q: 'In NNN④, after price hits TP1 (127%), what is the NEXT step?', opts: ['Close entire position', 'Take 50% profit at TP1, move SL of the rest to entry (Break Even)', 'Add to position because price is strong', 'Move SL to 79% Fibonacci'], c: 1, exp: 'The standard NNN trade management rule: Take half profit at TP1 to secure gains and remove risk by moving the SL of the remaining position to Break Even (Entry).' },
    { q: 'Shooting Star appears at uptrend peak, $2,100 resistance. Upper shadow = 120 pips, body = 30 pips. You enter Sell Stop at L − 10pips. Where to place SL?', opts: ['Below body − 10pips', 'Above Shooting Star H + 10pips ($2,100 + shadow + 10)', 'At EMA21', 'At 50% Fibonacci'], c: 1, exp: 'Stop Loss is always placed above the wick (High) of the bearish reversal signal plus a buffer (10 pips) to avoid being stopped out by random price spikes.' },
    { q: 'EUR/USD H4: EMA21 sloping up, price just closed BELOW EMA21 for the first time in 2 weeks. D1 is still uptrend. What is this signal?', opts: ['SELL signal — price broke EMA21', 'Early CHoCH warning — do not open new Buys, consider tightening SL for existing Buys', 'Buy more signal because D1 still uptrend', 'Means nothing'], c: 1, exp: 'Price closing below EMA21 after a long uptrend is the first sign of weakness. While not enough to SELL against D1, it is a signal to pause new BUYs and protect existing profits.' },
    { q: 'Bearish Harami appears at uptrend peak. What should you do IMMEDIATELY?', opts: ['SELL full size immediately', 'Close 50% of existing Buy orders (take profit to preserve capital), wait for further confirmation before fully selling', 'Do nothing — Harami is weak', 'Add to Buy'], c: 1, exp: 'Harami is a pattern showing indecision, not as strong as an Engulfing. The wise action is to take partial profit on existing BUYs, without rushing to SELL before a strong bearish confirmation candle.' },
    { q: 'What are 127% and 162% Fibonacci levels used for in NNN④?', opts: ['Determine support zones', 'TP1 (127% — take 50%) and TP2 (162% — take all) for entries from 62-88% Retracement zone', 'Second entry point', 'Stop Loss'], c: 1, exp: 'The Fibonacci Extension levels 127% and 162% are used as projected Take Profit targets for trend-following waves.' },
    { q: 'What is the most important GOLDEN RULE of the NNN system?', opts: ['Always use EMA21', 'Confluence: only enter when ≥3 NNN signals/patterns converge in one price zone — never enter just for 1 signal', '62% Fibonacci is the best entry', 'Always use 10pip SL'], c: 1, exp: 'Confluence is the key. Combining multiple supporting factors will increase your win probability to the highest level, filtering out market noise.' }
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
          <p className="text-gray-600 dark:text-[#848E9C] text-[18.5px] mb-6">{score >= 12 ? <><Trophy size={18} className="inline mr-1 text-yellow-500" /> Excellent! You are ready to learn Risk Management.</> : <><Dumbbell size={48} className="mx-auto text-blue-500 mb-4" /> Did not pass 12/15. Please reread NNN Methods and Confluence.</>}</p>
          <button onClick={() => { setAnswers({}); setShowRes(false); }} className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:bg-black transition-colors">Retry</button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SVG CHARTS FOR 4 NNN METHODS
// ==========================================

const NNNChart1 = () => (
  <div className="bg-[#050c0f] border border-gray-800 rounded-2xl p-4 my-8 overflow-x-auto">
    <div className="text-[13.5px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN① Illustration — Short-bodied Candle (Doji) at Support · Buy Stop &amp; Sell Stop</div>
    <svg viewBox="0 0 700 220" className="w-full h-auto min-w-[500px]" role="img">
      {/* Support zone band */}
      <rect x="0" y="145" width="700" height="35" fill="#00d08415" rx="0" />
      <line x1="0" y1="145" x2="700" y2="145" stroke="#00d084" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6" />
      <line x1="0" y1="180" x2="700" y2="180" stroke="#00d084" strokeWidth="1" strokeDasharray="6 3" opacity="0.3" />
      <text x="10" y="165" fill="#00d084" fontSize="11" fontFamily="monospace" opacity="0.8">SUPPORT ZONE</text>
      {/* 4 downtrend candles */}
      <line x1="60" y1="30" x2="60" y2="105" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="52" y="40" width="16" height="52" fill="#ff5252" rx="2" opacity="0.9" />
      <line x1="120" y1="55" x2="120" y2="120" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="112" y="65" width="16" height="46" fill="#ff5252" rx="2" opacity="0.9" />
      <line x1="180" y1="78" x2="180" y2="138" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="172" y="88" width="16" height="42" fill="#ff5252" rx="2" opacity="0.9" />
      <line x1="240" y1="105" x2="240" y2="155" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="232" y="112" width="16" height="38" fill="#ff5252" rx="2" opacity="0.9" />
      {/* Doji (Short body) at support */}
      <line x1="305" y1="118" x2="305" y2="172" stroke="#9ca3b0" strokeWidth="2" />
      <rect x="297" y="143" width="16" height="5" fill="#e8eaf0" rx="1" />
      <rect x="293" y="130" width="24" height="5" fill="transparent" rx="1" />
      <text x="328" y="153" fill="#e8eaf0" fontSize="11" fontFamily="monospace" fontWeight="bold">Doji at S/R</text>
      {/* BUY STOP line */}
      <line x1="280" y1="116" x2="650" y2="116" stroke="#00d084" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.85" />
      <rect x="330" y="104" width="200" height="18" fill="#00d08425" rx="3" />
      <text x="338" y="117" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">BUY STOP (H + 10pip)</text>
      {/* SELL STOP line */}
      <line x1="280" y1="175" x2="540" y2="175" stroke="#ff5252" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.85" />
      <rect x="330" y="177" width="200" height="18" fill="#ff525220" rx="3" />
      <text x="338" y="190" fill="#ff5252" fontSize="11" fontFamily="monospace" fontWeight="bold">SELL STOP (L − 10pip)</text>
      {/* Breakout green candle */}
      <line x1="380" y1="72" x2="380" y2="135" stroke="#00d084" strokeWidth="2" />
      <rect x="372" y="78" width="16" height="50" fill="#00d084" rx="2" />
      {/* Price continues upward */}
      <polyline points="388,80 430,55 480,35 535,18" stroke="#00d084" strokeWidth="2.5" fill="none" opacity="0.75" />
      <circle cx="430" cy="55" r="3.5" fill="#00d084" opacity="0.8" />
      <circle cx="480" cy="35" r="3.5" fill="#00d084" opacity="0.8" />
      {/* BUY activated label */}
      <rect x="548" y="8" width="145" height="22" fill="#00d08440" rx="4" />
      <text x="558" y="23" fill="#00d084" fontSize="12" fontFamily="monospace" fontWeight="bold">BUY activated! ↑</text>
      {/* Cancel SELL STOP label */}
      <rect x="555" y="165" width="135" height="22" fill="#ff525215" rx="4" />
      <text x="562" y="180" fill="#ff5252" fontSize="11" fontFamily="monospace">✗ Cancel Sell Stop</text>
      {/* SL reference line */}
      <line x1="295" y1="182" x2="415" y2="182" stroke="#ff5252" strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
      <text x="418" y="185" fill="#ff5252" fontSize="10" fontFamily="monospace" opacity="0.6">SL</text>
    </svg>
  </div>
);

const NNNChart2 = () => (
  <div className="bg-[#050c0f] border border-gray-800 rounded-2xl p-4 my-8 overflow-x-auto">
    <div className="text-[13.5px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN② Illustration — Inside Bar · Mother candle engulfs baby candle</div>
    <svg viewBox="0 0 700 230" className="w-full h-auto min-w-[500px]" role="img">
      {/* Context candles (downtrend) */}
      <line x1="40" y1="30" x2="40" y2="95" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="32" y="38" width="16" height="48" fill="#ff5252" rx="2" opacity="0.8" />
      <line x1="95" y1="55" x2="95" y2="120" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="87" y="62" width="16" height="48" fill="#ff5252" rx="2" opacity="0.8" />
      <line x1="150" y1="78" x2="150" y2="138" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="142" y="85" width="16" height="44" fill="#ff5252" rx="2" opacity="0.8" />
      {/* Mother candle (big bearish) */}
      <text x="215" y="25" fill="#9ca3b0" fontSize="10" fontFamily="monospace" textAnchor="middle">Mother</text>
      <line x1="215" y1="28" x2="215" y2="205" stroke="#ff5252" strokeWidth="2" />
      <rect x="205" y="42" width="20" height="148" fill="#ff5252" rx="3" opacity="0.95" />
      {/* BUY STOP line (at H_mẹ) */}
      <line x1="195" y1="28" x2="660" y2="28" stroke="#00d084" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.9" />
      <rect x="310" y="16" width="220" height="18" fill="#00d08425" rx="3" />
      <text x="318" y="29" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">BUY STOP (H_mother + 10pip)</text>
      {/* SELL STOP line (at L_mẹ) */}
      <line x1="195" y1="208" x2="530" y2="208" stroke="#ff5252" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.9" />
      <rect x="310" y="210" width="210" height="18" fill="#ff525220" rx="3" />
      <text x="318" y="223" fill="#ff5252" fontSize="11" fontFamily="monospace" fontWeight="bold">SELL STOP (L_mother − 10pip)</text>
      {/* Baby candle (small, inside mother's range) */}
      <text x="280" y="25" fill="#9ca3b0" fontSize="10" fontFamily="monospace" textAnchor="middle">Baby</text>
      <line x1="280" y1="75" x2="280" y2="148" stroke="#9ca3b0" strokeWidth="1.5" />
      <rect x="271" y="92" width="18" height="42" fill="#6b7280" rx="2" />
      <text x="302" y="118" fill="#9ca3b0" fontSize="10" fontFamily="monospace">inside mother</text>
      {/* Breakout green candle */}
      <line x1="355" y1="12" x2="355" y2="80" stroke="#00d084" strokeWidth="2" />
      <rect x="346" y="18" width="18" height="52" fill="#00d084" rx="2" />
      {/* Price continues upward */}
      <polyline points="364,18 410,10 460,5" stroke="#00d084" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" />
      {/* BUY activated label */}
      <rect x="468" y="2" width="145" height="20" fill="#00d08440" rx="4" />
      <text x="476" y="16" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">BUY activated! ↑</text>
      {/* Cancel SELL label */}
      <rect x="540" y="198" width="135" height="20" fill="#ff525215" rx="4" />
      <text x="547" y="212" fill="#ff5252" fontSize="11" fontFamily="monospace">✗ Cancel Sell Stop</text>
      {/* TP markers */}
      <line x1="355" y1="5" x2="700" y2="5" stroke="#d97706" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="625" y="14" fill="#d97706" fontSize="10" fontFamily="monospace">TP</text>
    </svg>
  </div>
);

const NNNChart3 = () => (
  <div className="bg-[#050c0f] border border-gray-800 rounded-2xl p-4 my-8 overflow-x-auto">
    <div className="text-[13.5px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN③ Illustration — Candle closes above EMA21 → BUY Setup + Pullback Entry</div>
    <svg viewBox="0 0 700 215" className="w-full h-auto min-w-[500px]" role="img">
      {/* EMA21 curved line */}
      <path d="M 0,170 C 80,165 150,155 220,140 S 330,110 400,90 S 520,62 700,38" stroke="#d97706" strokeWidth="3" fill="none" opacity="0.9" />
      <text x="648" y="34" fill="#d97706" fontSize="11" fontFamily="monospace" fontWeight="bold">EMA21</text>
      {/* Candles BELOW EMA21 (downtrend context) */}
      <line x1="55" y1="155" x2="55" y2="200" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="47" y="162" width="16" height="32" fill="#ff5252" rx="2" opacity="0.85" />
      <line x1="115" y1="148" x2="115" y2="192" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="107" y="155" width="16" height="30" fill="#ff5252" rx="2" opacity="0.85" />
      <line x1="175" y1="140" x2="175" y2="180" stroke="#ff5252" strokeWidth="1.5" />
      <rect x="167" y="147" width="16" height="28" fill="#ff5252" rx="2" opacity="0.85" />
      {/* Candle CROSSING ABOVE EMA21 → BUY SIGNAL */}
      <line x1="255" y1="100" x2="255" y2="158" stroke="#00d084" strokeWidth="2" />
      <rect x="246" y="107" width="18" height="42" fill="#00d084" rx="2" />
      <text x="278" y="120" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">Close ABOVE EMA21 ✓</text>
      {/* BUY STOP dashed line */}
      <line x1="238" y1="100" x2="700" y2="100" stroke="#00d084" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.7" />
      <text x="580" y="95" fill="#00d084" fontSize="10" fontFamily="monospace">BUY STOP</text>
      {/* Pullback candle (testing EMA21) */}
      <line x1="330" y1="98" x2="330" y2="130" stroke="#9ca3b0" strokeWidth="1.5" />
      <rect x="322" y="104" width="16" height="18" fill="#6b7280" rx="2" />
      <text x="352" y="128" fill="#9ca3b0" fontSize="10" fontFamily="monospace">Pullback (Kiss EMA)</text>
      {/* SL reference line */}
      <line x1="238" y1="158" x2="420" y2="158" stroke="#ff5252" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="424" y="162" fill="#ff5252" fontSize="10" fontFamily="monospace" opacity="0.7">SL</text>
      {/* Price continues upward after entry */}
      <polyline points="348,100 390,78 440,55 500,32 560,15" stroke="#00d084" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" />
      <circle cx="440" cy="55" r="3.5" fill="#00d084" opacity="0.75" />
      {/* BUY activated label */}
      <rect x="570" y="5" width="120" height="20" fill="#00d08440" rx="4" />
      <text x="578" y="19" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">BUY ↑</text>
    </svg>
  </div>
);

const NNNChart4 = () => {
  const SH = 45, SL = 225;
  const rng = SL - SH;
  const f62 = SH + rng * 0.62;
  const f79 = SH + rng * 0.79;
  const f88 = SH + rng * 0.88;
  const tp1 = SH - rng * 0.27;
  return (
    <div className="bg-[#050c0f] border border-gray-800 rounded-2xl p-4 my-8 overflow-x-auto">
      <div className="text-[13.5px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN④ Illustration — NNN Fibonacci: Swing Low→High → Pullback 62% → Entry → TP1/TP2</div>
      <svg viewBox="0 0 720 260" className="w-full h-auto min-w-[520px]" role="img">
        {/* Fibonacci horizontal levels */}
        <line x1="30" y1={tp1} x2="690" y2={tp1} stroke="#d97706" strokeWidth="1" strokeDasharray="5 3" opacity="0.7" />
        <text x="32" y={tp1 - 4} fill="#d97706" fontSize="10" fontFamily="monospace">127% — TP1</text>
        <line x1="30" y1={SH} x2="690" y2={SH} stroke="#e8eaf0" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
        <text x="32" y={SH - 4} fill="#e8eaf0" fontSize="10" fontFamily="monospace">100% Swing High</text>
        <line x1="30" y1={f62} x2="690" y2={f62} stroke="#00d084" strokeWidth="2" strokeDasharray="6 3" opacity="0.9" />
        <rect x="32" y={f62 - 14} width="100" height="16" fill="#00d08425" rx="3" />
        <text x="38" y={f62} fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">62% ⭐ Entry</text>
        <line x1="30" y1={f79} x2="690" y2={f79} stroke="#4a9eff" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
        <text x="32" y={f79 - 4} fill="#4a9eff" fontSize="10" fontFamily="monospace">79% Entry</text>
        <line x1="30" y1={f88} x2="690" y2={f88} stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <text x="32" y={f88 + 12} fill="#fbbf24" fontSize="10" fontFamily="monospace">88% ⚠ Caution</text>
        <line x1="30" y1={SL} x2="690" y2={SL} stroke="#e8eaf0" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4" />
        <text x="32" y={SL + 12} fill="#e8eaf0" fontSize="10" fontFamily="monospace">0% Swing Low</text>
        {/* Price: Swing Low → Swing High (upswing) */}
        <polyline points={`140,${SL} 200,${SL - 30} 260,${SL - 60} 320,${SH + 30} 380,${SH}`} stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Price: Pullback from SH to 62% */}
        <polyline points={`380,${SH} 420,${f62 - 20} 460,${f62}`} stroke="rgba(255,82,82,0.75)" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="6 3" />
        {/* Hammer candle at 62% zone */}
        <line x1="470" y1={f62 - 18} x2="470" y2={f62 + 22} stroke="#00d084" strokeWidth="2" />
        <rect x="462" y={f62 - 12} width="16" height="16" fill="#00d084" rx="2" />
        <line x1="470" y1={f62 + 8} x2="470" y2={f62 + 22} stroke="#00d084" strokeWidth="2" />
        <text x="490" y={f62 + 5} fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">Hammer → BUY ✓</text>
        {/* BUY entry arrow */}
        <polyline points={`478,${f62 - 18} 530,${f62 - 50} 590,${SH + 20} 650,${tp1 + 15}`} stroke="#00d084" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* TP1 marker */}
        <circle cx="630" cy={tp1 + 8} r="6" fill="#d97706" opacity="0.9" />
        <text x="642" y={tp1 + 12} fill="#d97706" fontSize="11" fontFamily="monospace" fontWeight="bold">TP1</text>
        {/* SL reference */}
        <line x1="460" y1={SL - 5} x2="560" y2={SL - 5} stroke="#ff5252" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <text x="564" y={SL - 1} fill="#ff5252" fontSize="10" fontFamily="monospace" opacity="0.8">SL</text>
        {/* Swing arrows */}
        <text x="145" y={SL - 5} fill="#9ca3b0" fontSize="10" fontFamily="monospace">Swing Low</text>
        <text x="355" y={SH - 6} fill="#9ca3b0" fontSize="10" fontFamily="monospace">Swing High</text>
      </svg>
    </div>
  );
};

// ==========================================
// CHAPTER 3 DATA: NNN & CANDLE READING
// ==========================================

const CHAPTER_3_DATA_EN = [
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "0. Chapter 3 Overview",
    content: (
      <>
        <SectionHead icon={<Compass size={16} className="inline mr-1" />} title="NNN Methods & The Art of Candle Reading" desc="This chapter teaches you the specific trading system of Mr. Nguyen Ngoc Nghia — 4 clear methods from A to Z. Combined with 9 advanced candle patterns to help you read market psychology more accurately than any indicator." />
        <StoryBox label="Philosophy of Mr. Nguyen Ngoc Nghia" icon={<BookOpen size={16} />}>
          "The market speaks through candles. If you know how to read that language, you don't need complex indicators. <strong>Price action is the truth. Indicators are the shadow of the truth.</strong>"<br /><br />
          The 4 NNN methods are built entirely on price action and the simplest tools — but applied with <em>discipline and consistency</em>. This is the key.
        </StoryBox>

        <SectionHead icon={<Map size={16} />} title="Chapter 3 Map" desc="11 lessons · Learn in order." />
        <CyberTable
          headers={["Part", "Content", "Objective"]}
          rows={[
            ["I", "4 NNN Methods: Short-bodied candle, Inside Bar, EMA21, NNN Fibonacci", "Have a clear entry/SL/TP process for each setup."],
            ["II", "9 Advanced Candle Patterns: Engulfing, Hammer/Star, Doji, Morning/Evening, Harami, Three Soldiers", "Read market psychology through candle structures."],
            [<Star size={16} className="inline mr-1 text-yellow-500" />, "Confluence + 15-question Quiz", "Know when to enter, when to reduce size, when to stay out."]
          ]}
        />
        <Callout type="ok" title="Most effective way to learn:">Read each method → open TradingView simultaneously → find that pattern immediately on a real chart → write it in your notebook. Don't read everything before practicing — read 1 lesson, practice immediately.</Callout>

        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">The Golden Rules of NNN</h3>
        <div className="space-y-5">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Confluence is king.</strong> A single NNN signal = only worth noticing. 2 signals = worth considering. 3+ confluent signals = you can plan an entry if R:R and risk are met. Never enter a trade just because of one condition.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>D1 Trend is the law.</strong> Do not prioritize trading against the D1 trend. If a lower timeframe setup goes against the higher timeframe, heavily reduce size or skip.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Candle must CLOSE to confirm.</strong> Do not enter a trade when the candle has not closed. A wick poking through is not a signal. The body closing on the other side is the signal.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Always know SL and TP before entering.</strong> Do not enter a trade without knowing where you will cut your losses and take profit. Minimum R:R is 1:2.</div></div>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "1. NNN① Short-bodied Candle",
    content: (
      <>
        <SectionHead icon="①" title="Short-bodied Candle" desc="The market is hesitating — When the candle body is very small, it means buyers and sellers are 'tied'." />
        <p className="text-[18.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4"><strong>Exact definition from NNN notes:</strong> a short-bodied candle is a candle with Close nearly equal to Open, the body is very small compared to the entire High-Low range.</p>
        <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-5 my-6 font-mono text-[16.5px] text-gray-200">
          Quantitative condition: |Close - Open| / (High - Low) &lt; 0.3
        </div>
        <NNNChart1 />
        <StoryBox label="The battle within a trading session" icon={<Shield size={16} className="inline mr-1" />}>
          In every trading session, millions of buyers and sellers are "fighting" each other. Buyers want to push the price up, sellers want to pull the price down.<br /><br />
          When a candle has a long body → <strong>one side has won overwhelmingly.</strong><br />
          When a candle has a short body → <strong>both sides are tied, no one wins.</strong><br /><br />
          This "tied" situation is very unstable. Just a small "push" — for example, news, or Smart Money starting to enter orders — and the price will break out strongly to one side. An NNN trader will <em>enter an order in that direction</em> as soon as it breaks out.
        </StoryBox>



        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Step-by-step entry process</h3>
        <div className="space-y-5">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Prerequisite condition:</strong> Check D1 — is it in an uptrend or downtrend? Identify 2–3 key S/R zones. The short-bodied candle must appear AT or NEAR an S/R zone — not in the middle of empty space.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Identify the short-bodied candle:</strong> Very small body (Doji, Spinning Top). Upper and/or lower shadows are longer than the body. Green/red color doesn't matter.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>PLACE 2 ORDERS SIMULTANEOUSLY:</strong><br />• <strong>Buy Stop</strong> at the High of the short-bodied candle + 10 pips (buffer to avoid whipsaw)<br />• <strong>Sell Stop</strong> at the Low of the short-bodied candle − 10 pips</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Set SL and TP:</strong><br />• Buy Stop: SL = L of the candle − 10 pips; TP according to R:R ratio ≥ 1:2<br />• Sell Stop: SL = H of the candle + 10 pips<br />When 1 order is triggered → <strong>IMMEDIATELY CANCEL the other order.</strong></div></div>
        </div>

        <Callout type="warn" title="Most common mistake:">Location is everything! A short-bodied candle in mid-air, in the middle of a sideway range, not near any S/R → HAS NO VALUE.</Callout>

        <SimpleQuiz q='A Doji candle appears at the $2,000 gold support zone after a long downtrend. You place a Buy Stop at $2,010 (H+10) and a Sell Stop at $1,988 (L-10). The next candle closes at $2,015. What do you do next?' opts={['Wait further because there is not enough confirmation', 'Buy Stop triggered at $2,010 — IMMEDIATELY CANCEL Sell Stop $1,988, keep the Buy position with SL below the Doji low', 'Enter another Buy order to be sure', 'Keep both Buy Stop and Sell Stop orders']} correctIdx={1} explanation='Buy Stop triggered → IMMEDIATELY CANCEL Sell Stop. You cannot let both orders exist.' />
        <SimpleQuiz q='A short-bodied candle appears in the MIDDLE of a sideway range, not near any S/R, after 20 sideways candles. D1 is sideway. What should you do?' opts={['Place Buy Stop and Sell Stop as usual', 'IGNORE — no context (not at S/R, D1 sideway) → unreliable signal', 'Only place Buy Stop', 'Place order with small size']} correctIdx={1} explanation='Context is everything. Lack of S/R and D1 Trend = Ignore.' />
        <ExerciseBox title="Find and mark Short-bodied Candles" desc="Open TradingView, find XAU/USD H4 and do the following steps:" steps={[
          { d: 'Draw 3 key S/R zones on D1: old peaks, old bottoms, round number zones.' },
          { d: 'On H4, find at least 3 Doji or Spinning Top candles that appeared <strong>at</strong> those S/R zones.' },
          { d: 'For each candle: note Buy Stop at H+10, Sell Stop at L-10. Which order triggered? What is the result after 10-20 candles?' },
          { d: 'Only count signals at S/R. Do not count short-bodied candles that appear in empty space.' }
        ]} />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "2. NNN② Inside Bar",
    content: (
      <>
        <SectionHead icon="②" title="Inside Bar" desc="Power is 'confined' — trade when energy is compressed." />
        <p className="text-[18.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6"><strong>Exact definition:</strong> A cluster of 2 consecutive candles, where <em>H and L of the previous candle (mother candle) "engulf" the H and L of the following candle (baby candle).</em></p>

        <StoryBox label="Compressed Spring" icon={<Activity size={16} className="inline mr-1" />}>
          The mother candle moves strongly (e.g. drops 100 pips). The next baby candle cannot move outside the range of the mother candle — it is "trapped" inside.<br /><br />
          This means: <strong>neither buyers nor sellers are strong enough to claim more territory.</strong> The market is "resting", "deciding". Energy is accumulating.<br /><br />
          When the 3rd candle breaks out of the mother candle's range → <strong>the spring is released</strong>. All that accumulated energy breaks out in one direction. Entering a trade in the right direction at this time = riding a massive momentum.
        </StoryBox>

        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Entry Process (From Notes)</h3>
        <div className="space-y-5">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Identify the Inside Bar cluster:</strong> H_mother ≥ H_baby AND L_mother ≤ L_baby. Check carefully — if H_baby exceeds H_mother EVEN by 1 pip, it is NOT an Inside Bar.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Place 2 pending orders:</strong><br />• <strong>Buy Stop</strong> at H of the mother candle + 10 pips<br />• <strong>Sell Stop</strong> at L of the mother candle − 10 pips</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SL according to notes:</strong><br />• Buy Stop: SL = L of mother candle − 10 pips (or L of baby candle depending on setup)<br />• Sell Stop: SL = H of mother candle + 10 pips<br />TP = according to Fibonacci extension (127% or 162% of the previous swing)</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>When 1 order triggers → immediately cancel the other order.</strong> Then manage the trade: when profit reaches 1R, move SL to BE (Break Even).</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">5</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Filter signals:</strong> Inside Bar in sideway is unreliable. Inside Bar after a clear trend, at an S/R zone, or coinciding with EMA21 = high-quality signal.</div></div>
        </div>

        <SimpleQuiz q='The mother candle has H=2050, L=1990. The baby candle has H=2038, L=2002. Is this an Inside Bar? If yes, where do you place Buy Stop and Sell Stop?' opts={['Not because the mother and baby candles have different colors', 'Yes, it is an Inside Bar (H_baby < H_mother AND L_baby > L_mother). Buy Stop=2060, Sell Stop=1980', 'Not because the baby body must be smaller than the mother body (based on O-C price)', 'Yes, it is an Inside Bar, Buy Stop=2050, Sell Stop=1990 (no buffer needed)']} correctIdx={1} explanation='Candle color does not matter, as long as the H and L of the baby candle are completely inside the mother candle.' />
        <SimpleQuiz q='The Buy Stop price of the Inside Bar cluster has been triggered. What do you need to do immediately?' opts={['Place another Buy order to increase profit', 'Cancel the remaining Sell Stop immediately — if the price breaks up and then reverses, the Sell Stop could trigger and cause a double loss', 'Do nothing, wait and see', 'Move SL to BE immediately even without profit']} correctIdx={1} explanation='When a pending order is filled, the opposite order must be canceled immediately. Moving SL to BE should only be done after the trade has moved about 1R or according to the trade management plan.' />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "3. NNN③ EMA21",
    content: (
      <>
        <SectionHead icon="③" title="EMA21" desc="The boundary between Bull vs Bear — Price closes on one side, you follow that side." />
        <p className="text-[18.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">According to NNN's notes, EMA21 is the exponential moving average based on the closing prices of the last 21 candles. The important condition is that the <strong>candle clearly closes</strong> above/below EMA21, not just the shadow touching or piercing through.</p>
        <NNNChart3 />
        <StoryBox label="Psychological Boundary" icon={<Flag size={16} className="inline mr-1" />}>
          Millions of traders around the world look at EMA21. When the price is <strong>above</strong> EMA21: most of those who bought recently are in profit → they are confident → they don't sell → the price continues to rise.<br /><br />
          When the price suddenly <em>crosses and closes on the other side</em> of EMA21 → <strong>the balance of power is shifting</strong>. This is the time to enter a trade.
        </StoryBox>

        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Entry Process</h3>
        <div className="space-y-5 mb-8">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Confirm the trend:</strong> EMA21 sloping up + price mostly above = uptrend (only BUY). EMA21 sloping down + price below = downtrend (only SELL). EMA21 flat = sideway (do not use this method).</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>BUY Signal:</strong> Price is below EMA21 (or pulling back to test) → candle closes <strong>clearly ABOVE</strong> EMA21. Not the shadow touching — the body must close completely above the line.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Entry:</strong> As soon as the candle confirms closing above EMA21. Or (better) wait for the price to <em>pull back to test EMA21</em> again and bounce → better entry price, smaller SL.<br />• <strong>Buy Stop:</strong> at H of the crossing candle + 10pips (according to notes)</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SL:</strong> Below the Low of the crossing candle − 10pips. Do not place SL right at EMA21 (price often comes back to test EMA21 multiple times). TP: next resistance zone or according to minimum R:R of 1:2.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">5</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SELL setup:</strong> Vice versa — candle closes below EMA21 → Sell Stop at L of crossing candle − 10pips. SL = H of the candle + 10pips.</div></div>
        </div>

        <Callout type="tip" title="Pullback Entry (Kiss the EMA)">After the price closes above EMA21, don't enter immediately. Wait for the price to pull back to "kiss" (retest) EMA21 and bounce up. This is exactly the entry point Mr. NNN uses the most.</Callout>

        <SimpleQuiz q='EMA21 is sloping down. Price just crossed above EMA21 and closed above it. What should you do?' opts={['BUY full size immediately because the candle closed above EMA21', 'Cautious — EMA21 is sloping down indicating a downtrend; the crossover could just be a pullback. Check D1 and wait for further confirmation', 'SELL because EMA21 is resistance', 'No need to care about the direction of EMA21']} correctIdx={1} explanation='The signal to close above EMA21 is stronger when EMA21 is sloping up and D1 supports it. If EMA21 is still sloping down, the setup is going against the main wave, so you must reduce risk or skip.' />
        <SimpleQuiz q='In a D1 uptrend, price pulls back to touch EMA21 but the lower SHADOW of the candle touches EMA21 and then the candle closes above EMA21. Is this a BUY signal according to NNN③?' opts={['Yes — the candle closing above EMA21 is the condition. Lower shadow testing EMA21 then bouncing = Perfect Pullback Entry', 'No — the candle shadow touched EMA21, not the body', 'Need 1 more confirmation candle', 'Not eligible because EMA21 must be flat']} correctIdx={0} explanation='The important thing is which side the candle body closes (Close) in relation to EMA21. Close above EMA21 = BUY signal even if the lower shadow touched EMA21.' />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "4. NNN④ Fibonacci",
    content: (
      <>
        <SectionHead icon="④" title="NNN Fibonacci (62·79·88·127·162)" desc="The most complete system among the 4 methods." />
        <Callout type="tip" title="Setup on TradingView">Fibonacci Retracement → Settings → add the following levels: <strong>0.62, 0.79, 0.88, -0.27, -0.62</strong>. These correspond to 62%, 79%, 88%, 127%, and 162%.</Callout>
        <CyberTable
          headers={["Level", "Meaning", "Used for", "Entry Signal"]}
          rows={[
            ["62%", "Moderate pullback, trend is still strong", "Most preferred entry", "Needs confirmation candle"],
            ["79%", "Deep pullback but trend can still hold", "Second entry", "Needs stronger confirmation"],
            ["88%", "Very deep pullback, near failure zone", "Cautious entry, small size", "Needs at least 2 confirmation signals"],
            ["127%", "Extension target 1", "Take profit 50-60% of position", "TP1"],
            ["162%", "Extension target 2", "Take profit the rest or trailing stop", "TP2"]
          ]}
        />
        <StoryBox label="Why 62, 79, 88?" icon={<Activity size={16} className="inline mr-1" />}>
          Standard Fibonacci uses 61.8%, 78.6%. Mr. NNN adjusted it based on real trading: 62% and 79% (rounded numbers, practically price often stops here). Added 88% level: many trades fail because SL is placed at 79% while price dips to 88% before bouncing. Knowing the 88% level helps you avoid being stopped out prematurely.
        </StoryBox>
        <NNNChart4 />

        <FibCalculator />

        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Entry Process</h3>
        <div className="space-y-5 mb-8">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Draw:</strong> Uptrend: draw from Swing Low → Swing High. Downtrend: draw from Swing High → Swing Low.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Entry:</strong> Wait for price to pull back to the 62%–79% zone. If there is a reversal candle (Engulfing, Hammer, Short-bodied candle) here → Buy Stop at H of confirmation candle + 10pips.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SL & TP:</strong> SL below 100% level (Swing Low) − 10pips or below Low of confirmation candle − 10pips (whichever is smaller). TP1 = 127% Extension (take 50%). TP2 = 162% Extension (take the rest).</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Trade Management:</strong> When price hits TP1 at 127%, take partial profits and move SL of the remaining position to Break Even. Let the rest run to TP2 162% or use trailing stop.</div></div>
        </div>

        <SimpleQuiz q='Swing Low = $1,900, Swing High = $2,100. Price pulls back to $2,038. Which NNN Fibonacci level is this close to?' context='Hint: 62% retracement = $2,100 - ($200 × 0.62) = $1,976.' opts={['79% — around $1,942', '62% — around $1,976', 'Not yet in the NNN 62-79% zone; $2,038 is just a shallow pullback, so keep waiting', '88% — around $1,924']} correctIdx={2} explanation='NNN entry zones are deeper: 62% is around $1,976 and 79% is around $1,942. $2,038 has not pulled back deeply enough for this system.' />
        <SimpleQuiz q='Price pulls back to the 79% Fibonacci level and a Doji candle appears. You set a Buy Stop at H+10pips. Where should you place the SL?' opts={['Slightly below the 79% Fibonacci level', 'Below the 88% Fibonacci level', 'Below the 100% level (Swing Low) − 10pips', 'Below the Low of the Doji candle − 10pips']} correctIdx={2} explanation='Standard NNN④ SL = below Swing Low − 10pips. This allows the price to sweep to 88% without you being unfairly stopped out.' />
        <SimpleQuiz q='You are holding a Buy order entered from the 62% Fibonacci level. Price just hit TP1 at 127%. What should you do?' opts={['Close the entire position and take profit', 'Take about 50% profit at TP1, move SL of the rest to entry to let it run to TP2', 'Do nothing, keep holding for TP2', 'Add to the position because price is strong']} correctIdx={1} explanation='This is standard trade management: take money at TP1, reduce risk to 0 with Break Even, then let the rest run.' />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "5. Engulfing",
    content: (
      <>
        <SectionHead icon={<Award size={16} className="inline mr-1 text-yellow-500" />} title="Engulfing Pattern" desc="A strong reversal pattern when it appears in the right context." />
        <StoryBox label="Power Coup" icon={<Crosshair size={16} className="inline mr-1" />}>
          Previous red candle: Bears won.<br />
          Today's green Engulfing candle: <strong>Bulls reclaim all lost territory</strong> and go further. <em>Everyone who sold yesterday is currently losing</em> → they have to buy back to cut losses → price continues to rise.
        </StoryBox>

        <PatternCard
          name="Bullish Engulfing" type="BULLISH|Reversal end of downtrend" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[30px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[52px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
            </>
          }
          essence='Small red candle → Green candle <strong>"swallows" the red candle</strong>: Green Open ≤ Red Close AND Green Close ≥ Red Open. The candle body (Open-Close) is the deciding criterion.'
          steps={[
            '<strong>Requirement:</strong> Must appear after a downtrend, at support or Fibonacci 62/79% zone.',
            '<strong>Entry:</strong> Buy when candle closes, or Buy Stop at H + 10pips.',
            '<strong>SL:</strong> Below the Low of the Engulfing candle − 10pips.'
          ]}
          isWarning="Strong combo: Engulfing + Fibonacci 62% + EMA21. Still need to check D1, R:R and risk limits before entering."
        />

        <PatternCard
          name="Bearish Engulfing" type="BEARISH|Reversal end of uptrend" badgeClass="bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[30px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[52px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
            </>
          }
          essence='Opposite to Bullish: Red candle <strong>"swallows" the previous green candle</strong>. Bears suddenly seize all territory from the Bulls.'
          steps={[
            '<strong>Requirement:</strong> Must appear after an uptrend, at resistance.',
            '<strong>Entry:</strong> Sell Stop at L − 10pips.',
            '<strong>SL:</strong> Above the High of the Engulfing candle + 10pips.'
          ]}
        />
        <SimpleQuiz q='A Bullish Engulfing appears in the MIDDLE of an uptrend, not after a downtrend, not near any S/R. How do you evaluate it?' opts={['Enter BUY immediately — Engulfing is a very strong signal anywhere', 'Ignore or be very cautious — Engulfing in the MIDDLE of an uptrend is not a reversal, just a continuation. Not enough context for a new entry.', 'This is an uptrend continuation signal, BUY more', 'SELL because Engulfing = always reversal']} correctIdx={1} explanation='Engulfing is a REVERSAL pattern. In the middle of a trend it has no reversal value.' />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "6. Hammer & Shooting Star",
    content: (
      <>
        <SectionHead icon={<Hammer size={16} className="inline mr-1" />} title="Hammer & Shooting Star" desc="The counterattack of the defeated." />
        <StoryBox label="Psychological Essence" icon={<Brain size={16} />}>
          Opening price at $2,000. Bears attack strongly, pushing the price down to $1,960. At this time, <strong>Bulls counterattack</strong>: they buy from the low zone, push the price back up and close at $2,002. Looks like a Hammer. Meaning: sellers were rejected at the low zone, but still need support position and confirmation candle before BUYING.
        </StoryBox>

        <PatternCard
          name={<>Hammer <Hammer size={16} className="inline mr-1" /></>} type="BULLISH|Bottom of downtrend" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <div className="flex flex-col items-center mt-2"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[16px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[40px]"></div></div>
          }
          essence='Lower shadow ≥ 2× the body. Small body at the top. Candle color is not important (but green is stronger).'
          steps={[
            '<strong>Requirement:</strong> Must appear after a downtrend at support.',
            '<strong>Confirmation:</strong> Wait for the next candle to be a bullish candle closing above the Hammer\'s H.',
            '<strong>Entry:</strong> Buy Stop at H + 10pips. SL at L − 10pips.'
          ]}
        />
        <PatternCard
          name={<>Shooting Star <Zap size={16} className="inline mr-1" /></>} type="BEARISH|Peak of uptrend" badgeClass="bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]"
          svgCandles={
            <div className="flex flex-col items-center mt-2"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[40px]"></div><div className="w-3 rounded-sm h-[16px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
          }
          essence='Upper shadow is ≥ 2× the body, small body at the bottom. Bears pull the price back.'
          steps={[
            '<strong>Requirement:</strong> After an uptrend at resistance.',
            '<strong>Entry:</strong> Sell Stop at L − 10pips. SL = H + 10pips.'
          ]}
        />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "7. Doji & Variants",
    content: (
      <>
        <SectionHead icon={<Scale size={16} />} title="Doji & Variants" desc="Absolute balance. The foundation of the NNN① method." />
        <StoryBox label="The calm before the storm" icon={<Wind size={16} className="inline mr-1" />}>
          Open = Close. No one wins. Extremely unusual after a long trend. This is the <em>earliest warning sign</em> for a potential reversal.
        </StoryBox>

        <CyberTable
          headers={["Type of Doji", "Shape", "Meaning"]}
          rows={[
            ["Standard Doji", "Upper shadow = lower shadow, body = 0", "Complete balance. Needs confirmation."],
            [<>Dragonfly Doji <Eye size={16} className="inline mr-1" /></>, "Very long lower shadow, no upper shadow", "<span class='text-green-600 dark:text-[#0ECB81] font-bold'>Strong Bullish</span> if appears at bottom/support with confirmation."],
            ["Gravestone Doji 🪦", "Very long upper shadow, no lower shadow", "<span class='text-red-600 dark:text-[#F6465D] font-bold'>Strong Bearish</span> if appears at peak/resistance with confirmation."],
            ["Long-legged Doji", "Both upper and lower shadows are long", "Huge volatility but ends up at the starting point — a breakout is imminent."]
          ]}
        />

        <SimpleQuiz q='Dragonfly Doji appears at the $1,800 gold support zone after a 2-week downtrend. What should you do?' opts={['Enter BUY immediately when candle closes', 'Place Buy Stop at H of Dragonfly + 10pips. Wait for next candle to confirm. SL = below L of Dragonfly − 10pips', 'Continue SELLing', 'Stay out']} correctIdx={1} explanation='Dragonfly Doji + Support = great BUY setup, but STILL NEEDS a pending Buy Stop waiting for price breakout.' />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "8. Morning & Evening Star",
    content: (
      <>
        <SectionHead icon={<Star size={16} />} title="Morning & Evening Star" desc="The most reliable 3-candle pattern for reversals." />

        <PatternCard
          name={<>Morning Star <Sun size={16} className="inline mr-1" /></>} type="BULLISH|3 candles · End of downtrend" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-3 rounded-sm h-[36px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center mt-5"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[10px] bg-gray-500 dark:bg-[#6b7689]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[38px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
            </>
          }
          essence='<strong>Candle 1:</strong> Long red (Bears win).<br/><strong>Candle 2:</strong> Small/Doji (Bears exhausted).<br/><strong>Candle 3:</strong> Long green (Bulls explode, reclaiming >50% of candle 1).'
          steps={[
            '<strong>Entry:</strong> Buy Stop at H of candle 3 + 10pips.',
            '<strong>SL:</strong> Below Low of the entire 3-candle cluster − 10pips.'
          ]}
        />

        <PatternCard
          name={<>Evening Star <Moon size={16} className="inline mr-1" /></>} type="BEARISH|3 candles · End of uptrend" badgeClass="bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-3 rounded-sm h-[36px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center mb-5"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[10px] bg-gray-500 dark:bg-[#6b7689]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[38px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
            </>
          }
          essence='Opposite: Long green → Small/Doji → Long red.'
          steps={[
            '<strong>Entry:</strong> Sell Stop at L of candle 3 − 10pips.',
            '<strong>SL:</strong> Above H of the entire 3-candle cluster + 10pips.'
          ]}
        />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "9. Harami & Three Soldiers",
    content: (
      <>
        <SectionHead icon="🪖" title="Harami & Three Soldiers" desc="Accumulation (weakness) and Exploding Momentum." />

        <PatternCard
          name="Bullish Harami" type="SLIGHT BULLISH|Downtrend weakness" badgeClass="bg-blue-100 dark:bg-[#378ADD]/20 text-blue-700 dark:text-[#378ADD]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-4 rounded-sm h-[44px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[20px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
            </>
          }
          essence='Small candle (baby) lies <strong>inside the body (O-C)</strong> of the mother candle. Harami = "pregnant". Main trend is weakening, preparing to give birth to a new direction.'
          steps={[
            'Weaker than Engulfing. Used as an early take-profit warning, rather than an immediate reversal entry.'
          ]}
        />

        <PatternCard
          name="Three White Soldiers 🪖" type="STRONG BULLISH|Explosive momentum" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[28px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[3px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[36px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[3px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[44px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[3px]"></div></div>
            </>
          }
          essence='3 consecutive green candles, each closing higher than the previous one, each opening within the previous candle body. Long body, small shadows.<br><br>Meaning: <strong>Bulls are completely dominating for 3 consecutive sessions</strong>. No signs of Bear resistance. This is an extremely strong momentum signal — the uptrend is very healthy.'
          steps={[
            'Excellent for <em>confirming</em> a new trend.',
            'Note: Do not "chase" buying immediately after the 3rd candle if RSI is already too high. Wait for a pullback.'
          ]}
        />
      </>
    )
  },
  {
    chapter: "Chapter 3: NNN Methods & Candles", title: "10. Confluence & Quiz",
    content: (
      <>
        <SectionHead icon={<Target size={16} />} title="Confluence" desc="When everything converges to a single point. This is the most important lesson." />

        <StoryBox label="Perfect BUY Setup (A++ Grade)" icon={<TrendingUp size={16} />}>
          <ul className="space-y-3 pl-4 list-disc text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">
            <li><strong>D1 Uptrend:</strong> EMA21 &gt; 50 &gt; 200. HH+HL structure.</li>
            <li><strong>Fibonacci 62%:</strong> Price pulls back to exactly 62%.</li>
            <li><strong>EMA21 Confluence:</strong> 62% Fib level coincides exactly with EMA21 on H4.</li>
            <li><strong>Candle Pattern:</strong> Bullish Engulfing OR Hammer appears at the Fib+EMA21 zone.</li>
            <li><strong>RSI Divergence:</strong> Price makes a new low but RSI makes a higher low.</li>
          </ul>
        </StoryBox>

        <CyberTable
          headers={["Number of confluent signals", "Action", "Size"]}
          rows={[
            ["1 single signal", "Do not enter", "0"],
            ["2 signals in same direction", "Consider — but cautiously", "Small (0.5×)"],
            ["3 confluent signals", "<span class='text-green-600 dark:text-[#0ECB81] font-bold'>Can enter if R:R is met</span>", "Normal (1×)"],
            ["4–5 confluent signals", "<span class='text-green-600 dark:text-[#0ECB81] font-black'>High priority, but still limit risk</span>", "Can be larger (1.5×), do not exceed risk plan"],
            ["Conflicting signals", "<span class='text-red-600 dark:text-[#F6465D] font-bold'>STAY OUT</span>", "0"]
          ]}
        />

        <Callout type="warn" title="There is no guaranteed winning setup">Confluence increases the quality of the setup, it does not eliminate risk. If SL is too far, TP is too close, major news is coming, or D1 contradicts, a beautiful setup can still be skipped.</Callout>

        <SectionHead icon={<FileText size={16} />} title="Chapter 3 Summary Quiz (15 Questions)" />
        <FinalQuizCh3 />
        <ExerciseBox title="Preparation for Chapter 4 — Capital Management" desc="Do this for 1 week before continuing:" steps={[
          { d: 'Open TradingView XAU/USD H4. Find at least 2 setups with <strong>3+ confluent signals</strong> in the last 3 months. Note the ideal entry/SL/TP.' },
          { d: 'Add 5 NNN Fibonacci levels to TradingView: <strong>0.62, 0.79, 0.88, -0.27, -0.62</strong>. Save as template.' },
          { d: 'Choose 3 candle patterns you understand best. In demo, only enter trades with those 3 patterns to avoid signal confusion.' },
          { d: 'Keep a Trading Journal for each practice trade. After 20 trades, see which setup has the best win rate and R:R for you personally.' }
        ]} />
      </>
    )
  }
];

export default CHAPTER_3_DATA_EN;
