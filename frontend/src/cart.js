import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';




function Cart(){

    useEffect(() => {
        const getAPI = () => {
            const API = 'http://127.0.0.1:5000/cart';
            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    if(data.length == 0){
                        checkCart(true);
                    }
                    console.log(data);
                    setApiData(data);
                });
        };
        getAPI();
        const getAPI2 = () => {
            const API2 = 'http://127.0.0.1:5000/cartsum';
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
    const [apiData3, setApiData3] = useState([]);

    const [cart,checkCart] = useState(false);

    const [item,checkItem] = useState(false);

    const fillCart = () => {
        checkCart(!cart);
    }

    return(
        <div className="App">
            <br></br><br></br><br></br><br></br><br></br>
            <div className={cart?"no-cart center-images":"no-cart-hide"}>
                <i className="bi bi-cart-x cart-icon"></i>
                <p style={{fontSize:"28px"}}>Your cart is empty</p>
                <br/><br/><br/>
                <Link to="/"><button className="explore-button">Back to Homepage</button></Link>
                <br/><br/><br/>
                
            </div>
            <div className={cart?"items-in-cart-hide":"items-in-cart"}>
            {apiData.map(cart => {
                return(
                    <div>
                    <table border="0" className={item?"hide-item":"item-in-cart"}>
                        <tr>
                        
                            <td width="2%"><img src={`/images/${cart.id}/${cart.id}.jpg`} width="75px"></img></td>
                            <td width="50%" style={{textAlign:"left"}}><a href={`/product/${cart.id}`} style={{textAlign:"left"}} className="item-cart-name" style={{overflow: "hidden",whiteSpace: "nowrap",textOverflow: "ellipsis"}}>{cart.name}</a></td>
                            <td>
                                <p className="item-cart-price">${cart.price_after_sale}</p>         
                            </td>
                            <td width="100px"><form method="post" action={`http://127.0.0.1:5000/removefromcart/${cart.orderid}`}><button type="submit" className="item-cart-trash"><i className="bi bi-trash"></i></button></form></td>
                        </tr>
                    </table>
                    </div>)})}
                    {/* <table border="0" className={item?"hide-item":"item-in-cart"}>
                        <tr>
                            <td width="2%"><img src={"images/ps5_item.jpg"} width="75px"></img></td>
                            <td width="50%"><h5 className="item-cart-name">PlayStation 5</h5></td>
                            <td>
                                <h5 className="item-cart-price">$99.99</h5>         
                            </td>
                            <td width="100px"><button onClick={removeItem} className="item-cart-trash"><i className="bi bi-trash"></i></button></td>
                        </tr>
                    </table> */}
            </div>
            <div className={cart?"items-in-cart-hide":"checkout"}>
            
                    <div>
                        <table border="0" className="checkout-info">
                            <tr>
                                <td><p className="checkout">Checkout</p></td>
                            </tr>
                            <tr>
                                <td><p className="item-cart-name" style={{color:"black",fontWeight:"400"}}>By checking out you agree that the items you purchase cannot be returned.</p></td>
                            </tr>
                            <tr>
                                <td><h2 className="item-cart-name" style={{color:"black"}}>Total Price</h2></td>
                            </tr>
                            <tr>
                                <td>
                                    {apiData2.map(cartsum => {
                                    return(
                                        <p className="total-price">${cartsum.sum}</p>
                                    )})}
                                </td>   
                            </tr>
                            <tr>
                                <td><form method="post" action={`http://127.0.0.1:5000/addtohistory`}><button className="checkout-button">Confirm Order & Checkout</button></form></td>
                            </tr>
                        </table>
                    </div>
            </div>
        </div>

    );
}


export default Cart;