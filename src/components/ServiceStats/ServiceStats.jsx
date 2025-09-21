import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaClipboardList, FaUserFriends, FaRegSmile, FaUserTie, FaTools } from 'react-icons/fa';

const ServiceStats = () => {
       const [ref, inView] = useInView({ triggerOnce: true });

       const stats = [
              {
                     count: 986,
                     label: 'Services Completed',
                     duration: 5,
                     icon: <FaClipboardList className="text-5xl md:text-7xl text-blue-600 mb-2 md:mb-4" />,
              },
              {
                     count: 900,
                     label: 'Happy Customers',
                     duration: 5,
                     icon: <FaRegSmile className="text-5xl md:text-7xl text-green-600 mb-2 md:mb-4" />,
              },
              {
                     count: 170,
                     label: 'Registered Service Providers',
                     duration: 5,
                     icon: <FaUserTie className="text-5xl md:text-7xl text-orange-500 mb-2 md:mb-4" />,
              },
              {
                     count: 1700,
                     label: 'Orders Placed',
                     duration: 6,
                     icon: <FaTools className="text-5xl md:text-7xl text-purple-600 mb-2 md:mb-4" />,
              },
              {
                     count: 40,
                     label: 'Service Categories',
                     duration: 4,
                     icon: <FaUserFriends className="text-5xl md:text-7xl text-pink-500 mb-2 md:mb-4" />,
              },
       ];

       return (
              <div className="w-11/12 mx-auto my-16">
                    
                     {/* Heading */}
                     <div className=" text-start mb-12">
                            {/* Small subtitle */}
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                   Our Achievements
                            </h3>

                            {/* Main title */}
                            <h2 className="text-lg md:text-4xl font-bold mt-2 mb-6 text-gray-800">
                                   Platform <span className="text-pink-600">Achievements</span> at a Glance
                            </h2>
                     </div>


                     {/* Stats Grid */}
                     <div
                            ref={ref}
                            className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 bg-gradient-to-br from-[#eff1f5] via-[#f4f6ff] to-[#e9eeff] rounded-2xl p-4 md:p-8 border border-[#b4bdb266]"
                     >
                            {stats.map((item, idx) => (
                                   <div key={idx} className="w-full text-center p-4 md:p-6">
                                          <div className="flex justify-center mb-2 md:mb-3">{item.icon}</div>

                                          <div className="flex items-center justify-center text-2xl md:text-5xl font-extrabold mt-2">
                                                 {inView ? (
                                                        <CountUp
                                                               className="font-extrabold text-black"
                                                               end={item.count}
                                                               duration={item.duration}
                                                               start={0}
                                                        />
                                                 ) : (
                                                        0
                                                 )}
                                                 <span className="text-xl md:text-3xl font-bold ml-1 md:ml-2">+</span>
                                          </div>

                                          <h3 className="text-sm md:text-lg font-semibold mt-2 md:mt-4 text-gray-700">
                                                 {item.label}
                                          </h3>
                                   </div>
                            ))}
                     </div>
              </div>
       );
};

export default ServiceStats;
