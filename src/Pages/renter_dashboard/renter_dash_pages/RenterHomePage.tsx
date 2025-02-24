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
import { get_listing, LISTINGRESPONSE } from "@/lib/api";
import QueryCard from "../renter_dash_comps/QueryCard";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function RenterHomePage() {
	const { data, isFetching, refetch } = useQuery<LISTINGRESPONSE>({
		queryKey: ["test"],
		queryFn: async () => await get_listing(),
	});
	const [opened, setOpened] = useAtom(sideBarAtom);
	let navigate = useNavigate();

	return (
		<div className="isolate">
			<div className="h-20 sticky top-0 z-10 bg-white">
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

			<div className=" grid grid-cols-[repeat(auto-fit,300px)] gap-2 justify-center">
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
