import { getUserData, USERDETAILSPAYLOAD } from "@/lib/api";
import { sideBarAtom } from "@/store/store";
import { Burger, Flex, Menu, TextInput } from "@mantine/core";
import {
	IconBell,
	IconInbox,
	IconLogout,
	IconSearch,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Searchbar() {
	let { data: userInfo, isFetching: userFetching } =
		useQuery<USERDETAILSPAYLOAD>({
			queryKey: ["userData"],
			queryFn: async () => await getUserData(),
		});
	const [opened, setOpened] = useAtom(sideBarAtom);
	let navigate = useNavigate();

	let navigateTo = (e: FormEvent<HTMLDivElement>) => {
		e.preventDefault();
		let form = new FormData(e.target as HTMLFormElement);
		let queryString = form.get("search") as string;
		if (queryString.length < 1) {
			return;
		}
		navigate(`/renter/dashboard/search?query=${queryString}`);
	};
	return (
		<Flex
			component="form"
			onSubmit={navigateTo}
			className=" px-4 gap-4  h-full items-center"
		>
			<div className=" md:hidden">
				<Burger
					opened={opened}
					onClick={() => {
						setOpened(!opened);
					}}
				/>
			</div>
			<TextInput
				radius={"xl"}
				name="search"
				size="lg"
				leftSection={<IconSearch />}
				className="w-full "
				placeholder="Search here.."
			/>
			<button className="p-2 duration-150 hover:bg-gray-500 rounded-full hover:bg-opacity-50">
				<IconBell />
			</button>
			<button className="p-2 duration-150 hover:bg-gray-500 rounded-full hover:bg-opacity-50">
				<IconInbox />
			</button>
			<div className="w-[3px] bg-black h-5 opacity-50"></div>
			<Menu>
				<Menu.Target>
					<button className="flex  items-center gap-2 hover:bg-gray-500 hover:bg-opacity-50 duration-150 p-2 rounded-lg">
						<div className=" size-8 rounded-full">
							{userInfo?.payload.profilePicLink ? (
								<img
									loading="lazy"
									className="size-8 rounded-full object-cover"
									src={userInfo.payload.profilePicLink}
								></img>
							) : (
								<div className="p-1 bg-purple-400 rounded-full bg-opacity-50  size-8   flex items-center justify-center">
									<IconUser />
								</div>
							)}
						</div>
						<div className="flex flex-col ">
							<h2 className="font-bold">
								{userInfo?.payload.firstname}
							</h2>
						</div>
					</button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item>
						<Link
							to={"/renter/dashboard/settings"}
							className="flex gap-2 items-center"
						>
							<IconSettings />
							Settings
						</Link>
					</Menu.Item>
					<Menu.Item leftSection={<IconLogout />}>Logout</Menu.Item>
				</Menu.Dropdown>
			</Menu>

			{/* <Button>
						<IconFilter />
					</Button> */}
		</Flex>
	);
}

export default Searchbar;
