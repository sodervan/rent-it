import { AppShell, Burger, Divider, Title } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import NavBarItems from "./renter_dash_comps/NavBarItems";
import Popular from "./renter_dash_pages/Popular";
import { useAtom } from "jotai";
import { sideBarAtom } from "@/store/store";
import RenterSettings from "./renter_dash_pages/RenterSettings";
import TransactionHistory from "./renter_dash_pages/TransactionHistory";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTokenData from "../../../TokenHook"; // Import the useTokenData hook
import RenterHomePage from "./renter_dash_pages/RenterHomePage";
import SearchPage from "./renter_dash_pages/SearchPage";
import RenterFavorites from "./renter_dash_pages/RenterFavorites";

function RenterDashPage() {
	const { tokenData, isLoading, clearToken } = useTokenData(); // Get clearToken from the hook
	const navigate = useNavigate();
	let toks: any = tokenData;
	useEffect(() => {
		if (!isLoading && (!tokenData || toks.role !== "user")) {
			navigate("/renter/login");
		}
		// console.log(tokenData);
		navigate("/renter/dashboard/home", { replace: true });
	}, [tokenData, isLoading]);

	const [opened, setOpened] = useAtom(sideBarAtom);

	// Updated logout function
	const handleLogout = () => {
		clearToken(); // Call the clearToken function to clear the token and cookie
		window.location.href = "/renter/login";
	};

	return (
		<AppShell
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Navbar className="">
				<div className="flex items-center">
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
				{/* <div style={{ position: "relative", top: 16, right: 16 }}>
					<Button
						color="red"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div> */}
				<Routes>
					<Route
						path="/home"
						element={<RenterHomePage />}
					/>
					<Route
						path="/popular"
						element={<Popular />}
					/>
					<Route
						path="/settings"
						element={<RenterSettings />}
					/>
					<Route
						path="/transactions"
						element={<TransactionHistory />}
					/>
					<Route

						path="/favourites"
						element={<RenterFavorites/>}
					/>
          <Route
						path="/search"
						element={<SearchPage/>}
					/>
				</Routes>
			</AppShell.Main>
		</AppShell>
	);
}

export default RenterDashPage;
