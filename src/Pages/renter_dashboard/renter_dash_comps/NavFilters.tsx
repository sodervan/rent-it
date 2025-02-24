import { filterParams_atom } from "@/store/store";
import { Input, Slider } from "@mantine/core";
import { IconCurrencyNaira } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";

let listingType = ["student", "non-student", "all"];

function NavFilters() {
	let [listingParams, setParams] = useAtom(filterParams_atom);
	let [val, setVal] = useState(1);

	return (
		<div className="duration 150 flex flex-col gap-3 pt-2">
			{/* <h2 className="text-lg font-bold opacity-70">Filters:</h2> */}

			<div className="flex flex-col gap-3">
				<h2 className="opacity-75">Listing Type:</h2>
				<div className="flex items-center gap-2 flex-wrap">
					{listingType.map((e, i) => (
						<button
							onClick={() => {
								setParams((prev: any) => {
									return { ...prev, listingType: e };
								});
							}}
							className="border duration-200 rounded-full py-1 px-2 text-sm"
							style={{
								background:
									listingParams.listingType == e
										? "#9370db"
										: undefined,
							}}
						>
							{e}
						</button>
					))}
				</div>
			</div>

			<div className="flex gap-2 flex-col">
				<div className="mt-2">
					<div className="opacity-75 text-md mb-1">Min Amount:</div>
					<Input
						leftSection={<IconCurrencyNaira />}
						value={listingParams.minAmount}
						onChange={(e) => {
							setParams((prev: any) => {
								return { ...prev, minAmount: e.target.value };
							});
						}}
						type="number"
						size="xs"
					/>
				</div>
				<div className="mt-2">
					<div className="opacity-75 text-md mb-1">Max Amount:</div>
					<Input
						leftSection={<IconCurrencyNaira />}
						value={listingParams.maxAmount}
						onChange={(e) => {
							setParams((prev: any) => {
								return { ...prev, maxAmount: e.target.value };
							});
						}}
						type="number"
						size="xs"
					/>
				</div>
			</div>
			<div>
				<h2 className="opacity-75 text-lg mb-1">Rooms: {val}</h2>
				<Slider
					color="#9370db"
					value={val}
					onChange={setVal}
					max={4}
				/>
			</div>
		</div>
	);
}

export default NavFilters;
