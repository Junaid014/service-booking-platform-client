import { Link, useParams, useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Shared/Loading";

import useAuth from "../../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [showAll, setShowAll] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // selected service
  const {
    data: service = {},
    isLoading: serviceLoading,
    isFetching: serviceFetching,
  } = useQuery({
    queryKey: ["approvedService", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/approved/${id}`);
      return res.data;
    },
    keepPreviousData: true,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  // category related service
  const {
    data: categoryServices = [],
    isLoading: categoryLoading,
    isFetching: categoryFetching,
  } = useQuery({
    queryKey: ["approvedServicesByCategory", service?.category],
    enabled: !!service?.category,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/services/approved?category=${encodeURIComponent(service.category)}`
      );
      return res.data;
    },
    keepPreviousData: true,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  const visibleServices = showAll
    ? categoryServices
    : categoryServices.slice(0, 2);


 const handleAddToCart = () => {
  if (!user) {
    navigate("/auth/login", { state: location.pathname });
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // checking if this exact service already in cart
  const existingIndex = cart.findIndex((item) => item._id === service._id);

  if (existingIndex >= 0) {
    
    cart[existingIndex] = {
      _id: service._id,
      title: service.title,
      image: service.image,
      price: Number(service.price),
      quantity, 
    };
  } else {
    cart.push({
      _id: service._id,
      title: service.title,
      image: service.image,
      price: Number(service.price),
      quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));


  navigate(`/myCart/${service._id}`);
};

  if (serviceLoading || categoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col-reverse max-w-[1360px] lg:px-0 px-3 md:px-3  mx-auto gap-4 mt-20 items-start">
      {/* Left Side */}
      <div className="md:w-2/5 w-full bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-4xl font-bold mb-5 text-gray-900">
          {service?.category}
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
                <p className="text-sm font-bold text-[#cc3273] mt-1">
                  ${item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {categoryServices.length > 2 && !showAll && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="md:w-3/5">
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          {/* Image */}
          <img
            src={service?.image}
            alt={service?.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {service?.title}
          </h2>

          {/* Location */}
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-semibold text-gray-700">Location:</span>{" "}
            {service?.location || "Not specified"}
          </p>

          {/* Description */}
          <p className="text-gray-700 mb-4 leading-relaxed">
            {service?.description}
          </p>

          {/* Price */}
          <p className="text-lg font-semibold text-[#cc3273] mb-4">
            Price: ${service?.price}
          </p>

          {/* 🟢 Quantity Selector + Add to Cart */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>

    
      </div>
    </div>
  );
};

export default ServiceDetails;
