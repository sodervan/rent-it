import { LISTINGITEM } from "@/lib/api";
import { Pill } from "@mantine/core";
import { IconCurrencyNaira, IconTextResize } from "@tabler/icons-react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function QueryCard(props: LISTINGITEM) {
	return (
		<Link
			to={"#"}
			className="hover:scale-95 duration-150 w-full max-w-[300px] shadow-lg bg-white border border-gray-500 rounded-md border-opacity-60"
		>
			<div className="w-full h-[200px]">
				<img
					loading="lazy"
					src={props.pictures[0].imageUrl}
					className="w-full h-full rounded-md"
					alt=""
				/>
			</div>
			<div className="flex flex-col gap-2 px-2 mt-4 pb-4">
				<h2 className="font-bold">{props.title}</h2>
				<div className="flex gap-2">
					<p className="opacity-70 inline-flex ">
						<IconCurrencyNaira size={22} />
						{props.baseCost}
					</p>
					<Pill>{props.paymentDuration}</Pill>
				</div>
				<p className="inline-flex text-sm gap-1">
					<IconTextResize
						size={16}
						color="red"
					/>
					Units Available: {props.units}
				</p>
				<p className="text-sm inline-flex gap-1">
					<MapPin
						size={16}
						color="red"
					/>
					{props.location.streetAddress}
				</p>
			</div>
		</Link>
	);
}

export default QueryCard;
