import React from "react";
import { highlight_data } from "../page_data/home_page";
import HighLight from "./HighLight"
function Highlights() {
	return (
		<div className="flex  justify-evenly gap-4">
			{highlight_data.map((e) => {
				return <HighLight {...e} />;
			})}
		</div>
	);
}

export default Highlights;
