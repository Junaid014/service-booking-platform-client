// import { useState } from "react";
// import useAuth from "../hooks/useAuth";
// import { useLocation, useNavigate, Link } from "react-router";
// import { toast } from "react-toastify";
// import OtpModal from "./OtpModal";


// const Login = () => {
//   const { login, sendOtp, verifyOtp } = useAuth();
//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   const [pendingPhone, setPendingPhone] = useState("");
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   console.log("Login page location.state:", location.state);
//   const [formData, setFormData] = useState({
//     phone: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   //  phone validation
//   const isValidBDPhone = (phone) => {
//     const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
//     return bdPhoneRegex.test(phone);
//   };

//     const handleLogin = async (e) => {
//     e.preventDefault();
//     const { phone, password } = formData;

//     if (!phone || !password) return toast.error("Phone and password are required!");
//     if (!isValidBDPhone(phone)) return toast.error("Invalid Bangladesh phone number!");

//     try {
//       const res = await login({ phone, password });

//       // Login success , send otp
//       await sendOtp(phone);
//       setPendingPhone(phone);
//       setOtpModalOpen(true);

//     } catch (err) {
//       toast.error(err || "Login failed!");
//     }
//   };

//   const handleOtpVerify = async (otp) => {
//     const res = await verifyOtp({ phone: pendingPhone, otp });
//     toast.success("Login successful!");
//     navigate(location.state ? location.state : "/");
//     setFormData({ phone: "", password: "" });
//   };

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   const { phone, password } = formData;

//   //   // Frontend validation
//   //   if (!phone || !password) return toast.error("Phone and password are required!");
//   //   if (!isValidBDPhone(phone)) return toast.error("Invalid Bangladesh phone number!");

//   //   try {
//   //     const res = await login({ phone, password });

//   //     toast.success(res.message || "Login successful!");
//   //     navigate(`${location.state ? location.state : "/"}`);

//   //     setFormData({ phone: "", password: "" });
//   //   } catch (err) {
//   //     toast.error(err || "Login failed!");
//   //   }
//   // };

//   return (
//     <>
//     <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Welcome Back
//       </h2>
//       <form onSubmit={handleLogin} className="space-y-5">
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone (Bangladesh)"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//         />
//         <button
//           type="submit"
//           className="w-full cursor-pointer bg-[#cc3273]  text-white font-semibold py-3 rounded-xl shadow-md transition"
//         >
//           Login
//         </button>
//       </form>

//       {/* Sign up link */}
//       <p className="text-center text-gray-600 mt-6">
//         New to this site?{" "}
//        <Link
//   to="/auth/signUp"
//   state={{ from: location.state?.from?.pathname || "/" }}
// >
//   Sign Up
// </Link>

// {/* <Link
//     to="/auth/signUp"
//     state={location.state || { from: { pathname: "/" } }}
//     onClick={() => console.log("Login page sending state to SignUp:", location.state)}
//   >
//     Sign Up
//   </Link> */}

//       </p>
//     </div>

//     <OtpModal
//         isOpen={otpModalOpen}
//         onClose={() => setOtpModalOpen(false)}
//         phone={pendingPhone}
//         onVerify={handleOtpVerify}
//       />
//     </>
//   );
// };

// export default Login;




import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

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
      const res = await login({ phone, password });

      toast.success(res.message || "Login successful!");
      navigate(`${location.state ? location.state : "/"}`);
      setFormData({ phone: "", password: "" });
    } catch (err) {
      toast.error(err || "Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome Back
      </h2>
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
        {/* Password with eye icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <span
            className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-[#cc3273]  text-white font-semibold py-3 rounded-xl shadow-md transition"
        >
          Login
        </button>
      </form>

      {/* Sign up link */}
      <p className="text-center text-gray-600 mt-6">
        New to this site?{" "}
        <Link
          to="/auth/signUp"
          className="text-[#cc3273] hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
