import { useState } from "react";
import {
  Search,
  User,
  Bell,
  Menu,
  X,
} from "lucide-react";
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
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Main Navbar Content */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-secondaryPurple text-primaryPurple border border-primaryPurple rounded-md hover:bg-purple-700 hover:text-white transition-all duration-300"
              onClick={() => {
                localStorage.clear();
                navigate("/agent/login");
                window.location.reload();
              }}
            >
              Logout
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
              <X size={28} />
            </button>

            {/* Logo in the Center */}
            <div className="text-purple-700 text-2xl font-bold">RentIT</div>

            {/* Search Bar */}

            {/* Navigation Links */}
            <div className="flex flex-col space-y-6 w-full max-w-sm items-center">
              <button className="px-4 py-2 bg-secondaryPurple text-primaryPurple border border-primaryPurple rounded-md hover:bg-purple-700 hover:text-primaryPurple transition-all duration-300">
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
