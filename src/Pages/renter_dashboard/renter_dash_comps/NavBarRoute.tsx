import { useState } from "react";
import NavBarLinks from "./NavBarLinks";

function NavBarRoute() {
	let [currentScreen, setCurrentScreen] = useState<0 | 1>(0);

	return (
		<div className="duration-0">
			<NavBarLinks />
		</div>
	);
}

export default NavBarRoute;
