import { Carousel } from "flowbite-react";

const Body = () => {
  return (
    <div>
      <div className="h-[550px] mt-[75px] relative">
        <div className="absolute inset-0 z-10 flex flex-col gap-7 justify-center items-center">
          <div>
            <p className="text-white text-[45px] font-bold">
              Find Your Perfect Home, Hassle Free
            </p>
          </div>
          <div>
            <p className="text-white text-[18px]">
              Simplifying apartment hunting for students and renters with
              transparency, reliability, and ease.
            </p>
          </div>
          <div className="flex gap-5">
            <div className=" bg-[#F4EBFF] py-2 px-4 rounded-lg">
              <p className="text-primaryPurple font-normal text-sm">
                No unnecessary fees
              </p>
            </div>
            <div className=" bg-[#F4EBFF] py-2 px-4 rounded-lg">
              <p className="text-primaryPurple font-normal text-sm">
                Renter protection
              </p>
            </div>
            <div className=" bg-[#F4EBFF] py-2 px-4 rounded-lg ">
              <p className="text-primaryPurple font-normal text-sm">
                Student Accommodation
              </p>
            </div>
          </div>
          <div className="flex items-center w-3/5">
            <div className=" w-[88%] bg-white py-3 px-4 rounded-l-[11px]">
              <input
                className=" p-0 w-full border-none focus:outline-none bg-none bg-white rounded-lg "
                type="text"
                placeholder="Search by University, Location, Property"
              />
            </div>
            <div className="flex bg-primaryPurple w-[12%] py-3 px-4 rounded-r-[11px] items-center justify-center gap-1">
              <div>
                <i className="fi fi-rr-search text-white"></i>
              </div>
              <div>
                <p className="text-white">Search</p>
              </div>
            </div>
          </div>
        </div>

        <Carousel pauseOnHover className="h-[100%]">
          <div className="relative rounded-none">
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1724857270/pexels-binyaminmellish-106399_ana2ff.jpg"
              alt="..."
              className="w-full h-full object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1724858745/ultimate-guide-to-home-exterior-design_leq7ty.jpg"
              alt="..."
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmlgns85e/image/upload/v1724858656/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b_rzafww.jpg"
              alt="..."
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Body;
