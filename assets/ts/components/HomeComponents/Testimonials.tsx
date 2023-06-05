import React from 'react'
import { TestimonialCarousel } from './TestimonialCarousel'
import { SwiperComponent } from '../../components/SwiperComponent'

export const Testimonals = () => {
  return (
    <div className="bg-themeBrown-400 -mx-4 md:-mx-14">
      <SwiperComponent
        itemsToShow={[]}
        page="Home"
        type="testimonial"
        key={0}
      />
    </div>
  )
}
