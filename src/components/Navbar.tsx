import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { nav_routes } from "../page_data/nav_data";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { countAtom } from "@/store/store";
import clsx from "clsx";

function Navbar() {
  let navigation = useNavigate();
  const [count] = useAtom(countAtom);

  // State to toggle the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle functionality
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex h-16 md:h-20 shadow-md px-4 sticky top-0 z-[200] bg-white border-b">
      <div className="container flex items-center mx-auto">
        {/* Logo */}
        <h1 className="text-lg md:text-xl font-bold text-purple-700">
          RentIt {count}
        </h1>

        {/* Desktop Menu */}
        <div className="ml-auto items-center gap-6 hidden md:flex">
          {nav_routes.map(({ name, to }) => (
            <NavLink
              to={to}
              key={name}
              className={({ isActive }) =>
                clsx(
                  "relative px-3 py-1 text-base font-medium transition-all duration-200 ease-in-out text-gray-700 hover:text-purple-700",
                  { "text-purple-700 font-semibold": isActive },
                )
              }
            >
              <span className="relative inline-block">
                {name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </span>
            </NavLink>
          ))}
          {/* Buttons */}
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 transition-all"
            onClick={() => {
              navigation("/renter/signup");
            }}
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-600 transition-all"
            onClick={() => {
              navigation("/renter/login");
            }}
          >
            Login
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto flex items-center">
          <button
            className="text-purple-600 hover:text-purple-800 transition-all"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Dropdown */}
      <div
        className={clsx(
          "fixed inset-0 bg-white z-[150] flex flex-col items-center justify-center transition-transform duration-300 ease-in-out",
          {
            "translate-y-0": isMenuOpen, // Menu is fully visible
            "-translate-y-full": !isMenuOpen, // Menu is hidden above the screen
          },
        )}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
          onClick={closeMenu}
          aria-label="Close Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        {nav_routes.map(({ name, to }) => (
          <NavLink
            to={to}
            key={name}
            onClick={closeMenu}
            className={({ isActive }) =>
              clsx(
                "text-xl font-medium my-4 text-gray-700 transition-all duration-200 ease-in-out hover:text-purple-700",
                { "text-purple-700 font-semibold": isActive },
              )
            }
          >
            {name}
          </NavLink>
        ))}

        {/* Buttons for Signup/Login */}
        <Button
          className="mt-6 w-48 bg-purple-600 text-white hover:bg-purple-700 transition-all"
          onClick={() => {
            closeMenu();
            navigation("/renter/signup");
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="outline"
          className="mt-4 w-48 border-purple-600 text-purple-600 hover:bg-purple-50 transition-all"
          onClick={() => {
            closeMenu();
            navigation("/renter/login");
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
