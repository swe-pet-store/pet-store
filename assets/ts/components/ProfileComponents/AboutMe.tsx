import React from 'react'
import { PersonalInfo } from './PersonalInfo'
import duck from '../../components/images/duck.png'
export const AboutMe = () => {
  const personalDescription: any =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.'

  return (
    <>
      <div className="flex lg:flex-col flex-col sm:flex-row justify-around lg:justify-start lg:items-center mb-14 ">
        <div className="flex flex-col items-center justify-center">
          <button className="bg-themeBrown-400 w-20 h-10 md:w-28 md:h-14 rounded-2xl text-2xl self-start mb-8">
            Edit
          </button>
          <img
            src={duck}
            className="w-60 sm:w-40 lg:w-52 xl:w-60 2xl:w-80 mb-12 lg:mb-20"
          />
          <PersonalInfo />
        </div>
        <div className="flex flex-col items-center lg:justify-center mx-10 mt-10">
          <p className="font-medium text-4xl lg:mt-7 mb-7 ">About me!</p>
          {personalDescription !== '' ? (
            <p className="lg:w-72 text-md sm:text-lg text-2xl lg:text-2xl">
              {personalDescription}
            </p>
          ) : (
            <p>Nothing here</p>
          )}
        </div>
      </div>
    </>
  )
}
