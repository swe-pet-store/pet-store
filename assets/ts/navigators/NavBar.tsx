import React, { useState } from 'react'
import { Logo } from '../components/Logo'
import { MenuHolder } from './MenuHolder'
import { Sidebar } from 'primereact/sidebar'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Image } from 'primereact/image'
import shoppingCart from '../components/images/shopping-cart.svg'
import profileImage from '../components/images/profile-icon.png'
import { Link } from 'react-router-dom'

export const NavBar = ({ setShowCart }: { setShowCart: any }) => {
  const [visibleRight, setVisibleRight] = useState(false)
  const profileImagePath = localStorage.getItem('userData')
    ? '/profile'
    : '/login'
  return (
    <>
      <div className={`flex items-center justify-between self-center mx-12 `}>
        <div className="flex font-bold text-3xl md:text-2xl lg:text-3xl">
          <Logo />
          <MenuHolder flexType={'flex'} hidden="hidden" />
        </div>

        <div className="h-10 w-10 ml-12">
          <RxHamburgerMenu
            className="md:hidden"
            size={30}
            onClick={() => {
              setVisibleRight(true)
            }}
          />
        </div>

        <div className="md:flex md:justify-center items-center space-x-5 hidden mr-5 lg:mr-12">
          <div
            onClick={() => setShowCart(true)}
            className="w-[45px] lg:w-[55px] cursor-pointer">
            <img
              src={shoppingCart}
              alt="search"
              className="mix-blend-multiply"
            />
          </div>
          <Link to={profileImagePath} className="w-[45px] lg:w-[55px]">
            <img
              src={profileImage}
              alt="profile"
              className="mix-blend-multiply"
            />
          </Link>
        </div>
      </div>
      <div className="bg-slate-800 h-[3px] mt-4 " />

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}>
        <div className="text-3xl">
          <MenuHolder flexType="flex flex-col" hidden="" />
        </div>
      </Sidebar>
    </>
  )
}
