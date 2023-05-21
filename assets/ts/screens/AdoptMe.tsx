import React, { useMemo, useState } from 'react'
import { FilterBy } from '../components/ItemShopComponents/FilterBy'
import { AllSellable } from '../components/ItemShopComponents/AllSellable'
import { Footer } from '../components/Footer'
import { categoryTranslator } from '../utils/helperFunctions'
export const AdoptMe = () => {
  const sampleItemObjects = [
    {
      id: 1,
      category_id: 1,
      user_id: 1,
      name: 'item 1',
      breed: 'dog',
      description: 'test desc 1',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
    {
      id: 2,
      category_id: 2,
      user_id: 2,
      name: 'item 2',
      breed: 'dog',
      description: 'test desc 2',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
    {
      id: 3,
      category_id: 3,
      user_id: 3,
      name: 'item 3',
      breed: 'dog',
      description: 'test desc 3',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 3',
    },
    {
      id: 4,
      category_id: 4,
      user_id: 4,
      name: 'item 4',
      breed: 'dog',
      description: 'test desc 4',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
    {
      id: 5,
      category_id: 5,
      user_id: 5,
      name: 'item 5',
      breed: 'dog',
      description: 'test desc 5',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
    {
      id: 6,
      category_id: 6,
      user_id: 6,
      name: 'item 6',
      breed: 'dog',
      description: 'test desc 6',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
    {
      id: 8,
      category_id: 8,
      user_id: 8,
      name: 'item 8',
      breed: 'dog',
      description: 'test desc 8',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
    {
      id: 13,
      category_id: 13,
      user_id: 13,
      name: 'item 13',
      breed: 'dog',
      description: 'test desc 13',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
    {
      id: 15,
      category_id: 15,
      user_id: 15,
      name: 'item 15',
      breed: 'dog',
      description: 'test desc 15',
      images: null,
      status: 'available',
      created_at: 12314,
      last_updated_at: 151555,
      age: 0,
      facts: 'fact 1',
    },
  ]

  const [items, setItems] = useState(sampleItemObjects)
  const [updatedList, setUpdatedList] = useState(items)
  const [category, setCategory] = useState<string | null>(null)
  const [filterText, setFilterText] = useState<string>('')

  const filterBySearch = (event: { target: { value: any } }) => {
    setFilterText(event.target.value)
  }

  const filterByParameters = () => {
    const categoryFilter: 1 | 2 | 3 | null = categoryTranslator(category!)
    const filtered = items.filter(item => {
      if (categoryFilter && categoryFilter !== item.category_id) return false
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
      <div className="flex ml-14 mt-20">
        <FilterBy
          category={category}
          categoryFunction={setCategory}
          type={'adopt'}
        />
        <AllSellable
          items={updatedList}
          filterBySearch={filterBySearch}
          type={'pet'}
        />
      </div>
      <Footer />
    </>
  )
}
