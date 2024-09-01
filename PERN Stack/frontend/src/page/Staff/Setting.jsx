import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import { Header2 } from '../../component/Header2'
import { jwtDecode } from 'jwt-decode'
import Sidebar from '../../component/Sidebar'

const Setting = () => {
  const [user, setUser] = useState([])
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

  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token')

      if (token) {
          try {
              const decodedToken = jwtDecode(token)
              setUser(decodedToken)
              setIsLoggedIn(true)
          } catch (error) {
              console.error('Invalid token:', error)
          }
      }
      else {
          setIsLoggedIn(false)
      }
  }

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
  checkToken()

    const intervalId = setInterval(() => {
      checkToken()
      checkLoginStatus()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/settings.css"
        ]} additionalTitle={[
            "Settings - Gà Nấm Cake Shop"
        ]}/>
    {/* Header */}
    <Header2></Header2>
    {/* Content */}
    <div className="container">
        <Sidebar></Sidebar>
        <main id="dynamic-content">
        {/*
            <div class="date">
                <input type="date">
            </div>
            */}
        <div className="mt-4">
                <div className="insights">
                <div className="expenses">
                    <span className="material-symbols-outlined"> manage_accounts </span>
                    <div className="middle">
                    <div className="left">
                        <h1 style={{marginTop: '10px'}}>Change information</h1>
                        <h3 style={{fontSize: '5px'}}>Click this button to change your information:</h3>
                        <a href={`/staff/changeinfo/${user.id}`}>
                        <button style={{marginTop: '10px'}} type="button" className="btn btn-primary">Click here</button>
                        </a>
                    </div>
                    </div>
                </div>
                <div className="income" style={{height: '220px'}}>
                    <span className="material-symbols-outlined"> logout </span>
                    <div className="middle">
                    <div className="left">
                        <h1 style={{marginTop: '10px'}}>Sign out</h1>
                        <h3>Click this button to sign out:</h3>
                        <a onClick={handleLogout} href="/login">
                        <button style={{marginTop: '10px'}} type="button" className="btn btn-primary">Click here</button>
                        </a>
                    </div>
                    </div>        
                </div>
                </div>
        </div>
        </main>
        <div className="right">
        <div className="top">
        </div>
        </div>
    </div>
    </div>
  )
}

export default Setting