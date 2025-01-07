import { atom } from "jotai";

const countAtom = atom<number>(0);


const sideBarAtom = atom<boolean>(false)
export { countAtom ,sideBarAtom};
