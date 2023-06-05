import { UserSlice } from 'interfaces/userSliceInterface'
import { StateCreator } from 'zustand'

export const createUserSlice: StateCreator<UserSlice> = set => ({
  userId: 0,
  setUserId: (userId: number) => set(state => ({ userId: userId })),
})
