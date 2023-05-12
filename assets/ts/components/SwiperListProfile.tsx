import React from 'react'
// Import Swiper styles
import { SwiperComponent } from './SwiperComponent'

export const SwiperListProfile = (props: any) => {
  //TODO change to virtual once API calls are done

  const textToDisplay =
    props.type === 'favorites' ? 'Favorites' : "duck's " + props.type

  return (
    <div className="mb-20">
      <div className="flex justify-between items-center mb-10">
        <p className="font-semibold text-4xl ">{textToDisplay}</p>
        {props.type !== 'favorites' && (
          <button className="text-2xl h-18 sm:h-16 w-32 lg:h-14 lg:w-44 bg-themeBrown-400 rounded-lg mr-20">
            Add new
          </button>
        )}
      </div>
      <SwiperComponent type={props.type} page="Profile" />
    </div>
  )
}
