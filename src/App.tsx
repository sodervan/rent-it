
import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import { MantineProvider } from "@mantine/core";
// import Routing from "./Routing.jsx";
import '@mantine/core/styles.css';
import "../src/styles/tailwind.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
const app = () => {
	return (
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<Routing />
			</QueryClientProvider>
		</MantineProvider>
	);
};

export default app;

