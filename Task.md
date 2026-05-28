# 🗂️ Task Board — SAIB Trading App Bug Audit

> Phân loại theo ma trận Eisenhower. Cập nhật ngày 28/05/2026.
> Đánh dấu `[x]` khi hoàn thành.

---

## 🔴 QUAN TRỌNG + GẤP
> *Các lỗi này làm app crash hoặc mất dữ liệu người dùng ngay bây giờ. Phải sửa trước tiên.*

### [A1] Thiếu import Firestore → Crash khi bấm Tìm Đối Thủ PvP
- [x] `Arena.jsx` dùng `query`, `collection`, `where`, `getDocs`, `addDoc`, `onSnapshot`, `deleteDoc` nhưng **không có trong import** → app crash ngay khi chọn PvP và bấm tìm đối thủ. ✅ **ĐÃ SỬA**

### [A2] Nút LONG/SHORT trong Arena không có handler → PnL mãi = 0
- [x] Các nút `LONG` / `SHORT` trong Order Box của battle **không có `onClick`** → không tạo lệnh, không tính PnL. Kết quả mọi trận luôn là **HÒA** vì cả `myPnL` và `opponentPnL` đều = 0.
- [x] Cần viết logic vào/đóng lệnh thật trong Arena, cập nhật `myPnL` theo giá live. ✅ **ĐÃ SỬA** — Đã thêm `openArenaPosition()`, live PnL effect, và SL/TP scanner.

### [A3] Balance mặc định $10,000 có thể ghi đè balance thật trên Firestore
- [x] `useEffect` sync balance chạy ngay khi mount với `balance = 10000` (state default) — **trước khi** Firestore trả về giá trị thật. Nếu mạng chậm → ghi đè mất balance thật.
- [x] Fix: thêm flag `isBalanceLoaded`, chỉ cho phép sync khi flag = true. ✅ **ĐÃ SỬA**

### [A4] `finishMatch()` bị gọi nhiều lần khi đồng hồ về 0
- [x] Khi `timeLeft === 0` và `matchState === 'BATTLE'`, `useEffect` trigger `finishMatch()` — nhưng `finishMatch` là async, state `FINISHED` chưa kịp set → `useEffect` chạy lại → gọi `finishMatch` lần 2, 3... → cộng/trừ tiền nhiều lần.
- [x] Fix: dùng `useRef` (`finishMatchCalled`) làm guard. ✅ **ĐÃ SỬA**

### [A5] Volume lệnh = `Infinity` khi SL ≈ giá hiện tại (TradingGym)
- [x] `volume = riskAmount / Math.abs(currentPrice - sl)`. Nếu `sl === currentPrice` → chia 0 → `volume = Infinity` → PnL = `Infinity` → UI hiện `$Infinity`, phá vỡ toàn bộ bảng portfolio.
- [x] Fix: validate `slDiff < 0.0001` và `!isFinite(volume)`, block lệnh và hiện alert. ✅ **ĐÃ SỬA**

---

## 🟡 KHÔNG QUAN TRỌNG + GẤP
> *Ảnh hưởng trải nghiệm rõ rệt, người dùng thấy ngay, nhưng không phá vỡ data hay crash.*

### [B1] Không có trạng thái loading khi fetch balance từ Firestore
- [x] Đã thêm skeleton loader nhấp nháy (animate-pulse) hiển thị trong thời gian chờ `isBalanceLoaded`. ✅ **ĐÃ SỬA**

### [B2] Đồng hồ Arena không có hiệu ứng khi trận kết thúc
- [x] Đã thêm class `animate-pulse` vào đồng hồ khi `matchState === 'FINISHED'`. ✅ **ĐÃ SỬA**

### [B3] `showSplash` dùng `setTimeout` trên component có thể unmount
- [x] Đã chuyển sang dùng `useRef` để lưu `timeoutId` và clear timeout khi component unmount, tránh memory leak. ✅ **ĐÃ SỬA**

### [B4] Avatar fallback bị link chết
- [x] Đã thay thế link ảnh bị hỏng bằng Data URI SVG inline, hiển thị chữ cái đầu tên người dùng với nền vàng. ✅ **ĐÃ SỬA**

---

## 🔵 QUAN TRỌNG + KHÔNG GẤP
> *Vấn đề thật sự nghiêm trọng về tính năng hoặc bảo mật nhưng cần thời gian lên kế hoạch kỹ hơn.*

### [C1] PvP không đồng bộ PnL 2 phía real-time
- [ ] Hiện tại mỗi người tự tính PnL trên máy mình, `opponentPnL` không bao giờ cập nhật từ đối thủ thật. Cần kênh Firestore real-time (onSnapshot) để 2 client đồng bộ PnL cho nhau.

### [C2] Surrender penalty = $0 khi không có lệnh thật
- [x] Đã thêm logic phạt surrender: nếu `opponentPnL = 0` và `myPnL = 0` (chưa ai vào lệnh), áp dụng phí đầu hàng cố định **3% balance** trong PvP. ✅ **ĐÃ SỬA**

### [C3] Giá Arena là random, không khớp giá thật trên chart
- [x] Đã kết nối **Binance WebSocket** (`wss://stream.binance.com:9443/ws/btcusdt@trade`) cho giá BTC thật trong trận. Các coin khác vẫn dùng simulation (không có API public miễn phí). ✅ **ĐÃ SỬA**

### [C4] Hình phạt khóa tài khoản tính sai khi giáng rank
- [x] Đã lưu `highestBalance` vào Firestore. Hệ thống giờ chỉ khóa tài khoản nếu balance rơi xuống dưới 5000 và `highestBalance` chưa từng vượt qua mức Beginner ($20,000). Tránh phạt người có rank cao bị thua lỗ. ✅ **ĐÃ SỬA**

### [C5] Forgot Password không hoạt động với tài khoản Username
- [x] Đã thêm validation: nếu email nhập vào không chứa `@` hoặc là `@saib.user`, hiện alert rõ ràng thay vì gửi email sai. ✅ **ĐÃ SỬA**

### [C6] Google Login bắt người dùng tạo mật khẩu không cần thiết
- [x] `handleSaveName` giờ kiểm tra `providerData` — Google users được redirect thẳng vào app sau khi nhập tên, không bị ép qua bước tạo mật khẩu. ✅ **ĐÃ SỬA**

### [C7] Daily Loss Limit không reset theo ngày
- [x] `maxDailyLossLimit` giờ tính từ `dailyStartBalance` (balance đầu ngày lưu trong localStorage theo date key). Key reset tự động vào ngày mới. ✅ **ĐÃ SỬA**

### [C8] Lệnh chờ (Pending) không bị xóa khi Challenge FAILED/PASSED
- [x] `setChallengeStatus('FAILED_MAX')` và `setChallengeStatus('FAILED_DAILY')` giờ đều gọi `setPositions([])` và `setPendingOrders([])` ngay lập tức. ✅ **ĐÃ SỬA**

### [C9] Firestore Security Rules đang ở Test Mode
- [ ] Cần cấu hình trên Firebase Console. Không thể fix từ client code.

### [C10] Balance tính 100% client-side, dễ gian lận
- [ ] Cần Cloud Functions để validate. Để sau khi có backend.

### [C11] Matchmaking tạo phòng trùng lặp nếu bấm nhiều lần
- [x] Thêm `isSearching` ref guard: nếu đang search thì bấm thêm không có tác dụng. Guard reset khi `finishMatch()` hoặc `cancelSearch()`. ✅ **ĐÃ SỬA**

### [C12] "Remember Me" không làm gì
- [x] `handleEmailLogin` giờ gọi `setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)` trước khi đăng nhập. ✅ **ĐÃ SỬA**

### [C13] Text tiếng Việt hardcode trong Arena và TradingGym (i18n bị bỏ sót)
- [ ] Cần thêm nhiều string vào object `t` trong từng component. Task lớn, làm sau.

### [C14] Profile Stats không auto-refresh sau trận Arena
- [x] `handleOpenProfile` giờ luôn fetch `getDoc` từ Firestore mỗi lần mở modal (không cache). ✅ **ĐÃ SỬA**

### [C15] Navbar ẩn/hiện (hideNav) không hoạt động
- [x] Đã kiểm tra: listener `app-scroll` đã được thêm vào `App.jsx` và cập nhật state `hideNav` thành công từ component `Academy.jsx`. ✅ **ĐÃ SỬA**

### [C16] ⚠️ Toàn bộ dữ liệu học tập chỉ lưu localStorage — KHÔNG đồng bộ lên cloud
- [x] **App.jsx:** Khi đăng nhập, hydrate `academyProgress`, `lastLessonId`, `quizStreak`, `lastQuizDate`, `tradingLogs` từ Firestore vào localStorage. ✅
- [x] **Academy.jsx:** `toggleComplete` và `markLessonCompleted` đều sync lên Firestore (debounce 800ms). `selectedId` cũng được sync khi thay đổi. ✅
- [x] **DailyQuiz.jsx:** Khi hoàn thành 10 câu, sync `quizStreak` và `lastQuizDate` lên Firestore. ✅
- [x] **TradingJournal.jsx:** Mỗi khi thêm log mới, sync toàn bộ `tradingLogs[]` lên Firestore. ✅
- **ĐÃ SỬA** ✅

---

*Lưu ý: Đánh dấu `[x]` thay cho `[ ]` khi một lỗi được sửa xong.*
