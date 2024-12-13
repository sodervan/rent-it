import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconLock, IconUser } from "@tabler/icons-react";
import React from "react";
import { NavLink } from "react-router-dom";

function SignIn() {
	return (
		<div className="container mx-auto">
			<form className=" flex flex-col gap-2 px-4 md:px-0 max-w-[500px] mx-auto  h-[calc(100dvh-120px)] justify-center">
				<h1 className="text-2xl font-bold text-center">
					Welcome to RentIt
				</h1>
				<p className="text-neutral-600 text-lg text-center">
					Create a new account
				</p>
				<div className="py-2 flex items-center gap-2">
					<IconUser />
					<Input
						type="email"
						placeholder="email"
					/>
				</div>
				<div className="py-2 flex items-center gap-2">
					<IconLock />
					<Input
						type="password"
						placeholder="password"
					/>
				</div>
				<div className="py-1 flex justify-end ">
					<NavLink
						to={"#"}
						className={"text-purple-600"}
					>
						Forgot password
					</NavLink>
				</div>
				<div className="py-2">
					<Button
						type="submit"
						className="w-full"
					>
						Login
					</Button>
				</div>
				<div className={"text-center"}>or</div>
				<div className="py-2">
					<Button className="w-full">Sign In with Google</Button>
				</div>
				<div className="py-2">
					<p className="text-md text-neutral-600">
						Don't have an account{"  "}
						<NavLink
							to={"/auth/renter/signup"}
							className={"text-purple-600 underline"}
						>
							Sign up
						</NavLink>
					</p>
				</div>
			</form>
		</div>
	);
}

export default SignIn;
