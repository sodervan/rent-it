import "@mantine/core/styles.css";
import {
	AppShell,
	Button,
	Center,
	Group,
	MantineProvider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BrowserRouter, NavLink, RouterProvider } from "react-router-dom";
import Routing from "./routes/Routing";
import { nav_routes } from "./page_data/nav_data";
function App() {
	return (
		<MantineProvider>
			<BrowserRouter>
				<AppShell
					header={{ height: 60 }}
					padding="xs"
				>
					<AppShell.Header>
						<div className="h-full w-full flex ">
							<Center className="ml-2 font-bold text-xl">
								RentIT
							</Center>
							<Group className="ml-auto   px-2 ">
								{nav_routes.map(({ name, to }) => {
									return <NavLink to={to}>{name}</NavLink>;
								})}
								<Button>Sign Up</Button>
								<Button variant="outline">Login</Button>
							</Group>
						</div>
					</AppShell.Header>
					<AppShell.Main>
						<Routing />
					</AppShell.Main>
				</AppShell>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;
