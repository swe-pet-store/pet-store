import React from 'react'
import searchGlass from './images/small-search.svg'
export const Search = ({ filterTextFunction }: { filterTextFunction: any }) => {
  return (
    <div className="w-1/2 lg:w-1/3 flex items-center border bg-white shadow-lg px-5 py-5 rounded-full overflow-hidden mr-4">
      <img src={searchGlass} className="mr-3 w-7" />
      <input
        className="font-medium text-xl  text-gray-800 placeholder-gray-500 outline-none"
        placeholder="Search..."
        onChange={filterTextFunction}
      />
    </div>
  )
}
