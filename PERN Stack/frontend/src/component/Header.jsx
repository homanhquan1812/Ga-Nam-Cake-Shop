import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const [user, setUser] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigateTo = useNavigate()

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
        navigateTo('/home')
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
        <header className="contact_header">
            <nav className="navbar navbar-expand-lg navbarGaNam">
                <div className="container header__content">
                <img style={{width: '50px', height: '50px', marginRight: '20px'}} src="../../img/logo.png" />
                <a className="navbar-brand logo" href="home">GÀ NẤM</a> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#GaNamNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse navigation" id="GaNamNav">
                    <ul style={{fontSize: '20px'}} className="navbar-nav ms-auto ">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/home">HOME</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/menu">MENU</a>
                    </li>              
                    {
                        isLoggedIn && (
                            <li className="nav-item">
                                <a className="nav-link" href="/history">HISTORY</a>
                            </li>
                        )
                    }      
                    <li className="nav-item">
                        <a className="nav-link" href="/contact">CONTACT</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">ABOUT</a>
                    </li>
                    {
                        isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">{user.name}</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/cart">
                                    <i className="fa-solid fa-cart-shopping" />
                                    </a>
                                </li>
                            </>
                        )
                    }
                    {
                        isLoggedIn ? (
                            <li className="nav-item">
                                <button className="btnLogin-popup" onClick={handleLogout} href="/">LOGOUT</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <button className="btnLogin-popup" onClick={() => window.location.href='/login'}>LOGIN</button>
                            </li>
                        )
                    }  
                    </ul>
                </div>
                </div>
            </nav>
        </header>
    </div>
  )
}