import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { LISTINGITEM } from "@/lib/api.ts";
import { toast } from "react-toastify";

interface FavoritesContextType {
  favorites: LISTINGITEM[];
  isFavorite: (listingId: string) => boolean;
  addFavorite: (listing: LISTINGITEM) => Promise<void>;
  removeFavorite: (listingId: string) => Promise<void>;
  isLoading: { [key: string]: boolean };
  refetchFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<LISTINGITEM[]>([]);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const apiUrl =
    import.meta.env.VITE_API_URL || "https://your-default-api-url.com";

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/listings/favourites`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFavorites(response.data);
      localStorage.setItem("favoriteListings", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching favorites:", error);

      const storedFavorites = localStorage.getItem("favoriteListings");
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (parseError) {
          console.error("Error parsing stored favorites:", parseError);
        }
      }

      toast.error("Failed to load favorites. Using cached data if available.");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const isFavorite = (listingId: string) => {
    return (
      Array.isArray(favorites) &&
      favorites.some((item) => item.id === listingId)
    );
  };

  const addFavorite = async (listing: LISTINGITEM) => {
    // Prevent multiple simultaneous requests for the same listing
    if (isLoading[listing.id]) return;

    setIsLoading((prev) => ({ ...prev, [listing.id]: true }));
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/listings/${listing.id}/favourite`,
        {}, // Empty object as body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const newFavorites = [...favorites];
      if (!newFavorites.some((item) => item.id === listing.id)) {
        newFavorites.push(listing);
      }
      setFavorites(newFavorites);
      localStorage.setItem("favoriteListings", JSON.stringify(newFavorites));

      toast.success("Added to favorites");
    } catch (error: any) {
      console.error("Error adding to favorites:", error);

      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response:", error.response.data);
        console.error("Status code:", error.response.status);
        toast.error(
          error.response.data.message || "Failed to add to favorites",
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        toast.error("No response from server");
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
        toast.error("Failed to add to favorites");
      }

      throw error;
    } finally {
      setIsLoading((prev) => ({ ...prev, [listing.id]: false }));
    }
  };

const removeFavorite = async (listingId: string) => {
  if (isLoading[listingId]) return;

  setIsLoading((prev) => ({ ...prev, [listingId]: true }));
  try {
    await axios.delete(`${apiUrl}/api/v1/listings/${listingId}/favourite`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Current favorites:", favorites); // Debugging log

    // Ensure favorites is an array before filtering
    const newFavorites = Array.isArray(favorites)
      ? favorites.filter((item) => item.id !== listingId)
      : [];
    setFavorites(newFavorites);
    localStorage.setItem("favoriteListings", JSON.stringify(newFavorites));

    toast.success("Removed from favorites");
  } catch (error: any) {
    console.error("Error removing from favorites:", error);

    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Status code:", error.response.status);
      toast.error(
        error.response.data.message || "Failed to remove from favorites"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from server");
    } else {
      console.error("Error setting up request:", error.message);
      toast.error("Failed to remove from favorites");
    }

    throw error;
  } finally {
    setIsLoading((prev) => ({ ...prev, [listingId]: false }));
  }
};

  const refetchFavorites = async () => {
    return fetchFavorites();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        isLoading,
        refetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
