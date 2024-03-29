import React, { useState } from 'react'
import trash from './images/trash.png'
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber'
//@ts-ignore
import styles from '../../styles/shoppingcart.css'
import { useBoundStore } from '../store/index'

interface IShoppingCartItem {
  id: number
  itemImg: any
  title: string
  description: string
  quantity: number
  price: number
}

export const ShoppingCartItem = ({
  id,
  itemImg,
  description,
  quantity,
  title,
  price,
}: IShoppingCartItem) => {
  const [quantityVal, setQuantityVal] = useState<number | undefined | null>(
    quantity,
  )

  const store = useBoundStore()

  return (
    <div
      className="grid grid-flow-row grid-cols-10 h-[200px] border-b-2 pt-4 pb-4 items-center"
      style={styles}>
      <img
        src={itemImg}
        className="col-span-2 object-cover object-center h-full w-[80%] rounded-2xl"
      />
      <span className="col-span-4">
        <p className="font-medium text-xl">{title}</p>
        <p className="font-regular text-md mt-5 w-5/6 break-words">
          {description}
        </p>
      </span>
      <span className="col-span-2" style={styles}>
        <InputNumber
          inputStyle={{ width: '70%' }}
          style={styles}
          value={quantityVal}
          onValueChange={(e: InputNumberValueChangeEvent) => {
            setQuantityVal(e.value)
            store.updateShoppingCartItem(id, e.value)
          }}
          showButtons
          min={1}
        />
      </span>
      <p className="font-bold text-3xl col-span-1">
        {'$'}
        {price}
      </p>
      <span className="col-span-1">
        <button
          onClick={() => {
            store.removeShoppingCartItem(id)
          }}
          className=" px-2 py-2 rounded-xl border-[#D55353] border text-white font-medium ">
          <img src={trash} />
        </button>
      </span>
    </div>
  )
}
