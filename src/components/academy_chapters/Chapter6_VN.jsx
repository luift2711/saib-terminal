import { useState, useEffect } from 'react';
import {
  Map, FileText, BarChart2, Clock, CheckSquare, RefreshCw, Shield, Star, Award, Zap
} from 'lucide-react';
import { SectionHead, StoryBox, Callout, CyberTable, ExerciseBox } from '../Sharedcomponents.jsx';

// ==========================================
// CHAPTER 6 — XÂY DỰNG HỆ THỐNG & THỰC CHIẾN
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
          {context && <span className="block text-[17.5px] text-gray-500 dark:text-[#848E9C] font-medium mt-3 italic transition-colors">{context}</span>}
        </div>
        <div className="flex flex-col gap-3">
          {opts.map((opt, i) => {
            const isChosen = selected === i;
            let btnClass = "border-gray-200 dark:border-[#2B3139] text-gray-700 dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#0B0E11] bg-white dark:bg-[#0B0E11]";
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
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {explanation}
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
    const d = new Date().toLocaleDateString('vi-VN');
    setPlan({
      date: d,
      content: `═══════════════════════════════════════
  TRADING PLAN CÁ NHÂN
  ${(name || '[Chưa điền]').toUpperCase()} · ${d}
═══════════════════════════════════════

§1 DANH TÍNH TRADER
Tên:              ${name || '[Chưa điền]'}
Kinh nghiệm:      ${exp || '[Chưa điền]'}
Vốn giao dịch:    ${capital || '[Chưa điền]'}
Thời gian/ngày:   ${time || '[Chưa điền]'}

§2 THỊ TRƯỜNG & TIMEFRAME
Thị trường:       ${market || '[Chưa điền]'}
Timeframe:        ${tf || '[Chưa điền]'}
Lý do:            ${mktReason || '[Chưa điền]'}

§3 QUY TẮC VÀO LỆNH
BUY khi:
${buy || '[Chưa điền]'}

SELL khi:
${sell || '[Chưa điền]'}

KHÔNG giao dịch khi:
${no || '[Chưa điền]'}

§4 QUẢN LÝ VỐN
Risk/lệnh:        ${risk || '[Chưa điền]'}
R:R tối thiểu:    ${rr || '[Chưa điền]'}
Daily Loss Limit: ${dlimit || '[Chưa điền]'}
Max vị thế:       ${maxpos || '[Chưa điền]'}

§5 QUY TẮC RA LỆNH
${exit || '[Chưa điền]'}

═══════════════════════════════════════
  Ký tên: ${name || '[Chưa điền]'}
  Ngày:   ${d}
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
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§1 · Danh tính Trader</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Tên / Biệt danh Trader</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ví dụ: Minh Trader / The Patient One" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Kinh nghiệm hiện tại</label><select value={exp} onChange={e => setExp(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Chọn...</option><option>Mới bắt đầu (0-3 tháng)</option><option>Beginner (3-12 tháng)</option><option>Intermediate (1-3 năm)</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Vốn sẽ dùng để giao dịch</label><input type="text" value={capital} onChange={e => setCapital(e.target.value)} placeholder="Ví dụ: $1,000 (tiền có thể mất)" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Thời gian dành cho trading/ngày</label><select value={time} onChange={e => setTime(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Chọn...</option><option>{"< 1 tiếng (Swing trade D1)"}</option><option>1-3 tiếng (H4 swing)</option><option>3-6 tiếng (H1 intraday)</option><option>Full-time</option></select></div>
        </div>
        {/* §2 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§2 · Thị trường & Khung thời gian</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Thị trường sẽ giao dịch</label><select value={market} onChange={e => setMarket(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Chọn...</option><option>XAU/USD (Vàng) + EUR/USD</option><option>Crypto: BTC/USDT + ETH/USDT</option><option>Forex: EUR/USD + GBP/USD</option><option>Cổ phiếu Việt Nam</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Timeframe phân tích chính</label><select value={tf} onChange={e => setTf(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Chọn...</option><option>D1 (Daily) → H4 → H1</option><option>H4 → H1 → M15</option><option>H1 → M15 → M5</option></select></div>
        </div>
        <div className="mb-8"><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Lý do chọn thị trường này</label><textarea value={mktReason} onChange={e => setMktReason(e.target.value)} rows="3" placeholder="Tôi chọn thị trường này vì..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        {/* §3 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§3 · Quy tắc vào lệnh (Entry Rules)</div>
        <div className="space-y-4 mb-8">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Setup vào lệnh BUY — điều kiện A+B+C</label><textarea value={buy} onChange={e => setBuy(e.target.value)} rows="4" placeholder={"Ví dụ: (A) D1 uptrend + EMA21>EMA50>EMA200\n(B) H4 pullback về Fibonacci 62-79% trùng EMA21\n(C) Xuất hiện mẫu nến xác nhận (Hammer/Engulfing/Doji)\n→ Buy Stop tại H nến xác nhận + 10pip"} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Setup vào lệnh SELL — điều kiện</label><textarea value={sell} onChange={e => setSell(e.target.value)} rows="3" placeholder="Điều kiện ngược lại với BUY..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Tôi KHÔNG giao dịch khi nào? (quan trọng!)</label><textarea value={no} onChange={e => setNo(e.target.value)} rows="4" placeholder={"Ví dụ: Trước 2 tiếng khi có tin NFP/FOMC\nKhi D1 đang sideway (range < 50pip/ngày)\nSau khi thua 3 lệnh liên tiếp trong ngày\nKhi cảm xúc không ổn định"} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        </div>
        {/* §4 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§4 · Quản lý vốn</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Risk mỗi lệnh (%)</label><select value={risk} onChange={e => setRisk(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Chọn...</option><option>0.5% (Conservative - mới hoàn toàn)</option><option>1% (Conservative - đang học)</option><option>1.5% (Moderate - 6+ tháng)</option><option>2% (Moderate - 1+ năm)</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">R:R tối thiểu để vào lệnh</label><select value={rr} onChange={e => setRr(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="">Chọn...</option><option>1:1.5 (tối thiểu chấp nhận)</option><option>1:2 (chuẩn)</option><option>1:3 (lý tưởng)</option></select></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Daily Loss Limit</label><input type="text" value={dlimit} onChange={e => setDlimit(e.target.value)} placeholder="Ví dụ: -3% → dừng ngày đó" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Max số lệnh mở cùng lúc</label><input type="text" value={maxpos} onChange={e => setMaxpos(e.target.value)} placeholder="Ví dụ: 2 lệnh tối đa" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        </div>
        {/* §5 */}
        <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">§5 · Quy tắc ra lệnh (Exit Rules)</div>
        <div className="mb-8"><label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Chiến lược TP và SL</label><textarea value={exit} onChange={e => setExit(e.target.value)} rows="5" placeholder={"Ví dụ: SL = dưới Swing Low -10pip\nTP1 = Fibonacci 127% (chốt 50% vị thế)\nTP2 = Fibonacci 162% (chốt toàn bộ)\nSau TP1 → Move SL về Break Even\nKhông dời SL ra xa khi bị chạm"} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
        <button onClick={generatePlan} className="w-full py-4 rounded-xl font-black text-[18.5px] uppercase tracking-wider transition-all bg-yellow-500 dark:bg-[#00d084] hover:bg-yellow-400 dark:hover:bg-[#00e691] text-black shadow-[0_4px_14px_0_rgba(234,179,8,0.39)] dark:shadow-[0_4px_14px_0_rgba(0,208,132,0.39)]">
          ✦ Tạo Trading Plan của tôi ✦
        </button>
        {plan && (
          <div className="mt-6 bg-gray-50 dark:bg-[#0B0E11] border border-yellow-400 dark:border-[#FCD535]/50 rounded-2xl p-6">
            <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">📋 TRADING PLAN — {plan.date}</div>
            <pre className="text-[15.5px] text-gray-700 dark:text-[#9ca3b0] leading-relaxed whitespace-pre-wrap font-mono">{plan.content}</pre>
            <button onClick={() => navigator.clipboard?.writeText(plan.content)} className="mt-4 px-6 py-2 border border-yellow-400 dark:border-[#FCD535]/50 text-yellow-700 dark:text-[#FCD535] rounded-xl text-[15.5px] font-bold hover:bg-yellow-50 dark:hover:bg-[#FCD535]/10 transition-colors">📋 Copy Plan</button>
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

  const clear = () => { if (window.confirm('Xóa toàn bộ dữ liệu?')) setEntries([]); };

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
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Kết quả</label><select value={res} onChange={e => setRes(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none"><option value="win">Thắng ✅</option><option value="loss">Thua ❌</option><option value="be">Break Even</option></select></div>
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Risk (R)</label><input type="number" value={risk} step={0.5} onChange={e => setRisk(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none font-mono" /></div>
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Reward (R)</label><input type="number" value={reward} step={0.5} onChange={e => setReward(Number(e.target.value))} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none font-mono" /></div>
          <div><label className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1 block">Setup</label><select value={setup} onChange={e => setSetup(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-2 text-[16.5px] text-black dark:text-white outline-none"><option value="NNN①">NNN① Thân ngắn</option><option value="NNN②">NNN② Nến ôm</option><option value="NNN③">NNN③ EMA21</option><option value="NNN④">NNN④ Fibonacci</option><option value="Engulfing">Engulfing</option><option value="Hammer & Shooting Star">Hammer & Shooting Star</option><option value="Doji & Biến thể">Doji & Biến thể</option><option value="Morning & Evening Star">Morning & Evening Star</option><option value="Harami & Three Soldiers">Harami & Three Soldiers</option></select></div>
          <div className="flex items-end"><button onClick={addEntry} className="w-full py-2 rounded-xl font-black text-sm bg-yellow-500 dark:bg-[#00d084] hover:bg-yellow-400 dark:hover:bg-[#00e691] text-black transition-all">+ Thêm</button></div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { lbl: 'Tổng lệnh', val: n, color: 'text-black dark:text-white' },
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
        <div className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-2">Log giao dịch</div>
        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-xl p-4 max-h-48 overflow-y-auto font-mono text-[14.5px] border border-gray-700 dark:border-[#2B3139]">
          {entries.length === 0 ? <div className="text-gray-500 text-center py-4">Chưa có dữ liệu — thêm lệnh đầu tiên để bắt đầu</div> : [...entries].reverse().map((e, i) => (
            <div key={i} className={`border-b border-gray-800 dark:border-[#2B3139] py-2 last:border-0 ${e.isWin ? 'text-green-400 dark:text-[#0ECB81]' : e.isBE ? 'text-gray-400' : 'text-red-400 dark:text-[#F6465D]'}`}>
              #{entries.length - i} {e.setup} · {e.isWin ? 'WIN +' + e.reward + 'R' : e.isBE ? 'BE ±0' : '-' + e.risk + 'R'}
            </div>
          ))}
        </div>
        <button onClick={clear} className="mt-4 px-5 py-2 border border-gray-300 dark:border-[#2B3139] text-gray-600 dark:text-[#848E9C] rounded-xl text-[15.5px] font-bold hover:bg-gray-100 dark:hover:bg-[#181A20] transition-colors">🗑 Xóa tất cả</button>
      </div>
    </div>
  );
};

// ---- Interactive: Go-Live Checklist ----
const GoLiveChecklist = () => {
  const categories = [
    {
      label: '// Kiến thức & Kỹ năng',
      items: [
        'Hoàn thành đầy đủ 6 chương của giáo trình (hoặc kiến thức tương đương)',
        'Có thể giải thích Trading Plan của mình trong 3 phút mà không cần nhìn giấy',
        'Biết cách tính Position Size mà không cần dùng calculator (hoặc có calculator sẵn)',
        'Biết tên và triệu chứng của ít nhất 5 trong 7 con quỷ trading',
      ],
    },
    {
      label: '// Dữ liệu Backtest & Demo',
      items: [
        'Đã backtest ít nhất 30 lệnh với Expectancy dương',
        'Đã demo ít nhất 30 lệnh thật sự (không phải "paper trade" trong đầu)',
        'Win rate demo ≥ 35% với R:R ≥ 1:2 (hoặc Expectancy dương sau 30 lệnh)',
        'Đã ghi Journal đầy đủ cho mọi lệnh demo (không bỏ sót)',
        'Tuân thủ Trading Plan ≥ 80% số lệnh (≤ 6 vi phạm trong 30 lệnh)',
      ],
    },
    {
      label: '// Tài chính & Tâm lý',
      items: [
        'Số tiền sẽ dùng là tiền "có thể mất hoàn toàn" — không phải tiền sinh hoạt, không phải tiền vay',
        'Đã xác định Risk Profile (Conservative/Moderate) và Risk% mỗi lệnh phù hợp',
        'Đã thiết lập Daily Loss Limit và sẵn sàng dừng ngay khi chạm ngưỡng',
        'Có thể nhìn tài khoản giảm 10% mà không hoảng loạn hoặc ra quyết định bốc đồng',
      ],
    },
    {
      label: '// Công cụ & Môi trường',
      items: [
        'Đã chọn broker uy tín (regulated) với spread thấp cho thị trường mình giao dịch',
        'Đã test Platform — biết cách đặt SL/TP, thay đổi lệnh, đóng lệnh khẩn cấp',
        'Có Trading Journal (ứng dụng hoặc bảng tính) đã setup sẵn sàng',
        'Biết lịch tin tức quan trọng trong tuần (Forex Factory hoặc tương đương)',
      ],
    },
    {
      label: '// Quy tắc cá nhân',
      items: [
        'Đã viết và ký vào "Lời tuyên thệ Trader" (hoặc cam kết tương đương)',
        'Có người thân/bạn bè biết về việc bạn giao dịch (accountability partner)',
        'Sẵn sàng bắt đầu với tài khoản thật nhỏ nhất có thể (không phải toàn bộ vốn ngay từ đầu)',
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
    ? '🎉 Tuyệt vời! Bạn đã đánh dấu đủ tất cả 20 điều kiện. Bạn đã sẵn sàng bước ra thị trường thật. Hãy bắt đầu với số vốn nhỏ nhất có thể và tiếp tục Journal mọi lệnh.'
    : count >= 15 ? `☀ Gần đủ rồi! Còn ${total - count} điều kiện nữa. Hoàn thành nốt trước khi live — đừng bỏ qua các điều còn lại.`
    : count >= 10 ? `📊 Đã đạt ${count}/${total}. Tiếp tục hoàn thiện. Chưa sẵn sàng live — cần ít nhất 17/20 để an toàn.`
    : `📋 Đang tiến hành: ${count}/${total} điều kiện. Tiếp tục đánh dấu khi hoàn thành.`;

  let itemIndex = 0;
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl">
      <div className="bg-white dark:bg-[#181A20] p-5 flex items-center justify-between border-b border-gray-200 dark:border-[#2B3139]">
        <span className="font-black text-sm uppercase tracking-widest text-black dark:text-white">Go-Live Checklist</span>
        <span className="text-sm font-mono text-yellow-600 dark:text-[#FCD535]">{count} / {total} điều kiện</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-[#2B3139]"><div className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all" style={{ width: pct + '%' }} /></div>
      {categories.map((cat, ci) => (
        <div key={ci}>
          <div className="px-5 py-2 bg-gray-100 dark:bg-[#181A20] text-[12.5px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#848E9C]">{cat.label}</div>
          {cat.items.map((item) => {
            const idx = itemIndex++;
            return (
              <div key={idx} onClick={() => toggle(idx)} className={`flex items-start gap-4 px-5 py-3 border-b border-gray-100 dark:border-[#2B3139]/50 cursor-pointer transition-colors last:border-0 ${checked.has(idx) ? 'bg-green-50 dark:bg-[#0ECB81]/5' : 'hover:bg-gray-50 dark:hover:bg-[#181A20]/50'}`}>
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
    if (!name.trim()) { alert('Hãy nhập tên của bạn trước!'); return; } 
    localStorage.setItem('SAIB_trader_name', name.trim());
    setSworn(true); 
  };
  return (
    <div className="bg-gradient-to-br from-[#1a1500] to-[#0f0f00] border border-[#d4ac0d]/30 rounded-3xl p-8 my-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(245,166,35,0.06)] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="font-serif text-2xl font-bold text-yellow-300 dark:text-[#ffd070] mb-3">Lời Tuyên Thệ của Trader</div>
        <div className="w-16 h-px bg-yellow-500/30 mx-auto mb-6" />
        <div className="font-serif text-[17.5px] text-gray-200 leading-[1.9] max-w-xl mx-auto mb-6 italic">
          "Tôi, <span className="text-yellow-300 dark:text-[#ffd070] not-italic font-semibold">{name || '__________'}</span>, hôm nay bước vào thị trường tài chính với đôi mắt mở và tâm trí tỉnh thức.<br /><br />
          Tôi hiểu rằng thị trường không nợ tôi điều gì. Tôi giao dịch với rủi ro của chính mình và trách nhiệm của chính mình.<br /><br />
          Tôi cam kết tuân thủ hệ thống đã xây dựng — kể cả khi cảm xúc muốn phá vỡ nó. Tôi sẽ không revenge trade. Tôi sẽ không FOMO. Tôi sẽ luôn đặt Stop Loss.<br /><br />
          Tôi biết rằng 7 con quỷ sẽ quay lại. Tôi sẽ nhận ra chúng và gọi tên chúng.<br /><br />
          Tôi giao dịch để học. Lợi nhuận là kết quả của kỷ luật — không phải mục tiêu tức thời."
        </div>
        {!sworn ? (
          <>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên của bạn" className="bg-[#0a0c18] border border-yellow-500/30 rounded-xl px-5 py-3 text-[18.5px] text-white font-bold text-center w-72 outline-none focus:border-yellow-400 mb-4 block mx-auto" />
            <button onClick={takeOath} className="px-8 py-3 bg-gradient-to-br from-orange-500 to-yellow-500 text-black font-black text-[17.5px] rounded-xl hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(245,166,35,0.3)] transition-all">✦ Tôi tuyên thệ ✦</button>
          </>
        ) : (
          <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-6 text-green-300 font-serif italic text-[17.5px] leading-relaxed max-w-lg mx-auto">
            ✦ <strong className="not-italic">{name}</strong> — Lời tuyên thệ của bạn đã được ghi nhận.<br />
            Hãy in trang này ra và đặt ở nơi bạn có thể nhìn thấy mỗi khi giao dịch.<br />
            Hành trình thật sự bắt đầu từ hôm nay. ✦
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
        <div className="text-2xl text-yellow-500 letter-spacing-[8px] mb-4">✦ ✦ ✦</div>
        <div className="font-mono text-[15.5px] text-gray-400 uppercase tracking-widest mb-3">Giáo trình Trading Zero → Hero</div>
        <div className="font-serif text-3xl font-bold text-yellow-300 mb-2 italic">Chứng nhận Hoàn thành</div>
        <div className="text-[16.5px] text-gray-400 font-serif italic mb-2">Chứng nhận rằng</div>
        <div className="font-serif text-2xl font-bold text-white border-b border-yellow-400/30 pb-3 mb-3">{name || '[Tên của bạn]'}</div>
        <div className="font-serif text-[16.5px] text-gray-300 leading-[1.9] max-w-md mx-auto mb-6 italic">
          đã hoàn thành toàn bộ 6 chương của Giáo trình Trading từ Zero đến Hero,<br />
          bao gồm: Nền tảng thị trường, Phân tích kỹ thuật, Phương pháp NNN,<br />
          Quản lý vốn và rủi ro, Tâm lý giao dịch,<br />
          và đã xây dựng hệ thống giao dịch cá nhân sẵn sàng thực chiến.
        </div>
        <div className="text-5xl mb-3">☀</div>
        <div className="font-serif text-[15.5px] text-gray-400 italic">"Kỷ luật là cầu nối giữa mục tiêu và thành tựu."</div>
      </div>
    </div>
  );
};


// ==========================================
// CHAPTER 6 DATA
// ==========================================
const CHAPTER_6_DATA_VN = [
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "0. Hành trình của bạn đến đây",
    content: (
      <>
        <SectionHead icon={<Map size={16} />} title="Bình minh ló dạng — Hành trình của bạn đến đây" desc="Bạn đã đi qua 5 chương đầy gian nan. Bây giờ là lúc đứng trên đỉnh núi nhìn lại toàn cảnh." />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-yellow-400 dark:border-[#FCD535]/50 rounded-2xl p-6 my-6">
          <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">Hành trình đã hoàn thành</div>
          <div className="flex gap-2 mb-4">
            {['Chương 1: Nền tảng', 'Chương 2: Phân tích kỹ thuật', 'Chương 3: NNN Methods', 'Chương 4: Quản lý vốn', 'Chương 5: Tâm lý', 'Chương 6: Thực chiến (đang học)'].map((ch, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full ${i < 5 ? 'bg-yellow-500 dark:bg-[#FCD535]' : 'bg-yellow-200 dark:bg-[#FCD535]/40'}`} title={ch} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { label: 'Ch.1-2', title: 'Ngôn ngữ thị trường', sub: 'Nến, S/R, Xu hướng, Indicator' },
              { label: 'Ch.3', title: 'Chiến lược vào lệnh', sub: '4 phương pháp NNN + 9 mẫu nến' },
              { label: 'Ch.4-5', title: 'Kỷ luật & Tâm lý', sub: 'Quản lý vốn + 7 con quỷ + Journal' },
            ].map((card, i) => (
              <div key={i} className="bg-gray-100 dark:bg-[#181A20] rounded-xl p-4">
                <div className="text-[11.5px] font-mono text-gray-400 dark:text-[#848E9C] uppercase mb-1">{card.label}</div>
                <div className="text-[16.5px] font-bold text-black dark:text-white">{card.title}</div>
                <div className="text-[14.5px] text-gray-500 dark:text-[#848E9C] mt-1">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <SectionHead icon="🏔️" title="Điều duy nhất thật sự quan trọng" />
        <StoryBox label="📜 Nguyên tắc cốt lõi" icon="☀">
          <em>"Sau 6 chương, mọi kiến thức bạn học được đều sẽ vô nghĩa nếu không có <strong>một hệ thống được viết ra rõ ràng và được tuân thủ kỷ luật</strong>."</em><br /><br />
          — Nguyên tắc cốt lõi của trading chuyên nghiệp
        </StoryBox>

        <p className="text-[18.5px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          Chương này không dạy thêm lý thuyết mới. Nó dạy bạn cách <em className="text-yellow-600 dark:text-[#FCD535] not-italic font-semibold">biến tất cả những gì đã học thành hành động thực tế</em>. Bạn sẽ xây dựng Trading Plan riêng, học backtesting, lập lộ trình 90 ngày demo, và biết chính xác khi nào bạn sẵn sàng để bước ra thị trường thật.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            { lbl: 'Trader thất bại vì', val: 'Không có hệ thống', sub: 'viết ra rõ ràng', color: 'text-red-600 dark:text-[#F6465D]' },
            { lbl: 'Thời gian demo cần thiết', val: '90 ngày', sub: 'tối thiểu trước khi live', color: 'text-yellow-600 dark:text-[#FCD535]' },
            { lbl: 'Tiêu chí sẵn sàng live', val: '20 điều kiện', sub: 'phải đạt đủ tất cả', color: 'text-green-600 dark:text-[#0ECB81]' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-5">
              <div className="text-[11.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-2">{s.lbl}</div>
              <div className={`text-xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-[13.5px] text-gray-500 dark:text-[#848E9C] mt-1 font-mono">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 0</div>
          <ul className="space-y-2">
            {['Chương 6 là bước chuyển hóa từ lý thuyết sang hành động thực chiến.', 'Ba công cụ cốt lõi: Trading Plan (luật pháp cá nhân) + Backtesting (kiểm tra hệ thống) + 90 ngày Demo (thực hành không rủi ro).', 'Tiêu chí sẵn sàng live: 20 điều kiện phải đạt đủ. Không thương lượng.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "1. Trading Plan — Hiến pháp của Trader",
    content: (
      <>
        <SectionHead icon={<FileText size={16} />} title="Trading Plan — Hiến pháp của Trader" desc="Trading Plan không phải danh sách mục tiêu. Đây là bộ luật bạn tự viết ra cho chính mình — và phải tuân thủ như luật pháp." />

        <SectionHead icon="📋" title="Tại sao phải VIẾT ra?" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Nghiên cứu của Dominican University (2015): người <em className="text-yellow-600 dark:text-[#FCD535] not-italic font-semibold">viết ra mục tiêu cụ thể</em> có tỷ lệ đạt được cao hơn 42% so với người chỉ nghĩ trong đầu. Trong trading, plan viết ra còn có tác dụng quan trọng hơn: nó cho phép System 2 (lý trí) của Kahneman <strong>hoạt động trước khi System 1 (cảm xúc) kịp chiếm quyền</strong>.
        </p>

        <TradingPlanBuilder />

        <SimpleQuiz
          q="Tại sao Trading Plan phải được VIẾT ra, không chỉ 'biết trong đầu'?"
          opts={['Vì broker yêu cầu', 'Vì plan viết ra kích hoạt System 2 trước khi System 1 chiếm quyền trong lúc giao dịch — giúp bạn nhớ và tuân thủ quy tắc ngay cả khi cảm xúc dâng cao', 'Để có bằng chứng nếu thua', 'Không cần — trader giỏi nhớ tất cả trong đầu']}
          correctIdx={1}
          explanation="Đúng! Plan viết ra = System 2 được kích hoạt sẵn. Trong lúc stress, bạn chỉ cần đọc plan thay vì suy nghĩ lại từ đầu."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 1</div>
          <ul className="space-y-2">
            {['Trading Plan = luật pháp cá nhân. Phải viết ra, không chỉ nghĩ trong đầu.', 'Gồm 5 phần: Danh tính + Thị trường/TF + Entry rules + Risk management + Exit rules.', 'Phần quan trọng nhất thường bị bỏ qua: "Tôi KHÔNG giao dịch khi nào?"'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "2. Backtesting — Kiểm tra hệ thống trước khi đặt cược",
    content: (
      <>
        <SectionHead icon={<BarChart2 size={16} />} title="Backtesting — Kiểm tra hệ thống trước khi đặt cược" desc="Backtesting là cách duy nhất để biết hệ thống của bạn có thật sự hoạt động hay không — mà không tốn tiền thật. Như thử xe trước khi mua." />

        <SectionHead icon="🔬" title="Backtesting thủ công trên TradingView" desc="Cách đúng nhất cho người mới" />

        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Mở TradingView, chọn thị trường.</strong> Chuyển sang timeframe chính (H4 hoặc D1). Thêm EMA21, EMA50, và Fibonacci tool.</> },
            { n: '2', text: <><strong>Kéo chart về quá khứ 6-12 tháng.</strong> Trong TradingView: click vào chart, giữ Alt + kéo trái để cuộn về quá khứ. Mục tiêu: tìm ít nhất 30-50 setup.</> },
            { n: '3', text: <><strong>Đi từng nến một (không nhìn tương lai).</strong> Cách: dùng phím mũi tên → để tiến từng nến. Khi thấy setup, dừng lại và quyết định: có vào không? Entry, SL, TP ở đâu?</> },
            { n: '4', text: <><strong>Ghi lại vào Backtest Tracker</strong> (bên dưới). Mỗi setup: ngày, loại setup, entry/SL/TP, kết quả. Đừng gian lận — ghi thật ngay cả khi sai.</> },
            { n: '5', text: <><strong>Sau 30+ lệnh, tính thống kê.</strong> Win rate, R:R trung bình, Expectancy, Max Drawdown. Nếu Expectancy âm → hệ thống cần sửa.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <BacktestTracker />

        <SectionHead icon="📈" title="Tiêu chí đánh giá hệ thống" />
        <CyberTable
          headers={['Chỉ số', 'Công thức', 'Tốt', 'Chấp nhận được', 'Cần sửa']}
          rows={[
            ['Win Rate', 'Số thắng / Tổng lệnh', '>50%', '35-50% (nếu R:R cao)', '—'],
            ['R:R TB', 'Avg Reward / Avg Risk', '>2', '1.5-2', '<1.5'],
            ['Expectancy/lệnh', '(WR×AvgWin) - (LR×AvgLoss)', 'Dương', 'Dương nhỏ', 'Âm → dừng ngay'],
            ['Profit Factor', 'Tổng thắng / Tổng thua', '>1.5', '1.2-1.5', '<1.2'],
            ['Max DD thực tế', 'Đỉnh → đáy tài khoản', '<15%', '15-25%', '>25% → review hệ thống'],
            ['Số lệnh mẫu', 'Tổng lệnh backtest', '>50', '30-50', '<30 → không đủ dữ liệu'],
          ]}
        />

        <Callout type="bad" title="🚫 Lỗi backtesting phổ biến nhất:">
          "Look-ahead bias" — vô tình nhìn vào tương lai khi đang test. Cách tránh: phải quyết định entry/SL/TP trước khi kéo nến tiếp theo. Nếu bạn "thấy" giá sẽ đi đâu trước khi quyết định → không hợp lệ, phải làm lại.
        </Callout>

        <SimpleQuiz
          q="Sau 40 lệnh backtest: Win rate 42%, R:R trung bình 1:2.5. Expectancy = (0.42×2.5) - (0.58×1) = 1.05 - 0.58 = +0.47R/lệnh. Bạn nên kết luận gì?"
          opts={['Hệ thống kém — win rate dưới 50%', 'Hệ thống có edge dương (+0.47R/lệnh) — nhưng cần thêm 10+ lệnh nữa để đủ 50 trước khi kết luận chắc chắn', 'Sẵn sàng giao dịch live ngay', 'Không thể kết luận gì từ backtest']}
          correctIdx={1}
          explanation="Expectancy dương là tốt, nhưng cần thêm lệnh để đủ mẫu. 40 chưa đủ để kết luận chắc chắn. 50 lệnh là mức tối thiểu để kết luận chắc."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 2</div>
          <ul className="space-y-2">
            {['Backtesting = kiểm tra hệ thống trong lịch sử trước khi dùng tiền thật. Cần 30-50+ lệnh.', 'Tiêu chí quan trọng nhất: Expectancy dương. Profit Factor >1.2.', 'Tránh look-ahead bias: quyết định trước, xem kết quả sau.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "3. Lộ trình 90 ngày Demo",
    content: (
      <>
        <SectionHead icon={<Clock size={16} />} title="Lộ trình 90 ngày Demo — Từ zero đến sẵn sàng" desc="Ba tháng không phải thời gian dài — nhưng đủ để biến lý thuyết thành phản xạ, và phản xạ thành kỷ luật." />

        <div className="space-y-0 my-6">
          {[
            { badge: 'T1-2', color: 'bg-gray-100 dark:bg-[#181A20] text-gray-600 dark:text-[#848E9C]', title: 'Tuần 1-2: Setup & Quan sát', titleColor: 'text-gray-700 dark:text-[#9ca3b0]', desc: 'Cài đặt TradingView, MT4/MT5 Demo. Thêm indicators (EMA21/50/200, Fibonacci NNN). Xem chart hàng ngày nhưng chưa vào lệnh. Chỉ vẽ S/R và xác định xu hướng.', tasks: ['☐ Cài TradingView + Template NNN', '☐ Mở tài khoản Demo broker', '☐ Xem chart 30 phút mỗi ngày'] },
            { badge: 'T3-4', color: 'bg-gray-100 dark:bg-[#181A20] text-gray-600 dark:text-[#848E9C]', title: 'Tuần 3-4: Backtest thủ công', titleColor: 'text-gray-700 dark:text-[#9ca3b0]', desc: 'Kéo chart về 6 tháng quá khứ. Tìm và ghi lại tất cả setup NNN. Tính win rate sơ bộ. Mục tiêu: 20-30 setup có dữ liệu.', tasks: ['☐ Backtest 30 setup trên XAU/USD H4', '☐ Tính expectancy sơ bộ'] },
            { badge: 'T5-8', color: 'bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535]', title: 'Tuần 5-8: Demo Trading — Giai đoạn 1', titleColor: 'text-yellow-700 dark:text-[#FCD535]', desc: 'Bắt đầu giao dịch demo thật. Risk 1% mỗi lệnh. Ghi Journal đầy đủ sau mỗi lệnh. Mục tiêu: 15-20 lệnh với dữ liệu đầy đủ — không phải lợi nhuận.', tasks: ['☐ 15+ lệnh demo với Journal đầy đủ', '☐ Review Journal mỗi tuần', '☐ Không vi phạm Trading Plan >2 lần'] },
            { badge: 'T9-10', color: 'bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-700 dark:text-[#FCD535]', title: 'Tuần 9-10: Review & Điều chỉnh', titleColor: 'text-yellow-700 dark:text-[#FCD535]', desc: 'Nhìn lại 20+ lệnh đã thực hiện. Điều chỉnh Trading Plan nếu cần. Xác định con quỷ nào hay xuất hiện nhất với bạn. Tạo "nếu-thì" rule.', tasks: ['☐ Review toàn bộ Journal tuần 5-8', '☐ Cập nhật Trading Plan v2'] },
            { badge: 'T11-12', color: 'bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]', title: 'Tuần 11-12: Demo Trading — Giai đoạn 2', titleColor: 'text-green-700 dark:text-[#0ECB81]', desc: 'Tiếp tục với điều chỉnh từ review. Mục tiêu: thêm 15+ lệnh. Tổng cộng 35-40 lệnh. Nếu kết quả nhất quán dương → sẵn sàng đánh giá live.', tasks: ['☐ 35-40 lệnh tổng cộng', '☐ Expectancy dương trong 90 ngày', '☐ Đọc checklist 20 điều kiện live'] },
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
          ✅ <strong>Nhớ:</strong> Mục tiêu 90 ngày demo không phải kiếm tiền. Mục tiêu là: (1) tuân thủ Trading Plan {'>'} 85% số lệnh, (2) Journal đầy đủ mọi lệnh, (3) hiểu rõ con quỷ nào hay xuất hiện với bạn. Profit sẽ tự đến khi 3 điều này đạt được.
        </Callout>

        <SimpleQuiz
          q="Sau 6 tuần demo, tài khoản tăng 18% nhưng bạn đã vi phạm Trading Plan 8 lần trong 20 lệnh. Đây có phải kết quả tốt không?"
          opts={['Tốt — quan trọng là có lời, không phải tuân thủ plan', 'Không — vi phạm 40% số lệnh nguy hiểm hơn lợi nhuận 18%. Hệ thống chưa được kiểm chứng thật sự, và não bộ đang học thói quen vi phạm plan (sẽ gây hại khi live)', 'Tốt vừa — có thể chuyển sang live với vốn nhỏ', 'Cần xem thêm 5 tuần nữa mới kết luận']}
          correctIdx={1}
          explanation="Vi phạm plan 40% số lệnh là dấu hiệu đỏ. Profit trong demo có thể do may mắn; vi phạm plan thì chắc chắn là vấn đề. Process trước, profit sau."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 3</div>
          <ul className="space-y-2">
            {['90 ngày demo = T1-2 (setup) → T3-4 (backtest) → T5-8 (demo) → T9-10 (review) → T11-12 (demo v2).', 'Mục tiêu: tuân thủ plan >85%, journal đầy đủ, hiểu pattern cảm xúc của mình.', 'Profit trong demo không quan trọng bằng process discipline.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "4. Checklist 20 điều trước khi Live",
    content: (
      <>
        <SectionHead icon={<CheckSquare size={16} />} title="Checklist 20 điều — Trước khi đặt tiền thật đầu tiên" desc="Đây là checkpoint nghiêm ngặt nhất trong toàn bộ hành trình. Phải đánh dấu ĐỦ 20 điều kiện mới được phép chuyển sang tài khoản thật. Không thương lượng." />
        <GoLiveChecklist />
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "5. Vòng lặp Cải thiện Liên tục",
    content: (
      <>
        <SectionHead icon={<RefreshCw size={16} />} title="Vòng lặp Cải thiện Liên tục" desc="Trading không có điểm kết thúc để học. Trader tốt nhất không phải người biết nhiều nhất — mà là người học nhanh nhất từ dữ liệu thực tế của chính mình." />

        <SectionHead icon="🔄" title="Vòng lặp Review hàng tháng" />
        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { icon: '📊', step: '1. Thu thập dữ liệu', sub: 'Tổng hợp Journal tháng' },
              { icon: '🔍', step: '2. Phân tích pattern', sub: 'Tìm điểm mạnh/yếu' },
              { icon: '🛠', step: '3. Điều chỉnh plan', sub: 'Update Trading Plan' },
              { icon: '▶', step: '4. Thực thi tháng mới', sub: 'Áp dụng thay đổi' },
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

        <SectionHead icon="❓" title="12 câu hỏi review tháng — Phải trả lời tất cả" />
        <CyberTable
          headers={['#', 'Câu hỏi review', 'Dữ liệu cần xem']}
          rows={[
            ['1', 'Win rate tháng này là bao nhiêu?', 'Journal: số thắng/tổng lệnh'],
            ['2', 'R:R trung bình thực tế là bao nhiêu?', 'Journal: avg reward/avg risk'],
            ['3', 'Expectancy tháng này dương hay âm?', 'Tính từ câu 1 và 2'],
            ['4', 'Tôi đã tuân thủ plan bao nhiêu % số lệnh?', 'Journal: cột "có đúng hệ thống?"'],
            ['5', 'Con quỷ nào xuất hiện nhiều nhất tháng này?', 'Journal: cột "con quỷ"'],
            ['6', 'Tôi hay thua vào thời điểm nào trong ngày/tuần?', 'Journal: ngày giờ của lệnh thua'],
            ['7', 'Setup nào có win rate cao nhất với tôi?', 'Journal: lọc theo setup type'],
            ['8', 'Tôi có vi phạm Daily Loss Limit không?', 'Journal + tài khoản'],
            ['9', 'Max Drawdown tháng này là bao nhiêu?', 'Equity curve tài khoản'],
            ['10', 'Điều tôi làm tốt nhất tháng này là gì?', 'Journal: những lệnh điểm cao'],
            ['11', 'Điều cần cải thiện nhất tháng tới là gì?', 'Journal: pattern lỗi lặp lại'],
            ['12', 'Trading Plan có cần cập nhật gì không?', 'Từ câu trả lời 1-11'],
          ]}
        />

        <SectionHead icon="📚" title="Học gì tiếp theo — Lộ trình phát triển" />
        <CyberTable
          headers={['Giai đoạn', 'Kiến thức nên học tiếp', 'Tại sao']}
          rows={[
            ['6-12 tháng', 'Smart Money Concept (SMC) cơ bản, Order Blocks, Fair Value Gap', 'Hiểu hành vi Smart Money — tại sao Smart Money "quét SL" trước khi đi'],
            ['1-2 năm', 'ICT (Inner Circle Trader), Market Structure nâng cao', 'Framework phân tích price action chuyên sâu nhất hiện có'],
            ['2-3 năm', 'Wyckoff Method, Elliott Wave, Order Flow', 'Đọc "footprint" của tổ chức lớn trong thị trường'],
            ['3+ năm', 'Quantitative analysis, Algo trading cơ bản', 'Xây dựng hệ thống có thể backtest tự động và scale'],
          ]}
        />

        <Callout type="warn">
          ⚠️ <strong>Nguyên tắc học:</strong> Master một thứ trước khi học thứ tiếp theo. Nhiều trader thua vì liên tục "nhảy" từ hệ thống này sang hệ thống khác mà không cho đủ thời gian kiểm chứng. Ít nhất 3-6 tháng với mỗi hệ thống trước khi quyết định.
        </Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 5</div>
          <ul className="space-y-2">
            {['Review hàng tháng: thu thập dữ liệu → phân tích → điều chỉnh → thực thi. Vòng lặp không kết thúc.', '12 câu hỏi review tháng — trả lời đủ 12 mỗi tháng = improvement tốt nhất có thể.', 'Lộ trình: NNN → SMC → ICT → Wyckoff. Mỗi giai đoạn ít nhất 6 tháng.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "6. Lời Tuyên Thệ của Trader",
    content: (
      <>
        <SectionHead icon={<Shield size={16} />} title="Lời Tuyên Thệ của Người Trader" desc="Đây không phải bài học — đây là nghi lễ. Điền tên của bạn và tuyên thệ với chính mình." />

        <TradersOath />

        <Callout type="ok">
          ✅ <strong>Tại sao tuyên thệ lại có ý nghĩa?</strong> Theo nghiên cứu của Dominic Voge (Princeton): khi bạn công khai cam kết với chính mình (và lý tưởng là với người khác), xác suất tuân thủ cam kết tăng lên đáng kể. Việc viết tên xuống và đọc lời tuyên thệ kích hoạt vùng não liên quan đến identity — bạn không còn chỉ là "người đang học trading" mà là "một Trader đã cam kết với hệ thống của mình."
        </Callout>
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "7. Quiz tổng hợp 6 chương",
    content: (
      <>
        <SectionHead icon={<Star size={16} />} title="Bài kiểm tra cuối cùng" desc="20 câu hỏi bao phủ tất cả kiến thức từ Chương 1 đến Chương 6. Đây là bài kiểm tra tốt nghiệp. Đạt 15/20 để nhận chứng chỉ." />

        {[
          { q: '[Ch.1] Ai là nhóm tham gia thị trường lớn nhất về volume?', opts: ['Retail trader', 'Ngân hàng trung ương và tổ chức tài chính (Smart Money) — chiếm ~90% volume', 'Hedge fund', 'Nhà đầu tư cá nhân'], c: 1, expl: 'Smart Money (Ngân hàng TW, tổ chức tài chính lớn) chiếm phần lớn volume thị trường. Retail trader chỉ là thiểu số.' },
          { q: '[Ch.1] "Buy the rumor, sell the news" có nghĩa là gì?', opts: ['Mua tin tốt, bán tin xấu', 'Thị trường phản ánh kỳ vọng trước — khi tin chính thức ra thường là lúc đã quá muộn để mua', 'Chỉ giao dịch khi có tin tức', 'Đây là chiến lược mua bán chứng khoán'], c: 1, expl: 'Thị trường discount thông tin trước. Khi tin ra chính thức, kỳ vọng đã được phản ánh vào giá — đó là lúc Smart Money bán ra.' },
          { q: '[Ch.2] Role Reversal trong S/R là gì?', opts: ['Đảo vai trò giữa buyer và seller', 'Kháng cự bị phá → trở thành hỗ trợ; hỗ trợ bị phá → trở thành kháng cự', 'Đảo chiều xu hướng', 'Khi EMA21 cắt EMA50'], c: 1, expl: 'Role Reversal: vùng kháng cự bị phá qua thành vùng hỗ trợ và ngược lại. Đây là một trong những khái niệm S/R quan trọng nhất.' },
          { q: '[Ch.2] RSI Bullish Divergence xảy ra khi?', opts: ['RSI > 70 cùng lúc giá tăng', 'Giá tạo đáy thấp hơn nhưng RSI tạo đáy cao hơn — tín hiệu đảo chiều tăng', 'RSI tăng lên 50', 'EMA21 cắt lên EMA50'], c: 1, expl: 'Bullish Divergence: giá xuống thấp hơn nhưng RSI không xuống thấp hơn → momentum yếu dần → tín hiệu đảo chiều tăng tiềm năng.' },
          { q: '[Ch.3] Trong phương pháp NNN②, điều kiện chính xác của nến ôm là gì?', opts: ['Thân nến sau nhỏ hơn thân nến trước', 'H_mẹ ≥ H_con VÀ L_mẹ ≤ L_con — so sánh toàn bộ biên độ High-Low', 'Nến sau màu ngược với nến trước', 'Close nến sau nằm trong thân nến trước'], c: 1, expl: 'NNN②: nến mẹ phải bao trọn nến con hoàn toàn về biên độ (High và Low). Không chỉ so sánh thân nến mà là toàn bộ High-Low.' },
          { q: '[Ch.3] Fibonacci NNN dùng mức nào để chốt lời (TP)?', opts: ['38% và 62%', '127% (TP1 — chốt 50%) và 162% (TP2 — chốt hết)', '50% và 100%', '79% và 88%'], c: 1, expl: 'NNN④ Fibonacci: TP1 tại 127% (chốt 50% vị thế), TP2 tại 162% (chốt toàn bộ). Entry vùng 62-79%.' },
          { q: '[Ch.4] Tài khoản $8,000, risk 1.5%, SL = 60pip, pip value $1. Position size là bao nhiêu?', opts: ['2 mini lot ($8k×1.5%=$120; $120/60=$2)', '1.5 mini lot', '3 mini lot', '0.5 mini lot'], c: 0, expl: 'Risk$ = $8,000 × 1.5% = $120. Size = $120 / (60 × $1) = 2 mini lot.' },
          { q: '[Ch.4] Mất 50% tài khoản cần bao nhiêu % lợi nhuận để về vốn?', opts: ['50%', '75%', '100% — vì $10k→$5k, cần tăng gấp đôi từ $5k', '150%'], c: 2, expl: 'Toán học bất đối xứng: mất 50% ($10k→$5k) cần tăng 100% để về lại $10k. Đây là lý do quản lý vốn là tối thượng.' },
          { q: '[Ch.4] Anti-Martingale là gì?', opts: ['Tăng size gấp đôi sau mỗi lệnh thua', 'Tăng size khi chuỗi thắng, giảm size khi chuỗi thua — ngược hoàn toàn với Martingale', 'Giữ size cố định mãi', 'Giảm size dần theo thời gian'], c: 1, expl: 'Anti-Martingale: tăng risk khi đang thắng (riding momentum), giảm risk khi đang thua (bảo toàn vốn). Ngược với Martingale nguy hiểm.' },
          { q: '[Ch.5] Kahneman gọi gì là "Cognitive Hijacking"?', opts: ['Khi bị hack tài khoản', 'Khi System 1 (cảm xúc) chiếm quyền điều khiển hoàn toàn trước khi System 2 (lý trí) kịp can thiệp', 'Khi quản lý rủi ro kém', 'Khi indicator cho tín hiệu sai'], c: 1, expl: 'Cognitive Hijacking: System 1 (bản năng/cảm xúc) "cướp quyền" hoàn toàn — ví dụ khi giá rơi đột ngột, bạn đóng lệnh trước khi kịp phân tích.' },
          { q: '[Ch.5] Con quỷ nào liên quan đến "Narrative Fallacy" của Sapiens?', opts: ['FOMO', 'Revenge Trading', 'Overconfidence — não tạo câu chuyện "tôi giỏi hơn thị trường" sau chuỗi thắng ngắn', 'Loss Aversion'], c: 2, expl: 'Overconfidence sử dụng Narrative Fallacy: sau 5 lệnh thắng, não tự viết câu chuyện "tôi đã hiểu thị trường" thay vì "tôi may mắn trong chuỗi ngắn".' },
          { q: '[Ch.5] Tại sao Trading Journal giúp kiểm soát 7 con quỷ?', opts: ['Vì nó giúp ghi nhớ tên con quỷ', 'Habit Tracking: đo lường tạo nhận thức, nhận thức kích hoạt thay đổi hành vi tự động', 'Vì viết bằng tay tốt cho trí nhớ', 'Vì journal là yêu cầu của broker'], c: 1, expl: 'Theo Atomic Habits: "You don\'t rise to the level of your goals, you fall to the level of your systems." Journal = hệ thống đo lường hành vi, tạo nhận thức, dẫn đến thay đổi tự động.' },
          { q: '[Ch.6] Tiêu chí quan trọng nhất để đánh giá hệ thống backtest là gì?', opts: ['Win rate trên 60%', 'Expectancy dương sau 30+ lệnh — dù win rate thấp, expectancy dương = hệ thống có edge', 'Profit factor trên 2', 'Không có lệnh nào thua quá 50pip'], c: 1, expl: 'Expectancy = (WR×AvgWin) - (LR×AvgLoss). Dương là điều kiện cần và đủ để hệ thống viable. Win rate cao chưa đủ nếu avg loss quá lớn.' },
          { q: '[Ch.6] Bạn đã demo 30 lệnh, win rate 38%, R:R trung bình 1:2.2. Expectancy ≈ +0.03R/lệnh. Bạn nên làm gì tiếp theo?', opts: ['Chuyển sang live ngay', 'Tiếp tục demo thêm 20 lệnh nữa để có đủ mẫu, và tối ưu R:R để cải thiện expectancy', 'Bỏ hệ thống vì win rate quá thấp', 'Tăng risk để bù vào win rate thấp'], c: 1, expl: '30 lệnh chưa đủ mẫu (cần 50). Expectancy dương nhưng quá nhỏ (+0.03R). Cần thêm dữ liệu và tối ưu hệ thống trước khi live.' },
          { q: '[Ch.6] Lộ trình 90 ngày demo, tuần 5-8 có mục tiêu chính là gì?', opts: ['Kiếm lợi nhuận tối đa trên demo', 'Tuân thủ Trading Plan + Journal đầy đủ mọi lệnh — không phải lợi nhuận', 'Backtest thêm 50 setup', 'Chuyển sang live sớm nếu demo tốt'], c: 1, expl: 'Tuần 5-8 là giai đoạn Demo 1: mục tiêu là process (tuân thủ plan + journal đầy đủ), không phải profit. Profit là kết quả của process tốt.' },
          { q: '[Tổng hợp] Trader A: win rate 68%, nhưng avg loss = $300, avg win = $80. Trader B: win rate 40%, avg loss = $60, avg win = $180. Ai profitable hơn về dài hạn?', opts: ['Trader A vì win rate cao hơn nhiều', 'Trader B — Expectancy B = 0.4×180-0.6×60=72-36=+$36/lệnh. Trader A = 0.68×80-0.32×300=54.4-96=-$41.6/lệnh!', 'Trader A vì thua ít lệnh hơn', 'Cả hai đều profitable'], c: 1, expl: 'Expectancy quyết định tất cả: Trader A có expectancy âm dù win rate 68%. Trader B có expectancy +$36/lệnh dù win rate chỉ 40%.' },
          { q: '[Tổng hợp] Giá BTC vừa tăng 20% trong 3 ngày, tin tức khắp nơi đều bullish, mọi người trong group đang mua. Bạn không có setup NNN nào. Theo kiến thức 6 chương, bạn nên làm gì?', opts: ['Mua ngay vì momentum quá mạnh', 'Đứng ngoài — không có setup = không có lệnh. Đây là combo FOMO + Herding, hai trong 7 con quỷ nguy hiểm nhất', 'Sell vì giá đã tăng quá', 'Mua một ít để không bỏ lỡ hoàn toàn'], c: 1, expl: 'Không có setup = không có lệnh, bất kể momentum mạnh đến đâu. FOMO + Herding là combo nguy hiểm nhất trong 7 con quỷ.' },
          { q: '[Tổng hợp] Sau chuỗi 3 lệnh thua liên tiếp, bạn đang lỗ 4% tài khoản trong ngày (Daily Limit là -5%). Tâm lý đang rất bực bội. Bước tiếp theo đúng nhất?', opts: ['Vào lệnh thứ 4 ngay để gỡ lại — cơ hội vẫn còn', 'Dừng giao dịch ngay hôm nay dù chưa chạm -5% — amygdala hijack đang diễn ra, bất kỳ lệnh nào lúc này cũng là Revenge Trading', 'Vào lệnh nhỏ hơn để giảm rủi ro', 'Tìm setup tốt hơn và cố gắng thêm 1 lệnh nữa'], c: 1, expl: 'Amygdala hijack + bực bội = Revenge Trading sắp diễn ra. Dừng ngay, dù chưa chạm Daily Limit. Kỷ luật dừng sớm quan trọng hơn chờ chạm ngưỡng.' },
          { q: '[Tổng hợp] Sau 6 chương học, điều quan trọng nhất bạn rút ra là gì?', opts: ['Phương pháp NNN là hệ thống trading tốt nhất', 'Quản lý vốn 1-2% là bất khả xâm phạm', 'Kỷ luật và nhất quán với hệ thống đã kiểm chứng quan trọng hơn bất kỳ kỹ thuật nào — "You do not rise to the level of your goals, you fall to the level of your systems"', 'Tránh 7 con quỷ là tất cả những gì cần làm'], c: 2, expl: '"You do not rise to the level of your goals, you fall to the level of your systems." — James Clear. Kỷ luật với hệ thống đã kiểm chứng là nền tảng của mọi thứ.' },
          { q: '[Tổng hợp] Sắp xếp đúng thứ tự ưu tiên trong giao dịch:', opts: ['Kỹ thuật → Quản lý vốn → Tâm lý', 'Tâm lý → Quản lý vốn → Kỹ thuật (bạo thực tốt + tâm lý vững + vốn an toàn mới tận dụng kỹ thuật)', 'Quản lý vốn → Kỹ thuật → Tâm lý', 'Tất cả đều quan trọng như nhau, không có thứ tự'], c: 1, expl: 'Thứ tự đúng: Tâm lý → Quản lý vốn → Kỹ thuật. Không có tâm lý vững → quản lý vốn thất bại. Không có quản lý vốn → kỹ thuật tốt vẫn thua.' },
        ].map((quiz, qi) => (
          <SimpleQuiz key={qi} q={quiz.q} opts={quiz.opts} correctIdx={quiz.c} explanation={quiz.expl} />
        ))}
      </>
    )
  },
  {
    chapter: "Chương 6: Xây dựng Hệ thống & Thực chiến", title: "8. Chứng chỉ tốt nghiệp",
    content: (
      <>
        <SectionHead icon={<Award size={16} />} title="Chúc mừng — Hành trình đã hoàn thành" desc="Bạn đã đi qua 6 chương, học hơn 80 bài, chiến đấu với 7 con quỷ, và xây dựng hệ thống giao dịch của riêng mình." />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-yellow-400 dark:border-[#FCD535]/50 rounded-2xl p-6 my-6">
          <div className="text-[13.5px] font-mono text-yellow-600 dark:text-[#FCD535] uppercase tracking-widest mb-4">Hành trình đã hoàn thành</div>
          <div className="flex gap-2 mb-4">{Array(6).fill(0).map((_, i) => <div key={i} className="flex-1 h-2 rounded-full bg-yellow-500 dark:bg-[#FCD535]" />)}</div>
          <div className="text-center text-[15.5px] text-gray-500 dark:text-[#848E9C] mt-2">Ch.1 Nền tảng → Ch.2 Kỹ thuật → Ch.3 NNN Methods → Ch.4 Quản lý vốn → Ch.5 Tâm lý → Ch.6 Thực chiến</div>
        </div>

        <GraduationCertificate />

        <SectionHead icon="🔜" title="Bước đi tiếp theo" />
        <div className="space-y-4 my-6">
          {[
            { step: 'Tuần này', desc: 'Mở TradingView, thiết lập chart template NNN, bắt đầu quan sát hàng ngày mà không vào lệnh.' },
            { step: 'Tháng 1', desc: 'Backtest 30 setup trên thị trường bạn chọn. Ghi vào Backtest Tracker. Tính Expectancy.' },
            { step: 'Tháng 2-3', desc: 'Demo trading với Trading Plan đã viết. Journal mọi lệnh. Review hàng tuần.' },
            { step: 'Tháng 4+', desc: 'Nếu đã đạt 17/20 điều kiện trong Checklist → bắt đầu live với số vốn nhỏ nhất có thể.' },
            { step: 'Liên tục', desc: 'Review hàng tháng, cải thiện, học thêm SMC và ICT khi đã vững nền tảng.' },
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
            "Thị trường tài chính là một cuộc hành trình dài — không phải cuộc đua.<br />
            Người chiến thắng không phải ai nhanh nhất, mà là ai <strong className="not-italic">tồn tại lâu nhất với kỷ luật nhất quán</strong>."
          </div>
        </div>
      </>
    )
  },
];

export default CHAPTER_6_DATA_VN;
