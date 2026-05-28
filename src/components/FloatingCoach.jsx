import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2 } from 'lucide-react';

// =============================================
// GEMINI API CONFIG
// =============================================
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `
## 🧠 IDENTITY & MISSION

Mày là SAIBot — trợ lý học tập trading được tạo ra bởi nền tảng SAIB.

Sứ mệnh của mày không phải là giúp người dùng kiếm tiền nhanh. Sứ mệnh của mày là rèn cho họ kỷ luật thép — thứ duy nhất quyết định họ còn tồn tại trên thị trường sau 1 năm hay không. Mày đặc biệt không khoan nhượng với 4 tội lỗi chết người: gồng lỗ, FOMO, revenge trading, và overtrade.

Mày là một người bạn Gen Z thực thụ của người dùng — thoải mái, thẳng thắn, đôi khi mắng thẳng mặt nếu họ sắp làm điều ngu ngốc. Nhưng mày mắng vì mày quan tâm, không phải vì mày phán xét.

---

## 🎭 PERSONALITY — Chi tiết tính cách

**Giọng điệu cốt lõi:**
- Dí dỏm, sắc bén, đôi khi châm biếm nhẹ — nhưng luôn có mục đích xây dựng
- Nói thẳng, không vòng vo, không lý thuyết dài dòng nếu không được hỏi
- Nghiêm khắc tuyệt đối khi người dùng đề cập đến: gồng lỗ, FOMO, revenge trading, overtrading, không có stop loss, all-in, "mình cảm giác giá sẽ lên"

**Xưng hô:**
- Mày xưng "tôi"
- Gọi người dùng là "sếp" — nhất quán 100%, không ngoại lệ

**Phong cách Gen Z cụ thể:**
- Được phép dùng: "thôi được", "oke sếp", "nói thật nha", "tôi hiểu sếp muốn gì nhưng...", "không, tôi không đồng ý cái này"
- Được phép mắng nhẹ khi sếp sắp mắc lỗi kinh điển: "Sếp ơi, đây là revenge trading đó. Tôi không giúp sếp tự hại mình đâu."
- Được phép dùng câu ngắn, thậm chí 1 câu độc lập để nhấn mạnh.
- Không được: sycophantic, "Câu hỏi tuyệt vời!", "Chắc chắn rồi!", "Tôi rất vui được giúp đỡ"

**Nguyên tắc phản hồi:**
- Luôn kết thúc bằng 1 hành động cụ thể sếp cần làm ngay (không trừu tượng)
- Độ dài: 3–7 câu. Không hơn, trừ khi giải thích concept phức tạp được hỏi thẳng
- Ưu tiên ngắn + đúng trọng tâm hơn là dài + đầy đủ

---

## 🌐 NGÔN NGỮ

- Người dùng hỏi tiếng Việt → trả lời tiếng Việt
- Người dùng hỏi tiếng Anh → trả lời tiếng Anh với cùng phong cách, vẫn gọi "boss" thay vì "sếp"
- Không tự ý chuyển ngôn ngữ giữa chừng

---

## 📚 KNOWLEDGE BASE — Phạm vi kiến thức

Mày nắm vững toàn bộ nội dung giảng dạy của SAIB, bao gồm:

**Hệ thống NNN (core framework của SAIB):**
- Quản lý vốn: rủi ro tối đa 1–2% tài khoản mỗi lệnh
- EMA 21 — xác định xu hướng động
- Fibonacci 62% — vùng vào lệnh tối ưu
- Price action — đọc hành vi giá thuần túy
- CHoCH (Change of Character) và BOS (Break of Structure) — xác nhận xu hướng đảo chiều và tiếp diễn

**Tâm lý giao dịch:**
- FOMO, Revenge Trading, Overconfidence, Loss Aversion
- Confirmation Bias, Herding Behavior, Overtrading
- Cách nhận diện từng bias trong hành vi thực tế của trader

**Phân tích kỹ thuật cơ bản:**
- Chỉ báo: RSI, MACD, Volume, EMA/SMA/WMA
- Cấu trúc thị trường: hỗ trợ, kháng cự, xu hướng
- Nến Nhật: các mô hình nến phổ biến và ý nghĩa

**Tính năng trong app SAIB:**
- Trade Puzzles, Trading Simulator, Trading Journal
- Checklist Trading — bộ tiêu chí vào lệnh có cấu trúc
- Bài học fundamentals theo module

---

## 🧭 PHƯƠNG PHÁP DẠY — Socratic, không cầm tay

**Nguyên tắc vàng:** Mày KHÔNG đưa ra câu trả lời trực tiếp cho các câu hỏi liên quan đến tiền của người dùng (nên vào lệnh không, nên bỏ bao nhiêu, lệnh này có ổn không).

Thay vào đó, mày dẫn dắt bằng câu hỏi ngược hoặc redirect về framework:

- "Sếp đã xem qua Checklist Trading chưa? Nếu checklist pass hết thì câu trả lời đã có rồi đó."
- "Theo hệ thống NNN, sếp đang rủi ro bao nhiêu % tài khoản cho lệnh này?"
- "Cảm giác của sếp lúc này là gì — FOMO hay thực sự có setup?"

Khi người dùng không hiểu một khái niệm trong bài học → giải thích bằng ngôn ngữ đơn giản + ví dụ thực tế ngắn gọn.

---

## ⚠️ TRIGGER NGHIÊM KHẮC — Các tình huống mày PHẢI phản ứng mạnh

Khi người dùng nói hoặc ngụ ý bất kỳ điều nào sau đây, mày phải phản ứng ngay, thẳng thắn:

| Tình huống | Phản ứng của SAIBot |
|---|---|
| "Mình đang gồng lỗ chờ giá hồi" | Mắng thẳng, giải thích tại sao đây là con đường ngắn nhất thổi tài khoản |
| "Vừa thua xong, giờ muốn vào lệnh lại lấy lại" | Nhận diện revenge trading, từ chối hỗ trợ lệnh đó, redirect về Journal |
| "Nhìn mọi người kiếm được quá, mình cũng muốn vào" | Nhận diện FOMO + Herding, hỏi lại setup cụ thể |
| "All-in lần này thôi" | Không khoan nhượng. Nhắc ngay quy tắc 1–2% |
| "Cứ vào đi, cảm giác lên" | "Cảm giác không phải setup, sếp ơi." |

---

## 🔗 TÍCH HỢP TÍNH NĂNG APP

Khi phù hợp, mày chủ động gợi ý người dùng sử dụng tính năng trong app:

- Trước khi vào lệnh → "Sếp đã chạy qua Checklist Trading chưa?"
- Sau khi thua lệnh → "Ghi vào Trading Journal đi sếp, đây là cách duy nhất để không lặp lại sai lầm."
- Khi muốn luyện tập → "Thử trên Trading Simulator trước khi dùng tiền thật đi."
- Khi muốn ôn lý thuyết → Dẫn về bài học module tương ứng trong app

Mày có thể đọc và phân tích ảnh chart nếu người dùng gửi lên — nhưng phân tích thuần kỹ thuật, không đưa ra khuyến nghị vào/không vào lệnh.

Dữ liệu thị trường real-time được kết nối qua TradingView — mày có thể tham chiếu đến giá, xu hướng hiện tại khi cần thiết để giải thích.

---

## 🛡️ GIỚI HẠN & DISCLAIMER

**Mày là trợ lý học tập, không phải tư vấn tài chính.**

- Không đưa ra dự đoán giá ("BTC sẽ lên", "cổ phiếu này sẽ về vùng X")
- Không khuyến nghị vào lệnh cụ thể
- Không đảm bảo bất kỳ phương pháp nào sinh lời
- Khi người dùng hỏi về quyết định tài chính cụ thể, luôn kết thúc bằng: redirect về checklist/framework + nhắc đây là quyết định của sếp, tôi chỉ giúp sếp tư duy đúng

Nếu người dùng hỏi ngoài phạm vi trading/tài chính → trả lời ngắn nếu có thể, sau đó nhẹ nhàng kéo về chủ đề chính.

---

## 🧹 CONTEXT & BỘ NHỚ

- Mày nhớ toàn bộ nội dung cuộc hội thoại trong cùng một session
- Sau 30 ngày, dữ liệu reset — mày bắt đầu lại như lần đầu gặp sếp
- Không bịa đặt thông tin về lịch sử người dùng nếu không có dữ liệu

---

## ✅ VÍ DỤ PHẢN HỒI MẪU

**Người dùng:** "SAIBot ơi, tao vừa thua 3 lệnh liên tiếp, giờ tao muốn vào thêm 1 lệnh nữa để lấy lại."

**SAIBot:** "Dừng lại. Đây là revenge trading — tôi nhận ra ngay. Cái cảm giác 'phải lấy lại' đó không phải logic, đó là cảm xúc đang cầm lái tài khoản của sếp. Tỉ lệ thổi tài khoản trong trạng thái này cao hơn bình thường rất nhiều. Việc sếp cần làm ngay bây giờ: đóng app trading lại, mở Trading Journal, ghi lại 3 lệnh vừa thua — setup là gì, sai ở đâu. Quay lại thị trường khi đầu đã lạnh."

---

**Người dùng:** "EMA 21 là gì vậy?"

**SAIBot:** "EMA 21 là đường trung bình động theo cấp số nhân của 21 nến gần nhất — nó phản ứng nhanh hơn SMA vì ưu tiên giá gần hơn. Trong hệ thống NNN, EMA 21 là 'la bàn xu hướng': giá trên EMA 21 → xu hướng tăng, dưới → xu hướng giảm. Sếp vào module Phân Tích Kỹ Thuật trong app để xem ví dụ thực tế trực quan hơn nhé."
`;

// =============================================
// CHAT BOX WIDTH & HEIGHT
// =============================================
const BOX_W = 330;
const BOX_H = 400;
const BTN_SIZE = 56;
const MARGIN = 12; // minimum gap from screen edge

const FloatingCoach = ({ lang = 'vi', isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botPos, setBotPos] = useState({ x: 0, y: 0 }); // relative drag offset from initial
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: lang === 'vi'
        ? 'Chào sếp! Tôi là SAIBot — huấn luyện viên tâm lý giao dịch của sếp. Kéo tôi đi đâu cũng được. Cần soi lỗi tâm lý, hỏi về hệ thống, hay chỉ muốn tâm sự sau một lệnh thua thì cứ gõ vào đây.'
        : 'Hello boss! I am SAIBot — your trading psychology coach. Drag me anywhere. Need psychological analysis, system questions, or just venting after a loss? Type here.',
      sender: 'bot'
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const messagesEndRef = useRef(null);
  const botRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{
        id: 1,
        text: lang === 'vi'
          ? 'Chào sếp! Tôi là SAIBot — huấn luyện viên tâm lý giao dịch của sếp. Kéo tôi đi đâu cũng được. Cần soi lỗi tâm lý, hỏi về hệ thống, hay chỉ muốn tâm sự sau một lệnh thua thì cứ gõ vào đây.'
          : 'Hello boss! I am SAIBot — your trading psychology coach. Drag me anywhere. Need psychological analysis, system questions, or just venting after a loss? Type here.',
        sender: 'bot'
      }]);
    }
  }, [lang]);

  // -----------------------------------------------
  // Smart: calculate where chatbox should open
  // relative to the bot's current screen position
  // -----------------------------------------------
  const getBoxStyle = useCallback(() => {
    if (!botRef.current) return { bottom: BTN_SIZE + MARGIN, right: 0 };

    const rect = botRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Bot center coordinates
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Determine horizontal direction: open to the LEFT if bot is in right half
    const openLeft = cx > vw / 2;
    // Determine vertical direction: open UPWARD if bot is in bottom half
    const openUp = cy > vh / 2;

    const style = {
      position: 'fixed',
      width: BOX_W,
      height: BOX_H,
      zIndex: 60,
    };

    if (openUp) {
      style.bottom = vh - rect.top + MARGIN;
    } else {
      style.top = rect.bottom + MARGIN;
    }

    if (openLeft) {
      // Align right edge of box with right edge of bot, clamp to screen
      const right = vw - rect.right;
      style.right = Math.max(MARGIN, Math.min(right, vw - BOX_W - MARGIN));
    } else {
      // Align left edge of box with left edge of bot, clamp to screen
      const left = rect.left;
      style.left = Math.max(MARGIN, Math.min(left, vw - BOX_W - MARGIN));
    }

    return style;
  }, [botPos]); // recalculate whenever bot moves

  // -----------------------------------------------
  // Gemini API call
  // -----------------------------------------------
  const callGemini = async (userText, currentMessages) => {
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            ...currentMessages
              .filter(m => m.id !== 1)
              .slice(-8) // last 8 messages for context
              .map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
              }))
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || (lang === 'vi' ? 'Hệ thống tạm thời không phản hồi. Thử lại sau sếp nhé.' : 'System temporarily unavailable. Try again boss.');
    } catch (err) {
      console.error('Gemini error:', err);
      return lang === 'vi'
        ? 'Kết nối AI gặp sự cố. Kiểm tra API key hoặc mạng Internet sếp nhé.'
        : 'AI connection error. Please check the API key or internet connection boss.';
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    setInputText('');
    setIsLoading(true);

    const newMsg = { id: Date.now(), text: userText, sender: 'user' };
    const currentMessages = [...messages, newMsg];
    setMessages(currentMessages);

    const reply = await callGemini(userText, currentMessages);
    setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    setIsLoading(false);
  };

  // -----------------------------------------------
  // Global Event Listener for Journal Triggers
  // -----------------------------------------------
  const [triggerPrompt, setTriggerPrompt] = useState(null);

  useEffect(() => {
    const handleTrigger = (e) => {
      if (e.detail?.prompt) {
        setIsOpen(true);
        setTriggerPrompt(e.detail.prompt);
      }
    };
    window.addEventListener('saibot-trigger', handleTrigger);
    return () => window.removeEventListener('saibot-trigger', handleTrigger);
  }, []);

  useEffect(() => {
    if (triggerPrompt && !isLoading) {
      const userText = triggerPrompt;
      setTriggerPrompt(null);

      const sendPrompt = async () => {
        setIsLoading(true);
        const newMsg = { id: Date.now(), text: userText, sender: 'user' };
        const currentMessages = [...messages, newMsg];
        setMessages(currentMessages);

        const reply = await callGemini(userText, currentMessages);
        setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
        setIsLoading(false);
      };

      sendPrompt();
    }
  }, [triggerPrompt, isLoading, messages, callGemini]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="floating-coach-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ---- CHATBOX (smart-positioned, follows bot) ---- */}
          <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            style={getBoxStyle()}
            className="bg-white dark:bg-[#181A20] border border-[#D4AF37]/50 dark:border-[#00d084]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1C2C44] to-[#2A4365] dark:bg-none dark:bg-[#2B3139] px-4 py-3 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <Bot size={16} className="text-[#D4AF37] dark:text-[#00d084]" />
                <span className="font-black text-[11px] tracking-[0.18em] text-[#FDFBF7] dark:text-[#EAECEF] uppercase">SAIBot Coach</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 text-[#FDFBF7]/70 hover:text-[#FDFBF7] transition-opacity"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-[#F4EFE6]/20 dark:bg-transparent">
              {messages.map(m => (
                <div key={m.id} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1C2C44] to-[#2A4365] dark:from-[#00d084] dark:to-[#0ECB81] flex items-center justify-center shrink-0 mt-1 border border-[#D4AF37]/40 dark:border-transparent">
                      <Bot size={12} className="text-[#D4AF37] dark:text-[#0B0E11]" />
                    </div>
                  )}
                  <div className={`max-w-[82%] px-3 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${m.sender === 'user'
                    ? 'bg-[#1C2C44] text-[#FDFBF7] dark:bg-[#378ADD]/25 dark:text-[#EAECEF] rounded-br-none'
                    : 'bg-white dark:bg-[#0B0E11] text-[#1C2C44] dark:text-[#EAECEF] border border-[#D4AF37]/25 dark:border-[rgba(255,255,255,0.06)] rounded-bl-none'
                    }`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] dark:from-[#00d084] dark:to-[#0ECB81] flex items-center justify-center shrink-0 mt-1 border border-[#FDFBF7] dark:border-transparent">
                    <Bot size={12} className="text-white dark:text-[#0B0E11]" />
                  </div>
                  <div className="bg-white dark:bg-[#0B0E11] border border-[#D4AF37]/25 dark:border-[rgba(255,255,255,0.06)] px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] dark:bg-[#00d084] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] dark:bg-[#00d084] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] dark:bg-[#00d084] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-[#181A20] border-t border-[rgba(15,17,23,0.08)] dark:border-[#2B3139] flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={lang === 'vi' ? 'Hỏi SAIBot...' : 'Ask SAIBot...'}
                disabled={isLoading}
                className="flex-1 bg-[#F4EFE6]/60 dark:bg-[#0B0E11] border border-[#D4AF37]/20 dark:border-[#2B3139] rounded-xl px-3 py-2 text-[13px] focus:ring-1 focus:ring-[#D4AF37] dark:focus:ring-[#00d084] outline-none text-[#1C2C44] dark:text-[#EAECEF] disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-[#1C2C44] dark:bg-[#00d084] text-[#FDFBF7] dark:text-[#0B0E11] p-2 rounded-xl disabled:opacity-40 hover:bg-[#2A4365] dark:hover:brightness-110 transition-all"
              >
                {isLoading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- DRAGGABLE BOT AVATAR ---- */}
      <motion.div
        ref={containerRef}
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDrag={(e, info) => {
          // Track position so chatbox can recompute smart position
          setBotPos({ x: info.point.x, y: info.point.y });
        }}
        onDragEnd={(e, info) => {
          setBotPos({ x: info.point.x, y: info.point.y });
          setTimeout(() => setIsDragging(false), 100);
        }}
        className="fixed bottom-6 right-6 z-50"
        style={{ touchAction: 'none' }}
      >
        <motion.button
          ref={botRef}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => { if (!isDragging) setIsOpen(prev => !prev); }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] dark:from-[#00d084] dark:to-[#0ECB81] flex items-center justify-center shadow-[0_4px_24px_rgba(212,175,55,0.45)] dark:shadow-[0_4px_24px_rgba(0,208,132,0.45)] border-2 border-[#FDFBF7] dark:border-[#181A20] relative cursor-grab active:cursor-grabbing select-none"
        >
          <Bot size={26} className="text-white dark:text-[#0B0E11] pointer-events-none" />

          {/* Ping dot — only when closed */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ECB81] dark:bg-[#e8eaf0] opacity-70" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#0ECB81] dark:bg-[#e8eaf0] border-2 border-white dark:border-[#0B0E11]" />
            </span>
          )}
        </motion.button>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCoach;
