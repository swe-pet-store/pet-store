import React, { useState, useEffect } from 'react'
import randImage from '../components/images/memory-foam-item.png'
import { Footer } from '../components/Footer'
import { SingleItemInfo } from '../components/SingleItemComponent/SingleItemInfo'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const SingleItemPage = () => {
  const { id } = useParams()

  const [responseInfo, setResponseInfo] = useState<any>()

  useEffect(() => {
    axios.get(`/item/specific-item?id=${id}`).then(res => {
      setResponseInfo(res.data)
    })
  }, [])

  // const title = `Memory Foam Dog Bed`
  // const desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  if (!responseInfo) return <div></div>
  return (
    <>
      <div className="flex mx-10 flex-row mt-24 mb-32">
        <div className="basis-1/2 ml-14 ">
          <img
            src={responseInfo.images[0]}
            className="w-11/12 object-contain object-left"
          />
        </div>
        <div className="basis-1/2 mr-32">
          <SingleItemInfo
            category={responseInfo.category.id}
            created_at={responseInfo.created_at}
            description={responseInfo.description}
            id={responseInfo.id}
            images={responseInfo.images}
            last_updated_at={responseInfo.last_updated_at}
            name={responseInfo.name}
            price={responseInfo.price}
            quantity={responseInfo.quantity}
            state={responseInfo.state}
            status={responseInfo.status}
            user_id={responseInfo.user.id}
            discount={responseInfo.discount}
            key={responseInfo.id}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
