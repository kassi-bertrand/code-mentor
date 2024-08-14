import { Playground } from "@/lib/types";
import { atom, useAtom } from "jotai";

type PlaygroundConfig = {
  selected: Playground["id"] | null;
};

const playgroundConfigAtom = atom<PlaygroundConfig>({
  selected: null, // Initialize with no playground selected
});


// When used in a component, it will return an array with two elements:
// The current value of playgroundConfigAtom
// A function to update this valu
export function useSelectedPlayground() {
  return useAtom(playgroundConfigAtom);
}