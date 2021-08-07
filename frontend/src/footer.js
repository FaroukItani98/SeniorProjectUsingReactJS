import './App.css';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Footer() {

    useEffect(() => {
        const getAPI = () => {
            const API = 'http://127.0.0.1:5000/footer';
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

    const [email, setEmail] = useState('');

    const submitRequest = async (e) => {
        e.preventDefault();
        console.log({email});
        const response = await fetch("/access", { 
        method: 'POST', 
        headers: { 
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({email}) 
    }); 
        const resData = await response.json(); 
        if (resData.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
    }else if(resData.status === 'fail'){
        alert("Message failed to send.")
    }
    };


return (
    <div className="App">
      <Router>
        <table align="center" border="0"  className="footer" cellpadding="10">
            <tr className="footer-divs">
                <td className="footer-table">
                    <table cellpadding="2" width="100%">
                        <tr>
                            <td className="footer-section-title">
                                Categories
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>
                        {apiData.map(category => {
                            return(
                            <tr>
                                <td>
                                    <a href={`/category/${category.id}`} key ={category.id} className="footer-links">{category.name}</a>
                                </td>
                            </tr>
                        )})}
                    </table>
                </td>
                <td className="footer-table">
                    <table cellpadding="2" width="100%">
                        <tr>
                            <td className="footer-section-title">
                                Support
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link className="footer-links">Contact Us by Email  <i className="bi bi-box-arrow-up-right"></i></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="social-link">
                                <Link to="https://www.facebook.com/" className="footer-links"><i className="il uil-facebook-f social-link"></i></Link>
                                <Link to="https://www.instagram.com/" className="footer-links"><i className="il uil-instagram social-link"></i></Link>
                                <a href ="https://www.youtube.com/watch?v=ub82Xb1C8os" className="footer-links"><i className="il uil-youtube social-link"></i></a>
                            </td>
                        </tr>
                    </table>
                </td>
                <td className="footer-table-right">
                    <table cellpadding="2">
                        <tr>
                            <td className="footer-section-title">
                                Join the Newsletter
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td className="social-link">
                                <form method="post" action="http://127.0.0.1:5000/main">
                                    <input type="email" name="email" className="email" placeholder="Enter your email for the latest news"></input>
                                    <input type="submit"className="subscribe" value="Subscribe"></input>
                                </form>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td className="l" align="center" colspan="3">Designed & Developed by Farouk Itani and Ezzeddine Berjawi in 2021.</td>
            </tr>
        </table>
      </Router>
    </div>
  );
}

export default Footer;
