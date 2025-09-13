import React, { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const Banner = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [serviceSuggestions, setServiceSuggestions] = useState([]);

  
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };


  const fetchLocationSuggestions = async (loc) => {
    if (!loc) {
      setLocationSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:3000/services/approved?location=${loc}`
      );
      /
      const uniqueLocations = [
        ...new Set(res.data.map((item) => item.location)),
      ];
      setLocationSuggestions(uniqueLocations);
    } catch (error) {
      console.log(error);
    }
  };

  
  const fetchServiceSuggestions = async (title) => {
    if (!title) {
      setServiceSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:3000/services/approved?title=${title}`
      );
      const uniqueTitles = [...new Set(res.data.map((item) => item.title))];
      setServiceSuggestions(uniqueTitles);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedLocationFetch = debounce(fetchLocationSuggestions, 300);
  const debouncedServiceFetch = debounce(fetchServiceSuggestions, 300);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    debouncedLocationFetch(e.target.value);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
    debouncedServiceFetch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ location, service });
 
  };

  return (
    <div className="relative w-full h-[700px]">
      <img
        src="/full-shot-people-cleaning-office.jpg"
        alt="Cleaning Office"
        className="w-full h-full object-cover object-center lg:object-top"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Your Personal Assistant
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">
          One-stop solution for your services. Order any service, anytime.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center gap-3 bg-white rounded-2xl shadow-xl p-3 w-full max-w-4xl"
        >
          {/* Location Input */}
          <div className="relative flex items-center bg-gray-100 px-4 py-3 rounded-xl w-full md:w-auto shadow-sm">
            <FaMapMarkerAlt className="text-pink-600 mr-2" />
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Dhaka"
              className="bg-transparent outline-none text-gray-700 w-full"
            />
            {locationSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white text-gray-700 shadow-md rounded-b-lg max-h-40 overflow-y-auto z-10">
                {locationSuggestions.map((loc, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setLocation(loc);
                      setLocationSuggestions([]);
                    }}
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Service Input */}
          <div className="relative flex items-center bg-gray-100 px-4 py-3 rounded-xl w-full shadow-sm">
            <input
              type="text"
              value={service}
              onChange={handleServiceChange}
              placeholder="Find your service e.g. AC, Car, Facial ..."
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
            />
            {serviceSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white text-gray-700 shadow-md rounded-b-lg max-h-40 overflow-y-auto z-10">
                {serviceSuggestions.map((title, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setService(title);
                      setServiceSuggestions([]);
                    }}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 transition text-white p-3 rounded-xl ml-2 shadow-md"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
