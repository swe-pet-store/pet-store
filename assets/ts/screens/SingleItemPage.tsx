import React from 'react'
import randImage from '../components/images/memory-foam-item.png'
import { Footer } from '../components/Footer'
import { SingleItemInfo } from '../components/SingleItemComponent/SingleItemInfo'

export const SingleItemPage = () => {
  const title = `Memory Foam Dog Bed`
  const desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  return (
    <>
      <div className="flex mx-10 flex-row mt-24 mb-32">
        <div className="basis-1/2 ml-14 ">
          <img src={randImage} className="w-11/12 object-contain object-left" />
        </div>
        <div className="basis-1/2 mr-32">
          <SingleItemInfo
            category_id={1}
            created_at={121}
            description={desc}
            id={1}
            images={null}
            last_updated_at={124}
            name={title}
            price={20}
            quantity={4}
            state={'New'}
            status="Available"
            user_id={2}
            discount={undefined}
            key={1}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
