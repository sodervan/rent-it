import { atom } from "jotai";

const countAtom = atom<number>(0);

const sideBarAtom = atom<boolean>(false);

let defaultListingOptions = {
	minAmount: 0,
	MaxAmount: 99999,
	apartmentType: "",
	longitude: "",
	latitude: "",
	radius: "",
};
let listingOptions = atom(defaultListingOptions);
export { countAtom, sideBarAtom ,listingOptions};
