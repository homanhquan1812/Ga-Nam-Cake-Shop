import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export const Header2 = () => {
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
        }, 1000) // Check every second

        return () => clearInterval(intervalId)
    }, [])

  return (
    <div>
        <header className="p-3 bg-dark text-white">
          <div className="header-container">
          <div className="search-box">
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
              </form>
          </div>
          {/*
              <div class="text-end">
                  <button type="button" class="btn btn-outline-light me-2">Login</button>
                  <button type="button" class="btn btn-warning">Sign-up</button>
              </div>
              */}
          <div className="title" style={{paddingLeft: '50px'}}>
              <h1>OVERVIEW</h1>
          </div>
          <div className="right">
              <div className="top">
              <div className="profile">
                  <div className="info">
                  <p style={{color: 'white'}}>Welcome back, <b style={{color: 'yellow'}}>{user.name}</b>.</p>
                  <p style={{color: 'white'}}>Position: <b style={{color: 'cyan'}}>{user.position}</b></p>
                  </div>                                <div className="profile-photo">
                  <img src="../../img/avatar.jpg" />
                  </div>
              </div>
              </div>
          </div>
          </div>
      </header>
    </div>
  )
}