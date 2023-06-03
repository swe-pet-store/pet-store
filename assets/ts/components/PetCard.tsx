import { IPetCard } from 'interfaces/petInterface'
import React from 'react'
import { AdoptButton } from './AdoptButton'
import petImg from './images/home-pet-1.png'
export const PetCard = (props: IPetCard) => {
  return (
    //w-1/3 h-1/3
    <div className=" sm:w-4/12 sm:h-4/12	lg:h-6/12 lg:w-4/12 bg-white flex-col place-items-center flex mr-5 lg:ml-5 mb-6 px-4 py-6 rounded-xl shadow-2xl">
      <img src={petImg} />
      <p className="mt-3 font-bold lg:text-md ">Hi, I'm {props.pet.name}</p>
      <AdoptButton id={props.pet.id} />
    </div>
  )
}
