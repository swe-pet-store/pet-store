import React from 'react'

interface IPetDetailed {
  description: string
  facts?: string
}

export const PetDetailedInfo = ({ description, facts }: IPetDetailed) => {
  return (
    <div className="mt-10 text-xl">
      <span className="flex flex-col items-center justify-center">
        <p className="font-bold mb-5 text-3xl">{'Description'}</p>
        <p>{description}</p>
      </span>
      <span className="flex flex-col items-center justify-center mt-10">
        <p className="font-bold mb-5 text-3xl">{'Facts about this breed'}</p>
        <p>{facts}</p>
      </span>
    </div>
  )
}
