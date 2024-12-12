import React from "react";
import RecentCard from "./cards/RecentCard";

function Recents() {
	return (
		<div className="">
			<h3>Recent Searches</h3>
			<div className="flex py-2 gap-2 overflow-scroll overflow-y-hidden">
				{Array(20).fill("sos").map((e) => {
					return <RecentCard />;
				})}
			</div>
		</div>
	);
}

export default Recents;
