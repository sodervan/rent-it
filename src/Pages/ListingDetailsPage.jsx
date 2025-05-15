import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
// Font Awesome icons using React components
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaRegStar,
  FaStar,
  FaEllipsisH,
  FaShare,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegClock,
} from "react-icons/fa";
import { User } from "lucide-react";
import {
  Info,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import {
  Home,
  Bed,
  Droplet,
  Plug,
  Lock,
  Sofa,
  Key,
  ShowerHead,
} from "lucide-react";
import {
  FaLocationArrow,
  FaSchool,
  FaHospital,
  FaBuilding,
} from "react-icons/fa";
import { MdExpandMore, MdExpandLess, MdDirectionsBus } from "react-icons/md";
import { IoBookmarksOutline } from "react-icons/io5";
import { IconVideo, IconPhoto } from "@tabler/icons-react";
import axios from "axios";
import VideoModal from "@/components/AddListings/VideoModal.jsx";
import ImageModal from "@/components/AddListings/ImagesModal.jsx";
import useTokenData from "../../TokenHook.js";
import BlockedBookingModal from "@/components/BlockedBookingModal.jsx";
import QueryCard from "@/Pages/renter_dashboard/renter_dash_comps/QueryCard";
import PropertyMap from "@/components/Maps/PropertyMap.jsx";
import Footer from "@/components/Footer.tsx";

const ListingDetailsPage = () => {
  const { tokenData } = useTokenData();
  const [listing, setListing] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agentError, setAgentError] = useState(null);
  const [nearbyListings, setNearbyListings] = useState([]);
  const [nearbyListingsLoading, setNearbyListingsLoading] = useState(false);

  // Fetch nearby listings based on current listing's location
  const fetchNearbyListings = async (latitude, longitude) => {
    try {
      setNearbyListingsLoading(true);
      const response = await axios.get(`${apiUrl}/api/v1/listings`, {
        params: {
          latitude,
          longitude,
          radius: 10, // 10km radius - increased to find more properties
          limit: 6, // Get up to 6 nearby listings to filter best matches
        },
      });

      // Handle different response formats
      let listingsData = [];
      if (response.data.payload && response.data.payload.data) {
        listingsData = response.data.payload.data;
      } else if (response.data.data) {
        listingsData = response.data.data;
      } else if (Array.isArray(response.data)) {
        listingsData = response.data;
      }

      // Filter out the current listing and ensure we have valid data
      const filteredListings = listingsData
        .filter((item) => item.id !== listingId) // Remove current listing
        .filter((item) => item.pictures && item.pictures.length > 0) // Ensure listings have pictures
        .filter(
          (item) => item.listingFeatures || (item.beds && item.bathrooms),
        ); // Ensure they have features

      setNearbyListings(filteredListings);
    } catch (error) {
      console.error("Error fetching nearby listings:", error);
      setNearbyListings([]); // Set empty array in case of error
    } finally {
      setNearbyListingsLoading(false);
    }
  };
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [guestCount, setGuestCount] = useState(3);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [agentLoading, setAgentLoading] = useState(false);
  const [unitCount, setUnitCount] = useState(1);
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [isBookLoading, setBookLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [agentData, setAgentData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [duration, setDuration] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State and ref for horizontal scrolling
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const nearbyListingsRef = useRef(null);
  const bookingSectionRef = useRef(null);
  const [showScrollToBooking, setShowScrollToBooking] = useState(false);

  // Add scrollbar hiding CSS and handle scroll for floating button
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .floating-btn {
        transform: translateY(0);
        opacity: 1;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      .floating-btn.hidden {
        transform: translateY(20px);
        opacity: 0;
      }
      .tooltip {
        visibility: hidden;
        position: absolute;
        bottom: 125%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
      }
      .btn-wrapper:hover .tooltip {
        visibility: visible;
        opacity: 1;
      }
    `;
    document.head.appendChild(styleTag);

    // Handle scroll to show/hide floating button
    const handleScroll = () => {
      if (!bookingSectionRef.current) return;

      const scrollPosition = window.scrollY;
      const bookingSectionPosition =
        bookingSectionRef.current.getBoundingClientRect().top + window.scrollY;

      // Show button if user scrolled past 30% of the page and hasn't reached booking section yet
      setShowScrollToBooking(
        scrollPosition > window.innerHeight * 0.3 &&
          scrollPosition < bookingSectionPosition - window.innerHeight * 0.5,
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      document.head.removeChild(styleTag);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBooking = () => {
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll position for nearby listings
  const handleNearbyListingsScroll = () => {
    if (!nearbyListingsRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = nearbyListingsRef.current;
    setShowLeftScroll(scrollLeft > 0);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const getDurationOptions = () => {
    if (listing.paymentDuration === "annum") {
      return [
        { value: 1, label: "1 Year" },
        { value: 2, label: "2 Years" },
        { value: 3, label: "3 Years" },
        { value: 4, label: "4 Years" },
        { value: 5, label: "5 Years" },
      ];
    } else {
      return [
        { value: 1, label: "1 Month" },
        { value: 3, label: "3 Months" },
        { value: 6, label: "6 Months" },
        { value: 9, label: "9 Months" },
        { value: 12, label: "12 Months" },
      ];
    }
  };

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setBookLoading(false);
      document.body.style.overflow = "";
    }, 300); // Matches exit animation duration
  };

  // Automatically book when modal opens
  useEffect(() => {
    if (isBookLoading) {
      bookApartment();
    }
  }, [isBookLoading]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 15 },
    },
    exit: { scale: 0.9, opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  // Loading spinner animation
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Success checkmark animation
  const checkmarkPathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  // Error X animation
  const errorPathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const faqData = [
    {
      id: 1,
      question: "How do I schedule a viewing of an apartment?",
      answer:
        "You can schedule a viewing directly through our platform by selecting your preferred property and clicking the 'Schedule Viewing' button. You'll be able to choose from available time slots and receive instant confirmation. For premium listings, we also offer virtual tours that you can access immediately.",
    },
    {
      id: 2,
      question: "What documents do I need to apply for an apartment?",
      answer:
        "To apply for an apartment, you'll typically need: proof of identity (passport or ID), proof of income (last 3 months' pay stubs or employment letter), credit history, references from previous landlords, and a security deposit. Some properties may have additional requirements which will be clearly listed on the property details page.",
    },
    {
      id: 3,
      question: "How is the security deposit handled?",
      answer:
        "Security deposits are held in a secure escrow account throughout your tenancy. The deposit amount is typically equivalent to one month's rent. Upon move-out, the deposit will be returned within 21 days, minus any deductions for damages beyond normal wear and tear, which will be fully documented with photographic evidence.",
    },
    {
      id: 4,
      question: "Can I have pets in my rental apartment?",
      answer:
        "Pet policies vary by property. Many of our listings are pet-friendly, which is indicated by a pet-friendly badge on the property listing. Some properties may charge an additional pet deposit or monthly pet rent. You can use our search filters to find pet-friendly properties that match your needs.",
    },
    {
      id: 5,
      question: "What is included in the monthly rent?",
      answer:
        "What's included in your rent varies by property. The property listing will clearly specify which utilities (water, electricity, gas, internet) are included. Most properties include water and waste management, while electricity and internet may be separate. Maintenance of common areas and building facilities is typically included in all rentals.",
    },
    {
      id: 6,
      question: "How do I report maintenance issues?",
      answer:
        "You can report maintenance issues directly through your tenant dashboard. Our platform offers 24/7 maintenance reporting with priority levels. Emergency issues receive immediate attention, while standard maintenance requests are addressed within 48 hours. You'll receive real-time updates as your request progresses.",
    },
    {
      id: 7,
      question: "What is the typical lease duration?",
      answer:
        "Our standard lease duration is 12 months, though some properties offer flexible terms ranging from 3 to 24 months. Extended leases often come with rental discounts, while shorter terms might have a slightly higher monthly rate. Lease renewal options are presented 60 days before your current lease expires.",
    },
    {
      id: 8,
      question: "How can I pay my rent each month?",
      answer:
        "We offer multiple secure payment options including credit/debit card, bank transfer, and automatic payments. You can set up recurring payments through your tenant dashboard. All transactions are encrypted and processed through our secure payment gateway, and you'll receive instant payment confirmations.",
    },
  ];

  // For proper API integration
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/v1/listings/${listingId}`,
          { withCredentials: true },
        );
        const data = response?.data?.payload;
        setListing(data[0]);
        console.log(data);

        // Fetch nearby listings once we have the current listing data
        const listingData = data[0];
        if (listingData?.location) {
          let lat, lng;

          if (
            listingData.location.coordinates?.x &&
            listingData.location.coordinates?.y
          ) {
            lat = listingData.location.coordinates.y;
            lng = listingData.location.coordinates.x;
          } else if (
            listingData.location.latitude &&
            listingData.location.longitude
          ) {
            lat = listingData.location.latitude;
            lng = listingData.location.longitude;
          }

          if (lat && lng) {
            // Small delay to ensure map renders first
            setTimeout(() => {
              fetchNearbyListings(lat, lng);
            }, 500);
          }
        }
      } catch (err) {
        console.error("Error fetching listing data:", err);
        setError(err.message || "Failed to load listing details");
      } finally {
        setLoading(false);
        setTimeout(() => {
          fetchAgentDetails();
        }, 200);
      }
    };

    const fetchAgentDetails = async () => {
      setAgentLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/listings/${listingId}/agent`,
          {
            withCredentials: true,
          },
        );
        const data = response?.data;
        setAgentData(data.payload[0]);
        console.log(response);
      } catch (err) {
        console.error("Error fetching agent data:", err);
        setAgentError(err.message || "Failed to load agent details");
      } finally {
        setAgentLoading(false);
      }
    };

    fetchListing();
  }, [apiUrl, listingId]);

  const bookApartment = async () => {
    setBookingStatus("loading");
    setBookLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/listings/${listingId}/bookings`,
        { duration: duration, units: unitCount }, // Send units in the request body
        { withCredentials: true },
      );

      const data = response?.data;
      console.log(data.payload);
      console.log(response);

      // Wait a short time before showing success to make loading feel meaningful
      setTimeout(() => {
        setBookingStatus("success");
      }, 1200);
    } catch (err) {
      console.error("Error booking apartment:", err);
      setErrorMessage(
        err.response?.data?.message ||
          err.message ||
          "Failed to book apartment",
      );
      setBookingStatus("error");
    }
  };

  if (loading) {
      return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Skeleton Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-3/4 max-w-xl mb-4 animate-shimmer"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-1/2 max-w-md animate-shimmer"></div>
          </motion.div>

          {/* Skeleton Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Main content */}
            <div className="lg:col-span-2">
              {/* Image Gallery Skeleton */}
              <div className="rounded-xl overflow-hidden bg-gray-200 h-80 mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              
                {/* Image Indicator Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-2 h-2 rounded-full bg-white bg-opacity-60"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    ></motion.div>
                  ))}
                </div>
              </div>
            
              {/* Info Bar Skeleton */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap justify-between items-center mb-6"
              >
                <div className="w-1/2 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer"></div>
                <div className="flex space-x-2">
                  <div className="w-24 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer"></div>
                  <div className="w-24 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer"></div>
                </div>
              </motion.div>
            
              {/* Property Features Skeleton */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg flex items-center justify-center animate-shimmer">
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg flex items-center justify-center animate-shimmer">
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg flex items-center justify-center animate-shimmer">
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
              </motion.div>
            
              {/* Description Skeleton */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-48 mb-4 animate-shimmer"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-full animate-shimmer"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-full animate-shimmer"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-3/4 animate-shimmer"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-full animate-shimmer"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-5/6 animate-shimmer"></div>
                </div>
              </motion.div>
            
              {/* Amenities Skeleton */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
              >
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-40 mb-4 animate-shimmer"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                    >
                      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-24 animate-shimmer"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            
              {/* Map Skeleton */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8"
              >
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-48 mb-4 animate-shimmer"></div>
                <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-shimmer">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          
            {/* Right column - Booking Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-6 bg-gray-100 shadow-sm rounded-xl p-6 border border-gray-100">
                {/* Price Skeleton */}
                <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md w-40 mb-4 animate-shimmer"></div>
              
                {/* Tags Skeleton */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 animate-shimmer"></div>
                  <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-28 animate-shimmer"></div>
                  <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 animate-shimmer"></div>
                </div>
              
                {/* Calendar Skeleton */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 mb-2 animate-shimmer"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 animate-shimmer"></div>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 mb-2 animate-shimmer"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 animate-shimmer"></div>
                  </div>
                </div>
              
                {/* Guests Skeleton */}
                <div className="border border-gray-200 rounded-md p-3 mb-6">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12 mb-2 animate-shimmer"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 animate-shimmer"></div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer"></div>
                      <div className="w-4 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              
                {/* Price Details Skeleton */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 animate-shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 animate-shimmer"></div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 animate-shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 animate-shimmer"></div>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-28 animate-shimmer"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 animate-shimmer"></div>
                  </div>
                </div>
              
                {/* Button Skeleton */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="h-12 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-lg w-full mb-4 animate-shimmer"
                ></motion.div>
              
                {/* Agent Info Skeleton */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center mt-6 pt-4 border-t border-gray-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full mr-3 animate-pulse"></div>
                  <div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 mb-1 animate-shimmer"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 animate-shimmer"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          

        </div>
      );
    }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">
        <h3 className="text-xl font-bold mb-2">Error Loading Listing</h3>
        <p>{error}</p>
        <button
          className="mt-4 bg-primaryPurple text-white px-4 py-2 rounded-md"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  // Format price with commas
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString();
  };

  // Toggle save property
  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  // Shorten description for preview
  const shortDescription =
    listing.description?.length > 150
      ? `${listing.description.substring(0, 150)}...`
      : listing.description;

  // Get property images from API
  const propertyImages = listing.pictures?.map((pic) => pic.imageUrl) || [];

  // If no images in API, use placeholders for demo
  const displayImages =
    propertyImages.length > 0
      ? propertyImages
      : [
          "/api/placeholder/800/600",
          "/api/placeholder/400/300",
          "/api/placeholder/400/300",
          "/api/placeholder/400/300",
          "/api/placeholder/400/300",
        ];

  // Get currency symbol
  const currencySymbol = listing.currency?.symbol || "₦";

  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBookButtonClick = () => {
    if (!isConfirmingBooking) {
      setIsConfirmingBooking(true);
    } else {
      if (!tokenData) {
        console.log("There is no token data");
        setIsModalOpen(true);
        return;
      } else {
        if (tokenData?.role === "user") {
          setBookLoading(true);
          setIsVisible(true);
          setIsConfirmingBooking(false);
        } else {
          console.log("This is an agent account");
        }
      }
    }
  };

  const renderInfoRow = (icon, label, value) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <span className="text-gray-900 font-semibold">{value || "NO"}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden mt-20"
    >
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-3">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 h-auto md:h-96"
                >
                  {/* Main image - spans full width on mobile, larger on desktop */}
                  <motion.div
                    className="col-span-2 h-64 md:h-auto md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={displayImages[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Secondary images - 2x2 grid on mobile, vertical stack on desktop */}
                  {[1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="h-32 md:h-full md:row-span-1 relative rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={displayImages[index] || displayImages[0]}
                        alt={`${listing.title} interior ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Action buttons over image */}
              {listing.apartmentType && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="absolute top-4 left-4 inline-block bg-secondaryPurple text-primaryPurple px-3 py-1 rounded-lg text-sm"
                >
                  {listing.apartmentType.name}
                </motion.div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                  onClick={() => {}}
                >
                  <FaShare className="text-gray-700" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                  onClick={toggleSave}
                >
                  {isSaved ? (
                    <FaStar className="text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-gray-700" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                  onClick={() => {}}
                >
                  <FaEllipsisH className="text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/*View All Images*/}

            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-secondaryPurple border border-primaryPurple text-primaryPurple p-2 rounded-lg my-3 text-sm flex items-center"
                onClick={() => setShowImageModal(true)}
              >
                <IconPhoto size={16} className="mr-2" />
                View all images
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-secondaryPurple border border-primaryPurple text-primaryPurple p-2 rounded-lg my-3 text-sm flex items-center"
                onClick={() => setShowVideoModal(true)} // Open video modal
              >
                <IconVideo size={16} className="mr-2" />
                View all videos
              </motion.button>
            </div>

            {/*Modals*/}

            <VideoModal
              videos={listing?.video || []}
              open={showVideoModal}
              onClose={() => setShowVideoModal(false)}
            />

            <ImageModal
              images={listing?.pictures || []}
              open={showImageModal}
              onClose={() => setShowImageModal(false)}
            />

            {isModalOpen && (
              <BlockedBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
            {/* Property Title & Location */}
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[1.7rem] font-semibold mb-2"
              >
                {listing.title || "Apartment"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 flex items-center"
              >
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {
                  listing.location?.streetAddress
                }, {listing.location?.postalCode}
              </motion.p>
            </div>

            {/* Property Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 sm:grid-cols-5 gap-4 border shadow-md rounded-lg border-gray-200 py-6 mb-10"
            >
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Bedroom</p>
                <p className="font-semibold flex items-center justify-center">
                  <FaBed className="mr-2 text-primaryPurple" />
                  {listing.listingFeatures?.beds || 1}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Bathroom</p>
                <p className="font-semibold flex items-center justify-center">
                  <FaBath className="mr-2 text-primaryPurple" />
                  {listing.listingFeatures?.bathrooms || 1}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Area</p>
                <p className="font-semibold flex items-center justify-center">
                  <FaRulerCombined className="mr-2 text-primaryPurple" />
                  {listing.area || "N/A"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Units</p>
                <p className="font-semibold flex items-center justify-center">
                  <FaRegClock className="mr-2 text-primaryPurple" />
                  {
                    listing.unitsLeft
                  }/{listing.units}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Rent Duration</p>
                <p className="font-semibold flex items-center justify-center capitalize">
                  <FaMoneyBillWave className="mr-2 text-primaryPurple" />
                  {listing.paymentDuration}
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <p className="font-medium mb-3 text-lg flex items-center">
                <span className="inline-block w-1 h-6 bg-primaryPurple rounded mr-2"></span>
                Description
              </p>
              <p className="text-gray-600">
                {showFullDescription ? listing.description : shortDescription}
                {listing.description?.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 ml-1 hover:underline focus:outline-none"
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
                  </button>
                )}
              </p>
            </motion.div>

            {/*LISTING FEATURES*/}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mb-10"
            >
              <p className="font-medium mb-3 text-lg flex items-center">
                <span className="inline-block w-1 h-6 bg-primaryPurple rounded mr-2"></span>
                Property Features
              </p>

              {listing.featureTags && listing.featureTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {listing.featureTags
                    .filter((item) => item.featureTag && item.featureTag.name)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-800 border border-purple-100 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors duration-200 shadow-sm"
                      >
                        {item.featureTag.interfaceIconCode ? (
                          <i
                            className={`${item.featureTag.interfaceIconCode} mr-1.5 text-purple-600`}
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-purple-600 mr-1.5"></span>
                        )}
                        <span>{item.featureTag.name}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">
                  No additional features specified
                </div>
              )}
            </motion.div>

            {/*BILLS*/}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mb-10"
            >
              <p className="font-medium mb-3 text-lg flex items-center">
                <span className="inline-block w-1 h-6 bg-primaryPurple rounded mr-2"></span>
                Property Bills
              </p>

              {listing.billsTags && listing.billsTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {listing.billsTags
                    .filter((item) => item.billTag && item.billTag.name)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-800 border border-purple-100 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors duration-200 shadow-sm"
                      >
                        {item.billTag.interfaceIconCode ? (
                          <i
                            className={`${item.billTag.interfaceIconCode} mr-1.5 text-purple-600`}
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-purple-600 mr-1.5"></span>
                        )}
                        <span>{item.billTag.name}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">
                  No additional features specified
                </div>
              )}
            </motion.div>

            {/*LISTING PROPERTIES*/}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-6xl mx-auto bg-white border border-gray-50 rounded-xl overflow-hidden
                  transform transition-all duration-300
                  sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mb-8"
            >
              {/* Header Section */}
              <div className="flex items-center p-5 bg-secondaryPurple border-b border-purple-100">
                <Home className="w-6 h-6 mr-4 text-primaryPurple" />
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                  Property Details
                </h2>
              </div>

              {/* Details Grid */}
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInfoRow(
                    <Bed className="w-6 h-6 text-primaryPurple" />,
                    "Bedrooms",
                    listing?.listingFeatures.beds,
                  )}
                  {renderInfoRow(
                    <ShowerHead className="w-6 h-6 text-primaryPurple" />,
                    "Bathrooms",
                    listing?.listingFeatures.bathrooms,
                  )}
                  {renderInfoRow(
                    <Plug className="w-6 h-6 text-primaryPurple" />,
                    "Electricity Payment",
                    listing?.listingFeatures.electricityPaymentType,
                  )}
                  {renderInfoRow(
                    <Lock className="w-6 h-6 text-primaryPurple" />,
                    "Bathroom Access",
                    listing?.listingFeatures.bathroomAccessType,
                  )}
                  {renderInfoRow(
                    <Sofa className="w-6 h-6 text-primaryPurple" />,
                    "Furnishing State",
                    listing?.listingFeatures.furnishingState,
                  )}
                  {renderInfoRow(
                    <Droplet className="w-6 h-6 text-primaryPurple" />,
                    "In-House Running Water",
                    listing?.listingFeatures.inHouseRunningWater,
                  )}
                  {renderInfoRow(
                    <Key className="w-6 h-6 text-primaryPurple" />,
                    "Kitchen Access",
                    listing?.listingFeatures.kitchenAccessType,
                  )}
                  {renderInfoRow(
                    <Droplet className="w-6 h-6 text-primaryPurple" />,
                    "Outdoor Water Taps",
                    listing?.listingFeatures.outDoorWaterTaps,
                  )}
                  {renderInfoRow(
                    <Droplet className="w-6 h-6 text-primaryPurple" />,
                    "Water from External Source",
                    listing?.listingFeatures.waterFromExternalSource,
                  )}
                </div>
              </div>
            </motion.div>

            {/*LOCATION AND LANDMARKS*/}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 bg-gray-50 p-5 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium flex items-center">
                  <FaMapMarkerAlt className="text-primaryPurple mr-2" />
                  Location Details
                </h2>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-primaryPurple flex items-center text-sm font-medium"
                >
                  {expanded ? (
                    <>
                      Less details <MdExpandLess className="ml-1" />
                    </>
                  ) : (
                    <>
                      More details <MdExpandMore className="ml-1" />
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3">
                {/* Address */}
                <div className="flex">
                  <div className="w-6 mr-2 text-primaryPurple flex-shrink-0">
                    <FaLocationArrow />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-0.5">Address</div>
                    <div className="text-gray-700">
                      {listing.location.streetAddress}
                    </div>
                    <div className="text-gray-700">
                      {listing.location.city?.name},{" "}
                      {listing.location.state?.name},{" "}
                      {listing.location.country?.name}{" "}
                      {listing.location.postalCode}
                    </div>
                  </div>
                </div>

                {/* Transportation */}
                <div className="flex">
                  <div className="w-6 mr-2 text-primaryPurple flex-shrink-0">
                    <MdDirectionsBus />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">
                      Transportation
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {listing.location.transportation?.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3.5 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Conditional content */}
                {expanded && (
                  <>
                    {/* Local Government */}
                    <div className="flex">
                      <div className="w-6 mr-2 text-primaryPurple flex-shrink-0">
                        <FaBuilding />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2">
                          Local Government
                        </div>
                        <div className="text-gray-700">
                          {listing.location.localGovernmentArea?.name}
                        </div>
                      </div>
                    </div>

                    {/* Educational Institutions */}
                    <div className="flex">
                      <div className="w-6 mr-2 text-primaryPurple flex-shrink-0">
                        <FaSchool />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2">
                          Nearby Educational Institutions
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {listing.location.educationalInstitutions?.map(
                            (item, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                              >
                                {item}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Health Facilities */}
                    <div className="flex">
                      <div className="w-6 mr-2 text-primaryPurple flex-shrink-0">
                        <FaHospital />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2">
                          Nearby Health Facilities
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {listing.location.healthFacilities?.map(
                            (item, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                              >
                                {item}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Coordinates */}
                    <div className="flex">
                      <div className="w-6 mr-2 text-primaryPurple flex-shrink-0">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-0.5">
                          Coordinates
                        </div>
                        <div className="text-gray-700">
                          {listing.location.coordinates?.x.toFixed(6)},{" "}
                          {listing.location.coordinates?.y.toFixed(6)}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Extra Fees */}
            {listing.extraFees && listing.extraFees.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="w-full bg-white rounded-xl mb-10 border border-gray-50 overflow-hidden"
              >
                {/* Header Section */}
                <div
                  className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center
                    hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <p className="text-primaryPurple text-lg font-semibold">
                      {listing?.currency.symbol}
                    </p>
                    <h2 className="text-lg font-medium text-gray-800">
                      Additional Fees
                    </h2>
                    <div className="ml-2 bg-secondaryPurple text-primaryPurple text-xs px-2 py-1 rounded-full">
                      {listing.extraFees.length}{" "}
                      {listing.extraFees.length === 1 ? "fee" : "fees"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 font-medium text-gray-700 text-sm sm:text-base">
                      Total: {currencySymbol}
                      {formatPrice(listing.baseCost)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="bg-gray-50 px-4 sm:px-6 py-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th
                              className="text-left py-3 px-2 text-xs sm:text-sm font-medium text-gray-600
                                 rounded-tl-lg"
                            >
                              Fee Description
                            </th>
                            <th
                              className="text-right py-3 px-2 text-xs sm:text-sm font-medium text-gray-600
                                 rounded-tr-lg"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {listing.extraFees.map((fee, index) => (
                            <tr
                              key={index}
                              className="bg-white hover:bg-gray-100 transition-colors duration-150"
                            >
                              <td className="py-3 px-2 flex items-center">
                                {fee.feeType?.description && (
                                  <div className="relative group mr-2">
                                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    <div
                                      className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2
                                          mb-2 hidden group-hover:block bg-gray-800 text-white
                                          text-xs p-2 rounded w-48 shadow-lg"
                                    >
                                      {fee.feeType.description}
                                    </div>
                                  </div>
                                )}
                                <span className="font-medium text-gray-700 text-sm sm:text-base">
                                  {fee.feeType?.name ||
                                    `Additional Fee ${index + 1}`}
                                </span>
                              </td>
                              <td className="text-right py-3 px-2 font-medium text-gray-800 text-sm sm:text-base">
                                {currencySymbol}
                                {formatPrice(fee.amount)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-secondaryPurple">
                            <td
                              className="py-3 px-2 font-semibold text-primaryPurple text-sm sm:text-base
                                 rounded-bl-lg"
                            >
                              Total Additional Fees
                            </td>
                            <td
                              className="text-right py-3 px-2 font-semibold text-primaryPurple text-sm sm:text-base
                                 rounded-br-lg"
                            >
                              {currencySymbol}
                              {formatPrice(listing.baseCost)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tenancy Agreement */}
            {listing.tenancyAgreement && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="mb-8"
              >
                <h2 className="text-lg font-medium mb-3">Tenancy Agreement</h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {listing.tenancyAgreement.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created:{" "}
                        {formatDate(
                          listing.tenancyAgreement.createdAt ||
                            listing.createdAt,
                        )}
                      </p>
                    </div>
                    <a
                      href={listing.tenancyAgreement.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primaryPurple text-white px-4 py-2 rounded-md text-sm"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/*FAQS SECTION*/}
            <div className="w-full max-w-4xl mx-auto px-4 py-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="grid gap-3 md:gap-4">
                {faqData.map((item) => (
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    key={item.id}
                    className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
                  >
                    <motion.button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                      aria-expanded={openItem === item.id}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.question}
                      </h3>
                      <span className="ml-6 flex-shrink-0">
                        <motion.svg
                          animate={{ rotate: openItem === item.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {openItem === item.id && (
                        <motion.div
                          id={`faq-answer-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 border-t border-gray-200">
                            <p className="text-gray-700 text-base leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our support team is here to help you with any other questions
                  you might have.
                </p>
                <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Location and Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-lg font-medium mb-4">
                Location and Nearby Places
              </h2>

              {loading ? (
                // Map skeleton while loading
                <div className="h-[350px] bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <PropertyMap
                  latitude={
                    listing?.location?.coordinates?.y ||
                    listing?.location?.latitude
                  }
                  longitude={
                    listing?.location?.coordinates?.x ||
                    listing?.location?.longitude
                  }
                  address={listing?.location?.streetAddress}
                  landmarks={[
                    ...(listing?.location?.healthFacilities?.map((place) => ({
                      name: place,
                      type: "hospital",
                    })) || []),
                    ...(listing?.location?.educationalInstitutions?.map(
                      (place) => ({
                        name: place,
                        type: "school",
                      }),
                    ) || []),
                    ...(listing?.location?.transportation?.map((place) => ({
                      name: place,
                      type: "transportation",
                    })) || []),
                  ]}
                />
              )}

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                  <FaSchool className="text-green-600 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Educational Institutions
                    </h3>
                    {listing?.location?.educationalInstitutions?.length > 0 ? (
                      <ul className="text-sm text-gray-600 mt-1">
                        {listing.location.educationalInstitutions
                          .slice(0, 2)
                          .map((item, idx) => (
                            <li key={`edu-${idx}`}>{item}</li>
                          ))}
                        {listing.location.educationalInstitutions.length >
                          2 && (
                          <li className="text-purple-600 text-xs mt-1">
                            +
                            {listing.location.educationalInstitutions.length -
                              2}{" "}
                            more
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No educational institutions listed
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                  <FaHospital className="text-red-600 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Health Facilities</h3>
                    {listing?.location?.healthFacilities?.length > 0 ? (
                      <ul className="text-sm text-gray-600 mt-1">
                        {listing.location.healthFacilities
                          .slice(0, 2)
                          .map((item, idx) => (
                            <li key={`health-${idx}`}>{item}</li>
                          ))}
                        {listing.location.healthFacilities.length > 2 && (
                          <li className="text-purple-600 text-xs mt-1">
                            +{listing.location.healthFacilities.length - 2} more
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No health facilities listed
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <MdDirectionsBus className="text-blue-600 text-lg mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">Transportation</h3>
                    {listing?.location?.transportation?.length > 0 ? (
                      <ul className="text-sm text-gray-600 mt-1">
                        {listing.location.transportation
                          .slice(0, 2)
                          .map((item, idx) => (
                            <li key={`transport-${idx}`}>{item}</li>
                          ))}
                        {listing.location.transportation.length > 2 && (
                          <li className="text-purple-600 text-xs mt-1">
                            +{listing.location.transportation.length - 2} more
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No transportation options listed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Properties in Same Area Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-10"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  Properties available in the same area
                </h2>
                {nearbyListings.length > 2 && (
                  <div className="flex gap-2">
                    <button
                      className={`p-1 rounded-full ${showLeftScroll ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-400 cursor-default"}`}
                      onClick={() => {
                        if (nearbyListingsRef.current) {
                          nearbyListingsRef.current.scrollBy({
                            left: -320,
                            behavior: "smooth",
                          });
                        }
                      }}
                      disabled={!showLeftScroll}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      className={`p-1 rounded-full ${showRightScroll ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-400 cursor-default"}`}
                      onClick={() => {
                        if (nearbyListingsRef.current) {
                          nearbyListingsRef.current.scrollBy({
                            left: 320,
                            behavior: "smooth",
                          });
                        }
                      }}
                      disabled={!showRightScroll}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {nearbyListingsLoading ? (
                // Loading skeleton - horizontal layout
                <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="bg-gray-100 rounded-lg h-[250px] w-[280px] min-w-[280px] flex-shrink-0 animate-pulse"
                      />
                    ))}
                </div>
              ) : nearbyListings.length > 0 ? (
                // Render nearby listings horizontally with QueryCard
                <div className="relative">
                  {/* Scrollable container */}
                  <div
                    ref={nearbyListingsRef}
                    className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4 no-scrollbar scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    onScroll={handleNearbyListingsScroll}
                  >
                    {nearbyListings.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -5 }}
                        className="flex-shrink-0"
                      >
                        <QueryCard
                          {...item}
                          listingFeatures={
                            item.listingFeatures || {
                              beds: item.beds || 1,
                              bathrooms: item.bathrooms || 1,
                            }
                          }
                          size={item.size || "N/A"}
                          isFurnished={
                            item.listingFeatures?.furnishingState ===
                              "FULLY_FURNISHED" || false
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                // No nearby listings found
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <img
                    src="/empty-state-buildings.svg"
                    alt="No properties found"
                    className="w-24 h-24 mx-auto mb-4 opacity-60"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <h3 className="text-gray-500 font-medium mb-1">
                    No other properties found
                  </h3>
                  <p className="text-gray-400 text-sm">
                    There are no other properties available in this area at the
                    moment.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Section - Booking */}
          <div ref={bookingSectionRef} className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {showBookingForm ? (
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  {agentLoading ? (
                    // Skeleton Loader
                    <div className="sticky top-6 bg-gray-100 shadow-sm rounded-xl p-6 border border-gray-100 mb-5">
                      {/* Skeleton for Price */}
                      <div className="h-8 bg-gray-200 rounded-md w-40 mb-2 animate-pulse"></div>

                      {/* Skeleton for Tags */}
                      <div className="flex gap-2 mb-6 flex-wrap">
                        <div className="h-7 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-7 bg-gray-200 rounded w-28 animate-pulse"></div>
                        <div className="h-7 bg-gray-200 rounded w-32 animate-pulse"></div>
                      </div>

                      {/* Skeleton for Check In/Out */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border border-gray-200 rounded-md p-3">
                          <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-3">
                          <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </div>
                      </div>

                      {/* Skeleton for Guests */}
                      <div className="border border-gray-200 rounded-md p-3 mb-6">
                        <div className="h-4 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="w-4 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Skeleton for Deposit Information */}
                      <div className="mb-6 bg-blue-50 p-3 rounded-md">
                        <div className="h-5 bg-blue-100 rounded w-36 mb-2 animate-pulse"></div>
                        <div className="h-6 bg-blue-100 rounded w-24 mb-1 animate-pulse"></div>
                        <div className="h-4 bg-blue-100 rounded w-64 mt-1 animate-pulse"></div>
                      </div>

                      {/* Skeleton for Cancellation Policy */}
                      <div className="mb-6">
                        <div className="h-5 bg-gray-200 rounded w-36 mb-3 animate-pulse"></div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
                            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                          </div>
                          <div className="flex justify-between">
                            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        </div>
                      </div>

                      {/* Skeleton for Total */}
                      <div className="flex justify-between pt-4 border-t border-gray-200">
                        <div className="h-5 bg-gray-200 rounded w-36 animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="sticky top-6 bg-gray-100 shadow-sm rounded-xl p-6 border border-gray-100 mb-5">
                        <h2 className="text-2xl font-semibold mb-2">
                          {currencySymbol}
                          {formatPrice(listing.baseCost)}
                          <span className="text-gray-500 text-lg font-normal">
                            /{listing.paymentDuration}
                          </span>
                        </h2>

                        <div className="flex gap-2 mb-6 flex-wrap">
                          <div className="text-gray-600 bg-gray-200 px-2 py-1 rounded text-sm">
                            Self check-in
                          </div>
                          <div className="text-gray-600 bg-gray-200 px-2 py-1 rounded text-sm">
                            Great location
                          </div>
                          {listing.isStudent && (
                            <div className="text-gray-600 bg-gray-200 px-2 py-1 rounded text-sm">
                              Student friendly
                            </div>
                          )}
                        </div>

                        {/* Check In/Out */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="border border-gray-300 rounded-md p-3">
                            <p className="text-gray-500 text-sm mb-1">
                              Check In
                            </p>
                            <p className="font-medium">Select Date</p>
                          </div>
                          <div className="border border-gray-300 rounded-md p-3">
                            <p className="text-gray-500 text-sm mb-1">
                              Check Out
                            </p>
                            <p className="font-medium">Select Date</p>
                          </div>
                        </div>

                        {/* Guests */}
                        <div className="border border-gray-300 rounded-md p-3 mb-6">
                          <p className="text-gray-500 text-sm mb-1">Guests</p>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">
                              {guestCount} Guest{guestCount !== 1 ? "s" : ""}
                            </p>
                            <div className="flex items-center">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  setGuestCount(Math.max(1, guestCount - 1))
                                }
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                                disabled={guestCount <= 1}
                              >
                                -
                              </motion.button>
                              <span className="mx-3">{guestCount}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  setGuestCount(Math.min(10, guestCount + 1))
                                }
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                                disabled={guestCount >= 10}
                              >
                                +
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Deposit Information */}
                        <div className="mb-6 bg-blue-50 p-3 rounded-md">
                          <h3 className="font-semibold text-blue-800 mb-2">
                            Required Deposit
                          </h3>
                          <p className="font-medium">
                            {currencySymbol}
                            {formatPrice(listing.minBaseCostDeposit)}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            This amount is required to secure the apartment
                          </p>
                        </div>

                        {/* Cancellation Policy */}
                        <div className="mb-6">
                          <h3 className="font-semibold mb-3">
                            Cancellation Policy
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <p>Non-Refundable</p>
                              <p>
                                {currencySymbol}
                                {formatPrice(listing.baseCost)}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p>Refundable</p>
                              <p>
                                {currencySymbol}
                                {formatPrice(
                                  parseFloat(listing.baseCost) * 1.05,
                                )}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600">
                              Free cancellation before booking confirmation,
                              after that, the reservation is non-refundable.
                            </p>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between pt-4 border-t border-gray-200">
                          <p className="font-semibold">Total Before Taxes:</p>
                          <p className="font-semibold">
                            {currencySymbol}
                            {formatPrice(listing.baseCost)}
                          </p>
                        </div>
                      </div>
                      {/* Buttons - Modified to have 2 buttons */}
                      <div className="flex space-x-4 mb-4 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-1/2 bg-black text-white font-medium py-3 rounded-md"
                          onClick={() => {
                            setShowBookingForm(false);
                            setShowContactForm(false);
                          }}
                        >
                          Book Apartment
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-1/2 bg-white text-black font-medium py-3 rounded-md border border-black"
                          onClick={() => {
                            setShowBookingForm(false);
                            setShowContactForm(true);
                          }}
                        >
                          Contact Agent
                        </motion.button>
                      </div>

                      {/* Urgent booking notification */}
                      <div className="mt-4 flex items-center text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                        <div className="mr-2">⏱️</div>
                        <p>
                          <strong>Limited availability!</strong> Only{" "}
                          {listing.unitsLeft} unit(s) left out of{" "}
                          {listing.units}
                        </p>
                      </div>

                      {/* Report listing */}
                      <div className="mt-6 text-center">
                        <button className="text-red-500 underline text-sm hover:underline">
                          Report this listing
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : showContactForm ? (
                <motion.div
                  key="contact-options"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="sticky top-6"
                >
                  <div className="bg-gray-100 shadow-sm rounded-xl p-6 border border-gray-400 mb-5">
                    <h2 className="text-lg font-medium mb-4">
                      Contact Listing Agent
                    </h2>

                    <div className="mb-6 pb-4 border-b border-gray-300">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden flex items-center justify-center">
                          <img
                            src={agentData?.profileImage}
                            alt="N/A"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{agentData?.agentName}</p>
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-gray-600">
                              Leasing Agent
                            </p>
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm">4.9</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        className="relative mt-2 bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-lg shadow-sm overflow-hidden"
                        // whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <motion.div
                          className="absolute inset-0 bg-purple-200 origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        <motion.div
                          className="relative flex items-center justify-center gap-2"
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <User size={18} />
                          <span>View agent page</span>
                        </motion.div>
                      </motion.button>
                    </div>

                    {/* Contact Buttons */}
                    <div className="space-y-3 mb-6">
                      <a
                        href={`https://wa.me/${"+234" + agentData?.phoneNumber.replace(/^0/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp Chat
                      </a>

                      <a
                        href={`tel:${"+234" + agentData.phoneNumber.replace(/^0/, "")}`}
                        className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                        Call Agent
                      </a>

                      <a
                        href={`mailto:${agentData.email}?subject=Property Inquiry`}
                        className="flex items-center justify-center w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                        Send Email
                      </a>
                    </div>

                    {/* Example Message Box */}
                    <div className="mb-2 bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-800">
                          Example Message
                        </h3>
                        <button
                          onClick={() => {
                            const text =
                              document.getElementById(
                                "example-message",
                              ).innerText;
                            navigator.clipboard.writeText(text);

                            // Show toast or notification
                            const toast = document.getElementById("copy-toast");
                            if (toast) {
                              toast.classList.remove("opacity-0");
                              toast.classList.add("opacity-100");
                              setTimeout(() => {
                                toast.classList.remove("opacity-100");
                                toast.classList.add("opacity-0");
                              }, 2000);
                            }
                          }}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                          </svg>
                          Copy
                        </button>
                      </div>
                      <p id="example-message" className="text-sm text-gray-600">
                        Hi {agentData.agentName}, I'm interested in the property
                        - {listing.title} and would like to schedule a viewing.
                        I'm available on weekdays after 5pm and anytime on
                        weekends. Looking forward to hearing from you.
                      </p>

                      {/* Toast notification for copy action */}
                      <div
                        id="copy-toast"
                        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-0 transition-opacity duration-300"
                      >
                        Message copied to clipboard!
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-1/2 bg-gray-500 text-white font-medium py-3 rounded-md"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-1/2 bg-black text-white font-medium py-3 rounded-md"
                    >
                      Send Message
                    </motion.button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Usually responds within 24 hours
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="checkout-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="sticky top-6"
                >
                  <div className="bg-gray-100 shadow-sm rounded-xl p-6 border border-gray-100 mb-5">
                    <h2 className="text-lg font-medium mb-4">
                      Complete Your Booking
                    </h2>

                    {/* Unit Selection */}
                    <div className="mb-6 border border-gray-300 rounded-md p-4">
                      <label className="block text-gray-700 mb-2 font-medium">
                        Number of Units
                      </label>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">
                          {unitCount} Unit{unitCount !== 1 ? "s" : ""}
                        </p>
                        <div className="flex items-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              setUnitCount(Math.max(1, unitCount - 1))
                            }
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                            disabled={unitCount <= 1}
                          >
                            -
                          </motion.button>
                          <span className="mx-3">{unitCount}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              setUnitCount(
                                Math.min(listing.unitsLeft, unitCount + 1),
                              )
                            }
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
                            disabled={unitCount >= listing.unitsLeft}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                        <div className="mr-2">⏱️</div>
                        <p>
                          <strong>Limited availability!</strong> Only{" "}
                          {listing.unitsLeft} unit(s) left out of{" "}
                          {listing.units}
                        </p>
                      </div>
                    </div>
                    {/*DURATION*/}
                    <div className="mb-6 border border-gray-300 rounded-md p-4">
                      <label className="block text-gray-700 mb-2 font-medium">
                        Rental Duration
                      </label>
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">
                            {duration}{" "}
                            {listing.paymentDuration === "annum"
                              ? `Year${duration !== 1 ? "s" : ""}`
                              : `Month${duration !== 1 ? "s" : ""}`}
                          </p>
                          <div className="flex items-center">
                            <select
                              value={duration}
                              onChange={(e) =>
                                setDuration(parseInt(e.target.value))
                              }
                              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {getDurationOptions().map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {listing.paymentDuration === "monthly" &&
                          duration >= 12 && (
                            <div className="flex items-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                              <div className="mr-2">💡</div>
                              <p>
                                <strong>Pro tip:</strong> Annual contracts may
                                qualify for discounted rates. Contact the agent
                                for details.
                              </p>
                            </div>
                          )}

                        {listing.paymentDuration === "annum" &&
                          duration >= 2 && (
                            <div className="flex items-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                              <div className="mr-2">💰</div>
                              <p>
                                <strong>Multi-year discount:</strong> You may
                                qualify for reduced rates on {duration}-year
                                contracts.
                              </p>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Trust Information */}
                    <div className="mb-6 bg-green-50 p-4 rounded-md">
                      <h3 className="font-semibold text-green-800 mb-2">
                        Why Book With Us
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>Secure and transparent booking process</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>
                            Verified listings with real photos and details
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>
                            24/7 customer support during your entire stay
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>
                            5-star rated service with 95% customer satisfaction
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* How Booking Works */}
                    <div className="mb-6 bg-blue-50 p-4 rounded-md">
                      <h3 className="font-semibold text-blue-800 mb-2">
                        How Booking Works
                      </h3>
                      <ol className="text-sm text-gray-700 space-y-2 list-decimal pl-4">
                        <li>Select the number of units you wish to book</li>
                        <li>
                          Wait for a booking confirmation email from the agent
                        </li>
                        <li>Pay the required deposit to secure your booking</li>
                        <li>
                          Receive confirmation details via email immediately
                        </li>
                        <li>Done, Just like that</li>
                      </ol>
                    </div>

                    <div className="mt-4 mb-3 flex items-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                      <div className="mr-2">💰</div>
                      <p>
                        <strong>Secure Payment:</strong> All payments made are
                        held in escrow with us for 7 days before disbursement to
                        agent
                      </p>
                    </div>

                    {/* Booking Summary */}
                    <div className="mb-6 bg-gray-200 p-4 rounded-md">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Booking Summary
                      </h3>
                      <div className="flex justify-between mb-2">
                        <span>
                          {listing.title} × {unitCount}
                        </span>
                        <span>
                          {listing.currency?.symbol}
                          {formatPrice(listing?.baseCost)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Security Deposit</span>
                        <span>
                          {currencySymbol}
                          {formatPrice(listing?.minBaseCostDeposit)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Legal Fee</span>
                        <span>
                          {currencySymbol}
                          {formatPrice(listing?.minBaseCostDeposit)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-300">
                        <span>Total Payment</span>
                        <span>
                          {currencySymbol}
                          {formatPrice(listing.baseCost)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">
                          I agree to the{" "}
                          <a href="#" className="text-blue-500">
                            terms and conditions
                          </a>
                        </span>
                      </label>
                    </div>
                  </div>

                  {isConfirmingBooking && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center"
                    >
                      <p className="text-amber-700 text-sm font-medium">
                        You can always cancel a booking from the bookings page
                      </p>
                    </motion.div>
                  )}

                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-1/2 bg-gray-500 text-white font-medium py-3 rounded-md"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full font-medium py-3 rounded-md transition-colors duration-300 ${
                        !isConfirmingBooking
                          ? "bg-black text-white"
                          : "bg-green-500 text-white"
                      }`}
                      onClick={handleBookButtonClick}
                    >
                      {!isConfirmingBooking
                        ? `Book ${unitCount} Unit${unitCount !== 1 ? "s" : ""}`
                        : "Confirm Booking"}
                    </motion.button>
                  </div>

                  {/*BOOKING MODAL ANIMATION*/}
                  <div>
                    <AnimatePresence>
                      {isBookLoading && isVisible && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={backdropVariants}
                          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
                        >
                          <motion.div
                            variants={modalVariants}
                            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl text-center relative mx-4"
                          >
                            {bookingStatus === "loading" && (
                              <div className="py-6">
                                <motion.div
                                  variants={spinnerVariants}
                                  animate="animate"
                                  className="w-20 h-20 border-4 border-gray-200 border-t-purple-600 rounded-full mx-auto mb-6"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                                  Processing your booking...
                                </h3>
                                <p className="text-gray-500 mt-3 max-w-xs mx-auto">
                                  Please wait while we confirm your reservation.
                                  This usually takes a few seconds.
                                </p>
                              </div>
                            )}

                            {bookingStatus === "success" && (
                              <div className="py-6">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    damping: 10,
                                    stiffness: 100,
                                  }}
                                  className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
                                >
                                  <motion.svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-green-600"
                                  >
                                    <motion.path
                                      d="M6 16L13 23L26 10"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      variants={checkmarkPathVariants}
                                      initial="hidden"
                                      animate="visible"
                                    />
                                  </motion.svg>
                                </motion.div>

                                <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                                  Booking Successful!
                                </h3>

                                <p className="text-gray-600 mt-3">
                                  You've successfully booked{" "}
                                  <span className="font-semibold text-gray-800">
                                    {unitCount} unit{unitCount !== 1 ? "s" : ""}
                                  </span>
                                </p>

                                <p className="text-gray-500 text-sm mt-4">
                                  A confirmation email has been sent to your
                                  inbox with all the details.
                                </p>

                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition-colors duration-200"
                                  onClick={handleClose}
                                >
                                  Close
                                </motion.button>
                              </div>
                            )}

                            {bookingStatus === "error" && (
                              <div className="py-6">
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    damping: 10,
                                    stiffness: 100,
                                  }}
                                  className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center"
                                >
                                  <motion.svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-red-600"
                                  >
                                    <motion.path
                                      d="M24 8L8 24"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      variants={errorPathVariants}
                                      initial="hidden"
                                      animate="visible"
                                    />
                                    <motion.path
                                      d="M8 8L24 24"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      variants={errorPathVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ delay: 0.2 }}
                                    />
                                  </motion.svg>
                                </motion.div>

                                <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                                  Booking Failed
                                </h3>

                                <p className="text-red-600 mt-3 max-w-xs mx-auto">
                                  {errorMessage}
                                </p>

                                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                                  <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </motion.button>

                                  <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-purple-700 transition-colors duration-200"
                                    onClick={() => {
                                      setBookingStatus("loading");
                                      bookApartment();
                                    }}
                                  >
                                    Try Again
                                  </motion.button>
                                </div>
                              </div>
                            )}

                            {/* Close button in the corner */}
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={handleClose}
                              aria-label="Close modal"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 4L4 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M4 4L12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 text-center flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Book Button for Mobile */}
          <AnimatePresence>
            {showScrollToBooking && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-6 right-6 z-50 lg:hidden"
              >
                <div className="btn-wrapper">
                  <button
                    onClick={scrollToBooking}
                    className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <IoBookmarksOutline size={20} />
                  </button>
                  <span className="tooltip">Book this property</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default ListingDetailsPage;
