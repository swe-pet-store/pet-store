import React from 'react'

export const Badge = () => {
  return (
    <div className="flex overflow-hidden relative mb-4 mt-3">
      <div className="rotate-[45deg] bg-white h-7 w-7 -left-4 absolute"></div>
      <div className="bg-themeGreen justify-center items-center flex h-7 w-32">
        <p className="font-semibold">Adopted</p>
      </div>
    </div>
  )
}
