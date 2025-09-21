import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi'; // Arrow icon from react-icons

const ErrorElement = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 p-4 text-center">
      
      {/* Lottie Animation */}
      <DotLottieReact
        className="h-[200px] w-[200px] md:h-[400px] md:w-[400px] mx-auto"
        src="https://lottie.host/0a79ca35-988a-4092-9545-9e3655b8cfc8/AxNdsXTQu5.lottie"
        loop
        autoplay
      />

      {/* Error Text */}
      <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mt-6">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-2 md:text-lg">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="md:px-5 px-3 flex items-center mt-4 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
      >
        <FiArrowLeft className="mr-2 text-xl" />
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorElement;
