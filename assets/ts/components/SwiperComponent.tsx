import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ProfilePetCard } from './ProfileComponents/ProfilePetCard'
import ItemCarouselTemplate from './HomeComponents/ItemCarouselTemplate'
import { Virtual, Pagination, Navigation } from 'swiper'
import 'swiper/css/pagination'
import { TestimonialCarouselTemplate } from './HomeComponents/TestimonialCarouselTemplate'
import 'swiper/css/navigation'
export const SwiperComponent = (props: { type: string; page: string }) => {
  var sampleThing: number[] = [1, 1, 1, 11, 1, 1]

  const sampleItemObject = {
    id: 1,
    user_id: 1,
    category_id: 1,
    name: 'Memory Foam Dog Bed 1',
    price: 20,
    quantity: 2,
    description: 'pet item 1',
    state: 'new',
    images: undefined,
    created_at: 123,
    last_updated_at: 125,
    status: 'available',
    discount: 0,
  }

  let spaceBetween = 0
  let slidesPerView = 0

  switch (props.type) {
    case 'pets':
      spaceBetween = 0
      slidesPerView = 3.2
      break
    case 'items':
      spaceBetween = 25
      slidesPerView = 2.2
      break
    case 'testimonial':
      spaceBetween = 0
      slidesPerView = 1
      break
  }

  const breakPointObject =
    props.type === 'testimonial'
      ? undefined
      : {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 0,
          },
          480: {
            slidesPerView: props.type === 'items' ? 2.1 : 2.2,
          },
          768: {
            slidesPerView: props.type === 'items' ? 2.3 : 3.4,
          },
          1024: {
            slidesPerView: props.type === 'items' ? 2.2 : 2.5,
          },
          1279: {
            slidesPerView: props.type === 'items' ? 2.3 : 3.4,
          },
          1520: {
            slidesPerView: props.type === 'items' ? 3.3 : 3.7,
          },
        }

  return (
    <Swiper
      pagination={{
        enabled: props.type === 'items',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '">' + '</div>'
        },
      }}
      modules={[Pagination, Virtual, Navigation]}
      navigation={{
        enabled: props.type === 'testimonial',
      }}
      //   modules={[Virtual]}
      virtual
      autoplay
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      breakpoints={breakPointObject}>
      {sampleThing.map((e, index) => {
        return (
          <SwiperSlide className="" virtualIndex={index} key={index}>
            {props.type === 'pets' && (
              <div className="mb-12 4xl:mr-12 mr-6">
                <ProfilePetCard key={index} />
              </div>
            )}
            {props.type === 'items' && (
              <div className="mb-12 4xl:mr-12 mr-6" key={index}>
                <ItemCarouselTemplate item={sampleItemObject} />
              </div>
            )}
            {props.type === 'testimonial' && (
              <TestimonialCarouselTemplate
                key={index}
                id={0}
                user_id={0}
                description={'desc'}
                image={undefined}
              />
            )}
            {props.type === 'favorites' && (
              <div className="mb-24 4xl:mr-12 mr-6" key={index}>
                <ItemCarouselTemplate item={sampleItemObject} liked={true} />
              </div>
            )}
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
