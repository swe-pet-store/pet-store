import React from 'react'
import { SingleCategory } from './SingleCategory'
import catImageCategory from '../images/home-category-cat.png'
import dogImageCategory from '../images/home-category-dog.png'
import smallpetsImageCategory from '../images/home-category-small-pets.png'

export const HomeShopCategories = () => {
  return (
    <div className="flex flex-row lg:flex-col mb-10 lg:mb-0 justify-between">
      <p className="font-semibold text-3xl hidden lg:block">Categories</p>
      <SingleCategory name="Cats" imgSrc={catImageCategory} key={'cats'} />
      <SingleCategory name="Dogs" imgSrc={dogImageCategory} key={'dogs'} />
      <SingleCategory
        name="Small Pets"
        imgSrc={smallpetsImageCategory}
        key={'smallpets'}
      />
    </div>
  )
}
