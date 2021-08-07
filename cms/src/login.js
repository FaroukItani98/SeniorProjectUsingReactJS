import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import React,{useState,useEffect,useEffect2} from 'react';
import { useRedirect } from 'react-router';
import { Redirect } from "react-router-dom";
import Home from './home'

function Login() {

return (
    <div>
        <form method="post" action="http://127.0.0.1:5000/admin">
            <table className="login-table" align="center" cellpadding="5">
                <tr>
                    <td colspan="2" align="center">
                        <img src={"/images/logo.svg"} width="75%"></img>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <h4 className="title">CONTENT MANAGEMENT SYSTEM</h4>
                    </td>
                </tr>
                <tr align="center">
                    <td>
                        Username
                    </td>
                    <td>
                        <input type="text" name="username"></input>
                    </td>
                </tr>
                <tr align="center">
                    <td>
                        Password
                    </td>
                    <td>
                        <input type="password" name="password"></input>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <input className="login-button"  type="submit" name="login" value="Login"></input>
                    </td>
                </tr>
            </table>
        </form>
    </div>
  );
}
export default Login;
