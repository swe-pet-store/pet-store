import { HomeShop } from '../components/HomeComponents/HomeShop'
import { HomeIntro } from '../components/HomeComponents/HomeIntro'
import React from 'react'
import { Testimonals } from '../components/HomeComponents/Testimonials'
import { Footer } from '../components/Footer'

export const Home = () => {
  return (
    <div className=" md:mx-14 mx-4 mt-14 lg:mt-28">
      <div className="lg:mx-10">
        <HomeIntro />
        <HomeShop />
      </div>
      <Testimonals />
      <Footer />
    </div>
  )
}
