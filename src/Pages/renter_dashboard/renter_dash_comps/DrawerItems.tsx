import { Divider } from "@mantine/core";
import NavFilters from "./NavFilters";

function DrawerItems() {
	return (
		<div>
			<h2 className="text-2xl font-semibold opacity-50 mb-2">Filters:</h2>
			<Divider />
			<NavFilters />
		</div>
	);
}

export default DrawerItems;
