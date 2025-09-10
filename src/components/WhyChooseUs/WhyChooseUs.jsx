import { Headphones, SprayCan, Hand } from "lucide-react";
import { FaMaskFace } from "react-icons/fa6";

export default function WhyChooseUs() {
  const features = [
    { icon: <FaMaskFace className="w-12 h-14 lg:h-18 text-pink-600" />, title: ["Ensuring", "Masks"] },
    { icon: <Headphones className="w-12 h-14 lg:h-18 text-pink-600" />, title: ["24/7", "Support"] },
    { icon: <SprayCan className="w-12 h-14 lg:h-18 text-pink-600" />, title: ["Sanitising", "Hands & Equipment"] },
    { icon: <Hand className="w-12 h-14 lg:h-18 text-pink-600" />, title: ["Ensuring", "Gloves"] },
  ];

  return (
    <section className=" py-12">
      {/* Heading */}
      <div className="px-4 lg:px-12">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Why Choose Us
        </h3>
        <h2 className="text-xl md:text-4xl font-bold mt-2 mb-6 text-gray-800">
          Because we care about your <span className="text-pink-600">safety</span>..
        </h2>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 lg:px-0 grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
        
        {/* Right side*/}
        <div className="relative order-1 lg:order-2">
          <img
            src="https://s3.ap-south-1.amazonaws.com/cdn-marketplacexyz/sheba_xyz/images/webp/why-choose-us.webp"
            alt="Safety Ensured"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Left side - Features */}
        <div className="grid md:grid-cols-2 grid-cols-2 gap-6 order-2 lg:order-1">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center lg:pl-20 py-3 md:py-7.5 gap-6 bg-white shadow-sm rounded-xl p-4"
            >
              {f.icon}
              <p className="text-gray-700 text-base font-semibold leading-snug">
                {f.title.map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
