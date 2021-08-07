import './App.css';
import Login from './login';
import Home from './home';
import Categories from './categories';
import Category from './category';
import Product from './product';
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
          <Route path="/" exact component={Login}></Route>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/categories" exact component={Categories}></Route>
          <Route path="/category/:id" exact component={Category}></Route>
          <Route path="/product/:id" exact component={Product}></Route>
          {/* <Route path="/product/:id" exact component={Product}></Route> */}
        </div>
      </Switch>
    </Router>
  );
}
export default App;
