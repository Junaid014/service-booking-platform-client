
import { useForm } from "react-hook-form";
// import { useAuth } from "@/contexts/AuthContext"; 
import useAxios from "../../hooks/useAxios";
import imageCompression from "browser-image-compression"; 

const AddService = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const axios = useAxios();
  // const { user } = useAuth(); // logged-in user data

  const onSubmit = async (data) => {
    const serviceData = {
      ...data,
      status: "pending",
      // userName: user?.displayName,
      // userEmail: user?.email,
    };

    try {
      const res = await axios.post("/services", serviceData);
      console.log("Service Added:", res.data);
      reset();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // compress image before upload
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

      // set image url into react-hook-form
      setValue("image", data.secure_url);
    } catch (error) {
      console.error("Image Upload Failed:", error);
    }
  };

  return (
    <div className="bg-[#fefefe] mb-18 hover:bg-[#f9f9f9] shadow-lg rounded px-2 lg:px-14 pt-14 pb-8 w-full  mx-auto">
      <h2 className="text-xl md:text-3xl text-gray-700 font-semibold roboto text-center mb-6">
        Add Service
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
        <div>
          <label className="label font-medium">Category</label>
          <input
            {...register("category", { required: true })}
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full"
            placeholder="Category"
          />
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

        {/* Keywords (Dropdown Single Select) */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-gray-900 font-medium">
              Service Keyword
            </span>
          </label>
          <select
            {...register("keywords", { required: true })}
            className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-0 focus:border-gray-600"
          >
            <option value="">Select Keyword</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Beauty">Beauty</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Electrical">Electrical</option>
            <option value="Gardening">Gardening</option>
            <option value="Pest Control">Pest Control</option>
          </select>
        </div>


        {/* User Name */}
        {/* <div>
          <label className="label font-medium">Provider Name</label>
          <input
            value={user?.displayName}
            readOnly
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full bg-gray-100"
            {...register("userName")}
          />
        </div> */}

        {/* User Email */}
        {/* <div>
          <label className="label font-medium">Provider Email</label>
          <input
            value={user?.email}
            readOnly
            className="input focus:outline-none focus:ring-0 focus:border-gray-600 w-full bg-gray-100"
            {...register("userEmail")}
          />
        </div> */}

        {/* Description Full Width */}
        <div className="md:col-span-2">
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

export default AddService;

