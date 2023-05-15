import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export const ImageUploadHolder = ({
  selectedImages,
  handleDeleteImage,
}: {
  selectedImages: any[]
  handleDeleteImage: (arg0: number) => void
}) => {
  return (
    <div className="mt-3 flex flex-wrap w-4/5 ">
      {selectedImages &&
        selectedImages.map((image: Blob | MediaSource, i: number) => {
          console.log(image)

          return (
            <div
              key={i}
              className="flex justify-start items-start relative max-h-28 w-1/3">
              <img
                src={URL.createObjectURL(image)}
                alt="Test"
                className="object-contain w-full max-h-full"
              />
              <button
                onClick={() => handleDeleteImage(i)}
                className="absolute top-0 right-0 bg-red-700 px-2 py-2 rounded-full text-white font-medium">
                <HiOutlineTrash />
              </button>
            </div>
          )
        })}
    </div>
  )
}
