// LoginPromptModal.tsx
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginPromptModal: React.FC<Props> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Vui lòng đăng nhập để đọc sách
        </h2>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            onClick={onLogin}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
