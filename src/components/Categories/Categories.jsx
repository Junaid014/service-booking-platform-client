import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Tv,
  Sparkles,
  Brush,
  Zap,
  Calendar,
  Wrench,
  TreePine,
  Drill,
  Laptop,
  Paintbrush,
  Bug,
  Droplets,
  Flame,
  Scissors,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const categories = [
  { name: "Beauty & Wellness", icon: Scissors, color: "#dcf3ff" },
  { name: "Cleaning", icon: Sparkles, color: "#e5f9f4" },
  { name: "Creative & Media", icon: Brush, color: "#e5fee9" },
  { name: "Electrical", icon: Zap, color: "#f6ebff" },
  { name: "Event & Lifestyle", icon: Calendar, color: "#eefbe3" },
  { name: "Furniture Assembly", icon: Wrench, color: "#e6e5ff" },
  { name: "Gardening", icon: TreePine, color: "#eef7fe" },

  { name: "General Mounting", icon: Drill, color: "#fffdf1" },
  { name: "IT & Tech Services", icon: Laptop, color: "#dcf3ff" },
  { name: "Painting", icon: Paintbrush, color: "#e5f9f4" },
  { name: "Pest Control", icon: Bug, color: "#e5fee9" },
  { name: "Plumbing", icon: Droplets, color: "#f6ebff" },
  { name: "TV Mounting", icon: Tv, color: "#eefbe3" },
  { name: "Trending", icon: Flame, color: "#e6e5ff" },
];

export default function CategoryServices() {
  const axiosSecure = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("Beauty & Wellness");

  const {
    data: services = [],
    isLoading,
  } = useQuery({
    queryKey: ["services", selectedCategory],
    queryFn: async () => {
      const url = `/services?category=${encodeURIComponent(selectedCategory)}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: true,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="md:px-0 px-2 mt-20">
      
      <div className="grid lg:grid-cols-7  md:grid-cols-5 grid-cols-3 gap-4 border-b pb-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className="flex flex-col items-center  justify-center border  border-gray-200   p-3 rounded-xl transition"
              style={{
                backgroundColor: isActive ? cat.color : "#fff",
                color: isActive ? "#111827" : "#6b7280",
              }}
            >
              <Icon size={24} />

              
              <span
                className={`mt-1 text-xs text-gray-800  font-semibold text-center ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Services List */}
      <div className="flex flex-wrap gap-3 mt-6">
        {services.length > 0 ? (
          services.map((s) => (
            <span
              key={s._id}
              className="px-4 py-2 border rounded-full text-sm cursor-pointer hover:bg-gray-100"
            >

        {/*------------------- will be as link soon---------------------- */}

              {s.title}
            </span>
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
}
