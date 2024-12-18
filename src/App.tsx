
import { ToastContainer } from "react-toastify";
import Routing from "./Routing";
import { MantineProvider } from "@mantine/core";
// import Routing from "./Routing.jsx";
import '@mantine/core/styles.css';
const app = () => {
	return (
		<MantineProvider>
			<ToastContainer />
			<Routing />
		</MantineProvider>
	);
};

export default app;

