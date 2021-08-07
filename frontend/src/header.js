import './App.css';
import React,{useState,useEffect,useEffect2} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { HashLink as HLink } from 'react-router-hash-link';

function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
  
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
  
    return [storedValue, setValue];
  }
function Header() {

  var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
  var segment_array = segment_str.split( '/' );
  var last_segment = segment_array.pop();
  console.log(last_segment);
 
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
                if (data.length == 0){
                    console.log("test");
                    setLogin(true);
                }
                else{
                console.log("it worked");
                setApiData(data);
                }
            });
    };
    getAPI();

    const getAPI2 = () => {
        const API2 = 'http://127.0.0.1:5000/test';
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

    const getAPI3 = () => {
      const API3 = 'http://127.0.0.1:5000/countcartitems';
      fetch(API3)
          .then((response) => {
              console.log(response);
              return response.json();
          })
          .then((data) => {
              console.log(data);
              setApiData3(data);
          });
  };
  getAPI3();
}, []);
const [apiData, setApiData] = useState([]);
const [apiData2, setApiData2] = useState([]);
const [apiData3, setApiData3] = useState([]);

    // states for showing/ hiding dropdown
const [dropdown, showDropDown] = useState(false);
const [arrow, rotateArrow] = useState(false);

    // states for showing/ hiding searchbar
const [searchbutton, showSearchButton] = useState(false);
const [searchbuttontox, showX] = useState(false);

    // state for overlay
const [overlay,showOverlay] = useState(false);

const [loginoverlay,showLoginOverlay] = useState(false);

const [login,showLogin] = useState(false);

const displayLogin = () => {
  showLogin(!login);
}


const displayDropdown = () => {
    rotateArrow(!arrow);
    showDropDown(!dropdown);
}

let [isLoggedIn, setLogin] = useLocalStorage("isLoggedIn",true);

const isLI = () =>{
  setLogin(!isLoggedIn);
}


const [sidebar,openSideNav] = useState(false);

const openNav = () => {
    openSideNav(!sidebar);
    showOverlay(!overlay);
}

return (
    <div className="App">
        <div className="sidenav" style={{ left: sidebar ? "0%" : "-100%" }}>
        <div className="search-container-mobile">
              <form method="get" action={`/search/`}>
                <input className="search-input" type="text" name="result" placeholder="Search"></input>
                <button type="submit"  className="search-button"><i className="il uil-search"></i></button>
              </form>
          </div>
          <div>
            <p className="sidebar-categories">Categories</p>
          </div>
        {apiData2.map(category => {
            return(
                <div>
                    <a className="sidebar-links" href={`/category/${category.id}`}>
                        {category.name}
                    </a>
                </div>
            )})}
            <a href="javascript:void(0)" class="closebtn" onClick={openNav}><i className="uil uil-times"></i></a>
        </div>
      <button onClick={openNav} className="bars-button" style={{float:"left",fontSize:"20px",color:"#black"}}><i className="uil uil-bars"></i></button>
        <ul className="topnav">
            <li className="topnav-item" style={{width:"fit-content", float:"left"}}><a href="\" ><img src={"/images/logoalt.svg"} className="logo" width="180px"></img></a></li>
            <li><a href="/support" className="go-to-cart" style={{marginRight:"100px"}}><img src={"/images/icons/help-circle-outline.svg"} className="topnav-i" style={{marginRight:"10px"}}></img>Help</a></li>
            
            <li><button onClick={displayLogin} className="account"><img src={"/images/icons/person-outline.svg"} className="topnav-i" style={{marginRight:"10px"}}></img>{isLoggedIn ? "Sign In" : "Profile"}</button></li>
            <div className={login ? "signin wipe-in-down" : "hidesignin"}>
                <form method="post" action="http://127.0.0.1:5000/header">
                    <table align="center" className={isLoggedIn ? "showLogin":"hideLogin"}>
                        <tr>
                            <td><p className="signin-label">Sign in</p></td>
                        </tr>
                        <tr>
                            <td><input type="email" name="email" className="sign-in-input" placeholder="Email Address"></input></td>
                        </tr>
                        <tr>
                            <td><input type="password" name="password" className="sign-in-input" placeholder="Password"></input></td>
                        </tr>
                        <tr>
                            <td><HLink to="/support#nologin"><button className="forget">Forgot email or password</button></HLink></td>
                        </tr>
                        <tr>
                            <td><input onClick={isLI} type="submit" className="sign-in-submit" value="Sign In"></input></td>
                        </tr>
                        
                        <tr>
                            <td><HLink to="/register#register"><button className="register">Create New Account</button></HLink></td>
                        </tr>
                    </table>
                </form>
                <form method="post" action="http://127.0.0.1:5000/logout">
                    <table align="center" className={isLoggedIn ? "hideProfile":"showProfile"}>
                        <tr>
                            {apiData.map(user => {
                                return(
                                    <td><p className="signin-label">{user.first_name} {user.last_name}</p></td>
                            )})}
                        </tr>
                        <tr>
                            <td><Link to="/profile"><button className="register">View Profile</button></Link></td>
                        </tr>
                        <tr>
                            <td><button onClick={isLI} type="submit" className="sign-in-submit">Logout</button></td>
                        </tr>
                    </table>
                </form>   
            </div>
            {apiData3.map(count => {
            return(
              <li><a href="/cart" className="go-to-cart"><img src={"/images/icons/cart-outline.svg"} className="topnav-i"  style={{marginRight:"10px"}}></img>{count.count}</a></li>
            )})}
            <div className="search-container">
              <form method="get" action={`/search/`}>
                <input className="search-input" type="text" name="result" placeholder="Search"></input>
                <button type="submit"  className="search-button"><img src={"/images/icons/search-outline.svg"} className="topnav-i"  style={{marginTop:"-3px",width:"18px"}}></img></button>
              </form>
          </div>
        </ul>
        <div className="categories-sidenav" style={{width:"10%",backgroundColor:"white", marginTop:"-80px",fontFamily:"inherit",position:"absolute"}}>
        {apiData2.map(category => {
            return(
              <a href={`/category/${category.id}`}><i className="uil uil-angle-right-b" style={{marginRight:"5px"}} />{category.name}</a>
            )})}
      </div>
      <div className={overlay ? "overlay" : ""}></div>
      <div className={loginoverlay ? "overlay" : ""}>
        
        <div className={loginoverlay ? "login-form" : "hide-login-form"}>
              <h4 style={{fontFamily:"inherit",margin:"30px"}}>Sign in to your account</h4>
              <form method="post" action="http://127.0.0.1:5000/header">
                <input type="email" className="email" name="email" placeholder="Email Address" required></input>
                <input type="password" className="email" name="password" placeholder="Password" required></input>
                <input type="submit" onClick={setLogin} className="submit" value="Sign In" name="submit"></input>
                <p style={{ marginTop:"30px"}}>Having Issues? <a href="/support" className="register">Contact Customer Service</a></p>
                <p style={{ marginTop:"10px"}}>Don't have an account? <a href="/register" className="register">Create one</a></p>
              </form>
        </div>
      </div>
      
    </div>
  );
}

export default Header;
