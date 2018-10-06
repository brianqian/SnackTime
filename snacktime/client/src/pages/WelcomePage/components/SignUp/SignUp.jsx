import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    orgName: '',
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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

  handleSubmitClose = e => {
    this.handleSubmit(e);
    this.handleClose();
  }

  render() {
    
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Create a snacktime account for your organization!</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Snacktime Organization Sign-Up</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  All fields are required to create your Snacktime account.
                </DialogContentText>            
              
              <form>
                <label htmlFor="signup-name">Administrator Name: </label>
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
                <br></br>
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
                <input onClick={this.handleSubmitClose} id="signup-submit" type="submit" />
              </form>
            </DialogContent>
          </Dialog>
      </div>
    );
  }
}

