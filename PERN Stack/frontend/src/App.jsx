import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
// Customers' pages
import About from './page/About'
import Contact from './page/Contact'
import Home from './page/Home'
import Menu from './page/Menu'
import History from './page/History'
import Cart from './page/Cart'
import Login from './page/Login'
import Detail from './page/Detail'
import Success from './page/Success'
import Error from './page/Error'
// Staffs' pages (Both Managers and Employees)
import ChangeInfo from './page/Staff/ChangeInfo'
import Dashboard from './page/Staff/Dashboard'
import Feedback from './page/Staff/Feedback'
import Note from './page/Staff/Note'
import Order from './page/Staff/Order'
import Overview from './page/Staff/Overview'
import Product from './page/Staff/Product'
import Setting from './page/Staff/Setting'
// Managers' exclusive pages
import Customer from './page/Staff/Managers_Exclusive_Pages/Customer'
import Staff from './page/Staff/Managers_Exclusive_Pages/Staff'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')
  
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

        const checkToken = () => {
          const token = localStorage.getItem('token')

          if (token) {
              try {
                  const decodedToken = jwtDecode(token)
                  setRole(decodedToken.role)
              } catch (error) {
                  console.error('Invalid token:', error)
              }
          }
      }

        const intervalId = setInterval(() => {
          checkToken()
          checkLoginStatus()
        }, 1000) // Check every second

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
        <Route path="/detail/:id" element={<Detail />} />
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
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/success" element={<Success />} />

        {
          (role === 'Manager' || role === 'Employee') && (
            <>
            <Route exact path="/staff" element={<Overview />} />
            <Route path="/staff/overview" element={<Overview />} />
            <Route path="/staff/changeinfo/:id" element={<ChangeInfo />} />
            <Route path="/staff/feedback" element={<Feedback />} />
            <Route path="/staff/note" element={<Note />} />
            <Route path="/staff/order" element={<Order />} />
            <Route path="/staff/product" element={<Product />} />
            <Route path="/staff/setting" element={<Setting />} />
            <Route path="/staff/dashboard" element={<Dashboard />} />
            <Route path="/staff/customer" element={<Customer />} />
            <Route path="/staff/staff" element={<Staff />} />
            </>
          )
        }

        <Route path="*" element={<Error />} />
      </Routes>
    )
  }
}

export default App