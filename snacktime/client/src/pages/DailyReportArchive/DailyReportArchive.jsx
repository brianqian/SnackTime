import React, { Component } from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router';

export default class DailyReportArchive extends Component {
  state = {};

  componentWillMount = async () => {
    let user = await fetch('/auth/loggedin');
    const { userType } = await user.json();
    if (userType === 'staff') {
      await Auth.StaffAuthorize(this);
      console.log(this.state);
    } else {
      await Auth.ParentAuthorize(this);
      console.log(this.state);
    }
  };

  render() {
    if (this.state.loggedIn) {
      return <div>
        
      </div>;
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: '/notAuthorized',
            state: { location: '/dailyreportarchive' },
          }}
        />
      );
    }else{
      return <div/>
    }
  }
}
