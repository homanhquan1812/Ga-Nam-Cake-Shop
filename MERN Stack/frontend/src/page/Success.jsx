import React from 'react'
import Head from '../component/Head'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import Script from '../component/Script'

const Success = () => {
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
          "Success - Gà Nấm Cake Shop"
      ]}></Head>
        <Header></Header>
      <div className="success_detail">
          <h2>Success</h2>
          <i className="fa-solid fa-check" />
          <h3>We've received your order and we will contact you soon.</h3>
          <h3>Please keep in touch!</h3>
      </div>
      <div className="success_button">
          <button className="button-pink "><a href="/menu">Continue Buying</a></button>
          <button className="button-pink "><a href="/home">Go back to Homepage</a></button>
      </div>
      <Footer></Footer>
        <Script></Script>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default Success