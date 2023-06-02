import React from 'react'
import itemImg from './images/memory-foam-item.png'

interface IShoppingCartItem {
  itemImg: any
  title: string
  description: string
  quantity: number
}

export const ShoppingCartItem = ({
  itemImg,
  description,
  quantity,
  title,
}: IShoppingCartItem) => {
  return (
    <div className="grid grid-flow-row grid-cols-10 h-[200px] border-b-2 pt-4 pb-4">
      <img
        src={itemImg}
        className="col-span-2 object-cover object-center h-full w-[80%] rounded-2xl"
      />
      <span className="col-span-4">
        <p className="font-medium text-xl">{title}</p>
        <p className="font-regular text-md mt-5 max-w-full">
          {description +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
        </p>
      </span>
    </div>
  )
}
