import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import { nav_routes } from "../page_data/nav_data";
import { Button } from "./ui/button";

function Navbar() {
	let navigation  =useNavigate()
	
	return (
		<div className="flex h-16 border-b px-2 ">
			<div className="container flex items-center mx-auto">
				<h1 className="text-xl font-bold text-purple-600">Rentit</h1>
				<div className="ml-auto  gap-4 px-2 items-center hidden md:flex">
					{nav_routes.map(({ name, to }) => (
						<NavLink
							to={to}
							key={name}
						>
							{name}
						</NavLink>
					))}
					<Button
						className="bg-purple-600"
						onClick={()=>{
							navigation("/auth/renter/signup")
						}}
					>
						Sign Up
					</Button>
					<Button variant={"outline"} onClick={()=>{
							navigation("/auth/renter/signin")

					}}>Login</Button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
