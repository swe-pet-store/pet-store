import React, { useEffect, useState } from 'react'
import { IItem } from '../../interfaces/itemInterface'
import { SwiperComponent } from '../../components/SwiperComponent'
import axios from 'axios'
import { SkeletonComponent } from '../../components/SkeletonComponent'

export const HomeShopCarousel = ({ title }: { title: string }) => {
  // const items: IItem[] = [
  //   {
  //     id: 1,
  //     user_id: 1,
  //     category: { id: 1, name: 'Dog' },
  //     name: 'Memory Foam Dog Bed 1',
  //     price: 20,
  //     quantity: 2,
  //     description: 'pet item 1',
  //     state: 'new',
  //     images: undefined,
  //     created_at: 123,
  //     last_updated_at: 125,
  //     status: 'available',
  //     discount: 0,
  //   },
  //   {
  //     id: 2,
  //     user_id: 2,
  //     category: { id: 2, name: 'Cat' },
  //     name: 'Memory Foam Dog Bed 2',
  //     price: 20,
  //     quantity: 3,
  //     description: 'pet item 2',
  //     state: 'new',
  //     images: undefined,
  //     created_at: 124,
  //     last_updated_at: 127,
  //     status: 'available',
  //     discount: 0,
  //   },
  //   {
  //     id: 3,
  //     user_id: 3,
  //     category: { id: 1, name: 'Dog' },
  //     name: 'Memory Foam Dog Bed 3',
  //     price: 20,
  //     quantity: 5,
  //     description: 'Memory Foam Dog Bed 3',
  //     state: 'new',
  //     images: undefined,
  //     created_at: 123,
  //     last_updated_at: 125,
  //     status: 'available',
  //     discount: 0,
  //   },
  // ]

  const [items, setItems] = useState<IItem[]>()

  useEffect(() => {
    axios
      .get('/item/some-items')
      .then(res => setItems(res.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className="">
      <span className="justify-between mb-12 hidden lg:flex">
        <p className="text-3xl font-medium ">{title}</p>
        <button className="bg-black text-white px-16 py-5 -mt-2">
          SHOP MORE!
        </button>
      </span>
      <div className="">
        {items ? (
          <SwiperComponent
            type={'items'}
            page="Home"
            key={444}
            itemsToShow={items}
          />
        ) : (
          <div className="lg:-ml-12 md:-mt-8 h-72 overflow-y-hidden overflow-x-hidden mb-12">
            <SkeletonComponent amount={3} />
          </div>
        )}
      </div>
    </div>
  )
}
