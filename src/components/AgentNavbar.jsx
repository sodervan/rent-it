import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on an addlisting page
  useEffect(() => {
    setShowBackButton(location.pathname.includes("/addlisting"));
  }, [location.pathname]);

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

  // Only needed for mobile menu
  const navLinks = [
    {
      name: "Home",
      path: "/agent/dashboard",
    },
    {
      name: "My Listings",
      path: "/agent/dashboard/mylistings",
    },
    {
      name: "Booking Requests",
      path: "/bookings",
    },
    {
      name: "Transactions",
      path: "/agent/dashboard/transactions",
    },
    {
      name: "Profile",
      path: "/agent/dashboard/profile",
    },
  ];

  const handleBack = () => {
    navigate("/agent/dashboard");
  };

  return (
    <nav className="bg-white shadow px-4 py-3 md:px-8 fixed top-0 w-full z-[2000]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section - Logo with conditional back button */}
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="mr-3 text-gray-700 hover:text-purple-600"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <NavLink
            to="/"
            className="text-purple-700 text-lg font-bold flex-shrink-0"
          >
            RentIT
          </NavLink>
        </div>

        {/* Center Section - Page Title (only on addlisting pages) */}
        {showBackButton && (
          <div className="hidden md:block text-center font-medium">
            {location.pathname.includes("addlisting/1") && "Add New Listing"}
            {location.pathname.includes("addlisting/2") && "Property Details"}
            {location.pathname.includes("addlisting/3") && "Upload Photos"}
            {location.pathname.includes("addlisting/4") &&
              "Pricing & Availability"}
            {location.pathname.includes("addlisting/5") && "Review & Submit"}
          </div>
        )}

        {/* Hamburger Button for Small Screens (only when sidebar isn't present) */}
        <div className="md:hidden">
          <button
            className="text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="bg-purple-100 rounded-full p-2">
            <User size={20} className="text-purple-700" />
          </div>
          <span className="text-gray-800">Emmanuel</span>
        </div>
      </div>

      {/* Mobile Menu (only needed when sidebar isn't present) */}
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
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  {showBackButton ? (
                    <button
                      onClick={handleBack}
                      className="flex items-center space-x-3 w-full p-3 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      <ArrowLeft size={20} />
                      <span>Back to Dashboard</span>
                    </button>
                  ) : (
                    navLinks.map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 w-full p-3 rounded-md ${
                            isActive
                              ? "bg-purple-50 text-purple-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{link.name}</span>
                      </NavLink>
                    ))
                  )}
                </div>
              </div>

              {/* User Profile in Mobile Menu */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <User size={20} className="text-purple-700" />
                  </div>
                  <span className="text-gray-800">Emmanuel</span>
                </div>
              </div>

              {/* Logout in Mobile Menu */}
              <div className="p-4 border-t">
                <NavLink
                  to="/logout"
                  className="flex items-center space-x-3 w-full p-3 rounded-md text-red-600 hover:bg-red-50"
                >
                  <span>Logout</span>
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
