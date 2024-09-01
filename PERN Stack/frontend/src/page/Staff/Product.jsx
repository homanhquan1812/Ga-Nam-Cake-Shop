import { React, useState, useEffect } from 'react'
import Head from '../../component/Head'
import { Header2 } from '../../component/Header2'
import Script from '../../component/Script'
import axios from 'axios'
import Sidebar from '../../component/Sidebar'

const Product = () => {
    const [products, setProducts] = useState([])
    const [csw_products, setProducts2] = useState([])
    const [type, setType] = useState([])
    const [price, setPrice] = useState([])
    const [photo, setPhoto] = useState([])
    const [description, setDescription] = useState([])
    const [productID, setProductID] = useState([])

    const handleDeleteModalShow = (id) => {
        setProductID(id)
    };
    const handleDeleteProducts = async () => {
        try {
            await axios.delete(`http://localhost:5000/product/${productID}`);
        } catch (error) {
            console.error('Error deleting course:', error)
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
          await axios.post('http://localhost:5000/product', {
            product_name: csw_products,
            type,
            description,
            price,
            photo,
          })
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        const fetchProductsData = async () => {
          try {
            const response = await fetch('http://localhost:5000/product')
            const data = await response.json()
            setProducts(data.product)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }
    
        fetchProductsData()

    const intervalId = setInterval(() => {
        fetchProductsData()
    }, 2000);
  
    return () => clearInterval(intervalId);
      }, [])

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
                            <tr key={product.id}>
                                <td>{++counter}</td>
                                <td>{product.product_name}</td>
                                <td><img src={product.photo} alt={product.product_name} className="photo" /></td>
                                <td>{product.created_at}</td>
                                <td>{product.type}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-id={product.id} data-target="#delete-course-modal" onClick={() => handleDeleteModalShow(product.id)}>
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

export default Product