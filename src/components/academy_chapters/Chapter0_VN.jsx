import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Target, Brain, Crosshair, Map, Calendar, Rocket, Clock, Zap, CheckCircle2, XCircle } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const HeroSection = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FDFBF7] via-[#FFFFFF] to-[#FDFBF7] dark:from-[#0B0E11] dark:via-[#111827] dark:to-[#0B0E11] text-[#1C2C44] dark:text-white p-10 md:p-16 text-center border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(212,175,55,0.05)] dark:shadow-[0_0_50px_rgba(212,175,55,0.1)] transition-colors duration-500">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,208,132,0.1),transparent_50%)] pointer-events-none" />
    
    <FadeUp delay={0.1} className="relative z-10 mb-6">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-[0.2em] uppercase">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
        Giáo trình trading toàn diện
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
      </div>
    </FadeUp>

    <FadeUp delay={0.2} className="relative z-10 mb-8">
      <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight tracking-tight">
        Trading <br />
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#996515] via-[#D4AF37] to-[#8B6508] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#B8860B] italic">Zero → Hero</span>
        <br />
        <span className="text-3xl md:text-5xl text-gray-700 dark:text-gray-300 mt-2 block">Từ không biết gì đến thực chiến</span>
      </h1>
    </FadeUp>

    <FadeUp delay={0.3} className="relative z-10 max-w-2xl mx-auto mb-12">
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-serif italic leading-relaxed">
        Hệ thống học tập duy nhất được xây dựng từ kinh nghiệm 20 năm thực chiến — từ tâm lý học, quản lý vốn khoa học, đến phương pháp NNN thực chiến.
      </p>
    </FadeUp>

    <FadeUp delay={0.4} className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-16">
      {[
        { n: '6', l: 'Chương học' },
        { n: '60+', l: 'Bài học' },
        { n: '20+', l: 'Tools tương tác' },
        { n: '∞', l: 'Thực hành' },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl font-serif font-bold text-[#996515] dark:text-[#F3E5AB] mb-1">{stat.n}</div>
          <div className="text-[12.5px] font-mono tracking-widest uppercase text-gray-500">{stat.l}</div>
        </div>
      ))}
    </FadeUp>
  </div>
);

const Manifesto = () => (
  <FadeUp className="my-24 text-center max-w-3xl mx-auto px-4">
    <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-6">Lời mở đầu</div>
    <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed text-gray-700 dark:text-gray-300">
      Có một sự thật mà không ai muốn nói thẳng với bạn:<br /><br />
      <strong className="text-black dark:text-white font-semibold">80% trader thua lỗ không phải vì thiếu kiến thức kỹ thuật.</strong><br /><br />
      Họ thua vì không có <em className="text-[#D4AF37] not-italic font-bold">hệ thống</em>. Vì bị <em className="text-[#D4AF37] not-italic font-bold">cảm xúc điều khiển</em>. Vì <em className="text-[#D4AF37] not-italic font-bold">không quản lý được rủi ro</em>. Vì học từ nhiều nguồn nhưng <em className="text-[#D4AF37] not-italic font-bold">không có lộ trình rõ ràng</em>.<br /><br />
      Giáo trình này được xây dựng để giải quyết đúng những vấn đề đó — từ gốc rễ, không phải từ bề mặt.
    </p>
    <div className="mt-8 font-mono text-xs text-gray-500 tracking-[0.1em] uppercase">
      — Được chắt lọc từ 20 năm kinh nghiệm thực chiến
    </div>
  </FadeUp>
);

const ProblemSection = () => (
  <div className="my-24">
    <FadeUp>
      <div className="text-center mb-16">
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Thực trạng</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          Tại sao <em className="text-[#D4AF37] italic">80%</em> trader<br />thua lỗ trong năm đầu?
        </h2>
      </div>
    </FadeUp>

    <FadeUp delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gray-200 dark:bg-[#2B3139] border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden mb-16">
      {[
        { n: '80%', t: 'trader thua lỗ trong năm đầu tiên', s: 'Nguồn: Nghiên cứu các sàn giao dịch quốc tế', c: 'text-[#F6465D]' },
        { n: '95%', t: 'lý do là tâm lý và quản lý vốn kém', s: 'Không phải thiếu kỹ thuật phân tích', c: 'text-[#FCD535]' },
        { n: '6 tháng', t: 'thời gian trung bình blowup tài khoản', s: 'Nếu không có hệ thống và kỷ luật', c: 'text-[#0ECB81]' },
      ].map((stat, i) => (
        <div key={i} className="bg-white dark:bg-[#181A20] p-8 text-center">
          <div className={`text-4xl md:text-5xl font-serif font-bold mb-3 ${stat.c}`}>{stat.n}</div>
          <div className="text-[16.5px] text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{stat.t}</div>
          <div className="text-[13.5px] font-mono text-gray-500 mt-2 tracking-wide">{stat.s}</div>
        </div>
      ))}
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <FadeUp delay={0.3} className="bg-red-50 dark:bg-[#F6465D]/5 p-8 rounded-3xl border border-red-100 dark:border-[#F6465D]/20">
        <h3 className="text-xl font-serif font-bold text-red-700 dark:text-[#F6465D] mb-6 flex items-center gap-3">
          <XCircle /> Cách học sai phổ biến
        </h3>
        <ul className="space-y-4">
          {[
            '"Học" từ YouTube, TikTok rời rạc — không có hệ thống',
            'Mua "tín hiệu" từ group mà không tự phân tích được',
            'Bỏ qua quản lý vốn vì "boring" — chỉ muốn kỹ thuật',
            'Nhảy từ hệ thống này sang hệ thống khác liên tục',
            'Không có Trading Journal — không biết mình sai ở đâu',
            'Demo một vài ngày rồi vội vào live với tiền lớn',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-[17px] text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="text-red-500 shrink-0 mt-0.5">⚡</span> {item}
            </li>
          ))}
        </ul>
      </FadeUp>

      <FadeUp delay={0.4} className="bg-green-50 dark:bg-[#0ECB81]/5 p-8 rounded-3xl border border-green-100 dark:border-[#0ECB81]/20">
        <h3 className="text-xl font-serif font-bold text-green-700 dark:text-[#0ECB81] mb-6 flex items-center gap-3">
          <CheckCircle2 /> Cách giáo trình này giải quyết
        </h3>
        <ul className="space-y-4">
          {[
            'Lộ trình rõ ràng từ chương 0 đến thực chiến — không bỏ bước nào',
            'Dạy bạn tự phân tích — 4 phương pháp NNN cụ thể, ví dụ thực tế',
            'Quản lý vốn được dạy như môn khoa học — với tools tính toán',
            'Một hệ thống nhất quán được kiểm chứng — không "hệ thống nào cũng tốt"',
            'Trading Journal tích hợp ngay trong giáo trình',
            'Checklist 20 điều kiện cụ thể trước khi được phép vào live',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-[17px] text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="text-green-500 shrink-0 mt-0.5">◆</span> {item}
            </li>
          ))}
        </ul>
      </FadeUp>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="my-24">
    <FadeUp>
      <div className="text-center mb-16">
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Bạn sẽ nhận được</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          Toàn bộ những gì<br />một trader cần <em className="text-[#D4AF37] italic">thực sự</em>
        </h2>
      </div>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { icon: <Map className="w-8 h-8"/>, t: 'Lộ trình học rõ ràng', d: '6 chương được sắp xếp theo logic từ nền tảng đến thực chiến. Không bao giờ cảm thấy "học xong không biết làm gì tiếp".' },
        { icon: <Target className="w-8 h-8"/>, t: 'Hệ thống giao dịch hoàn chỉnh', d: '4 phương pháp NNN cụ thể + 9 mẫu nến nâng cao. Entry, SL, TP chính xác theo từng phương pháp — không mơ hồ.' },
        { icon: <Brain className="w-8 h-8"/>, t: 'Hiểu bản thân khi trading', d: '7 con quỷ tâm lý trading được giải thích bằng khoa học (Kahneman, Sapiens, Atomic Habits) — và cách đối phó cụ thể.' },
        { icon: <Shield className="w-8 h-8"/>, t: 'Quản lý vốn như chuyên nghiệp', d: 'Position sizing, Kelly Criterion, Pyramiding, Drawdown management. Bao gồm tools tính toán tương tác và tình huống thực tế.' },
        { icon: <BookOpen className="w-8 h-8"/>, t: 'Trading Journal tích hợp', d: 'Template journal đầy đủ với phân tích tâm lý, nhận diện "con quỷ", và pattern recognition. Được xây dựng để dùng ngay.' },
        { icon: <Rocket className="w-8 h-8"/>, t: 'Chứng chỉ & Trading Plan', d: 'Kết thúc khóa học với Trading Plan riêng đã được xây dựng, quiz tổng hợp 20 câu, và chứng chỉ tốt nghiệp cá nhân hóa.' },
      ].map((f, i) => (
        <FadeUp key={i} delay={0.1 * i} className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-8 rounded-3xl active:border- md:hover:border-[#D4AF37] transition-all group relative overflow-hidden shadow-sm dark:shadow-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[#D4AF37] mb-6 transform group-active:scale- md:hover:scale-110 transition-transform origin-left">{f.icon}</div>
          <h3 className="text-lg font-serif font-bold text-black dark:text-white mb-3">{f.t}</h3>
          <p className="text-[16.5px] text-gray-600 dark:text-gray-400 leading-relaxed">{f.d}</p>
        </FadeUp>
      ))}
    </div>
  </div>
);

const CourseMap = () => (
  <div className="my-24">
    <FadeUp>
      <div className="text-center mb-16">
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Nội dung giáo trình</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          6 chương — từ <em className="text-[#D4AF37] italic">zero</em><br />đến sẵn sàng thực chiến
        </h2>
      </div>
    </FadeUp>

    <div className="flex flex-col border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden bg-white dark:bg-[#181A20] shadow-sm dark:shadow-none">
      {[
        { n: '1', b: 'Chương 1 · Nền tảng', t: 'Nền tảng & Thuật ngữ', d: 'Hiểu thị trường tài chính từ gốc rễ. Học cách đọc nến Nhật — ngôn ngữ của mọi biểu đồ. Làm quen với tất cả thuật ngữ bắt buộc.', tags: ['Thị trường','Nến Nhật','Thuật ngữ','Timeframe','Leverage'] },
        { n: '2', b: 'Chương 2 · Kỹ thuật', t: 'Phân tích Kỹ thuật', d: 'Đọc được ngôn ngữ giá cả. Hỗ trợ/kháng cự, xu hướng, EMA, WMA, RSI chuyên sâu với RSI Lab, DCA Calculator.', tags: ['S/R','EMA/WMA','RSI','MACD','Volume','DCA'] },
        { n: '3', b: 'Chương 3 · Phương pháp NNN', t: '4 Phương pháp NNN & Đọc Nến', d: 'Hệ thống giao dịch cụ thể của tác giả. 4 phương pháp từ A đến Z kết hợp 9 mẫu nến nâng cao để tạo setup hội tụ.', tags: ['Nến thân ngắn','Nến ôm','EMA21','Fibonacci','Engulfing'] },
        { n: '4', b: 'Chương 4 · Quản lý vốn', t: 'Quản lý Vốn & Rủi ro', d: 'Yếu tố sống còn mà 80% trader bỏ qua. Từ quy tắc 1-2% đến Kelly Criterion, Pyramiding, Drawdown Management.', tags: ['Position Sizing','1-2% Rule','Kelly Criterion','Anti-Martingale'] },
        { n: '5', b: 'Chương 5 · Tâm lý', t: 'Tâm lý Giao dịch & 7 Con Quỷ', d: 'Lý do thật sự của 80% thất bại. 7 con quỷ trading được kể như thần thoại, giải thích bằng khoa học.', tags: ['FOMO','Revenge','System 1 vs 2','Journal'] },
        { n: '6', b: 'Chương 6 · Thực chiến', t: 'Xây dựng Hệ thống & Thực chiến', d: 'Kết thúc hành trình với Trading Plan cá nhân hoàn chỉnh. Backtesting, lộ trình 90 ngày demo, checklist 20 điều kiện live.', tags: ['Trading Plan','Backtesting','90 ngày Demo','Checklist Live'] },
      ].map((c, i) => (
        <FadeUp key={i} delay={0.05 * i} className="flex border-b border-gray-100 dark:border-[#2B3139] last:border-0 active:bg- md:hover:bg-gray-50 dark:active:bg- md:hover:bg-[#20252E] transition-colors group">
          <div className="hidden md:flex items-center justify-center p-8 border-r border-gray-100 dark:border-[#2B3139] text-3xl font-serif font-bold text-[#D4AF37] opacity-30 group-hover:opacity-100 transition-opacity w-24 shrink-0">
            {c.n}
          </div>
          <div className="p-6 md:p-8 flex-1">
            <div className="text-[12.5px] font-mono tracking-widest uppercase text-gray-500 mb-2">{c.b}</div>
            <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2 group-active:text- md:hover:text-[#D4AF37] transition-colors">{c.t}</h3>
            <p className="text-[16.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{c.d}</p>
            <div className="flex flex-wrap gap-2">
              {c.tags.map(tag => (
                <span key={tag} className="text-[12.5px] font-mono px-2.5 py-1 rounded bg-gray-100 dark:bg-[#0B0E11] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2B3139]">{tag}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </div>
);

const Timeline = () => (
  <div className="my-24">
    <FadeUp>
      <div className="text-center mb-16">
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Lộ trình thời gian</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          Từ hôm nay đến<br />ngày <em className="text-[#D4AF37] italic">giao dịch live</em> đầu tiên
        </h2>
      </div>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { n: '01', p: 'Tháng 1 — Nền tảng', t: 'Học & Quan sát', i: ['Hoàn thành Ch.1–3', 'Cài TradingView, thiết lập', 'Backtest 30 setup', 'Chưa vào bất kỳ lệnh nào'] },
        { n: '02', p: 'Tháng 2 — Hệ thống', t: 'Xây dựng & Demo', i: ['Hoàn thành Ch.4–5', 'Viết Trading Plan cá nhân', 'Demo 20 lệnh đầu tiên', 'Ghi Journal đầy đủ'] },
        { n: '03', p: 'Tháng 3 — Kiểm chứng', t: 'Demo & Review', i: ['Hoàn thành Ch.6', 'Demo thêm 20 lệnh', 'Review Journal hàng tuần', 'Checklist 20 điều kiện'] },
        { n: '04', p: 'Tháng 4+ — Thực chiến', t: 'Live Trading', i: ['Đạt ≥15/20 điều kiện live', 'Bắt đầu với vốn nhỏ nhất', 'Tiếp tục Journal & review', 'Cải thiện liên tục'], hl: true },
      ].map((tl, i) => (
        <FadeUp key={i} delay={0.1 * i} className={`p-6 rounded-3xl border ${tl.hl ? 'bg-[#D4AF37]/5 border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'bg-white dark:bg-[#181A20] border-gray-200 dark:border-[#2B3139]'} relative overflow-hidden`}>
          <div className={`text-5xl font-serif font-bold mb-4 ${tl.hl ? 'text-[#D4AF37] opacity-40' : 'text-[#D4AF37] opacity-20'}`}>{tl.n}</div>
          <div className={`text-[12.5px] font-mono tracking-widest uppercase mb-2 ${tl.hl ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}`}>{tl.p}</div>
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">{tl.t}</h3>
          <ul className="space-y-2">
            {tl.i.map((item, idx) => (
              <li key={idx} className="text-[15.5px] text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <span className="text-[#D4AF37] mt-0.5">·</span> {item}
              </li>
            ))}
          </ul>
        </FadeUp>
      ))}
    </div>
  </div>
);

const NameRegistration = () => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('SAIB_trader_name');
    if (stored) {
      setName(stored);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (name.trim()) {
      localStorage.setItem('SAIB_trader_name', name.trim());
      setSaved(true);
    }
  };

  return (
    <FadeUp className="my-16 text-center max-w-xl mx-auto px-4 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-8 rounded-3xl shadow-sm dark:shadow-none">
      <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Nhập tên của bạn</div>
      <h3 className="text-2xl font-serif font-bold text-black dark:text-white mb-4">Ghi danh để bắt đầu hành trình</h3>
      <p className="text-[16.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        Tên của bạn sẽ được lưu lại trong hệ thống và sử dụng cho Lời Tuyên Thệ và Chứng Chỉ Tốt Nghiệp ở cuối khóa học (Chương 6).
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <input 
          type="text" 
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (saved) setSaved(false);
          }}
          placeholder="Tên của bạn (VD: John Doe)" 
          className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-300 dark:border-[#2B3139] rounded-xl px-5 py-3 text-[17.5px] text-black dark:text-white outline-none focus:border-[#D4AF37] w-full sm:w-64 transition-colors"
        />
        <button 
          onClick={handleSave}
          className={`px-6 py-3 rounded-xl font-bold text-[16.5px] transition-all flex items-center justify-center gap-2 ${saved ? 'bg-green-500 text-white' : 'bg-[#D4AF37] active:bg- md:hover:bg-[#F3E5AB] text-black active:shadow- md:hover:shadow-[0_4px_15px_rgba(212,175,55,0.3)]'}`}
        >
          {saved ? <><CheckCircle2 size={18} /> Đã lưu</> : 'Xác nhận'}
        </button>
      </div>
    </FadeUp>
  );
};

const Chapter0Content = () => {
  return (
    <div className="pb-16 max-w-5xl mx-auto">
      <HeroSection />
      <NameRegistration />
      <Manifesto />
      <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-16" />
      <ProblemSection />
      <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-16" />
      <FeaturesSection />
      <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-16" />
      <CourseMap />
      <div className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-16" />
      <Timeline />
      
      <FadeUp className="mt-32 text-center bg-gradient-to-br from-[#FDFBF7] to-[#F3E5AB]/10 dark:from-[#0a0c18] dark:to-[#111827] rounded-3xl p-12 md:p-20 border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(212,175,55,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
        <h2 className="relative z-10 text-3xl md:text-5xl font-serif font-bold text-[#1C2C44] dark:text-white mb-6">
          Hành trình <em className="text-[#D4AF37] italic">bắt đầu từ đây</em>
        </h2>
        <p className="relative z-10 text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Mỗi trader chuyên nghiệp đều từng là người mới. Điều khác biệt là họ học đúng cách ngay từ đầu.
        </p>
        <div className="relative z-10 font-mono text-[13.5px] text-gray-500 tracking-[0.1em] uppercase">
          Hãy nhấp vào "Bài tiếp theo" để bắt đầu Chương 1.
        </div>
      </FadeUp>
    </div>
  );
};

const CHAPTER_0_DATA_VN = [
  {
    title: 'Chương 0: Lộ trình & Trang bị',
    content: <Chapter0Content />
  }
];

export default CHAPTER_0_DATA_VN;
