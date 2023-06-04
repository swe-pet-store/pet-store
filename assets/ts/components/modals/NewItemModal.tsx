import React, { useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { ImageUploadHolder } from '../ImageUploadHolder'
import { FrontPicture } from '../FrontPicture'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Tooltip } from 'primereact/tooltip'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
//@ts-ignore
import styles from '../../../styles/profile.module.css'
import axios from 'axios'

export const NewItemModal = (props: any) => {
  const toast = useRef<any>()

  const showWarningToast = () => {
    toast.current!.show({
      severity: 'warn',
      summary: 'Warning',
      detail: 'You can only add up to 5 additional images per item',
    })
  }

  const [selectedImages, setSelectedImages] = useState<any[]>([])

  const [category, setCategory] = useState<any | null>(null)

  const [quantity, setQuantity] = useState<string>()

  const [price, setPrice] = useState<string>()

  const [name, setName] = useState<string>()

  const [discount, setDiscount] = useState<string>()

  const [itemState, setItemState] = useState<any | null>(null)

  const [description, setDescription] = useState<string>()

  const hiddenImageInput = useRef<any>()

  const itemStates = ['New', 'Slightly Used', 'Used']

  const categories = [{ name: 'Dog' }, { name: 'Cat' }, { name: 'Other' }]

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
    const bodyForm = {
      category: category.name,
      quantity: quantity,
      price: price,
      name: name,
      description: description,
      state: itemState.name,
    }

    axios.post('/item/add-item', bodyForm).then(response => {
      console.log(response.data)
    })
  }

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={props.visible}
        className=" xsm:w-full sm:w-auto md:w-2/3 xl:w-1/2 "
        onHide={() => props.setVisible(false)}>
        <div className="flex flex-col mx-0 md:mx-5 font-medium text-lg ">
          <div className="flex flex-col md:flex-row w-full items-center">
            <FrontPicture title={'Item front picture'} />

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

          <div className="mt-5 flex flex-col">
            <div className="flex sm:flex-row flex-col sm:justify-between">
              <div className=" w-full sm:w-1/3" style={styles}>
                <p>Categories</p>
                <Dropdown
                  className="w-full sm:w-11/12"
                  value={category}
                  onChange={e => setCategory(e.value)}
                  options={categories}
                  optionLabel="name"
                  placeholder="Select a Category"
                />
              </div>
              <div className="w-full sm:w-1/3">
                <p>Item Quantity</p>
                <InputText
                  className="w-full sm:w-11/12"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>

              <div className="w-full sm:w-1/3">
                <p>Item Price</p>
                <InputText
                  className="w-full sm:w-11/12"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between">
              <div className="w-full sm:w-1/3">
                <p>Item Name</p>
                <InputText
                  value={name}
                  className="w-full sm:w-11/12"
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <p>Item State</p>
                <Dropdown
                  style={styles}
                  className="w-full sm:w-11/12"
                  value={itemState}
                  onChange={e => setItemState(e.value)}
                  options={itemStates}
                  // optionLabel="state"
                  placeholder="Select state"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/3 ">
                <div className="flex flex-row items-center text-md">
                  <p>Item Discount</p>
                  <AiOutlineQuestionCircle
                    className="ml-2 custom-target-icon"
                    data-pr-tooltip="Percentage value like 20%"
                  />
                </div>
                <InputText
                  className="w-full sm:w-11/12"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <span className="flex flex-col mt-3">
            <p>Description</p>
            <InputTextarea
              autoResize
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              cols={30}
            />
          </span>
          <div className="flex items-center justify-center mt-8">
            <button
              className="bg-themeGreen h-14 w-28 text-xl"
              onClick={handleSubmit}>
              SAVE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
