import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import EditActivity from "./EditActivity";
import AddActivity from "./AddActivity";
import moment from "moment";

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
      .then(() => this.loadCustomerBookings());
  };

  // Do fetch in load customers and push training data to object at that index!!

  loadCustomerBookings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(res => res.json())
      .then(resData => {console.log(resData);
        resData.map((v, i) => {
          return resData[i].date = moment((resData[i].date)).format("MMM Do YY");
        });
        this.setState({ customerBookings: resData });
      })
      .then(() => this.mergeCustomerAndTrainings());
  };

  mergeCustomerAndTrainings = () => {
    let customerJSON = [...this.state.customers];
    this.state.customers.map((customerItem, customerIndex) => {
      this.state.customerBookings.map(bookingItem => {
        if (
          bookingItem.customer !== null &&
          customerItem.firstname === bookingItem.customer.firstname &&
          customerItem.lastname === bookingItem.customer.lastname &&
          customerItem.streetaddress === bookingItem.customer.streetaddress &&
          customerItem.postcode === bookingItem.customer.postcode &&
          customerItem.city === bookingItem.customer.city &&
          customerItem.email === bookingItem.customer.email &&
          customerItem.phone === bookingItem.customer.phone
        ) {
          if (Array.isArray(customerJSON[customerIndex].trainings)) {
            customerJSON[customerIndex].trainings = [...customerJSON[customerIndex].trainings, bookingItem];
          } else {
            customerJSON[customerIndex].trainings = [bookingItem];
          }
        } return customerJSON[customerIndex].trainings;
      });
      return customerJSON[customerIndex].trainings;
    });
    this.setState({ customers: customerJSON });
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
      },
      {
        Header: "Delete",
        accessor: "links[0].href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <button
            className="btn btn-link"
            onClick={() => this.deleteCustomer(value)}
          >
            Delete
          </button>
        )
      },
      {
        Header: "Edit",
        accessor: "links[0].href",
        filterable: false,
        sortable: false,
        Cell: ({ row, value }) => (
          <div>
          <EditCustomer
            updateCustomer={this.updateCustomer}
            link={value}
            customer={row}
          /></div>
        )
      }
    ];
    return (
      <div className="container">
        <AddCustomer addCustomer={this.addCustomer} />
        <AddActivity addActivity={this.addActivity} />
        <ReactTable
          data={data}
          columns={columns}
          minRows={1}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div>
                <ReactTable
                  data={row.original.trainings}
                  columns={[
                    {
                      Header: "Id",
                      accessor: "id"
                    },
                    {
                      Header: "Activity",
                      accessor: "activity"
                    },
                    {
                      Header: "Date",
                      accessor: "date"
                    },
                    {
                      Header: "Duration",
                      accessor: "duration"
                    },
                    {
                      Header: "Delete",
                      accessor: "id",
                      filterable: false,
                      sortable: false,
                      Cell: ({ value }) => (
                        <button
                          className="btn btn-link"
                          onClick={() => this.deleteActivity(value)}
                        >
                          Delete
                        </button>
                      )
                    },
                    {
                      Header: "Edit",
                      accessor: "id",
                      filterable: false,
                      sortable: false,
                      Cell: ({ row, value }) => (
                        <EditActivity
                          updateActivity={this.updateActivity}
                          link={"https://customerrest.herokuapp.com/api/trainings/" + value}
                          activity={row}
                        />
                      )
                    }
                  ]}
                  minRows={1}
                  className="-striped -highlight"
                  showPaginationBottom={false}
                />
              </div>
            );
          }}
        />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }

  addActivity = newActivity => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActivity)
    }).then(() => {
      this.loadCustomers();
      toast.success("Activity Added Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    });
  };

  updateActivity = (link, activity) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity)
    }).then(() => {
      this.loadCustomers();
      toast.success("Successfully Edited Activity!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    });
  };

  updateCustomer = (link, activity) => {
    console.log(link);
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity)
    }).then(() => {
      this.loadCustomers();
      toast.success("Successfully Edited Customer!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    });
  };

  deleteCustomer = value => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are your sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(value, { method: "DELETE" }).then(() => {
              this.loadCustomers();
              toast.success("Successfully Deleted Customer!", {
                position: toast.POSITION.BOTTOM_CENTER
              });
            });
          }
        },
        {
          label: "No"
        }
      ]
    });
  };

  addCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer)
    }).then(() => {
      this.loadCustomers();
      toast.success("Customer Added Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    });
  };

  deleteActivity = value => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are your sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + value, {
              method: "DELETE"
            }).then(() => {
              this.loadCustomers();
              toast.success("Successfully Deleted Customer!", {
                position: toast.POSITION.BOTTOM_CENTER
              });
            });
          }
        },
        {
          label: "No"
        }
      ]
    });
  };
}

export default CustomerList;
