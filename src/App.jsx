import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Orders from './pages/Orders.jsx'
import Shop from './pages/Shop.jsx'
import Details from './pages/Details.jsx'
import { SessionContext } from './hooks/SessionContext.js'
import Supabase from './db/supabase.js'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    Supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {data: { subscription }} = Supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
        }
      })
    return () => {
      subscription.unsubscribe()
    }
    }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <SessionContext.Provider value={{ session, setSession }}>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </Router>
    </SessionContext.Provider>
  )
}

export default App
