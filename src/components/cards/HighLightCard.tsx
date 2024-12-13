import { IHighLight } from "../../lib/types";
import { Button } from "@/components/ui/button";

function HighLightCard({ image, title, subtitle, button }: IHighLight) {
	return (
		<div className="flex flex-col gap-4 max-w-[352px] ">
			<img
				src={image}
				className="h-48  object-contain mx-auto"
			/>
			<h2 className="font-bold text-lg">{title}</h2>
			<p className="text-sm">{subtitle}</p>
			<Button >{button}</Button>
		</div>
	);
}

export default HighLightCard;
