import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Category(){

    var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    var segment_array = segment_str.split( '/' );
    var last_segment = segment_array.pop();
    console.log(last_segment);

    useEffect(() => {

        const getAPI = () => {
            const API = `http://127.0.0.1:5000/category/${last_segment}`;
            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setApiData(data);
                });
        };
        getAPI();

        const getAPI2 = () => {
            const API2 = `http://127.0.0.1:5000/products/${last_segment}`;
            fetch(API2)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setApiData2(data);
                });
        };
        getAPI2();
    }, []);

    const [apiData, setApiData] = useState([]);
    const [apiData2, setApiData2] = useState([]);

    return(
        <div className="App">
            <div align="center">
            <br></br><br></br><br></br><br></br>
            {apiData.map(category => {
                    return(
                <div><p className="title">{category.name}</p></div>
                    )})}
                {apiData2.map(product => {
                    return(
                    <a href={`/product/${product.id}`}>
                    <div className="deals-item" key ={product.id}>
                    <form method="post" action={`http://127.0.0.1:5000/removeproduct/${product.id}`}><button type="submit" className="item-cart-trash"><i className="uil uil-trash"></i></button></form>
                    <br></br>
                        <p className="name">{product.name}</p>
                        <div className="prices">
                            <p className="discount_price">${product.price}</p>
                            <p className="discount_price">After discount: ${product.price_after_sale}</p>
                        </div>
                        
                    </div>
                    </a>
                )})}
            </div>
            <br></br><br></br><br></br><br></br>
            <div align="center">
                <p className="title">Add new product in this category</p>
                <form method="post" action = {`http://127.0.0.1:5000/addproduct/${last_segment}`}>
                    <table cellpadding="10">
                        <tr>
                            <td>
                                Product Name
                            </td>
                            <td>
                                <input type="text" name="name"></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Product Brand
                            </td>
                            <td>
                                <input type="text" name="brand"></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Product Price
                            </td>
                            <td>
                                <input type="number" min="0" name="price"></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Product Description
                            </td>
                            <td>
                                <textarea rows="7" cols="28" name="description"type="text" name="description"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Discount %
                            </td>
                            <td>
                                <input type="number" min="0" name="discount"></input>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="right">
                                <input type="submit" name="add" value="Add Product"></input>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>

    );
}


export default Category;