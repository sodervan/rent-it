import { useQuery } from "@tanstack/react-query";
import Searchbar from "../renter_dash_comps/Searchbar";
import { get_favorites } from "@/lib/api";

function RenterFavorites() {
  let { data: userFavourites } = useQuery({
    queryKey: ["Favourites"],
    queryFn: get_favorites,
  });
  return (
    <>
      <div className="sticky top-0 bg-white shadow-md z-30 px-4 md:px-8">
        <Searchbar />
      </div>
      <div className="bg-gray-300 min-h-dvh pt-4">
        <div className="mt-4 px-4">
          <h2 className="text-2xl font-bold opacity-50">Favourites</h2>
          <div className="px-4 min-h-[569px] bg-white rounded-md mt-4 shadow-xl">
            {JSON.stringify(userFavourites)}
          </div>
        </div>
      </div>
    </>
  );
}

export default RenterFavorites;
