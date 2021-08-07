import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Product(){

    const [like, countLike] = useState(0);
    const [dislike, countDislike] = useState(0);
    const [enableLike, isLike] = useState(false);
    const [enableDislike, isDislike] = useState(false);
    

    const [quantity,setQuantity] = useState(1);
    const [price,setPrice] = useState(69);
    
    const incQuantity = () => {
        setQuantity(quantity+1);
        setPrice(price+69);
    }

    const decQuantity = () => {
        if(quantity>1){
            setQuantity(quantity-1);
            setPrice(price-69);
        }
    }

    const isLiked = () => {
        isLike(!enableLike);
    }
    const isDisliked = () => {
        isDislike(!enableDislike);
    }

    const getAPI2 = () => {
        const API2 = `http://127.0.0.1:5000/product1/${last_segment}`;
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
    

    const incLike = (id,whatvalue,newvalue) => {

        var index = apiData2.findIndex(x=> x.id === id);

        let g = apiData2[index];
        

        if(enableDislike==true){
            isDislike(false);
            isLike(true);
            g[whatvalue] = newvalue;
            getAPI2();
            
        }
        else if(enableLike==false){
            isLike(true);
            g[whatvalue] = newvalue;
            getAPI2();
            
        }
        
    }
    const incDislike = (id,whatvalue,newvalue) => {
        console.log('REEEEEEEE');

        if(enableLike==true){
            isLike(false);
            isDislike(true);
            // i.numlikes=i.numlikes-1;
            // i.numdislikes=i.numdislikes+1;

        }
        else if(enableDislike==false){
            isDislike(true);
            // i.numdislikes=i.numdislikes+1;
            
        }
            
        
    }

    var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    var segment_array = segment_str.split( '/' );
    var last_segment = segment_array.pop();
    console.log(last_segment);

    useEffect(() => {

        const getAPI = () => {
            const API = `http://127.0.0.1:5000/product/${last_segment}`;
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

        // to get num of likes and dislikes + update them

}, []);

    const [apiData, setApiData] = useState([]);
    const [apiData2, setApiData2] = useState([]);

    return(
        <div className="product-page">
             {apiData.map(product => {
            return(
                <div>
                    <div className="custom-left">
                        <a href={`/images/${product.id}/${product.id}_main.jpg`} target="_blank"><img src={`/images/${product.id}/${product.id}_main.jpg`} className="custom-images"></img></a>
                        <div className="img-container">
                            <a href={`/images/${product.id}/${product.id}_1.jpg`} target="_blank"><img src={`/images/${product.id}/${product.id}_1.jpg`} className="images-div"></img></a>
                            <a href={`/images/${product.id}/${product.id}_2.jpg`} target="_blank"><img src={`/images/${product.id}/${product.id}_2.jpg`} className="images-div"></img></a>
                            <a href={`/images/${product.id}/${product.id}_3.jpg`} target="_blank"><img src={`/images/${product.id}/${product.id}_3.jpg`} className="images-div"></img></a>
                        </div>
                    </div>
                    <div className="custom-right">
                        <p style={{fontSize:"30px",fontWeight:"500"}}>{product.name}</p>
                        <p className="product-description"><strong>Brand:   </strong>{product.Brand}</p>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price"><p className="price-label">Price:</p><p className="price-value">${product.price_after_sale}</p></p>
                        <br></br>
                        <form method="post" action={`http://127.0.0.1:5000/product/${last_segment}`}>
                            <button type="submit" className="cartbutton">Add to Cart</button>
                        </form>
                        <br/><br/>
                        <div className="buttons">
                            <label>Reviews</label><br/>
                            <form method="post" action={`http://127.0.0.1:5000/numlikes/${last_segment}`}><input name="numlikes" type="text" value={product.numlikes} readonly="readonly" className="buttonlabel"></input><button type="submit" className="likes"><i class="uil uil-heart"></i></button></form>
                        </div>
                    </div>
                </div>
                    )})}
        </div>
    );
}

export default Product;