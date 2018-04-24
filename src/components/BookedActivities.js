import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
        Cell: ({ value }) => (
          <button
            className="btn btn-link"
            onClick={() => this.deleteActivity(value)}
          >
            Delete
          </button>
        )
      }
    ];
    return (
      <div className="container">
        <ReactTable
          data={data}
          columns={columns}
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
                      Cell: ({ value }) => (
                        <button
                          className="btn btn-link"
                          onClick={() => this.deleteCustomer(value)}
                        >
                          Delete
                        </button>
                      )
                    }
                  ]}
                  minRows={1}
                  showPaginationBottom={false}
                />
              </div>
            );
          }}
        />
        <ToastContainer autoClose={1500}/>
      </div>
    );
  }

  deleteActivity = value => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are your sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + value, {method: 'DELETE'})
              .then(res => {
                this.loadActivities();
                toast.success("Successfully Deleted Customer!", {
                  position: toast.POSITION.BOTTOM_CENTER
                })
              });
          }
        },
        {
          label: "No"
        }
      ]
    })
  };

  deleteCustomer = value => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are your sure you want to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("https://customerrest.herokuapp.com/api/customers/" + value, {method: 'DELETE'})
              .then(res => {
                this.loadActivities();
                toast.success("Successfully Deleted Customer!", {
                  position: toast.POSITION.BOTTOM_CENTER
                })
              });
          }
        },
        {
          label: "No"
        }
      ]
    })
  }

}

export default BookedActivities;
