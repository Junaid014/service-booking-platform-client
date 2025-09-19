import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaClipboardList,
  FaCalendarAlt,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ProviderEarnings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null); // modal data

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/provider/${user.email}`)
        .then((res) => {
          setSummary(res.data.summary);
          setHistory(res.data.history);
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto mt-10  md:px-6">
      <h2 className="md:text-3xl text-center text-lg font-bold  text-[#cc3273] mb-8">
        My Earnings Dashboard
      </h2>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center text-center">
            <FaDollarSign className="text-green-500 text-3xl mb-2" />
            <h3 className="font-semibold">Total Earnings</h3>
            <p className="text-xl font-bold text-green-600">
              ${summary.totalEarnings}
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center text-center">
            <FaClipboardList className="text-blue-500 text-3xl mb-2" />
            <h3 className="font-semibold">Total Sales</h3>
            <p className="text-xl font-bold text-blue-600">
              {summary.totalSales}
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center text-center">
            <FaCalendarAlt className="text-purple-500 text-3xl mb-2" />
            <h3 className="font-semibold">Last Payment</h3>
            <p className="text-sm text-gray-600">
              {summary.lastPayment
                ? new Date(summary.lastPayment).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
        {history.length === 0 ? (
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
      d="M9 17v-2a4 4 0 118 0v2m-6 4h4m-2-18a9 9 0 100 18 9 9 0 000-18z"
    />
  </svg>
  <p className="text-lg font-medium">No sales history found</p>
  <p className="text-sm text-gray-400">Your earnings will appear here once you have sales.</p>
</div>

        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-pink-50 text-[#cc3273] text-left">
                <th className="p-3">Service</th>
                <th className="p-3 hidden md:table-cell">Buyer</th>
                <th className="p-3">Price</th>
                <th className="p-3 hidden sm:table-cell">Date</th>
                <th className="p-3 hidden lg:table-cell">Transaction ID</th>
                <th className="p-3 sm:hidden">Details</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr
                  key={h._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{h.serviceTitle}</td>
                  <td className="p-3 hidden md:table-cell">{h.buyerEmail}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    ${h.price}
                  </td>
                  <td className="p-3 hidden sm:table-cell text-sm text-gray-500">
                    {new Date(h.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 hidden lg:table-cell text-xs text-gray-400">
                    {h.transactionId}
                  </td>
                  <td className="p-3 sm:hidden text-center">
                    <button
                      onClick={() => setSelected(h)}
                      className="text-[#cc3273] hover:text-pink-700"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for small devices */}
      {selected && (
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-20 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-semibold text-[#cc3273] mb-4">
              Payment Details
            </h3>
            <p>
              <span className="font-medium">Service:</span>{" "}
              {selected.serviceTitle}
            </p>
            <p>
              <span className="font-medium">Buyer:</span> {selected.buyerEmail}
            </p>
            <p>
              <span className="font-medium">Price:</span> ${selected.price}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(selected.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 break-words">
              <span className="font-medium">Transaction ID:</span>{" "}
              {selected.transactionId}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderEarnings;
