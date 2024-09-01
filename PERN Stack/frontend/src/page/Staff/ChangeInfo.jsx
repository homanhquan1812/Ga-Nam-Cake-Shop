import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import { Header2 } from '../../component/Header2'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../component/Sidebar'

const ChangeInfo = ({}) => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [position, setPosition] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')
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
  
      const token = localStorage.getItem('token')
      
      try {
        const response = await axios.put(`http://localhost:5000/staff/info/${import.meta.env.VITE_APP_API_KEY}`, {
          name, phonenumber, email, address
        }, { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        })
  
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          
          const decodedToken = jwtDecode(response.data.token)

          setRole(decodedToken.role)
          setUserId(decodedToken.id)
          setName(decodedToken.name)
          setPhoneNumber(decodedToken.phonenumber)
          setEmail(decodedToken.email)
          setGender(decodedToken.gender)
          setAddress(decodedToken.address)
          setPosition(decodedToken.position)
          setUsername(decodedToken.username)
        }
        
        if (newPassword != '') {
          await axios.put(`http://localhost:5000/staff/password/${import.meta.env.VITE_APP_API_KEY}`, {
            oldPassword,
            newPassword
          }, { 
            headers: { 
              Authorization: `Bearer ${token}` 
            } 
          })
        }
        
        alert('Information changed successfully.')
      } catch (error) {
        alert('Old password is incorrect or this phone number already exists.')
        console.error("Error: ", error)
      }
    }

    useEffect(() => {
      const checkToken = () => {
        const token = localStorage.getItem('token')

        if (token) {
            try {
                const decodedToken = jwtDecode(token)

                console.log(decodedToken)

                setRole(decodedToken.role)
                setName(decodedToken.name)
                setPhoneNumber(decodedToken.phonenumber)
                setEmail(decodedToken.email)
                setGender(decodedToken.gender)
                setAddress(decodedToken.address)
                setPosition(decodedToken.position)
                setUsername(decodedToken.username)

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

        const intervalId = setInterval(fetchOrdersData, 5000)

        return () => clearInterval(intervalId)
      }, [id])

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/dashboard.css"
        ]} additionalTitle={[
            "Change staff - Gà Nấm Cake Shop"
        ]}/>
    {/* Header */}
    <Header2></Header2>
    {/* Content */}
    <div className="container">
        <Sidebar></Sidebar>
      <main id="dynamic-content">
        <div className="mt-4">
          <div className="insights">
            <div className="sales">
              <h1>Change your staffrmation here:</h1>
              <div className="form-group">
                <label htmlFor="name">Your ID</label>
                <input type="type" className="form-control" value={id} id="_id" name="_id" disabled />
              </div>
                <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="type" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}} id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Gender</label>
                <input type="type" className="form-control" value={gender} id="gender" name="gender" disabled />
              </div>
              <div className="form-group">
                <label htmlFor="description">Phone Number</label>
                <input type="type" className="form-control" value={phonenumber} onChange={(e) => {setPhoneNumber(e.target.value)}} id="phonenumber" name="phonenumber" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Position</label>
                <input type="type" className="form-control" value={position} id="phonenumber" name="phonenumber" disabled />
              </div>
              <div className="form-group">
                <label htmlFor="description">Role</label>
                <input type="type" className="form-control" value={role} id="phonenumber" name="phonenumber" disabled />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="type" className="form-control" value={username} id="username" name="username" disabled />
              </div>
                <div className="form-group">
                  <label htmlFor="videoID">Old password</label>
                  <input type="password" className="form-control" value={oldPassword} onChange={(e) => {setOldPassword(e.target.value)}} id="password" name="password" />
                </div>
                <div className="form-group">
                  <label htmlFor="videoID">New password</label>
                  <input type="password" className="form-control" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} id="password" name="password" />
                </div>
                <div className="form-group">
                  <label htmlFor="level">Email</label>
                  <input type="type" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} id="emailaddress" name="emailaddress" />
                </div>
                <div className="form-group">
                  <label htmlFor="level">Address</label>
                  <input type="type" className="form-control" value={address} onChange={(e) => {setAddress(e.target.value)}} id="emailaddress" name="emailaddress" />
                </div>
               <button type="submit" onClick={submit} className="btn btn-primary">Save changes</button>      
            </div>
          </div>
        </div></main>
    </div></div>
  )
}

export default ChangeInfo