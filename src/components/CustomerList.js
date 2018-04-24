import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], customerBookings: [] };
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
        this.loadCustomerBookings())
  };

  // Do fetch in load customers and push training data to object at that index!!

  loadCustomerBookings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(res => res.json())
      .then(resData => {
        this.setState({ customerBookings: resData });
      })
      .then(() => this.y())
  };

  y = () => {
    let x = [...this.state.customers];
    this.state.customers.map((item, index) => {
      this.state.customerBookings.map((item2, index2) =>{
        if (item.firstname === item2.customer.firstname
          && item.lastname === item2.customer.lastname
          && item.streetaddress === item2.customer.streetaddress
          && item.postcode === item2.customer.postcode
          && item.city === item2.customer.city
          && item.email === item2.customer.email
          && item.phone === item2.customer.phone
        ) {
          if (Array.isArray(x[index].trainings)) {
            x[index].trainings = [...x[index].trainings, item2];
          } else {
            x[index].trainings = [item2];
          }
        }})
    });
    this.setState({customers: x});
  };

  render() {
    const data = this.state.customers;
    const columns = [
      {
        Header: "First Name",
        accessor: "firstname",
        filterable: true
      },
      {
        Header: "Last Name",
        accessor: "lastname",
        filterable: true
      },
      {
        Header: "Address",
        accessor: "streetaddress",
        filterable: true
      },
      {
        Header: "Postcode",
        accessor: "postcode",
        filterable: true
      },
      {
        Header: "City",
        accessor: "city",
        filterable: true
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true
      },
      {
        Header: "Phone Number",
        accessor: "phone",
        filterable: true
      }
    ];
    return (
      <div className="container">
        <ReactTable
          data={data}
          columns={columns}
          minRows={1}
          SubComponent={row => {
            return <div><ReactTable
            data={row.original.trainings}
            columns={[{
              Header: "Id",
              accessor: "id",
              filterable: true
            },{
              Header: "Activity",
              accessor: "activity",
              filterable: true
            },{
              Header: "Date",
              accessor: "date",
              filterable: true
            },{
              Header: "Duration",
              accessor: "duration",
              filterable: true
            },]}
            minRows={1}
            showPaginationBottom={false}
            />{console.log(row.original.trainings)}</div>;
          }}
        />
      </div>
    );
  }
}

export default CustomerList;
