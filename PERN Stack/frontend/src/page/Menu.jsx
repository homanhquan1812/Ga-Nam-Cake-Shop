import { React, useState, useEffect } from 'react'
import Head from '../component/Head'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Script from '../component/Script'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [info, setInfo] = useState(null);  // Changed to null initially
    const navigateTo = useNavigate();
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
  
    const addProduct = async () => {
      try {
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
          console.log('Product added to cart successfully.')
          alert('Product added to your cart successfully.')
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/product');
          const data = await response.json();
          setProducts(data.product);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData2 = async () => {
        try {
          if (productId) {
            const response = await fetch(`http://localhost:5000/product/${productId}`);
            const data = await response.json();
            setInfo(data.product);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData2();
    }, [productId]);
  
    // New useEffect to watch for changes in info state
    useEffect(() => {
      if (info) {
        addProduct();
      }
    }, [info]);
  
    const handleAddProduct = (id) => {
      if (!isLoggedIn) {
        navigateTo('/login')
      } else {
        setProductId(id)
      }
    };

    useEffect(() => {
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
      const intervalId = setInterval(checkLoginStatus, 1000) // Check every second

      return () => clearInterval(intervalId)
  }, [])

      function filterProducts() {
        var input, filter, items, type, i, txtValue;
        input = document.getElementById("product-searchbar123");
        filter = input.value.toUpperCase();
        items = document.getElementsByClassName("showcase__item");

        for (i = 0; i < items.length; i++) {
            type = items[i].getAttribute("data-category").toUpperCase();
            txtValue = items[i].innerText || items[i].textContent;

            if (type.indexOf(filter) > -1 || txtValue.toUpperCase().indexOf(filter) > -1) {
                items[i].removeAttribute("style");
            } else {
                items[i].style.display = "none";
            }
        }
    }

    document.querySelectorAll(".demo").forEach(function(element) {
        var x = Math.floor(Math.random() * 100) + 1;
        element.innerHTML = x;
    });

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
            "Menu - Gà Nấm Cake Shop"
        ]}></Head>
        <Header></Header>
        {/* FILLTER */}
        <section className="showcase section-padding page_Gallery">
            <div className="container">
            <div className="section-info">
                <h2>Joy baked into every bite.</h2>
                <p className="text-center">Enjoy fresh pastries, warm breads, crafted coffees, our signature cakes and more.A delicious variety of sweet and savory pastries and donuts, freshly baked every day.</p>
                <input type="text" id="product-searchbar123" onKeyUp={filterProducts} placeholder="Search for preferred products." />
            </div>
            </div>
            <div className="filters-button-group">
            <button className="button is-checked active" data-filter="*">ALL</button>
            <button className="button" data-filter=".BREAD">BREAD</button>
            <button className="button" data-filter=".PASTRIES">PASTRIES</button>
            <button className="button" data-filter=".CAKESLICES">CAKE SLICES</button>
            <button className="button" data-filter=".CHEESECAKES">CHEESECAKES</button>
            <button className="button" data-filter=".DRINKS">DRINKS</button>
            <button className="button" data-filter=".ICECREAM">ICE CREAM</button>
            </div>

            <div className="showcase__content row">
            {products && products.map((product) => (
                product.type === "Bread" && (
                    <div className=" showcase__item BREAD " data-category="transition">
                        <div className="showcase__photo">
                        <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                        <div className="showcase__info">
                            <div className="showcase__des">
                            <h4>
                                <a href={`/details/${product.id}`}>{product.product_name}</a>
                            </h4>
                            Sold:<p className="demo" />
                            <p>
                                <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                                <a>
                                </a></p><a>
                                <input type="hidden" name="id" defaultValue={product.id} />
                                <button type="submit" className="btn btn-danger" onClick={() => handleAddProduct(product.id)}>Add 1 to cart</button>
                                </a>
                            <p />
                            </div>
                        </div>
                        </div>
                    </div>
                )
            ))}
            
            {products && products.map((product) => (
                product.type === "Pastries" && (
                    <div className=" showcase__item PASTRIES " data-category="metalloid">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product.id}`}>{product.product_name}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p>
                            <a>
                            <input type="hidden" name="id" defaultValue={product.id} />
                            <button type="submit" className="btn btn-danger" onClick={() => handleAddProduct(product.id)}>Add 1 to cart</button>
                            </a>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}

            {products && products.map((product) => (
                product.type === "Cake Slice" && (
                    <div className=" showcase__item CAKESLICES " data-category="post-transition">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product.id}`}>{product.product_name}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><a>
                            <input type="hidden" name="id" defaultValue={product.id} />
                            <button type="submit" className="btn btn-danger" onClick={() => handleAddProduct(product.id)}>Add 1 to cart</button>
                            </a>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}
            
            {products && products.map((product) => (
                product.type === "Cheesecake" && (
                    <div className=" showcase__item CHEESECAKES " data-category="post-transition">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product.id}`}>{product.product_name}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><a>
                            <input type="hidden" name="id" defaultValue={product.id} />
                            <button type="submit" className="btn btn-danger" onClick={() => handleAddProduct(product.id)}>Add 1 to cart</button>
                            </a>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}

            {products && products.map((product) => (
                product.type === "Drinks" && (
                    <div className=" showcase__item DRINKS " data-category="transition">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product.id}`}>{product.product_name}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><a>
                            <input type="hidden" name="id" defaultValue={product.id} />
                            <button type="submit" className="btn btn-danger" onClick={() => handleAddProduct(product.id)}>Add 1 to cart</button>
                            </a>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}
            {products && products.map((product) => (
                product.type === "Ice Cream" && (
                    <div className=" showcase__item ICECREAM " data-category="alkali">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product.id}`}>{product.product_name}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><a>
                            <input type="hidden" name="id" defaultValue={product.id} />
                            <button type="submit" className="btn btn-danger" onClick={() => handleAddProduct(product.id)}>Add 1 to cart</button>
                            </a>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}
            </div>
        </section>
        {/* <Footer></Footer> */}
        
        <Script></Script>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default Menu