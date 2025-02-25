import { defaultFilter, DEFAULTFILTERPARAM } from "@/store/store";
import axios, { HttpStatusCode } from "axios";
import { MIMEType } from "util";

interface APIRESPONSE {
	status: string;
	statusCode: HttpStatusCode;
	message: string;
	payload: {
		results: number;
		data: any;
	};
	pagination: {
		next_cursor: string;
		previous_cursor: string;
		perPage: 10;
	};
}
interface LISTINGITEM {
	id: string;
	agentId: string;
	title: string;
	currencyCode: string;
	baseCost: string;
	minBaseCostDeposit: string;
	paymentDuration: string;
	units: 3;
	unitsLeft: 2;
	unitsBooked: 0;
	isListed: true;
	isStudentOnly: true;
	isNonStudentOnly: false;
	listingFeatures: {
		electricityPaymentType: string;
		electricityAccessType: string;
		inHouseRunningWater: boolean;
		outDoorWaterTaps: boolean;
		waterFromExternalSource: boolean;
		furnishingState: string;
	};
	apartmentType: {
		id: number;
		name: string;
	};
	extraFees: [
		{
			amount: string;
			feeType: {
				id: number;
				name: string;
			};
		},
		{
			amount: number;
			feeType: {
				id: number;
				name: string;
			};
		}
	];
	location: {
		streetAddress: string;
		postalCode: string;
		healthFacilities: string[];
		transportation: string[];
		educationalInstitutions: string[];
		coordinates: { x: number; y: number };
		city: {
			id: number;
			name: string;
		};
		localGovernmentArea: {
			id: number;
			name: string;
		};
		state: {
			id: number;
			name: string;
		};
		country: {
			name: number;
		};
	};
	video: [
		{
			id: string;
			videoUrl: string;
			mimeType: MIMEType;
			createdAt: string;
		}
	];
	pictures: [
		{
			id: string;
			imageUrl: string;
			mimeType: MIMEType;

			createdAt: string;
			tag: {
				id: number;
				name: string;
			};
		}
	];
}

interface LISTINGRESPONSE extends APIRESPONSE {
	payload: {
		results: number;
		data: LISTINGITEM[];
	};
}
let get_listing = async () => {
	try {
		let resp = await axios.get(
			"https://rent-it-api.onrender.com/api/v1/listings"
		);
		return resp.data;
	} catch (error) {
		throw new Error(error as string);
	}
};

let getWithFilters = ({ filters }: { filters: DEFAULTFILTERPARAM }) => {
	let filterString = Object.keys(filters)
		.map((e) => {
			let key = e as keyof DEFAULTFILTERPARAM;
			let fil = filters[key];
			if (fil === defaultFilter[key]) {
				// Corrected comparison
				return null;
			}
			return `${e}=${fil}`;
		})
		.filter((e) => e !== null)
		.join("&");
	return filterString;
};
let getWithQuery = async () => {
	try {
		let resp = await axios.get(
			"https://rent-it-api.onrender.com/api/v1/listings"
		);
		return resp.data;
	} catch (error) {
		throw new Error(error as string);
	}
};

interface USERDETAILSPAYLOAD {
	message: string;
	payload: User;
	status: string;
	statusCode: string;
}

interface User {
	id: string;
	email: string;
	phoneNumber: string;
	schoolId: string | null;
	firstname: string;
	lastname: string;
	profilePicFileName: string | null;
	profilePicLink: string | null;
	isverified: boolean;
	isActive: boolean;
	isStudent: boolean;
	createdAt: string;
	updatedAt: string;
}

interface RequestConfig {
	transitional: {
		silentJSONParsing: boolean;
		forcedJSONParsing: boolean;
		clarifyTimeoutError: boolean;
	};
	adapter: string[];
	transformRequest: any[];
	transformResponse: any[];
	timeout: number;
	xsrfCookieName: string;
	xsrfHeaderName: string;
	maxContentLength: number;
	maxBodyLength: number;
	env: object;
	headers: {
		Accept: string;
	};
	withCredentials: boolean;
	method: string;
	url: string;
}

let getUserData = async () => {
	try {
		fetch("", { credentials: "include" });
		let resp = await axios.get(
			"https://rent-it-api.onrender.com/api/v1/users",
			{ withCredentials: true }
		);

		return resp.data;
	} catch (err) {
		throw new Error(JSON.stringify(err));
	}
};

let uploadProfilePic = async (img: any) => {
	// console.log(img)
	const formData = new FormData();
	formData.append("profile", img);
	try {
		let resp = await axios.post(
			"https://rent-it-api.onrender.com/api/v1/users/profile-picture",
			formData,
			{
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return resp;
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

let get_favorites = async () => {
	try {
		let resp = await axios.get(
			"https://rent-it-api.onrender.com/api/v1/listings/favourites",
			{
				withCredentials: true,
			}
		);
		console.log(resp)
		return resp.data;
	} catch (err) {
		throw new Error(JSON.stringify(err));
	}
};
export {
	get_listing,
	get_favorites,
	getWithFilters,
	getUserData,
	getWithQuery,
	uploadProfilePic,
};

export type { LISTINGRESPONSE, LISTINGITEM, USERDETAILSPAYLOAD };
