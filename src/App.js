import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import BookedActivities from "./components/BookedActivities";
import Calendar from "./components/Calendar";

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
            <Link to="/activities">Booked Activities</Link>{" "}
            <Link to="/calendar">Calendar</Link>{" "}
            <Switch>
              <Route
                exact
                path="/"
                render={() => <h2>This is the Home page</h2>}
              />
              <Route exact path="/activities" component={BookedActivities} />
              <Route exact path="/customers" component={CustomerList} />
              <Route exact path="/calendar" component={Calendar} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
