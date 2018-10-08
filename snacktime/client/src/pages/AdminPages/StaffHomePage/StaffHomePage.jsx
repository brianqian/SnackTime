import React, { Component } from 'react';
import DashboardItem from '../../components/DashboardItem/DashboardItem';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import './StaffHomePage.css';
import NotAuthorized from '../notAuthorized'

class StaffHomePage extends Component {
  state = {
    childNotifications: 0,
    userId: '',
    userType: '',
    loggedIn: false
  };

  componentDidUpdate = () => {
    console.log('mounted');
    this.getUserId();
  };

  getUserId = () => {
    console.log('get request')
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
    this.getUserId();
    let allCookies = document.cookie;
    console.log('cookie', allCookies)
    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar />
          <header>
            <p>Welcome {this.state.name}</p>
            <p>School: {this.state.orgName}</p>
          </header>
          <div className="dashboard-container">
            <DashboardItem
              title="View Students"
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
            <DashboardItem 
              title="Add Staff" 
              destination="/addstaff" 
              image="/img/addstaff.png" />
            <DashboardItem
              title="Add Students"
              destination="/addstudent"
              image="/img/addstudent.png"
            />
            <DashboardItem
              title="Student Schedule"
              destination=""
              image="/img/calendar.png"
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
