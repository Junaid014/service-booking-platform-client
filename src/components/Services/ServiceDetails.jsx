import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Shared/Loading";

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [showAll, setShowAll] = useState(false);

  // selected service
  const {
    data: service = {},
    isLoading: serviceLoading,
    isFetching: serviceFetching,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
    keepPreviousData: true,          
    placeholderData: (prev) => prev, 
    refetchOnWindowFocus: false,
  });

  //  category related service
  const {
    data: categoryServices = [],
    isLoading: categoryLoading,
    isFetching: categoryFetching,
  } = useQuery({
    queryKey: ["services", service?.category],
    enabled: !!service?.category,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/services?category=${encodeURIComponent(service.category)}`
      );
      return res.data;
    },
    keepPreviousData: true,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  const visibleServices = showAll
    ? categoryServices
    : categoryServices.slice(0, 4);


  if (serviceLoading || categoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4">
      {/* Left Side */}
      <div className="w-2/5 bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold mb-5 text-gray-900">
          Explore More in {service?.category}
        </h2>

        <div className="space-y-4">
          {visibleServices.map((item) => (
            <Link
              to={`/services/${item._id}`}
              key={item._id}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex flex-col justify-between flex-1">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description?.slice(0, 50)}...
                </p>
                <p className="text-sm font-bold text-indigo-600 mt-1">
                  ${item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {categoryServices.length > 4 && !showAll && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-3/5 bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">{service?.title}</h2>
        <img
          src={service?.image}
          alt={service?.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700">{service?.description}</p>
      </div>
    </div>
  );
};

export default ServiceDetails;
