import { NavLink } from "react-router-dom";
import { useState } from "react";

const SearchResults = () => {
  const [amount, setAmount] = useState(false);
  const [type, setType] = useState(false);
  const [beds, setBeds] = useState(false);

  const updateAmount = () => {
    setAmount(!amount);
  };
  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center mt-20 px-20">
        <div className="w-[85%] border border-gray-200 py-3 px-3 rounded-l-lg">
          <input
            type="text"
            placeholder="University of Lagos"
            className="border-none p-0 m-0"
          />
        </div>
        <NavLink
          to="/"
          className="bg-primaryPurple py-3 px-6 w-[15%] flex justify-center rounded-r-lg items-center gap-2"
        >
          <div>
            <i className="fi fi-rr-search text-white"></i>
          </div>
          <div>
            <p className="text-white">Search</p>
          </div>
        </NavLink>
      </div>
      <div className="flex gap-5 px-20 my-5">
        <div className="px-3 py-2 rounded-lg border border-gray-200 relative">
          <div className=" flex items-center justify-center gap-1 ">
            <div className="text-[#344054]">Amount</div>
            <div>
              <i className="fi fi-rr-angle-small-down text-[#344054]"></i>
            </div>
          </div>
          <div className="absolute bg-white z-10"></div>
        </div>

        {
          <div className="px-3 py-2 rounded-lg border border-gray-200 relative cursor-pointer hover:scale-300 duration-200 transform transition-transform">
            <div
              className=" flex items-center justify-center gap-1"
              onClick={() => updateAmount()}
            >
              <div className="text-[#344054]">Type</div>
              <div>
                <i className="fi fi-rr-angle-small-down text-[#344054]"></i>
              </div>
            </div>
            {amount && (
              <div className="absolute bg-white rounded-lg z-10 mt-5 shadow-lg px-3 py-4">
                <div className="flex flex-col items-start">
                  <div>
                    <p className="text-gray-700">Price Range</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="p-2 border border-gray-200 w-28 rounded-md"
                      placeholder="Min"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className="p-2 border border-gray-200 w-28 rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        }

        <div className="px-3 py-2 rounded-lg border border-gray-200 relative">
          <div className=" flex items-center justify-center gap-1 ">
            <div className="text-[#344054]">Beds</div>
            <div>
              <i className="fi fi-rr-angle-small-down text-[#344054]"></i>
            </div>
          </div>
          <div className="absolute bg-white z-10"></div>
        </div>

        <div className="px-3 py-2 rounded-lg border border-gray-200 relative">
          <div className=" flex items-center justify-center gap-1 ">
            <div className="text-[#344054]">Listed By</div>
            <div>
              <i className="fi fi-rr-angle-small-down text-[#344054]"></i>
            </div>
          </div>
          <div className="absolute bg-white z-10"></div>
        </div>
      </div>
    </>
  );
};
export default SearchResults;
