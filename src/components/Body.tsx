import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem,CarouselPrevious,CarouselNext } from "@/components/ui/carousel";

const image_list = [
	"https://res.cloudinary.com/dmlgns85e/image/upload/v1724857270/pexels-binyaminmellish-106399_ana2ff.jpg",
	"https://res.cloudinary.com/dmlgns85e/image/upload/v1724858745/ultimate-guide-to-home-exterior-design_leq7ty.jpg",
	"https://res.cloudinary.com/dmlgns85e/image/upload/v1724858656/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b_rzafww.jpg",
];
const Body = ({ userId }: { userId: string }) => {
	const [showToast, setShowToast] = useState(true); // State to control toast visibility

	// Use useEffect to hide the toast after 5 seconds
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowToast(false);
		}, 5000);

		// Cleanup the timeout if the component unmounts
		return () => clearTimeout(timeout);
	}, []); // Empty dependency array ensures this runs once on mount

	return (
		<div>
			{/* The rest of your component */}
			<div className="h-[400px] mt-20 sm:mt-[40px] sm:h-[550px] md:mt-[75px] md:h-[550px] relative">
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
						<div className="flex bg-primaryPurple w-[20%] py-3 px-4 rounded-r-[11px] items-center justify-center gap-1">
							<div></div>
						</div>
					</div>
				</div>
				<Carousel className="">
					<CarouselContent
						className={"h-[400px]   sm:h-[550px]  bg-red-400"}
					>
						{image_list.map((e) => {
							return (
								<CarouselItem
									className={"bg-green-300 relative"}
								>
									<div className="absolute h-full w-full bg-black z-20 bg-opacity-70"></div>
									<img
										src={e}
										alt="..."
										className="w-full h-full object-cover rounded-none"
									/>
								</CarouselItem>
							);
						})}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};

export default Body;
