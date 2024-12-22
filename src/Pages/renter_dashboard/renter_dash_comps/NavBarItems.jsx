import { Button, Group, NavLink, Stack, Text } from "@mantine/core";
import { NavLink as Link } from "react-router-dom";
import {
	IconHeart,
	IconHistory,
	IconHome,
	IconLocationBolt,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import React from "react";

function NavBarItems() {
	return (
		<div className="flex flex-col  h-full py-2 gap-2">
			<div className="p-2 flex items-center gap-2">
				<IconUser size={20}/>
				<Text>Jon Doe</Text>
			</div>

			<Link
				to={"/renter/dashboard/home"}
				className={({ isActive }) => {
					return `flex p-2 gap-2 items-center text-sm  ${
						isActive ? "bg-neutral-200 text-neutral-800" : "bg-none"
					}`;
				}}
			>
				<IconHome size={20} />
				Home
			</Link>
			<Link
				to={"/renter/dashboard/transactions"}
				className={({ isActive }) => {
					return `flex p-2 gap-2 items-center text-sm  ${
						isActive ? "bg-neutral-200 text-neutral-800" : "bg-none"
					}`;
				}}
			>
				<IconHistory size={20} />
				Transaction History
			</Link>
			<Link
				to={"/renter/dashboard/popular"}
				className={({ isActive }) => {
					return `flex p-2 gap-2 items-center text-sm  ${
						isActive ? "bg-neutral-200 text-neutral-800" : "bg-none"
					}`;
				}}
			>
				<IconLocationBolt size={20} />
				popular
			</Link>

			<Stack className="mt-auto pb-4">
				<NavLink
					label="Transaction History"
					leftSection={<IconSettings />}
				/>
			</Stack>
		</div>
	);
}

export default NavBarItems;
