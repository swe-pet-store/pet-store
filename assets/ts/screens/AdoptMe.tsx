import React, { useEffect, useMemo, useState } from 'react'
import { FilterBy } from '../components/ItemShopComponents/FilterBy'
import { AllSellable } from '../components/ItemShopComponents/AllSellable'
import { Footer } from '../components/Footer'
import { categoryTranslator } from '../utils/helperFunctions'
import axios from 'axios'
import { SkeletonComponent } from '../components/SkeletonComponent'
import { IItem } from '../interfaces/itemInterface'
export const AdoptMe = () => {
  const [items, setItems] = useState<IItem[]>()
  const [updatedList, setUpdatedList] = useState<IItem[]>()
  const [category, setCategory] = useState<string | null>(null)
  const [filterText, setFilterText] = useState<string>('')

  useEffect(() => {
    axios.get('pet/all-pets').then(e => {
      setItems(e.data)
      setUpdatedList(e.data)
    })
  }, [])

  const filterBySearch = (event: { target: { value: any } }) => {
    setFilterText(event.target.value)
  }

  const filterByParameters = () => {
    if (items === undefined || items === null) return
    const categoryFilter: 1 | 2 | 3 | 0 | null = categoryTranslator(category!)
    const filtered = items.filter(item => {
      if (categoryFilter !== 0) {
        if (categoryFilter && categoryFilter !== item.category.id) return false
      }
      return (
        true && item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
      )
    })
    setUpdatedList(filtered)
  }

  useMemo(() => {
    filterByParameters()
  }, [category, filterText])

  return (
    <>
      <div className="flex flex-col md:flex-row ml-7 lg:ml-14 mt-20">
        <FilterBy
          category={category}
          categoryFunction={setCategory}
          type={'adopt'}
        />
        {updatedList ? (
          <AllSellable
            items={updatedList}
            filterBySearch={filterBySearch}
            type={'pet'}
          />
        ) : (
          <SkeletonComponent amount={9} />
        )}
      </div>
      <Footer />
    </>
  )
}
