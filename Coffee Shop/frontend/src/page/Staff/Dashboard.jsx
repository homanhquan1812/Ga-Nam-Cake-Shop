import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import { Header2 } from '../../component/Header2'
import Sidebar from '../../component/Sidebar'

const Dashboard = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrdersData = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_APP_WEB_SERVICE}/order`)
            const data = await response.json()
            setOrders(data.order)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
    
        fetchOrdersData()

        const intervalId = setInterval(fetchOrdersData, 5000)

        return () => clearInterval(intervalId)
      }, [])

      const getTotal = (orders) => {
        let totalSum = 0
        orders && orders.forEach(order => {
            if (order && order.status === 'Delivered') {
                totalSum += order.cart.total_price || 0;
            }
        })
        return totalSum
      }

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/dashboard.css"
        ]} additionalTitle={[
            "Dashboard - Gà Nấm Cake Shop"
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
            <div className="sales">
                <span className="material-icons-sharp">analytics</span>
                <div className="middle">
                <div className="left">
                    <h3>Total Sales</h3>
                    <h1>              
                    {getTotal(orders)} VND
                    </h1>
                </div>
                </div>
                <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Customers</th>
                    <th>Phone Numbers</th>
                    <th>Home address</th>
                    <th>Product/Quantity</th>
                    <th>Time</th>
                    <th>Total Cost</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.slice().reverse().map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.full_name}</td>
                                <td>{order.phone}</td>
                                <td>{order.address}</td>
                                <td>
                                {order.cart.items.map((product, index) => (
                                    <div key={index}>
                                        {index !== 0 && <hr />}
                                        {product.name} x {product.quantity}
                                        
                                    </div>
                                    ))}
                                </td>
                                <td>{order.date_added}</td>
                                <td>{order.cart.total_price}</td>
                                <td>
                                {order.status === 'Declined' && (
                                    <button type="button" className="btn btn-danger">
                                    Declined
                                    </button>
                                )}
                                {order.status === 'Delivered' && (
                                    <button type="button" className="btn btn-success">
                                    Delivered
                                    </button>
                                )}
                                {order.status === 'Processing' && (
                                    <button type="button" className="btn btn-warning">
                                    Processing
                                    </button>
                                )}
                                </td>
                            </tr>
                            )
                        )
                    }
                </tbody>
                </table>
                {/*
                    <div class="showall">
                        <a href="#">Show All</a>
                    </div>
                    
                        <small class="text-muted">Last 24 Hours</small>
                    */}
            </div>
            </div>
        </div></main>
        <div className="right">
        <div className="top">
        </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard