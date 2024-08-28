import { React, useState, useEffect } from 'react';
import { Head } from '../../../components/Head';
import { Header2 } from '../../../components/Header2';
import Script from '../../../components/Script';

const Em_Products = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

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
            <a href="/employees/products" className="active">
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
                <div className="middle">
                </div>
                <input type="text" id="product-searchbar" onKeyUp={myFunction} placeholder="Search for products." />
                <table style={{marginTop: '20px'}} id="myTable">
                <thead>
                    <tr>
                    <th style={{width: '5%'}}>No</th>
                    <th style={{width: '15%'}}>Product</th>
                    <th>Photo</th>
                    <th style={{width: '15%'}}>Date added</th>
                    <th style={{width: '10%'}}>Type</th>
                    <th style={{width: '50%'}}>Description</th>
                    <th style={{width: '5%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        let counter = 0;
                        return products && products.map((product) => (
                            !product.deleted && (
                                <tr key={product.id}>
                                <td>{++counter}</td>
                                <td>{product.csw_products}</td>
                                <td><img src={product.photo} alt={product.csw_products} className="photo" /></td>
                                <td>{product.createdAt}</td>
                                <td>{product.type}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
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
        <div className="right">
        <div className="top">
        </div>
        </div>
    </div>
    <Script />
    </div>
  )
}

export default Em_Products