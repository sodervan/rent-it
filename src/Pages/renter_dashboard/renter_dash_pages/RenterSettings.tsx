import { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData, USERDETAILSPAYLOAD } from "@/lib/api";
import { Button, Checkbox, Modal, TextInput } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ImageUpload from "../renter_dash_comps/ImageUpload";
import Searchbar from "../renter_dash_comps/Searchbar";

const RenterSettings = () => {
	let { data: userInfo, isFetching } = useQuery<USERDETAILSPAYLOAD>({
		queryKey: ["userData"],
		queryFn: async () => await getUserData(),
	});

	let onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let formData = new FormData(e.target as HTMLFormElement);
	};
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<div className=" bg-gray-300  pt-4">
			<div className="">
				<Searchbar />
			</div>
			<Modal
				opened={opened}
				onClose={close}
				title="Authentication"
				centered
			>
				<ImageUpload />
			</Modal>
			<h2 className="text-2xl mx-4 mt-4 opacity-50 font-bold">Account Information</h2>
			<form
				className="mx-4 mt-4 p-4 rounded-lg bg-white min-h-[578px] shadow-2xl"
				onSubmit={onSubmit}
			>
				{isFetching ? (
					<div className="size-32">loading</div>
				) : (
					<div className="h-32 flex  rounded-full">
						{userInfo?.payload.profilePicFileName ? (
							<img
								className="w-32 h-32 rounded-full"
								src={
									userInfo?.payload.profilePicLink ??
									undefined
								}
								alt=""
							/>
						) : (
							<IconUser
								size={128}
								className="opacity-50"
							/>
						)}

						<div className="flex flex-col  ml-2 h-full justify-center gap-2">
							<h2 className="text-2xl font-semibold ">
								{userInfo?.payload.firstname}
							</h2>
							<Button
								onClick={() => {
									open();
								}}
							>
								upload Profile Pic
							</Button>
						</div>
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
					<Checkbox
						defaultValue={String(
							userInfo?.payload.isStudent ?? false
						)}/>
					<label className=" opacity-70 font-bold">Student</label>
					
				</div>

				<Button
					className="mt-4"
					type="submit"
				>
					Update Info
				</Button>
			</form>
		</div>
	);
};

export default RenterSettings;
