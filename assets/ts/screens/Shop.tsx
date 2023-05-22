import React, { useMemo, useState } from 'react'
import { FilterBy } from '../components/ItemShopComponents/FilterBy'
import { AllSellable } from '../components/ItemShopComponents/AllSellable'
import { Footer } from '../components/Footer'
import { categoryTranslator } from '../utils/helperFunctions'
export const Shop = () => {
  const sampleItemObjects = [
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      name: 'Memory Foam Dog Bed 1',
      price: 20,
      quantity: 2,
      description: 'pet item 1',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 2,
      user_id: 2,
      category_id: 2,
      name: 'CAT THING 2',
      price: 20,
      quantity: 2,
      description: 'pet item 2',
      state: 'used',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 3,
      user_id: 3,
      category_id: 3,
      name: 'Memory Foam Dog Bed 3',
      price: 20,
      quantity: 2,
      description: 'pet item 3',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      name: 'Memory Foam Dog Bed 1',
      price: 20,
      quantity: 2,
      description: 'pet item 1',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 2,
      user_id: 2,
      category_id: 2,
      name: 'CAT 2',
      price: 20,
      quantity: 2,
      description: 'pet item 2',
      state: 'used',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 3,
      user_id: 3,
      category_id: 3,
      name: 'Memory Foam Dog Bed 3',
      price: 20,
      quantity: 2,
      description: 'pet item 3',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      name: 'Memory Foam Dog Bed 1',
      price: 20,
      quantity: 2,
      description: 'pet item 1',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 2,
      user_id: 2,
      category_id: 2,
      name: 'CAT ITEM 12312',
      price: 20,
      quantity: 2,
      description: 'pet item 2',
      state: 'used',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 3,
      user_id: 3,
      category_id: 3,
      name: 'Memory Foam Dog Bed 3',
      price: 20,
      quantity: 2,
      description: 'pet item 3',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      name: 'Memory Foam Dog Bed 1',
      price: 20,
      quantity: 2,
      description: 'pet item 1',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 2,
      user_id: 2,
      category_id: 2,
      name: 'CATINHO',
      price: 20,
      quantity: 2,
      description: 'pet item 2',
      state: 'used',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 3,
      user_id: 3,
      category_id: 3,
      name: 'Memory Foam Dog Bed 3',
      price: 20,
      quantity: 2,
      description: 'pet item 3',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      name: 'Memory Foam Dog Bed 1',
      price: 20,
      quantity: 2,
      description: 'pet item 1',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 2,
      user_id: 2,
      category_id: 2,
      name: 'CATERUSKI 2',
      price: 120,
      quantity: 2,
      description: 'pet item 2',
      state: 'used',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 3,
      user_id: 3,
      category_id: 3,
      name: 'Memory Foam Dog Bed 3',
      price: 20,
      quantity: 2,
      description: 'pet item 3',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 1,
      user_id: 1,
      category_id: 1,
      name: 'Memory Foam Dog Bed 1',
      price: 20,
      quantity: 2,
      description: 'pet item 1',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 2,
      user_id: 2,
      category_id: 2,
      name: 'CATS 2',
      price: 20,
      quantity: 2,
      description: 'pet item 2',
      state: 'used',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
    {
      id: 3,
      user_id: 3,
      category_id: 3,
      name: 'Memory Foam Dog Bed 9',
      price: 20,
      quantity: 2,
      description: 'pet item 3',
      state: 'new',
      images: undefined,
      created_at: 123,
      last_updated_at: 125,
      status: 'available',
      discount: 0,
    },
  ]

  const [items, setItems] = useState(sampleItemObjects)
  const [updatedList, setUpdatedList] = useState(items)
  const [category, setCategory] = useState<string | null>(null)
  const [sliderRange, setSliderRange] = useState<number[]>([0, 240])
  const [itemState, setItemState] = useState<string | null>(null)
  const [filterText, setFilterText] = useState<string>('')

  const filterBySearch = (event: { target: { value: any } }) => {
    setFilterText(event.target.value)
  }

  const filterByParameters = () => {
    const categoryFilter: 1 | 2 | 3 | null = categoryTranslator(category!)
    const filtered = items.filter(item => {
      if (categoryFilter && categoryFilter !== item.category_id) return false
      if (itemState && itemState.toUpperCase() !== item.state.toUpperCase()) {
        return false
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
        <AllSellable
          items={updatedList}
          filterBySearch={filterBySearch}
          type="item"
        />
      </div>
      <Footer />
    </>
  )
}
