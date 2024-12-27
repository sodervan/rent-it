import { useState } from "react";
import {
  IconSearch,
  IconUser,
  IconBell,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Animation configurations
  const menuVariants = {
    hidden: { y: "-100%", opacity: 0 }, // Initial state: offscreen
    visible: { y: 0, opacity: 1 }, // Show fully
    exit: { y: "-100%", opacity: 0 }, // Animate outwards
  };

  return (
    <nav className="bg-white shadow px-4 py-3 md:px-8 fixed top-0 w-full z-[2000]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-purple-700 text-lg font-bold flex-shrink-0 flex items-center">
          RentIT
        </div>

        {/* Hamburger Button for Small Screens */}
        <button
          className="inline-flex items-center justify-center text-gray-700 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>

        {/* Main Navbar Content */}
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
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={() => {
                navigate("/agent/addlisting/1");
              }}
            >
              Add Listing
            </button>
            <a href="/agent/dashboard" className="text-gray-700 hover:text-purple-600">
              Dashboard
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Bookings
            </a>
            <button className="text-gray-700 hover:text-purple-600">
              <IconUser size={20} />
            </button>
            <button className="text-gray-700 hover:text-purple-600">
              <IconBell size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-0 left-0 w-full h-screen bg-white shadow-lg z-[2000] flex flex-col items-center space-y-8 px-6 py-12"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <IconX size={28} />
            </button>

            {/* Logo in the Center */}
            <div className="text-purple-700 text-2xl font-bold">RentIT</div>

            {/* Search Bar */}
            <div className="flex flex-col space-y-3 w-full max-w-sm">
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
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center">
                <IconSearch size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-6 w-full max-w-sm items-center">
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Add Listing
              </button>
              <a
                href="#"
                className="w-full text-center text-gray-700 hover:text-purple-600"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="w-full text-center text-gray-700 hover:text-purple-600"
              >
                Bookings
              </a>
              <button className="text-gray-700 hover:text-purple-600 flex items-center justify-center">
                <IconUser size={20} />
              </button>
              <button className="text-gray-700 hover:text-purple-600 flex items-center justify-center">
                <IconBell size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
