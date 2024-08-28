import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Menu from './pages/Menu'
import History from './pages/History'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Details from './pages/Details'
import Success from './pages/Success'
import Error from './pages/Error'

{/* Employees */}
import Em_ChangeInfo from './pages/Staffs/Employees/Em_ChangeInfo'
import Em_Dashboard from './pages/Staffs/Employees/Em_Dashboard'
import Em_Feedbacks from './pages/Staffs/Employees/Em_Feedbacks'
import Em_Notes from './pages/Staffs/Employees/Em_Notes'
import Em_Orders from './pages/Staffs/Employees/Em_Orders'
import Em_Overview from './pages/Staffs/Employees/Em_Overview'
import Em_Products from './pages/Staffs/Employees/Em_Products'
import Em_Settings from './pages/Staffs/Employees/Em_Settings'

{/* Managers */}
import Ma_ChangeInfo from './pages/Staffs/Managers/Ma_ChangeInfo'
import Ma_Customers from './pages/Staffs/Managers/Ma_Customers'
import Ma_Dashboard from './pages/Staffs/Managers/Ma_Dashboard'
import Ma_Feedbacks from './pages/Staffs/Managers/Ma_Feedbacks'
import Ma_Notes from './pages/Staffs/Managers/Ma_Notes'
import Ma_Orders from './pages/Staffs/Managers/Ma_Orders'
import Ma_Overview from './pages/Staffs/Managers/Ma_Overview'
import Ma_Products from './pages/Staffs/Managers/Ma_Products'
import Ma_Settings from './pages/Staffs/Managers/Ma_Settings'
import Ma_Staffs from './pages/Staffs/Managers/Ma_Staffs'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const isJwtExpired = (token) => {
    if (!token) return true
    const parts = token.split('.')
    if (parts.length !== 3) return true
    try {
        const payload = JSON.parse(atob(parts[1]))
        if (!payload.exp) return false
        const currentTime = Math.floor(Date.now() / 1000)
        return payload.exp < currentTime
    } catch (error) {
        console.error('Error decoding token:', error)
        return true
    }
  }

  useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token')
            if (token && !isJwtExpired(token)) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
                localStorage.removeItem('token')
            }
        }

        checkLoginStatus()
        const intervalId = setInterval(checkLoginStatus, 1000) // Check every second

        return () => clearInterval(intervalId)
    }, [])
    
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<Error />} />
      </Routes>
    )
  }
  else {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/history" element={<History />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/success" element={<Success />} />

        {/* Employees */}
        <Route exact path="/employees" element={<Em_Overview />} />
        <Route path="/employees/overview" element={<Em_Overview />} />
        <Route path="/employees/changeinfo/:id" element={<Em_ChangeInfo />} />
        <Route path="/employees/feedbacks" element={<Em_Feedbacks />} />
        <Route path="/employees/notes" element={<Em_Notes />} />
        <Route path="/employees/orders" element={<Em_Orders />} />
        <Route path="/employees/products" element={<Em_Products />} />
        <Route path="/employees/settings" element={<Em_Settings />} />
        <Route path="/employees/dashboard" element={<Em_Dashboard />} />

        {/* Managers */}
        <Route exact path="/managers" element={<Ma_Overview />} />
        <Route path="/managers/overview" element={<Ma_Overview />} />
        <Route path="/managers/changeinfo/:id" element={<Ma_ChangeInfo />} />
        <Route path="/managers/feedbacks" element={<Ma_Feedbacks />} />
        <Route path="/managers/notes" element={<Ma_Notes />} />
        <Route path="/managers/orders" element={<Ma_Orders />} />
        <Route path="/managers/products" element={<Ma_Products />} />
        <Route path="/managers/settings" element={<Ma_Settings />} />
        <Route path="/managers/dashboard" element={<Ma_Dashboard />} />
        <Route path="/managers/customers" element={<Ma_Customers />} />
        <Route path="/managers/staffs" element={<Ma_Staffs />} />

        <Route path="*" element={<Error />} />
      </Routes>
    )
  }
}

export default App