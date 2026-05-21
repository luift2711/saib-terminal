import { Brain, BookOpen, Map, Star, TrendingUp, Ruler, Target, FileText, Scale, CheckCircle, XCircle, RefreshCw, BarChart2, AlertTriangle, TrendingDown, MinusCircle, Dices, PartyPopper, Dumbbell, Library, Trophy, Users, Radio, ShoppingCart, Zap, Landmark, DollarSign, Clock, Lightbulb, Lock, ArrowRight, Skull, Flame, Edit2, Compass, Shield, Activity, Flag, Award, Crosshair, Hammer, Wind, Eye, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { SectionHead, StoryBox, Callout, CyberTable, ExerciseBox } from '../Sharedcomponents.jsx';

// ==========================================
// CÁC COMPONENT TƯƠNG TÁC ĐỘC QUYỀN CỦA CHƯƠNG 3
// ==========================================

const SimpleQuiz = ({ q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-5 flex items-center gap-3 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <span className="text-xs font-black tracking-widest uppercase text-yellow-600 dark:text-[#FCD535] bg-yellow-50 dark:bg-[#FCD535]/10 border border-yellow-200 dark:border-[#FCD535]/30 px-4 py-1.5 rounded-full shadow-sm"><Edit2 size={16} className="inline mr-1"/> CÂU HỎI KIỂM TRA</span>
      </div>
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
            <strong className="block text-lg mb-2">{selected === correctIdx ? '<CheckCircle size={18} className="inline mr-2"/> Chính xác!' : '<XCircle size={18} className="inline mr-2"/> Chưa đúng.'}</strong> {explanation}
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
      { lbl: 'Swing Low (0%)', val: low.toFixed(2), color: 'text-gray-500 dark:text-[#848E9C]', type: 'Điểm xuất phát' },
      { lbl: '88% Retracement', val: m88.toFixed(2), color: 'text-yellow-600 dark:text-[#FCD535]', type: '<AlertTriangle size={14} className="inline mr-1 text-yellow-500"/> Entry thận trọng' },
      { lbl: '79% Retracement', val: m79.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: 'Entry zone' },
      { lbl: '62% Retracement', val: m62.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: '⭐ Entry ưu tiên' },
      { lbl: 'Swing High (100%)', val: high.toFixed(2), color: 'text-black dark:text-white', type: 'Điểm kháng cự' },
      { lbl: '127% Extension', val: e127.toFixed(2), color: 'text-blue-600 dark:text-[#378ADD]', type: 'TP1 — Chốt 50%' },
      { lbl: '162% Extension', val: e162.toFixed(2), color: 'text-blue-600 dark:text-[#378ADD]', type: 'TP2 — Chốt hết' },
    ];
    note = `📐 Uptrend: Entry tốt nhất tại $${m62.toFixed(0)}-$${m79.toFixed(0)} (62-79%). SL dưới $${(low - 10).toFixed(0)} (Swing Low-10pip). TP1=$${e127.toFixed(0)}, TP2=$${e162.toFixed(0)}.`;
  } else {
    const m62 = low + rng * 0.62, m79 = low + rng * 0.79, m88 = low + rng * 0.88;
    const e127 = low - rng * 0.27, e162 = low - rng * 0.62;
    rows = [
      { lbl: 'Swing High (0%)', val: high.toFixed(2), color: 'text-gray-500 dark:text-[#848E9C]', type: 'Điểm xuất phát' },
      { lbl: '62% Retracement', val: m62.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: '⭐ SELL zone ưu tiên' },
      { lbl: '79% Retracement', val: m79.toFixed(2), color: 'text-green-600 dark:text-[#0ECB81]', type: 'SELL zone' },
      { lbl: '88% Retracement', val: m88.toFixed(2), color: 'text-yellow-600 dark:text-[#FCD535]', type: '<AlertTriangle size={14} className="inline mr-1 text-yellow-500"/> SELL thận trọng' },
      { lbl: 'Swing Low (100%)', val: low.toFixed(2), color: 'text-black dark:text-white', type: 'Điểm hỗ trợ' },
      { lbl: '127% Extension', val: e127.toFixed(2), color: 'text-red-600 dark:text-[#F6465D]', type: 'TP1 — Chốt 50%' },
      { lbl: '162% Extension', val: e162.toFixed(2), color: 'text-red-600 dark:text-[#F6465D]', type: 'TP2 — Chốt hết' },
    ];
    note = `📐 Downtrend: SELL tốt nhất tại $${m62.toFixed(0)}-$${m79.toFixed(0)} (62-79%). SL trên $${(high + 10).toFixed(0)} (Swing High+10pip). TP1=$${e127.toFixed(0)}, TP2=$${e162.toFixed(0)}.`;
  }

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Ruler size={24} className="text-[#c8922a] dark:text-[#00d084] shrink-0" /><h3 className="font-bold text-black dark:text-white text-lg flex-1">Fibonacci Calculator NNN</h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">Interactive</span>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div><label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Swing Low ($)</label><input type="number" value={low} onChange={e=>setLow(Number(e.target.value)||0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Swing High ($)</label><input type="number" value={high} onChange={e=>setHigh(Number(e.target.value)||0)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" /></div>
          <div><label className="text-[13px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Hướng</label><select value={dir} onChange={e=>setDir(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[16px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"><option value="bull">Uptrend (Low→High)</option><option value="bear">Downtrend (High→Low)</option></select></div>
        </div>
        <div className="overflow-x-auto border border-gray-200 dark:border-[#2B3139] rounded-2xl mb-6">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead><tr className="bg-gray-100 dark:bg-[#181A20] text-gray-500 dark:text-[#848E9C] text-[13px] uppercase tracking-widest border-b border-gray-200 dark:border-[#2B3139]">
              <th className="p-4 font-black">Mức Fibonacci</th><th className="p-4 font-black">Giá ($)</th><th className="p-4 font-black">Loại</th>
            </tr></thead>
            <tbody className="text-[15px]">
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-[#2B3139]/50 last:border-0 hover:bg-white dark:hover:bg-[#1A2639]/30">
                  <td className={`p-4 font-bold ${r.color}`}>{r.lbl}</td><td className={`p-4 font-mono font-black ${r.color}`}>${r.val}</td><td className="p-4 text-gray-600 dark:text-[#848E9C]">{r.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 rounded-2xl text-[15px] leading-relaxed bg-blue-50 dark:bg-[#378ADD]/10 text-blue-800 dark:text-[#378ADD] border border-blue-200 dark:border-transparent">{note}</div>
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
              <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase ${badgeClass}`}>{type.split('|')[0]}</span>
              <span className="text-[13px] text-gray-500 dark:text-[#848E9C] hidden md:block">{type.split('|')[1]}</span>
            </div>
          </div>
        </div>
        <span className={`text-2xl text-gray-400 transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
      </div>
      {isOpen && (
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#0B0E11] border-t border-gray-200 dark:border-[#2B3139] animate-in fade-in transition-colors">
          <div className="bg-gray-100 dark:bg-[#1A2639]/50 border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 mb-6">
            <div className="text-[11px] font-mono font-black tracking-[0.15em] text-yellow-600 dark:text-[#FCD535] mb-3 uppercase">Bản chất</div>
            <div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]" dangerouslySetInnerHTML={{__html: essence}}></div>
          </div>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 border border-yellow-300 dark:border-[#FCD535]/50 text-yellow-800 dark:text-[#FCD535] text-xs font-bold flex items-center justify-center shrink-0 mt-1">{idx+1}</div>
                <div className="text-[16px] leading-[1.8] text-gray-800 dark:text-[#EAECEF]" dangerouslySetInnerHTML={{__html: step}}></div>
              </div>
            ))}
          </div>
          {isWarning && <div className="mt-6 p-4 bg-red-50 dark:bg-[#F6465D]/10 border border-red-200 dark:border-[#F6465D]/30 text-red-800 dark:text-[#F6465D] rounded-xl text-[14px] leading-relaxed" dangerouslySetInnerHTML={{__html: isWarning}}></div>}
        </div>
      )}
    </div>
  );
};

const FinalQuizCh3 = () => {
  const qs = [
    {q:'Nến thân ngắn xuất hiện tại vùng kháng cự $2,050 vàng sau uptrend. D1 đang uptrend. Bạn đặt Buy Stop H+10 và Sell Stop L-10. Giá bứt phá xuống dưới L và kích hoạt Sell Stop. Bạn làm gì tiếp theo?',opts:['Giữ cả hai lệnh','Hủy Buy Stop ngay, giữ Sell Stop và quản lý lệnh','Đóng Sell Stop vì xu hướng D1 vẫn tăng','Thêm vào Sell Stop'],c:1},
    {q:'Điều kiện CHÍNH XÁC của nến ôm (NNN②) là gì?',opts:['Thân nến sau nhỏ hơn thân nến trước','H_mẹ ≥ H_con VÀ L_mẹ ≤ L_con (so sánh H và L tổng)','Nến sau màu ngược nến trước','Nến sau đóng cửa trong thân nến trước'],c:1},
    {q:'EMA21 đang dốc lên. Giá pullback về test EMA21 rồi xuất hiện Dragonfly Doji bật lên. Đây là setup gì theo NNN?',opts:['Chỉ là NNN① (nến thân ngắn)','Chỉ là NNN③ (EMA21)','NNN① + NNN③ đồng thời hội tụ = tín hiệu mạnh hơn nhiều','Không có setup vì Doji không đủ mạnh'],c:2},
    {q:'Giá pullback về Fibonacci 62% và xuất hiện Bullish Engulfing. R:R theo hệ NNN là bao nhiêu (TP1 = 127%, SL = dưới Swing Low)?',opts:['Tùy thuộc vào Swing Low và Swing High cụ thể','Luôn là 1:2','Luôn là 1:3','R:R không quan trọng với NNN'],c:0},
    {q:'Morning Star xuất hiện ở đâu thì có giá trị nhất?',opts:['Bất cứ đâu trong chart','Sau uptrend tại vùng kháng cự','Sau downtrend tại vùng hỗ trợ — đặc biệt trùng Fibonacci 62/79%','Giữa sideway range'],c:2},
    {q:'Tại sao thầy NNN dùng mức 88% trong Fibonacci mặc dù nó gần 100% (Swing Low)?',opts:['88% là mức Fibonacci tiêu chuẩn','Để có SL rộng hơn giúp không bị stopout khi giá về sâu 88% trước khi bật lên','88% không quan trọng','Để có TP lớn hơn'],c:1},
    {q:'Bullish Engulfing xuất hiện giữa uptrend, không gần S/R nào. Đây là tín hiệu gì?',opts:['BUY mạnh — Engulfing luôn là tín hiệu tốt','Không đáng tin — Engulfing cần bối cảnh đúng (sau downtrend/tại S/R)','SELL — đây là đỉnh','Tiếp tục uptrend, mua thêm'],c:1},
    {q:'Bạn thấy: D1 uptrend + Fibonacci 62% + EMA21 hội tụ tại cùng một vùng + Hammer + RSI divergence bullish. Đây là bao nhiêu tín hiệu hội tụ?',opts:['2 tín hiệu','3 tín hiệu','4 tín hiệu','5 tín hiệu — Setup xếp hạng A++, xứng đáng size lớn hơn'],c:3},
    {q:'Three White Soldiers xuất hiện sau Morning Star ở đáy. RSI đang ở 78. Bạn nên BUY không?',opts:['BUY full size — 3 nến xanh = momentum cực mạnh','Thận trọng — RSI 78 (overbought). Chờ pullback về EMA21 thay vì đuổi theo giá đã tăng xa','Không bao giờ BUY khi RSI >70','SELL vì RSI overbought'],c:1},
    {q:'Trong NNN④, sau khi giá đạt TP1 (127%), bước TIẾP THEO là gì?',opts:['Đóng toàn bộ lệnh','Chốt 50% vị thế tại TP1, dời SL phần còn lại về điểm entry (Break Even)','Thêm vào vị thế vì giá đang mạnh','Dời SL về 79% Fibonacci'],c:1},
    {q:'Shooting Star xuất hiện tại đỉnh uptrend, kháng cự $2,100. Bóng trên = 120 pip, thân = 30 pip. Bạn vào Sell Stop tại L − 10pip. SL đặt ở đâu?',opts:['Dưới thân nến − 10pip','Trên H của Shooting Star + 10pip ($2,100 + bóng trên + 10)','Tại đường EMA21','Tại mức 50% Fibonacci'],c:1},
    {q:'Cặp EUR/USD H4: EMA21 dốc lên, giá vừa đóng cửa DƯỚI EMA21 lần đầu tiên sau 2 tuần. D1 vẫn uptrend. Đây là tín hiệu gì?',opts:['Tín hiệu SELL — giá đã xuyên phá EMA21','CHoCH cảnh báo sớm — không mở Buy mới, xem xét thắt chặt SL của Buy cũ','Tín hiệu mua thêm vì D1 vẫn tăng','Không có ý nghĩa gì'],c:1},
    {q:'Harami Bearish xuất hiện ở đỉnh uptrend. Bạn nên làm gì NGAY LẬP TỨC?',opts:['SELL full size ngay','Đóng 50% lệnh Buy đang giữ (chốt lời bảo toàn), chờ xác nhận thêm trước khi SELL hoàn toàn','Không làm gì — Harami yếu','Thêm vào Buy'],c:1},
    {q:'Fibonacci NNN④ dùng mức 127% và 162% để làm gì?',opts:['Xác định vùng hỗ trợ','TP1 (127% — chốt 50%) và TP2 (162% — chốt hết) cho lệnh đã vào từ vùng Retracement 62-88%','Entry điểm thứ 2','Stop Loss'],c:1},
    {q:'NGUYÊN TẮC VÀNG quan trọng nhất của hệ thống NNN là gì?',opts:['Luôn dùng EMA21','Confluence: chỉ vào lệnh khi ≥3 tín hiệu NNN/pattern cùng hội tụ một vùng giá — không bao giờ vào lệnh chỉ vì 1 tín hiệu','Fibonacci mức 62% là entry tốt nhất','Luôn đặt SL 10pip'],c:1}
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
          <p className="text-gray-600 dark:text-[#848E9C] text-[16px] mb-6">{score >= 12 ? <><Trophy size={18} className="inline mr-1 text-yellow-500" /> Xuất sắc! Bạn đã sẵn sàng học Quản lý Vốn.</> : <><Dumbbell size={48} className="mx-auto text-blue-500 mb-4" /> Chưa đạt 12/15. Hãy đọc lại phần NNN Methods và Confluence trước.</>}</p>
          <button onClick={() => {setAnswers({}); setShowRes(false);}} className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:bg-black transition-colors">Làm lại</button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SVG CHARTS MINH HỌA 4 PHƯƠNG PHÁP NNN
// ==========================================

const NNNChart1 = () => (
  <div className="bg-[#050c0f] border border-gray-800 rounded-2xl p-4 my-8 overflow-x-auto">
    <div className="text-[11px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN① Minh họa — Nến thân ngắn (Doji) tại Support · Buy Stop &amp; Sell Stop</div>
    <svg viewBox="0 0 700 220" className="w-full h-auto min-w-[500px]" role="img">
      {/* Support zone band */}
      <rect x="0" y="145" width="700" height="35" fill="#00d08415" rx="0"/>
      <line x1="0" y1="145" x2="700" y2="145" stroke="#00d084" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6"/>
      <line x1="0" y1="180" x2="700" y2="180" stroke="#00d084" strokeWidth="1" strokeDasharray="6 3" opacity="0.3"/>
      <text x="10" y="165" fill="#00d084" fontSize="11" fontFamily="monospace" opacity="0.8">SUPPORT ZONE</text>
      {/* 4 downtrend candles */}
      <line x1="60" y1="30" x2="60" y2="105" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="52" y="40" width="16" height="52" fill="#ff5252" rx="2" opacity="0.9"/>
      <line x1="120" y1="55" x2="120" y2="120" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="112" y="65" width="16" height="46" fill="#ff5252" rx="2" opacity="0.9"/>
      <line x1="180" y1="78" x2="180" y2="138" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="172" y="88" width="16" height="42" fill="#ff5252" rx="2" opacity="0.9"/>
      <line x1="240" y1="105" x2="240" y2="155" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="232" y="112" width="16" height="38" fill="#ff5252" rx="2" opacity="0.9"/>
      {/* Doji (Nến thân ngắn) at support */}
      <line x1="305" y1="118" x2="305" y2="172" stroke="#9ca3b0" strokeWidth="2"/>
      <rect x="297" y="143" width="16" height="5" fill="#e8eaf0" rx="1"/>
      <rect x="293" y="130" width="24" height="5" fill="transparent" rx="1"/>
      <text x="328" y="153" fill="#e8eaf0" fontSize="11" fontFamily="monospace" fontWeight="bold">Doji tại S/R</text>
      {/* BUY STOP line */}
      <line x1="280" y1="116" x2="650" y2="116" stroke="#00d084" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.85"/>
      <rect x="330" y="104" width="200" height="18" fill="#00d08425" rx="3"/>
      <text x="338" y="117" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">BUY STOP (H + 10pip)</text>
      {/* SELL STOP line */}
      <line x1="280" y1="175" x2="540" y2="175" stroke="#ff5252" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.85"/>
      <rect x="330" y="177" width="200" height="18" fill="#ff525220" rx="3"/>
      <text x="338" y="190" fill="#ff5252" fontSize="11" fontFamily="monospace" fontWeight="bold">SELL STOP (L − 10pip)</text>
      {/* Breakout green candle */}
      <line x1="380" y1="72" x2="380" y2="135" stroke="#00d084" strokeWidth="2"/>
      <rect x="372" y="78" width="16" height="50" fill="#00d084" rx="2"/>
      {/* Price continues upward */}
      <polyline points="388,80 430,55 480,35 535,18" stroke="#00d084" strokeWidth="2.5" fill="none" opacity="0.75"/>
      <circle cx="430" cy="55" r="3.5" fill="#00d084" opacity="0.8"/>
      <circle cx="480" cy="35" r="3.5" fill="#00d084" opacity="0.8"/>
      {/* BUY activated label */}
      <rect x="548" y="8" width="145" height="22" fill="#00d08440" rx="4"/>
      <text x="558" y="23" fill="#00d084" fontSize="12" fontFamily="monospace" fontWeight="bold">BUY kích hoạt! ↑</text>
      {/* Cancel SELL STOP label */}
      <rect x="555" y="165" width="135" height="22" fill="#ff525215" rx="4"/>
      <text x="562" y="180" fill="#ff5252" fontSize="11" fontFamily="monospace">✗ Hủy Sell Stop</text>
      {/* SL reference line */}
      <line x1="295" y1="182" x2="415" y2="182" stroke="#ff5252" strokeWidth="1" strokeDasharray="3 3" opacity="0.45"/>
      <text x="418" y="185" fill="#ff5252" fontSize="10" fontFamily="monospace" opacity="0.6">SL</text>
    </svg>
  </div>
);

const NNNChart2 = () => (
  <div className="bg-[#050c0f] border border-gray-800 rounded-2xl p-4 my-8 overflow-x-auto">
    <div className="text-[11px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN② Minh họa — Nến ôm (Inside Bar) · Nến mẹ ôm trọn nến con</div>
    <svg viewBox="0 0 700 230" className="w-full h-auto min-w-[500px]" role="img">
      {/* Context candles (downtrend) */}
      <line x1="40" y1="30" x2="40" y2="95" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="32" y="38" width="16" height="48" fill="#ff5252" rx="2" opacity="0.8"/>
      <line x1="95" y1="55" x2="95" y2="120" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="87" y="62" width="16" height="48" fill="#ff5252" rx="2" opacity="0.8"/>
      <line x1="150" y1="78" x2="150" y2="138" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="142" y="85" width="16" height="44" fill="#ff5252" rx="2" opacity="0.8"/>
      {/* Mother candle (big bearish) */}
      <text x="215" y="25" fill="#9ca3b0" fontSize="10" fontFamily="monospace" textAnchor="middle">Nến mẹ</text>
      <line x1="215" y1="28" x2="215" y2="205" stroke="#ff5252" strokeWidth="2"/>
      <rect x="205" y="42" width="20" height="148" fill="#ff5252" rx="3" opacity="0.95"/>
      {/* BUY STOP line (at H_mẹ) */}
      <line x1="195" y1="28" x2="660" y2="28" stroke="#00d084" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.9"/>
      <rect x="310" y="16" width="220" height="18" fill="#00d08425" rx="3"/>
      <text x="318" y="29" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">BUY STOP (H_mẹ + 10pip)</text>
      {/* SELL STOP line (at L_mẹ) */}
      <line x1="195" y1="208" x2="530" y2="208" stroke="#ff5252" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.9"/>
      <rect x="310" y="210" width="210" height="18" fill="#ff525220" rx="3"/>
      <text x="318" y="223" fill="#ff5252" fontSize="11" fontFamily="monospace" fontWeight="bold">SELL STOP (L_mẹ − 10pip)</text>
      {/* Baby candle (small, inside mother's range) */}
      <text x="280" y="25" fill="#9ca3b0" fontSize="10" fontFamily="monospace" textAnchor="middle">Nến con</text>
      <line x1="280" y1="75" x2="280" y2="148" stroke="#9ca3b0" strokeWidth="1.5"/>
      <rect x="271" y="92" width="18" height="42" fill="#6b7280" rx="2"/>
      <text x="302" y="118" fill="#9ca3b0" fontSize="10" fontFamily="monospace">nằm trong mẹ</text>
      {/* Breakout green candle */}
      <line x1="355" y1="12" x2="355" y2="80" stroke="#00d084" strokeWidth="2"/>
      <rect x="346" y="18" width="18" height="52" fill="#00d084" rx="2"/>
      {/* Price continues upward */}
      <polyline points="364,18 410,10 460,5" stroke="#00d084" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round"/>
      {/* BUY activated label */}
      <rect x="468" y="2" width="145" height="20" fill="#00d08440" rx="4"/>
      <text x="476" y="16" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">BUY kích hoạt! ↑</text>
      {/* Cancel SELL label */}
      <rect x="540" y="198" width="135" height="20" fill="#ff525215" rx="4"/>
      <text x="547" y="212" fill="#ff5252" fontSize="11" fontFamily="monospace">✗ Hủy Sell Stop</text>
      {/* TP markers */}
      <line x1="355" y1="5" x2="700" y2="5" stroke="#c8922a" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
      <text x="625" y="14" fill="#c8922a" fontSize="10" fontFamily="monospace">TP</text>
    </svg>
  </div>
);

const NNNChart3 = () => (
  <div className="bg-[#050c0f] border border-gray-800 rounded-2xl p-4 my-8 overflow-x-auto">
    <div className="text-[11px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN③ Minh họa — Nến đóng cửa trên EMA21 → BUY Setup + Pullback Entry</div>
    <svg viewBox="0 0 700 215" className="w-full h-auto min-w-[500px]" role="img">
      {/* EMA21 curved line */}
      <path d="M 0,170 C 80,165 150,155 220,140 S 330,110 400,90 S 520,62 700,38" stroke="#c8922a" strokeWidth="3" fill="none" opacity="0.9"/>
      <text x="648" y="34" fill="#c8922a" fontSize="11" fontFamily="monospace" fontWeight="bold">EMA21</text>
      {/* Candles BELOW EMA21 (downtrend context) */}
      <line x1="55" y1="155" x2="55" y2="200" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="47" y="162" width="16" height="32" fill="#ff5252" rx="2" opacity="0.85"/>
      <line x1="115" y1="148" x2="115" y2="192" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="107" y="155" width="16" height="30" fill="#ff5252" rx="2" opacity="0.85"/>
      <line x1="175" y1="140" x2="175" y2="180" stroke="#ff5252" strokeWidth="1.5"/>
      <rect x="167" y="147" width="16" height="28" fill="#ff5252" rx="2" opacity="0.85"/>
      {/* Candle CROSSING ABOVE EMA21 → BUY SIGNAL */}
      <line x1="255" y1="100" x2="255" y2="158" stroke="#00d084" strokeWidth="2"/>
      <rect x="246" y="107" width="18" height="42" fill="#00d084" rx="2"/>
      <text x="278" y="120" fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">Đóng TRÊN EMA21 ✓</text>
      {/* BUY STOP dashed line */}
      <line x1="238" y1="100" x2="700" y2="100" stroke="#00d084" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.7"/>
      <text x="580" y="95" fill="#00d084" fontSize="10" fontFamily="monospace">BUY STOP</text>
      {/* Pullback candle (testing EMA21) */}
      <line x1="330" y1="98" x2="330" y2="130" stroke="#9ca3b0" strokeWidth="1.5"/>
      <rect x="322" y="104" width="16" height="18" fill="#6b7280" rx="2"/>
      <text x="352" y="128" fill="#9ca3b0" fontSize="10" fontFamily="monospace">Pullback (Kiss EMA)</text>
      {/* SL reference line */}
      <line x1="238" y1="158" x2="420" y2="158" stroke="#ff5252" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
      <text x="424" y="162" fill="#ff5252" fontSize="10" fontFamily="monospace" opacity="0.7">SL</text>
      {/* Price continues upward after entry */}
      <polyline points="348,100 390,78 440,55 500,32 560,15" stroke="#00d084" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round"/>
      <circle cx="440" cy="55" r="3.5" fill="#00d084" opacity="0.75"/>
      {/* BUY activated label */}
      <rect x="570" y="5" width="120" height="20" fill="#00d08440" rx="4"/>
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
      <div className="text-[11px] text-gray-400 font-mono uppercase tracking-widest mb-3">// NNN④ Minh họa — Fibonacci NNN: Swing Low→High → Pullback 62% → Entry → TP1/TP2</div>
      <svg viewBox="0 0 720 260" className="w-full h-auto min-w-[520px]" role="img">
        {/* Fibonacci horizontal levels */}
        <line x1="30" y1={tp1} x2="690" y2={tp1} stroke="#c8922a" strokeWidth="1" strokeDasharray="5 3" opacity="0.7"/>
        <text x="32" y={tp1 - 4} fill="#c8922a" fontSize="10" fontFamily="monospace">127% — TP1</text>
        <line x1="30" y1={SH} x2="690" y2={SH} stroke="#e8eaf0" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5"/>
        <text x="32" y={SH - 4} fill="#e8eaf0" fontSize="10" fontFamily="monospace">100% Swing High</text>
        <line x1="30" y1={f62} x2="690" y2={f62} stroke="#00d084" strokeWidth="2" strokeDasharray="6 3" opacity="0.9"/>
        <rect x="32" y={f62 - 14} width="100" height="16" fill="#00d08425" rx="3"/>
        <text x="38" y={f62} fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">62% ⭐ Entry</text>
        <line x1="30" y1={f79} x2="690" y2={f79} stroke="#4a9eff" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7"/>
        <text x="32" y={f79 - 4} fill="#4a9eff" fontSize="10" fontFamily="monospace">79% Entry</text>
        <line x1="30" y1={f88} x2="690" y2={f88} stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
        <text x="32" y={f88 + 12} fill="#fbbf24" fontSize="10" fontFamily="monospace">88% ⚠ Caution</text>
        <line x1="30" y1={SL} x2="690" y2={SL} stroke="#e8eaf0" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4"/>
        <text x="32" y={SL + 12} fill="#e8eaf0" fontSize="10" fontFamily="monospace">0% Swing Low</text>
        {/* Price: Swing Low → Swing High (upswing) */}
        <polyline points={`140,${SL} 200,${SL-30} 260,${SL-60} 320,${SH+30} 380,${SH}`} stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Price: Pullback from SH to 62% */}
        <polyline points={`380,${SH} 420,${f62 - 20} 460,${f62}`} stroke="rgba(255,82,82,0.75)" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="6 3"/>
        {/* Hammer candle at 62% zone */}
        <line x1="470" y1={f62 - 18} x2="470" y2={f62 + 22} stroke="#00d084" strokeWidth="2"/>
        <rect x="462" y={f62 - 12} width="16" height="16" fill="#00d084" rx="2"/>
        <line x1="470" y1={f62 + 8} x2="470" y2={f62 + 22} stroke="#00d084" strokeWidth="2"/>
        <text x="490" y={f62 + 5} fill="#00d084" fontSize="11" fontFamily="monospace" fontWeight="bold">Hammer → BUY ✓</text>
        {/* BUY entry arrow */}
        <polyline points={`478,${f62 - 18} 530,${f62 - 50} 590,${SH + 20} 650,${tp1 + 15}`} stroke="#00d084" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* TP1 marker */}
        <circle cx="630" cy={tp1 + 8} r="6" fill="#c8922a" opacity="0.9"/>
        <text x="642" y={tp1 + 12} fill="#c8922a" fontSize="11" fontFamily="monospace" fontWeight="bold">TP1</text>
        {/* SL reference */}
        <line x1="460" y1={SL - 5} x2="560" y2={SL - 5} stroke="#ff5252" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
        <text x="564" y={SL - 1} fill="#ff5252" fontSize="10" fontFamily="monospace" opacity="0.8">SL</text>
        {/* Swing arrows */}
        <text x="145" y={SL - 5} fill="#9ca3b0" fontSize="10" fontFamily="monospace">Swing Low</text>
        <text x="355" y={SH - 6} fill="#9ca3b0" fontSize="10" fontFamily="monospace">Swing High</text>
      </svg>
    </div>
  );
};

// ==========================================
// DATA CHƯƠNG 3: NNN & ĐỌC NẾN (BẢO TOÀN 100% NỘI DUNG)
// ==========================================

const CHAPTER_3_DATA = [
  {
    chapter: "Chương 3: PP NNN & Nến", title: "0. Tổng quan Chương 3",
    content: (
      <>
        <SectionHead icon={<Compass size={16} className="inline mr-1"/>} title="Phương pháp NNN & Nghệ thuật đọc nến" desc="Chương này dạy bạn hệ thống giao dịch cụ thể của thầy Nguyễn Ngọc Nghĩa — 4 phương pháp rõ ràng từ A đến Z. Kết hợp với 9 mẫu nến nâng cao giúp bạn đọc được tâm lý thị trường chính xác hơn bất kỳ indicator nào." />
        <StoryBox label="Triết lý của thầy Nguyễn Ngọc Nghĩa" icon={<BookOpen size={16}/>}>
          "Thị trường nói chuyện qua nến. Nếu bạn biết đọc ngôn ngữ đó, bạn không cần indicator phức tạp. <strong>Price action là sự thật. Indicator là bóng của sự thật.</strong>"<br/><br/>
          4 phương pháp NNN được xây dựng hoàn toàn trên price action và các công cụ đơn giản nhất — nhưng được áp dụng một cách <em>kỷ luật và nhất quán</em>. Đây là điểm mấu chốt.
        </StoryBox>

        <SectionHead icon={<Map size={16}/>} title="Bản đồ Chương 3" desc="11 bài học · Học theo thứ tự." />
        <CyberTable
          headers={["Phần", "Nội dung", "Mục tiêu"]}
          rows={[
            ["I", "4 Phương pháp NNN: Nến thân ngắn, Nến ôm, EMA21, Fibonacci NNN", "Có quy trình entry/SL/TP rõ ràng cho từng setup."],
            ["II", "9 mẫu nến nâng cao: Engulfing, Hammer/Star, Doji, Morning/Evening, Harami, Three Soldiers", "Đọc được tâm lý thị trường qua cấu trúc nến."],
            [<Star size={16} className="inline mr-1 text-yellow-500"/>, "Confluence + Quiz 15 câu", "Biết khi nào vào lệnh, khi nào giảm size, khi nào đứng ngoài."]
          ]}
        />
        <Callout type="ok" title="Cách học hiệu quả nhất:">Đọc từng phương pháp → mở TradingView song song → tìm ngay pattern đó trên chart thật → ghi vào notebook. Đừng đọc hết rồi mới thực hành — đọc 1 bài, thực hành ngay.</Callout>
        
        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Nguyên tắc vàng của NNN</h3>
        <div className="space-y-5">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Confluence (Hội tụ) là vua.</strong> Một tín hiệu NNN đơn lẻ = chỉ đáng chú ý. 2 tín hiệu = đáng cân nhắc. 3+ tín hiệu hội tụ = có thể lập kế hoạch vào lệnh nếu R:R và rủi ro đạt chuẩn. Không bao giờ vào lệnh chỉ vì một điều kiện.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Xu hướng D1 là luật pháp.</strong> Không ưu tiên giao dịch ngược chiều D1. Nếu setup nhỏ hơn đi ngược khung lớn, giảm size mạnh hoặc bỏ qua.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Nến phải ĐÓNG CỬA xác nhận.</strong> Không vào lệnh khi nến chưa đóng. Bóng nến nhú qua không phải tín hiệu. Thân nến đóng cửa bên kia mới là tín hiệu.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-[#378ADD]/20 text-blue-600 dark:text-[#378ADD] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Luôn biết SL và TP trước khi vào lệnh.</strong> Không vào lệnh mà không biết mình sẽ cắt lỗ ở đâu và chốt lời ở đâu. R:R tối thiểu 1:2.</div></div>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "1. NNN① Nến thân ngắn",
    content: (
      <>
        <SectionHead icon="①" title="Nến Thân Ngắn" desc="Thị trường đang do dự — Khi thân nến cực nhỏ, đó là lúc phe mua và phe bán đang 'hòa nhau'." />
        <p className="text-[16px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4"><strong>Định nghĩa chính xác từ vở NNN:</strong> nến thân ngắn là nến có Close gần bằng Open, thân nến rất nhỏ so với toàn bộ biên độ High-Low.</p>
        <div className="bg-gray-900 dark:bg-[#0A0D13] border border-gray-700 dark:border-[#2B3139] rounded-2xl p-5 my-6 font-mono text-[14px] text-gray-200">
          Điều kiện định lượng: |Close - Open| / (High - Low) &lt; 0.3
        </div>
        <NNNChart1 />
        <StoryBox label="Cuộc chiến trong một phiên giao dịch" icon={<Shield size={16} className="inline mr-1"/>}>
          Trong mỗi phiên giao dịch, có hàng triệu người mua và bán đang "đấu nhau". Người mua muốn đẩy giá lên, người bán muốn kéo giá xuống.<br/><br/>
          Khi nến có thân dài → <strong>một phe đã thắng áp đảo.</strong><br/>
          Khi nến có thân ngắn → <strong>hai phe đang hòa nhau, không ai thắng.</strong><br/><br/>
          Tình huống "hòa nhau" này rất không bền. Chỉ cần một "cú đẩy" nhỏ — ví dụ tin tức, hoặc Smart Money bắt đầu vào lệnh — là giá sẽ bứt phá mạnh về một phía. Trader NNN sẽ <em>vào lệnh theo hướng đó</em> ngay khi phá ra.
        </StoryBox>



        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Quy trình vào lệnh từng bước</h3>
        <div className="space-y-5">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Điều kiện bắt buộc trước:</strong> Kiểm tra D1 — đang uptrend hay downtrend? Xác định 2–3 vùng S/R quan trọng. Nến thân ngắn phải xuất hiện TẠI hoặc GẦN vùng S/R — không phải giữa không gian trống.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Nhận diện nến thân ngắn:</strong> Thân nến cực nhỏ (Doji, Spinning Top). Bóng trên và/hoặc bóng dưới dài hơn thân. Màu xanh/đỏ không quan trọng.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>ĐẶT 2 LỆNH ĐỒNG THỜI:</strong><br/>• <strong>Buy Stop</strong> tại High của nến thân ngắn + 10 pip (buffer tránh whipsaw)<br/>• <strong>Sell Stop</strong> tại Low của nến thân ngắn − 10 pip</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Thiết lập SL và TP:</strong><br/>• Buy Stop: SL = L của nến − 10 pip; TP theo tỉ lệ R:R ≥ 1:2<br/>• Sell Stop: SL = H của nến + 10 pip<br/>Khi 1 lệnh kích hoạt → <strong>HỦY NGAY lệnh còn lại.</strong></div></div>
        </div>

        <Callout type="warn" title="Lỗi phổ biến nhất:">Vị trí là tất cả! Nến thân ngắn giữa không trung, giữa sideway range, không gần S/R nào → KHÔNG CÓ GIÁ TRỊ.</Callout>

        <SimpleQuiz q='Xuất hiện nến Doji tại vùng hỗ trợ $2,000 vàng sau downtrend dài. Bạn đặt Buy Stop tại $2,010 (H+10) và Sell Stop tại $1,988 (L-10). Nến tiếp theo đóng cửa ở $2,015. Bạn làm gì tiếp theo?' opts={['Chờ thêm vì chưa đủ xác nhận','Buy Stop đã kích hoạt ở $2,010 — HỦY NGAY Sell Stop $1,988, giữ vị thế Buy với SL dưới đáy Doji','Vào thêm 1 lệnh Buy nữa cho chắc','Giữ cả 2 lệnh Buy Stop và Sell Stop']} correctIdx={1} explanation='Buy Stop kích hoạt → HỦY NGAY Sell Stop. Không thể để cả 2 lệnh cùng tồn tại.' />
        <SimpleQuiz q='Nến thân ngắn xuất hiện GIỮA sideway range, không gần S/R nào, sau 20 nến đi ngang. D1 đang sideway. Bạn nên làm gì?' opts={['Đặt Buy Stop và Sell Stop như bình thường','BỎ QUA — không có bối cảnh (không ở S/R, D1 sideway) → tín hiệu không đáng tin cậy','Chỉ đặt Buy Stop','Đặt lệnh với size nhỏ']} correctIdx={1} explanation='Bối cảnh là tất cả. Thiếu S/R và Trend D1 = Bỏ qua.' />
        <ExerciseBox title="Tìm và đánh dấu Nến thân ngắn" desc="Mở TradingView, tìm XAU/USD H4 và làm từng bước:" steps={[
          {d:'Vẽ 3 vùng S/R quan trọng trên D1: đỉnh cũ, đáy cũ, vùng số tròn.'},
          {d:'Trên H4, tìm ít nhất 3 nến Doji hoặc Spinning Top xuất hiện <strong>tại</strong> các vùng S/R đó.'},
          {d:'Với mỗi nến: ghi Buy Stop tại H+10, Sell Stop tại L-10. Lệnh nào kích hoạt? Kết quả sau 10-20 nến là gì?'},
          {d:'Chỉ tính tín hiệu tại S/R. Không tính các nến thân ngắn xuất hiện giữa vùng trống.'}
        ]}/>
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "2. NNN② Nến ôm",
    content: (
      <>
        <SectionHead icon="②" title="Nến Ôm (Inside Bar)" desc="Sức mạnh bị 'giam lỏng' — giao dịch khi năng lượng bị nén." />
        <p className="text-[16px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6"><strong>Định nghĩa chính xác:</strong> Cụm 2 cây nến liên tiếp, trong đó <em>H và L của cây nến trước (nến mẹ) "ôm trọn" H và L của cây nến sau (nến con).</em></p>
        
        <StoryBox label="Lò xo bị nén" icon={<Activity size={16} className="inline mr-1"/>}>
          Nến mẹ di chuyển mạnh (ví dụ giảm 100 pip). Nến con tiếp theo không thể di chuyển ra ngoài biên độ của nến mẹ — nó "bị nhốt" trong đó.<br/><br/>
          Điều này có nghĩa: <strong>cả phe mua lẫn phe bán đều không đủ mạnh để chiếm thêm lãnh thổ.</strong> Thị trường đang "nghỉ ngơi", đang "quyết định". Năng lượng đang tích tụ.<br/><br/>
          Khi nến thứ 3 phá ra khỏi biên độ nến mẹ → <strong>lò xo được giải phóng</strong>. Toàn bộ năng lượng tích lũy đó bứt phá một chiều. Vào lệnh đúng hướng lúc này = ăn theo momentum cực mạnh.
        </StoryBox>

        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Quy trình vào lệnh (Từ vở ghi)</h3>
        <div className="space-y-5">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Xác định cụm nến ôm:</strong> H_mẹ ≥ H_con VÀ L_mẹ ≤ L_con. Kiểm tra kỹ — chỉ cần H_con vượt qua H_mẹ DÙ 1 pip thôi là KHÔNG phải nến ôm.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Đặt 2 lệnh pending:</strong><br/>• <strong>Buy Stop</strong> tại H của nến mẹ + 10 pip<br/>• <strong>Sell Stop</strong> tại L của nến mẹ − 10 pip</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SL theo vở ghi:</strong><br/>• Buy Stop: SL = L của nến mẹ − 10 pip (hoặc L của nến con tùy setup)<br/>• Sell Stop: SL = H của nến mẹ + 10 pip<br/>TP = theo Fibonacci extension (127% hoặc 162% của swing trước)</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Khi 1 lệnh kích hoạt → hủy lệnh còn lại ngay.</strong> Sau đó quản lý lệnh: khi lời 1R, dời SL về BE (Break Even).</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">5</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Lọc tín hiệu:</strong> Nến ôm trong sideway không đáng tin. Nến ôm sau một xu hướng rõ ràng, tại vùng S/R, hoặc trùng với EMA21 = tín hiệu chất lượng cao.</div></div>
        </div>

        <SimpleQuiz q='Nến mẹ có H=2050, L=1990. Nến con có H=2038, L=2002. Đây có phải nến ôm không? Nếu có, đặt Buy Stop và Sell Stop ở đâu?' opts={['Không phải vì nến mẹ và con khác màu','Đúng là nến ôm (H_con < H_mẹ VÀ L_con > L_mẹ). Buy Stop=2060, Sell Stop=1980','Không phải vì thân nến con phải nhỏ hơn thân nến mẹ (theo giá O-C)','Đúng là nến ôm, Buy Stop=2050, Sell Stop=1990 (không cần buffer)']} correctIdx={1} explanation='Màu nến không quan trọng, chỉ cần H và L của nến con nằm trọn trong nến mẹ.' />
        <SimpleQuiz q='Giá Buy Stop của cụm nến ôm đã được kích hoạt. Lúc này bạn cần làm gì ngay lập tức?' opts={['Đặt thêm lệnh Buy nữa để tăng profit','Hủy ngay Sell Stop còn lại — nếu giá bứt phá lên rồi quay ngược, Sell Stop có thể kích hoạt và gây thua lỗ kép','Không làm gì, chờ xem diễn biến','Dời SL về BE ngay lập tức dù chưa có lời']} correctIdx={1} explanation='Khi một lệnh pending đã khớp, lệnh đối diện phải được hủy ngay. Dời SL về BE chỉ nên làm sau khi lệnh đã đi được khoảng 1R hoặc theo kế hoạch quản lý lệnh.' />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "3. NNN③ EMA21",
    content: (
      <>
        <SectionHead icon="③" title="EMA21" desc="Đường ranh giới Bull vs Bear — Giá đóng cửa một phía, bạn theo phía đó." />
        <p className="text-[16px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">Theo cách ghi của NNN, EMA21 là đường trung bình theo giá đóng cửa của 21 cây nến gần nhất. Điều kiện quan trọng là <strong>nến đóng cửa</strong> rõ ràng trên/dưới EMA21, không phải chỉ bóng nến chạm hoặc xuyên qua.</p>
        <NNNChart3 />
        <StoryBox label="Ranh giới tâm lý" icon={<Flag size={16} className="inline mr-1"/>}>
          Hàng triệu trader trên thế giới nhìn vào EMA21. Khi giá nằm <strong>trên</strong> EMA21: phần lớn những ai mua gần đây đang có lời → họ tự tin → không bán → giá tiếp tục tăng.<br/><br/>
          Khi giá đột ngột <em>cắt qua và đóng cửa bên kia</em> EMA21 → <strong>cán cân quyền lực đang thay đổi</strong>. Đây là lúc vào lệnh.
        </StoryBox>

        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Quy trình vào lệnh</h3>
        <div className="space-y-5 mb-8">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Xác nhận xu hướng:</strong> EMA21 dốc lên + giá phần lớn ở trên = uptrend (chỉ BUY). EMA21 dốc xuống + giá dưới = downtrend (chỉ SELL). EMA21 phẳng = sideway (không dùng phương pháp này).</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Tín hiệu BUY:</strong> Giá đang dưới EMA21 (hoặc pullback về test) → nến đóng cửa <strong>rõ ràng TRÊN</strong> EMA21. Không phải bóng nến chạm — thân nến phải đóng hẳn trên đường.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Entry:</strong> Ngay khi nến xác nhận đóng cửa trên EMA21. Hoặc (tốt hơn) chờ giá <em>pullback về test lại EMA21</em> lần nữa rồi bật lên → entry giá tốt hơn, SL nhỏ hơn.<br/>• <strong>Buy Stop:</strong> tại H nến cắt + 10pip (theo vở ghi)</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SL:</strong> Dưới Low của nến cắt − 10pip. Không đặt SL ngay tại EMA21 (giá hay quay lại test EMA21 nhiều lần). TP: vùng kháng cự tiếp theo hoặc theo R:R tối thiểu 1:2.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">5</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SELL setup:</strong> Ngược lại — nến đóng cửa dưới EMA21 → Sell Stop tại L nến cắt − 10pip. SL = H của nến + 10pip.</div></div>
        </div>

        <Callout type="tip" title="Pullback Entry (Kiss the EMA)">Sau khi giá đóng cửa trên EMA21, đừng vào ngay. Chờ giá kéo về "hôn" (test lại) EMA21 và bật lên. Đây chính xác là điểm thầy NNN hay dùng nhất.</Callout>
        
        <SimpleQuiz q='EMA21 đang dốc xuống. Giá vừa cắt lên trên EMA21 và đóng cửa ở trên. Bạn nên làm gì?' opts={['BUY full size ngay vì nến đóng trên EMA21','Thận trọng — EMA21 đang dốc xuống cho thấy xu hướng giảm; cú cắt lên có thể chỉ là pullback. Kiểm tra D1 và chờ thêm xác nhận','SELL vì EMA21 là kháng cự','Không cần quan tâm hướng của EMA21']} correctIdx={1} explanation='Tín hiệu đóng cửa trên EMA21 mạnh hơn khi EMA21 dốc lên và D1 ủng hộ. Nếu EMA21 còn dốc xuống, setup đang chống lại nhịp chính nên phải giảm rủi ro hoặc bỏ qua.' />
        <SimpleQuiz q='Trong uptrend D1, giá pullback về chạm EMA21 nhưng BÓNG dưới của nến chạm EMA21 rồi nến đóng cửa ở trên EMA21. Đây có phải tín hiệu BUY theo NNN③ không?' opts={['Có — nến đóng cửa trên EMA21 là điều kiện. Bóng dưới test EMA21 rồi bật lên = Pullback Entry hoàn hảo','Không — bóng nến chạm EMA21, không phải thân nến','Cần thêm 1 nến xác nhận nữa','Không đủ điều kiện vì EMA21 phải phẳng']} correctIdx={0} explanation='Quan trọng là thân nến đóng cửa (Close) bên nào của EMA21. Close trên EMA21 = tín hiệu BUY dù bóng dưới đã chạm EMA21.' />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "4. NNN④ Fibonacci",
    content: (
      <>
        <SectionHead icon="④" title="Fibonacci NNN (62·79·88·127·162)" desc="Hệ thống hoàn chỉnh nhất trong 4 phương pháp." />
        <Callout type="tip" title="Thiết lập trên TradingView">Fibonacci Retracement → Settings → thêm các mức: <strong>0.62, 0.79, 0.88, -0.27, -0.62</strong>. Chúng tương ứng 62%, 79%, 88%, 127% và 162%.</Callout>
        <CyberTable
          headers={["Mức", "Ý nghĩa", "Dùng để", "Tín hiệu vào lệnh"]}
          rows={[
            ["62%", "Pullback vừa phải, xu hướng còn mạnh", "Entry ưu tiên nhất", "Cần nến xác nhận"],
            ["79%", "Pullback sâu nhưng xu hướng vẫn có thể giữ", "Entry thứ 2", "Cần xác nhận mạnh hơn"],
            ["88%", "Pullback rất sâu, sát vùng thất bại", "Entry thận trọng, size nhỏ", "Cần ít nhất 2 tín hiệu xác nhận"],
            ["127%", "Extension mục tiêu 1", "Chốt 50-60% vị thế", "TP1"],
            ["162%", "Extension mục tiêu 2", "Chốt phần còn lại hoặc trailing stop", "TP2"]
          ]}
        />
        <StoryBox label="Tại sao 62, 79, 88?" icon={<Activity size={16} className="inline mr-1"/>}>
          Fibonacci tiêu chuẩn dùng 61.8%, 78.6%. Thầy NNN điều chỉnh theo thực chiến: 62% và 79% (làm tròn số, thực tế giá hay dừng ở đây). Thêm mức 88%: nhiều trade thất bại vì SL đặt ở 79% trong khi giá về tới 88% rồi mới bật. Biết mức 88% giúp bạn không bị stopout sớm.
        </StoryBox>
        <NNNChart4 />

        <FibCalculator />

        <h3 className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 border-b border-gray-200 dark:border-[#2B3139] pb-4">Quy trình vào lệnh</h3>
        <div className="space-y-5 mb-8">
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">1</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Vẽ:</strong> Uptrend: kéo từ Swing Low → Swing High. Downtrend: kéo từ Swing High → Swing Low.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">2</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Entry:</strong> Chờ giá pullback về vùng 62%–79%. Nếu có nến đảo chiều (Engulfing, Hammer, Nến thân ngắn) tại đây → Buy Stop tại H nến xác nhận + 10pip.</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">3</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>SL & TP:</strong> SL dưới vùng 100% (Swing Low) − 10pip hoặc dưới Low nến xác nhận − 10pip (tùy nào nhỏ hơn). TP1 = 127% Extension (chốt 50%). TP2 = 162% Extension (chốt nốt).</div></div>
          <div className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-600 dark:text-[#FCD535] font-bold flex items-center justify-center shrink-0 mt-1">4</div><div className="text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]"><strong>Quản lý lệnh:</strong> Khi giá đạt TP1 127%, chốt một phần vị thế và dời SL phần còn lại về Break Even. Phần còn lại chạy đến TP2 162% hoặc trailing stop.</div></div>
        </div>

        <SimpleQuiz q='Swing Low = $1,900, Swing High = $2,100. Giá pullback về $2,038. Đây gần với mức Fibonacci nào trong hệ NNN?' context='Gợi ý: 62% retracement = $2,100 - ($200 × 0.62) = $1,976.' opts={['79% — khoảng $1,942','62% — khoảng $1,976','Chưa về vùng NNN 62-79%; $2,038 mới chỉ là pullback nông, nên tiếp tục chờ','88% — khoảng $1,924']} correctIdx={2} explanation='Vùng entry NNN nằm sâu hơn: 62% khoảng $1,976 và 79% khoảng $1,942. $2,038 chưa pullback đủ sâu theo hệ này.' />
        <SimpleQuiz q='Giá pullback về mức 79% Fibonacci và xuất hiện nến Doji. Bạn đã thiết lập Buy Stop tại H+10pip. Nên đặt SL ở đâu?' opts={['Dưới mức 79% Fibonacci một chút','Dưới mức 88% Fibonacci','Dưới mức 100% (Swing Low) − 10pip','Dưới Low của nến Doji − 10pip']} correctIdx={2} explanation='SL chuẩn của NNN④ = dưới Swing Low − 10pip. Cho phép giá quét về 88% mà không dính stoploss oan.' />
        <SimpleQuiz q='Bạn đang giữ lệnh Buy vào từ mức 62% Fibonacci. Giá vừa chạm TP1 tại 127%. Bạn nên làm gì?' opts={['Đóng toàn bộ lệnh và lấy lợi nhuận','Chốt khoảng 50% vị thế tại TP1, dời SL phần còn lại về điểm entry để phần còn lại chạy đến TP2','Không làm gì, giữ nguyên chờ TP2','Thêm vào lệnh vì giá đang mạnh']} correctIdx={1} explanation='Đây là quản lý lệnh chuẩn: lấy tiền tại TP1, giảm rủi ro về 0 bằng Break Even, rồi để phần còn lại chạy.' />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "5. Engulfing (Nhấn chìm)",
    content: (
      <>
        <SectionHead icon={<Award size={16} className="inline mr-1 text-yellow-500"/>} title="Engulfing Pattern" desc="Mẫu nến đảo chiều mạnh khi xuất hiện đúng bối cảnh." />
        <StoryBox label="Cuộc đảo chính quyền lực" icon={<Crosshair size={16} className="inline mr-1"/>}>
          Nến đỏ trước đó: Phe Gấu thắng.<br/>
          Nến xanh Engulfing hôm nay: <strong>Phe Bò lấy lại toàn bộ lãnh thổ đã mất</strong> và đi xa hơn. <em>Tất cả những ai bán hôm qua đều đang lỗ</em> → họ phải mua lại để cắt lỗ → giá tiếp tục tăng.
        </StoryBox>
        
        <PatternCard 
          name="Bullish Engulfing" type="TĂNG|Đảo chiều cuối downtrend" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[30px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[52px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
            </>
          }
          essence='Nến đỏ nhỏ → Nến xanh <strong>"nuốt trọn" nến đỏ</strong>: Open xanh ≤ Close đỏ VÀ Close xanh ≥ Open đỏ. Thân nến (Open-Close) là tiêu chí quyết định.'
          steps={[
            '<strong>Bắt buộc:</strong> Xuất hiện sau downtrend, tại vùng hỗ trợ hoặc Fibonacci 62/79%.',
            '<strong>Entry:</strong> Mua khi nến đóng cửa, hoặc Buy Stop tại H + 10pip.',
            '<strong>SL:</strong> Dưới Low của nến Engulfing − 10pip.'
          ]}
          isWarning="Combo mạnh: Engulfing + Fibonacci 62% + EMA21. Vẫn cần kiểm tra D1, R:R và giới hạn rủi ro trước khi vào."
        />

        <PatternCard 
          name="Bearish Engulfing" type="GIẢM|Đảo chiều cuối uptrend" badgeClass="bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[30px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[52px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
            </>
          }
          essence='Ngược với Bullish: Nến đỏ <strong>"nuốt trọn" nến xanh trước</strong>. Phe Gấu đột ngột chiếm toàn bộ lãnh thổ của phe Bò.'
          steps={[
            '<strong>Bắt buộc:</strong> Xuất hiện sau uptrend, tại kháng cự.',
            '<strong>Entry:</strong> Sell Stop tại L − 10pip.',
            '<strong>SL:</strong> Trên High của nến Engulfing + 10pip.'
          ]}
        />
        <SimpleQuiz q='Bullish Engulfing xuất hiện GIỮA uptrend, không phải sau downtrend, không gần S/R nào. Bạn đánh giá thế nào?' opts={['Vào BUY ngay — Engulfing là tín hiệu cực mạnh bất cứ đâu','Bỏ qua hoặc rất thận trọng — Engulfing GIỮA uptrend không phải đảo chiều, chỉ là continuation. Không đủ bối cảnh để vào lệnh mới.','Đây là tín hiệu tiếp diễn uptrend, BUY thêm','SELL vì Engulfing = đảo chiều luôn luôn']} correctIdx={1} explanation='Engulfing là mẫu ĐẢO CHIỀU. Giữa xu hướng nó không có giá trị đảo chiều.' />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "6. Hammer & Shooting Star",
    content: (
      <>
        <SectionHead icon={<Hammer size={16} className="inline mr-1"/>} title="Hammer & Shooting Star" desc="Cú đánh trả của kẻ bại trận." />
        <StoryBox label="Bản chất tâm lý" icon={<Brain size={16}/>}>
          Giá mở cửa ở $2,000. Phe Gấu tấn công mạnh, đẩy giá xuống $1,960. Lúc này, <strong>phe Bò phản công</strong>: họ mua vào từ vùng thấp, đẩy giá ngược lên và đóng cửa tại $2,002. Trông giống cái búa (Hammer). Ý nghĩa: phe bán bị từ chối ở vùng thấp, nhưng vẫn cần vị trí hỗ trợ và nến xác nhận trước khi BUY.
        </StoryBox>

        <PatternCard 
          name={<>Hammer <Hammer size={16} className="inline mr-1"/> (Pin Bar)</>} type="TĂNG|Đáy downtrend" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <div className="flex flex-col items-center mt-2"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[16px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[40px]"></div></div>
          }
          essence='Bóng dưới ≥ 2× thân nến. Thân nhỏ ở phía trên. Màu nến không quan trọng (nhưng xanh thì mạnh hơn).'
          steps={[
            '<strong>Bắt buộc:</strong> Phải xuất hiện sau downtrend tại hỗ trợ.',
            '<strong>Xác nhận:</strong> Chờ nến tiếp theo là nến tăng đóng cửa trên H của Hammer.',
            '<strong>Entry:</strong> Buy Stop tại H + 10pip. SL tại L − 10pip.'
          ]}
        />
        <PatternCard 
          name={<>Shooting Star <Zap size={16} className="inline mr-1"/></>} type="GIẢM|Đỉnh uptrend" badgeClass="bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]"
          svgCandles={
            <div className="flex flex-col items-center mt-2"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[40px]"></div><div className="w-3 rounded-sm h-[16px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
          }
          essence='Bóng trên dài ≥ 2× thân, thân nhỏ ở phía dưới. Phe Gấu kéo giá về.'
          steps={[
            '<strong>Bắt buộc:</strong> Sau uptrend tại kháng cự.',
            '<strong>Entry:</strong> Sell Stop tại L − 10pip. SL = H + 10pip.'
          ]}
        />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "7. Doji & Biến thể",
    content: (
      <>
        <SectionHead icon={<Scale size={16}/>} title="Doji & Các biến thể" desc="Khoảnh khắc cân bằng tuyệt đối. Nền tảng của phương pháp NNN①." />
        <StoryBox label="Sự tĩnh lặng trước cơn bão" icon={<Wind size={16} className="inline mr-1"/>}>
          Open = Close. Không ai thắng. Cực kỳ bất thường sau một xu hướng dài. Đây là <em>dấu hiệu cảnh báo sớm</em> nhất cho khả năng đảo chiều.
        </StoryBox>

        <CyberTable 
          headers={["Loại Doji", "Hình dạng", "Ý nghĩa"]}
          rows={[
            ["Doji thập tự", "Bóng trên = bóng dưới, thân = 0", "Cân bằng hoàn toàn. Cần xác nhận."],
            [<>Dragonfly Doji <Eye size={16} className="inline mr-1"/></>, "Bóng dưới rất dài, không có bóng trên", "<span class='text-green-600 dark:text-[#0ECB81] font-bold'>Bullish mạnh</span> nếu xuất hiện tại đáy/hỗ trợ và có xác nhận."],
            ["Gravestone Doji 🪦", "Bóng trên rất dài, không có bóng dưới", "<span class='text-red-600 dark:text-[#F6465D] font-bold'>Bearish mạnh</span> nếu xuất hiện tại đỉnh/kháng cự và có xác nhận."],
            ["Long-legged Doji", "Bóng trên và dưới đều dài", "Biến động lớn nhưng kết thúc ở điểm ban đầu — bứt phá sắp xảy ra."]
          ]}
        />

        <SimpleQuiz q='Dragonfly Doji xuất hiện tại vùng hỗ trợ $1,800 vàng sau downtrend 2 tuần. Bạn nên làm gì?' opts={['Vào BUY ngay khi nến đóng cửa','Đặt Buy Stop tại H Dragonfly + 10pip. Chờ nến tiếp theo xác nhận. SL = dưới L Dragonfly − 10pip','Tiếp tục SELL','Đứng ngoài']} correctIdx={1} explanation='Dragonfly Doji + Hỗ trợ = setup BUY đẹp, nhưng VẪN CẦN pending Buy Stop chờ nến phá vỡ.' />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "8. Morning & Evening Star",
    content: (
      <>
        <SectionHead icon={<Star size={16}/>} title="Morning & Evening Star" desc="Mẫu 3 nến đáng tin nhất cho đảo chiều." />
        
        <PatternCard 
          name={<>Morning Star <Sun size={16} className="inline mr-1"/></>} type="TĂNG|3 nến · Cuối downtrend" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-3 rounded-sm h-[36px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center mt-5"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[10px] bg-gray-500 dark:bg-[#6b7689]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[38px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
            </>
          }
          essence='<strong>Nến 1:</strong> Đỏ dài (Gấu thắng).<br/><strong>Nến 2:</strong> Nhỏ/Doji (Gấu kiệt sức).<br/><strong>Nến 3:</strong> Xanh dài (Bò bùng nổ, chiếm lại >50% nến 1).'
          steps={[
            '<strong>Entry:</strong> Buy Stop tại H nến 3 + 10pip.',
            '<strong>SL:</strong> Dưới Low của toàn bộ cụm 3 nến − 10pip.'
          ]}
        />

        <PatternCard 
          name={<>Evening Star <Moon size={16} className="inline mr-1"/></>} type="GIẢM|3 nến · Cuối uptrend" badgeClass="bg-red-100 dark:bg-[#F6465D]/20 text-red-700 dark:text-[#F6465D]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-3 rounded-sm h-[36px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
              <div className="flex flex-col items-center mb-5"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-3 rounded-sm h-[10px] bg-gray-500 dark:bg-[#6b7689]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div><div className="w-4 rounded-sm h-[38px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[6px]"></div></div>
            </>
          }
          essence='Ngược lại: Xanh dài → Nhỏ/Doji → Đỏ dài.'
          steps={[
            '<strong>Entry:</strong> Sell Stop tại L nến 3 − 10pip.',
            '<strong>SL:</strong> Trên H toàn bộ cụm 3 nến + 10pip.'
          ]}
        />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "9. Harami & Three Soldiers",
    content: (
      <>
        <SectionHead icon="🪖" title="Harami & Three Soldiers" desc="Tích lũy (suy yếu) và Momentum bùng nổ." />
        
        <PatternCard 
          name="Bullish Harami" type="TĂNG NHẸ|Suy yếu downtrend" badgeClass="bg-blue-100 dark:bg-[#378ADD]/20 text-blue-700 dark:text-[#378ADD]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div><div className="w-4 rounded-sm h-[44px] bg-red-500 dark:bg-[#F6465D]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[8px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[20px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div></div>
            </>
          }
          essence='Nến nhỏ (con) nằm <strong>trong thân (O-C)</strong> nến mẹ. Harami = "mang thai". Xu hướng chính đang suy yếu, chuẩn bị sinh ra hướng mới.'
          steps={[
            'Yếu hơn Engulfing. Dùng như cảnh báo chốt lời sớm, thay vì lập tức vào lệnh đảo chiều.'
          ]}
        />

        <PatternCard 
          name="Three White Soldiers 🪖" type="TĂNG MẠNH|Momentum bùng nổ" badgeClass="bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81]"
          svgCandles={
            <>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[28px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[3px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[36px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[3px]"></div></div>
              <div className="flex flex-col items-center"><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[4px]"></div><div className="w-3 rounded-sm h-[44px] bg-green-500 dark:bg-[#0ECB81]"></div><div className="w-0.5 bg-gray-400 dark:bg-[#30363d] h-[3px]"></div></div>
            </>
          }
          essence='3 nến xanh liên tiếp, mỗi nến đóng cửa cao hơn nến trước, mỗi nến mở cửa trong thân nến trước. Thân dài, bóng nhỏ.<br><br>Ý nghĩa: <strong>Phe Bò đang áp đảo hoàn toàn trong 3 phiên liên tiếp</strong>. Không có dấu hiệu phe Gấu kháng cự. Đây là tín hiệu momentum cực mạnh — xu hướng tăng đang rất lành mạnh.'
          steps={[
            'Tuyệt vời để <em>xác nhận</em> xu hướng mới.',
            'Lưu ý: Không "đuổi" mua ngay sau nến 3 nếu RSI đã quá cao. Chờ pullback.'
          ]}
        />
      </>
    )
  },
  {
    chapter: "Chương 3: PP NNN & Nến", title: "10. Confluence & Quiz",
    content: (
      <>
        <SectionHead icon={<Target size={16}/>} title="Confluence (Hội tụ)" desc="Khi tất cả hội tụ về một điểm. Đây là bài học quan trọng nhất." />
        
        <StoryBox label="Setup BUY Hoàn Hảo (Xếp hạng A++)" icon={<TrendingUp size={16}/>}>
          <ul className="space-y-3 pl-4 list-disc text-[16px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">
            <li><strong>D1 Uptrend:</strong> EMA21 &gt; 50 &gt; 200. Cấu trúc HH+HL.</li>
            <li><strong>Fibonacci 62%:</strong> Giá pullback về đúng 62%.</li>
            <li><strong>EMA21 hội tụ:</strong> Mức Fib 62% trùng chính xác với đường EMA21 trên H4.</li>
            <li><strong>Mẫu nến:</strong> Xuất hiện Bullish Engulfing HOẶC Hammer tại vùng Fib+EMA21.</li>
            <li><strong>RSI Divergence:</strong> Giá tạo đáy mới nhưng RSI tạo đáy cao hơn.</li>
          </ul>
        </StoryBox>

        <CyberTable 
          headers={["Số tín hiệu hội tụ", "Hành động", "Size"]}
          rows={[
            ["1 tín hiệu đơn lẻ", "Không vào lệnh", "0"],
            ["2 tín hiệu cùng chiều", "Cân nhắc — nhưng thận trọng", "Nhỏ (0.5×)"],
            ["3 tín hiệu hội tụ", "<span class='text-green-600 dark:text-[#0ECB81] font-bold'>Có thể vào lệnh nếu R:R đạt chuẩn</span>", "Bình thường (1×)"],
            ["4–5 tín hiệu hội tụ", "<span class='text-green-600 dark:text-[#0ECB81] font-black'>Ưu tiên cao, nhưng vẫn giới hạn rủi ro</span>", "Có thể lớn hơn (1.5×), không vượt kế hoạch rủi ro"],
            ["Tín hiệu mâu thuẫn", "<span class='text-red-600 dark:text-[#F6465D] font-bold'>ĐỨNG NGOÀI</span>", "0"]
          ]}
        />

        <Callout type="warn" title="Không có setup nào chắc thắng">Confluence làm tăng chất lượng setup, không loại bỏ rủi ro. Nếu SL quá xa, TP quá gần, tin tức lớn sắp ra hoặc D1 mâu thuẫn, setup đẹp vẫn có thể bị bỏ qua.</Callout>

        <SectionHead icon={<FileText size={16}/>} title="Quiz Tổng kết Chương 3 (15 Câu)" />
        <FinalQuizCh3 />
        <ExerciseBox title="Chuẩn bị cho Chương 4 — Quản lý vốn" desc="Làm trong 1 tuần trước khi học tiếp:" steps={[
          {d:'Mở TradingView XAU/USD H4. Tìm ít nhất 2 setup có <strong>3+ tín hiệu hội tụ</strong> trong 3 tháng gần nhất. Ghi entry/SL/TP lý tưởng.'},
          {d:'Thêm 5 mức Fibonacci NNN vào TradingView: <strong>0.62, 0.79, 0.88, -0.27, -0.62</strong>. Lưu thành template.'},
          {d:'Chọn 3 mẫu nến bạn hiểu nhất. Trong demo, chỉ vào lệnh với 3 mẫu đó để tránh loạn tín hiệu.'},
          {d:'Ghi Trading Journal cho mỗi lệnh thực hành. Sau 20 lệnh, xem setup nào có win rate và R:R tốt nhất với chính bạn.'}
        ]}/>
      </>
    )
  }
];

export default CHAPTER_3_DATA;
