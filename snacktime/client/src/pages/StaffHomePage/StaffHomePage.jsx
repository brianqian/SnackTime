import React, { Component } from 'react';
import DashboardItem from '../../components/DashboardItem/DashboardItem';
import './StaffHomePage.css';
import NotAuthorized from '../notAuthorized'

class StaffHomePage extends Component {
  state = {
    childNotifications: 0,
    userId: '',
    userType: '',
    loggedIn: false
  };

  componentWillUpdate = () => {
    console.log('mounted');
    this.getUserId();
  };

  getUserId = () => {
    fetch('/auth/loggedin')
      .then(res => res.json())
      .then(res => {
        // this.setState({userId: })
        console.log(res);
        this.setState({loggedIn:true})
      });
  };

  render() {
    console.log('rendering');
    let allCookies = document.cookie;
    console.log('cookie', allCookies)
    if (this.state.loggedIn) {
      return (
        <div className="dashboard-container">
          <DashboardItem
            title="Students"
            destination="AllStudentsPage"
            image=""
            notifications={this.state.studentNotifications}
          />
          <DashboardItem
            title="Daily Report"
            destination="DailyReportPage"
            image=""
            notifications={this.state.studentNotifications}
          />
          <DashboardItem title="Add Staff" destination="" image="" />
          <DashboardItem title="Student Schedule" destination="" image="" />
          <DashboardItem title="Settings" destination="" image="" />
        </div>
      );
    }
    else {
      return (
        <div>
          Hello
        </div>
      );
    }
  }
}

export default StaffHomePage;
