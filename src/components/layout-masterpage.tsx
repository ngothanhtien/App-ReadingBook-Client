import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import {useLocation} from "react-router-dom";
import MotionFadeIn from "./animation_scroll";
import UserDropdown from "./user_profile_dropdown";
import {User} from "../model/User";
type LayoutProps = {
  children: React.ReactNode;
};
const navItems = [
  { path_page: '/', name: 'Trang chủ' },
  { path_page: '/category', name: 'Thể loại' },
  { path_page: '/newbook', name: 'Sách' },
  { path_page: '/author', name: 'Tác giả' },
  { path_page: '/introduction', name: 'Giới thiệu' },
];
export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const activePath = useMemo(() => location.pathname, [location.pathname]);
  const [showSearchBar, setShowSearchBar] = useState(false);


  const [user, setUser] = useState<User | null>(null);
  const BASE_URL = "http://localhost:5000/api/users";
  const getDataUser = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log("No access token found.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // lấy thông tin người dùng từ localStorage
  useEffect(() => {
    getDataUser();
  },[]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23.5 23.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[40px] w-[40px] text-amber-600 mt-1 mr-1"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <a href="/" className="text-3xl font-bold ">ReadingCorner</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 ">
              {navItems.map((item,idx) => {
                const isActive = activePath == item.path_page;
                return (
                  <a
                    key={item.path_page}
                    href={item.path_page}
                    className={`relative group text-lg font-medium transition duration-300 hover:text-amber-600 ${
                      isActive ? "text-amber-600 font-bold": "text-black"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute mt-[3px] w-full left-0 -bottom-1 h-[4px] bg-amber-600 transition-transform duration-500 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0  group-hover:scale-x-100"
                    }`}
                    >
                    </span>
                  </a>
                )
              })}     
            </nav>
            <div className="flex items-center gap-4">
                <a href="/search">
                  <button 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0 hover:bg-stone-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 "
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <span className="sr-only">Tìm kiếm</span>
                  </button>
                </a>
              {!user ?
              (<>
               <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md text-lg font-medium ring-offset-background transition-transform ease-in-out duration-700 hover:translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-black border-input bg-white hover:bg-stone-300 hover:text-accent-foreground h-10 px-4 py-4"
              >
                Đăng nhập
              </a>
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-md text-lg font-medium ring-offset-background transition-transform ease-in-out duration-700 hover:translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white bg-black text-primary-foreground hover:bg-stone-700 h-10 px-6 py-3"
              >
                Đăng ký
              </a>
              </>) :
              (<UserDropdown currentUser={user}/>) 
              }
            </div>
          </div>
        </div>
      </header> 
      </div>
      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col gap-6 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <MotionFadeIn custom={1}>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[40ppx] w-[40px] text-amber-600 mt-1 mr-1"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span className="text-3xl font-bold">ReadingCorner</span>
                </div>
              </MotionFadeIn>
              <MotionFadeIn custom={2}>
              <p className="text-base text-muted-foreground text-stone-500">
                Nơi kết nối những người yêu sách và chia sẻ niềm đam mê đọc sách.
              </p>
              </MotionFadeIn>
            </div>
            <MotionFadeIn custom={3}>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Khám phá</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/sach-moi" className="text-base text-muted-foreground hover:text-foreground">
                    Sách mới
                  </a>
                </li>
                <li>
                  <a href="/sach-ban-chay" className="text-base text-muted-foreground hover:text-foreground">
                    Sách bán chạy
                  </a>
                </li>
                <li>
                  <a href="/the-loai" className="text-base text-muted-foreground hover:text-foreground">
                    Thể loại
                  </a>
                </li>
                <li>
                  <a href="/tac-gia" className="text-base text-muted-foreground hover:text-foreground">
                    Tác giả
                  </a>
                </li>
              </ul>
            </div>
            </MotionFadeIn>
            <MotionFadeIn custom={4}>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Cộng đồng</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/dien-dan" className="text-base text-muted-foreground hover:text-foreground">
                      Diễn đàn
                    </a>
                  </li>
                  <li>
                    <a href="/cau-lac-bo" className="text-base text-muted-foreground hover:text-foreground">
                      Câu lạc bộ sách
                    </a>
                  </li>
                  <li>
                    <a href="/su-kien" className="text-base text-muted-foreground hover:text-foreground">
                      Sự kiện
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-base text-muted-foreground hover:text-foreground">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </MotionFadeIn>
            <MotionFadeIn custom={4}>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Hỗ trợ</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/tro-giup" className="text-base text-muted-foreground hover:text-foreground">
                      Trợ giúp
                    </a>
                  </li>
                  <li>
                    <a href="/lien-he" className="text-base text-muted-foreground hover:text-foreground">
                      Liên hệ
                    </a>
                  </li>
                  <li>
                    <a href="/chinh-sach" className="text-base text-muted-foreground hover:text-foreground">
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="/dieu-khoan" className="text-base text-muted-foreground hover:text-foreground">
                      Điều khoản sử dụng
                    </a>
                  </li>
                </ul>
              </div>
            </MotionFadeIn>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ReadingCorner. Tất cả các quyền được bảo lưu.
            </p>
            <MotionFadeIn custom={4}>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[25px] w-[25px]"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[25px] w-[25px]"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[25px] w-[25px]"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/th%C3%A0nh-ti%E1%BA%BFn-ng%C3%B4-597ab8248/" className="text-muted-foreground hover:text-foreground" target="_blank">
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin size={25} color="currentColor" />
                </a>
              </div>
            </MotionFadeIn>
          </div>
        </div>
      </footer>
    </div>
  );
}
