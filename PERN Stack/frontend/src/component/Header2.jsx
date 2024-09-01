import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLocation } from 'react-router-dom'

export const Header2 = () => {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation()

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
            } else {
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

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/staff/overview':
                return 'OVERVIEW'
            case '/staff/dashboard':
                return 'DASHBOARD'
            case '/staff/order':
                return 'NEW ORDERS'
            case '/staff/staff':
                return 'STAFFS'
            case '/staff/customer':
                return 'CUSTOMERS'
            case '/staff/note':
                return 'TO-DO LISTS'
            case '/staff/product':
                return 'PRODUCTS'
            case '/staff/feedback':
                return 'FEEDBACKS'
            case '/staff/setting':
                return 'SETTINGS'
            default:
                return 'OVERVIEW'
        }
    }

    return (
        <div>
            <header className="p-3 bg-dark text-white">
                <div className="header-container">
                    <div className="search-box">
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                        </form>
                    </div>
                    <div className="title" style={{paddingLeft: '50px'}}>
                        <h1>{getPageTitle()}</h1>
                    </div>
                    <div className="right">
                        <div className="top">
                            <div className="profile">
                                <div className="info">
                                    <p style={{color: 'white'}}>Welcome back, <b style={{color: 'yellow'}}>{user.name}</b>.</p>
                                    <p style={{color: 'white'}}>Position: <b style={{color: 'cyan'}}>{user.position}</b>, Role: <b style={{color: 'orange'}}>{user.role}</b></p>
                                </div>
                                <div className="profile-photo">
                                    <img src="../../img/avatar.jpg" alt="Avatar" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}