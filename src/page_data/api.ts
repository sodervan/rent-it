let base_url = "https://rent-it-api.onrender.com/api/v1/";

interface PayLoadType {
	status: "success" | "fail";
	statusCode: number;
	message: string;
	payload: {
		results: number;
		data: any[];
	};
}
let get_listings = async () => {
	let listings_url = base_url + "listings";
	try {
		let resp = await fetch(listings_url);
		return await resp.json();
	} catch (err) {
		throw new Error(err);
	}
};

export type {PayLoadType}
export { get_listings };
