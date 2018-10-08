import React, { Component } from 'react';
import DashboardItem from '../../../../components/DashboardItem/DashboardItem';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar'
import './DailyReportMenu.css';

class DailyReport extends Component {
  state = {
    orgId:'',
    loggedIn:false,
    loginRejected:false

  };

  componentDidMount = () => {
    console.log('mounted');
    this.getUserId();
  };

  getUserId = () => {
    fetch('/auth/loggedin').then(res =>
      res.json().then(data => {
        if (data.userId) {
          console.log('USER AUTHORIZED');
          this.setState({
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
          <HeaderBar />
          <div className="dashboard-container">
            <DashboardItem
              title="Food"
              destination="/studentselect"
              activity="/dailyreport/addmeal"
              image="/img/bottle.png"
            />
            <DashboardItem
              title="Nap"
              destination="/studentselect"
              activity="/dailyreport/addnap"
              image="/img/sleep.png"
            />
            <DashboardItem 
              title="Potty"
              destination="/studentselect" 
              activity="/dailyreport/addpotty" 
              image="/img/toilet.png" 
            />
            <DashboardItem
              title="Meds"
              destination="/studentselect" 
              activity="/dailyreport/addmeds" 
              image="/img/medication.png"
            />
            <DashboardItem
              title="Note"
              destination="/studentselect" 
              activity="/dailyreport/addnote" 
              image="/img/message.png"
            />
            <DashboardItem
              title="Incident"
              destination="/studentselect" 
              activity="/dailyreport/addincident" 
              image="/img/incident.png"
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

export default DailyReport;
