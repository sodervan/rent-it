import React, { useState } from "react";
import {
  Home,
  ListTodo,
  Calendar,
  UserCircle,
  Settings,
  LogOut,
  History,
  User,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoaderThree from "@/components/Loaders/LoaderThree.jsx";
import useTokenData from "../../../TokenHook.js";

const Sidebar = ({ firstname, loading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { clearToken } = useTokenData();

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      link: "/agent/dashboard",
    },
    {
      icon: ListTodo,
      label: "My Listings",
      link: "/agent/dashboard/mylistings",
    },
    {
      icon: Calendar,
      label: "Booking Requests",
      link: "/agent/dashboard/booking",
    },
    {
      icon: History,
      label: "Transactions",
      link: "/agent/dashboard/transactions",
    },
    {
      icon: UserCircle,
      label: "Profile",
      link: "/agent/dashboard/profile",
    },
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    clearToken();
    localStorage.clear();
    navigate("/agent/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="sidebar hidden lg:block fixed z-10 top-0 left-0 h-screen mt-24">
      <nav className="bg-white dark:bg-gray-950 h-screen w-60 border-r shadow-sm flex flex-col justify-between">
        <div>
          <div className="px-4 flex-1">
            {/* Enhanced Greeting Section */}
            <div className="mb-7 px-3">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 shadow-sm border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-purple-600">
                      Welcome back
                    </span>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {loading ? (
                        <div className="animate-pulse bg-gray-200 h-6 w-24 rounded" />
                      ) : (
                        firstname
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 px-2">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  isActive={location.pathname === item.link}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Logout Button with Confirmation */}
        <div className="px-4 py-1 border-t border-gray-200 dark:border-gray-800 mb-24 relative">
          <button
            onClick={handleLogoutClick}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium",
              "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              "hover:text-gray-900 dark:hover:text-gray-200 transition-all",
            )}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>

          {/* Logout Confirmation Popup */}
          {showLogoutConfirm && (
            <div className="absolute bottom-16 left-0 w-full px-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition-all animate-in slide-in-from-bottom-5 duration-200">
                <div className="flex gap-2 items-center mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Confirm Logout
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Are you sure you want to log out of your account?
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleCancelLogout}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmLogout}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, link, isActive }) => (
  <li>
    <NavLink
      to={link}
      href={link}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive
          ? "bg-primary text-primaryPurple shadow-md shadow-primary/20 dark:shadow-primary/10"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-transform",
          isActive && "animate-[wiggle_1s_ease-in-out]",
        )}
      />
      <span>{label}</span>
      {isActive && (
        <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primaryPurple" />
      )}
    </NavLink>
  </li>
);

export default Sidebar;
