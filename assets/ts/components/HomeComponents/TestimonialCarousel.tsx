import React from 'react'
import { Carousel } from 'primereact/carousel'
import { ITestimonial } from 'interfaces/testimonialInterface'
import testimonialImage from '../../components/images/testimonial-image.png'
import { TestimonialCarouselTemplate } from './TestimonialCarouselTemplate'
import rightArrow from '../../components/images/right-arrow-icon.png'
import leftArrow from '../../components/images/left-arrow-icon.png'

export const TestimonialCarousel = () => {
  const testimonials: ITestimonial[] = [
    {
      id: 1,
      user_id: 1,
      description: 'This is a description',
      image: testimonialImage,
    },
    {
      id: 2,
      user_id: 2,
      description: 'This is the second description',
      image: testimonialImage,
    },
    {
      id: 3,
      user_id: 3,
      description: 'This is the THIRD description',
      image: testimonialImage,
    },
  ]

  return (
    <div className="">
      {testimonials && (
        <Carousel
          value={testimonials}
          numVisible={1}
          numScroll={1}
          itemTemplate={TestimonialCarouselTemplate}
          showNavigators={true}
          showIndicators={false}
          nextIcon={<img src={rightArrow} className="sm:w-full" />}
          prevIcon={<img src={leftArrow} className="sm:w-full" />}
        />
      )}
    </div>
  )
}
