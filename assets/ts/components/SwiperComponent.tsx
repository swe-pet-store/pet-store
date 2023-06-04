import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ProfilePetCard } from './ProfileComponents/ProfilePetCard'
import ItemCarouselTemplate from './HomeComponents/ItemCarouselTemplate'
import { Virtual, Pagination, Navigation } from 'swiper'
import 'swiper/css/pagination'
import { TestimonialCarouselTemplate } from './HomeComponents/TestimonialCarouselTemplate'
import 'swiper/css/navigation'
import { ITestimonial } from 'interfaces/testimonialInterface'
import { IItem } from 'interfaces/itemInterface'
import { IPet } from 'interfaces/petInterface'
import { Link } from 'react-router-dom'
import { useBoundStore } from '../store/index'

export const SwiperComponent = (props: {
  type: string
  page: string
  itemsToShow: IItem[] | ITestimonial[] | IPet[]
  setItemVisible?: any
  setPetVisible?: any
}) => {
  let spaceBetween = 0
  let slidesPerView = 0

  const store = useBoundStore()

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

  function handleClickPet(item: any) {
    store.setDefaultModalItem(item)
    props.setPetVisible(true)
  }

  function handleItemClick(item: any) {
    store.setDefaultModalItem(item)
    props.setItemVisible(true)
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
      virtual
      autoplay
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      breakpoints={breakPointObject}>
      {props.itemsToShow.map((item: any, index: number) => {
        return (
          <SwiperSlide className="" virtualIndex={index} key={index}>
            {props.type === 'pets' && (
              <div
                className="mb-12 4xl:mr-12 mr-6"
                onClick={() => handleClickPet(item)}>
                <ProfilePetCard pet={item} key={index} />
              </div>
            )}
            {props.type === 'items' && props.page === 'Profile' && (
              <div
                className="mb-12 4xl:mr-12 mr-6"
                key={index}
                onClick={() => handleItemClick(item)}>
                <ItemCarouselTemplate item={item} />
              </div>
            )}
            {props.type === 'items' && props.page === 'Home' && (
              <div className="mb-12 4xl:mr-12 mr-6" key={index}>
                <Link to={`/item/${item.id}`}>
                  <ItemCarouselTemplate item={item} />
                </Link>
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
                <ItemCarouselTemplate item={item} liked={true} />
              </div>
            )}
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
