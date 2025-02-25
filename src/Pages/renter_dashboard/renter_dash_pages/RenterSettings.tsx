import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData, USERDETAILSPAYLOAD } from "@/lib/api";
import { Button, Checkbox, TextInput } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

const RenterSettings = () => {
	const [activeTab, setActiveTab] = useState<string | null>("first");

	let { data: userInfo, isFetching } = useQuery<USERDETAILSPAYLOAD>({
		queryKey: ["userData"],
		queryFn: async () => await getUserData(),
	});

	let onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let formData = new FormData(e.target as HTMLFormElement);

		
		};
	return (
		<div className="md:px-4 bg-gray-300  py-4">
			<h2 className="text-xl font-bold">Account Information</h2>
			<form
				className="mt-4 p-4 rounded-lg bg-white min-h-[578px]"
				onSubmit={onSubmit}
			>
				{/* <>{JSON.stringify(userInfo)}</> */}
				{isFetching ? (
					<>loading</>
				) : (
					<div className="size-32 bg-red-200 rounded-full">
						<img
							src={
								userInfo?.payload.profilePicFileName ??
								undefined
							}
							alt=""
						/>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-center mt-4">
					<div className="py-2 flex flex-col  gap-2">
						<label className=" opacity-70 font-bold">
							FirstName
						</label>
						<TextInput
							name="firstname"
							rightSection={<IconUser size={16} />}
							defaultValue={userInfo?.payload.firstname}
						/>
					</div>
					<div className="py-2 flex flex-col  gap-2">
						<label className=" opacity-70 font-bold">
							LastName
						</label>
						<TextInput
							rightSection={<IconUser size={16} />}
							name="lastname"
							defaultValue={userInfo?.payload.lastname}
						/>
					</div>
					<div className="py-2 flex flex-col  gap-2">
						<label className=" opacity-70 font-bold">E-mail</label>
						<TextInput
							rightSection={<IconUser size={16} />}
							name="email"
							type="email"
							defaultValue={userInfo?.payload.email}
						/>
					</div>
					<div className="py-2 flex flex-col  gap-2">
						<label className=" opacity-70 font-bold">
							Phone Number
						</label>
						<TextInput
							rightSection={<IconUser size={16} />}
							name="phone"
							type="number"
							defaultValue={
								userInfo?.payload.phoneNumber ?? "000"
							}
						/>
					</div>
					<div className="py-2 flex flex-col  gap-2">
						<label className=" opacity-70 font-bold">
							Date Of Birth
						</label>
						<TextInput
							rightSection={<IconUser size={16} />}
							name="date"
							type="number"
							defaultValue={userInfo?.payload.phoneNumber}
						/>
					</div>
				</div>
				<div className="flex fle-col gap-2 mt-2 items-center">
					<label className=" opacity-70 font-bold">Student</label>
					<Checkbox
						defaultValue={String(
							userInfo?.payload.isStudent ?? false
						)}
					/>
				</div>

				<Button className="mt-4" type="submit">Update Info</Button>
			</form>
		</div>
	);
};

export default RenterSettings;
