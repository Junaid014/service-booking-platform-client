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
    : categoryServices.slice(0, 2);


  if (serviceLoading || categoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex md:flex-row  flex-col-reverse gap-4 mt-20 items-start">
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

      {/* right side  */}
     
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

  {/* Add to Cart Button */}
  <button
    className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
  >
    Add to Cart
  </button>
</div>


  {/* below section */}
<div className="grid md:grid-cols-2 gap-6 mt-8">

  {/* Left side - Overview */}
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 className="text-xl font-semibold text-gray-900 mb-3">
      Overview of {service?.title}
    </h3>
    <p className="text-gray-700 leading-relaxed">
      {(() => {
        switch (service?.category) {
          case "Beauty & Wellness":
            return "Our Beauty & Wellness services are designed to provide you with top-class grooming, spa, and self-care experiences at your convenience.";
          case "Cleaning":
            return "We ensure spotless cleaning services for homes, offices, and more. Hygiene and safety are always our top priority.";
          case "Creative & Media":
            return "From photography to graphic design, our Creative & Media experts deliver quality content tailored to your needs.";
          case "Education":
            return "Experienced tutors and educational support to guide you towards academic success.";
          case "Electrical":
            return "Professional electricians to solve wiring, installation, and repair tasks safely and efficiently.";
          case "Event & Lifestyle":
            return "Make every event memorable with our event planning, decoration, and lifestyle services.";
          case "Furniture Assembly":
            return "Quick and reliable furniture assembly services to save you time and hassle.";
          case "Gardening":
            return "Maintain a healthy, green, and beautiful garden with our expert gardening services.";
          case "General Mounting":
            return "Mount anything with ease — from shelves to appliances, we handle it professionally.";
          case "IT & Tech Services":
            return "Skilled IT experts to resolve hardware, software, and networking issues for home or business.";
          case "Painting":
            return "Brighten your space with our professional interior and exterior painting services.";
          case "Pest Control":
            return "Safe and effective pest control to keep your home or office pest-free.";
          case "Plumbing":
            return "From fixing leaks to new installations, our plumbers provide quick and reliable service.";
          case "TV Mounting":
            return "Secure and precise TV mounting for the best viewing experience.";
          case "Trending":
            return "Stay ahead with the latest trending services, tailored to your modern needs.";
          default:
            return "Our services are designed to ensure quality, safety, and customer satisfaction at every step.";
        }
      })()}
    </p>
  </div>

  {/* Right side - Promise card */}
  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Promise</h3>
      <ul className="space-y-1 text-sm text-gray-700">
        <li className="flex items-center gap-2">
          <span className="text-green-600">✔</span> Verified Professionals
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-600">✔</span> Hassle Free Booking
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-600">✔</span> Transparent Pricing
        </li>
      </ul>
    </div>
    <img
      src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
      alt="quality assurance"
      className="w-16 h-16 object-contain"
    />
  </div>
</div>

{/* Note to Customer */}
<div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow">
  <h3 className="text-lg font-semibold text-gray-900 mb-3">Note To Customer:</h3>
  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
    <li>If any delay happens by customer (30 minutes +), an extra charge will be added with the service price.</li>
    <li>After delivering the service, the customer must cross-check before the service person leaves. No complaints will be accepted afterward.</li>
    <li>Make sure to keep expensive belongings in a safe place.</li>
    <li>Customer must provide fresh water and electricity to support the service person.</li>
    <li>The service price might change if the working area is in very poor condition.</li>
    <li>If the work area increases, then extra charges will be applied.</li>
  </ul>
</div>

</div>


    </div>
  );
};

export default ServiceDetails;
