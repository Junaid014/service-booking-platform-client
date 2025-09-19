import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/history/${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

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
                  <th className="p-3">
                     Price
                  </th>
                  <th className="p-3">
                     Date
                  </th>
                  <th className="p-3">Transaction ID</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Small screen: Card view */}
          <div className="grid gap-4 md:hidden">
            {payments.map((p) => (
              <div
                key={p._id}
                className="border border-gray-300 rounded-lg p-2 shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold text-[#cc3273]">
                  {p.serviceTitle}
                </h3>

                {/* Price + Date side by side */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-green-600 font-bold">${p.price}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(p.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Details button */}
                <button
                  onClick={() => setSelectedPayment(p)}
                  className="mt-2 flex items-center gap-1 text-sm text-[#cc3273] hover:underline"
                >
                  <FaInfoCircle /> Details
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ✅ Modal for small devices */}
      {selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedPayment(null)}
          ></div>

          {/* modal box */}
          <div className="relative bg-white rounded-xl shadow-lg w-11/12 max-w-sm p-6 z-10">
            <h3 className="text-xl font-bold text-[#cc3273] mb-4">
              Payment Details
            </h3>
            <p>
              <span className="font-semibold">Service:</span>{" "}
              {selectedPayment.serviceTitle}
            </p>
            <p>
              <span className="font-semibold">Provider:</span>{" "}
              {selectedPayment.providerEmail}
            </p>
            <p className="text-green-600 font-semibold">
              Price: ${selectedPayment.price}
            </p>
            <p className="text-sm text-gray-500">
              Date: {new Date(selectedPayment.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Transaction ID: {selectedPayment.transactionId}
            </p>

            {/* <button
              onClick={() => setSelectedPayment(null)}
              className="mt-4 px-4 py-2 bg-[#cc3273] text-white rounded-lg w-full hover:bg-pink-700 transition"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
