import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import imageCompression from "browser-image-compression";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedService, setSelectedService] = useState(null);
  const [uploading, setUploading] = useState(false); 
  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: services = [], refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This service will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/services/${id}`);
      Swal.fire("Deleted!", "Service has been removed.", "success");
      refetch();
    }
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1920, useWebWorker: true };
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
        { method: "POST", body: formData }
      );

      const data = await res.json();
      setValue("image", data.secure_url); 
    } catch (error) {
      console.error("Image Upload Failed:", error);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  
  const openUpdateModal = (service) => {
    setSelectedService(service);
    const { _id, ...formData } = service;
    reset(formData);

    const main = document.querySelector("main") || document.body;
    main.setAttribute("inert", "true");

    const modal = document.getElementById("updateModal");
    modal.showModal();

    modal.addEventListener(
      "close",
      () => {
        main.removeAttribute("inert");
        setSelectedService(null);
      },
      { once: true }
    );
  };


  const onSubmit = async (data) => {
    if (!selectedService) return;

    
    if (!data.image) data.image = selectedService.image;

    try {
      const updateData = { ...data };
      delete updateData._id;

      await axiosSecure.put(`/services/${selectedService._id}`, updateData);

      Swal.fire("Updated!", "Service details have been updated.", "success");
      refetch();
      document.getElementById("updateModal").close();
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error", "Failed to update service", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">
        Manage Services
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-2xl shadow-md border p-4 flex flex-col">
            <img src={service.image} alt={service.title} className="h-40 w-full object-cover rounded-xl" />
            <h3 className="mt-3 text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
            <p className="mt-2 text-[#cc3273] font-bold">${service.price}/hr</p>
            <p className="text-sm text-gray-500">{service.location}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => openUpdateModal(service)}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      <dialog id="updateModal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4 text-center">Update Service</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <label className="label font-medium">Service Title</label>
              <input {...register("title")} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Category</label>
              <input {...register("category")} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Price / Hour</label>
              <input type="number" {...register("price")} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Location</label>
              <input {...register("location")} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Description</label>
              <textarea {...register("description")} className="textarea textarea-bordered w-full" rows={4} />
            </div>
            <div>
              <label className="label font-medium">Service Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input type="hidden" {...register("image")} />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="submit"
                className="btn bg-[#cc3273] text-white hover:bg-[#a12458]"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Update Service"}
              </button>
            </div>
          </form>
        </div>

        
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageServices;
