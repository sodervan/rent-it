import Routing from "./routes/Routing";
import NavBar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			<NavBar />
			<Routing />
			<Footer />
		</BrowserRouter>
	);
}

export default App;
