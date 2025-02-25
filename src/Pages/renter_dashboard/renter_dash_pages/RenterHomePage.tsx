import { Burger, Flex, Loader, TextInput } from "@mantine/core";
import { IconBell, IconInbox, IconSearch, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { sideBarAtom } from "@/store/store";
import { useAtom } from "jotai";
import {
	get_listing,
	getUserData,
	LISTINGRESPONSE,
	USERDETAILSPAYLOAD,
} from "@/lib/api";
import QueryCard from "../renter_dash_comps/QueryCard";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function RenterHomePage() {
	const { data, isFetching, refetch } = useQuery<LISTINGRESPONSE>({
		queryKey: ["test"],
		queryFn: async () => await get_listing(),
	});
	let { data: userInfo, isFetching: userFetching } =
		useQuery<USERDETAILSPAYLOAD>({
			queryKey: ["userData"],
			queryFn: async () => await getUserData(),
		});
	const [opened, setOpened] = useAtom(sideBarAtom);
	let navigate = useNavigate();

	return (
		<div className="isolate min-h-dvh bg-gray-300">
			<div className="h-20  z-10  ">
				<Flex
					component="form"
					onSubmit={(e: FormEvent<HTMLDivElement>) => {
						e.preventDefault();
						let form = new FormData(e.target as HTMLFormElement);
						let queryString = form.get("search") as string;
						if (queryString.length < 1) {
							return;
						}
						navigate(
							`/renter/dashboard/search?query=${queryString}`
						);
					}}
					className=" px-2 gap-4  h-full items-center"
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
						leftSection={<IconSearch />}
						className="w-full"
						placeholder="Seacrch here.."
					/>
					<button className="p-2 duration-150 hover:bg-gray-500 rounded-full hover:bg-opacity-50">
						<IconBell />
					</button>
					<button className="p-2 duration-150 hover:bg-gray-500 rounded-full hover:bg-opacity-50">
						<IconInbox />
					</button>
					<div className="w-[3px] bg-black h-5 opacity-50"></div>
					<button className="flex  items-center gap-2 hover:bg-gray-500 hover:bg-opacity-50 duration-150 p-2 rounded-lg">
						<div className=" size-8 rounded-full">
							{userInfo?.payload.profilePicLink ? (
								<img
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

					{/* <Button>
						<IconFilter />
					</Button> */}
				</Flex>
			</div>

			<div className=" grid grid-cols-[repeat(auto-fit,300px)] gap-2 justify-center p-4 rounded-lg bg-white md:mx-8 shadow-xl">
				{isFetching ? (
					<div className="w-full flex items-center justify-center h-[calc(100dvh-100px)] bg-red-200">
						<Loader />
					</div>
				) : (
					<>
						{data?.payload.data.map((e) => {
							return (
								<QueryCard
									{...e}
									key={e.id}
								/>
							);
						})}
					</>
				)}

				{/* <div className="text-wrap bg-rd-200">{JSON.stringify(data)}</div> */}
			</div>
		</div>
	);
}

export default RenterHomePage;
