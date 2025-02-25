import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../src/styles/tailwind.css";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TokenProvider } from "../TokenContext.js";
import useTokenData from "../TokenHook"; // Import useToken

let config: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
};
const queryClient = new QueryClient(config);

const App = () => {
	const { tokenData } = useTokenData();

	return (
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<TokenProvider>
					<ToastContainer />
					<Routing />
				</TokenProvider>
			</QueryClientProvider>
		</MantineProvider>
	);
};

export default App;
