import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], times: [] };
  }

  componentDidMount() {
    this.loadActivities();
  }

  loadActivities = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(res => res.json())
      .then(resData => {
        this.setState({ activities: resData.content });
      })
      .then(() => this.createTimes())
  };

  createTimes = () => {
    let x = [];
    this.state.activities.map((item, index) => {
      let y = moment(this.state.activities[index].date).add(this.state.activities[index].duration, 'm').toDate();
      x[index] = {
        id: index,
        title: `${this.state.activities[index].activity}`,
        start: moment(this.state.activities[index].date).toDate(),
        end: y,
        AllDay: false
      };
    });

    this.setState({
      times: [...x]
    });
  };

  render() {
    const myEventsList = [
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2018, 3, 0),
        end: new Date(2018, 3, 1)
      },
      {
        id: 1,
        title: "Long Event",
        start: new Date(2018, 3, 7),
        end: new Date(2018, 3, 10)
      },

      {
        id: 2,
        title: "DTS STARTS",
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0)
      },

      {
        id: 3,
        title: "DTS ENDS",
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0)
      },

      {
        id: 4,
        title: "Some Event",
        start: new Date(2018, 3, 9, 0, 0, 0),
        end: new Date(2018, 3, 9, 0, 0, 0)
      },
      {
        id: 5,
        title: "Conference",
        start: new Date(2018, 3, 11),
        end: new Date(2018, 3, 13),
        desc: "Big conference for important people"
      },
      {
        id: 6,
        title: "Meeting",
        start: new Date(2018, 3, 12, 10, 30, 0, 0),
        end: new Date(2018, 3, 12, 12, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting"
      },
      {
        id: 7,
        title: "Lunch",
        start: new Date(2018, 3, 12, 12, 0, 0, 0),
        end: new Date(2018, 3, 12, 13, 0, 0, 0),
        desc: "Power lunch"
      },
      {
        id: 8,
        title: "Meeting",
        start: new Date(2018, 3, 12, 14, 0, 0, 0),
        end: new Date(2018, 3, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: "Happy Hour",
        start: new Date(2018, 3, 12, 17, 0, 0, 0),
        end: new Date(2018, 3, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day"
      },
      {
        id: 10,
        title: "Dinner",
        start: new Date(2018, 3, 12, 20, 0, 0, 0),
        end: new Date(2018, 3, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: "Birthday Party",
        start: new Date(2018, 4, 15, 7, 0, 0),
        end: new Date(2018, 4, 15, 10, 30, 0)
      },
      {
        id: 12,
        title: "Late Night Event",
        start: new Date(2018, 3, 17, 19, 30, 0),
        end: new Date(2018, 3, 18, 2, 0, 0)
      },
      {
        id: 13,
        title: "Multi-day Event",
        start: new Date(2018, 3, 20, 19, 30, 0),
        end: new Date(2018, 3, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: "Today",
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ];
    let allViews = Object.keys(BigCalendar.Views).map(
      k => BigCalendar.Views[k]
    );
    return (
      <div style={{ height: 800 }}>
        <BigCalendar
          events={this.state.times}
          showMultiDayTimes
          views={allViews}
          defaultDate={new Date()}
          step={30}
        />
      </div>
    );
  }
}

export default Calendar;
