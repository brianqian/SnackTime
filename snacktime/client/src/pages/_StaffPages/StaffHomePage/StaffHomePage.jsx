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

    componentWillMount() {
      Auth.StaffAuthorize(this);
  }

  render() {
    if (this.state.loggedIn) {
      // if (true){
      return (
        <div>
          <HeaderBar type={this.state.userType} />
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
              role="staff"
              // notifications={this.state.studentNotifications}
            />
            <DashboardItem
              title="Add Activity"
              destination="/dailyreportmenu"
              image="/img/report.png"
              role="staff"
              // notifications={this.state.studentNotifications}
            />
            <DashboardItem
              title="Add Students"
              destination="/addstudent"
              image="/img/addStudent.png"
              role="staff"
            />
            <DashboardItem
              title="School Schedule"
              destination="/schedule"
              image="/img/calendar.png"
              role="staff"
            />
            <DashboardItem
              title="E-mail All Parents"
              destination="/messageparents"
              image="/img/message.png"
              role="staff"
            />
            <DashboardItem
              title="Settings"
              destination="/staffsettings"
              image="/img/settings.png"
              role="staff"
            />
          </div>
        </div>
      );
    }else if (this.state.loginRejected) {
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
