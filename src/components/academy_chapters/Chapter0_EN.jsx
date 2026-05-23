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
        Comprehensive Trading Curriculum
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
      </div>
    </FadeUp>

    <FadeUp delay={0.2} className="relative z-10 mb-8">
      <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight tracking-tight">
        Trading <br />
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#996515] via-[#D4AF37] to-[#8B6508] dark:from-[#D4AF37] dark:via-[#F3E5AB] dark:to-[#B8860B] italic">Zero → Hero</span>
        <br />
        <span className="text-3xl md:text-5xl text-gray-700 dark:text-gray-300 mt-2 block">From Beginner to Live Trading</span>
      </h1>
    </FadeUp>

    <FadeUp delay={0.3} className="relative z-10 max-w-2xl mx-auto mb-12">
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-serif italic leading-relaxed">
        The only learning system built from 20 years of real trading experience — covering trading psychology, scientific risk management, and the practical NNN methodology.
      </p>
    </FadeUp>

    <FadeUp delay={0.4} className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-16">
      {[
        { n: '6', l: 'Chapters' },
        { n: '60+', l: 'Lessons' },
        { n: '20+', l: 'Interactive Tools' },
        { n: '∞', l: 'Practice' },
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
    <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-6">The Manifesto</div>
    <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed text-gray-700 dark:text-gray-300">
      There is a hard truth that no one wants to tell you:<br /><br />
      <strong className="text-black dark:text-white font-semibold">80% of traders fail not because they lack technical knowledge.</strong><br /><br />
      They fail because they have <em className="text-[#D4AF37] not-italic font-bold">no system</em>. Because they are <em className="text-[#D4AF37] not-italic font-bold">driven by emotions</em>. Because they <em className="text-[#D4AF37] not-italic font-bold">cannot manage risk</em>. Because they learn from many sources but have <em className="text-[#D4AF37] not-italic font-bold">no clear roadmap</em>.<br /><br />
      This curriculum is built to solve exactly those problems — from the roots, not just the surface.
    </p>
    <div className="mt-8 font-mono text-xs text-gray-500 tracking-[0.1em] uppercase">
      — Distilled from 20 years of live market experience
    </div>
  </FadeUp>
);

const ProblemSection = () => (
  <div className="my-24">
    <FadeUp>
      <div className="text-center mb-16">
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">The Reality</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          Why do <em className="text-[#D4AF37] italic">80%</em> of traders<br />lose money in their first year?
        </h2>
      </div>
    </FadeUp>

    <FadeUp delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gray-200 dark:bg-[#2B3139] border border-gray-200 dark:border-[#2B3139] rounded-2xl overflow-hidden mb-16">
      {[
        { n: '80%', t: 'of traders lose money in their first year', s: 'Source: International broker studies', c: 'text-[#F6465D]' },
        { n: '95%', t: 'of failures are due to psychology & poor risk management', s: 'Not a lack of technical analysis skills', c: 'text-[#FCD535]' },
        { n: '6 Months', t: 'average time to blow up an account', s: 'Without a system and discipline', c: 'text-[#0ECB81]' },
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
          <XCircle /> Common Learning Mistakes
        </h3>
        <ul className="space-y-4">
          {[
            'Learning randomly from YouTube or TikTok — with no system',
            'Buying "signals" from groups without knowing how to analyze',
            'Ignoring risk management because it is "boring" — only wanting technicals',
            'Jumping constantly from one trading system to another',
            'Not keeping a Trading Journal — never knowing where you went wrong',
            'Demo trading for a few days then rushing to live with big money',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-[17px] text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="text-red-500 shrink-0 mt-0.5">⚡</span> {item}
            </li>
          ))}
        </ul>
      </FadeUp>

      <FadeUp delay={0.4} className="bg-green-50 dark:bg-[#0ECB81]/5 p-8 rounded-3xl border border-green-100 dark:border-[#0ECB81]/20">
        <h3 className="text-xl font-serif font-bold text-green-700 dark:text-[#0ECB81] mb-6 flex items-center gap-3">
          <CheckCircle2 /> How This Course Fixes It
        </h3>
        <ul className="space-y-4">
          {[
            'A clear roadmap from chapter 0 to live trading — no steps skipped',
            'Teaches you to analyze yourself — 4 specific NNN methods, real examples',
            'Risk management taught as a science — with interactive calculators',
            'One consistent, proven system — not just "all systems are good"',
            'Integrated Trading Journal right inside the curriculum',
            'A strict 20-condition checklist before you are allowed to go live',
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
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">What You Will Get</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          Everything a trader<br /><em className="text-[#D4AF37] italic">truly</em> needs
        </h2>
      </div>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { icon: <Map className="w-8 h-8"/>, t: 'Clear Learning Roadmap', d: '6 chapters logically structured from foundations to live trading. You will never feel lost on what to do next.' },
        { icon: <Target className="w-8 h-8"/>, t: 'Complete Trading System', d: '4 specific NNN methods + 9 advanced candle patterns. Exact Entry, SL, and TP rules for each method — no ambiguity.' },
        { icon: <Brain className="w-8 h-8"/>, t: 'Understand Your Psychology', d: 'The 7 trading demons explained with science (Kahneman, Sapiens, Atomic Habits) — and exact protocols to counter them.' },
        { icon: <Shield className="w-8 h-8"/>, t: 'Pro Risk Management', d: 'Position sizing, Kelly Criterion, Pyramiding, and Drawdown management. Includes interactive calculators and real scenarios.' },
        { icon: <BookOpen className="w-8 h-8"/>, t: 'Integrated Journal', d: 'Full journal templates including psychological analysis, "demon" tracking, and pattern recognition. Ready to use immediately.' },
        { icon: <Rocket className="w-8 h-8"/>, t: 'Certificate & Trading Plan', d: 'Finish the course with your own customized Trading Plan, a comprehensive 20-question final exam, and a personalized certificate.' },
      ].map((f, i) => (
        <FadeUp key={i} delay={0.1 * i} className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-8 rounded-3xl hover:border-[#D4AF37] transition-all group relative overflow-hidden shadow-sm dark:shadow-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[#D4AF37] mb-6 transform group-hover:scale-110 transition-transform origin-left">{f.icon}</div>
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
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Course Content</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          6 Chapters — from <em className="text-[#D4AF37] italic">zero</em><br />to live trading readiness
        </h2>
      </div>
    </FadeUp>

    <div className="flex flex-col border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden bg-white dark:bg-[#181A20] shadow-sm dark:shadow-none">
      {[
        { n: '1', b: 'Chapter 1 · Foundation', t: 'Foundations & Terminology', d: 'Understand financial markets from the roots. Learn to read Japanese candlesticks — the language of all charts. Master the essential terminology.', tags: ['Markets','Candlesticks','Terms','Timeframes','Leverage'] },
        { n: '2', b: 'Chapter 2 · Technical', t: 'Technical Analysis', d: 'Read the language of price. Support/resistance, trends, EMAs, WMAs, and advanced RSI with interactive labs and DCA calculators.', tags: ['S/R','EMA/WMA','RSI','MACD','Volume','DCA'] },
        { n: '3', b: 'Chapter 3 · NNN Method', t: 'The 4 NNN Methods & Candles', d: 'The author\'s specific trading system. 4 detailed methods combined with 9 advanced candle patterns for high-probability setups.', tags: ['Short-Body','Engulfing','EMA21','Fibonacci','Hammer'] },
        { n: '4', b: 'Chapter 4 · Capital', t: 'Risk & Capital Management', d: 'The survival factor 80% of traders ignore. From the 1-2% rule to Kelly Criterion, Pyramiding, and Drawdown Management.', tags: ['Position Sizing','1-2% Rule','Kelly Criterion','Anti-Martingale'] },
        { n: '5', b: 'Chapter 5 · Psychology', t: 'Trading Psychology & 7 Demons', d: 'The real reason behind 80% of failures. The 7 trading demons explained via storytelling and modern science.', tags: ['FOMO','Revenge','System 1 vs 2','Journal'] },
        { n: '6', b: 'Chapter 6 · Going Live', t: 'System Building & Live Trading', d: 'Conclude the journey with a complete personal Trading Plan. Learn backtesting, a 90-day demo roadmap, and the 20-condition go-live checklist.', tags: ['Trading Plan','Backtesting','90-Day Demo','Go-Live Checklist'] },
      ].map((c, i) => (
        <FadeUp key={i} delay={0.05 * i} className="flex border-b border-gray-100 dark:border-[#2B3139] last:border-0 hover:bg-gray-50 dark:hover:bg-[#20252E] transition-colors group">
          <div className="hidden md:flex items-center justify-center p-8 border-r border-gray-100 dark:border-[#2B3139] text-3xl font-serif font-bold text-[#D4AF37] opacity-30 group-hover:opacity-100 transition-opacity w-24 shrink-0">
            {c.n}
          </div>
          <div className="p-6 md:p-8 flex-1">
            <div className="text-[12.5px] font-mono tracking-widest uppercase text-gray-500 mb-2">{c.b}</div>
            <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{c.t}</h3>
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
        <div className="text-[12.5px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Time Roadmap</div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight">
          From today until<br />your very first <em className="text-[#D4AF37] italic">live trade</em>
        </h2>
      </div>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { n: '01', p: 'Month 1 — Foundation', t: 'Learn & Observe', i: ['Complete Ch.1–3', 'Setup TradingView', 'Backtest 30 setups', 'Do not place any trades yet'] },
        { n: '02', p: 'Month 2 — System', t: 'Build & Demo', i: ['Complete Ch.4–5', 'Write personal Trading Plan', 'Demo your first 20 trades', 'Journal everything fully'] },
        { n: '03', p: 'Month 3 — Validation', t: 'Demo & Review', i: ['Complete Ch.6', 'Demo 20 more trades', 'Weekly journal reviews', 'Complete the 20-condition checklist'] },
        { n: '04', p: 'Month 4+ — Action', t: 'Live Trading', i: ['Hit ≥15/20 live conditions', 'Start with minimum capital', 'Continue journaling', 'Loop of continuous improvement'], hl: true },
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

const Chapter0Content = () => {
  return (
    <div className="pb-16 max-w-5xl mx-auto">
      <HeroSection />
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
          The journey <em className="text-[#D4AF37] italic">starts here</em>
        </h2>
        <p className="relative z-10 text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Every professional trader was once a beginner. The difference is they learned the right way from the start.
        </p>
        <div className="relative z-10 font-mono text-[13.5px] text-gray-500 tracking-[0.1em] uppercase">
          Click "Next Module" to begin Chapter 1.
        </div>
      </FadeUp>
    </div>
  );
};

const CHAPTER_0_DATA_EN = [
  {
    title: 'Chapter 0: Roadmap & Equipment',
    content: <Chapter0Content />
  }
];

export default CHAPTER_0_DATA_EN;
