import React from 'react'
import Head from '../component/Head'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Script from '../component/Script'

const About = () => {
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
            "About - Gà Nấm Cake Shop"
        ]}></Head>
        <Header></Header>
        <section className="intro" id="intro">
            <div className="row g-0">
            <div className="intro__item intro__text col-3">
                <div>
                <h3>Masters at Work</h3>
                <p>On every level, we strive to do our best to deliver the very best to you.</p>
                </div>
            </div>
            <div className="intro__item col-6">
                <img src="./img/ab1.jpg" alt="intro1" />
            </div>
            <div className="intro__item intro__text col-3">
                <div>
                <h3>Community</h3>
                <p>The desire to make the world a happier place drives everything we do.</p>
                </div>
            </div>
            <div className="intro__item intro__text col-6">
                <div>
                <h3>Rise to the Occasion</h3>
                <p>We bring our best to every task, poring over details and never doing anything halfway or in haste.</p>
                </div>
            </div>
            <div className="intro__item col-3">
                <img src="./img/ab2.jpg" alt="intro2" />
            </div>
            <div className="intro__item intro__text col-3">
                <div>
                <h3>Have Heart</h3>
                <p>A genuine feeling of warmth is infused in all that we do</p>
                </div>
            </div>
            <div className="intro__item col-3">
                <img src="./img/ab3.jpg" alt="intro3" />
            </div>
            <div className="intro__item intro__text col-3">
                <div>
                <h3>Nourish Community</h3>
                <p>Fostering connections, building community and making people’s days a little brighter, any way we can.</p>
                </div>
            </div>
            <div className="intro__item col-6">
                <img src="./img/ab4.jpg" alt="intro4" />
            </div>
            </div>
        </section>
        {/* NUMBER  */}
        <section className="number">
            <div className="number__content">
            <div className="number__item">
                <p className="counter">3500</p>
                <p>Coffee</p>
            </div>
            <div className="number__item">
                <p className="counter">650</p>
                <p>Happy Client</p>
            </div>
            <div className="number__item">
                <p className="counter">10</p>
                <p>Experience</p>
            </div>
            <div className="number__item">
                <p className="counter">1010</p>
                <p>Expert Worker</p>
            </div>
            </div>
        </section>
        {/* TEAM */}
        <section className="team">
            <h2>BAKE TEAM</h2>
            <div className="container">
            <div className="team__content row">
                <div className="team__item col-4">
                <img src="./img/t1.jpg" alt="" />
                <div className="team__title">
                    <h3>JOHN SIMON</h3>
                    <p>-Cake Maker</p>
                </div>
                <div className="team__detail">
                    <h3>JOHN SIMON</h3>
                    <p className="team__text">-Cake Maker</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, ipsam.</p>
                    <div className="team__social">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-twitter" />
                    </div>
                </div>
                </div>
                <div className="team__item team__item2 col-4">
                <img src="./img/t2.jpg" alt="" />
                <div className="team__title">
                    <h3>JOHN SIMON</h3>
                    <p>-Cake Maker</p>
                </div>
                <div className="team__detail">
                    <h3>JOHN SIMON</h3>
                    <p className="team__text">-Cake Maker</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, ipsam.</p>
                    <div className="team__social">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-twitter" />
                    </div>
                </div>
                </div>
                <div className="team__item team__item3 col-4">
                <img src="./img/t3.jpg" alt="" />
                <div className="team__title">
                    <h3>JOHN SIMON</h3>
                    <p>-Cake Maker</p>
                </div>
                <div className="team__detail">
                    <h3>JOHN SIMON</h3>
                    <p className="team__text">-Cake Maker</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, ipsam.</p>
                    <div className="team__social">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-twitter" />
                    </div>
                </div>
                </div>
                <div className="team__item team__item4 col-4">
                <img src="./img/t4.jpg" alt="" />
                <div className="team__title">
                    <h3>JOHN SIMON</h3>
                    <p>-Cake Maker</p>
                </div>
                <div className="team__detail">
                    <h3>JOHN SIMON</h3>
                    <p className="team__text">-Cake Maker</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, ipsam.</p>
                    <div className="team__social">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-twitter" />
                    </div>
                </div>
                </div>
                <div className="team__item team__item5 col-4">
                <img src="./img/t1.jpg" alt="" />
                <div className="team__title">
                    <h3>JOHN SIMON</h3>
                    <p>-Cake Maker</p>
                </div>
                <div className="team__detail">
                    <h3>JOHN SIMON</h3>
                    <p className="team__text">-Cake Maker</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, ipsam.</p>
                    <div className="team__social">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-twitter" />
                    </div>
                </div>
                </div>
                <div className="team__item team__item6 col-4">
                <img src="./img/t2.jpg" alt="" />
                <div className="team__title">
                    <h3>JOHN SIMON</h3>
                    <p>-Cake Maker</p>
                </div>
                <div className="team__detail">
                    <h3>JOHN SIMON</h3>
                    <p className="team__text">-Cake Maker</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, ipsam.</p>
                    <div className="team__social">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-twitter" />
                    </div>
                </div>
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

export default About