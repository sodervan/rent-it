import { NavLink } from "react-router-dom";
import { nav_routes } from "../page_data/nav_data";
import { Button } from "./ui/button";

function Navbar() {
	return (
		<div className="flex h-16 border-b px-2 ">
			<div className="container flex items-center mx-auto">
				<h1 className="text-xl font-bold text-purple-600">Rentit</h1>
				<div className="ml-auto flex gap-4 px-2 items-center">
					{nav_routes.map(({ name, to }) => (
						<NavLink
							to={to}
							key={name}
						>
							{name}
						</NavLink>
					))}
					<Button className="bg-purple-600">Sign Up</Button>
					<Button variant={"outline"}>Login</Button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
