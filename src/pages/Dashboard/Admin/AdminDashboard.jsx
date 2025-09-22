import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Users, ClipboardList } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Fetch users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  // Fetch payments/bookings
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  if (usersLoading || paymentsLoading) return <Loading />;

  const totalUsers = users.filter(u => u.role === "customer").length;
  const totalProviders = users.filter(u => u.role === "provider").length;
  const totalBookings = payments.length;

  const handleRowClick = (payment) => {
    setModalData(payment);
    setModalOpen(true);
  };

  return (
    <div className="max-w-[1360px] mx-auto md:px-3 mt-10">
      {/* Heading */}
      <h2 className="text-xl md:text-4xl font-bold text-gray-800 mb-8">
        Admin <span className="text-[#cc3273]">Dashboard</span>
      </h2>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition">
          <User className="w-10 h-10" />
          <div>
            <p className="text-3xl font-bold">{totalUsers}</p>
            <p className="text-sm font-medium">Users</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition">
          <Users className="w-10 h-10" />
          <div>
            <p className="text-3xl font-bold">{totalProviders}</p>
            <p className="text-sm font-medium">Providers</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition">
          <ClipboardList className="w-10 h-10" />
          <div>
            <p className="text-3xl font-bold">{totalBookings}</p>
            <p className="text-sm font-medium">Bookings</p>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
             
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((p) => {
              const buyer = users.find(u => u.email === p.buyerEmail);
              return (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleRowClick(p)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{p.serviceTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                    
                   
                    
                    <span>{buyer?.username || "N/A"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.buyerEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer?.phone || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.providerEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">${p.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(p.date).toLocaleString()}</td>
                  
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/*  View Details */}
      <div className="md:hidden grid gap-4">
        {payments.map((p) => {
          const buyer = users.find(u => u.email === p.buyerEmail);
          return (
            <div key={p._id} className="bg-white shadow rounded-xl p-4 flex flex-col space-y-2">
              <p className="font-bold text-lg">{p.serviceTitle}</p>
              <p className="text-sm text-gray-600">Buyer: {buyer?.username || "N/A"}</p>
              <p className="text-sm text-gray-600">Price: ${p.price}</p>
              {p.image && (
                <img src={p.image} alt={p.serviceTitle} className="w-full h-32 object-cover rounded-md" />
              )}
             
              <button
                className="bg-[#cc3273] text-white text-sm px-3 py-2 rounded-md mt-2"
                onClick={() => handleRowClick(p)}
              >
                View Details
              </button>
            </div>
          )
        })}
      </div>

      {/* Mobile Modal */}
      {modalOpen && modalData && (
        <div
          className="fixed inset-0 bg-gray-50 bg-opacity-40 flex items-center justify-center z-50 md:hidden"
          onClick={() => setModalOpen(false)}   
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
            onClick={e => e.stopPropagation()}  
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">{modalData.serviceTitle}</h3>
            {modalData.image && (
              <img src={modalData.image} alt={modalData.serviceTitle} className="w-full h-40 object-cover rounded-md mb-4" />
            )}

            {(() => {
              const buyer = users.find(u => u.email === modalData.buyerEmail);
              return (
                <div className="space-y-2">
                  <p><span className="font-medium">Buyer:</span> {buyer?.username || "N/A"}</p>
                  <p><span className="font-medium">Email:</span> {modalData.buyerEmail}</p>
                  <p><span className="font-medium">Phone:</span> {buyer?.phone || "N/A"}</p>
                  <p><span className="font-medium">Provider:</span> {modalData.providerEmail}</p>
                  <p><span className="font-medium">Price:</span> ${modalData.price}</p>
                  <p><span className="font-medium">Date:</span> {new Date(modalData.date).toLocaleString()}</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
