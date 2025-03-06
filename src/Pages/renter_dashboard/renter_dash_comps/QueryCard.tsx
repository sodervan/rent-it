import { LISTINGITEM } from "@/lib/api";
import { IconCurrencyNaira } from "@tabler/icons-react";
import { MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function QueryCard(props: LISTINGITEM) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to save listing to recently viewed in localStorage
  const saveToRecentlyViewed = (e: React.MouseEvent) => {
    // Don't trigger this if the heart icon was clicked
    if ((e.target as HTMLElement).closest("button")) return;

    try {
      // Get current recently viewed listings from localStorage
      const storedRecent = localStorage.getItem("recentlyViewedListings");
      let recentListings: LISTINGITEM[] = storedRecent
        ? JSON.parse(storedRecent)
        : [];

      // Check if this listing is already in the recently viewed array
      const existingIndex = recentListings.findIndex(
        (item) => item.id === props.id,
      );

      // If it exists, remove it so we can add it to the front (most recent)
      if (existingIndex !== -1) {
        recentListings.splice(existingIndex, 1);
      }

      // Add current listing to the beginning of the array
      recentListings.unshift(props);

      // Limit to 10 recent listings
      if (recentListings.length > 10) {
        recentListings = recentListings.slice(0, 10);
      }

      // Save back to localStorage
      localStorage.setItem(
        "recentlyViewedListings",
        JSON.stringify(recentListings),
      );
    } catch (error) {
      console.error("Failed to save to recently viewed:", error);
    }
  };

  // Check if listing is in favorites when component mounts
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteListings");
      if (storedFavorites) {
        const favorites: LISTINGITEM[] = JSON.parse(storedFavorites);
        const isFav = favorites.some((item) => item.id === props.id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error("Failed to retrieve favorites:", error);
    }
  }, [props.id]);

  // Toggle favorite status and update localStorage
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const storedFavorites = localStorage.getItem("favoriteListings");
      let favorites: LISTINGITEM[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter((item) => item.id !== props.id);
      } else {
        // Add to favorites
        favorites.push(props);
      }

      localStorage.setItem("favoriteListings", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  return (
    <Link
      to={`/property/${props.id}`}
      className="block w-full max-w-[280px] p-2 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      onClick={saveToRecentlyViewed}
    >
      {/* Image container with badge */}
      <div className="relative w-full h-[160px] overflow-hidden">
        <img
          loading="lazy"
          src={props.pictures[0]?.imageUrl || "/placeholder-property.jpg"}
          className="w-full h-full object-cover rounded-xl"
          alt={props.title}
        />

        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm"
        >
          <Heart
            size={18}
            className={
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }
          />
        </button>

        {/* Furnished badge */}
        {props.isFurnished && (
          <span className="absolute bottom-2 left-2 bg-white text-gray-700 text-xs px-2 py-0.5 rounded font-medium">
            Furnished
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <div className="mb-1">
          <p className="font-bold text-base flex items-center text-gray-800">
            <IconCurrencyNaira size={18} className="inline" />
            {props.baseCost} <span className="font-normal text-sm">/month</span>
          </p>
        </div>

        {/* Property details */}
        <div className="text-xs text-gray-600 space-y-1">
          <p>
            {props.bedrooms} Beds, {props.bathrooms} Baths, {props.size} sqft
          </p>
          <p className="flex items-start gap-1 text-gray-500">
            <MapPin size={14} className="mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{props.location.streetAddress}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default QueryCard;
