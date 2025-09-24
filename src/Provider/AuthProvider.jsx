

import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Login Function
  const login = async ({ phone, password }) => {
    try {
      const res = await axiosSecure.post("/api/auth/login", { phone, password });

      if (res.data.profile && res.data.token) {
        setUser(res.data.profile);

        // User + Token 
        localStorage.setItem("user", JSON.stringify(res.data.profile));
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Login failed!";
    }
  };

  //  Register Function 
  const register = async (formData) => {
    try {
      const res = await axiosSecure.post("/api/auth/register", formData);
        console.log("Register API response:", res.data);  // 🔍 debug

      if (res.data.profile && res.data.token) {
        setUser(res.data.profile);

        // User + Token 
        localStorage.setItem("user", JSON.stringify(res.data.profile));
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Registration failed!";
    }
  };

  // otp
//   const sendOtp = async (phone) => {
//   try {
//     const res = await axiosSecure.post("/api/auth/send-otp", { phone });
//     return res.data; // { message: "...", expiresAt: ... }
//   } catch (err) {
//     throw err.response?.data?.message || "OTP sending failed!";
//   }
// };

// const verifyOtp = async ({ phone, otp }) => {
//   try {
//     const res = await axiosSecure.post("/api/auth/verify-otp", { phone, otp });
//     if (res.data.profile && res.data.token) {
//       setUser(res.data.profile);
//       localStorage.setItem("user", JSON.stringify(res.data.profile));
//       localStorage.setItem("token", res.data.token);
//     }
//     return res.data;
//   } catch (err) {
//     throw err.response?.data?.message || "OTP verification failed!";
//   }
// };

  //  Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
  };

  // Persist user on reload
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading   }}>
      {children}
    </AuthContext.Provider>
  );
};
