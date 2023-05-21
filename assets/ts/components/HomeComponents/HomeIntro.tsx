import React from 'react'
import { PetCard } from '../PetCard'
import { IPet } from 'interfaces/petInterface'
import petImg from '../images/home-pet-1.png'
import axios from 'axios'
export const HomeIntro = () => {
  const petSamples: IPet[] = [
    {
      id: 1,
      category_id: 1,
      user_id: 1,
      name: 'pet1',
      breed: 'siamese',
      description: 'random desc string',
      images: petImg,
      status: 'string',
      created_at: 123,
      last_updated_at: 124,
      age: 1,
      facts: 'random facts string',
    },
    {
      id: 2,
      category_id: 2,
      user_id: 2,
      name: 'pet2',
      breed: 'bald',
      description: 'random desc string 2',
      images: petImg,
      status: 'string 2',
      created_at: 123,
      last_updated_at: 124,
      age: 2,
      facts: 'random facts string2',
    },
    {
      id: 3,
      category_id: 3,
      user_id: 3,
      name: 'pet3',
      breed: 'siamese',
      description: 'random desc string 3',
      images: petImg,
      status: 'string',
      created_at: 123,
      last_updated_at: 124,
      age: 1,
      facts: 'random facts string 3',
    },
    {
      id: 4,
      category_id: 4,
      user_id: 4,
      name: 'pet4',
      breed: 'bald',
      description: 'random desc string 4',
      images: petImg,
      status: 'string',
      created_at: 1234,
      last_updated_at: 1242,
      age: 2,
      facts: 'random facts string 4',
    },
  ]

  const postReq = () => {
    axios.post('/test/post/data', { data: 'test' }).then(response => {
      console.log(response.data)
    })
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/2 mt-8 lg:mt-14 place-items-center lg:place-items-baseline">
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl 2xl:mr-44 3xl:mr-32 text-center lg:text-left">
            Make your home complete with a four-legged friend!
          </h1>
          <p className="text-lg text-center lg:text-left sm:text-2xl mt-6">
            Start Your Adoption Journey!
          </p>
          <button
            onClick={postReq}
            type="button"
            className="bg-themeYellow-400 px-10 py-6 rounded-full font-bold text-2xl mt-14 hidden lg:block">
            ADOPT NOW!
          </button>
        </div>

        <div className="flex flex-wrap mx-12 sm:mx-0 lg:mx-8 mt-12 lg:mt-0 lg:w-1/2 align-middle justify-center lg:ml-24 lg:mr-0">
          {petSamples.map(pet => {
            // return <p>test</p>
            return (
              <PetCard height="h-7/12" width="w-4/12" pet={pet} key={pet.id} />
            )
          })}
        </div>
      </div>
      <div className="hidden lg:block lg:absolute left-[280px] lg:top-[400px] xl:top-[440px] 2xl:top-[580px] 3xl:top-[540px] 4xl:top-[505px] 4xl:left-[220px] 5xl:top-[450px] 5xl:left-[50px] ">
        <svg
          className="lg:w-[300px] xl:w-[400px] 2xl:w-[460px] 3xl:w-[500px] 4xl:w-[700px] 5xl:w-[1080px]"
          // width="611"
          height="376"
          viewBox="0 0 611 376"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M610.119 10.1139C610.51 9.72342 610.51 9.09025 610.119 8.69973L603.755 2.33577C603.365 1.94524 602.732 1.94524 602.341 2.33577C601.951 2.72629 601.951 3.35945 602.341 3.74998L607.998 9.40683L602.341 15.0637C601.951 15.4542 601.951 16.0874 602.341 16.4779C602.732 16.8684 603.365 16.8684 603.755 16.4779L610.119 10.1139ZM448.995 272.586L449.498 273.45L448.995 272.586ZM5.86263 221.572C4.87806 221.397 4.87783 221.398 4.87744 221.4C4.87709 221.402 4.87653 221.405 4.87582 221.409C4.87441 221.417 4.87234 221.429 4.86963 221.444C4.8642 221.475 4.8562 221.521 4.84577 221.582C4.82489 221.703 4.79426 221.882 4.75494 222.118C4.67632 222.589 4.56295 223.284 4.42345 224.182C4.14444 225.98 3.76082 228.594 3.34131 231.864C2.50238 238.403 1.51946 247.572 0.943095 258.092C-0.208249 279.107 0.256046 305.617 6.79504 327.34C13.3362 349.07 26.0678 366.294 49.5821 368.054C72.9029 369.8 106.49 356.267 154.64 317.713L153.39 316.152C105.292 354.664 72.2357 367.744 49.7314 366.06C27.4205 364.39 15.145 348.14 8.71015 326.764C2.27311 305.379 1.79242 279.15 2.9401 258.201C3.51325 247.74 4.49084 238.621 5.32505 232.118C5.74211 228.867 6.12321 226.271 6.39978 224.489C6.53807 223.598 6.65021 222.911 6.72764 222.447C6.76635 222.215 6.79639 222.039 6.81667 221.922C6.82681 221.863 6.83452 221.819 6.83965 221.789C6.84222 221.775 6.84414 221.764 6.8454 221.757C6.84603 221.753 6.84648 221.751 6.8468 221.749C6.84708 221.747 6.84719 221.746 5.86263 221.572ZM154.64 317.713C202.705 279.227 239.05 260.788 268.003 253.832C296.913 246.886 318.525 251.371 337.195 258.903C346.556 262.679 355.167 267.217 363.636 271.498C372.085 275.769 380.389 279.783 389.044 282.439C406.442 287.779 425.176 287.601 449.498 273.45L448.492 271.721C424.651 285.592 406.494 285.702 389.63 280.527C381.155 277.926 372.985 273.983 364.538 269.713C356.111 265.453 347.404 260.865 337.944 257.048C318.972 249.395 296.931 244.825 267.536 251.887C238.185 258.939 201.573 277.571 153.39 316.152L154.64 317.713ZM449.498 273.45C467.543 262.951 478.537 241.018 486.939 214.395C495.343 187.763 501.263 156.027 508.898 125.801C516.556 95.4885 525.953 66.6139 541.32 45.3237C556.642 24.0961 577.896 10.4068 609.412 10.4068L609.412 8.40683C577.179 8.40683 555.351 22.4681 539.699 44.1531C524.092 65.7754 514.623 94.9754 506.959 125.311C499.274 155.733 493.418 187.218 485.032 213.793C476.643 240.375 465.831 261.633 448.492 271.721L449.498 273.45Z"
            fill="black"
          />
        </svg>
      </div>
    </>
  )
}
