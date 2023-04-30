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
import { NavBar } from './navigators/NavBar'
import '../styles/App.css'

//theme
import 'primereact/resources/themes/saga-orange/theme.css'

//core
import 'primereact/resources/primereact.min.css'
import { LoginPage } from './screens/LoginPage'

function App() {
  useEffect(() => {
    axios.get('/api/pet_store/index').then(e => {})
  }, [])

  return (
    <div className="md:mx-14 sm:mx-16 mx-10 mt-12 items-center justify-center">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
