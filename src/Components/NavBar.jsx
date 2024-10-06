import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import LogOutModal from "./Modals/LogOutModal.jsx";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const NavBar = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [userId, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [regStatus, setRegStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("apartments");
  const data = [
    {
      label: "Apartments",
      value: "apartments",
      desc: [
        "University of Lagos",
        "Ui",
        "Lekki",
        "Single room",
        "Self-contain",
      ],
    },
    {
      label: "Agent",
      value: "agent",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];
  const menu = () => {
    setMenuOpen(false);
  };
  const toggleLogoutModal = () => {
    setToggleModal(!toggleModal);
  };
  const logout = () => {
    setId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("accountType");
    navigate(`${role === "user" ? "/" : "/agent/login"}`);
    window.history.replaceState(
      null,
      "",
      `${role === "user" ? "/" : "/agent/login"}`,
    );
    window.location.reload();
  };

  useEffect(() => {
    setId(localStorage.getItem("userId"));
    setRole(localStorage.getItem("accountType"));
    setRegStatus(localStorage.getItem("regStatus") || null);
  }, [location.pathname]);
  return (
    <>
      {toggleModal && (
        <LogOutModal onLogOut={logout} closeModal={toggleLogoutModal} />
      )}
      <div className="fixed z-[200] top-0 left-0 w-full bg-white shadow-md border-b-2 border-primaryPurple py-3 px-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/">
            <h1 className="text-2xl font-semibold text-primaryPurple hover:text-secondaryPurple transition-colors duration-300 cursor-pointer">
              RentIT
            </h1>
          </NavLink>

          {/* Hamburger Menu (Visible on small screens) */}
          <div className="md:hidden">
            <div className="flex gap-5 items-center justify-center">
              {userId && (
                <div
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <Avatar
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    alt="#"
                    size="sm"
                  />
                </div>
              )}
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
              to="/agent/signup"
              className="relative group font-light transition-all duration-300"
            >
              <p className="text-gray-600 hover:text-primaryPurple transition-colors duration-300">
                For Landlords/Agents
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primaryPurple transition-all duration-300 group-hover:w-full"></div>
            </NavLink>

            <NavLink
              className="bg-primaryPurple py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-lg transform hover:-translate-y-1"
              to="/renter/signup"
            >
              <p className="text-white font-medium">Sign up</p>
            </NavLink>

            <NavLink
              to="/renter/login"
              className="border border-primaryPurple py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-lg transform hover:-translate-y-1"
            >
              <p className="text-primaryPurple font-medium">
                {userId ? "Log Out" : "Login"}
              </p>
            </NavLink>
          </div>
        </div>

        {/* Small screen menu with animation search */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-[50%] rounded-b-xl shadow-lg bg-white transform ${
            searchOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-500 ease-in-out flex flex-col pt-3 items-start gap-2 px-4`}
        >
          <div className="flex gap-2 items-center w-full">
            <div
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-primaryPurple cursor-pointer focus:outline-none hover:text-secondaryPurple h-10 w-10 bg-[#F9F5FF] rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <i className="fi fi-rr-caret-left cursor-pointer"></i>
            </div>
            <div className="flex items-center w-full border border-gray-400 rounded-full justify-between px-5">
              <div className=" w-[80%] py-3 rounded-l-[11px]">
                <input
                  className="text-sm p-0 w-full border-none focus:ring-0 bg-none bg-white rounded-lg "
                  type="text"
                  placeholder="Search by University, Location, Property"
                />
              </div>
              <div onClick={() => setSearchOpen(!searchOpen)}>
                <div>
                  <i className="fi fi-rr-search"></i>
                </div>
              </div>
            </div>
          </div>
          <Tabs value={activeTab} className="px-2 mt-2">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-primaryPurple shadow-none rounded-none",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={
                    activeTab === value
                      ? "text-primaryPurple font-semibold"
                      : ""
                  }
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  <div className="overflow-y-auto">
                    {Array.isArray(desc) ? (
                      desc.map((item, index) => (
                        <div
                          onClick={() => {
                            setSearchOpen();
                          }}
                          className="flex items-center gap-2 py-1 w-full px-2 cursor-pointer rounded-lg hover:bg-gray-100 transition-all duration-200"
                          key={index}
                        >
                          <i className="fi fi-rr-time-past"></i>
                          <p>{item}</p>
                        </div>
                      ))
                    ) : (
                      <p>No description available</p> // Fallback in case desc is not an array
                    )}
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white transform ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-500 ease-in-out flex flex-col gap-4 px-4`}
        >
          <div className="flex justify-end my-4">
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
          </div>
          <div className="flex flex-col items-center justify-center gap-5 h-full overflow-y-auto">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
            >
              Home
            </NavLink>
            {userId && (
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
              >
                <div className="relative">
                  <div className="absolute right-0 top-0 h-4 w-4 bg-primaryPurple rounded-full"></div>
                  <p>Notifications</p>
                </div>
              </NavLink>
            )}
            {userId && (
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
              >
                {role === "user" ? "Saved Listings" : "Add Listings"}
              </NavLink>
            )}
            {userId && (
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
              >
                {role === "user" ? "Bookings" : "Check Bookings"}
              </NavLink>
            )}
            {userId && (
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
              >
                Profile & Settings
              </NavLink>
            )}
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
            {!userId && (
              <NavLink
                to="/agent/login"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2 w-full border-b text-gray-600 hover:text-primaryPurple transition-colors duration-300"
              >
                For Landlords/Agents
              </NavLink>
            )}
            {!userId && (
              <NavLink
                to="/renter/signup"
                onClick={() => setMenuOpen(false)}
                className="text-center bg-primaryPurple py-2 w-full rounded-lg text-white hover:bg-opacity-90 transition duration-300 shadow-lg"
              >
                Sign up
              </NavLink>
            )}
            <NavLink
              to={userId ? "#" : "/renter/login"}
              onClick={() => {
                if (userId) {
                  menu();
                  toggleLogoutModal();
                } else {
                  menu();
                }
              }} // Call logout if logged in
              className="text-center border border-primaryPurple py-2 w-full rounded-lg text-primaryPurple hover:bg-primaryPurple hover:text-white transition-all duration-300"
            >
              {userId ? "Log Out" : "Login"}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
