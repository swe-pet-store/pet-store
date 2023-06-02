import React, { useEffect } from 'react'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './screens/Home'
import { NotFound } from './screens/NotFound'
import { NavBar } from './navigators/NavBar'
import '../styles/App.css'
import { LoginPage } from './screens/LoginPage'
import { ProfilePage } from './screens/ProfilePage'
import { AdoptMe } from './screens/AdoptMe'
import { Shop } from './screens/Shop'
import { SinglePetPage } from './screens/SinglePetPage'
import { SingleItemPage } from './screens/SingleItemPage'

//theme
import 'primereact/resources/themes/saga-orange/theme.css'

//core
import 'primereact/resources/primereact.min.css'

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
        <Route path="/adopt_me" element={<AdoptMe />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pet/:id" element={<SinglePetPage />} />
        <Route path="/item/:id" element={<SingleItemPage />} />
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
