import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import React,{useState,useEffect,useEffect2} from 'react';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';

function Categories() {

    useEffect(() => { 
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
    }, []);

    const [apiData2, setApiData2] = useState([]);

return (
    <div>
            <table className="login-table" align="center" cellpadding="5">
                <tr>
                    <td colspan="2" align="center">
                        <img src={"/images/logo.svg"} width="75%"></img>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <h4 className="title">CATEGORIES</h4>
                    </td>
                </tr>
            </table>

            <table className="login-table" align="center" cellpadding="5">
            {apiData2.map(category => {
            return(
                <tr>
                    <td align="center">
                        <a className="categories"  href={`/category/${category.id}`}>{category.name}</a>
                    </td>
                </tr>
            )})}
            </table>


            <table className="login-table" align="center" cellpadding="5">
                <tr>
                    <td colspan="2" align="center">
                        <Link to="/" className="login-button" type="submit" style={{color:"white",textDecoration:"none"}} name="logout">Logout</Link>
                    </td>
                </tr>
            </table>
            <br></br><br></br><br></br>
                <p align="center" className="title">Add new category</p>
                <form method="post" action = "http://127.0.0.1:5000/addcategory">
                    <table cellpadding="10" align="center">
                        <tr>
                            <td>
                                Category Name
                            </td>
                            <td>
                                <input type="text" name="name"></input>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="right">
                                <input type="submit" name="add" value="Add Category"></input>
                            </td>
                        </tr>
                    </table>
                </form>
    </div>
  );
}
export default Categories;
