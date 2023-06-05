import { IItem } from 'interfaces/itemInterface'
import { Dropdown } from 'primereact/dropdown'

import React, { useState, useRef } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useBoundStore } from '../../store/index'
import { Toast } from 'primereact/toast'
import { showSuccessToast } from '../../utils/helperFunctions'
import axios from 'axios'

export const SingleItemInfo = (props: IItem) => {
  const [liked, setLiked] = useState<boolean>()

  const quantMax = Array.from(Array(props.quantity).keys())

  const [quantitySelected, setQuantitySelected] = useState<number>(1)
  const toastRef = useRef<any>()
  const store = useBoundStore()

  // const user: any = localStorage.getItem('userData')
  // console.log(user)
  const user: any = JSON.parse(localStorage.getItem('userData')!)

  const userId = user ? user?.id : null

  return (
    <>
      <span className="flex items-center">
        <p className="text-5xl font-medium">{props.name}</p>
        {liked ? (
          <HiHeart
            className="h-16 w-16 text-red-600 flex-shrink-0 cursor-pointer ml-24"
            onClick={() => setLiked(e => !e)}
          />
        ) : (
          <HiOutlineHeart
            className="h-16 w-16 flex-shrink-0 cursor-pointer ml-24"
            onClick={() => setLiked(e => !e)}
          />
        )}
      </span>
      <p className="opacity-50 text-2xl font-medium">{props.state}</p>
      <p className="text-xl w-3/4 mt-14">{props.description}</p>
      <div className="flex items-center justify-between w-3/4 mt-10">
        <span>
          <p className="opacity-50 text-2xl">Quantity</p>
          <Dropdown
            // editable={quantMax.length > 0}
            disabled={!(quantMax.length > 0)}
            panelStyle={{ fontSize: '24px' }}
            className="text-3xl w-20 mt-3"
            value={quantitySelected}
            onChange={e => {
              if (e.value < props.quantity) setQuantitySelected(e.value)
              else setQuantitySelected(props.quantity)
            }}
            options={quantMax}
            placeholder={'1'}
            min={1}
            max={props.quantity}
          />
        </span>
        <span>
          <p className="opacity-50 text-2xl">Price</p>
          <p className="text-4xl font-semibold mt-3">
            {`$`}
            {props.price}
          </p>
        </span>
      </div>
      <div className="w-3/4 flex items-center justify-center mt-10">
        <button
          className="bg-themeYellow-400 text-2xl font-semibold text-center px-12 py-3 rounded-full"
          onClick={() => {
            const bodyToPass = {
              userId: userId,
              itemId: props.id,
              quantity: quantitySelected,
            }
            axios
              .post('/cart/add-order', bodyToPass)
              .then(res => {
                store.addShoppingCartItem({ order: res.data })
              })
              .catch(err => console.error(err))
            showSuccessToast(toastRef, 'Item added to cart')
          }}>
          Add To Basket
        </button>
      </div>
      <Toast ref={toastRef} />
    </>
  )
}
