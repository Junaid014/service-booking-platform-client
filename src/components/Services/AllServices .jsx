import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['allServices'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services');
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center text-lg font-semibold py-10">Loading...</div>;
  }

  return (
    <div className="px-4 py-8 ">
      <h2 className="md:text-4xl text-xl font-bold mb-6 text-gray-800">Services We Provide</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        {services.map(service => (
         <div
  key={service._id}
  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
>
  <img
    src={service.image}
    alt={service.title}
    className="w-full h-48 object-cover"
  />
  <div className="p-4 bg-white text-center">
    <h3 className="text-md py-2 font-semibold text-[#0b2b14] truncate" title={service.title}>
      {service.title}
    </h3>
    <p className="text-sm text-[#0b2b14] mt-1">
      Price: <span className='font-semibold'>{service.price} $</span> per/hour
    </p>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default AllServices;
