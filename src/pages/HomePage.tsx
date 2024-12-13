import { carousel_data, hero_data } from "../page_data/home_page";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Highlights from "../components/Highlights";
import Recents from "../components/Recents";
import Scouting from "@/components/Scouting";
import Hero from "@/components/Hero";
const HomePage = () => {
	const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: false }, [
		Autoplay({ delay: 6000 }),
	]);
	return (
		<div className=" flex flex-col gap-[100px]">
			<div>
				<div
					className="embla isolate relative "
					ref={emblaRef}
				>
					<div className="absolute inset-0 z-20 px-4 md:px-0">
						<div className="mx-auto  gap-4 flex-col items-center justify-center flex h-full">
							<h1 className="text-2xl  md:text-5xl text-white font-bold text-center">
								{carousel_data.header}
							</h1>
							<p className="text-white text-center">
								Simplifying apartment hunting for students and
								renters with transparency, reliability, and
								ease.
							</p>
							<div className="flex gap-2 flex-wrap justify-center">
								{carousel_data.pills.map((e) => (
									<Badge
										className="bg-purple-600 text-sm md:text-md pointer-events-none"
										key={e}
									>
										{e}
									</Badge>
								))}
							</div>
							<div className="flex space-x-2 items-center w-full justify-center">
								<Input
									className="bg-white w-full  max-w-[700px] h-12"
									placeholder="Search..."
								/>
								<Button className="bg-purple-600 h-12">
									Search
								</Button>
							</div>
						</div>
					</div>
					<div className="embla__container ">
						{carousel_data.images.map((e) => {
							return (
								<div
									className="embla__slide h-[calc(100dvh-80px)] max-h-[1080px] isolate relative"
									key={e}
								>
									<div className="absolute z-20 inset-0 bg-black bg-opacity-55"></div>
									<img
										src={e}
										className="w-full h-full"
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-[100px] ">
				<Highlights />
				<Recents />
				<Scouting />
				{
					hero_data.map(({title,subtitle,button,img})=>{
						return <Hero title={title} subtitle={subtitle} button={button} img={img}/>
					})
				}
			</div>
		</div>
	);
};

export default HomePage;
