import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { House } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole"; 
import Loading from "../../Shared/Loading";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const { role, roleLoading } = useUserRole(); 

  if (loading || roleLoading) {
    return <Loading />;
  }

  const links = (
  <>
    <li>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "underline font-medium"
            : "text-[#1E293B] hover:underline"
        }
      >
        Home
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/allServices"
        className={({ isActive }) =>
          isActive
            ? "underline font-medium"
            : "text-[#1E293B] hover:underline"
        }
      >
        Services
      </NavLink>
    </li>

    
  {(!user || role === "provider") && (
  <li>
    <NavLink
      to="/createService"
      className={({ isActive }) =>
        isActive
          ? "underline font-medium"
          : "text-[#1E293B] hover:underline"
      }
    >
      Create Service
    </NavLink>
  </li>
)}

    {user && (
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "underline font-medium"
              : "text-[#1E293B] hover:underline"
          }
        >
          Dashboard
        </NavLink>
      </li>
    )}
  </>
);


  return (
    <div className="w-full bg-white backdrop-blur-md fixed top-0 left-0 right-0 shadow-sm z-50">
      <div className="flex items-center justify-between max-w-[1360px] lg:px-0 px-3 md:px-3 mx-auto min-h-16 relative">
        {/* Left: Logo */}
        <Link to="/" className="flex gap-2 items-center">
          <House className="md:text-5xl text-xl text-[#cc3273]" />
          <span className="md:text-2xl text-base font-extrabold">Fixify</span>
        </Link>

        {/* Center */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex gap-8 items-center">{links}</ul>
        </div>

        {/* Right: Auth */}
        <div className="lg:flex items-center hidden">
          {user ? (
            <button
              onClick={logout}
              className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-semibold shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md transition-colors duration-200 ${
              isOpen ? "bg-white border border-gray-300" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-[#cc3273] hover:stroke-[#ff6b81] transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="lg:hidden flex flex-col gap-3 w-full bg-[#FAF9F6] p-4 shadow-md">
          {links}
          <li>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-semibold shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="md:px-5 px-3 py-2 md:py-2.5 text-xs md:text-base cursor-pointer text-[#cc3273] border border-[#cc3273] bg-white rounded-lg font-medium shadow-md hover:text-white hover:bg-[#cc3273] transition-colors duration-300"
              >
                Get Started
              </Link>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
