import { useState } from "react";
import {
  IconSearch,
  IconUser,
  IconBell,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Calendar, History, Home, ListTodo } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Helper function to check if a path is active
  const isPathActive = (path) => {
    if (path === "/agent/dashboard") {
      return location.pathname === path;
    }
    return location.pathname === path;
  };

  const navLinks = [
    {
      name: "Home",
      path: "/agent/dashboard",
      icon: <Home size={20} />,
      exact: true,
    },
    {
      name: "My Listings",
      path: "/agent/listings",
      icon: <ListTodo size={20} />,
      exact: true,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <Calendar size={20} />,
      exact: true,
    },
    {
      name: "Profile",
      path: "/agent/dashboard/profile",
      icon: <IconUser size={20} />,
      exact: true,
    },
    {
      name: "Transactions",
      path: "/agent/dashboard/transactions",
      icon: <History size={20} />,
      exact: true,
    },
  ];

  return (
    <nav className="bg-white shadow px-4 py-3 md:px-8 fixed top-0 w-full z-[2000]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-purple-700 text-lg font-bold flex-shrink-0 flex items-center"
        >
          RentIT
        </NavLink>

        {/* Hamburger Button for Small Screens */}
        <div className="flex items-center space-x-4 md:hidden">
          <button className="text-gray-700 hover:text-purple-600">
            <IconBell size={20} />
          </button>
          <button
            className="inline-flex items-center justify-center text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>

        {/* Desktop Navbar Content */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full md:w-72 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select className="border rounded-md px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="Apartments">Apartments</option>
              <option value="Cars">Cars</option>
              <option value="Equipment">Equipment</option>
            </select>
            <button className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              <IconSearch size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <NavLink to="/agent/addlisting/1">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Add Listing
              </button>
            </NavLink>
            {navLinks.slice(0, 3).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-purple-600 ${
                    isPathActive(link.path) ? "text-purple-600" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/agent/dashboard/profile"
              className={({ isActive }) =>
                `text-gray-700 hover:text-purple-600 ${
                  isPathActive("/agent/dashboard/profile")
                    ? "text-purple-600"
                    : ""
                }`
              }
            >
              <IconUser size={20} />
            </NavLink>
            <button className="text-gray-700 hover:text-purple-600">
              <IconBell size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-[1999]"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 w-full max-w-sm h-screen bg-white shadow-lg z-[2000] flex flex-col"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <span className="text-purple-700 text-lg font-bold">
                  RentIT
                </span>
                <button
                  className="text-gray-700 hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconX size={24} />
                </button>
              </div>

              {/* Search Section */}
              <div className="p-4 border-b">
                <div className="flex flex-col space-y-3">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select className="border rounded-md px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="Apartments">Apartments</option>
                    <option value="Cars">Cars</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center space-x-2">
                    <IconSearch size={20} />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  <NavLink
                    to="/agent/addlisting/1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                      Add Listing
                    </button>
                  </NavLink>

                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 w-full p-3 rounded-md ${
                          isPathActive(link.path)
                            ? "bg-purple-50 text-purple-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
