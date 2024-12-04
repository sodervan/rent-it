import { useState, useEffect } from "react";
import PopularLocationDetails from "../Components/PopularLocationDetails";
import RecentSearches from "./RecentSearches";
import { useLocation } from "react-router-dom";
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
    <div className="container mx-auto">
      <RecentSearches />
      <div className="w-full px-6 sm:px-20 mb-20">
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
            <div className="flex items-center justify-center w-full mt-4">
              {/* <Spinner className="h-10 w-10" /> */}
            </div>
          )}
        </div>

        {/* Render details of the selected location if available */}
        {selectedLocation && (
          <PopularLocationDetails popularLocations={selectedLocation} />
        )}
      </div>

      <div className="flex items-center justify-center md:grid grid-cols-2 w-full bg-[#F4EBFF] px-6 sm:px-20 md:items-center md:justify-between mb-9 gap-8">
        <div className="flex flex-col gap-6 items-start my-10">
          <p className="text-2xl font-semibold">
            Are You a Renter or a Student
          </p>
          <p className="text-sm text-gray-700">
            Find your perfect home with ease. Our platform offers you a seamless
            experience to search, compare, and secure your next apartment, all
            in one place. Explore verified listings and connect directly with
            landlords or agents.
          </p>
          <div className="bg-[#7F56D9] px-5 py-3 rounded-lg">
            <button className="text-white font-medium">
              Get started today!
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <img
            src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725089764/Pngtree_a_business_man_wearing_purple_15424326_1_uzoou5.png"
            alt="Business Man"
            className="max-w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-center md:grid grid-cols-2 w-full bg-[#F4EBFF] px-6 sm:px-20 md:items-center md:justify-between mb-9 gap-8">
        <div className="flex flex-col gap-6 items-start my-10">
          <p className="text-2xl font-semibold">Are You an Agent or Landlord</p>
          <p className="text-sm text-gray-700">
            Spread the good news! Earn more by helping your friends, clients
            find an apartment they truly love. Refer and earn for each
            successful booking made on the platform.
          </p>
          <div className="bg-[#7F56D9] px-5 py-3 rounded-lg">
            <button className="text-white font-medium">
              Expand Your Reach
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <img
            src="https://res.cloudinary.com/dmlgns85e/image/upload/v1725090751/Pexels_Photo_by_Ketut_Subiyanto_h5pma8.png"
            alt="Business Man"
            className="max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default General;
