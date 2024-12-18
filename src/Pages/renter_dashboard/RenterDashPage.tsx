import { AppShell, Box, Container, Divider, Stack, Title } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import NavBarItems from "./renter_dash_comps/NavBarItems";
import { useDisclosure } from "@mantine/hooks";
import SearchPage from "./renter_dash_comps/SearchPage";

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
					<div className="h-20 bg-red-200 ">
						<p>Rentit</p>
					</div>
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
