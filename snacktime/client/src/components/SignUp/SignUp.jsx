import React, { Component } from 'react';

export default class SignUp extends Component {
  state = {};
  render() {
    return (
      <div>
        <label htmlFor="signup-name"></label>
        <input id='signup-name' name="name" type="text" />
        <label htmlFor="signup-email"></label>
        <input id='signup-email' name="email" type="text" />
        <label htmlFor="signup-password"></label>
        <input id='signup-password' name="password" type="password" />

        <label htmlFor="signup-orgName"></label>
        <input id='signup-orgName' name="orgName" type="text" />
        <label htmlFor="signup-orgAddress"></label>
        <input id='signup-orgAddress' name="orgAddress" type="text" />
        <label htmlFor="signup-orgPhone"></label>
        <input id='signup-orgPhone' name="orgPhone" type="text" />
      </div>
    );
  }
}
