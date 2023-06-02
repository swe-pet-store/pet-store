import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper'
export const PetImageGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null | undefined>()

  const randArr = [1, 1, 1, 1, 1, 1]
  return (
    <>
      <Swiper
        style={{
          height: 400,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
        // loop={true}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2">
        {randArr.map((_, index) => {
          return (
            <SwiperSlide virtualIndex={index} key={index}>
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                className="object-cover object-center h-full w-full"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        style={{
          paddingTop: 40,
          paddingBottom: 40,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          backgroundColor: 'white',
          paddingRight: 40,
          paddingLeft: 20,
        }}
        onSwiper={e => setThumbsSwiper(e)}
        slidesPerView={2}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper">
        {randArr.map((_, index) => {
          return (
            <SwiperSlide virtualIndex={index} key={index} style={{}}>
              <div className="h-full w-full items-center justify-center flex">
                <img
                  style={{ aspectRatio: 4 / 3 }}
                  src="https://swiperjs.com/demos/images/nature-1.jpg"
                  className="w-10/12
                    object-cover object-center
                  "
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
