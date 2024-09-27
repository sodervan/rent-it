import { useState } from "react";
import { NavLink } from "react-router-dom";

const PopularLocationDetails = ({ popularLocations }) => {
  // Check if popularLocations exists and has accommodations
  const accommodations = popularLocations?.accommodations || [];
  const id = popularLocations?.id;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex gap-4 mt-6 w-full overflow-x-auto whitespace-nowrap py-10">
      {accommodations.length > 0 ? (
        accommodations.map((item, index) => (
          <NavLink
            to={`/listing-details-page/${id}/${index}`}
            key={index}
            className="flex flex-col h-[350px] rounded-lg shadow-lg w-[280px] min-w-[280px] cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
              <div className="flex items-center justify-between absolute top-2 left-3 w-full z-[100]">
                <div className="bg-[#F4EBFF] p-2 rounded-xl">
                  <p className="text-[12px] font-[600] text-[#1D2939]">
                    {item.type}
                  </p>
                </div>
                <div className="flex gap-1 mr-5">
                  <div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
                    <i className="fi fi-rr-heart text-[12px]"></i>
                  </div>
                  <div className="h-8 w-8 bg-[#F4EBFF] rounded-full flex items-center justify-center">
                    <i className="fi fi-rr-share text-[12px]"></i>
                  </div>
                </div>
              </div>
              <div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute z-[100] bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div>
                  <p className="text-[12px] text-primaryPurple whitespace-nowrap">
                    <span className="text-sm font-semibold">
                      {item.rentersBooked + " "}
                    </span>
                    renters have booked this listing
                  </p>
                </div>
              </div>
              <img
                src={item.poster}
                alt="#"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  hoveredIndex === index ? "transform scale-110" : ""
                }`}
              />
            </div>

            <div className="h-[40%] p-2 flex flex-col gap-2 justify-center">
              <p className="text-sm font-bold">{item.name}</p>
              <div className="flex gap-1 items-center">
                <p className="text-[15px] text-gray-600">
                  {`N ${item.price.toLocaleString()}`}
                </p>
                <p className=" text-xs bg-[#D7D6FD] font-light px-2 rounded-full">
                  {item.frequency}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <i className="fi fi-rr-text-box text-[#FF3D3D]"></i>
                <p className="text-xs">
                  Units Available: {item.unitsAvailable}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <i className="fi fi-rr-marker text-[#FF3D3D]"></i>
                <p className="text-xs">{item.address}</p>
              </div>
            </div>
          </NavLink>
        ))
      ) : (
        <p>No accommodations available.</p>
      )}
    </div>
  );
};

export default PopularLocationDetails;
