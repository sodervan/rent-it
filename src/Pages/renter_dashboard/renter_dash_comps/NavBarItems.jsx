import { Avatar, Button, Group, NavLink, Stack, Text } from "@mantine/core";
import { IconHeart, IconHistory, IconHome, IconSettings } from "@tabler/icons-react";
import React from "react";

function NavBarItems() {
	return (
		<Stack className="px-2 gap-2 h-full">
			<Stack p={"md"}>
				<Group className="gap-2">
					<Avatar />
					<Text>Jon Doe</Text>
				</Group>
			</Stack>
			<NavLink
				label="Home"
				leftSection={<IconHome />}
			/>
			<NavLink
				label="Transaction History"
				leftSection={<IconHistory />}
			/>
			
			<NavLink
				label="Booking History"
				leftSection={<IconHistory />}
			/>
			<NavLink
				label="Saved"
				leftSection={<IconHeart />}
			/>

			<Stack className="mt-auto pb-4">
				<NavLink
					label="Transaction History"
					leftSection={<IconSettings />}
				/>
			</Stack>
		</Stack>
	);
}

export default NavBarItems;
