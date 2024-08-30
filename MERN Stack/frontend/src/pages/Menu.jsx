import { React, useState, useEffect } from 'react'
import { Head } from '../components/Head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Script from '../components/Script'

const Menu = () => {
  const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/managers/products');
            const data = await response.json();
            setProducts(data.products);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Fetch data initially
        fetchData();
      }, []);

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
      <Head additionalStylesheets={[
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
                !product.deleted && product.type === "Bread" && (
                    <div className=" showcase__item BREAD " data-category="transition">
                        <div className="showcase__photo">
                        <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                        <div className="showcase__info">
                            <div className="showcase__des">
                            <h4>
                                <a href={`/details/${product._id}`}>{product.csw_products}</a>
                            </h4>
                            Sold:<p className="demo" />
                            <p>
                                <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                                <a>
                                </a></p><form className="addToCartForm" action="/shoppingcart/addToCart" method="POST"><a>
                                <input type="hidden" name="id" defaultValue={product._id} />
                                <button type="submit" className="btn btn-danger">Add to cart</button>
                                </a></form>
                            <p />
                            </div>
                        </div>
                        </div>
                    </div>
                )
            ))}
            
            {products && products.map((product) => (
                !product.deleted && product.type === "Pastries" && (
                    <div className=" showcase__item PASTRIES " data-category="metalloid">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product._id}`}>{product.csw_products}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><form className="addToCartForm" action="/shoppingcart/addToCart" method="POST"><a>
                            <input type="hidden" name="id" defaultValue={product._id} />
                            <button type="submit" className="btn btn-danger">Add to cart</button>
                            </a></form>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}

            {products && products.map((product) => (
                !product.deleted && product.type === "Cake Slice" && (
                    <div className=" showcase__item CAKESLICES " data-category="post-transition">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product._id}`}>{product.csw_products}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><form className="addToCartForm" action="/shoppingcart/addToCart" method="POST"><a>
                            <input type="hidden" name="id" defaultValue={product._id} />
                            <button type="submit" className="btn btn-danger">Add to cart</button>
                            </a></form>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}
            
            {products && products.map((product) => (
                !product.deleted && product.type === "Cheesecake" && (
                    <div className=" showcase__item CHEESECAKES " data-category="post-transition">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product._id}`}>{product.csw_products}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><form className="addToCartForm" action="/shoppingcart/addToCart" method="POST"><a>
                            <input type="hidden" name="id" defaultValue={product._id} />
                            <button type="submit" className="btn btn-danger">Add to cart</button>
                            </a></form>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}

            {products && products.map((product) => (
                !product.deleted && product.type === "Drinks" && (
                    <div className=" showcase__item DRINKS " data-category="transition">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product._id}`}>{product.csw_products}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><form className="addToCartForm" action="/shoppingcart/addToCart" method="POST"><a>
                            <input type="hidden" name="id" defaultValue={product._id} />
                            <button type="submit" className="btn btn-danger">Add to cart</button>
                            </a></form>
                        <p />
                        </div>
                    </div>
                    </div>
                </div>
                )
            ))}
            {products && products.map((product) => (
                !product.deleted && product.type === "Ice Cream" && (
                    <div className=" showcase__item ICECREAM " data-category="alkali">
                    <div className="showcase__photo">
                    <img style={{height: '400px', width: '100%'}} src={product.photo} alt="" />
                    <div className="showcase__info">
                        <div className="showcase__des">
                        <h4>
                            <a href={`/details/${product._id}`}>{product.csw_products}</a>
                        </h4>
                        Sold:<p className="demo" />
                        <p>
                            <a href="#"><button type="button" className="btn btn-primary">{product.price} VND</button></a>
                            <a>
                            </a></p><form className="addToCartForm" action="/shoppingcart/addToCart" method="POST"><a>
                            <input type="hidden" name="id" defaultValue={product._id} />
                            <button type="submit" className="btn btn-danger">Add to cart</button>
                            </a></form>
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