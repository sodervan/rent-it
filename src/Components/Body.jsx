import { Carousel } from "@material-tailwind/react";

const Body = () => {
  return (
    <div>
      <div className="mt-20 sm:mt-[40px] sm:h-[550px] md:mt-[75px] md:h-[550px] relative">
        <div className="absolute inset-0 z-10 flex flex-col gap-7 justify-center items-center">
          <div className="text-center px-4 md:px-20">
            <p className="text-white text-[30px] sm:text-[40px] md:text-[45px] lg:text-[50px] font-bold">
              Find Your Perfect Home, Hassle Free
            </p>
          </div>
          <div className="px-4 sm:px-10 md:px-20">
            <p className="text-white text-[14px] sm:text-sm md:text-base text-center">
              Simplifying apartment hunting for students and renters with
              transparency, reliability, and ease.
            </p>
          </div>
          <div className="flex gap-5 flex-wrap justify-center whitespace-nowrap sm:gap-2">
            <div className="bg-[#F4EBFF] rounded-lg px-2 py-1 md:py-2 md:px-4">
              <p className="text-[12px] text-primaryPurple sm:text-primaryPurple font-normal sm:text-[14px]">
                No unnecessary fees
              </p>
            </div>
            <div className="bg-[#F4EBFF] rounded-lg px-2 py-1 md:py-2 md:px-4">
              <p className="text-[12px] text-primaryPurple sm:text-primaryPurple font-normal sm:text-[14px]">
                Renter protection
              </p>
            </div>
            <div className="bg-[#F4EBFF] rounded-lg px-2 py-1 md:py-2 md:px-4">
              <p className="text-[12px] text-primaryPurple sm:text-primaryPurple font-normal sm:text-[14px]">
                Student Accommodation
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center w-3/5">
            <div className=" w-[80%] bg-white py-3 px-4 rounded-l-[11px]">
              <input
                className=" p-0 w-full border-none focus:outline-none bg-none bg-white rounded-lg "
                type="text"
                placeholder="Search by University, Location, Property"
              />
            </div>
            <div className="flex bg-primaryPurple w-[20%] py-3 px-4 rounded-r-[11px] items-center justify-center gap-1">
              <div>
                <i className="fi fi-rr-search text-white"></i>
              </div>
              <div>
                <p className="text-white">Search</p>
              </div>
            </div>
          </div>
        </div>

        <Carousel
          transition={{ duration: 1, type: "tween" }}
          navigation={false}
          prevArrow={false}
          nextArrow={false}
          autoplay={true}
          autoplayDelay={5000}
          loop={true}
          className="h-[100%]"
        >
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
