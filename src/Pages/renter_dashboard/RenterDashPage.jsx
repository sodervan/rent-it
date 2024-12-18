import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./renter_dash_comps/SearchPage";
import { AppShell, Divider, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBarItems from "./renter_dash_comps/NavBarItems";

function RenterDashPage() {
	const [opened, { toggle }] = useDisclosure();
	return (
		<AppShell
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Navbar>
				<div className="h-20 items-center  flex pl-2">
					<Title order={2}>Rentit</Title>
				</div>
				<Divider />
				<NavBarItems />
			</AppShell.Navbar>
			<AppShell.Main>
				<Routes>
					<Route
						path="/"
						element={<SearchPage />}
					/>
				</Routes>
			</AppShell.Main>
		</AppShell>
	);
}

export default RenterDashPage;
