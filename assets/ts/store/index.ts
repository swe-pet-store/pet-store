import { BearSlice } from 'interfaces/bearSliceInterface'
import { create } from 'zustand'
import { createBearSlice } from './exampleStore'


export const useBoundStore = create<BearSlice>()((...a) => ({
    ...createBearSlice(...a),
  }))