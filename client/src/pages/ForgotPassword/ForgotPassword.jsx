import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import Send from "@material-ui/icons/Send";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  card: {
    maxWidth: "50%",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
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
  }
});

class ForgotPassword extends Component {
  state = {
    email: "",
    sent: false,
    baseUrl: "",
    status: "Enter your email to reset your password.",
    role: ""
  };

  componentDidMount() {
    let url = window.location.href;
    url = url.substring(0, url.length - 14);
    this.setState({ baseUrl: url });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.role && this.state.email) {
      this.setState({ sent: true });
      console.log("event", this.state.email);
      fetch(`/auth/forgot/${this.state.role}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: this.state.baseUrl,
          email: this.state.email
        })
      })
        .then(res => {
          return res.json();
        })
        .then(response => this.setState({ status: response }));
    } else {
      this.setState({ status: "Please fill out the form." });
    }
  };
  render() {
    const { classes } = this.props;
    // if (this.state.sent) {
    //   return <ResetPassword />;
    // }
    // console.log(this.state.role);
    return (
      <div className={classes.div}>
        <Card className={classes.card}>
          <CardContent>
            <h3>Are you a staff or a parent?</h3>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="role-simple" />
                <Select
                  value={this.state.role}
                  onChange={this.handleChange("role")}
                  inputProps={{
                    name: "role",
                    id: "role-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>Role</em>
                  </MenuItem>
                  <MenuItem value={"Staff"}>Staff</MenuItem>
                  <MenuItem value={"Parent"}>Parent</MenuItem>
                </Select>
              </FormControl>
            </form>
            <h1 className={classes.title} color="textSecondary">
              {this.state.status}
            </h1>
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForgotPassword);
