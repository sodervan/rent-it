import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
	IconHistory,
	IconHome,
	IconLocationBolt,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import NavBarRoute from "./NavBarRoute";

const links = [
	{
		path: "/renter/dashboard/home",
		name: "Home",
		icon: IconHome,
	},
	{
		path: "/renter/dashboard/popular",
		name: "Popular",
		icon: IconLocationBolt,
	},
	{
		path: "/renter/dashboard/transactions",
		name: "Transactions",
		icon: IconHistory,
	},
];
function NavBarItems() {
	let navigate = useNavigate();

	return (
		<div className="flex flex-col  h-full py-2 gap-2 px-2 b">
			<NavBarRoute />
			<div className="mt-auto"></div>

			<div
				classNam
				e="mt-auto bg-red-200"
			>
				<div className="p-2 flex items-center gap-1 o">
					<div className="p-2 bg-deep-orange-500 rounded-full aspect-square ">
						<IconUser
							size={18}
							className="text-white"
						/>
					</div>
					<Text
						lineClamp={1}
						className="!text-sm"
					>
						Jon Doe
					</Text>
					<Button
						p={0}
						variant="transparent"
						className="!w-fit  ml-auto"
						onClick={() => {
							navigate("/renter/dashboard/settings");
						}}
					>
						<IconSettings size={18} />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NavBarItems;
