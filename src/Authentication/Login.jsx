import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //  phone validation
  const isValidBDPhone = (phone) => {
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return bdPhoneRegex.test(phone);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { phone, password } = formData;

    // Frontend validation
    if (!phone || !password) return toast.error("Phone and password are required!");
    if (!isValidBDPhone(phone)) return toast.error("Invalid Bangladesh phone number!");

    try {
      const res = await axiosSecure.post("/api/auth/login", { phone, password });

      toast.success(res.data.message || "Login successful!");
      setFormData({ phone: "", password: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-xl rounded-xl">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="text"
          name="phone"
          placeholder="Phone (Bangladesh)"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
