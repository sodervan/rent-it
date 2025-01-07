import { Pagination } from "@mantine/core";
import React from "react";

let arr = Array(10).fill((e: any) => e);
const Popular = () => {
	return (
		<div className="p-2 flex-wrap flex gap-2 justify-center relative">
			{arr.map((e) => {
				return <DummyCard />;
			})}
			<div className="w-full h-12 left-0 bg-white z-10 sticky  bottom-0 flex items-center justify-center">
				<Pagination total={100} />
			</div>
		</div>
	);
};

let DummyCard = () => {
	return <div className="w-72 outline h-96">card</div>;
};

export default Popular;
