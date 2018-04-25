import React, { Component } from "react";
import SkyLight from "react-skylight";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newCustomer = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      streetaddress: this.state.address,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.addCustomer(newCustomer);
    this.simpleDialog.hide();
  };

  render() {
    return (
      <div>
        <button
          style={{ margin: 10 }}
          className="btn btn-primary"
          onClick={() => this.simpleDialog.show()}
        >
          Add Customer
        </button>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Add Customer"
        >
          <form>
            <div className="form-group">
              <input
                placeholder="firstName"
                type="text"
                className="form-control"
                name="firstName"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="lastName"
                type="text"
                className="form-control"
                name="lastName"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="address"
                type="text"
                className="form-control"
                name="address"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="postcode"
                type="text"
                className="form-control"
                name="postcode"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="city"
                type="text"
                className="form-control"
                name="city"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="email"
                type="text"
                className="form-control"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="phone"
                type="text"
                className="form-control"
                name="phone"
                onChange={this.handleChange}
              />
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

export default AddCustomer;
