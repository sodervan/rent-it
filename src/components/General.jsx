import { useState, useEffect } from "react";
import PopularLocationDetails from "./PopularLocationDetails";
import RecentSearches from "./RecentSearches";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import popularLocation from "../Data/popular_locations.json";

const General = () => {
  const [popularLocations, setPopularLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const firebaseUrl =
    "https://rentit-c3304-default-rtdb.firebaseio.com/locations.json";

  const getDataFromFirebase = async () => {
    try {
      const response = await fetch(firebaseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to receive data from Firebase");
      }

      const result = await response.json();

      console.log("Data received successfully:", result);

      setPopularLocations(result);

      if (result.length > 0) {
        setSelectedLocation(result[0]);
      }
    } catch (error) {
      console.error("Error receiving data:", error);
    }
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      getDataFromFirebase();
    }
  }, []);

  const handlePopularLocation = (location) => {
    setSelectedLocation(location);
  };
  return (
    <div>
      <div className="w-full px-6 sm:px-20 my-24">
        <p className="text-[20px] sm:text-xl">Scout Generally</p>
        <p className=" text-sm text-[#888888] mb-5 sm:text-[1.1rem]">
          Hundreds of Accommodations to choose from
        </p>

        {/* Render popular locations after the data is fetched */}
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
          {popularLocations.length > 0 ? (
            popularLocations.map((location) => (
              <div
                key={location.id}
                className={`cursor-pointer px-5 py-2 rounded-full flex items-center gap-1 ${
                  selectedLocation?.id === location.id
                    ? "border-[2px] border-primaryPurple shadow-inner"
                    : "border-[1px] shadow-inner"
                }`}
                onClick={() => handlePopularLocation(location)}
              >
                <div>
                  <i className="fi fi-rr-marker text-primaryPurple text-[13px] sm:text-[15px]"></i>
                </div>
                <div>
                  <p className="font-normal text-[13px] sm:text-[15px]">
                    {location.name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full mt-4"></div>
          )}
        </div>

        {/* Render details of the selected location if available */}
        {selectedLocation && (
          <PopularLocationDetails popularLocations={selectedLocation} />
        )}
      </div>
    </div>
  );
};

export default General;
