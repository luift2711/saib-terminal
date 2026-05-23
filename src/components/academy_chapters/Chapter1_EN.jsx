import { useState } from 'react';
import {
  Calculator,
  Store,
  ShoppingCart,
  Brain,
  Globe,
  Clock,
  Landmark,
  AlertTriangle,
  BookOpen,
  Zap,
  Home,
  Flame,
  Telescope,
  Map,
  Star
} from 'lucide-react';
import {
  Callout,
  StoryBox,
  SectionHead,
  CyberTable,
  ExerciseBox,
  SimpleQuiz,
  TermCard,
} from '../Sharedcomponents.jsx';

const MatchGame = () => {
  const leftItems = [
    { id: 0, t: 'EUR/USD' },
    { id: 1, t: 'Bitcoin' },
    { id: 2, t: 'XAU/USD' },
    { id: 3, t: 'VIC (Vingroup)' },
  ];
  const rightItems = [
    { id: 0, t: 'Open 24/7, no central exchange' },
    { id: 1, t: 'Traded via Vietnamese stock exchanges' },
    { id: 2, t: 'High liquidity forex pair, usually low spread' },
    { id: 3, t: 'Safe haven asset during market turbulence' },
  ];
  const pairs = { 0: 2, 1: 0, 2: 3, 3: 1 };
  const [selL, setSelL] = useState(null);
  const [selR, setSelR] = useState(null);
  const [matched, setMatched] = useState([]);
  const [flash, setFlash] = useState(null);

  const resolvePair = (leftId, rightId) => {
    if (pairs[leftId] === rightId) {
      setMatched((prev) => [...prev, leftId]);
      setSelL(null);
      setSelR(null);
      return;
    }

    setFlash({ l: leftId, r: rightId });
    setTimeout(() => {
      setFlash(null);
      setSelL(null);
      setSelR(null);
    }, 500);
  };

  const handleLeftSelect = (id) => {
    if (matched.includes(id)) return;
    if (selR !== null) resolvePair(id, selR);
    else setSelL(id);
  };

  const handleRightSelect = (id) => {
    if (matched.some((leftId) => pairs[leftId] === id)) return;
    if (selL !== null) resolvePair(selL, id);
    else setSelR(id);
  };

  const getStatus = () => {
    if (matched.length === 4) return 'Completed. You have correctly matched all 4 pairs.';
    if (flash) return 'Incorrect, try again.';
    return `Select an item on the left, then one on the right to match. (${matched.length}/4)`;
  };

  const btnClass = (side, id) => {
    if (
      (side === 'L' && matched.includes(id)) ||
      (side === 'R' && matched.some((leftId) => pairs[leftId] === id))
    ) {
      return 'border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] pointer-events-none shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]';
    }
    if (flash && ((side === 'L' && flash.l === id) || (side === 'R' && flash.r === id))) {
      return 'border-transparent dark:border-[#F6465D] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#F6465D]/10 text-[#5A1A1A] dark:text-[#F6465D] opacity-50 relative overflow-hidden';
    }
    if ((side === 'L' && selL === id) || (side === 'R' && selR === id)) {
      return 'border-transparent dark:border-[#378ADD] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#378ADD]/20 text-[#1C2C44] dark:text-[#378ADD] shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]';
    }
    return 'border-gray-200 dark:border-[#2B3139] bg-white dark:bg-[#181A20] text-[#1C2C44] dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#FCD535]/10 transition-colors';
  };

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] bg-gray-50 dark:bg-[#0B0E11] rounded-3xl p-8 my-10 shadow-md dark:shadow-xl transition-colors">
      <h3 className="text-lg font-bold text-black dark:text-white mb-6">
        Exercise: Match Market and Characteristics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase tracking-widest font-bold mb-4">
            Market
          </div>
          {leftItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleLeftSelect(item.id)}
              className={`p-5 border-2 rounded-xl text-[17.5px] cursor-pointer transition-all mb-3 shadow-sm dark:shadow-none ${btnClass('L', item.id)}`}
            >
              {item.t}
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase tracking-widest font-bold mb-4">
            Characteristics
          </div>
          {rightItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleRightSelect(item.id)}
              className={`p-5 border-2 rounded-xl text-[17.5px] cursor-pointer transition-all mb-3 shadow-sm dark:shadow-none ${btnClass('R', item.id)}`}
            >
              {item.t}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`mt-6 text-[17.5px] font-bold ${matched.length === 4
            ? 'text-green-600 dark:text-[#0ECB81]'
            : flash
              ? 'text-red-600 dark:text-[#F6465D]'
              : 'text-gray-500 dark:text-[#848E9C]'
          }`}
      >
        {getStatus()}
      </div>
    </div>
  );
};

const LeverageSim = () => {
  const [balance, setBalance] = useState(1000);
  const [leverage, setLeverage] = useState(100);
  const [move, setMove] = useState(1);

  const controlled = balance * leverage;
  const loss = controlled * (move / 100);
  const pct = balance > 0 ? Math.min((loss / balance) * 100, 100) : 0;

  let statusColor = 'text-green-700 dark:text-[#0ECB81]';
  let bgStatus = 'bg-green-50 dark:bg-[#0ECB81]/10';
  let msg = `Reasonable risk assuming you use full margin: loss of approx ${pct.toFixed(1)}% of account.`;

  if (pct >= 100) {
    statusColor = 'text-red-700 dark:text-[#F6465D]';
    bgStatus = 'bg-red-50 dark:bg-[#F6465D]/10';
    msg = `Account blown in this simulation: if using full margin at ${leverage}:1, a ${move}% reverse move wipes out your $${balance.toLocaleString()} account.`;
  } else if (pct >= 50) {
    statusColor = 'text-red-700 dark:text-[#F6465D]';
    bgStatus = 'bg-red-50 dark:bg-[#F6465D]/10';
    msg = `Very high risk: assuming full margin usage, you could lose approx ${pct.toFixed(0)}% of your account.`;
  } else if (pct >= 10) {
    statusColor = 'text-yellow-700 dark:text-[#FCD535]';
    bgStatus = 'bg-yellow-50 dark:bg-[#FCD535]/10';
    msg = `Significant risk: loss of approx ${pct.toFixed(0)}% of account. Beginners should reduce leverage or position size.`;
  }

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-10 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Calculator size={24} className="text-yellow-600 dark:text-[#00d084]" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">
          Leverage Calculator
        </h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">
          Interactive
        </span>
      </div>
      <div className="p-8">
        <Callout type="warn">
          This simulation assumes you use the total buying power allowed by the leverage. In reality, the loss also depends on position size, SL distance, and pip value.
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">
              Account ($)
            </label>
            <input
              type="number"
              value={balance}
              onChange={(event) => setBalance(Number(event.target.value) || 0)}
              className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">
              Leverage
            </label>
            <select
              value={leverage}
              onChange={(event) => setLeverage(Number(event.target.value))}
              className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"
            >
              <option value={1}>1:1</option>
              <option value={5}>1:5</option>
              <option value={10}>1:10</option>
              <option value={30}>1:30</option>
              <option value={50}>1:50</option>
              <option value={100}>1:100</option>
              <option value={500}>1:500 (very dangerous)</option>
            </select>
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">
              Adverse Move (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={move}
              onChange={(event) => setMove(Number(event.target.value) || 0)}
              className="w-full bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2B3139] rounded-xl p-4 text-[18.5px] text-black dark:text-white font-mono focus:border-yellow-500 dark:focus:border-[#FCD535] outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-[#378ADD]/10 p-5 rounded-2xl text-center border border-blue-100 dark:border-transparent">
            <div className="text-[14.5px] text-blue-700 dark:text-[#378ADD] font-bold uppercase mb-2">
              Controlled Value
            </div>
            <div className="text-xl md:text-2xl font-black text-blue-700 dark:text-[#378ADD] font-mono">
              ${controlled.toLocaleString()}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-[#F6465D]/10 p-5 rounded-2xl text-center border border-red-100 dark:border-transparent">
            <div className="text-[14.5px] text-red-700 dark:text-[#F6465D] font-bold uppercase mb-2">
              Simulated Loss
            </div>
            <div className="text-xl md:text-2xl font-black text-red-700 dark:text-[#F6465D] font-mono">
              ${loss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className={`${bgStatus} p-5 rounded-2xl text-center border border-transparent`}>
            <div className={`text-[14.5px] font-bold uppercase mb-2 ${statusColor}`}>
              % of Account
            </div>
            <div className={`text-xl md:text-2xl font-black font-mono ${statusColor}`}>
              {pct.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl text-[18.5px] leading-relaxed ${bgStatus} ${statusColor}`}>
          {msg}
        </div>
      </div>
    </div>
  );
};

const Candle = ({ bull = true, body = 40, top = 10, bottom = 10, doji = false }) => (
  <div className="flex flex-col items-center">
    <div className="w-[2px] bg-gray-400 dark:bg-[#6e7681]" style={{ height: top }} />
    <div
      className={`w-[24px] rounded-[4px] ${doji ? 'bg-gray-500 dark:bg-[#8b949e]' : bull ? 'bg-green-500 dark:bg-[#0ECB81]' : 'bg-red-500 dark:bg-[#F6465D]'}`}
      style={{ height: doji ? 4 : body }}
    />
    <div className="w-[2px] bg-gray-400 dark:bg-[#6e7681]" style={{ height: bottom }} />
  </div>
);

const CandleLab = () => {
  const candles = [
    {
      name: 'Strong Bullish (Bullish Marubozu)',
      label: 'Strong Bull',
      candle: <Candle bull body={64} top={6} bottom={4} />,
      desc: 'Long green body, very short or no shadows. Buyers dominate from start to finish. Strongest when appearing after a breakout or at a major support zone.',
    },
    {
      name: 'Strong Bearish (Bearish Marubozu)',
      label: 'Strong Bear',
      candle: <Candle bull={false} body={60} top={4} bottom={8} />,
      desc: 'Long red body, very short shadows. Sellers control the session. Strongest when breaking support or after bad news.',
    },
    {
      name: 'Doji',
      label: 'Doji',
      candle: <Candle doji top={30} bottom={30} />,
      desc: 'Open almost equals Close. Market is undecided. Doji is only valuable in context: after a long trend, at support/resistance, or before major news.',
    },
    {
      name: 'Hammer',
      label: 'Hammer',
      candle: <Candle bull body={30} top={6} bottom={42} />,
      desc: 'Small body at the top, lower shadow at least twice the body length. At support after a downtrend, a Hammer shows strong buyer counterattack.',
    },
    {
      name: 'Shooting Star',
      label: 'Shooting',
      candle: <Candle bull={false} body={28} top={42} bottom={6} />,
      desc: 'Small body at the bottom, long upper shadow. After an uptrend and at resistance, this warns that buyers failed to hold the high price.',
    },
    {
      name: 'Inverted Hammer',
      label: 'Inv. Hammer',
      candle: <Candle bull body={24} top={40} bottom={6} />,
      desc: 'Appears at a bottom, showing buyers started trying to push the price up but without full confirmation. Needs a bullish candle afterward.',
    },
    {
      name: 'Spinning Top',
      label: 'Spinning',
      candle: <Candle bull body={20} top={18} bottom={18} />,
      desc: 'Small body, relatively long shadows on both sides. A signal of indecision, often appearing before a period of high volatility.',
    },
    {
      name: 'Dragonfly Doji',
      label: 'Dragonfly',
      candle: <Candle doji top={2} bottom={50} />,
      desc: 'A Doji with a very long lower shadow and almost no upper shadow. At a bottom or support zone, this signals buyers absorbed selling pressure well.',
    },
  ];
  const [active, setActive] = useState(null);

  return (
    <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-10 shadow-md dark:shadow-xl transition-colors">
      <div className="text-[16.5px] font-bold text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-8">
        Visual Chart: click a candle to see its meaning
      </div>
      <div className="flex flex-wrap items-end justify-center gap-8 min-h-[140px] pb-6">
        {candles.map((item, index) => (
          <div
            key={item.name}
            onClick={() => setActive(index)}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 ${active !== null && active !== index ? 'opacity-30' : 'opacity-100'
              }`}
          >
            {item.candle}
            <div className="text-[14.5px] text-gray-500 dark:text-[#848E9C] mt-3 font-mono text-center leading-tight">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl min-h-[120px] transition-colors text-[18.5px] text-gray-800 dark:text-[#EAECEF] leading-[1.8] shadow-sm">
        {active === null ? (
          'Click on a candle above to see its detailed meaning.'
        ) : (
          <div className="animate-in fade-in">
            <div className="font-bold text-black dark:text-white text-[20.5px] mb-3">
              {candles[active].name}
            </div>
            <div>{candles[active].desc}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const candleQuizData = [
  {
    label: 'XAU/USD H4, support zone $1,980',
    candles: [
      { bull: true, top: 10, body: 42, bottom: 8 },
      { bull: false, top: 8, body: 36, bottom: 12 },
      { bull: false, top: 6, body: 34, bottom: 10 },
      { bull: false, top: 6, body: 30, bottom: 8 },
      { bull: true, top: 4, body: 22, bottom: 40 },
    ],
    q: 'The last candle appears at a support zone. What type of candle is this and what is its signal?',
    opts: [
      'Strong bullish candle, uptrend is definitely confirmed',
      'Hammer: buyers counterattack at support, potential reversal signal',
      'Doji, no signal at all',
      'Bearish candle, should keep selling',
    ],
    c: 1,
    explanation:
      'Long lower shadow, small body at the top, appearing at support after a drop. This is a Hammer. Still needs a confirmation candle before entry.',
  },
  {
    label: 'EUR/USD D1, after a long uptrend',
    candles: [
      { bull: true, top: 8, body: 44, bottom: 8 },
      { bull: true, top: 6, body: 38, bottom: 6 },
      { bull: true, top: 8, body: 46, bottom: 6 },
      { bull: true, top: 6, body: 40, bottom: 6 },
      { bull: false, top: 42, body: 22, bottom: 6 },
    ],
    q: 'After 4 consecutive bullish candles, a candle with a very long upper shadow and a small body at the bottom appears. What is the main signal?',
    opts: [
      'Uptrend will definitely continue',
      'Shooting Star: warns of a bearish reversal',
      'Normal candle, ignore completely',
      'Should buy because a long shadow means strength',
    ],
    c: 1,
    explanation:
      'A long upper shadow after an uptrend shows buyers pushed the price up but failed to hold it. This is a warning, not a blind SELL signal.',
  },
  {
    label: 'BTC/USD H4, after a downtrend at support',
    candles: [
      { bull: false, top: 10, body: 46, bottom: 8 },
      { bull: false, top: 8, body: 42, bottom: 10 },
      { bull: false, top: 8, body: 36, bottom: 10 },
      { bull: true, top: 24, body: 4, bottom: 24, doji: true },
      { bull: true, top: 8, body: 44, bottom: 8 },
    ],
    q: 'After a downtrend, a Doji appears at support, followed by a long-bodied bullish candle. How should you interpret this?',
    opts: [
      'SELL immediately because the previous trend was down',
      'Stay out, nothing noteworthy',
      'Can consider a BUY setup due to Doji at support + bullish confirmation candle',
      'Doji always means enter a trade immediately',
    ],
    c: 2,
    explanation:
      'Context matters more than a single candle: downtrend reaching support, Doji shows indecision, bullish candle confirms buyers have won control back.',
  },
  {
    label: 'EUR/USD H1, pullback in D1 uptrend',
    candles: [
      { bull: true, top: 8, body: 36, bottom: 8 },
      { bull: true, top: 10, body: 40, bottom: 8 },
      { bull: false, top: 8, body: 14, bottom: 8 },
      { bull: false, top: 6, body: 10, bottom: 8 },
      { bull: true, top: 24, body: 4, bottom: 24, doji: true },
    ],
    q: 'D1 is in an uptrend. On H1, price pulls back then prints a Doji. According to Top-Down Analysis, what is the logical next step?',
    opts: [
      'SELL because H1 just dropped a bit',
      'Wait for a bullish confirmation candle; if it appears, this could be a BUY opportunity following D1',
      'Ignore all Dojis during a pullback',
      'Enter SELL immediately when you see the Doji',
    ],
    c: 1,
    explanation:
      'D1 is the priority direction. An H1 pullback in a D1 uptrend is the context to look for BUYs, but you still need a confirmation candle.',
  },
];

const CandleQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = candleQuizData[current];

  const choose = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === q.c) setScore((prev) => prev + 1);
  };

  const next = () => {
    if (current === candleQuizData.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((prev) => prev + 1);
    setSelected(null);
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="border border-gray-200 dark:border-[#2B3139] bg-white dark:bg-[#181A20] rounded-3xl p-8 my-10 text-center shadow-lg">
        <div className="text-4xl font-black text-black dark:text-white mb-3">
          Chart Quiz: {score}/{candleQuizData.length}
        </div>
        <p className="text-gray-600 dark:text-[#848E9C] mb-6">
          {score >= 3
            ? 'You read the candle context quite well.'
            : 'You should review Hammer, Shooting Star, Doji and confirmation principles.'}
        </p>
        <button
          onClick={reset}
          className="bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:opacity-90 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-10 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl">
      <div className="bg-[#0B0E11] p-6 border-b border-[#2B3139]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[13.5px] font-black tracking-widest uppercase text-[#FCD535] mb-2">
              Scenario {current + 1} / {candleQuizData.length}
            </div>
            <div className="text-white font-bold">{q.label}</div>
          </div>
          <div className="text-[#848E9C] text-sm font-mono">Correct: {score}</div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-end justify-center gap-5 min-h-[150px] bg-[#111827] rounded-2xl p-6 mb-8">
          {q.candles.map((candle, index) => (
            <div key={index} className="flex flex-col items-center">
              <Candle {...candle} />
              {index === q.candles.length - 1 && (
                <div className="text-[13.5px] text-[#FCD535] mt-2 font-bold">This candle</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-lg md:text-xl font-bold text-black dark:text-white mb-6 leading-relaxed">
          {q.q}
        </div>
        <div className="flex flex-col gap-3">
          {q.opts.map((opt, index) => {
            const isChosen = selected === index;
            const isCorrect = selected !== null && index === q.c;
            const isWrong = selected !== null && isChosen && index !== q.c;
            let btnClass = 'border-gray-200 dark:border-[#2B3139] text-[#1C2C44] dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#FCD535]/5 bg-white dark:bg-transparent';
            if (isCorrect) btnClass = 'border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]';
            else if (isWrong) btnClass = 'border-transparent dark:border-[#F6465D] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#F6465D]/10 text-[#5A1A1A] dark:text-[#F6465D] shadow-[0_4px_15px_rgba(181,59,59,0.2)] dark:shadow-none relative overflow-hidden';
            else if (selected !== null) btnClass = 'border-[rgba(15,17,23,0.1)] dark:border-[#2B3139] text-[#9ba0ad] dark:text-[#64748B] opacity-50 cursor-not-allowed bg-white dark:bg-transparent';

            return (
              <button
                key={opt}
                disabled={selected !== null}
                onClick={() => choose(index)}
                className={`flex items-start gap-4 p-5 border-2 rounded-2xl text-left transition-all ${btnClass}`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 bg-gray-100 dark:bg-[#181A20]">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-[18.5px] leading-[1.7] mt-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div
            className={`mt-6 p-6 rounded-2xl text-[18.5px] leading-relaxed ${selected === q.c
                ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]'
                : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'
              }`}
          >
            <strong className="block text-lg mb-2">
              {selected === q.c ? 'Correct.' : 'Incorrect.'}
            </strong>
            {q.explanation}
          </div>
        )}

        <button
          disabled={selected === null}
          onClick={next}
          className="mt-6 w-full bg-[#FCD535] text-black py-4 rounded-2xl font-black uppercase tracking-widest disabled:opacity-30"
        >
          {current === candleQuizData.length - 1 ? 'See Results' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

const FinalQuiz = () => {
  const qs = [
    {
      q: 'Company A’s stock price rises continuously for 2 weeks before a good earnings report is announced. When the official report is out, the price drops. What is this phenomenon usually called?',
      opts: ['Market error', 'Buy the rumor, sell the news', 'Insider trading', 'Price bubble'],
      c: 1,
      exp: 'This is the "Buy the rumor, sell the news" phenomenon. The crowd buys in on good expectations, and when the official news comes out, early buyers take profits causing the price to drop.'
    },
    {
      q: 'You SELL EUR/USD at 1.0900, SL at 1.0930, TP at 1.0810. What is the R:R of this trade?',
      opts: ['1:1', '1:2', '1:3', '1:4'],
      c: 2,
      exp: 'SL distance: 1.0930 - 1.0900 = 30 pips. TP distance: 1.0900 - 1.0810 = 90 pips. Risk:Reward ratio = 30:90 = 1:3.'
    },
    {
      q: 'Which trading session usually has the highest liquidity during the day (Vietnam time)?',
      opts: ['5:00-9:00 Tokyo', '14:00-17:00 London morning', '19:00-23:00 London + New York overlap', '23:00-3:00 night'],
      c: 2,
      exp: 'The overlap between London and New York (19:00 - 23:00 VN time) is when both major financial centers are active, creating the highest liquidity and volatility.'
    },
    {
      q: 'Leverage 1:50 with a $2,000 account. If you use full margin and the price goes against you by 2%, what happens to the account?',
      opts: ['$40 loss', '$200 loss', 'Around $2,000 loss, almost blown entirely', '$100 loss'],
      c: 2,
      exp: 'With 1:50 leverage, a 2% market move is amplified to 2% * 50 = 100% against your account, which will result in blowing the account.'
    },
    {
      q: 'After a long uptrend, a candle with a very long upper shadow and a small body at the bottom appears at a resistance zone. What signal is this?',
      opts: ['Continue rising, buy now', 'Shooting Star, bearish reversal warning', 'Normal candle', 'Sell immediately without confirmation'],
      c: 1,
      exp: 'The long upper shadow shows buyers tried to push the price up but were overwhelmed by sellers. This is a Shooting Star pattern, warning of a potential bearish reversal.'
    },
    {
      q: 'Bid = 1.0848, Ask = 1.0851. What is the spread in pips?',
      opts: ['1 pip', '2 pips', '3 pips', '4 pips'],
      c: 2,
      exp: 'Spread = Ask - Bid = 1.0851 - 1.0848 = 0.0003, which equals 3 pips.'
    },
    {
      q: 'Account $5,000, you want to risk 1%. SL is 40 pips away from entry. What should be the maximum total pip value for the position?',
      opts: ['$0.50/pip', '$1.25/pip', '$2.00/pip', '$0.80/pip'],
      c: 1,
      exp: 'Risk 1% of $5,000 = $50. If SL = 40 pips, Pip Value = $50 / 40 = $1.25/pip. You should size your position so each pip is worth $1.25.'
    },
    {
      q: 'D1 is in a downtrend. On M15 there is a very beautiful bullish setup. According to Top-Down Analysis, what should you do?',
      opts: ['BUY immediately because M15 looks good', 'Do not BUY because it opposes D1', 'SELL based on D1 without a setup', 'Look at M1 to decide'],
      c: 1,
      exp: 'Top-Down Analysis rule: always trade in the direction of the higher timeframe (D1). If D1 is down, avoid BUY setups on smaller timeframes no matter how good they look.'
    },
    {
      q: 'A Doji appears after a long downtrend at strong support. What is the reasonable action?',
      opts: ['BUY immediately because Doji = reversal', 'Wait for a bullish confirmation candle then consider', 'Keep selling', 'Ignore because Doji is meaningless'],
      c: 1,
      exp: 'A Doji only shows market indecision, not a confirmed reversal. You must wait for a bullish confirmation candle afterward to enter safely.'
    },
    {
      q: 'How does a bull trap usually work?',
      opts: ['The market always continues in the breakout direction', 'Price breaks up to attract buyers, then reverses, leaving buyers trapped', 'Unrelated to liquidity', 'Only appears in stocks'],
      c: 1,
      exp: 'A bull trap is when price fakes a breakout above resistance to lure traders into buying, then sharply reverses downward, leaving recent buyers trapped.'
    },
  ];
  const [answers, setAnswers] = useState({});
  const [showRes, setShowRes] = useState(false);
  const score = Object.keys(answers).filter((key) => answers[key] === qs[key].c).length;

  const handleSelect = (qIdx, oIdx) => {
    if (showRes) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  return (
    <div className="mt-10">
      {qs.map((q, qIdx) => (
        <div
          key={q.q}
          className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 mb-6 shadow-sm dark:shadow-lg transition-colors"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              Question {qIdx + 1}
            </span>
          </div>
          <p className="text-lg font-bold text-black dark:text-white mb-6">{q.q}</p>
          <div className="grid grid-cols-1 gap-3">
            {q.opts.map((opt, oIdx) => {
              const isSelected = answers[qIdx] === oIdx;
              const isCorrect = showRes && q.c === oIdx;
              const isWrong = showRes && isSelected && q.c !== oIdx;
              let btnClass = 'border-gray-200 dark:border-[#2B3139] text-[#1C2C44] dark:text-[#EAECEF] hover:border-[#D4AF37] dark:hover:border-[#FCD535] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] dark:hover:shadow-none hover:bg-gradient-to-br hover:from-[#FDFBF7] hover:to-[#F3E5AB] dark:hover:bg-none dark:hover:bg-[#0B0E11] bg-white dark:bg-[#0B0E11]';
              if (isCorrect) btnClass = 'border-transparent dark:border-[#0ECB81] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#0ECB81]/10 text-[#1C2C44] dark:text-[#0ECB81] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]';
              if (isWrong) btnClass = 'border-transparent dark:border-[#F6465D] bg-gradient-to-br from-[#F5E6E6] to-[#E6BDBD] dark:bg-none dark:bg-[#F6465D]/10 text-[#5A1A1A] dark:text-[#F6465D] shadow-[0_4px_15px_rgba(181,59,59,0.2)] dark:shadow-none font-bold relative overflow-hidden';
              if (!showRes && isSelected) btnClass = 'border-transparent dark:border-[#378ADD] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] dark:bg-none dark:bg-[#378ADD]/10 text-[#1C2C44] dark:text-[#378ADD] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.4)] dark:shadow-none relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.8)_50%,transparent_75%)] before:bg-[length:250%_250%] before:animate-[pulse_2s_infinite]';

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(qIdx, oIdx)}
                  disabled={showRes}
                  className={`p-4 border-2 rounded-xl text-left text-[17.5px] transition-all ${btnClass}`}
                >
                  {String.fromCharCode(65 + oIdx)}. {opt}
                </button>
              );
            })}
          </div>
          {showRes && answers[qIdx] !== undefined && q.exp && (
             <div className={`mt-6 p-6 rounded-2xl text-[18.5px] leading-relaxed animate-in slide-in-from-top-2 ${answers[qIdx] === q.c ? 'bg-green-50 dark:bg-[#0ECB81]/10 text-green-800 dark:text-[#0ECB81]' : 'bg-red-50 dark:bg-[#F6465D]/10 text-red-800 dark:text-[#F6465D]'}`}>
               <strong className="block text-lg mb-2">{answers[qIdx] === q.c ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.exp}
             </div>
          )}
        </div>
      ))}

      <button
        onClick={() =>
          Object.keys(answers).length === qs.length
            ? setShowRes(true)
            : alert('Please answer all questions before submitting.')
        }
        className="w-full bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black py-5 rounded-2xl text-lg uppercase tracking-widest hover:brightness-110 shadow-lg mt-4"
      >
        Submit Quiz
      </button>

      {showRes && (
        <div className="p-10 bg-gradient-to-br from-white to-gray-50 dark:from-[#0B0E11] dark:to-[#181A20] border border-yellow-500 dark:border-[#FCD535] rounded-3xl text-center shadow-lg mt-8">
          <h2 className="text-4xl font-black text-black dark:text-white mb-4">
            Result: {score}/{qs.length}
          </h2>
          <p className="text-gray-600 dark:text-[#848E9C] text-[18.5px] mb-8">
            {score >= 7
              ? 'Target achieved. You have grasped enough foundation to move to Chapter 2.'
              : 'Failed to reach 7/10. You should re-read terms, leverage, Japanese candlesticks, and Top-Down Analysis.'}
          </p>
          <button
            onClick={() => {
              setAnswers({});
              setShowRes(false);
            }}
            className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:bg-black transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

const CHAPTER_1_DATA_EN = [
  {
    title: '1. What is a Market?',
    content: (
      <>
        <SectionHead
          icon={<Store />}
          title="What is a Market?"
          desc="Before learning how to make money from the market, let's understand what the market really is."
        />

        <StoryBox label="Real-life Example" icon={<ShoppingCart size={16} />}>
          Imagine a fish market. Sellers want high prices, buyers want low prices. When both parties agree on a price, a transaction occurs. Financial markets are the same: price is where buyers and sellers temporarily agree.
        </StoryBox>

        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">
          <strong>Financial markets</strong> are where participants buy and sell assets such as currencies, gold, stocks, crypto, commodities, or indices. You don't need to be in a physical location. Everything happens through exchanges, brokers, or electronic platforms.
        </p>
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">
          Prices don't move because someone wants them to go up or down. Prices move due to an imbalance between supply and demand, plus the future expectations of the crowd.
        </p>

        <CyberTable
          headers={['Concept', 'Simply Put', 'In Trading']}
          rows={[
            ['Supply', 'People who want to sell', 'The more sellers, the easier price drops'],
            ['Demand', 'People who want to buy', 'The more buyers, the easier price rises'],
            ['Price', 'Point of agreement', 'The final result of supply, demand, and expectations'],
            ['Liquidity', 'Is the market crowded?', 'High liquidity makes entry/exit easier, usually with lower spreads'],
          ]}
        />

        <SectionHead icon={<Brain />} title="Price Reflects Expectations" />
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">
          Markets usually react before official news. If everyone expects a company to have a good report, the price might have already gone up before the release. When the actual news aligns with expectations, the price might still drop because early buyers take profit.
        </p>
        <Callout type="tip">
          This is the reason for the saying "buy the rumor, sell the news." Not all good news makes the price go up after it's published.
        </Callout>

        <SimpleQuiz
          q="US CPI is forecasted to be very high. When published, CPI is still high but lower than the forecast. Gold surges. Why?"
          opts={[
            'Because bad news always makes gold go up',
            'Because the market expected higher inflation. The actual number being lower than expected is a positive surprise for gold',
            'Gold always goes up regardless of news',
            'Because people buy gold without understanding the news',
          ]}
          correctIdx={1}
          explanation='Markets trade the difference between expectations and reality. "High" news that is lower than expected can still be seen as positive.'
        />
      </>
    ),
  },
  {
    title: '2. Types of Financial Markets',
    content: (
      <>
        <SectionHead
          icon={<Globe />}
          title="Types of Financial Markets"
          desc="You don't need to know everything. Focus on the most important markets and their characteristics."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
          {[
            ['Forex', '24/5. Currency trading. Very high liquidity.', 'EUR/USD, GBP/USD, USD/JPY'],
            ['Crypto', '24/7. High volatility, lots of noise, suits risk-tolerant traders.', 'BTC, ETH, SOL'],
            ['Gold', 'Usually traded via CFD/futures. Sensitive to USD, interest rates, geopolitics.', 'XAU/USD'],
            ['Stocks', 'Fixed trading hours. Depends on the company and cash flow.', 'AAPL, NVDA, VIC'],
            ['Indices', 'Represents a basket of stocks. Good for reading overall market health.', 'S&P 500, NASDAQ, VNINDEX'],
            ['Commodities', 'Depends on physical supply/demand, seasons, geopolitics.', 'Oil, Silver, Agriculture'],
          ].map(([name, desc, examples]) => (
            <div
              key={name}
              className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"
            >
              <div className="font-bold text-black dark:text-white text-lg mb-2">{name}</div>
              <div className="text-[17.5px] text-gray-500 dark:text-[#848E9C] leading-relaxed mb-3">
                {desc}
              </div>
              <div className="text-[14.5px] font-mono text-[#378ADD]">{examples}</div>
            </div>
          ))}
        </div>

        <CyberTable
          headers={['Feature', 'Forex', 'Crypto', 'Gold (XAU/USD)']}
          rows={[
            ['Trading Hours', '24/5', '24/7', '24/5 via CFD broker, futures or spot depending on market'],
            ['Liquidity', 'Very high on major pairs', 'High on BTC/ETH, lower on small altcoins', 'Very high but can spike wildly during news'],
            ['Volatility', 'Moderate', 'Very high', 'Higher than major forex, lower than many altcoins'],
            ['Beginner Friendly?', 'Good if focusing on majors', 'Careful due to volatility and FOMO psychology', 'Good for learning price action, but strict risk management is required'],
          ]}
        />

        <Callout type="ok">
          Reasonable path: Start with a few familiar markets like XAU/USD, EUR/USD, or BTC. Don't open 20 charts at once when your foundation is still weak.
        </Callout>

        <SectionHead icon={<Clock />} title="Intraday Trading Sessions" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="border border-gray-200 dark:border-[#2B3139] bg-white dark:bg-transparent p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-gray-500 dark:text-[#848E9C] mb-2 uppercase tracking-wider font-bold">
              Sydney / Tokyo
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">5:00-14:00 VN</div>
            <div className="text-[16.5px] text-gray-500 dark:text-[#64748B] mt-2">Usually less volatile.</div>
          </div>
          <div className="border border-yellow-200 dark:border-[#FCD535]/30 bg-yellow-50 dark:bg-[#FCD535]/5 p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-yellow-700 dark:text-[#FCD535] mb-2 uppercase tracking-wider font-bold">
              London
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">14:00-23:00 VN</div>
            <div className="text-[16.5px] text-yellow-700 dark:text-[#FCD535] mt-2">Liquidity increases, EUR/GBP are very active.</div>
          </div>
          <div className="border-2 border-yellow-400 dark:border-[#FCD535]/50 bg-yellow-100 dark:bg-[#FCD535]/10 p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-yellow-800 dark:text-[#FCD535] mb-2 uppercase tracking-wider font-bold">
              New York
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">19:00-24:00+ VN</div>
            <div className="text-[16.5px] text-yellow-800 dark:text-[#FCD535] mt-2">USD dominates, US news usually causes massive volatility.</div>
          </div>
          <div className="border border-blue-200 dark:border-[#378ADD]/30 bg-blue-50 dark:bg-[#378ADD]/5 p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-blue-700 dark:text-[#378ADD] mb-2 uppercase tracking-wider font-bold">
              London + New York overlap
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">19:00-23:00 VN</div>
            <div className="text-[16.5px] text-blue-700 dark:text-[#378ADD] mt-2">Usually the highest liquidity zone of the day.</div>
          </div>
        </div>

        <Callout type="warn">
          Session times are only approximations. London/New York have daylight saving time, and brokers also have their own server times. When trading real money, double-check the session times and economic calendar.
        </Callout>

        <MatchGame />
      </>
    ),
  },
  {
    title: '3. Who Participates in the Market?',
    content: (
      <>
        <SectionHead
          icon={<Landmark />}
          title="Who really moves the market?"
          desc="Know your opponents. The market isn't fair, but understanding the rules helps you avoid being passive."
        />

        <div className="space-y-5 mb-8">
          {[
            ['Central Banks', 'Fed, ECB, BOJ, SBV...', 'Strong impact via interest rates, monetary policy, and speeches. This group creates major macro shifts.'],
            ['Large Financial Institutions', 'Banks, hedge funds, market makers', 'Trade massive volumes, need liquidity to enter/exit positions. They often do not trade like retail traders.'],
            ['Corporations and Investment Funds', 'Hedging, investing, portfolio rebalancing', 'May trade for business needs or capital allocation, not just technical signals.'],
            ['Retail Traders', 'You, me, small traders', 'Small volume, advantage is flexibility. Disadvantage is being prone to FOMO, overtrading, and delayed reactions.'],
          ].map(([title, meta, desc]) => (
            <div
              key={title}
              className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl shadow-sm dark:shadow-none"
            >
              <h4 className="text-black dark:text-white font-bold text-lg mb-2">
                {title} <span className="text-gray-500 dark:text-[#848E9C] text-[16.5px] font-medium ml-2">{meta}</span>
              </h4>
              <p className="text-gray-600 dark:text-[#848E9C] text-[17.5px] leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>

        <StoryBox label="Liquidity is the Battlefield" icon={<AlertTriangle size={16} />}>
          Large institutions cannot enter or exit huge positions just anywhere. They need zones with many pending orders, stop losses, or FOMO cash flows. Therefore, many beautiful breakouts can become bull traps: price breaks up to lure buyers, then reverses, trapping them.
        </StoryBox>

        <Callout type="tip">
          Not all breakouts are traps. The lesson is not to chase blindly. Wait for clear closes, volume confirmation, or a reasonable retest.
        </Callout>

        <SimpleQuiz
          q="EUR/USD price just broke above the 1.1000 resistance. Many retail traders FOMO BUY immediately. Then price reverses sharply below 1.1000. What is the most logical interpretation?"
          opts={[
            'Breakouts are always right, just hold the trade',
            'Could be a bull trap: price lured buyers then reversed',
            'Retail always beats institutions',
            'No need to care about liquidity',
          ]}
          correctIdx={1}
          explanation="A bull trap occurs when price breaks up, enticing buyers, then reverses leaving them trapped. Don't jump to conclusions, but be aware of this risk."
        />
      </>
    ),
  },
  {
    title: '4. Core Terminology',
    content: (
      <>
        <SectionHead
          icon={<BookOpen />}
          title="12 Must-Know Terms"
          desc="Learn once, use forever. Each term is explained in simple language first."
        />

        <TermCard
          name="BID / ASK"
          eng="Buying / Selling price of the broker"
          simple="<strong>Bid</strong> is the price the market is willing to buy from you. <strong>Ask</strong> is the price the market is willing to sell to you."
          example="EUR/USD Bid 1.0850 / Ask 1.0852. If you BUY now, you fill at Ask 1.0852. If you SELL now, you fill at Bid 1.0850."
        />
        <TermCard
          name="SPREAD"
          eng="Hidden transaction cost"
          simple="Spread = Ask - Bid. This is the difference you pay when entering a market order."
          example="Bid 1.0848, Ask 1.0851. Spread = 3 pips. Just after entering, you are usually slightly negative due to the spread."
        />
        <TermCard
          name="PIP"
          eng="Unit of price change"
          simple="Pip is a common small unit to measure price movement in forex. For most forex pairs, 1 pip is 0.0001."
          example="EUR/USD moving from 1.0850 to 1.0851 is an increase of 1 pip. For gold/crypto/stocks, calculating points/pips may differ by broker."
        />
        <TermCard
          name="LOT"
          eng="Trading volume"
          simple="Lot is the position size. A standard lot is usually 100,000 units, mini lot 10,000, micro lot 1,000."
          example="Beginners should start small. Don't use large lots just because your account has enough margin."
        />
        <TermCard
          name="LONG / SHORT"
          eng="Buy / Sell"
          simple="<strong>Long</strong> means expecting the price to rise. <strong>Short</strong> means expecting the price to fall."
          example="If you BUY XAU/USD at 2000 and price goes up to 2010, the long trade profits. If you SELL and price goes down, the short trade profits."
        />
        <TermCard
          name="STOP LOSS (SL)"
          eng="Stop loss point"
          simple="Stop Loss is an order to close the position when the market goes against you to your accepted loss limit."
          example="Buy gold at $2,000, SL at $1,990. If price hits SL, the system closes the trade to limit losses."
        />
        <TermCard
          name="TAKE PROFIT (TP)"
          eng="Take profit point"
          simple="Take Profit is an order to close the position when reaching the profit target."
          example="BUY at 2,000, TP 2,030. When price hits 2,030, the trade takes profit automatically."
        />
        <TermCard
          name="RISK:REWARD (R:R)"
          eng="Risk / Reward ratio"
          simple="R:R answers: if wrong, how much lost; if right, how much gained. R:R 1:2 means risking 1 to expect a reward of 2."
          example="SL is 30 pips away, TP is 90 pips away. R:R = 1:3."
        />
        <TermCard
          name="DRAWDOWN (DD)"
          eng="Drop from peak account equity"
          simple="Drawdown measures the percentage drop from the highest recent account peak."
          example="Account grows from $10,000 to $12,000 then drops to $9,600. The drawdown from the peak is 20%."
        />
        <TermCard
          name="MARGIN CALL"
          eng="Low margin warning"
          simple="Margin Call occurs when the account doesn't have enough margin to maintain open positions. The broker may ask for more funds or close trades."
          example="Using too much leverage, market moves fast against you, equity drops sharply. Broker closes trades to limit systemic risk."
        />
        <TermCard
          name="BULLISH / BEARISH"
          eng="Upward / Downward bias"
          simple="<strong>Bullish</strong> means expecting price to go up. <strong>Bearish</strong> means expecting price to go down."
          example="Lower than expected interest rates might be bearish for USD and bullish for Gold, depending on context."
        />
        <TermCard
          name="VOLATILITY"
          eng="Price fluctuation"
          simple="Volatility is how violently the price moves. High volatility creates opportunities but also makes SL easier to be hit."
          example="BTC usually has higher volatility than EUR/USD. With the same strategy, position size must be smaller if the market is highly volatile."
        />

        <SimpleQuiz
          q="You BUY EUR/USD at 1.0850. SL = 1.0820, TP = 1.0940. What is the R:R?"
          opts={['1:1', '1:2', '1:3', '1:4']}
          correctIdx={2}
          explanation="Risk = 30 pips. Reward = 90 pips. R:R = 30:90 = 1:3."
        />
      </>
    ),
  },
  {
    title: '5. Leverage & Margin',
    content: (
      <>
        <SectionHead
          icon={<Zap />}
          title="Leverage: the most dangerous double-edged sword"
          desc="Leverage helps control a position larger than real capital, but it also magnifies losses."
        />

        <StoryBox label="Real Estate Example" icon={<Home size={16} />}>
          You have $10,000 and want to buy a $100,000 house. The bank lends you 90%, meaning you use 1:10 leverage. House goes up 10%, you make $10,000 on your $10,000 capital. House drops 10%, you lose all capital. Trading is similar, but moves can happen in minutes.
        </StoryBox>

        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">
          Leverage itself doesn't make you lose. What blows accounts is using too large a position size for the account and not having a clear stop loss. With the same 1:100 leverage, someone risking 1% per trade is entirely different from someone using full margin.
        </p>

        <LeverageSim />

        <CyberTable
          headers={['Concept', 'Meaning', 'Risk']}
          rows={[
            ['Leverage', 'Borrowing buying power to control a larger position', 'Magnifies both profit and loss'],
            ['Margin', 'Deposit required to open/hold a position', 'Not enough margin can cause broker to close trades'],
            ['Position size', 'The actual volume you enter', 'The deciding factor for actual profit/loss along with SL'],
            ['Risk per trade', 'Amount willing to lose if SL is hit', 'Beginners should keep it around 0.5%-1% per trade'],
          ]}
        />

        <Callout type="bad">
          Recommendation for beginners: use low leverage, small lots, always have SL. Advertised 1:500 or 1:1000 leverage is not an edge if you haven't mastered position sizing.
        </Callout>

        <ExerciseBox
          title="Calculate actual leverage"
          desc="Calculate it yourself before entering. If you can't calculate the risk, don't enter."
          steps={[
            { d: 'Account $500, leverage 1:100, open position worth $10,000. Price moves against by 1%. What is the assumed loss?' },
            { d: 'Account $2,000, you only want to risk 1% = $20. If SL is $10 from entry, what is the max volume in units?' },
            { d: 'Compare two trades with same setup but one uses 0.01 lot, one uses 0.10 lot. Same leverage, but how does the actual risk differ?' },
          ]}
        />
      </>
    ),
  },
  {
    title: '6. Reading Japanese Candlesticks',
    content: (
      <>
        <SectionHead
          icon={<Flame />}
          title="Reading Candlesticks: The Language of the Market"
          desc="All information of a session is compressed into a candle: open, high, low, and close."
        />

        {/* Annotated Candle Diagram */}
        <div className="bg-[#0d1117] rounded-2xl p-6 my-8 overflow-x-auto border border-gray-800">
          <div className="text-[13.5px] text-gray-400 font-mono uppercase tracking-widest mb-4">// Anatomy of a candlestick — Click/hover to explore</div>
          <svg viewBox="0 0 600 240" className="w-full h-auto min-w-[420px]" role="img" aria-label="Annotated candlestick diagram">
            {/* Wicks */}
            <line x1="200" y1="20" x2="200" y2="70" stroke="#00d084" strokeWidth="2.5" />
            <line x1="200" y1="170" x2="200" y2="210" stroke="#00d084" strokeWidth="2.5" />
            {/* Candle body */}
            <rect x="182" y="70" width="36" height="100" fill="#00d084" rx="4" />
            {/* H annotation */}
            <line x1="200" y1="20" x2="340" y2="20" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="12" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="25" fill="#e8eaf0" fontSize="12" fontFamily="monospace">← Highest Price (H) = $2,050</text>
            {/* C annotation */}
            <line x1="218" y1="70" x2="340" y2="70" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="62" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="75" fill="#00d084" fontSize="12" fontFamily="monospace" fontWeight="bold">← Close (C) = $2,040</text>
            {/* O annotation */}
            <line x1="218" y1="170" x2="340" y2="155" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="147" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="160" fill="#e8eaf0" fontSize="12" fontFamily="monospace">← Open (O) = $1,990</text>
            {/* L annotation */}
            <line x1="200" y1="210" x2="340" y2="210" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="202" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="215" fill="#e8eaf0" fontSize="12" fontFamily="monospace">← Lowest Price (L) = $1,975</text>
            {/* Labels left side */}
            <text x="60" y="25" fill="#9ca3b0" fontSize="11" fontFamily="monospace" textAnchor="middle">High</text>
            <text x="60" y="125" fill="#00d084" fontSize="11" fontFamily="monospace" textAnchor="middle">Body</text>
            <text x="60" y="140" fill="#9ca3b0" fontSize="10" fontFamily="monospace" textAnchor="middle">(C - O)</text>
            <text x="60" y="215" fill="#9ca3b0" fontSize="11" fontFamily="monospace" textAnchor="middle">Low</text>
            {/* Brace lines left */}
            <line x1="160" y1="20" x2="148" y2="20" stroke="#5a6275" strokeWidth="1.5" />
            <line x1="148" y1="20" x2="148" y2="210" stroke="#5a6275" strokeWidth="1.5" />
            <line x1="148" y1="210" x2="160" y2="210" stroke="#5a6275" strokeWidth="1.5" />
            <line x1="148" y1="115" x2="100" y2="115" stroke="#5a6275" strokeWidth="1.5" />
            {/* Info box bottom */}
            <rect x="10" y="225" width="350" height="12" fill="#00d08410" rx="3" />
            <text x="16" y="234" fill="#00d084" fontSize="10" fontFamily="monospace">BULLISH CANDLE — Close (C) higher than Open (O). Green body.</text>
          </svg>
        </div>

        <CyberTable
          headers={['Symbol', 'Full Name', 'Meaning']}
          rows={[
            ["<span class='bg-gray-200 dark:bg-[#e8e4da] text-gray-800 dark:text-[#2a2e3a] px-2 py-1 rounded'>O</span>", 'Open', 'First traded price of the session'],
            ["<span class='bg-green-100 dark:bg-[#d4eddf] text-green-700 dark:text-[#2d7a4f] px-2 py-1 rounded'>H</span>", 'High', 'Highest price, shows the area buyers pushed to'],
            ["<span class='bg-red-100 dark:bg-[#fae0e0] text-red-700 dark:text-[#b53b3b] px-2 py-1 rounded'>L</span>", 'Low', 'Lowest price, shows the area sellers pulled down to'],
            ["<span class='bg-blue-100 dark:bg-[#dce8fa] text-blue-700 dark:text-[#2a5fad] px-2 py-1 rounded'>C</span>", 'Close', '<strong>Most important</strong>, as it tells who holds the advantage when the session ends'],
          ]}
        />

        <CandleLab />

        <Callout type="tip">
          Principle: long body = strong pressure, short body/Doji = indecision, long shadow = price rejection. But a single candle isn't enough to enter. Always read with the trend, support/resistance, and confirmation candles.
        </Callout>

        <CandleQuiz />
      </>
    ),
  },
  {
    title: '7. Timeframes',
    content: (
      <>
        <SectionHead
          icon={<Telescope />}
          title="Timeframes: Map vs Satellite Image"
          desc="The same market looks like a completely different story on different timeframes."
        />

        <StoryBox label="Analogy" icon={<Map size={16} />}>
          Driving from New York to LA, you need a national map for the big picture, then a street map to find the local road. Trading is the same: big timeframe for context, small timeframe for entry.
        </StoryBox>

        {/* Timeframe Table */}
        <div className="my-8">
          <h4 className="text-[#0f1117] dark:text-[#e8eaf0] font-bold text-xl mb-4 transition-colors">Timeframe Table</h4>
          <div className="overflow-x-auto border border-[rgba(15,17,23,0.18)] dark:border-[rgba(255,255,255,0.13)] rounded-xl">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[#f2f0ea] dark:bg-[#1e2535] text-[#636878] dark:text-[#9ca3b0] text-[13.5px] font-mono uppercase tracking-[0.15em] border-b border-[rgba(15,17,23,0.18)] dark:border-[rgba(255,255,255,0.13)]">
                  <th className="p-4">Timeframe</th>
                  <th className="p-4">1 Candle = ?</th>
                  <th className="p-4">Main Purpose</th>
                  <th className="p-4">Trader Type</th>
                  <th className="p-4">Hold Time</th>
                </tr>
              </thead>
              <tbody className="text-[16px] text-[#2a2e3a] dark:text-[#9ca3b0]">
                {[
                  ['MN', '1 month', 'Long-term macro trend', 'Position trader', 'Months - Years', false],
                  ['W1', '1 week', 'Major trend context', 'Long-term Swing', 'Weeks - Months', false],
                  ['D1 ⭐', '1 day', 'Confirm main trend — CORE TIMEFRAME', 'Swing trader', 'Days - Weeks', true],
                  ['H4 ⭐', '4 hours', 'Find pullback zones & entry setups', 'Day trader / Swing', 'Hours - Days', true],
                  ['H1', '1 hour', 'Fine-tune entry', 'Day trader', 'Hours', false],
                  ['M15 / M5', '15 / 5 mins', 'Entry precision, check spread', 'Scalper / Day trader', '15 mins - Hours', false],
                  ['M1', '1 minute', 'Pure scalping, lots of noise', 'Pro Scalper', 'Minutes', false],
                ].map(([tf, candle, purpose, trader, hold, highlight]) => (
                  <tr key={tf} className={`border-b border-[rgba(15,17,23,0.08)] dark:border-[rgba(255,255,255,0.06)] last:border-0 transition-colors ${highlight
                      ? 'bg-[#d97706]/15/50 dark:bg-[#d97706]/10 font-semibold text-[#0f1117] dark:text-[#e8eaf0]'
                      : 'hover:bg-[#faf9f6] dark:hover:bg-[rgba(255,255,255,0.02)]'
                    }`}>
                    <td className={`p-4 font-mono font-bold ${highlight ? 'text-[#d97706] dark:text-[#f5a623]' : 'text-[#0f1117] dark:text-[#e8eaf0]'}`}>{tf}</td>
                    <td className="p-4">{candle}</td>
                    <td className="p-4 leading-snug">{purpose}</td>
                    <td className="p-4">{trader}</td>
                    <td className="p-4">{hold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[15.5px] text-[#636878] dark:text-[#5a6275] mt-3 font-mono">⭐ D1 and H4 are the two core timeframes in our system.</p>
        </div>

        <div className="my-8">
          <h4 className="text-black dark:text-white font-bold text-xl mb-6 transition-colors">
            Top-Down Analysis: mandatory process
          </h4>
          <div className="space-y-4">
            {[
              ['1', 'Open D1', 'Identify main trend: uptrend, downtrend, or sideway. Draw major support/resistance.'],
              ['2', 'Drop to H4', 'Find zones for potential pullbacks, retests, or confluences with EMA/Fibonacci/SR.'],
              ['3', 'Go to H1/M15 to enter', 'Look for confirmation candles or clear setups. Do not use M15 to trade against D1.'],
            ].map(([n, title, desc]) => (
              <div
                key={n}
                className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2B3139] p-6 rounded-2xl flex gap-5 items-center shadow-sm dark:shadow-none transition-colors"
              >
                <span className="w-10 h-10 rounded-xl bg-yellow-400 dark:bg-[#FCD535] text-black font-black flex items-center justify-center shrink-0 text-lg">
                  {n}
                </span>
                <div>
                  <strong className="text-black dark:text-white block text-lg mb-1 transition-colors">
                    {title}
                  </strong>
                  <span className="text-[17.5px] text-gray-500 dark:text-[#848E9C] transition-colors">
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Callout type="warn">
          Classic mistake: D1 is in a downtrend but M15 prints a nice bullish candle, so you BUY immediately. The result is usually buying right at the top of a retracement wave.
        </Callout>

        <ExerciseBox
          title="Observe Top-Down Analysis on XAU/USD"
          desc="Practice on TradingView or your broker's chart."
          steps={[
            { d: 'Open D1, identify the main trend and the 2 closest S/R zones.' },
            { d: 'Switch to H4, find the zone where price is pulling back or retesting.' },
            { d: 'Drop to H1/M15, only look for entries in the D1 direction. If setup opposes D1, note it but skip it.' },
          ]}
        />

        <SimpleQuiz
          q="D1 is in a clear downtrend. On M15 there is a very nice BUY setup with R:R 1:3. What should you do?"
          opts={['BUY immediately because R:R is good', 'Do not BUY because it opposes D1', 'Enter small size just for fun', 'Switch to M1 to get a better entry']}
          correctIdx={1}
          explanation="D1 provides the main context. Small setups opposing the higher timeframe are usually just retracements and highly risky for beginners."
        />
      </>
    ),
  },
  {
    title: '8. Final Quiz',
    content: (
      <>
        <SectionHead
          icon={<Star />}
          title="Chapter 1 Final Quiz"
          desc="10 questions covering theory, calculations, and real-world scenarios. Goal: score at least 7/10."
        />
        <FinalQuiz />
      </>
    ),
  },
];

export default CHAPTER_1_DATA_EN;
