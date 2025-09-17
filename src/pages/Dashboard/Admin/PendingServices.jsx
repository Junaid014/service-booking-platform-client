import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const PendingServices = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedService, setSelectedService] = useState(null);

  const { data: services = [], refetch } = useQuery({
    queryKey: ["pending-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data.filter((service) => service.status === "pending");
    },
  });

  const handleAction = async (id, action) => {
    try {
      
      await axiosSecure.patch(`/services/${id}`, { action });
      refetch();
    } catch (error) {
      console.error("Failed to update service status", error);
    }
  };

  return (
    <div className="md:p-6">
      <h2 className="text-2xl text-pink-600 font-semibold mb-4">Pending Services</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3 hidden md:table-cell">Price</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service._id}
                className="transition hover:bg-gray-50 hover:shadow-sm hover:scale-[1.01]"
              >
                <td className="p-3">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                </td>
                <td className="p-3 max-w-[150px] truncate">
                  {service.title}
                </td>
                <td className="p-3 hidden md:table-cell">${service.price}</td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handleAction(service._id, "approve")}
                    className="text-green-600 cursor-pointer hover:text-green-800"
                    title="Approve"
                  >
                    <CheckCircle size={22} />
                  </button>
                  <button
                    onClick={() => handleAction(service._id, "reject")}
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    title="Reject"
                  >
                    <XCircle size={22} />
                  </button>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    title="View"
                  >
                    <Eye size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-sm md:max-w-md shadow-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Service Details</h3>
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <p><strong>Title:</strong> {selectedService.title}</p>
            <p><strong>Price:</strong> ${selectedService.price}</p>
            <p><strong>Location:</strong> {selectedService.location}</p>
            <p><strong>Provider:</strong> {selectedService.userName}</p>
            <p><strong>Email:</strong> {selectedService.userEmail}</p>
            <p><strong>Description:</strong> {selectedService.description}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingServices;
