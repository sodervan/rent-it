import { atom } from "jotai";

const countAtom = atom<number>(0);

const sideBarAtom = atom<boolean>(false);

interface DEFAULTFILTERPARAM {
	minAmount: number;
	maxAmount: number;
	limit: number;
	cursor: number;
	listingType: "student" | "non-student" | "all";
}
let defaultFilter: DEFAULTFILTERPARAM = {
	minAmount: 0,
	maxAmount: 1000000,
	limit: 20,
	cursor: 0,
	listingType: "all",
};
let filterParams_atom = atom(defaultFilter);
export { countAtom, sideBarAtom, filterParams_atom ,defaultFilter};
export type {DEFAULTFILTERPARAM}
