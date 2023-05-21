import React from 'react'
import { HomeShopCategories } from './HomeShopCategories'
import { HomeShopCarousel } from './HomeShopCarousel'

export const HomeShop = () => {
  return (
    <>
      <div className="flex flex-col mt-32">
        <span className="flex justify-between mb-8 items-center">
          <p className="flex lg:justify-center text-[20px] sm:text-2xl lg:align-middle font-bold lg:text-3xl lg:mb-12 ">
            SHOP OUR PRODUCTS
          </p>
          <button className="bg-black text-white text-[14px] px-6 py-4 sm:px-8 sm:py-3 sm:text-sm lg:text-2xl lg:px-16 lg:py-5 -mt-2 lg:hidden">
            SHOP MORE!
          </button>
        </span>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-9">
          <HomeShopCategories />
          <div className="col-span-8">
            <HomeShopCarousel />
          </div>
        </div>
      </div>
    </>
  )
}
