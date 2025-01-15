interface Picture {
	id: string;
	cloudinaryUrl: string;
	mimeType: string;
	createdAt: Date;
	tag: {
		id: number;
		name: string;
	};
}
interface Location {
	streetAddress: string;
	postalCode: string;
	healthFacilities: [
		"Federal Neuro-Psychiatric Hospital Yaba",
		"Yaba General Hospital",
		"Private Clinics in Yaba"
	];
}
interface CardType {
	paymentDuration: string;
	id: string;
	title: string;
	unitsLeft: number;
	pictures: Picture[];
	baseCost: number;
	unitsBooked: number;
	location: Location;
}
export type { CardType };
