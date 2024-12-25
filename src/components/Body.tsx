import Autoplay from "embla-carousel-autoplay";
import { IconSearch } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useEffect, useRef, useState } from "react";

const image_list = [
  "https://res.cloudinary.com/dmlgns85e/image/upload/v1724857270/pexels-binyaminmellish-106399_ana2ff.jpg",
  "https://res.cloudinary.com/dmlgns85e/image/upload/v1724858745/ultimate-guide-to-home-exterior-design_leq7ty.jpg",
  "https://res.cloudinary.com/dmlgns85e/image/upload/v1724858656/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b_rzafww.jpg",
];

const Body = ({ userId }: { userId: string | null }) => {
  const placeholders = [
    "Search by University",
    "Search by Location",
    "Search by Property",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("placeholder-fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger fade-out effect
      setFadeClass("placeholder-fade-out");

      setTimeout(() => {
        // Update placeholder text and trigger fade-in
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        setFadeClass("placeholder-fade-in");
      }, 500);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <div>
      {/* The rest of your component */}
      <div className="h-[500px] sm:h-[650px] md:h-[550px] relative">
        <div className="absolute inset-0 z-10 flex flex-col gap-7 justify-center items-center">
          {/* Heading Section */}
          <div className="text-center px-4 md:px-20">
            <p className="text-white text-[25px] sm:text-[40px] md:text-[45px] lg:text-[50px] font-bold">
              Find Your Perfect Home, Hassle Free
            </p>
          </div>

          {/* Subheading Section */}
          <div className="px-4 sm:px-10 md:px-20">
            <p className="text-white text-[14px] sm:text-sm md:text-base text-center">
              Simplifying apartment hunting for students and renters with
              transparency, reliability, and ease.
            </p>
          </div>

          {/* Feature Tags */}
          <div className="flex gap-5 flex-wrap justify-center whitespace-nowrap sm:gap-2">
            <div className="bg-[#F4EBFF] rounded-lg px-2 py-1 md:py-2 md:px-4">
              <p className="text-[12px] text-primaryPurple sm:text-primaryPurple font-normal sm:text-[14px]">
                No Unnecessary Fees
              </p>
            </div>
            <div className="bg-[#F4EBFF] rounded-lg px-2 py-1 md:py-2 md:px-4">
              <p className="text-[12px] text-primaryPurple sm:text-primaryPurple font-normal sm:text-[14px]">
                Renter Protection
              </p>
            </div>
            <div className="bg-[#F4EBFF] rounded-lg px-2 py-1 md:py-2 md:px-4">
              <p className="text-[12px] text-primaryPurple sm:text-primaryPurple font-normal sm:text-[14px]">
                Student Accommodation
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex items-center w-full md:w-3/5 px-4 md:px-0">
            <div className="flex flex-grow bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
              {/* Search Input with Animated Placeholder */}
              <input
                  className={`flex-grow p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-700 transition-all duration-500 ${fadeClass}`}
                  type="text"
                  placeholder={placeholders[placeholderIndex]} // Dynamically updated placeholder
              />
              {/* Search Button */}
              <button
                  className="flex items-center justify-center bg-purple-800 text-white px-4 md:px-6 hover:bg-purple-900 transition-colors">
                <IconSearch className="h-5 w-5 md:h-6 md:w-6"/>
              </button>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <Carousel
            loop
            plugins={[autoplay.current]}
            className="h-[500px] sm:h-[650px] bg-red-400"
        >
          {image_list.map((e, index) => (
              <Carousel.Slide
                  key={index}
                  className="relative h-[500px] sm:h-[650px]"
              >
                <div className="absolute h-full w-full bg-black z-20 bg-opacity-70"></div>
                <img
                    src={e}
                    alt="Carousel Slide"
                    className="w-full h-full object-cover rounded-none"
                />
              </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};


export default Body;
