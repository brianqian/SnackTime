import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="login-area">
        <label htmlFor="login">Email</label>
        <input id="login" type="text" />
        <label htmlFor="login">Password</label>
        <input id="password" type="password" />
        <input id= "login-submit"type="submit"/>
      </div>
    );
  }
}
