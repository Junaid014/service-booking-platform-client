import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const PendingServices = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ["pending-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data.filter((service) => service.status === "pending");
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const res = await axiosSecure.patch(`/services/${id}`, { action });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-services"]);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-semibold">
        Failed to load pending services.
      </p>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Pending Services
      </h2>
      {services.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          No pending services found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Category</th>
                <th className="px-4 py-3 border-b">Price</th>
                <th className="px-4 py-3 border-b">Location</th>
                <th className="px-4 py-3 border-b">Provider</th>
                <th className="px-4 py-3 border-b text-center">Status</th>
                <th className="px-4 py-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 border-b">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 border-b font-medium text-gray-700">
                    {service.title}
                  </td>
                  <td className="px-4 py-3 border-b">{service.category}</td>
                  <td className="px-4 py-3 border-b">${service.price}</td>
                  <td className="px-4 py-3 border-b">{service.location}</td>
                  <td className="px-4 py-3 border-b">
                    <div>
                      <p className="font-medium">{service.userName}</p>
                      <p className="text-sm text-gray-500">
                        {service.userEmail}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                      {service.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex justify-center gap-2">
                      {/* Approve Button */}
                      <button
                        onClick={() =>
                          mutation.mutate({ id: service._id, action: "approve" })
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        <FaCheckCircle /> Approve
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() =>
                          mutation.mutate({ id: service._id, action: "reject" })
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingServices;
