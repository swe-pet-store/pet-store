import React from 'react'
import dog from '../images/home-pet-1.png'
import { Badge } from './Badge'

export const ProfilePetCard = (props: any) => {
  return (
    <div className="4xl:mr-12 mr-6 flex flex-col justify-center items-center shadow-xl mb-12 rounded-xl bg-white">
      <div className="w-full h-[200px] xl:h-[250px] 2xl:h-[300px] 5xl:h-[400px] rounded-t-xl overflow-hidden">
        <img src={dog} className="w-full h-full object-cover object-center" />
      </div>
      <p className="mt-3 font-bold lg:text-md ">MARLEY</p>
      <p className="lg:text-md ">Yorkshire Terrier</p>
      <div className="flex self-end">
        <Badge />
      </div>
    </div>
  )
}
