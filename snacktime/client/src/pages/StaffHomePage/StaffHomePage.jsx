import React, { Component } from 'react';
import DashboardItem from '../../components/DashboardItem/DashboardItem';
import './StaffHomePage.css';
import NotAuthorized from '../notAuthorized';

class StaffHomePage extends Component {
  state = {
    userId: '',
    loggedIn: false,
    orgName: '',
    name: '',
  };

  componentDidMount = () => {
    console.log('mounted');
    this.getUserId();
  };

  getUserId = () => {
    console.log('get request');
    fetch('/auth/loggedin').then(res =>
      res.json().then(data => {
        if (data.userId) {
          console.log('setting state');
          this.setState({
            orgName: data.orgName,
            userId: data.userId,
            loggedIn: true,
            name: data.name,
          });
        }
        console.log(this.state);
      })
    );
  };

  render() {
    // if (this.state.loggedIn) {
      if (true){
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
            <DashboardItem title="Student Schedule" destination="" 
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
    } else {
      return <div>Logging in...</div>;
    }
  }
}

export default StaffHomePage;
