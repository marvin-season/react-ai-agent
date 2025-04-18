import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useNStore = create<{ n: number; incr: () => void }>()(
  immer(
    devtools(
      (set) => ({
        n: 0,
        incr: () => {
          set((state) => {
            state.n += 1;
          });
        },
      }),
      { name: "nStore", enabled: true },
    ),
  ),
);
