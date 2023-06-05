import { create } from 'zustand'
import { createModalSlice } from './exampleStore'
import { createUserSlice } from './userStore'
import { UserSlice } from 'interfaces/userSliceInterface'
import { ModalSlice } from 'interfaces/bearSliceInterface'

export const useBoundStore = create<ModalSlice & UserSlice>()((...a) => ({
  ...createModalSlice(...a),
  ...createUserSlice(...a),
}))
