import { useEffect, useState } from "react";
import { FaSpinner, FaEnvelope, FaPhone, FaCogs } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ProviderProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  
  useEffect(() => {
    const fetchProfileAndServices = async () => {
      if (!user?.email) return;

      try {
        // Profile
        const userRes = await axiosSecure.get(`/users/${user.email}`);
        setProfile(userRes.data.user);

        
        const servicesRes = await axiosSecure.get(`/services?email=${user.email}`);
        setServices(servicesRes.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfileAndServices();
  }, [user, axiosSecure]);

 
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      const imageUrl = data.secure_url;

      // DB তে save
      await axiosSecure.patch(`/users/${user.email}`, { image: imageUrl });

      setProfile((prev) => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-3xl text-[#cc3273]" />
      </div>
    );
  }

  if (!profile) return <p className="text-center mt-10">Profile not found</p>;

  return (
    <div className="max-w-5xl mx-auto md:p-6">
      <h2 className="md:text-3xl text-lg  font-bold text-[#cc3273] mb-6 text-center md:text-start">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="relative">
          <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200 border-4 border-pink-200 text-4xl text-gray-500">
            {profile.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              profile.username?.[0].toUpperCase()
            )}
          </div>

          <label className="absolute bottom-0 right-0 bg-[#cc3273] text-white p-2 rounded-full cursor-pointer">
            {uploading ? <FaSpinner className="animate-spin" /> : <FaCogs />}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
          </label>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold">{profile.username}</h3>
          <p className="flex items-center text-gray-600 mt-1">
            <FaEnvelope className="mr-2 text-[#cc3273]" /> {profile.email}
          </p>
          <p className="flex items-center text-gray-600 mt-1">
            <FaPhone className="mr-2 text-[#cc3273]" /> {profile.phone}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Joined: {new Date(profile.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm font-semibold">
            Total Services: {services.length}
          </p>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">My Services</h3>

        {services.length === 0 ? (
          <p className="text-gray-500">No services created yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-pink-50 text-[#cc3273] text-left">
                  <th className="p-3 border-b">Title</th>
                  <th className="p-3 md:flex hidden border-b">Category</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-pink-50 transition">
                    <td className="p-3">{s.title}</td>
                    <td className="p-3 md:flex hidden">{s.category}</td>
                    <td className="p-3">${s.price}</td>
                    <td className="p-3">{s.status || "active"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderProfile;
