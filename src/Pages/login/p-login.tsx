"use client"

import type React from "react"
import AnimationLoading from '../../components/loading_animation'
import { useCallback ,useState } from "react"
import MotionFadeIn from "../../components/animation_scroll"
import successAnimation from '../../animations/loading_success.json'
import failedAnimation from '../../animations/loading_failed.json'
import { FaEyeSlash,FaEye } from "react-icons/fa"
import {loginUser,APIresLogin} from "../../model/User"

type AnimationState = 'none'|'success'|'failed';

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [animationState,setAnimationState] = useState<AnimationState>('none')

  const API_BASE_LOGIN = "http://localhost:5000/api/users";
  const API_BASE_LOGIN_GG = "http://localhost:5000/api/auth/google";
  const handleGoogleLogin = useCallback(() => {
    window.location.href = API_BASE_LOGIN_GG;
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const logindata: loginUser = {
        username: username.trim(),
        password: password.trim()
      };

      const response = await fetch(`${API_BASE_LOGIN}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logindata)
      });

      const result: APIresLogin = await response.json();

      if (response.ok && result.accessToken && result.user) {
        setAnimationState("success");
        setUsername("");
        setPassword("");
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("Login successful:", result.user);
        setTimeout(() => {
          setAnimationState("none");
          window.location.href = "/";
        }, 2000);
      } else {
        setAnimationState("failed");
        setError(result.message || "Đăng nhập thất bại!");
        setTimeout(() => setAnimationState("none"), 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Lỗi kết nối đến server. Vui lòng kiểm tra lại.");
    } finally {
      setIsLoading(false);
    }
  };
  const renderAnimationOverlay = () => {
    if (animationState === 'none') return null;
    let animationData;
    switch (animationState) {
      case 'success':
        animationData = successAnimation;
        break;
      case 'failed':
        animationData = failedAnimation;
        break;
      default:
        animationData = null;
        break;
    }
        return (
          <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-70">
            <div className="bg-white rounded-lg p-6 shadow-2xl border-gray-300 border">
              <AnimationLoading 
                animationData={animationData}
                loop={false} // Không loop cho success hoặc failed
                width={220}
                height={220}
              />
              {animationState === 'success' && (
                <p className="text-center text-green-600 mt-2 font-semibold">Đăng nhập thành công!</p>
              )}
              {animationState === 'failed' && (
                <p className="text-center text-red-600 mt-2 font-semibold">Đăng nhập thất bại!</p>
              )}
            </div>
          </div>
        );
  };
  return (
    <>
    <MotionFadeIn>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-amber-50/50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-amber-600 h-3"></div>
          <div className="px-8 pt-8 pb-6 text-center">
            <MotionFadeIn custom={1}>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 justify-center w-[50px] h-[50px] rounded-full bg-amber-100 mr-1 mt-1">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 23.5 23.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[35px] w-[35px] text-amber-600"
                    >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                </div>
                <a title="Quay về trang chủ"  href="/" className="text-3xl font-bold ">ReadingCorner</a>
            </div>
            </MotionFadeIn>
            <MotionFadeIn custom={2}>
                <h2 className="text-3xl font-bold text-stone-900 mt-5">Đăng Nhập</h2>
                <p className="mt-2 text-base text-stone-500">Chào mừng bạn quay trở lại với ReadingCorner</p>
            </MotionFadeIn>
          </div>

          <div className="px-8 pb-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
            <MotionFadeIn custom={3}>
                <div>
                <label htmlFor="username" className="block text-base font-medium text-gray-700">
                  Tên đăng nhập
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-600 focus:border-amber-600 sm:text-base"
                    placeholder="Tên đăng nhập của bạn..."
                  />
                </div>
              </div>
            </MotionFadeIn>
            <MotionFadeIn custom={4}>
                <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text": "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-600 focus:border-amber-600 sm:text-base"
                    placeholder="********"
                  />
                  <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  tabIndex={-1}
                  >
                    {showPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </MotionFadeIn>
            <MotionFadeIn custom={5}>
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-base text-gray-700">
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <div className="text-sm">
                  <a title="Tới page lấy lại mật khẩu!" href="/forgot-password" className="font-medium text-base text-amber-600 hover:text-amber-700">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
            </MotionFadeIn>
            <MotionFadeIn custom={6}>
                <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Đăng nhập
                </button>
              </div>
            </MotionFadeIn>
            <MotionFadeIn custom={7}>
                <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="text-[15px] px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>
            </MotionFadeIn>
              
              <div className="grid grid-cols-2 gap-3">
                <MotionFadeIn custom={8}>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                  <svg className="h-[35px] w-[35px] text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-base">Facebook</span>
                </button>
                </MotionFadeIn>
                <MotionFadeIn custom={9}>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="w-full inline-flex justify-center items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                  <svg className="h-[35px] w-[35px]" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="ml-2 text-base">Google</span>
                </button>
                </MotionFadeIn>
              </div>
              <MotionFadeIn custom={10}>
                <div className="text-base text-center mt-6">
                <span className="text-gray-600">Chưa có tài khoản? </span>
                <a href="/register" className="font-medium text-amber-600 hover:text-amber-700">
                  Đăng ký ngay
                </a>
              </div>
              </MotionFadeIn>
            </form>
          </div>
          <div className="bg-amber-600 h-3"></div>
        </div>
      </div>
    </MotionFadeIn> 
    {renderAnimationOverlay()}
    </>
  )
}
