import React from 'react'
import catImage from '../components/images/cat.png'
import axios from "axios";
export const Register = () => {
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const payload = {name:"admin", surname:"admin",email:'admin1@gmail.com', password:'admin', address:"somewhere", phone_number:"123123123"}
    axios.post('/api/register-user', payload).then(data => console.log("Data",data))
  }
  return (
    <div>
      <div className="flex flex-row items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <div className="flex items-center justify-center ">
            <h2 className="text-center text-3xl font-bold text-black">
              Register
            </h2>
          </div>
          <div className="flex items-center justify-center p-2">
            <h3 className="text-center font-bold text-black ">
              Create an account and save a pet's life.
            </h3>
          </div>
          <div className="flex justify-center p-4">
            <p className="text-black text-center ">
              Join our community of animal lovers.
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex px-5">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 undefined">
                  Name
                </label>
                <div>
                  <input
                    type="text"
                    name="first_name"
                    className="block w-full mt-1 border border-gray-900 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="px-5">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 undefined">
                  Last Name
                </label>
                <div>
                  <input
                    type="text"
                    name="last_name"
                    className="block w-full mt-1 border border-gray-900 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
            {/* ---------------------------------------- */}
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined">
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  className="block w-full mt-1 border border-gray-900 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined">
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  className="block w-full mt-1 border border-gray-900  rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined">
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password_confirmation"
                  className="block w-full mt-1 border border-gray-900  rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{' '}
            <span>
              <a className="text-black font-bold hover:underline" href="#">
                Log in
              </a>
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <img
            className="mx-auto w-48 object-bottom"
            src={catImage}
            alt="logo"
            width="249px"
          />
        </div>
      </div>
    </div>
  )
}
