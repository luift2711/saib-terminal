import { useState } from 'react';
import {
  Brain, Zap, BookOpen, Activity, AlertTriangle, Shield, Eye, Flame, Crown, Snowflake, RefreshCw, Users, RefreshCcw, Notebook, Edit3, Target
} from 'lucide-react';
import { SectionHead, StoryBox, Callout, CyberTable, ExerciseBox } from '../Sharedcomponents.jsx';

// ==========================================
// CHAPTER 5 — TÂM LÝ GIAO DỊCH (7 CON QUỶ)
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
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

// ---- Interactive: Trading Journal Simulator ----
const JournalSimulator = () => {
  const [mkt, setMkt] = useState('');
  const [dir, setDir] = useState('');
  const [res, setRes] = useState('');
  const [rr, setRr] = useState('');
  const [sys, setSys] = useState('');
  const [score, setScore] = useState('');
  const [lesson, setLesson] = useState('');
  const [emos, setEmos] = useState([]);
  const [demons, setDemons] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  const toggleEmo = (e) => {
    if (emos.includes(e)) setEmos(emos.filter(x => x !== e));
    else setEmos([...emos, e]);
  };

  const toggleDemon = (d) => {
    if (demons.includes(d)) setDemons(demons.filter(x => x !== d));
    else setDemons([...demons, d]);
  };

  const analyze = () => {
    if (!mkt && !dir && !res) {
      setAnalysis({ type: 'warn', msg: '⚠️ Điền thêm thông tin để nhận phân tích chi tiết nhé!' });
      return;
    }
    const isWin = res === 'Thắng ✅';
    const isLoss = res === 'Thua ❌';
    const sysVio = sys === '⚠️ Sai 1-2 điều' || sys === '❌ Vi phạm hoàn toàn';
    const hasDemon = demons.length > 0;

    let resHtml = [];
    if (sysVio && isWin) {
      resHtml.push({ type: 'danger', icon: '⚠️', title: 'Cảnh báo quan trọng', text: 'Bạn vi phạm hệ thống nhưng vẫn thắng. Đây là nguy hiểm nhất có thể xảy ra — não bộ của bạn vừa nhận được reward cho hành vi XẤU. Vòng lặp sai lầm đang được củng cố. Lần sau sẽ vi phạm mạnh hơn.' });
    }
    if (sysVio && isLoss) {
      resHtml.push({ type: 'bad', icon: '🩸', title: 'Phân tích thất bại', text: 'Vi phạm hệ thống + thua = phải review kỹ. Câu hỏi: (1) Nếu đúng hệ thống, lệnh này có khả năng thắng không? (2) Con quỷ nào đã khiến bạn vi phạm? Đây là bài học quan trọng nhất.' });
    }
    if (!sysVio && isLoss) {
      resHtml.push({ type: 'ok', icon: '✅', title: 'Thua đúng cách', text: 'Đây là "chi phí kinh doanh" bình thường. Bạn đã tuân thủ hệ thống — lần thua này không phải thất bại, đó là khoản phí để thị trường hoạt động. Tiếp tục giữ kỷ luật.' });
    }
    if (hasDemon) {
      resHtml.push({ type: 'purple', icon: '👹', title: 'Con quỷ phát hiện', text: `${demons.join(', ')}. Rất tốt khi bạn tự nhận ra! Việc đặt tên con quỷ là bước đầu tiên để kiểm soát nó.` });
    }
    if (emos.includes('😌 Bình tĩnh') && !hasDemon) {
      resHtml.push({ type: 'ok', icon: '🌟', title: 'Trạng thái lý tưởng', text: 'Bình tĩnh + không có con quỷ = điều kiện tâm lý tốt nhất để giao dịch. Lưu ý cảm giác này để nhận ra sự khác biệt khi con quỷ xuất hiện lần sau.' });
    }
    if (lesson.length > 20) {
      resHtml.push({ type: 'gold', icon: '✦', title: 'Bài học', text: 'Bài học bạn rút ra được ghi nhận. Đây là phần quan trọng nhất của Journal.' });
    }

    setAnalysis({ type: 'success', data: resHtml.length > 0 ? resHtml : [{ type: 'normal', text: 'Hãy điền thêm thông tin để nhận phân tích chi tiết hơn.' }] });
  };

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Edit3 size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Trading Journal Entry</h3>
        <span className="text-xs text-gray-500 dark:text-[#848E9C] font-mono">{new Date().toLocaleDateString('vi-VN')}</span>
      </div>
      <div className="p-8">
        <div className="text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-4">Thông tin lệnh</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Thị trường</label>
            <input type="text" value={mkt} onChange={e => setMkt(e.target.value)} placeholder="XAU/USD, BTC..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Hướng</label>
            <select value={dir} onChange={e => setDir(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors">
              <option value="">Chọn...</option><option>BUY (Long)</option><option>SELL (Short)</option>
            </select>
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Kết quả</label>
            <select value={res} onChange={e => setRes(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors">
              <option value="">Chọn...</option><option>Thắng ✅</option><option>Thua ❌</option><option>Break Even ➖</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">R:R thực tế</label>
            <input type="text" value={rr} onChange={e => setRr(e.target.value)} placeholder="1:2.5" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Có theo hệ thống?</label>
            <select value={sys} onChange={e => setSys(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors">
              <option value="">Chọn...</option><option>✅ Đúng 100% hệ thống</option><option>⚠️ Sai 1-2 điều</option><option>❌ Vi phạm hoàn toàn</option>
            </select>
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Điểm tự chấm (1-10)</label>
            <input type="number" value={score} onChange={e => setScore(e.target.value)} min={1} max={10} placeholder="7" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>

        <div className="mb-8">
          <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-3 block">Cảm xúc khi vào lệnh</label>
          <div className="flex flex-wrap gap-2">
            {['😤 Tự tin cao', '😰 Lo lắng', '😱 FOMO', '😠 Tức giận (sau thua)', '😌 Bình tĩnh', '🤔 Lưỡng lự', '🎯 Tập trung', '😵 Mất kiểm soát'].map(e => (
              <button key={e} onClick={() => toggleEmo(e)} className={`px-4 py-2 rounded-xl text-[16.5px] transition-all border ${emos.includes(e) ? 'border-yellow-500 dark:border-[#FCD535] bg-yellow-50 dark:bg-[#FCD535]/10 text-yellow-800 dark:text-[#FCD535] font-bold' : 'border-gray-200 dark:border-[#2B3139] bg-white dark:bg-[#181A20] text-gray-700 dark:text-[#EAECEF] hover:border-gray-300 dark:hover:border-[#474D57]'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-3 block">Nhận diện Con Quỷ nào đã ảnh hưởng bạn?</label>
          <div className="flex flex-col gap-3">
            {['👁 FOMO — Vào lệnh vì sợ bỏ lỡ', '🔥 Revenge — Vào để gỡ lệnh trước', '👑 Overconfidence — Quá tự tin, không kiểm tra lại', '🧊 Loss Aversion — Không cắt lỗ đúng hạn', '🪬 Confirmation Bias — Chỉ xem tín hiệu mình muốn thấy', '🐑 Herding — Theo đám đông/signal người khác', '🎰 Overtrading — Vào lệnh không đủ setup'].map(d => (
              <label key={d} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={demons.includes(d)} onChange={() => toggleDemon(d)} className="w-5 h-5 rounded border-gray-300 dark:border-[#2B3139] text-yellow-500 dark:text-[#00d084] focus:ring-yellow-500 dark:focus:ring-[#00d084] bg-white dark:bg-[#181A20] cursor-pointer" />
                <span className="text-[17.5px] text-gray-700 dark:text-[#EAECEF] group-hover:text-black dark:group-hover:text-white transition-colors">{d}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-3 block">Bài học từ lệnh này</label>
          <textarea value={lesson} onChange={e => setLesson(e.target.value)} rows="3" placeholder="Lần sau mình sẽ... / Mình nhận ra rằng..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
        </div>

        <button onClick={analyze} className="w-full py-4 rounded-xl font-black text-[18.5px] uppercase tracking-wider transition-all bg-yellow-500 dark:bg-[#00d084] hover:bg-yellow-400 dark:hover:bg-[#00e691] text-black shadow-[0_4px_14px_0_rgba(234,179,8,0.39)] dark:shadow-[0_4px_14px_0_rgba(0,208,132,0.39)]">
          ✦ Phân tích Journal ✦
        </button>

        {analysis && (
          <div className={`mt-6 p-6 rounded-2xl border transition-all ${analysis.type === 'warn' ? 'bg-yellow-50 dark:bg-[#FCD535]/10 border-yellow-200 dark:border-[#FCD535]/30 text-yellow-800 dark:text-[#FCD535]' : 'bg-gray-50 dark:bg-[#0B0E11] border-gray-200 dark:border-[#2B3139]'}`}>
            {analysis.type === 'warn' ? (
              <div className="text-[16.5px] leading-relaxed">{analysis.msg}</div>
            ) : (
              <div>
                <div className="text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-4">📊 Phân tích của bạn</div>
                <div className="space-y-4">
                  {analysis.data.map((item, i) => (
                    item.type === 'normal' ? (
                      <div key={i} className="text-[17.5px] text-gray-700 dark:text-[#9ca3b0]">{item.text}</div>
                    ) : (
                      <div key={i} className={`p-4 rounded-xl border ${item.type === 'danger' ? 'bg-red-50 dark:bg-[#F6465D]/10 border-red-200 dark:border-[#F6465D]/30 text-red-800 dark:text-[#F6465D]' : item.type === 'bad' ? 'bg-red-50 dark:bg-[#F6465D]/10 border-red-200 dark:border-[#F6465D]/30 text-red-800 dark:text-[#F6465D]' : item.type === 'ok' ? 'bg-green-50 dark:bg-[#0ECB81]/10 border-green-200 dark:border-[#0ECB81]/30 text-green-800 dark:text-[#0ECB81]' : item.type === 'purple' ? 'bg-purple-50 dark:bg-[#9b59ff]/10 border-purple-200 dark:border-[#9b59ff]/30 text-purple-800 dark:text-[#9b59ff]' : 'bg-yellow-50 dark:bg-[#FCD535]/10 border-yellow-200 dark:border-[#FCD535]/30 text-yellow-800 dark:text-[#FCD535]'}`}>
                        <div className="font-bold mb-1"><span className="mr-2">{item.icon}</span>{item.title}</div>
                        <div className="text-[16.5px] leading-relaxed opacity-90">{item.text}</div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// ==========================================
// CHAPTER 5 DATA
// ==========================================
const CHAPTER_5_DATA_VN = [
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "0. Khoa học Thần kinh & 7 Con quỷ",
    content: (
      <>
        <SectionHead icon={<Brain size={16} />} title="Tại sao trader giỏi kỹ thuật vẫn thua lỗ?" desc="Kẻ thù không nằm trên chart. Kẻ thù nằm trong đầu bạn." />
        <StoryBox label="📖 The Matrix của Trading" icon="🧠">
          Năm 2002, Daniel Kahneman đoạt giải Nobel Kinh tế vì chứng minh: <strong>Con người không đưa ra quyết định tài chính dựa trên logic.</strong> Chúng ta ra quyết định dựa trên cảm xúc, bản năng tiến hóa, và thiên kiến (biases) — sau đó dùng logic để ngụy biện cho quyết định đó.<br /><br />
          Thị trường tài chính là một cỗ máy được thiết kế hoàn hảo để kích hoạt mọi bản năng tồi tệ nhất của con người: tham lam, sợ hãi, bầy đàn. <em>Hệ thống giao dịch (NNN) là vũ khí của bạn. Nhưng tâm lý là người cầm vũ khí.</em>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="System 1 vs System 2" desc="Daniel Kahneman — Thinking, Fast and Slow" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-red-200 dark:border-[#F6465D]/30 bg-red-50 dark:bg-[#F6465D]/5 rounded-2xl p-6">
            <div className="text-4xl text-red-500 dark:text-[#F6465D] font-black mb-2">1</div>
            <div className="font-bold text-red-700 dark:text-[#F6465D] text-lg mb-4">System 1 — "Con Thú"</div>
            <ul className="space-y-2">
              {['Tự động, vô thức, cực nhanh', 'Cảm xúc, bản năng, trực giác', 'Tiêu tốn ít năng lượng', 'Không thể tắt', 'Điều khiển 95% hành vi', 'Kẻ thù trong trading'].map((item, i) => (
                <li key={i} className={`flex gap-2 text-[16.5px] ${i === 5 ? 'text-red-700 dark:text-[#F6465D] font-bold' : 'text-gray-700 dark:text-[#EAECEF]'}`}><span className="text-red-500 shrink-0">▸</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-green-200 dark:border-[#0ECB81]/30 bg-green-50 dark:bg-[#0ECB81]/5 rounded-2xl p-6">
            <div className="text-4xl text-green-500 dark:text-[#0ECB81] font-black mb-2">2</div>
            <div className="font-bold text-green-700 dark:text-[#0ECB81] text-lg mb-4">System 2 — "Nhà Triết Học"</div>
            <ul className="space-y-2">
              {['Chậm, có ý thức, cần nỗ lực', 'Logic, phân tích, lý trí', 'Tiêu tốn nhiều năng lượng', 'Dễ bị giao động bởi S1', 'Chỉ kích hoạt khi được yêu cầu', 'Người mình muốn làm chủ'].map((item, i) => (
                <li key={i} className={`flex gap-2 text-[16.5px] ${i === 5 ? 'text-green-700 dark:text-[#0ECB81] font-bold' : 'text-gray-700 dark:text-[#EAECEF]'}`}><span className="text-green-500 shrink-0">▸</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <StoryBox label="🧪 Thí nghiệm của Kahneman" icon="🧪" borderClass="border-red-300 dark:border-[#F6465D]/50" textClass="text-red-800 dark:text-[#F6465D]">
          Bạn đang giữ lệnh Buy vàng. Giá đột ngột giảm $15 trong 5 phút. Tim bạn đập nhanh. Bàn tay bắt đầu run.<br /><br /><strong>System 1 thì thầm:</strong> "Chạy đi! Giá đang sụp đổ! Đóng lệnh ngay!"<br /><strong>System 2 im lặng vì System 1 chiếm hết oxygen.</strong><br /><br />Bạn đóng lệnh. Hai phút sau giá phục hồi và tăng $30. Stop loss của bạn vẫn còn rất xa và không bị quét.<br /><br />Kahneman gọi đây là <em>Cognitive Hijacking</em> — khi System 1 chiếm quyền kiểm soát hoàn toàn trước khi System 2 kịp phân tích.
        </StoryBox>

        <SectionHead icon={<RefreshCw size={16} />} title="Vòng lặp thói quen và Trading" desc="James Clear — Atomic Habits" />
        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Vòng lặp thói quen xấu trong Trading</div>
          <div>CUE: Thấy giá đang tăng nhanh (tin tức tốt)</div>
          <div>CRAVING: Não tiết dopamine → "Tôi phải mua ngay!"</div>
          <div>RESPONSE: Vào lệnh vội vã, không theo hệ thống</div>
          <div>REWARD: Đôi khi thắng (củng cố thói quen xấu)</div>
          <div className="text-yellow-400 dark:text-[#FCD535]">→ Lần sau: Cue tương tự → Craving mạnh hơn → Response tự động hơn</div>
          <br />
          <div className="text-gray-400 text-xs">// Để phá vòng lặp (theo Atomic Habits):</div>
          <div>CUE: Nhận ra kích thích → PAUSE (tạm dừng có ý thức)</div>
          <div>CRAVING: Thay reward "vào lệnh" bằng "kiểm tra checklist"</div>
          <div>RESPONSE: Thực hiện đúng quy trình</div>
          <div>REWARD: Tự khen mình đã tuân thủ hệ thống</div>
        </div>

        <SectionHead icon={<Activity size={16} />} title="Tại sao thua lỗ đau hơn thắng vui?" desc="Prospect Theory — Kahneman & Tversky" />
        <p className="text-[18.5px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          Kahneman và Tversky (1979) phát hiện ra điều này: <strong>Mất $100 gây ra nỗi đau tâm lý gấp 2-2.5 lần niềm vui khi kiếm được $100.</strong> Đây là lý do tại sao chúng ta khó cắt lỗ — vì cắt lỗ = hiện thực hóa nỗi đau, và não bộ không muốn đau.
        </p>
        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-5 my-4">
          <div className="text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-3">Prospect Theory — Minh họa trực quan</div>
          <div className="flex items-center gap-2 text-[15.5px] font-mono mb-4">
            <span className="text-red-600 dark:text-[#F6465D] font-bold">Mất $100</span>
            <span className="text-gray-500">=</span>
            <span className="text-yellow-600 dark:text-[#FCD535] font-bold">Cần thắng $200-250</span>
            <span className="text-gray-500">để cảm thấy</span>
            <span className="text-green-600 dark:text-[#0ECB81] font-bold">hòa về cảm xúc</span>
          </div>
          <div className="relative h-2 rounded-full bg-gradient-to-r from-red-500 via-gray-300 dark:via-gray-600 to-green-500 mt-8 mb-2">
            <div className="absolute top-[-24px] left-[30%] text-[12.5px] font-mono font-bold text-red-600 dark:text-[#F6465D] -translate-x-1/2">Lỗ $100</div>
            <div className="absolute top-[-24px] left-[50%] text-[12.5px] font-mono font-bold text-gray-500 -translate-x-1/2">0</div>
            <div className="absolute top-[-24px] left-[90%] text-[12.5px] font-mono font-bold text-green-600 dark:text-[#0ECB81] -translate-x-1/2">Lời $200+</div>
          </div>
        </div>

        <SimpleQuiz
          q="Bạn đang xem chart. Giá đột ngột tăng 3% trong 10 phút, Twitter đang sôi sùng sục. Bạn ngay lập tức cảm thấy muốn mua vào. Hệ thống nào đang điều khiển bạn?"
          opts={['System 2 — bạn đang phân tích kỹ lưỡng', 'System 1 — cảm xúc và bản năng đang chiếm quyền trước khi bạn kịp suy nghĩ', 'Cả hai đang hoạt động song song', 'Không hệ thống nào — đây là quyết định thuần lý trí']}
          correctIdx={1}
          explanation="System 1 chiếm quyền điều khiển ngay lập tức khi có kích thích cảm xúc mạnh. Bạn cảm thấy 'muốn' mua trước khi kịp phân tích — đó là dấu hiệu của Cognitive Hijacking."
        />
        <SimpleQuiz
          q="Tại sao nhiều trader 'biết mình sai mà vẫn không cắt lỗ'?"
          opts={['Vì họ thiếu kiến thức kỹ thuật', 'Prospect Theory: cắt lỗ = hiện thực hóa nỗi đau (System 1 né tránh); não bộ thà giữ hy vọng hơn là chấp nhận đau ngay lập tức', 'Vì họ lười biếng', 'Vì broker không cho đóng lệnh']}
          correctIdx={1}
          explanation="Prospect Theory của Kahneman: cắt lỗ = hiện thực hóa đau đớn ngay lập tức. Não bộ (System 1) chọn 'hy vọng sẽ về' thay vì 'đau ngay bây giờ' — dù về lý trí là sai."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 0</div>
          <ul className="space-y-2">
            {['System 1 (cảm xúc, nhanh) điều khiển 95% quyết định. System 2 (lý trí, chậm) thường đến sau khi đã hành động.', 'Prospect Theory: thua $100 đau gấp 2-2.5 lần vui khi thắng $100 → não bộ né tránh cắt lỗ.', 'Thói quen xấu trong trading được ăn sâu vào não qua vòng lặp Cue-Craving-Response-Reward.', 'Giải pháp: tạo "khoảng dừng" (pause) giữa Cue và Response để System 2 có thời gian hoạt động.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "1. Quỷ 1: FOMO",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#2c0a0a] to-[#1a0505] p-8 rounded-3xl text-center mb-8 border border-[#c0392b]/30">
          <div className="text-[14.5px] font-mono text-[#c0392b] uppercase tracking-[0.2em] mb-4">// Con Quỷ 1/7</div>
          <div className="text-6xl mb-4">👁</div>
          <h1 className="text-3xl font-black text-white mb-2">FOMO</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Avaritia — Tham Lam</p>
          <p className="text-[16.5px] font-mono text-[#c0392b] bg-[#c0392b]/10 p-4 rounded-xl border border-[#c0392b]/20">"Nó thì thầm: Giá đang tăng và mày chưa vào. Ngốc à?"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Khai thác nỗi sợ bỏ lỡ cơ hội</strong>
          </div>
        </div>

        <StoryBox label="📜 Câu chuyện truyền đời" icon="👁" borderClass="border-red-500/30" textClass="text-gray-300">
          <div className="text-gray-800 dark:text-gray-300">
            Năm 2021, Bitcoin tăng từ $10,000 lên $60,000 trong 1 năm. Hàng triệu người nhìn thấy bạn bè, người thân kiếm tiền và cảm thấy đau đớn vì đã không vào sớm hơn. Vào tháng 11/2021, khi BTC chạm $58,000, hàng triệu người cuối cùng cũng đầu hàng trước FOMO và mua vào.<br /><br />Ba tháng sau, BTC rơi xuống $32,000. <strong>Những người mua vì FOMO ở đỉnh đã mất 45% tài sản.</strong><br /><br />FOMO không quan tâm đến phân tích kỹ thuật của bạn. Nó chỉ nói: "Thời cơ đang qua đi. Mày sẽ hối hận."
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="Khoa học đằng sau" desc="Kahneman · Sapiens · Atomic Habits" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          System 1 của Kahneman kết hợp với "Social Comparison" trong Sapiens: khi thấy người khác làm giàu, não tiết cortisol (stress hormone) và dopamine cùng lúc. Combo này khiến bạn hành động bốc đồng để giảm stress của việc "bị bỏ lại".
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Triệu chứng nhận biết" desc="Bạn có đang bị con quỷ này ám không?" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Mua vào khi giá đã tăng rất mạnh và mọi người đang nói về nó', 'Vào lệnh không có setup rõ ràng, chỉ vì "sợ bỏ lỡ"', 'Tăng size lệnh khi thấy người khác kiếm nhiều hơn mình', 'Theo dõi chart liên tục, lo lắng khi không có lệnh'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Nghi thức trừ quỷ" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Phương thức đối trị</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Nghi thức trừ FOMO:</strong> Khi cảm thấy FOMO, viết ra 3 điều: (1) "Tôi muốn vào vì..." (2) "Setup kỹ thuật hiện tại là..." (3) "Nếu không vào, cơ hội tiếp theo sẽ đến khi..." Hành động viết ra kích hoạt System 2. Thêm: nhớ rằng "cơ hội tiếp theo luôn đến — thị trường không bao giờ ngừng."
          </div>
        </div>

        <SimpleQuiz
          q="Giá BTC đang tăng 15% trong ngày, Twitter đang sôi sùng sục. Bạn không có setup nào nhưng cảm thấy phải mua ngay. Con quỷ nào đang điều khiển bạn và bạn nên làm gì?"
          opts={['Mua ngay vì momentum đang rất mạnh', 'FOMO — Dừng lại, viết ra "tại sao mình muốn vào", kiểm tra xem có setup kỹ thuật thật sự không. Nếu không có setup → không vào', 'SELL vì giá đã tăng quá nhiều', 'Chờ và mua khi giá pullback 5%']}
          correctIdx={1}
          explanation="FOMO là con quỷ và 'pause + checklist' là cách trừ. Không có setup = không vào, dù giá đang bay."
        />
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "2. Quỷ 2: Revenge Trading",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#2c0e0e] to-[#1a0808] p-8 rounded-3xl text-center mb-8 border border-[#e74c3c]/30">
          <div className="text-[14.5px] font-mono text-[#e74c3c] uppercase tracking-[0.2em] mb-4">// Con Quỷ 2/7</div>
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-3xl font-black text-white mb-2">REVENGE TRADING</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Ira — Phẫn Nộ</p>
          <p className="text-[16.5px] font-mono text-[#e74c3c] bg-[#e74c3c]/10 p-4 rounded-xl border border-[#e74c3c]/20">"Nó gầm lên: Thị trường cướp tiền của mày. Lấy lại đi!"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Biến cảm xúc tức giận thành tự sát tài chính</strong>
          </div>
        </div>

        <StoryBox label="📜 Câu chuyện của Marcus" icon="🔥" borderClass="border-red-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            Marcus là trader crypto 6 tháng kinh nghiệm. Tháng 10, anh thua 3 lệnh liên tiếp, mất $600. Anh cảm thấy thị trường "không công bằng" và "cướp tiền của anh".<br /><br />Anh tức giận. Anh tăng gấp đôi size lệnh tiếp theo để "lấy lại ngay". Lệnh thứ 4 thua. Anh tăng gấp 3 size. Thua nốt. Trong 2 giờ, Marcus đã mất $3,200 — gấp 5 lần số tiền đã mất ban đầu.<br /><br /><strong>"Thị trường không biết bạn là ai. Nó không cướp tiền của bạn. Nó chỉ phản ánh quyết định của bạn."</strong> — câu nói này đến quá muộn với Marcus.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="Khoa học đằng sau" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          "Amygdala Hijack" — thuật ngữ của Daniel Goleman: khi tức giận, amygdala (não cảm xúc) chiếm hoàn toàn prefrontal cortex (não lý trí). Bạn secara harfiah không thể suy nghĩ rõ ràng khi đang tức giận. Atomic Habits: khi cảm xúc cực độ, habit loop bị phá vỡ — chỉ còn reaction thuần túy.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Triệu chứng nhận biết" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Thua lệnh → vào lệnh mới ngay để "gỡ"', 'Tăng size sau khi thua (reverse martingale lệch lạc)', 'Cảm thấy thị trường "không công bằng" hoặc "cố tình quét SL của mình"', 'Giao dịch với cảm giác tức giận, bực bội'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Nghi thức trừ quỷ" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Phương thức đối trị</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Quy tắc 24 giờ:</strong> Sau mỗi lệnh thua &gt;1.5× risk bình thường → dừng giao dịch ngay trong ngày đó. Đóng máy tính. Ra ngoài đi bộ. Điều này không phải yếu đuối — đây là kỷ luật chuyên nghiệp. Nhớ: "Thị trường sẽ ở đó vào ngày mai. Tài khoản bị blowup thì không."
          </div>
        </div>

        <SimpleQuiz
          q="Bạn vừa thua 2 lệnh liên tiếp, mất $200. Cảm giác bực bội dâng lên và bạn muốn vào lệnh thứ 3 ngay lập tức để 'gỡ lại'. Con quỷ nào đây và bạn nên làm gì?"
          opts={['Vào lệnh thứ 3 với size nhỏ hơn để an toàn hơn', 'Con quỷ Phẫn Nộ — Dừng lại. Đóng máy tính. Không trade thêm trong ngày hôm nay.', 'Phân tích kỹ càng 30 phút rồi mới vào', 'FOMO — cần mua ngay trước khi cơ hội qua đi']}
          correctIdx={1}
          explanation="Revenge Trading là con quỷ nguy hiểm nhất về tốc độ phá hủy. Dừng 100% là câu trả lời đúng duy nhất."
        />
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "3. Quỷ 3: Overconfidence",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#1a1500] to-[#0f0f00] p-8 rounded-3xl text-center mb-8 border border-[#d4ac0d]/30">
          <div className="text-[14.5px] font-mono text-[#d4ac0d] uppercase tracking-[0.2em] mb-4">// Con Quỷ 3/7</div>
          <div className="text-6xl mb-4">👑</div>
          <h1 className="text-3xl font-black text-white mb-2">OVERCONFIDENCE</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Superbia — Kiêu Ngạo</p>
          <p className="text-[16.5px] font-mono text-[#d4ac0d] bg-[#d4ac0d]/10 p-4 rounded-xl border border-[#d4ac0d]/20">"Nó thì thầm: Mày đọc được thị trường rồi. Mày giỏi hơn những kẻ kia."</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Biến thành công thành mầm mống thất bại</strong>
          </div>
        </div>

        <StoryBox label="📜 Câu chuyện về Icarus" icon="👑" borderClass="border-yellow-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            Có một trader, sau 5 lệnh thắng liên tiếp (tổng +35%), bắt đầu tin rằng anh đã "crack the code" của thị trường. Anh bắt đầu bỏ qua checklist, tăng size, và bước vào giao dịch với niềm tin tuyệt đối.<br /><br />Anh nhớ câu chuyện Icarus — cậu bé bay bằng cánh sáp, bay càng cao càng gần mặt trời, cuối cùng sáp tan chảy và rơi xuống biển.<br /><br /><strong>Thị trường không thưởng cho sự kiêu ngạo. Nó chờ đợi khoảnh khắc bạn tự tin nhất để dạy cho bạn bài học đắt nhất.</strong>
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="Khoa học đằng sau" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Sapiens: "Narrative Fallacy" — não người tạo ra câu chuyện liên kết để giải thích thế giới. Sau 5 lần thắng, não tự động tạo câu chuyện "tôi giỏi hơn thị trường" thay vì "tôi may mắn trong chuỗi ngắn". Kahneman gọi đây là "Illusion of Control" — ảo tưởng rằng mình kiểm soát được điều về bản chất là ngẫu nhiên.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Triệu chứng nhận biết" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Bỏ qua trading plan và checklist vì "mình biết nó sẽ đi đâu"', 'Tăng size sau chuỗi thắng mà không có lý do hệ thống', 'Coi thường rủi ro vì "lần này khác"', 'Không review lệnh sai vì "đó là ngoại lệ"'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Nghi thức trừ quỷ" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Phương thức đối trị</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Bài kiểm tra Feynman:</strong> Sau mỗi chuỗi thắng, hỏi: "Tôi có thể giải thích chính xác tại sao lệnh này thắng không? Dựa trên nguyên tắc nào?" Nếu câu trả lời là "vì tôi cảm thấy thị trường sẽ đi lên" → đó là Overconfidence, không phải kỹ năng. Giữ size cố định bất kể chuỗi thắng hay thua.
          </div>
        </div>

        <SimpleQuiz
          q="Bạn vừa thắng 6 lệnh liên tiếp, tổng +$1,200. Bạn cảm thấy 'đang vào guồng' và muốn tăng size lệnh tiếp theo lên gấp đôi. Đây có phải ý tưởng tốt?"
          opts={['Tốt — đang thắng liên tiếp nên nên tận dụng momentum', 'Không — đây là Overconfidence. 6 lệnh không đủ để xác định kỹ năng vs may mắn. Giữ size cố định và tiếp tục hệ thống.', 'Tốt nhưng chỉ tăng 25% thôi', 'Nên giảm size vì chuỗi thắng sắp kết thúc']}
          correctIdx={1}
          explanation="Overconfidence là con quỷ giỏi ngụy trang nhất. Giữ size cố định dù đang thắng hay thua là kỷ luật quan trọng nhất. 6 lệnh là mẫu quá nhỏ để kết luận."
        />
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "4. Quỷ 4: Loss Aversion",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#020d1a] to-[#010a14] p-8 rounded-3xl text-center mb-8 border border-[#2980b9]/30">
          <div className="text-[14.5px] font-mono text-[#2980b9] uppercase tracking-[0.2em] mb-4">// Con Quỷ 4/7</div>
          <div className="text-6xl mb-4">🧊</div>
          <h1 className="text-3xl font-black text-white mb-2">LOSS AVERSION</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Acedia — Sợ Hãi</p>
          <p className="text-[16.5px] font-mono text-[#2980b9] bg-[#2980b9]/10 p-4 rounded-xl border border-[#2980b9]/20">"Nó thì thầm: Đừng cắt lỗ. Biết đâu giá sẽ quay về..."</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Đóng băng khả năng ra quyết định đúng đắn</strong>
          </div>
        </div>

        <StoryBox label="📜 Câu chuyện về Người Cầm Lửa" icon="🧊" borderClass="border-blue-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            Một người cầm ngọn lửa trong tay. Lửa bắt đầu đốt cháy, gây đau. Nhưng anh ta không buông tay — vì anh sợ mất ngọn lửa.<br /><br />Mỗi giây trôi qua, vết thương sâu hơn. Cuối cùng anh mất không chỉ ngọn lửa mà còn cả bàn tay.<br /><br /><strong>Giữ lệnh thua vì "sợ thực hiện thua lỗ" giống hệt người cầm lửa đó.</strong> Stop Loss không phải thừa nhận thất bại — đó là quyết định sáng suốt nhất bạn có thể làm.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="Khoa học đằng sau" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Prospect Theory (Kahneman & Tversky 1979): mất $100 = đau tâm lý tương đương thắng $200-250. Vì vậy não bộ "đóng băng" trước quyết định cắt lỗ — nó ưu tiên duy trì "hy vọng" hơn là hiện thực hóa đau. Đây là bất đối xứng cảm xúc tự nhiên nhưng gây tổn thất tài chính.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Triệu chứng nhận biết" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Không đặt Stop Loss hoặc dời SL ra xa hơn khi bị chạm', 'Giữ lệnh thua với suy nghĩ "biết đâu giá sẽ quay về"', 'Đóng lệnh thắng quá sớm vì "sợ mất lợi nhuận" nhưng giữ lệnh thua mãi', 'Cảm thấy nhẹ nhõm khi lệnh thua cuối cùng về BE thay vì phân tích tại sao không cắt sớm hơn'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Nghi thức trừ quỷ" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Phương thức đối trị</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Nghi thức Pre-mortem:</strong> Trước khi vào lệnh, hỏi: "Nếu lệnh này đến SL, đó có phải lỗi của tôi không hay là rủi ro hợp lý?" Nếu hợp lý → chấp nhận trước. Coi SL là "chi phí kinh doanh" như tiền thuê mặt bằng cho shop, không phải thất bại.
          </div>
        </div>

        <SimpleQuiz
          q="Lệnh Buy vàng của bạn đang lỗ $80 (chạm SL). Nhưng bạn quyết định dời SL thêm $50 xuống nữa vì 'vàng hay đảo chiều từ vùng này'. Đây là con quỷ nào?"
          opts={['Không có vấn đề — điều chỉnh SL linh hoạt là bình thường', 'Loss Aversion — dời SL để tránh hiện thực hóa đau là sai lầm nghiêm trọng nhất có thể làm', 'Overconfidence — quá tin vào phân tích của mình', 'FOMO — sợ bỏ lỡ cơ hội nếu giá quay lên']}
          correctIdx={1}
          explanation="Dời SL ra xa khi bị chạm = hành động nguy hiểm nhất do Loss Aversion. Não bộ tránh hiện thực hóa đau, dẫn đến lỗ nhỏ thành lỗ lớn. SL đặt ra để tôn trọng, không phải để dời."
        />
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "5. Quỷ 5: Confirmation Bias",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#100a1a] to-[#0a0510] p-8 rounded-3xl text-center mb-8 border border-[#8e44ad]/30">
          <div className="text-[14.5px] font-mono text-[#8e44ad] uppercase tracking-[0.2em] mb-4">// Con Quỷ 5/7</div>
          <div className="text-6xl mb-4">🪬</div>
          <h1 className="text-3xl font-black text-white mb-2">CONFIRMATION BIAS</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Invidia — Dối Trá</p>
          <p className="text-[16.5px] font-mono text-[#8e44ad] bg-[#8e44ad]/10 p-4 rounded-xl border border-[#8e44ad]/20">"Nó thì thầm: Nhìn đây — tất cả tín hiệu đều xác nhận phân tích của mày."</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Làm mù mắt trước sự thật, chỉ thấy điều mình muốn thấy</strong>
          </div>
        </div>

        <StoryBox label="📜 Câu chuyện về Thợ Bói Chart" icon="🪬" borderClass="border-purple-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            Có một trader quyết định BUY Bitcoin trước khi xem bất kỳ dữ liệu nào. Sau đó anh mở chart.<br /><br />Anh thấy EMA21 đang dốc lên — <em>"Ủng hộ Buy!"</em>. Anh nhìn qua RSI đang ở 68 — <em>"Vẫn chưa overbought, ủng hộ Buy!"</em>. Anh xem volume — thấp hơn trung bình — <em>"Chắc chuẩn bị tăng mạnh, ủng hộ Buy!"</em>. Anh nhìn thấy kháng cự lớn ở phía trên — anh không nhìn vào đó nữa.<br /><br /><strong>Anh đã không phân tích chart — anh đã thuyết phục bản thân.</strong>
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="Khoa học đằng sau" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Sapiens: "Cognitive Dissonance" — khi có sự mâu thuẫn giữa niềm tin và thực tế, não chọn bảo vệ niềm tin bằng cách bác bỏ thực tế. Trong trading: khi đã muốn vào lệnh, não tự động "lọc ra" các tín hiệu ngược chiều và "khuếch đại" các tín hiệu cùng chiều.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Triệu chứng nhận biết" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Phân tích chart SAU KHI đã quyết định hướng lệnh', 'Bỏ qua hoặc giải thích khác đi khi thấy tín hiệu ngược chiều', 'Chỉ đọc tin tức/phân tích đồng tình với quan điểm của mình', 'Cảm thấy "chắc chắn" về một lệnh mà không có lý do rõ ràng'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Nghi thức trừ quỷ" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Phương thức đối trị</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Devil's Advocate Protocol:</strong> Sau khi phân tích xong, dành 2 phút chơi "luật sư bào chữa cho phía ngược lại". Hỏi: "Nếu tôi SELL thay vì BUY, lý do tốt nhất là gì?" Nếu không tìm được ít nhất 2 lý do hợp lý → analysis chưa đủ khách quan.
          </div>
        </div>

        <SimpleQuiz
          q="Bạn đã quyết định BUY ETH. Khi xem chart, bạn chú ý nhiều hơn đến tín hiệu ủng hộ Buy và tự giải thích những tín hiệu bán như 'chỉ là nhiễu'. Đây là gì?"
          opts={['Phân tích đa chiều — điều bình thường', 'Confirmation Bias — bạn đang tìm kiếm xác nhận thay vì sự thật. Hãy chủ động tìm lý do SELL trước khi quyết định cuối cùng', 'Overconfidence — quá tin vào kỹ năng phân tích', 'Loss Aversion — sợ lệnh này thua']}
          correctIdx={1}
          explanation="Confirmation Bias là con quỷ trí tuệ nhất — nó không bao giờ nói dối bạn trực tiếp, nó chỉ chọn lọc sự thật. Bằng cách tìm kiếm lý do ngược lại (SELL), bạn buộc System 2 hoạt động."
        />
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "6. Quỷ 6: Herding",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#020f07] to-[#010a04] p-8 rounded-3xl text-center mb-8 border border-[#27ae60]/30">
          <div className="text-[14.5px] font-mono text-[#27ae60] uppercase tracking-[0.2em] mb-4">// Con Quỷ 6/7</div>
          <div className="text-6xl mb-4">🐑</div>
          <h1 className="text-3xl font-black text-white mb-2">HERDING</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Luxuria — Ngu Muội Bầy Đàn</p>
          <p className="text-[16.5px] font-mono text-[#27ae60] bg-[#27ae60]/10 p-4 rounded-xl border border-[#27ae60]/20">"Nó rủ rỉ: Tất cả mọi người đều đang mua. Mày muốn là người duy nhất không tham gia?"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Sử dụng bản năng bầy đàn 200,000 năm tiến hóa chống lại bạn</strong>
          </div>
        </div>

        <StoryBox label="📜 Câu chuyện của Yuval Harari (Sapiens)" icon="🐑" borderClass="border-green-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            200,000 năm trước, con người sống trong nhóm nhỏ 50-150 người. Ai đi khác bầy thường bị sư tử ăn. Ai theo bầy thường sống sót.<br /><br />"Khi thấy mọi người chạy, chạy đi — câu hỏi đặt ra sau" là một nguyên tắc sinh tồn tuyệt vời.<br /><br /><strong>Trong thị trường tài chính, nguyên tắc đó giết chết bạn.</strong><br /><br />Khi mọi người đang mua đồng loạt — đó thường là đỉnh. Khi mọi người bán tháo hoảng loạn — đó thường là đáy. Thị trường được thiết kế để lấy tiền từ đám đông và trao cho thiểu số dám đi ngược.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="Khoa học đằng sau" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Sapiens: "Collective Fiction" — con người sở hữu khả năng độc nhất: tin vào câu chuyện chung (collective illusions). Khi "tin tức cộng đồng" nói BTC sẽ về 0, đám đông tin và bán. Khi tin BTC đến 1 triệu, đám đông tin và mua. Giá cả cuối cùng là tổng hợp của những câu chuyện này, không phải thực tế.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Triệu chứng nhận biết" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Vào lệnh vì Telegram/Discord/Twitter đang ồn ào về cơ hội', 'Mua theo "tín hiệu" từ các group, KOL trader mà không tự phân tích', 'Cảm thấy an tâm hơn khi có nhiều người đồng tình', 'Thay đổi phân tích của mình sau khi đọc comment/post của người khác'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Nghi thức trừ quỷ" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Phương thức đối trị</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Quy tắc Im Lặng:</strong> Không đọc bất kỳ tin tức trading, Telegram hay Twitter trong 30 phút trước khi phân tích chart. Phân tích độc lập trước, đọc quan điểm người khác sau (nếu cần). "Khi bạn cần người khác xác nhận phân tích của mình — bạn chưa có phân tích, bạn chỉ có hy vọng."
          </div>
        </div>

        <SimpleQuiz
          q="Một KOL trader nổi tiếng vừa đăng 'BUY BTC ngay bây giờ — mục tiêu $100k'. Mọi người trong group đang BUY ồ ạt. Bạn chưa kiểm tra chart. Bạn nên làm gì?"
          opts={['Buy ngay — KOL có kinh nghiệm hơn mình', 'Herding — dừng lại, tắt group, tự mở chart phân tích độc lập. Nếu setup của BẠN đồng ý, mới xem xét vào. Không vì KOL nói.', 'Buy nhưng với size nhỏ hơn để giảm rủi ro', 'Chờ thêm 10 người nữa confirm rồi mới buy']}
          correctIdx={1}
          explanation="Herding là bản năng tiến hóa. Phân tích độc lập là vũ khí chống lại nó. KOL trading có lợi ích riêng và không chịu trách nhiệm cho tài khoản của bạn."
        />
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "7. Quỷ 7: Overtrading",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#1a0a00] to-[#140700] p-8 rounded-3xl text-center mb-8 border border-[#e67e22]/30">
          <div className="text-[14.5px] font-mono text-[#e67e22] uppercase tracking-[0.2em] mb-4">// Con Quỷ 7/7</div>
          <div className="text-6xl mb-4">🎰</div>
          <h1 className="text-3xl font-black text-white mb-2">OVERTRADING</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Gula — Bạo Thực</p>
          <p className="text-[16.5px] font-mono text-[#e67e22] bg-[#e67e22]/10 p-4 rounded-xl border border-[#e67e22]/20">"Nó liên tục kêu: Nhàm chán lắm. Sao không vào lệnh đi? Đợi chi vậy?"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Biến sự nhàm chán thành con đường dẫn đến phá sản từ từ</strong>
          </div>
        </div>

        <StoryBox label="📜 Câu chuyện về Sòng Bạc" icon="🎰" borderClass="border-orange-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            Sòng bạc Las Vegas không kiếm tiền từ những người đặt cược lớn và thua. Họ kiếm tiền từ hàng triệu người đặt cược nhỏ liên tục trong nhiều giờ.<br /><br />Giống vậy, overtrading không phá hủy tài khoản bằng 1 lệnh lớn. Nó làm mòn tài khoản từ từ: spread + commission + những lệnh không đủ setup + những lệnh nhàm chán.<br /><br /><strong>"Không vào lệnh cũng là một quyết định. Và đôi khi đó là quyết định tốt nhất."</strong><br /><br />Trader giỏi nhất không phải người vào nhiều lệnh nhất. Họ là người biết chờ đợi setup tốt nhất và bỏ qua tất cả những thứ còn lại.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="Khoa học đằng sau" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Atomic Habits: dopamine không chỉ được tiết ra khi nhận reward — nó được tiết ra nhiều nhất khi đang ANTICIPATE reward. Nghĩa là: hành động trading (click chuột, chờ lệnh khớp) = dopamine hit. Não học: "trading = sướng". Kết quả: muốn trading liên tục bất kể điều kiện thị trường.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Triệu chứng nhận biết" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Vào lệnh khi không có setup rõ ràng vì "cảm thấy" thị trường sẽ tăng/giảm', 'Thực hiện nhiều hơn 3-5 lệnh/ngày trong swing trading', 'Cảm thấy bồn chồn, khó chịu khi không có lệnh đang mở', 'Vào lệnh nhỏ "thử" khi chưa đủ setup'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Nghi thức trừ quỷ" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Phương thức đối trị</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Quota ngược:</strong> Thay vì "tôi phải vào ít nhất X lệnh hôm nay", hãy đặt rule: "Tôi chỉ được vào tối đa Y lệnh/ngày" (với swing trade: Y = 2-3). Và quan trọng hơn: viết ra trong Journal mỗi lần KHÔNG vào lệnh vì không đủ setup. "Hôm nay tôi đã từ chối 3 cơ hội kém chất lượng" là thành tích đáng tự hào.
          </div>
        </div>

        <SimpleQuiz
          q="Bạn đã xem chart 3 giờ nhưng không thấy setup tốt theo hệ thống NNN. Bạn cảm thấy bồn chồn, muốn 'thử' một lệnh nhỏ cho vui. Đây là gì và bạn nên làm gì?"
          opts={['Vào lệnh nhỏ thôi — rủi ro không nhiều', 'Overtrading/dopamine loop — "không lệnh = kỷ luật thực sự". Đóng chart, làm việc khác. Ghi vào Journal: "Hôm nay đã từ chối lệnh vì không đủ setup."', 'Chờ thêm 1 tiếng, nếu vẫn không thấy thì thôi', 'Xem thêm chart khác để tìm cơ hội']}
          correctIdx={1}
          explanation="Overtrading được ăn sâu vào não qua dopamine. Vào lệnh 'thử' = cho phép con quỷ này lớn mạnh hơn. 'Không lệnh = kỷ luật' là tư duy của trader chuyên nghiệp."
        />
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "8. Trading Journal",
    content: (
      <>
        <SectionHead icon={<Notebook size={16} />} title="Trading Journal — Gương soi linh hồn Trader" desc="Công cụ duy nhất cho phép bạn nhìn thấy 7 con quỷ đang hoạt động trong chính mình." />
        <StoryBox label="📖 Tại sao Journal hoạt động?" icon="🧪" borderClass="border-purple-500/30">
          <div className="font-bold text-purple-700 dark:text-[#9b59ff] mb-2">Atomic Habits — "The Two-Minute Rule" & Habit Tracking (James Clear)</div>
          <div className="text-gray-800 dark:text-gray-300">
            Đo lường = Nhận thức. Một khi bạn bắt đầu ghi lại hành vi, não bộ tự động bắt đầu điều chỉnh. Không cần ý chí — chỉ cần ánh sáng của sự quan sát. "You do not rise to the level of your goals; you fall to the level of your systems."
          </div>
        </StoryBox>

        <p className="text-[18.5px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          Khi bạn ghi lại mỗi lệnh vào Journal, một điều kỳ diệu xảy ra: <strong>bạn bắt đầu thấy pattern</strong>. "Mình hay thua vào thứ Hai." "Mình ra quyết định tệ khi vừa thua 2 lệnh liên tiếp." "Con quỷ Kiêu Ngạo hay xuất hiện sau chuỗi thắng." <em>Không có Journal = không có dữ liệu = không biết mình đang bị con quỷ nào thao túng.</em>
        </p>

        <SectionHead icon={<Edit3 size={16} />} title="Thực hành: Điền Journal của bạn" desc="Một bản ghi mẫu — điền thật để nhận phân tích" />

        <JournalSimulator />

        <SectionHead icon={<Target size={16} />} title="Cách dùng Journal để tiêu diệt con quỷ" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Ghi lại MỌI lệnh — không ngoại lệ.</strong> Kể cả lệnh bạn "quên" không theo hệ thống. Đặc biệt lệnh đó. "Ánh sáng diệt ký sinh trùng."</> },
            { n: '2', text: <><strong>Review mỗi tuần — không phải xem có lời không.</strong> Câu hỏi quan trọng: "Tuần này con quỷ nào xuất hiện nhiều nhất? Trong tình huống nào?" Đây là dữ liệu vàng.</> },
            { n: '3', text: <><strong>Tìm "trigger" cá nhân.</strong> Ví dụ: "Tôi hay bị FOMO vào thứ Hai đầu tuần." "Con quỷ Phẫn Nộ hay xuất hiện sau 2 lệnh thua liên tiếp." Khi biết trigger, bạn có thể phòng thủ trước.</> },
            { n: '4', text: <><strong>Tạo "nếu-thì" rule từ Journal.</strong> Ví dụ: "Nếu tôi vừa thua 2 lệnh → Tôi sẽ không vào lệnh thứ 3 trong ngày hôm đó." (Atomic Habits: Implementation Intentions)</> },
            { n: '5', text: <><strong>Đo điểm "tuân thủ hệ thống" — không phải P&L.</strong> Tháng 1 giao dịch 20 lệnh, 17 lệnh đúng hệ thống = 85% compliance. Đây là số liệu quan trọng hơn profit trong giai đoạn học.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <Callout type="ok"><strong>Sức mạnh của Journal theo Atomic Habits:</strong> Khi bạn viết tên con quỷ xuống giấy, não bộ bắt đầu "cảnh giác" với nó trong thực tế. Sau 30 ngày viết Journal, nhiều trader báo cáo họ tự nhiên bắt đầu <em>nhận ra ngay lập tức</em> khi một con quỷ đang xuất hiện — điều mà trước đây họ không thể làm.</Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Tóm tắt Bài 8</div>
          <ul className="space-y-2">
            {['Journal = gương soi — ánh sáng nhận thức tự động cải thiện hành vi (Atomic Habits: habit tracking).', 'Ghi lại: lệnh, cảm xúc, con quỷ hiện diện, điểm tuân thủ hệ thống. Mỗi lệnh không ngoại lệ.', 'Review hàng tuần để tìm trigger cá nhân và tạo "nếu-thì" rule phòng thủ.', 'Đo "tuân thủ hệ thống" thay vì P&L trong 3 tháng đầu. Process trước, profit sau.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chương 5: Tâm lý giao dịch & 7 Con quỷ", title: "9. Quiz Tổng kết Chương 5",
    content: (
      <>
        <SectionHead icon="📝" title="Kiểm tra Tâm lý Giao dịch" desc="15 câu hỏi — nhận biết con quỷ, giải thích khoa học, và áp dụng Journal. Chương quan trọng nhất trong toàn bộ giáo trình." />
        <Callout type="warn">Mục tiêu: Đạt ít nhất 11/15 câu để chứng minh bạn đã sẵn sàng đối mặt với chính mình trên thị trường.</Callout>

        {[
          { q: 'Con quỷ FOMO khai thác gì trong tâm lý con người?', opts: ['Sợ đau đớn', 'Nỗi sợ bỏ lỡ cơ hội — được khuếch đại bởi social comparison (Sapiens: bản năng bầy đàn tiến hóa)', 'Lòng tham về tiền bạc', 'Mong muốn được tôn trọng'], ci: 1, ex: 'Bản năng tiến hóa khiến chúng ta sợ bị bỏ lại so với bầy đàn (social comparison).' },
          { q: 'Kahneman gọi gì là "Cognitive Hijacking"?', opts: ['Khi bị hack tài khoản trading', 'Khi System 1 chiếm quyền điều khiển hoàn toàn trước khi System 2 kịp phân tích', 'Khi quản lý rủi ro kém', 'Khi indicator cho tín hiệu sai'], ci: 1, ex: 'Cảm xúc mạnh (sợ hãi/tham lam) kích hoạt System 1, nó "cướp quyền" quyết định trước khi phần não lý trí (System 2) kịp hoạt động.' },
          { q: 'Tại sao Revenge Trading nguy hiểm hơn bất kỳ con quỷ nào khác về tốc độ?', opts: ['Vì nó xảy ra vào ban đêm', 'Vì amygdala hijack vô hiệu hóa prefrontal cortex — bạn thực sự không thể suy nghĩ rõ ràng khi đang tức giận, và thường tăng size rất nhanh', 'Vì nó ảnh hưởng đến EMA21', 'Vì nó xảy ra sau tin tức lớn'], ci: 1, ex: 'Tức giận là cảm xúc nguyên thủy mạnh nhất, vô hiệu hóa hoàn toàn lý trí và khiến bạn mạo hiểm quá mức (tăng size) để "phục thù".' },
          { q: 'Prospect Theory nói gì về thua lỗ và tâm lý?', opts: ['Mất $100 = vui khi thắng $100', 'Mất $100 gây đau tâm lý gấp 2-2.5 lần niềm vui khi thắng $100 — dẫn đến né tránh cắt lỗ', 'Mọi người đều sợ thua như nhau', 'Lợi nhuận quan trọng hơn thua lỗ'], ci: 1, ex: 'Nỗi đau mất tiền lớn hơn niềm vui được tiền, khiến trader không dám cắt lỗ (đối mặt nỗi đau) và gồng lỗ vô vọng.' },
          { q: 'Vòng lặp nào từ Atomic Habits giải thích tại sao Overtrading rất khó bỏ?', opts: ['Habit Stacking', 'Cue-Craving-Response-Reward: hành động trading tự nó tiết dopamine — não học "trading = sướng" và muốn lặp lại', 'Two-Minute Rule', 'Identity-based habits'], ci: 1, ex: 'Chỉ riêng việc "chuẩn bị vào lệnh" đã kích hoạt dopamine, khiến bạn muốn giao dịch liên tục kể cả khi không có setup.' },
          { q: 'Confirmation Bias trong trading nghĩa là?', opts: ['Kiểm tra nhiều lần trước khi vào lệnh', 'Chỉ chú ý đến thông tin xác nhận quyết định đã có sẵn, bỏ qua thông tin ngược chiều', 'Giao dịch theo cảm xúc', 'Overtrading trong khi có Setup'], ci: 1, ex: 'Nó khiến bạn "mù" trước các rủi ro hiển nhiên vì bạn chỉ muốn nhìn thấy những gì chứng minh bạn đang đúng.' },
          { q: 'Theo Sapiens của Harari, tại sao Herding nguy hiểm trong trading?', opts: ['Vì đám đông luôn sai', 'Vì não tiến hóa 200,000 năm để "theo bầy = an toàn" — nhưng trong thị trường, đám đông mua đồng loạt thường là đỉnh và ngược lại', 'Vì đám đông không có kỹ năng phân tích', 'Vì giao dịch nhóm không hợp pháp'], ci: 1, ex: 'Thị trường tài chính là một trò chơi zero-sum, nơi số ít lấy tiền của số đông. Theo số đông = mất tiền.' },
          { q: 'Bạn thấy mình hay thua vào thứ Hai đầu tuần. Bước tiếp theo đúng nhất là gì?', opts: ['Không giao dịch thứ Hai mãi mãi', 'Tạo rule: "Nếu là thứ Hai → chỉ xem chart, không vào lệnh trong buổi sáng" (Implementation Intention — Atomic Habits)', 'Giao dịch nhiều hơn thứ Hai để luyện tập', 'Đây chỉ là trùng hợp, không có pattern'], ci: 1, ex: 'Journal giúp tìm trigger, rule giúp chặn trigger trước khi nó thành hành động.' },
          { q: 'Khi nào Journal có giá trị nhất?', opts: ['Chỉ khi lệnh thua', 'Chỉ khi lệnh thắng', 'Mọi lệnh — đặc biệt khi vi phạm hệ thống dù thắng, vì đó là lúc not lặp sai được củng cố nguy hiểm nhất', 'Chỉ khi có cảm xúc mạnh'], ci: 2, ex: 'Thắng khi làm sai là thuốc độc. Journal ghi lại điều này để bạn không ảo tưởng về kỹ năng của mình.' },
          { q: '"Devil\'s Advocate Protocol" là nghi thức trừ con quỷ nào?', opts: ['FOMO', 'Revenge Trading', 'Confirmation Bias — chủ động tìm lý do ngược chiều để test tính khách quan của phân tích', 'Loss Aversion'], ci: 2, ex: 'Bắt System 2 hoạt động bằng cách đi tìm bằng chứng chống lại quyết định của chính mình.' },
          { q: 'Loss Aversion khiến trader làm gì sai nhất?', opts: ['Vào quá nhiều lệnh', 'Dời Stop Loss ra xa hơn khi bị chạm để tránh hiện thực hóa thua lỗ — lỗ nhỏ thành lỗ lớn', 'Không dùng Take Profit', 'FOMO vào lệnh mới'], ci: 1, ex: 'Sợ hãi đối mặt với khoản lỗ nhỏ (SL bị hit) sẽ đẩy bạn vào một khoản lỗ lớn hơn không thể cứu vãn.' },
          { q: 'Theo Atomic Habits, tại sao việc viết tên con quỷ trong Journal lại có tác dụng?', opts: ['Vì nó giúp nhớ tên các con quỷ', 'Habit Tracking: đo lường tạo ra nhận thức, nhận thức kích hoạt sự thay đổi hành vi tự động — "ánh sáng diệt ký sinh trùng"', 'Vì viết bằng tay tốt cho não', 'Không có tác dụng thực sự'], ci: 1, ex: 'Việc gọi tên hành vi xấu đưa nó từ vô thức (System 1) lên ý thức (System 2).' },
          { q: 'Điểm chung của 3 cuốn sách Sapiens, Thinking Fast and Slow, Atomic Habits khi áp dụng vào trading là gì?', opts: ['Cả 3 đều khuyến nghị dùng EMA21', 'Cả 3 đều chỉ ra rằng hành vi con người được điều khiển bởi bản năng/hệ thống tiến hóa — không phải lý trí. Trading đòi hỏi vượt qua "phần con người" đó.', 'Cả 3 đều có chương về phân tích kỹ thuật', 'Cả 3 đều của tác giả người Mỹ'], ci: 1, ex: 'Thị trường trừng phạt những phản xạ tự nhiên của con người. Trading thành công là học cách chống lại bản năng.' },
          { q: 'Overconfidence (Kiêu Ngạo) thường xuất hiện khi nào?', opts: ['Khi bị thua 3 lệnh liên tiếp', 'Sau chuỗi thắng — "Narrative Fallacy" (Sapiens): não tạo câu chuyện "tôi giỏi hơn thị trường" từ mẫu thống kê nhỏ', 'Khi thị trường đang sideway', 'Khi RSI ở vùng overbought'], ci: 1, ex: 'Chuỗi thắng ngắn hạn bơm phồng cái tôi, khiến trader nghĩ mình là thiên tài và bỏ qua kỷ luật.' },
          { q: 'Nguyên tắc nào từ Atomic Habits hiệu quả nhất để chống TỔNG HỢP 7 con quỷ?', opts: ['The Two-Minute Rule', 'Implementation Intentions: viết ra cụ thể "Nếu [con quỷ X xuất hiện] → tôi sẽ [hành động Y cụ thể]". Não xử lý tình huống trước khi nó xảy ra', 'Identity-based habits', 'Temptation Bundling'], ci: 1, ex: 'Rule "nếu-thì" lập trình trước cách phản ứng, tước đi cơ hội để cảm xúc (System 1) can thiệp.' },
        ].map((q, i) => (
          <SimpleQuiz key={i} q={`Câu ${i + 1}: ${q.q}`} opts={q.opts} correctIdx={q.ci} explanation={q.ex} />
        ))}

        <ExerciseBox title="🚀 Bước tiếp theo — Chương 6" desc="Trước khi học Chương 6, hãy làm những việc sau trong 7 ngày:" steps={[
          { d: 'Bắt đầu Trading Journal ngay hôm nay. Ghi lại ít nhất 5 lệnh demo với đầy đủ thông tin cảm xúc và nhận diện con quỷ.' },
          { d: 'Đọc lại câu chuyện của con quỷ bạn cảm thấy "quen thuộc nhất" (có thể là chính bạn). Đọc phần "Triệu chứng nhận biết" thật kỹ.' },
          { d: 'Tạo một rule cụ thể: "Nếu [trigger con quỷ], thì tôi sẽ [hành động cụ thể]." Ví dụ: "Nếu tôi vừa thua 2 lệnh, thì tôi sẽ dừng giao dịch 24 giờ."' },
          { d: 'Chia sẻ rule đó với một người bạn tin tưởng — điều này tăng xác suất tuân thủ lên 65% (theo nghiên cứu của Dominic Voge, Princeton).' },
        ]} />
      </>
    )
  },
];

export default CHAPTER_5_DATA_VN;
