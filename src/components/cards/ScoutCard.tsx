import {
	IconHeart,
	IconList,
	IconMapPin,
	IconShare,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ScoutCard() {
	return (
		<NavLink
			to={"/"}
			className="w-[350px] h-[380px] ml-1 flex-shrink-0 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl"
		>
			<div className="h-full w-full bg-red-200 rounded-md relative">
				<div className="absolute h-12 bg-green-300 w-full flex items-center px-2">
					<Button className="p-2 text-sm rounded-lg">
						single Man
					</Button>
					<div className="ml-auto flex gap-2 items-center">
						<Button className="aspect-square rounded-full p-2">
							<IconHeart />
						</Button>
						<Button className="aspect-square rounded-full p-2">
							<IconShare />
						</Button>
					</div>
				</div>
			</div>
			<div className="mt-auto flex flex-col gap-2 p-2">
				<h2 className="">Lekki View Apartments</h2>

				<div className="flex items-center gap-2">
					<p className="text-neutral-500">N1,500,000</p>
					<div className="px-1 rounded-md bg-purple-200 text-sm">
						weekly
					</div>
				</div>
				<div className="flex items-center text-sm gap-1">
					<IconList size={18} color="red" /> <p>Units Available: 5</p>
				</div>
				<div className="flex items-center text-sm gap-1">
					<IconMapPin size={18} color="red" />
					<p>12 Lekki-Epe Expressway, Lagos</p>
				</div>
			</div>
		</NavLink>
	);
}

export default ScoutCard;
