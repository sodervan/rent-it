import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Wrappers from "./Wrappers.jsx";
document.title = "Rentit"
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Wrappers/>
	</StrictMode>
);
