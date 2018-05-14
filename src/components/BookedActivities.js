import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddActivity from "./AddActivity";
import EditActivity from "./EditActivity";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import moment from "moment";

class BookedActivities extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
  }

  componentDidMount() {
    this.loadActivities();
  }

  loadActivities = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(res => res.json())
      .then(resData => {
        console.log(resData);
        resData.map((v, i) => {
          return resData[i].date = moment((resData[i].date)).format("MMM Do YY");
        });
        this.setState({ activities: resData });
      });
  };

  render() {
    const data = this.state.activities;
    const columns = [
      {
        Header: "Id",
        accessor: "id",
        filterable: true
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: true
      },
      {
        Header: "Duration",
        accessor: "duration",
        filterable: true
      },
      {
        Header: "Activity",
        accessor: "activity",
        filterable: true
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
            let x = [row.original.customer];
            return (
              <div className="container">
                <ReactTable
                  data={x}
                  columns={[
                    {
                      Header: "Id",
                      accessor: "id"
                    },
                    {
                      Header: "First Name",
                      accessor: "firstname"
                    },
                    {
                      Header: "Last Name",
                      accessor: "lastname"
                    },
                    {
                      Header: "Address",
                      accessor: "streetaddress"
                    },
                    {
                      Header: "Postcode",
                      accessor: "postcode"
                    },
                    {
                      Header: "City",
                      accessor: "city"
                    },
                    {
                      Header: "Email",
                      accessor: "email"
                    },
                    {
                      Header: "Phone Number",
                      accessor: "phone"
                    },
                    {
                      Header: "Delete",
                      accessor: "id",
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
                      accessor: "id",
                      filterable: false,
                      sortable: false,
                      Cell: ({ row, value }) => (
                        <div>{console.log(row)}
                          <EditCustomer
                            updateCustomer={this.updateCustomer}
                            link={"https://customerrest.herokuapp.com/api/customers/" + value}
                            customer={row}
                          /></div>
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

  addCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer)
    }).then(() => {
      this.loadActivities();
      toast.success("Customer Added Successfully!", {
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
      this.loadActivities();
      toast.success("Successfully Edited Customer!", {
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
      this.loadActivities();
      toast.success("Successfully Edited Activity!", {
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
              this.loadActivities();
              toast.success("Successfully Deleted Activity!", {
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

  deleteCustomer = value => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are your sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("https://customerrest.herokuapp.com/api/customers/" + value, {
              method: "DELETE"
            }).then(() => {
              this.loadActivities();
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

  addActivity = newActivity => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActivity)
    }).then(() => {
      this.loadActivities();
      toast.success("Activity Added Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    });
  };
}

export default BookedActivities;
