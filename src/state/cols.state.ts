import { create } from "zustand";
import type { ColsStateType } from "../types/game.types";

export const useNumberOfCols = create<ColsStateType>((set) => ({
  cols: 10,
  setCols: (cols) => set(() => ({cols}))
}))
