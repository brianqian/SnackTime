import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import Send from "@material-ui/icons/Send";
import classNames from "classnames";
import ResetPassword from "./components/ResetPassword";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class ForgotPassword extends Component {
  state = {
    email: "",
    sent: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ sent: true });
    console.log("event", this.state.email);
    fetch("/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(res => res.json)
      .then(response => console.log(response));
  };

  render() {
    const { classes } = this.props;
    if (this.state.sent) {
      return <ResetPassword />;
    }
    return (
      <div>
        <TextField
          name="email"
          value={this.state.email}
          onChange={this.handleChange("email")}
          id="forgotemail"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
        />

        <Button
          onClick={this.handleSubmit}
          variant="contained"
          size="small"
          className={classes.button}
        >
          Send
          <Send
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
        </Button>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForgotPassword);
