import React, { useState } from 'react';

// ==========================================
// 1. CÁC COMPONENT GIAO DIỆN PHỤ TRỢ (UI HELPERS)
// ==========================================
const SectionHeader = ({ badge, title, desc }) => (
  <div className="mb-8 border-b border-[#2B3139] pb-6">
    <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#378ADD]/20 text-[#378ADD] px-3 py-1 rounded-full mb-3">{badge}</span>
    <h2 className="text-3xl font-black text-white mb-3 tracking-tighter">{title}</h2>
    <p className="text-[#848E9C] text-[14px] leading-relaxed">{desc}</p>
  </div>
);

const Module = ({ num, title, tag, children }) => (
  <div className="mb-6 bg-[#181A20]/40 border border-[#2B3139] rounded-2xl overflow-hidden backdrop-blur-sm shadow-lg">
    <div className="bg-[#0B0E11] px-5 py-4 border-b border-[#2B3139] flex items-center space-x-3">
      <span className="bg-[#0ECB81]/20 text-[#0ECB81] text-xs font-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(14,203,129,0.2)]">{num}</span>
      <h3 className="flex-1 font-bold text-white uppercase tracking-wider text-[13px]">{title}</h3>
      <span className="text-[10px] px-3 py-1 rounded-full border border-[#2B3139] text-[#848E9C] bg-[#181A20]">{tag}</span>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

const Lesson = ({ title, children }) => (
  <div className="border-t border-[#2B3139] pt-6 first:border-t-0 first:pt-0">
    <h4 className="font-bold text-[#EAECEF] mb-4 text-[15px]">{title}</h4>
    <div className="text-[13.5px] text-[#848E9C] leading-relaxed space-y-3">{children}</div>
  </div>
);

const Callout = ({ type, children }) => {
  const styles = {
    tip: "bg-[#378ADD]/10 border-[#378ADD] text-[#B5D4F4]",
    warn: "bg-[#FCD535]/10 border-[#FCD535] text-[#FCD535]",
    ok: "bg-[#0ECB81]/10 border-[#0ECB81] text-[#0ECB81]",
    bad: "bg-[#F6465D]/10 border-[#F6465D] text-[#F6465D]"
  };
  const icons = { tip: "💡", warn: "⚠️", ok: "✅", bad: "🚫" };
  return (
    <div className={`border-l-4 p-4 rounded-r-lg my-4 text-[13px] flex gap-3 ${styles[type]} shadow-sm`}>
      <span className="text-lg">{icons[type]}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
};

const AcadTable = ({ headers, rows }) => (
  <div className="overflow-x-auto border border-[#2B3139] rounded-xl my-4 shadow-inner">
    <table className="w-full text-left border-collapse min-w-[500px]">
      <thead>
        <tr className="bg-[#0B0E11] text-[#848E9C] text-[11px] uppercase tracking-wider">
          {headers.map((h, i) => <th key={i} className="p-4 border-b border-[#2B3139] font-bold">{h}</th>)}
        </tr>
      </thead>
      <tbody className="text-[13px] text-[#EAECEF]">
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-[#2B3139]/50 hover:bg-[#2B3139]/20 last:border-0 transition-colors">
            <td className="p-4 font-bold text-white">{r[0]}</td>
            <td className="p-4 text-[#848E9C]">{r[1]}</td>
            {r[2] && <td className="p-4 text-[#848E9C]">{r[2]}</td>}
            {r[3] && <td className="p-4 text-[#848E9C]">{r[3]}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StepList = ({ steps }) => (
  <div className="space-y-3 my-4">
    {steps.map((step, i) => (
      <div key={i} className="flex gap-3 items-start bg-[#0B0E11] p-3 border border-[#2B3139] rounded-lg">
        <div className="w-6 h-6 rounded-full bg-[#378ADD]/20 text-[#378ADD] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{step.n || i+1}</div>
        <div className="text-[13px] text-[#848E9C] leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: step.d }} />
      </div>
    ))}
  </div>
);

const CheckItem = ({ text }) => (
  <label className="flex items-start space-x-3 p-3 bg-[#0B0E11] border border-[#2B3139] rounded-lg cursor-pointer hover:bg-[#2B3139]/50 transition-colors mb-2">
    <input type="checkbox" className="mt-0.5 form-checkbox text-[#0ECB81] bg-[#181A20] border-[#2B3139] rounded w-4 h-4 focus:ring-0" />
    <span className="text-[#EAECEF] text-[13px] leading-relaxed">{text}</span>
  </label>
);

// --- COMPONENT: TÌNH HUỐNG THỰC CHIẾN (Đã fix lỗi hiển thị đúng/sai) ---
const MiniDrill = ({ question, options }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mt-8 p-6 bg-[#181A20] border border-[#2B3139] rounded-2xl shadow-xl">
      <div className="flex items-center space-x-2 mb-4 border-b border-[#2B3139] pb-3">
        <span className="text-[#FCD535] text-xl animate-bounce">🎯</span>
        <h4 className="text-white font-black text-sm uppercase tracking-widest">Test Phản Xạ Nhanh</h4>
      </div>
      <p className="font-bold text-[14px] mb-5 text-[#EAECEF] leading-relaxed">{question}</p>
      
      <div className="flex flex-col space-y-3">
        {options.map((opt, i) => {
          const isChosen = selected === i;
          let btnClass = "bg-[#0B0E11] border-[#2B3139] text-[#848E9C] hover:border-[#848E9C] hover:text-white";
          if (selected !== null) {
            if (opt.isCorrect) btnClass = "bg-[#0ECB81]/10 border-[#0ECB81] text-[#0ECB81] font-bold";
            else if (isChosen) btnClass = "bg-[#F6465D]/10 border-[#F6465D] text-[#F6465D] font-bold line-through";
            else btnClass = "bg-[#0B0E11] border-[#2B3139] text-[#2B3139] opacity-40 cursor-not-allowed";
          }
          return (
            <button key={i} disabled={selected !== null} onClick={() => setSelected(i)} className={`text-[13px] px-5 py-4 rounded-xl text-left border transition-all duration-300 ${btnClass}`}>
              {opt.text}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`mt-5 p-5 rounded-xl text-[13px] leading-relaxed border ${options[selected].isCorrect ? 'bg-[#0ECB81]/10 border-[#0ECB81]/30' : 'bg-[#F6465D]/10 border-[#F6465D]/30'} animate-in slide-in-from-top-2`}>
          <span className="font-black uppercase tracking-wider block mb-2 text-sm">
            {options[selected].isCorrect ? '✅ SAIBot: BẠN ĐÃ CHỌN ĐÚNG!' : '❌ SAIBot: BẠN ĐÃ CHỌN SAI!'}
          </span>
          <span className="text-[#EAECEF]">{options[selected].explanation}</span>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. DATABASE GIÁO TRÌNH (FULL 100% HTML GỐC)
// ==========================================
const ACADEMY_DATA = [
  { 
    id: 0, title: "0. Tổng quan & Lộ trình", 
    content: (
      <>
        <SectionHeader badge="Giáo trình toàn diện" title="Trading từ Zero → Hero" desc='Lộ trình học bài bản từ tư duy nền tảng đến chiến lược thực chiến. Dành cho người đã "chơi" crypto và vàng nhưng chưa có hệ thống. Bao gồm 4 phương pháp giao dịch của thầy Nguyễn Ngọc Nghĩa.' />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#181A20] border border-[#2B3139] p-5 rounded-xl shadow-lg"><div className="text-[11px] text-[#848E9C] uppercase tracking-wider mb-1">Tổng chương</div><div className="text-2xl font-black text-white">6 <span className="text-sm font-normal text-[#848E9C]">+ Phụ lục</span></div></div>
          <div className="bg-[#181A20] border border-[#2B3139] p-5 rounded-xl shadow-lg"><div className="text-[11px] text-[#848E9C] uppercase tracking-wider mb-1">Thời gian học</div><div className="text-2xl font-black text-white">3 tháng <span className="text-sm font-normal text-[#848E9C]">Trước live</span></div></div>
          <div className="bg-[#181A20] border border-[#2B3139] p-5 rounded-xl shadow-lg"><div className="text-[11px] text-[#848E9C] uppercase tracking-wider mb-1">Trader thất bại năm đầu</div><div className="text-2xl font-black text-[#F6465D]">~80% <span className="text-sm font-normal text-[#848E9C]">Thiếu hệ thống</span></div></div>
        </div>
        <h3 className="font-bold text-white mb-4 text-[16px]">Lộ trình học từng bước</h3>
        <StepList steps={[
          { n: 1, d: "<strong>Nền tảng (Tuần 1–2):</strong> Thị trường là gì, các loại sản phẩm, thuật ngữ cơ bản, nến Nhật, cách đọc biểu đồ. Chưa vào lệnh thật." },
          { n: 2, d: "<strong>Kỹ thuật cơ bản (Tuần 3–5):</strong> Hỗ trợ/kháng cự, xu hướng, cấu trúc thị trường, volume, indicator bổ trợ (EMA, RSI, MACD). Backtest tay." },
          { n: 3, d: "<strong>Phương pháp NNN (Tuần 6–9):</strong> 4 kỹ thuật vào lệnh của thầy Nguyễn Ngọc Nghĩa: Nến thân ngắn, Nến ôm, EMA21, Fibonacci. Kết hợp tạo setup hội tụ." },
          { n: 4, d: "<strong>Quản lý vốn (Tuần 8–10):</strong> Risk/Reward, position sizing, cắt lỗ tự động, drawdown limit. Yếu tố quyết định sống còn." },
          { n: 5, d: "<strong>Tâm lý & Kỷ luật (Xuyên suốt):</strong> FOMO, revenge trading, loss aversion, trading journal. Kẻ thù lớn nhất là chính mình." },
          { n: 6, d: "<strong>Thực chiến 90 ngày:</strong> Backtest, forward test trên demo, xây trading plan cá nhân, đánh giá kết quả trước khi bỏ tiền thật." }
        ]} />
        <Callout type="warn"><strong>Quan trọng:</strong> Trading không phải "in tiền" hay "may rủi" — đây là nghề đòi hỏi học tập và kỷ luật như bất kỳ nghề nào khác. 80% trader thua lỗ không phải vì phân tích sai mà vì thiếu hệ thống.</Callout>
      </>
    )
  },
  { 
    id: 1, title: "1. Nền tảng & Thuật ngữ", 
    content: (
      <>
        <SectionHeader badge="Chương 1" title="Nền tảng & Thuật ngữ" desc="Hiểu đúng về thị trường, các loại sản phẩm tài chính, và ngôn ngữ giao dịch trước khi học bất kỳ kỹ thuật nào." />
        <Module num="1" title="Thị trường tài chính là gì?" tag="Lý thuyết">
          <Lesson title="Các loại thị trường">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[11px] px-3 py-1 rounded-full border border-[#378ADD] text-[#378ADD] bg-[#378ADD]/10">Cổ phiếu</span>
              <span className="text-[11px] px-3 py-1 rounded-full border border-[#378ADD] text-[#378ADD] bg-[#378ADD]/10">Forex</span>
              <span className="text-[11px] px-3 py-1 rounded-full border border-[#FCD535] text-[#FCD535] bg-[#FCD535]/10">Cryptocurrency</span>
              <span className="text-[11px] px-3 py-1 rounded-full border border-[#0ECB81] text-[#0ECB81] bg-[#0ECB81]/10">Hàng hóa (Vàng, Dầu)</span>
            </div>
            <p><strong>Forex</strong> là thị trường lớn nhất thế giới (~6.6 nghìn tỷ USD/ngày). <strong>Crypto</strong> mở 24/7, biến động mạnh hơn nhiều. <strong>Cổ phiếu</strong> có giờ giao dịch cố định.</p>
            <Callout type="tip">Với nền tảng từ crypto và vàng của bạn, <strong>XAU/USD (Gold Spot)</strong> và các cặp forex chính là bước chuyển tiếp tự nhiên nhất.</Callout>
          </Lesson>
          <Lesson title="Ai tham gia thị trường?">
            <p><strong>Ngân hàng Trung ương:</strong> Tác động qua lãi suất. <strong>Tổ chức tài chính (Smart Money):</strong> Chiếm {}70% volume. <strong>Retail trader:</strong> Nhóm nhỏ nhất.</p>
            <Callout type="warn">"Smart Money" thường <em>đẩy giá ngược chiều số đông</em> để gom hàng trước khi di chuyển thực sự. Đây là lý do nhiều setup "breakout đơn giản" thất bại.</Callout>
          </Lesson>
        </Module>

        <Module num="2" title="Thuật ngữ bắt buộc phải biết" tag="Từ vựng">
          <Lesson title="Các khái niệm sinh tồn">
            <AcadTable headers={["Thuật ngữ", "Giải thích", "Ví dụ"]} rows={[
              ["Bid / Ask", "Giá bán / giá mua thị trường đang offer.", "Bid 1.0850 / Ask 1.0852"],
              ["Spread", "Chênh lệch Bid–Ask. Đây là chi phí giao dịch chính.", "2 pip"],
              ["Pip", "Đơn vị thay đổi giá nhỏ nhất.", "EUR/USD: 1 pip = 0.0001"],
              ["Lot", "Đơn vị khối lượng: Standard=100k; Mini=10k; Micro=1k", "0.1 lot = Mini lot"],
              ["Leverage", "Đòn bẩy — nhân cả lời lẫn lỗ lên nhiều lần.", "1:100 = kiểm soát 100x vốn"],
              ["Margin", "Ký quỹ tối thiểu để broker cho phép giữ lệnh.", "Margin 1% = $10"],
              ["Stop Loss (SL)", "Mức cắt lỗ tự động — bắt buộc.", "Mua 1.08, Cắt 1.05"],
              ["Take Profit (TP)", "Mức chốt lời tự động.", "TP 1.09"],
              ["Drawdown", "Mức sụt giảm từ đỉnh tài khoản xuống đáy hiện tại.", "DD 15%"],
              ["R:R", "Risk:Reward — tỷ lệ lỗ/lời tiềm năng.", "SL 30p, TP 90p = 1:3"]
            ]} />
            <Callout type="bad"><strong>Đòn bẩy là mối nguy hiểm số 1.</strong> Khuyến nghị tuyệt đối: người mới chỉ dùng tối đa 1:10, lý tưởng nhất là 1:3 đến 1:5.</Callout>
          </Lesson>
        </Module>

        <Module num="3" title="Nến Nhật & Khung thời gian" tag="Kỹ năng đọc Chart">
          <Lesson title="Giải phẫu nến Nhật">
            <p>Biểu diễn 4 mức giá: <strong>Open, High, Low, Close</strong>. Thân dài = áp lực mạnh. Doji = lưỡng lự. Râu dài = từ chối giá (rejection).</p>
            <div className="bg-[#0B0E11] rounded-lg p-5 flex items-end gap-6 justify-center min-h-[140px] my-4 border border-[#2B3139]">
              <div className="flex flex-col items-center gap-1"><div className="w-[2px] bg-[#6e7681] h-[22px]"></div><div className="w-4 bg-[#3fb950] h-[44px] rounded-sm"></div><div className="w-[2px] bg-[#6e7681] h-[10px]"></div><div className="text-[10px] text-[#8b949e] mt-2">Tăng mạnh</div></div>
              <div className="flex flex-col items-center gap-1"><div className="w-[2px] bg-[#6e7681] h-[10px]"></div><div className="w-4 bg-[#f85149] h-[42px] rounded-sm"></div><div className="w-[2px] bg-[#6e7681] h-[20px]"></div><div className="text-[10px] text-[#8b949e] mt-2">Giảm mạnh</div></div>
              <div className="flex flex-col items-center gap-1"><div className="w-[2px] bg-[#6e7681] h-[24px]"></div><div className="w-4 bg-[#3fb950] h-[6px] rounded-sm"></div><div className="w-[2px] bg-[#6e7681] h-[24px]"></div><div className="text-[10px] text-[#8b949e] mt-2">Doji</div></div>
              <div className="flex flex-col items-center gap-1"><div className="w-[2px] bg-[#6e7681] h-[4px]"></div><div className="w-4 bg-[#3fb950] h-[28px] rounded-sm"></div><div className="w-[2px] bg-[#6e7681] h-[26px]"></div><div className="text-[10px] text-[#8b949e] mt-2">Nến búa</div></div>
            </div>
            <AcadTable headers={["Mẫu nến", "Ý nghĩa", "Độ tin cậy"]} rows={[
              ["Doji", "Thị trường lưỡng lự, cần xác nhận.", "Trung bình"],
              ["Hammer / Shooting Star", "Râu nến dài >= 2x thân. Thể hiện từ chối giá.", "Khá cao"],
              ["Engulfing (Nến Ôm)", "Nến sau nuốt trọn nến trước.", "Cao (Xem NNN)"],
              ["Pin Bar", "Bóng rất dài, thân cực nhỏ.", "Rất cao"]
            ]} />
          </Lesson>
          <Lesson title="Chọn khung thời gian (Timeframe)">
            <AcadTable headers={["Timeframe", "Mục đích", "Phong cách"]} rows={[
              ["Monthly / Weekly", "Xu hướng dài hạn, vùng S/R cực mạnh.", "Position / Swing dài"],
              ["Daily (D1)", "Xu hướng chính, vùng S/R quan trọng nhất.", "Swing trade"],
              ["H4", "Xác nhận xu hướng, tìm setup.", "Swing trade ngắn"],
              ["H1 / M15", "Tìm điểm Entry chính xác, quản lý lệnh.", "Intraday / Scalping"]
            ]} />
            <Callout type="tip"><strong>Top-Down Analysis:</strong> Luôn bắt đầu từ D1 (xác định xu hướng) → H4 (xác nhận) → H1/M15 (vào lệnh). Không bao giờ vào lệnh mà không biết D1 đang ở đâu.</Callout>
          </Lesson>
        </Module>

        <MiniDrill 
          question="Tài khoản sếp có 1,000$. Sếp dùng đòn bẩy 1:100. Chuyện gì xảy ra nếu giá đi NGƯỢC HƯỚNG dự đoán đúng 1%?"
          options={[
            { text: "A. Lỗ 10$. Gồng tiếp được.", isCorrect: false, explanation: "Đòn bẩy 1:100 biến 1.000$ của sếp thành sức mạnh 100.000$. Sếp bị trừ tiền dựa trên con số 100k kia." },
            { text: "B. Bị Call Margin và bốc hơi sạch 1,000$.", isCorrect: true, explanation: "Chính xác. 1% của 100.000$ là 1.000$. Trượt 1% là sàn sẽ thanh lý toàn bộ tài khoản để thu hồi nợ." }
          ]}
        />
      </>
    ) 
  },
  { 
    id: 2, title: "2. Phân Tích Kỹ Thuật", 
    content: (
      <>
        <SectionHeader badge="Chương 2" title="Phân tích kỹ thuật" desc="Công cụ và kỹ năng đọc thị trường: hỗ trợ/kháng cự, xu hướng, cấu trúc, và indicator bổ trợ." />
        <Module num="4" title="Hỗ trợ & Kháng cự (S/R)" tag="Nền tảng">
          <Lesson title="Định nghĩa và Cách giao dịch">
            <p>Hỗ trợ là Sàn, Kháng cự là Trần. Càng test nhiều lần càng mạnh.</p>
            <Callout type="tip"><strong>Nguyên tắc Đổi vai (Role Reversal):</strong> Kháng cự bị phá vỡ → trở thành hỗ trợ mới. Hỗ trợ bị phá vỡ → trở thành kháng cự mới.</Callout>
            <StepList steps={[
              { d: "Xác định vùng S/R trên D1 trước." },
              { d: "Chờ giá tiếp cận vùng đó. Không đánh lơ lửng." },
              { d: "Chờ tín hiệu xác nhận từ nến (Doji, Engulfing)." },
              { d: "Đang uptrend → BUY tại hỗ trợ. Đang downtrend → SELL tại kháng cự." }
            ]} />
          </Lesson>
        </Module>
        <Module num="5" title="Xu hướng & Cấu trúc" tag="Core Skill">
          <Lesson title="3 loại xu hướng">
            <p><strong>Uptrend:</strong> Đỉnh/Đáy cao dần (HH, HL). <strong>Downtrend:</strong> Đỉnh/Đáy thấp dần (LH, LL). <strong>Sideway:</strong> Đi ngang trong hộp.</p>
            <Callout type="bad">"Đừng bắt đáy, đừng đón đỉnh." Cố dự đoán điểm đảo chiều khi chưa có xác nhận là lỗi kinh điển.</Callout>
          </Lesson>
          <Lesson title="BOS và CHoCH">
            <p><strong>BOS (Break of Structure):</strong> Giá phá vỡ đỉnh/đáy trước = xu hướng tiếp diễn.</p>
            <p><strong>CHoCH (Change of Character):</strong> Lần đầu tiên xu hướng bị phá vỡ. Cảnh báo sớm về đảo chiều.</p>
            <Callout type="tip">Khi CHoCH xảy ra: Đóng lệnh hoặc dời SL chặt lại ngay lập tức.</Callout>
          </Lesson>
        </Module>
        <Module num="6" title="Volume & Indicator" tag="Bổ trợ">
          <Lesson title="Tại sao Volume quan trọng?">
            <p>Giá breakout kèm volume đột biến = xác nhận mạnh. Breakout volume thấp = Bẫy Fake-out.</p>
          </Lesson>
          <Lesson title="Indicator và Phân tích cơ bản">
            <p className="mb-2">Chỉ dùng tối đa 2-3 Indicator: EMA (21, 50, 200), RSI, ATR.</p>
            <AcadTable headers={["Sự kiện Tin tức", "Tác động", "Hành động"]} rows={[
              ["FOMC Meeting (Fed)", "Cực mạnh với USD", "Đóng hoặc dời SL chặt trước 2h"],
              ["Non-Farm Payroll (NFP)", "Rất mạnh (Vàng, USD)", "Không mở lệnh mới trước 30p"],
              ["CPI (Lạm phát)", "Mạnh", "Thận trọng cao"]
            ]} />
          </Lesson>
        </Module>
        <MiniDrill 
          question="Giá đâm thủng Kháng cự (Trần nhà) bằng một cây nến xanh thân dài. Hành động của sếp là gì?"
          options={[
            { text: "A. Mua đuổi (Fomo) ngay lập tức vì Breakout rồi.", isCorrect: false, explanation: "Rất dễ dính bẫy Bull-trap (Phá vỡ giả). Sếp mua đuổi là làm mồi cho cá mập chốt lời." },
            { text: "B. Đợi giá quay lại chạm mức Kháng cự đó (nay đã đổi vai thành Hỗ trợ) rồi Mua.", isCorrect: true, explanation: "Kỹ năng 'Role Reversal' chuẩn sách giáo khoa. Entry sau cú Test lại luôn an toàn và có R:R tốt nhất." }
          ]}
        />
      </>
    ) 
  },
  { 
    id: 3, title: "3. Phương pháp NNN", 
    content: (
      <>
        <SectionHeader badge="Chương 3" title="4 Kỹ thuật thầy Nguyễn Ngọc Nghĩa" desc="Hệ thống tập trung vào Price Action. Không cần nhiều indicator. Hiệu quả cao nhất khi kết hợp (Hội tụ) các phương pháp." />
        <Module num="1" title="Giao dịch bằng nến Thân ngắn" tag="NNN Method 1">
          <Lesson title="Ý nghĩa & Quy trình">
            <p>Nến thân ngắn (Doji/Spinning Top) thể hiện phe mua và bán đang cân bằng. Khi xuất hiện sau trend dài TẠI VÙNG CẢN, nó cảnh báo đảo chiều.</p>
            <StepList steps={[
              { d: "Xác nhận vị trí: Phải xuất hiện tại Cản D1/H4." },
              { d: "Xác nhận bối cảnh: Trước đó phải có một Trend rõ ràng." },
              { d: "Chờ nến xác nhận: Nến tiếp theo phải đóng cửa hẳn về 1 phía (Đỏ/Xanh dài)." },
              { d: "Entry: Vào lệnh ngay khi nến xác nhận đóng cửa." }
            ]} />
          </Lesson>
        </Module>
        <Module num="2" title="Giao dịch bằng nến Ôm (Engulfing)" tag="NNN Method 2">
          <Lesson title="Ý nghĩa & Quy trình">
            <p>Nến sau nuốt trọn nến trước. Năng lượng nén lại như lò xo.</p>
            <StepList steps={[
              { d: "Nhận diện: Nến mẹ trùm toàn bộ nến con (Cả râu)." },
              { d: "Chờ nến thứ 3 (Nến thoát): Nến này phá ra khỏi High/Low của nến mẹ." },
              { d: "SL: Đặt ở phía đối diện của Nến mẹ + buffer." }
            ]} />
            <Callout type="ok"><strong>Combo đỉnh cao:</strong> Cụm nến ôm + Fibo 62% + EMA21 + Cản D1 = Setup xác suất cao nhất.</Callout>
          </Lesson>
        </Module>
        <Module num="3" title="Đường EMA 21" tag="NNN Method 3">
          <Lesson title="Kỹ thuật Pullback">
            <p>Đường trung bình động 21 nến. Khi nến cắt qua và đóng cửa hẳn bên kia đường, đừng vào vội!</p>
            <Callout type="tip"><strong>Kiss the EMA:</strong> Chờ giá kéo ngược về chạm (test) lại đường EMA21 rồi nảy lên ➔ Entry cực đẹp, SL cực nhỏ.</Callout>
          </Lesson>
        </Module>
        <Module num="4" title="Fibonacci NNN" tag="NNN Method 4">
          <Lesson title="5 mức Fibo đặc biệt">
            <AcadTable headers={["Mức Fibo", "Loại", "Ý nghĩa chiến lược"]} rows={[
              ["62%", "Retracement", "Pullback vừa phải. Ưu tiên vào lệnh."],
              ["79%", "Retracement", "Pullback sâu. Gần ranh giới."],
              ["88%", "Deep Retracement", "Thận trọng, size nhỏ, SL chặt."],
              ["127%", "Extension", "Mục tiêu chốt lời (TP1) - Chốt 50%."],
              ["162%", "Extension", "Mục tiêu mở rộng (TP2) - Chốt toàn bộ."]
            ]} />
            <p className="mt-4"><strong>Hội tụ (Confluence) là chìa khóa:</strong> Hãy chờ đủ 2-3 yếu tố (Fibo + EMA + Nến) mới xuống tiền.</p>
          </Lesson>
        </Module>
        <MiniDrill 
          question="Setup lý tưởng nhất theo hệ thống NNN bao gồm những yếu tố nào?"
          options={[
            { text: "A. Cứ thấy Nến Ôm là Mua/Bán bất chấp thị trường.", isCorrect: false, explanation: "Đánh như vậy là tung đồng xu. Nến Ôm ở vùng Sideway không có tác dụng." },
            { text: "B. Xu hướng D1 + Kéo về Fibo 62% + Trùng EMA21 + Xuất hiện Nến Thân Ngắn/Nến Ôm.", isCorrect: true, explanation: "Đẳng cấp! Đây chính là 'Confluence' (Sự hội tụ). Khi 4 kỹ thuật cùng chỉ về một hướng, đó là lúc sếp ra tay." }
          ]}
        />
      </>
    ) 
  },
  { 
    id: 4, title: "4. Quản lý Vốn (Sống Còn)", 
    content: (
      <>
        <SectionHeader badge="Chương 4" title="Quản lý vốn & Rủi ro" desc="Kỹ thuật đẹp mà không có quản lý vốn tốt = chỉ là vấn đề thời gian trước khi thua sạch." />
        <Module num="7" title="Nguyên tắc Risk Management" tag="Bắt buộc">
          <Lesson title="Kỳ vọng (Edge) và Quy tắc 1-2%">
            <p>80% thua lỗ không phải vì phân tích sai, mà do Win-rate 70% nhưng R:R quá kém (ăn 1 đồng, thua 5 đồng).</p>
            <div className="bg-[#0B0E11] border border-[#2B3139] p-4 font-mono text-[#0ECB81] rounded text-center my-4">Kỳ vọng = (Win Rate × Lãi TB) − (Loss Rate × Lỗ TB)</div>
            <p><strong>Quy tắc 1-2%:</strong> KHÔNG BAO GIỜ rủi ro quá 2% tài khoản cho 1 lệnh. Thua 10 lệnh liên tiếp (x2%) = Mất 18% (Vẫn sống). Nếu cược 10%/lệnh = Mất 65% (Tự sát).</p>
          </Lesson>
          <Lesson title="Risk:Reward Ratio (R:R)">
            <AcadTable headers={["R:R", "Win-rate cần để hòa vốn", "Đánh giá"]} rows={[
              ["1:1", "50%", "Khó duy trì."],
              ["1:1.5", "40%", "Tối thiểu chấp nhận được."],
              ["1:2", "33%", "Ngưỡng CHUẨN cho hệ thống."],
              ["1:3", "25%", "Rất tốt - lý tưởng cho Swing trade."]
            ]} />
          </Lesson>
          <Lesson title="Kỹ thuật bảo vệ vốn nâng cao">
            <StepList steps={[
              { d: "<strong>Daily Drawdown Limit:</strong> Thua 3% tài khoản/ngày ➔ Tắt máy, reset tâm lý." },
              { d: "<strong>Move to Break Even (MBE):</strong> Lãi được 1R ➔ Dời SL về Entry ngay. Bảo toàn vốn." },
              { d: "<strong>Không trade trước tin lớn:</strong> Spread nở rộng quét SL cực rát." }
            ]} />
          </Lesson>
        </Module>
        <MiniDrill 
          question="Sếp có một setup với điểm Cắt lỗ (SL) là 400 giá, nhưng mức Chốt lời (TP) tiềm năng chỉ là 200 giá. Sếp quyết định ra sao?"
          options={[
            { text: "A. Vào lệnh luôn, ăn ít sống lâu.", isCorrect: false, explanation: "Sai lầm. Sếp đang cược R:R = 1:0.5 (Mất 2 đồng để kiếm 1 đồng). Đánh kiểu này Win-rate phải 70% mới hòa vốn." },
            { text: "B. Bỏ qua setup này. Kỷ luật R:R tối thiểu 1:2.", isCorrect: true, explanation: "Quyết định của một Pro-Trader. Thà nuốt nước bọt bỏ lỡ kèo, còn hơn cược tiền vào cửa ăn hẹp." }
          ]}
        />
      </>
    ) 
  },
  { 
    id: 5, title: "5. Tâm lý & Kỷ luật", 
    content: (
      <>
        <SectionHeader badge="Chương 5" title="Tâm lý giao dịch" desc="Kẻ thù lớn nhất không phải thị trường — mà là chính mình." />
        <Module num="8" title="Các thiên lệch tâm lý nguy hiểm" tag="Nhận diện">
          <Lesson title="FOMO & Revenge Trading">
            <Callout type="warn"><strong>FOMO (Fear of Missing Out):</strong> Sợ lỡ kèo. Giá bay vút lên ➔ Nhảy vào Mua đuổi ➔ Đu ngay đỉnh.</Callout>
            <Callout type="bad"><strong>Revenge Trading (Trả thù):</strong> Vừa thua lệnh lớn ➔ Tức giận, vào lệnh ngay để 'gỡ' ➔ Thua tiếp vì phân tích mù quáng.</Callout>
            <Callout type="bad"><strong>Loss Aversion (Gồng lỗ):</strong> Không chịu cắt lỗ, hy vọng giá quay về. Lỗ nhỏ thành lỗ lớn.</Callout>
          </Lesson>
        </Module>
        <Module num="9" title="Trading Journal" tag="Xuyên suốt">
          <Lesson title="Vũ khí bí mật của Pro">
            <p>Ghi lại mọi lệnh: Ngày, Cặp, Setup, Entry/SL/TP, và đặc biệt là <strong>CẢM XÚC KHI VÀO LỆNH</strong>. Không có Journal = Học trading không có ký ức.</p>
            <StepList steps={[
              { d: "Viết Trading Plan trước khi nhìn Chart." },
              { d: "Đặt SL ngay khi vào lệnh. KHÔNG NGOẠI LỆ." },
              { d: "Quy tắc 24h: Thua 3 lệnh liên tiếp ➔ Dừng trade 24h." }
            ]} />
          </Lesson>
        </Module>
      </>
    ) 
  },
  { 
    id: 6, title: "6. Lộ trình & Checklist", 
    content: (
      <>
        <SectionHeader badge="Chương 6" title="Thực chiến & Xây dựng hệ thống" desc="Từ học lý thuyết đến vào lệnh thật. Đừng vội đốt cháy giai đoạn." />
        <Module num="10" title="Lộ trình 90 ngày" tag="Action Plan">
          <Lesson title="3 Tháng kỷ luật">
            <StepList steps={[
              { n: "M1", d: "<strong>Tháng 1 (Học & Quan sát):</strong> Backtest thủ công 6 tháng quá khứ. Đánh dấu setup NNN. Chưa vào lệnh." },
              { n: "M2", d: "<strong>Tháng 2 (Demo):</strong> Trade tài khoản ảo 10k$. Risk đúng 1%. Mục tiêu 30 lệnh có Data để phân tích." },
              { n: "M3", d: "<strong>Tháng 3 (Live nhỏ):</strong> Nếu 2 tháng đầu ổn định, mở tài khoản Real siêu nhỏ ($200-$500) để rèn tâm lý tiền thật." }
            ]} />
          </Lesson>
        </Module>
        <Module num="11" title="Checklist Trước Khi Vào Lệnh" tag="Phụ lục">
          <Lesson title="Tick đủ 5 ô mới được click chuột!">
            <CheckItem text="Đã xem D1 và xác định xu hướng chính. KHÔNG ĐÁNH NGƯỢC TREND." />
            <CheckItem text="Giá đang nằm tại vùng S/R quan trọng hoặc Fibo 62-79%." />
            <CheckItem text="Đã có Tín hiệu nến NNN xác nhận và NẾN ĐÃ ĐÓNG CỬA." />
            <CheckItem text="Tỷ lệ R:R của lệnh này tối thiểu 1:2." />
            <CheckItem text="Đã tính Volume chuẩn (Risk 1-2%). Không có tin tức bão táp trong 2h tới." />
          </Lesson>
        </Module>
      </>
    ) 
  }
];

const Academy = () => {
  const [selectedLesson, setSelectedLesson] = useState(ACADEMY_DATA[0]);

  return (
    <div className="bg-[#0B0E11] text-[#EAECEF] font-sans selection:bg-[#F6465D]/30 pt-4 pb-12 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-6">
        
        {/* SIDEBAR TỐI GIẢN */}
        <div className="lg:col-span-3 space-y-3">
            <h3 className="text-[#848E9C] font-black uppercase text-[10px] tracking-[0.2em] mb-6 pl-4">Giáo trình SAIB.J.A.V.I.S</h3>
            {ACADEMY_DATA.map((lesson) => (
                <button 
                  key={lesson.id} onClick={() => setSelectedLesson(lesson)} 
                  className={`w-full text-left p-4 rounded-2xl text-[13px] font-bold transition-all border ${selectedLesson.id === lesson.id ? 'bg-[#2B3139]/50 border-white/10 text-white shadow-xl' : 'bg-transparent border-transparent text-[#666] hover:bg-[#2B3139]/30 hover:text-[#848E9C]'}`}
                >
                  {lesson.title}
                </button>
            ))}
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="lg:col-span-9 bg-[#181A20]/40 border border-white/5 rounded-3xl p-8 lg:p-12 min-h-[600px] shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#378ADD] via-[#0ECB81] to-[#FCD535]"></div>
            
            {/* KEY QUAN TRỌNG: Ép React xóa component cũ và mount component mới khi đổi bài, chống kẹt MiniDrill */}
            <div key={selectedLesson.id} className="animate-in slide-in-from-right-4 fade-in duration-500">
               {selectedLesson.content}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Academy;