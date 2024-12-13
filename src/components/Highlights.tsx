import { highlight_data } from "../page_data/home_page";
import HighLightCard from "./cards/HighLightCard";
function Highlights() {
	return (
		<div className="flex  justify-evenly gap-4">
			{highlight_data.map((e) => {
				return <HighLightCard {...e} />;
			})}
		</div>
	);
}

export default Highlights;
