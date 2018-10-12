import React, { Component } from 'react';
import DashboardItem from '../../../components/DashboardItem/DashboardItem';
import './ParentHomePage.css';
import { Redirect } from 'react-router';
import Auth from '../../../utils/Auth'

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

   componentWillMount = async () => {
    console.log('test');
    await Auth.ParentAuthorize(this);
    console.log(this.state)
  };



  
  render() {
    // if (this.state.loggedIn) {
      if (true){
      return (
        <div>
          <header>
            <p>Welcome {this.state.userName}</p>
          </header>
          <div className="dashboard-container">
            <DashboardItem
              title="My Kids"
              destination="/allstudentspage"
              image="/img/group.png"
              role="parent"
              // notifications={this.state.studentNotifications}
            />
            <DashboardItem
              title="Student Schedule"
              destination=""
              image="/img/calendar.png"
              role="parent"
            />
            <DashboardItem
              title="Settings"
              destination=""
              image="/img/settings.png"
              role="parent"
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
            state: { type: 'Parent' }
          }}
        />
      );
    }
    return <div>Logging in</div>;
  }
}

export default ParentHomePage;
