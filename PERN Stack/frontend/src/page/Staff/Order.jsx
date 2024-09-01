import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import Script from '../../component/Script'
import axios from 'axios'
import { Header2 } from '../../component/Header2'
import Sidebar from '../../component/Sidebar'
import { jwtDecode } from 'jwt-decode'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [ordersID, setOrdersID] = useState([])
    const [role, setRole] = useState('')
    
    const handleDeleteModalShow = (id) => {
        setOrdersID(id)
    }
    const handleDeleteOrders_M = async () => {
        try {
            await axios.put(`http://localhost:5000/order/manager/${ordersID}`)
        } catch (error) {
            console.error('Error deleting course:', error) 
        }
    }
    const handleDeleteOrders_E = async () => {
        try {
            await axios.put(`http://localhost:5000/order/employee/${ordersID}`)
        } catch (error) {
            console.error('Error deleting course:', error) 
        }
    }

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

        const checkToken = () => {
            const token = localStorage.getItem('token')

            if (token) {
                try {
                    const decodedToken = jwtDecode(token)
                    setRole(decodedToken.role)
                    console.log(decodedToken.role)
                } catch (error) {
                    console.error('Invalid token:', error)
                }
            }
        }

        checkToken()

        const intervalId = setInterval(fetchOrdersData, 5000)

        return () => clearInterval(intervalId)
      }, [])

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/orders.css"
        ]} additionalTitle={[
            "Orders - Gà Nấm Cake Shop"
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
                {/*
                        <div class="middle">
                            <div class="left">
                                <button type="button" class="btn btn-primary">Add more members</button>
                            </div>
                        </div>
                        */}
                <table style={{marginTop: '20px', width: '1000px'}}>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Customer</th>
                    <th>Phone number</th>
                    <th>Address</th>
                    <th style={{width: '25%'}}>Product + Quantity</th>
                    <th>Total cost</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0

                        return orders && orders.slice().reverse().map((order) => (
                            !order.deleted && !order.declined && !order.delivered && (
                                <tr key={order._id}>
                                <td>{++counter}</td>
                                <td>{order.name}</td>
                                <td>{order.phonenumber}</td>
                                <td>{order.address}</td>
                                <td>
                                    {order.cart.items.map((product, index) => (
                                        <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            {product.name} x {product.quantity}
                                            {index !== order.cart.items.length - 1 && <hr />}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.cart.totalPrice}</td>
                                {
                                    role === 'Manager' ? (
                                        <td><button type="button" class="btn btn-danger"  data-toggle="modal" data-id={order.id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(order.id)}>Decline</button></td>
                                    ) : (
                                        <td><button type="button" class="btn btn-primary"  data-toggle="modal" data-id={order.id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(order.id)}>Finish delivering</button></td>
                                    )
                                }
                            </tr>
                            )
                        ))
                    })()}
                </tbody>
                </table>
                {/*
                    <div class="showall">
                        <a href="#">Show All</a>
                    </div>
                    */}
            </div>
            </div>
        </div></main>
        <form method="POST" name="delete-course-form" />
        <div id="delete-course-modal" className="modal" tabIndex={-1} role="dialog" style={{fontSize: '15px'}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" style={{fontSize: '15px!important'}}>Order Confirmation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                {
                    role === 'Manager' ? (
                        <p>Are you sure that you want to decline this order?</p>
                    ) : (
                        <p>Are you sure that you've delivered this order?</p>
                    )
                }
            </div>
            <div className="modal-footer">
                {
                    role === 'Manager' ? (
                        <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteOrders_M}>Yes</button>
                    ) : (
                        <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteOrders_E}>Yes</button>
                    )
                }
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>
        <div className="right">
        <div className="top">
        </div>
        </div>
    </div>
    <Script />
    </div>
  )
}

export default Order