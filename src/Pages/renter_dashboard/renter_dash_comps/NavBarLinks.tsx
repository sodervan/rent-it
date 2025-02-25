import {
	IconBookmark,
	IconHeart,
	IconHistory,
	IconHome,
	IconLocationBolt,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

let navLinkx = [
	{
		name: "Home",
		to: "/renter/dashboard/home",
		Icon: IconHome,
	},
	{
		name: "Nearby",
		to: "#",
		Icon: IconLocationBolt,
	},
	{
		name: "History",
		to: "#",
		Icon: IconHistory,
	},
	{
		name: "Bookings",
		to: "#",
		Icon: IconBookmark,
	},
	{
		name: "Favorites",
		to: "/renter/dashboard/favourites",
		Icon: IconHeart,
	},
];
function NavBarLinks() {
	return (
		<div className="flex flex-col gap-3">
			{navLinkx.map((e) => {
				return (
					<Link
						key={`side_nav${e.name}`}
						to={e.to}
						className="duration-150 inline-flex gap-2 items-center hover:bg-purple-500 p-2 text-md rounded-md hover:bg-opacity-50"
					>
						<e.Icon size={22} />
						{e.name}
					</Link>
				);
			})}
		</div>
	);
}

export default NavBarLinks;
