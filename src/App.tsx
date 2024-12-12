import Routing from "./routes/Routing";
import NavBar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
			<BrowserRouter>
				<NavBar />
				<Routing />
			</BrowserRouter>
	);
}

export default App;
