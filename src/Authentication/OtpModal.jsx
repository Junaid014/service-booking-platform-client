import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const OtpModal = ({ isOpen, onClose, phone, onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp) return toast.error("Enter OTP");
    try {
      await onVerify(otp); 
      setOtp("");
      onClose(); 
    } catch (err) {
      toast.error(err || "OTP verification failed!");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-80">
          <Dialog.Title className="text-lg font-bold text-center">
            Verify OTP
          </Dialog.Title>
          <p className="text-sm text-gray-500 text-center mt-2">
            OTP sent to {phone}
          </p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="mt-4 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleVerify}
            className="mt-4 w-full bg-[#cc3273] text-white py-2 rounded-lg"
          >
            Verify
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OtpModal;
