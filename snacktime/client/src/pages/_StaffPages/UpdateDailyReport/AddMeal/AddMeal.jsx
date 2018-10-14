import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
// import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector';
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from '../MultiSelect/MultiSelectContainer';
import Timepicker from '../../../../components/TimePicker/TimePicker';
import './AddMeal.css';
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

const types = [
  {
    value: 'Breakfast',
    label: 'Breakfast',
  },
  {
    value: 'AM Snack',
    label: 'AM Snack',
  },
  {
    value: 'Lunch',
    label: 'Lunch',
  },
  {
    value: 'PM Snack',
    label: 'PM Snack',
  },
  {
    value: 'Dinner',
    label: 'Dinner',
  },
  {
    value: 'Late Snack',
    label: 'Late Snack',
  },
];

class AddMeal extends React.Component {
  state = {
    allStudents: [],
    studentIdsToSubmit: [],
    studentId: '',
    time: '',
    food: '',
    type: 'Breakfast',
    multiline: 'Controlled',
    snackbarMessage:'No student selected'
  };

  async componentWillMount() {
    await Auth.StaffAuthorize(this);
  }

  updateStudents = newArray => {
    this.setState({ allStudents: newArray });
  };

  handleSubmit = event => {
    event.preventDefault();
    let idArray = [];

    this.state.allStudents.map(student => {
      if (student.selected === true) {
        console.log('pushing', student.id);
        idArray.push(student.id);
      }
    });
    console.log(idArray);
    this.setState({ studentIdsToSubmit: idArray }, function() {
      if (this.state.studentIdsToSubmit.length === 0)
        this.handleClickSnackbar();
      else
        this.state.studentIdsToSubmit.map(id => {
          console.log('Student to submit', id);
          this.postMeal(id);
        });
    });
  };
  logState = () => {
    console.log(this.state);
  };

  setMealTime = time => {
    this.setState({ time: time });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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

  postMeal = id => {
    console.log('INSIDE POST MEAL, LOOKING FOR ID VALUE', id);
    let today = new Date();
    //prettier-ignore
    let date = today.getFullYear() +'-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/meal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: date,
        time: this.state.time,
        food: this.state.food,
        type: this.state.type,
      }),
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => {console.log("Resp2:",resp)
      if(resp.errors){
        if(resp.errors.length>0){
          if(resp.errors[0].message === "Validation notEmpty on food failed")
            this.setState({snackbarMessage:"Please write meal items"}, this.handleClickSnackbar())
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
          <div className="addmeal-container">
            <div className="addmeal-item1">
              <Timepicker setTime={this.setMealTime} />
            </div>
            <div className="addmeal-item2">
              <TextField
                id="standard-select-type-native"
                select
                label="Type: "
                name="type"
                className={classes.textField}
                value={this.state.type}
                onChange={this.handleChange('type')}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {types.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
            <div className="addmeal-item3">
              <TextField
                required
                label="Meal Items"
                className={classes.textField}
                value={this.state.food}
                onChange={this.handleChange('food')}
                multiline
                rows='5'
                margin="normal"
                variant="outlined"
              />

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

AddMeal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMeal);
