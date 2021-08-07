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
                                    <option value="Joünié">Joünié</option>
                                    <option value="Zahlé">Zahlé</option>
                                    <option value="Nabatîyé">Nabatîyé</option>
                                    <option value="Baalbek">Baalbek</option>
                                    <option value="Amioûn">Amioûn</option>
                                    <option value="Baabda">Baabda</option>
                                    <option value="Marjayoûn">Marjayoûn</option>
                                    <option value="JM">Jdaidet el Matn</option>
                                    <option value="Zghartā">Zghartā</option>
                                    <option value="Aaley">Aaley</option>
                                    <option value="Jbaïl">Jbaïl</option>
                                    <option value="SD">Sîr ed Danniyé</option>
                                    <option value="Halba">NabaHalbatîyé</option>
                                    <option value="BJ">Bent Jbaïl</option>
                                    <option value="Jezzîne">Jezzîne</option>
                                    <option value="Batroûn">Batroûn</option>
                                    <option value="Hâsbaïya">Hâsbaïya</option>
                                    <option value="JJ">Joubb Jannîne</option>
                                    <option value="BD">Beït ed Dîne</option>
                                    <option value="Hermel">El Hermel</option>
                                    <option value="RO">Râchaïya el Ouadi</option>
                                    <option value="Bcharré">Bcharré</option>
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