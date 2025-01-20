import React from "react";
import {
  Home,
  ListTodo,
  Calendar,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import LoaderThree from "@/components/Loaders/LoaderThree.jsx";

const Sidebar = ({ firstname, loading }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      link: "/agent/dashboard",
    },
    {
      icon: ListTodo,
      label: "My Listings",
      link: "/agent/dashboard/listings",
    },
    {
      icon: Calendar,
      label: "Booking Requests",
      link: "/agent/dashboard/booking",
    },
    {
      icon: UserCircle,
      label: "Profile",
      link: "/agent/dashboard/profile",
    },
  ];

  const handleLogout = () => {
    // Perform logout actions here, e.g., clear tokens, redirect to login page
    localStorage.removeItem("token"); // Example: Clear token from localStorage
    navigate("/agent/login"); // Redirect to login page
  };

  return (
    <div className="sidebar hidden lg:block fixed z-10 top-0 left-0 h-screen mt-24">
      <nav className="bg-white dark:bg-gray-950 h-screen w-60 border-r shadow-sm flex flex-col justify-between">
        <div>
          <div className="px-4 flex-1">
            <div className="flex items-center justify-between mb-7 px-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  HI,
                </span>
                <h2 className="text-lg font-medium text-gray-800 bg-gradient-to-r bg-clip-text">
                  {loading ? "..." : firstname}
                </h2>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
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

        {/* Logout Button */}
        <div className="px-4 py-1 border-t border-gray-200 dark:border-gray-800 mb-24">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium",
              "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              "hover:text-gray-900 dark:hover:text-gray-200 transition-all",
            )}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, link, isActive }) => (
  <li>
    <NavLink to={link}
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
