import { Link, useParams, useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Shared/Loading";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [showAll, setShowAll] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const modalRef = useRef();

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Selected service
  const { data: service = {}, isLoading: serviceLoading } = useQuery({
    queryKey: ["approvedService", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/approved/${id}`);
      return res.data;
    },
    keepPreviousData: true,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  // Category related service
  const { data: categoryServices = [], isLoading: categoryLoading } = useQuery({
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

  // Reviews
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const visibleServices = showAll ? categoryServices : categoryServices.slice(0, 2);

  // Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth/login", { state: location.pathname });
      return;
    }
    setIsModalOpen(true); 
  };

  const confirmAddToCart = () => {
    if (!selectedDate) return;

   
    const offset = selectedDate.getTimezoneOffset();
    const localDate = new Date(selectedDate.getTime() - offset * 60000);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item._id === service._id);

    const cartItem = {
      _id: service._id,
      title: service.title,
      image: service.image,
      price: Number(service.price),
      quantity,
      date: localDate.toISOString().split("T")[0], 
      userEmail: service.userEmail
    };

    if (existingIndex >= 0) cart[existingIndex] = cartItem;
    else cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsModalOpen(false);
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
    <div className="flex md:flex-row flex-col-reverse max-w-[1360px] lg:px-0 px-3 md:px-3 mx-auto gap-4 mt-8 md:mt-20 items-start">
      {/* Left Side */}
      <div className="md:w-2/5 w-full">
        {/* Category Related Services */}
        <div className="bg-gray-50 md:p-5 p-2 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="md:text-3xl text-xl mt-4 font-bold mb-5 text-gray-900">
            {service?.category}
          </h2>
          <div className="space-y-4">
            {visibleServices.map((item) => (
              <Link
                to={`/services/${item._id}`}
                key={item._id}
                className="flex items-center gap-4 bg-white md:p-4 p-1.5 rounded-2xl border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
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

        {/* Reviews */}
        <div className="mt-8">
          <h3 className="md:text-3xl text-lg font-bold text-gray-900 mb-4">
            Customer Reviews
          </h3>
          {reviewsLoading ? (
            <p className="text-gray-500 text-sm">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          ) : (
            <>
              <div className="space-y-4">
                {reviews.slice(0, showAll ? reviews.length : 4).map((review) => (
                  <div
                    key={review._id}
                    className="flex items-start gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <img
                      src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_profile,q_auto:low,f_auto/w_48,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/supply/customer-app-supply/1649054989501-7edc6d.jpeg"
                      alt="user"
                      className="w-12 h-12 rounded-full border"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">
                          {review.userName || "Anonymous"}
                        </h4>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-sm ${
                                star <= review.rating ? "text-yellow-400" : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {reviews.length > 4 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-3/5">
        <div className="bg-white md:p-4 rounded-xl shadow mb-6">
          {/* Image */}
          <img
            src={service?.image}
            alt={service?.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Title */}
          <h2 className="text-2xl md:px-0 px-3 font-bold mb-4 text-gray-900">
            {service?.title}
          </h2>

          {/* Location */}
          <p className="text-sm md:px-0 px-3 text-gray-500 mb-3">
            <span className="font-semibold text-gray-700">Location:</span> {service?.location || "Not specified"}
          </p>

          {/* Description */}
          <p className="text-gray-700 md:px-0 px-3 mb-4 leading-relaxed">
            {service?.description}
          </p>

          {/* Price */}
          <p className="text-lg md:px-0 px-3 font-semibold text-[#cc3273] mb-4">
            Price: ${service?.price}
          </p>

          {/* Quantity + Add to Cart */}
          <div className="flex md:px-0 px-3 items-center gap-3 mb-4">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 cursor-pointer border rounded">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border cursor-pointer rounded">
              +
            </button>
            <p className="font-semibold text-sm text-gray-800">hour</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="md:px-5 px-3 mx-3 md:mx-0 mb-4 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>

        {/* Extra Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Left side - Overview */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="md:text-xl text-lg font-semibold text-gray-900 mb-3">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Our Promise
              </h3>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Note To Customer:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
            <li>
              If any delay happens by customer (30 minutes +), an extra charge will be added with the service price.
            </li>
            <li>
              After delivering the service, the customer must cross-check before the service person leaves. No complaints will be accepted afterward.
            </li>
            <li>Make sure to keep expensive belongings in a safe place.</li>
            <li>
              Customer must provide fresh water and electricity to support the service person.
            </li>
            <li>
              The service price might change if the working area is in very poor condition.
            </li>
            <li>
              If the work area increases, then extra charges will be applied.
            </li>
          </ul>
        </div>
      </div>

      {/* Date Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()} 
              inline
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddToCart}
                className="px-4 py-2 rounded bg-[#cc3273] text-white hover:bg-pink-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
