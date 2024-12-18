import Autoplay from "embla-carousel-autoplay";
import { IconSearch } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import "@mantine/carousel/styles.css";
const image_list = [
	"https://res.cloudinary.com/dmlgns85e/image/upload/v1724857270/pexels-binyaminmellish-106399_ana2ff.jpg",
	"https://res.cloudinary.com/dmlgns85e/image/upload/v1724858745/ultimate-guide-to-home-exterior-design_leq7ty.jpg",
	"https://res.cloudinary.com/dmlgns85e/image/upload/v1724858656/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b_rzafww.jpg",
];
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
const Body = ({ userId }: { userId: string | null }) => {
	// Use useEffect to hide the toast after 5 seconds
	const autoplay = useRef(Autoplay({ delay: 5000 }));
	return (
		<div>
			{/* The rest of your component */}
			<div className="h-[400px]  sm:h-[550px]  md:h-[550px] relative">
				<div className="absolute inset-0 z-10 flex flex-col gap-7 justify-center items-center">
					<div className="text-center px-4 md:px-20">
						<p className="text-white text-[25px] sm:text-[40px] md:text-[45px] lg:text-[50px] font-bold">
							Find Your Perfect Home, Hassle Free
						</p>
					</div>
					<div className="px-4 sm:px-10 md:px-20">
						<p className="text-white text-[14px] sm:text-sm md:text-base text-center">
							Simplifying apartment hunting for students and
							renters with transparency, reliability, and ease.
						</p>
					</div>
					<div className="flex gap-5 flex-wrap justify-center whitespace-nowrap sm:gap-2">
						<div className="bg-[#F4EBFF] rounded-lg px-2 py-1 md:py-2 md:px-4">
							<p className="text-[12px] text-primaryPurple sm:text-primaryPurple font-normal sm:text-[14px]">
								No Unnecessary Fees
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
						<Button
						size="compact-md"
						
							leftSection={<IconSearch />}
							className=" m-0 !bg-purple-800 rounded-none !rounded-l-none !h-full"
						>
							Search
						</Button>
					</div>
				</div>
				<Carousel
					loop
					plugins={[autoplay.current]}
					className="h-[500px] max  sm:h-[650px]  bg-red-400"
				>
					{image_list.map((e) => {
						return (
							<Carousel.Slide
								className={
									" relative h-[500px] max  sm:h-[650px]"
								}
							>
								<div className="absolute h-full w-full bg-black z-20 bg-opacity-70"></div>
								<img
									src={e}
									alt="..."
									className="w-full h-full object-cover rounded-none"
								/>
							</Carousel.Slide>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
};

export default Body;
