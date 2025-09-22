import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

const TrendingServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [] } = useQuery({
    queryKey: ["trendingServices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services/trending");
      return res.data;
    },
  });

  return (
    <div className="max-w-[1360px] mx-auto  pt-20 pb-6 relative">
      {/* Heading */}
      <h2 className="text-xl lg:pl-0 pl-3 md:text-4xl font-bold md:mb-14 mb-4 text-gray-800 ">
       Trending <span className="text-[#cc3273]">Services</span>
      </h2>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-6"
      >
        {services.map((service) => (
          <SwiperSlide key={service._id}>
            <Link to={`/services/${service._id}`} className="bg-white shadow-2xl rounded-xl overflow-hidden hover:shadow-xl transition ">
              <img
                src={service.image}
                alt={service.title}
                className="w-full rounded-2xl h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3
                  className="text-md font-semibold truncate"
                  title={service.title}
                >
                  {service.title}
                </h3>
                
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Arrow */}
      <div className="swiper-button-prev-custom absolute top-58 -left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-pink-500 shadow-lg w-10 h-10 flex items-center justify-center rounded-full">
        <FaChevronLeft className="text-white" />
      </div>

      {/* Right Arrow */}
      <div className="swiper-button-next-custom absolute top-58 -right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-pink-500 shadow-lg w-10 h-10 flex items-center justify-center rounded-full ">
        <FaChevronRight className="text-white" />
      </div>
    </div>
  );
};

export default TrendingServices;
