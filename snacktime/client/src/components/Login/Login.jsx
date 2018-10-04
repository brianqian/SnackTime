import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`/auth/signin/${this.props.type === 'admin' ? 'admin' : 'parent'}`, {
      method: 'POST',
      headers: 'application/json',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then(res => console.log('logged in'));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <div className="login-area">
        <form>
          <label htmlFor="login">Email</label>
          <input
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
            id="login"
            type="text"
          />
          <label htmlFor="login">Password</label>
          <input
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            id="password"
            type="password"
          />
          <input onClick={this.handleSubmit} id="login-submit" type="submit" />
        </form>
      </div>
    );
  }
}
