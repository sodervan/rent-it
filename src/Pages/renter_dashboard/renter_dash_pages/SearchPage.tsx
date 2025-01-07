import {
	Badge,
	Burger,
	Button,
	Card,
	Divider,
	Flex,
	Group,
	Image,
	Loader,
	LoadingOverlay,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import {
	IconFilter,
	IconSearch,
	IconUserSquareRounded,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { Input as IP } from "@material-tailwind/react";
import { sideBarAtom } from "@/store/store";
import { useAtom } from "jotai";
type category = {
	id: number;
	title: string;
	price: string;
	description: string;
	image: string;
	rating: any;
};
const url = "https://fakestoreapi.com/products/category/jewelery";
const get_joke = async () => {
	try {
		let resp = await fetch(url);
		return resp.json();
	} catch (err) {
		throw new Error(err as string);
	}
};
const arr = new Array(10).fill(10);
function SearchPage() {
	const { data, isFetching, refetch } = useQuery<category[]>({
		queryKey: ["test"],
		queryFn: async () => await get_joke(),
	});
	const [opened, setOpened] = useAtom(sideBarAtom);

	return (
		<div className="isolate">
			<div className="h-20 sticky top-0 z-10 bg-white">
				<Flex className=" px-2 gap-2  h-full items-center">
					<div className=" md:hidden">
						<Burger
							opened={opened}
							onClick={() => {
								setOpened(!opened);
							}}
						/>
					</div>
					<TextInput
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
					data?.map((e) => {
						return (
							<Card
								key={e.id}
								withBorder
								className="w-[252px] p-2 gap-2"
							>
								<Card.Section className="h-[160px]">
									<img
										className="h-full w-full object-contain"
										src={e.image}
										height={160}
										alt="Norway"
									/>
								</Card.Section>
								<Text
									lineClamp={1}
									size="sm"
								>
									{e.title}
								</Text>
								<Badge color="pink">On Sale</Badge>
								<Text
									lineClamp={4}
									size="sm"
									c="dimmed"
								>
									{e.description}
								</Text>
								<Button
									className="mt-auto"
									color="blue"
									fullWidth
									radius="md"
								>
									Order Now
								</Button>
							</Card>
						);
						LoadingOverlay;
					})
				)}

				{/* <div className="text-wrap bg-rd-200">{JSON.stringify(data)}</div> */}
			</div>
		</div>
	);
}

export default SearchPage;
