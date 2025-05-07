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
  // Featured properties data
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
  ];

  return (
    <>
      <Sidebar firstname={agentData?.firstname} loading={isLoading} />
      <div className="lg:ml-64 mt-20 min-h-screen font-sans">
        {/* Hero Section */}
        <motion.div
          className="relative h-full overflow-hidden rounded-lg mx-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://res.cloudinary.com/dmlgns85e/image/upload/v1746619048/huy-nguyen-AB-q9lwCVv8-unsplash_aagq8k.jpg"
            alt="Modern Luxury Home"
            className="w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-30">
            <div className="bg-white p-6 max-w-md">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.h1 className="text-3xl md:text-4xl font-semibold text-black mb-2">
                  SHOWCASE YOUR
                  <br />
                  PROPERTIES WITH EASE
                </motion.h1>
                <motion.p className="text-gray-600 text-sm md:text-base mb-6 max-w-md">
                  List your apartments, attract the right tenants, and manage
                  your bookings — all in one place. Join our network of trusted
                  agents and landlords
                </motion.p>

                <motion.button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md transition-colors duration-300 w-full"
                  // whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate("/agent/addlisting/1");
                    console.log(localStorage.getItem());
                  }}
                >
                  + Add a Listing
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="mx-auto -mt-12 relative z-10 bg-white shadow-lg p-4 w-[80%]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Location</p>
              <select
                className="w-full p-2 border border-gray-200 rounded-md"
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
                className="w-full p-2 border border-gray-200 rounded-md"
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

            <div>
              <p className="text-xs text-gray-500 mb-1">Price Range</p>
              <select
                className="w-full p-2 border border-gray-200 rounded-md"
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

        {/* Featured Properties Section */}
        <div className="px-4 py-12">
          <motion.h2
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Featured Properties
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${property.featured === "Premium" ? "bg-purple-500 text-white" : "bg-pink-100 text-pink-500"}`}
                    >
                      {property.featured}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">
                    {property.location}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{property.rooms}</p>

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">
                      {property.price}
                    </span>
                    <button className="text-purple-600 text-sm">
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
