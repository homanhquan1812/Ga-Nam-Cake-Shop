import React from 'react'
import { Head } from '../components/Head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Script from '../components/Script'

const History = () => {
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
            "History - Gà Nấm Cake Shop"
        ]}></Head>
        <Header></Header>
        <div id="container" style={{marginTop: '200px'}}>
        <div className="printing-history-box">
        <h2 style={{color: 'red'}}><center>Purchase History</center></h2>
        <div className="table-container">
            {'{'}{'{'}#each orders{'}'}{'}'}
            {'{'}{'{'}#if (eq this.csw_username ../csw_name){'}'}{'}'}
            {'{'}{'{'}/if{'}'}{'}'}
            {'{'}{'{'}/each{'}'}{'}'}
            <table className="content-table">
            <thead>
                <tr>
                <th>Order Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total cost</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody><tr>
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
                </tr><tr />
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