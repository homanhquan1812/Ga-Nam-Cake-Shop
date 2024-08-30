import { React, useState, useEffect } from 'react';
import Head from '../../../components/Head';
import { Header2 } from '../../../components/Header2';

const Em_Overview = () => {
    const [notes, setNotes] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchNotesData = async () => {
          try {
            const response = await fetch('http://localhost:5000/managers/notes');
            const data = await response.json();
            setNotes(data.notes);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Fetch data initially
        fetchNotesData();

        const fetchOrdersData = async () => {
            try {
              const response = await fetch('http://localhost:5000/managers/orders');
              const data = await response.json();
              setOrders(data.orders);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          // Fetch data initially
          fetchOrdersData();

          // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchNotesData();
      fetchOrdersData();
  }, 2000);
  
    // Cleanup function
    return () => clearInterval(intervalId);
      }, []);

      const countRow = (orders) => {
        if (!Array.isArray(orders)) {
          return 0; // Return 0 if orders is not an array
        }
    
        let totalRow = 0;
    
        orders.forEach(order => {
          if (order && !order.declined && !order.delivered) {
            totalRow += 1; // Increment totalRow if order is not declined and not delivered
          }
        });
    
        return totalRow;
      };

      const getTotal = (orders) => {
        if (!Array.isArray(orders)) {
          return 0;
        }
  
        let totalSum = 0;
        orders.forEach(order => {
          if (order && !order.declined && order.delivered) {
            totalSum += order.totalcost || 0;
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
        <aside>
        <div className="top">
            <div className="logo">
            <img src="../../img/logo.png" />
            </div>
            <div className="close">
            <span className="material-icons-sharp">close</span>
            </div>
        </div>
        <div className="sidebar" id="sidebar">
            <a href="/employees/overview" className="active">
            <span className="material-symbols-outlined"> overview </span>
            <h3>Overview</h3>
            </a>
            <a href="/employees/dashboard">
            <span className="material-icons-sharp">grid_view</span>
            <h3>Dashboard</h3>
            </a>
            <a href="/employees/orders">
            <span className="material-symbols-outlined"> list_alt </span>
            <h3>New Orders</h3>
            {orders.length === 0 ? (
                <span className="message-count" style={{ display: 'none' }}>
                    {countRow(orders)}
                </span>
                ) : (
                <span className="message-count">
                    {countRow(orders)}
                </span>
            )}  
            </a>
            <a href="/employees/notes">
            <span className="material-symbols-outlined"> format_list_bulleted_add </span>
            <h3>To-Do Lists</h3>
            {/*
                    <span class="message-count">23</span>
                    */}
            </a>
            <a href="/employees/products">
            <span className="material-icons-sharp">inventory</span>
            <h3>Products</h3>
            </a>
            <a href="/employees/feedbacks">
            <span className="material-icons-sharp">feedback</span>
            <h3>Feedbacks</h3>
            </a>
            <a href="/employees/settings">
            <span className="material-icons-sharp">settings</span>
            <h3>Settings</h3>
            </a>
        </div>
        </aside>
        <main id="dynamic-content">
        {/*
            <div class="date">
                <input type="date">
            </div>
            */}
        <div className="insights">
        </div>
        <div className="recent-orders">
            <h1>Recent Orders <button style={{marginLeft: '10px'}} type="button" className="btn btn-primary" onClick={() => window.location.href="/employees/dashboard"}>More Details</button></h1>
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
                {/* Order number is reversed */}
                {(() => {
                    let counter = 0;
                    return (
                        orders &&
                        orders
                        .slice()
                        .reverse()
                        .map((order) =>
                            !order.deleted && (
                            <tr key={order.id}>
                                <td>{++counter}</td>
                                <td>{order.customer}</td>
                                <td>{order.phonenumber}</td>
                                <td>
                                {order.products
                                    .map((product, index) => (
                                    <div key={index}>
                                        {index !== 0 && <hr />}
                                        {product.name} x {product.qty}
                                        
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
                    );
                    })()}
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
                                <td>{note.csw_notes}</td>
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

export default Em_Overview