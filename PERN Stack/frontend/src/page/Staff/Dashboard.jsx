import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import { Header2 } from '../../component/Header2'
import Sidebar from '../../component/Sidebar'

const Dashboard = () => {
    const [orders, setOrders] = useState([])

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

      const getTotal = (orders) => {
        let totalSum = 0
        orders.forEach(order => {
          if (order && !order.declined && order.delivered) {
            totalSum += order.cart.totalPrice || 0
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
                        orders.slice().reverse().map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.name}</td>
                                <td>{order.phonenumber}</td>
                                <td>{order.address}</td>
                                <td>
                                {order.cart.items.map((product, index) => (
                                    <div key={index}>
                                        {index !== 0 && <hr />}
                                        {product.name} x {product.quantity}
                                        
                                    </div>
                                    ))}
                                </td>
                                <td>{order.created_at}</td>
                                <td>{order.cart.totalPrice}</td>
                                <td>
                                {order.declined && (
                                    <button type="button" className="btn btn-danger">
                                    Declined
                                    </button>
                                )}
                                {!order.declined && order.delivered && (
                                    <button type="button" className="btn btn-success">
                                    Delivered
                                    </button>
                                )}
                                {!order.declined && !order.delivered && (
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