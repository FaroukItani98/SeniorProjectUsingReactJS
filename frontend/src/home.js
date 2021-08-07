import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Slideshow from './slider';

function Home(){

    useEffect(() => {
    const getAPI2 = () => {
        const API = 'http://127.0.0.1:5000/sale';
        fetch(API)
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

    return (
        <div className="home">
            <Slideshow />
            <div className="deals-container">
                <br></br>
                <p className="category-name">On Sale</p>
                <br></br>
                    {apiData2.map(product => {
                    return(
                        <a href={`/product/${product.id}`}>
                        <div className="deals-item">
                        <abbr title={product.name}>
                            <p className="sale">{product.discount}% Off</p>
                            <br></br>
                            <img src={`/images/${product.id}/${product.id}.jpg`} className="category-product-image"></img>
                            <br></br><br></br>
                            <p className="name">{product.name}</p>
                            <div className="prices">
                                <p className="actual_price"><strike>${product.price}</strike></p>
                                <p className="discount_price"><i className="il uil-angle-right"></i></p>   
                                <p className="discount_price">${product.price_after_sale}</p>         
                            </div>
                            </abbr>
                        </div>
                        </a>
                    )})}
            </div>
        </div>
    );
}

export default Home;
