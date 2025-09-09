import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const reviews = [
  {
    name: "Nusrat Jahan",
    role: "Housewife",
    text: "I booked a home cleaning service through this platform and it was effortless. The cleaner arrived on time, and everything was perfectly managed.",
    img: ""
  },
  {
    name: "Hasan Mahmud",
    role: "Student",
    text: "Booking an electrician for my hostel room was super easy. The process was quick, and the professional solved my issue the same day.",
    img: "https://i.ibb.co.com/FqkDktwY/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-ta.jpg"
  },
  {
    name: "Shamim Akter",
    role: "Worker – Beautician",
    text: "As a beautician, this platform connects me with new clients every week. Managing schedules and payments has never been this simple.",
    img: ""
  },
  {
    name: "Tanvir Ahmed",
    role: "Office Worker",
    text: "I booked a plumber for my apartment and the whole process was stress-free. The confirmation updates gave me complete peace of mind.",
    img: ""
  },
  {
    name: "Mim Rahman",
    role: "Business Owner",
    text: "Finding a reliable babysitter through this platform was a relief. I could check reviews before booking, which made me feel secure.",
    img: "https://i.ibb.co.com/jvCxVpbZ/pexels-stefanstefancik-91227-1.jpg"
  },
  {
    name: "Arif Chowdhury",
    role: "Homeowner",
    text: "I hired a painter for my new flat. From booking to payment, everything was smooth and professional. Highly recommend this service.",
    img: "https://i.ibb.co.com/hJFcpf1c/muscular-young-sport-person-with-his-arm-crossed-standing-race-track-1.jpg"
  },
  {
    name: "Rashedul Karim",
    role: "Worker – Electrician",
    text: "I no longer worry about finding clients. This platform brings me regular work, and I can focus on giving my best service.",
    img: "https://i.ibb.co.com/jvCxVpbZ/pexels-stefanstefancik-91227-1.jpg"
  },
  {
    name: "Farhana Islam",
    role: "Teacher",
    text: "The dashboard keeps all my bookings organized in one place. I can track services and payments without any hassle.",
    img: ""
  }
];

const ReviewCard = ({ review }) => {
  const initials = review.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <p className="text-gray-700 mb-4 font-medium border-b pb-4 border-gray-200">
        {review.text}
      </p>

      <div className="flex items-center gap-3 mt-auto">
        {review.img ? (
          <img
            src={review.img}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            {initials}
          </div>
        )}

        <div>
          <p className="font-semibold roboto">{review.name}</p>
        </div>
      </div>
      <p className="text-sm font-semibold mt-1 text-gray-500">{review.role}</p>

      <FaQuoteRight className="absolute bottom-8 right-4 text-yellow-400 text-2xl" />
    </div>
  );
};

const Review = () => {
  return (
    <section className="py-12 lg:flex justify-between gap-6">
      {/* Left Column */}
      <div className="flex mb-0 md:mb-6 lg:w-1/4 lg:flex-col gap-6">
        <ReviewCard review={reviews[0]} />
        <ReviewCard review={reviews[3]} />
      </div>

      {/* Middle Column */}
      <div className="flex lg:w-2/4 mt-6 lg:mt-0 flex-col gap-6">
        <ReviewCard review={reviews[1]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ReviewCard review={reviews[5]} />
          <ReviewCard review={reviews[4]} />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex lg:w-1/4 mt-6 lg:mt-0 flex-col gap-6">
        <ReviewCard review={reviews[2]} />
        <div className="mt-0">
          <ReviewCard review={reviews[7]} />
        </div>
      </div>
    </section>
  );
};

export default Review;
