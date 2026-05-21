import React, { useState } from 'react';

const FLASHCARDS = [
  { front: "CHoCH là viết tắt của gì?", back: "Change of Character - Tín hiệu phá vỡ cấu trúc cảnh báo đảo chiều." },
  { front: "Nguyên tắc Đổi vai (Role Reversal)?", back: "Kháng cự bị phá vỡ sẽ trở thành Hỗ trợ mới (và ngược lại)." },
  { front: "Tỷ lệ R:R tối thiểu để vào lệnh?", back: "1:2 (Lỗ 1 đồng, phải có cơ hội thắng ít nhất 2 đồng)." },
  { front: "Vùng Golden Pocket của Fibonacci NNN?", back: "Mức thoái lui 62% và 79%." },
  { front: "Quy tắc Kỷ luật thép về Rủi ro?", back: "Tuyệt đối không rủi ro quá 1-2% tổng tài khoản cho 1 lệnh." }
];

const Flashcards = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => { setIsFlipped(false); setTimeout(() => setCardIndex(prev => prev < FLASHCARDS.length - 1 ? prev + 1 : 0), 150); };
  const handlePrev = () => { setIsFlipped(false); setTimeout(() => setCardIndex(prev => prev > 0 ? prev - 1 : FLASHCARDS.length - 1), 150); };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#fff]/80 dark:bg-[#111827]/60 border border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)] rounded-3xl backdrop-blur-xl shadow-xl dark:shadow-none text-center transition-colors duration-500">
      <h4 className="text-[10px] font-black text-[#636878] dark:text-[#9ca3b0] uppercase tracking-[0.2em] mb-6 border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.08)] pb-3">Hệ thống thẻ phản xạ 3D</h4>
      
      <div className="relative w-full h-56 cursor-pointer [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Mặt trước */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#faf9f6] dark:bg-[#0e1117] border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.05)] hover:border-[#b45309]/50 dark:hover:border-[#00d084]/50 rounded-2xl flex flex-col items-center justify-center p-6 shadow-inner transition-colors duration-300">
            <p className="font-bold text-lg text-[#0f1117] dark:text-[#e8eaf0]">{FLASHCARDS[cardIndex].front}</p>
            <span className="absolute bottom-3 text-[9px] text-[#636878] dark:text-[#9ca3b0] uppercase tracking-wider">Click để lật</span>
          </div>
          {/* Mặt sau */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[rgba(180,83,9,0.08)] to-[#faf9f6] dark:from-[rgba(0,208,132,0.15)] dark:to-[#0e1117] border border-[#b45309]/30 dark:border-[#00d084]/30 rounded-2xl flex items-center justify-center p-6 shadow-xl transition-colors duration-300">
            <p className="font-bold text-base text-[#b45309] dark:text-[#00d084] leading-relaxed">{FLASHCARDS[cardIndex].back}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 px-2">
        <button onClick={handlePrev} className="text-[#636878] dark:text-[#9ca3b0] hover:text-[#0f1117] dark:hover:text-white text-[11px] font-bold px-5 py-2.5 bg-[rgba(15,17,23,0.03)] dark:bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.05)] transition-colors">← Trôi Lại</button>
        <span className="text-[11px] font-mono font-bold text-[#636878] dark:text-[#9ca3b0]">{cardIndex + 1} / {FLASHCARDS.length}</span>
        <button onClick={handleNext} className="text-white dark:text-black text-[11px] font-bold px-6 py-2.5 bg-[#b45309] dark:bg-[#00d084] rounded-xl hover:brightness-110 shadow-md transition-all">Tiếp →</button>
      </div>
    </div>
  );
};

export default Flashcards;