import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

const FloatingCoach = ({ lang = 'vi' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: lang === 'vi' ? 'Chào sếp! Tôi là SAIBot. Kéo tôi đi đâu cũng được, cần check kỷ luật hay soi lỗi tâm lý thì cứ gõ vào đây.' : 'Hello boss! I am SAIBot. Drag me anywhere. If you need discipline checks or psychological analysis, just type here.', sender: 'bot' }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Update initial message if lang changes and it's the only message
    if (messages.length === 1) {
       setMessages([{ id: 1, text: lang === 'vi' ? 'Chào sếp! Tôi là SAIBot. Kéo tôi đi đâu cũng được, cần check kỷ luật hay soi lỗi tâm lý thì cứ gõ vào đây.' : 'Hello boss! I am SAIBot. Drag me anywhere. If you need discipline checks or psychological analysis, just type here.', sender: 'bot' }]);
    }
  }, [lang]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      let reply = lang === 'vi' ? 'Đã ghi nhận. Sắp tới sếp sẽ kết nối tôi với lõi AI thật (Gemini/ChatGPT) để tôi mắng sếp thông minh hơn nhé.' : 'Noted. Soon you will connect me with a real AI core (Gemini/ChatGPT) so I can scold you more intelligently.';
      if (newMsg.text.toLowerCase().includes('fomo') || newMsg.text.toLowerCase().includes('đu đỉnh')) {
        reply = lang === 'vi' ? 'Lại FOMO à? Tôi đang ghim lỗi này vào nhật ký của sếp đấy. Dừng lại ngay trước khi cháy tài khoản!' : 'FOMO again? I am pinning this error in your journal. Stop right now before you blow your account!';
      }
      setMessages(prev => [...prev, { id: Date.now(), text: reply, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 bg-white dark:bg-[#181A20] border border-[#D4AF37]/50 dark:border-[#00d084]/30 rounded-2xl shadow-2xl w-[320px] overflow-hidden flex flex-col z-[60]"
            style={{ height: '400px' }}
          >
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#C59B27] dark:bg-none dark:bg-[#2B3139] p-3 flex justify-between items-center text-white cursor-default">
              <div className="flex items-center gap-2">
                <Bot size={20} className="dark:text-[#00d084]" />
                <span className="font-black text-sm tracking-widest text-[#1C2C44] dark:text-[#EAECEF]">SAIBOT COACH</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 text-[#1C2C44] dark:text-[#EAECEF]"><X size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#F4EFE6]/30 dark:bg-transparent">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    m.sender === 'user' 
                      ? 'bg-[#1C2C44] text-[#FDFBF7] dark:bg-[#378ADD]/20 dark:text-[#EAECEF] rounded-br-none' 
                      : 'bg-white dark:bg-[#0B0E11] text-[#1C2C44] dark:text-[#EAECEF] border border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.05)] rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#181A20] border-t border-[rgba(15,17,23,0.08)] dark:border-[#2B3139] flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={lang === 'vi' ? "Hỏi SAIBot..." : "Ask SAIBot..."}
                className="flex-1 bg-gray-100 dark:bg-[#0B0E11] border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-[#D4AF37] dark:focus:ring-[#00d084] outline-none text-[#1C2C44] dark:text-[#EAECEF]"
              />
              <button type="submit" disabled={!inputText.trim()} className="bg-[#1C2C44] dark:bg-[#00d084] text-[#FDFBF7] dark:text-[#0B0E11] p-2 rounded-xl disabled:opacity-50 hover:bg-[#2A4365] dark:hover:opacity-90 transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 150)}
        className="fixed bottom-6 right-6 z-50"
        style={{ touchAction: "none" }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { if (!isDragging) setIsOpen(!isOpen); }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1C2C44] to-[#2A4365] dark:from-[#00d084] dark:to-[#0ECB81] flex items-center justify-center shadow-[0_4px_20px_rgba(28,44,68,0.4)] dark:shadow-[0_4px_20px_rgba(0,208,132,0.4)] border-2 border-[#D4AF37] dark:border-[#181A20] relative cursor-grab active:cursor-grabbing"
        >
          <Bot size={28} className="text-[#D4AF37] dark:text-[#0B0E11]" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] dark:bg-[#EAECEF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37] dark:bg-[#EAECEF] border-2 border-[#1C2C44] dark:border-[#00d084]"></span>
            </span>
          )}
        </motion.button>
      </motion.div>
    </>
  );
};

export default FloatingCoach;
