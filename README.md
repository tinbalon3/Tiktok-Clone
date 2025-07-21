# TikTok Clone với Next.js

Dự án này là một bản sao (clone) cơ bản của TikTok, xây dựng bằng [Next.js](https://nextjs.org), sử dụng Appwrite làm backend lưu trữ dữ liệu, video và xác thực người dùng.

## Tính năng nổi bật
- Đăng nhập/Đăng ký tài khoản
- Xem danh sách video dạng feed (For You, Following)
- Xem chi tiết video, tự động phát/tạm dừng khi cuộn
- Like, bình luận video
- Đăng video mới (upload video, caption)
- Tìm kiếm người dùng
- Trang cá nhân: xem thông tin, video đã đăng
- Chỉnh sửa hồ sơ cá nhân (avatar, tên, bio)
- Sidebar gợi ý tài khoản, tài khoản đang theo dõi
- Responsive UI, tối ưu cho desktop

## Công nghệ sử dụng
- **Next.js** (App Router, Client Component)
- **React** 19
- **Appwrite** (Database, Storage, Auth)
- **TailwindCSS**
- **Zustand** (quản lý state)
- **React Icons**, **Moment.js**

## Cấu trúc thư mục chính
```
tiktok-clone-nextjs/
  app/
    components/         # Các component giao diện (video, bình luận, overlay...)
    context/            # Context quản lý user
    hooks/              # Custom hooks (gọi API, xử lý logic)
    layouts/            # Layout tổng, sidebar, topnav
    post/               # Trang chi tiết video
    profile/            # Trang cá nhân
    store/              # State management với Zustand
    types.tsx           # Định nghĩa kiểu dữ liệu
    upload/             # Trang upload video
    page.tsx            # Trang chủ (feed video)
  libs/                 # Cấu hình Appwrite client
  public/               # Ảnh, video demo, logo
  README.md
  package.json
```

## Hướng dẫn cài đặt & chạy dự án
1. Cài đặt dependencies:
   ```bash
   npm install
   # hoặc
   yarn install
   ```
2. Tạo file `.env.local` và cấu hình các biến môi trường Appwrite:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=...
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=...
   NEXT_PUBLIC_DATABASE_ID=...
   NEXT_PUBLIC_COLLECTION_ID_PROFILE=...
   NEXT_PUBLIC_COLLECTION_ID_POST=...
   ...
   ```
3. Chạy server phát triển:
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```
4. Truy cập [http://localhost:3000](http://localhost:3000) để sử dụng ứng dụng.

## Một số mô tả tính năng
- **Đăng nhập/Đăng ký:** Overlay popup, chuyển đổi giữa login/register, xác thực qua Appwrite.
- **Feed video:** Tự động phát/tạm dừng video khi cuộn, like, bình luận trực tiếp.
- **Upload video:** Chỉ user đăng nhập mới được upload, chọn file video và caption.
- **Trang cá nhân:** Xem thông tin, video đã đăng, chỉnh sửa hồ sơ (avatar, tên, bio).
- **Sidebar:** Gợi ý tài khoản, tài khoản đang theo dõi, các liên kết thông tin.
- **Tìm kiếm:** Tìm kiếm user theo tên trên thanh topnav.

## Đóng góp
Mọi ý kiến đóng góp, pull request đều được hoan nghênh!

---
Dự án dành cho mục đích học tập, phi thương mại.
