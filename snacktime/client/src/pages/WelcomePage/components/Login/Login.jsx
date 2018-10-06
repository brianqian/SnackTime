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
    console.log('login props',this.props);
    fetch(`/auth/login/${this.props.type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then(res =>
      res.json().then(res => {
        console.log('res',res);
        if (res.id) {

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
