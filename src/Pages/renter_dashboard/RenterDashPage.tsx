import { AppShell, Box, Container, Divider, Stack, Title } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import NavBarItems from "./renter_dash_comps/NavBarItems";
import { useDisclosure } from "@mantine/hooks";
import SearchPage from "./renter_dash_pages/SearchPage";

function RenterDashPage() {
	const [opened, setOpened] = useDisclosure();
	return (
		<AppShell
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Navbar className="">
				<div className="h-full flex flex-col gap-2">
						<Title order={1} className="text-purple-600 h-20 flex items-center px-2">Rentit</Title>
					<Divider />
					<NavBarItems />
				</div>
			</AppShell.Navbar>
			<AppShell.Main className="">
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
