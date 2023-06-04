import React, { useState, useRef } from 'react'
import { PersonalInfo } from './PersonalInfo'
import duck from '../../components/images/duck.png'
import { FrontPicture } from '../../components/FrontPicture'
export const AboutMe = () => {
  const [buttonToggle, setButtonToggle] = useState<boolean>(false)
  const [name, setName] = useState('DUCKINHO')
  const [email, setEmail] = useState('duckemail@gmail.com')
  const [phoneNumber, setPhoneNumber] = useState('+355676202133')
  const [personalDescription, setPersonalDescription] = useState<string>(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  )

  const [selectedFrontImage, setSelectedFrontImage] = useState<null | any>(null)

  const [rowNr, setRowNr] = useState()

  return (
    <>
      <div className="flex lg:flex-col flex-col sm:flex-row justify-around  lg:justify-start lg:items-center mb-14 ">
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              setButtonToggle(e => !e)
            }}
            className={`${
              buttonToggle ? 'bg-themeGreen' : 'bg-themeBrown-400'
            } w-20 h-10 md:w-28 md:h-14 rounded-2xl text-2xl self-start mb-8`}>
            {buttonToggle ? 'Save' : 'Edit'}
          </button>
          {/* <img
            src={duck}
            className="w-60 sm:w-40 lg:w-52 xl:w-60 2xl:w-80 mb-12 lg:mb-20"
          /> */}
          <FrontPicture
            editable={buttonToggle}
            selectedFrontImage={selectedFrontImage}
            setSelectedFrontImage={setSelectedFrontImage}
          />
          <PersonalInfo
            editable={buttonToggle}
            email={email}
            handleEmail={setEmail}
            name={name}
            handleName={setName}
            phoneNumber={phoneNumber}
            handlePhoneNumber={setPhoneNumber}
          />
        </div>
        <div className="flex flex-col items-center lg:justify-center w-2/4 mx-1 lg:mx-10 mt-20 lg:mt-10">
          <p className="font-medium text-4xl lg:mt-7 mb-7 ">About me!</p>
          <textarea
            value={personalDescription}
            rows={Math.ceil(personalDescription.length / 20)}
            placeholder="A brief description here"
            onChange={e => {
              console.log(e.target.value.length)
              if (e.target.value.length <= 310)
                setPersonalDescription(e.target.value)
            }}
            className={`bg-transparent resize-none ${
              buttonToggle && 'border border-orange-400 border-dashed bg-white'
            } w-full lg:w-72 text-md sm:text-lg text-2xl lg:text-2xl `}>
            {/* {personalDescription} */}
          </textarea>
        </div>
      </div>
    </>
  )
}
