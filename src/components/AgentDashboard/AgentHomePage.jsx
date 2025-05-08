import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/AgentDashboard/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AgentHomePage() {
  // State for property filters
  const [propertyType, setPropertyType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("All Prices");
  const [location, setLocation] = useState("Open Locations");
  const [agentData, setAgentData] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // localStorage.clear();
    const fetchAgentDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/agents`, {
          withCredentials: true,
        });
        setAgentData(response.data.payload);
        localStorage.setItem(
          "agentData",
          JSON.stringify(response.data.payload),
        );
        console.log(agentData);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (localStorage.getItem("agentData")) {
      setAgentData(JSON.parse(localStorage.getItem("agentData")));
      setIsLoading(false);
      console.log(agentData);
    } else {
      fetchAgentDetails();
    }
  }, []);

  // Handle sidebar collapse state
  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Featured properties data - expanded to 6 items
  const featuredProperties = [
    {
      id: 1,
      image: "/api/placeholder/580/320",
      location: "Modern Luxury Resort",
      rooms: "4 Beds • 3 Baths",
      price: "$3,850,000",
      featured: "Premium",
    },
    {
      id: 2,
      image: "/api/placeholder/580/320",
      location: "Elegant City Condo",
      rooms: "2 Beds • 2 Baths",
      price: "$1,275,000",
      featured: "Featured",
    },
    {
      id: 3,
      image: "/api/placeholder/580/320",
      location: "Modern Family Home",
      rooms: "3 Beds • 2 Baths",
      price: "$2,180,000",
      featured: "Premium",
    },
    {
      id: 4,
      image: "/api/placeholder/580/320",
      location: "Modern Living Space",
      rooms: "4 Beds • 3 Baths",
      price: "$2,320,000",
      featured: "Featured",
    },
    {
      id: 5,
      image: "/api/placeholder/580/320",
      location: "Waterfront Villa",
      rooms: "5 Beds • 4 Baths",
      price: "$4,750,000",
      featured: "Premium",
    },
    {
      id: 6,
      image: "/api/placeholder/580/320",
      location: "Downtown Penthouse",
      rooms: "3 Beds • 3 Baths",
      price: "$3,125,000",
      featured: "Featured",
    },
  ];

  return (
    <>
      <Sidebar
        firstname={agentData?.firstname}
        loading={isLoading}
        onCollapse={handleSidebarCollapse}
      />
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-60"} mt-20 min-h-screen font-sans`}
      >
        {/* Hero Section - Made fully responsive */}
        <motion.div
          className="relative overflow-hidden rounded-lg mx-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1746619048/huy-nguyen-AB-q9lwCVv8-unsplash_aagq8k.jpg"
              alt="Modern Luxury Home"
              className="w-full h-full object-cover"
            />

            {/* Overlay Content with responsive positioning */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl ml-4 sm:ml-8 md:ml-12 lg:ml-16">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3">
                      <span className="block">SHOWCASE YOUR</span>
                      <span className="block">PROPERTIES</span>
                      <span className="block">WITH EASE</span>
                    </motion.h1>
                    <motion.p className="text-gray-50 text-xs sm:text-sm md:text-base lg:text-lg mb-6 max-w-md">
                      List your apartments, attract the right tenants, and
                      manage your bookings — all in one place. Join our network
                      of trusted agents and landlords
                    </motion.p>

                    <motion.button
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded text-sm sm:text-base"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate("/agent/addlisting/1");
                      }}
                    >
                      + Add a Listing
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters Section - Made responsive */}
        <motion.div
          className="mx-auto -mt-8 sm:-mt-10 md:-mt-12 relative z-10 bg-white shadow-lg p-3 sm:p-4 w-[90%] sm:w-[85%] md:w-[80%]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Location</p>
              <select
                className="w-full p-2 border border-gray-200 rounded-md text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Open Locations</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
                <option>Miami</option>
              </select>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Property Type</p>
              <select
                className="w-full p-2 border border-gray-200 rounded-md text-sm"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option>All Types</option>
                <option>Houses</option>
                <option>Apartments</option>
                <option>Condos</option>
                <option>Villas</option>
              </select>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-xs text-gray-500 mb-1">Price Range</p>
              <select
                className="w-full p-2 border border-gray-200 rounded-md text-sm"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option>All Prices</option>
                <option>$500,000 - $1,000,000</option>
                <option>$1,000,000 - $2,000,000</option>
                <option>$2,000,000 - $5,000,000</option>
                <option>$5,000,000+</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Properties Section - Increased to 6 items with responsive grid */}
        <div className="px-4 py-8 sm:py-10 md:py-12">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <motion.h2
              className="text-xl sm:text-2xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Featured Properties
            </motion.h2>

            <motion.button
              className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.location}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${property.featured === "Premium" ? "bg-purple-500 text-white" : "bg-pink-100 text-pink-500"}`}
                    >
                      {property.featured}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-base sm:text-lg mb-1 line-clamp-1">
                    {property.location}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    {property.rooms}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm sm:text-base md:text-lg">
                      {property.price}
                    </span>
                    <button className="text-purple-600 text-xs sm:text-sm hover:text-purple-800 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
