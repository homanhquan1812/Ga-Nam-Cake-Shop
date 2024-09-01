import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const [orders, setOrders] = useState([])
    const [role, setRole] = useState('')
    const location = useLocation()

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await fetch('http://localhost:5000/order')
                const data = await response.json()
                setOrders(data.orders)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchOrdersData()

        const intervalId = setInterval(fetchOrdersData, 5000)

        return () => clearInterval(intervalId)
    }, [])

    const countRow = (orders) => {
        return orders.filter(order => order && !order.declined && !order.delivered).length
    }

    useEffect(() => {
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

        checkToken()
    }, [])

    const isActive = (path) => {
        return location.pathname === path ? 'active' : ''
    }

    return (
        <div>
            <aside>
                <div className="top">
                    <div className="logo">
                        <img src="/img/logo.png" alt="Logo" />
                    </div>
                    <div className="close">
                        <span className="material-icons-sharp">close</span>
                    </div>
                </div>
                <div className="sidebar" id="sidebar">
                    <Link to="/staff/overview" className={isActive('/staff/overview')}>
                        <span className="material-symbols-outlined">overview</span>
                        <h3>Overview</h3>
                    </Link>
                    <Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>
                        <span className="material-icons-sharp">grid_view</span>
                        <h3>Dashboard</h3>
                    </Link>
                    <Link to="/staff/order" className={isActive('/staff/order')}>
                        <span className="material-symbols-outlined">list_alt</span>
                        <h3>New Orders</h3>
                        {orders.length > 0 && (
                            <span className="message-count">{countRow(orders)}</span>
                        )}
                    </Link>
                    {role === 'Manager' && (
                        <>
                            <Link to="/staff/staff" className={isActive('/staff/staff')}>
                                <span className="material-symbols-outlined">groups</span>
                                <h3>Staffs</h3>
                            </Link>
                            <Link to="/staff/customer" className={isActive('/staff/customer')}>
                                <span className="material-icons-sharp">person_outline</span>
                                <h3>Customers</h3>
                            </Link>
                        </>
                    )}
                    <Link to="/staff/note" className={isActive('/staff/note')}>
                        <span className="material-symbols-outlined">format_list_bulleted_add</span>
                        <h3>To-Do Lists</h3>
                    </Link>
                    <Link to="/staff/product" className={isActive('/staff/product')}>
                        <span className="material-icons-sharp">inventory</span>
                        <h3>Products</h3>
                    </Link>
                    <Link to="/staff/feedback" className={isActive('/staff/feedback')}>
                        <span className="material-icons-sharp">feedback</span>
                        <h3>Feedbacks</h3>
                    </Link>
                    <Link to="/staff/setting" className={isActive('/staff/setting')}>
                        <span className="material-icons-sharp">settings</span>
                        <h3>Settings</h3>
                    </Link>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar