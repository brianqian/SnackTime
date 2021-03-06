import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Auth from "../../../utils/Auth";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  div: {
    left: 0,
    right: 0
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  margin: {
    margin: theme.spacing.unit
  },
  // card: {
  //   maxWidth: '50%',
  //   position: 'fixed',
  //   // top: '50%',
  //   // left: '50%',
  //   // transform: 'translate(-50%, -50%)',
  // },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    marginBottom: "5%"
  }
});

class ChangePassword extends Component {
  componentDidMount() {
    if (this.props.role === "staff") {
      Auth.StaffAuthorize(this);
    } else if (this.props.role === "parent") {
      Auth.ParentAuthorize(this);
    }
    let url = window.location.href;
    url = url.substring(0, url.length - 14);
    this.setState({ baseUrl: url });
  }

  state = {
    baseUrl: "",
    password: "",
    newPassword: "",
    showPassword: false,
    status: "Please enter your current password."
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  checkPassword = str => {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters that are letters, numbers or the underscore
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    return re.test(str);
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log("event", this.state.email);
    let validPassword = this.checkPassword(this.state.newPassword);
    if (validPassword) {
      fetch("/auth/changepass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: this.state.password,
          newPassword: this.state.newPassword,
          baseUrl: this.state.baseUrl
        })
      })
        .then(res => {
          return res.json();
        })
        .then(response => this.setState({ status: response }));
    } else {
      this.setState({
        status:
          "Please enter a password that is at least 6 characters long with at least one number, one lowercase letter, and one uppercase letter."
      });
    }
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    const { classes } = this.props;
    if (this.state.loggedIn) {
      return (
        <div >
          <Card>
            <CardContent className={classes.root}>
              <h3>{this.state.status}</h3>
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                label="Current password"
                value={this.state.password}
                onChange={this.handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <h3>Please enter your new password.</h3>
              <TextField
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
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </CardContent>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              size="small"
              className={classes.button}
            >
              Send
              <Send />
            </Button>
          </Card>
        </div>
      );
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: "/notAuthorized",
            state: { type: "Staff" }
          }}
        />
      );
    } else {
      return <div />;
    }
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangePassword);
