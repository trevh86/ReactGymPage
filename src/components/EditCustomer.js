import React, { Component } from "react";
import SkyLight from "react-skylight";

class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.customer.firstname,
      lastname: this.props.customer.lastname,
      streetaddress: this.props.customer.streetaddress,
      postcode: this.props.customer.postcode,
      city: this.props.customer.city,
      email: this.props.customer.email,
      phone: this.props.customer.phone
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const editedCustomer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.updateCustomer(this.props.link, editedCustomer);
    this.simpleDialog.hide();
    document.getElementById("activityForm").reset();
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-link"
          onClick={() => this.simpleDialog.show()}
        >
          Edit
        </button>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Edit"
        >
          <form id="activityForm">
            <div className="form-group">
              <input
                placeholder="firstname"
                type="text"
                value={this.state.firstname}
                className="form-control"
                name="firstname"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="lastname"
                type="text"
                value={this.state.lastname}
                className="form-control"
                name="lastname"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="streetaddress"
                type="text"
                value={this.state.streetaddress}
                className="form-control"
                name="streetaddress"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="postcode"
                type="text"
                value={this.state.postcode}
                className="form-control"
                name="postcode"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="city"
                type="text"
                value={this.state.city}
                className="form-control"
                name="city"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="email"
                type="text"
                value={this.state.email}
                className="form-control"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="phone"
                type="text"
                value={this.state.phone}
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

export default EditActivity;
