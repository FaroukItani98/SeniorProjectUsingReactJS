import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";

function Search(){

    var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    var segment_array = segment_str.split( '/' );
    var last_segment = segment_array.pop();
    console.log(last_segment);
    const location = useLocation();
    console.log(location.search);
    var question = location.search;
    useEffect(() => {

        const getAPI2 = () => {
            const API2 = `http://127.0.0.1:5000/search/${question}`;
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

    const [apiData2, setApiData2] = useState([]);

    return(
        <div className="App">
            <div className="deals-container">
                <div><p className="category-name">Search Results</p></div>
                {apiData2.map(product => {
                    return(
                    <a href={`/product/${product.id}`}>
                    <div className="deals-item" key ={product.id}>
                    <abbr title={product.name}>
                        <img src={`/images/${product.id}/${product.id}.jpg`} className="category-product-image"></img>
                        <br></br><br></br>
                        <p className="name">{product.name}</p>
                        <p className="description">{product.description}</p>
                        <div className="prices">
                            <h5 className="discount_price">${product.price}</h5>  
                        </div>
                    </abbr>
                    </div>
                    </a>
                )})}
                
            </div>
            
        </div>

    );
}


export default Search;