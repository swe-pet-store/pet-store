import React from 'react'
import { Logo } from './Logo'
import instagram from './images/ig-svg.svg'
import twitter from './images/twitter-svg.svg'
import facebook from './images/facebook-svg.svg'

export const Footer = () => {
  return (
    <div className="bg-themeBrown-800 pt-20 h-96">
      <div className="h-full flex mx-96 gap-8">
        <span>
          <Logo />
        </span>
        <span className="gap-2 flex flex-col text-lg ml-14">
          <p className="font-semibold text-xl">Pet</p>
          <p className="opacity-90">Browse</p>
          <p className="opacity-90 whitespace-pre-wrap">
            {'Put up\nfor adoption'}
          </p>
        </span>
        <span className="gap-2 flex flex-col text-lg ml-14">
          <p className="font-semibold text-xl">Shop</p>
          <p>Browse</p>
          <p>Sell Items</p>
        </span>
        <span className="gap-2 flex flex-col text-lg ml-14">
          <p className="font-semibold text-xl">My Account</p>
          <p>Login</p>
          <p>Register</p>
          <p>Profile</p>
        </span>
        <span className="gap-2 flex flex-col text-lg ml-14">
          <p className="font-semibold text-xl">About us</p>
          <p>Our Team</p>
          <p>Contact Us</p>
        </span>

        <div className="flex ml-5">
          <span className="w-20 h-20  rounded-full flex items-center justify-center">
            <img src={instagram} className="w-7/12" />
          </span>
          <span className="w-20 h-20  rounded-full flex items-center justify-center">
            <img src={twitter} className="w-7/12" />
          </span>
          <span className="w-20 h-20  rounded-full flex items-center justify-center">
            <img src={facebook} className="w-9/12" />
          </span>
        </div>
      </div>
    </div>
  )
}
