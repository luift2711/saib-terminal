import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, AlertTriangle, CheckCircle, XOctagon, ChevronRight, BookOpen, Cpu, Shield, Zap, Target } from 'lucide-react';

// ==========================================
// SHARED UI COMPONENTS - LIGHT(Paper/Gold) & DARK(JARVIS/Dollar Green)
// ==========================================

export const Callout = ({ type, title, children }) => {
  const configs = {
    tip: { 
      light: "bg-[#dce8fa] border-[#2a5fad] text-[#1a3a6e]", 
      dark: "dark:bg-[#4f9eff]/10 dark:border-[#4f9eff]/50 dark:text-[#4f9eff]", 
      icon: <Info size={20} /> 
    },
    warn: { 
      light: "bg-[#fff8e6] border-[#d97706] text-[#5a3d00]", 
      dark: "dark:bg-[#f5a623]/10 dark:border-[#f5a623]/50 dark:text-[#f5a623]", 
      icon: <AlertTriangle size={20} /> 
    },
    ok: { 
      light: "bg-[#d4eddf] border-[#2d7a4f] text-[#1a4d30]", 
      dark: "dark:bg-[#00d084]/10 dark:border-[#00d084]/50 dark:text-[#00d084]", 
      icon: <CheckCircle size={20} /> 
    },
    bad: { 
      light: "bg-[#fae0e0] border-[#b53b3b] text-[#5a1a1a]", 
      dark: "dark:bg-[#ff4d4d]/10 dark:border-[#ff4d4d]/50 dark:text-[#ff4d4d]", 
      icon: <XOctagon size={20} /> 
    }
  };
  const c = configs[type] || configs.tip;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className={`border-l-[3px] p-5 rounded-r-xl my-6 text-[15px] leading-[1.8] flex gap-4 transition-colors ${c.light} ${c.dark}`}
    >
      <div className={`mt-0.5 shrink-0`}>{c.icon}</div>
      <div className="flex-1 text-[#0f1117] dark:text-[#e8eaf0]">
        {title && <strong className={`block mb-1 font-mono tracking-wide`}>{title}</strong>}
        {children}
      </div>
    </motion.div>
  );
};

export const StoryBox = ({ label, icon, children }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
    className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F0E6] dark:bg-none dark:bg-[#1e2535] border border-[#D4AF37]/50 dark:border-[rgba(255,255,255,0.1)] rounded-2xl p-8 my-8 relative overflow-hidden group shadow-[0_4px_20px_rgba(212,175,55,0.15)] dark:shadow-lg"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/15 dark:bg-[#00d084]/10 rounded-full blur-3xl group-hover:bg-[#D4AF37]/25 dark:group-hover:bg-[#00d084]/20 transition-all duration-700"></div>
    <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#B8860B] dark:text-[#f5a623] mb-5 flex items-center gap-3 font-bold">
      {icon ? <span className="text-xl opacity-80">{icon}</span> : <Cpu size={16} />}
      {label}
    </div>
    <div className="text-[15px] leading-[1.9] text-[#1C2C44] dark:text-[#e8eaf0] relative z-10 font-medium">{children}</div>
  </motion.div>
);

export const SectionHead = ({ icon, title, desc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="mt-14 mb-8 flex items-center gap-5"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/15 to-transparent dark:bg-none dark:bg-[#00d084]/10 border border-[#D4AF37]/50 dark:border-[#00d084]/30 text-[#B8860B] dark:text-[#00d084] flex items-center justify-center text-xl shrink-0 shadow-[inset_0_1px_3px_rgba(212,175,55,0.3)] dark:shadow-none">
      {icon ? <span>{icon}</span> : <Target size={24} />}
    </div>
    <div>
      <h2 className="text-2xl font-serif font-bold text-[#1C2C44] dark:text-[#e8eaf0] tracking-wide">{title}</h2>
      {desc && <p className="text-[14px] text-[#4A5568] dark:text-[#9ca3b0] mt-1 font-mono">{desc}</p>}
    </div>
  </motion.div>
);

export const CyberTable = ({ headers, rows }) => (
  <motion.div 
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
    className="overflow-x-auto border border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.13)] rounded-xl my-8 bg-[#FDFBF7] dark:bg-[#161b25] shadow-sm"
  >
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-[#F5F0E6] dark:bg-[#1e2535] text-[#1C2C44] dark:text-[#9ca3b0] text-[11px] font-mono uppercase tracking-[0.15em] border-b border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.13)]">
          {headers.map((h, i) => <th key={i} className="p-4 font-bold">{h}</th>)}
        </tr>
      </thead>
      <tbody className="text-[14px] text-[#2a2e3a] dark:text-[#9ca3b0] font-medium">
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-[#D4AF37]/15 dark:border-[rgba(255,255,255,0.07)] hover:bg-[#F5F0E6]/50 dark:hover:bg-[rgba(255,255,255,0.02)] transition-colors last:border-0">
            {row.map((cell, j) => (
              <td key={j} className={`p-4 leading-[1.7] ${j===0 ? 'text-[#1C2C44] dark:text-[#e8eaf0] font-bold font-mono' : ''}`} dangerouslySetInnerHTML={{__html: cell}}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

export const SimpleQuiz = ({ q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="border border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.13)] rounded-2xl overflow-hidden my-8 bg-[#FDFBF7] dark:bg-[#161b25] shadow-sm transition-colors"
    >
      <div className="p-8">
        <div className="text-[16px] font-semibold text-[#1C2C44] dark:text-[#e8eaf0] mb-6 leading-relaxed flex items-start gap-3">
          <Zap size={20} className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1" />
          <div>
            {q}
            {context && <span className="block text-[13px] text-[#636878] dark:text-[#9ca3b0] font-mono mt-2 font-medium">{context}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {opts.map((opt, i) => {
            const isChosen = selected === i;
            let btnClass = "border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.13)] text-[#2a2e3a] dark:text-[#9ca3b0] hover:border-[#D4AF37] dark:hover:border-[#00d084] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#00d084]/10 bg-transparent";
            let letterClass = "bg-[#F5F0E6] dark:bg-[#1e2535] text-[#1C2C44] dark:text-[#e8eaf0] font-mono font-bold";
            
            if (selected !== null) {
              if (i === correctIdx) { 
                btnClass = "border-transparent dark:border-[#00d084] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#00d084]/10 text-[#1C2C44] dark:text-[#00d084] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]"; 
                letterClass = "bg-[#1C2C44] dark:bg-[#00d084] text-[#FDFBF7] dark:text-[#0e1117] shadow-inner relative z-10"; 
              } else if (isChosen) { 
                btnClass = "border-transparent dark:border-[#ff4d4d] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#ff4d4d]/10 text-[#5A1A1A] dark:text-[#ff4d4d] shadow-[0_4px_15px_rgba(181,59,59,0.2)] dark:shadow-none relative overflow-hidden"; 
                letterClass = "bg-[#5A1A1A] dark:bg-[#ff4d4d] text-[#FDFBF7] shadow-inner relative z-10"; 
              } else { 
                btnClass = "border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.05)] text-[#9ba0ad] dark:text-[#5a6275] opacity-50 cursor-not-allowed bg-transparent"; 
              }
            }
            return (
              <button 
                key={i} disabled={selected !== null} onClick={() => setSelected(i)} 
                className={`flex items-start gap-4 p-4 border-2 rounded-xl text-left transition-all duration-300 ${btnClass}`}
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] shrink-0 ${letterClass}`}>{String.fromCharCode(65+i)}</div>
                <span className="text-[14px] leading-[1.7] mt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence>
          {selected !== null && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className={`mt-6 overflow-hidden rounded-xl`}
            >
              <div className={`p-5 text-[14px] leading-relaxed border ${selected === correctIdx ? 'bg-[#d4eddf] dark:bg-[#00d084]/10 border-[#2d7a4f]/20 dark:border-[#00d084]/20 text-[#1a4d30] dark:text-[#00d084]' : 'bg-[#fae0e0] dark:bg-[#ff4d4d]/10 border-[#b53b3b]/20 dark:border-[#ff4d4d]/20 text-[#5a1a1a] dark:text-[#ff4d4d]'}`}>
                <strong className="flex items-center gap-2 mb-2 font-mono text-[12px] uppercase tracking-wider">
                  {selected === correctIdx ? <CheckCircle size={14} /> : <XOctagon size={14} />}
                  {selected === correctIdx ? 'Verified' : 'Invalid'}
                </strong> 
                <span className="font-medium">{explanation}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const TermCard = ({ name, eng, simple, example }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="border border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden mb-3 bg-[#FDFBF7] dark:bg-[#161b25] hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(0,208,132,0.05)] transition-all"
    >
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between p-4 md:p-5 cursor-pointer bg-[#F5F0E6] dark:bg-[#1e2535]">
        <span className="text-[15px] font-mono font-bold text-[#1C2C44] dark:text-[#e8eaf0]">{name}</span>
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-[#9ba0ad] dark:text-[#5a6275] font-mono hidden md:block">{eng}</span>
          <ChevronRight size={18} className={`text-[#636878] dark:text-[#9ca3b0] transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-[#D4AF37]/20 dark:border-[rgba(255,255,255,0.07)]">
              <div className="text-[14px] text-[#2D3748] dark:text-[#e8eaf0] leading-[1.8] mb-4 font-medium" dangerouslySetInnerHTML={{__html: simple}}></div>
              <div className="text-[13px] text-[#4A5568] dark:text-[#9ca3b0] bg-[#F5F0E6] dark:bg-[#1e2535] rounded-lg p-4 leading-relaxed font-mono" dangerouslySetInnerHTML={{__html: example}}></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ExerciseBox = ({ title, desc, steps }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
    className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F0E6] dark:from-[#0e1117] dark:to-[#161b25] border border-[#D4AF37]/50 dark:border-[#00d084]/20 rounded-2xl p-8 my-8 text-[#1C2C44] dark:text-white shadow-[0_4px_20px_rgba(212,175,55,0.15)] dark:shadow-xl relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 dark:bg-[#00d084]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#B8860B] dark:text-[#00d084] mb-4 flex items-center gap-2 font-bold"><Shield size={14}/> SYSTEM PROTOCOL</div>
    <h3 className="text-xl font-serif font-bold mb-2 text-[#1C2C44] dark:text-[#e8eaf0]">{title}</h3>
    <p className="text-[14px] text-[#4A5568] dark:text-[#9ca3b0] mb-6 font-medium">{desc}</p>
    <div className="space-y-4">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-4 items-start group relative z-10">
          <div className="w-6 h-6 rounded-md bg-[#D4AF37]/15 dark:bg-[#00d084]/10 border border-[#D4AF37]/60 dark:border-[#00d084]/50 text-[#B8860B] dark:text-[#00d084] text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#D4AF37] dark:group-hover:bg-[#00d084] group-hover:text-white dark:group-hover:text-[#0e1117] transition-colors">{s.n || i+1}</div>
          <div className="text-[14px] font-medium leading-[1.7] text-[#2D3748] dark:text-[#e8eaf0] transition-colors" dangerouslySetInnerHTML={{__html: s.d}}></div>
        </div>
      ))}
    </div>
  </motion.div>
);

export const ResourceCard = ({ type, name, lang, desc, why, link }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="border border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.13)] rounded-xl overflow-hidden mb-3 bg-[#FDFBF7] dark:bg-[#161b25] hover:border-[#D4AF37]/60 dark:hover:border-[rgba(255,255,255,0.3)] hover:shadow-md transition-all"
    >
      <div onClick={()=>setOpen(!open)} className="p-4 flex gap-4 items-center cursor-pointer bg-[#F5F0E6] dark:bg-[#1e2535]">
        <div className="w-10 h-10 rounded-lg bg-[#FDFBF7] dark:bg-[#252d3e] border border-[#D4AF37]/30 dark:border-[rgba(255,255,255,0.07)] flex justify-center items-center text-[#B8860B] dark:text-[#00d084] shrink-0 shadow-sm"><BookOpen size={18}/></div>
        <div className="flex-1">
          <div className="text-[10px] font-mono text-[#636878] dark:text-[#5a6275] uppercase tracking-widest mb-1 font-bold">{type}</div>
          <div className="font-bold text-[15px] text-[#1C2C44] dark:text-[#e8eaf0]">{name}</div>
          <div className="text-[12px] text-[#4A5568] dark:text-[#9ca3b0] font-mono mt-0.5">{lang}</div>
        </div>
        <ChevronRight size={18} className={`text-[#636878] dark:text-[#9ca3b0] transform transition-transform duration-300 ${open?'rotate-90':''}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-[#D4AF37]/20 dark:border-[rgba(255,255,255,0.07)] text-[14px] font-medium leading-relaxed text-[#2D3748] dark:text-[#e8eaf0]">
              <p className="mb-4">{desc}</p>
              <div className="text-[#B8860B] dark:text-[#00d084] font-mono text-[12px] mb-5 border-l-2 border-[#D4AF37] dark:border-[#00d084] pl-3 font-bold">→ {why}</div>
              <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#1C2C44] dark:bg-[#00d084] text-[#FDFBF7] dark:text-[#0e1117] px-5 py-2 rounded-lg font-mono text-[12px] hover:bg-[#2A4365] dark:hover:bg-[#00e691] transition-colors shadow-md">
                ACCESS SYSTEM
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};