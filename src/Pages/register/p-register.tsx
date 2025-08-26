"use client"

import type React from "react"

import { useState } from "react"
import MotionFadeIn from "../../components/animation_scroll"
import { FaEyeSlash,FaEye } from "react-icons/fa"

interface RegisterData{
  fullname: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}
interface ApiResponse {
  message: string;
  user?: any;
}
export default function RegisterPage() {
  const [fullname,setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const registerdata: RegisterData = {
        fullname: fullname.trim(),
        email: email.trim(),
        username: username.trim(),
        password: password.trim(),
        confirm_password: confirmPassword.trim()
      }
      const response = await fetch(`${API_BASE_URL}/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerdata),
      })
      const result: ApiResponse = await response.json()
      if(response.ok){
        setSuccess("Đăng ký thành công! Vui lòng kiểm tra email để tiến hành xác minh!")
        setFullname("")
        setEmail("")
        setUsername("")
        setPassword("")
        setConfirmPassword("")
        setTimeout(()=>{
          setIsLoading(false);
          window.location.href = "/login"
        },2000)
      }else{
        setError(result.message || "Đăng ký thất bại. Vui lòng thử lại")
      }
    } catch (error) {
      console.error("Register error: ", error);
      setError("Lỗi kết nối đến server. Vui lòng kiểm tra lại")
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <MotionFadeIn>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-amber-50/50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-amber-600 h-3"></div>
          <div className="px-8 pt-8 pb-6 text-center">
            <MotionFadeIn custom={1}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-5">
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
                className="h-8 w-8 text-amber-600"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            </MotionFadeIn> 
            <MotionFadeIn custom={2}>
                <h2 className="text-3xl font-bold text-gray-900">Đăng ký tài khoản</h2>
                <p className="mt-2 text-base text-gray-600">Tham gia cộng đồng đọc sách ReadingCorner</p>
            </MotionFadeIn>  
          </div>

          <div className="px-8 pb-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                {success}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Fullname */}
              <MotionFadeIn custom={2}>
                <div>
                <label htmlFor="fullname" className="block text-base font-medium text-gray-700">
                  Họ và tên
                </label>
                <div className="mt-1">
                  <input
                    id="fullname"
                    name="fullname"
                    autoComplete="fullname"
                    type="text"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-600 focus:border-amber-600 sm:text-base"
                    placeholder="Họ và tên của bạn..."
                  />
                </div>
              </div>
              </MotionFadeIn>
              {/* Email */}
              <MotionFadeIn custom={3}>
                <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-600 focus:border-amber-600 sm:text-base"
                    placeholder="your_email@gmail.com"
                  />
                </div>
              </div>
              </MotionFadeIn>
              {/* Tên đăng nhập/username */}
              <MotionFadeIn custom={4}>
                <div>
                <label htmlFor="username" className="block text-base font-medium text-gray-700">
                  Tên đăng nhập
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
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
              {/* mật khẩu */}
              <div>
                <MotionFadeIn custom={5}>
                <label htmlFor="password" className="block text-base font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-600 focus:border-amber-600 sm:text-base"
                    placeholder="••••••••"
                  />
                  <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                  </button>
                </div>
                </MotionFadeIn>
                <MotionFadeIn custom={6}>
                  <p className="mt-1 text-sm text-gray-500">
                    Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số
                  </p>
                </MotionFadeIn>
              </div>
              {/* mật khẩu xác nhận */}
              <MotionFadeIn custom={7}>
                <div>
                <label htmlFor="confirm-password" className="block text-base font-medium text-gray-700">
                  Xác nhận mật khẩu
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-600 focus:border-amber-600 sm:text-base"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                    {showConfirmPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              </MotionFadeIn>
              <MotionFadeIn custom={6}>
                <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-[20px] w-[20px] text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                Đăng ký
              </button>
              </MotionFadeIn>
              <MotionFadeIn custom={5}>
                <div className="text-base text-center mt-6">
                  <span className="text-gray-600">Bạn đã có tài khoản? </span>
                  <a href="/login" className="font-medium text-amber-600 hover:text-amber-700">
                    Đăng nhập
                  </a>
              </div>
              </MotionFadeIn>
            </form>
          </div>
          <div className="bg-amber-600 h-3"></div>
        </div>
      </div>
    </MotionFadeIn>
  )
}
