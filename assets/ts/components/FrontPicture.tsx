import React, { useRef, useState } from 'react'
import blankPicture from './images/blank-picture-item-modal.svg'
import { HiOutlineTrash } from 'react-icons/hi'

export const FrontPicture = ({
  selectedFrontImage,
  setSelectedFrontImage,
  title,
  editable,
}: {
  selectedFrontImage: any
  setSelectedFrontImage: any
  title?: string
  editable?: boolean
}) => {
  const frontPictureInputRef = useRef<any>()

  const handleClick = () => {
    if (editable && editable !== undefined)
      frontPictureInputRef?.current?.click()
    else if (editable === undefined) {
      frontPictureInputRef?.current?.click()
    }
  }

  const handleChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFrontImage(event.target.files[0])
    }
  }

  const handleDeleteImage = () => {
    setSelectedFrontImage(null)
  }
  return (
    <div className="md:basis-1/4 text-center md:mr-5 flex-col items-center justify-center ">
      <input
        type="file"
        ref={frontPictureInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />
      {title && <p className="mb-3">{title}</p>}
      <div className="rounded-full justify-center items-center w-52 flex aspect-square relative">
        {selectedFrontImage && (
          <button
            onClick={() => handleDeleteImage()}
            className="absolute top-0 right-0 bg-red-700 px-2 py-2 rounded-full text-white font-medium">
            <HiOutlineTrash />
          </button>
        )}
        <img
          className={`cursor-pointer border object-cover  ${
            selectedFrontImage === null && 'bg-[#D9D9D9] object-scale-down'
          }  h-full w-full rounded-full`}
          src={
            selectedFrontImage === null
              ? blankPicture
              : selectedFrontImage instanceof Object
              ? URL.createObjectURL(selectedFrontImage)
              : selectedFrontImage
          }
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
