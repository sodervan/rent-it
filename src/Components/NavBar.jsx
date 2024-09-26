import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  // State to control the visibility of the menu on small screens
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
            <div className="flex gap-5 items-center justify-center">
              <button onClick={() => setSearchOpen(!searchOpen)}>
                <i className="fi fi-rr-search text-primaryPurple"></i>
              </button>
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

        {/* Small screen menu with animation search */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-[30%] rounded-b-xl shadow-lg bg-white transform ${
            searchOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-500 ease-in-out flex flex-col pt-10 items-center gap-6 px-4`}
        >
          <div
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-primaryPurple focus:outline-none hover:text-secondaryPurple cursor-pointer h-10 w-10 bg-[#F9F5FF] rounded-full flex items-center justify-center transition-colors duration-300"
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
          <div className="flex items-center w-full">
            <div className=" w-[80%] border border-gray-100 bg-white py-3 px-4 rounded-l-[11px] shadow-lg">
              <input
                className="text-sm p-0 w-full border-none focus:ring-0 bg-none bg-white rounded-lg "
                type="text"
                placeholder="Search by University, Location, Property"
              />
            </div >
            <div
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex bg-primaryPurple cursor-pointer w-[20%] py-3 px-4 rounded-r-[11px] items-center justify-center gap-1"
            >
              <div>
                <i className="fi fi-rr-search text-sm text-white"></i>
              </div>
              <div>
                <p className="text-white text-sm">Search</p>
              </div>
            </div>
          </div>
        </div>

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
