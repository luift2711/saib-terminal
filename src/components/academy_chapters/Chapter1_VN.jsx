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
    { id: 0, t: 'Mở 24/7, không có sàn giao dịch trung tâm' },
    { id: 1, t: 'Giao dịch qua sàn chứng khoán Việt Nam' },
    { id: 2, t: 'Cặp forex thanh khoản cao, spread thường thấp' },
    { id: 3, t: 'Tài sản trú ẩn khi thị trường bất ổn' },
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
    if (matched.length === 4) return 'Hoàn thành. Bạn đã ghép đúng toàn bộ 4 cặp.';
    if (flash) return 'Chưa đúng, thử lại.';
    return `Chọn một mục bên trái, rồi một mục bên phải để ghép cặp. (${matched.length}/4)`;
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
        Bài tập: Ghép đúng thị trường và đặc điểm
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-xs text-gray-500 dark:text-[#848E9C] uppercase tracking-widest font-bold mb-4">
            Thị trường
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
            Đặc điểm
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
  let msg = `Rủi ro hợp lý trong giả định bạn dùng toàn bộ sức mua: lỗ khoảng ${pct.toFixed(1)}% tài khoản.`;

  if (pct >= 100) {
    statusColor = 'text-red-700 dark:text-[#F6465D]';
    bgStatus = 'bg-red-50 dark:bg-[#F6465D]/10';
    msg = `Account blown trong mô phỏng này: nếu dùng toàn bộ sức mua ${leverage}:1, giá đi ngược ${move}% có thể xóa toàn bộ tài khoản $${balance.toLocaleString()}.`;
  } else if (pct >= 50) {
    statusColor = 'text-red-700 dark:text-[#F6465D]';
    bgStatus = 'bg-red-50 dark:bg-[#F6465D]/10';
    msg = `Rủi ro rất cao: với giả định dùng toàn bộ sức mua, bạn có thể mất khoảng ${pct.toFixed(0)}% tài khoản.`;
  } else if (pct >= 10) {
    statusColor = 'text-yellow-700 dark:text-[#FCD535]';
    bgStatus = 'bg-yellow-50 dark:bg-[#FCD535]/10';
    msg = `Rủi ro đáng kể: lỗ khoảng ${pct.toFixed(0)}% tài khoản. Người mới nên giảm leverage hoặc giảm position size.`;
  }

  return (
    <div className="border border-gray-200 dark:border-[#2B3139] rounded-3xl overflow-hidden my-10 bg-gray-50 dark:bg-[#0B0E11] shadow-md dark:shadow-xl transition-colors">
      <div className="bg-white dark:bg-[#181A20] p-6 flex items-center gap-4 border-b border-gray-200 dark:border-[#2B3139] transition-colors">
        <Calculator size={24} className="text-yellow-600 dark:text-[#00d084]" />
        <h3 className="font-bold text-black dark:text-white text-lg flex-1">
          Máy tính Leverage
        </h3>
        <span className="text-xs bg-yellow-100 dark:bg-[#FCD535]/20 text-yellow-800 dark:text-[#FCD535] px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">
          Interactive
        </span>
      </div>
      <div className="p-8">
        <Callout type="warn">
          Mô phỏng này giả định bạn dùng toàn bộ sức mua mà leverage cho phép. Trong thực tế, lỗ còn phụ thuộc vào khối lượng vào lệnh, khoảng cách SL và pip value.
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">
              Tài khoản ($)
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
              Đòn bẩy
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
              <option value={500}>1:500 (rất nguy hiểm)</option>
            </select>
          </div>
          <div>
            <label className="text-[15.5px] text-gray-500 dark:text-[#848E9C] uppercase font-bold mb-2 block">
              Giá đi ngược (%)
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
              Giá trị kiểm soát
            </div>
            <div className="text-xl md:text-2xl font-black text-blue-700 dark:text-[#378ADD] font-mono">
              ${controlled.toLocaleString()}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-[#F6465D]/10 p-5 rounded-2xl text-center border border-red-100 dark:border-transparent">
            <div className="text-[14.5px] text-red-700 dark:text-[#F6465D] font-bold uppercase mb-2">
              Lỗ giả định
            </div>
            <div className="text-xl md:text-2xl font-black text-red-700 dark:text-[#F6465D] font-mono">
              ${loss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className={`${bgStatus} p-5 rounded-2xl text-center border border-transparent`}>
            <div className={`text-[14.5px] font-bold uppercase mb-2 ${statusColor}`}>
              % tài khoản mất
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
      name: 'Nến tăng mạnh (Bullish Marubozu)',
      label: 'Tăng mạnh',
      candle: <Candle bull body={64} top={6} bottom={4} />,
      desc: 'Thân xanh dài, bóng rất ngắn hoặc gần như không có. Phe mua áp đảo từ đầu đến cuối phiên. Mạnh nhất khi xuất hiện sau breakout hoặc tại vùng hỗ trợ quan trọng.',
    },
    {
      name: 'Nến giảm mạnh (Bearish Marubozu)',
      label: 'Giảm mạnh',
      candle: <Candle bull={false} body={60} top={4} bottom={8} />,
      desc: 'Thân đỏ dài, bóng rất ngắn. Phe bán kiểm soát phiên. Mạnh nhất khi phá vỡ hỗ trợ hoặc xuất hiện sau tin xấu.',
    },
    {
      name: 'Doji thập tự',
      label: 'Doji',
      candle: <Candle doji top={30} bottom={30} />,
      desc: 'Open gần bằng Close. Thị trường lưỡng lự. Doji chỉ có giá trị khi đặt trong bối cảnh: sau trend dài, tại hỗ trợ/kháng cự, hoặc trước vùng tin lớn.',
    },
    {
      name: 'Hammer',
      label: 'Hammer',
      candle: <Candle bull body={30} top={6} bottom={42} />,
      desc: 'Thân nhỏ ở phía trên, bóng dưới dài ít nhất 2 lần thân nến. Tại hỗ trợ sau downtrend, Hammer cho thấy phe mua phản công mạnh.',
    },
    {
      name: 'Shooting Star',
      label: 'Shooting',
      candle: <Candle bull={false} body={28} top={42} bottom={6} />,
      desc: 'Thân nhỏ ở phía dưới, bóng trên dài. Sau uptrend và tại kháng cự, đây là cảnh báo phe mua đã thất bại trong việc giữ giá cao.',
    },
    {
      name: 'Inverted Hammer',
      label: 'Búa ngược',
      candle: <Candle bull body={24} top={40} bottom={6} />,
      desc: 'Xuất hiện ở đáy, cho thấy lực mua đã bắt đầu thử kéo giá lên nhưng chưa đủ xác nhận. Cần nến tăng sau đó.',
    },
    {
      name: 'Spinning Top',
      label: 'Spinning',
      candle: <Candle bull body={20} top={18} bottom={18} />,
      desc: 'Thân nhỏ, bóng hai đầu tương đối dài. Tín hiệu lưỡng lự, thường xuất hiện trước giai đoạn biến động mạnh.',
    },
    {
      name: 'Dragonfly Doji',
      label: 'Dragonfly',
      candle: <Candle doji top={2} bottom={50} />,
      desc: 'Doji có bóng dưới rất dài và gần như không có bóng trên. Tại đáy hoặc vùng hỗ trợ, đây là tín hiệu phe mua hấp thụ lực bán tốt.',
    },
  ];
  const [active, setActive] = useState(null);

  return (
    <div className="bg-gray-50 dark:bg-[#0B0E11] border border-gray-200 dark:border-[#2B3139] rounded-3xl p-8 my-10 shadow-md dark:shadow-xl transition-colors">
      <div className="text-[16.5px] font-bold text-gray-500 dark:text-[#848E9C] uppercase tracking-widest mb-8">
        Biểu đồ minh họa: click vào nến để xem ý nghĩa
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
          'Nhấp vào một cây nến bên trên để xem ý nghĩa chi tiết.'
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
    label: 'XAU/USD H4, khu vực hỗ trợ $1,980',
    candles: [
      { bull: true, top: 10, body: 42, bottom: 8 },
      { bull: false, top: 8, body: 36, bottom: 12 },
      { bull: false, top: 6, body: 34, bottom: 10 },
      { bull: false, top: 6, body: 30, bottom: 8 },
      { bull: true, top: 4, body: 22, bottom: 40 },
    ],
    q: 'Cây nến cuối cùng xuất hiện ở vùng hỗ trợ. Đây là loại nến gì và tín hiệu của nó là gì?',
    opts: [
      'Nến tăng mạnh, xu hướng tăng đã chắc chắn xác nhận',
      'Hammer: phe mua phản công tại hỗ trợ, tín hiệu đảo chiều tiềm năng',
      'Doji, không có tín hiệu gì',
      'Nến giảm, nên SELL tiếp',
    ],
    c: 1,
    explanation:
      'Bóng dưới dài, thân nhỏ ở phía trên, xuất hiện tại hỗ trợ sau nhịp giảm. Đây là Hammer. Vẫn cần nến xác nhận trước khi vào lệnh.',
  },
  {
    label: 'EUR/USD D1, sau uptrend dài',
    candles: [
      { bull: true, top: 8, body: 44, bottom: 8 },
      { bull: true, top: 6, body: 38, bottom: 6 },
      { bull: true, top: 8, body: 46, bottom: 6 },
      { bull: true, top: 6, body: 40, bottom: 6 },
      { bull: false, top: 42, body: 22, bottom: 6 },
    ],
    q: 'Sau 4 nến tăng liên tiếp, xuất hiện nến có bóng trên rất dài và thân nhỏ ở phía dưới. Tín hiệu chính là gì?',
    opts: [
      'Xu hướng tăng chắc chắn tiếp tục',
      'Shooting Star: cảnh báo đảo chiều giảm',
      'Nến bình thường, bỏ qua hoàn toàn',
      'Nên mua vào vì bóng nến dài là mạnh',
    ],
    c: 1,
    explanation:
      'Bóng trên dài sau uptrend cho thấy phe mua đẩy giá lên nhưng không giữ được. Đây là cảnh báo, không phải lệnh SELL mù quáng.',
  },
  {
    label: 'BTC/USD H4, sau downtrend tại hỗ trợ',
    candles: [
      { bull: false, top: 10, body: 46, bottom: 8 },
      { bull: false, top: 8, body: 42, bottom: 10 },
      { bull: false, top: 8, body: 36, bottom: 10 },
      { bull: true, top: 24, body: 4, bottom: 24, doji: true },
      { bull: true, top: 8, body: 44, bottom: 8 },
    ],
    q: 'Sau downtrend, Doji xuất hiện tại hỗ trợ, rồi nến tiếp theo là nến tăng thân dài. Bạn nên hiểu thế nào?',
    opts: [
      'SELL ngay vì xu hướng trước đó đang giảm',
      'Đứng ngoài, không có gì đáng chú ý',
      'Có thể cân nhắc setup BUY vì có Doji tại hỗ trợ và nến xác nhận tăng',
      'Doji luôn là tín hiệu vào lệnh ngay',
    ],
    c: 2,
    explanation:
      'Bối cảnh quan trọng hơn một nến riêng lẻ: downtrend về hỗ trợ, Doji thể hiện lưỡng lự, nến tăng xác nhận phe mua thắng lại.',
  },
  {
    label: 'EUR/USD H1, pullback trong uptrend D1',
    candles: [
      { bull: true, top: 8, body: 36, bottom: 8 },
      { bull: true, top: 10, body: 40, bottom: 8 },
      { bull: false, top: 8, body: 14, bottom: 8 },
      { bull: false, top: 6, body: 10, bottom: 8 },
      { bull: true, top: 24, body: 4, bottom: 24, doji: true },
    ],
    q: 'D1 đang uptrend. Trên H1, giá pullback rồi xuất hiện Doji. Theo Top-Down Analysis, bước tiếp theo hợp lý là gì?',
    opts: [
      'SELL vì H1 vừa giảm nhẹ',
      'Chờ nến xác nhận tăng; nếu có, đây có thể là cơ hội BUY theo D1',
      'Bỏ qua mọi Doji trong pullback',
      'Vào SELL ngay khi thấy Doji',
    ],
    c: 1,
    explanation:
      'D1 là hướng ưu tiên. Pullback H1 trong D1 uptrend là bối cảnh tìm BUY, nhưng vẫn cần nến xác nhận.',
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
            ? 'Bạn đã đọc bối cảnh nến khá tốt.'
            : 'Nên ôn lại phần Hammer, Shooting Star, Doji và nguyên tắc xác nhận.'}
        </p>
        <button
          onClick={reset}
          className="bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:opacity-90 transition"
        >
          Làm lại
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
              Tình huống {current + 1} / {candleQuizData.length}
            </div>
            <div className="text-white font-bold">{q.label}</div>
          </div>
          <div className="text-[#848E9C] text-sm font-mono">Đúng: {score}</div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-end justify-center gap-5 min-h-[150px] bg-[#111827] rounded-2xl p-6 mb-8">
          {q.candles.map((candle, index) => (
            <div key={index} className="flex flex-col items-center">
              <Candle {...candle} />
              {index === q.candles.length - 1 && (
                <div className="text-[13.5px] text-[#FCD535] mt-2 font-bold">Nến này</div>
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
              {selected === q.c ? 'Chính xác.' : 'Chưa đúng.'}
            </strong>
            {q.explanation}
          </div>
        )}

        <button
          disabled={selected === null}
          onClick={next}
          className="mt-6 w-full bg-[#FCD535] text-black py-4 rounded-2xl font-black uppercase tracking-widest disabled:opacity-30"
        >
          {current === candleQuizData.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
        </button>
      </div>
    </div>
  );
};

const FinalQuiz = () => {
  const qs = [
    {
      q: 'Giá cổ phiếu công ty A tăng liên tục trong 2 tuần trước khi kết quả kinh doanh tốt được công bố. Khi kết quả chính thức ra, giá lại giảm. Hiện tượng này thường được gọi là gì?',
      opts: ['Lỗi thị trường', 'Buy the rumor, sell the news', 'Insider trading', 'Bong bóng giá'],
      c: 1,
      exp: 'Đây là hiện tượng "Tin đồn thì mua, tin thật thì bán". Đám đông mua vào kỳ vọng tốt, và khi tin chính thức ra, những người mua sớm sẽ chốt lời khiến giá giảm.'
    },
    {
      q: 'Bạn SELL EUR/USD ở 1.0900, SL ở 1.0930, TP ở 1.0810. R:R của lệnh này là bao nhiêu?',
      opts: ['1:1', '1:2', '1:3', '1:4'],
      c: 2,
      exp: 'Khoảng cách SL: 1.0930 - 1.0900 = 30 pip. Khoảng cách TP: 1.0900 - 1.0810 = 90 pip. Tỷ lệ Risk:Reward = 30:90 = 1:3.'
    },
    {
      q: 'Phiên giao dịch nào thường có thanh khoản cao nhất trong ngày theo giờ Việt Nam?',
      opts: ['5:00-9:00 Tokyo', '14:00-17:00 London sáng', '19:00-23:00 London + New York overlap', '23:00-3:00 đêm'],
      c: 2,
      exp: 'Phiên giao thoa giữa London và New York (19:00 - 23:00 giờ VN) là lúc cả hai trung tâm tài chính lớn nhất thế giới cùng hoạt động, tạo ra thanh khoản và biến động cao nhất.'
    },
    {
      q: 'Leverage 1:50 với tài khoản $2,000. Nếu dùng toàn bộ sức mua, giá đi ngược 2%, tài khoản sẽ ra sao?',
      opts: ['$40', '$200', 'Khoảng $2,000, gần như mất toàn bộ', '$100'],
      c: 2,
      exp: 'Với đòn bẩy 1:50, biến động 2% của thị trường sẽ khuếch đại thành 2% * 50 = 100% đối với tài khoản của bạn, khiến tài khoản bị cháy (mất toàn bộ).'
    },
    {
      q: 'Sau uptrend dài, xuất hiện nến có bóng trên rất dài, thân nhỏ ở dưới, tại vùng kháng cự. Đây là tín hiệu gì?',
      opts: ['Tiếp tục tăng, mua vào', 'Shooting Star, cảnh báo đảo chiều giảm', 'Nến bình thường', 'Bán ngay không cần xác nhận'],
      c: 1,
      exp: 'Bóng trên dài cho thấy phe mua cố gắng đẩy giá lên nhưng bị phe bán áp đảo và đẩy xuống mạnh mẽ. Đây là mẫu hình Shooting Star, cảnh báo có thể đảo chiều giảm.'
    },
    {
      q: 'Bid = 1.0848, Ask = 1.0851. Spread là bao nhiêu pip?',
      opts: ['1 pip', '2 pip', '3 pip', '4 pip'],
      c: 2,
      exp: 'Spread = Ask - Bid = 1.0851 - 1.0848 = 0.0003, tương đương 3 pip.'
    },
    {
      q: 'Tài khoản $5,000, bạn muốn risk 1%. SL cách entry 40 pip. Tổng pip value tối đa cho vị thế nên khoảng bao nhiêu?',
      opts: ['$0.50/pip', '$1.25/pip', '$2.00/pip', '$0.80/pip'],
      c: 1,
      exp: 'Risk 1% của $5,000 = $50. Nếu SL = 40 pip, thì Pip Value = $50 / 40 = $1.25/pip. Bạn nên đi size lệnh sao cho mỗi pip trị giá $1.25.'
    },
    {
      q: 'D1 đang downtrend. Trên M15 có setup tăng rất đẹp. Theo Top-Down Analysis, bạn nên làm gì?',
      opts: ['BUY ngay vì M15 đẹp', 'Không vào BUY vì ngược chiều D1', 'SELL theo D1 mà không cần setup', 'Xem thêm M1 để quyết định'],
      c: 1,
      exp: 'Nguyên tắc Top-Down Analysis là luôn thuận theo xu hướng của khung thời gian lớn (D1). Nếu D1 giảm thì không nên Buy trên khung nhỏ hơn dù setup có đẹp đến đâu.'
    },
    {
      q: 'Doji xuất hiện sau downtrend dài tại hỗ trợ mạnh. Hành động hợp lý là gì?',
      opts: ['BUY ngay vì Doji = đảo chiều', 'Chờ nến xác nhận tăng rồi mới cân nhắc', 'SELL tiếp', 'Bỏ qua vì Doji vô nghĩa'],
      c: 1,
      exp: 'Doji chỉ thể hiện sự lưỡng lự của thị trường, không phải là xác nhận đảo chiều. Cần chờ thêm nến xác nhận tăng sau đó để vào lệnh an toàn.'
    },
    {
      q: 'Bull trap thường hoạt động như thế nào?',
      opts: ['Thị trường luôn đi tiếp theo hướng breakout', 'Giá phá lên để hút lực mua, sau đó đảo chiều khiến người mua mắc kẹt', 'Không liên quan đến thanh khoản', 'Chỉ xuất hiện ở cổ phiếu'],
      c: 1,
      exp: 'Bull trap (Bẫy tăng giá) là khi giá tạo tín hiệu phá vỡ kháng cự giả để dụ trader mua vào, sau đó lập tức quay đầu giảm sâu khiến những người vừa mua bị mắc kẹt.'
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
              Câu {qIdx + 1}
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
               <strong className="block text-lg mb-2">{answers[qIdx] === q.c ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {q.exp}
             </div>
          )}
        </div>
      ))}

      <button
        onClick={() =>
          Object.keys(answers).length === qs.length
            ? setShowRes(true)
            : alert('Hãy trả lời hết các câu trước khi nộp bài.')
        }
        className="w-full bg-green-500 dark:bg-[#0ECB81] text-white dark:text-black font-black py-5 rounded-2xl text-lg uppercase tracking-widest hover:brightness-110 shadow-lg mt-4"
      >
        Nộp bài kiểm tra
      </button>

      {showRes && (
        <div className="p-10 bg-gradient-to-br from-white to-gray-50 dark:from-[#0B0E11] dark:to-[#181A20] border border-yellow-500 dark:border-[#FCD535] rounded-3xl text-center shadow-lg mt-8">
          <h2 className="text-4xl font-black text-black dark:text-white mb-4">
            Kết quả: {score}/{qs.length}
          </h2>
          <p className="text-gray-600 dark:text-[#848E9C] text-[18.5px] mb-8">
            {score >= 7
              ? 'Đạt mục tiêu. Bạn đã nắm nền tảng đủ để sang Chương 2.'
              : 'Chưa đạt 7/10. Nên đọc lại thuật ngữ, leverage, nến Nhật và Top-Down Analysis.'}
          </p>
          <button
            onClick={() => {
              setAnswers({});
              setShowRes(false);
            }}
            className="bg-gray-800 dark:bg-[#2B3139] text-white px-8 py-3 rounded-xl font-bold uppercase text-sm hover:bg-black transition-colors"
          >
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
};

const CHAPTER_1_DATA_VN = [
  {
    title: '1. Thị trường là gì?',
    content: (
      <>
        <SectionHead
          icon={<Store />}
          title="Thị trường là gì?"
          desc="Trước khi học cách kiếm tiền từ thị trường, hãy hiểu thị trường thực sự là gì."
        />

        <StoryBox label="Ví dụ đời thường" icon={<ShoppingCart size={16} />}>
          Hãy tưởng tượng một chợ cá. Người bán muốn bán giá cao, người mua muốn mua giá thấp. Khi hai bên đồng ý một mức giá, giao dịch xảy ra. Thị trường tài chính cũng vậy: giá là nơi người mua và người bán tạm thời đồng thuận.
        </StoryBox>

        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">
          <strong>Thị trường tài chính</strong> là nơi người tham gia mua bán tài sản như tiền tệ, vàng, cổ phiếu, crypto, hàng hóa hoặc chỉ số. Bạn không cần có mặt ở một địa điểm vật lý. Mọi thứ diễn ra qua sàn giao dịch, broker hoặc nền tảng điện tử.
        </p>
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-6">
          Giá không di chuyển vì một người muốn nó lên hay xuống. Giá di chuyển vì sự mất cân bằng giữa cung và cầu, cộng thêm kỳ vọng tương lai của đám đông.
        </p>

        <CyberTable
          headers={['Khái niệm', 'Nói đơn giản', 'Trong trading']}
          rows={[
            ['Cung', 'Người muốn bán', 'Càng nhiều người bán, giá càng dễ giảm'],
            ['Cầu', 'Người muốn mua', 'Càng nhiều người mua, giá càng dễ tăng'],
            ['Giá', 'Điểm hai bên đồng ý giao dịch', 'Là kết quả cuối cùng của cung, cầu và kỳ vọng'],
            ['Thanh khoản', 'Chợ có đông người mua bán không', 'Thanh khoản cao giúp vào/ra lệnh dễ hơn, spread thường thấp hơn'],
          ]}
        />

        <SectionHead icon={<Brain />} title="Giá phản ánh kỳ vọng" />
        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">
          Thị trường thường phản ứng trước tin tức chính thức. Nếu ai cũng kỳ vọng công ty có báo cáo tốt, giá có thể đã tăng trước khi báo cáo ra. Khi tin thật ra đúng như kỳ vọng, giá vẫn có thể giảm vì người mua sớm chốt lời.
        </p>
        <Callout type="tip">
          Đây là lý do có câu “buy the rumor, sell the news”. Không phải tin tốt nào cũng làm giá tăng sau khi công bố.
        </Callout>

        <SimpleQuiz
          q="CPI Mỹ được dự báo rất cao. Khi công bố, CPI vẫn cao nhưng thấp hơn dự báo. Vàng tăng mạnh. Vì sao?"
          opts={[
            'Vì tin xấu luôn làm vàng tăng',
            'Vì thị trường đã kỳ vọng lạm phát cao hơn. Số thực tế thấp hơn kỳ vọng là bất ngờ tích cực cho vàng',
            'Vàng luôn tăng bất kể tin tức',
            'Vì người ta mua vàng mà không hiểu tin',
          ]}
          correctIdx={1}
          explanation='Thị trường giao dịch theo chênh lệch giữa kỳ vọng và thực tế. Tin “cao” nhưng thấp hơn kỳ vọng vẫn có thể được hiểu là tích cực.'
        />
      </>
    ),
  },
  {
    title: '2. Các loại thị trường tài chính',
    content: (
      <>
        <SectionHead
          icon={<Globe />}
          title="Các loại thị trường tài chính"
          desc="Không cần biết hết mọi thứ. Hãy nắm các thị trường quan trọng nhất và đặc điểm của chúng."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
          {[
            ['Forex', '24/5. Mua bán tiền tệ. Thanh khoản rất cao.', 'EUR/USD, GBP/USD, USD/JPY'],
            ['Crypto', '24/7. Biến động cao, nhiều nhiễu, phù hợp người đã quen rủi ro.', 'BTC, ETH, SOL'],
            ['Vàng', 'Thường giao dịch qua CFD/futures. Nhạy với USD, lãi suất, địa chính trị.', 'XAU/USD'],
            ['Cổ phiếu', 'Có giờ giao dịch cố định. Phụ thuộc doanh nghiệp và dòng tiền.', 'AAPL, NVDA, VIC'],
            ['Chỉ số', 'Đại diện rổ cổ phiếu. Phù hợp đọc sức khỏe thị trường chung.', 'S&P 500, NASDAQ, VNINDEX'],
            ['Hàng hóa', 'Phụ thuộc cung cầu vật chất, mùa vụ, địa chính trị.', 'Dầu, bạc, nông sản'],
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
          headers={['Đặc điểm', 'Forex', 'Crypto', 'Vàng (XAU/USD)']}
          rows={[
            ['Giờ giao dịch', '24/5', '24/7', '24/5 qua broker CFD, futures hoặc spot tùy thị trường'],
            ['Thanh khoản', 'Rất cao ở cặp chính', 'Cao ở BTC/ETH, thấp hơn ở altcoin nhỏ', 'Rất cao nhưng có thể giật mạnh khi có tin'],
            ['Biến động', 'Vừa phải', 'Rất cao', 'Cao hơn forex chính, thấp hơn nhiều altcoin'],
            ['Phù hợp người mới?', 'Tốt nếu tập trung cặp chính', 'Cẩn thận vì biến động và tâm lý FOMO', 'Tốt để học price action, nhưng phải quản trị rủi ro chặt'],
          ]}
        />

        <Callout type="ok">
          Lộ trình hợp lý: bắt đầu với một vài thị trường quen thuộc như XAU/USD, EUR/USD hoặc BTC. Đừng mở 20 chart cùng lúc khi nền tảng chưa vững.
        </Callout>

        <SectionHead icon={<Clock />} title="Các phiên giao dịch trong ngày" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="border border-gray-200 dark:border-[#2B3139] bg-white dark:bg-transparent p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-gray-500 dark:text-[#848E9C] mb-2 uppercase tracking-wider font-bold">
              Sydney / Tokyo
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">5:00-14:00 VN</div>
            <div className="text-[16.5px] text-gray-500 dark:text-[#64748B] mt-2">Thường ít biến động hơn.</div>
          </div>
          <div className="border border-yellow-200 dark:border-[#FCD535]/30 bg-yellow-50 dark:bg-[#FCD535]/5 p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-yellow-700 dark:text-[#FCD535] mb-2 uppercase tracking-wider font-bold">
              London
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">14:00-23:00 VN</div>
            <div className="text-[16.5px] text-yellow-700 dark:text-[#FCD535] mt-2">Thanh khoản tăng, EUR/GBP hoạt động mạnh.</div>
          </div>
          <div className="border-2 border-yellow-400 dark:border-[#FCD535]/50 bg-yellow-100 dark:bg-[#FCD535]/10 p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-yellow-800 dark:text-[#FCD535] mb-2 uppercase tracking-wider font-bold">
              New York
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">19:00-24:00+ VN</div>
            <div className="text-[16.5px] text-yellow-800 dark:text-[#FCD535] mt-2">USD chi phối, tin Mỹ thường gây biến động lớn.</div>
          </div>
          <div className="border border-blue-200 dark:border-[#378ADD]/30 bg-blue-50 dark:bg-[#378ADD]/5 p-5 rounded-2xl shadow-sm">
            <div className="text-[15.5px] text-blue-700 dark:text-[#378ADD] mb-2 uppercase tracking-wider font-bold">
              London + New York overlap
            </div>
            <div className="font-bold text-black dark:text-white text-lg font-mono">19:00-23:00 VN</div>
            <div className="text-[16.5px] text-blue-700 dark:text-[#378ADD] mt-2">Thường là vùng thanh khoản cao nhất ngày.</div>
          </div>
        </div>

        <Callout type="warn">
          Giờ phiên chỉ là mốc xấp xỉ. London/New York có daylight saving, broker cũng có giờ server riêng. Khi giao dịch thật, hãy kiểm tra lại lịch phiên và lịch tin.
        </Callout>

        <MatchGame />
      </>
    ),
  },
  {
    title: '3. Ai đang tham gia thị trường?',
    content: (
      <>
        <SectionHead
          icon={<Landmark />}
          title="Ai đang thực sự tham gia thị trường?"
          desc="Biết đối thủ của mình là ai. Thị trường không fair, nhưng hiểu luật chơi sẽ giúp bạn bớt bị động."
        />

        <div className="space-y-5 mb-8">
          {[
            ['Ngân hàng trung ương', 'Fed, ECB, BOJ, SBV...', 'Tác động mạnh qua lãi suất, chính sách tiền tệ và phát biểu. Đây là nhóm tạo ra các cú dịch chuyển vĩ mô lớn.'],
            ['Tổ chức tài chính lớn', 'Ngân hàng, quỹ đầu cơ, market maker', 'Giao dịch khối lượng lớn, cần thanh khoản để vào/ra vị thế. Họ thường không mua bán giống retail.'],
            ['Doanh nghiệp và quỹ đầu tư', 'Hedging, đầu tư, tái cân bằng danh mục', 'Có thể mua bán vì nhu cầu kinh doanh hoặc phân bổ vốn, không chỉ vì tín hiệu kỹ thuật.'],
            ['Retail trader', 'Bạn, tôi, trader nhỏ lẻ', 'Khối lượng nhỏ, lợi thế là linh hoạt. Bất lợi là dễ bị FOMO, overtrade và phản ứng muộn.'],
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

        <StoryBox label="Thanh khoản là chiến trường" icon={<AlertTriangle size={16} />}>
          Các tổ chức lớn không thể vào hoặc thoát lệnh khối lượng lớn ở bất kỳ đâu. Họ cần vùng có nhiều lệnh chờ, stoploss hoặc dòng tiền FOMO. Vì vậy, nhiều cú breakout đẹp có thể trở thành bull trap: giá phá lên để hút người mua, sau đó đảo chiều khiến người mua mắc kẹt.
        </StoryBox>

        <Callout type="tip">
          Không phải mọi breakout đều là bẫy. Điểm cần học là đừng đuổi giá mù quáng. Hãy chờ giá đóng cửa rõ ràng, có volume xác nhận hoặc retest hợp lý.
        </Callout>

        <SimpleQuiz
          q="Giá EUR/USD vừa phá lên trên kháng cự 1.1000. Rất nhiều retail FOMO BUY ngay. Sau đó giá quay đầu mạnh xuống dưới 1.1000. Cách đọc hợp lý nhất là gì?"
          opts={[
            'Breakout luôn đúng, cứ giữ lệnh',
            'Có thể là bull trap: giá hút lực mua rồi đảo chiều',
            'Retail luôn thắng tổ chức',
            'Không cần quan tâm thanh khoản',
          ]}
          correctIdx={1}
          explanation="Bull trap là tình huống giá phá lên khiến người mua nhảy vào, rồi đảo chiều khiến họ mắc kẹt. Không nên kết luận ngay, nhưng phải biết rủi ro này."
        />
      </>
    ),
  },
  {
    title: '4. Thuật ngữ cốt lõi',
    content: (
      <>
        <SectionHead
          icon={<BookOpen />}
          title="12 thuật ngữ bắt buộc"
          desc="Học một lần, dùng cả đời. Mỗi thuật ngữ được giải thích bằng ngôn ngữ đời thường trước."
        />

        <TermCard
          name="BID / ASK"
          eng="Giá mua / giá bán của sàn"
          simple="<strong>Bid</strong> là giá thị trường sẵn sàng mua từ bạn. <strong>Ask</strong> là giá thị trường sẵn sàng bán cho bạn."
          example="EUR/USD Bid 1.0850 / Ask 1.0852. Nếu BUY ngay, bạn khớp Ask 1.0852. Nếu SELL ngay, bạn khớp Bid 1.0850."
        />
        <TermCard
          name="SPREAD"
          eng="Chi phí giao dịch ẩn"
          simple="Spread = Ask - Bid. Đây là chênh lệch bạn trả khi vào lệnh market."
          example="Bid 1.0848, Ask 1.0851. Spread = 3 pip. Vừa vào lệnh xong bạn thường âm nhẹ vì spread."
        />
        <TermCard
          name="PIP"
          eng="Đơn vị thay đổi giá"
          simple="Pip là đơn vị nhỏ phổ biến để đo biến động giá trong forex. Với đa số cặp forex, 1 pip là 0.0001."
          example="EUR/USD từ 1.0850 lên 1.0851 là tăng 1 pip. Với vàng/crypto/cổ phiếu, cách tính point/pip có thể khác theo broker."
        />
        <TermCard
          name="LOT"
          eng="Khối lượng giao dịch"
          simple="Lot là kích thước vị thế. Standard lot thường là 100,000 đơn vị, mini lot 10,000, micro lot 1,000."
          example="Người mới nên bắt đầu nhỏ. Đừng dùng lot lớn chỉ vì thấy tài khoản còn đủ margin."
        />
        <TermCard
          name="LONG / SHORT"
          eng="Mua / bán"
          simple="<strong>Long</strong> nghĩa là kỳ vọng giá tăng. <strong>Short</strong> nghĩa là kỳ vọng giá giảm."
          example="Nếu BUY XAU/USD ở 2000 và giá lên 2010, lệnh long có lãi. Nếu SELL và giá xuống, lệnh short có lãi."
        />
        <TermCard
          name="STOP LOSS (SL)"
          eng="Điểm cắt lỗ"
          simple="Stop Loss là lệnh đóng vị thế khi thị trường đi ngược đến mức bạn chấp nhận sai."
          example="Mua vàng $2,000, SL $1,990. Nếu giá chạm SL, hệ thống đóng lệnh để giới hạn lỗ."
        />
        <TermCard
          name="TAKE PROFIT (TP)"
          eng="Điểm chốt lời"
          simple="Take Profit là lệnh đóng vị thế khi đạt mục tiêu lợi nhuận."
          example="BUY ở 2,000, TP 2,030. Khi giá chạm 2,030, lệnh được chốt lời tự động."
        />
        <TermCard
          name="RISK:REWARD (R:R)"
          eng="Rủi ro / lợi nhuận"
          simple="R:R trả lời câu hỏi: nếu sai mất bao nhiêu, nếu đúng được bao nhiêu. R:R 1:2 nghĩa là risk 1 để kỳ vọng lời 2."
          example="SL cách entry 30 pip, TP cách entry 90 pip. R:R = 1:3."
        />
        <TermCard
          name="DRAWDOWN (DD)"
          eng="Sụt giảm từ đỉnh tài khoản"
          simple="Drawdown đo tài khoản giảm bao nhiêu phần trăm từ đỉnh gần nhất."
          example="Tài khoản từ $10,000 lên $12,000 rồi giảm về $9,600. Drawdown từ đỉnh là 20%."
        />
        <TermCard
          name="MARGIN CALL"
          eng="Cảnh báo thiếu ký quỹ"
          simple="Margin Call xảy ra khi tài khoản không còn đủ ký quỹ để duy trì vị thế. Broker có thể yêu cầu nạp thêm tiền hoặc tự đóng lệnh."
          example="Dùng leverage quá cao, thị trường đi ngược nhanh, equity giảm mạnh. Broker có thể đóng lệnh để hạn chế rủi ro hệ thống."
        />
        <TermCard
          name="BULLISH / BEARISH"
          eng="Thiên hướng tăng / giảm"
          simple="<strong>Bullish</strong> nghĩa là kỳ vọng tăng. <strong>Bearish</strong> nghĩa là kỳ vọng giảm."
          example="Tin lãi suất thấp hơn kỳ vọng có thể bearish cho USD và bullish cho vàng, tùy bối cảnh."
        />
        <TermCard
          name="VOLATILITY"
          eng="Biến động"
          simple="Volatility là mức độ giá dao động mạnh hay nhẹ. Biến động cao tạo cơ hội nhưng cũng làm SL dễ bị quét hơn."
          example="BTC thường volatility cao hơn EUR/USD. Cùng một chiến lược nhưng position size phải nhỏ hơn nếu thị trường biến động mạnh."
        />

        <SimpleQuiz
          q="Bạn BUY EUR/USD ở 1.0850. SL = 1.0820, TP = 1.0940. R:R là bao nhiêu?"
          opts={['1:1', '1:2', '1:3', '1:4']}
          correctIdx={2}
          explanation="Risk = 30 pip. Reward = 90 pip. R:R = 30:90 = 1:3."
        />
      </>
    ),
  },
  {
    title: '5. Đòn bẩy & Margin',
    content: (
      <>
        <SectionHead
          icon={<Zap />}
          title="Đòn bẩy: con dao hai lưỡi nguy hiểm nhất"
          desc="Leverage giúp kiểm soát vị thế lớn hơn vốn thật, nhưng nó cũng phóng đại thua lỗ."
        />

        <StoryBox label="Ví dụ bất động sản" icon={<Home size={16} />}>
          Bạn có $10,000 và muốn mua căn nhà $100,000. Ngân hàng cho vay 90%, tức bạn dùng đòn bẩy 1:10. Nhà tăng 10%, bạn lời $10,000 trên vốn $10,000. Nhà giảm 10%, bạn mất toàn bộ vốn. Trading tương tự, nhưng biến động có thể xảy ra trong vài phút.
        </StoryBox>

        <p className="text-[18.5px] md:text-[19.5px] leading-[1.8] text-gray-800 dark:text-[#EAECEF] mb-4">
          Leverage không tự làm bạn thua. Thứ làm cháy tài khoản là dùng khối lượng quá lớn so với tài khoản và không có stoploss rõ ràng. Cùng một leverage 1:100, người risk 1% mỗi lệnh vẫn khác hoàn toàn người dùng toàn bộ sức mua.
        </p>

        <LeverageSim />

        <CyberTable
          headers={['Khái niệm', 'Cách hiểu', 'Rủi ro']}
          rows={[
            ['Leverage', 'Mượn sức mua để kiểm soát vị thế lớn hơn vốn thật', 'Phóng đại cả lời và lỗ'],
            ['Margin', 'Tiền ký quỹ cần có để mở/giữ vị thế', 'Không đủ margin có thể bị broker đóng lệnh'],
            ['Position size', 'Khối lượng bạn thực sự vào lệnh', 'Yếu tố quyết định lỗ/lời thực tế cùng với SL'],
            ['Risk per trade', 'Số tiền chấp nhận mất nếu SL bị hit', 'Người mới nên giữ khoảng 0.5%-1% mỗi lệnh'],
          ]}
        />

        <Callout type="bad">
          Khuyến nghị cho người mới: dùng leverage thấp, lot nhỏ, luôn có SL. Quảng cáo leverage 1:500 hoặc 1:1000 không phải lợi thế nếu bạn chưa kiểm soát được position size.
        </Callout>

        <ExerciseBox
          title="Tính toán leverage thực tế"
          desc="Hãy tự tính trước khi vào lệnh. Nếu không tính được rủi ro, không vào lệnh."
          steps={[
            { d: 'Tài khoản $500, leverage 1:100, mở vị thế trị giá $10,000. Giá đi ngược 1%. Lỗ giả định là bao nhiêu?' },
            { d: 'Tài khoản $2,000, bạn chỉ muốn risk 1% = $20. Nếu SL cách entry $10, khối lượng tối đa nên là bao nhiêu đơn vị?' },
            { d: 'So sánh hai lệnh cùng setup nhưng một lệnh dùng 0.01 lot, một lệnh dùng 0.10 lot. Leverage giống nhau nhưng rủi ro thực tế khác thế nào?' },
          ]}
        />
      </>
    ),
  },
  {
    title: '6. Đọc nến Nhật',
    content: (
      <>
        <SectionHead
          icon={<Flame />}
          title="Đọc nến Nhật: ngôn ngữ của thị trường"
          desc="Mọi thông tin của một phiên được nén vào một cây nến: mở cửa, cao nhất, thấp nhất và đóng cửa."
        />

        {/* Annotated Candle Diagram */}
        <div className="bg-[#0d1117] rounded-2xl p-6 my-8 overflow-x-auto border border-gray-800">
          <div className="text-[13.5px] text-gray-400 font-mono uppercase tracking-widest mb-4">// Giải phẫu một cây nến — Nhấp/hover để khám phá</div>
          <svg viewBox="0 0 600 240" className="w-full h-auto min-w-[420px]" role="img" aria-label="Annotated candlestick diagram">
            {/* Wicks */}
            <line x1="200" y1="20" x2="200" y2="70" stroke="#00d084" strokeWidth="2.5" />
            <line x1="200" y1="170" x2="200" y2="210" stroke="#00d084" strokeWidth="2.5" />
            {/* Candle body */}
            <rect x="182" y="70" width="36" height="100" fill="#00d084" rx="4" />
            {/* H annotation */}
            <line x1="200" y1="20" x2="340" y2="20" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="12" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="25" fill="#e8eaf0" fontSize="12" fontFamily="monospace">← Giá cao nhất (H) = $2,050</text>
            {/* C annotation */}
            <line x1="218" y1="70" x2="340" y2="70" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="62" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="75" fill="#00d084" fontSize="12" fontFamily="monospace" fontWeight="bold">← Đóng cửa (C) = $2,040</text>
            {/* O annotation */}
            <line x1="218" y1="170" x2="340" y2="155" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="147" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="160" fill="#e8eaf0" fontSize="12" fontFamily="monospace">← Mở cửa (O) = $1,990</text>
            {/* L annotation */}
            <line x1="200" y1="210" x2="340" y2="210" stroke="#9ca3b0" strokeWidth="1" strokeDasharray="4 3" />
            <rect x="342" y="202" width="210" height="18" fill="#1e2535" rx="3" />
            <text x="350" y="215" fill="#e8eaf0" fontSize="12" fontFamily="monospace">← Giá thấp nhất (L) = $1,975</text>
            {/* Labels left side */}
            <text x="60" y="25" fill="#9ca3b0" fontSize="11" fontFamily="monospace" textAnchor="middle">High</text>
            <text x="60" y="125" fill="#00d084" fontSize="11" fontFamily="monospace" textAnchor="middle">Thân nến</text>
            <text x="60" y="140" fill="#9ca3b0" fontSize="10" fontFamily="monospace" textAnchor="middle">(C - O)</text>
            <text x="60" y="215" fill="#9ca3b0" fontSize="11" fontFamily="monospace" textAnchor="middle">Low</text>
            {/* Brace lines left */}
            <line x1="160" y1="20" x2="148" y2="20" stroke="#5a6275" strokeWidth="1.5" />
            <line x1="148" y1="20" x2="148" y2="210" stroke="#5a6275" strokeWidth="1.5" />
            <line x1="148" y1="210" x2="160" y2="210" stroke="#5a6275" strokeWidth="1.5" />
            <line x1="148" y1="115" x2="100" y2="115" stroke="#5a6275" strokeWidth="1.5" />
            {/* Info box bottom */}
            <rect x="10" y="225" width="350" height="12" fill="#00d08410" rx="3" />
            <text x="16" y="234" fill="#00d084" fontSize="10" fontFamily="monospace">NẾN TĂNG — Đóng cửa (C) cao hơn Mở cửa (O). Thân xanh.</text>
          </svg>
        </div>

        <CyberTable
          headers={['Ký hiệu', 'Tên đầy đủ', 'Ý nghĩa']}
          rows={[
            ["<span class='bg-gray-200 dark:bg-[#e8e4da] text-gray-800 dark:text-[#2a2e3a] px-2 py-1 rounded'>O</span>", 'Open - Mở cửa', 'Giá giao dịch đầu tiên của phiên'],
            ["<span class='bg-green-100 dark:bg-[#d4eddf] text-green-700 dark:text-[#2d7a4f] px-2 py-1 rounded'>H</span>", 'High - Cao nhất', 'Giá cao nhất trong phiên, thể hiện vùng phe mua từng đẩy tới'],
            ["<span class='bg-red-100 dark:bg-[#fae0e0] text-red-700 dark:text-[#b53b3b] px-2 py-1 rounded'>L</span>", 'Low - Thấp nhất', 'Giá thấp nhất trong phiên, thể hiện vùng phe bán từng kéo xuống'],
            ["<span class='bg-blue-100 dark:bg-[#dce8fa] text-blue-700 dark:text-[#2a5fad] px-2 py-1 rounded'>C</span>", 'Close - Đóng cửa', '<strong>Quan trọng nhất</strong>, vì nó cho biết bên nào giữ được lợi thế khi phiên kết thúc'],
          ]}
        />

        <CandleLab />

        <Callout type="tip">
          Nguyên tắc: thân dài = áp lực mạnh, thân ngắn/Doji = lưỡng lự, bóng dài = từ chối giá. Nhưng nến đơn lẻ không đủ để vào lệnh. Luôn đọc cùng trend, hỗ trợ/kháng cự và nến xác nhận.
        </Callout>

        <CandleQuiz />
      </>
    ),
  },
  {
    title: '7. Khung thời gian',
    content: (
      <>
        <SectionHead
          icon={<Telescope />}
          title="Khung thời gian: bản đồ vs ảnh vệ tinh"
          desc="Cùng một thị trường, nhìn ở khung khác nhau sẽ thấy câu chuyện khác nhau."
        />

        <StoryBox label="Phép so sánh" icon={<Map size={16} />}>
          Lái xe từ Hà Nội vào TP.HCM, bạn cần bản đồ toàn quốc để biết hướng lớn, rồi mới dùng bản đồ đường phố để tìm ngõ. Trading cũng vậy: khung lớn cho bối cảnh, khung nhỏ cho điểm vào.
        </StoryBox>

        {/* Timeframe Table */}
        <div className="my-8">
          <h4 className="text-[#0f1117] dark:text-[#e8eaf0] font-bold text-xl mb-4 transition-colors">Bảng khung thời gian (Timeframe)</h4>
          <div className="overflow-x-auto border border-[rgba(15,17,23,0.18)] dark:border-[rgba(255,255,255,0.13)] rounded-xl">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[#f2f0ea] dark:bg-[#1e2535] text-[#636878] dark:text-[#9ca3b0] text-[13.5px] font-mono uppercase tracking-[0.15em] border-b border-[rgba(15,17,23,0.18)] dark:border-[rgba(255,255,255,0.13)]">
                  <th className="p-4">Timeframe</th>
                  <th className="p-4">Mỗi nến = ?</th>
                  <th className="p-4">Mục đích chính</th>
                  <th className="p-4">Loại trader</th>
                  <th className="p-4">Giữ lệnh</th>
                </tr>
              </thead>
              <tbody className="text-[16px] text-[#2a2e3a] dark:text-[#9ca3b0]">
                {[
                  ['MN', '1 tháng', 'Xu hướng vĩ mô dài hạn', 'Position trader', 'Vài tháng – vài năm', false],
                  ['W1', '1 tuần', 'Bối cảnh xu hướng lớn', 'Swing trader dài', 'Vài tuần – tháng', false],
                  ['D1 ⭐', '1 ngày', 'Xác nhận xu hướng chính — KHUNG CHỦ ĐẠO', 'Swing trader', 'Vài ngày – tuần', true],
                  ['H4 ⭐', '4 giờ', 'Tìm vùng pullback và cơ hội entry', 'Day trader / Swing', 'Vài giờ – ngày', true],
                  ['H1', '1 giờ', 'Tinh chỉnh entry', 'Day trader', 'Vài giờ', false],
                  ['M15 / M5', '15 / 5 phút', 'Entry precision, kiểm tra spread', 'Scalper / Day trader', '15 phút – vài giờ', false],
                  ['M1', '1 phút', 'Scalping thuần, nhiễu cao', 'Scalper chuyên nghiệp', 'Vài phút', false],
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
          <p className="text-[15.5px] text-[#636878] dark:text-[#5a6275] mt-3 font-mono">⭐ D1 và H4 là hai khung thời gian cốt lõi trong phương pháp NNN.</p>
        </div>

        <div className="my-8">
          <h4 className="text-black dark:text-white font-bold text-xl mb-6 transition-colors">
            Top-Down Analysis: quy trình bắt buộc
          </h4>
          <div className="space-y-4">
            {[
              ['1', 'Mở D1', 'Xác định xu hướng chính: uptrend, downtrend hay sideway. Kẻ vùng hỗ trợ/kháng cự lớn.'],
              ['2', 'Chuyển xuống H4', 'Tìm vùng giá có khả năng pullback, retest hoặc hội tụ với EMA/Fibonacci/SR.'],
              ['3', 'Xuống H1/M15 để entry', 'Tìm nến xác nhận hoặc setup rõ ràng. Không dùng M15 để chống lại D1.'],
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
          Lỗi kinh điển: D1 đang downtrend nhưng M15 có nến tăng đẹp, rồi bạn BUY ngay. Kết quả thường là mua đúng đỉnh của sóng hồi.
        </Callout>

        <ExerciseBox
          title="Quan sát Top-Down Analysis trên XAU/USD"
          desc="Thực hành trên TradingView hoặc chart trong app."
          steps={[
            { d: 'Mở D1, xác định trend chính và 2 vùng hỗ trợ/kháng cự gần nhất.' },
            { d: 'Chuyển H4, tìm vùng giá đang pullback hoặc retest.' },
            { d: 'Xuống H1/M15, chỉ tìm entry thuận hướng D1. Nếu setup ngược D1, ghi lại nhưng không vào.' },
          ]}
        />

        <SimpleQuiz
          q="D1 đang downtrend rõ ràng. Trên M15 có setup BUY R:R 1:3 rất đẹp. Bạn nên làm gì?"
          opts={['BUY ngay vì R:R đẹp', 'Không BUY vì ngược chiều D1', 'Vào size nhỏ cho vui', 'Đổi sang M1 để tìm điểm tốt hơn']}
          correctIdx={1}
          explanation="D1 là bối cảnh chính. Setup nhỏ ngược khung lớn thường chỉ là sóng hồi và rủi ro cao với người mới."
        />
      </>
    ),
  },
  {
    title: '8. Quiz tổng kết',
    content: (
      <>
        <SectionHead
          icon={<Star />}
          title="Quiz tổng kết Chương 1"
          desc="10 câu hỏi bao quát lý thuyết, tính toán và tình huống thực tế. Mục tiêu: đạt ít nhất 7/10."
        />
        <FinalQuiz />
      </>
    ),
  },
];

export default CHAPTER_1_DATA_VN;
