import { footer_data } from "@/page_data/footer_data";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className=" bg-black">
			<div className="h-8"></div>
			<div className="mx-auto container flex flex-col md:flex-row">
				<h2 className="text-purple-600 font-bold text-xl">Rentit </h2>
				<div className="md:ml-auto flex gap-12  flex-col md:flex-row mt-8 md:mt-0">
					{footer_data.links.map((e) => {
						return (
							<div
								key={"footer_" + e.title}
								className="flex flex-col font-bold text-neutral-200 capitalize "
							>
								<h2 className="py-2">{e.title}</h2>
								<div className="flex flex-col font-normal text-neutral-400 gap-2">
									{e.links.map((e) => {
										return (
											<Link
												key={"footer_links_" + e.title}
												to={"/"}
											>
												{e.title}
											</Link>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
             <div className="h-[2px] my-6 bg-neutral-500 w-full"></div>       
			<div className="container mx-auto flex items-center">

				<p className="py-2  text-neutral-600">
					© 2024 RentIT. All Rights Reserved
				</p>
			</div>
		</div>
	);
}

export default Footer;
