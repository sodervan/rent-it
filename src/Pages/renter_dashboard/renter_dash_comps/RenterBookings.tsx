let arr = Array(12).fill((e: any) => e);
const RenterBookings = () => {
	return (
		<div className=" p-2">
			<div className="mb-4">Bookings</div>
			<div className="flex flex-col gap-2">
				{arr.map((e) => {
					return <DummyBooking />;
				})}
			</div>
		</div>
	);
};

let DummyBooking = () => {
	return (
		<div className="h-24 border flex">
			<div className="aspect-square h-full bg-red-200"></div>
			<div className="ml-2">
				<p>DummyBooking</p>
				<p>DummyLocation</p>
				<p>Price</p>
			</div>
			<div className="ml-auto flex flex-col p-2">
				<p className="bg-red-200 text-sm p-1  rounded-md mt-auto">
					communal
				</p>
			</div>
		</div>
	);
};
export default RenterBookings;
