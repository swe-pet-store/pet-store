import React, { useState, useEffect, useRef } from 'react'
import ItemCarouselTemplate from '../HomeComponents/ItemCarouselTemplate'
import { Search } from '../../components/Search'
import { Paginator } from 'primereact/paginator'
import { IItem } from 'interfaces/itemInterface'
import { ProfilePetCard } from '../../components/ProfileComponents/ProfilePetCard'
import { SkeletonComponent } from '../../components/SkeletonComponent'
import { IPet } from 'interfaces/petInterface'
import { Link } from 'react-router-dom'
export const AllSellable = ({
  items,
  filterBySearch,
  type,
}: {
  items: any
  filterBySearch: any
  type: string
}) => {
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(9)

  const bigRef = useRef<any>()

  const title = `All ${type}s`

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [first])

  return (
    <div
      className="mt-10 md:mt-0 md:ml-10 lg:ml-16 xl:ml-24 2xl:ml-36 flex flex-col basis-4/6"
      ref={bigRef}>
      <div className="flex justify-between items-center -mt-3">
        <p className="font-bold text-4xl">{title}</p>
        <Search filterTextFunction={filterBySearch} />
      </div>

      <div className="flex flex-col gap-5 sm:flex-wrap sm:flex-row sm:gap-5 md:gap-8 lg:gap-7 4xl:gap-10 mt-11 ">
        {items
          .slice(first, first + rows)
          .map((element: IItem & IPet, index: React.Key | null | undefined) => {
            return (
              <div className="w-[90%] sm:w-[45%] lg:w-[30%]" key={index}>
                {type === 'item' && (
                  <Link to={`/item/${element.id}`}>
                    <ItemCarouselTemplate item={element} />
                  </Link>
                )}
                {type === 'pet' && (
                  <Link to={`/pet/${element.id}`}>
                    <ProfilePetCard pet={element} key={index} />
                  </Link>
                )}
              </div>
            )
          })}
      </div>

      <Paginator
        className="mix-blend-multiply mt-10"
        first={first}
        rows={rows}
        totalRecords={items.length}
        onPageChange={e => {
          setFirst(e.first)
          setRows(e.rows)
        }}
      />
    </div>
  )
}
