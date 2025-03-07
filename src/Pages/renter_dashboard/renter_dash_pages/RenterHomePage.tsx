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
    <div className="mb-8 relative">
      {/* Title with icon */}
      {title && (
        <div className="flex-col items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800 flex items-center gap-2">
            {icon && <span className="text-primaryPurple">{icon}</span>}
            {title}
          </h2>
          <p className="text-gray-500 my-3">{description}</p>
        </div>
      )}
      {childrenTwo}
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
  const [selectedState, setSelectedState] = useState(null);

  // Sample Nigerian states and cities data
  const nigerianStates: NigerianState[] = [
    {
      id: "state1",
      name: "Lagos",
      cities: [
        { id: "city1", name: "Lekki", propertyCount: 156 },
        { id: "city2", name: "Ikeja", propertyCount: 124 },
        { id: "city3", name: "Victoria Island", propertyCount: 98 },
        { id: "city4", name: "Yaba", propertyCount: 83 },
        { id: "city5", name: "Ikoyi", propertyCount: 76 },
        { id: "city6", name: "Ajah", propertyCount: 64 },
      ],
    },
    {
      id: "state2",
      name: "Abuja",
      cities: [
        { id: "city7", name: "Maitama", propertyCount: 87 },
        { id: "city8", name: "Wuse", propertyCount: 75 },
        { id: "city9", name: "Garki", propertyCount: 63 },
        { id: "city10", name: "Asokoro", propertyCount: 52 },
      ],
    },
    {
      id: "state3",
      name: "Rivers",
      cities: [
        { id: "city11", name: "Port Harcourt", propertyCount: 94 },
        { id: "city12", name: "Obio-Akpor", propertyCount: 41 },
        { id: "city13", name: "Eleme", propertyCount: 22 },
      ],
    },
    {
      id: "state4",
      name: "Oyo",
      cities: [
        { id: "city14", name: "Ibadan", propertyCount: 89 },
        { id: "city15", name: "Ogbomosho", propertyCount: 35 },
        { id: "city16", name: "Oyo", propertyCount: 29 },
      ],
    },
    {
      id: "state5",
      name: "Kano",
      cities: [
        { id: "city17", name: "Kano", propertyCount: 73 },
        { id: "city18", name: "Nassarawa", propertyCount: 32 },
        { id: "city19", name: "Tarauni", propertyCount: 25 },
      ],
    },
  ];

  return (
    <div className="mb-8 mt-10 pb-8 border-b border-gray-400">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-medium text-gray-800">
          Explore Properties Across Nigeria
        </h2>
        <img
          src={`https://flagcdn.com/w20/${"ng"}.png`}
          alt={`NG flag`}
          className="w-4 h-3"
        />
      </div>

      {/* States row - horizontal scrollable */}
      <HorizontalScrollContainer>
        {nigerianStates.map((state) => (
          <button
            key={state.id}
            onClick={() =>
              setSelectedState(state.id === selectedState ? null : state.id)
            }
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              selectedState === state.id
                ? "border-[2px] border-primaryPurple shadow-inner"
                : "border-[1px] shadow-inner"
            }`}
          >
            <MapPin className="text-primaryPurple text-sm" />
            <span>{state.name}</span>
          </button>
        ))}
      </HorizontalScrollContainer>

      {/* Cities - horizontal scrollable */}
      {selectedState && (
        <HorizontalScrollContainer>
          {nigerianStates
            .find((state) => state.id === selectedState)
            ?.cities.map((city) => (
              <div
                key={city.id}
                className="min-w-48 flex-shrink-0 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
              >
                <h4 className="font-medium mb-1">{city.name}</h4>
                <p className="text-sm text-gray-500">
                  {city.propertyCount} properties
                </p>
              </div>
            ))}
        </HorizontalScrollContainer>
      )}
    </div>
  );
};

// Popular Cities component that replaces the Map/List toggle
const PopularCities = () => {
  const [userState, setUserState] = useState("Lagos"); // Default state

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserState("Lagos"); // This would be replaced with the actual state from geocoding
            },
            () => {
              console.log("Unable to retrieve location");
              setUserState("Lagos"); // Fallback
            },
          );
        }
      } catch (error) {
        console.error("Error getting user location:", error);
        setUserState("Lagos"); // Fallback
      }
    };

    getUserLocation();
  }, []);

  // Sample popular cities based on the user's state (In this case, Lagos)
  const popularCities: PopularCity[] = [
    {
      id: "city1",
      name: "Lekki",
      propertyCount: 156,
      imageUrl: "/api/placeholder/200/100",
    },
    {
      id: "city2",
      name: "Ikeja",
      propertyCount: 124,
      imageUrl: "/api/placeholder/200/100",
    },
    {
      id: "city3",
      name: "Victoria Island",
      propertyCount: 98,
      imageUrl: "/api/placeholder/200/100",
    },
    {
      id: "city4",
      name: "Yaba",
      propertyCount: 83,
      imageUrl: "/api/placeholder/200/100",
    },
    {
      id: "city5",
      name: "Ikoyi",
      propertyCount: 76,
      imageUrl: "/api/placeholder/200/100",
    },
  ];

  return (
    <HorizontalScrollContainer>
      {popularCities.map((city) => (
        <button
          key={city.id}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm"
        >
          <MapPin className="text-primaryPurple" />
          <span>{city.name}</span>
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
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg mb-6">
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

    // Here you would typically use router.push or window.location
    // Since we don't have access to the router, we'll simulate navigation
    // In a real app, you'd replace this with your navigation code
    console.log(`Navigating to listing page for ID: ${props.id}`);
    // Example: router.push(`/listings/${props.id}`);
    // or: window.location.href = `/listings/${props.id}`;
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
    <div className="rounded-xl mb-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center gap-2">
        <MapPin size={20} className="text-primaryPurple" />
        Listings Near You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.payload.data.map((listing) => (
          <EnhancedQueryCard {...listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
};

function RenterHomePage() {
  const [activeType, setActiveType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isFetching, refetch } = useQuery<LISTINGRESPONSE>({
    queryKey: ["listings", activeType],
    queryFn: async () =>
      await get_listing(activeType !== "all" ? { type: activeType } : {}),
  });

  // Quick actions for the Find Your Perfect Home section
  const quickActions = [
    { icon: <Home size={18} />, label: "Newly Listed" },
    { icon: <Utensils size={18} />, label: "Near Restaurants" },
    { icon: <School size={18} />, label: "University Housing" },
    { icon: <Train size={18} />, label: "Transit Friendly" },
  ];

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

        {/* Nigerian States and Cities */}
        <NigerianStatesAndCities />

        {/* Main Listings */}
        <div className="rounded-xl mt-24">
          {/* Popular Cities component (replacing map/list toggle) */}

          {isFetching ? (
            <div className="w-full flex items-center justify-center p-12 mt-4">
              <Loader />
            </div>
          ) : (
            <HorizontalScrollContainer
              title="Properties around Lagos"
              icon={<Home size={20} />}
              description="Surf accomodations around your current state"
              childrenTwo={<PopularCities />}
            >
              {/*<PopularCities />*/}
              {data?.payload.data.length > 0 ? (
                data.payload.data.map((listing) => (
                  <div
                    className="min-w-64 md:min-w-72 flex-shrink-0"
                    key={listing.id}
                  >
                    <EnhancedQueryCard {...listing} />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <p className="text-xl font-medium text-gray-700 mb-2">
                    No properties found
                  </p>
                  <p className="text-gray-500">Try adjusting your filters</p>
                </div>
              )}
            </HorizontalScrollContainer>
          )}
        </div>
        {/*LISTINGS NEAR YOU*/}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-medium">
              {!isFetching && data
                ? `${data.payload.data.length} Properties Found`
                : "Finding properties..."}
            </p>
            <select className="p-2 border border-gray-300 rounded-md text-sm">
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Nearby Listings section */}
        <NearbyListings data={data} isFetching={isFetching} />
      </div>
    </div>
  );
}

export default RenterHomePage;
