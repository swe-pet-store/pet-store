import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export const AdoptButton = ({ id }: { id: number }) => {
  return (
    <Link
      className={`bg-themeYellow-400 px-2 xl:px-5 py-1 rounded-full font-bold md:text-sm xl:text-md 2xl:text-2xl mt-4`}
      to={`/pet/${id}`}>
      Adopt me!
    </Link>
  )
}
