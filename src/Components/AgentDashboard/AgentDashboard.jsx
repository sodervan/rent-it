import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../Loaders/Loader.jsx";
import btn from "./../../assets/btn.png";
import icon from "./../../assets/icon.png";
import icon1 from "./../../assets/icon1.png";
import icon2 from "./../../assets/icon2.png";
import heart from "./../../assets/shared-icon.svg";
import love from "./../../assets/tdesign_heart-filled.svg";
import { Carousel } from "@material-tailwind/react";
import Sidebar from "./Sidebar.jsx";
import ShareModal from "../Modals/ShareModal.jsx";
// import { Pagination } from "./Components/AgentDashboard/Pagination.jsx";
// import Sidebar from "./AgentDashboard/Sidebar.jsx";

const CarouselCustomNavigation = ({ images }) => {
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50  flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          className="w-full h-[20rem] object-cover "
        />
      ))}
    </Carousel>
  );
};

const AgentDashboard = () => {
  const popularLocations = [
    {
      name: "Lekki View Apartments",
      address: "12 Lekki-Epe Expressway, Lagos",
      agentName: "Greenview Realtors",
      price: 1500000,
      frequency: "per annum",
      rating: 4.5,
      unitsAvailable: 5,
      rentersBooked: 2,
      type: "Single man",
      description:
        "Modern one-bedroom apartments with great proximity to nature and local attractions.",
      features: {
        dateListed: "2024-08-01",
        electricityStatus: "24/7 power",
        type: "Single man",
      },
      billsIncluded: ["Water", "Security"],
      propertyRules: ["No pets", "Quiet hours after 10 PM"],
      landmarks: ["Lekki Mall", "Lekki Beach"],
      poster:
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
    },
    {
      name: "Victoria Heights",
      address: "45 Victoria Island Way, Lagos",
      agentName: "Skyline Estates",
      price: 2500000,
      frequency: "per annum",
      rating: 4.8,
      unitsAvailable: 3,
      rentersBooked: 5,
      type: "Luxury",
      description:
        "Premium two-bedroom apartments located in the heart of Victoria Island, offering stunning city views.",
      features: {
        dateListed: "2024-07-15",
        electricityStatus: "24/7 power",
        type: "Luxury",
      },
      billsIncluded: ["Electricity", "Water", "Security"],
      propertyRules: ["No smoking", "No pets"],
      landmarks: ["Eko Atlantic", "Victoria Island Beach"],
      poster:
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
    },
    {
      name: "Ikoyi Residence",
      address: "7 Osborne Road, Ikoyi, Lagos",
      agentName: "Prime Properties",
      price: 2000000,
      frequency: "per annum",
      rating: 4.6,
      unitsAvailable: 2,
      rentersBooked: 3,
      type: "Family",
      description:
        "Spacious three-bedroom apartments in a serene and secure neighborhood of Ikoyi.",
      features: {
        dateListed: "2024-06-20",
        electricityStatus: "24/7 power",
        type: "Family",
      },
      billsIncluded: ["Security", "Water"],
      propertyRules: ["No loud parties", "Quiet hours after 9 PM"],
      landmarks: ["Ikoyi Club", "Banana Island"],
      poster:
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
    },
    {
      name: "Yaba Central Flats",
      address: "22 Herbert Macaulay Way, Yaba, Lagos",
      agentName: "Urban Realty",
      price: 800000,
      frequency: "per annum",
      rating: 4.3,
      unitsAvailable: 10,
      rentersBooked: 4,
      type: "Single",
      description:
        "Affordable one-bedroom flats with easy access to public transport and major educational institutions.",
      features: {
        dateListed: "2024-09-01",
        electricityStatus: "12/7 power",
        type: "Single",
      },
      billsIncluded: ["Water"],
      propertyRules: ["No pets"],
      landmarks: ["University of Lagos", "Yaba Market"],
      poster:
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1725052734/an_accommodation_interior_2_pf2qmg.jpg",
    },
  ];

  const accommodations = popularLocations?.accommodations || [];
  const id = popularLocations?.id;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [share, setShare] = useState(null);

  const updateShareState = () => {
    setShare(true);
  };
  const closeShareModal = () => {
    setShare(false);
  };
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState(null); // Use null initially
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAgentDetails = async (token) => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        "https://rent-it-api.onrender.com/api/v1/agents",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass token here
          },
        }
      );

      const result = await response.json();
      console.log("API result:", result); // Log the full result for debugging
      if (response.ok) {
        setAgentData(result);
        console.log(agentData);
      } else {
        console.log("Failed to fetch agent details");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      fetchAgentDetails(token); // Fetch agent details only after token is set
    }
  }, []);
  return (
    <>
      <Sidebar />
      <div className={`content mt-20 lg:ml-[25rem] xl:ml-[23rem] `}>
        <div className="">
          {loading ? (
            <Loader />
          ) : (
            <div className=" p-5 ">
              <h2 className="font-bold text-lg">Dashboard - Listings</h2>

              <div className="grid xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 xl:px-10 px-4 w-full  mt-6 max-w-[950px] py-10">
                {popularLocations.length > 0 ? (
                  popularLocations.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col rounded-lg shadow-lg w-full lg:w-[25rem] h-[25rem] md:w-[20rem] cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
                        <div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
                          <div className="bg-[#F4EBFF] p-2 rounded-xl">
                            <p className="text-[12px] font-[600] text-primaryPurple">
                              {item.type}
                            </p>
                          </div>
                          <div className="flex gap-1 mr-5">
                            <div className="h-8 w-8 bg-[#F4EBFF] text-primaryPurple rounded-full flex items-center justify-center hover:bg-primaryPurple hover:text-white transition-all duration-300">
                              <i className="fi fi-rr-heart text-[12px]"></i>
                            </div>
                            <button
                              className="h-8 w-8 bg-[#F4EBFF] text-primaryPurple rounded-full flex items-center justify-center hover:bg-primaryPurple hover:text-white transition-all duration-300"
                              onClick={updateShareState}
                            >
                              <i className="fi fi-rr-share text-[12px]"></i>
                            </button>
                          </div>
                        </div>
                        <div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                          <div>
                            <p className="text-[12px] text-primaryPurple whitespace-nowrap">
                              <span className="text-sm font-semibold">
                                {item.rentersBooked + " "}
                              </span>
                              renters have booked this listing
                            </p>
                          </div>
                        </div>
                        <img
                          src={item.poster}
                          alt="#"
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            hoveredIndex === index ? "transform scale-110" : ""
                          }`}
                        />
                      </div>

                      <NavLink
                        to={`/listing-details-page/${id}/${index}`}
                        className="h-[40%] p-2 flex flex-col gap-2 justify-center"
                      >
                        <p className="text-sm font-bold">{item.name}</p>
                        <div className="flex gap-1 items-center">
                          <p className="text-[15px] text-gray-600">
                            {`N ${item.price.toLocaleString()}`}
                          </p>
                          <p className="text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
                            {item.frequency}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
                          <p className="text-xs">
                            Units Available: {item.unitsAvailable}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fi fi-rr-marker text-[#FF3D3D]"></i>
                          <p className="text-xs">{item.address}</p>
                        </div>
                      </NavLink>
                      {share && (
                        <ShareModal
                          closeModal={closeShareModal}
                          name={item.name}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>No accommodations available.</p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="my-6">{/* <Pagination /> */}</div>
      </div>
    </>
  );
};
export default AgentDashboard;
