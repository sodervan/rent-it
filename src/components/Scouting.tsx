import ScoutCard from "./cards/ScoutCard";
function Scouting() {
	return (
		<div className="container mx-auto">
			<div className="flex flex-col gap-1 py-2 px-4 md:px-0">
				<div className="gap-1 flex flex-col">
					<h2 className="text-xl font-bold">Scout Generally</h2>
					<p className="text-neutral-500">
						Hundreds of Accommodations to choose from
					</p>
				</div>

				<div className="flex gap-2 overflow-scroll mt-4 py-2">
					{Array(10)
						.fill("s")
						.map((i) => {
							return <ScoutCard />;
						})}
				</div>
			</div>
		</div>
	);
}

export default Scouting;
