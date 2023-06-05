import { AboutMe } from '../components/ProfileComponents/AboutMe'
import React, { useEffect, useState } from 'react'
import { SwiperListProfile } from '../components/SwiperListProfile'
import { Footer } from '../components/Footer'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useBoundStore } from 'store'

export const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const location = useLocation()
  const localData = location.state
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        console.log(token)
        const response = await axios.post('/api/user-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          localData: localData,
        })
        setUserData(response.data)
        localStorage.setItem('userData', JSON.stringify(response.data[0]))
      } catch (error) {
        console.log(error)
        // @ts-ignore
        if (error.response.status === 401) {
          const refresh_token = localStorage.getItem('refresh_token')
          if (refresh_token !== null) {
            localStorage.setItem('token', refresh_token)
          }
        }
      }
    }
    fetchUserData()
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  } else {
    console.log('USER DATA', userData)
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row xsm:mx-4 md:ml-4 mt-16">
        <AboutMe initialEmail={localData} userData={userData[0]} />
        <div className="min-w-0 3xl:ml-12 w-full">
          <SwiperListProfile type={'pets'} page={'profile'} />
          <SwiperListProfile type={'items'} page={'profile'} />
          <SwiperListProfile type={'favorites'} page={'profile'} />
        </div>
      </div>
      <Footer />
    </>
  )
}
