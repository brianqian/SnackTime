import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
// import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector';
// import { Redirect } from 'react-router-dom';
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from '../MultiSelect/MultiSelectContainer';
import Timepicker from '../../../../components/TimePicker/TimePicker';
import './AddPotty.css';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// var bgColors = {
//   Default: '#81b71a',
//   Blue: '#00B1E1',
//   Cyan: '#37BC9B',
//   Green: '#8CC152',
//   Red: '#E9573F',
//   Yellow: '#F6BB42',
// };

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  submitbutton: {
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

class AddPotty extends React.Component {
  state = {
    //selectedStudents: this.props.location.state.selectedStudents,
    allStudents: [],
    studentIdsToSubmit: [],
    pottyTime: '',
    place: '',
    type: '',
    multiline: 'Controlled',
    variant: '',
    clickedDiaper: 'classes.notclickked',
    clickedPotty: 'classes.notclicked',
    clickedAccident: 'classes.notclicked',
    snackbarMessage:'No student selected'
  };

  async componentWillMount() {
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
      this.handleClickSnackbar();
    else this.state.studentIdsToSubmit.map(id => this.postPotty(id));
  };
  logState = () => {
    console.log(this.state);
  };

  handleClick = (name, value) => {
    this.setState({ [name]: value });
  };

  // handleSelect = async e => {
  //   const name = e.target.getAttribute('class');
  //   console.log('Name', name);
  //   const prevSelect = document.querySelectorAll(`.${name}`);
  //   prevSelect.forEach(num => num.classList.remove('active'));
  //   e.target.classList.add('textPrimary');
  // };

  setPottyTime = time => {
    this.setState({ pottyTime: time });
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

  postPotty = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    console.log(date);
    console.log(`PLACE`, this.state.place);
    console.log(`TYPE`, this.state.type);
    fetch(`/api/student/${id}/diapering`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time: this.state.pottyTime,
        place: this.state.place,
        type: this.state.type,
        date: date,
      }),
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => {console.log("Resp2:",resp)
      if(resp.errors){
        if(resp.errors.length>0){
          if(resp.errors[0].message === "Validation notEmpty on place failed")
            this.setState({snackbarMessage:"Place cannot be empty"}, this.handleClickSnackbar())
          else if(resp.errors[0].message === "Validation notEmpty on type failed")
            this.setState({snackbarMessage:"Type cannot be empty"}, this.handleClickSnackbar())
        }
      }
      });
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

          <div className="addpotty-container">
            <div className="addpotty-item1">
              <Timepicker setTime={this.setPottyTime} />
            </div>
            <div className="addpotty-item2">
              <Button
                className={this.state.clickedDiaper}
                name="place"
                color="primary"
                value="Diaper"
                onClick={() => this.handleClick('place', 'Diaper')}
              >
                Diaper
              </Button>
              <Button
                className="PottyPlace"
                name="place"
                color="primary"
                value="Potty"
                onClick={() => this.handleClick('place', 'Potty')}
              >
                Potty
              </Button>
              <Button
                className="PottyPlace"
                name="place"
                color="primary"
                value="Accident"
                onClick={() => this.handleClick('place', 'Accident')}
              >
                Accident
              </Button>
            </div>
            <div className="addpotty-item3">
              <Button
                className="pottyType"
                name="type"
                value="Wet"
                color="primary"
                onClick={() => this.handleClick('type', 'Wet')}
              >
                Wet
              </Button>
              <Button
                className="pottyType"
                name="type"
                color="primary"
                value="BM"
                onClick={() => this.handleClick('type', 'BM')}
              >
                BM
              </Button>
              <Button
                className="pottyType"
                name="type"
                color="primary"
                value="Dry"
                onClick={() => this.handleClick('type', 'Dry')}
              >
                Dry
              </Button>
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
    } else {
      return <div />;
    }
  }
}

AddPotty.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPotty);
