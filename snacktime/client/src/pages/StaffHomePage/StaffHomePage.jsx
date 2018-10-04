import React, { Component } from 'react';
import DashboardItem from '../../components/DashboardItem/DashboardItem';
import './StaffHomePage.css';

class StaffHomePage extends Component {
  state = {
    childNotifications: 0,
  };

  componentDidMount() {
    fetch('/auth/loggedin');
  }
  render() {

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
}

export default StaffHomePage;
