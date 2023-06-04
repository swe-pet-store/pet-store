import { ModalSlice } from 'interfaces/bearSliceInterface'
import { StateCreator } from 'zustand'

export const createModalSlice: StateCreator<ModalSlice> = set => ({
  defaultModalItem: {},
  setDefaultModalItem: (newModalItem: any) =>
    set(state => ({ defaultModalItem: newModalItem })),
  shoppingCart: [],
  addShoppingCartItem: (cartItem: any) =>
    set(state => {
      const existingItem = state.shoppingCart.find(
        (item: any) => item.id === cartItem.id,
      )

      if (existingItem) {
        // Item already exists, increment its quantity by 1
        const updatedCart = state.shoppingCart.map((item: any) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity + cartItem.quantity }
          }
          return item
        })

        return { ...state, shoppingCart: updatedCart }
      } else {
        // Item doesn't exist, add it to the shopping cart
        return { ...state, shoppingCart: [...state.shoppingCart, cartItem] }
      }
    }),

  removeShoppingCartItem: (id: number) =>
    set(state => ({
      shoppingCart: state.shoppingCart.filter((it: any) => it.id !== id),
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
