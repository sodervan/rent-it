import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  MapPin,
  Filter,
  List,
  Navigation,
  Compass,
  School,
  ShoppingBag,
  Coffee,
  Train,
  Clock,
  Utensils,
  ChevronDown,
} from "lucide-react";
import Loader from "../../../components/Loaders/Loader";
import { get_listing, LISTINGRESPONSE } from "@/lib/api";
import QueryCard from "../renter_dash_comps/QueryCard";
import Searchbar from "../renter_dash_comps/Searchbar";
import { LISTINGITEM } from "@/lib/api";

// Featured property type for carousel
type FeaturedProperty = {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  size: number;
  imageUrl: string;
};

// Popular location type
type PopularLocation = {
  id: string;
  name: string;
  description: string;
  propertyCount: number;
  icon: React.ReactNode;
};

// City type
type PopularCity = {
  id: string;
  name: string;
  propertyCount: number;
  imageUrl: string;
};

// Nigerian State type
type NigerianState = {
  id: string;
  name: string;
  cities: {
    id: string;
    name: string;
    propertyCount: number;
  }[];
};
// HORIZONTAL SCROLL VIEW

const HorizontalScrollContainer = ({
  title,
  icon,
  children,
  description,
  childrenTwo,
}) => {
  const scrollRef = useRef(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftShadow(scrollLeft > 0);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      // Initialize shadow state
      handleScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className=" relative">
      {/* Title with icon */}
      {title && (
        <>
          <div className="flex-col items-center mb-4">
            <h2 className="text-xl font-medium text-gray-800 flex items-center gap-2">
              {icon && <span className="text-primaryPurple">{icon}</span>}
              {title}
            </h2>
            <p className="text-gray-500 my-3">{description}</p>
          </div>
          {childrenTwo}
        </>
      )}
      {/* Scroll container with gradient shadows on sides */}
      <div className="relative">
        {/* Left gradient shadow */}
        {showLeftShadow && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
        )}

        {/* Scroll buttons */}
        {showLeftShadow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 border border-gray-200 hover:bg-gray-50 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {showRightShadow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 border border-gray-200 hover:bg-gray-50 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
        >
          {children}
        </div>

        {/* Right gradient shadow */}
        {showRightShadow && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

// Property Type Filter component
const PropertyTypeFilter = ({ activeType, setActiveType }) => {
  const propertyTypes = [
    { id: "all", icon: <Home size={18} />, label: "All" },
    { id: "house", icon: <Home size={18} />, label: "House" },
    { id: "apartment", icon: <Building2 size={18} />, label: "Apartment" },
    { id: "commercial", icon: <Building2 size={18} />, label: "Commercial" },
  ];

  return (
    <div className="flex gap-3 py-4 overflow-x-auto no-scrollbar">
      {propertyTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => setActiveType(type.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
            activeType === type.id
              ? "bg-primaryPurple text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {type.icon}
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  );
};

// RecentlyViewedListings component
const RecentlyViewedListings = () => {
  const [recentListings, setRecentListings] = useState<LISTINGITEM[]>([]);

  useEffect(() => {
    // Function to get recently viewed listings from localStorage
    const getRecentlyViewed = () => {
      try {
        const storedListings = localStorage.getItem("recentlyViewedListings");
        if (storedListings) {
          const parsedListings = JSON.parse(storedListings);
          setRecentListings(parsedListings);
        }
      } catch (error) {
        console.error("Error fetching recently viewed listings:", error);
        setRecentListings([]);
      }
    };

    // Get listings when component mounts
    getRecentlyViewed();

    // Add event listener to refresh when storage changes
    // This ensures the component updates if a listing is viewed in another tab/window
    window.addEventListener("storage", getRecentlyViewed);

    // Also listen for custom storage events dispatched within the same window
    const handleStorageEvent = () => getRecentlyViewed();
    window.addEventListener("recentListingsUpdated", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", getRecentlyViewed);
      window.removeEventListener("recentListingsUpdated", handleStorageEvent);
    };
  }, []);

  // Don't render anything if there are no recently viewed listings
  if (recentListings.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-gray-400 pb-6">
      <HorizontalScrollContainer
        title="Continue Where You Left Off"
        icon={<Clock size={20} />}
      >
        {recentListings.map((listing) => (
          <div className="min-w-64 md:min-w-72 flex-shrink-0" key={listing.id}>
            <QueryCard {...listing} />
          </div>
        ))}
      </HorizontalScrollContainer>
    </div>
  );
};

// Popular Locations component
const PopularLocations = () => {
  const popularLocations: PopularLocation[] = [
    {
      id: "loc1",
      name: "City Center",
      description: "Urban living with easy access to amenities",
      propertyCount: 42,
      icon: <Navigation size={20} />,
    },
    {
      id: "loc2",
      name: "University District",
      description: "Ideal for students and academics",
      propertyCount: 28,
      icon: <School size={20} />,
    },
    {
      id: "loc3",
      name: "Shopping District",
      description: "Close to major shopping centers",
      propertyCount: 19,
      icon: <ShoppingBag size={20} />,
    },
    {
      id: "loc4",
      name: "Cafe Quarter",
      description: "Trendy area with cafes and restaurants",
      propertyCount: 24,
      icon: <Coffee size={20} />,
    },
    {
      id: "loc5",
      name: "Transit Hub",
      description: "Great public transportation connections",
      propertyCount: 31,
      icon: <Train size={20} />,
    },
  ];

  return (
    <HorizontalScrollContainer
      title="Popular Locations Near You"
      icon={<MapPin size={20} />}
    >
      {popularLocations.map((location) => (
        <div
          key={location.id}
          className="min-w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-full text-blue-500">
              {location.icon}
            </div>
            <h4 className="font-medium">{location.name}</h4>
          </div>
          <p className="text-sm text-gray-600 mb-2">{location.description}</p>
          <p className="text-sm text-blue-600">
            {location.propertyCount} properties
          </p>
        </div>
      ))}
    </HorizontalScrollContainer>
  );
};

// Nigerian States and Cities component
const NigerianStatesAndCities = () => {
  // Expanded list of Nigerian states
  const nigerianStates = [
    { id: "state1", name: "Lagos", featured: true },
    { id: "state2", name: "Abuja", featured: true },
    { id: "state3", name: "Rivers", featured: true },
    { id: "state4", name: "Kano", featured: true },
    { id: "state5", name: "Oyo", featured: true },
    { id: "state6", name: "Enugu", featured: false },
    { id: "state7", name: "Kaduna", featured: false },
    { id: "state8", name: "Delta", featured: false },
    { id: "state9", name: "Edo", featured: false },
    { id: "state10", name: "Anambra", featured: false },
    { id: "state11", name: "Imo", featured: false },
    { id: "state12", name: "Akwa Ibom", featured: false },
    { id: "state13", name: "Plateau", featured: false },
    { id: "state14", name: "Ogun", featured: false },
    { id: "state15", name: "Borno", featured: false },
    { id: "state16", name: "Cross River", featured: false },
    { id: "state17", name: "Bayelsa", featured: false },
    { id: "state18", name: "Abia", featured: false },
    { id: "state19", name: "Osun", featured: false },
    { id: "state20", name: "Ekiti", featured: false },
  ];

  const [selectedState, setSelectedState] = useState("state1"); // Default to Lagos
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the selected state name
  const getSelectedStateName = () => {
    const state = nigerianStates.find((state) => state.id === selectedState);
    return state ? state.name : "Lagos";
  };

  // Filter states for display
  const featuredStates = nigerianStates.filter((state) => state.featured);
  const otherStates = nigerianStates.filter((state) => !state.featured);

  // Fetch listings for the selected state
  const { data: listingsData, isLoading } = useQuery({
    queryKey: ["stateListings", selectedState, selectedCity],
    queryFn: async () => {
      const stateName = getSelectedStateName();
      return await get_listing({
        state: stateName,
        ...(selectedCity ? { city: selectedCity } : {}),
        limit: 10, // Limit to prevent overwhelming the UI
      });
    },
  });

  // Function to handle city selection
  const handleCitySelect = (cityId, cityName) => {
    setSelectedCity(cityName);
  };

  return (
    <div className="mb-12 mt-10 pb-8 border-b border-gray-400">
      <HorizontalScrollContainer
        title="Explore properties across Nigeria"
        icon={
          <div>
            <img
              src={`https://flagcdn.com/w20/${"ng"}.png`}
              alt={`NG flag`}
              className="w-4 h-3"
            />
          </div>
        }
        childrenTwo={
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Featured states as direct buttons */}
            {featuredStates.map((state) => (
              <button
                key={state.id}
                onClick={() => {
                  setSelectedState(state.id);
                  setSelectedCity(""); // Reset city selection when state changes
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                  selectedState === state.id
                    ? "bg-primaryPurple text-white shadow-md"
                    : "border border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <MapPin
                  size={16}
                  className={
                    selectedState === state.id
                      ? "text-white"
                      : "text-primaryPurple"
                  }
                />
                <span>{state.name}</span>
              </button>
            ))}

            {/* Dropdown for other states */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              >
                More States
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-64 overflow-y-auto">
                  {otherStates.map((state) => (
                    <button
                      key={state.id}
                      onClick={() => {
                        setSelectedState(state.id);
                        setSelectedCity("");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <MapPin size={14} className="text-primaryPurple" />
                      <span>{state.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        }
      >
        {isLoading && (
          <div className="w-full flex justify-center items-center py-8">
            <Loader />
          </div>
        )}

        {/* Display property listings for selected state */}
        {!isLoading && listingsData && (
          <div className="mt-1">
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Properties in {getSelectedStateName()}
              {selectedCity && ` - ${selectedCity}`}
            </h3>

            {/* Display listings */}
            {listingsData.payload.data.length > 0 ? (
              <div className="flex flex-nowrap overflow-x-auto gap-6 py-2">
                {listingsData.payload.data.map((listing) => (
                  <div className="min-w-[280px] w-[280px] flex-shrink-0">
                    <EnhancedQueryCard key={listing.id} {...listing} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600">
                  No properties found in {getSelectedStateName()}
                  {selectedCity && ` - ${selectedCity}`}.
                </p>
                <p className="text-gray-500 mt-2">
                  Try selecting a different state or city.
                </p>
              </div>
            )}
          </div>
        )}
      </HorizontalScrollContainer>
    </div>
  );
};

// Popular Cities component that replaces the Map/List toggle
const PopularCities = ({ selectedState, onCitySelect, selectedCity }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedState) return;

      setIsLoading(true);
      setError(null);

      try {
        // Using GeoDB Cities API (available with free tier on RapidAPI)
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=NG&namePrefix=${encodeURIComponent(selectedState)}&radius=100&limit=10&sort=-population`,
          {
            headers: {
              "X-RapidAPI-Key":
                "8882c190f6msh82ffd59b63eb1b2p11ca1fjsn7178c8da7682",
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await response.json();

        // Transform the data to match our required format
        const formattedCities = data.data.map((city, index) => ({
          id: `city${index + 1}`,
          name: city.name,
          propertyCount: Math.floor(Math.random() * 100) + 50, // Mock property count
          latitude: city.latitude,
          longitude: city.longitude,
        }));

        setCities(formattedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError(error.message);

        // Fallback to hardcoded cities based on state
        const fallbackCities = getFallbackCitiesByState(selectedState);
        setCities(fallbackCities);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [selectedState]);

  // Fallback function to get cities by state when API fails
  const getFallbackCitiesByState = (state) => {
    const citiesByState = {
      Lagos: [
        {
          id: "city1",
          name: "Lekki",
          propertyCount: 156,
          latitude: 6.4698,
          longitude: 3.5852,
        },
        {
          id: "city2",
          name: "Ikeja",
          propertyCount: 124,
          latitude: 6.6018,
          longitude: 3.3515,
        },
        {
          id: "city3",
          name: "Victoria Island",
          propertyCount: 98,
          latitude: 6.4281,
          longitude: 3.4219,
        },
        {
          id: "city4",
          name: "Yaba",
          propertyCount: 83,
          latitude: 6.5154,
          longitude: 3.387,
        },
        {
          id: "city5",
          name: "Ikoyi",
          propertyCount: 76,
          latitude: 6.45,
          longitude: 3.4333,
        },
      ],
      Abuja: [
        {
          id: "city6",
          name: "Wuse",
          propertyCount: 112,
          latitude: 9.0765,
          longitude: 7.4943,
        },
        {
          id: "city7",
          name: "Maitama",
          propertyCount: 95,
          latitude: 9.0909,
          longitude: 7.5,
        },
        {
          id: "city8",
          name: "Asokoro",
          propertyCount: 87,
          latitude: 9.05,
          longitude: 7.5333,
        },
        {
          id: "city9",
          name: "Gwarinpa",
          propertyCount: 76,
          latitude: 9.118,
          longitude: 7.3947,
        },
        {
          id: "city10",
          name: "Garki",
          propertyCount: 65,
          latitude: 9.0267,
          longitude: 7.4833,
        },
      ],
      Rivers: [
        {
          id: "city11",
          name: "Port Harcourt",
          propertyCount: 143,
          latitude: 4.8156,
          longitude: 7.0498,
        },
        {
          id: "city12",
          name: "Obio/Akpor",
          propertyCount: 89,
          latitude: 4.8581,
          longitude: 7.0588,
        },
        {
          id: "city13",
          name: "Eleme",
          propertyCount: 67,
          latitude: 4.7833,
          longitude: 7.1167,
        },
      ],
      Kano: [
        {
          id: "city14",
          name: "Kano",
          propertyCount: 132,
          latitude: 12.0,
          longitude: 8.5167,
        },
        {
          id: "city15",
          name: "Fagge",
          propertyCount: 75,
          latitude: 12.0,
          longitude: 8.52,
        },
        {
          id: "city16",
          name: "Dala",
          propertyCount: 68,
          latitude: 12.0444,
          longitude: 8.4853,
        },
      ],
      // Add more states as needed
    };

    return citiesByState[state] || citiesByState["Lagos"];
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    onCitySelect(city.name);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primaryPurple"></div>
      </div>
    );
  }

  if (error && cities.length === 0) {
    return (
      <div className="text-red-500 py-2">
        Error loading cities. Please try again later.
      </div>
    );
  }

  return (
    <HorizontalScrollContainer>
      {cities.map((city) => (
        <button
          key={city.id}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
            selectedCity === city.name
              ? "bg-primaryPurple text-white border-primaryPurple"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => {
            handleCitySelect(city);
          }}
        >
          <MapPin
            size={16}
            className={
              selectedCity === city.name ? "text-white" : "text-primaryPurple"
            }
          />
          <span>{city.name}</span>
          <span className="text-xs ml-1 opacity-75">
            ({city.propertyCount})
          </span>
        </button>
      ))}
    </HorizontalScrollContainer>
  );
};
// Featured Properties Carousel component
const FeaturedPropertiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample featured properties - replace with your actual data
  const featuredProperties: FeaturedProperty[] = [
    {
      id: "feat1",
      title: "Luxury Apartment with Ocean View",
      price: 15000,
      location: "MS Northbound, Peachfield Road, UK",
      beds: 3,
      baths: 2,
      size: 1400,
      imageUrl:
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1741279682/deborah-cortelazzi-gREquCUXQLI-unsplash_hzogzh.jpg",
    },
    {
      id: "feat2",
      title: "Modern Family Home with Garden",
      price: 18000,
      location: "KN Northbound, Peachfield Road, UK",
      beds: 4,
      baths: 3,
      size: 1800,
      imageUrl:
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1741279808/francesca-tosolini-tHkJAMcO3QE-unsplash_2_rohhsu.jpg",
    },
    {
      id: "feat3",
      title: "Downtown Studio Apartment",
      price: 12000,
      location: "WL Northbound, Peachfield Road, UK",
      beds: 1,
      baths: 1,
      size: 600,
      imageUrl:
        "https://res.cloudinary.com/dmlgns85e/image/upload/v1741279850/huy-nguyen-AB-q9lwCVv8-unsplash_lfakxn.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProperties.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProperties.length - 1 : prevIndex - 1,
    );
  };

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = featuredProperties[currentIndex];

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg mb-12">
      {/* Main carousel image */}
      <div
        className="w-full h-full bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url(${current.imageUrl})` }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Carousel content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{current.title}</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2">
          <p className="text-xl font-semibold">
            ₦{current.price.toLocaleString()}/month
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm">
              <Home size={16} />
              {current.beds} Beds
            </span>
            <span className="flex items-center gap-1 text-sm">
              {current.baths} Baths
            </span>
            <span className="flex items-center gap-1 text-sm">
              {current.size} sqft
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <MapPin size={14} />
          <span>{current.location}</span>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredProperties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced QueryCard that saves to recently viewed
const EnhancedQueryCard = (props) => {
  const handleClick = () => {
    // Get current recently viewed listings
    try {
      const storedListings =
        localStorage.getItem("recentlyViewedListings") || "[]";
      const recentListings = JSON.parse(storedListings);

      // Check if this listing is already in the recently viewed
      const existingIndex = recentListings.findIndex(
        (item) => item.id === props.id,
      );

      // If it exists, remove it so we can add it to the front
      if (existingIndex !== -1) {
        recentListings.splice(existingIndex, 1);
      }

      // Add the current listing to the front
      recentListings.unshift(props);

      // Keep only the 8 most recent listings
      const updatedListings = recentListings.slice(0, 8);

      // Save back to localStorage
      localStorage.setItem(
        "recentlyViewedListings",
        JSON.stringify(updatedListings),
      );

      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error saving to recently viewed:", error);
    }
  };

  // Navigate to the listing page when clicked
  const navigateToListing = () => {
    // Save to recently viewed
    handleClick();

    console.log(`Navigating to listing page for ID: ${props.id}`);
  };
  return <QueryCard {...props} onClick={navigateToListing} />;
};

// Nearby Listings component
const NearbyListings = ({ data, isFetching }) => {
  if (isFetching) {
    return (
      <div className="w-full flex items-center justify-center rounded-xl">
        <Loader />
      </div>
    );
  }

  if (!data || data.payload.data.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center rounded-xl shadow-md">
        <p className="text-xl font-medium text-gray-700 mb-2">
          No properties found nearby
        </p>
        <p className="text-gray-500">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-400 mt-14 pb-6 mb-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
        <MapPin size={20} className="text-primaryPurple" />
        Listings Near You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto w-full px-4 sm:px-0">
        {data.payload.data.map((listing) => (
          <div className="flex justify-center w-full">
            <QueryCard
              {...listing}
              key={listing.id}
              className="w-full max-w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function RenterHomePage() {
  const [activeType, setActiveType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userState, setUserState] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [isRefetchingListings, setIsRefetchingListings] = useState(false);

  // Effect to get user's location and determine state and default city
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        setIsLoadingLocation(true);

        // Check if we already have the state and city stored in localStorage
        const storedState = localStorage.getItem("userState");
        const storedCity = localStorage.getItem("selectedCity");
        const storedCoords = localStorage.getItem("userCoordinates");

        if (storedState) {
          setUserState(storedState);

          // Set default city from storage if available
          if (storedCity) {
            setSelectedCity(storedCity);
          } else {
            // Set default city based on state - you can customize this mapping
            const defaultCityMap = {
              Lagos: "Ikeja",
              Abuja: "Central",
              Rivers: "Port Harcourt",
              // Add more state-to-default-city mappings as needed
            };

            const defaultCity = defaultCityMap[storedState] || "";
            setSelectedCity(defaultCity);
            localStorage.setItem("selectedCity", defaultCity);
          }

          if (storedCoords) {
            setUserCoordinates(JSON.parse(storedCoords));
          }

          setIsLoadingLocation(false);
          return;
        }

        // If not in storage, get location using browser geolocation
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Save coordinates for potential use with city selection
            const coordinates = { latitude, longitude };
            setUserCoordinates(coordinates);
            localStorage.setItem(
              "userCoordinates",
              JSON.stringify(coordinates),
            );

            // Using OpenCage Geocoding API (free tier available)
            const apiKey = "8263763109a646fbac5c6127dcdadd34";
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en&countrycode=ng`,
            );

            const data = await response.json();
            console.log("Geocoding response:", data);

            let detectedState = "";
            let detectedCity = "";

            if (data.results && data.results.length > 0) {
              // Try to extract state from components
              const components = data.results[0].components;

              // OpenCage might return state as state, state_district, or county
              detectedState =
                components.state ||
                components.state_district ||
                components.county ||
                "";

              // Try to extract city
              detectedCity =
                components.city ||
                components.town ||
                components.village ||
                components.suburb ||
                "";

              // Clean up state name if it contains "State" suffix
              detectedState = detectedState.replace(" State", "");

              // Verify it's in Nigeria
              if (!components.country?.includes("Nigeria")) {
                detectedState = "Lagos"; // Default for non-Nigerian locations
                detectedCity = "Ikeja"; // Default city for Lagos
              }
            } else {
              detectedState = "Lagos"; // Default fallback
              detectedCity = "Ikeja"; // Default city for Lagos
            }

            // Store in state and localStorage
            setUserState(detectedState);
            setSelectedCity(detectedCity);

            localStorage.setItem("userState", detectedState);
            localStorage.setItem("selectedCity", detectedCity);

            setIsLoadingLocation(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            // Default to Lagos if location access is denied
            setUserState("Lagos");
            setSelectedCity("Ikeja");

            localStorage.setItem("userState", "Lagos");
            localStorage.setItem("selectedCity", "Ikeja");

            setIsLoadingLocation(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 86400000, // Cache for 1 day
          },
        );
      } catch (error) {
        console.error("Error getting location:", error);
        setUserState("Lagos");
        setSelectedCity("Ikeja");

        localStorage.setItem("userState", "Lagos");
        localStorage.setItem("selectedCity", "Ikeja");

        setIsLoadingLocation(false);
      }
    };

    getUserLocation();
  }, []);

  // Handle city selection - only update state and trigger listings refetch
  const handleCitySelect = (cityName) => {
    setIsRefetchingListings(true);
    setSelectedCity(cityName);
    localStorage.setItem("selectedCity", cityName);
    console.log("Selected city in RenterHomePage:", cityName);
  };

  // Modified query to include state as a parameter and city if selected
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["listings", activeType, userState, selectedCity],
    queryFn: async () => {
      // Set refetching flag when query starts
      setIsRefetchingListings(true);

      const result = await get_listing({
        ...(activeType !== "all" ? { type: activeType } : {}),
        ...(userState ? { state: userState } : {}),
        ...(selectedCity ? { city: selectedCity } : {}),
      });

      // Clear refetching flag when query finishes
      setIsRefetchingListings(false);
      return result;
    },
    // Only run query when we have the user's state
    enabled: !isLoadingLocation,
  });

  // Quick actions for the Find Your Perfect Home section
  const quickActions = [
    { icon: <Home size={18} />, label: "Newly Listed" },
    { icon: <Utensils size={18} />, label: "Near Restaurants" },
    { icon: <School size={18} />, label: "University Housing" },
    { icon: <Train size={18} />, label: "Transit Friendly" },
  ];

  // Determine if we're loading listings only or everything
  const isLoadingListingsOnly = isRefetchingListings && !isLoadingLocation;
  const isInitialLoading = isFetching || isLoadingLocation;

  return (
    <div className="min-h-dvh bg-gray-100">
      {/* Search and navigation header - fixed position */}
      <div className="sticky top-0 bg-white shadow-md z-30 px-4 md:px-8">
        <Searchbar />
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Featured Properties Carousel */}
        <FeaturedPropertiesCarousel />

        {/* Recently Viewed Listings */}
        <RecentlyViewedListings />

        {/* Nigerian States and Cities - only show loading for initial load */}
        {!isLoadingListingsOnly && (
          <NigerianStatesAndCities
            currentState={userState}
            onStateChange={(newState) => {
              setUserState(newState);
              localStorage.setItem("userState", newState);

              // Set default city for selected state
              const defaultCityMap = {
                Lagos: "Ikeja",
                Abuja: "Central",
                Rivers: "Port Harcourt",
                // Add more state-to-default-city mappings as needed
              };

              const defaultCity = defaultCityMap[newState] || "";
              setSelectedCity(defaultCity);
              localStorage.setItem("selectedCity", defaultCity);
            }}
          />
        )}

        {/* Main Listings */}
        <div className="mt-14 border-b border-gray-400 pb-6">
          <HorizontalScrollContainer
            title={`Properties ${selectedCity ? `in ${selectedCity}, ` : "around "} ${userState || "Your Area"}`}
            icon={<MapPin size={20} />}
            description={`Surf accommodations ${selectedCity ? `in ${selectedCity}, ` : "around "} ${userState || "your current state"}`}
            childrenTwo={
              !isLoadingLocation && (
                <PopularCities
                  selectedState={userState}
                  onCitySelect={handleCitySelect}
                  selectedCity={selectedCity}
                />
              )
            }
          >
            {/* Only this part should show loading when refetching listings */}
            {isRefetchingListings ? (
              <div className="w-full flex items-center justify-center py-8">
                <Loader />
              </div>
            ) : data?.payload.data && data.payload.data.length > 0 ? (
              data.payload.data.map((listing) => (
                <div
                  className="min-w-64 md:min-w-72 flex-shrink-0"
                  key={listing.id}
                >
                  <EnhancedQueryCard {...listing} />
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-12">
                <p className="text-xl font-medium text-gray-700 mb-2">
                  No properties found in{" "}
                  {selectedCity ? `${selectedCity}, ` : ""}
                  {userState || "this area"}
                </p>
                <p className="text-gray-500">
                  Try selecting a different {selectedCity ? "city or " : ""}
                  state
                </p>
              </div>
            )}
          </HorizontalScrollContainer>
        </div>

        {/* Nearby Listings section */}
        <NearbyListings
          data={data}
          isFetching={isRefetchingListings}
          userState={userState}
          selectedCity={selectedCity}
        />
      </div>
    </div>
  );
}

export default RenterHomePage;
