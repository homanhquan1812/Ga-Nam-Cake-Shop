import { React, useState, useEffect } from 'react';
import { Head } from '../../../components/Head';
import { Header2 } from '../../../components/Header2';
import axios from 'axios'
import Script from '../../../components/Script';

const Ma_Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customerID, setCustomerID] = useState(null);

    const handleDeleteModalShow = (id) => {
        setCustomerID(id);
    };
    const handleDeleteCustomers = async () => {
        try {
            await axios.delete(`http://localhost:5000/managers/customers/${customerID}`);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    useEffect(() => {
        const fetchCustomersData = async () => {
          try {
            const response = await fetch('http://localhost:5000/managers/customers');
            const data = await response.json();
            setCustomers(data.customers);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchCustomersData();

        const fetchOrdersData = async () => {
            try {
              const response = await fetch('http://localhost:5000/managers/orders');
              // const response = await fetch('https://yolohome-homanhquan-api.onrender.com/dashboard');
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
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
        fetchCustomersData();
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
    <Head additionalStylesheets={[
            "/css/customers.css"
        ]} additionalTitle={[
            "Customers - Gà Nấm Cake Shop"
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
            <a href="/managers/overview">
            <span className="material-symbols-outlined"> overview </span>
            <h3>Overview</h3>
            </a>
            <a href="/managers/dashboard">
            <span className="material-icons-sharp">grid_view</span>
            <h3>Dashboard</h3>
            </a>
            <a href="/managers/orders">
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
            <a href="/managers/staffs">
            <span className="material-symbols-outlined">groups</span>
            <h3>Staffs</h3>
            </a>
            <a href="/managers/customers" className="active">
            <span className="material-icons-sharp">person_outline</span>
            <h3>Customers</h3>
            </a>
            <a href="/managers/notes">
            <span className="material-symbols-outlined"> format_list_bulleted_add </span>
            <h3>To-Do Lists</h3>
            {/*
                    <span class="message-count">23</span>
                    */}
            </a>
            <a href="/managers/products">
            <span className="material-icons-sharp">inventory</span>
            <h3>Products</h3>
            </a>
            <a href="/managers/feedbacks">
            <span className="material-icons-sharp">feedback</span>
            <h3>Feedbacks</h3>
            </a>
            <a href="/managers/settings">
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
                <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Customer</th>
                    <th>Gender</th>
                    <th>Phone number</th>
                    <th>Address</th>
                    <th>Username</th>
                    <th>Email address</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return customers && customers.map((customer) => (
                            !customer.deleted && (
                                <tr key={customer._id}>
                                <td>{++counter}</td>
                                <td>{customer.csw_name}</td>
                                <td>{customer.csw_gender}</td>
                                <td>{customer.csw_phonenumber}</td>
                                <td>{customer.csw_address}</td>
                                <td>{customer.csw_username}</td>
                                <td>{customer.csw_emailaddress}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-id={customer._id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(customer._id)}>
                                        Remove
                                    </button>
                                </td>
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
                <p>Are you sure that you want to delete this customer?</p>
            </div>
            <div className="modal-footer">
                <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteCustomers}>Yes</button>
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
    </div>
  )
}

export default Ma_Customers