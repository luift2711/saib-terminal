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
          <Zap size={14} className="inline mr-1" /> QUIZ QUESTION
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
            <strong className="block text-lg mb-2">{selected === correctIdx ? '✅ Correct!' : '❌ Incorrect.'}</strong> {explanation}
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
      setAnalysis({ type: 'warn', msg: '⚠️ Please fill in more information to receive a detailed analysis!' });
      return;
    }
    const isWin = res === 'Win ✅';
    const isLoss = res === 'Loss ❌';
    const sysVio = sys === '⚠️ Missed 1-2 rules' || sys === '❌ Complete violation';
    const hasDemon = demons.length > 0;

    let resHtml = [];
    if (sysVio && isWin) {
      resHtml.push({ type: 'danger', icon: '⚠️', title: 'Critical Warning', text: 'You violated the system but still won. This is the most dangerous thing that can happen — your brain just received a reward for BAD behavior. The cycle of mistakes is being reinforced. Next time you will violate it harder.' });
    }
    if (sysVio && isLoss) {
      resHtml.push({ type: 'bad', icon: '🩸', title: 'Failure Analysis', text: 'System violation + loss = requires deep review. Questions: (1) If you followed the system, would this trade likely win? (2) Which demon caused you to violate it? This is the most important lesson.' });
    }
    if (!sysVio && isLoss) {
      resHtml.push({ type: 'ok', icon: '✅', title: 'Proper Loss', text: 'This is a normal "business expense". You followed the system — this loss is not a failure, it\'s the fee for the market to operate. Keep your discipline.' });
    }
    if (hasDemon) {
      resHtml.push({ type: 'purple', icon: '👹', title: 'Demon Detected', text: `${demons.join(', ')}. Great job recognizing it! Naming the demon is the first step to controlling it.` });
    }
    if (emos.includes('😌 Calm') && !hasDemon) {
      resHtml.push({ type: 'ok', icon: '🌟', title: 'Ideal State', text: 'Calm + no demon = the best psychological state for trading. Note this feeling so you can recognize the difference when a demon appears next time.' });
    }
    if (lesson.length > 20) {
      resHtml.push({ type: 'gold', icon: '✦', title: 'Lesson', text: 'The lesson you learned has been recorded. This is the most important part of the Journal.' });
    }

    setAnalysis({ type: 'success', data: resHtml.length > 0 ? resHtml : [{ type: 'normal', text: 'Please fill in more information to receive a more detailed analysis.' }] });
  };

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-8 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Edit3 size={24} className="text-[#d97706] dark:text-[#00d084] shrink-0" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">Trading Journal Entry</h3>
        <span className="text-xs text-gray-500 dark:text-[#848E9C] font-mono">{new Date().toLocaleDateString('vi-VN')}</span>
      </div>
      <div className="p-8">
        <div className="text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-4">Trade Information</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Market</label>
            <input type="text" value={mkt} onChange={e => setMkt(e.target.value)} placeholder="XAU/USD, BTC..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Direction</label>
            <select value={dir} onChange={e => setDir(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors">
              <option value="">Select...</option><option>BUY (Long)</option><option>SELL (Short)</option>
            </select>
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Result</label>
            <select value={res} onChange={e => setRes(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors">
              <option value="">Select...</option><option>Win ✅</option><option>Loss ❌</option><option>Break Even ➖</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Actual R:R</label>
            <input type="text" value={rr} onChange={e => setRr(e.target.value)} placeholder="1:2.5" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Followed system?</label>
            <select value={sys} onChange={e => setSys(e.target.value)} className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors">
              <option value="">Select...</option><option>✅ 100% followed system</option><option>⚠️ Missed 1-2 rules</option><option>❌ Complete violation</option>
            </select>
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">Self-rating (1-10)</label>
            <input type="number" value={score} onChange={e => setScore(e.target.value)} min={1} max={10} placeholder="7" className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-3 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
          </div>
        </div>

        <div className="mb-8">
          <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-3 block">Emotions at Entry</label>
          <div className="flex flex-wrap gap-2">
            {['😤 Highly confident', '😰 Anxious', '😱 FOMO', '😠 Angry (after loss)', '😌 Calm', '🤔 Hesitant', '🎯 Focused', '😵 Out of control'].map(e => (
              <button key={e} onClick={() => toggleEmo(e)} className={`px-4 py-2 rounded-xl text-[16.5px] transition-all border ${emos.includes(e) ? 'border-yellow-500 dark:border-[#FCD535] bg-yellow-50 dark:bg-[#FCD535]/10 text-yellow-800 dark:text-[#FCD535] font-bold' : 'border-gray-200 dark:border-[#2B3139] bg-white dark:bg-[#181A20] text-gray-700 dark:text-[#EAECEF] hover:border-gray-300 dark:hover:border-[#474D57]'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-3 block">Identify which Demon influenced you?</label>
          <div className="flex flex-col gap-3">
            {['👁 FOMO — Entering out of fear of missing out', '🔥 Revenge — Entering to recover previous loss', '👑 Overconfidence — Too confident, no double-checking', '🧊 Loss Aversion — Failing to cut losses on time', '🪬 Confirmation Bias — Only seeing the signals you want to see', '🐑 Herding — Following the crowd/others\' signals', '🎰 Overtrading — Entering without proper setup'].map(d => (
              <label key={d} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={demons.includes(d)} onChange={() => toggleDemon(d)} className="w-5 h-5 rounded border-gray-300 dark:border-[#2B3139] text-yellow-500 dark:text-[#00d084] focus:ring-yellow-500 dark:focus:ring-[#00d084] bg-white dark:bg-[#181A20] cursor-pointer" />
                <span className="text-[17.5px] text-gray-700 dark:text-[#EAECEF] group-hover:text-black dark:group-hover:text-white transition-colors">{d}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-3 block">Lesson from this trade</label>
          <textarea value={lesson} onChange={e => setLesson(e.target.value)} rows="3" placeholder="Next time I will... / I realized that..." className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[17.5px] text-black dark:text-white focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors" />
        </div>

        <button onClick={analyze} className="w-full py-4 rounded-xl font-black text-[18.5px] uppercase tracking-wider transition-all bg-yellow-500 dark:bg-[#00d084] hover:bg-yellow-400 dark:hover:bg-[#00e691] text-black shadow-[0_4px_14px_0_rgba(234,179,8,0.39)] dark:shadow-[0_4px_14px_0_rgba(0,208,132,0.39)]">
          ✦ Analyze Journal ✦
        </button>

        {analysis && (
          <div className={`mt-6 p-6 rounded-2xl border transition-all ${analysis.type === 'warn' ? 'bg-yellow-50 dark:bg-[#FCD535]/10 border-yellow-200 dark:border-[#FCD535]/30 text-yellow-800 dark:text-[#FCD535]' : 'bg-gray-50 dark:bg-[#0B0E11] border-gray-200 dark:border-[#2B3139]'}`}>
            {analysis.type === 'warn' ? (
              <div className="text-[16.5px] leading-relaxed">{analysis.msg}</div>
            ) : (
              <div>
                <div className="text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-4">📊 Your Analysis</div>
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
const CHAPTER_5_DATA_EN = [
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "0. Neuroscience & 7 Demons",
    content: (
      <>
        <SectionHead icon={<Brain size={16} />} title="Why do technically skilled traders still lose?" desc="The enemy is not on the chart. The enemy is in your head." />
        <StoryBox label="📖 The Matrix of Trading" icon="🧠">
          In 2002, Daniel Kahneman won the Nobel Prize in Economics for proving: <strong>Humans do not make financial decisions based on logic.</strong> We make decisions based on emotions, evolutionary instincts, and biases — then use logic to rationalize those decisions.<br /><br />
          Financial markets are perfectly designed machines that trigger all the worst human instincts: greed, fear, herding. <em>Your trading system (NNN) is your weapon. But psychology is the one wielding the weapon.</em>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="System 1 vs System 2" desc="Daniel Kahneman — Thinking, Fast and Slow" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="border border-red-200 dark:border-[#F6465D]/30 bg-red-50 dark:bg-[#F6465D]/5 rounded-2xl p-6">
            <div className="text-4xl text-red-500 dark:text-[#F6465D] font-black mb-2">1</div>
            <div className="font-bold text-red-700 dark:text-[#F6465D] text-lg mb-4">System 1 — "The Beast"</div>
            <ul className="space-y-2">
              {['Automatic, unconscious, extremely fast', 'Emotion, instinct, intuition', 'Low energy consumption', 'Cannot be turned off', 'Controls 95% of behavior', 'The enemy in trading'].map((item, i) => (
                <li key={i} className={`flex gap-2 text-[16.5px] ${i === 5 ? 'text-red-700 dark:text-[#F6465D] font-bold' : 'text-gray-700 dark:text-[#EAECEF]'}`}><span className="text-red-500 shrink-0">▸</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-green-200 dark:border-[#0ECB81]/30 bg-green-50 dark:bg-[#0ECB81]/5 rounded-2xl p-6">
            <div className="text-4xl text-green-500 dark:text-[#0ECB81] font-black mb-2">2</div>
            <div className="font-bold text-green-700 dark:text-[#0ECB81] text-lg mb-4">System 2 — "The Philosopher"</div>
            <ul className="space-y-2">
              {['Slow, conscious, effortful', 'Logic, analysis, rationality', 'High energy consumption', 'Easily swayed by S1', 'Only activates when called upon', 'Who we want in charge'].map((item, i) => (
                <li key={i} className={`flex gap-2 text-[16.5px] ${i === 5 ? 'text-green-700 dark:text-[#0ECB81] font-bold' : 'text-gray-700 dark:text-[#EAECEF]'}`}><span className="text-green-500 shrink-0">▸</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <StoryBox label="🧪 Kahneman's Experiment" icon="🧪" borderClass="border-red-300 dark:border-[#F6465D]/50" textClass="text-red-800 dark:text-[#F6465D]">
          You are holding a Buy on Gold. Price suddenly drops $15 in 5 minutes. Your heart races. Your hands start shaking.<br /><br /><strong>System 1 whispers:</strong> "Run! The price is collapsing! Close the trade now!"<br /><strong>System 2 is silent because System 1 is taking all the oxygen.</strong><br /><br />You close the trade. Two minutes later the price recovers and goes up $30. Your stop loss was still far away and wasn't swept.<br /><br />Kahneman calls this <em>Cognitive Hijacking</em> — when System 1 takes complete control before System 2 has time to analyze.
        </StoryBox>

        <SectionHead icon={<RefreshCw size={16} />} title="The Habit Loop and Trading" desc="James Clear — Atomic Habits" />
        <div className="bg-gray-900 dark:bg-[#0A0D13] rounded-2xl p-5 my-6 font-mono text-sm text-green-400 dark:text-[#00d084] border border-gray-700 dark:border-[#2B3139]">
          <div className="text-gray-400 text-xs mb-2">// Bad habit loop in Trading</div>
          <div>CUE: Seeing price rising fast (good news)</div>
          <div>CRAVING: Brain releases dopamine → "I must buy now!"</div>
          <div>RESPONSE: Rushing into a trade, not following the system</div>
          <div>REWARD: Winning sometimes (reinforcing the bad habit)</div>
          <div className="text-yellow-400 dark:text-[#FCD535]">→ Next time: Similar cue → Stronger craving → More automatic response</div>
          <br />
          <div className="text-gray-400 text-xs">// To break the loop (per Atomic Habits):</div>
          <div>CUE: Recognize the trigger → PAUSE (consciously)</div>
          <div>CRAVING: Replace the reward of "entering trade" with "checking checklist"</div>
          <div>RESPONSE: Follow the proper process</div>
          <div>REWARD: Praise yourself for sticking to the system</div>
        </div>

        <SectionHead icon={<Activity size={16} />} title="Why do losses hurt more than wins feel good?" desc="Prospect Theory — Kahneman & Tversky" />
        <p className="text-[18.5px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          Kahneman and Tversky (1979) discovered this: <strong>Losing $100 causes psychological pain that is 2-2.5 times greater than the joy of making $100.</strong> This is why it's so hard to cut losses — because cutting a loss = actualizing pain, and the brain doesn't want pain.
        </p>
        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-5 my-4">
          <div className="text-[13.5px] font-mono text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-3">Prospect Theory — Visual Illustration</div>
          <div className="flex items-center gap-2 text-[15.5px] font-mono mb-4">
            <span className="text-red-600 dark:text-[#F6465D] font-bold">Loss of $100</span>
            <span className="text-gray-500">=</span>
            <span className="text-yellow-600 dark:text-[#FCD535] font-bold">Requires winning $200-250</span>
            <span className="text-gray-500">to feel</span>
            <span className="text-green-600 dark:text-[#0ECB81] font-bold">emotionally breakeven</span>
          </div>
          <div className="relative h-2 rounded-full bg-gradient-to-r from-red-500 via-gray-300 dark:via-gray-600 to-green-500 mt-8 mb-2">
            <div className="absolute top-[-24px] left-[30%] text-[12.5px] font-mono font-bold text-red-600 dark:text-[#F6465D] -translate-x-1/2">Loss $100</div>
            <div className="absolute top-[-24px] left-[50%] text-[12.5px] font-mono font-bold text-gray-500 -translate-x-1/2">0</div>
            <div className="absolute top-[-24px] left-[90%] text-[12.5px] font-mono font-bold text-green-600 dark:text-[#0ECB81] -translate-x-1/2">Profit $200+</div>
          </div>
        </div>

        <SimpleQuiz
          q="You are watching the chart. Price suddenly goes up 3% in 10 minutes, Twitter is going crazy. You immediately feel the urge to buy. Which system is controlling you?"
          opts={['System 2 — you are analyzing carefully', 'System 1 — emotions and instincts are hijacking before you can think', 'Both are working in parallel', 'Neither — this is a purely rational decision']}
          correctIdx={1}
          explanation="System 1 takes control immediately when there's a strong emotional trigger. You feel you 'want' to buy before analyzing — that's a sign of Cognitive Hijacking."
        />
        <SimpleQuiz
          q="Why do many traders 'know they are wrong but still won't cut losses'?"
          opts={['Because they lack technical knowledge', 'Prospect Theory: cutting losses = actualizing pain (System 1 avoids); the brain would rather keep hope than accept immediate pain', 'Because they are lazy', 'Because the broker won\'t let them close the trade']}
          correctIdx={1}
          explanation="Kahneman's Prospect Theory: cutting a loss = actualizing pain immediately. The brain (System 1) chooses 'hope it comes back' over 'pain right now' — even if logically wrong."
        />

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 0 Summary</div>
          <ul className="space-y-2">
            {['System 1 (emotional, fast) controls 95% of decisions. System 2 (rational, slow) usually arrives after the action is taken.', 'Prospect Theory: losing $100 hurts 2-2.5x more than winning $100 feels good → brain avoids cutting losses.', 'Bad trading habits are wired into the brain via the Cue-Craving-Response-Reward loop.', 'Solution: create a "pause" between Cue and Response to give System 2 time to activate.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "1. Demon 1: FOMO",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#2c0a0a] to-[#1a0505] p-8 rounded-3xl text-center mb-8 border border-[#c0392b]/30">
          <div className="text-[14.5px] font-mono text-[#c0392b] uppercase tracking-[0.2em] mb-4">// Demon 1/7</div>
          <div className="text-6xl mb-4">👁</div>
          <h1 className="text-3xl font-black text-white mb-2">FOMO</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Avaritia — Greed</p>
          <p className="text-[16.5px] font-mono text-[#c0392b] bg-[#c0392b]/10 p-4 rounded-xl border border-[#c0392b]/20">"It whispers: Price is pumping and you're not in. Are you stupid?"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Exploits the fear of missing out</strong>
          </div>
        </div>

        <StoryBox label="📜 The classic story" icon="👁" borderClass="border-red-500/30" textClass="text-gray-300">
          <div className="text-gray-800 dark:text-gray-300">
            In 2021, Bitcoin pumped from $10k to $60k in a year. Millions saw friends and family making money and felt the pain of not getting in earlier. In Nov 2021, as BTC hit $58k, millions finally surrendered to FOMO and bought in.<br /><br />Three months later, BTC crashed to $32k. <strong>Those who FOMO bought the top lost 45% of their net worth.</strong><br /><br />FOMO doesn't care about your technical analysis. It only says: "The opportunity is passing. You will regret it."
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="The Science Behind It" desc="Kahneman · Sapiens · Atomic Habits" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Kahneman's System 1 meets "Social Comparison" from Sapiens: seeing others get rich makes the brain release cortisol (stress) and dopamine simultaneously. This combo forces impulsive actions to relieve the stress of "being left behind".
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Symptoms to recognize" desc="Are you possessed by this demon?" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Buying after price has already surged heavily and everyone is talking about it', 'Entering a trade without a clear setup, just out of "fear of missing out"', 'Increasing position size upon seeing others make more money than you', 'Constantly watching the chart, feeling anxious when not in a trade'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Exorcism Ritual" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Countermeasure</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>FOMO Exorcism:</strong> When feeling FOMO, write down 3 things: (1) "I want to enter because..." (2) "The current technical setup is..." (3) "If I don't enter, the next opportunity will come when..." The act of writing activates System 2. Bonus: remember that "the next opportunity always comes — the market never stops."
          </div>
        </div>

        <SimpleQuiz
          q="BTC price is up 15% today, Twitter is buzzing. You don't have any setup but feel you must buy right now. Which demon is controlling you and what should you do?"
          opts={['Buy right now because momentum is very strong', 'FOMO — Stop, write down "why I want to enter", check if there is an actual technical setup. If no setup → do not enter', 'SELL because price has gone up too much', 'Wait and buy when price pulls back 5%']}
          correctIdx={1}
          explanation="FOMO is the demon and 'pause + checklist' is the exorcism. No setup = no entry, even if price is mooning."
        />
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "2. Demon 2: Revenge Trading",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#2c0e0e] to-[#1a0808] p-8 rounded-3xl text-center mb-8 border border-[#e74c3c]/30">
          <div className="text-[14.5px] font-mono text-[#e74c3c] uppercase tracking-[0.2em] mb-4">// Demon 2/7</div>
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-3xl font-black text-white mb-2">REVENGE TRADING</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Ira — Wrath</p>
          <p className="text-[16.5px] font-mono text-[#e74c3c] bg-[#e74c3c]/10 p-4 rounded-xl border border-[#e74c3c]/20">"It roars: The market stole your money. Take it back!"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Turns anger into financial suicide</strong>
          </div>
        </div>

        <StoryBox label="📜 Marcus's Story" icon="🔥" borderClass="border-red-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            Marcus was a crypto trader with 6 months of experience. In October, he lost 3 consecutive trades, losing $600. He felt the market was "unfair" and "robbed his money".<br /><br />He got angry. He doubled the size of his next trade to "make it back immediately". The 4th trade lost. He tripled the size. Lost again. In 2 hours, Marcus lost $3,200 — 5 times his initial loss.<br /><br /><strong>"The market doesn't know who you are. It doesn't steal your money. It only reflects your decisions."</strong> — this quote came too late for Marcus.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="The Science Behind It" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          "Amygdala Hijack" — a term by Daniel Goleman: when angry, the amygdala (emotional brain) completely hijacks the prefrontal cortex (rational brain). You literally cannot think clearly when angry. Atomic Habits: in extreme emotional states, the habit loop breaks down — leaving only pure reaction.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Symptoms to recognize" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Losing a trade → entering a new one immediately to "recover"', 'Increasing size after a loss (a skewed reverse martingale)', 'Feeling the market is "unfair" or "purposely hunting my SL"', 'Trading with anger and frustration'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Exorcism Ritual" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Countermeasure</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>The 24-hour Rule:</strong> After any loss &gt;1.5× your normal risk → stop trading for the day. Close the computer. Go outside for a walk. This is not weakness — this is professional discipline. Remember: "The market will be there tomorrow. A blown up account will not."
          </div>
        </div>

        <SimpleQuiz
          q="You just lost 2 trades in a row, losing $200. Frustration builds up and you want to enter a 3rd trade immediately to 'recover'. Which demon is this and what should you do?"
          opts={['Enter the 3rd trade with a smaller size to be safer', 'The Demon of Wrath (Revenge) — Stop. Close the computer. No more trading today.', 'Analyze carefully for 30 mins then enter', 'FOMO — need to buy now before the chance is gone']}
          correctIdx={1}
          explanation="Revenge Trading is the most dangerous demon in terms of destruction speed. Stopping 100% is the only correct answer."
        />
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "3. Demon 3: Overconfidence",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#1a1500] to-[#0f0f00] p-8 rounded-3xl text-center mb-8 border border-[#d4ac0d]/30">
          <div className="text-[14.5px] font-mono text-[#d4ac0d] uppercase tracking-[0.2em] mb-4">// Demon 3/7</div>
          <div className="text-6xl mb-4">👑</div>
          <h1 className="text-3xl font-black text-white mb-2">OVERCONFIDENCE</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Superbia — Pride</p>
          <p className="text-[16.5px] font-mono text-[#d4ac0d] bg-[#d4ac0d]/10 p-4 rounded-xl border border-[#d4ac0d]/20">"It whispers: You've figured out the market. You are better than the rest."</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Turns success into the seed of failure</strong>
          </div>
        </div>

        <StoryBox label="📜 The Story of Icarus" icon="👑" borderClass="border-yellow-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            A trader, after 5 consecutive wins (total +35%), started believing he had "cracked the code" of the market. He started skipping checklists, increasing position size, and trading with absolute certainty.<br /><br />He forgot the story of Icarus — the boy who flew with wax wings, flying higher and closer to the sun until the wax melted and he fell into the sea.<br /><br /><strong>The market does not reward pride. It waits for the exact moment you are most confident to teach you the most expensive lesson.</strong>
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="The Science Behind It" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Sapiens: "Narrative Fallacy" — the human brain creates connected stories to explain the world. After 5 wins, the brain auto-generates the story "I am better than the market" instead of "I was lucky in a short streak". Kahneman calls this the "Illusion of Control" — the delusion that we can control what is essentially random.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Symptoms to recognize" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Skipping trading plan and checklist because "I know where it will go"', 'Increasing size after a winning streak without a systemic reason', 'Ignoring risk because "this time is different"', 'Not reviewing losing trades because "that was an exception"'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Exorcism Ritual" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Countermeasure</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>The Feynman Test:</strong> After any winning streak, ask: "Can I explain exactly why this trade won? Based on what principles?" If the answer is "because I felt the market would go up" → that is Overconfidence, not skill. Keep position size fixed regardless of winning or losing streaks.
          </div>
        </div>

        <SimpleQuiz
          q="You just won 6 trades in a row, totaling +$1,200. You feel 'in the zone' and want to double your position size for the next trade. Is this a good idea?"
          opts={['Good — you are on a winning streak so you should leverage the momentum', 'No — this is Overconfidence. 6 trades is not enough to determine skill vs luck. Keep size fixed and stick to the system.', 'Good but only increase by 25%', 'Should reduce size because the winning streak is ending']}
          correctIdx={1}
          explanation="Overconfidence is the best-camouflaged demon. Keeping size fixed whether winning or losing is the most vital discipline. 6 trades is too small a sample size to conclude anything."
        />
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "4. Demon 4: Loss Aversion",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#020d1a] to-[#010a14] p-8 rounded-3xl text-center mb-8 border border-[#2980b9]/30">
          <div className="text-[14.5px] font-mono text-[#2980b9] uppercase tracking-[0.2em] mb-4">// Demon 4/7</div>
          <div className="text-6xl mb-4">🧊</div>
          <h1 className="text-3xl font-black text-white mb-2">LOSS AVERSION</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Acedia — Fear</p>
          <p className="text-[16.5px] font-mono text-[#2980b9] bg-[#2980b9]/10 p-4 rounded-xl border border-[#2980b9]/20">"It whispers: Don't cut the loss. Maybe the price will return..."</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Freezes the ability to make correct decisions</strong>
          </div>
        </div>

        <StoryBox label="📜 The Story of the Fire Holder" icon="🧊" borderClass="border-blue-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            A man held a fire in his hand. The fire started burning, causing pain. But he wouldn't let go — because he was afraid of losing the fire.<br /><br />Every second passed, the wound got deeper. Finally, he lost not only the fire but also his hand.<br /><br /><strong>Holding a losing trade because you 'fear realizing a loss' is exactly like that fire holder.</strong> A Stop Loss is not admitting failure — it is the smartest decision you can make.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="The Science Behind It" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Prospect Theory (Kahneman & Tversky 1979): losing $100 = psychological pain equivalent to winning $200-250. So the brain "freezes" before the decision to cut a loss — it prioritizes maintaining "hope" over actualizing pain. This is a natural emotional asymmetry but causes financial destruction.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Symptoms to recognize" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Not placing a Stop Loss or moving the SL further away when hit', 'Holding losing trades thinking "maybe the price will return"', 'Closing winning trades too early out of "fear of losing profit" but holding losing trades forever', 'Feeling relieved when a losing trade finally returns to Breakeven instead of analyzing why you didn\'t cut earlier'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Exorcism Ritual" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Countermeasure</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Pre-mortem Ritual:</strong> Before entering a trade, ask: "If this trade hits SL, is it my fault or a reasonable risk?" If reasonable → accept it beforehand. Treat the SL as a "business expense" like shop rent, not a failure.
          </div>
        </div>

        <SimpleQuiz
          q="Your Buy Gold trade is down $80 (hitting SL). But you decide to move your SL down another $50 because 'gold often reverses from this zone'. Which demon is this?"
          opts={['No problem — adjusting SL flexibly is normal', 'Loss Aversion — moving SL to avoid actualizing pain is the most serious mistake you can make', 'Overconfidence — too much trust in your own analysis', 'FOMO — fear of missing out if price goes back up']}
          correctIdx={1}
          explanation="Moving SL away when hit = the most dangerous action caused by Loss Aversion. The brain avoids actualizing pain, leading a small loss to become a large one. SL is placed to be respected, not to be moved."
        />
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "5. Demon 5: Confirmation Bias",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#100a1a] to-[#0a0510] p-8 rounded-3xl text-center mb-8 border border-[#8e44ad]/30">
          <div className="text-[14.5px] font-mono text-[#8e44ad] uppercase tracking-[0.2em] mb-4">// Demon 5/7</div>
          <div className="text-6xl mb-4">🪬</div>
          <h1 className="text-3xl font-black text-white mb-2">CONFIRMATION BIAS</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Invidia — Deceit</p>
          <p className="text-[16.5px] font-mono text-[#8e44ad] bg-[#8e44ad]/10 p-4 rounded-xl border border-[#8e44ad]/20">"It whispers: Look here — all signals confirm your analysis."</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Blinds you to the truth, only seeing what you want to see</strong>
          </div>
        </div>

        <StoryBox label="📜 The Story of the Chart Fortune Teller" icon="🪬" borderClass="border-purple-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            A trader decided to BUY Bitcoin before looking at any data. Then he opened the chart.<br /><br />He saw EMA21 sloping up — <em>"Supports Buy!"</em>. He looked at RSI at 68 — <em>"Not overbought yet, supports Buy!"</em>. He checked volume — below average — <em>"Probably preparing for a strong pump, supports Buy!"</em>. He saw a major resistance level above — he didn't look at it again.<br /><br /><strong>He didn't analyze the chart — he convinced himself.</strong>
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="The Science Behind It" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Sapiens: "Cognitive Dissonance" — when there is a conflict between belief and reality, the brain chooses to protect the belief by rejecting reality. In trading: when you already want to enter a trade, the brain automatically "filters out" opposing signals and "amplifies" confirming ones.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Symptoms to recognize" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Analyzing the chart AFTER deciding the trade direction', 'Ignoring or explaining away opposing signals', 'Only reading news/analysis that agrees with your view', 'Feeling "certain" about a trade without clear reasons'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Exorcism Ritual" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Countermeasure</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Devil's Advocate Protocol:</strong> After analyzing, spend 2 minutes playing 'devil's advocate'. Ask: "If I SELL instead of BUY, what is the best reason?" If you can't find at least 2 valid reasons → your analysis is not objective enough.
          </div>
        </div>

        <SimpleQuiz
          q="You have decided to BUY ETH. When looking at the chart, you pay more attention to Buy signals and explain away Sell signals as 'just noise'. What is this?"
          opts={['Multi-dimensional analysis — normal', 'Confirmation Bias — you are seeking confirmation instead of truth. Actively look for SELL reasons before making the final decision', 'Overconfidence — too much trust in analytical skills', 'Loss Aversion — fear of this trade losing']}
          correctIdx={1}
          explanation="Confirmation Bias is the most intellectual demon — it never lies to you directly, it just cherry-picks the truth. By looking for opposing reasons (SELL), you force System 2 to activate."
        />
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "6. Demon 6: Herding",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#020f07] to-[#010a04] p-8 rounded-3xl text-center mb-8 border border-[#27ae60]/30">
          <div className="text-[14.5px] font-mono text-[#27ae60] uppercase tracking-[0.2em] mb-4">// Demon 6/7</div>
          <div className="text-6xl mb-4">🐑</div>
          <h1 className="text-3xl font-black text-white mb-2">HERDING</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Luxuria — Herd Ignorance</p>
          <p className="text-[16.5px] font-mono text-[#27ae60] bg-[#27ae60]/10 p-4 rounded-xl border border-[#27ae60]/20">"It whispers: Everyone is buying. Do you want to be the only one left out?"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Uses 200,000 years of evolutionary herd instinct against you</strong>
          </div>
        </div>

        <StoryBox label="📜 Yuval Harari's Story (Sapiens)" icon="🐑" borderClass="border-green-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            200,000 years ago, humans lived in small groups of 50-150. Those who deviated from the herd were eaten by lions. Those who followed the herd survived.<br /><br />"When you see everyone running, run — ask questions later" was a great survival principle.<br /><br /><strong>In financial markets, that principle kills you.</strong><br /><br />When everyone is buying simultaneously — that's usually the top. When everyone is panic selling — that's usually the bottom. The market is designed to take money from the crowd and give it to the minority who dare to go against it.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="The Science Behind It" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Sapiens: "Collective Fiction" — humans possess a unique ability: to believe in collective illusions. When "community news" says BTC will go to 0, the crowd believes and sells. When news says BTC is going to 1 million, the crowd believes and buys. Price is ultimately a synthesis of these stories, not reality.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Symptoms to recognize" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Entering a trade because Telegram/Discord/Twitter is buzzing about the opportunity', 'Buying based on "signals" from groups or KOL traders without self-analysis', 'Feeling safer when many people agree', 'Changing your own analysis after reading comments/posts of others'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Exorcism Ritual" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Countermeasure</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>The Silence Rule:</strong> Do not read any trading news, Telegram, or Twitter for 30 minutes before analyzing the chart. Analyze independently first, read others' views later (if needed). "When you need others to confirm your analysis — you don't have an analysis, you only have hope."
          </div>
        </div>

        <SimpleQuiz
          q="A famous KOL trader just posted 'BUY BTC right now — target $100k'. Everyone in the group is buying aggressively. You haven't checked the chart. What should you do?"
          opts={['Buy right now — the KOL has more experience than me', 'Herding — stop, close the group, open the chart and analyze independently. If YOUR setup agrees, then consider entering. Not because the KOL said so.', 'Buy but with a smaller size to reduce risk', 'Wait for 10 more people to confirm before buying']}
          correctIdx={1}
          explanation="Herding is an evolutionary instinct. Independent analysis is the weapon against it. Trading KOLs have their own interests and are not responsible for your account."
        />
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "7. Demon 7: Overtrading",
    content: (
      <>
        <div className="bg-gradient-to-br from-[#1a0a00] to-[#140700] p-8 rounded-3xl text-center mb-8 border border-[#e67e22]/30">
          <div className="text-[14.5px] font-mono text-[#e67e22] uppercase tracking-[0.2em] mb-4">// Demon 7/7</div>
          <div className="text-6xl mb-4">🎰</div>
          <h1 className="text-3xl font-black text-white mb-2">OVERTRADING</h1>
          <p className="text-[16.5px] text-gray-400 italic mb-4">Gula — Gluttony</p>
          <p className="text-[16.5px] font-mono text-[#e67e22] bg-[#e67e22]/10 p-4 rounded-xl border border-[#e67e22]/20">"It constantly whines: So boring. Why not enter a trade? What are you waiting for?"</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full border border-white/10 text-white text-[15.5px]">
            <span>⚡</span> <strong>Turns boredom into a path of slow bankruptcy</strong>
          </div>
        </div>

        <StoryBox label="📜 The Casino Story" icon="🎰" borderClass="border-orange-500/30">
          <div className="text-gray-800 dark:text-gray-300">
            Las Vegas casinos don't make money from people making huge bets and losing. They make money from millions of people making small bets continuously for hours.<br /><br />Similarly, overtrading doesn't destroy your account with one big loss. It slowly grinds your account away: spread + commission + subpar setups + boredom trades.<br /><br /><strong>"Not entering a trade is also a position. And sometimes it's the best position."</strong><br /><br />The best traders are not the ones who take the most trades. They are the ones who know how to wait for the best setups and ignore everything else.
          </div>
        </StoryBox>

        <SectionHead icon={<Brain size={16} />} title="The Science Behind It" />
        <p className="text-[17.5px] leading-relaxed text-gray-700 dark:text-[#9ca3b0] p-5 bg-gray-50 dark:bg-[#0B0E11] rounded-2xl border border-gray-200 dark:border-[#2B3139] my-4">
          Atomic Habits: dopamine is not just released when receiving a reward — it spikes highest when ANTICIPATING a reward. Meaning: the act of trading (clicking the mouse, waiting for the fill) = a dopamine hit. The brain learns: "trading = pleasure". Result: wanting to trade constantly regardless of market conditions.
        </p>

        <SectionHead icon={<AlertTriangle size={16} />} title="Symptoms to recognize" />
        <div className="bg-red-50 dark:bg-[#F6465D]/5 border border-red-200 dark:border-[#F6465D]/20 rounded-2xl p-5 my-4 space-y-3">
          {['Entering a trade without a clear setup because you "feel" the market will go up/down', 'Executing more than 3-5 trades/day in swing trading', 'Feeling restless and uncomfortable when not having an open position', 'Taking small "test" trades when the setup is not fully there'].map((s, i) => (
            <div key={i} className="flex gap-3 text-[16.5px] text-gray-800 dark:text-[#EAECEF] border-b border-red-100 dark:border-[#F6465D]/10 pb-2 last:border-0"><span className="text-red-500">🩸</span> {s}</div>
          ))}
        </div>

        <SectionHead icon={<Shield size={16} />} title="Exorcism Ritual" />
        <div className="bg-green-50 dark:bg-[#0ECB81]/10 border border-green-200 dark:border-[#0ECB81]/30 rounded-2xl p-6 my-4">
          <div className="text-[14.5px] font-bold text-green-700 dark:text-[#0ECB81] uppercase tracking-wider mb-2">✦ Countermeasure</div>
          <div className="text-[17.5px] leading-relaxed text-gray-800 dark:text-[#EAECEF]">
            <strong>Reverse Quota:</strong> Instead of "I must take at least X trades today", set a rule: "I am only allowed a maximum of Y trades/day" (for swing trading: Y = 2-3). And more importantly: write in your Journal every time you DO NOT take a trade due to a lack of setup. "Today I rejected 3 low-quality opportunities" is a proud achievement.
          </div>
        </div>

        <SimpleQuiz
          q="You have watched the chart for 3 hours but found no good setups according to the NNN system. You feel restless and want to 'test' a small trade for fun. What is this and what should you do?"
          opts={['Just take a small trade — risk is low', 'Overtrading/dopamine loop — "no trade = true discipline". Close the chart, do something else. Log in Journal: "Today I rejected a trade because of no setup."', 'Wait another hour, if still nothing then stop', 'Look at other charts to find opportunities']}
          correctIdx={1}
          explanation="Overtrading is wired into the brain via dopamine. Entering a 'test' trade = allowing this demon to grow stronger. 'No trade = discipline' is the mindset of a professional trader."
        />
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "8. Trading Journal",
    content: (
      <>
        <SectionHead icon={<Notebook size={16} />} title="Trading Journal — The Mirror of a Trader's Soul" desc="The only tool that allows you to see the 7 demons operating within yourself." />
        <StoryBox label="📖 Why does a Journal work?" icon="🧪" borderClass="border-purple-500/30">
          <div className="font-bold text-purple-700 dark:text-[#9b59ff] mb-2">Atomic Habits — "The Two-Minute Rule" & Habit Tracking (James Clear)</div>
          <div className="text-gray-800 dark:text-gray-300">
            Measurement = Awareness. Once you start recording behavior, the brain automatically starts adjusting. No willpower needed — just the light of observation. "You do not rise to the level of your goals; you fall to the level of your systems."
          </div>
        </StoryBox>

        <p className="text-[18.5px] text-gray-700 dark:text-[#9ca3b0] leading-[1.8] mb-6">
          When you record every trade in a Journal, something magical happens: <strong>you start seeing patterns</strong>. "I often lose on Mondays." "I make bad decisions right after losing 2 trades." "The Demon of Pride often appears after a winning streak." <em>No Journal = no data = not knowing which demon is manipulating you.</em>
        </p>

        <SectionHead icon={<Edit3 size={16} />} title="Practice: Fill out your Journal" desc="A sample entry — fill it out realistically to get an analysis" />

        <JournalSimulator />

        <SectionHead icon={<Target size={16} />} title="How to use the Journal to kill the demons" />
        <div className="space-y-4 my-6">
          {[
            { n: '1', text: <><strong>Record EVERY trade — no exceptions.</strong> Even the trade you "forgot" to follow the system on. Especially that trade. "Light kills parasites."</> },
            { n: '2', text: <><strong>Review weekly — not to see if you are profitable.</strong> The important question: "Which demon appeared the most this week? In what situations?" This is golden data.</> },
            { n: '3', text: <><strong>Find personal "triggers".</strong> Example: "I often get FOMO early on Monday." "The Demon of Wrath often appears after 2 consecutive losses." Once you know the trigger, you can defend against it beforehand.</> },
            { n: '4', text: <><strong>Create "if-then" rules from the Journal.</strong> Example: "If I just lost 2 trades → I will not enter a 3rd trade that day." (Atomic Habits: Implementation Intentions)</> },
            { n: '5', text: <><strong>Measure "system compliance" score — not P&L.</strong> In January, 20 trades, 17 followed the system = 85% compliance. This metric is far more important than profit in the learning phase.</> },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-[#0ECB81]/20 text-green-700 dark:text-[#0ECB81] font-black flex items-center justify-center shrink-0 mt-1 text-sm">{s.n}</div>
              <div className="text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8]">{s.text}</div>
            </div>
          ))}
        </div>

        <Callout type="ok"><strong>The power of Journaling according to Atomic Habits:</strong> When you write the demon's name on paper, the brain starts becoming "alert" to it in reality. After 30 days of journaling, many traders report they naturally start <em>recognizing immediately</em> when a demon is appearing — something they couldn't do before.</Callout>

        <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-2xl p-6 my-6">
          <div className="font-bold text-[#d97706] dark:text-[#00d084] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">▸ Lesson 8 Summary</div>
          <ul className="space-y-2">
            {['Journal = a mirror — the light of awareness automatically improves behavior (Atomic Habits: habit tracking).', 'Record: trade, emotions, present demons, system compliance score. Every single trade, no exceptions.', 'Review weekly to find personal triggers and create defensive "if-then" rules.', 'Measure "system compliance" instead of P&L for the first 3 months. Process first, profit later.'].map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-[17.5px] text-gray-700 dark:text-[#9ca3b0]"><span className="text-[#d97706] dark:text-[#00d084] shrink-0 mt-1">▸</span>{item}</li>
            ))}
          </ul>
        </div>
      </>
    )
  },
  {
    chapter: "Chapter 5: Trading Psychology & The 7 Demons", title: "9. Final Quiz",
    content: (
      <>
        <SectionHead icon="📝" title="Trading Psychology Test" desc="15 questions — identifying demons, scientific explanations, and Journal application. The most important chapter in the entire curriculum." />
        <Callout type="warn">Goal: Get at least 11/15 questions right to prove you are ready to face yourself in the market.</Callout>

        {[
          { q: 'What does the FOMO demon exploit in human psychology?', opts: ['Fear of pain', 'Fear of missing out — amplified by social comparison (Sapiens: evolutionary herd instinct)', 'Greed for money', 'Desire for respect'], ci: 1, ex: 'Evolutionary instinct makes us fear being left behind by the herd (social comparison).' },
          { q: 'What does Kahneman call "Cognitive Hijacking"?', opts: ['When your trading account is hacked', 'When System 1 takes full control before System 2 can analyze', 'When risk management is poor', 'When an indicator gives a false signal'], ci: 1, ex: 'Strong emotions (fear/greed) activate System 1, which "hijacks" decision-making before the rational brain (System 2) can act.' },
          { q: 'Why is Revenge Trading more dangerous than any other demon in terms of speed?', opts: ['Because it happens at night', 'Because amygdala hijack disables the prefrontal cortex — you literally cannot think clearly when angry, and often increase size very quickly', 'Because it affects EMA21', 'Because it happens after major news'], ci: 1, ex: 'Anger is the strongest primal emotion, completely disabling reason and causing you to take excessive risk (increasing size) for "revenge".' },
          { q: 'What does Prospect Theory say about losses and psychology?', opts: ['Losing $100 = joy of winning $100', 'Losing $100 causes psychological pain 2-2.5 times greater than the joy of winning $100 — leading to avoiding cutting losses', 'Everyone fears losing equally', 'Profits are more important than losses'], ci: 1, ex: 'The pain of losing money is greater than the joy of gaining it, causing traders to not dare cut losses (facing the pain) and hopelessly hold onto them.' },
          { q: 'Which loop from Atomic Habits explains why Overtrading is so hard to quit?', opts: ['Habit Stacking', 'Cue-Craving-Response-Reward: the act of trading itself releases dopamine — the brain learns "trading = pleasure" and wants to repeat it', 'Two-Minute Rule', 'Identity-based habits'], ci: 1, ex: 'Just the act of "preparing to enter a trade" triggers dopamine, making you want to trade constantly even without a setup.' },
          { q: 'What does Confirmation Bias mean in trading?', opts: ['Checking multiple times before entering a trade', 'Only paying attention to information that confirms a pre-existing decision, ignoring opposing information', 'Trading emotionally', 'Overtrading while having a Setup'], ci: 1, ex: 'It makes you "blind" to obvious risks because you only want to see what proves you are right.' },
          { q: 'According to Harari\'s Sapiens, why is Herding dangerous in trading?', opts: ['Because the crowd is always wrong', 'Because the brain evolved for 200,000 years to "follow the herd = safety" — but in the market, the crowd buying simultaneously is usually the top and vice versa', 'Because the crowd lacks analytical skills', 'Because group trading is illegal'], ci: 1, ex: 'Financial markets are a zero-sum game, where the minority takes money from the majority. Following the crowd = losing money.' },
          { q: 'You notice you often lose on early Mondays. What is the most correct next step?', opts: ['Never trade on Mondays forever', 'Create a rule: "If it is Monday → only watch the chart, do not enter trades in the morning" (Implementation Intention — Atomic Habits)', 'Trade more on Mondays to practice', 'This is just a coincidence, there is no pattern'], ci: 1, ex: 'A Journal helps find triggers, a rule helps block the trigger before it becomes an action.' },
          { q: 'When is a Journal most valuable?', opts: ['Only when losing trades', 'Only when winning trades', 'Every trade — especially when violating the system even if winning, because that is when a bad habit is most dangerously reinforced', 'Only when experiencing strong emotions'], ci: 2, ex: 'Winning while doing the wrong thing is poison. The Journal records this so you don\'t become delusional about your skills.' },
          { q: 'What demon does the "Devil\'s Advocate Protocol" exorcise?', opts: ['FOMO', 'Revenge Trading', 'Confirmation Bias — actively looking for opposing reasons to test the objectivity of your analysis', 'Loss Aversion'], ci: 2, ex: 'Force System 2 to work by seeking evidence against your own decision.' },
          { q: 'What is the worst mistake Loss Aversion causes a trader to make?', opts: ['Entering too many trades', 'Moving Stop Loss further away when hit to avoid actualizing a loss — turning a small loss into a large loss', 'Not using Take Profit', 'FOMO into new trades'], ci: 1, ex: 'Fear of facing a small loss (SL hit) will push you into an unsalvageable larger loss.' },
          { q: 'According to Atomic Habits, why does writing the demon\'s name in a Journal work?', opts: ['Because it helps remember the demons\' names', 'Habit Tracking: measurement creates awareness, awareness triggers automatic behavioral change — "light kills parasites"', 'Because handwriting is good for the brain', 'It has no real effect'], ci: 1, ex: 'Naming a bad behavior brings it from the unconscious (System 1) to the conscious (System 2).' },
          { q: 'What is the common thread of Sapiens, Thinking Fast and Slow, and Atomic Habits when applied to trading?', opts: ['All 3 recommend using EMA21', 'All 3 point out that human behavior is driven by instincts/evolutionary systems — not reason. Trading requires overcoming that "human part".', 'All 3 have chapters on technical analysis', 'All 3 are by American authors'], ci: 1, ex: 'The market punishes natural human reflexes. Successful trading is learning to fight against instinct.' },
          { q: 'When does Overconfidence (Pride) usually appear?', opts: ['When losing 3 trades in a row', 'After a winning streak — "Narrative Fallacy" (Sapiens): the brain creates a story "I am better than the market" from a small statistical sample', 'When the market is sideways', 'When RSI is in the overbought zone'], ci: 1, ex: 'A short-term winning streak inflates the ego, making the trader think they are a genius and ignore discipline.' },
          { q: 'Which principle from Atomic Habits is most effective for combating ALL 7 demons combined?', opts: ['The Two-Minute Rule', 'Implementation Intentions: write down specifically "If [demon X appears] → I will [specific action Y]". The brain processes the situation before it happens', 'Identity-based habits', 'Temptation Bundling'], ci: 1, ex: 'The "if-then" rule pre-programs the reaction, taking away the opportunity for emotions (System 1) to intervene.' },
        ].map((q, i) => (
          <SimpleQuiz key={i} q={`Question ${i + 1}: ${q.q}`} opts={q.opts} correctIdx={q.ci} explanation={q.ex} />
        ))}

        <ExerciseBox title="🚀 Next Steps — Chapter 6" desc="Before studying Chapter 6, do the following for 7 days:" steps={[
          { d: 'Start a Trading Journal today. Record at least 5 demo trades with full emotional information and demon identification.' },
          { d: 'Reread the story of the demon you feel "most familiar with" (could be yourself). Read the "Symptoms to recognize" section carefully.' },
          { d: 'Create a specific rule: "If [demon trigger], then I will [specific action]." Example: "If I just lost 2 trades, then I will stop trading for 24 hours."' },
          { d: 'Share that rule with a trusted friend — this increases compliance probability to 65% (according to research by Dominic Voge, Princeton).' },
        ]} />
      </>
    )
  },
];

export default CHAPTER_5_DATA_EN;
