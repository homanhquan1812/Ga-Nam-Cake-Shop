import { React, useState, useEffect } from 'react'
import Head from '../component/Head'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Script from '../component/Script'
import { jwtDecode } from "jwt-decode"

const History = () => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [orders, setOrders] = useState([])
    const [userOrders, setUserOrders] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
    
        if (token) {
          const decodedToken = jwtDecode(token)
    
          setRole(decodedToken.role)
          setUserId(decodedToken.id)
          setName(decodedToken.name)
          setPhoneNumber(decodedToken.phonenumber)
          setEmail(decodedToken.email)
          setUsername(decodedToken.username)
        }
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:5000/order')
              if (response.status === 200) {
                const data = await response.json()
                const userOrders = data.orders.filter(order => order.user_id === userId)
                setUserOrders(userOrders)
                console.log("Got user's orders successfully.")
              }
            } catch (error) {
              console.error(error)
            }
          }
    
          fetchData()
    
          const intervalId = setInterval(() => {
            fetchData()
          }, 6000) // 60 seconds
      
          return () => clearInterval(intervalId)
        }, [userId])

  return (
    <div>
        <Head
        additionalStylesheets={[
            "/css/lightbox.min.css",
            "/css/owl.carousel.min.css",
            "/css/owl.theme.default.min.css",
            "/css/main.css",
            "/css/linea-icon.css"
        ]}
        additionalTitle={[
            "History - Gà Nấm Cake Shop"
        ]}></Head>
        <Header></Header>
        <div id="container" style={{marginTop: '200px'}}>
        <div className="printing-history-box">
        <h2 style={{color: 'red'}}><center>Purchase History</center></h2>
        <div className="table-container">
            <table className="content-table">
            <thead>
                <tr>
                <th>No</th>
                <th>Order Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total cost</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {
                            userOrders.slice().reverse().map((order, index) => (
                              (order.cart.items.length > 0) ? (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.created_at}</td>
                                {
                                  order.cart.items.map((item, index) => (
                                    <div key={index} style={{marginTop: '20px', marginBottom: '20px'}}>
                                      {item.name}
                                    </div>
                                  ))
                                }
                                <td>
                                {
                                  order.cart.items.map((item, index) => (
                                    <div key={index} style={{marginTop: '9px', marginBottom: '20px'}}>
                                      {item.quantity}
                                    </div>
                                  ))
                                }
                                </td>
                                <td>{order.cart.totalPrice}</td>
                                <td>
                                    {order.delivered ? (
                                        <button type="button" className="btn btn-success">Delivered</button>
                                    ) : order.declined ? (
                                        <button type="button" className="btn btn-danger">Declined</button>
                                    ) : (
                                        <button type="button" className="btn btn-warning">Processing</button>
                                    )}
                                    </td>

                              </tr>
                              ) : (
                                <td colSpan={5}>Bạn chưa đăng kí khóa nào</td>
                              )
                            ))
                          }
                {/*
            <tr>
                <td>{'{'}{'{'}this.createdAt{'}'}{'}'}</td>
                <td>
                    {'{'}{'{'}#each this.products{'}'}{'}'}
                    {'{'}{'{'}this.name{'}'}{'}'}
                    {'{'}{'{'}#unless @last{'}'}{'}'}<br /><hr /> {'{'}{'{'}/unless{'}'}{'}'}
                    {'{'}{'{'}/each{'}'}{'}'}
                </td>
                <td>
                    {'{'}{'{'}#each this.products{'}'}{'}'}
                    {'{'}{'{'}this.qty{'}'}{'}'}
                    {'{'}{'{'}#unless @last{'}'}{'}'}<br /><hr /> {'{'}{'{'}/unless{'}'}{'}'}
                    {'{'}{'{'}/each{'}'}{'}'}
                </td>
                <td>{'{'}{'{'}this.totalcost{'}'}{'}'}</td>
                <td>
                    {'{'}{'{'}#if (isBool this.declined true){'}'}{'}'}
                    <button type="button" className="btn btn-danger">Declined</button>
                    {'{'}{'{'}else{'}'}{'}'}
                    {'{'}{'{'}#if (isBool this.delivered true){'}'}{'}'}
                    <button type="button" className="btn btn-success">Delivered</button>
                    {'{'}{'{'}else{'}'}{'}'}
                    <button type="button" className="btn btn-warning">Processing</button>
                    {'{'}{'{'}/if{'}'}{'}'}
                    {'{'}{'{'}/if{'}'}{'}'}
                </td>
                </tr> */}
                <tr />
            </tbody>
            </table>
        </div>
        </div>
    </div>
      <Footer></Footer>
        <Script></Script>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default History