"use client"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const processed = useRef(false);
  const API_BASE = "http://localhost:5000/api/users";

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE}/current`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (processed.current) return;

    const processAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      console.log("Token received:", token);

      if (token) {
        localStorage.setItem("accessToken", token);

        // ✅ Đợi lấy dữ liệu user
        const userData = await fetchUserData(token);
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
        }

        processed.current = true;
        navigate("/", { replace: true });
      } else {
        processed.current = true;
        navigate("/login?error=true", { replace: true });
      }
    };

    processAuth();
  }, [navigate]);

  return <p>Đang xử lý đăng nhập...</p>;
};

export default AuthSuccess;
