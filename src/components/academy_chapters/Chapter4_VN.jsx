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
          <Zap size={14} className="inline mr-1" /> CÂU HỎI KIỂM TRA
        </span>
      </div>
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 transition-colors ${letterClass}`}>{String.fromCharCode(65 + i)}</div>
                <span className="text-[16px] leading-[1.7] mt-1">{opt}</span>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className={`mt-6 p-6 rounded-2xl text-[16px] leading-relaxed ${selected === correctIdx ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {explanation}
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
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Simulator: Chuỗi thua liên tiếp</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Vốn ban đầu ($)</label>
            <input type="number" value={acc} onChange={e => setAcc(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Risk mỗi lệnh (%)</label>
            <input type="number" value={risk} step={0.5} onChange={e => setRisk(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Số lệnh thua liên tiếp</label>
            <input type="number" value={n} min={1} max={20} onChange={e => setN(Number(e.target.value) || 1)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>
        <div className="flex items-end gap-1 h-20 mb-4 bg-gray-100 dark:bg-[#181A20] rounded-xl px-4 py-3">
          {bars.map((b, i) => (
            <div key={i} className={`flex-1 rounded-t-sm opacity-90 transition-all ${barColor(b.pct)}`} style={{ height: `${Math.max(8, b.pct * 100)}%` }} title={`Lệnh ${i}: $${b.val}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Còn lại</div>
            <div className={`text-2xl font-black font-mono ${parseFloat(lostPct) > 30 ? 'text-red-600 dark:text-[#F6465D]' : parseFloat(lostPct) > 15 ? 'text-yellow-600 dark:text-[#FCD535]' : 'text-green-600 dark:text-[#0ECB81]'}`}>${finalVal.toFixed(0)}</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Đã mất</div>
            <div className="text-2xl font-black font-mono text-red-600 dark:text-[#F6465D]">-{lostPct}%</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Cần gỡ lại</div>
            <div className="text-2xl font-black font-mono text-yellow-600 dark:text-[#FCD535]">+{recovery}%</div>
          </div>
        </div>
        {parseFloat(lostPct) > 50 ? (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D] text-[14px] leading-relaxed border border-red-200 dark:border-[#F6465D]/30">
            💀 {n} lệnh thua với risk {risk}% = mất {lostPct}% tài khoản. Cần tăng +{recovery}% để về vốn — có thể mất nhiều năm.
          </div>
        ) : parseFloat(lostPct) > 20 ? (
          <div className="mt-4 p-4 rounded-2xl bg-yellow-50 dark:bg-[#FCD535]/10 text-yellow-800 dark:text-[#FCD535] text-[14px] leading-relaxed border border-yellow-200 dark:border-[#FCD535]/30">
            ⚠️ Mất {lostPct}% là đáng kể. Với risk {risk}%, chỉ cần {n} lệnh thua liên tiếp là DD đáng lo. Cân nhắc giảm risk xuống 1-2%.
          </div>
        ) : (
          <div className="mt-4 p-4 rounded-2xl bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81] text-[14px] leading-relaxed border border-green-200 dark:border-[#0ECB81]/30">
            ✅ {n} lệnh thua với risk {risk}% chỉ mất {lostPct}%. Có thể phục hồi bình thường. Đây là lý do dùng risk nhỏ.
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
        <Callout type="warn">Công thức: Risk Amount ($) = Account × Risk% / 100. Position Size = Risk Amount / (SL pip × Pip Value)</Callout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Tài khoản ($)</label>
            <input type="number" value={accBal} onChange={e => setAccBal(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Risk % mỗi lệnh</label>
            <input type="number" value={riskPct} step={0.1} min={0.1} max={10} onChange={e => setRiskPct(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Stop Loss (pip/điểm)</label>
            <input type="number" value={sl} onChange={e => setSl(Number(e.target.value) || 0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Pip Value ($)</label>
            <select value={pipVal} onChange={e => setPipVal(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white outline-none transition-colors">
              <option value={1}>$1 — Mini lot (EUR/USD, GBP/USD)</option>
              <option value={0.1}>$0.1 — Micro lot</option>
              <option value={10}>$10 — Standard lot</option>
              <option value={0.01}>$0.01 — Cent lot (học mới)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Tiền rủi ro</div>
            <div className="text-2xl font-black font-mono text-yellow-600 dark:text-[#FCD535]">${riskAmt.toFixed(2)}</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Position Size</div>
            <div className="text-2xl font-black font-mono text-green-600 dark:text-[#0ECB81]">{size.toFixed(2)} lot</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">% Tài khoản</div>
            <div className="text-2xl font-black font-mono text-black dark:text-white">{riskPct}%</div>
          </div>
        </div>
        {riskPct > 3 && <div className="mt-4 p-4 rounded-2xl bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D] text-[14px] border border-red-200 dark:border-[#F6465D]/30">⚠️ Risk {riskPct}% là quá cao cho người mới. Khuyến nghị 1-2%.</div>}
        {riskPct >= 1 && riskPct <= 3 && <div className="mt-4 p-4 rounded-2xl bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81] text-[14px] border border-green-200 dark:border-[#0ECB81]/30">✅ Risk {riskPct}% là phù hợp. Size {size.toFixed(2)} lot, risk ${riskAmt.toFixed(2)}.</div>}
        {riskPct < 1 && <div className="mt-4 p-4 rounded-2xl bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] text-[14px] border border-blue-200 dark:border-[#378ADD]/30">🛡️ Risk {riskPct}% rất an toàn — phù hợp giai đoạn mới học.</div>}
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
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Win Rate (%)</label>
            <input type="number" value={winRate} min={1} max={99} onChange={e => setWinRate(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Lời TB mỗi lệnh ($)</label>
            <input type="number" value={avgWin} onChange={e => setAvgWin(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Lỗ TB mỗi lệnh ($)</label>
            <input type="number" value={avgLoss} onChange={e => setAvgLoss(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">R:R Ratio</div>
            <div className="text-2xl font-black font-mono text-green-600 dark:text-[#0ECB81]">1:{rr.toFixed(1)}</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">Kỳ vọng/lệnh</div>
            <div className={`text-2xl font-black font-mono ${expectancy >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{expectancy >= 0 ? '+' : ''}{expectancy.toFixed(1)}$</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-2">100 lệnh = ?</div>
            <div className={`text-2xl font-black font-mono ${per100 >= 0 ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{per100 >= 0 ? '+' : ''}{per100.toFixed(0)}$</div>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-2xl bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] text-[14px] border border-blue-200 dark:border-[#378ADD]/30">
          📊 Với R:R 1:{rr.toFixed(1)}, bạn chỉ cần win rate tối thiểu <strong>{breakeven}%</strong> để hòa vốn.
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
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Win Rate (%)</label>
            <input type="number" value={wr} onChange={e => setWr(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Avg Thắng ($)</label>
            <input type="number" value={avgW} onChange={e => setAvgW(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Avg Thua ($)</label>
            <input type="number" value={avgL} onChange={e => setAvgL(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-1">Full Kelly</div>
            <div className="text-2xl font-black font-mono text-red-600 dark:text-[#F6465D]">{fullKelly.toFixed(1)}%</div>
            <div className="text-[10px] text-red-500 mt-1">⚠️ Quá rủi ro</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-1">Half Kelly</div>
            <div className="text-2xl font-black font-mono text-yellow-600 dark:text-[#FCD535]">{halfKelly.toFixed(1)}%</div>
            <div className="text-[10px] text-yellow-600 dark:text-[#FCD535] mt-1">Chuyên nghiệp</div>
          </div>
          <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-[#848E9C] mb-1">Quarter Kelly</div>
            <div className="text-2xl font-black font-mono text-green-600 dark:text-[#0ECB81]">{quarterKelly.toFixed(1)}%</div>
            <div className="text-[10px] text-green-600 dark:text-[#0ECB81] mt-1">Khuyến nghị</div>
          </div>
        </div>
        <div className="mb-2 text-xs font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest">Vùng an toàn</div>
        <div className="h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 relative mb-2">
          <div className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-white dark:bg-white rounded-full shadow-lg" style={{ left: `${Math.min(kellyLeft * 4, 100)}%` }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-gray-500 dark:text-[#848E9C]">
          <span>0% Quá thận trọng</span><span>Vùng tối ưu</span><span>100% Tự sát tài chính</span>
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
        <span className="font-bold text-[16px] text-black dark:text-white flex-1">{title}</span>
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
  const sequence = ['W','W','L','W','W','W','L','L','W','W'];
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
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Risk cơ bản (%)</label>
            <input type="number" value={base} step={0.5} onChange={e => setBase(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Tăng sau thắng (%)</label>
            <select value={inc} onChange={e => setInc(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white outline-none transition-colors">
              <option value={0.25}>+0.25% mỗi chuỗi thắng</option>
              <option value={0.5}>+0.5% mỗi chuỗi thắng</option>
              <option value={1}>+1% mỗi chuỗi thắng</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto border border-gray-200 dark:border-[#2B3139] rounded-2xl">
          <table className="w-full text-left min-w-[400px]">
            <thead><tr className="bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C] text-xs uppercase tracking-widest border-b border-gray-200 dark:border-[#2B3139]">
              <th className="p-3 font-black">Lệnh</th><th className="p-3 font-black">Kết quả</th><th className="p-3 font-black">Risk %</th><th className="p-3 font-black">Thay đổi ($)</th><th className="p-3 font-black">Số dư ($)</th>
            </tr></thead>
            <tbody className="text-[14px]">
              {rows.map(row => (
                <tr key={row.i} className="border-b border-gray-100 dark:border-[#2B3139]/50 last:border-0">
                  <td className="p-3 font-mono font-bold text-gray-700 dark:text-[#848E9C]">#{row.i + 1}</td>
                  <td className="p-3"><span className={`px-2 py-1 rounded-lg text-xs font-black ${row.r === 'W' ? 'bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]' : 'bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]'}`}>{row.r === 'W' ? '✅ Thắng' : '❌ Thua'}</span></td>
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
const CHAPTER_4_DATA = [
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "0. Tại sao Quản lý vốn là số 1?",
    content: (
      <>
        <SectionHead icon={<DollarSign size={16} />} title="Tại sao Quản lý vốn quan trọng hơn kỹ thuật?" desc="80% trader thua lỗ không phải vì không biết phân tích — mà vì không kiểm soát được số tiền họ đặt cược." />
        <StoryBox label="🎯 Câu đố tư duy" icon="🎯">
          Bạn có 2 trader:<br /><br />
          <strong>Trader A:</strong> Win rate 70% (thắng 7/10 lệnh). Nhưng mỗi lệnh thắng +$100, mỗi lệnh thua −$500. Sau 10 lệnh: thắng 7 × $100 = $700. Thua 3 × $500 = $1,500. <strong>Kết quả: −$800.</strong><br /><br />
          <strong>Trader B:</strong> Win rate 40% (thắng 4/10 lệnh). Nhưng mỗi lệnh thắng +$300, mỗi lệnh thua −$100. Sau 10 lệnh: thắng 4 × $300 = $1,200. Thua 6 × $100 = $600. <strong>Kết quả: +$600.</strong><br /><br />
          Ai thắng? Trader B — dù thắng ít hơn 30% số lệnh. <em>Win rate không phải tất cả. Kỷ luật quản lý vốn mới quyết định.</em>
        </StoryBox>

        <SectionHead icon={<BarChart2 size={16} />} title="Số học của sự sụp đổ" desc="Một khi đã mất nhiều, rất khó gỡ lại" />
        <CyberTable
          headers={["Mất bao nhiêu", "Cần gỡ bao nhiêu"]}
          rows={[
            ["Mất 10% tài khoản", "Cần +11% để về bằng vốn"],
            ["Mất 25% tài khoản", "Cần +33% để về bằng vốn"],
            ["Mất 50% tài khoản", "<span class='text-red-600 dark:text-[#F6465D] font-bold'>Cần +100% để về bằng vốn!</span>"],
          ]}
        />

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Để về bằng vốn sau drawdown:</div>
          <div>Recovery % = (1 / (1 - Drawdown%)) - 1</div>
          <br />
          <div className="text-gray-400 text-xs">// Ví dụ: Mất 50% → $10,000 còn $5,000</div>
          <div className="text-gray-400 text-xs">// Cần tăng 100% từ $5,000 để về lại $10,000</div>
          <div className="text-gray-400 text-xs">// Nhưng thị trường trung bình tăng 10-30%/năm...</div>
          <div className="text-gray-400 text-xs">// → Mất 50% = mất 2-5 năm để gỡ lại (nếu may mắn)</div>
        </div>

        <SectionHead icon="💀" title="3 cách phổ biến nhất blowup account" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Risk quá lớn mỗi lệnh (10-30% tài khoản):</strong> 3-5 lệnh thua liên tiếp = hết tài khoản. Không thể tránh chuỗi thua — thị trường luôn có giai đoạn bất lợi.</> },
            { n: '2', text: <><strong>Không đặt Stop Loss:</strong> "Lần này giá sẽ quay lại..." — lỗ nhỏ thành lỗ lớn thành không còn vốn để giao dịch tiếp.</> },
            { n: '3', text: <><strong>Revenge trading sau thua lỗ:</strong> Thua $200 → vào lệnh $500 để gỡ → thua $500 → vào $1,000... Vòng xoáy tử thần của cảm xúc.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-[#F6465D]/20 text-red-600 dark:text-[#F6465D] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <LossStreakSim />

        <Callout type="ok" title="Kết luận:">Quản lý vốn không phải để kiếm nhiều hơn — mà để <em>tồn tại đủ lâu</em> để kỹ thuật và kinh nghiệm phát huy tác dụng. Trader sống sót lâu nhất mới thắng.</Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 0</div>
          <ul className="space-y-2">
            {['Win rate cao không đảm bảo có lời — R:R và kỷ luật quản lý vốn mới quyết định.', 'Mất 50% tài khoản cần +100% để hoàn vốn — toán học bất đối xứng cực kỳ nguy hiểm.', '3 cách blowup: risk quá lớn, không SL, revenge trading. Tránh được 3 điều này = đã hơn 80% trader.', 'Mục tiêu quản lý vốn: tồn tại đủ lâu, không phải làm giàu nhanh.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "1. Quy tắc 1-2% & Position Sizing",
    content: (
      <>
        <SectionHead icon={<Shield size={16} />} title="Quy tắc 1-2% — Giải thích cho trẻ lớp 1" desc="Đây là quy tắc đơn giản nhất nhưng bị vi phạm nhiều nhất." />
        <StoryBox label="🍬 Ví dụ kẹo" icon="🍬">
          Bạn có <strong>100 viên kẹo</strong>. Mỗi ngày bạn chơi 1 trò chơi may rủi. Nếu dùng quy tắc <strong>1%</strong>: mỗi lần chỉ cược tối đa <strong>1 viên kẹo</strong>.<br /><br />
          Dù thua 10 lần liên tiếp, bạn vẫn còn ~90 viên. Bạn có thể tiếp tục chơi và gỡ lại.<br /><br />
          Nếu cược 10 viên mỗi lần và thua 10 lần liên tiếp → <strong>mất hết kẹo, trò chơi kết thúc.</strong><br /><br />
          Trading hoạt động y hệt vậy. 1-2% = 1-2 viên kẹo mỗi lần chơi.
        </StoryBox>

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Công thức Position Size</div>
          <div>Risk Amount ($) = Account Balance × Risk% / 100</div>
          <div>Position Size = Risk Amount / (Stop Loss pips × Pip Value)</div>
          <br />
          <div className="text-gray-400 text-xs">// Ví dụ thực tế:</div>
          <div className="text-gray-400 text-xs">// Tài khoản: $5,000 | Risk: 1% | SL: 40 pip | EUR/USD mini lot (pip = $1)</div>
          <div>Risk Amount = $5,000 × 1% = $50</div>
          <div>Position Size = $50 / (40 × $1) = 1.25 mini lots</div>
        </div>

        <PositionSizeCalc />

        <SimpleQuiz
          q="Câu 1: Tài khoản $3,000. Bạn muốn vào BUY EUR/USD, SL = 50 pip, pip value = $1 (mini lot). Áp dụng risk 2%, position size là bao nhiêu?"
          opts={['3 mini lot', '1.2 mini lot ($3,000×2%=$60; $60÷50pip=$1.2)', '0.6 mini lot', '2 mini lot']}
          correctIdx={1}
          explanation="Công thức: Risk$=Acc×Risk%. Size=Risk$/(SL×PipVal) = $60/(50×1)=1.2 lot."
        />

        <SimpleQuiz
          q="Câu 2: Trader A dùng risk 5%/lệnh. Trader B dùng 1%/lệnh. Cả 2 thua 8 lệnh liên tiếp. Tài khoản $10,000 ban đầu — tài khoản còn lại của mỗi người là bao nhiêu?"
          opts={['Trader A: $6,000 | Trader B: $9,200', 'Trader A: ~$6,634 | Trader B: ~$9,227 — A mất 33%, B chỉ mất 7.7%', 'Cả 2 mất giống nhau vì cùng số lệnh thua', 'Trader A: $5,000 | Trader B: $9,000']}
          correctIdx={1}
          explanation="Compound effect: A: $10k×(0.95)^8≈$6,634. B: $10k×(0.99)^8≈$9,227. Fixed fractional compound theo mỗi lệnh."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 1</div>
          <ul className="space-y-2">
            {['Risk 1-2% mỗi lệnh = quy tắc vàng. Người mới nên bắt đầu với 0.5-1%.', 'Position Size = (Tài khoản × Risk%) ÷ (SL pip × Pip Value). Tính trước khi vào lệnh, không đoán.', 'Risk % ảnh hưởng phi tuyến tính: 5% risk × 8 thua = mất 33% tài khoản. 1% risk × 8 thua = chỉ mất 7.7%.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "2. Risk:Reward thực chiến",
    content: (
      <>
        <SectionHead icon={<Scale size={16} />} title="R:R — Toán học của lợi nhuận" desc="R:R quyết định bạn cần win rate bao nhiêu để có lời." />
        <StoryBox label="🎲 Trò chơi đồng xu" icon="🎲">
          Tung đồng xu: mặt ngửa thắng $30, mặt sấp thua $10. R:R = 1:3.<br /><br />
          Xác suất mặt ngửa/sấp đều là 50%. Kỳ vọng mỗi lần chơi = (50% × $30) − (50% × $10) = $15 − $5 = <strong>+$10 mỗi lần chơi.</strong><br /><br />
          Bạn có thể thua 4 lần liên tiếp và vẫn kiếm tiền sau 10 lần nếu R:R đủ tốt. <em>Trading hoạt động y hệt vậy.</em>
        </StoryBox>

        <ExpectancyCalc />

        <SectionHead icon="🎯" title="Các kỹ thuật Exit thông minh" />
        <CyberTable
          headers={['Kỹ thuật', 'Mô tả', 'Ưu điểm', 'Dùng khi nào']}
          rows={[
            ['Hard TP/SL', 'Đặt cố định TP và SL ngay khi vào lệnh', 'Kỷ luật, không cần theo dõi', 'Swing trade, người mới'],
            ['Partial Exit', 'Chốt 50% tại TP1, để 50% chạy đến TP2', 'Bảo đảm lợi nhuận + tận dụng momentum', 'Setup NNN Fibonacci'],
            ['Move to BE', 'Khi lời 1R, dời SL về entry', 'Lệnh không thể thua, stress-free', 'Sau khi đạt 1:1'],
            ['Trailing Stop', 'SL tự động theo sau giá', 'Tận dụng xu hướng dài', 'Trending market mạnh'],
            ['Time-based Exit', 'Đóng lệnh sau X giờ/ngày nếu chưa về TP', 'Giải phóng vốn, tránh lệnh "kẹt"', 'Intraday, news trading'],
          ]}
        />

        <SimpleQuiz
          q="Câu 1: Hệ thống có win rate 35%, R:R = 1:3 (thua $50, thắng $150). Kỳ vọng mỗi lệnh là bao nhiêu?"
          opts={['Âm — vì win rate thấp hơn 50%', '+$20/lệnh — (35%×$150)−(65%×$50) = $52.5−$32.5 = +$20', '−$15/lệnh', '$0 — hòa vốn']}
          correctIdx={1}
          explanation="Kỳ vọng=(WR×avgWin)−((1-WR)×avgLoss)=(0.35×150)−(0.65×50)=52.5−32.5=+$20. Win rate 35% VẪN có lời khi R:R đủ tốt!"
        />

        <SimpleQuiz
          q="Câu 2: Bạn đang giữ lệnh BUY vàng, đã lời 1R (giá đi đúng hướng bằng mức SL). Bước tiếp theo tốt nhất theo nguyên tắc quản lý lệnh là gì?"
          opts={['Đóng toàn bộ ngay để chắc ăn', 'Dời SL về điểm entry (Break Even) — lệnh không thể thua nữa, để giá chạy đến TP2', 'Mở thêm lệnh Buy vì giá đang tăng', 'Không làm gì, chờ đến TP2']}
          correctIdx={1}
          explanation="Move to BE sau 1R là bước quan trọng nhất để bảo vệ lợi nhuận và giữ lệnh không stress."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 2</div>
          <ul className="space-y-2">
            {['R:R = Lợi nhuận kỳ vọng / Rủi ro. R:R 1:2 = chỉ cần thắng 34% để có lời.', 'Kỳ vọng = (Win%×TB thắng) − (Loss%×TB thua). Phải dương mới chơi.', 'Kỹ thuật tốt nhất: Partial Exit (50% TP1) + Move to BE + để 50% chạy đến TP2.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "3. Khi nào tăng risk?",
    content: (
      <>
        <SectionHead icon="🚦" title="4 điều kiện để tăng risk" desc="Phải thỏa MẤT CẢ — không phải chỉ 1-2" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Thời gian tối thiểu:</strong> Đã giao dịch ít nhất <em>3 tháng liên tục</em> với kết quả ổn định (không phải 1 tháng thắng lớn rồi tăng ngay).</> },
            { n: '2', text: <><strong>Mẫu đủ lớn:</strong> Ít nhất <em>50 lệnh</em> đã hoàn thành với dữ liệu rõ ràng trong trading journal. Win rate và R:R thực tế đã tính toán.</> },
            { n: '3', text: <><strong>Hệ thống dương nhất quán:</strong> Kỳ vọng (Expectancy) dương sau 50+ lệnh. <em>Không phải nhờ may mắn 1-2 lệnh lớn</em> — phải ổn định.</> },
            { n: '4', text: <><strong>Max Drawdown nằm trong dự báo:</strong> Drawdown tối đa thực tế không vượt quá drawdown tối đa cho phép bạn đã tự định trước.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <SectionHead icon="📐" title="Anti-Martingale — Tăng risk khi thắng, giảm khi thua" />
        <StoryBox label="⚠️ Martingale vs Anti-Martingale" icon="⚖️">
          <strong>Martingale (SAI):</strong> Thua → tăng gấp đôi lần sau để "gỡ". Đây là con đường tử thần — 1 chuỗi thua dài là đủ để blowup account.<br /><br />
          <strong>Anti-Martingale (ĐÚNG):</strong> Thắng → tăng size nhẹ. Thua → giảm size. Nguyên tắc: <em>"chơi lớn khi đang thắng, chơi nhỏ khi đang thua."</em> Bảo vệ vốn khi thị trường bất lợi, tận dụng khi thị trường ủng hộ.
        </StoryBox>

        <AntiMartingaleSim />

        <SectionHead icon="📊" title="Lộ trình tăng risk theo từng giai đoạn" />
        <CyberTable
          headers={['Giai đoạn', 'Kinh nghiệm', 'Risk/lệnh', 'Max DD cho phép', 'Điều kiện lên giai đoạn tiếp']}
          rows={[
            ["<span class='text-blue-600 dark:text-[#378ADD] font-bold'>NEWBIE</span>", '0–3 tháng', '0.5–1%', '10%', 'profit factor >1.2'],
            ["<span class='text-green-600 dark:text-[#0ECB81] font-bold'>BEGINNER</span>", '3–12 tháng', '1–1.5%', '15%', '3 tháng live consecutive profit + DD <15%'],
            ["<span class='text-yellow-600 dark:text-[#FCD535] font-bold'>INTERMEDIATE</span>", '1–3 năm', '1.5–2%', '20%', '1 năm consistent + Sharpe ratio >1'],
            ["<span class='text-purple-600 dark:text-[#9b59ff] font-bold'>ADVANCED</span>", '3+ năm', '2–3%', '25%', 'Hệ thống được kiểm chứng qua nhiều chu kỳ thị trường'],
            ["<span class='text-red-600 dark:text-[#F6465D] font-bold'>NEVER</span>", 'Bất kỳ', '>5%', '—', 'Không bao giờ — trừ khi bạn là quỹ đầu tư chuyên nghiệp với hệ thống hedging'],
          ]}
        />

        <Callout type="bad" title="Cạm bẫy phổ biến nhất:">Thắng 3-5 lệnh liên tiếp → cảm giác "mình đang hot" → tăng size gấp đôi → lệnh tiếp theo thua → mất toàn bộ profit của 5 lệnh trước. Đây là "Trader's Ruin" — phá hủy tài khoản không phải do thua lỗ mà do quản lý position size sai.</Callout>

        <SimpleQuiz
          q="Bạn đang giao dịch được 2 tháng, vừa thắng 5 lệnh liên tiếp, tài khoản tăng 15%. Bạn muốn tăng risk từ 1% lên 3% vì 'đang vào guồng'. Quyết định này có đúng không?"
          opts={['Đúng — đang thắng thì nên tận dụng momentum', 'Không — chưa đủ 3 tháng và 50 lệnh để có dữ liệu đáng tin cậy. 5 lệnh thắng có thể là may mắn ngẫu nhiên. Tăng nhẹ lên 1.5% nếu muốn, nhưng không nhảy lên 3%', 'Đúng — 5 lệnh thắng là bằng chứng hệ thống đang tốt', 'Nên giảm risk xuống 0.5% vì sẽ sớm có chuỗi thua']}
          correctIdx={1}
          explanation="5 lệnh = thống kê không đáng tin. Cần ít nhất 50 lệnh để có dữ liệu có ý nghĩa thống kê."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 3</div>
          <ul className="space-y-2">
            {['Tăng risk chỉ khi: 3+ tháng, 50+ lệnh, kỳ vọng dương nhất quán, DD trong dự báo.', 'Anti-Martingale: tăng size khi chuỗi thắng, giảm khi chuỗi thua. Ngược Martingale.', 'Lộ trình: 0.5-1% (newbie) → 1-2% (intermediate) → 2-3% (advanced). Không bao giờ >5%.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "4. Fixed Fractional & Kelly",
    content: (
      <>
        <SectionHead icon="🔒" title="Fixed Fractional — Phương pháp an toàn nhất" />
        <p className="text-[16px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          Đây chính xác là quy tắc 1-2% bạn đã học, nhưng được hệ thống hóa thành phương pháp đầy đủ. <strong className="text-black dark:text-white">Fixed Fractional</strong> = luôn risk một tỷ lệ cố định của tài khoản HIỆN TẠI (không phải tài khoản ban đầu).
        </p>

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Fixed Fractional</div>
          <div>Risk per trade = Account Balance (hiện tại) × Fixed %</div>
          <br />
          <div className="text-gray-400 text-xs">// Ví dụ diễn biến:</div>
          <div>Tháng 1: Acc=$10,000 → Risk 1% = $100/lệnh</div>
          <div>Tháng 3: Acc=$12,000 → Risk 1% = $120/lệnh (tự động tăng theo vốn)</div>
          <div>Tháng 6: Acc=$9,000 → Risk 1% = $90/lệnh (tự động giảm khi thua)</div>
          <br />
          <div className="text-gray-400 text-xs">// LỢI THẾ: Không bao giờ blowup về 0 về lý thuyết</div>
          <div className="text-gray-400 text-xs">// Khi tài khoản giảm → size tự động giảm → bảo vệ vốn tự động</div>
        </div>

        <SectionHead icon="📐" title="Kelly Criterion — Tối ưu hóa tăng trưởng" />
        <StoryBox label="📡 Được phát triển bởi John L. Kelly Jr. (Bell Labs, 1956)" icon="📡">
          Công thức Kelly tính ra <strong>tỷ lệ tối ưu để đặt cược</strong> sao cho tài khoản tăng trưởng nhanh nhất về dài hạn. Được dùng bởi các quỹ hedge fund lớn nhất thế giới.
        </StoryBox>

        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Kelly Formula</div>
          <div>K% = (Win Rate × (1 + RR) - 1) / RR</div>
          <br />
          <div className="text-gray-400 text-xs">// Đơn giản hơn: K% = (Win% × Avg_Win - Loss% × Avg_Loss) / Avg_Win</div>
          <br />
          <div className="text-gray-400 text-xs">// Ví dụ: Win rate 45%, R:R = 1:2 (thua $50, thắng $100)</div>
          <div>K% = (0.45 × 2 - 0.55) / 2 = (0.9 - 0.55) / 2 = 17.5%</div>
          <br />
          <div className="text-gray-400 text-xs">// Nhưng ĐỪNG BAO GIỜ dùng Full Kelly!</div>
          <div className="text-gray-400 text-xs">// Half Kelly (8.75%) hoặc Quarter Kelly (4.4%) an toàn hơn nhiều</div>
        </div>

        <KellyCalc />

        <Callout type="warn" title="Tại sao không dùng Full Kelly?">Full Kelly tối ưu hóa tăng trưởng nhưng tạo ra biến động tài khoản cực kỳ lớn (drawdown 50-70% là bình thường). Hầu hết người không chịu được tâm lý khi nhìn tài khoản giảm 50%. Half hoặc Quarter Kelly cho kết quả gần bằng nhưng biến động nhỏ hơn nhiều.</Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 4</div>
          <ul className="space-y-2">
            {['Fixed Fractional: risk % cố định của tài khoản hiện tại — đơn giản, bền vững, tự động bảo vệ.', 'Kelly Criterion: công thức tính size tối ưu dựa trên win rate và R:R thực tế.', 'Dùng Quarter Kelly (25% Kelly) = an toàn nhất. Full Kelly = quá rủi ro về tâm lý.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "5. Pyramiding & Scaling",
    content: (
      <>
        <SectionHead icon="🔺" title="Pyramiding — Thêm vào lệnh đang thắng" desc="Khi làm đúng, nó biến một lệnh tốt thành lợi nhuận xuất sắc." />
        <StoryBox label="🎰 Kim tự tháp ngược vs Kim tự tháp thuận" icon="🔺">
          <strong>Pyramiding SAI (nguy hiểm):</strong> Thêm lệnh lớn hơn sau mỗi lệnh — như kim tự tháp ngược. Lệnh đầu 1 lot, lệnh 2 là 2 lot, lệnh 3 là 4 lot... Khi giá đảo chiều, lệnh lớn nhất ở đỉnh sẽ hủy toàn bộ lợi nhuận.<br /><br />
          <strong>Pyramiding ĐÚNG (kim tự tháp thuận):</strong> Mỗi lệnh thêm vào nhỏ hơn lệnh trước — như kim tự tháp bình thường. Đáy to (lệnh đầu), ngọn nhỏ (lệnh sau). Tổng rủi ro không tăng.
        </StoryBox>

        <div className="my-6">
          <div className="text-xs font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-4">Kim tự tháp ĐÚNG (safe pyramiding)</div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center rounded-lg text-white text-sm font-bold py-2 bg-green-500 dark:bg-[#0ECB81]" style={{width:'80%'}}>Lệnh 1: 1.0 lot (Entry gốc)</div>
            <div className="flex items-center justify-center rounded-lg text-white text-sm font-bold py-2 bg-green-400 dark:bg-[#0ECB81]/70" style={{width:'55%'}}>Lệnh 2: 0.5 lot (Breakout xác nhận)</div>
            <div className="flex items-center justify-center rounded-lg text-white text-xs font-bold py-2 bg-green-300 dark:bg-[#0ECB81]/45" style={{width:'35%'}}>Lệnh 3: 0.25 lot (Tiếp diễn)</div>
          </div>
        </div>

        <SectionHead icon="📋" title="Quy tắc Pyramiding an toàn" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Chỉ thêm khi lệnh đầu đã Move to Break Even.</strong> Lệnh gốc không còn rủi ro → thêm lệnh mới chỉ ảnh hưởng đến lợi nhuận tiềm năng, không ảnh hưởng đến vốn gốc.</> },
            { n: '2', text: <><strong>Mỗi lệnh sau nhỏ hơn 50% lệnh trước.</strong> Lệnh 1 = 1 lot → Lệnh 2 = 0.5 lot → Lệnh 3 = 0.25 lot. Giữ tổng risk trong giới hạn 2-3% tài khoản.</> },
            { n: '3', text: <><strong>Chỉ thêm tại điểm kỹ thuật hợp lý.</strong> Tại breakout S/R mới, tại pullback về EMA21 trong xu hướng tiếp diễn — không thêm "vì giá đang tăng".</> },
            { n: '4', text: <><strong>Trailing Stop cho toàn bộ vị thế.</strong> Khi đã có 2-3 lệnh, dùng trailing stop để khóa lợi nhuận tổng thể. Không để "pyramid đẹp" biến thành thua lỗ.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <SimpleQuiz
          q="Bạn vào BUY vàng 1 lot ở $2,000. Giá tăng lên $2,030, bạn Move to BE. Tiếp tục tăng lên $2,060 với breakout kháng cự. Bạn muốn pyramid thêm. Kích thước lệnh thứ 2 hợp lý là?"
          opts={['2 lot — vì giá đang mạnh, nên tăng kép', '0.5 lot — bằng 50% lệnh đầu, an toàn và vẫn tận dụng được xu hướng', '1 lot — bằng lệnh đầu', 'Không thêm gì — pyramiding quá rủi ro']}
          correctIdx={1}
          explanation="Kim tự tháp thuận: mỗi lệnh thêm nhỏ hơn lệnh trước ≤50%. 0.5 lot là chuẩn."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 5</div>
          <ul className="space-y-2">
            {['Pyramid thuận (kim tự tháp bình thường): lệnh đầu lớn nhất, thêm dần nhỏ hơn.', 'Chỉ pyramid sau khi đã Move to BE lệnh gốc. Mỗi lệnh thêm ≤50% lệnh trước.', 'Dùng trailing stop cho toàn bộ vị thế pyramid.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "6. Drawdown Management",
    content: (
      <>
        <SectionHead icon={<TrendingDown size={16} />} title="Drawdown — Quản lý giai đoạn thua lỗ" desc="Không có trader nào không trải qua drawdown." />
        <CyberTable
          headers={['Loại', 'Định nghĩa', 'Ngưỡng nguy hiểm', 'Hành động']}
          rows={[
            ['Current DD', '% giảm từ đỉnh tài khoản gần nhất đến giá trị hiện tại', '>15%', 'Giảm size xuống 50%'],
            ['Max DD', '% giảm lớn nhất từ đỉnh đến đáy trong toàn bộ lịch sử giao dịch', '>25%', 'Dừng giao dịch, review hệ thống'],
            ['Daily DD', '% mất trong 1 ngày giao dịch', '>5%', 'Dừng ngay hôm đó, không trade thêm'],
          ]}
        />

        <SectionHead icon="🚦" title="Quy tắc Circuit Breaker — Khi nào dừng lại" />
        <div className="space-y-4 my-6">
          {[
            { icon: '⚠️', color: 'yellow', text: <><strong>Daily Loss Limit (−3-5%):</strong> Thua 3-5% trong 1 ngày → <em>dừng giao dịch ngay</em>. Đóng máy. Ra ngoài. Không "gỡ" trong ngày đó. Không thương lượng.</> },
            { icon: '⚠️', color: 'yellow', text: <><strong>Weekly Loss Limit (−7-10%):</strong> Thua 7-10% trong 1 tuần → Giảm size xuống 50% tuần tiếp theo. Review toàn bộ lệnh đã thực hiện.</> },
            { icon: '🛑', color: 'red', text: <><strong>Monthly Loss Limit (−15-20%):</strong> Thua &gt;15% trong 1 tháng → <em>Dừng giao dịch hoàn toàn 2 tuần</em>. Review hệ thống, không phải chỉ từng lệnh. Điều gì đó trong market condition đã thay đổi.</> },
            { icon: '🚨', color: 'red', text: <><strong>Maximum Drawdown (−25-30%):</strong> Ngừng toàn bộ. 1 tháng không giao dịch. Đọc lại toàn bộ Trading Journal. Tìm coach hoặc mentor. Hệ thống hoặc bản thân có vấn đề nghiêm trọng.</> },
          ].map((s, i) => (
            <div key={i} className={`flex gap-4 items-start p-4 rounded-xl ${s.color === 'red' ? 'bg-red-50 dark:bg-[#F6465D]/10 border border-red-200 dark:border-[#F6465D]/30' : 'bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30'}`}>
              <span className="text-2xl shrink-0">{s.icon}</span>
              <div className={`text-[15px] leading-[1.8] ${s.color === 'red' ? 'text-red-800 dark:text-[#F6465D]' : 'text-yellow-800 dark:text-[#FCD535]'}`}>{s.text}</div>
            </div>
          ))}
        </div>

        <SectionHead icon={<RefreshCw size={16} />} title="Quy trình phục hồi sau drawdown" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Nghỉ ngơi bắt buộc:</strong> DD 5-10% → nghỉ 24h. DD 10-20% → nghỉ 1 tuần. DD &gt;20% → nghỉ 2-4 tuần. Não bộ cần reset trước khi có thể quyết định tốt.</> },
            { n: '2', text: <><strong>Review Journal không cảm xúc:</strong> Xem lại từng lệnh thua. Phân loại: (A) Thua đúng hệ thống (market điều kiện xấu — chấp nhận được), (B) Thua vì vi phạm quy tắc (cần khắc phục). Chỉ lo lắng về loại B.</> },
            { n: '3', text: <><strong>Quay lại với size nhỏ hơn:</strong> Sau DD &gt;15%, bắt đầu lại với 50% size bình thường. Tăng dần lên 100% sau khi đạt lại đỉnh tài khoản hoặc giao dịch ổn định 20 lệnh tiếp theo.</> },
            { n: '4', text: <><strong>Focus vào process, không phải profit:</strong> Trong giai đoạn phục hồi, đánh giá thành công bằng "tôi có tuân thủ hệ thống không?" chứ không phải "tôi có lời không?"</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 6</div>
          <ul className="space-y-2">
            {['3 loại DD: Current, Max, Daily. Circuit Breaker: Daily >5% → dừng ngày; Monthly >20% → dừng 1 tháng.', 'Phục hồi đúng: nghỉ ngơi → review không cảm xúc → quay lại size 50% → tăng dần.', 'Thua đúng hệ thống ≠ thua vì vi phạm quy tắc. Chỉ sửa loại 2.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "7. Forex / Gold / Crypto / Stocks",
    content: (
      <>
        <SectionHead icon={<Globe size={16} />} title="Quản lý vốn theo từng thị trường" desc="Forex, Crypto, Vàng và Cổ phiếu có đặc thù rủi ro hoàn toàn khác nhau." />
        <Callout type="warn">Áp dụng cùng một quy tắc cho tất cả thị trường = sai lầm nghiêm trọng. Mỗi thị trường có volatility, thanh khoản và rủi ro đặc thù hoàn toàn khác nhau.</Callout>

        <CyberTable
          headers={['Đặc điểm', '💱 Forex', '₿ Crypto', '🥇 Vàng (XAU)', '📈 Cổ phiếu']}
          rows={[
            ['Volatility (ngày)', '0.5–1%', '3–10%+', '0.5–1.5%', '1–3% (riêng lẻ)'],
            ['Risk/lệnh khuyến nghị', '1–2%', '0.5–1%', '1–2%', '0.5–1%'],
            ['SL tối thiểu', '20–50 pip', '2–5% giá', '$10–30', '2–5% giá CP'],
            ['Leverage an toàn', '1:5–1:20', '1:2–1:5', '1:10–1:20', '1:1–1:3'],
            ['Thanh khoản', 'Cực cao', 'Cao (top coins)', 'Rất cao', 'Thay đổi nhiều'],
            ['Giờ giao dịch', '24/5', '24/7', '24/5', 'Cố định'],
            ['Gap rủi ro', 'Cuối tuần', 'Tin tức đột ngột', 'Cuối tuần', 'Overnight earnings'],
          ]}
        />

        <ScenarioCard icon="💱" title="Tình huống: EUR/USD H4, tài khoản $5,000" badge="Ổn định nhất" badgeColor="bg-blue-100 dark:bg-[#378ADD]/20 text-blue-700 dark:text-[#378ADD]">
          <p className="text-[14px] text-gray-700 dark:text-[#9ca3b0] mb-4">Forex có volatility thấp nhất trong 4 thị trường, spread thấp, thanh khoản cao → phù hợp nhất cho người mới. SL cần đặt đủ rộng để tránh bị "stop hunted" (SM quét SL rồi giá đi đúng hướng).</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// Tính Position Size</div>
            <div>Entry: 1.0850 | SL: 1.0810 (40 pip) | TP1: 1.0930 (80 pip) | TP2: 1.0980 (130 pip)</div>
            <div>R:R = 1:2 (TP1) và 1:3.25 (TP2)</div>
            <br />
            <div>Risk 1% = $5,000 × 1% = $50</div>
            <div>Pip value mini lot = $1</div>
            <div>Position Size = $50 / (40 × $1) = 1.25 mini lots</div>
            <br />
            <div className="text-gray-400 text-xs">// Kế hoạch exit:</div>
            <div className="text-gray-400">- Chốt 0.625 lot (50%) tại TP1 = +$50 lợi nhuận</div>
            <div className="text-gray-400">- Move SL về entry cho 0.625 lot còn lại</div>
            <div className="text-gray-400">- Để chạy đến TP2 = +$81 thêm</div>
            <div className="text-gray-400 text-xs">// Tổng lợi nhuận tối đa = $131 với rủi ro $50 → R:R thực tế 1:2.6</div>
          </div>
          <Callout type="ok">✅ Forex weekend risk: Thứ 6 đóng lệnh trước 22:00 hoặc dời SL về BE để tránh gap cuối tuần. Đặc biệt nếu có tin tức lớn (NFP, FOMC) vào cuối tuần.</Callout>
        </ScenarioCard>

        <ScenarioCard icon="₿" title="Tình huống: BTC/USDT D1, tài khoản $5,000" badge="Volatility cao nhất" badgeColor="bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535]">
          <p className="text-[14px] text-gray-700 dark:text-[#9ca3b0] mb-4">Crypto cực kỳ volatile — BTC có thể giảm 20% trong 1 ngày. <strong>SL PHẢI rộng hơn</strong> (3-8% từ entry) hoặc sẽ bị quét liên tục. Position size nhỏ hơn để bù đắp SL rộng.</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// Crypto Position Sizing</div>
            <div>Entry: $60,000 | SL: $56,400 (6% xuống) | TP1: $67,200 (12%) | TP2: $72,000 (20%)</div>
            <br />
            <div className="text-gray-400 text-xs">// SL rộng hơn nhiều vì Crypto volatile hơn Forex!</div>
            <div>Risk 1% = $50 (giữ nguyên — không tăng risk vì volatile hơn)</div>
            <div>SL = $3,600 trên mỗi BTC</div>
            <br />
            <div>Position Size = $50 / $3,600 = 0.0139 BTC ≈ $833 notional value</div>
            <div className="text-gray-400 text-xs">(Chỉ dùng $833/$5,000 = 16.6% tài khoản — còn lại làm buffer)</div>
            <br />
            <div className="text-gray-400 text-xs">// Lưu ý quan trọng với Crypto:</div>
            <div className="text-gray-400">- Không giao dịch Altcoin nhỏ với position size lớn (thanh khoản thấp)</div>
            <div className="text-gray-400">- Luôn có SL vì Crypto 24/7 — không thể "chờ đến sáng"</div>
            <div className="text-gray-400">- Tin tức hack, regulatory có thể làm giá -30% trong 1 giờ</div>
          </div>
          <Callout type="bad">🚫 Leverage Crypto: Nhiều sàn Crypto cho leverage 20x, 50x, 100x. KHÔNG DÙNG leverage &gt;5x với Crypto. Biến động 5% với leverage 20x = mất 100% tài khoản trong 1 nến.</Callout>
        </ScenarioCard>

        <ScenarioCard icon="🥇" title="Tình huống: XAU/USD H4, tài khoản $5,000" badge="Phù hợp nhất với bạn" badgeColor="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]">
          <p className="text-[14px] text-gray-700 dark:text-[#9ca3b0] mb-4">Vàng có volatility trung bình, chịu ảnh hưởng mạnh từ USD, lãi suất Fed, và địa chính trị. Bạn đã có kinh nghiệm với vàng → điểm xuất phát lý tưởng để áp dụng hệ thống NNN.</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// XAU/USD Position Sizing</div>
            <div>Entry: $2,000/oz | SL: $1,975 (25 pip/điểm) | TP1: $2,050 (50 pip) | TP2: $2,080 (80 pip)</div>
            <br />
            <div>Risk 1% = $50</div>
            <div>Pip/Point value với XAU mini = $1/point</div>
            <div>Position Size = $50 / (25 × $1) = 2 mini lots (= 2 oz)</div>
            <br />
            <div className="text-gray-400 text-xs">// Thực tế:</div>
            <div>Lời TP1: 2oz × $50 = $100 (R:R = 1:2)</div>
            <div>Lời TP2 (sau partial): 1oz × $80 = $80</div>
            <div>Tổng lợi nhuận: $180 với risk $50</div>
            <br />
            <div className="text-gray-400 text-xs">// Quản lý tin tức vàng:</div>
            <div className="text-gray-400">- Thứ 6 NFP: Vàng có thể dao động $20-50 trong 5 phút</div>
            <div className="text-gray-400">- FOMC: Biến động lớn, spread nở rộng → đóng lệnh trước 1 giờ</div>
            <div className="text-gray-400">- Địa chính trị: Vàng tăng đột ngột → không short trong thời kỳ bất ổn</div>
          </div>
        </ScenarioCard>

        <ScenarioCard icon="📈" title="Tình huống: Cổ phiếu FPT (HoSE), tài khoản 50,000,000 VNĐ" badge="Phức tạp nhất" badgeColor="bg-purple-100 dark:bg-[#9b59ff]/20 text-purple-700 dark:text-[#9b59ff]">
          <p className="text-[14px] text-gray-700 dark:text-[#9ca3b0] mb-4">Cổ phiếu có rủi ro đặc thù: tin tức doanh nghiệp, earnings, gap qua đêm, thanh khoản thấp ở cổ phiếu nhỏ. <strong>Position size nhỏ hơn</strong> so với Forex/Vàng vì rủi ro overnight gap.</p>
          <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
            <div>// Cổ phiếu VN Position Sizing</div>
            <div>Entry: 95,000 VNĐ/cp | SL: 90,250 (5% xuống) | TP: 107,000 (12.6% lên)</div>
            <div>R:R ≈ 1:2.5</div>
            <br />
            <div>Risk 1% = 50,000,000 × 1% = 500,000 VNĐ</div>
            <div>SL = 95,000 - 90,250 = 4,750 VNĐ/cp</div>
            <div>Số cổ phiếu = 500,000 / 4,750 = 105 cổ phiếu</div>
            <div>Vốn dùng = 105 × 95,000 = 9,975,000 VNĐ (20% tài khoản)</div>
            <br />
            <div className="text-gray-400 text-xs">// Lưu ý đặc thù VN-Index:</div>
            <div className="text-gray-400">- T+3: mua hôm nay, 3 ngày sau mới bán được → không intraday</div>
            <div className="text-gray-400">- Biên độ ±7% HOSE, ±10% HNX</div>
            <div className="text-gray-400">- Không dùng margin trong giai đoạn học (rủi ro cao)</div>
            <div className="text-gray-400">- Earnings season: tránh giao dịch 1-2 tuần trước khi công ty báo cáo</div>
          </div>
        </ScenarioCard>

        <SimpleQuiz
          q="Bạn có tài khoản $3,000 và muốn áp dụng cùng một quy tắc: risk 2%/lệnh cho cả Forex (SL 40pip, $1/pip) và Crypto BTC (SL 5%). Tính position size cho cả 2. Lệnh nào có notional value lớn hơn?"
          opts={['Forex lớn hơn vì pip value lớn hơn', 'Forex: $60/(40×$1)=1.5 lot ($15,000 notional). BTC ở $60k: $60/(5%×$60,000)=$60/$3,000=0.02 BTC ($1,200 notional). Forex lớn hơn — nhưng volatility BTC cao hơn nên thực tế rủi ro tương đương', 'Crypto lớn hơn vì giá BTC cao hơn', 'Cả hai đều bằng nhau vì cùng risk 2%']}
          correctIdx={1}
          explanation="Cả 2 đều risk $60 (2% của $3k). Nhưng notional value khác nhau vì SL của Crypto tính theo % giá lớn hơn."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 7</div>
          <ul className="space-y-2">
            {['Forex: ổn định nhất, SL 20-50pip, risk 1-2%, leverage 1:10-1:20 an toàn.', 'Crypto: volatile nhất, SL 3-8% giá, risk 0.5-1%, leverage tối đa 1:5.', 'Vàng: trung bình, cần chú ý NFP/FOMC, risk 1-2% là hợp lý.', 'Cổ phiếu: overnight gap risk, T+3 với VN, không margin khi học.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "8. Khẩu vị rủi ro & Risk Profile",
    content: (
      <>
        <SectionHead icon="🎭" title="Khẩu vị rủi ro — Hiểu bản thân trước khi giao dịch" desc="Không có chiến lược quản lý vốn 'tốt nhất' cho tất cả." />
        <Callout type="tip">Chiến lược tốt nhất là chiến lược phù hợp với tài chính, tâm lý và mục tiêu của BẠN. Profile phù hợp = trading thoải mái, không stress → quyết định tốt hơn → kết quả tốt hơn.</Callout>

        <SectionHead icon="🎭" title="3 Khẩu vị rủi ro chính" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { icon: '🛡️', name: 'Conservative', color: 'blue', risk: 'Risk: 0.5–1% / lệnh', desc: 'Ưu tiên bảo toàn vốn tuyệt đối. Sẵn sàng hy sinh lợi nhuận để giảm tối đa rủi ro.', dd: '10%', target: '15–30%', suitable: 'Mới ≤1 năm' },
            { icon: '⚖️', name: 'Moderate', color: 'green', risk: 'Risk: 1–2% / lệnh', desc: 'Cân bằng giữa tăng trưởng và bảo toàn. Chuẩn quốc tế cho hầu hết traders.', dd: '20%', target: '30–60%', suitable: '6+ tháng kinh nghiệm' },
            { icon: '🔥', name: 'Aggressive', color: 'red', risk: 'Risk: 2–3% / lệnh', desc: 'Tối đa hóa tăng trưởng. Chấp nhận biến động lớn để đạt lợi nhuận cao.', dd: '30%', target: '60–100%+', suitable: '2+ năm, vốn rủi ro' },
          ].map((p, i) => (
            <div key={i} className={`border-2 rounded-2xl p-5 bg-white dark:bg-[#181A20] ${p.color === 'blue' ? 'border-blue-300 dark:border-[#378ADD]' : p.color === 'green' ? 'border-green-400 dark:border-[#0ECB81]' : 'border-red-400 dark:border-[#F6465D]'}`}>
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className={`font-bold text-lg mb-1 ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.name}</div>
              <div className={`text-sm font-mono mb-3 ${p.color === 'blue' ? 'text-blue-600 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-600 dark:text-[#0ECB81]' : 'text-red-600 dark:text-[#F6465D]'}`}>{p.risk}</div>
              <p className="text-[13px] text-gray-600 dark:text-[#9ca3b0] mb-4">{p.desc}</p>
              <div className="space-y-2 text-[12px] font-mono">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-[#848E9C]">Max DD chấp nhận</span><span className={`font-bold ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.dd}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-[#848E9C]">Target lợi nhuận/năm</span><span className={`font-bold ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.target}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-[#848E9C]">Phù hợp với</span><span className={`font-bold ${p.color === 'blue' ? 'text-blue-700 dark:text-[#378ADD]' : p.color === 'green' ? 'text-green-700 dark:text-[#0ECB81]' : 'text-red-700 dark:text-[#F6465D]'}`}>{p.suitable}</span></div>
              </div>
            </div>
          ))}
        </div>

        <SectionHead icon="📋" title="Trading Plan theo từng Profile" />
        <CyberTable
          headers={['Hạng mục', '🛡️ Conservative', '⚖️ Moderate', '🔥 Aggressive']}
          rows={[
            ['Risk/lệnh', '0.5–1%', '1–2%', '2–3%'],
            ['Max lệnh cùng lúc', '2–3', '3–5', '5–8'],
            ['Daily loss limit', '−3%', '−5%', '−7%'],
            ['Weekly loss limit', '−5%', '−10%', '−15%'],
            ['Thị trường phù hợp', 'Forex, Gold', 'Forex, Gold, Crypto top', 'Tất cả + Altcoin'],
            ['R:R tối thiểu', '1:2', '1:1.5', '1:1.5'],
            ['Tần suất giao dịch', '1–3 lệnh/tuần', '3–7 lệnh/tuần', 'Daily–multiple'],
          ]}
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 8</div>
          <ul className="space-y-2">
            {['Conservative: 0.5-1%, DD 10%, phù hợp người mới và vốn không thể mất.', 'Moderate: 1-2%, DD 20%, chuẩn quốc tế sau 6+ tháng kinh nghiệm.', 'Aggressive: 2-3%, DD 30%, chỉ với vốn rủi ro và 2+ năm kinh nghiệm.', 'Profile phù hợp = trading thoải mái, không stress → quyết định tốt hơn → kết quả tốt hơn.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[15px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 4: Quản lý Vốn & Rủi ro", title: "9. Quiz Tổng kết Chương 4",
    content: (
      <>
        <SectionHead icon="📝" title="Quiz Tổng kết Chương 4" desc="15 câu hỏi — Mục tiêu: 11/15 trước khi tiếp tục." />
        <Callout type="warn">Đây là chương quan trọng nhất — quản lý vốn quyết định trader tồn tại hay biến mất. Đạt ít nhất 11/15 trước khi tiếp tục sang Chương 5.</Callout>

        {[
          { q: 'Trader A win rate 70% nhưng R:R 1:0.2 (thắng $20, thua $100). Sau 100 lệnh, trader có lời không?', opts: ['Có lời vì win rate 70%', 'Không lời — (70×$20)−(30×$100)=$1,400−$3,000=−$1,600. Win rate cao không đủ', 'Hòa vốn', 'Tùy vào thị trường'], ci: 1, ex: 'Win rate cao không đảm bảo có lời. Kỳ vọng = (WR×Win)−(LR×Loss) = (0.7×20)−(0.3×100) = 14−30 = −$16/lệnh.' },
          { q: 'Tài khoản $8,000. Risk 1.5%, SL = 60 pip, pip value = $1. Position size là bao nhiêu?', opts: ['3 lot', '2 lot', '8,000×1.5%=$120. Size=$120/(60×$1)=2 lot', '1.5 lot'], ci: 2, ex: 'Công thức: Risk$=Acc×Risk%=$120. Size=Risk$/(SL×PipVal)=$120/60=2 lot.' },
          { q: 'Sau 8 lệnh thua liên tiếp với risk 5%, tài khoản $10,000 còn lại bao nhiêu?', opts: ['$6,000', '$10,000×(0.95)^8=$6,634', '$7,200', '$5,000'], ci: 1, ex: 'Compound: $10,000×(0.95)^8≈$6,634. Mất 33.7% — đây là lý do không risk >2%.' },
          { q: 'Khi nào được phép tăng risk từ 1% lên 2%?', opts: ['Sau 5 lệnh thắng liên tiếp', 'Sau 3 tháng, 50+ lệnh với kỳ vọng dương và DD trong dự báo', 'Khi cảm thấy tự tin', 'Sau khi tài khoản tăng 10%'], ci: 1, ex: 'Phải thỏa MẤT CẢ 4 điều kiện: thời gian (3+ tháng), mẫu đủ lớn (50+ lệnh), kỳ vọng dương, DD trong dự báo.' },
          { q: 'Difference giữa Fixed Fractional và Fixed Risk là gì?', opts: ['Không có sự khác biệt', 'Fixed Fractional dùng % tài khoản HIỆN TẠI, Fixed Risk dùng số tiền cố định — Fixed Fractional tự động adjust theo vốn', 'Fixed Fractional chỉ dùng cho Forex', 'Fixed Risk an toàn hơn'], ci: 1, ex: 'Fixed Fractional: risk % của balance hiện tại → tự động tăng khi thắng, giảm khi thua. Fixed Risk ($xx cố định) không adjust theo vốn.' },
          { q: 'Quarter Kelly với win rate 50%, R:R 1:2 bằng bao nhiêu?', opts: ['25%', 'Full Kelly=(50%×2−50%)/2=25%. Quarter Kelly=25%/4=6.25%', '12.5%', '3%'], ci: 1, ex: 'Full Kelly=(WR×RR−LR)/RR=(0.5×2−0.5)/2=0.5/2=25%. Quarter Kelly=25%/4=6.25%. An toàn và được khuyến nghị.' },
          { q: 'Pyramiding an toàn yêu cầu gì trước khi thêm lệnh?', opts: ['Giá tăng mạnh', 'Lệnh gốc đã Move to Break Even — không còn rủi ro vốn', 'Có 3 tín hiệu hội tụ mới', 'Tài khoản tăng 5%'], ci: 1, ex: 'Bắt buộc: lệnh gốc phải Move to BE trước khi pyramid. Kích thước lệnh thêm phải ≤50% lệnh trước.' },
          { q: 'Đâu là ngưỡng Daily Drawdown để dừng giao dịch ngay?', opts: ['2%', '10%', '>3-5% trong 1 ngày → dừng ngay, không "gỡ"', '1%'], ci: 2, ex: 'Circuit Breaker: Daily >3-5% → dừng ngay. Weekly >7-10% → giảm size. Monthly >15-20% → dừng 2 tuần.' },
          { q: 'Crypto BTC tài khoản $5,000, risk 1%, SL 5%. Position size (BTC giá $60,000)?', opts: ['0.1 BTC', '0.0167 BTC ($50/$3,000)', '0.05 BTC', '0.5 BTC'], ci: 1, ex: 'Risk$=$5,000×1%=$50. SL$=5%×$60,000=$3,000/BTC. Size=$50/$3,000=0.0167 BTC.' },
          { q: 'Conservative profile phù hợp với ai?', opts: ['Trader 3+ năm muốn tối đa lợi nhuận', 'Người mới ≤1 năm, risk 0.5-1%, max DD 10%', 'Trader muốn giao dịch daily', 'Người có vốn không cần thiết yếu'], ci: 1, ex: 'Conservative: 0.5-1%/lệnh, max DD 10%, 1-3 lệnh/tuần. Phù hợp nhất cho người mới và vốn không thể mất.' },
        ].map((q, i) => (
          <SimpleQuiz key={i} q={`Câu ${i + 1}: ${q.q}`} opts={q.opts} correctIdx={q.ci} explanation={q.ex} />
        ))}

        <ExerciseBox title="Chuẩn bị cho Chương 5 — Tâm lý giao dịch" desc="Trước khi học Chương 5, thiết lập Trading Plan cá nhân dựa trên Risk Profile của bạn:" steps={[
          { d: 'Xác định Risk Profile của bạn (Conservative/Moderate/Aggressive) từ bài 8. Ghi rõ: risk/lệnh, max lệnh cùng lúc, daily/weekly loss limit.' },
          { d: 'Tạo Position Size Calculator cho thị trường bạn sẽ giao dịch (vàng hoặc forex). Tính position size cho 5 tình huống SL khác nhau.' },
          { d: 'Thiết lập Circuit Breaker rules cá nhân: "Nếu tài khoản giảm X% trong ngày/tuần/tháng, tôi sẽ làm gì?" Viết ra, in ra, dán cạnh máy tính.' },
          { d: 'Backtest 20 lệnh trên chart giả với đúng risk profile bạn đã chọn. Xem drawdown max là bao nhiêu.' },
        ]} />
      </>
    )
  },
];

export default CHAPTER_4_DATA;
