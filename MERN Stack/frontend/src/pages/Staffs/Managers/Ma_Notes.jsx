import { React, useState, useEffect } from 'react';
import { Head } from '../../../components/Head';
import { Header2 } from '../../../components/Header2';
import Script from '../../../components/Script';
import axios from 'axios';

const Ma_Notes = () => {
    const [notes, setNotes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [noteID, setNoteID] = useState([]);
    const [csw_notes, setNoteSaved] = useState([])

    const submit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/managers/notes', {
            csw_notes
          });
        } catch (error) {
          console.log(error)
        }
      };

    const handleDeleteModalShow = (id) => {
        setNoteID(id);
    };

    const handleDeleteNotes = async () => {
        try {
          await axios.delete(`http://localhost:5000/managers/notes/${noteID}`);
        } catch (error) {
            console.log(error)
        }
    };
    
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

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/notes.css"
        ]} additionalTitle={[
            "Notes - Gà Nấm Cake Shop"
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
            <a href="/managers/customers">
            <span className="material-icons-sharp">person_outline</span>
            <h3>Customers</h3>
            </a>
            <a href="/managers/notes" className="active">
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
                <div className="middle">
                <div className="left">
                    <button type="button" className="btn btn-primary" id="addNoteBtn">Add more notes</button>
                    <button type="submit" style={{marginLeft: '10px'}} className="btn btn-success" form="addNoteForm" id="saveNoteBtn" onClick={submit}>Save this note</button>
                    <button style={{marginLeft: '10px'}} type="button" className="btn btn-danger" id="discardNoteBtn" onclick="window.location.href='/managers/notes'">Discard this note</button>
                </div>
                </div>
                <div id="warning2" style={{marginTop: '10px', fontSize: '15px', display: 'none'}}>
                <div style={{color: 'red', fontWeight: 'bold'}}>Notes: </div>
                - Click <b>Enter</b> to save this note.
                </div>
                <div className="add-data">
                <form method="POST" id="addNoteForm">
                    <input type="text" id="csw_notes" name="csw_notes" placeholder="Write a note here." required onChange={(e) => {setNoteSaved(e.target.value)}} />
                </form>
                </div>
                <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                    <th style={{width: '10%'}}>No</th>
                    <th style={{width: '80%'}}>Notes</th>
                    <th style={{width: '10%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return notes && notes.map((note) => (
                            !note.deleted && (
                                <tr key={note._id}>
                                <td>{++counter}</td>
                                <td>{note.csw_notes}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-id={note._id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(note._id)}>
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
                <p>Are you sure that you want to delete this note?</p>
            </div>
            <div className="modal-footer">
            <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteNotes}>Yes</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
            </div>
            </div>
        </div>
        </div>
        <div className="right">
        <div className="top" />
        </div>
    </div>
    <div className="right">
        <div className="top">
        </div>
    </div>
    <Script />
    </div>
  )
}

export default Ma_Notes