import { HomeShop } from '../components/HomeComponents/HomeShop'
import { HomeIntro } from '../components/HomeComponents/HomeIntro'
import React from 'react'
import { Testimonals } from '../components/HomeComponents/Testimonials'

export const Home = () => {
  return (
    <div className="mt-14 lg:mt-28 lg:mx-10">
      <HomeIntro />
      <HomeShop />
      <Testimonals />
    </div>
  )
}
