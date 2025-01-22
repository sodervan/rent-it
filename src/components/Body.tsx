import { Carousel } from "@mantine/carousel";
import { IconSearch } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";
import { useEffect, useState } from "react";

const Body = ({ userId }: { userId: string | null }) => {
  const [currentText, setCurrentText] = useState(0);

  const changingTexts = [
    { main: "Dream Home", sub: "where comfort meets style" },
    { main: "Student Hub", sub: "tailored for academic success" },
    { main: "Perfect Space", sub: "designed around your lifestyle" },
    { main: "Ideal Location", sub: "in the heart of opportunity" },
  ];

  const image_list = [
    "https://res.cloudinary.com/dmlgns85e/image/upload/v1724857270/pexels-binyaminmellish-106399_ana2ff.jpg",
    "https://res.cloudinary.com/dmlgns85e/image/upload/v1724858745/ultimate-guide-to-home-exterior-design_leq7ty.jpg",
    "https://res.cloudinary.com/dmlgns85e/image/upload/v1724858656/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b_rzafww.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % changingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { text: "Verified Properties", color: "bg-purple-50 text-purple-700" },
    { text: "Renter Protection", color: "bg-blue-50 text-blue-700" },
    { text: "0% Hidden Fees", color: "bg-red-50 text-red-700" },
  ];

  return (
    <div>
      <div className="h-[500px] sm:h-[650px] md:h-[550px] relative overflow-hidden">
        {/* Enhanced Text Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col gap-8 justify-center items-center">
          <div className="text-center px-4 md:px-20">
            <h1 className="text-white text-[25px] sm:text-[40px] md:text-[45px] lg:text-[55px] font-bold leading-tight">
              Discover Your{" "}
              <span className="relative inline-block bg-white rounded-lg px-3 transform transition-all duration-300">
                <span className="text-purple-400 absolute top-0 left-0 animation-fade-out">
                  {
                    changingTexts[
                      (currentText - 1 + changingTexts.length) %
                        changingTexts.length
                    ].main
                  }
                </span>
                <span className="text-purple-400 animation-fade-in">
                  {changingTexts[currentText].main}
                </span>
              </span>
            </h1>
            {/*<p className="text-purple-200 text-lg sm:text-xl mt-2 animation-fade-in">*/}
            {/*  {changingTexts[currentText].sub}*/}
            {/*</p>*/}
          </div>

          <div className="px-4 sm:px-10 md:px-20 max-w-3xl">
            <p className="text-gray-200 text-[14px] sm:text-base md:text-lg text-center leading-relaxed">
              Experience a new standard in property search. Find your next home
              with confidence through our verified listings and transparent
              process.
            </p>
          </div>

          {/* Enhanced Feature Tags */}
          <div className="flex gap-4 flex-wrap justify-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} rounded-lg px-4 py-2.5 md:px-6 md:py-3 
                  transform hover:scale-105 transition-all duration-300 
                  shadow-sm hover:shadow-md`}
              >
                <p className="text-[13px] sm:text-[15px] font-semibold">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative w-full max-w-4xl px-4 md:px-0 hidden md:block">
            <div
              className="flex justify-between items-center bg-white/95 backdrop-blur-sm
              border border-purple-100 rounded-full shadow-xl p-2 hover:shadow-2xl
              transition-all duration-500"
            >
              <input
                className="flex-grow px-8 py-4 placeholder-gray-400 text-gray-700 rounded-full
                  focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300
                  bg-transparent"
                type="text"
                placeholder="Search by university, city, or property type..."
              />
              <button
                className="flex items-center justify-center h-[54px] w-[54px] rounded-full
                bg-gradient-to-r from-purple-600 to-purple-700 text-white
                hover:from-purple-700 hover:to-purple-800 transition duration-300
                shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <IconSearch className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel */}
        <Carousel
          height="100%"
          loop
          className="h-[500px] sm:h-[650px] md:h-[550px]"
          withIndicators
          styles={{
            indicator: {
              width: "12px",
              height: "12px",
              transition: "all 250ms ease",
              "&[data-active]": {
                width: "24px",
                opacity: 1,
                backgroundColor: "#7C3AED",
              },
            },
          }}
        >
          {image_list.map((url, index) => (
            <Carousel.Slide key={index} className="h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 z-10 h-full" />
              <img
                src={url}
                alt={`Property Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>

      <style jsx>{`
        .animation-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }

        .animation-fade-out {
          animation: fadeOut 0.5s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Body;
