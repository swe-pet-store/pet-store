import { ModalSlice } from 'interfaces/bearSliceInterface'
import { StateCreator } from 'zustand'

export const createModalSlice: StateCreator<ModalSlice> = set => ({
  defaultModalItem: {},
  setDefaultModalItem: (newModalItem: any) =>
    set(state => ({ defaultModalItem: newModalItem })),
})
