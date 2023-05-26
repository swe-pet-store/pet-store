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
        // virtual
        style={{}}
        loop={true}
        // spaceBetween={40}
        navigation={true}
        // centeredSlides={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        // thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2">
        {randArr.map((_, index) => {
          return (
            <SwiperSlide virtualIndex={index} key={index}>
              <img
                className="w-[450px]"
                src="https://swiperjs.com/demos/images/nature-1.jpg"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={e => setThumbsSwiper(e)}
        loop={true}
        spaceBetween={0}
        slidesPerView={4}
        centeredSlides={true}
        // freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper">
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-5.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-6.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-7.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-8.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-9.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[186px] h-[146px]"
            src="https://swiperjs.com/demos/images/nature-10.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
