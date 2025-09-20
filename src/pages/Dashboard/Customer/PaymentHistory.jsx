import { useEffect, useState } from "react";
import { FaInfoCircle, FaRegEdit, FaStar } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null); 
  const [reviewModal, setReviewModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/history/${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  // Submit Review
  const handleSubmitReview = async () => {
     if (!rating || !comment) {
    Swal.fire({
      title: "Missing Fields",
      text: "Please provide both rating and comment.",
      icon: "warning",
      confirmButtonColor: "#cc3273"
    });
    return;
  }

    const reviewData = {
      serviceId: reviewModal.serviceId,
      userEmail: user.email,
      userName: user.username || "Anonymous",
      rating,
      comment,
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      Swal.fire({
        title: "Review Submitted!",
        text: "Thank you for your feedback.",
        icon: "success",
        confirmButtonColor: "#cc3273"
      });

      setReviewModal(null);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Review Submitted!",
        text: "Thank you for your feedback.",
        icon: "success",
        confirmButtonColor: "#cc3273"
      });

    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-1 md:p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="md:text-3xl text-lg font-bold md:text-center text-[#cc3273] mb-6">
        My Payment History
      </h2>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 0V6m0 6v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg text-center font-medium">No payments found</p>
          <p className="text-sm text-center text-gray-400">
            Your completed transactions will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* ✅ Large screen: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-pink-50 text-[#cc3273] text-left">
                  <th className="p-3">Service</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-b-gray-300 hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{p.serviceTitle}</td>
                    <td className="p-3">{p.providerEmail}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      ${p.price}
                    </td>
                    <td className="p-3 text-sm text-gray-500">
                      {new Date(p.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-xs text-gray-400">
                      {p.transactionId}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => setReviewModal(p)}
                        className="px-3.5 py-1 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*  Small screen: Card view */}
          <div className="grid gap-4 md:hidden">
            {payments.map((p) => (
              <div
                key={p._id}
                className="border border-gray-300 rounded-lg p-2 shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold text-[#cc3273]">
                  {p.serviceTitle}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-green-600 font-bold">${p.price}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(p.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-between gap-4 mt-2">

                  <button
                    onClick={() => setSelectedPayment(p)}
                    className="flex items-center gap-1 px-5 py-1.5 text-xs cursor-pointer text-blue-600 border border-blue-600 bg-white rounded-lg font-semibold shadow-md hover:text-white hover:bg-blue-600 transition"
                  >
                    <FaInfoCircle /> Details
                  </button>
                  <button
                    onClick={() => setReviewModal(p)}
                    className="flex items-center gap-1 px-5 py-1.5 text-xs cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-semibold shadow-md hover:text-white hover:bg-[#cc3273] transition"
                  >
                    <FaRegEdit /> Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/*  Details Modal (small devices) */}
      {selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedPayment(null)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-lg w-11/12 max-w-sm p-6 z-10">
            <h3 className="text-lg font-bold text-pink-600 mb-3 flex items-center gap-2">
              <FaInfoCircle /> Payment Details
            </h3>
            <p><span className="font-semibold">Service:</span> {selectedPayment.serviceTitle}</p>
            <p><span className="font-semibold">Provider:</span> {selectedPayment.providerEmail}</p>
            <p className="text-green-600 font-semibold">
              <span className="font-semibold text-gray-700">Price:</span> ${selectedPayment.price}
            </p>
            <p><span className="font-semibold">Date:</span> {new Date(selectedPayment.date).toLocaleDateString()}</p>
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-gray-600">Transaction ID:</span> {selectedPayment.transactionId}
            </p>


          </div>
        </div>
      )}

      {/* ✅ Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setReviewModal(null)}
          ></div>

          {/* modal box */}
          <div className="relative bg-white rounded-xl shadow-lg w-11/12 max-w-sm p-6 z-10">
            <h3 className="text-xl font-bold text-[#cc3273] mb-4">
              Leave a Review
            </h3>

            {/*  Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${star <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-lg p-2 mb-4 text-sm"
              rows={3}
            />

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleSubmitReview}
                className="flex-1 px-3 py-2 cursor-pointer bg-[#cc3273] text-white rounded-lg hover:bg-pink-700 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setReviewModal(null)}
                className="flex-1 px-3 py-2 cursor-pointer bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
