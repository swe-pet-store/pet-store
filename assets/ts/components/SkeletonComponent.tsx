import { Skeleton } from 'primereact/skeleton'
import React from 'react'
export const SkeletonComponent = ({
  amount,
  home,
}: {
  amount: number
  home?: boolean
}) => {
  return (
    <div className="lg:mx-14 w-full">
      <div
        className={`flex flex-col gap-5 sm:flex-wrap sm:flex-row ${
          !home && `lg:justify-between`
        } sm:gap-5 md:gap-8 lg:gap-5 ${
          home && 'ml-16 lg:gap-14 lg:justify-start'
        } mt-11 `}>
        {Array.from(Array(amount).keys()).map((_, index) => (
          <div
            className={`w-[90%] sm:w-[45%] ${home && 'md:w-[45%]'} lg:w-[30%]`}
            key={index}>
            <Skeleton width="90%" height="18rem"></Skeleton>
            <Skeleton width="60%" className="mt-2"></Skeleton>
            <Skeleton width="50%" className="mt-2"></Skeleton>
          </div>
        ))}
      </div>
    </div>
  )
}
