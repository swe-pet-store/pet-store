import React from 'react'
import { PersonalInfo } from './PersonalInfo'
import duck from '../../components/images/duck.png'
export const AboutMe = () => {
  const personalDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.'

  return (
    <>
      <div className="flex flex-col justify-center items-center ml-12">
        <div className="self-start mb-8">
          <button className="bg-themeBrown-400 w-28 h-14 rounded-2xl text-2xl">
            Edit
          </button>
        </div>
        <img src={duck} className="w-80 mb-20" />
        <PersonalInfo />
        <p className="font-medium text-4xl mt-7 mb-7">About me!</p>
        {personalDescription !== '' ? (
          <p className="w-72 text-2xl">{personalDescription}</p>
        ) : (
          <p>Nothing here</p>
        )}
      </div>
    </>
  )
}
