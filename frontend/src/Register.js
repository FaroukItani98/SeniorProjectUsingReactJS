import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { form } from 'react-advanced-form';
import { Input } from 'react-advanced-form-addons';
import { useHistory } from 'react-router-dom';


function Register(){

    useEffect(() => {
        const getAPI = () => {
    
            const API = 'http://127.0.0.1:5000/';
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
    }, []);
    const [apiData, setApiData] = useState([]);


    return(
        
        <div  id="register">
            <br/>
            <div width="100%">
                <div  className="register-table center-deals">
                    <h4 style={{fontFamily:"inherit"}}>Register</h4>
                    <br></br>

                    <form method="post" action="http://127.0.0.1:5000/register">
                    <table align="center">
                        <tr>
                            <td><input type="text" name="first_name" placeholder="First Name" required></input></td>
                        </tr>
                        <tr>
                            <td><input type="text" name="last_name" placeholder="Last Name" required></input></td>
                        </tr>
                        <tr>
                            <td><input type="email" name="email" placeholder="Email Address" required></input></td>
                        </tr>
                        <tr>
                            <td>
                                <select className="custom-select" id="cities" name="region">
                                    <option value="" disabled selected>Select Region</option>
                                    <option value="Tripoli">Tripoli</option>
                                    <option value="Beirut">Beirut</option>
                                    <option value="Sidon">Sidon</option>
                                    <option value="Tyre">Tyre</option>
                                    <option value="Jo??ni??">Jo??ni??</option>
                                    <option value="Zahl??">Zahl??</option>
                                    <option value="Nabat??y??">Nabat??y??</option>
                                    <option value="Baalbek">Baalbek</option>
                                    <option value="Amio??n">Amio??n</option>
                                    <option value="Baabda">Baabda</option>
                                    <option value="Marjayo??n">Marjayo??n</option>
                                    <option value="JM">Jdaidet el Matn</option>
                                    <option value="Zghart??">Zghart??</option>
                                    <option value="Aaley">Aaley</option>
                                    <option value="Jba??l">Jba??l</option>
                                    <option value="SD">S??r ed Danniy??</option>
                                    <option value="Halba">NabaHalbat??y??</option>
                                    <option value="BJ">Bent Jba??l</option>
                                    <option value="Jezz??ne">Jezz??ne</option>
                                    <option value="Batro??n">Batro??n</option>
                                    <option value="H??sba??ya">H??sba??ya</option>
                                    <option value="JJ">Joubb Jann??ne</option>
                                    <option value="BD">Be??t ed D??ne</option>
                                    <option value="Hermel">El Hermel</option>
                                    <option value="RO">R??cha??ya el Ouadi</option>
                                    <option value="Bcharr??">Bcharr??</option>
                                </select> 
                            </td>
                        </tr>
                        <tr>
                            <td><input name="password" type="password" placeholder="Password" required></input></td>
                        </tr>
                        <tr>
                            <td><input type="password" name="cpassword" placeholder="Confirm Password" required></input></td>
                        </tr>
                        <tr>
                            <td><button type="submit" target="_self" className="register-button">Create Account</button></td>
                        </tr>
                    </table>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Register;