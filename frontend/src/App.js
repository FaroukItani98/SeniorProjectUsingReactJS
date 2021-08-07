import './App.css';
import Header from './header';
import Footer from './footer';
import Category from './category';
import Product from './Product'
import Cart from './cart'
import Home from './home';
import {Link} from 'react-router-dom';
import Register from './Register';
import Support from './support';
import Profile from './profile';
import Search from './search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import { Redirect } from "react-router-dom";

function App() {


return (
    <Router>
      <Switch>
    <div className="App">
      <Header />
      <Route path="/" exact component={Home}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/support" exact component={Support}></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="/profile" exact component={Profile}></Route>
      <Route path="/category/:id" exact component={Category}></Route>
      <Route path="/product/:id" exact component={Product}></Route>
      <Route path="/search/" exact component={Search}></Route>
      <Footer />
    </div>
      </Switch>
    </Router>
  );
}
export default App;
