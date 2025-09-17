import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import imageCompression from "browser-image-compression"; 
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CreateServices = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const axios = useAxios();
  const { user } = useAuth(); 

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const wrapperRef = useRef(null);

  // suggestion list (you can expand this list)
 const suggestions = [
  "Beauty & Wellness",
  "Cleaning",
  "Creative & Media",
  "Education",
  "Electrical",
  "Event & Lifestyle",
  "Furniture Assembly",
  "Gardening",
  "General Mounting",
  "IT & Tech Services",
  "Painting",
  "Pest Control",
  "Plumbing",
  "TV Mounting",
  "Trending"
];

  useEffect(() => {
    // filter suggestions as user types
    if (!query) {
      setFiltered(suggestions);
    } else {
      const q = query.toLowerCase();
      setFiltered(
        suggestions.filter((s) => s.toLowerCase().includes(q))
      );
    }
  }, [query]);

  useEffect(() => {
    // click outside to close suggestions
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 const onSubmit = async (data) => {
  try {
    // Prepare payload including extra fields
    const serviceData = {
      ...data,
      status: "pending",
      userName: user?.displayName || '',
      userEmail: user?.email || '',
    };

    const response = await axios.post("/services", serviceData);

    if (response.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Service Added",
        text: "Your service has been submitted successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
    } else {
      throw new Error("Failed to add service");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong while adding the service!",
    });
    console.error("Error adding service:", error);
  }
};


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
     
      const options = {
        maxSizeMB: 0.2, 
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Uploaded Image:", data.secure_url);

      
      setValue("image", data.secure_url);
    } catch (error) {
      console.error("Image Upload Failed:", error);
    }
  };

 
  const handleSelectSuggestion = (value) => {
    setValue("category", value, { shouldValidate: true, shouldDirty: true });
    setQuery(value);
    setShowSuggestions(false);
  };

  return (
    <div className="  mb-18 rounded  pt-14 pb-8 w-full  mx-auto">
      <h2 className="text-xl md:text-3xl text-gray-700 font-semibold roboto text-center mb-6">
        Add Service
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1360px] lg:px-0 px-3 md:px-3 mx-auto"
      >
        {/* Title */}
        <div>
          <label className="label font-medium">Service Title</label>
          <input
            {...register("title", { required: true })}
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full"
            placeholder="Service Title"
          />
        </div>

        {/* Category */}
        
        <div ref={wrapperRef} className="relative">
          <label className="label font-medium">Category</label>

          
          <input
            {...register("category", { required: true })}
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full"
            placeholder="Category"
            
            onFocus={(e) => {
              setShowSuggestions(true);
              
              setQuery(e.target.value || "");
            }}
            onInput={(e) => {
              setQuery(e.target.value);
             
              setValue("category", e.target.value, { shouldDirty: true });
            }}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && filtered.length > 0 && (
            <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md max-h-56 overflow-auto shadow-sm">
              {filtered.map((sugg, idx) => (
                <li
                  key={idx}
                  onMouseDown={(e) => {
                    
                    e.preventDefault();
                    handleSelectSuggestion(sugg);
                  }}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price per Hour */}
        <div>
          <label className="label font-medium">Price / Hour</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full"
            placeholder="Price per Hour"
          />
        </div>

        {/* Image Upload (Cloudinary) */}
        <div>
          <label className="label font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {/* Hidden input to store uploaded image URL */}
          <input type="hidden" {...register("image", { required: true })} />
        </div>

        {/* Location */}
        <div>
          <label className="label font-medium">Location</label>
          <input
            {...register("location", { required: true })}
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full"
            placeholder="Location"
          />
        </div>

       

        {/* User Name */}
        <div>
          <label className="label font-medium">Provider Name</label>
          <input
            value={user?.username}
            readOnly
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full bg-gray-100"
            {...register("userName")}
          />
        </div>

        {/* User Email */}
        <div>
          <label className="label font-medium">Provider Email</label>
          <input
            value={user?.email}
            readOnly
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full bg-gray-100"
            {...register("userEmail")}
          />
        </div>

        
        {/* Description Full Width */}
        <div className="md:col-span-1">
          <label className="label font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered focus:outline-none focus:ring-0 focus:border-gray-600 w-full"
            rows={4}
            placeholder="Describe the service in detail"
          />
        </div>

        <div className="md:col-span-2 flex mx-auto">
          <input
            type="submit"
            value="Submit Service"
            className="btn px-6 py-2 cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-semibold shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateServices;
