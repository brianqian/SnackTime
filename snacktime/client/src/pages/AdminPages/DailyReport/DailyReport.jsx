import React, { Component } from 'react';
import DashboardItem from '../../components/DashboardItem/DashboardItem';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import './DailyReport.css';

class DailyReport extends Component {
  state = {

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
          <div className="dashboard-container">
            <DashboardItem
              title="Food"
              destination="/addmeal"
              image="/img/bottle.png"
            />
            <DashboardItem
              title="Nap"
              destination="/addnap"
              //image="/img/.png"
            />
            <DashboardItem 
              title="Potty" 
              destination="/addpotty" 
              image="/img/toilet.png" 
            />
            <DashboardItem
              title="Meds"
              destination="/addmeds"
              image="/img/medication.png"
            />
            <DashboardItem
              title="Note"
              destination="/addnote"
              image="/img/message.png"
            />
            <DashboardItem
              title="Incident"
              destination="/addincident"
              //image="/img/.png"
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
