import { sideBarAtom } from "@/store/store";
import { Burger, Button, Divider, Flex, TextInput } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useSearchParams } from "react-router-dom";

function RenterSearch() {
	const [opened, setOpened] = useAtom(sideBarAtom);
	const [searchParams, setSearchParams] = useSearchParams();
	let onSubmit = (e: any) => {
		e.preventDefault();
		let formData = new FormData(e.target);
		let search: string = formData.get("search") as string;
		setSearchParams({ query: search });
	};
    
	return (
		<div>
			<div className="h-20 sticky top-0 z-10 bg-white">
				<Flex
					component="form"
					onSubmit={onSubmit}
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
						defaultValue={searchParams.get("query")}
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
				search: {searchParams.get("query")}
                
			</div>
		</div>
	);
}

export default RenterSearch;
