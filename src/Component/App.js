import React, { Component } from 'react';
import './App.css';
import myComponent from './weatherComponent.js';
import hourlyComponent from './hourlyComponent.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
      <div className = 'App'>
        <nav>
          <ul >
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/forecast">Forecast</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          {[0,1,2,3,4].map((num)=>{
            return  <Route exact path={"/daily"+ num}>
                      {hourlyComponent}
                    </Route>
            })
          }
          <Route exact path="/forecast" name = 'Forecast Page'>
            {myComponent}
          </Route>
          <Route exact path="/" name = 'Home'>
            {WeatherPage}
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

function WeatherPage(){
  return (
    <div>
      <p>Welcome to Denver's weather homepage</p>
    </div>
  );
}

export default App;