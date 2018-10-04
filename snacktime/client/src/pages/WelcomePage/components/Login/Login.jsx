import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`/auth/login/${this.props.type}`, {
      method: 'POST',
      headers: 'application/json',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
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
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
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
