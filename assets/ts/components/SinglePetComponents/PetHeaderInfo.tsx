import React from 'react'

interface IPetInfo {
  name: string
  breed: string
  age: string
  owner: string
  phoneNumber: string
  email: string
}

export const PetHeaderInfo = ({
  name,
  breed,
  age,
  email,
  owner,
  phoneNumber,
}: IPetInfo) => {
  return (
    <div className="text-2xl">
      <p className="font-bold text-5xl mb-7">{name}</p>
      <p className="mt-1">
        <span className="font-semibold mr-2">Breed:</span>
        {breed}
      </p>
      <p className="mt-1">
        <span className="font-semibold mr-2">Age:</span>
        {age} years old
      </p>
      <p className="mt-1">
        <span className="font-semibold mr-2">Owner:</span>
        {owner}
      </p>
      <p className="mt-1">
        <span className="font-semibold mr-2">Phone Number:</span>
        {phoneNumber}
      </p>
      <p className="mt-1">
        <span className="font-semibold mr-2">Email:</span>
        {email}
      </p>
    </div>
  )
}
