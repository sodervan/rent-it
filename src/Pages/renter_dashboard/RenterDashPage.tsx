import { AppShell, Box, Burger, Container, Divider, Stack, Title } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import NavBarItems from "./renter_dash_comps/NavBarItems";
import { useDisclosure } from "@mantine/hooks";
import SearchPage from "./renter_dash_pages/SearchPage";
import Popular from "./renter_dash_pages/Popular";
import { useAtom } from "jotai";
import { sideBarAtom } from "@/store/store";
import RenterSettings from "./renter_dash_pages/RenterSettings";

function RenterDashPage() {
	// const [opened, setOpened] = useDisclosure();
	const [opened, setOpened] = useAtom(sideBarAtom);
	return (
		<AppShell
			navbar={{
				width: 200,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Navbar className="">
				<div className="flex items-center ">
					<Title
						order={1}
						className="text-purple-600 h-20 flex items-center px-2"
					>
						Rentit
					</Title>
					<div className="ml-auto mr-2 md:hidden">
						<Burger
							opened={opened}
							onClick={() => {
								setOpened(!opened);
							}}
						/>
					</div>
				</div>
				<Divider />
				<NavBarItems />
			</AppShell.Navbar>
			<AppShell.Main className="">
				<Routes>
					<Route
						path="/home"
						element={<SearchPage />}
					/>
					<Route
						path="/popular"
						element={<Popular />}
					/>
					<Route
						path="/settings"
						element={<RenterSettings />}
					/>
				</Routes>
			</AppShell.Main>
		</AppShell>
	);
}

export default RenterDashPage;
