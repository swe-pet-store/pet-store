import React from 'react'
import { Button } from 'primereact/button'
import memoryFoam from '../images/memory-foam-item.png'
import { IItem } from 'interfaces/itemInterface'
import Heart from '../images/heart-01-svgrepo-com 1.png'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'

interface ItemInterface {
  item: IItem
  liked?: boolean
}

export const ItemCarouselTemplate = ({ item, liked }: ItemInterface) => {
  return (
    <div className="bg-white 4xl:mr-12 mr-6 rounded-2xl shadow-md lg:shadow-xl mb-24">
      <div className="w-full md:h-1/2 rounded-t-xl overflow-hidden">
        <img
          src={memoryFoam}
          className="w-full h-full object-cover object-center shadow-2"
        />
      </div>

      <div className="xl:mx-8 mx-4 pb-5 xl:pb-10">
        <div className="flex justify-between items-center mt-2 lg:mt-5 mb-2 lg:mb-5">
          <p className="font-semibold text-xl sm:text-lg line-clamp-2 break-words mr-5">
            {item.name}
          </p>
          {liked ? (
            <HiHeart className="h-8 w-8 text-red-600 flex-shrink-0" />
          ) : (
            <HiOutlineHeart className="h-8 w-8 flex-shrink-0" />
          )}
        </div>
        <p className="font-semibold text-xl sm:text-2xl">${item.price}</p>
      </div>
    </div>
  )
}
