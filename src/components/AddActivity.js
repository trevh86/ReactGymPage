import React, { Component } from "react";
import SkyLight from "react-skylight";

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      duration: "",
      activity: "",
      customer: "",
      customers: []
    };
  }

  async componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(res => res.json())
      .then(resData => {
        this.setState({ customers: resData.content });
      })
      .then(() =>
        this.setState({ customer: this.state.customers[0].links[0].href })
      );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newActivity = {
      date: this.state.date,
      duration: this.state.duration,
      activity: this.state.activity,
      customer: this.state.customer
    };
    this.props.addActivity(newActivity);
    this.simpleDialog.hide();
    document.getElementById("activityForm").reset();
    this.setState({
      date: "",
      duration: "",
      activity: "",
      customer: this.state.customers[0].links[0].href
    });
  };

  render() {
    const customerList = this.state.customers.map((item, index) => {
      return (
        <option key={index} value={item.links[0].href}>{`${item.firstname} ${
          item.lastname
        }`}</option>
      );
    });
    return (
      <div>
        <button
          style={{ margin: 10 }}
          className="btn btn-primary"
          onClick={() => this.simpleDialog.show()}
        >
          Add Activity
        </button>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Add Activity"
        >
          <form id="activityForm">
            <div className="form-group">
              <input
                placeholder="date"
                type="text"
                className="form-control"
                name="date"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="duration"
                type="text"
                className="form-control"
                name="duration"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="activity"
                type="text"
                className="form-control"
                name="activity"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <select name="customer" onChange={this.handleChange}>
                {customerList}
              </select>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Save
            </button>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddActivity;
