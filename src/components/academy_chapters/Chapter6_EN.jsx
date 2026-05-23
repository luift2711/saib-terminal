import { useState, useEffect } from 'react';
import {
  Map, FileText, BarChart2, Clock, CheckSquare, RefreshCw, Shield, Star, Award, Zap
} from 'lucide-react';
import { SectionHead, StoryBox, Callout, CyberTable, ExerciseBox } from '../Sharedcomponents.jsx';

// ==========================================
// CHAPTER 6 — BUILDING YOUR TRADING SYSTEM & GOING LIVE
// ==========================================

const SimpleQuiz = ({ q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-5 flex items-center gap-3 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <span className="text-xs font-black tracking-widest uppercase text-yellow-600 dark:text-[#FCD535] bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30 px-4 py-1.5 rounded-full shadow-sm">
          <Zap size={14} className="inline mr-1" /> CHECK YOUR KNOWLEDGE
        </span>
      </div>
      <div className="p-8">
        <div className="text-lg md:text-xl font-bold text-black dark:text-white mb-6 leading-relaxed transition-colors">
          {q}
          {context && <span className="block text-[17.5px] text-gray-500 dark:text-[#848E9C] font-medium mt-3 italic transition-colors">{context}</span>}
        </div>
        <div className="flex flex-col gap-3">
          {opts.map((opt, i) => {
            const isChosen = selected === i;
            let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] active:border- md:hover:border-[#D4AF37] dark:active:border- md:hover:border-[#FCD535] active:shadow- md:hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:active:shadow- md:hover:shadow-none active:bg- md:hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:active:bg- md:hover:bg-none dark:active:bg- md:hover:bg-[#0B0E11] bg-white dark:bg-[#0B0E11]";
            let letterClass = "bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C]";
            if (selected !== null) {
              if (i === correctIdx) { btnClass = "border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden"; letterClass = "bg-green-500 dark:bg-[#0ECB81] text-white"; }
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
          <div className={`mt-6 p-6 rounded-2xl text-[18.5px] leading-relaxed ${selected === correctIdx ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Correct!' : '❌ Not quite.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

// ---- Interactive: Trading Plan Builder ----
const TradingPlanBuilder = () => {
  const [name, setName] = useState('');
  const [exp, setExp] = useState('');
  const [capital, setCapital] = useState('');
  const [time, setTime] = useState('');
  const [market, setMarket] = useState('');
  const [tf, setTf] = useState('');
  const [mktReason, setMktReason] = useState('');
  const [buy, setBuy] = useState('');
  const [sell, setSell] = useState('');
  const [no, setNo] = useState('');
  const [risk, setRisk] = useState('');
  const [rr, setRr] = useState('');
  const [dlimit, setDlimit] = useState('');
  const [maxpos, setMaxpos] = useState('');
  const [exit, setExit] = useState('');
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    const d = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    setPlan({
      date: d,
      content: `═══════════════════════════════════════
  PERSONAL TRADING PLAN
  ${(name || '[Not filled]').toUpperCase()} · ${d}
═══════════════════════════════════════

§1 TRADER IDENTITY
Name:              ${name || '[Not filled]'}
Experience:        ${exp || '[Not filled]'}
Trading capital:   ${capital || '[Not filled]'}
Hours per day:     ${time || '[Not filled]'}

§2 MARKET & TIMEFRAME
Market:            ${market || '[Not filled]'}
Timeframe:         ${tf || '[Not filled]'}
Reason:            ${mktReason || '[Not filled]'}

§3 ENTRY RULES
BUY when:
${buy || '[Not filled]'}

SELL when:
${sell || '[Not filled]'}

NO trading when:
${no || '[Not filled]'}

§4 RISK MANAGEMENT
Risk per trade:    ${risk || '[Not filled]'}
Min R:R:           ${rr || '[Not filled]'}
Daily Loss Limit:  ${dlimit || '[Not filled]'}
Max open positions: ${maxpos || '[Not filled]'}

§5 EXIT RULES
${exit || '[Not filled]'}

═══════════════════════════════════════
  Signed: ${name || '[Not filled]'}
  Date:   ${d}
═══════════════════════════════════════`
    });
  };

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <FileText size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Trading Plan Builder</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        {/* §1 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§1 · Trader Identity</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Name / Trading Alias</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. The Patient Trader" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Current Experience Level</label><select value={exp} onChange={e => setExp(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Select...</option><option>Brand new (0-3 months)</option><option>Beginner (3-12 months)</option><option>Intermediate (1-3 years)</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Trading Capital</label><input type="text" value={capital} onChange={e => setCapital(e.target.value)} placeholder="e.g. $1,000 (money I can afford to lose)" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Hours Available Per Day</label><select value={time} onChange={e => setTime(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Select...</option><option>{"< 1 hour (Swing trade D1)"}</option><option>1-3 hours (H4 swing)</option><option>3-6 hours (H1 intraday)</option><option>Full-time</option></select></div>
        </div>
        {/* §2 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§2 · Market & Timeframe</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Market to Trade</label><select value={market} onChange={e => setMarket(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Select...</option><option>XAU/USD (Gold) + EUR/USD</option><option>Crypto: BTC/USDT + ETH/USDT</option><option>Forex: EUR/USD + GBP/USD</option><option>Stocks</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Primary Analysis Timeframe</label><select value={tf} onChange={e => setTf(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Select...</option><option>D1 (Daily) → H4 → H1</option><option>H4 → H1 → M15</option><option>H1 → M15 → M5</option></select></div>
        </div>
        <div className="mb-8"><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Why Did You Choose This Market?</label><textarea value={mktReason} onChange={e => setMktReason(e.target.value)} rows="3" placeholder="I chose this market because..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        {/* §3 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§3 · Entry Rules</div>
        <div className="space-y-4 mb-8">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">BUY Setup — Conditions A+B+C</label><textarea value={buy} onChange={e => setBuy(e.target.value)} rows="4" placeholder={"e.g. (A) D1 uptrend + EMA21>EMA50>EMA200\n(B) H4 pullback to Fibonacci 62-79% at EMA21\n(C) Confirmation candle appears (Hammer/Engulfing/Doji)\n→ Buy Stop at H of confirmation candle + 10pip"} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">SELL Setup — Conditions</label><textarea value={sell} onChange={e => setSell(e.target.value)} rows="3" placeholder="Mirror conditions of BUY, reversed..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">I will NOT trade when: (critical!)</label><textarea value={no} onChange={e => setNo(e.target.value)} rows="4" placeholder={"e.g. Within 2 hours of NFP/FOMC news\nWhen D1 is in a sideways range (< 50pip/day)\nAfter 3 consecutive losing trades in one day\nWhen I feel emotionally unstable"} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        </div>
        {/* §4 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§4 · Risk Management</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Risk Per Trade (%)</label><select value={risk} onChange={e => setRisk(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Select...</option><option>0.5% (Conservative - complete beginner)</option><option>1% (Conservative - still learning)</option><option>1.5% (Moderate - 6+ months experience)</option><option>2% (Moderate - 1+ year experience)</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Minimum R:R to Enter a Trade</label><select value={rr} onChange={e => setRr(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Select...</option><option>1:1.5 (minimum acceptable)</option><option>1:2 (standard)</option><option>1:3 (ideal)</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Daily Loss Limit</label><input type="text" value={dlimit} onChange={e => setDlimit(e.target.value)} placeholder="e.g. -3% → stop trading for the day" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Max Simultaneous Open Trades</label><input type="text" value={maxpos} onChange={e => setMaxpos(e.target.value)} placeholder="e.g. Maximum 2 trades at once" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        </div>
        {/* §5 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§5 · Exit Rules</div>
        <div className="mb-8"><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">TP and SL Strategy</label><textarea value={exit} onChange={e => setExit(e.target.value)} rows="5" placeholder={"e.g. SL = below Swing Low -10pip\nTP1 = Fibonacci 127% (close 50% of position)\nTP2 = Fibonacci 162% (close remainder)\nAfter TP1 → Move SL to Break Even\nNever widen SL when it's about to be hit"} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        <button onClick={generatePlan} className="w-full py-4 rounded-xl font-black text-[18.5px] uppercase tracking-wider transition-all bg-yellow-500 dark:bg-[#00d084] active:bg- md:hover:bg-yellow-400 dark:active:bg- md:hover:bg-[#00e691] text-black shadow-[0_4px_14px_0_rgba(234,179,8,0.39)] dark:shadow-[0_4px_14px_0_rgba(0,208,132,0.39)]">
          ✦ Generate My Trading Plan ✦
        </button>
        {plan && (
          <div className="mt-6 bg-gray-50 dark:bg-[#0B0E11] border border-yellow-400 dark:border-[#FCD535]/50 rounded-2xl p-6">
            <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">📋 TRADING PLAN — {plan.date}</div>
            <pre className="text-[15.5px] text-gray-700 dark:text-[#9ca3b0] leading-relaxed whitespace-pre-wrap font-mono">{plan.content}</pre>
            <button onClick={() => navigator.clipboard?.writeText(plan.content)} className="mt-4 px-6 py-2 border border-yellow-400 dark:border-[#FCD535]/50 text-yellow-700 dark:text-[#FCD535] rounded-xl text-[15.5px] font-bold active:bg- md:hover:bg-yellow-50 dark:active:bg- md:hover:bg-[#FCD535]/10 transition-colors">📋 Copy Plan</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ---- Interactive: Backtest Tracker ----
const BacktestTracker = () => {
  const [entries, setEntries] = useState([]);
  const [res, setRes] = useState('win');
  const [risk, setRisk] = useState(1);
  const [reward, setReward] = useState(2);
  const [setup, setSetup] = useState('NNN①');

  const addEntry = () => {
    const isWin = res === 'win';
    const isBE = res === 'be';
    const pnl = isWin ? reward : isBE ? 0 : -risk;
    setEntries(prev => [...prev, { res, risk, reward, setup, pnl, isWin, isBE }]);
  };

  const clear = () => { if (window.confirm('Delete all data?')) setEntries([]); };

  const n = entries.length;
  const wins = entries.filter(e => e.isWin).length;
  const wr = n > 0 ? (wins / n * 100).toFixed(1) : null;
  const totalWin = entries.filter(e => e.isWin).reduce((a, e) => a + e.reward, 0);
  const losses = entries.filter(e => !e.isWin && !e.isBE);
  const totalLoss = losses.reduce((a, e) => a + e.risk, 0);
  const avgWin = wins > 0 ? totalWin / wins : 0;
  const avgLoss = losses.length > 0 ? totalLoss / losses.length : 1;
  const exp = n > 0 ? (wins / n) * avgWin - ((n - wins) / n) * avgLoss : null;
  const pf = totalLoss > 0 ? (totalWin / totalLoss).toFixed(2) : null;

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139]">
        <BarChart2 size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Backtest Tracker</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Result</label><select value={res} onChange={e => setRes(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none"><option value="win">Win ✅</option><option value="loss">Loss ❌</option><option value="be">Break Even</option></select></div>
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Risk (R)</label><input type="number" value={risk} step={0.5} onChange={e => setRisk(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none font-mono" /></div>
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Reward (R)</label><input type="number" value={reward} step={0.5} onChange={e => setReward(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none font-mono" /></div>
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Setup</label><select value={setup} onChange={e => setSetup(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none"><option value="NNN①">NNN① Short Body</option><option value="NNN②">NNN② Engulfing</option><option value="NNN③">NNN③ EMA21</option><option value="NNN④">NNN④ Fibonacci</option><option value="Engulfing">Engulfing</option><option value="Hammer & Shooting Star">Hammer & Shooting Star</option><option value="Doji & Biến thể">Doji & Biến thể</option><option value="Morning & Evening Star">Morning & Evening Star</option><option value="Harami & Three Soldiers">Harami & Three Soldiers</option></select></div>
          <div className="flex items-end"><button onClick={addEntry} className="w-full py-2 rounded-xl font-black text-sm bg-yellow-500 dark:bg-[#00d084] active:bg- md:hover:bg-yellow-400 dark:active:bg- md:hover:bg-[#00e691] text-black transition-all">+ Add</button></div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { lbl: 'Total Trades', val: n, color: 'text-black dark:text-white' },
            { lbl: 'Win Rate', val: wr ? wr + '%' : '—', color: wr && parseFloat(wr) > 35 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]' },
            { lbl: 'Expectancy', val: exp !== null ? (exp >= 0 ? '+' : '') + exp.toFixed(3) + 'R' : '—', color: exp !== null && exp >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]' },
            { lbl: 'Profit Factor', val: pf || '—', color: pf && parseFloat(pf) >= 1.2 ? 'text-blue-600 dark:text-[#378ADD]' : 'text-red-600 dark:text-[#F6465D]' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
              <div className="text-[11.5px] uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">{s.lbl}</div>
              <div className={`text-2xl font-black font-mono ${s.color}`}>{s.val}</div>
            </div>
          ))}
        </div>
        <div className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-2">Trade Log</div>
        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 max-h-48 overflow-y-auto font-mono text-[14.5px] border border-gray-700 dark:border-[#2B3139]">
          {entries.length === 0 ? <div className="text-gray-500 text-center py-4">No data yet — add your first trade to get started</div> : [...entries].reverse().map((e, i) => (
            <div key={i} className={`border-b border-gray-800 dark:border-[#2B3139] py-2 last:border-0 ${e.isWin ? 'text-green-400 dark:text-[#0ECB81]' : e.isBE ? 'text-gray-400' : 'text-red-400 dark:text-[#F6465D]'}`}>
              #{entries.length - i} {e.setup} · {e.isWin ? 'WIN +' + e.reward + 'R' : e.isBE ? 'BE ±0' : '-' + e.risk + 'R'}
            </div>
          ))}
        </div>
        <button onClick={clear} className="mt-4 px-5 py-2 border border-gray-300 dark:border-[#2B3139] text-gray-600 dark:text-[#848E9C] rounded-xl text-[15.5px] font-bold active:bg- md:hover:bg-gray-100 dark:active:bg- md:hover:bg-[#181A20] transition-colors">🗑 Clear all</button>
      </div>
    </div>
  );
};

// ---- Interactive: Go-Live Checklist ----
const GoLiveChecklist = () => {
  const categories = [
    {
      label: '// Knowledge & Skills',
      items: [
        'Completed all 6 chapters of the curriculum (or equivalent knowledge)',
        'Can explain your Trading Plan in 3 minutes without looking at notes',
        'Know how to calculate Position Size without a calculator (or have a calculator ready)',
        'Know the name and symptoms of at least 5 of the 7 trading demons',
      ],
    },
    {
      label: '// Backtest & Demo Data',
      items: [
        'Backtested at least 30 trades with positive Expectancy',
        'Demo traded at least 30 real trades (not just "paper trading" in your head)',
        'Demo win rate ≥ 35% with R:R ≥ 1:2 (or positive Expectancy after 30 trades)',
        'Kept a complete Journal for every demo trade (no gaps)',
        'Followed the Trading Plan ≥ 80% of trades (≤ 6 violations in 30 trades)',
      ],
    },
    {
      label: '// Financial & Psychological',
      items: [
        'Capital to be used is money you can "completely afford to lose" — not living expenses, not borrowed money',
        'Identified your Risk Profile (Conservative/Moderate) and appropriate risk % per trade',
        'Set a Daily Loss Limit and ready to stop immediately when hit',
        'Can watch the account drop 10% without panicking or making impulsive decisions',
      ],
    },
    {
      label: '// Tools & Environment',
      items: [
        'Chose a reputable regulated broker with low spread for your chosen market',
        'Tested the platform — know how to place SL/TP, modify orders, close positions quickly',
        'Have a Trading Journal (app or spreadsheet) already set up',
        'Know the major news events each week (Forex Factory or equivalent)',
      ],
    },
    {
      label: '// Personal Rules',
      items: [
        'Written and signed the "Trader\'s Oath" (or equivalent commitment)',
        'Have a family member or friend who knows about your trading (accountability partner)',
        'Ready to start with the smallest possible live account (not full capital right away)',
      ],
    },
  ];
  const allItems = categories.flatMap(c => c.items);
  const total = allItems.length;
  const [checked, setChecked] = useState(new Set());
  const toggle = (idx) => {
    setChecked(prev => { const next = new Set(prev); next.has(idx) ? next.delete(idx) : next.add(idx); return next; });
  };
  const count = checked.size;
  const pct = Math.round(count / total * 100);
  const msg = count === total
    ? '🎉 Outstanding! You\'ve checked all 20 conditions. You are ready to step into the real market. Start with the smallest possible capital and keep journaling every trade.'
    : count >= 15 ? `☀ Almost there! ${total - count} more conditions to go. Complete them before going live — don't skip the remaining ones.`
    : count >= 10 ? `📊 At ${count}/${total}. Keep going. Not ready to go live yet — aim for at least 17/20 to be safe.`
    : `📋 In progress: ${count}/${total} conditions checked. Keep going.`;

  let itemIndex = 0;
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl">
      <div className="bg-white dark:bg-[#181A20] p-5 flex items-center justify-between border-b border-gray-200 dark:border-[#2B3139]">
        <span className="font-black text-sm uppercase tracking-widest text-black dark:text-white">Go-Live Checklist</span>
        <span className="text-sm font-mono text-yellow-600 dark:text-[#FCD535]">{count} / {total} conditions</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-[#2B3139]"><div className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all" style={{ width: pct + '%' }} /></div>
      {categories.map((cat, ci) => (
        <div key={ci}>
          <div className="px-5 py-2 bg-gray-100 dark:bg-[#181A20] text-[12.5px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#848E9C]">{cat.label}</div>
          {cat.items.map((item) => {
            const idx = itemIndex++;
            return (
              <div key={idx} onClick={() => toggle(idx)} className={`flex items-start gap-4 px-5 py-3 border-b border-gray-100 dark:border-[#2B3139]/50 cursor-pointer transition-colors last:border-0 ${checked.has(idx) ? 'bg-green-50 dark:bg-[#0ECB81]/5' : 'active:bg- md:hover:bg-gray-50 dark:active:bg- md:hover:bg-[#181A20]/50'}`}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked.has(idx) ? 'bg-green-500 dark:bg-[#0ECB81] border-green-500 dark:border-[#0ECB81]' : 'border-gray-300 dark:border-[#2B3139]'}`}>
                  {checked.has(idx) && <span className="text-white text-[12.5px] font-black">✓</span>}
                </div>
                <span className={`text-[16.5px] leading-relaxed ${checked.has(idx) ? 'text-gray-400 dark:text-[#4B5563] line-through' : 'text-gray-700 dark:text-[#EAECEF]'}`}>{item}</span>
              </div>
            );
          })}
        </div>
      ))}
      <div className={`m-4 p-4 rounded-2xl text-[16.5px] leading-relaxed border ${count === total ? 'bg-green-50 dark:bg-[#0ECB81]/10 border-green-200 dark:border-[#0ECB81]/30 text-green-800 dark:text-[#0ECB81]' : count >= 15 ? 'bg-yellow-50 dark:bg-[#FCD535]/10 border-yellow-200 dark:border-[#FCD535]/30 text-yellow-800 dark:text-[#FCD535]' : 'bg-gray-50 dark:bg-[#181A20] border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#9ca3b0]'}`}>
        {msg}
      </div>
    </div>
  );
};

// ---- Interactive: Trader's Oath ----
const TradersOath = () => {
  const [name, setName] = useState('');
  const [sworn, setSworn] = useState(false);
  
  useEffect(() => {
    const stored = localStorage.getItem('SAIB_trader_name');
    if (stored) setName(stored);
  }, []);

  const takeOath = () => { 
    if (!name.trim()) { alert('Please enter your name first!'); return; } 
    localStorage.setItem('SAIB_trader_name', name.trim());
    setSworn(true); 
  };
  return (
    <div className="bg-gradient-to-br from-[#1a1500] to-[#0f0f00] border border-[#d4ac0d]/30 rounded-3xl p-8 my-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(245,166,35,0.06)] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="font-serif text-2xl font-bold text-yellow-300 dark:text-[#ffd070] mb-3">The Trader's Oath</div>
        <div className="w-16 h-px bg-yellow-500/30 mx-auto mb-6" />
        <div className="font-serif text-[17.5px] text-gray-200 leading-[1.9] max-w-xl mx-auto mb-6 italic">
          "I, <span className="text-yellow-300 dark:text-[#ffd070] not-italic font-semibold">{name || '__________'}</span>, enter the financial markets today with open eyes and a clear mind.<br /><br />
          I understand that the market owes me nothing. I trade with my own risk and my own responsibility.<br /><br />
          I commit to following the system I have built — even when emotions urge me to break it. I will not revenge trade. I will not FOMO. I will always place a Stop Loss.<br /><br />
          I know that the 7 demons will return. I will recognize them and call them by name.<br /><br />
          I trade to learn. Profit is the result of discipline — not the immediate goal."
        </div>
        {!sworn ? (
          <>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="bg-[#0a0c18] border border-yellow-500/30 rounded-xl px-5 py-3 text-[18.5px] text-white font-bold text-center w-72 outline-none focus:border-yellow-400 mb-4 block mx-auto" />
            <button onClick={takeOath} className="px-8 py-3 bg-gradient-to-br from-orange-500 to-yellow-500 text-black font-black text-[17.5px] rounded-xl hover:-translate-y-1 active:shadow- md:hover:shadow-[0_8px_24px_rgba(245,166,35,0.3)] transition-all">✦ I Take the Oath ✦</button>
          </>
        ) : (
          <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-6 text-green-300 font-serif italic text-[17.5px] leading-relaxed max-w-lg mx-auto">
            ✦ <strong className="not-italic">{name}</strong> — Your oath has been recorded.<br />
            Print this page and place it where you can see it every time you trade.<br />
            Your real journey starts today. ✦
          </div>
        )}
      </div>
    </div>
  );
};

const GraduationCertificate = () => {
  const [name, setName] = useState('');
  
  useEffect(() => {
    const stored = localStorage.getItem('SAIB_trader_name');
    if (stored) setName(stored);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0a0c18] to-[#0d1128] border-2 border-yellow-400/30 rounded-3xl p-10 my-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(245,166,35,0.08)] to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 right-3 bottom-3 border border-yellow-400/20 rounded-2xl pointer-events-none" />
      <div className="relative z-10">
        <div className="text-2xl text-yellow-500 tracking-[8px] mb-4">✦ ✦ ✦</div>
        <div className="font-mono text-[15.5px] text-gray-400 uppercase tracking-widest mb-3">Trading Zero → Hero Curriculum</div>
        <div className="font-serif text-3xl font-bold text-yellow-300 mb-2 italic">Certificate of Completion</div>
        <div className="text-[16.5px] text-gray-400 font-serif italic mb-2">This certifies that</div>
        <div className="font-serif text-2xl font-bold text-white border-b border-yellow-400/30 pb-3 mb-3">{name || '[Your Name]'}</div>
        <div className="font-serif text-[16.5px] text-gray-300 leading-[1.9] max-w-md mx-auto mb-6 italic">
          has successfully completed all 6 chapters of the Trading Zero to Hero Curriculum,<br />
          covering: Market Foundations, Technical Analysis, the NNN Method,<br />
          Risk & Capital Management, Trading Psychology,<br />
          and has built a personal trading system ready for live markets.
        </div>
        <div className="text-5xl mb-3">☀</div>
        <div className="font-serif text-[15.5px] text-gray-400 italic">"Discipline is the bridge between goals and achievement."</div>
      </div>
    </div>
  );
};


// ==========================================
// CHAPTER 6 DATA (EN)
// ==========================================
const CHAPTER_6_DATA_EN = [
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "0. Your Journey So Far",
    content: (
      <>
        <SectionHead icon={<Map size={16} />} title="Dawn Breaks — Your Journey So Far" desc="You've made it through 5 challenging chapters. Now it's time to stand on the summit and look back at the full panorama." />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-yellow-400 dark:border-[#FCD535]/50 rounded-2xl p-6 my-6">
          <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">Journey Completed</div>
          <div className="flex gap-2 mb-4">
            {['Ch.1: Market Foundations', 'Ch.2: Technical Analysis', 'Ch.3: NNN Methods', 'Ch.4: Risk Management', 'Ch.5: Trading Psychology', 'Ch.6: Going Live (current)'].map((ch, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full ${i < 5 ? 'bg-yellow-500 dark:bg-[#FCD535]' : 'bg-yellow-200 dark:bg-[#FCD535]/40'}`} title={ch} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { label: 'Ch.1-2', title: 'Market Language', sub: 'Candles, S/R, Trends, Indicators' },
              { label: 'Ch.3', title: 'Entry Strategy', sub: '4 NNN methods + 9 candle patterns' },
              { label: 'Ch.4-5', title: 'Discipline & Psychology', sub: 'Risk management + 7 demons + Journal' },
            ].map((card, i) => (
              <div key={i} className="bg-gray-100 dark:bg-[#181A20] rounded-xl p-4">
                <div className="text-[11.5px] font-mono text-gray-400 dark:text-[#848E9C] uppercase mb-1">{card.label}</div>
                <div className="text-[16.5px] font-bold text-black dark:text-white">{card.title}</div>
                <div className="text-[14.5px] text-gray-500 dark:text-[#848E9C] mt-1">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <SectionHead icon="🏔️" title="The One Thing That Really Matters" />
        <StoryBox label="📜 Core Principle" icon="☀">
          <em>"After 6 chapters, everything you've learned will be meaningless without <strong>a clearly written system that is followed with discipline</strong>."</em><br /><br />
          — The fundamental principle of professional trading
        </StoryBox>

        <p className="text-[18.5px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          This chapter teaches no new theory. It teaches you how to <em className="text-yellow-600 dark:text-[#FCD535] not-italic font-semibold">turn everything you've learned into real action</em>. You will build your own Trading Plan, learn backtesting, map out a 90-day demo roadmap, and know exactly when you're ready to step into the real market.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { lbl: 'Traders fail because', val: 'No written system', sub: 'clearly defined', color: 'text-red-600 dark:text-[#F6465D]' },
            { lbl: 'Demo time needed', val: '90 days', sub: 'minimum before going live', color: 'text-yellow-600 dark:text-[#FCD535]' },
            { lbl: 'Go-live criteria', val: '20 conditions', sub: 'must fully satisfy all', color: 'text-green-600 dark:text-[#0ECB81]' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-5">
              <div className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-2">{s.lbl}</div>
              <div className={`text-xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-[13.5px] text-gray-500 dark:text-[#848E9C] mt-1 font-mono">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Summary — Lesson 0</div>
          <ul className="space-y-2">
            {['Chapter 6 is the pivot from theory to real-world action.', 'Three core tools: Trading Plan (personal law) + Backtesting (system validation) + 90-day Demo (risk-free practice).', 'Go-live criteria: 20 conditions — must satisfy all. Non-negotiable.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "1. Trading Plan — The Trader's Constitution",
    content: (
      <>
        <SectionHead icon={<FileText size={16} />} title="Trading Plan — The Trader's Constitution" desc="A Trading Plan is not a wish list. It is the rulebook you write for yourself — and must follow like law." />

        <SectionHead icon="📋" title="Why Must It Be WRITTEN Down?" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Research by Dominican University (2015): people who <em className="text-yellow-600 dark:text-[#FCD535] not-italic font-semibold">write down specific goals</em> achieve them 42% more often than those who just think about them. In trading, writing down a plan has an even more important effect: it lets Kahneman's System 2 (rational brain) <strong>activate before System 1 (emotional brain) takes over</strong>.
        </p>

        <TradingPlanBuilder />

        <SimpleQuiz
          q="Why must a Trading Plan be WRITTEN down, not just 'known in your head'?"
          opts={['Because brokers require it', 'Because a written plan activates System 2 before System 1 takes over during trading — helping you remember and follow rules even when emotions run high', 'To have evidence if you lose', 'Not necessary — skilled traders remember everything in their head']}
          correctIdx={1}
          explanation="Correct! A written plan = System 2 is pre-activated. Under stress, you simply read the plan instead of reasoning from scratch."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Summary — Lesson 1</div>
          <ul className="space-y-2">
            {['Trading Plan = personal law. Must be written, not just thought.', 'Contains 5 sections: Identity + Market/TF + Entry rules + Risk management + Exit rules.', 'The most important (and most overlooked) section: "When will I NOT trade?"'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "2. Backtesting — Validating Your System Before Risking Capital",
    content: (
      <>
        <SectionHead icon={<BarChart2 size={16} />} title="Backtesting — Validating Your System Before Risking Capital" desc="Backtesting is the only way to know whether your system truly works — without spending real money. Like test-driving a car before you buy it." />

        <SectionHead icon="🔬" title="Manual Backtesting on TradingView" desc="The most reliable approach for beginners" />

        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Open TradingView and select your market.</strong> Switch to your main timeframe (H4 or D1). Add EMA21, EMA50, and the Fibonacci tool.</> },
            { n: '2', text: <><strong>Scroll the chart back 6–12 months.</strong> In TradingView: click the chart, hold Alt and drag left to scroll back. Goal: find at least 30–50 setups.</> },
            { n: '3', text: <><strong>Advance candle by candle (no looking ahead).</strong> Use the right arrow key → to step forward one candle at a time. When you spot a setup, stop and decide: do you enter? Where is the entry, SL, and TP?</> },
            { n: '4', text: <><strong>Record each trade in the Backtest Tracker</strong> (below). For each setup: date, setup type, entry/SL/TP, result. Don't cheat — record honestly even when you're wrong.</> },
            { n: '5', text: <><strong>After 30+ trades, calculate your statistics.</strong> Win rate, average R:R, Expectancy, Max Drawdown. If Expectancy is negative → the system needs fixing.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <BacktestTracker />

        <SectionHead icon="📈" title="System Evaluation Criteria" />
        <CyberTable
          headers={['Metric', 'Formula', 'Good', 'Acceptable', 'Needs Work']}
          rows={[
            ['Win Rate', 'Wins / Total trades', '>50%', '35–50% (if high R:R)', '—'],
            ['Avg R:R', 'Avg Reward / Avg Risk', '>2', '1.5–2', '<1.5'],
            ['Expectancy/trade', '(WR×AvgWin) − (LR×AvgLoss)', 'Positive', 'Small positive', 'Negative → stop immediately'],
            ['Profit Factor', 'Total wins / Total losses', '>1.5', '1.2–1.5', '<1.2'],
            ['Max DD (actual)', 'Peak → trough of account', '<15%', '15–25%', '>25% → review system'],
            ['Sample size', 'Total backtest trades', '>50', '30–50', '<30 → insufficient data'],
          ]}
        />

        <Callout type="bad" title="🚫 Most common backtesting mistake:">
          "Look-ahead bias" — accidentally seeing the future while testing. How to avoid it: you must decide on entry/SL/TP before advancing to the next candle. If you "see" where price is going before deciding → invalid, redo it.
        </Callout>

        <SimpleQuiz
          q="After 40 backtest trades: Win rate 42%, average R:R 1:2.5. Expectancy = (0.42×2.5) − (0.58×1) = 1.05 − 0.58 = +0.47R/trade. What should you conclude?"
          opts={['Poor system — win rate is below 50%', 'System has a positive edge (+0.47R/trade) — but needs 10+ more trades to reach 50 before drawing a firm conclusion', 'Ready to go live immediately', 'Cannot conclude anything from backtesting']}
          correctIdx={1}
          explanation="Positive expectancy is a good sign, but you need more trades for a sufficient sample. 40 isn't enough to be certain. 50 trades is the minimum to conclude reliably."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Summary — Lesson 2</div>
          <ul className="space-y-2">
            {['Backtesting = testing your system on historical data before using real money. Need 30–50+ trades.', 'Most important criterion: positive Expectancy. Profit Factor >1.2.', 'Avoid look-ahead bias: decide first, then see the result.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "3. The 90-Day Demo Roadmap",
    content: (
      <>
        <SectionHead icon={<Clock size={16} />} title="The 90-Day Demo Roadmap — From Zero to Ready" desc="Three months isn't a long time — but it's enough to turn theory into reflex, and reflex into discipline." />

        <div className="space-y-0 my-6">
          {[
            { badge: 'W1-2', color: 'bg-gray-100 dark:bg-[#181A20] text-gray-600 dark:text-[#848E9C]', title: 'Weeks 1–2: Setup & Observation', titleColor: 'text-gray-700 dark:text-[#9ca3b0]', desc: 'Set up TradingView, MT4/MT5 Demo. Add indicators (EMA21/50/200, NNN Fibonacci). Watch charts daily but don\'t place trades. Only draw S/R and identify trends.', tasks: ['☐ Install TradingView + NNN Template', '☐ Open demo account with a broker', '☐ Watch charts for 30 minutes each day'] },
            { badge: 'W3-4', color: 'bg-gray-100 dark:bg-[#181A20] text-gray-600 dark:text-[#848E9C]', title: 'Weeks 3–4: Manual Backtesting', titleColor: 'text-gray-700 dark:text-[#9ca3b0]', desc: 'Scroll back 6 months of chart history. Find and record all NNN setups. Calculate preliminary win rate. Goal: 20–30 setups with data.', tasks: ['☐ Backtest 30 setups on XAU/USD H4', '☐ Calculate preliminary expectancy'] },
            { badge: 'W5-8', color: 'bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535]', title: 'Weeks 5–8: Demo Trading — Phase 1', titleColor: 'text-yellow-700 dark:text-[#FCD535]', desc: 'Begin actual demo trading. Risk 1% per trade. Keep a full Journal after each trade. Goal: 15–20 trades with complete data — not profit.', tasks: ['☐ 15+ demo trades with full Journal', '☐ Review Journal every week', '☐ Fewer than 2 Trading Plan violations'] },
            { badge: 'W9-10', color: 'bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535]', title: 'Weeks 9–10: Review & Adjustment', titleColor: 'text-yellow-700 dark:text-[#FCD535]', desc: 'Review your 20+ completed trades. Adjust the Trading Plan if needed. Identify which demon appears most often for you. Create "if-then" rules.', tasks: ['☐ Full review of Weeks 5–8 Journal', '☐ Update Trading Plan v2'] },
            { badge: 'W11-12', color: 'bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]', title: 'Weeks 11–12: Demo Trading — Phase 2', titleColor: 'text-green-700 dark:text-[#0ECB81]', desc: 'Continue with adjustments from the review. Goal: 15+ more trades. Total: 35–40 trades. If results are consistently positive → ready to evaluate going live.', tasks: ['☐ 35–40 total trades', '☐ Positive expectancy over 90 days', '☐ Read the 20-condition go-live checklist'] },
          ].map((week, i) => (
            <div key={i} className="flex gap-0 mb-0">
              <div className="flex flex-col items-center w-14 flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13.5px] font-black z-10 ${week.color}`}>{week.badge}</div>
                {i < 4 && <div className="w-0.5 bg-gray-200 dark:bg-[#2B3139] flex-1 min-h-[20px]" />}
              </div>
              <div className="pb-6 pl-4 pt-1 flex-1">
                <h4 className={`text-[17.5px] font-bold mb-2 ${week.titleColor}`}>{week.title}</h4>
                <p className="text-[16.5px] text-gray-600 dark:text-[#9ca3b0] leading-relaxed mb-3">{week.desc}</p>
                <div className="flex flex-wrap gap-2">{week.tasks.map((t, ti) => <span key={ti} className="text-[14.5px] font-mono text-gray-500 dark:text-[#848E9C] bg-gray-100 dark:bg-[#181A20] px-3 py-1 rounded-md">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="ok">
          ✅ <strong>Remember:</strong> The goal of 90 days of demo trading is not to make money. The goal is: (1) follow the Trading Plan {'>'} 85% of trades, (2) journal every trade, (3) understand which demon appears most often for you. Profit will come naturally once these three are achieved.
        </Callout>

        <SimpleQuiz
          q="After 6 weeks of demo trading, the account is up 18% but you violated the Trading Plan 8 times in 20 trades. Is this a good result?"
          opts={['Good — what matters is profit, not plan compliance', 'No — violating the plan 40% of the time is more dangerous than the 18% gain. The system hasn\'t been truly validated, and the brain is learning the habit of breaking rules (which will cause real damage in live trading)', 'Decent — could move to live with a small account', 'Need to watch for 5 more weeks before concluding']}
          correctIdx={1}
          explanation="Violating the plan 40% of the time is a red flag. Demo profit could be luck; plan violations are definitely a problem. Process first, profit second."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Summary — Lesson 3</div>
          <ul className="space-y-2">
            {['90-day demo = W1-2 (setup) → W3-4 (backtest) → W5-8 (demo) → W9-10 (review) → W11-12 (demo v2).', 'Goal: follow plan >85%, journal every trade, understand your emotional patterns.', 'Demo profit is less important than process discipline.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "4. The 20-Condition Checklist Before Going Live",
    content: (
      <>
        <SectionHead icon={<CheckSquare size={16} />} title="The 20-Condition Checklist — Before Placing Your First Real Dollar" desc="This is the strictest checkpoint in the entire journey. You must check ALL 20 conditions before moving to a real account. Non-negotiable." />
        <GoLiveChecklist />
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "5. The Continuous Improvement Loop",
    content: (
      <>
        <SectionHead icon={<RefreshCw size={16} />} title="The Continuous Improvement Loop" desc="Trading never has a final endpoint for learning. The best traders aren't those who know the most — they're those who learn fastest from their own real data." />

        <SectionHead icon="🔄" title="Monthly Review Cycle" />
        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { icon: '📊', step: '1. Collect data', sub: 'Compile monthly Journal' },
              { icon: '🔍', step: '2. Analyze patterns', sub: 'Find strengths & weaknesses' },
              { icon: '🛠', step: '3. Adjust plan', sub: 'Update Trading Plan' },
              { icon: '▶', step: '4. Execute next month', sub: 'Apply changes' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="text-center px-4 py-3">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-[14.5px] font-bold text-black dark:text-white">{s.step}</div>
                  <div className="text-[13.5px] text-gray-500 dark:text-[#848E9C] mt-1">{s.sub}</div>
                </div>
                {i < 3 && <div className="text-xl text-gray-400 dark:text-[#4B5563]">→</div>}
              </div>
            ))}
            <div className="text-xl text-gray-400 dark:text-[#4B5563]">↩</div>
          </div>
        </div>

        <SectionHead icon="❓" title="12 Monthly Review Questions — Answer All of Them" />
        <CyberTable
          headers={['#', 'Review question', 'Data to check']}
          rows={[
            ['1', 'What was my win rate this month?', 'Journal: wins / total trades'],
            ['2', 'What was my actual average R:R?', 'Journal: avg reward / avg risk'],
            ['3', 'Was my expectancy positive or negative this month?', 'Calculate from questions 1 and 2'],
            ['4', 'What % of trades did I follow my plan?', 'Journal: "followed system?" column'],
            ['5', 'Which demon appeared most often this month?', 'Journal: "demon" column'],
            ['6', 'When in the day/week do I tend to lose most?', 'Journal: time/date of losing trades'],
            ['7', 'Which setup has the highest win rate for me?', 'Journal: filter by setup type'],
            ['8', 'Did I violate my Daily Loss Limit?', 'Journal + account history'],
            ['9', 'What was my Max Drawdown this month?', 'Account equity curve'],
            ['10', 'What did I do best this month?', 'Journal: high-score trades'],
            ['11', 'What is the single most important thing to improve next month?', 'Journal: repeating error patterns'],
            ['12', 'Does the Trading Plan need any updates?', 'From answers 1–11'],
          ]}
        />

        <SectionHead icon="📚" title="What to Learn Next — Development Roadmap" />
        <CyberTable
          headers={['Stage', 'Knowledge to pursue', 'Why']}
          rows={[
            ['6–12 months', 'Smart Money Concept (SMC) basics, Order Blocks, Fair Value Gaps', 'Understand Smart Money behavior — why they sweep SL before moving'],
            ['1–2 years', 'ICT (Inner Circle Trader), Advanced Market Structure', 'The most in-depth price action analysis framework available'],
            ['2–3 years', 'Wyckoff Method, Elliott Wave, Order Flow', 'Read the "footprint" of large institutions in the market'],
            ['3+ years', 'Quantitative analysis, Basic algo trading', 'Build systems that can auto-backtest and scale'],
          ]}
        />

        <Callout type="warn">
          ⚠️ <strong>Learning rule:</strong> Master one thing before moving to the next. Many traders fail because they constantly "jump" from system to system without giving each enough time to validate. At least 3–6 months with each system before making a decision.
        </Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Summary — Lesson 5</div>
          <ul className="space-y-2">
            {['Monthly review: collect data → analyze → adjust → execute. The loop never ends.', '12 monthly review questions — answer all 12 each month = best possible improvement.', 'Roadmap: NNN → SMC → ICT → Wyckoff. At least 6 months at each stage.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "6. The Trader's Oath",
    content: (
      <>
        <SectionHead icon={<Shield size={16} />} title="The Trader's Oath" desc="This is not a lesson — it's a ritual. Enter your name and make a commitment to yourself." />

        <TradersOath />

        <Callout type="ok">
          ✅ <strong>Why does the oath matter?</strong> According to research by Dominic Voge (Princeton): when you publicly commit to yourself (and ideally to others), the probability of keeping that commitment increases significantly. Writing your name and reading the oath activates the brain region associated with identity — you're no longer just "someone learning to trade" but "a Trader who has committed to their system."
        </Callout>
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "7. Comprehensive Final Quiz — All 6 Chapters",
    content: (
      <>
        <SectionHead icon={<Star size={16} />} title="The Final Exam" desc="20 questions covering all knowledge from Chapter 1 through Chapter 6. This is your graduation test. Score 15/20 to earn your certificate." />

        {[
          { q: '[Ch.1] Who is the largest group of market participants by volume?', opts: ['Retail traders', 'Central banks and financial institutions (Smart Money) — accounting for ~90% of volume', 'Hedge funds', 'Individual investors'], c: 1, expl: 'Smart Money (central banks, large financial institutions) accounts for the vast majority of market volume. Retail traders are a small minority.' },
          { q: '[Ch.1] What does "Buy the rumor, sell the news" mean?', opts: ['Buy on good news, sell on bad news', 'Markets price in expectations in advance — when official news breaks, it\'s often too late to buy', 'Only trade during news events', 'This is a stock market strategy'], c: 1, expl: 'Markets discount information ahead of time. When news breaks officially, the expectation has already been priced in — that\'s when Smart Money sells.' },
          { q: '[Ch.2] What is Role Reversal in S/R?', opts: ['Switching roles between buyers and sellers', 'Resistance broken → becomes support; support broken → becomes resistance', 'Reversing a trend direction', 'When EMA21 crosses EMA50'], c: 1, expl: 'Role Reversal: a broken resistance level becomes support and vice versa. One of the most important S/R concepts.' },
          { q: '[Ch.2] When does RSI Bullish Divergence occur?', opts: ['RSI > 70 while price rises', 'Price makes a lower low but RSI makes a higher low — a bullish reversal signal', 'RSI rises to 50', 'EMA21 crosses above EMA50'], c: 1, expl: 'Bullish Divergence: price goes lower but RSI doesn\'t follow → momentum is weakening → potential bullish reversal signal.' },
          { q: '[Ch.3] In the NNN② method, what is the exact condition for an engulfing candle?', opts: ['The second candle\'s body is smaller than the first', 'H_mother ≥ H_child AND L_mother ≤ L_child — comparing full High-Low range', 'The second candle is a different color than the first', 'The second candle\'s close is inside the first candle\'s body'], c: 1, expl: 'NNN②: the mother candle must completely contain the child candle by range (High and Low). It\'s about the full High-Low, not just the body.' },
          { q: '[Ch.3] Which Fibonacci levels does NNN use for take-profit (TP)?', opts: ['38% and 62%', '127% (TP1 — close 50%) and 162% (TP2 — close all)', '50% and 100%', '79% and 88%'], c: 1, expl: 'NNN④ Fibonacci: TP1 at 127% (close 50% of position), TP2 at 162% (close all). Entry zone: 62–79%.' },
          { q: '[Ch.4] Account: $8,000, risk 1.5%, SL = 60 pips, pip value $1. What is the position size?', opts: ['2 mini lots ($8k×1.5%=$120; $120/60=$2)', '1.5 mini lots', '3 mini lots', '0.5 mini lots'], c: 0, expl: 'Risk$ = $8,000 × 1.5% = $120. Size = $120 / (60 × $1) = 2 mini lots.' },
          { q: '[Ch.4] After losing 50% of an account, what % profit is needed to break even?', opts: ['50%', '75%', '100% — because $10k→$5k needs to double back to $10k', '150%'], c: 2, expl: 'Asymmetric math: losing 50% ($10k→$5k) requires a 100% gain to return to $10k. This is why risk management is paramount.' },
          { q: '[Ch.4] What is Anti-Martingale?', opts: ['Double your size after every losing trade', 'Increase size during winning streaks, decrease during losing streaks — the complete opposite of Martingale', 'Keep size fixed forever', 'Gradually reduce size over time'], c: 1, expl: 'Anti-Martingale: increase risk while winning (riding momentum), decrease risk while losing (preserving capital). The opposite of dangerous Martingale.' },
          { q: '[Ch.5] What did Kahneman call "Cognitive Hijacking"?', opts: ['When your account gets hacked', 'When System 1 (emotional brain) takes full control before System 2 (rational brain) can intervene', 'When risk management is poor', 'When an indicator gives a false signal'], c: 1, expl: 'Cognitive Hijacking: System 1 (instinct/emotion) "seizes control" completely — for example, when price drops suddenly, you close a position before you can think rationally.' },
          { q: '[Ch.5] Which demon is linked to Sapiens\' "Narrative Fallacy"?', opts: ['FOMO', 'Revenge Trading', 'Overconfidence — the brain creates a story "I\'m better than the market" after a short winning streak', 'Loss Aversion'], c: 2, expl: 'Overconfidence uses Narrative Fallacy: after 5 winning trades, the brain writes a story "I\'ve figured out the market" instead of "I was lucky in a short streak".' },
          { q: '[Ch.5] Why does a Trading Journal help control the 7 demons?', opts: ['Because it helps you remember the demons\' names', 'Habit Tracking: measurement creates awareness, awareness triggers automatic behavior change', 'Because handwriting is good for memory', 'Because journals are required by brokers'], c: 1, expl: 'Per Atomic Habits: "You don\'t rise to the level of your goals, you fall to the level of your systems." Journal = a behavior measurement system that creates awareness and leads to automatic change.' },
          { q: '[Ch.6] What is the most important criterion for evaluating a backtest system?', opts: ['Win rate above 60%', 'Positive Expectancy after 30+ trades — even with a low win rate, positive expectancy = the system has edge', 'Profit factor above 2', 'No single trade loses more than 50 pips'], c: 1, expl: 'Expectancy = (WR×AvgWin) − (LR×AvgLoss). Being positive is necessary and sufficient for a viable system. High win rate isn\'t enough if average losses are too large.' },
          { q: '[Ch.6] You\'ve demo traded 30 trades, win rate 38%, average R:R 1:2.2. Expectancy ≈ +0.03R/trade. What should you do next?', opts: ['Switch to live trading immediately', 'Continue demo for 20 more trades to build the sample, and optimize R:R to improve expectancy', 'Abandon the system since win rate is too low', 'Increase risk to compensate for low win rate'], c: 1, expl: '30 trades isn\'t enough sample size (need 50). Expectancy is positive but very small (+0.03R). Need more data and system optimization before going live.' },
          { q: '[Ch.6] In the 90-day demo roadmap, what is the main goal of weeks 5–8?', opts: ['Maximize profit on the demo account', 'Follow the Trading Plan + journal every trade fully — not profit', 'Backtest 50 more setups', 'Switch to live early if demo goes well'], c: 1, expl: 'Weeks 5–8 are Demo Phase 1: the goal is process (follow the plan + full journal), not profit. Profit is the result of a good process.' },
          { q: '[Comprehensive] Trader A: win rate 68%, avg loss = $300, avg win = $80. Trader B: win rate 40%, avg loss = $60, avg win = $180. Who is more profitable long-term?', opts: ['Trader A because win rate is much higher', 'Trader B — Expectancy B = 0.4×180−0.6×60=72−36=+$36/trade. Trader A = 0.68×80−0.32×300=54.4−96=−$41.6/trade!', 'Trader A because they lose fewer trades', 'Both are profitable'], c: 1, expl: 'Expectancy decides everything: Trader A has negative expectancy despite a 68% win rate. Trader B has +$36/trade expectancy despite only 40% wins.' },
          { q: '[Comprehensive] BTC just rose 20% in 3 days, news everywhere is bullish, everyone in your group is buying. You have no NNN setup. What should you do, based on all 6 chapters?', opts: ['Buy immediately — the momentum is too strong', 'Stay out — no setup = no trade. This is FOMO + Herding, two of the 7 most dangerous demons', 'Sell because price has risen too much', 'Buy a small amount to avoid missing out completely'], c: 1, expl: 'No setup = no trade, regardless of how strong the momentum is. FOMO + Herding is the most dangerous combination among the 7 demons.' },
          { q: '[Comprehensive] After 3 consecutive losing trades, you\'re down 4% on the day (Daily Limit is −5%). You\'re feeling very frustrated. What\'s the right next step?', opts: ['Enter trade 4 immediately to recover — opportunity still exists', 'Stop trading for today even though you haven\'t hit −5% yet — amygdala hijack is happening, any trade now will be Revenge Trading', 'Enter a smaller trade to reduce risk', 'Find a better setup and try one more trade'], c: 1, expl: 'Amygdala hijack + frustration = Revenge Trading imminent. Stop now, even before hitting the Daily Limit. The discipline to stop early matters more than waiting for the threshold.' },
          { q: '[Comprehensive] After studying 6 chapters, what is the single most important takeaway?', opts: ['The NNN method is the best trading system', 'Risk management of 1–2% is sacrosanct', 'Discipline and consistency with a validated system matters more than any technique — "You do not rise to the level of your goals, you fall to the level of your systems"', 'Avoiding the 7 demons is all you need'], c: 2, expl: '"You do not rise to the level of your goals, you fall to the level of your systems." — James Clear. Discipline with a validated system is the foundation of everything.' },
          { q: '[Comprehensive] What is the correct order of priority in trading?', opts: ['Technique → Risk Management → Psychology', 'Psychology → Risk Management → Technique (solid psychology + stable mindset + safe capital enables technique to work)', 'Risk Management → Technique → Psychology', 'All equally important, no order'], c: 1, expl: 'Correct order: Psychology → Risk Management → Technique. Without solid psychology → risk management fails. Without risk management → good technique still loses.' },
        ].map((quiz, qi) => (
          <SimpleQuiz key={qi} q={quiz.q} opts={quiz.opts} correctIdx={quiz.c} explanation={quiz.expl} />
        ))}
      </>
    )
  },
  {
    chapter: "Chapter 6: Building Your Trading System & Going Live", title: "8. Graduation Certificate",
    content: (
      <>
        <SectionHead icon={<Award size={16} />} title="Congratulations — Journey Complete" desc="You've made it through 6 chapters, studied over 80 lessons, battled 7 demons, and built your own personal trading system." />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-yellow-400 dark:border-[#FCD535]/50 rounded-2xl p-6 my-6">
          <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">Journey Completed</div>
          <div className="flex gap-2 mb-4">{Array(6).fill(0).map((_, i) => <div key={i} className="flex-1 h-2 rounded-full bg-yellow-500 dark:bg-[#FCD535]" />)}</div>
          <div className="text-center text-[15.5px] text-gray-500 dark:text-[#848E9C] mt-2">Ch.1 Foundations → Ch.2 Technical → Ch.3 NNN Methods → Ch.4 Risk Management → Ch.5 Psychology → Ch.6 Going Live</div>
        </div>

        <GraduationCertificate />

        <SectionHead icon="🔜" title="Next Steps" />
        <div className="space-y-4 my-6">
          {[
            { step: 'This week', desc: 'Open TradingView, set up your NNN chart template, and begin daily observation without placing trades.' },
            { step: 'Month 1', desc: 'Backtest 30 setups on your chosen market. Log in the Backtest Tracker. Calculate Expectancy.' },
            { step: 'Months 2–3', desc: 'Demo trade with your written Trading Plan. Journal every trade. Review weekly.' },
            { step: 'Month 4+', desc: 'If you\'ve hit 17/20 on the Checklist → begin live trading with the smallest possible capital.' },
            { step: 'Ongoing', desc: 'Monthly reviews, continuous improvement, learn SMC and ICT once your foundation is solid.' },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-10 h-8 rounded-lg bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535] font-black flex items-center justify-center shrink-0 mt-1 text-sm">→</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>{s.step}:</strong> {s.desc}</div>
            </div>
          ))}
        </div>

        <div className="text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#181A20] dark:to-[#0B0E11] border border-yellow-400/30 rounded-3xl mt-8">
          <div className="text-4xl mb-4">☀</div>
          <div className="font-serif text-[21.5px] italic text-yellow-600 dark:text-[#ffd070] leading-[1.8]">
            "The financial markets are a long journey — not a race.<br />
            The winner is not whoever moves fastest, but whoever <strong className="not-italic">survives longest with consistent discipline</strong>."
          </div>
        </div>
      </>
    )
  },
];

export default CHAPTER_6_DATA_EN;
