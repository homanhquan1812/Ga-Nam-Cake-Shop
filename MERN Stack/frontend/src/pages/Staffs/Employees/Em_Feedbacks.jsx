import { React, useState, useEffect } from 'react';
import { Head } from '../../../components/Head';
import { Header2 } from '../../../components/Header2';

const Em_Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchFeedbacksData = async () => {
          try {
            const response = await fetch('http://localhost:5000/managers/feedbacks');
            const data = await response.json();
            setFeedbacks(data.feedbacks);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Fetch data initially
        fetchFeedbacksData();

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
        fetchFeedbacksData();
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

  return (
    <div>
    <Head />
    <Head additionalStylesheets={[
            "/css/dashboard.css"
        ]} additionalTitle={[
            "Feedbacks - Gà Nấm Cake Shop"
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
            <a href="/employees/feedbacks" className="active">
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
            <div className="sales" style={{marginTop: '20px', width: '1100px'}}>
                {/*
                        <div class="middle">
                            <div class="left">
                                <button type="button" class="btn btn-primary">Add more members</button>
                            </div>
                        </div>
                        */}
                <table style={{marginTop: '20px', width: '100%'}}>
                <thead>
                    <tr>
                    <th style={{width: '5%'}}>No</th>
                    <th style={{width: '15%'}}>Full Name</th>
                    <th style={{width: '15%'}}>Phone number</th>
                    <th style={{width: '25%'}}>Email Address</th>
                    <th style={{width: '40%'}}>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return feedbacks && feedbacks.map((feedback) => (
                            !feedback.deleted && (
                                <tr key={feedback.id}>
                                <td style={{width: '5%'}}>{++counter}</td>
                                <td style={{width: '15%'}}>{feedback.lastName} {feedback.firstName}</td>
                                <td style={{width: '15%'}}>{feedback.phone}</td>
                                <td style={{width: '25%'}}>{feedback.email}</td>
                                <td style={{width: '40%'}}>{feedback.message}</td>
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
        <div className="right">
        <div className="top">
        </div>
        </div>
    </div>
    </div>
  )
}

export default Em_Feedbacks