import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Head from '../component/Head'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Script from '../component/Script'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

const Details = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [info, setInfo] = useState([])
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [cart, setCart] = useState([{
      items: [],
      totalPrice: 0
  }])
  const [role, setRole] = useState('')
  const [quantity, setQuantity] = useState(1)
  const navigateTo = useNavigate()
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

  const addProduct = async() => {
    try {
      if (!isLoggedIn) {
        navigateTo('/login')
      } else {
        const token = localStorage.getItem('token')

        let decodedToken

        if (token) {
            decodedToken = jwtDecode(token)
        }

        const response = await axios.post('http://localhost:5000/cart', {
          id: decodedToken.id,
          name: info.product_name,
          price: info.price,
          photo: info.photo,
          quantity: quantity,
          productId: info.id
        })
        
        if (response.status == 201) {
          console.log('Product added to cart successfully.')
          navigateTo('/cart')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addProduct2 = async () => {
    try {
      if (!isLoggedIn) {
        navigateTo('/login')
      } else {
        const token = localStorage.getItem('token');
        let decodedToken;

        if (token) {
          decodedToken = jwtDecode(token);
        }

        const response = await axios.post('http://localhost:5000/cart', {
          id: decodedToken.id,
          name: info.product_name,
          price: info.price,
          photo: info.photo,
          quantity: 1,
          productId: info.id
        });

        if (response.status === 201) {
          console.log('Product added to cart successfully.');
          alert('Product added to your cart successfully.')
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/${id}`)
        const data = await response.json()
        setInfo(data.product)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:5000/product')
        const data = await response.json()
        setProducts(data.product)
      } catch (error) {
        console.error('Error fetching data:', error)
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

    fetchData()
    fetchData2()

    const intervalId = setInterval(() => {
      fetchData()
      fetchData2()
      checkLoginStatus()
  }, 2000)
  return () => clearInterval(intervalId)
}, [])

  return (
    <div>
      <Head
        additionalStylesheets={[
          "/css/lightbox.min.css",
          "/css/owl.carousel.min.css",
          "/css/owl.theme.default.min.css",
          "/css/main.css",
          "/css/linea-icon.css",
          "/css/productDetails.css"
      ]}
      additionalTitle={[
          "Details - Gà Nấm Cake Shop"
      ]}></Head>
        <div>
          <div className="flex-box">
            <div className="left">
              <div className="big-img">
                <img src={info.photo} />
              </div>
              <div className="images">
              </div>
            </div>
            <div className="right">
              <div className="pname">{info.product_name}</div>
              <div className="ratings">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
              </div>
              <div className="price">{info.price} VND</div>
              <div className="right product-details">
                <p>{info.description}</p>
              </div>
              <div className="btn-box" style={{marginBottom: '10px'}}>
                <div style={{display: 'inline-block'}}>
                  <p>Quantity: <span>
                  <input type="number" name="quantityInput" min={1} max={99} defaultValue={1} onChange={(e) => setQuantity(e.target.value)} required />
                  <input type="hidden" name="id" defaultValue={info.id} />
                  </span>
                  </p>
                  <button type='button' className="buy-btn" onClick={addProduct}>Buy Now</button>
                </div>
                <div style={{display: 'inline-block'}}>
                  <input type="hidden" name="id" defaultValue={info.id} />
                  <button className="cart-btn" onClick={addProduct2}>Add 1 to Cart</button>
                </div>
              </div>
            </div>
          </div>
          <h2>Other products</h2>
              <div className="mt-4">
              <div className="row">
                { products.map((product, index) => (
                  <div className="col" key={index}>
                  <div className="card card-course-item" style={{width: '11rem', height: '300px', margin: '0 0 20px 10px'}}>
                    <img className="card-img-top" style={{width: '100%', height: '100px'}} src={product.photo} />
                    <div className="card-body">
                      <h5 className="card-title">{product.product_name}</h5>
                      {/*
                        <p class="card-text" style="font-size: 12px height: 80px overflow: hidden">{{this.description}}</p>
                        */}
                      <div style={{position: 'absolute', bottom: '65px', left: 0, right: 0, textAlign: 'center'}}>
                        <p className="card-text"><b>{product.price} VND</b></p>
                      </div>
                      <a href={`/details/${product.id}`} className="btn btn-primary" style={{position: 'absolute', bottom: '20px', left: '10px', right: '10px'}}>More Details</a>
                    </div>  
                  </div>
                </div>
                ))}
              </div>
            </div>
        </div>
        <Header></Header>
        <Footer></Footer>
        <Script></Script>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default Details