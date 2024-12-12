import { NavLink } from "react-router-dom";
import { nav_routes } from "../page_data/nav_data";
import { Button } from "./ui/button";

function Navbar() {
	return (
		<div className="flex h-16 border-b px-2 ">
			<div className="container flex items-center mx-auto">
				<h1 className="">rentit</h1>
				<div className="ml-auto flex gap-2 px-2 items-center" >
					{nav_routes.map(({ name, to }) => (
						<NavLink
							to={to}
							key={name}
						>
							{name}
						</NavLink>
					))}
          <Button>Sign Up</Button>
          <Button>Login</Button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
