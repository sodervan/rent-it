import React from "react";

let arr = Array(10).fill((e: any) => e);
const Popular = () => {
	return (
		<div className="p-2 flex-wrap flex gap-2 justify-center relative">
			{arr.map((e) => {
				return <DummyCard />;
			})}
			<div className="w-full h-12 left-0 bg-red-200 z-10 sticky  bottom-0">flex</div>
		</div>
	);
};

let DummyCard = () => {
	return <div className="w-72 outline h-96">card</div>;
};

export default Popular;
