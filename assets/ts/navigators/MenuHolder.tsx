import React from 'react'
import { Link } from 'react-router-dom'

export const MenuHolder = ({ flexType }: { flexType: string }) => {
  return (
    <nav
      className={`${flexType} space-y-5 hidden md:flex md:content md:space-y-0 md:space-x-8 mr-10 ml-24 `}>
      <Link to={'/'}>home</Link>
      <Link to={'/adopt_me'}>adopt me!</Link>
      <Link to={'/shop'}>shop</Link>
    </nav>
  )
}
