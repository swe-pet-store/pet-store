import { AboutMe } from '../components/ProfileComponents/AboutMe'
import React from 'react'
import { SwiperListProfile } from '../components/SwiperListProfile'
import { Footer } from '../components/Footer'

export const ProfilePage = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row xsm:mx-4 md:ml-4 mt-16">
        <AboutMe />
        <div className="min-w-0 3xl:ml-12">
          <SwiperListProfile type={'pets'} page={'profile'} />
          <SwiperListProfile type={'items'} page={'profile'} />
          <SwiperListProfile type={'favorites'} page={'profile'} />
        </div>
      </div>
      <Footer />
    </>
  )
}
