import { CardType } from "@/lib/types";
import { Button, Text } from "@mantine/core";
import {
	IconCurrencyNaira,
	IconHeart,
	IconMapPin,
	IconShare,
	IconTextResize,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

function SearchCard(e: CardType) {
	return (
		<Link
			to={"#"}
			className="w-[182px] sm:w-[252px] md:w-[300px] flex flex-col gap-2 shadow-md pb-2 "
		>
			<div className="w-full aspect-[12/10] rounded-lg relative  overflow-hidden isolate">
				<div className="absolute flex  p-2 w-full items-center gap-2 z-10">
					<p className="text-xs p-1 bg-blue-gray-100 text-blue-gray-700 h-fit  rounded-full">
						single man
					</p>
					<button className="btn btn-primary ml-auto ">
						<IconHeart size={16} />
					</button>
					<button className="btn btn-primary">
						<IconShare size={16} />
					</button>
				</div>
				<div className="absolute bottom-0 flex w-full p-1 z-10">
					<p className="text-xs p-1 bg-blue-gray-100 rounded-lg mx-auto text-blue-gray-700">
						<span className="font-bold">{e.unitsBooked}</span>{" "}
						renters have booked this listing
					</p>
				</div>
				<img
					src={e.pictures[0].cloudinaryUrl}
					alt=""
					className="w-full aspect-[12/10] duration-200 hover:scale-105"
				/>
			</div>
			<div className="flex flex-col gap-2 px-2 ">
				<h2 className="font-bold">{e.title}</h2>
				<div className="flex gap-2 items-center">
					<span className=" flex items-center text-gray-500 text-sm">
						<IconCurrencyNaira size={18} />
						{e.baseCost}{" "}
						<span className="text-xs bg-blue-gray-100 text-black rounded-md p-1 ml-2">
							{e.paymentDuration}
						</span>
					</span>
				</div>
				<span className="flex items-center gap-1 text-sm">
					<IconTextResize
						size={16}
						color="red"
					/>
					units Availabe: {e.unitsLeft}
				</span>
				<span className="flex items-center gap-1 ">
					<IconMapPin
						size={16}
						color="red"
					/>
					<Text
						className="text-sm"
						lineClamp={1}
					>
						{e.location.streetAddress}
					</Text>
				</span>
			</div>
		</Link>
	);
}

export default SearchCard;
