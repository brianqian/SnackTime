import React, { Component } from 'react';

export default class Login extends Component {
  state = {

  }
  render() {
    return (
      <div className="login-area">
        <label htmlFor="login">Email</label>
        <input value={this.state.username}id="login" type="text" />
        <label htmlFor="login">Password</label>
        <input value = {this.state.password} id="password" type="password" />
        <input id= "login-submit"type="submit"/>
      </div>
    );
  }
}
