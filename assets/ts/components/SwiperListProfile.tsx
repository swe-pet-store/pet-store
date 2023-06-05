import React, { useEffect, useState } from 'react'
// Import Swiper styles
import { SwiperComponent } from './SwiperComponent'
import { NewItemModal } from './modals/NewItemModal'
import { setItem } from 'localforage'
import { NewPetModal } from './modals/NewPetModal'
import axios from 'axios'
export const SwiperListProfile = (props: any) => {
  //TODO change to virtual once API calls are done

  const textToDisplay =
    props.type === 'favorites' ? 'Favorites' : "duck's " + props.type
  const [itemModalVisible, setItemModalVisible] = useState<boolean>(false)
  const [petModalVisible, setPetModalVisible] = useState<boolean>(false)

  const modalHandleVisible =
    props.type === 'pets' ? setPetModalVisible : setItemModalVisible

  const [itemsToPass, setItemsToPass] = useState([])

  const user: any = JSON.parse(localStorage.getItem('userData')!)

  const likedItemIds = user.likedItems
  const userId = user.id

  useEffect(() => {
    if (props.type === 'favorites') {
      axios
        .get(`/item/liked-items`, {
          params: { itemIds: likedItemIds },
        })
        .then(response => {
          setItemsToPass(response.data)
        })
        .catch(err => console.error(err))
    } else if (props.type === 'items') {
      axios
        .get(`/item/personal-items/${userId}`)
        .then(response => {
          setItemsToPass(response.data)
        })
        .catch(err => console.error(err))
    } else {
      axios
        .get(`/pet/personal-pets/${userId}`)
        .then(response => {
          setItemsToPass(response.data)
        })
        .catch(err => console.error(err))
    }
  }, [])

  return (
    <>
      <div className="mb-20">
        <div className="flex justify-between items-center mb-10">
          <p className="font-semibold text-4xl ">{textToDisplay}</p>
          {props.type !== 'favorites' && (
            <button
              className="text-2xl h-18 sm:h-16 w-32 lg:h-14 lg:w-44 bg-themeBrown-400 rounded-lg mr-20"
              onClick={() => modalHandleVisible(true)}>
              Add new
            </button>
          )}
        </div>
        <SwiperComponent
          setItemVisible={setItemModalVisible}
          setPetVisible={setPetModalVisible}
          itemsToShow={itemsToPass}
          type={props.type}
          page="Profile"
          key={9090}
        />
      </div>
      {/* Add Item Modal */}
      <NewItemModal
        visible={itemModalVisible}
        setVisible={setItemModalVisible}
      />
      <NewPetModal visible={petModalVisible} setVisible={setPetModalVisible} />
    </>
  )
}
