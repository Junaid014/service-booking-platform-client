

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    
      const res = await register(formData);

      toast.success(res.message || "Registration successful!");
      navigate(location.state ? location.state : "/");

      // Reset form
      setFormData({
        username: "",
        password: "",
        email: "",
        phone: "",
        role: "customer"
      });
    } catch (err) {
      toast.error(err || "Registration failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
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

        {/* Role */}
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
          className="w-full bg-[#cc3273] cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Register
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Already Have an Account?{" "}
        <Link
          to="/auth/login"
          className="text-[#cc3273] hover:underline font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
