import React, { useEffect, useState } from 'react'
import Head from '../component/Head'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Script from '../component/Script'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
    const [user, setUser] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cart, setCart] = useState([{
        items: [],
        totalPrice: 0
    }])
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')
    const navigateTo = useNavigate()

    const deleteProduct = async (id) => {
      const response = await axios.delete(`http://localhost:5000/cart/${userId}/${id}`)
  
      if (response.status == 200) {
        console.log("Course deleted from user's cart successfully!")
      }
    }

    const orderProducts = async (id) => {
      try {
        const response = await axios.post('http://localhost:5000/order', {
          name, email, phonenumber, address, cart, user_id: id, delivered: false, declined: false
        })
  
        if (response.status == 201) {
          console.log('Order added successfully.')
          navigateTo('/success')
        }
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
    
        if (token) {
          const decodedToken = jwtDecode(token)
    
          setRole(decodedToken.role)
          setUserId(decodedToken.id)
          setUsername(decodedToken.username)
          setName(decodedToken.name)
          setEmail(decodedToken.email)
          setPhoneNumber(decodedToken.phonenumber)
          setAddress(decodedToken.address)
        }
    
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
    
        const getCourse = async () => {
          try {
            const response = await fetch(`http://localhost:5000/cart/${userId}`, {
              withCredentials: true // Ensure cookies are sent
            })
            
            if (response.status == 200) {
              console.log("User's cart fetched successfully.")
              const data = await response.json()
              setCart(data.cart)
            }
          } catch (error) {
            console.error(error)
          }
        }
    
        const intervalId = setInterval(() => {
          checkToken()
          getCourse()
        }, 1000) // Check every second
    
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
            "Cart - Gà Nấm Cake Shop"
        ]}></Head>
        <Header></Header>
        <div className="container cart">
        <div className="cart_menu">
        <p className="text sp">Product Name</p>
        <p className="text dg">Price</p>
        <p className="text sl">Quantity</p>
        <p className="text st">Total Cost</p>
        <p className="text tt">Action</p>
        </div>
        {
            cart.items && cart.items.map((item) => (
                <section className="cart_content">
                    <section className="cart_item" role="list">
                        <div className="product_name" role="listitem">
                        <div className="sanPham">
                            <div className="ten_hinh">
                            <div className="ten_hinh_item"><a title="hinh_san_pham"><img style={{height: '85px', width: '100px'}} src={item.photo} /></a>
                                <div className="ten_hinh_text">
                                <a className title="description_hinh ">{item.name}</a>
                                </div>
                            </div>
                            </div>
                            <div className="content_donGia">
                            <div>
                                <span className="donGia_text">{item.price}</span>
                            </div>
                            </div>
                            <div className="content_soLuong">
                                <div className="add_minus">
                                <input className="EOdsa- v3H4Zf" type="text" role="spinbutton" aria-valuenow={1} name="quantity" defaultValue={item.quantity} disabled />
                                </div>
                            </div>
                            <div className="content_soTien">
                            <span>{item.totalPrice}</span>
                            </div>
                            <div className="content_thaoTac">
                                <button className="fX1Y2g button-pink" onClick={() => deleteProduct(item.productId)}>Delete</button>
                            </div>
                        </div>
                        </div>
                    </section>
                    </section>
            ))
        }
        <section className="cart_total">
        </section>
        <section className="cart_total">
        <div className="s1Gxkq">
            <div className="UQv8V6" role="region">
            <div className="fyYBP1">
                <div className="aiyQAr">
                <div className="A-CcKC">Total Cost:</div>
                <div className="total">{cart.totalPrice}</div>
                </div>
            </div>
            </div>
            <input type="hidden" name="id" defaultValue="{{info.csw_cart}}" />
            <button className="button-pink"><span className="TTXpRG" onClick={() => orderProducts(userId)}>Order</span></button>
        </div>
        </section>
    </div>
        <Footer></Footer>
        <Script></Script>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default Cart