import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Head } from '../components/Head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Script from '../components/Script'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Details = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [info, setInfo] = useState([])
  const navigateTo = useNavigate()

  const submit3 = async (e) => {
    e.preventDefault()

    const productId = e.target.elements.id.value
    const response = await axios.post('http://localhost:5000/cart/addToCart3', {
      id: productId
    })

    console.log(response)

    if (response.status == 201) {
      navigateTo('/menu')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/details/${id}`)
        const data = await response.json()
        setInfo(data.info)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:5000/managers/products')
        const data = await response.json()
        setProducts(data.products)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    fetchData2()

    const intervalId = setInterval(() => {
      fetchData()
      fetchData2()
  }, 2000)
  return () => clearInterval(intervalId)
}, [])

  return (
    <div>
      <Head additionalStylesheets={[
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
              <div className="pname">{info.csw_products}</div>
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
                <form  method="POST" style={{display: 'inline-block'}}>
                  <p>Quantity:
                    <input type="number" name="quantityInput" min={1} max={99} defaultValue={1} required />
                    <input type="hidden" name="id" defaultValue={info._id} />
                  </p>
                  <button className="buy-btn">Buy Now</button>
                </form>
                <form className="addToCartForm" onSubmit={submit3} method="POST" style={{display: 'inline-block'}}>
                  <input type="hidden" name="id" defaultValue={info._id} />
                  <button className="cart-btn">Add 1 to Cart</button>
                </form>
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
                      <h5 className="card-title">{product.csw_products}</h5>
                      {/*
                        <p class="card-text" style="font-size: 12px height: 80px overflow: hidden">{{this.description}}</p>
                        */}
                      <div style={{position: 'absolute', bottom: '65px', left: 0, right: 0, textAlign: 'center'}}>
                        <p className="card-text"><b>{product.price} VND</b></p>
                      </div>
                      <a href={`/details/${product._id}`} className="btn btn-primary" style={{position: 'absolute', bottom: '20px', left: '10px', right: '10px'}}>More Details</a>
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