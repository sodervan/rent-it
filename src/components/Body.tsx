import { Carousel } from "@mantine/carousel";
import { IconSearch } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";

const image_list = [
  "https://res.cloudinary.com/dmlgns85e/image/upload/v1724857270/pexels-binyaminmellish-106399_ana2ff.jpg",
  "https://res.cloudinary.com/dmlgns85e/image/upload/v1724858745/ultimate-guide-to-home-exterior-design_leq7ty.jpg",
  "https://res.cloudinary.com/dmlgns85e/image/upload/v1724858656/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b_rzafww.jpg",
];

const Body = ({ userId }: { userId: string | null }) => {
  return (
    <div>
      {/* Main Body Section */}
      <div className="h-[500px] sm:h-[650px] md:h-[550px] relative overflow-hidden">
        {/* Text and Inputs Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col gap-7 justify-center items-center">
          {/* Static Heading Section */}
          <div className="text-center px-4 md:px-20">
            <p className="text-white text-[25px] sm:text-[40px] md:text-[45px] lg:text-[50px] font-bold leading-tight">
              Find Your <span className="text-primaryPurple">Perfect Home</span>{" "}
              Hassle Free
            </p>
          </div>

          <div className="px-4 sm:px-10 md:px-20">
            <p className="text-white text-[14px] sm:text-sm md:text-base text-center leading-relaxed">
              Simplifying apartment hunting for students and renters with
              transparency, reliability, and ease.
            </p>
          </div>

          {/* Feature Tags */}
          <div className="flex gap-3 flex-wrap justify-center sm:gap-2">
            {[
              "No Unnecessary Fees",
              "Renter Protection",
              "Student Accommodation",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#F4EBFF] rounded-lg px-3 py-2 md:py-2.5 md:px-6"
              >
                <p className="text-[12px] sm:text-[14px] font-medium text-primaryPurple text-center">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Search Bar (only visible on screens md and larger) */}
          <div className="relative w-full md:w-3/5 px-4 md:px-0 hidden md:block">
            <div className="flex justify-between items-center bg-white border border-gray-300 rounded-full shadow-lg p-2 overflow-hidden">
              <input
                className="flex-grow px-6 py-3 placeholder-gray-500 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primaryPurple transition-all duration-500"
                type="text"
                placeholder="Search by University, Location or Property"
              />
              <button className="flex items-center justify-center h-[50px] w-[50px] rounded-full bg-primaryPurple text-white hover:bg-purple-900 transition duration-300 shadow-md">
                <IconSearch className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <Carousel
          height="100%"
          loop
          className="h-[500px] sm:h-[650px] md:h-[550px] relative]"
          withIndicators
          styles={{
            indicator: {
              width: "10px",
              height: "10px",
              transition: "opacity 250ms ease",
              "&[data-active]": {
                opacity: 1,
                backgroundColor: "#6941C6",
              },
            },
          }}
        >
          {image_list.map((url, index) => (
            <Carousel.Slide
              key={index}
              className="h-full" /* Ensure slides take full height */
            >
              {/* Full height layer to ensure images align properly */}
              <div className="absolute inset-0 bg-black bg-opacity-70 z-10 h-full" />
              <img
                src={url}
                alt={`Carousel Slide ${index}`}
                className="w-full h-full object-cover" /* Ensure images take full height */
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Body;
