import { IconHome } from "@tabler/icons-react";
import { Link } from "react-router-dom";

let navLinkx = [
	{
		name: "Home",
		to: "#",
		Icon: IconHome,
	},
	{
		name: "History",
		to: "#",
		Icon: IconHome,
	},
	{
		name: "Bookings",
		to: "#",
		Icon: IconHome,
	},
	{
		name: "Favorites",
		to: "#",
		Icon: IconHome,
	},
];
function NavBarLinks() {
	return (
		<div className="flex flex-col gap-2">
			<div></div>
			{navLinkx.map((e) => {
				return (
					<Link
						to={e.to}
						className="duration-150 inline-flex gap-2 items-center text-lg hover:bg-purple-500 p-2 rounded-md hover:bg-opacity-50"
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
