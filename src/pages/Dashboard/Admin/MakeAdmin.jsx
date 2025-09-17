import React, { useEffect, useState } from 'react';
import { FaSearch, FaUserShield, FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MakeAdmin = () => {
       const axiosSecure = useAxiosSecure();
       const [searchTerm, setSearchTerm] = useState('');
       const [searchResults, setSearchResults] = useState([]);
       const [recentUsers, setRecentUsers] = useState([]);

       // Fetch recently logged-in users
       useEffect(() => {
              const fetchRecentUsers = async () => {
                     try {
                            const res = await axiosSecure.get('/users/recent');
                            setRecentUsers(res.data);
                     } catch (err) {
                            console.error(err);
                     }
              };

              fetchRecentUsers();
       }, [axiosSecure]);

       // Live search
       useEffect(() => {
              const fetchUsers = async () => {
                     if (!searchTerm) {
                            setSearchResults([]);
                            return;
                     }
                     try {
                            const res = await axiosSecure.get(`/users/search?email=${searchTerm}`);
                            setSearchResults(res.data);
                     } catch (err) {
                            console.error(err);
                     }
              };

              const delayDebounce = setTimeout(fetchUsers, 300);
              return () => clearTimeout(delayDebounce);
       }, [searchTerm, axiosSecure]);

       // Update Role
       const updateRole = async (userId, newRole) => {
              try {
                     const res = await axiosSecure.patch(`/users/admin/${userId}`, { role: newRole });
                     if (res.data.modifiedCount > 0) {
                            toast.success(`User is now ${newRole}`);
                            setSearchResults(prev =>
                                   prev.map(user => (user._id === userId ? { ...user, role: newRole } : user))
                            );
                            setRecentUsers(prev =>
                                   prev.map(user => (user._id === userId ? { ...user, role: newRole } : user))
                            );
                     }
              } catch (err) {
                     console.error(err);
                     toast.error('Failed to update role');
              }
       };

       const renderUser = (user) => {
              // Placeholder initials
              const initials = user.name
                     ? user.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()
                     : user.email.slice(0, 2).toUpperCase();

              return (
                     <div key={user._id} className="border border-gray-200 rounded-lg px-3 py-3 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-3">
                                   {user.image ? (
                                          <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                                   ) : (
                                          <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold">
                                                 {initials}
                                          </div>
                                   )}
                                   <div>
                                          <p className="font-medium">{user.name}</p>
                                          <p className="text-gray-600 text-sm">{user.email}</p>
                                          <p className="text-gray-500 text-xs">Role: {user.role ? user.role : 'N/A'}</p>
                                   </div>
                            </div>
                            {user.role !== 'admin' ? (
                                   <button
                                          onClick={() => updateRole(user._id, 'admin')}
                                          className="bg-[#cd447d] cursor-pointer text-white px-3 py-1 rounded-md flex items-center gap-1"
                                   >
                                          <FaUserShield /> Make Admin
                                   </button>
                            ) : (
                                   <button
                                          onClick={() => updateRole(user._id, 'customer')}
                                          className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded-md flex items-center gap-1"
                                   >
                                          <FaUserMinus /> Remove Admin
                                   </button>
                            )}
                     </div>
              );
       };

       return (
              <div className="max-w-4xl mx-auto px-4 py-6">
                     <h2 className="text-center text-pink-600 font-semibold text-2xl mb-6">Manage Admins</h2>

                     {/* Search Bar */}
                     <div className="mb-6 relative w-full md:max-w-md mx-auto">
                            <input
                                   type="text"
                                   placeholder="Search user by email..."
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
                     </div>

                     {/* Search Results */}
                     {searchTerm ? (
                            <div className="space-y-3">
                                   {searchResults.length > 0 ? (
                                          searchResults.map(renderUser)
                                   ) : (
                                          <p className="text-center text-gray-600">No users found</p>
                                   )}
                            </div>
                     ) : (
                            <>
                                   <h3 className="text-gray-700 text-center font-semibold mb-3">Recently Logged-In Users</h3>
                                   <div className="space-y-3">
                                          {recentUsers.map(renderUser)}
                                   </div>
                            </>
                     )}
              </div>
       );
};

export default MakeAdmin;
