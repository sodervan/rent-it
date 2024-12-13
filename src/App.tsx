import Routing from "./routes/Routing";
import NavBar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			<NavBar />
			<Routing />
		</BrowserRouter>
	);
}

export default App;
