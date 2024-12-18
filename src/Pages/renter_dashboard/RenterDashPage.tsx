import { AppShell } from "@mantine/core";
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
			<AppShell.Navbar>
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
