import { atom, useAtom } from "jotai";

export const currentItem = atom<string>("inbox");

export function useCurrentItem() {
  return useAtom(currentItem);
}
