import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import Loading from "../../Shared/Loading";

const AllApprovedServices = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["approvedServices", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/services/approved?title=${debouncedSearch}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  // Pagination Logic
  const totalPages = Math.ceil(services.length / itemsPerPage);
  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-3 md:px-3 lg:px-0 py-8 mt-12">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="md:text-4xl text-2xl font-bold text-gray-800">
          Services We <span className="text-[#cc3273]">Provide</span>
        </h2>

        {/* Searchbar with icon */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border border-[#cc3273] rounded-lg shadow-sm focus:ring-2 focus:ring-[#cc3273] focus:outline-none transition"
          />
        </div>
      </div>

      {isLoading ? (
        <Loading/>
      ) : paginatedServices.length === 0 ? (
        <p className="text-center text-gray-500   py-10 rounded-lg  text-lg font-medium">
  🚫 No services found. Try a different search.
</p>
      ) : (
        <>
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
            {paginatedServices.map((service) => (
              <Link
                to={`/services/${service._id}`}
                key={service._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white text-center">
                  <h3
                    className="text-md py-2 font-semibold text-[#0b2b14] truncate"
                    title={service.title}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#0b2b14] mt-1">
                    Price:{" "}
                    <span className="font-semibold">{service.price} $</span>{" "}
                    per/hour
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-12 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm cursor-pointer text-gray-700 hover:bg-[#cc3273]/10 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 border rounded cursor-pointer text-sm ${
                  currentPage === i + 1
                    ? "bg-[#cc3273] text-white"
                    : "text-gray-700 hover:bg-[#cc3273]/10"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm text-gray-700 cursor-pointer hover:bg-[#cc3273]/10 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllApprovedServices;
