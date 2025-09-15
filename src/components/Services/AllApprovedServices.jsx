import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loading from '../../Shared/Loading';

const AllApprovedServices = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // adjust per your needs

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['allApprovedServices'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services/approved');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Loading/>
    );
  }

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
    <div className="max-w-[1360px] lg:px-0 px-3 md:px-3 mx-auto py-8 mt-12">
      <h2 className="md:text-4xl text-xl font-bold mb-6 text-gray-800">
        All Approved <span className="text-[#cc3273]">Services</span>
      </h2>

      {/* Grid */}
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
                <span className="font-semibold">{service.price} $</span> per/hour
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
          className="px-3 py-1 border rounded text-sm cursor-pointer text-gray-700 hover:bg-pink-100 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 border rounded cursor-pointer text-sm ${
              currentPage === i + 1
                ? 'bg-[#cc3273] text-white'
                : 'text-gray-700 hover:bg-pink-100'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm text-gray-700 cursor-pointer hover:bg-pink-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllApprovedServices;
