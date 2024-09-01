import { React, useState, useEffect } from 'react';
import Head from '../../component/Head';
import { Header2 } from '../../component/Header2';
import Sidebar from '../../component/Sidebar';

const Overview = () => {
    const [notes, setNotes] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchNotesData = async () => {
          try {
            const response = await fetch('http://localhost:5000/note');
            const data = await response.json();
            setNotes(data.note);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchNotesData();

        const fetchOrdersData = async () => {
            try {
              const response = await fetch('http://localhost:5000/order');
              const data = await response.json();
              setOrders(data.orders);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchOrdersData();

    const intervalId = setInterval(() => {
      fetchNotesData();
      fetchOrdersData();
  }, 2000);

  return () => clearInterval(intervalId);
      }, []);

      const getTotal = (orders) => {
        let totalSum = 0;
        orders.forEach(order => {
          if (order && !order.declined && order.delivered) {
            totalSum += order.cart.totalPrice || 0;
          }
        });
        return totalSum;
      };

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/overview.css"
        ]} additionalTitle={[
            "Overview - Gà Nấm Cake Shop"
        ]}/>
    {/* Header */}
    <Header2></Header2>
    {/* Content */}
    <div className="container">
        <Sidebar></Sidebar>
        <main id="dynamic-content">
        <div className="insights">
        </div>
        <div className="recent-orders">
            <h1>Recent Orders <button style={{marginLeft: '10px'}} type="button" className="btn btn-primary" onClick={() => window.location.href="/staff/dashboard"}>More Details</button></h1>
            <table style={{marginTop: '20px'}}>
            <thead>
                <tr>
                <th>No</th>
                <th>Customers</th>
                <th>Phone Number</th>
                <th>Product/Quantity</th>
                <th>Status</th>
                <th />
                </tr>
            </thead>
            <tbody>
                {
                    orders.slice().reverse().map((order, index) =>
                        (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.phonenumber}</td>
                            <td>
                            {order.cart.items.map((product, index) => (
                                <div key={index}>
                                    {index !== 0 && <hr />}
                                    {product.name} x {product.quantity}
                                </div>
                                ))}
                            </td>
                            <td>
                            {order.declined && (
                                <button type="button" className="btn btn-danger">
                                Declined
                                </button>
                            )}
                            {!order.declined && order.delivered && (
                                <button type="button" className="btn btn-success">
                                Delivered
                                </button>
                            )}
                            {!order.declined && !order.delivered && (
                                <button type="button" className="btn btn-warning">
                                Processing
                                </button>
                            )}
                            </td>
                        </tr>
                        )
                    )
                }
            </tbody>
            </table>
            {/*
                <div class="showall">
                        <a href="#">Show All</a>
                </div>
                */}
        </div>
        </main>
        <div className="right">
        <main id="dynamic-content">
            <div className="recent-updates">
            <div className="insights">
                <div className="sales">
                <span className="material-icons-sharp">analytics</span>
                <div className="middle">
                    <div className="left">
                    <h3>Total Sales</h3>
                    <h1>              
                    {getTotal(orders)} VND
                    </h1>
                    </div>
                </div>
                <small className="text-muted">Last 24 Hours</small>
                </div>
            </div>
            </div></main>
        <div className="recent-updates">
            <div className="updates">
            <div className="insights">
                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '25px'}}>To-Do Lists</span>
                <table style={{marginTop: '20px', width: '100%'}}>
                <thead>
                    <tr>
                    <th style={{width: '20%'}}>No</th>
                    <th style={{width: '80%'}}>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return notes && notes.map((note) => (
                            !note.deleted && (
                                <tr key={note.id}>
                                <td>{++counter}</td>
                                <td>{note.note}</td>
                            </tr>
                            )
                        ))
                    })()}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Overview