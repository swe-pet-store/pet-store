import { ModalSlice } from 'interfaces/bearSliceInterface'
import { create } from 'zustand'
import { createModalSlice } from './exampleStore'

export const useBoundStore = create<ModalSlice>()((...a) => ({
  ...createModalSlice(...a),
}))
