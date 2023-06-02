import React from 'react'
import { PetHeaderInfo } from '../components/SinglePetComponents/PetHeaderInfo'
import { PetDetailedInfo } from '../components/SinglePetComponents/PetDetailedInfo'
import { PetImageGallery } from '../components/SinglePetComponents/PetImageGallery'
import { HomeShopCarousel } from '../components/HomeComponents/HomeShopCarousel'
import { Footer } from '../components/Footer'

export const SinglePetPage = () => {
  const petDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  const facts = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  return (
    <>
      <div className="flex mx-10 flex-col">
        <div className="flex mt-20 border-b-2 border-b-gray-900 pb-32">
          {/* <img src={randImage} className="w-3/4 aspect-square" /> */}

          <div className="min-w-0 basis-5/12 pr-32 pl-20 ">
            <PetImageGallery />
          </div>
          <div className="basis-7/12">
            <PetHeaderInfo
              age="2"
              email="duckmail@gmail.com"
              breed="persian"
              name="Minnie"
              owner="Duck Duck"
              phoneNumber="+355676202133"
            />
            <PetDetailedInfo description={petDesc} facts={facts} />
          </div>
        </div>
        <div className="mt-20">
          <HomeShopCarousel title={'Shop for your new pet!'} />
        </div>
      </div>
      <Footer />
    </>
  )
}
