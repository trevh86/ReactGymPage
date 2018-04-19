import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import Trainers from "./components/Trainers";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Trainer Town!</h1>
        </header>
        <BrowserRouter>
          <div>
            <Link to="/">Home</Link> <Link to="/customers">Customers</Link>{" "}
            <Link to="/trainers">Trainers</Link>{" "}
            <Switch>
              <Route exact path="/" render={() => <h2>This is the Home page</h2>} />
              <Route exact path="/trainers" component={Trainers} />
              <Route exact path="/customers" component={CustomerList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
