import React, { Component } from 'react';
import DashboardItem from '../../../components/DashboardItem/DashboardItem';
import './ParentHomePage.css';
import { Redirect } from 'react-router';

class ParentHomePage extends Component {
  state = {
    name: '',
    userId: '',
    userType: 'parent',
    orgName: '',
    orgId: '',
    loggedIn: false,
    loginRejected: false,
  };

  componentDidMount = () => {
    this.getUserId();
  };

  getUserId = () => {
    fetch('/auth/loggedin').then(res =>
      res.json().then(data => {
        if (data.userId) {
          console.log('USER AUTHORIZED');
          this.setState({
            name: data.name,
            userId: data.userId,
            userType: data.role,
            orgName: data.orgName,
            orgId: data.orgId,
            loginRejected: false,
            loggedIn: true,
          });
        } else {
          this.setState({
            loginRejected: true,
          });
        }
      })
    );
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
              title="My Kids"
              destination="/allstudentspage"
              image="/img/group.png"
              // notifications={this.state.studentNotifications}
            />
            <DashboardItem
              title="Daily Report"
              destination="DailyReportPage"
              image="/img/report.png"
              // notifications={this.state.studentNotifications}
            />
            <DashboardItem title="Add Staff" destination="" image="" />
            <DashboardItem
              title="Add Students"
              destination="/addstudent"
              // image=""
            />
            <DashboardItem
              title="Student Schedule"
              destination=""
              // image=""
            />
            <DashboardItem
              title="Settings"
              destination=""
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
            state: { type: 'Staff' }
          }}
        />
      );
    }
    return <div>Logging in</div>;
  }
}

export default ParentHomePage;
