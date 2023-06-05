import React, { useState, useRef } from 'react'
import { PersonalInfo } from './PersonalInfo'
import duck from '../../components/images/duck.png'
import { FrontPicture } from '../../components/FrontPicture'
import axios from 'axios'
export const AboutMe = ({
  initialEmail = '',
  userData,
}: {
  initialEmail: string
  userData: any
}) => {
  const [buttonToggle, setButtonToggle] = useState<boolean>(false)
  const [name, setName] = useState(userData?.name)
  const [email, setEmail] = useState(userData?.email)
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber)
  const [personalDescription, setPersonalDescription] = useState<string>(
    userData?.description,
  )

  const [selectedFrontImage, setSelectedFrontImage] = useState<null | any>(null)

  const [rowNr, setRowNr] = useState()

  return (
    <>
      <div className="flex lg:flex-col flex-col sm:flex-row justify-around  lg:justify-start lg:items-center mb-14 ">
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              setButtonToggle(e => {
                if (e)
                  axios
                    .put('api/edit-user', {
                      name: name,
                      email: email,
                      phoneNumber: phoneNumber,
                      personalDescription: personalDescription,
                      initialEmail: initialEmail,
                    })
                    .then(r => console.log(r))
                return !e
              })
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
            rows={Math.ceil(
              personalDescription ? personalDescription?.length / 20 : 4,
            )}
            placeholder="A brief description here"
            onChange={e => {
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
