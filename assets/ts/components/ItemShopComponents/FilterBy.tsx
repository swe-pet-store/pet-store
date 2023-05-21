import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Slider } from 'primereact/slider'
//@ts-ignore
import styles from '../../../styles/profile.css'

export const FilterBy = ({
  category,
  categoryFunction,
  sliderRange,
  sliderRangeFunction,
  itemState,
  itemStateFunction,
  type,
}: {
  category: any
  categoryFunction: any
  sliderRange?: any
  sliderRangeFunction?: any
  itemState?: any
  itemStateFunction?: any
  type: string
}) => {
  const categories = ['Dog', 'Cat', 'Other']
  const itemStates = ['New', 'Slightly Used', 'Used']

  const showExtras = type === 'shop' ? true : false

  return (
    <div className="flex flex-col basis-1/6" style={styles}>
      <p className="font-bold text-4xl mb-7">Filter By</p>
      <Dropdown
        panelStyle={{ fontSize: '24px' }}
        className="mt-10 text-3xl"
        value={category}
        onChange={e => {
          categoryFunction(e.value)
        }}
        options={categories}
        placeholder="Pet Category"
      />
      {showExtras && (
        <Dropdown
          panelStyle={{ fontSize: '24px' }}
          className="mt-5 text-2xl"
          onChange={e => {
            itemStateFunction(e.value)
          }}
          value={itemState}
          options={itemStates}
          placeholder="Item State"
        />
      )}
      {showExtras && (
        <span className="mt-5">
          <p className="bg-white text-black font-medium px-2 py-1 text-[24px] border border-gray-300">
            Price Range
          </p>
          <div className="relative mx-10">
            <Slider
              className="mt-5"
              value={sliderRange}
              onChange={e => {
                sliderRangeFunction(e.value)
              }}
              range
              min={0}
              max={240}
            />
            <p className="absolute left-0 ">0</p>
            <p className="absolute right-0">240</p>
          </div>
          <div className="flex items-center justify-center mt-5">
            <span className="bg-white text-black font-medium px-2 py-1 w-16 text-[16px] border border-gray-300 flex items-center justify-center">
              {sliderRange[0]}
            </span>
            <span className="bg-white text-black font-medium px-2 py-1 w-16  text-[16px] border border-gray-300 flex items-center justify-center">
              {sliderRange[1]}
            </span>
          </div>
        </span>
      )}
    </div>
  )
}
