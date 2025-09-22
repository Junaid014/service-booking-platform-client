import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaUserTie, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalBookings: 0,
    totalEarnings: 0,
    providerEarnings: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-pink-600">
        Admin Dashboard Overview
      </h2>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-600 text-sm">Total Users</p>
            <h3 className="text-xl font-bold">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <FaUserTie className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-600 text-sm">Total Providers</p>
            <h3 className="text-xl font-bold">{stats.totalProviders}</h3>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <FaClipboardList className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <h3 className="text-xl font-bold">{stats.totalBookings}</h3>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <FaMoneyBillWave className="text-3xl text-pink-500" />
          <div>
            <p className="text-gray-600 text-sm">Total Earnings</p>
            <h3 className="text-xl font-bold">${stats.totalEarnings}</h3>
          </div>
        </div>
      </div>

      {/* Provider Earnings Table */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Provider Earnings</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Provider</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {stats.providerEarnings.map((provider) => (
                <tr key={provider._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{provider.name || "N/A"}</td>
                  <td className="p-3 border">{provider.email}</td>
                  <td className="p-3 border font-bold text-green-600">
                    ${provider.earnings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
