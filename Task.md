# Kế Hoạch Xây Dựng SAIB Trading Arena & Ranking System

File này lưu trữ toàn bộ tiến trình và kế hoạch chi tiết để nâng cấp SAIB từ một ứng dụng học tập thành một **Đấu Trường Thực Chiến 1v1 (Trading Arena)** với hệ thống Rank và Gamification siêu gây nghiện.

---

## Giai Đoạn 1: Hệ Thống Rank & Lưu Trữ Tài Sản Vĩnh Viễn
Thay vì số vốn $10,000 bị reset sau mỗi lần F5, tài khoản của người dùng sẽ gắn liền với cơ sở dữ liệu Firebase. Hệ thống Level (Rank) sẽ tự động thăng/giáng cấp dựa trên tổng tài sản.

### 1. Đồng bộ Balance lên Firebase
- [x] **Khởi tạo Firestore Database (Admin cần làm):**
  1. Vào **Firebase Console** -> mục **Build** (hoặc Xây dựng) -> chọn **Firestore Database**.
  2. Bấm **Create database**.
  3. Chọn **Start in test mode** -> Bấm **Next**.
  4. Để location mặc định và bấm **Enable**.
- [x] Tích hợp Firestore vào code (`firebase.js`).
- [x] Tạo Collection `users`, liên kết với `uid` của tài khoản Authentication.
- [x] Lưu `balance` (số dư) của người dùng vào Firestore. Lấy số dư này khi app khởi động thay vì dùng state mặc định $10,000.

### 2. Xây dựng Logic Leveling (Thăng hạng / Giáng cấp)
Xây dựng logic kiểm tra số dư và gán danh hiệu:
- [x] **Beginner**: Dưới $20,000 (Mặc định tài khoản mới nhận cấp vốn $10,000).
- [x] **Intermediate Trader**: Đạt mốc $20,000.
- [x] **Professional Trader**: Đạt mốc $50,000.
- [x] **Grandmaster of Trader**: Đạt mốc $100,000.
- [x] **Giáng cấp**: Viết hàm tự động giáng cấp nếu người chơi giao dịch thua lỗ làm số dư tụt xuống dưới các mốc trên.
- [x] Thêm nút **"Xin cấp lại vốn" (Bailout/Reset)**: Dành cho những tài khoản cháy rụi (ví dụ dưới $500), cho phép họ reset vốn về mốc Beginner ($10,000) nhưng sẽ bị lưu lịch sử "Phá sản".

### 3. Cập nhật Giao diện (UI) Profile & Menu
- [x] Cập nhật góc phải Header: Hiển thị Avatar + Rank Huy Hiệu (Logo nhỏ) kế bên Balance.
- [ ] Thêm tab "Lịch sử giao dịch" hoặc "Thống kê" trong Modal Profile để xem mình đã đạt được bao nhiêu %.

---

## Giai Đoạn 2: Đấu Trường 1v1 Arena (Multiplayer Real-time)
Mang tính năng cốt lõi của ý tưởng: Trận chiến sinh tử 1v1. Người thắng sẽ "nuốt" một phần tiền lãi của người thua.

### 1. Sảnh Chờ (Matchmaking Lobby)
- [ ] Tạo giao diện **Arena**: Hiển thị nút "Tìm đối thủ".
- [ ] Thống kê giao dịch: Cần lưu trữ và tính toán **Tỷ lệ thắng (% Win Rate)** của từng tài khoản lên Firestore để làm cơ sở ghép trận.
- [ ] Logic ghép cặp (Matchmaking): Ghép những người chơi có **% Win Rate tương đương nhau** VÀ nằm trong khoảng **Rank +- 1**. Sự kết hợp này đảm bảo công bằng tuyệt đối và tránh vấn nạn Smurfing (người tay to lập nick Beginner đi hành gà) nhưng vẫn đảm bảo quy mô vốn tương đối đồng đều.
- [ ] Setup thông số trận đấu: Cho phép chọn thời gian đọ sức (VD: 15 phút, 30 phút, 1 giờ).

### 2. Giao diện Sàn Đấu 1v1 (The Battle Ring)
- [ ] Thiết kế Layout phân đôi (Split-screen) hoặc Overlay: Hiển thị PnL (Lợi nhuận) của **Mình** và của **Đối Thủ** theo thời gian thực (Real-time sync qua Firestore).
- [ ] Đồng hồ đếm ngược (Countdown Timer) siêu to và kịch tính.
- [ ] (Nâng cao) Ẩn vị thế (vào lệnh gì) của đối thủ, chỉ hiển thị số tiền PnL đang nhảy số.

### 3. Luật Phân Định Thắng Thua
Sau khi đồng hồ đếm ngược về 0:
- [ ] So sánh tổng Lợi Nhuận (Profit) sinh ra trong khoảng thời gian diễn ra trận đấu (không tính số vốn gốc lúc bắt đầu trận).
- [ ] Người nào Profit cao hơn là Người Thắng.
- [ ] **Hình Phạt & Thưởng**: Hệ thống tự động trừ tiền của Người Thua bằng **1/2 (50%)** số Lợi Nhuận của Người Thắng, và chuyển thẳng vào số dư của Người Thắng.
- [ ] (Trường hợp cả 2 cùng lỗ): Người lỗ ít hơn sẽ thắng và được lấy 1 phần tiền của người lỗ nhiều hơn, hoặc đơn giản là trận hoà. Cần thống nhất kịch bản này với người thiết kế luật.

---
*Lưu ý: Đánh dấu `[x]` thay cho `[ ]` khi một chức năng được hoàn thiện.*
