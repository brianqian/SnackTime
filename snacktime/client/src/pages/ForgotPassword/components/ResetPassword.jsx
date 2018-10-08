import React, { Component } from "react";
import Key from "@material-ui/icons/VpnKey";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import classNames from "classnames";
import Send from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class ResetPassword extends Component {
  componentDidMount() {
    let key = this.props.location.pathname;
    // console.log("this.props.location", key);
    let resetKey = key.slice(15);
    this.setState({ resetKey: resetKey });
  }

  state = {
    resetKey: "",
    newPassword: "",
    showPassword: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("event", this.state.email);
    fetch("/auth/resetpass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resetKey: this.state.resetKey,
        newPassword: this.state.newPassword
      })
    })
      .then(res => res.json)
      .then(response => console.log(response));
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    const { classes } = this.props;
    console.log(this.state.resetKey);
    return (
      <div>
        {/* <TextField
          className={classes.margin}
          name="resetKey"
          value={this.state.resetKey}
          onChange={this.handleChange("resetKey")}
          id="resetkey"
          label="Reset Key"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            )
          }}
        /> */}
        <TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? "text" : "password"}
          label="New Password"
          value={this.state.newPassword}
          onChange={this.handleChange("newPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          className={classes.margin}
          onClick={this.handleSubmit}
          variant="contained"
          size="small"
          className={classes.button}
        >
          Send
          <Send />
        </Button>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResetPassword);
