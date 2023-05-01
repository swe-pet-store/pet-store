import { BearSlice } from "interfaces/bearSliceInterface"
import { StateCreator } from "zustand"


export const createBearSlice: StateCreator<BearSlice> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
})