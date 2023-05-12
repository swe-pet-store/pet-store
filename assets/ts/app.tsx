import React, { useEffect } from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './screens/Home'
import { NotFound } from './screens/NotFound'
import { NavBar } from './navigators/NavBar'
import '../styles/App.css'

//theme
import 'primereact/resources/themes/saga-orange/theme.css'

//core
import 'primereact/resources/primereact.min.css'
import { LoginPage } from './screens/LoginPage'
import { ProfilePage } from './screens/ProfilePage'
function App() {
  useEffect(() => {
    axios.get('/api/pet_store/index').then(e => {})
  }, [])

  return (
    <div className="mt-12 items-center justify-center">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
