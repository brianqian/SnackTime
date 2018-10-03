import React, { Component } from 'react';
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

class AdminLogIn extends Component {
  render() {
    return (
      <div>
        <Login />
        <SignUp />
      </div>
    );
  }
}

export default AdminLogIn;