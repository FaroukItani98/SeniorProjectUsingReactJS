import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Product(){

    var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    var segment_array = segment_str.split( '/' );
    var last_segment = segment_array.pop();
    console.log(last_segment);

    useEffect(() => {
        const getAPI = () => {
            const API = `http://127.0.0.1:5000/product/${last_segment}`;
            fetch(API)
                .then((response) => {
                    if(response){
                        console.log(response);
                        return response.json();
                    }
                    
                })
                .then((data) => {
                    console.log(data);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);

    const [apiData, setApiData] = useState([]);


    const[fname,setFname] = useState(false);
    const[brand,setBrand] = useState(false);
    const[lname,setLname] = useState(false);
    const[email,setEmail] = useState(false);
    const[region,setRegion] = useState(false);
    const[password,setPassword] = useState(false);
    const[save,setSave] = useState(false);


    const enableFname = () => {
        setFname(!fname);
        setSave(true);
    }
    const enableLname = () => {
        setLname(!lname);
        setSave(true);
    }
    const enableEmail = () => {
        setEmail(!email);
        setSave(true);
    }
    const enableRegion = () => {
        setRegion(!region);
        setSave(true);
    }

    const enablePassword = () => {
        setPassword(!password);
        setSave(true);
    }

    const enableBrand = () => {
        setBrand(!password);
        setSave(true);
    }



    return(
        
        <div id="register">
            <br></br><br></br>
            {apiData.map(product => {
                {console.log(product.name)}
                return(
                <div  className="profile-table">
                    <form method="post" action={`http://127.0.0.1:5000/updateproduct/${last_segment}`}>
                        <p className="productname">{product.name}</p>
                        <br></br>
                        <label className="profile-item">Name</label><input disabled={fname?"":"disabled"} className="profile-input" autocomplete type = "text" placeholder={product.name} name="name" ></input><a onClick={enableFname} className="editbutton"><i className={fname?"uil uil-multiply":"uil uil-edit"}></i></a>
                        <br></br><br></br>
                        <label className="profile-item">Brand</label><input disabled={brand?"":"disabled"} className="profile-input" autocomplete type = "text" placeholder={product.Brand} name="brand" ></input><a onClick={enableFname} className="editbutton"><i className={brand?"uil uil-multiply":"uil uil-edit"}></i></a>
                        <br></br><br></br>
                        <label className="profile-item">Descr</label><input disabled={lname?"":"disabled"} className="profile-input" autocomplete type = "text" placeholder={product.description} name="description"></input><a onClick={enableLname} className="editbutton"><i className={lname?"uil uil-multiply":"uil uil-edit"}></i></a>
                        <br></br><br></br>
                        <label className="profile-item">Price</label><input  type = "text" disabled={email?"":"disabled"} autocomplete className="profile-input" placeholder={product.price} name="price"></input><a onClick={enableEmail} className="editbutton"><i className={email?"uil uil-multiply":"uil uil-edit"}></i></a>
                        <br></br><br></br>
                        <label className="profile-item">Discount %</label>
                        <input  type = "text" disabled={region?"":"disabled"} autocomplete className="profile-input" placeholder={product.discount} name="discount"></input>
                        <a onClick={enableRegion} className="editbutton"><i className={region?"uil uil-multiply":"uil uil-edit"}></i></a>
                        <br></br><br></br>
                        <label className="profile-item">To change your password, contact Customer Service.</label>
                        <br></br><br></br>
                        <button type="submit" className={save?"savechanges":"hide-save"}>Save Changes</button></form>
                    <br></br><br></br>
                    <br></br><br></br><br></br>
                </div>
            )})}
        </div>
    );
}

export default Product;