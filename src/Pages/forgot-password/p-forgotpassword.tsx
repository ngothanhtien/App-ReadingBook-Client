"use client"

import type React from "react"
import { FaArrowLeft,FaEyeSlash,FaEye } from "react-icons/fa"
import { useState } from "react"
import MotionFadeIn from "../../components/animation_scroll"

type Step = "requestOtpFromEmail" | "verifyOTP" | "resetPassword";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("requestOtpFromEmail");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [showCFPassword,setCFShowPassword] = useState(false);
  const API_BASE_URL ="http://localhost:5000/api/reset-password";

  const HandlerRequestOtpFromEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if(res.ok){        
        setTimeout(() => {
          setMessage(data.message || "Đã gửi mã xác thực đến email của bạn. Vui lòng kiểm tra hộp thư đến.")
          setError("");
          setStep("verifyOTP");
          setIsLoading(false);
        }, 2000);
      }else{ 
        setTimeout(()=>{
          setError(data.message || "Đã xảy ra lỗi khi gửi mã xác thực. Vui lòng thử lại sau.");
          setIsLoading(false);
        },2000)
      } 
    } catch (error) {
      setTimeout(()=>{
        setError("Đã xảy ra lỗi khi gửi mã xác thực. Vui lòng thử lại sau.");
        setIsLoading(false);
      },2000)
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data  = await res.json();
      if(res.ok){
        setTimeout(() => {
          setMessage("Xác thực thành công. Vui lòng nhập mật khẩu mới.");
          setStep("resetPassword");
          setIsLoading(false);
        },2000);
      }else{
        setTimeout(()=> {
          setError(data.message || "Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.");
          setIsLoading(false);
        },2000)
      }
    } catch (error) {
      setTimeout(()=> {
        setError("Đã xảy ra lỗi khi xác thực mã OTP. Vui lòng thử lại sau.");
        setIsLoading(false);
      }) 
    }
  };

  const handlerResetPassword = async (e: React.FormEvent) => {
    console.log(email,newPassword,confirmPassword);
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email,newPassword: newPassword,confirm_newpassword: confirmPassword}),
      })
      const data = await res.json();
      if(res.ok) {
        setTimeout(() => {
          setMessage(data.message || "Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới.");
          setNewPassword("");
          setConfirmPassword("");
          setIsLoading(false);
          window.location.href = "/login";
        }, 3000);
      }else{
        setTimeout(()=>{
          setError(data.message || "Không thể thay đổi mật khẩu");
          setIsLoading(false);
        },2000);
      }
    } catch (error) {
      setTimeout(()=>{
        setError("Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại sau.");
        setIsLoading(false);
      },2000); 
    }
  };
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
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
            </MotionFadeIn>
            <MotionFadeIn custom={2}>
                <h2 className="text-3xl font-bold text-gray-900">Quên mật khẩu</h2>
                <p className="mt-2 text-base text-gray-600">
                {
                step === "requestOtpFromEmail" 
                ? "Nhập email của bạn để đặt lại mật khẩu" : step ==="verifyOTP" ? "Vui lòng kiểm tra email của bạn" : "Nhập mật khẩu mới"
                }
            </p>
            </MotionFadeIn>
          </div>

          <div className="px-8 pb-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">{error}</div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                {message}
              </div>
            )}
            {step ==="requestOtpFromEmail" && (
              <form className="space-y-6" onSubmit={HandlerRequestOtpFromEmail}>
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
                            className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-base"
                            placeholder="your_email@gmail.com"
                            />
                        </div>
                    </div>
                </MotionFadeIn> 
                <MotionFadeIn custom={4}>
                    <div>
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
                        Gửi yêu cầu
                    </button>
                    </div>
                </MotionFadeIn>             
              </form>
              )}
              {step ==="verifyOTP" && (
              <form className="space-y-6" onSubmit={handleVerifyOTP}>
                    <div>
                        <label htmlFor="otp" className="block text-base font-medium text-gray-700">
                            Mã OTP
                        </label>
                        <div className="mt-1">
                            <input
                            id="otp"
                            name="otp"
                            type="number"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-base"
                            placeholder="1234.."
                            />
                        </div>
                    </div>
                    <div>
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
                        Xác Thực OTP
                    </button>
                    </div>            
              </form>
              )}
              {step === "resetPassword" && (
              <form className="space-y-6" onSubmit={handlerResetPassword}>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    Mật khẩu mới
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="new-password"
                      name="new-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
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
                  <p className="mt-1 text-sm text-gray-500">
                    Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số
                  </p>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type={showCFPassword ? "text" : "password"}
                      autoComplete="confirm-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setCFShowPassword(!showCFPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showCFPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
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
                    Xác nhận thay đổi
                  </button>
                </div>
              </form>
            )}
            <MotionFadeIn custom={5}>
                <div className="text-base text-left mt-6">
                <a href="/login" className="flex items-center font-medium text-amber-600 hover:text-amber-500">
                    <FaArrowLeft className="mr-2"/> Quay lại trang đăng nhập
                </a>
                </div>
            </MotionFadeIn>
          </div>
          <div className="bg-amber-600 h-3"></div>
        </div>
      </div>
    </MotionFadeIn>
  )
}
