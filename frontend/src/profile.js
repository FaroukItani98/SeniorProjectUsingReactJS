import './App.css';
import React,{useState,useEffect,useCallback} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { form } from 'react-advanced-form';
// import { Input } from 'react-advanced-form-addons';
import { useHistory } from 'react-router-dom';


function Profile(){

    useEffect(() => {
        const getAPI = () => {
            const API = 'http://127.0.0.1:5000/random';
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

        const getAPI2 = () => {
            const API2 = 'http://127.0.0.1:5000/history';
            fetch(API2)
                .then((response) => {
                    if(response){
                        console.log(response);
                        return response.json();
                    }
                    
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


    const[fname,setFname] = useState(false);
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



    return(
        
        <div id="register">
            <br></br><br></br>
            {apiData.map(user => {
                return(
                <div  className="profile-table">
                    <form method="post" action="http://127.0.0.1:5000/updateuser">
                        <p className="username">{user.first_name}'s Profile</p>
                        <br></br>
                        <label className="profile-item">First Name</label><input disabled={fname?"":"disabled"} className="profile-input" autocomplete type = "text" placeholder={user.first_name} name="fname" ></input><a onClick={enableFname} className="editbutton">Edit</a>
                        <br></br><br></br>
                        <label className="profile-item">Last Name</label><input disabled={lname?"":"disabled"} className="profile-input" autocomplete type = "text" placeholder={user.last_name} name="lname"></input><a onClick={enableLname} className="editbutton">Edit</a>
                        <br></br><br></br>
                        <label className="profile-item">Email</label><input  type = "email" disabled={email?"":"disabled"} autocomplete className="profile-input" placeholder={user.email} name="email"></input><a onClick={enableEmail} className="editbutton">Edit</a>
                        <br></br><br></br>
                        <label className="profile-item">Region</label><select disabled={region?"":"disabled"} className="profile-input" id="cities" name="region">
                                        <option value="" disabled selected>{user.region}</option>
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
                        <a onClick={enableRegion} className="editbutton">Edit</a>
                        <br></br><br></br>
                        <label className="profile-item">To change your password, contact Customer Service.</label>
                        <br></br><br></br>
                        <button type="submit" className={save?"savechanges":"hide-save"}>Save Changes</button></form>
                    <br></br><br></br>
                    <br></br><br></br><br></br>
                    <p style={{textAlign:"left"}}><strong>Order History</strong></p>
                </div>
            )})}
            
            <div>
            
            
                <div className="my-orders-table">
                {apiData2.map(item => {
                return(
                    <table border="0" className="item-in-cart">
                        <tr>
                            <td width="2%"><img src={`/images/${item.id}/${item.id}.jpg`} width="75px"></img></td>
                            <td width="50%" style={{textAlign:"left"}}><a href={`/product/${item.id}`} style={{textAlign:"left"}} className="item-cart-name" style={{overflow: "hidden",whiteSpace: "nowrap",textOverflow: "ellipsis"}}>{item.name}</a></td>
                            <td>
                                <p className="item-cart-price" style={{textAlign:"right",marginRight:"20px"}}>${item.price}</p>         
                            </td>
                        </tr>
                    </table>
                    )})}
                </div>
            
            </div>
        </div>

    );
}

export default Profile;