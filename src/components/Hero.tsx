import React from "react";
import { Button } from "@/components/ui/button";

interface IHero {
	title: string;
	subtitle: string;
	button: {
		title: string;
		function: (param: any | null) => void;
	};
	img: string;
}
function Hero({ title, subtitle, img, button }: IHero) {
	return (
		<div className="bg-neutral-200">
			<div className="container mx-auto gap-2 flex flex-wrap">
				<div className="flex-[1_1_400px] h-[400px]  flex-shrink-0 flex flex-col justify-center gap-6">
					<h1 className="text-2xl font-bold">{title}</h1>
					<p className="text-neutral-600">{subtitle}</p>
					<Button className="w-fit text-md p-6">{button.title}</Button>
				</div>
				<div className="flex-[1_1_45%] h-[400px]  flex-shrink-0 justify-end flex">
					<img
						src={img}
						className="h-full w-full object-contain "
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}

export default Hero;
