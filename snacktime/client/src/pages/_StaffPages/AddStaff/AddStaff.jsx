import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import Auth from '../../../utils/Auth';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class OutlinedTextFields extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    orgId: '',
    loginRejected: false,
    loggedIn: false,
    multiline: 'Controlled',
  };

  componentWillMount = () => {
    Auth.StaffAuthorize(this);
  };

  capitalize = name =>{
    const names = name.split(" ");
    for(var i =0;i<names.length;i++){
      names[i]=names[i].charAt(0).toUpperCase()+ names[i].slice(1)
    }
    return names.join(" ")
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('in the click event', this.state.orgId);
    fetch(`/auth/signup/staff/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.capitalize(this.state.firstName + " " + this.state.lastName),
        email: this.state.email,
        password: this.state.password,
        orgId: this.state.orgId,
      }),
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <HeaderBar type={this.state.userType} /> */}
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            id="outlined-name"
            label="firstName"
            name="firstName"
            className={classes.textField}
            value={this.state.firstName}
            onChange={this.handleChange('firstName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-name"
            label="lastName"
            name="lastName"
            className={classes.textField}
            value={this.state.lastName}
            onChange={this.handleChange('lastName')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-email"
            label="E-mail"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
            variant="outlined"
          />

          <Button
            variant="contained"
            size="small"
            onClick={this.handleSubmit}
            className={classes.button}
          >
            <SaveIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Save
          </Button>
        </form>
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
