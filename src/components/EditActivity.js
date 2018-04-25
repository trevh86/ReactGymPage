import React, { Component } from "react";
import SkyLight from "react-skylight";

class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.activity._original.date,
      duration: this.props.activity._original.duration,
      activity: this.props.activity._original.activity
      // customer: {...this.props.activity._original.customer},
      // customerLink: "https://customerrest.herokuapp.com/api/customers/" + this.props.activity._original.customer.id,
      // customers: []
    };
  }

  // async componentDidMount() {
  //   this.loadCustomers();
  // }
  //
  // loadCustomers = () => {
  //   fetch("https://customerrest.herokuapp.com/api/customers")
  //     .then(res => res.json())
  //     .then(resData => {
  //       this.setState({ customers: resData.content });
  //     })
  //     .then(() => this.setState({customer: "http://localhost:3000/api/customers/2"}))
  // };

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
      activity: this.state.activity
      // customer: this.state.customer
    };
    this.props.updateActivity(this.props.link, newActivity);
    this.simpleDialog.hide();
    document.getElementById("activityForm").reset();
    // this.setState({date: '', duration: '', activity: '', customer: this.state.customers[0].links[0].href})
  };

  render() {
    // const customerList = this.state.customers.map((item, index) => {
    //   return (
    //   <option key={index} value={this.state.customer}>{`${item.firstname} ${item.lastname}`}</option>
    //   )
    // });
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
                placeholder="date"
                type="text"
                value={this.state.date}
                className="form-control"
                name="date"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="duration"
                type="text"
                value={this.state.duration}
                className="form-control"
                name="duration"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="activity"
                type="text"
                value={this.state.activity}
                className="form-control"
                name="activity"
                onChange={this.handleChange}
              />
            </div>
            {/*<div className="form-group">*/}
            {/*<select name="customer" onChange={this.handleChange}>*/}
            {/*{customerList}*/}
            {/*</select>*/}
            {/*</div>*/}
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
