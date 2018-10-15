import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
// import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector';
// import { Redirect } from 'react-router-dom';
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from '../MultiSelect/MultiSelectContainer';
import Timepicker from '../../../../components/TimePicker/TimePicker';
import './AddMeds.css'
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect } from 'react-router-dom'

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
    snackbarMessage: 'No student selected'
  };

  timepickerState = React.createRef();
  componentWillMount() {
    Auth.StaffAuthorize(this);
  }

  updateStudents = newArray => {
    this.setState({ allStudents: newArray });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const time = this.timepickerState.current.returnTime();
    await this.setState({ time })
    let idArray = [];
    this.state.allStudents.map(student => {
      if (student.selected === true) {
        idArray.push(student.id);
      }
    });
    await this.setState({ studentIdsToSubmit: idArray });
    if (this.state.studentIdsToSubmit.length === 0)
      this.handleClickSnackbar();
    else this.state.studentIdsToSubmit.map(id => this.postMeds(id));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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
      .then(resp => {
        console.log("Resp2:", resp)
        if (resp.errors) {
          if (resp.errors.length > 0) {
            if (resp.errors[0].message === "Validation notEmpty on medName failed")
              this.setState({ snackbarMessage: "Please write medicine name" }, this.handleClickSnackbar())
          }
        } else if (resp) {
          this.setState({ snackbarMessage: "Medication added." },
            this.handleClickSnackbar())
        }
      });
  };

  handleClickSnackbar = () => {
    this.setState({ open: true });
  };
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false, studentIdsToSubmit: [], snackbarMessage: 'No student selected' });
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
              <Timepicker ref={this.timepickerState} setTime={this.setMedTime} />
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
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleCloseSnackbar}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.snackbarMessage}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleCloseSnackbar}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      );
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: "/notAuthorized",
            state: {
              type: "Staff",
              location: '/dailyreport/addmeds'
            }
          }}
        />
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
