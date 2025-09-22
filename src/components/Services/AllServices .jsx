import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Loading from '../../Shared/Loading';

const AllServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['approvedServices'], 
    queryFn: async () => {
      const res = await axiosSecure.get('/services/approved'); 
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  
  const isSmallScreen = window.innerWidth < 768; 
  const limitedServices = isSmallScreen ? services.slice(0, 6) : services.slice(0, 8);

  return (
    <div className="max-w-[1360px] lg:px-0 px-3 md:px-3 mx-auto py-8 mt-12">
      <h2 className="md:text-4xl text-xl font-bold mb-6 text-gray-800">
        Services We <span className="text-pink-600">Provide</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
        {limitedServices.map((service) => (
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
              
            </div>
          </Link>
        ))}
      </div>

      
      {services.length > limitedServices.length && (
        <div className="flex justify-center mt-8 mb-8">
          <Link
            to="/allServices"
            className="md:px-5 px-5 py-2 md:py-2.5 text-xs md:text-base cursor-pointer 
            text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-semibold shadow-md  
            hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
          >
            Show All Services
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllServices;
