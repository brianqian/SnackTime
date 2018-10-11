import React, { Component } from "react";
import DashboardItem from "../../../components/DashboardItem/DashboardItem";
import "./StaffHomePage.css";
import { Redirect } from "react-router";
import Auth from "../../../utils/Auth";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";

class StaffHomePage extends Component {
  state = {
    userName: "",
    userId: "",
    orgName: "",
    orgId: "",
    loggedIn: false,
    loginRejected: false
  };

  componentDidMount() {
    Auth.StaffAuthorize(this);
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar />
          <header>
            <p>
              <strong>Welcome {this.state.userName}</strong>
            </p>
            <p>School: {this.state.orgName}</p>
          </header>
          <div className="dashboard-container">
            <DashboardItem
              title="Students"
              destination="/allstudentspage"
              image="/img/group.png"
              // notifications={this.state.studentNotifications}
            />
            <DashboardItem
              title="Add Activity"
              destination="/dailyreportmenu"
              image="/img/report.png"
              // notifications={this.state.studentNotifications}
            />
            <DashboardItem
              title="Add Staff"
              destination="/addstaff"
              image="/img/addStaff.png"
            />
            <DashboardItem
              title="Add Students"
              destination="/addstudent"
              image="/img/addStudent.png"
            />
            <DashboardItem
              title="School Schedule"
              destination="/calendar"
              image="/img/calendar.png"
            />
            <DashboardItem
              title="E-mail All Parents"
              destination="/messageparents"
              image="/img/message.png"
            />
            <DashboardItem
              title="Settings"
              destination="/staffsettings"
              image="/img/settings.png"
            />
          </div>
        </div>
      );
    }
    if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: "/notAuthorized",
            state: { type: "Staff" }
          }}
        />
      );
    }
    return <div />;
  }
}

export default StaffHomePage;
