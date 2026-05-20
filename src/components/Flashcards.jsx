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
    <div className="max-w-xl mx-auto p-6 bg-[#181A20]/40 border border-white/5 rounded-3xl backdrop-blur-xl shadow-2xl text-center">
      <h4 className="text-[10px] font-black text-[#848E9C] uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-3">Hệ thống thẻ phản xạ 3D</h4>
      
      <div className="relative w-full h-56 cursor-pointer [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Mặt trước */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#0B0E11] border border-white/5 group-hover:border-[#FCD535]/30 rounded-2xl flex flex-col items-center justify-center p-6 shadow-inner">
            <p className="font-bold text-lg text-[#EAECEF]">{FLASHCARDS[cardIndex].front}</p>
            <span className="absolute bottom-3 text-[9px] text-[#666] uppercase tracking-wider">Click để lật</span>
          </div>
          {/* Mặt sau */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#2B3139] to-[#181A20] border border-[#0ECB81]/30 rounded-2xl flex items-center justify-center p-6 shadow-2xl">
            <p className="font-bold text-base text-[#0ECB81] leading-relaxed">{FLASHCARDS[cardIndex].back}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 px-2">
        <button onClick={handlePrev} className="text-[#848E9C] hover:text-white text-xs font-bold px-4 py-2 bg-[#0B0E11] rounded-xl border border-white/5">← Trôi Lại</button>
        <span className="text-xs font-mono text-[#666]">{cardIndex + 1} / {FLASHCARDS.length}</span>
        <button onClick={handleNext} className="text-black text-xs font-bold px-5 py-2 bg-[#FCD535] rounded-xl hover:brightness-110 transition-all">Tiếp →</button>
      </div>
    </div>
  );
};

export default Flashcards;