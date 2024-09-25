import popularLocations from "../Data/popular_locations.json";
import PopularLocationDetails from "../Components/PopularLocationDetails";
import { useState } from "react";
import RecentSearches from "./RecentSearches";

const General = () => {
  const [selectedLocation, setSelectedLocation] = useState({ name: "Holla" });

  // Function to handle click and set selected location without navigation
  const handlePopularLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <RecentSearches />
      <div className="w-full px-16 mb-20">
        <p className="text-[20px] sm:text-xl">Scout Generally</p>
        <p className=" text-sm text-[#888888] mb-5 sm:text-[1.1rem]">
          Hundreds of Accommodations to choose from
        </p>
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
          {popularLocations.map((location) => (
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
                <p className="font-normal text-[13px] sm:text-[15px]">{location.name}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedLocation && (
          <PopularLocationDetails popularLocations={selectedLocation} />
        )}
      </div>

      <div className="flex items-center justify-center md:grid grid-cols-2 w-full bg-[#F4EBFF] px-20 md:items-center md:justify-between mb-9 gap-8">
        <div className="flex flex-col gap-6 items-start my-10">
          <p className="text-2xl font-semibold">
            Are You a Renter ot a Student
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

      <div className="flex items-center justify-center md:grid grid-cols-2 w-full bg-[#F4EBFF] px-20 md:items-center md:justify-between mb-9 gap-8">
        <div className="flex flex-col gap-6 items-start my-10">
          <p className="text-2xl font-semibold">Are You an Agent or Landlord</p>
          <p className="text-sm text-gray-700">
            Spread the good news! Earn more by helping your friends, clients
            find an apartment they truly love. Refer and earn for each
            successful booking made on the platform.
          </p>
          <div className="bg-[#7F56D9] px-5 py-3 rounded-lg">
            <button className="text-white font-medium">Expand Your reach</button>
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
    </>
  );
};

export default General;
