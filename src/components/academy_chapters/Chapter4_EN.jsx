import { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  XCircle, Calculator, BarChart2, Shield, Target, Clock, Zap,
  Globe, Bitcoin, Layers, RefreshCw, PauseCircle, BookOpen,
  Activity, ChevronDown, ChevronUp, Percent, Scale
} from 'lucide-react';
import { SectionHead, StoryBox, Callout, CyberTable, ExerciseBox } from '../Sharedcomponents.jsx';

// ==========================================
// CHAPTER 4 — QUẢN LÝ VỐN & RỦI RO
// ==========================================

const SimpleQuiz = ({ q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-5 flex items-center gap-3 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <span className="text-xs font-black tracking-widest uppercase text-yellow-600 dark:text-[#FCD535] bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30 px-4 py-1.5 rounded-full shadow-sm">
          <Zap size={14} className="inline mr-1" /> QUIZ QUESTION
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
          <div className={`mt-6 p-6 rounded-2xl text-[18.5px] leading-relaxed ${selected === correctIdx ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Correct!' : '❌ Incorrect.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

// ---- Interactive: Loss Streak Simulator ----
const LossStreakSim = () => {
  const [acc, setAcc] = useState(10000);
  const [risk, setRisk] = useState(5);
  const [n, setN] = useState(5);

  const finalVal = acc * Math.pow(1 - risk / 100, n);
  const lost = acc - finalVal;
  const lostPct = ((lost / acc) * 100).toFixed(1);
  const recovery = ((acc / finalVal - 1) * 100).toFixed(1);

  const bars = [];
  for (let i = 0; i <= n; i++) {
    const pct = Math.pow(1 - risk / 100, i);
    bars.push({ pct, val: (acc * pct).toFixed(0) });
  }

  const barColor = (pct) => {
    if (pct > 0.8) return 'bg-green-500 dark:bg-[#0ECB81]';
    if (pct > 0.5) return 'bg-yellow-500 dark:bg-[#FCD535]';
    return 'bg-red-500 dark:bg-[#F6465D]';
  };

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <BarChart2 size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Simulator: Consecutive Loss Streak</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Initial Capital ($)</label>
            <input type="number" value={acc} onChange={e => setAcc(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Risk per trade (%)</label>
            <input type="number" value={risk} step={0.5} onChange={e => setRisk(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Consecutive Losses</label>
            <input type="number" value={n} min={1} max={20} onChange={e => setN(Number(e.target.value) || 1)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>
        <div className="flex items-end gap-1 h-20 mb-4 bg-gray-100 dark:bg-[#181A20] rounded-xl px-4 py-3">
          {bars.map((b, i) => (
            <div key={i} className={`flex-1 rounded-t-sm opacity-90 transition-all ${barColor(b.pct)}`} style={{ height: `${Math.max(8, b.pct * 100)}%` }} title={`Trade ${i}: $${b.val}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Remaining</div>
            <div className={`text-2xl font-black font-mono ${parseFloat(lostPct) > 30 ? 'text-red-600 dark:text-[#F6465D]' : parseFloat(lostPct) > 15 ? 'text-yellow-600 dark:text-[#FCD535]' : 'text-green-600 dark:text-[#0ECB81]'}`}>${finalVal.toFixed(0)}</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Lost</div>
            <div className="text-2xl font-black font-mono text-red-600 dark:text-[#F6465D]">-{lostPct}%</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">To Recover</div>
            <div className="text-2xl font-black font-mono text-yellow-600 dark:text-[#FCD535]">+{recovery}%</div>
          </div>
        </div>
        {parseFloat(lostPct) > 50 ? (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D] text-[16.5px] leading-relaxed border border-red-200 dark:border-[#F6465D]/30">
            💀 {n} losses with risk {risk}% = lost {lostPct}% of account. Need +{recovery}% just to breakeven — might take years.
          </div>
        ) : parseFloat(lostPct) > 20 ? (
          <div className="mt-4 p-4 rounded-2xl bg-yellow-50 dark:bg-[#FCD535]/10 text-yellow-800 dark:text-[#FCD535] text-[16.5px] leading-relaxed border border-yellow-200 dark:border-[#FCD535]/30">
            ⚠️ Losing {lostPct}% is significant. With {risk}% risk, it only takes {n} consecutive losses to reach a concerning drawdown. Consider reducing risk to 1-2%.
          </div>
        ) : (
          <div className="mt-4 p-4 rounded-2xl bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81] text-[16.5px] leading-relaxed border border-green-200 dark:border-[#0ECB81]/30">
            ✅ {n} losses with risk {risk}% only lost {lostPct}%. Can recover normally. This is why small risk is used.
          </div>
        )}
      </div>
    </div>
  );
};

// ---- Interactive: Position Size Calculator ----
const PositionSizeCalc = () => {
  const [accBal, setAccBal] = useState(5000);
  const [riskPct, setRiskPct] = useState(1);
  const [sl, setSl] = useState(40);
  const [pipVal, setPipVal] = useState(1);

  const riskAmt = accBal * riskPct / 100;
  const size = riskAmt / (sl * pipVal);

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Calculator size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Position Size Calculator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <Callout type="warn">Formula: Risk Amount ($) = Account × Risk% / 100. Position Size = Risk Amount / (SL pips × Pip Value)</Callout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Account Balance ($)</label>
            <input type="number" value={accBal} onChange={e => setAccBal(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Risk % per trade</label>
            <input type="number" value={riskPct} step={0.1} min={0.1} max={10} onChange={e => setRiskPct(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Stop Loss (pips/points)</label>
            <input type="number" value={sl} onChange={e => setSl(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Pip Value ($)</label>
            <select value={pipVal} onChange={e => setPipVal(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white outline-none transition-colors">
              <option value={1}>$1 — Mini lot (EUR/USD, GBP/USD)</option>
              <option value={0.1}>$0.1 — Micro lot</option>
              <option value={10}>$10 — Standard lot</option>
              <option value={0.01}>$0.01 — Cent lot (for beginners)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Risk Amount</div>
            <div className="text-2xl font-black font-mono text-yellow-600 dark:text-[#FCD535]">${riskAmt.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Position Size</div>
            <div className="text-2xl font-black font-mono text-green-600 dark:text-[#0ECB81]">{size.toFixed(2)} lot</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">% Account</div>
            <div className="text-2xl font-black font-mono text-black dark:text-white">{riskPct}%</div>
          </div>
        </div>
        {riskPct > 3 && <div className="mt-4 p-4 rounded-2xl bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D] text-[16.5px] border border-red-200 dark:border-[#F6465D]/30">⚠️ Risk {riskPct}% is too high for beginners. Recommended 1-2%.</div>}
        {riskPct >= 1 && riskPct <= 3 && <div className="mt-4 p-4 rounded-2xl bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81] text-[16.5px] border border-green-200 dark:border-[#0ECB81]/30">✅ Risk {riskPct}% is reasonable. Size {size.toFixed(2)} lot, risk ${riskAmt.toFixed(2)}.</div>}
        {riskPct < 1 && <div className="mt-4 p-4 rounded-2xl bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] text-[16.5px] border border-blue-200 dark:border-[#378ADD]/30">🛡️ Risk {riskPct}% is very safe — perfect for learning phase.</div>}
      </div>
    </div>
  );
};

// ---- Interactive: Expectancy Calculator ----
const ExpectancyCalc = () => {
  const [winRate, setWinRate] = useState(45);
  const [avgWin, setAvgWin] = useState(150);
  const [avgLoss, setAvgLoss] = useState(50);

  const wr = winRate / 100;
  const lr = 1 - wr;
  const expectancy = wr * avgWin - lr * avgLoss;
  const rr = avgWin / avgLoss;
  const per100 = expectancy * 100;
  const breakeven = (1 / (1 + rr) * 100).toFixed(1);

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Scale size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Expectancy Calculator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Win Rate (%)</label>
            <input type="number" value={winRate} min={1} max={99} onChange={e => setWinRate(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Avg Win per trade ($)</label>
            <input type="number" value={avgWin} onChange={e => setAvgWin(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Avg Loss per trade ($)</label>
            <input type="number" value={avgLoss} onChange={e => setAvgLoss(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">R:R Ratio</div>
            <div className="text-2xl font-black font-mono text-green-600 dark:text-[#0ECB81]">1:{rr.toFixed(1)}</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Expectancy/trade</div>
            <div className={`text-2xl font-black font-mono ${expectancy >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{expectancy >= 0 ? '+' : ''}{expectancy.toFixed(1)}$</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">After 100 trades = ?</div>
            <div className={`text-2xl font-black font-mono ${per100 >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{per100 >= 0 ? '+' : ''}{per100.toFixed(0)}$</div>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-2xl bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] text-[16.5px] border border-blue-200 dark:border-[#378ADD]/30">
          📊 With an R:R of 1:{rr.toFixed(1)}, you only need a minimum win rate of <strong>{breakeven}%</strong> to breakeven.
        </div>
      </div>
    </div>
  );
};

// ---- Interactive: Kelly Criterion Calculator ----
const KellyCalc = () => {
  const [wr, setWr] = useState(45);
  const [avgW, setAvgW] = useState(100);
  const [avgL, setAvgL] = useState(50);

  const w = wr / 100;
  const l = 1 - w;
  const fullKelly = Math.max(0, (w * avgW - l * avgL) / avgW * 100);
  const halfKelly = fullKelly / 2;
  const quarterKelly = fullKelly / 4;

  const kellyLeft = Math.min(fullKelly, 25);

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Percent size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Kelly Criterion Calculator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Win Rate (%)</label>
            <input type="number" value={wr} onChange={e => setWr(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Avg Win ($)</label>
            <input type="number" value={avgW} onChange={e => setAvgW(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Avg Loss ($)</label>
            <input type="number" value={avgL} onChange={e => setAvgL(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-1">Full Kelly</div>
            <div className="text-2xl font-black font-mono text-red-600 dark:text-[#F6465D]">{fullKelly.toFixed(1)}%</div>
            <div className="text-[12.5px] text-red-500 mt-1">⚠️ Too Risky</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-1">Half Kelly</div>
            <div className="text-2xl font-black font-mono text-yellow-600 dark:text-[#FCD535]">{halfKelly.toFixed(1)}%</div>
            <div className="text-[12.5px] text-yellow-600 dark:text-[#FCD535] mt-1">Professional</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-1">Quarter Kelly</div>
            <div className="text-2xl font-black font-mono text-green-600 dark:text-[#0ECB81]">{quarterKelly.toFixed(1)}%</div>
            <div className="text-[12.5px] text-green-600 dark:text-[#0ECB81] mt-1">Recommended</div>
          </div>
        </div>
        <div className="mb-2 text-xs font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest">Safe Zone</div>
        <div className="h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 relative mb-2">
          <div className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-white dark:bg-white rounded-full shadow-lg" style={{ left: `${Math.min(kellyLeft * 4, 100)}%` }} />
        </div>
        <div className="flex justify-between text-[12.5px] font-mono text-gray-500 dark:text-[#848E9C]">
          <span>0% Too Cautious</span><span>Optimal Zone</span><span>100% Financial Suicide</span>
        </div>
      </div>
    </div>
  );
};

// ---- Accordion: Scenario Card ----
const ScenarioCard = ({ icon, title, badge, badgeColor, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden mb-4 transition-all ${open ? 'border-yellow-400 dark:border-[#FCD535]' : 'border-gray-200 dark:border-[#2B3139]'} bg-white dark:bg-[#181A20]`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-5 text-left">
        <span className="text-2xl">{icon}</span>
        <span className="font-bold text-[18.5px] text-black dark:text-white flex-1">{title}</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full font-mono ${badgeColor}`}>{badge}</span>
        {open ? <ChevronUp size={16} className="text-gray-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-500 shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-100 dark:border-[#2B3139] pt-4">{children}</div>}
    </div>
  );
};

// ---- Interactive: Anti-Martingale Simulator ----
const AntiMartingaleSim = () => {
  const [base, setBase] = useState(1);
  const [inc, setInc] = useState(0.5);
  const sequence = ['W', 'W', 'L', 'W', 'W', 'W', 'L', 'L', 'W', 'W'];
  let risk = base;
  let bal = 10000;
  const rows = sequence.map((r, i) => {
    const riskAmt = bal * risk / 100;
    const change = r === 'W' ? riskAmt * 1.5 : -riskAmt;
    bal += change;
    const oldRisk = risk;
    if (r === 'W') risk = Math.min(base + inc * 3, risk + inc);
    else risk = Math.max(base * 0.5, risk - inc);
    return { i, r, risk: oldRisk.toFixed(2), change: change.toFixed(0), bal: bal.toFixed(0) };
  });

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139]">
        <TrendingUp size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Anti-Martingale Simulator</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Base Risk (%)</label>
            <input type="number" value={base} step={0.5} onChange={e => setBase(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Increase after win (%)</label>
            <select value={inc} onChange={e => setInc(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white outline-none transition-colors">
              <option value={0.25}>+0.25% per winning streak</option>
              <option value={0.5}>+0.5% per winning streak</option>
              <option value={1}>+1% per winning streak</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto border border-gray-200 dark:border-[#2B3139] rounded-2xl">
          <table className="w-full text-left min-w-[400px]">
            <thead><tr className="bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C] text-xs uppercase tracking-widest border-b border-gray-200 dark:border-[#2B3139]">
              <th className="p-3 font-black">Trade</th><th className="p-3 font-black">Result</th><th className="p-3 font-black">Risk %</th><th className="p-3 font-black">Change ($)</th><th className="p-3 font-black">Balance ($)</th>
            </tr></thead>
            <tbody className="text-[16.5px]">
              {rows.map(row => (
                <tr key={row.i} className="border-b border-gray-100 dark:border-[#2B3139]/50 last:border-0">
                  <td className="p-3 font-mono font-bold text-gray-700 dark:text-[#848E9C]">#{row.i + 1}</td>
                  <td className="p-3"><span className={`px-2 py-1 rounded-lg text-xs font-black ${row.r === 'W' ? 'bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]' : 'bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]'}`}>{row.r === 'W' ? '✅ Win' : '❌ Loss'}</span></td>
                  <td className="p-3 font-mono text-black dark:text-white">{row.risk}%</td>
                  <td className={`p-3 font-mono font-bold ${Number(row.change) >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{Number(row.change) >= 0 ? '+' : ''}{row.change}</td>
                  <td className="p-3 font-mono font-bold text-black dark:text-white">${row.bal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CHAPTER 4 DATA
// ==========================================
const CHAPTER_4_DATA_EN = [
  {
    chapter: "Chapter 4: Risk Management", title: "0. Why Risk Management is #1?",
    content: (
      <>
        <SectionHead icon={<DollarSign size={16} />} title="Why is Risk Management more important than technical analysis?" desc="80% of losing traders don't fail because of poor analysis — they fail because they can't control their bet size." />
        <StoryBox label="🎯 Thinking Puzzle" icon="🎯">
          You have 2 traders:<br /><br />
          <strong>Trader A:</strong> Win rate 70% (wins 7/10 trades). But each win is +$100, each loss is −$500. After 10 trades: 7 × $100 = $700. 3 losses × $500 = $1,500. <strong>Result: −$800.</strong><br /><br />
          <strong>Trader B:</strong> Win rate 40% (wins 4/10 trades). But each win is +$300, each loss is −$100. After 10 trades: 4 × $300 = $1,200. 6 losses × $100 = $600. <strong>Result: +$600.</strong><br /><br />
          Who wins? Trader B — despite winning 30% less often. <em>Win rate isn't everything. Risk management discipline is what matters.</em>
        </StoryBox>

        <SectionHead icon={<BarChart2 size={16} />} title="The Math of Ruin" desc="Once you lose a lot, it's very hard to recover" />
        <CyberTable
          headers={["Amount Lost", "Amount to Recover"]}
          rows={[
            ["Lost 10% of account", "Need +11% to breakeven"],
            ["Lost 25% of account", "Need +33% to breakeven"],
            ["Lost 50% of account", "<span class='text-red-600 dark:text-[#F6465D] font-bold'>Need +100% to breakeven!</span>"],
          ]}
        />

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// To breakeven after drawdown:</div>
          <div>Recovery % = (1 / (1 - Drawdown%)) - 1</div>
          <br />
          <div className="text-gray-400 text-xs">// Example: Lost 50% → $10,000 becomes $5,000</div>
          <div className="text-gray-400 text-xs">// Need 100% gain from $5,000 to get back to $10,000</div>
          <div className="text-gray-400 text-xs">// But the market averages 10-30% growth per year...</div>
          <div className="text-gray-400 text-xs">// → Losing 50% = takes 2-5 years to recover (if lucky)</div>
        </div>

        <SectionHead icon="💀" title="3 most common ways to blow up an account" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Risking too much per trade (10-30% of account):</strong> 3-5 consecutive losses = account wiped out. You cannot avoid losing streaks — the market always has unfavorable periods.</> },
            { n: '2', text: <><strong>Trading without a Stop Loss:</strong> "It will come back this time..." — small losses turn into big losses until no capital is left to trade.</> },
            { n: '3', text: <><strong>Revenge trading after a loss:</strong> Lose $200 → enter a $500 trade to recover → lose $500 → enter $1,000... The emotional death spiral.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-[#F6465D]/20 text-red-600 dark:text-[#F6465D] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <LossStreakSim />

        <Callout type="ok" title="Conclusion:">Risk management isn't about making more money — it's about <em>surviving long enough</em> for your technical skills and experience to work. The trader who survives the longest wins.</Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 0 Summary</div>
          <ul className="space-y-2">
            {['A high win rate doesn\'t guarantee profits — R:R and risk management discipline are what matters.', 'Losing 50% of your account requires a +100% gain to breakeven — asymmetrical math is extremely dangerous.', '3 ways to blow up: risking too much, no SL, revenge trading. Avoiding these 3 things = already better than 80% of traders.', 'Goal of risk management: survive long enough, not get rich quick.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "1. 1-2% Rule & Position Sizing",
    content: (
      <>
        <SectionHead icon={<Shield size={16} />} title="The 1-2% Rule — Explained for a 1st Grader" desc="This is the simplest rule but the most violated." />
        <StoryBox label="🍬 The Candy Example" icon="🍬">
          You have <strong>100 candies</strong>. Every day you play a game of chance. If you use the <strong>1% rule</strong>: you only bet a maximum of <strong>1 candy</strong> each time.<br /><br />
          Even if you lose 10 times in a row, you still have ~90 candies. You can continue playing and recover.<br /><br />
          If you bet 10 candies each time and lose 10 times in a row → <strong>you lose all your candies, game over.</strong><br /><br />
          Trading works exactly the same. 1-2% = 1-2 candies per play.
        </StoryBox>

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Position Size Formula</div>
          <div>Risk Amount ($) = Account Balance × Risk% / 100</div>
          <div>Position Size = Risk Amount / (Stop Loss pips × Pip Value)</div>
          <br />
          <div className="text-gray-400 text-xs">// Practical Example:</div>
          <div className="text-gray-400 text-xs">// Account: $5,000 | Risk: 1% | SL: 40 pips | EUR/USD mini lot (pip = $1)</div>
          <div>Risk Amount = $5,000 × 1% = $50</div>
          <div>Position Size = $50 / (40 × $1) = 1.25 mini lots</div>
        </div>

        <PositionSizeCalc />

        <SimpleQuiz
          q="Question 1: Account $3,000. You want to BUY EUR/USD, SL = 50 pips, pip value = $1 (mini lot). Applying 2% risk, what is the position size?"
          opts={['3 mini lots', '1.2 mini lots ($3,000×2%=$60; $60÷50pips=$1.2)', '0.6 mini lots', '2 mini lots']}
          correctIdx={1}
          explanation="Formula: Risk$=Acc×Risk%. Size=Risk$/(SL×PipVal) = $60/(50×1)=1.2 lots."
        />

        <SimpleQuiz
          q="Question 2: Trader A risks 5%/trade. Trader B risks 1%/trade. Both lose 8 consecutive trades. Starting with $10,000 — how much is left in each account?"
          opts={['Trader A: $6,000 | Trader B: $9,200', 'Trader A: ~$6,634 | Trader B: ~$9,227 — A lost 33%, B only lost 7.7%', 'Both lost the same because of same number of losing trades', 'Trader A: $5,000 | Trader B: $9,000']}
          correctIdx={1}
          explanation="Compound effect: A: $10k×(0.95)^8≈$6,634. B: $10k×(0.99)^8≈$9,227. Fixed fractional compounds per trade."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 1 Summary</div>
          <ul className="space-y-2">
            {['Risking 1-2% per trade = golden rule. Beginners should start with 0.5-1%.', 'Position Size = (Account × Risk%) ÷ (SL pips × Pip Value). Calculate before entering, don\'t guess.', 'Risk % has non-linear effects: 5% risk × 8 losses = lost 33% of account. 1% risk × 8 losses = only lost 7.7%.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "2. Real-world Risk:Reward",
    content: (
      <>
        <SectionHead icon={<Scale size={16} />} title="R:R — The Math of Profit" desc="R:R determines the win rate you need to be profitable." />
        <StoryBox label="🎲 The Coin Toss Game" icon="🎲">
          Coin toss: heads wins $30, tails loses $10. R:R = 1:3.<br /><br />
          Probability of heads/tails is 50%. Expectancy per toss = (50% × $30) − (50% × $10) = $15 − $5 = <strong>+$10 per toss.</strong><br /><br />
          You can lose 4 times in a row and still make money after 10 tosses if your R:R is good enough. <em>Trading works exactly the same.</em>
        </StoryBox>

        <ExpectancyCalc />

        <SectionHead icon="🎯" title="Smart Exit Techniques" />
        <CyberTable
          headers={['Technique', 'Description', 'Pros', 'When to use']}
          rows={[
            ['Hard TP/SL', 'Set fixed TP and SL upon entry', 'Disciplined, no monitoring needed', 'Swing trade, beginners'],
            ['Partial Exit', 'Take 50% at TP1, let 50% run to TP2', 'Secures profit + rides momentum', 'NNN Fibonacci setups'],
            ['Move to BE', 'When up 1R, move SL to entry', 'Risk-free trade, stress-free', 'After reaching 1:1'],
            ['Trailing Stop', 'SL automatically follows price', 'Rides long trends', 'Strong trending markets'],
            ['Time-based Exit', 'Close trade after X hours/days if TP not hit', 'Frees capital, avoids stuck trades', 'Intraday, news trading'],
          ]}
        />

        <SimpleQuiz
          q="Question 1: System has 35% win rate, R:R = 1:3 (lose $50, win $150). What is the expectancy per trade?"
          opts={['Negative — because win rate is below 50%', '+$20/trade — (35%×$150)−(65%×$50) = $52.5−$32.5 = +$20', '−$15/trade', '$0 — breakeven']}
          correctIdx={1}
          explanation="Expectancy=(WR×avgWin)−((1-WR)×avgLoss)=(0.35×150)−(0.65×50)=52.5−32.5=+$20. A 35% win rate can STILL be profitable with good R:R!"
        />

        <SimpleQuiz
          q="Question 2: You are holding a BUY Gold trade, up 1R (price moved your way by the SL amount). What is the best next step for trade management?"
          opts={['Close everything immediately to be safe', 'Move SL to entry (Break Even) — trade becomes risk-free, let it run to TP2', 'Open another Buy since price is rising', 'Do nothing, wait for TP2']}
          correctIdx={1}
          explanation="Moving to BE after 1R is the most important step to protect profits and keep the trade stress-free."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 2 Summary</div>
          <ul className="space-y-2">
            {['R:R = Expected Profit / Risk. R:R 1:2 = only need a 34% win rate to be profitable.', 'Expectancy = (Win%×AvgWin) − (Loss%×AvgLoss). Must be positive to trade.', 'Best technique: Partial Exit (50% at TP1) + Move to BE + let 50% run to TP2.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "3. When to increase risk?",
    content: (
      <>
        <SectionHead icon="🚦" title="4 Conditions to Increase Risk" desc="Must meet ALL of them — not just 1 or 2" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Minimum time:</strong> Traded at least <em>3 consecutive months</em> with stable results (not just 1 big winning month and immediately increasing).</> },
            { n: '2', text: <><strong>Sufficient sample size:</strong> At least <em>50 completed trades</em> with clear data in the trading journal. Actual Win rate and R:R calculated.</> },
            { n: '3', text: <><strong>Consistent positive expectancy:</strong> Positive Expectancy after 50+ trades. <em>Not due to luck from 1-2 big trades</em> — must be stable.</> },
            { n: '4', text: <><strong>Max Drawdown within forecast:</strong> Actual maximum drawdown does not exceed your pre-defined allowable max drawdown.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <SectionHead icon="📐" title="Anti-Martingale — Increase risk when winning, decrease when losing" />
        <StoryBox label="⚠️ Martingale vs Anti-Martingale" icon="⚖️">
          <strong>Martingale (WRONG):</strong> Lose → double the size next time to "recover". This is the path of death — one long losing streak is enough to blow up the account.<br /><br />
          <strong>Anti-Martingale (CORRECT):</strong> Win → slightly increase size. Lose → decrease size. Principle: <em>"play bigger when winning, play smaller when losing."</em> Protect capital during unfavorable markets, capitalize during favorable ones.
        </StoryBox>

        <AntiMartingaleSim />

        <SectionHead icon="📊" title="Roadmap to Increase Risk by Stages" />
        <CyberTable
          headers={['Stage', 'Experience', 'Risk/trade', 'Allowable Max DD', 'Condition to level up']}
          rows={[
            ["<span class='text-blue-600 dark:text-[#378ADD] font-bold'>NEWBIE</span>", '0–3 months', '0.5–1%', '10%', 'profit factor >1.2'],
            ["<span class='text-green-600 dark:text-[#0ECB81] font-bold'>BEGINNER</span>", '3–12 months', '1–1.5%', '15%', '3 months live consecutive profit + DD <15%'],
            ["<span class='text-yellow-600 dark:text-[#FCD535] font-bold'>INTERMEDIATE</span>", '1–3 years', '1.5–2%', '20%', '1 year consistent + Sharpe ratio >1'],
            ["<span class='text-purple-600 dark:text-[#9b59ff] font-bold'>ADVANCED</span>", '3+ years', '2–3%', '25%', 'System verified across multiple market cycles'],
            ["<span class='text-red-600 dark:text-[#F6465D] font-bold'>NEVER</span>", 'Any', '>5%', '—', 'Never — unless you are a professional hedge fund with a hedging system'],
          ]}
        />

        <Callout type="bad" title="Most common trap:">Winning 3-5 trades in a row → feeling "hot" → doubling size → next trade loses → losing all profit from previous 5 trades. This is "Trader's Ruin" — destroying account not by losing trades but by wrong position sizing.</Callout>

        <SimpleQuiz
          q="You've been trading for 2 months, just won 5 consecutive trades, account up 15%. You want to increase risk from 1% to 3% because 'you're on a roll'. Is this the right decision?"
          opts={['Yes — should capitalize on momentum while winning', 'No — not enough 3 months and 50 trades for reliable data. 5 wins could be random luck. Increase slightly to 1.5% if desired, but don\'t jump to 3%', 'Yes — 5 wins prove the system is good', 'Should reduce risk to 0.5% as a losing streak is coming']}
          correctIdx={1}
          explanation="5 trades = unreliable statistics. Need at least 50 trades for statistically significant data."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 3 Summary</div>
          <ul className="space-y-2">
            {['Increase risk only when: 3+ months, 50+ trades, consistent positive expectancy, DD within forecast.', 'Anti-Martingale: increase size during winning streaks, decrease during losing streaks. Opposite of Martingale.', 'Roadmap: 0.5-1% (newbie) → 1-2% (intermediate) → 2-3% (advanced). Never >5%.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "4. Fixed Fractional & Kelly",
    content: (
      <>
        <SectionHead icon="🔒" title="Fixed Fractional — The Safest Method" />
        <p className="text-[18.5px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          This is exactly the 1-2% rule you learned, but systematized into a complete method. <strong className="text-black dark:text-white">Fixed Fractional</strong> = always risk a fixed percentage of your CURRENT account balance (not the initial balance).
        </p>

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Fixed Fractional</div>
          <div>Risk per trade = Account Balance (current) × Fixed %</div>
          <br />
          <div className="text-gray-400 text-xs">// Progress example:</div>
          <div>Month 1: Acc=$10,000 → Risk 1% = $100/trade</div>
          <div>Month 3: Acc=$12,000 → Risk 1% = $120/trade (auto-increases with capital)</div>
          <div>Month 6: Acc=$9,000 → Risk 1% = $90/trade (auto-decreases when losing)</div>
          <br />
          <div className="text-gray-400 text-xs">// ADVANTAGE: Theoretically impossible to blow up to 0</div>
          <div className="text-gray-400 text-xs">// When account drops → size auto-drops → automatic capital protection</div>
        </div>

        <SectionHead icon="📐" title="Kelly Criterion — Optimizing Growth" />
        <StoryBox label="📡 Developed by John L. Kelly Jr. (Bell Labs, 1956)" icon="📡">
          The Kelly Formula calculates the <strong>optimal betting fraction</strong> for the fastest long-term account growth. Used by the world's largest hedge funds.
        </StoryBox>

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Kelly Formula</div>
          <div>K% = (Win Rate × (1 + RR) - 1) / RR</div>
          <br />
          <div className="text-gray-400 text-xs">// Simpler: K% = (Win% × Avg_Win - Loss% × Avg_Loss) / Avg_Win</div>
          <br />
          <div className="text-gray-400 text-xs">// Example: Win rate 45%, R:R = 1:2 (lose $50, win $100)</div>
          <div>K% = (0.45 × 2 - 0.55) / 2 = (0.9 - 0.55) / 2 = 17.5%</div>
          <br />
          <div className="text-gray-400 text-xs">// But NEVER use Full Kelly!</div>
          <div className="text-gray-400 text-xs">// Half Kelly (8.75%) or Quarter Kelly (4.4%) is much safer</div>
        </div>

        <KellyCalc />

        <Callout type="warn" title="Why not use Full Kelly?">Full Kelly optimizes growth but creates extreme account volatility (50-70% drawdown is normal). Most people cannot psychologically handle a 50% drop. Half or Quarter Kelly gives near-optimal results with much less volatility.</Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 4 Summary</div>
          <ul className="space-y-2">
            {['Fixed Fractional: fixed risk % of current account — simple, sustainable, auto-protects.', 'Kelly Criterion: calculates optimal size based on actual win rate and R:R.', 'Use Quarter Kelly (25% of Kelly) = safest. Full Kelly = too risky psychologically.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "5. Pyramiding & Scaling",
    content: (
      <>
        <SectionHead icon="🔺" title="Pyramiding — Adding to a winning trade" desc="When done right, it turns a good trade into an outstanding profit." />
        <StoryBox label="🎰 Inverted Pyramid vs Standard Pyramid" icon="🔺">
          <strong>WRONG Pyramiding (dangerous):</strong> Adding larger sizes after each trade — like an inverted pyramid. 1st trade 1 lot, 2nd is 2 lots, 3rd is 4 lots... When price reverses, the largest trade at the top wipes out all profits.<br /><br />
          <strong>CORRECT Pyramiding (standard pyramid):</strong> Each added trade is smaller than the previous one — like a normal pyramid. Big base (1st trade), small top (later trades). Total risk does not increase.
        </StoryBox>

        <div className="my-6">
          <div className="text-xs font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-4">CORRECT Pyramid (safe pyramiding)</div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center rounded-lg text-white text-sm font-bold py-2 bg-green-500 dark:bg-[#0ECB81]" style={{ width: '80%' }}>Trade 1: 1.0 lot (Original Entry)</div>
            <div className="flex items-center justify-center rounded-lg text-white text-sm font-bold py-2 bg-green-400 dark:bg-[#0ECB81]/70" style={{ width: '55%' }}>Trade 2: 0.5 lot (Breakout confirmed)</div>
            <div className="flex items-center justify-center rounded-lg text-white text-xs font-bold py-2 bg-green-300 dark:bg-[#0ECB81]/45" style={{ width: '35%' }}>Trade 3: 0.25 lot (Continuation)</div>
          </div>
        </div>

        <SectionHead icon="📋" title="Safe Pyramiding Rules" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Only add when the first trade has Moved to Break Even.</strong> Original trade is risk-free → adding a new trade only affects potential profit, not original capital.</> },
            { n: '2', text: <><strong>Each subsequent trade is &lt;50% of the previous one.</strong> Trade 1 = 1 lot → Trade 2 = 0.5 lot → Trade 3 = 0.25 lot. Keep total risk within 2-3% of account.</> },
            { n: '3', text: <><strong>Only add at logical technical points.</strong> At new S/R breakouts, at pullbacks to EMA21 in a continuing trend — don't add just "because price is rising".</> },
            { n: '4', text: <><strong>Trailing Stop for the entire position.</strong> Once you have 2-3 trades, use a trailing stop to lock in overall profit. Don't let a "beautiful pyramid" turn into a loss.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <SimpleQuiz
          q="You BUY Gold 1 lot at $2,000. Price rises to $2,030, you Move to BE. It continues to $2,060 breaking resistance. You want to pyramid. What is a reasonable size for the 2nd trade?"
          opts={['2 lots — price is strong, double it', '0.5 lot — 50% of the first trade, safe and still rides the trend', '1 lot — same as first trade', 'Don\'t add anything — pyramiding is too risky']}
          correctIdx={1}
          explanation="Standard pyramid: each added trade is smaller than the previous by ≤50%. 0.5 lot is standard."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 5 Summary</div>
          <ul className="space-y-2">
            {['Standard pyramid: first trade is largest, adding progressively smaller trades.', 'Only pyramid after moving original trade to BE. Each added trade ≤50% of previous.', 'Use trailing stop for the entire pyramided position.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "6. Drawdown Management",
    content: (
      <>
        <SectionHead icon={<TrendingDown size={16} />} title="Drawdown — Managing Losing Streaks" desc="No trader escapes drawdowns." />
        <CyberTable
          headers={['Type', 'Definition', 'Danger Threshold', 'Action']}
          rows={[
            ['Current DD', '% drop from recent peak account value to current', '>15%', 'Reduce size by 50%'],
            ['Max DD', 'Largest % drop from peak to trough in trading history', '>25%', 'Stop trading, review system'],
            ['Daily DD', '% lost in 1 trading day', '>5%', 'Stop for the day, no more trades'],
          ]}
        />

        <SectionHead icon="🚦" title="Circuit Breaker Rules — When to Stop" />
        <div className="space-y-4 my-6">
          {[
            { icon: '⚠️', color: 'yellow', text: <><strong>Daily Loss Limit (−3-5%):</strong> Lose 3-5% in 1 day → <em>stop trading immediately</em>. Close computer. Go outside. No "recovering" that day. Non-negotiable.</> },
            { icon: '⚠️', color: 'yellow', text: <><strong>Weekly Loss Limit (−7-10%):</strong> Lose 7-10% in 1 week → Reduce size by 50% next week. Review all executed trades.</> },
            { icon: '🛑', color: 'red', text: <><strong>Monthly Loss Limit (−15-20%):</strong> Lose &gt;15% in 1 month → <em>Stop trading completely for 2 weeks</em>. Review the system, not just individual trades. Market condition has changed.</> },
            { icon: '🚨', color: 'red', text: <><strong>Maximum Drawdown (−25-30%):</strong> Stop everything. Do not trade for 1 month. Re-read entire Trading Journal. Find a coach or mentor. Severe issue with system or psychology.</> },
          ].map((s, i) => (
            <div key={i} className={`flex gap-4 items-start p-4 rounded-xl ${s.color === 'red' ? 'bg-red-50 dark:bg-[#F6465D]/10 border border-red-200 dark:border-[#F6465D]/30' : 'bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30'}`}>
              <span className="text-2xl shrink-0">{s.icon}</span>
              <div className={`text-[17.5px] leading-[1.8] ${s.color === 'red' ? 'text-red-800 dark:text-[#F6465D]' : 'text-yellow-800 dark:text-[#FCD535]'}`}>{s.text}</div>
            </div>
          ))}
        </div>

        <SectionHead icon={<RefreshCw size={16} />} title="Recovery Process After Drawdown" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Mandatory rest:</strong> DD 5-10% → rest 24h. DD 10-20% → rest 1 week. DD &gt;20% → rest 2-4 weeks. Brain needs a reset to make good decisions.</> },
            { n: '2', text: <><strong>Emotionless Journal Review:</strong> Review every losing trade. Categorize: (A) Lost following system (bad market conditions — acceptable), (B) Lost due to rule violation (needs fixing). Only worry about B.</> },
            { n: '3', text: <><strong>Return with smaller size:</strong> After DD &gt;15%, start with 50% of normal size. Increase gradually to 100% after recovering peak account value or 20 stable trades.</> },
            { n: '4', text: <><strong>Focus on process, not profit:</strong> During recovery, judge success by "did I follow the system?" rather than "did I make a profit?"</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 6 Summary</div>
          <ul className="space-y-2">
            {['3 DD types: Current, Max, Daily. Circuit Breaker: Daily >5% → stop for day; Monthly >20% → stop for 1 month.', 'Correct recovery: rest → emotionless review → return at 50% size → increase gradually.', 'Losing following system ≠ losing breaking rules. Only fix the latter.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "7. Forex / Gold / Crypto / Stocks",
    content: (
      <>
        <SectionHead icon={<Globe size={16} />} title="Risk Management by Market" desc="Forex, Crypto, Gold, and Stocks have completely different risk profiles." />
        <Callout type="warn">Applying the same rules to all markets = fatal mistake. Each market has totally different volatility, liquidity, and specific risks.</Callout>

        <CyberTable
          headers={['Characteristic', '💱 Forex', '₿ Crypto', '🥇 Gold (XAU)', '📈 Stocks']}
          rows={[
            ['Daily Volatility', '0.5–1%', '3–10%+', '0.5–1.5%', '1–3% (individual)'],
            ['Recommended Risk/trade', '1–2%', '0.5–1%', '1–2%', '0.5–1%'],
            ['Minimum SL', '20–50 pips', '2–5% of price', '$10–30', '2–5% of stock price'],
            ['Safe Leverage', '1:5–1:20', '1:2–1:5', '1:10–1:20', '1:1–1:3'],
            ['Liquidity', 'Extremely high', 'High (top coins)', 'Very high', 'Highly variable'],
            ['Trading Hours', '24/5', '24/7', '24/5', 'Fixed'],
            ['Gap Risk', 'Weekends', 'Sudden news', 'Weekends', 'Overnight earnings'],
          ]}
        />

        <ScenarioCard icon="💱" title="Scenario: EUR/USD H4, $5,000 account" badge="Most Stable" badgeColor="bg-blue-100 dark:bg-[#378ADD]/20 text-blue-700 dark:text-[#378ADD]">
          <p className="text-[16.5px] text-gray-700 dark:text-[#9ca3b0] mb-4">Forex has the lowest volatility of the 4 markets, low spread, high liquidity → best for beginners. SL must be wide enough to avoid "stop hunts" (SM sweeps SL then price goes your way).</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// Calculate Position Size</div>
            <div>Entry: 1.0850 | SL: 1.0810 (40 pips) | TP1: 1.0930 (80 pips) | TP2: 1.0980 (130 pips)</div>
            <div>R:R = 1:2 (TP1) and 1:3.25 (TP2)</div>
            <br />
            <div>Risk 1% = $5,000 × 1% = $50</div>
            <div>Mini lot pip value = $1</div>
            <div>Position Size = $50 / (40 × $1) = 1.25 mini lots</div>
            <br />
            <div className="text-gray-400 text-xs">// Exit plan:</div>
            <div className="text-gray-400">- Take profit 0.625 lots (50%) at TP1 = +$50 profit</div>
            <div className="text-gray-400">- Move SL to entry for remaining 0.625 lots</div>
            <div className="text-gray-400">- Let it run to TP2 = +$81 extra</div>
            <div className="text-gray-400 text-xs">// Max total profit = $131 with $50 risk → Actual R:R 1:2.6</div>
          </div>
          <Callout type="ok">✅ Forex weekend risk: Close trades on Friday before 22:00 or move SL to BE to avoid weekend gaps. Especially if there is major news (NFP, FOMC) over the weekend.</Callout>
        </ScenarioCard>

        <ScenarioCard icon="₿" title="Scenario: BTC/USDT D1, $5,000 account" badge="Highest Volatility" badgeColor="bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535]">
          <p className="text-[16.5px] text-gray-700 dark:text-[#9ca3b0] mb-4">Crypto is extremely volatile — BTC can drop 20% in 1 day. <strong>SL MUST be wider</strong> (3-8% from entry) or you will get swept constantly. Smaller position size to compensate for wide SL.</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// Crypto Position Sizing</div>
            <div>Entry: $60,000 | SL: $56,400 (6% down) | TP1: $67,200 (12%) | TP2: $72,000 (20%)</div>
            <br />
            <div className="text-gray-400 text-xs">// SL is much wider because Crypto is more volatile than Forex!</div>
            <div>Risk 1% = $50 (kept the same — do not increase risk because it's volatile)</div>
            <div>SL = $3,600 per BTC</div>
            <br />
            <div>Position Size = $50 / $3,600 = 0.0139 BTC ≈ $833 notional value</div>
            <div className="text-gray-400 text-xs">(Only using $833/$5,000 = 16.6% of account — the rest is buffer)</div>
            <br />
            <div className="text-gray-400 text-xs">// Important note for Crypto:</div>
            <div className="text-gray-400">- Do not trade small Altcoins with large position sizes (low liquidity)</div>
            <div className="text-gray-400">- Always use SL because Crypto is 24/7 — you can't "wait until morning"</div>
            <div className="text-gray-400">- Hack or regulatory news can drop price -30% in 1 hour</div>
          </div>
          <Callout type="bad">🚫 Crypto Leverage: Many exchanges offer 20x, 50x, 100x leverage. DO NOT USE &gt;5x leverage for Crypto. A 5% move with 20x leverage = 100% account loss in 1 candle.</Callout>
        </ScenarioCard>

        <ScenarioCard icon="🥇" title="Scenario: XAU/USD H4, $5,000 account" badge="Best fit for you" badgeColor="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]">
          <p className="text-[16.5px] text-gray-700 dark:text-[#9ca3b0] mb-4">Gold has medium volatility, strongly affected by USD, Fed rates, and geopolitics. You already have experience with Gold → ideal starting point for NNN system.</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// XAU/USD Position Sizing</div>
            <div>Entry: $2,000/oz | SL: $1,975 (25 pips/points) | TP1: $2,050 (50 pips) | TP2: $2,080 (80 pips)</div>
            <br />
            <div>Risk 1% = $50</div>
            <div>Pip/Point value for XAU mini = $1/point</div>
            <div>Position Size = $50 / (25 × $1) = 2 mini lots (= 2 oz)</div>
            <br />
            <div className="text-gray-400 text-xs">// Reality:</div>
            <div>TP1 Profit: 2oz × $50 = $100 (R:R = 1:2)</div>
            <div>TP2 Profit (after partial): 1oz × $80 = $80</div>
            <div>Total Profit: $180 with $50 risk</div>
            <br />
            <div className="text-gray-400 text-xs">// Gold news management:</div>
            <div className="text-gray-400">- Friday NFP: Gold can swing $20-50 in 5 minutes</div>
            <div className="text-gray-400">- FOMC: Huge volatility, spreads widen → close trades 1 hour before</div>
            <div className="text-gray-400">- Geopolitics: Gold spikes suddenly → do not short during unstable times</div>
          </div>
        </ScenarioCard>

        <ScenarioCard icon="📈" title="Scenario: FPT Stock (HoSE), 50,000,000 VND account" badge="Most Complex" badgeColor="bg-purple-100 dark:bg-[#9b59ff]/20 text-purple-700 dark:text-[#9b59ff]">
          <p className="text-[16.5px] text-gray-700 dark:text-[#9ca3b0] mb-4">Stocks have specific risks: company news, earnings, overnight gaps, low liquidity for small caps. <strong>Smaller position size</strong> than Forex/Gold due to overnight gap risk.</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// VN Stock Position Sizing</div>
            <div>Entry: 95,000 VND/share | SL: 90,250 (5% down) | TP: 107,000 (12.6% up)</div>
            <div>R:R ≈ 1:2.5</div>
            <br />
            <div>Risk 1% = 50,000,000 × 1% = 500,000 VND</div>
            <div>SL = 95,000 - 90,250 = 4,750 VND/share</div>
            <div>Number of shares = 500,000 / 4,750 = 105 shares</div>
            <div>Capital used = 105 × 95,000 = 9,975,000 VND (20% of account)</div>
            <br />
            <div className="text-gray-400 text-xs">// VN-Index specific notes:</div>
            <div className="text-gray-400">- T+3: buy today, can only sell 3 days later → no intraday</div>
            <div className="text-gray-400">- Price limit ±7% HOSE, ±10% HNX</div>
            <div className="text-gray-400">- Do not use margin during learning phase (high risk)</div>
            <div className="text-gray-400">- Earnings season: avoid trading 1-2 weeks before earnings reports</div>
          </div>
        </ScenarioCard>

        <SimpleQuiz
          q="You have a $3,000 account and want to apply the same rule: 2% risk/trade for both Forex (SL 40pips, $1/pip) and Crypto BTC (SL 5%). Calculate position size for both. Which trade has a larger notional value?"
          opts={['Forex is larger because pip value is larger', 'Forex: $60/(40×$1)=1.5 lots ($15,000 notional). BTC at $60k: $60/(5%×$60,000)=$60/$3,000=0.02 BTC ($1,200 notional). Forex is larger — but BTC volatility is higher so actual risk is equivalent', 'Crypto is larger because BTC price is higher', 'Both are equal because of 2% risk']}
          correctIdx={1}
          explanation="Both risk $60 (2% of $3k). But notional values differ because Crypto SL is based on a larger % of price."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 7 Summary</div>
          <ul className="space-y-2">
            {['Forex: most stable, SL 20-50pips, risk 1-2%, leverage 1:10-1:20 safe.', 'Crypto: most volatile, SL 3-8% of price, risk 0.5-1%, max leverage 1:5.', 'Gold: medium, watch NFP/FOMC, risk 1-2% is reasonable.', 'Stocks: overnight gap risk, T+3 for VN, no margin when learning.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "8. Risk Profile",
    content: (
      <>
        <SectionHead icon="🎭" title="Risk Appetite — Understand yourself before trading" desc="There is no 'best' money management strategy for everyone." />
        <Callout type="tip">The best strategy is one that fits YOUR finances, psychology, and goals. Right profile = comfortable, stress-free trading → better decisions → better results.</Callout>

        <SectionHead icon="🎭" title="3 Main Risk Profiles" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { icon: '🛡️', name: 'Conservative', color: 'blue', risk: 'Risk: 0.5–1% / trade', desc: 'Prioritize absolute capital preservation. Willing to sacrifice profit to minimize risk.', dd: '10%', target: '15–30%', suitable: 'New ≤1 year' },
            { icon: '⚖️', name: 'Moderate', color: 'green', risk: 'Risk: 1–2% / trade', desc: 'Balance between growth and preservation. Global standard for most traders.', dd: '20%', target: '30–60%', suitable: '6+ months exp' },
            { icon: '🔥', name: 'Aggressive', color: 'red', risk: 'Risk: 2–3% / trade', desc: 'Maximize growth. Accept large volatility for high returns.', dd: '30%', target: '60–100%+', suitable: '2+ years, risk capital' },
          ].map((p, i) => (
            <div key={i} className={`border-2 rounded-2xl p-5 bg-white dark:bg-[#181A20] ${p.color === 'blue' ? 'border-blue-300 dark:border-[#378ADD]' : p.color === 'green' ? 'border-green-400 dark:border-[#0ECB81]' : 'border-red-400 dark:border-[#F6465D]'}`}>
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className={`font-bold text-lg mb-1 ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.name}</div>
              <div className={`text-sm font-mono mb-3 ${p.color === 'blue' ? 'text-blue-600 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{p.risk}</div>
              <p className="text-[15.5px] text-gray-600 dark:text-[#9ca3b0] mb-4">{p.desc}</p>
              <div className="space-y-2 text-[14.5px] font-mono">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-[#848E9C]">Acceptable Max DD</span><span className={`font-bold ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.dd}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-[#848E9C]">Yearly Profit Target</span><span className={`font-bold ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.target}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-[#848E9C]">Suitable for</span><span className={`font-bold ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.suitable}</span></div>
              </div>
            </div>
          ))}
        </div>

        <SectionHead icon="📋" title="Trading Plan by Profile" />
        <CyberTable
          headers={['Category', '🛡️ Conservative', '⚖️ Moderate', '🔥 Aggressive']}
          rows={[
            ['Risk/trade', '0.5–1%', '1–2%', '2–3%'],
            ['Max concurrent trades', '2–3', '3–5', '5–8'],
            ['Daily loss limit', '−3%', '−5%', '−7%'],
            ['Weekly loss limit', '−5%', '−10%', '−15%'],
            ['Suitable markets', 'Forex, Gold', 'Forex, Gold, Top Crypto', 'All + Altcoins'],
            ['Minimum R:R', '1:2', '1:1.5', '1:1.5'],
            ['Trading frequency', '1–3 trades/week', '3–7 trades/week', 'Daily–multiple'],
          ]}
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 8 Summary</div>
          <ul className="space-y-2">
            {['Conservative: 0.5-1%, DD 10%, suitable for beginners and capital you cannot afford to lose.', 'Moderate: 1-2%, DD 20%, global standard after 6+ months experience.', 'Aggressive: 2-3%, DD 30%, only with risk capital and 2+ years experience.', 'Right profile = comfortable, stress-free trading → better decisions → better results.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 4: Risk Management", title: "9. Final Quiz",
    content: (
      <>
        <SectionHead icon="📝" title="Chapter 4 Final Quiz" desc="10 questions — Goal: 8/10 before continuing." />
        <Callout type="warn">This is the most important chapter — risk management decides whether a trader survives or disappears. Score at least 8/10 before moving to Chapter 5.</Callout>

        {[
          { q: 'Trader A has a 70% win rate but a 1:0.2 R:R (wins $20, loses $100). After 100 trades, is the trader profitable?', opts: ['Profitable because of 70% win rate', 'Not profitable — (70×$20)−(30×$100)=$1,400−$3,000=−$1,600. High win rate is not enough', 'Breakeven', 'Depends on the market'], ci: 1, ex: 'High win rate doesn\'t guarantee profit. Expectancy = (WR×Win)−(LR×Loss) = (0.7×20)−(0.3×100) = 14−30 = −$16/trade.' },
          { q: 'Account is $8,000. Risk 1.5%, SL = 60 pips, pip value = $1. What is the position size?', opts: ['3 lots', '2 lots', '8,000×1.5%=$120. Size=$120/(60×$1)=2 lots', '1.5 lots'], ci: 2, ex: 'Formula: Risk$=Acc×Risk%=$120. Size=Risk$/(SL×PipVal)=$120/60=2 lots.' },
          { q: 'After 8 consecutive losing trades with 5% risk, how much is left of a $10,000 account?', opts: ['$6,000', '$10,000×(0.95)^8=$6,634', '$7,200', '$5,000'], ci: 1, ex: 'Compound: $10,000×(0.95)^8≈$6,634. Lost 33.7% — this is why you don\'t risk >2%.' },
          { q: 'When are you allowed to increase risk from 1% to 2%?', opts: ['After 5 consecutive winning trades', 'After 3 months, 50+ trades with positive expectancy and DD within forecast', 'When feeling confident', 'After account grows 10%'], ci: 1, ex: 'Must meet ALL 4 conditions: time (3+ months), large enough sample (50+ trades), positive expectancy, DD within forecast.' },
          { q: 'What is the difference between Fixed Fractional and Fixed Risk?', opts: ['No difference', 'Fixed Fractional uses % of CURRENT account, Fixed Risk uses a fixed dollar amount — Fixed Fractional auto-adjusts with capital', 'Fixed Fractional is only for Forex', 'Fixed Risk is safer'], ci: 1, ex: 'Fixed Fractional: risk % of current balance → auto-increases when winning, decreases when losing. Fixed Risk (fixed $xx) doesn\'t adjust with capital.' },
          { q: 'What is Quarter Kelly with a 50% win rate and 1:2 R:R?', opts: ['25%', 'Full Kelly=(50%×2−50%)/2=25%. Quarter Kelly=25%/4=6.25%', '12.5%', '3%'], ci: 1, ex: 'Full Kelly=(WR×RR−LR)/RR=(0.5×2−0.5)/2=0.5/2=25%. Quarter Kelly=25%/4=6.25%. Safe and recommended.' },
          { q: 'What does safe pyramiding require before adding a trade?', opts: ['Price rises strongly', 'Original trade Moved to Break Even — no capital risk', '3 new converging signals', 'Account grows 5%'], ci: 1, ex: 'Mandatory: original trade must Move to BE before pyramiding. Added size must be ≤50% of previous trade.' },
          { q: 'What is the Daily Drawdown threshold to stop trading immediately?', opts: ['2%', '10%', '>3-5% in 1 day → stop immediately, no "recovering"', '1%'], ci: 2, ex: 'Circuit Breaker: Daily >3-5% → stop immediately. Weekly >7-10% → reduce size. Monthly >15-20% → stop for 2 weeks.' },
          { q: 'Crypto BTC, $5,000 account, risk 1%, SL 5%. Position size (BTC price $60,000)?', opts: ['0.1 BTC', '0.0167 BTC ($50/$3,000)', '0.05 BTC', '0.5 BTC'], ci: 1, ex: 'Risk$=$5,000×1%=$50. SL$=5%×$60,000=$3,000/BTC. Size=$50/$3,000=0.0167 BTC.' },
          { q: 'Who is the Conservative profile suitable for?', opts: ['3+ year trader wanting max profit', 'Beginners ≤1 year, risk 0.5-1%, max DD 10%', 'Trader wanting to trade daily', 'Someone with non-essential capital'], ci: 1, ex: 'Conservative: 0.5-1%/trade, max DD 10%, 1-3 trades/week. Best for beginners and capital you can\'t afford to lose.' },
        ].map((q, i) => (
          <SimpleQuiz key={i} q={`Question ${i + 1}: ${q.q}`} opts={q.opts} correctIdx={q.ci} explanation={q.ex} />
        ))}

        <ExerciseBox title="Preparation for Chapter 5 — Trading Psychology" desc="Before studying Chapter 5, set up your personal Trading Plan based on your Risk Profile:" steps={[
          { d: 'Determine your Risk Profile (Conservative/Moderate/Aggressive) from lesson 8. Write down: risk/trade, max concurrent trades, daily/weekly loss limit.' },
          { d: 'Create a Position Size Calculator for the market you will trade (Gold or Forex). Calculate position size for 5 different SL scenarios.' },
          { d: 'Set up personal Circuit Breaker rules: "If the account drops X% in a day/week/month, what will I do?" Write it down, print it, paste it next to your computer.' },
          { d: 'Backtest 20 trades on a demo chart with the exact risk profile you chose. See what the max drawdown is.' },
        ]} />
      </>
    )
  },
];

export default CHAPTER_4_DATA_EN;
