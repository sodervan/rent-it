import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { nav_routes } from "../page_data/nav_data";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { countAtom } from "@/store/store";
import { IconSearch } from "@tabler/icons-react";
import clsx from "clsx";

function Navbar() {
  let navigation = useNavigate();
  const [count] = useAtom(countAtom);

  // State to toggle the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to toggle the search bar
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle functionality for menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu
  const closeMenu = () => setIsMenuOpen(false);

  // Toggle functionality for search
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Handle search execution
  const executeSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery); // Replace with actual search logic
      setSearchQuery("");
      setIsSearchOpen(false);
    }
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
                onClick={() => navigation("/renter/signup")}
            >
              Sign Up
            </Button>
            <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-600 transition-all"
                onClick={() => navigation("/renter/login")}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden ml-auto flex items-center">
            {/* Search Icon */}
            <button
                onClick={toggleSearch}
                className="text-purple-600 hover:text-purple-800 mr-4"
                aria-label="Search"
            >
              <IconSearch size={20} />
            </button>

            {/* Menu Toggle Icon */}
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

        {/* Search Input */}
        <div
            className={clsx(
                "fixed inset-x-0 top-0 px-4 pt-3 pb-0 bg-white shadow-lg border-b transition-transform duration-300 ease-in-out z-[150]",
                {
                  "translate-y-0": isSearchOpen, // Show when search is open
                  "-translate-y-full": !isSearchOpen, // Hide when search is closed
                },
            )}
        >
          {/* Search Bar */}
          <div className="relative mb-2 flex items-center">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md bg-gray-50 border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
                className="ml-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md px-4 py-2 transition-all"
                onClick={executeSearch}
                aria-label="Execute Search"
            >
              Search
            </button>
            <button
                className="ml-2 text-gray-600 hover:text-gray-800 transition-all"
                onClick={toggleSearch}
                aria-label="Cancel Search"
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
          </div>

          {/* Suggestions Box */}
          <div
              className={clsx(
                  "w-full bg-gray-50 border rounded-md shadow-md p-4 transition-opacity duration-300 ease-in-out",
                  {
                    "opacity-100 translate-y-0": isSearchOpen, // Show suggestion box
                    "opacity-0 -translate-y-2 pointer-events-none": !isSearchOpen, // Hide suggestion box
                  },
              )}
          >
            <p className="text-sm text-gray-500 mb-2">Suggestions</p>
            <ul>
              <li className="py-2 text-gray-700 hover:text-purple-600 cursor-pointer">
                Suggested Search 1
              </li>
              <li className="py-2 text-gray-700 hover:text-purple-600 cursor-pointer">
                Suggested Search 2
              </li>
              <li className="py-2 text-gray-700 hover:text-purple-600 cursor-pointer">
                Suggested Search 3
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Navbar;
