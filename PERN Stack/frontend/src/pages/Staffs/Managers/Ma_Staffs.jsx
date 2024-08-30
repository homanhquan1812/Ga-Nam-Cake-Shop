import { React, useState, useEffect } from 'react';
import Head from '../../../components/Head';
import { Header2 } from '../../../components/Header2';
import Script from '../../../components/Script';
import axios from 'axios';

const Ma_Staffs = () => {
    const [staffs, setStaffs] = useState([]);
    const [orders, setOrders] = useState([]);
    const [staffID, setStaffID] = useState([]);
    const [csw_department, setNewDepartment] = useState([])
    const [csw_position, setNewPosition] = useState([])
    const [csw_username, setNewUsername] = useState([])
    const [csw_password, setNewPassword] = useState([])
    const [csw_emailaddress, setNewEmailAddress] = useState([])
    const [csw_name, setNewName] = useState([])
    const [csw_gender, setNewGender] = useState([])
    const [csw_phonenumber, setNewPhoneNumber] = useState([])

    const submit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/managers/staffs', {
            csw_department,
            csw_position,
            csw_username,
            csw_password,
            csw_emailaddress,
            csw_phonenumber,
            csw_gender,
            csw_name
          });
        } catch (error) {
          console.log(error)
        }
      };

    const submitChange = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:5000/managers/staffs/${staffID}`, {
            csw_department,
            csw_position,
          });
        } catch (error) {
          console.log(error) // Set error message if login fails
        }
      };

    const handleDeleteModalShow = (id) => {
        setStaffID(id);
    };
    const handleDeleteStaffs = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/managers/staffs/${staffID}`);
            console.log(response.data); // handle success response
        } catch (error) {
            console.error('Error deleting course:', error); // handle error
        }
    };

    useEffect(() => {
        const fetchStaffsData = async () => {
          try {
            const response = await fetch('http://localhost:5000/managers/staffs');
            const data = await response.json();
            setStaffs(data.staffs);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Fetch data initially
        fetchStaffsData();

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
        fetchStaffsData();
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
            "/css/staffs.css"
        ]} additionalTitle={[
            "Staffs - Gà Nấm Cake Shop"
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
            <a href="/managers/staffs" className="active">
            <span className="material-symbols-outlined">groups</span>
            <h3>Staffs</h3>
            </a>
            <a href="/managers/customers">
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
        {/* <form name="container-form" method="POST" action="/managers/handle-form-actions"> */}
        <main id="dynamic-content">
        <div className="mt-4">
            <div className="insights">
            <div className="sales">
                <div className="middle">
                <div className="left">
                    <button type="button" className="btn btn-primary" id="addInfoBtn">Add more members</button>
                    <button style={{marginLeft: '10px'}} type="submit" className="btn btn-success" id="saveAddedInfoBtn" onClick={submit} form="addInfoForm">Save this member</button>
                    <button style={{marginLeft: '10px'}} type="button" className="btn btn-danger" id="discardAddedInfoBtn">Discard</button>
                </div>       
                </div>
                {/*
                            <div id="warning" style="margin-top: 10px; font-size: 15px; display: none;">
                                <div style="color: red; font-weight: bold;">Notes: </div>
                                - "<b>Save all changes</b>" is temporarily disabled.
                                <br>
                                - Click <b>Enter</b> in every cell of information you want to save.
                            </div>
                            */}
                <div className="add-data">
                <form method="POST" id="addInfoForm">
                    <input type="type" id="csw_name" name="csw_name" placeholder="Name" required onChange={(e) => {setNewName(e.target.value)}}/>
                    <input type="type" id="csw_gender" name="csw_gender" placeholder="Gender" onChange={(e) => {setNewGender(e.target.value)}}/>
                    <input type="type" id="csw_phonenumber" name="csw_phonenumber" placeholder="Phone number" onChange={(e) => {setNewPhoneNumber(e.target.value)}} />
                    <input type="type" id="csw_username" name="csw_username" placeholder="Username" onChange={(e) => {setNewUsername(e.target.value)}}/>
                    <input type="type" id="csw_emailaddress" name="csw_emailaddress" placeholder="Email address" onChange={(e) => {setNewEmailAddress(e.target.value)}} />
                    <input type="password" id="csw_password" name="csw_password" placeholder="Password" onChange={(e) => {setNewPassword(e.target.value)}}/>
                    <input type="type" id="csw_position" name="csw_position" placeholder="Position" onChange={(e) => {setNewPosition(e.target.value)}}/>
                    <input type="type" id="csw_department" name="csw_department" placeholder="Department" onChange={(e) => {setNewDepartment(e.target.value)}}/>
                </form>
                </div>                                
                <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Member</th>
                    <th>Gender</th>
                    <th>Phone number</th>
                    <th>Email address</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return staffs && staffs.map((staff) => (
                            !staff.deleted && (
                                <tr key={staff._id}>
                                    <td>{++counter}</td>
                                    <td>{staff.csw_name}</td>
                                    <td>{staff.csw_gender}</td>
                                    <td>{staff.csw_phonenumber}</td>
                                    <td>{staff.csw_emailaddress}</td>
                                    <td>
                                        <form method="PUT" />
                                        <div className="changeCurrentPosition"> 
                                        <input type="type" className="form-control" defaultValue={staff.csw_position} data-id={staff._id} onChange={(e) => setNewPosition(e.target.value)} name="csw_position" />
                                        </div>
                                    </td>
                                    <td> 
                                    <div className="changeCurrentDepartment">
                                    <input type="type" className="form-control" defaultValue={staff.csw_department} data-id={staff._id} onChange={(e) => setNewDepartment(e.target.value)} name="csw_department" />
                                    </div>
                                    </td>
                                    <td>
                                      <div style={{ display: 'flex', justifyContent: staff.csw_position === "Manager" ? 'center' : 'flex-start', gap: '10px' }}>
                                          <button type="button" className="btn btn-warning" data-toggle="modal" data-id={staff._id} data-target="#edit-course-modal" onClick={() => handleEditModalShow(staff._id)}>Save changes</button>
                                          {staff.csw_position !== "Manager" && (
                                              <button type="button" className="btn btn-danger" data-toggle="modal" data-id={staff._id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(staff._id)}>Remove</button>
                                          )}
                                      </div>
                                  </td>

                                </tr>
                            )
                        ))
                    })()}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </main>
        {/* </form> */}
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
                <p>Are you sure that you want to delete this member?</p>
            </div>
            <div className="modal-footer">
            <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteStaffs}>Yes</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>
        <div className="right">
        <div className="top" />
        </div>
    </div>
    <div id="savedNumber" style={{display: 'none'}}>
        {'{'}{'{'}csw_info.length{'}'}{'}'}
    </div>
    <Script />
    </div>
  )
}

export default Ma_Staffs