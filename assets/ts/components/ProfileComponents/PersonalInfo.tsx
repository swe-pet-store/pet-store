import React from 'react'

export const PersonalInfo = () => {
  const name = 'DUCK DUCK'
  const email = 'email@gmail.com'
  const phoneNumber = 355697656445

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="font-medium text-4xl mb-3">{name}</p>
      <p className="text-3xl mb-3">{email}</p>
      <p className="text-3xl mb-3">+{phoneNumber}</p>
    </div>
  )
}
