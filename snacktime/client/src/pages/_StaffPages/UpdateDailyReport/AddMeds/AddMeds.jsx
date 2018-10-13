import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector';
import { Redirect } from 'react-router-dom';
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from '../MultiSelect/MultiSelectContainer';
import Timepicker from '../../../../components/TimePicker/TimePicker';
import './AddMeds.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  submitbutton: {
    marginTop: 25,
    height: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class AddMeds extends React.Component {
  state = {
    allStudents: [],
    studentIdsToSubmit: [],
    time: '',
    medName: '',
    multiline: 'Controlled',
  };
  componentWillMount() {
    Auth.StaffAuthorize(this);
  }

  updateStudents = newArray => {
    this.setState({ allStudents: newArray });
  };
  handleSubmit = async event => {
    event.preventDefault();
    let idArray = [];
    this.state.allStudents.map(student => {
      if (student.selected === true) {
        idArray.push(student.id);
      }
    });
    console.log(idArray);
    await this.setState({ studentIdsToSubmit: idArray });
    if (this.state.studentIdsToSubmit.length === 0)
      alert('No student selected');
    else this.state.studentIdsToSubmit.map(id => this.postMeds(id));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setMedTime = time => {
    this.setState({ time: time });
  };

  postMeds = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/medicine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time: this.state.time,
        medName: this.state.medName,
        date: date,
      }),
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => console.log(resp));
  };

  render() {
    const { classes } = this.props;
    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar type={this.state.userType} />
          <MultiSelectContainer
            orgId={this.state.orgId}
            allStudents={this.state.allStudents}
            updateStudents={this.updateStudents}
          />

          <div className="addmeds-container">
            <div className="addmeds-item1">
              <Timepicker setTime={this.setMedTime} />
            </div>
            <div className="addmeds-item2">
              <TextField
                required
                label="Medicines Administered"
                className={classes.textField}
                value={this.state.medName}
                rows='5'
                onChange={this.handleChange('medName')}
                multiline
                margin="normal"
                variant="outlined"
              />
            </div>

            <Button
              className={classes.submitbutton}
              color='primary'
              onClick={this.handleSubmit}
            >
              Add Activity
            </Button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

AddMeds.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMeds);
