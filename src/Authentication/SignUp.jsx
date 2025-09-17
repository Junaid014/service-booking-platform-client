import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location =useLocation()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "customer" 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const isValidBDPhone = (phone) => {
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return bdPhoneRegex.test(phone);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, password, email, phone, role } = formData;

    
    if (!username || !password || !email || !phone || !role) {
      return toast.error("All fields are required!");
    }

    if (!isValidBDPhone(phone)) {
      return toast.error("Invalid Bangladesh phone number!");
    }

    try {
      const res = await axiosSecure.post("/api/auth/register", formData);
      toast.success(res.data.message || "Registration successful!");
      navigate(`${location.state ? location.state : "/"}`)
      setFormData({ username: "", password: "", email: "", phone: "", role: "customer" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone (Bangladesh)"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role Selection */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
