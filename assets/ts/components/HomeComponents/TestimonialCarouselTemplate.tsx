import React from 'react'
import memoryFoam from '../images/memory-foam-item.png'
import { ITestimonial } from 'interfaces/testimonialInterface'

export const TestimonialCarouselTemplate = (testimonial: ITestimonial) => {
  const desc =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <div className="rounded-2xl self-center items-center justify-center flex py-28 px-3">
      <div className="flex flex-col items-center justify-center w-8/12 sm:7/12 md:6/12 lg:w-6/12">
        <img
          src={testimonial.image}
          alt={'' + testimonial.id}
          className="shadow-2 w-32"
        />
        <p className="font-semibold text-xl sm:text-2xl mt-5 ">Name Surname</p>
        <p className="opacity-50 text-2xl">location</p>
        <p className="font-normal text-xl italic md:text-3xl mt-5">{`"${desc}"`}</p>
      </div>
    </div>
  )
}
