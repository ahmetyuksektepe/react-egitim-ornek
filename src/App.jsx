import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Orders from './pages/Orders.jsx'
import Shop from './pages/Shop.jsx'
import Details from './pages/Details.jsx'
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </Router>
  )
}

export default App
