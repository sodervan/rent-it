import {
	Button,
	Divider,
	Flex,
	Group,
	rem,
	Stack,
	TextInput,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import SearchCard from "./SearchCard";

const arr = new Array(10).fill(10);
function SearchPage() {
	return (
		<div className="isolate">
			<div className="h-20 sticky top-0 z-10 bg-white">
				<Flex className=" px-2 gap-2  h-full items-center">
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
			<div className="flex p-2   flex-wrap gap-3 justify-center">
				{arr.map((e, i) => (
					<SearchCard key={"card+_" + i} />
				))}
			</div>
		</div>
	);
}

export default SearchPage;
