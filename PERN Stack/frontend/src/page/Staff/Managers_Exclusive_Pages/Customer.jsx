import { React, useState, useEffect } from 'react'
import Head from '../../../component/Head'
import { Header2 } from '../../../component/Header2'
import axios from 'axios'
import Script from '../../../component/Script'
import Sidebar from '../../../component/Sidebar'

const Customer = () => {
    const [customers, setCustomers] = useState([])
    const [customerID, setCustomerID] = useState(null)

    const handleDeleteModalShow = (id) => {
        setCustomerID(id)
    }
    const handleDeleteCustomers = async () => {
        try {
            console.log(customerID)
            await axios.delete(`http://localhost:5000/customer/${customerID}`)
        } catch (error) {
            console.error('Error deleting course:', error)
        }
    }

    useEffect(() => {
        const fetchCustomersData = async () => {
          try {
            const response = await fetch('http://localhost:5000/customer')
            const data = await response.json()
            setCustomers(data.customer)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }

        fetchCustomersData()

    const intervalId = setInterval(() => {
        fetchCustomersData()
    }, 2000)
  
    // Cleanup function
    return () => clearInterval(intervalId)
      }, [])

      const countRow = (orders) => {
        if (!Array.isArray(orders)) {
          return 0 // Return 0 if orders is not an array
        }
    
        let totalRow = 0
    
        orders.forEach(order => {
          if (order && !order.declined && !order.delivered) {
            totalRow += 1 // Increment totalRow if order is not declined and not delivered
          }
        })
    
        return totalRow
      }

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
        <Sidebar></Sidebar>
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
                    <th>Email address</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0
                        return customers && customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{++counter}</td>
                                <td>{customer.name}</td>
                                <td>{customer.gender}</td>
                                <td>{customer.phonenumber}</td>
                                <td>{customer.address}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-id={customer.id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(customer.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
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
    <Script></Script>
    </div>
  )
}

export default Customer