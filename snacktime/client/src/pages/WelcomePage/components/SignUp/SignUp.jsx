import React, { Component } from 'react';

export default class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    orgName: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const { name, email, password, orgName } = this.state;
    console.log({orgName})
    fetch('/auth/organization', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({orgName}),
    })
      .then(res => res.json())
      .then(res => {
        console.log('orgid',res.id);
        fetch('/auth/signup/staff', {
          method: 'POST',
          headers: {
            "Content-type": 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name,
            email,
            password,
            orgId: res.id,
          }),
        });
      })
      .then(res => {
        console.log('signup success')
        // window.location.href="/StaffHomePage";
      })
      .catch(err=>console.log(err))
  };
  render() {
    return (
      <div>
        <form>
          <label htmlFor="signup-name">Name: </label>
          <input
            onChange={this.handleChange}
            value={this.state.name}
            id="signup-name"
            name="name"
            type="text"
          />
          <label htmlFor="signup-email">Email: </label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            id="signup-email"
            name="email"
            type="text"
          />
          <label htmlFor="signup-password">Password: </label>
          <input
            onChange={this.handleChange}
            value={this.state.password}
            id="signup-password"
            name="password"
            type="password"
          />

          <label htmlFor="signup-orgName">Organization Name: </label>
          <input
            onChange={this.handleChange}
            value={this.state.orgName}
            id="signup-orgName"
            name="orgName"
            type="text"
          />
          <input onClick={this.handleSubmit} id="signup-submit" type="submit" />
        </form>
      </div>
    );
  }
}
