import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async ({ phone, password }) => {
    try {
      const res = await axiosSecure.post("/api/auth/login", { phone, password });

      if (res.data.profile) {
        setUser(res.data.profile);

      
        localStorage.setItem("user", JSON.stringify(res.data.profile));
      }

      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Login failed!";
    }
  };


const register = async (formData) => {
    try {
      const res = await axiosSecure.post("/api/auth/register", formData);

      if (res.data.profile) {
        setUser(res.data.profile); // ✅ user সেট করা হলো
        localStorage.setItem("user", JSON.stringify(res.data.profile)); // ✅ localStorage এ রাখা হলো
      }

      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Registration failed!";
    }
  };
 
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

 
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
