import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
import { Redirect } from 'react-router-dom';
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from '../MultiSelect/MultiSelectContainer';
import Timepicker from '../../../../components/TimePicker/TimePicker';
import './AddNap.css';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

class AddNap extends React.Component {
  state = {
    //selectedStudents: this.props.location.state.selectedStudents,
    napStart: '',
    napEnd: '',
    multiline: 'Controlled',
    allStudents: [],
    studentIdsToSubmit: [],
    loginRejected: false,
    loggedIn: false,
  };

  async componentWillMount() {
    await Auth.StaffAuthorize(this);
    console.log(this.state.orgId);
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
      this.handleClickSnackbar();
    else this.state.studentIdsToSubmit.map(id => this.postNap(id));
  };

  handleChange = event => {
    console.log(event.target);
    // this.setState({
    //   [name]: event.target.value,
    // });
    console.log('NAP START, END', this.state.napStart, this.state.napEnd);
  };

  setNapStart = time => {
    this.setState({ napStart: time });
  };

  setNapEnd = time => {
    this.setState({ napEnd: time });
  };

  handleClickSnackbar = () => {
    this.setState({ open: true });
  };
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  postNap = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/nap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        napStart: this.state.napStart,
        napEnd: this.state.napEnd,
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
    const { classes, theme } = this.props;

    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar type={this.state.userType} />
          <MultiSelectContainer
            orgId={this.state.orgId}
            allStudents={this.state.allStudents}
            updateStudents={this.updateStudents}
          />

            <div className="addnap-container">
              <div className="addnap-tp-1">
              Nap Start: 
                <Timepicker setTime={this.setNapStart} />
              </div>

              <div className="addnap-tp-2">
              Nap End: 
                <Timepicker className="addnap-tp-2" setTime={this.setNapEnd} />
              </div>

              <Button
                className={classes.submitbutton}
                onClick={this.handleSubmit}
                color='primary'
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
          message={<span id="message-id">No Student Selected</span>}
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
            pathname: '/notAuthorized',
            state: { type: 'Staff' },
          }}
        />
      );
    } else {
      return <div />;
    }
  }
}

AddNap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNap);
