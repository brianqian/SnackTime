import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import StudentDOB from './components/NativeSelect';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import Auth from '../../../utils/Auth';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
    month: '',
    day: '',
    year: '',
    notes: '',
    allergies: '',
    meds: '',
    doctor: '',
    address: '',
    city: '',
    zip: '',
    orgId: '',
    loggedIn: false,
    loginRejected: false,
    multiline: 'Controlled',
    //staffs:[]
  };

  componentWillMount = () => {
    Auth.loggedIn(this);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSelectorChange = (type, data) => { 
    console.log('Inside handleSelectorChangex');
    console.log('data: ', data);
    console.log('type: ', type);
    if (type[0] === 'month') {
      console.log('inside month');
      this.setState({ month: data });
    } else if (type[0] === 'day') {
      console.log('inside day');
      this.setState({ day: data });
    } else if (type[0] === 'year') {
      console.log('inside year');
      this.setState({ year: data });
    }
  };

  capitalize = name =>{
    const names = name.split(" ");
    for(var i =0;i<names.length;i++){
      names[i]=names[i].charAt(0).toUpperCase()+ names[i].slice(1)
    }
    return names.join(" ")
  }
  
  handleSubmit = event => {
    event.preventDefault();
    fetch(`/api/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.capitalize(this.state.firstName + ' ' + this.state.lastName),
        address: `${this.state.address},  ${this.state.city}, ${
          this.state.zip
        }`,
        dob: `${this.state.month}, ${this.state.day}, ${this.state.year}`,
        notes: this.state.notes,
        allergies: this.state.allergies,
        medication: this.state.meds,
        doctor: this.state.doctor,
        orgId: this.state.orgId,
      }),
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <HeaderBar />
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
          <StudentDOB
            required
            id="outlined-birthday"
            label="DOB"
            className={classes.textField}
            value={this.state.dob}
            onChange={this.handleSelectorChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-notes"
            label="Notes"
            defaultValue=""
            className={classes.textField}
            value={this.state.notes}
            onChange={this.handleChange('notes')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-allergies"
            label="Allergies"
            defaultValue=""
            className={classes.textField}
            value={this.state.allergies}
            onChange={this.handleChange('allergies')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-meds"
            label="Medications"
            defaultValue=""
            className={classes.textField}
            value={this.state.meds}
            onChange={this.handleChange('meds')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-doctor"
            label="Doctor"
            defaultValue=""
            className={classes.textField}
            value={this.state.doctor}
            onChange={this.handleChange('doctor')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-address"
            label="Address"
            defaultValue=""
            className={classes.textField}
            value={this.state.address}
            onChange={this.handleChange('address')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-city"
            label="City"
            defaultValue=""
            className={classes.textField}
            value={this.state.city}
            onChange={this.handleChange('city')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-zip"
            label="Zip / Postal Code"
            defaultValue=""
            className={classes.textField}
            value={this.state.zip}
            onChange={this.handleChange('zip')}
            margin="normal"
            variant="outlined"
          />
           {/* <InputLabel htmlFor="age-simple">Staff</InputLabel>
          <Select
            native
            name='staff'
            value=""
            //onChange={this.handleChange}
            inputProps={{
              name: 'staff',
              id: 'age-simple',
            }}
          >
          <option value=""></option>
          <option></option>

          </Select> */}
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
