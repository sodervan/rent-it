import { Button, Input, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
	IconCurrencyNaira,
	IconHistory,
	IconHome,
	IconLocationBolt,
	IconSettings,
	IconUser,
	IconX,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { listingOptionsAtom } from "@/store/store";

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

	let defaultOptions = useAtom(listingOptionsAtom);

	return (
		<div className="flex flex-col  h-full py-2 gap-2 px-2">
			{/* {links.map(({ name, path, icon: Icon }) => {
				return (
					<Link
						to={path}
						key={name}
						className={({ isActive }) => {
							return `flex gap-1 text-md duration-200 items-center p-2 rounded-md ${
								isActive
									? "bg-gray-300 text-black"
									: "text-gray-800 "
							}`;
						}}
					>
						<Icon size={18} />
						{name}
					</Link>
				);
			})} */}
			<div className="flex items-center">
				filter
				<button className="ml-auto btn btn-primary text-xs flex items-center gap-2">
					Clear all
					<IconX size={16} />
				</button>
			</div>

			<div className="flex flex-col gap-2">
				<label>Pricing</label>
				<div>
					<label className="text-sm opacity-50">Min Amount</label>
					<Input
						type="number"
						leftSection={<IconCurrencyNaira />}
						title="sss"
						placeholder="MinAmount"
					/>
				</div>
				<div>
					<label className="text-sm opacity-50">Max Amount</label>
					<Input
						type="number"
						leftSection={<IconCurrencyNaira />}
						title="sss"
						placeholder="MaxAmount"
					/>
				</div>
			</div>

			<div className="mt-4">
				<label className="text-sm ">ApartmentType</label>

				<Input
					type="text"
					leftSection={<IconCurrencyNaira />}
					title="sss"
					placeholder="Apartment Type"
				/>
			</div>

			<div className="flex flex-col  mt-4">
				<label>Area</label>
				<div>
					<label className="text-sm opacity-50">Longitude</label>
					<Input
						type="number"
						leftSection={<IconCurrencyNaira />}
						title="sss"
						placeholder="Longitude"
					/>
				</div>
				<div>
					<label className="text-sm opacity-50">Latitude</label>
					<Input
						type="number"
						leftSection={<IconCurrencyNaira />}
						title="sss"
						placeholder="Latitude"
					/>
				</div>
				<div>
					<label className="text-sm opacity-50">Radius</label>
					<Input
						type="number"
						leftSection={<IconCurrencyNaira />}
						title="sss"
						placeholder="Radius"
					/>
				</div>
			</div>

			<div className="mt-auto">
				<div className="p-2 flex items-center gap-1">
					<div className="p-2 bg-deep-orange-500 rounded-full aspect-square ">
						<IconUser
							size={18}
							className="text-white"
						/>
					</div>
					<Text
						lineClamp={1}
						className="!text-sm"
					>
						Jon Doe
					</Text>
					<Button
						p={0}
						variant="transparent"
						className="!w-fit  ml-auto"
						onClick={() => {
							navigate("/renter/dashboard/settings");
						}}
					>
						<IconSettings size={18} />
					</Button>
				</div>
			</div>
			{/* <Stack className="mt-auto pb-4">
				<NavLink
					label="Transaction History"
					leftSection={<IconSettings />}
				/>
			</Stack> */}
		</div>
	);
}

export default NavBarItems;
