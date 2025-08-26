"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Layout from "../../components/layout-masterpage"
import { FaEyeSlash,FaEye } from "react-icons/fa"
import validators from "../../error/general_error"

export default function ProfilePage() {
  const [username,setUsername] = useState("");
  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [currentPassword,setcurrentPassword] = useState("");
  const [newPassword,setnewPassword] = useState("");
  const [confirmNewPassword,setconfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  //tính năng thay avatar:
  const [avatar,setAvatar] = useState("");
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const BASE_URL = "http://localhost:5000/api/users";
  const [showPasswordSection, setShowPasswordSection] = useState(false)
    // State cho UI
  const [errors, setErrors] = useState<Record<string, string>>({})

  const setFieldError = (field: string, message?: string) => {
    setErrors(prev => {
      if(!message){
        const {[field]: _, ...rest} = prev;
        return rest;
      }
      return {...prev, [field]:message};
    })
  }
  // onchanges: tất cả các trường
  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setFullname(value);
    if(!value.trim()){
      setFieldError("fullname","❌ Vui lòng nhập họ và tên của bạn!");
    }else if(!validators.onlyRegularChar(value)){
      setFieldError("fullname","❌ Họ và tên của bạn có chứa ký tự không hợp lệ!");
    }else if(value.length < 5 || value.length > 28 ){
      setFieldError("fullname","❌ Tên đầy đủ hợp lệ từ 5 đến 28 ký tự!");
    }else{
      setFieldError("fullname");
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setUsername(value);
    if(!value.trim()){
      setFieldError("username","❌ Vui lòng nhập tên người dùng!");
    }else if(!validators.onlyRegularCharAndNumber(value)){
      setFieldError("username","❌ Tên đăng nhập chỉ bao gồm chữ,số và không có khoảng trắng!");
    }else if(value.length < 6 || value.length > 25 ){
      setFieldError("username","❌ Tên đăng nhập hợp lệ từ 6 - 25 ký tự!");
    }else {
      setFieldError("username");
    }
  }

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setcurrentPassword(value);
    if(showPasswordSection){
      if(!value.trim()){
        setFieldError("currentpassword","❌ Vui lòng nhập mật khẩu hiện tại!");
      }else {
        setFieldError("currentpassword");
      }
    }
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setnewPassword(value);
    if(!value.trim()){
      setFieldError("newpassword","❌ Vui lòng nhập mật khẩu mới!");
    }else if(!validators.isValidPassword(value)){
      setFieldError("newpassword","❌ Mật khẩu mới không đúng định dạng!");
    }else {
      setFieldError("newpassword");
    }
  }

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setconfirmNewPassword(value);
    if(!value.trim()){
      setFieldError("confirmnewpassword","❌ Vui lòng nhập mật khẩu xác nhận!");
    }else if(value !== newPassword){
      setFieldError("confirmnewpassword","❌ Mật khẩu xác nhận không trùng khớp!");
    }else {
      setFieldError("confirmnewpassword");
    }
  }
  const isCheckPasswordSection = (): boolean => {
    let hasError = false;

    if (!currentPassword) {
      setFieldError("currentpassword", "❌ Vui lòng nhập mật khẩu hiện tại!");
      hasError = true;
    }

    if (!newPassword) {
      setFieldError("newpassword", "❌ Vui lòng nhập mật khẩu mới!");
      hasError = true;
    }

    if (!confirmNewPassword) {
      setFieldError("confirmnewpassword", "❌ Vui lòng nhập mật khẩu xác nhận!");
      hasError = true;
    }
  return !hasError;
};
  // load dữ liệu từ token
  const getDataUser = async () => {
      const token = localStorage.getItem("accessToken");
      if(!token) return;

      try {
          const response = await fetch(`${BASE_URL}/current`,{
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          })
          const data = await response.json();
          if(response.ok){
            setUsername(data.username);
            setFullname(data.fullname);
            setEmail(data.email);
          }else{
            setUsername("");
            setFullname("");
            setEmail("");
            console.error("Lỗi:", data.message);
          }
      } catch (error) {
        console.error("Lỗi kết nối: ",error);
      }
  }
  useEffect(()=>{
    getDataUser();
  },[]);
  
  // thay đổi thông tin
  const handlerChangeInfor = async(e: React.FormEvent) => {
    e.preventDefault();
    if(showPasswordSection && !isCheckPasswordSection()){
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${BASE_URL}/change-information`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(showPasswordSection ? {
          fullname,
          username,
          oldPassword: currentPassword,
          newPassword,
          confirmNewPassword: confirmNewPassword
        }: {
          fullname,
          username,
        })
      })
      const data = await response.json();
      if(response.ok){
        setTimeout(()=>{
          setSuccessMessage(data.message || "Cập nhật thông tin thành công");
          setErrors(prev => ({ ...prev, general: "" }));
          getDataUser();
           if (showPasswordSection) {
            setcurrentPassword("");
            setnewPassword("");
            setconfirmNewPassword("");
            setShowPasswordSection(false); // reset UI nếu muốn
          }
          setIsLoading(false);
        },2000)
      }else{
        setTimeout(()=>{
          console.error("Lỗi server:", data); // xem rõ lỗi
          setErrors(prev => ({ ...prev, general: data.message }));
          setSuccessMessage("");
          setIsLoading(false);
        },2000)
      }
    } catch (error) {
      console.error("Lỗi: ",error);
      setTimeout(()=>{
        setIsLoading(false);
      },2000)
    }
  }
  
  // xử lý load ảnh
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Kiểm tra kích thước file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, avatar: "Kích thước file không được vượt quá 5MB" }))
        return
      }

      // Kiểm tra định dạng file
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, avatar: "Vui lòng chọn file hình ảnh" }))
        return
      }

      // Tạo URL preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
        setErrors((prev) => ({ ...prev, avatar: "" }))
      }
      reader.readAsDataURL(file)
    }
  }
  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }
  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(false);
    if(showPasswordSection){
      setnewPassword("");
      setcurrentPassword("");
      setconfirmNewPassword("");
      setShowPasswordSection(false);
    }
    setAvatar("");
    setFieldError("fullname");
    setFieldError("username");
    setFieldError("currentpassword");
    setFieldError("newpassword");
    setFieldError("confirmnewpassword");
    getDataUser();
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] bg-amber-50/30 py-8 px-4 sm:px-6 lg:px-8 mt-20 mb-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Thông tin tài khoản</h1>
            <p className="mt-2 text-gray-600 text-xl">Cập nhật thông tin cá nhân của bạn</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {successMessage}
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">❌ {errors.general}</div>
          )}

          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-amber-600 h-2"></div>

            <form className="p-6 sm:p-8">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                    <img
                      src={avatar ? avatar :"https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900">Ảnh đại diện</h3>
                  <p className="text-sm text-gray-600 mt-1">Nhấn vào biểu tượng + để thay đổi ảnh đại diện</p>
                  <p className="text-xs text-gray-500 mt-1">Định dạng: JPG, PNG. Kích thước tối đa: 5MB</p>
                  {errors.avatar && <p className="text-red-600 text-sm mt-1">{errors.avatar}</p>}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Họ và tên */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullname}
                    onChange={handleFullnameChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none  focus:border-amber-500 transition-colors ${
                      errors.fullname ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Nhập họ và tên của bạn"
                  />
                  {errors.fullname && <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>}
                </div>

                {/* Tên người dùng */}
                <div>
                  <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-2">
                    Tên người dùng *
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none  focus:border-amber-500 transition-colors ${
                      errors.username ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="username"
                  />
                  {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                    Địa chỉ Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    value={email}
                    className="w-full text-base px-4 py-3 border rounded-lg bg-gray-100 transition-colors border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Thay đổi mật khẩu</h3>
                  <button
                    type="button"
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    {showPasswordSection ? "Hủy thay đổi ▲" : "Thay đổi mật khẩu ▼"}
                  </button>
                </div>

                {showPasswordSection && (
                  <div className="grid grid-cols-1 gap-6">
                    {/* Mật khẩu hiện tại */}
                    <div>
                      <label htmlFor="currentPassword" className="block text-base font-medium text-gray-700 mb-2">
                        Mật khẩu hiện tại *
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          id="currentPassword"
                          value={currentPassword}
                          onChange={handleCurrentPasswordChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.currentpassword ? "border-red-600" : "border-gray-300"
                          }`}
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPasswords.current ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.currentpassword && <p className="text-red-600 text-sm mt-1">{errors.currentpassword}</p>}
                    </div>

                    {/* Mật khẩu mới */}
                    <div>
                      <label htmlFor="newPassword" className="block text-base font-medium text-gray-700 mb-2">
                        Mật khẩu mới *
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          id="newPassword"
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.newpassword ? "border-red-600" : "border-gray-300"
                          }`}
                          placeholder="Nhập mật khẩu mới"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPasswords.new ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.newpassword && <p className="text-red-600 text-sm mt-1">{errors.newpassword}</p>}
                      <p className="text-sm text-gray-500 mt-1">Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số</p>
                    </div>

                    {/* Xác nhận mật khẩu mới */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-2">
                        Xác nhận mật khẩu mới *
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmNewPassword}
                          onChange={handleConfirmNewPasswordChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.confirmnewpassword ? "border-red-600" : "border-gray-300"
                          }`}
                          placeholder="Nhập lại mật khẩu mới"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPasswords.confirm ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.confirmnewpassword && <p className="text-red-600 text-sm mt-1">{errors.confirmnewpassword}</p>}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handlerChangeInfor}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:ring-1 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
