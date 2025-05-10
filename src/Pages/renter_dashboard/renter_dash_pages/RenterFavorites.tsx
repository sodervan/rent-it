import Searchbar from "../renter_dash_comps/Searchbar";
import FavouritesHeader from "@/components/RenterFavourite/FavouritesHeader";
import QueryCard from "../renter_dash_comps/QueryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import FavouritesCard from "../../../components/RenterFavourite/FavouritesCard";

function RenterFavorites() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRenterFavorites = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/listings/favourites`, {
          withCredentials: true,
        });
        const payload = response.data.payload;
        setData(payload.data);
      } catch (error) {
        console.error("Error fetching renter favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Call the fetch function
    fetchRenterFavorites();
  }, []);

  return (
    <>
      {/* Searchbar */}
      <div className="sticky top-0 bg-white shadow-md z-30 px-4 md:px-8">
        <Searchbar />
      </div>

      {/* Favourites Header */}
      <FavouritesHeader count={data.length} />
      {/* Main Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <p>Loading...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <p>No favorites found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-3 max-w-[950px] w-[95%] mt-5 mx-auto justify-items-center p-4">
          {data.map((item) => (
            <FavouritesCard
              {...item.listing} // Spread the nested listing object as props
              key={item.listing.id} // Use the unique id from the listing as the key
            />
          ))}
        </div>
      )}
    </>
  );
}

export default RenterFavorites;