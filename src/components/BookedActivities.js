import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class BookedActivities extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
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
      }
    ];
    return (
      <div className="container">
        <ReactTable
          data={data}
          columns={columns}
          SubComponent={row => {
            let x = [row.original.customer]
            return (
              <div className="container">
                <ReactTable
                  data={x} // won't work unless it's an array
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
                    }
                  ]}
                  minRows={1}
                  showPaginationBottom={false}
                />
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default BookedActivities;
