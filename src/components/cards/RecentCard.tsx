import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { NavLink } from "react-router-dom";

function RecentCard() {
	return (
		<NavLink
			to={"/"}
			className="h-48 w-[252px] flex-shrink-0 shadow-lg gap-2 flex flex-col p-2 hover:scale-105"
		>
			<div className="h-full w-full relative">
				{/* <img className="h-full w-full"  /> */}
				<div className="absolute p-2 rounded-full bg-neutral-200 bottom-0">
					<IconSearch
						size={18}
						className=""
					/>
				</div>
			</div>
			<h3 className="mt-auto">Lekki Conservation Centre</h3>
			<p className="text-neutral-500">category: Apartment</p>
		</NavLink>
	);
}

export default RecentCard;
