# Kế Hoạch Tối Ưu Mobile UI/UX & Đưa Web Lên Online (Deployment)

File này lưu trữ toàn bộ tiến trình và kế hoạch chi tiết để biến ứng dụng Trading Gym thành một sản phẩm hoạt động hoàn hảo trên mọi thiết bị (Mobile, iPad, PC) và public lên internet.

## Giai Đoạn 1: Tối ưu UI/UX cho Mobile & iPad (Responsive Design)

### 1. Cấu trúc lại Layout Tổng thể & Navigation
- [x] **Sidebar & Header:** 
  - Ẩn Sidebar cố định bên trái khi ở màn hình nhỏ (Mobile/iPad).
  - Thêm thanh Header cố định phía trên cùng cho Mobile chứa nút Menu (Hamburger Icon).
  - Cài đặt hiệu ứng Drawer (trượt ngang từ trái sang) khi bấm nút Menu để hiển thị Sidebar trên Mobile.
- [x] **Padding & Margin:** Giảm thiểu khoảng cách (padding/margin) thừa trên các container chính để tận dụng tối đa không gian màn hình nhỏ (`p-4` thay vì `p-8`).

### 2. Tối ưu các thành phần bên trong (Thành phần học thuật & Flashcards)
- [x] **Flashcards Component:**
  - Đảm bảo thẻ Flashcard tự động co giãn vừa khung màn hình điện thoại.
  - Tối ưu chiều cao của thẻ để không bị che khuất khi nội dung quá dài.
  - Các nút điều khiển (Next, Prev, Flip) cần được làm lớn hơn (tối thiểu `44x44px`) để dễ chạm bằng ngón tay.
- [x] **Bảng biểu (CyberTable):** Thêm thuộc tính `overflow-x-auto` để người dùng có thể vuốt ngang các bảng có nhiều cột (ví dụ: bảng so sánh các thị trường) mà không làm vỡ layout toàn trang.
- [x] **Các thẻ Scenario / Interactive Simulator:** 
  - Đảm bảo các input form (nhập số liệu, tính lot) co lại thành 1 cột (`flex-col` hoặc `grid-cols-1`) thay vì nằm ngang trên điện thoại.
  - Test các Simulator (Tính Kelly, Chuỗi thua, Fibo) trên kích thước màn hình nhỏ.

### 3. Typography & Touch Targets
- [x] **Font chữ:** Dùng các breakpoint của Tailwind (`text-base md:text-lg lg:text-xl`) để font chữ tự động thu nhỏ lại một chút trên điện thoại giúp dễ đọc và không chiếm quá nhiều dòng.
- [x] **Hiệu ứng tương tác:** Loại bỏ hoặc vô hiệu hóa các hiệu ứng `hover` phức tạp trên mobile vì không có chuột, thay thế bằng các hiệu ứng phản hồi ngay khi chạm (`active` hoặc `focus`).

---

## Giai Đoạn 2: Đưa Web lên Online (Deployment & PWA)

### 1. Lưu trữ và Quản lý Source Code
- [x] Khởi tạo kho lưu trữ Git cục bộ (`git init`) nếu chưa có.
- [x] Tạo tài khoản GitHub (nếu bạn chưa có) và đẩy toàn bộ source code của project lên một repository riêng tư (Private Repository).

### 2. Triển khai (Deploy) lên Hosting Miễn Phí (Vercel / Netlify)
- [x] Đăng nhập Vercel (bằng tài khoản GitHub).
- [x] Kết nối repository GitHub với Vercel. Vercel sẽ tự động nhận diện đây là dự án React/Vite và tiến hành build.
- [x] Nhận đường link public (vd: `https://trading-gym.vercel.app`) để truy cập từ bất kỳ thiết bị nào.
- [x] **CI/CD:** Kể từ lúc này, mọi thay đổi code đẩy lên GitHub sẽ tự động cập nhật lên web online trong vòng 1-2 phút.

### 3. Tính năng nâng cao: PWA (Progressive Web App) - *Tuỳ chọn*
- [x] Cấu hình Vite PWA Plugin để biến trang web thành một ứng dụng có thể cài đặt.
- [x] Thiết lập file `manifest.json` và các icons ứng dụng.
- [x] Cho phép người dùng bấm nút **"Thêm vào Màn hình chính" (Add to Home Screen)** trên Safari/Chrome để sử dụng web như một App Native mượt mà không có thanh địa chỉ trình duyệt.

---

*Lưu ý: Chúng ta sẽ đi theo thứ tự từ trên xuống dưới. Vui lòng check các mục `[ ]` thành `[x]` khi hoàn thành để dễ dàng theo dõi tiến độ.*
