import React, { useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { ImageUploadHolder } from '../ImageUploadHolder'
import { FrontPicture } from '../FrontPicture'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Tooltip } from 'primereact/tooltip'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
//@ts-ignore
import styles from '../../../styles/profile.module.css'
import axios from 'axios'
import {
  blobsToBase64,
  blobToBase64,
  showErrorToast,
  showProcessingToast,
  showSuccessToast,
} from '../../utils/helperFunctions'

export const NewPetModal = (props: any) => {
  const toast = useRef<any>()

  const showWarningToast = () => {
    toast.current!.show({
      severity: 'warn',
      summary: 'Warning',
      detail: 'You can only add up to 5 additional images per item',
    })
  }

  const [selectedImages, setSelectedImages] = useState<any[]>([])

  const [selectedFrontImage, setSelectedFrontImage] = useState<null | any>(null)

  const [category, setCategory] = useState<any | null>(null)

  const [name, setName] = useState<string>()

  const [breed, setBreed] = useState<string>()

  const [status, setStatus] = useState<any>()

  const [description, setDescription] = useState<string>()
  const [facts, setFacts] = useState<string>()
  const [disabled, setDisabled] = useState(false)
  const hiddenImageInput = useRef<any>()

  const statuses = ['Not adopted', 'Adopted']

  const categories = ['Dog', 'Cat', 'Other']

  const handleClick = () => {
    if (selectedImages.length >= 5) {
      showWarningToast()
      return
    }
    hiddenImageInput?.current?.click()
  }

  const handleChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length > 5) {
        showWarningToast()
      }

      setSelectedImages(currentImages => [
        ...currentImages,
        ...Object.values(event.target.files).slice(0, 5),
      ])
    }
  }

  const handleDeleteImage = (index: number) => {
    setSelectedImages(prevImages => prevImages?.filter((_, i) => i !== index))
  }
  function handleSubmit() {
    setDisabled(true)
    showProcessingToast(toast)
    if (selectedImages.length === 0) {
      showErrorToast(toast, 'You have added no images')
      setDisabled(false)
      return
    }

    blobsToBase64(selectedImages).then(base64Array => {
      blobToBase64(selectedFrontImage)
        .then(frontImage64 => {
          const bodyForm = {
            category: category,
            name: name,
            breed: breed,
            status: status,
            description: description,
            facts: facts,
            images: base64Array,
            frontImage: frontImage64,
          }

          axios.post('/pet/add-pet', bodyForm).then(response => {
            setDisabled(false)
            showSuccessToast(
              toast,
              'You have successfully added this pet to your page',
            )
            props.setVisible(false)
          })
        })

        .catch(err => showErrorToast(toast, err.message))
    })
  }

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={props.visible}
        className=" xsm:w-full sm:w-2/3 xl:w-1/2 "
        onHide={() => props.setVisible(false)}>
        <div className="flex flex-col mx-0 md:mx-5 font-medium text-lg ">
          <div className="flex flex-col md:flex-row w-full items-center">
            <FrontPicture
              title="Pet profile picture"
              selectedFrontImage={selectedFrontImage}
              setSelectedFrontImage={setSelectedFrontImage}
            />

            <div className="md:basis-3/4 w-full text-center mt-5 md:mt-0 ">
              <p className="mb-3">Additional pictures</p>
              <input
                type="file"
                ref={hiddenImageInput}
                onChange={handleChange}
                accept="image/*"
                className="hidden"
                multiple
              />
              <div className="flex border overflow-hidden border-black rounded-md relative min-h-[200px] ">
                <button
                  onClick={handleClick}
                  className="bg-themeGreen w-12 aspect-square rounded-md absolute right-0 top-0 ">
                  <p className="text-4xl font-medium -mt-2">+</p>
                </button>
                <ImageUploadHolder
                  selectedImages={selectedImages}
                  handleDeleteImage={handleDeleteImage}
                  key={0}
                />
              </div>
            </div>
          </div>

          <Tooltip target=".custom-target-icon" position="top" event="both" />

          <div className="mt-5 flex flex-col md:flex-row">
            <div
              className="flex flex-col basis-1/4 mr-5 justify-between"
              style={styles}>
              <div className="w-full">
                <p>Categories</p>
                <Dropdown
                  className="w-full"
                  value={category}
                  onChange={e => setCategory(e.value)}
                  options={categories}
                  placeholder="Select a Category"
                />
              </div>
              <div className="w-full">
                <p>Pet Name</p>
                <InputText
                  value={name}
                  className="w-full"
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <p>Pet Breed</p>
                <InputText
                  className="w-full"
                  value={breed}
                  onChange={e => setBreed(e.target.value)}
                />
              </div>

              <div className="w-full">
                <p>Item Status</p>
                <Dropdown
                  className="w-full"
                  value={status}
                  onChange={e => setStatus(e.value)}
                  options={statuses}
                  placeholder="Select a status"
                />
              </div>
            </div>
            <div className="basis-3/4 flex flex-col justify-between">
              <span className="flex flex-col">
                <p>Description</p>
                <InputTextarea
                  autoResize
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={5}
                  cols={30}
                />
              </span>
              <span className="flex flex-col mt-3">
                <p>Facts</p>
                <InputTextarea
                  autoResize
                  value={facts}
                  onChange={e => setFacts(e.target.value)}
                  rows={5}
                  cols={30}
                />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8">
            <button
              className={`bg-themeGreen h-14 w-28 text-xl ${
                disabled && 'cursor-wait'
              }`}
              onClick={handleSubmit}
              disabled={disabled}>
              SAVE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
