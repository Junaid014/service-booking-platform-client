import { useState } from "react";
import { Link, Outlet } from "react-router";
import { FaHome, FaTools, FaCog, FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex h-screen">
      {isOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
    onClick={handleClose}
  ></div>
)}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 lg:translate-x-0 z-50`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <nav className="p-4 space-y-4">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-gray-300"
            onClick={handleClose}
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/dashboard/services"
            className="flex items-center gap-2 hover:text-gray-300"
            onClick={handleClose}
          >
            <FaTools /> Services
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-2 hover:text-gray-300"
            onClick={handleClose}
          >
            <FaCog /> Settings
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top bar */}
        <div className="bg-gray-100 p-4 flex items-center shadow">
          <button
            className="lg:hidden mr-4 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-semibold">My Dashboard</h1>
        </div>

        {/* Outlet (page content) */}
        <div className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
