import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Rating, Spinner } from "@material-tailwind/react";
import Footer from "@/components/Footer.tsx";
import {
  IconDatabaseImport,
  IconUserSquareRounded,
  IconHeartHandshake,
  IconAlertCircle,
  IconMessageCircle,
  IconBookmark,
  IconPhotoPlus,
  IconInfoCircle,
  IconMapPin,
  IconCalendarEvent,
  IconBed,
  IconBath,
  IconPlugConnected,
} from "@tabler/icons-react";
import BookMarkListingModal from "../components/Modals/BookMarkListingModal.jsx";
import ChatAgentModal from "../components/Modals/ChatAgentModal.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const ListingDetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [toggleBookListingModal, setToggleListingModal] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);

  const updateChatAgentModal = () => {
    setToggleChat(true);
  };

  const closeChatModal = () => {
    setToggleChat(false);
  };

  const updateBookListingModal = () => {
    setToggleListingModal(true);
  };

  const closeModal = () => {
    setToggleListingModal(false);
  };

  const dateFormatter = (dateStr) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const getListingData = async () => {
    setLoading(true);

    if (!listingId) {
      setError("Invalid listing ID");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/listings/${listingId}`,
        {
          withCredentials: true,
        },
      );

      const data = response?.data?.payload;
      if (!data || data.length === 0) {
        setError("No listings available");
        return;
      }

      setListing(data[0]);
      console.log("Listing Data:", data[0]);
    } catch (err) {
      console.error(
        "Error fetching listing data:",
        err.response?.data || err.message,
      );
      setError("Failed to load listing data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingData();
  }, [listingId]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <Spinner className="w-12 h-12 text-purple-600" />
        <p className="mt-4 text-gray-600 font-medium">
          Loading listing details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <IconInfoCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={getListingData}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <IconInfoCircle size={48} className="mx-auto text-orange-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Listing Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the listing you're looking for.
          </p>
        </div>
      </div>
    );
  }

  // Extract data from the listing
  const {
    title = "Apartment",
    description = "No description available",
    price = 0,
    type = "Apartment",
    agentName = "Agent",
    rating = 4.5,
    unitsAvailable = 0,
    features = {},
    pictures = [],
  } = listing;

  const baseCost = price || 0;
  const agentFee = 10000;
  const agreementFee = 25000;
  const cautionFee = 75000;
  const totalCost = baseCost + agentFee + agreementFee + cautionFee;

  // Get the poster/main image
  const mainImage =
    pictures && pictures.length > 0 && pictures[activeImage]?.imageUrl
      ? pictures[activeImage].imageUrl
      : "https://via.placeholder.com/800x500?text=No+Image+Available";

  return (
    <>
      <Helmet>
        <title>{title || "Apartment"} | RentIt</title>
        <meta
          name="description"
          content={description || "View apartment details"}
        />
      </Helmet>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto"
      >
        {/* Property Header */}
        <motion.div variants={slideUp} className="px-4 md:px-6 lg:px-10 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {title || "Apartment"}
            </h1>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <IconMapPin size={18} className="text-purple-600" />
              <p className="text-gray-600">
                {listing.location?.streetAddress || "Address not available"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {type}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {features.furnishingState || "Not specified"}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {unitsAvailable} {unitsAvailable === 1 ? "unit" : "units"}{" "}
              available
            </span>
          </div>
        </motion.div>

        {/* Main Section: Images and Video */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto px-4 md:px-6 lg:px-10 mb-10"
        >
          {/* Left Section: Main Image & Thumbnails */}
          <motion.div
            variants={slideUp}
            className="md:col-span-2 lg:col-span-3 flex flex-col gap-4"
          >
            {/* Main Image */}
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={mainImage}
                alt={title || "Property"}
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-xl"
              />
              <div className="absolute top-4 left-4 bg-purple-100 px-3 py-1 rounded-full shadow">
                <p className="text-sm font-semibold text-purple-800">{type}</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full text-white text-sm shadow">
                {activeImage + 1} / {pictures.length || 1}
              </div>

              {/* Navigation arrows */}
              {pictures.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? pictures.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === pictures.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {pictures && pictures.length > 1 && (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2"
              >
                {pictures.map((pic, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className={`relative cursor-pointer rounded-lg overflow-hidden ${i === activeImage ? "ring-2 ring-purple-600" : ""}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img
                      src={pic.imageUrl || "https://via.placeholder.com/150"}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-20 object-cover transition-transform hover:scale-110 duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right Section: Video or Virtual Tour */}
          <motion.div
            variants={slideUp}
            className="md:col-span-1 lg:col-span-1 flex flex-col"
          >
            <div className="relative bg-gray-100 rounded-xl shadow-lg overflow-hidden h-80 md:h-96">
              {listing.video &&
              listing.video.length > 0 &&
              listing.video[0].videoUrl ? (
                <video
                  className="w-full h-full object-cover rounded-xl"
                  controls
                >
                  <source src={listing.video[0].videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                  <IconPhotoPlus size={48} className="text-gray-400 mb-3" />
                  <p className="text-gray-600 font-medium">
                    No Virtual Tour Available
                  </p>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black px-3 py-1 rounded-full text-white text-sm">
                Virtual Tour
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Key Property Details */}
        <motion.div
          variants={slideUp}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-6 lg:px-10 mb-10"
        >
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <IconBed size={24} className="text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Bedrooms</p>
            <p className="font-bold text-gray-800">{features.beds || "N/A"}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <IconBath size={24} className="text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Bathrooms</p>
            <p className="font-bold text-gray-800">
              {features.bathrooms || "N/A"}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <IconPlugConnected size={24} className="text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Electricity</p>
            <p className="font-bold text-gray-800 text-center">
              {features.electricityPaymentType || "N/A"}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <IconCalendarEvent size={24} className="text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Payment Duration</p>
            <p className="font-bold text-gray-800">
              {listing.paymentDuration || "N/A"}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <IconUserSquareRounded size={24} className="text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">For Students</p>
            <p className="font-bold text-gray-800">
              {listing.isStudent ? "Yes" : "No"}
            </p>
          </div>
        </motion.div>

        {/* Side Section: Agent, Book, and Cost */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mx-auto px-4 md:px-6 lg:px-10"
        >
          {/* Agent Details and Book Listing */}
          <motion.div
            variants={slideUp}
            className="md:col-span-1 w-full flex flex-col gap-4"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 bg-white rounded-xl shadow-md border border-purple-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                Listing Agent
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt={agentName}
                  size="lg"
                  className="border-2 border-purple-200"
                />
                <div>
                  <p className="font-semibold text-gray-800">{agentName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Rating
                      value={Math.floor(rating)}
                      readonly
                      ratedColor="amber"
                    />
                    <span className="text-sm font-medium ml-1">{rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Available 8am - 6pm
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={updateChatAgentModal}
                className="mt-2 w-full bg-purple-600 text-white px-4 py-3
                rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 hover:shadow-lg transition-all duration-300"
              >
                <IconMessageCircle />
                Chat with Agent
              </motion.button>
            </motion.div>

            {/* Book Listing */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={updateBookListingModal}
              className="w-full bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-800 shadow-md transition-all duration-300"
            >
              <IconBookmark />
              Book Listing ({unitsAvailable}{" "}
              {unitsAvailable === 1 ? "unit" : "units"} left)
            </motion.button>

            {/* Property Features */}
            <motion.div
              variants={fadeIn}
              className="mt-4 p-6 bg-white rounded-xl shadow-md border border-purple-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                Property Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-gray-700">
                    Furnishing: {features.furnishingState || "Not specified"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-gray-700">
                    Bathroom: {features.bathroomAccessType || "Not specified"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-gray-700">
                    Bedroom: {features.bedroomAccessType || "Not specified"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-gray-700">
                    Running Water:{" "}
                    {features.inHouseRunningWater
                      ? "Available"
                      : "Not available"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-gray-700">
                    Kitchen: {features.kitchenAccessType || "Not specified"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-gray-700">
                    Outdoor Water:{" "}
                    {features.outdoorWaterTaps ? "Available" : "Not available"}
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Cost Breakdown */}
          <motion.div
            variants={slideUp}
            className="col-span-2 flex flex-col w-full rounded-xl border shadow-md bg-white overflow-hidden"
          >
            {/* Section Header */}
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">
                Cost Breakdown
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Complete payment details for this property
              </p>
            </div>

            {/* Item Rows */}
            <div className="flex items-center justify-between px-6 py-5 border-b hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <IconDatabaseImport className="text-purple-600" size={22} />
                <div>
                  <p className="font-medium text-gray-800">Base Cost</p>
                  <p className="text-sm text-gray-600">
                    {listing.paymentDuration || "Annual"} payment
                  </p>
                </div>
              </div>
              <p className="text-gray-900 font-medium">
                ₦ {baseCost.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center justify-between px-6 py-5 bg-gray-50 border-b hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <IconUserSquareRounded className="text-purple-600" size={22} />
                <div>
                  <p className="font-medium text-gray-800">Agent's Fee</p>
                  <p className="text-sm text-gray-600">Service charges</p>
                </div>
              </div>
              <p className="text-gray-900 font-medium">
                ₦ {agentFee.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center justify-between px-6 py-5 border-b hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <IconHeartHandshake className="text-purple-600" size={22} />
                <div>
                  <p className="font-medium text-gray-800">Agreement Fee</p>
                  <p className="text-sm text-gray-600">Legal documentation</p>
                </div>
              </div>
              <p className="text-gray-900 font-medium">
                ₦ {agreementFee.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center justify-between px-6 py-5 bg-gray-50 border-b hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <IconAlertCircle className="text-purple-600" size={22} />
                <div>
                  <p className="font-medium text-gray-800">Caution Fee</p>
                  <p className="text-sm text-gray-600">Refundable deposit</p>
                </div>
              </div>
              <p className="text-gray-900 font-medium">
                ₦ {cautionFee.toLocaleString()}
              </p>
            </div>

            {/* Total Section */}
            <div className="flex items-center justify-between px-6 py-6 bg-purple-100 border-t-2 border-purple-300">
              <div>
                <p className="font-semibold text-lg text-gray-800">TOTAL</p>
                <p className="text-sm text-gray-600">All fees inclusive</p>
              </div>
              <div>
                <p className="font-extrabold text-2xl text-purple-800">
                  ₦ {totalCost.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <motion.div
                animate={infoExpanded ? { height: "auto" } : { height: "80px" }}
                className="text-gray-700 overflow-hidden relative"
              >
                <p>{description}</p>
                {!infoExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </motion.div>
              <button
                onClick={() => setInfoExpanded(!infoExpanded)}
                className="mt-2 text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
              >
                {infoExpanded ? "Read Less" : "Read More"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-300 ${infoExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Learn More Button */}
            <div className="p-6 bg-gray-50 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold px-4 py-3 rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <IconInfoCircle size={20} />
                Learn More About This Property
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Location Information */}
        <motion.div variants={slideUp} className="mb-12 px-4 md:px-6 lg:px-10">
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  <span className="font-medium">Address:</span>{" "}
                  {listing.location?.streetAddress || "Not available"}
                </p>
                <p className="mb-4">
                  <span className="font-medium">City:</span>{" "}
                  {listing.location?.city?.name || "Not available"}
                </p>
                <p className="mb-4">
                  <span className="font-medium">State:</span>{" "}
                  {listing.location?.state?.name || "Not available"}
                </p>
                <p className="mb-4">
                  <span className="font-medium">Postal Code:</span>{" "}
                  {listing.location?.postalCode || "Not available"}
                </p>
              </div>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map view not available</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modals */}
        {toggleBookListingModal && (
          <BookMarkListingModal
            closeModal={closeModal}
            unitsAvailable={unitsAvailable}
          />
        )}
        {toggleChat && (
          <ChatAgentModal closeModal={closeChatModal} agentName={agentName} />
        )}
      </motion.div>

      <Footer />
    </>
  );
};

export default ListingDetailsPage;
