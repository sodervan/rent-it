import { Button, Center, Group, NavLink, Stack, Text } from "@mantine/core";
import { NavLink as Link, useNavigate } from "react-router-dom";
import {
	IconHeart,
	IconHistory,
	IconHome,
	IconLocationBolt,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import React from "react";

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

	let navigate = useNavigate()
	return (
		<div className="flex flex-col  h-full py-2 gap-2 px-2">
			{links.map(({ name, path, icon: Icon }) => {
				return (
					<Link
						to={path}
						className={({ isActive }) => {
							return `flex gap-1 text-md duration-200 items-center p-2 rounded-md ${
								isActive
									? "bg-gray-300 text-black"
									: "text-gray-800 "
							}`;
						}}
					>
						<Icon size={18} />
						{name}
					</Link>
				);
			})}
			<div className="mt-auto">
				<div className="p-2 flex items-center gap-1">
					<div className="p-2 bg-deep-orange-500 rounded-full aspect-square ">
						<IconUser
							size={18}
							className="text-white"
						/>
					</div>
					<Text lineClamp={1} className="!text-sm">Jon Doe</Text>
					<Button p={0} variant="transparent" className="!w-fit  ml-auto" onClick={
	()=>{
		navigate("/renter/dashboard/settings")
	}
					}>
						<IconSettings  size={18} />
					</Button>
				</div>
			</div>
			{/* <Stack className="mt-auto pb-4">
				<NavLink
					label="Transaction History"
					leftSection={<IconSettings />}
				/>
			</Stack> */}
		</div>
	);
}

export default NavBarItems;
