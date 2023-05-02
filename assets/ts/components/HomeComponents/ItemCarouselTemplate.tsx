import React from 'react'
import { Button } from 'primereact/button'
import memoryFoam from '../images/memory-foam-item.png'
import { IItem } from 'interfaces/itemInterface'
import Heart from '../images/heart-01-svgrepo-com 1.png'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'

export const responsiveOptions = [
  {
    breakpoint: '1199px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '1190px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '600px',
    numVisible: 1,
    numScroll: 1,
  },
]

export const ItemCarouselTemplate = (item: IItem) => {
  return (
    <div className="bg-white 4xl:mx-12 mx-6 rounded-2xl shadow-md lg:shadow-xl mb-24">
      <div className="">
        <img src={memoryFoam} alt={item.name} className="shadow-2 w-full" />
      </div>
      <div className="mx-8 pb-10 ">
        <div className="flex justify-between items-center mt-10 mb-5">
          <p className="font-semibold text-xl sm:text-2xl ">{item.name}</p>
          <HiOutlineHeart className="h-8 w-8" />
          {/* <HiHeart className="h-8 w-8 text-red-600" /> */}
        </div>
        <p className="font-semibold text-xl sm:text-3xl">${item.price}</p>
      </div>
    </div>
  )
}
