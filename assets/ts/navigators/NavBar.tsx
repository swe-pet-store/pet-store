import React, { useState } from 'react'
import { Logo } from '../components/Logo'
import { MenuHolder } from './MenuHolder'
import { Sidebar } from 'primereact/sidebar'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Image } from 'primereact/image'
import searchImage from '../components/images/search-icon.png'
import profileImage from '../components/images/profile-icon.png'
import { Link } from 'react-router-dom'

export const NavBar = ({}: {}) => {
  const [visibleRight, setVisibleRight] = useState(false)

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
          <Link to={'/'} className="w-[35px] lg:w-[35px]">
            <img
              src={searchImage}
              alt="search"
              className="mix-blend-multiply"
            />
          </Link>
          <Link to={'/login'} className="w-[45px] lg:w-[55px]">
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
