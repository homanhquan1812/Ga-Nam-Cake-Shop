import { React, useState, useEffect } from 'react';
import { Head } from '../../../components/Head';
import { Header2 } from '../../../components/Header2';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Em_ChangeInfo = () => {
    const [orders, setOrders] = useState([]);
    const [info, setInfo] = useState([])
    const { id } = useParams()
    const [csw_name, setName] = useState(info.csw_name);
    const [csw_gender, setGender] = useState(info.csw_gender);
    const [csw_phonenumber, setPhoneNumber] = useState(info.csw_phonenumber);
    const [csw_username, setUsername] = useState(info.csw_username);
    const [csw_password, setPassword] = useState(info.csw_password);
    const [csw_emailaddress, setEmailAddress] = useState(info.csw_emailaddress);
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

  const submit = async (e) => {
    e.preventDefault()
    try {
      const updateData = {
        csw_name: csw_name,
        csw_gender: csw_gender,
        csw_phonenumber: csw_phonenumber,
        csw_username: csw_username,
        csw_emailaddress: csw_emailaddress
      }

      if (user.password) {
          updateData.csw_password = user.password;
      }

      const response = await axios.put(`http://localhost:5000/managers/changeinfo/${user.id}`, updateData)
      
      if (response.status === 200) {
        alert("Updated successfully. Please login again.")
        localStorage.removeItem('token')
        navigateTo('/login')
      }
    } catch (error) {
      console.log(error)
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

      const fetchStaffsData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/managers/staffs/${id}`)
          const data = await response.json()
          setInfo(data.info)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
  
      fetchStaffsData()

        const fetchOrdersData = async () => {
          try {
            const response = await fetch('http://localhost:5000/managers/orders')
            const data = await response.json()
            setOrders(data.orders)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
    
        fetchOrdersData()

        const intervalId = setInterval(fetchOrdersData, 5000)

        return () => clearInterval(intervalId)
      }, [id])

      const countRow = (orders) => {
        if (!Array.isArray(orders)) {
          return 0 // Return 0 if orders is not an array
        }
    
        let totalRow = 0
    
        orders.forEach(order => {
          if (order && !order.declined && !order.delivered) {
            totalRow += 1 // Increment totalRow if order is not declined and not delivered
          }
        })
    
        return totalRow
      }

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/dashboard.css"
        ]} additionalTitle={[
            "Change Info - Gà Nấm Cake Shop"
        ]}/>
    {/* Header */}
    <Header2></Header2>
    {/* Content */}
    <div className="container">
        <aside>
        <div className="top">
            <div className="logo">
            <img src="../../img/logo.png" />
            </div>
            <div className="close">
            <span className="material-icons-sharp">close</span>
            </div>
        </div>
        <div className="sidebar" id="sidebar">
            <a href="/employees/overview">
            <span className="material-symbols-outlined"> overview </span>
            <h3>Overview</h3>
            </a>
            <a href="/employees/dashboard">
            <span className="material-icons-sharp">grid_view</span>
            <h3>Dashboard</h3>
            </a>
            <a href="/employees/orders">
            <span className="material-symbols-outlined"> list_alt </span>
            <h3>New Orders</h3>
            {orders.length === 0 ? (
                <span className="message-count" style={{ display: 'none' }}>
                    {countRow(orders)}
                </span>
                ) : (
                <span className="message-count">
                    {countRow(orders)}
                </span>
            )}  
            </a>
            <a href="/employees/notes">
            <span className="material-symbols-outlined"> format_list_bulleted_add </span>
            <h3>To-Do Lists</h3>
            </a>
            <a href="/employees/products">
            <span className="material-icons-sharp">inventory</span>
            <h3>Products</h3>
            </a>
            <a href="/employees/feedbacks">
            <span className="material-icons-sharp">feedback</span>
            <h3>Feedbacks</h3>
            </a>
            <a href="/employees/settings" className="active">
            <span className="material-icons-sharp">settings</span>
            <h3>Settings</h3>
            </a>
        </div>
        </aside>
        <main id="dynamic-content">
        <div className="mt-4">
            <div className="insights">
            <div className="sales">
                <h1>Change your information here:</h1>
                <form method="POST">
                {info && (
                <>
                <div className="form-group">
                <label htmlFor="name">Your ID</label>
                <input type="type" className="form-control" defaultValue={info._id} id="_id" name="_id" disabled />
              </div>
                <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="type" className="form-control" defaultValue={info.csw_name} onChange={(e) => {setName(e.target.value)}} id="csw_name" name="csw_name" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Gender</label>
                <input type="type" className="form-control" defaultValue={info.csw_gender} onChange={(e) => {setGender(e.target.value)}} id="csw_gender" name="csw_gender" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Phone Number</label>
                <input type="type" className="form-control" defaultValue={info.csw_phonenumber} onChange={(e) => {setPhoneNumber(e.target.value)}} id="csw_phonenumber" name="csw_phonenumber" />
              </div>
              <div className="form-group">
                <label htmlFor="csw_username">Username</label>
                <input type="type" className="form-control" defaultValue={info.csw_username} onChange={(e) => {setUsername(e.target.value)}} id="csw_username" name="csw_username" disabled />
              </div>
                </>
                )}
                <div className="form-group">
                  <label htmlFor="videoID">Password</label>
                  <input type="password" className="form-control" defaultValue={user.password} onChange={(e) => {setPassword(e.target.value)}} id="csw_password" name="csw_password" />
                </div>
                {info && (
                <div className="form-group">
                  <label htmlFor="level">Email Address</label>
                  <input type="type" className="form-control" defaultValue={info.csw_emailaddress} onChange={(e) => {setEmailAddress(e.target.value)}} id="csw_emailaddress" name="csw_emailaddress" />
                </div>
                )}
                <div style={{ fontSize: '15px', marginBottom: '5px' }}><b>Note:</b> You will be redirected to the login page after updating your information.</div>
               <button type="submit" onClick={submit} className="btn btn-primary">Save changes</button>
              </form> 
            </div>
            </div>
        </div></main>
    </div></div>
  )
}

export default Em_ChangeInfo