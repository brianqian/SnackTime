import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    statusText: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(`${this.props.type}`);
    fetch(`/auth/login/${this.props.type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then(res =>
      res.text().then(res => {
        console.log(res);
        if (res === 'Logged In') {
          window.location.href = `/${this.props.type}HomePage`;
        }
        // 'Email does not exist in our database'
        else if (res === 'Email does not exist in our database') {
          this.setState({statusText: 'Email does not exist in our database'});
        }
        // 'Incorrect Password'
        else if (res === 'Incorrect Password') {
          this.setState({statusText: 'Incorrect Password'});
        }
      })
    );
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
          <p>{this.state.statusText}</p>
          <input onClick={this.handleSubmit} id="login-submit" type="submit" />
        </form>
      </div>
    );
  }
}
