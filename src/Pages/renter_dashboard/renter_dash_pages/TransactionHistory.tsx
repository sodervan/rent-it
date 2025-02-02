import { Button, Input, InputBase, Modal } from "@mantine/core";
import {
	IconArrowNarrowDown,
	IconCalendar,
	IconCaretDown,
	IconClearAll,
	IconCurrencyNaira,
	IconFilter,
	IconFilterCancel,
} from "@tabler/icons-react";
import RenterTable from "../renter_dash_comps/RenterTable";
import { useAtom, Atom, atom } from "jotai";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
const fromDate = atom<Date | null>();
const toDate = atom<Date | null>();

const TransactionHistory = () => {
	const [from, setFrom] = useAtom(fromDate);
	const [to, setTo] = useAtom(toDate);
	return (
		<div className="">
			<div className="p-2">
				<h1 className="text-xl">TranSaction History</h1>
			</div>
			<div className=" p-2 flex items-center gap-2">
				<div className=" w-full max-w-[352px]">
					<p className="text-gray-500">what are you looking for</p>
					<Input placeholder="Search by apartment name,ref id ...." />
				</div>
				<div>
					<p className="text-gray-500">what are you looking for</p>

					<InputBase
						component="select"
						rightSection={<IconCaretDown />}
					>
						<option value="react">React</option>
						<option value="react">Angular</option>
						<option value="svelte">Svelte</option>
					</InputBase>
				</div>
			</div>
			<div className=" p-2 flex items-center gap-2">
				<div className=" ">
					<p className="text-gray-500">Min.</p>
					<Input
						type="Number"
						placeholder=""
						leftSection={<IconCurrencyNaira />}
					/>
				</div>
				<div className=" ">
					<p className="text-gray-500">Max.</p>
					<Input
						leftSection={<IconCurrencyNaira />}
						placeholder="Search by apartment name,ref id ...."
					/>
				</div>
				<div className=" ">
					<p className="text-gray-500">From</p>
					<DateInput
						value={from}
						onChange={setFrom}
						placeholder="Date input"
					/>
				</div>
				<div className=" ">
					<p className="text-gray-500">To</p>
					<DateInput
						value={to}
						onChange={setTo}
						placeholder="Date input"
					/>
				</div>
			</div>
			<div className="p-2 flex items-center gap-2">
				<Button
					leftSection={<IconFilterCancel />}
					variant="outline"
				>
					Clear Filters
				</Button>
				<Button leftSection={<IconFilter />}>Appy Filters</Button>
			</div>
			<div className="p-2">
				<RenterTable />
			</div>
		</div>
	);
};

export default TransactionHistory;
