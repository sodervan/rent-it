import { LISTINGITEM } from "@/lib/api";
import {
  MapPin,
  Heart,
  BedDouble,
  Bath,
  SquareIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useFavorites } from "@/Pages/renter_dashboard/Contexts/FavContext.tsx";

function QueryCard(props: LISTINGITEM) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Use the favorites context
  const { isFavorite, addFavorite, removeFavorite, isLoading } = useFavorites();
  const favorite = isFavorite(props.id);
  const isCurrentLoading = isLoading[props.id] || false;

  // Function to save listing to recently viewed in localStorage
  const saveToRecentlyViewed = (e: React.MouseEvent) => {
    // Don't trigger this if the heart icon was clicked
    if ((e.target as HTMLElement).closest("button")) return;

    try {
      const storedRecent = localStorage.getItem("recentlyViewedListings");
      let recentListings: LISTINGITEM[] = storedRecent
        ? JSON.parse(storedRecent)
        : [];

      const existingIndex = recentListings.findIndex(
        (item) => item.id === props.id,
      );

      if (existingIndex !== -1) {
        recentListings.splice(existingIndex, 1);
      }

      recentListings.unshift(props);

      if (recentListings.length > 10) {
        recentListings = recentListings.slice(0, 10);
      }

      localStorage.setItem(
        "recentlyViewedListings",
        JSON.stringify(recentListings),
      );
    } catch (error) {
      console.error("Failed to save to recently viewed:", error);
    }
  };

  // Toggle favorite status using the context
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (favorite) {
        await removeFavorite(props.id);
      } else {
        await addFavorite(props);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  // Navigate to previous image
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.pictures.length <= 1) return;

    setCurrentImageIndex((prevIndex) => {
      return prevIndex === 0 ? props.pictures.length - 1 : prevIndex - 1;
    });
  };

  // Navigate to next image
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.pictures.length <= 1) return;

    setCurrentImageIndex((prevIndex) => {
      return prevIndex === props.pictures.length - 1 ? 0 : prevIndex + 1;
    });
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Link
      to={`/listing/${props.id}`}
      className="block w-full max-w-[300px] p-2 bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      onClick={saveToRecentlyViewed}
    >
      {/* Image carousel container */}
      <div className="relative w-full h-[160px] overflow-hidden rounded-xl">
        {/* Image container with animation */}
        <div ref={carouselRef} className="relative w-full h-full">
          {props.pictures.map((picture, index) => (
            <img
              key={`${props.id}-image-${index}`}
              loading="lazy"
              src={picture?.imageUrl || "/placeholder-property.jpg"}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-all duration-500 
                ${currentImageIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"} 
                ${isImageLoaded ? "animate-fadeIn" : ""}`}
              style={{ zIndex: currentImageIndex === index ? 1 : 0 }}
              alt={`${props.title} - image ${index + 1}`}
              onLoad={handleImageLoad}
            />
          ))}
        </div>

        {/* Carousel controls */}
        {props.pictures.length > 1 && (
          <>
            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-sm z-10 hover:bg-white transition-colors"
            >
              <ChevronLeft size={16} className="text-gray-700" />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-sm z-10 hover:bg-white transition-colors"
            >
              <ChevronRight size={16} className="text-gray-700" />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center space-x-1">
              {props.pictures.map((_, index) => (
                <span
                  key={`${props.id}-indicator-${index}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Favorite button */}
        <motion.button
          onClick={toggleFavorite}
          disabled={isCurrentLoading}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md z-10 hover:bg-gray-50 transition-colors disabled:opacity-50"
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={false}
            animate={
              favorite && !isCurrentLoading ? { scale: [1, 1.2, 1] } : {}
            }
            transition={{ duration: 0.3 }}
          >
            {isCurrentLoading ? (
              <Loader2 size={18} className="text-purple-600 animate-spin" />
            ) : (
              <Heart
                size={18}
                className={
                  favorite
                    ? "text-red-500 fill-red-500 transition-colors duration-300"
                    : "text-gray-400 transition-colors duration-300 hover:text-gray-600"
                }
              />
            )}
          </motion.div>
        </motion.button>

        {/* Furnished badge */}
        {props.isFurnished && (
          <span className="absolute bottom-2 left-2 bg-white text-gray-700 text-xs px-2 py-0.5 rounded font-medium z-10">
            Furnished
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <div className="mb-1">
          <p className="font-bold text-base flex items-center text-gray-800">
            ₦ {new Intl.NumberFormat("en-NG").format(props.baseCost)}
            <span className="font-normal text-sm">
              /{props.paymentDuration}
            </span>
          </p>
        </div>

        {/* Property details */}
        <div className="text-xs text-gray-600 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-purple-600 bg-secondaryPurple px-2 py-0.5 rounded flex items-center gap-1">
              <BedDouble size={14} className="flex-shrink-0" />
              {props.listingFeatures.beds} Beds
            </span>
            <span className="text-purple-600 bg-secondaryPurple px-2 py-0.5 rounded flex items-center gap-1">
              <Bath size={14} className="flex-shrink-0" />
              {props.listingFeatures.bathrooms} Baths
            </span>
            <span className="text-purple-600 bg-secondaryPurple px-2 py-0.5 rounded flex items-center gap-1">
              <SquareIcon size={14} className="flex-shrink-0" />
              {props.size} sqft
            </span>
          </div>
          <p className="flex items-start gap-1 text-gray-500">
            <MapPin
              size={14}
              className="mt-0.5 flex-shrink-0 text-primaryPurple"
            />
            <span className="line-clamp-1">{props.location.streetAddress}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default QueryCard;
