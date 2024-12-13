import React from "react";
import RecentCard from "./cards/RecentCard";

function Recents() {
	return (
		<div className="bg-purple-50 py-2">
			<div className="flex flex-col gap-2 container mx-auto ">
				<h3 className="text-xl">Recent Searches</h3>
				<div className="flex py-2 gap-2 overflow-scroll overflow-y-hidden py-3">
					{Array(20)
						.fill("sos")
						.map((e) => {
							return <RecentCard />;
						})}
				</div>
			</div>
		</div>
	);
}

export default Recents;
