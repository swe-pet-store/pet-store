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
    <div className="flex flex-col mr-10 md:mr-0">
      <p className="font-bold text-4xl mb-7">Filter By</p>
      <div
        className="flex flex-row flex-wrap items-center justify-between gap-5 md:gap-0 md:items-start md:justify-start md:flex-col md:basis-1/6"
        style={styles}>
        <Dropdown
          panelStyle={{ fontSize: '24px' }}
          className="md:mt-10 text-3xl w-full sm:w-[45%] md:w-full"
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
            className="md:mt-5 text-3xl w-full sm:w-[45%] md:w-full"
            onChange={e => {
              itemStateFunction(e.value)
            }}
            value={itemState}
            options={itemStates}
            placeholder="Item State"
          />
        )}
        {showExtras && (
          <span className="md:mt-5 w-full">
            <p className="bg-white sm:text-center md:text-left text-black font-medium px-2 py-1 text-[24px] border border-gray-300">
              Price Range
            </p>
            <div className="relative mx-10">
              <Slider
                className="md:mt-5 mt-7"
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
            <div className="flex items-center justify-center mt-7 lg:mt-8">
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
    </div>
  )
}
