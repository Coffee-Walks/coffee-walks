import React from 'react';
import ReactDOM from 'react-dom';
import Qs from 'qs';
import axios from "axios";
import MyWalks from "./MyWalks.js";
import MapContainer from './MapContainer.js';
import Directions from './Directions.js';
import Header from "./Header.js";
import Home from "./Home.js";
import Login from "./Login.js";
import SavedWalks from "./SavedWalks.js"
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/fontawesome-free-solid';
// import brands from '@fortawesome/fontawesome-free-brands'

import {
   BrowserRouter as Router,
   Route,
   Link
} from "react-router-dom";

class App extends React.Component {
   constructor() {
      super();
      this.state = {
         loggedIn: false,
         user: null
      };
      this.loggedInCheck = this.loggedInCheck.bind(this);
   }

   loggedInCheck(res) {
      console.log("res", res);
      if (res) {
         this.setState({
         loggedIn: true,
         user: res
         });
      } else {
         this.setState({
         loggedIn: false,
         user: {}
         });
      }
   }

  render() {
      return (
         <Router>
            <div>
               <header>
                  <Header />
               </header>
               {this.state.loggedIn ? (
                  <div className="wrapper logins">
                     <Login loggedInCheck={this.loggedInCheck} loggedIn={this.state.loggedIn} user={this.state.user} />
                     <Link className="lrgButton" to="/Home">Make a Walk!</Link>
                     <Route path="/Home" exact component={Home} />
                     <Link className="lrgButton" to="/SavedWalks">Saved Walks</Link>
                     <Route path="/SavedWalks" exact component={SavedWalks} />
                     <Route user={this.state.user} path="/Directions" exact component={Directions} />
                     <Link className="lrgButton" to="/PublicWalks">Public Walks</Link>
                  </div>
               ) : (
                  <div>
                     <Login loggedInCheck={this.loggedInCheck} loggedIn={this.state.loggedIn} user={this.state.user} />
                     <Link className="lrgButton" to="/PublicWalks">Public Walks</Link>
                  </div>
               )}
            </div>
         </Router>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('app'));