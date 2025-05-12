import { React, useState, useEffect } from 'react'
import Head from '../component/Head'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Script from '../component/Script'

const Home = () => {
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
            "Home - Gà Nấm Cake Shop"
        ]}></Head>
        <Header></Header>
        {/* CAROUSEL  */}
        {/* <section class="cover">
            <div class="cover__content">
        <h1>Best Bake here</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button class="button-pink">LEARN MORE</button>
            </div>
        </section> */}
        {/* CAROUSEL */}
        <section className="Carousel">
            {/* data-ride="carousel" */}
            <div id="carouselCyber" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselCyber" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselCyber" data-bs-slide-to={1} aria-label="Slide 2" />
                {/*
            <button type="button" data-bs-target="#carouselCyber" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
                */}
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="./img/carousel6.jpg" className="d-block w-100" alt="carousel1" />
                <div className="carousel-caption container">
                    <h1 style={{color: 'red', fontSize: '100px', fontWeight: 700}}>BAKERY</h1>
                    <p className="carousel-first" style={{fontSize: '20px', fontWeight: 700, background: 'white', borderRadius: '20px', border: '10px solid', borderImage: 'linear-gradient(45deg, red, blue) 10', borderImageSlice: 1}}>A delicious variety of sweet and savory pastries and donuts, freshly baked every day.</p>
                    {/* <button class="btn button-pink">Read more<i class="fa fa-angle-double-right"></i></button> */}
                </div>
                </div>
                {/*
            <div class="carousel-item">
                <img src="./img/carousel1.jpg" class="d-block w-100" alt="carousel2">
                <div class="carousel-caption container">
                    <h1 class="text-body-emphasis">MOST ORDERED</h1>
                    
                    <button class="btn button-pink">Read more<i class="fa fa-angle-double-right"></i></button>
                </div>
            </div>
            */}
                <div className="carousel-item">
                <img src="./img/carousel3.jpg" className="d-block w-100" alt="carousel3" />
                <div className="carousel-caption container">
                    <h1>COMMENTS</h1>
                    <p>Thank you for your interest in reaching out to us! Fill out the feedback form and a member of our team will be in touch soon.</p>
                    <button className="btn button-pink"><a href="contact">Read more<i className="fa fa-angle-double-right" /></a></button>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselCyber" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselCyber" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </section>
        {/* SERVICES */}
        <section className="services" id="services">
            <h2>OUR SERVICES</h2>
            <div className="services__content">
            <div className="services__item">
                <i className="fa fa-adjust" />
                <h3>Tasty cakes</h3>
                <p>Joy baked into every bite.
                Enjoy fresh pastries, warm breads, our signature cakes and more.</p>
            </div>
            <div className="services__item">
                <i className="fa fa-snowflake" />
                <h3>Occasion</h3>
                <p>We bring our best to every task, poring over details and never doing anything halfway or in haste.</p>
                {/* <button class="button-pink">Learn more</button> */}
            </div>
            <div className="services__item">
                <i className="fa fa-chart-pie" />
                <h3>Spread Joy</h3>
                <p>The desire to make the world a happier place drives everything we do.</p>
                {/* <button class="button-pink">Learn more</button> */}
            </div>
            <div className="services__item">
                <i className="fab fa-slideshare" />
                <h3>Community</h3>
                <p>Fostering connections, building community and making people’s days a little brighter, any way we can.</p>
                {/* <button class="button-pink">Learn more</button> */}
            </div>
            </div>
        </section>
        {/* CAROUSEL  */}
        <section className="service__carousel" style={{marginTop: '-100px'}}>
            <div id="carouselCyber" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselCyber" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselCyber" data-bs-slide-to={1} aria-label="Slide 2" />
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="./img/368393066_2092635904435757_2978394674549760427_n.jpg" className="d-block w-100 " alt="..." />
                <div className="container carousel-caption">
                    <h1>Order Now</h1>
                    <p>Depending on the type of product, we can deliver it fresh,part-baked or frozen.</p>
                    <button className="btn"><a href="/gallery">More product</a><i className="fa fa-angle-double-right" /></button>
                </div>
                </div>
                <div className="carousel-item">
                <img src="./img/371537875_646770300861892_8602497452080053974_n.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselCyber" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselCyber" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </section>
        {/* TYPE  */}
        <section className="service__type">
            <div className="service__why">
            <h2>Why Choose Us</h2>
            <div className="row">
                <div className="col-4">
                <i className="fa-solid fa-calendar-days" />
                <p>Perfect for any occasion</p>
                </div>
                <div className="col-4">
                <i className="fa-solid fa-utensils" />
                <p>Breakfast, lunch, dinner &amp; dessert</p>
                </div>
                <div className="col-4">
                <i className="fa-solid fa-basket-shopping" />
                <p>Ordering simplified</p>
                </div>
                <div className="col-4">
                <i className="fa-solid fa-cookie-bite" />
                <p>Freshly Baked, Everyday</p>
                </div>
                <div className="col-4">
                <i className="fa-regular fa-face-grin-hearts" />
                <p>Where smiles are served daily</p>
                </div>
                <div className="col-4">
                <i className="fa-solid fa-kitchen-set" />
                <p>Finest ingredients and skilled bakers</p>
                </div>
            </div>
            </div>
        </section>
        {/* FEEDBACK */}
        <section className="feedback" id="clients">
            <h2>FEEDBACKS</h2>
            <div className="feedback__content">
            <div className="owl-carousel owl-theme">
                {/* <div class="owl-carousel owl-theme"> */}
                <div className="item">
                <p>
                    <i className="fa fa-quote-left" />I love all the baked goods here, they also have cheese cakes! <i className="fa fa-quote-right" />
                </p>
                <p className="feedback__name">
                    MARK
                </p>
                </div>
                <div className="item">
                <p>
                    <i className="fa fa-quote-left" />Delicious many kinds of cakes, fast services. The price is affordable, the design is beautiful and suitable for giving as a gift. <i className="fa fa-quote-right" />
                </p>
                <p className="feedback__name">
                    Huyen Pham
                </p>
                </div>
                <div className="item">
                <p>
                    <i className="fa fa-quote-left" /> This is a small online shop but the quality is really good <i className="fa fa-quote-right" />
                </p>
                <p className="feedback__name">
                    Kelvin
                </p>
                </div>
            </div>
            </div>
        </section>
        <Footer></Footer>
        <Script></Script>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default Home