import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
	IconHistory,
	IconHome,
	IconLocationBolt,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import NavBarRoute from "./NavBarRoute";
import { useQuery } from "@tanstack/react-query";
import { getUserData, USERDETAILSPAYLOAD } from "@/lib/api";
import { useAtom } from "jotai";
import { sideBarAtom } from "@/store/store";

const links = [
	{
		path: "/renter/dashboard/home",
		name: "Home",
		icon: IconHome,
	},
	{
		path: "/renter/dashboard/popular",
		name: "Popular",
		icon: IconLocationBolt,
	},
	{
		path: "/renter/dashboard/transactions",
		name: "Transactions",
		icon: IconHistory,
	},
];
function NavBarItems() {
	let navigate = useNavigate();

	let { data: userData, isFetching } = useQuery<USERDETAILSPAYLOAD>({
		queryKey: ["userData"],
		queryFn: getUserData,
	});

	let [sidebar, setSideBar] = useAtom(sideBarAtom);

	return (
		<div className="flex flex-col  h-full py-2 gap-2 px-2 b">
			<NavBarRoute />
			<div className="mt-auto"></div>

			<button className="mt-auto ">
				<div className="p-2 flex items-center gap-1 o">
					<div className="bg-deep-orange-500 size-10 rounded-full aspect-square ">
						{userData?.payload.profilePicLink?.length ? (
							<img
								className="object-cover w-full h-full rounded-full "
								src={userData.payload.profilePicLink}
							></img>
						) : (
							<IconUser
								size={18}
								className="text-white"
							/>
						)}
					</div>
					<div className="flex flex-col items-start">
						<Text
							lineClamp={1}
							className="!text-md font-bold opacity-70"
						>
							{userData?.payload.firstname}
						</Text>
						<p className="text-xs">{userData?.payload.email}</p>
					</div>

					<div
						className="!w-fit duration-150  ml-auto p-2 hover:bg-gray-500 rounded-full bg-opacity-50 cursor-pointer"
						onClick={() => {
							navigate("/renter/dashboard/settings");
							if (sidebar) {
								setSideBar(false);
							}
						}}
					>
						<IconSettings size={24} />
					</div>
				</div>
			</button>
		</div>
	);
}

export default NavBarItems;
