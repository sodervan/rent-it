import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  // State to control the visibility of the menu on small screens
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed z-20 top-0 left-0 w-full bg-white shadow-md border-b-2 border-primaryPurple py-3 px-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-semibold text-primaryPurple hover:text-secondaryPurple transition-colors duration-300 cursor-pointer">
              RentIT
            </h1>
          </div>

          {/* Hamburger Menu (Visible on small screens) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-primaryPurple focus:outline-none hover:text-secondaryPurple transition-colors duration-300"
            >
              {menuOpen ? (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Menu Links (Visible on medium and larger screens) */}
          <div className="hidden md:flex gap-6 items-center">
            <NavLink
              to="/"
              className="relative group font-light transition-all duration-300"
            >
              <p className="text-gray-600 hover:text-primaryPurple transition-colors duration-300">
                Home
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primaryPurple transition-all duration-300 group-hover:w-full"></div>
            </NavLink>

            <NavLink
              to="/blog"
              className="relative group font-light transition-all duration-300"
            >
              <p className="text-gray-600 hover:text-primaryPurple transition-colors duration-300">
                Blog
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primaryPurple transition-all duration-300 group-hover:w-full"></div>
            </NavLink>

            <NavLink
              to="/about"
              className="relative group font-light transition-all duration-300"
            >
              <p className="text-gray-600 hover:text-primaryPurple transition-colors duration-300">
                About us
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primaryPurple transition-all duration-300 group-hover:w-full"></div>
            </NavLink>

            <NavLink
              to="/landlords"
              className="relative group font-light transition-all duration-300"
            >
              <p className="text-gray-600 hover:text-primaryPurple transition-colors duration-300">
                For Landlords/Agents
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primaryPurple transition-all duration-300 group-hover:w-full"></div>
            </NavLink>

            <NavLink
              className="bg-primaryPurple py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-lg transform hover:-translate-y-1"
              to="/signup"
            >
              <p className="text-white font-medium">Sign up</p>
            </NavLink>

            <NavLink
              to="/login"
              className="border border-primaryPurple py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-lg transform hover:-translate-y-1"
            >
              <p className="text-primaryPurple font-medium">Login</p>
            </NavLink>
          </div>
        </div>

        {/* Small screen menu with animation */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white transform ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-500 ease-in-out flex flex-col justify-center items-center gap-4 px-4`}
        >
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primaryPurple focus:outline-none hover:text-secondaryPurple cursor-pointer transition-colors duration-300"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
          >
            About us
          </NavLink>
          <NavLink
            to="/landlords"
            onClick={() => setMenuOpen(false)}
            className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
          >
            For Landlords/Agents
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="text-center bg-primaryPurple py-2 w-full rounded-lg text-white hover:bg-opacity-90 transition duration-300 shadow-lg"
          >
            Sign up
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-center border border-primaryPurple py-2 w-full rounded-lg text-primaryPurple hover:bg-primaryPurple hover:text-white transition-all duration-300"
          >
            Login
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
