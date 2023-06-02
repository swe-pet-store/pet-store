import React, { useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import itemImg from '../images/memory-foam-item.png'
import { Toast } from 'primereact/toast'
import { ShoppingCartItem } from '../../components/ShoppingCartItem'

export const ShoppingCart = (props: any) => {
  const toast = useRef<any>()

  const showWarningToast = () => {
    toast.current!.show({
      severity: 'warn',
      summary: 'Warning',
      detail: 'You can only add up to 5 additional images per item',
    })
  }

  let arrObj = [
    {
      itemImg: itemImg,
      description: 'DESCRIPTION 1',
      quantity: 1,
      title: 'TITLE 1',
    },
    {
      itemImg: itemImg,
      description: 'DESCRIPTION 2',
      quantity: 2,
      title: 'TITLE 2',
    },
    {
      itemImg: itemImg,
      description: 'DESCRIPTION 3',
      quantity: 5,
      title: 'TITLE 3',
    },
    {
      itemImg: itemImg,
      description: 'DESCRIPTION 3',
      quantity: 5,
      title: 'TITLE 3',
    },
    {
      itemImg: itemImg,
      description: 'DESCRIPTION 3',
      quantity: 5,
      title: 'TITLE 3',
    },
  ]

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={props.visible}
        className=" xsm:w-full sm:w-auto md:w-5/6 xl:w-2/3 "
        onHide={() => props.setVisible(false)}>
        <div className="flex flex-col mx-0 md:mx-5 font-medium ">
          <p className="font-bold text-3xl">Shopping Cart</p>
          <div className="grid grid-flow-row grid-cols-10 opacity-60 font-medium mt-10">
            <p className="col-span-2 text-lg">Image</p>
            <p className="col-span-4 text-lg">Product description</p>
            <p className="col-span-2 text-lg">Quantity</p>
            <p className="col-span-1 text-lg">Price</p>
          </div>
          {arrObj.map((shopItem, idx) => (
            <ShoppingCartItem
              description={shopItem.description}
              itemImg={shopItem.itemImg}
              quantity={shopItem.quantity}
              title={shopItem.title}
              key={idx}
            />
          ))}
        </div>
      </Dialog>
    </>
  )
}
