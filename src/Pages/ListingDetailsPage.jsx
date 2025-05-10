import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
// Font Awesome icons using React components
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCar,
  FaShieldAlt,
  FaRegStar,
  FaStar,
  FaEllipsisH,
  FaShare,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegClock,
} from "react-icons/fa";
import { TbPlugConnected } from "react-icons/tb";
import { DollarSign, Info, ChevronDown, ChevronUp } from "lucide-react";
import {
  FaLocationArrow,
  FaSchool,
  FaHospital,
  FaCity,
  FaBuilding,
} from "react-icons/fa";
import { MdExpandMore, MdExpandLess, MdDirectionsBus } from "react-icons/md";
import { FaWater } from "react-icons/fa";
import { MdOutlineFoodBank } from "react-icons/md";
import { IconVideo, IconPhoto } from "@tabler/icons-react";
import axios from "axios";
import VideoModal from "@/components/AddListings/VideoModal.jsx";
import ImageModal from "@/components/AddListings/ImagesModal.jsx";

const ListingDetailsPage = () => {
  const [listing, setListing] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // For proper API integration
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/v1/listings/${listingId}`,
          { withCredentials: true }, // Include credentials like cookies
        );
        const data = response?.data?.payload;
        setListing(data[0]);
        console.log(listing);
      } catch (err) {
        console.error("Error fetching listing data:", err);
        setError(err.message || "Failed to load listing details");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [apiUrl, listingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-300 border-t-purple-500 rounded-full"
        />
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

  // Check if the property has a specific feature
  const hasFeature = (featureName) => {
    return listing.featureTags?.some(
      (tag) =>
        tag.featureTag?.name?.toLowerCase() === featureName.toLowerCase(),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden my-8"
    >
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-3">
              <AnimatePresence>
                {!showAllImages ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-3 gap-2 h-96"
                  >
                    <motion.div
                      className="col-span-2 row-span-2 relative rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={displayImages[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="relative rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={displayImages[1] || displayImages[0]}
                        alt={`${listing.title} interior 1`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="relative rounded-xl overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={displayImages[2] || displayImages[0]}
                        alt={`${listing.title} interior 2`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white p-4 fixed inset-0 z-50 overflow-y-auto"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">
                        {listing.title} - All Photos
                      </h3>
                      <button
                        onClick={() => setShowAllImages(false)}
                        className="text-gray-800 hover:text-gray-600"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayImages.map((img, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`${listing.title} - Photo ${idx + 1}`}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
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
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-100 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200 shadow-sm"
                      >
                        {item.featureTag.interfaceIconCode ? (
                          <i
                            className={`${item.featureTag.interfaceIconCode} mr-1.5 text-blue-600`}
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-blue-600 mr-1.5"></span>
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
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-100 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200 shadow-sm"
                      >
                        {item.billTag.interfaceIconCode ? (
                          <i
                            className={`${item.billTag.interfaceIconCode} mr-1.5 text-blue-600`}
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-blue-600 mr-1.5"></span>
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

            {/* Property Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 bg-gray-50 p-5 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-medium mb-4  border-b pb-2">
                Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                <div className="flex items-center group">
                  <TbPlugConnected className="text-primaryPurple mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700">
                    {listing.listingFeatures?.electricityPaymentType ===
                    "prepaid"
                      ? "Prepaid Electricity"
                      : "Electricity"}
                  </span>
                </div>
                <div className="flex items-center group">
                  <FaBath className="text-primaryPurple mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700">
                    {listing.bathroomAccessType === "private"
                      ? "Private Bathroom"
                      : "Shared Bathroom"}
                  </span>
                </div>
                <div className="flex items-center group">
                  <FaBed className="text-primaryPurple mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700">
                    {listing.bedroomAccessType === "private"
                      ? "Private Bedroom"
                      : "Shared Bedroom"}
                  </span>
                </div>
                <div className="flex items-center group">
                  <MdOutlineFoodBank className="text-primaryPurple mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700">
                    {listing.kitchenAccessType === "private"
                      ? "Private Kitchen"
                      : "Shared Kitchen"}
                  </span>
                </div>
                {listing.electricityAccessType && (
                  <div className="flex items-center group">
                    <TbPlugConnected className="text-primaryPurple mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">
                      {listing.electricityAccessType === "private"
                        ? "Private Electricity"
                        : "Shared Electricity"}
                    </span>
                  </div>
                )}
                {listing.furnishingState && (
                  <div className="flex items-center group">
                    <span className="mr-2 text-xl group-hover:scale-110 transition-transform">
                      🪑
                    </span>
                    <span className="text-gray-700">
                      {listing.furnishingState === "fully-furnished"
                        ? "Fully Furnished"
                        : listing.furnishingState === "semi-furnished"
                          ? "Semi-Furnished"
                          : "Not Furnished"}
                    </span>
                  </div>
                )}
                {listing.outdoorWaterTaps && (
                  <div className="flex items-center group">
                    <FaWater className="text-primaryPurple mr-2 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">Outdoor Water Taps</span>
                  </div>
                )}
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
                className="mb-8 rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <div
                  className="bg-white px-6 py-4 flex justify-between items-center cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <div className="flex items-center space-x-2">
                    <p className="text-primaryPurple text-lg">
                      {listing?.currency.symbol}
                    </p>
                    <h2 className="text-lg font-medium">Additional Fees</h2>
                    <div className="ml-2 bg-secondaryPurple text-primaryPurple text-xs px-2 py-1 rounded-full font-medium">
                      {listing.extraFees.length}{" "}
                      {listing.extraFees.length === 1 ? "fee" : "fees"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 font-medium text-gray-700">
                      Total: {currencySymbol}
                      {formatPrice(
                        listing.extraFees.reduce(
                          (sum, fee) => sum + fee.amount,
                          0,
                        ),
                      )}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                              Fee Description
                            </th>
                            <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {listing.extraFees.map((fee, index) => (
                            <tr key={index} className={`border-b bg-white`}>
                              <td className="py-3 px-2 flex items-center">
                                {fee.feeType?.description && (
                                  <div className="relative group mr-2">
                                    <Info className="h-4 w-4 text-gray-400" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48">
                                      {fee.feeType.description}
                                    </div>
                                  </div>
                                )}
                                <span className="font-medium text-gray-700">
                                  {fee.feeType?.name ||
                                    `Additional Fee ${index + 1}`}
                                </span>
                              </td>
                              <td className="text-right py-3 px-2 font-medium text-gray-800">
                                {currencySymbol}
                                {formatPrice(fee.amount)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-secondaryPurple">
                            <td className="py-3 px-2 font-semibold text-primaryPurple">
                              Total Additional Fees
                            </td>
                            <td className="text-right py-3 px-2 font-semibold text-primaryPurple">
                              {currencySymbol}
                              {formatPrice(
                                listing.extraFees.reduce(
                                  (sum, fee) => sum + fee.amount,
                                  0,
                                ),
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-lg font-medium mb-3">Location</h2>
              <div className="h-72 bg-gray-200 rounded-lg overflow-hidden">
                {/* Replace this with actual map component from your preferred mapping library */}
                <div className="relative w-full h-full">
                  <img
                    src="#"
                    alt="Map location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow text-center">
                      <FaMapMarkerAlt className="text-red-500 text-2xl mx-auto mb-2" />
                      <p>Exact location provided after booking</p>
                      <p className="text-gray-500 text-sm">
                        {listing.location?.streetAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

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

            {/* Available Properties Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-lg font-semibold mb-4">
                Properties available in the same area
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -5 }}
                    className="rounded-lg overflow-hidden shadow-sm border border-gray-200"
                  >
                    <img
                      src={`/api/placeholder/500/300`}
                      alt={`Similar property ${item}`}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium">Similar Property {item}</h3>
                      <p className="text-gray-600 text-sm">
                        {listing.location?.streetAddress}
                      </p>
                      <p className="font-semibold mt-1">
                        {currencySymbol}
                        {(
                          parseInt(listing.baseCost) +
                          item * 25000
                        ).toLocaleString()}
                        /{listing.paymentDuration}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Section - Booking */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {showBookingForm ? (
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
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
                        <p className="text-gray-500 text-sm mb-1">Check In</p>
                        <p className="font-medium">Select Date</p>
                      </div>
                      <div className="border border-gray-300 rounded-md p-3">
                        <p className="text-gray-500 text-sm mb-1">Check Out</p>
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
                            {formatPrice(parseFloat(listing.baseCost) * 1.05)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">
                          Free cancellation before booking confirmation, after
                          that, the reservation is non-refundable.
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
                  {/* Reserve Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-black text-white font-medium py-3 rounded-md"
                    onClick={() => setShowBookingForm(false)}
                  >
                    Book Apartment
                  </motion.button>

                  {/* Urgent booking notification */}
                  <div className="mt-4 flex items-center text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                    <div className="mr-2">⏱️</div>
                    <p>
                      <strong>Limited availability!</strong> Only{" "}
                      {listing.unitsLeft} unit(s) left out of {listing.units}
                    </p>
                  </div>

                  {/* Report listing */}
                  <div className="mt-6 text-center">
                    <button className="text-red-500 underline text-sm hover:underline">
                      Report this listing
                    </button>
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
                    <h2 className="text-xl font-bold mb-4">
                      Complete Your Booking
                    </h2>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">
                        Move-in Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded">
                        <option>Credit Card</option>
                        <option>Bank Transfer</option>
                        <option>PayPal</option>
                      </select>
                    </div>

                    <div className="mb-6 bg-blue-50 p-4 rounded-md">
                      <h3 className="font-semibold text-blue-800 mb-2">
                        Booking Summary
                      </h3>
                      <div className="flex justify-between mb-2">
                        <span>{listing.title}</span>
                        <span>
                          {currencySymbol}
                          {formatPrice(listing.baseCost)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Security Deposit</span>
                        <span>
                          {currencySymbol}
                          {formatPrice(listing.minBaseCostDeposit)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Service Fee</span>
                        <span>
                          {currencySymbol}
                          {formatPrice(parseFloat(listing.baseCost) * 0.05)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-300">
                        <span>Total Payment</span>
                        <span>
                          {currencySymbol}
                          {formatPrice(
                            parseFloat(listing.baseCost) +
                              parseFloat(listing.minBaseCostDeposit) +
                              parseFloat(listing.baseCost) * 0.05,
                          )}
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
                      Complete Booking
                    </motion.button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and secure.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingDetailsPage;
