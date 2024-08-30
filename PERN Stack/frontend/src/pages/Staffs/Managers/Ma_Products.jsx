import { React, useState, useEffect } from 'react';
import Head from '../../../components/Head';
import { Header2 } from '../../../components/Header2';
import Script from '../../../components/Script';
import axios from 'axios';

const Ma_Products = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [csw_products, setProducts2] = useState([])
    const [type, setType] = useState([])
    const [price, setPrice] = useState([])
    const [photo, setPhoto] = useState([])
    const [description, setDescription] = useState([])
    const [productID, setProductID] = useState([]);

    const handleDeleteModalShow = (id) => {
        setProductID(id);
    };
    const handleDeleteProducts = async () => {
        try {
            await axios.delete(`http://localhost:5000/managers/products/${productID}`);
        } catch (error) {
            console.error('Error deleting course:', error); // handle error
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/managers/products', {
            csw_products,
            type,
            description,
            price: parseFloat(price), // Convert price to a number
            photo: [photo], // Wrap photo URL in an array
          });
        } catch (error) {
          console.log(error) // Set error message if login fails
        }
      };

    useEffect(() => {
        const fetchProductsData = async () => {
          try {
            const response = await fetch('http://localhost:5000/managers/products');
            const data = await response.json();
            setProducts(data.products);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Fetch data initially
        fetchProductsData();

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
        fetchProductsData();
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

      function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("product-searchbar");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
            }       
        }
    }

  return (
    <div>
    <Head additionalStylesheets={[
            "/css/products.css"
        ]} additionalTitle={[
            "Products - Gà Nấm Cake Shop"
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
            <a href="/managers/notes">
            <span className="material-symbols-outlined"> format_list_bulleted_add </span>
            <h3>To-Do Lists</h3>
            {/*
                    <span class="message-count">23</span>
                    */}
            </a>
            <a href="/managers/products" className="active">
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
                    <button type="button" className="btn btn-primary" id="addProductBtn">Add more products</button>
                    <button style={{marginLeft: '0px'}} type="submit" className="btn btn-success" id="saveProductBtn" onClick={submit} form="addProductForm">Save this product</button>
                    <button style={{marginLeft: '10px'}} type="button" className="btn btn-danger" id="discardProductBtn">Discard this product</button>
                </div>
                </div>
                <input type="text" id="product-searchbar" onKeyUp={myFunction} placeholder="Search for products." />
                {/*
                        <div id="warning3" style="margin-top: 10px; font-size: 15px; display: none;">
                                <div style="color: red; font-weight: bold;">Notes: </div>
                                - Click <b>Enter</b> in every cell of information you want to save.
                                </ul></div>
                        */}
                <div className="add-data">
                <form method="POST" id="addProductForm">
                    <input type="type" id="csw_products" name="csw_products" placeholder="Product Name" required onChange={(e) => {setProducts2(e.target.value)}} />
                    <input type="type" id="type" name="type" placeholder="Type" required onChange={(e) => {setType(e.target.value)}} />
                    <input type="type" id="price" name="price" placeholder="Price" required onChange={(e) => {setPrice(e.target.value)}} />
                    <input type="type" id="photo" name="photo" placeholder="Image Link" required onChange={(e) => {setPhoto(e.target.value)}} />
                    <div className="description-input">
                    <input type="type" id="description" name="description" placeholder="Description" onChange={(e) => {setDescription(e.target.value)}} />
                    </div>         
                </form>
                </div>
                <table style={{marginTop: '20px'}} id="myTable">
                <thead>
                    <tr>
                    <th style={{width: '5%'}}>No</th>
                    <th style={{width: '15%'}}>Product</th>
                    <th>Photo</th>
                    <th style={{width: '15%'}}>Date added</th>
                    <th style={{width: '10%'}}>Type</th>
                    <th style={{width: '45%'}}>Description</th>                                       
                    <th style={{width: '5%'}}>Price</th>
                    <th style={{width: '5%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return products && products.map((product) => (
                            !product.deleted && (
                                <tr key={product._id}>
                                <td>{++counter}</td>
                                <td>{product.csw_products}</td>
                                <td><img src={product.photo} alt={product.csw_products} className="photo" /></td>
                                <td>{product.createdAt}</td>
                                <td>{product.type}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-id={product._id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(product._id)}>
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
                    
                        <small class="text-muted">Last 24 Hours</small>
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
                <p>Are you sure that you want to delete this product?</p>
            </div>
            <div className="modal-footer">
            <button id="btn-delete-course" data-dismiss="modal" type="button" className="btn btn-primary" onClick={handleDeleteProducts}>Yes</button>
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

export default Ma_Products