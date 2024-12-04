import { NavLink } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import accommodations from "../Data/search_results.json";

const SearchResultsPage = () => {
  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center mt-20 px-6">
        <div className="w-[80%] border border-gray-200 py-3 px-3 rounded-l-lg">
          <input
            type="text"
            placeholder="University of Lagos"
            className="border-none p-0 m-0 w-full focus:ring-0"
          />
        </div>
        <NavLink
          to="/"
          className="bg-primaryPurple py-3 px-6 w-[20%] flex justify-center rounded-r-lg items-center gap-2"
        >
          <div>
            <i className="fi fi-rr-search text-sm text-white"></i>
          </div>
          <div>
            <p className="text-white text-sm">Search</p>
          </div>
        </NavLink>
      </div>
      <div className="flex gap-5 px-6 my-5 overflow-x-auto whitespace-nowrap no-scrollbar">
        <div className="border border-[#D0D5DD] rounded-lg font-normal text-[#344054]">
          <Dropdown label="Amount" dismissOnClick={true} color={false}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>

        <div className="border border-[#D0D5DD] rounded-lg font-normal text-[#344054]">
          <Dropdown label="Type" dismissOnClick={true} color={false}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>

        <div className="border border-[#D0D5DD] rounded-lg font-light text-[#344054]">
          <Dropdown label="Beds" dismissOnClick={true} color={false}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>

        <div className="border border-[#D0D5DD] rounded-lg font-normal text-[#344054]">
          <Dropdown label="Listed By" dismissOnClick={true} color={false}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="px-6">
        <p className="text-semibold text-lg">Search Results - {}</p>
      </div>
      <div className="px-6 flex my-4 cursor-pointer">
        <div className="p-3 rounded-lg bg-secondaryPurple">
          <p className="text-primaryPurple">View map</p>
        </div>
      </div>

      <div className="grid px-6 gap-8 mt-6 w-full overflow-x-auto items-center justify-center whitespace-nowrap sm:grid-cols-2">
        {accommodations.length > 0 ? (
          accommodations.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-[350px] rounded-lg shadow-lg w-[300px] max-w-[300px]" // Added min-w-[280px]
            >
              <div className="h-[60%] rounded-t-[15px] rounded-b-[20px] overflow-hidden relative">
                <div className="flex items-center justify-between absolute top-2 left-3 w-full">
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
                <div className="bg-[#F4EBFF] px-2 py-1 rounded-full mx-auto absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
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
                  className="w-full h-full object-cover"
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
            </div>
          ))
        ) : (
          <p>No accommodations available.</p>
        )}
      </div>
    </>
  );
};
export default SearchResultsPage;
