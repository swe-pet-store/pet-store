import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { useBoundStore } from './store/index'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import { Home } from './screens/Home'
import { NotFound } from './screens/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
])

function App() {
  useEffect(() => {
    axios.get('/api/pet_store/index').then(e => {
      console.log(e)
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
