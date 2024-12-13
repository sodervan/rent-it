import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";

function Routing() {
	return (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			/>
			<Route
				path="/auth/renter/signup"
				element={<SignUp />}
			/>
			<Route
				path="/auth/renter/signin"
				element={<SignIn />}
			/>
		</Routes>
	);
}

export default Routing;
