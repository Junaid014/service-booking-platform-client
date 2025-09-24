import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { FaFireAlt, FaEye, FaSearch, FaBan } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";
import Swal from "sweetalert2";

const MakeTrending = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedService, setSelectedService] = useState(null);
  const inputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: services = [],
    isLoading,
    refetch, 
  } = useQuery({
    queryKey: ["approvedServicesTrending", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/services/approved?title=${debouncedSearch}`
      );
      return [...res.data].sort((a, b) => b.soldCount - a.soldCount);
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

 
 

// Toggle Trending API
const handleToggleTrending = async (id, currentStatus) => {
  try {
    await axiosSecure.patch(`/services/trending/${id}`, {
      trending: !currentStatus,
    });
    refetch(); 

    
    Swal.fire({
      icon: currentStatus ? "info" : "success",
      title: currentStatus ? "Removed from Trending" : "Marked as Trending!",
      text: currentStatus
        ? "The service is no longer trending."
        : "This service is now trending!",
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to update trending status.",
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  }
};


  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1360px] mx-auto md:px-3 px-0 py-8 mt-12">
      {/* Heading + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Manage <span className="text-[#cc3273]">Trending Services</span>
        </h2>

        {/* Searchbar */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border border-[#cc3273] rounded-lg shadow-sm focus:ring-2 focus:ring-[#cc3273] focus:outline-none transition"
          />
        </div>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-3">
          <FaBan className="text-5xl text-gray-400" />
          <p className="text-lg font-medium">No matching services found</p>
        </div>
      ) : (
        <>
          {/* Large Screen - Table View */}
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-pink-200 text-[#cc3273]">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Service Name</th>
                  <th className="py-3 px-4 text-center">Sold Count</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-b border-b-gray-300 hover:bg-pink-50 transition"
                  >
                    <td className="py-3 px-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">{service.title}</td>
                    <td className="py-3 px-4 text-center font-semibold">
                      {service.soldCount}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() =>
                          handleToggleTrending(service._id, service.trending)
                        }
                        className={`px-4 py-2 cursor-pointer rounded-lg transition flex items-center justify-center gap-2 mx-auto ${
                          service.trending
                            ? "bg-gray-500 text-white hover:bg-gray-600"
                            : "bg-[#cc3273] text-white hover:bg-[#a1255c]"
                        }`}
                      >
                        <FaFireAlt />{" "}
                        {service.trending ? "Remove Trending" : "Make Trending"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small Screen - Card View */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col items-center"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-3">{service.title}</h3>
                <p className="text-gray-800 font-semibold mt-2">
                  Sold: {service.soldCount}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-3 flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <FaEye /> View Details
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal for Small Screen Details */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => setSelectedService(null)}
            >
              ✕
            </button>
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-bold mt-4">{selectedService.title}</h3>
            <p className="text-gray-600 mt-2">{selectedService.description}</p>
            <p className="text-gray-800 font-semibold mt-2">
              Sold: {selectedService.soldCount}
            </p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
              <button
                onClick={() =>
                  handleToggleTrending(
                    selectedService._id,
                    selectedService.trending
                  )
                }
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                  selectedService.trending
                    ? "bg-gray-500 text-white hover:bg-gray-600"
                    : "bg-[#cc3273] text-white hover:bg-[#a1255c]"
                }`}
              >
                <FaFireAlt />{" "}
                {selectedService.trending ? "Remove Trending" : "Make Trending"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeTrending;
