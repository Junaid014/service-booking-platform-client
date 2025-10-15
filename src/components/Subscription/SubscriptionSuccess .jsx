import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const confirm = async () => {
      try {
        const res = await axiosSecure.post("/subscription/confirm", { sessionId });
        if (res.data.success) {
          setTimeout(() => navigate("/dashboard"), 3000);
        }
      } catch (err) {
        console.error("Subscription confirmation failed:", err);
      }
    };

    if (sessionId) confirm();
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full border border-pink-100"
      >
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-20 h-20 text-[#cc3273] drop-shadow-lg" />
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-800">
          🎉 Subscription Activated!
        </h2>

        <p className="text-gray-600 mt-3 leading-relaxed">
          Thank you, <span className="font-semibold text-[#cc3273]">{user?.username}</span>!
          <br />
          Your subscription is now <span className="font-semibold">active</span>.  
          Enjoy exclusive discounts and premium services.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 bg-[#cc3273] text-white rounded-full shadow-md hover:bg-pink-700 transition-all"
          >
            Go to Dashboard
          </button>

          <p className="text-sm text-gray-500 mt-3">
            Redirecting automatically in a few seconds...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SubscriptionSuccess;
