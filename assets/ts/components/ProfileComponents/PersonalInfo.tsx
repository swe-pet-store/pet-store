import React from 'react'

export const PersonalInfo = () => {
  const name = 'DUCK DUCK'
  const email = 'email@gmail.com'
  const phoneNumber = 355697656445

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="font-medium md:text-2xl sm:text-2xl xsm:text-3xl lg:text-4xl lg:mb-3 mb-1">
        {name}
      </p>
      <p className="lg:text-3xl md:text-2xl sm:text-2xl xsm:text-3xl lg:mb-3 mb-1">
        {email}
      </p>
      <p className="lg:text-3xl md:text-2xl sm:text-2xl xsm:text-3xl lg:mb-3 mb-1">
        +{phoneNumber}
      </p>
    </div>
  )
}
