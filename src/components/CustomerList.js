import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(res => res.json())
      .then(resData => {
        this.setState({ customers: resData.content });
      });
  };

  render() {
    const data = this.state.customers;
    const columns = [{
      Header: "First Name", accessor: "firstname", filterable: true
    },{
      Header: "Last Name", accessor: "lastname", filterable: true
    },{
      Header: "Address", accessor: "streetaddress", filterable: true
    },{
      Header: "Postcode", accessor: "postcode", filterable: true
    },{
      Header: "City", accessor: "city", filterable: true
    },{
      Header: "Email", accessor: "email", filterable: true
    },{
      Header: "Phone Number", accessor: "phone", filterable: true
    }];
    return (
      <div className="container">
        <ReactTable data={data} columns={columns} />
      </div>
    );
  }
}

export default CustomerList;
