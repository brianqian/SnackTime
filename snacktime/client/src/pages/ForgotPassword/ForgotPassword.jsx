import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class ForgotPassword extends Component {
  state = {
    email: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    // console.log(this.state.email);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('event', this.state.email);
    fetch('/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then(res => res.json)
      .then(response => console.log(response));
  };

  render() {
    return (
      <div>
        <TextField
          name="email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          id="forgotemail"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={this.handleSubmit} variant="contained" color="primary">
          Send
          <Icon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ForgotPassword);
