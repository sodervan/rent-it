import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useTokenData from "../../TokenHook.js";

const ListingDetailsNavbar = () => {
  const { tokenData } = useTokenData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // Handle scroll effect for navbar with throttling
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
          lastScrollY = window.scrollY;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Add a subtle animation before signout
    const signoutAnimation = () => {
      localStorage.removeItem("token");
      window.location.href = "/";
    };

    setTimeout(signoutAnimation, 300);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out backdrop-blur-sm ${
        isScrolled ? "bg-white/95 shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with hover effect */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold text-purple-700 transition-all duration-300 group-hover:scale-105">
              RentIT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/renter/dashboard/home">Home</NavLink>
            {/*<NavLink to="/about">About Us</NavLink>*/}
            {/*<NavLink to="/contact">Contact</NavLink>*/}

            {/* Conditional rendering based on token */}
            {tokenData ? (
              <div className="flex items-center space-x-4">
                {/* User dropdown menu */}
                <div className="relative group" ref={dropdownRef}>
                  <button
                    className={`flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none transition-all duration-300 ${isDropdownOpen ? "text-indigo-600" : ""}`}
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>{tokenData.name || "My Account"}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-indigo-600" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 transition-all duration-300 ease-in-out transform origin-top-right ${
                      isDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {tokenData.role === "agent" ? (
                      <DropdownLink to="/agent/dashboard">
                        Agent Dashboard
                      </DropdownLink>
                    ) : (
                      <DropdownLink to="/renter/dashboard">
                        My Dashboard
                      </DropdownLink>
                    )}
                    <DropdownLink to="/profile">Profile</DropdownLink>
                    <DropdownLink to="/favorites">
                      Favorite Listings
                    </DropdownLink>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
                <Link
                  to={
                    tokenData.role === "agent"
                      ? "/agent/new-listing"
                      : "/contact-agent"
                  }
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {tokenData.role === "agent" ? "Add Listing" : "Contact Agent"}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* User is not logged in */}
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none transition-all duration-300"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45 top-3" : "top-1"
                  }`}
                ></span>
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0" : "top-3"
                  }`}
                ></span>
                <span
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45 top-3" : "top-5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-[calc(var(--navbar-height,56px))] bg-white border-t border-gray-200 shadow-lg transform transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
          style={{ height: "calc(100vh - var(--navbar-height, 56px))" }}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4 overflow-y-auto h-full">
            <MobileNavLink to="/listings" onClick={() => setIsMenuOpen(false)}>
              All Listings
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>

            {tokenData ? (
              <>
                {/* User is logged in (mobile) */}
                {tokenData.role === "agent" ? (
                  <MobileNavLink
                    to="/agent/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agent Dashboard
                  </MobileNavLink>
                ) : (
                  <MobileNavLink
                    to="/renter/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Dashboard
                  </MobileNavLink>
                )}
                <MobileNavLink
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile Settings
                </MobileNavLink>
                <MobileNavLink
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saved Listings
                </MobileNavLink>
                <hr className="my-4 border-gray-200" />
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-indigo-600 transition-colors duration-300 py-3 font-medium"
                >
                  Sign Out
                </button>
                <Link
                  to={
                    tokenData.role === "agent"
                      ? "/agent/new-listing"
                      : "/contact-agent"
                  }
                  className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out hover:shadow-lg text-center mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tokenData.role === "agent" ? "Add Listing" : "Contact Agent"}
                </Link>
              </>
            ) : (
              <>
                {/* User is not logged in (mobile) */}
                <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </MobileNavLink>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out hover:shadow-lg text-center mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop Nav Link component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-indigo-600 relative group transition-colors duration-300"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 origin-left group-hover:w-full"></span>
  </Link>
);

// Dropdown Link component
const DropdownLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
  >
    {children}
  </Link>
);

// Mobile Nav Link component
const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 py-3 font-medium flex items-center"
    onClick={onClick}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 ml-auto transition-transform duration-300 group-hover:translate-x-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </Link>
);

export default ListingDetailsNavbar;
