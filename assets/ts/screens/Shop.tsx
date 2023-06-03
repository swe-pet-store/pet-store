import React, { useMemo, useState, useEffect } from 'react'
import { FilterBy } from '../components/ItemShopComponents/FilterBy'
import { AllSellable } from '../components/ItemShopComponents/AllSellable'
import { Footer } from '../components/Footer'
import { categoryTranslator } from '../utils/helperFunctions'
import axios from 'axios'
import { IItem } from 'interfaces/itemInterface'
import { SkeletonComponent } from '../components/SkeletonComponent'
export const Shop = () => {
  const [items, setItems] = useState<IItem[]>()
  const [updatedList, setUpdatedList] = useState<IItem[]>()
  const [category, setCategory] = useState<string | null>(null)
  const [sliderRange, setSliderRange] = useState<number[]>([0, 240])
  const [itemState, setItemState] = useState<string | null>(null)
  const [filterText, setFilterText] = useState<string>('')

  const filterBySearch = (event: { target: { value: any } }) => {
    setFilterText(event.target.value)
  }

  useEffect(() => {
    axios.get('item/all-items').then(e => {
      setItems(e.data)
      setUpdatedList(e.data)
    })
  }, [])

  const filterByParameters = () => {
    if (items === undefined || items === null) return
    const categoryFilter: 0 | 1 | 2 | 3 | null = categoryTranslator(category!)
    const filtered = items.filter(item => {
      if (categoryFilter !== null && categoryFilter !== 0) {
        if (categoryFilter !== item.category.id) return false
      }
      if (itemState !== null && itemState?.toUpperCase() !== 'ALL') {
        if (itemState.toUpperCase() !== item.state.toUpperCase()) {
          return false
        }
      }
      if (item.price < sliderRange[0] || item.price > sliderRange[1]) {
        return false
      }
      return (
        true && item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
      )
    })
    setUpdatedList(filtered)
  }

  useMemo(() => {
    filterByParameters()
  }, [itemState, category, filterText, sliderRange])

  return (
    <>
      <div className="flex flex-col md:flex-row ml-7 lg:ml-14 mt-20">
        <FilterBy
          category={category}
          sliderRange={sliderRange}
          itemState={itemState}
          categoryFunction={setCategory}
          sliderRangeFunction={setSliderRange}
          itemStateFunction={setItemState}
          type={'shop'}
        />
        {updatedList ? (
          <AllSellable
            items={updatedList}
            filterBySearch={filterBySearch}
            type="item"
          />
        ) : (
          <SkeletonComponent amount={9} />
        )}
      </div>
      <Footer />
    </>
  )
}
