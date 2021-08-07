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

function Login() {

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
                        <h4 className="title">HOME</h4>
                    </td>
                </tr>
                <tr>
                    <td align="center"><a className="categories" href="/categories">VIEW CATEGORIES</a></td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <Link to="/" className="login-button" type="submit" style={{color:"white",textDecoration:"none"}} name="logout">Logout</Link>
                    </td>
                </tr>
            </table>
    </div>
  );
}
export default Login;
