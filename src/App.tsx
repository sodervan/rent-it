import Routing from "./routes/Routing";
import NavBar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ToastContainer />
				<NavBar />
				<Routing />
				<Footer />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
