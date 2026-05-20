import React, { useState } from 'react';

// ==========================================
// SHARED UI COMPONENTS (Dùng ở tất cả chapters)
// ==========================================

export const Callout = ({ type, title, children }) => {
  const styles = {
    tip: "bg-blue-50 dark:bg-[#378ADD]/10 border-blue-500 dark:border-[#378ADD] text-blue-800 dark:text-[#378ADD]",
    warn: "bg-yellow-50 dark:bg-[#FCD535]/10 border-yellow-500 dark:border-[#FCD535] text-yellow-800 dark:text-[#FCD535]",
    ok: "bg-green-50 dark:bg-[#0ECB81]/10 border-green-500 dark:border-[#0ECB81] text-green-800 dark:text-[#0ECB81]",
    bad: "bg-red-50 dark:bg-[#F6465D]/10 border-red-500 dark:border-[#F6465D] text-red-800 dark:text-[#F6465D]"
  };
  const icons = { tip: "💡", warn: "⚠️", ok: "✅", bad: "🚫" };
  return (
    <div className={`border-l-[4px] p-6 rounded-r-2xl my-8 text-[16px] md:text-[17px] leading-[1.8] flex gap-4 shadow-sm dark:shadow-md transition-colors ${styles[type]}`}>
      <span className="text-2xl mt-0.5 shrink-0">{icons[type]}</span>
      <div className="flex-1 text-gray-800 dark:text-[#EAECEF]">
        {title && <strong className={`block mb-2 text-lg ${styles[type].split(' ')[4]}`}>{title}</strong>}
        {children}
      </div>
    </div>
  );
};

export const StoryBox = ({ label, icon, children }) => (
  <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 md:p-10 my-8 relative overflow-hidden shadow-lg dark:shadow-xl transition-colors">
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-100 dark:bg-[#FCD535]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="text-xs font-black tracking-[0.15em] uppercase text-yellow-600 dark:text-[#FCD535] mb-5 flex items-center gap-3">
      <span className="text-2xl">{icon}</span> {label}
    </div>
    <div className="text-[16px] md:text-[17px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] relative z-10">{children}</div>
  </div>
);

export const SectionHead = ({ icon, title, desc }) => (
  <div className="mt-16 mb-8 flex items-start md:items-center gap-5">
    <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-[#FCD535]/10 text-gray-800 dark:text-[#FCD535] border border-gray-200 dark:border-[#FCD535]/30 flex items-center justify-center text-2xl shrink-0 shadow-sm dark:shadow-[0_0_15px_rgba(252,213,53,0.2)] transition-colors">{icon}</div>
    <div>
      <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white tracking-tight transition-colors">{title}</h2>
      {desc && <p className="text-[15px] md:text-[16px] text-gray-500 dark:text-[#848E9C] mt-2 transition-colors">{desc}</p>}
    </div>
  </div>
);

export const CyberTable = ({ headers, rows }) => (
  <div className="overflow-x-auto border border-gray-200 dark:border-[#2B3139] rounded-2xl my-8 shadow-sm dark:shadow-lg transition-colors">
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-gray-50 dark:bg-[#0B0E11] text-gray-500 dark:text-[#848E9C] text-[13px] uppercase tracking-widest border-b border-gray-200 dark:border-[#2B3139] transition-colors">
          {headers.map((h, i) => <th key={i} className="p-5 font-black">{h}</th>)}
        </tr>
      </thead>
      <tbody className="text-[16px] text-gray-800 dark:text-[#EAECEF]">
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-gray-100 dark:border-[#2B3139]/50 hover:bg-gray-50 dark:hover:bg-[#2B3139]/20 transition-colors last:border-0">
            {row.map((cell, j) => (
              <td key={j} className={`p-5 leading-[1.7] ${j===0 ? 'font-bold text-black dark:text-white' : ''}`} dangerouslySetInnerHTML={{__html: cell}}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const SimpleQuiz = ({ q, context, opts, correctIdx, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
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
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

export const TermCard = ({ name, eng, simple, example }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden mb-4 transition-all shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-white dark:bg-[#181A20]">
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B3139]/50 transition-colors">
        <span className="text-lg md:text-xl font-black font-mono text-black dark:text-white">{name}</span>
        <div className="flex items-center gap-4">
          <span className="text-[14px] text-gray-500 dark:text-[#848E9C] hidden md:block">{eng}</span>
          <span className={`text-xl text-gray-500 dark:text-[#848E9C] transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
        </div>
      </div>
      {isOpen && (
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#0B0E11] border-t border-gray-200 dark:border-[#2B3139] animate-in fade-in transition-colors">
          <div className="text-[16px] md:text-[17px] text-gray-800 dark:text-[#EAECEF] leading-[1.8] mb-5" dangerouslySetInnerHTML={{__html: simple}}></div>
          <div className="text-[15px] text-gray-600 dark:text-[#848E9C] bg-white dark:bg-[#181A20] border border-gray-200 dark:border-transparent rounded-xl p-5 leading-relaxed" dangerouslySetInnerHTML={{__html: example}}></div>
        </div>
      )}
    </div>
  );
};

export const ExerciseBox = ({ title, desc, steps }) => (
  <div className="bg-gradient-to-br from-[#1e2438] to-[#0e1117] dark:from-[#181A20] dark:to-[#0B0E11] border border-gray-300 dark:border-[#2B3139] rounded-3xl p-8 my-8 text-white shadow-xl">
    <div className="text-[11px] font-black tracking-[0.15em] uppercase text-[#FCD535] mb-3">💪 BÀI TẬP THỰC HÀNH</div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-[15px] text-[#848E9C] mb-6 leading-relaxed">{desc}</p>
    <div className="space-y-4">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-7 h-7 rounded-full bg-[#FCD535]/20 border border-[#FCD535]/50 text-[#FCD535] text-xs font-bold flex items-center justify-center shrink-0 mt-1">{s.n || i+1}</div>
          <div className="text-[16px] leading-[1.7] text-[#EAECEF]" dangerouslySetInnerHTML={{__html: s.d}}></div>
        </div>
      ))}
    </div>
  </div>
);

export const ResourceCard = ({ type, name, lang, desc, why, link }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden mb-4 bg-white dark:bg-[#181A20] shadow-sm hover:shadow-md dark:shadow-none transition-all">
      <div onClick={()=>setOpen(!open)} className="p-5 flex gap-4 items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B3139]/40">
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] flex justify-center items-center text-xl shrink-0">📚</div>
        <div className="flex-1">
          <div className="text-[11px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-1">{type}</div>
          <div className="font-bold text-[16px] text-black dark:text-white">{name}</div>
          <div className="text-[13px] text-gray-500 dark:text-[#64748B] mt-1">{lang}</div>
        </div>
        <div className={`text-2xl text-gray-400 transform transition-transform ${open?'rotate-90':''}`}>›</div>
      </div>
      {open && (
        <div className="p-6 bg-gray-50 dark:bg-[#0B0E11] border-t border-gray-200 dark:border-[#2B3139] animate-in fade-in text-[15px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
          <p className="mb-4">{desc}</p>
          <div className="text-green-700 dark:text-[#0ECB81] font-bold mb-6">→ {why}</div>
          <a href={link} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 dark:bg-[#378ADD] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90">Truy cập tài liệu</a>
        </div>
      )}
    </div>
  );
};