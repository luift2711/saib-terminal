import React, { useState, useEffect } from 'react';

const TradingJournal = () => {
  const [logs, setLogs] = useState([]);
  const [note, setNote] = useState('');
  const [streak, setStreak] = useState(0);
  
  // State của Huấn luyện viên AI
  const [coachInput, setCoachInput] = useState('');
  const [coachResponse, setCoachResponse] = useState('Chào sếp. Tôi là SAIBot Cyborg Coach. Sếp hãy nhập nhật ký hoặc hỏi tôi về lỗi hệ thống tâm lý, tôi sẽ bóc tách và tinh chỉnh cho sếp ngay.');

  useEffect(() => {
    // Tải dữ liệu từ LocalStorage ổ cứng
    const savedLogs = JSON.parse(localStorage.getItem('SAIB_trading_logs') || '[]');
    setLogs(savedLogs);
    
    // Đồng bộ Day-streak
    const savedStreak = Number(localStorage.getItem('SAIB_day_streak') || 0);
    const lastStreakDate = localStorage.getItem('SAIB_last_streak_date');
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Nếu quá 2 ngày không luyện tập -> Reset streak về 0
    if (lastStreakDate) {
      const diffTime = Math.abs(new Date(todayStr) - new Date(lastStreakDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        localStorage.setItem('SAIB_day_streak', 0);
        setStreak(0);
      } else {
        setStreak(savedStreak);
      }
    } else {
      setStreak(savedStreak);
    }
  }, []);

  // Tính toán chỉ số tài chính chuyên sâu (Data Analytics Expert)
  const totalTrades = logs.length;
  const winTrades = logs.filter(l => l.pnl > 0).length;
  const winRate = totalTrades > 0 ? ((winTrades / totalTrades) * 100).toFixed(1) : 0;
  const grossProfit = logs.filter(l => l.pnl > 0).reduce((sum, l) => sum + l.pnl, 0);
  const grossLoss = Math.abs(logs.filter(l => l.pnl < 0).reduce((sum, l) => sum + l.pnl, 0));
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? grossProfit.toFixed(2) : 0;
  const netPnL = grossProfit - grossLoss;

  // Đếm lỗi hệ thống tâm lý
  const fomoCount = logs.filter(l => l.tag === 'FOMO').length;
  const revengeCount = logs.filter(l => l.tag === 'REVENGE').length;
  const disciplineCount = logs.filter(l => l.tag === 'KỶ LUẬT').length;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    
    // Giả lập SAIBot tự động quét từ khóa phân tích tâm lý sếp vừa gõ
    let inferredTag = 'KỶ LUẬT';
    let coachDiagnosis = "Hệ thống ghi nhận lệnh chuẩn quy trình. Phát huy sếp nhé.";
    
    if (note.toLowerCase().includes('fomo') || note.toLowerCase().includes('đu đuổi')) {
      inferredTag = 'FOMO';
      coachDiagnosis = "Cảnh báo: Sếp đang bị thị trường dẫn dắt tâm lý sợ lỡ cơ hội. Hạ 50% khối lượng ở lệnh sau!";
    } else if (note.toLowerCase().includes('cay') || note.toLowerCase().includes('gỡ')) {
      inferredTag = 'REVENGE';
      coachDiagnosis = "Nguy hiểm: Dấu hiệu giao dịch trả thù (Revenge Trading). SAIBot đề xuất sếp đóng máy nghỉ ngơi 2 tiếng.";
    }

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      note: note,
      tag: inferredTag,
      pnl: inferredTag === 'FOMO' ? -100 : inferredTag === 'REVENGE' ? -200 : 150, // Giả lập PNL
      diagnosis: coachDiagnosis
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('SAIB_trading_logs', JSON.stringify(updatedLogs));
    setNote('');
    setCoachResponse(`[SAIBot Diagnosis]: ${coachDiagnosis}`);
  };

  // Trợ lý Coach Trả lời câu hỏi học thuật
  const askCoach = (e) => {
    e.preventDefault();
    if (!coachInput.trim()) return;

    let response = "SAIBot chưa tìm thấy mô hình tương đương trong giáo trình. Sếp hãy bám sát quy tắc quản lý vốn 1%.";
    if (coachInput.toLowerCase().includes('gồng lỗ')) {
      response = "Gồng lỗ là sai lầm diệt vong. Tư duy cốt lõi của hệ thống NNN: Lỗ trung bình phải nhỏ hơn Lãi trung bình để giữ Kỳ vọng (Edge) luôn dương. Chạm SL bắt buộc cắt!";
    } else if (coachInput.toLowerCase().includes('fomo')) {
      response = "Để trị FOMO: Sếp tuyệt đối không vào lệnh market khi nến đang bay. Chỉ đặt lệnh chờ LIMIT hoặc PENDING ORDER tại vùng hợp lưu (EMA21 + Fibonacci 62%). Không khớp thì bỏ!";
    }

    setCoachResponse(response);
    setCoachInput('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto text-[#EAECEF] animate-in fade-in duration-500">
      
      {/* 1. KHU VỰC DASHBOARD BIỂU ĐỒ CHUYÊN GIA */}
      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#181A20]/40 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#848E9C] uppercase tracking-wider block mb-1">Day-Streak</span>
             <div className="text-2xl font-black text-[#FCD535] flex items-center gap-1">🔥 {streak} Ngày</div>
          </div>
          <div className="bg-[#181A20]/40 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#848E9C] uppercase tracking-wider block mb-1">Win-Rate thực tế</span>
             <div className="text-2xl font-black text-[#0ECB81] font-mono">{winRate}%</div>
          </div>
          <div className="bg-[#181A20]/40 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#848E9C] uppercase tracking-wider block mb-1">Profit Factor</span>
             <div className="text-2xl font-black text-[#378ADD] font-mono">{profitFactor}</div>
          </div>
          <div className="bg-[#181A20]/40 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
             <span className="text-[10px] text-[#848E9C] uppercase tracking-wider block mb-1">Net PnL (Ước tính)</span>
             <div className={`text-2xl font-black font-mono ${netPnL >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
               {netPnL >= 0 ? '+' : ''}${netPnL}
             </div>
          </div>
        </div>

        {/* Biểu đồ phân tích lỗi dạng thanh trực quan */}
        <div className="bg-[#181A20]/40 border border-white/5 p-6 rounded-3xl backdrop-blur-xl">
           <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Ma trận phân tích khuyết tật tâm lý</h3>
           <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1"><span>Lỗi vào lệnh FOMO</span><span className="text-[#FCD535]">{fomoCount} lệnh</span></div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-[#FCD535] h-full transition-all" style={{width: `${totalTrades > 0 ? (fomoCount/totalTrades)*100 : 0}%`}}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>Giao dịch trả thù (Revenge)</span><span className="text-[#F6465D]">{revengeCount} lệnh</span></div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-[#F6465D] h-full transition-all" style={{width: `${totalTrades > 0 ? (revengeCount/totalTrades)*100 : 0}%`}}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>Lệnh chuẩn kỷ luật hệ thống</span><span className="text-[#0ECB81]">{disciplineCount} lệnh</span></div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-[#0ECB81] h-full transition-all" style={{width: `${totalTrades > 0 ? (disciplineCount/totalTrades)*100 : 0}%`}}></div></div>
              </div>
           </div>
        </div>

        {/* Biểu đồ Luồng dữ liệu nhật ký */}
        <div className="bg-[#181A20]/40 border border-white/5 p-6 rounded-3xl backdrop-blur-xl space-y-3">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">Luồng nhật ký giao dịch</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {logs.length === 0 ? (
              <p className="text-xs text-[#666] italic text-center py-6">Chưa có dữ liệu giao dịch được ghi nhận.</p>
            ) : (
              logs.map(l => (
                <div key={l.id} className="p-3 bg-[#0B0E11] rounded-xl border border-white/5 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[#666]">{l.date}</span>
                    <p className="text-xs text-white mt-1">{l.note}</p>
                    <p className="text-[10px] text-[#848E9C] italic mt-1 font-mono">// SAIBot Note: {l.diagnosis}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase text-[10px] ${l.tag === 'FOMO' ? 'bg-[#FCD535]/10 text-[#FCD535]' : l.tag === 'REVENGE' ? 'bg-[#F6465D]/10 text-[#F6465D]' : 'bg-[#0ECB81]/10 text-[#0ECB81]'}`}>
                    {l.tag}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 2. KHU VỰC TRỢ LÝ COACH ĐA NHIỆM */}
      <div className="lg:col-span-4 space-y-6">
        {/* Khung nhập Note nhanh */}
        <div className="bg-[#181A20]/40 border border-white/5 p-5 rounded-3xl backdrop-blur-xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Ghi Sổ Nhật Ký</h3>
          <form onSubmit={handleAddNote} className="space-y-3">
            <textarea 
              value={note} onChange={e => setNote(e.target.value)}
              placeholder="Hôm nay vào mã gì? Cảm xúc ra sao sếp? (Ví dụ: Thấy giá chạy mạnh quá, fomo vào luôn...)" 
              className="w-full bg-[#0B0E11] border border-white/5 rounded-xl p-3 text-xs text-white h-24 focus:outline-none focus:border-[#FCD535]"
            />
            <button type="submit" className="w-full bg-white/10 hover:bg-[#FCD535] hover:text-black py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider">Lưu Vào Ma Trận</button>
          </form>
        </div>

        {/* Giao diện Cyborg Coach Terminal */}
        <div className="bg-[#0B0E11] border border-[#2B3139] p-5 rounded-3xl shadow-inner flex flex-col min-h-[300px]">
           <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
              <span className="text-[9px] font-mono text-[#0ECB81]">SAIB_COACH_TERMINAL_V3.0</span>
              <div className="w-2 h-2 rounded-full bg-[#0ECB81] animate-ping"></div>
           </div>
           
           <div className="flex-1 text-xs text-[#0ECB81] font-mono leading-relaxed space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              <p className="text-[#EAECEF]">{coachResponse}</p>
           </div>

           <form onSubmit={askCoach} className="mt-4 pt-3 border-t border-white/5 flex gap-2">
              <input 
                type="text" value={coachInput} onChange={e => setCoachInput(e.target.value)}
                placeholder="Hỏi Coach về 'Fomo', 'Gồng lỗ'..." 
                className="flex-1 bg-[#181A20] border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
              <button type="submit" className="bg-[#0ECB81] text-black px-4 rounded-xl font-bold text-xs">HỎI</button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default TradingJournal;