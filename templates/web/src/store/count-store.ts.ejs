import create from "zustand";
import { VoidCallback } from "../utils";

interface CountStore {
  count: number;
  increment: VoidCallback;
  reset: VoidCallback;
}

// An example on how simple the Zustand library is to use over React-Redux
export const useCountStore = create<CountStore>(set => {
  return {
    count: 0,
    increment: () => {
      set(state => {
        return { count: state.count + 1 };
      });
    },
    reset: () => {
      set({ count: 0 });
    }
  };
});

export const selectCount = (
  state: CountStore
): [number, VoidCallback, VoidCallback] => [
  state.count,
  state.increment,
  state.reset
];
