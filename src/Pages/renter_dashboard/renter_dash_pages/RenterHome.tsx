import {
	Burger,
	Button,
	Divider,
	Flex,
	Loader,
	TextInput,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { sideBarAtom } from "@/store/store";
import { useAtom } from "jotai";
import { get_listings, PayLoadType } from "@/page_data/api";
import SearchCard from "../renter_dash_comps/SearchCard";
import { useNavigate } from "react-router-dom";

const arr = new Array(10).fill(10);
function RenterHome() {
	const { data, isFetching, refetch } = useQuery<PayLoadType>({
		queryKey: ["test"],
		queryFn: async () => await get_listings(),
		refetchOnWindowFocus: false,
	});
	const [opened, setOpened] = useAtom(sideBarAtom);

	let nav = useNavigate();
	let onSubmit = (e) => {
		e.preventDefault();
		let form = new FormData(e.target as HTMLFormElement);
		let path = "/renter/dashboard/search";
		let searchParam = form.get("search");
		nav(`${path}?query=${searchParam}`);
	};

	return (
		<div className="isolate">
			<div className="h-20 sticky top-0 z-10 bg-white">
				<Flex
					onSubmit={onSubmit}
					component="form"
					className=" px-2 gap-2  h-full items-center"
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
						name="search"
						leftSection={<IconSearch />}
						className="w-full"
						placeholder="Seacrch here.."
					/>
					<Button>
						<IconFilter />
					</Button>
				</Flex>
				<Divider />
			</div>

			<div className="flex p-2 gap-2 justify-center flex-wrap">
				{/* {arr.map((e, i) => (
					<SearchCard key={"card+_" + i} />
				))} */}
				{/* <p>{JSON.stringify(data)}</p> */}

				{isFetching ? (
					<div className="w-full flex items-center justify-center h-[calc(100dvh-100px)] bg-red-200">
						<Loader />
					</div>
				) : (
					<>
						{data.payload.data.map((e) => {
							return <SearchCard {...e} />;
						})}
					</>
				)}

				{/* <div className="text-wrap bg-rd-200">{JSON.stringify(data)}</div> */}
			</div>
		</div>
	);
}

export default RenterHome;
