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
      <div className={`flex items-center justify-between `}>
        <div className="flex font-bold text-3xl">
          <Logo />
          <MenuHolder flexType={'flex'} />
        </div>

        <div className="h-10 w-10 mr-12 ml-12">
          <RxHamburgerMenu
            className="md:hidden "
            size={30}
            onClick={() => {
              setVisibleRight(true)
            }}
          />
        </div>

        <div className="md:flex md:justify-center items-center space-x-5 hidden mr-12">
          <Link to={'/'}>
            <img
              src={searchImage}
              alt="search"
              width="35px"
              className="mix-blend-multiply"
            />
          </Link>
          <Link to={'/login'}>
            <img
              src={profileImage}
              alt="profile"
              width="55px"
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
          <MenuHolder flexType="flex-col" />
        </div>
      </Sidebar>
    </>
  )
}
