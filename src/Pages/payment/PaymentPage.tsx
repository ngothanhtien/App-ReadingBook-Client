import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface OrderData {
  orderId: string;
  amount: number;
  orderInfo: string;
  bankCode: string;
}

interface CreatePaymentResponse {
  success: boolean;
  message?: string;
  data?: {
    paymentUrl: string;
  };
}

export default function PaymentPage () {
  const [orderData, setOrderData] = useState<OrderData>({
    orderId: `ORDER${Date.now()}`,
    amount: 100000,
    orderInfo: 'Thanh toán đơn hàng test',
    bankCode: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const API_URL =
    import.meta.env.VITE_API_URL ||
    process.env.REACT_APP_API_URL ||
    'http://localhost:5000';

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handlePayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post<CreatePaymentResponse>(
        `${API_URL}/api/vnpay/create-payment`,
        orderData
      );

      if (response.data.success && response.data.data?.paymentUrl) {
        window.location.href = response.data.data.paymentUrl;
      } else {
        setError(response.data.message || 'Tạo thanh toán thất bại');
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Có lỗi xảy ra khi tạo thanh toán'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Thanh toán VNPay
        </h1>

        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-600">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-5">
          {/* Order ID */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">
              Mã đơn hàng
            </label>
            <input
              type="text"
              name="orderId"
              value={orderData.orderId}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">
              Số tiền (VND)
            </label>
            <input
              type="number"
              name="amount"
              value={orderData.amount}
              min={10000}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none"
              required
            />
          </div>

          {/* Order Info */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">
              Nội dung thanh toán
            </label>
            <input
              type="text"
              name="orderInfo"
              value={orderData.orderInfo}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none"
              required
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">
              Ngân hàng (tùy chọn)
            </label>
            <select
              name="bankCode"
              value={orderData.bankCode}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none"
            >
              <option value="">-- Chọn tại VNPay --</option>
              <option value="VNPAYQR">VNPay QR</option>
              <option value="VNBANK">Ngân hàng nội địa</option>
              <option value="INTCARD">Thẻ quốc tế</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 text-lg font-bold text-white transition-all
              ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg'
              }`}
          >
            {loading ? 'Đang xử lý...' : 'Thanh toán ngay'}
          </button>
        </form>

        {/* Sandbox info */}
        <div className="mt-8 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
          <h3 className="font-semibold mb-2">
            Thông tin test VNPay Sandbox
          </h3>
          <p><strong>Số thẻ:</strong> 9704198526191432198</p>
          <p><strong>Tên chủ thẻ:</strong> NGUYEN VAN A</p>
          <p><strong>Ngày phát hành:</strong> 07/15</p>
          <p><strong>OTP:</strong> 123456</p>
        </div>
      </div>
    </div>
  );
};
