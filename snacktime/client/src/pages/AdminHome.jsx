import React, { Component } from 'react';
import DashboardItem from '../components/DashboardItem/DashboardItem';

class AdminHome extends Component {
  state = {
    childNotifications: 0,
  };

  render() {
    return (
      <div className="dashboard-container">
        <DashboardItem
          title="Children"
          destination=""
          image=""
          notifications={this.state.childNotifications}
        />
        <DashboardItem
          title="Daily Report"
          destination=""
          image=""
          notifications={this.state.childNotifications}
        />
        {/* <DashboardItem title="Settings" destination="" image="" /> */}
      </div>
    );
  }
}

export default AdminHome;
