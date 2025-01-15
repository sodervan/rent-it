import {
	Burger,
	Button,
	Divider,
	Flex,
	Pagination,
	TextInput,
} from "@mantine/core";
import SearchCard from "../renter_dash_comps/SearchCard";
import { get_listings, PayLoadType } from "@/page_data/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { sideBarAtom } from "@/store/store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const Popular = () => {
	const { data, isFetching } = useQuery<PayLoadType>({
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
		<div>
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
			<div className="p-2 flex-wrap flex gap-2 justify-center relative">
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

				<div className="w-full h-12 left-0 bg-white z-10 sticky  bottom-0 flex items-center justify-center">
					<Pagination total={100} />
				</div>
			</div>
		</div>
	);
};

export default Popular;
