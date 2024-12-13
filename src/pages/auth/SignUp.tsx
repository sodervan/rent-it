import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { IconLock, IconMail, IconUser } from "@tabler/icons-react";
import React, { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
const notify = () => toast("Wow so easy !");
function SignUp() {
	let onSubmit = (e: any) => {
		e.preventDefault();
		let password = e.target[3].value;
		let formField = {
			first_name: e.target[0].value,
			last_name: e.target[1].value,
			email: e.target[2].value,
			password,
			student: e.target[5].value == "on" ? true : false,
		};
		let conirm_pass = e.target[4].value;
		if (conirm_pass != password) {
			alert("password mismatch");
			return;
		}
		notify();
		// console.log(formField);
	};
	let [checked, setChecked] = useState<boolean>(false);
	return (
		<div className="mt-4">
			<form
				onSubmit={onSubmit}
				className="container mx-auto flex flex-col gap-2  h-[calc(100dvh-120px)] justify-center w-full max-w-[500px] px-4 md:px-0" 
			>
				<h1 className="text-2xl font-bold text-center">
					Welcome to RentIt
				</h1>
				<p className="text-neutral-600 text-lg text-center">
					Create a new account
				</p>
				<div className="flex items-center gap-2 py-2">
					<IconUser />
					<Input placeholder="First Name" />
				</div>

				<div className="flex items-center gap-2 py-2">
					<IconUser />
					<Input placeholder="Last Name" />
				</div>
				<div className="flex items-center gap-2 py-2">
					<IconMail />
					<Input
						placeholder="Email"
						type="email"
					/>
				</div>
				<div className="flex items-center gap-2 py-2">
					<IconLock />
					<Input
						placeholder="Enter Password"
						type="password"
					/>
				</div>
				<div className="flex items-center gap-2 py-2">
					<IconLock />
					<Input
						placeholder="Confirm Password"
						type="password"
					/>
				</div>
				<div className="flex items-center gap-2 py-2 pl-2">
					<Checkbox /> <p>I am a student</p>
				</div>
				<div className="flex items-center gap-2 py-2 pl-2">
					<Checkbox
						checked={checked}
						onClick={() => {
							setChecked(!checked);
						}}
					/>{" "}
					<p>I have read terms and conditions</p>
				</div>
				<div>
					<Button
						className="w-full"
						disabled={!checked}
						type="submit"
					>
						Sign Up
					</Button>
				</div>
				<div className="py-2">
					<p className="text-lg">
						Already hava an account{" "}
						<NavLink
							to={"/auth/renter/signin"}
							className={"text-purple-600 underline"}
						>
							Sign In
						</NavLink>
					</p>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
