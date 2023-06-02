import React from 'react'
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
import { Register } from './screens/RegisterPage'

//theme
import 'primereact/resources/themes/saga-orange/theme.css'

//core
import 'primereact/resources/primereact.min.css'
function App() {
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
        <Route path="/register" element={<Register />} />
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
