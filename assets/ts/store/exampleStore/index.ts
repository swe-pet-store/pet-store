import { ModalSlice } from 'interfaces/bearSliceInterface'
import { StateCreator } from 'zustand'

export const createModalSlice: StateCreator<ModalSlice> = set => ({
  defaultModalItem: {},
  setDefaultModalItem: (newModalItem: any) =>
    set(state => ({ defaultModalItem: newModalItem })),
  shoppingCart: [],

  addShoppingCartItem: (cartItem: any) =>
    set(state => {
      return { ...state, shoppingCart: [...state.shoppingCart, cartItem] }
    }),

  removeShoppingCartItem: (id: number) =>
    set(state => ({
      shoppingCart: state.shoppingCart.filter((it: any) => it.order.id !== id),
    })),

  updateShoppingCartItem: (cartItemId: number, quantity: any) => {
    set(state => {
      const updatedCart = state.shoppingCart.map((item: { id: any }) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: quantity }
        }
        return item
      })

      return {
        ...state,
        shoppingCart: updatedCart,
      }
    })
  },
})
