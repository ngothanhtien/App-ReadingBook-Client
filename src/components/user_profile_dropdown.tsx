import React, { useState } from 'react';
import { ChevronDown, User2Icon, Settings, LogOut, Heart,Bell,DotIcon,Dot } from 'lucide-react';
import {User} from "../model/User";

interface UserDropdownProps {
    currentUser: User;
}
const UserDropdown:React.FC<UserDropdownProps> = ({currentUser}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handlerLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-md hover:bg-stone-200 transition-colors"
      >
        <img
          src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
          alt="User avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="text-left hidden sm:block">
          <div className="text-base font-semibold text-gray-900">Hi,{currentUser.fullname}</div>
          <div className="flex items-center ">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
            <span className="text-base text-green-500">Active</span>
          </div>
        </div>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 text-gray-500 hidden sm:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop để đóng dropdown khi click bên ngoài */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            {/* User Info */}
            <div className="px-4 py-4 border-b border-gray-100">
              <div className="font-semibold text-gray-900">{currentUser.fullname}</div>
              <div className="text-sm text-gray-500 mt-1">{currentUser.email}</div>
              <div className="text-sm text-gray-500 mt-1">Role: User</div>
            </div>

            {/* Menu Items */}
            <div className="py-2">

              <a href='/profile' className="text-gray-700 font-medium">
                <button className="w-full flex items-center px-4 py-3 hover:bg-gray-200 transition-colors group">
                  <User2Icon size={18} className="mr-3 text-gray-500 group-hover:text-gray-700" />
                  Profile
                </button>
              </a>

              <a className="text-gray-700 font-medium">
                <button className="w-full flex items-center px-4 py-3 hover:bg-gray-200 transition-colors group">
                    <Settings size={18} className="mr-3 text-gray-500 group-hover:text-gray-700" />
                    Settings
                </button>          
              </a>

              <a className="text-gray-700 font-medium">
                <button className="w-full flex items-center px-4 py-3 hover:bg-gray-200 transition-colors group">
                    <Heart size={21} className="mr-3 text-gray-500 group-hover:text-gray-700" />
                    Favorite Books 
                </button>
              </a>
              <a className="text-gray-700 font-medium">
                <button className="w-full flex items-center px-4 py-3 hover:bg-gray-200 transition-colors group">
                  <Bell size={21} className="mr-3 text-gray-500 group-hover:text-gray-700" />
                  Notification
                </button>
              </a>
              

            </div>

            {/* Separator */}
            <div className="border-t border-gray-100" />

            {/* Logout */}
            <div className="py-2">
              <button className="w-full flex items-center px-4 py-3 hover:bg-gray-200 transition-colors group"
              onClick={handlerLogout}
              >
                <LogOut size={18} className="mr-3 text-gray-500 group-hover:text-gray-700" />
                <span className="text-gray-700 font-medium">Log out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;