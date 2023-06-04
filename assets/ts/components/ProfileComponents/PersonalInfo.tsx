import React, { useRef } from 'react'

interface IPersonalInfo {
  editable: boolean
  name: string
  handleName: any
  email: string
  handleEmail: any
  phoneNumber: string
  handlePhoneNumber: any
}

export const PersonalInfo = ({
  editable,
  name,
  handleName,
  email,
  handleEmail,
  phoneNumber,
  handlePhoneNumber,
}: IPersonalInfo) => {
  function handleInputNumberChange(event: any) {
    if (event.target.value.length <= 13) {
      handlePhoneNumber(event.target.value)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <input
        value={name}
        className={`bg-transparent ${
          editable && 'border border-orange-400 border-dashed bg-white'
        } w-full  text-center font-medium md:text-2xl sm:text-2xl xsm:text-3xl lg:text-3xl lg:mb-3 mb-1`}
        disabled={!editable}
        onChange={e => handleName(e.target.value)}
      />
      <input
        value={email}
        disabled={!editable}
        onChange={e => handleEmail(e.target.value)}
        className={`bg-transparent ${
          editable && 'border border-orange-400 border-dashed bg-white'
        } w-full  text-center lg:text-3xl md:text-2xl sm:text-2xl xsm:text-3xl lg:mb-3 mb-1`}
      />
      <input
        value={phoneNumber}
        disabled={!editable}
        onChange={handleInputNumberChange}
        className={`bg-transparent ${
          editable && 'border border-orange-400 border-dashed bg-white'
        } w-full text-center lg:text-3xl md:text-2xl sm:text-2xl xsm:text-3xl lg:mb-3 mb-1`}
      />
    </div>
  )
}
