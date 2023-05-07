import React from 'react'

interface ISingleCategory {
  name: string
  imgSrc: any
}

export const SingleCategory = ({ name, imgSrc }: ISingleCategory) => {
  return (
    <div className="bg-[#FEEDBF] xsm:w-24 sm:w-28 md:w-40 rounded-3xl flex flex-col place-items-center justify-end">
      <p className="font-bold text-md xsm:text-sm sm:text-xl lg:text-2xl mb-2">
        {name}
      </p>
      <img src={imgSrc} className="object-contain xsm:h-14 sm:h-20 md:h-auto" />
    </div>
  )
}
