import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import './Login.css'

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    statusText: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("login props", this.props);
    fetch(`/auth/login/${this.props.type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(res =>
      res
        .text()
        .then(res => {
          console.log(res === "Success");
          if (res === "Success") {
            if (this.props.oldLocation) {
              window.location.href = `${this.props.oldLocation}`;
            } else {
              window.location.href = `/${this.props.type}HomePage`;
            }
          }
          // 'Email does not exist in our database'
          else if (res === "Email does not exist in our database") {
            this.setState({
              statusText: "Email does not exist in our database"
            });
          }
          // 'Incorrect Password'
          else if (res === "Incorrect Password") {
            this.setState({ statusText: "Incorrect Password" });
          }
        })
        .catch(err => console.log(err))
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment >
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <div className="errormsg">{this.state.statusText}</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color={this.props.type === 'Staff' ? 'secondary': 'primary'} 
                onClick={this.handleSubmit}
                className={classes.submit}
              >
                Sign in
              </Button>
              
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogIn);
