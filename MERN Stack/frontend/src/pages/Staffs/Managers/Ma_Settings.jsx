import { React, useState, useEffect } from 'react';
import { Head } from '../../../components/Head';
import { Header2 } from '../../../components/Header2';
import { jwtDecode } from 'jwt-decode'

const Ma_Settings = () => {
  const [orders, setOrders] = useState([]);
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

    const fetchOrdersData = async () => {
        try {
          const response = await fetch('http://localhost:5000/managers/orders');
          // const response = await fetch('https://yolohome-homanhquan-api.onrender.com/dashboard');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setOrders(data.orders);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Fetch data initially
      fetchOrdersData();

      // Fetch data every 1 second
    const intervalId = setInterval(() => {
      fetchOrdersData()
      checkToken()
      checkLoginStatus()
    }, 1000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  const countRow = (orders) => {
    if (!Array.isArray(orders)) {
      return 0; // Return 0 if orders is not an array
    }

    let totalRow = 0;

    orders.forEach(order => {
      if (order && !order.declined && !order.delivered) {
        totalRow += 1; // Increment totalRow if order is not declined and not delivered
      }
    });

    return totalRow;
  };
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
            <a href="/managers/overview">
            <span className="material-symbols-outlined"> overview </span>
            <h3>Overview</h3>
            </a>
            <a href="/managers/dashboard">
            <span className="material-icons-sharp">grid_view</span>
            <h3>Dashboard</h3>
            </a>
            <a href="/managers/orders">
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
            <a href="/managers/staffs">
            <span className="material-symbols-outlined">groups</span>
            <h3>Staffs</h3>
            </a>
            <a href="/managers/customers">
            <span className="material-icons-sharp">person_outline</span>
            <h3>Customers</h3>
            </a>
            <a href="/managers/notes">
            <span className="material-symbols-outlined"> format_list_bulleted_add </span>
            <h3>To-Do Lists</h3>
            {/*
                    <span class="message-count">23</span>
                    */}
            </a>
            <a href="/managers/products">
            <span className="material-icons-sharp">inventory</span>
            <h3>Products</h3>
            </a>
            <a href="/managers/feedbacks">
            <span className="material-icons-sharp">feedback</span>
            <h3>Feedbacks</h3>
            </a>
            <a href="/managers/settings" className="active">
            <span className="material-icons-sharp">settings</span>
            <h3>Settings</h3>
            </a>
        </div>
        </aside>
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
                        <a href={`/managers/changeinfo/${user.id}`}>
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

export default Ma_Settings