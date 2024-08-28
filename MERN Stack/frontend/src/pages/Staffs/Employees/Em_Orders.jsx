import { React, useState, useEffect } from 'react';
import { Head } from '../../../components/Head';
import Script from '../../../components/Script';
import axios from 'axios'
import { Header2 } from '../../../components/Header2';

const Em_Orders = () => {
    const [orders, setOrders] = useState([]);
    const [ordersID, setOrdersID] = useState([]);
    
    const handleDeleteModalShow = (id) => {
        setOrdersID(id);
    };
    const handleDeleteOrders = async () => {
        try {
            await axios.put(`http://localhost:5000/managers/orders/${ordersID}`, {
                declined: false,
                delivered: true
            });
        } catch (error) {
            console.error('Error deleting course:', error); // handle error
        }
    };

    useEffect(() => {
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
        const intervalId = setInterval(fetchOrdersData, 5000);

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

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/orders.css"
        ]} additionalTitle={[
            "Orders - Gà Nấm Cake Shop"
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
            <a href="/employees/overview">
            <span className="material-symbols-outlined"> overview </span>
            <h3>Overview</h3>
            </a>
            <a href="/employees/dashboard">
            <span className="material-icons-sharp">grid_view</span>
            <h3>Dashboard</h3>
            </a>
            <a href="/employees/orders" className="active">
            <span className="material-symbols-outlined"> list_alt </span>
            <h3>New Orders</h3>
            {orders.length === 0 ? (
                <span className="message-count" style={{display: 'none'}}>
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
        <div className="mt-4">
            <div className="insights">
            <div className="sales">
                {/*
                        <div class="middle">
                            <div class="left">
                                <button type="button" class="btn btn-primary">Add more members</button>
                            </div>
                        </div>
                        */}
                <table style={{marginTop: '20px', width: '1000px'}}>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Customer</th>
                    <th>Phone number</th>
                    <th>Address</th>
                    <th style={{width: '25%'}}>Product + Quantity</th>
                    <th>Total cost</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return orders && orders.slice()
                        .reverse().map((order) => (
                            !order.deleted && !order.declined && !order.delivered && (
                                <tr key={order.id}>
                                <td>{++counter}</td>
                                <td>{order.customer}</td>
                                <td>{order.phonenumber}</td>
                                <td>{order.address}</td>
                                <td>
                                    {order.products.map((product, index) => (
                                        <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            {product.name} x {product.qty}
                                            {index !== order.products.length - 1 && <hr />}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.totalcost}</td>
                                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-id={order._id} data-target="#delete-course-modal"  onClick={() => handleDeleteModalShow(order._id)}>Finish delivering</button></td>
                            </tr>
                            )
                        ))
                    })()}
                </tbody>
                </table>
                {/*
                    <div class="showall">
                        <a href="#">Show All</a>
                    </div>
                    */}
            </div>
            </div>
        </div></main>
        <form method="POST" name="delete-course-form" />
        <div id="delete-course-modal" className="modal" tabIndex={-1} role="dialog" style={{fontSize: '15px'}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" style={{fontSize: '15px!important'}}>Delete Confirmation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Are you sure that you've already delivered cakes to this customer?</p>
            </div>
            <div className="modal-footer">
                <button id="btn-delete-course" type="button" data-dismiss="modal" className="btn btn-primary" onClick={handleDeleteOrders}>Yes</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>
        <div className="right">
        <div className="top">
        </div>
        </div>
    </div>
    <Script />
    </div>
  )
}

export default Em_Orders