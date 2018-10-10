import React, { Component } from 'react';
import DashboardItem from '../../../components/DashboardItem/DashboardItem';
import './StaffHomePage.css';
import { Redirect } from 'react-router';
import Auth from '../../../utils/Auth'

class StaffHomePage extends Component {
  state = {
    name: '',
    userId: '',
    orgName: '',
    orgId: '',
    loggedIn: false,
    loginRejected: false,
  };
  componentDidMount = () => {
    Auth.loggedIn(this)
  };


  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <header>
            <p>Welcome {this.state.name}</p>
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
              title="Settings"
              destination="/settings"
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
            pathname: '/notAuthorized',
            state: { type: 'Staff' },
          }}
        />
      );
    }
    return <div>Logging in</div>;
  }
}

export default StaffHomePage;
