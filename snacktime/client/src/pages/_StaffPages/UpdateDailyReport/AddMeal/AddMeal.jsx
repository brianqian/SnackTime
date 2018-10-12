import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HeaderBar from "../../../../components/HeaderBar/HeaderBar";
// import Label from '@material-ui/core/Label';
import DateTimeSelector from "../../../../components/DateTimeSelector/DateTimeSelector";
import Auth from "../../../../utils/Auth";
import MultiSelectContainer from "../MultiSelect/MultiSelectContainer";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const types = [
  {
    value: "Breakfast",
    label: "Breakfast"
  },
  {
    value: "AM Snack",
    label: "AM Snack"
  },
  {
    value: "Lunch",
    label: "Lunch"
  },
  {
    value: "PM Snack",
    label: "PM Snack"
  },
  {
    value: "Dinner",
    label: "Dinner"
  },
  {
    value: "Late Snack",
    label: "Late Snack"
  }
];

class AddMeal extends React.Component {
  state = {
    allStudents: [],
    studentIdsToSubmit: [],
    studentId: "",
    time: "",
    food: "",
    type: "Breakfast",
    multiline: "Controlled"
  };

  async componentWillMount() {
    await Auth.StaffAuthorize(this);
  }

  updateStudents = newArray => {
    this.setState({ allStudents: newArray });
  };

  handleSubmit = (event) =>{
    event.preventDefault();
    let idArray = [];
    
    this.state.allStudents.map(student => {
      if (student.selected === true) {
        console.log("pushing", student.id);
        idArray.push(student.id);
      }
    });
    console.log(idArray);
    this.setState({ studentIdsToSubmit: idArray }, function() {
      this.state.studentIdsToSubmit.map(id => {
        console.log("Student to submit", id);
        this.postMeal(id);
      });
    });
  }
  logState = () => {
    console.log(this.state);
  };

  setMealTime = time => {
    this.setState({ time: time });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  postMeal = id => {
    console.log("INSIDE POST MEAL, LOOKING FOR ID VALUE", id);
    let today = new Date();
    //prettier-ignore
    let date = today.getFullYear() +'-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/meal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date,
        time: this.state.time,
        food: this.state.food,
        type: this.state.type
      })
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
          <button onClick={this.logState} />
          <form className={classes.container} noValidate autoComplete="off">
            <DateTimeSelector
              name="mealTime"
              setTime={this.setMealTime}
              label="Time: "
              className={classes.textField}
              value={this.state.time}
              //   onChange={this.handleChange}
              //   margin="normal"
              //   variant="outlined"
            />
           
            <hr />
            
            <TextField
              id="standard-select-type-native"
              select
              label="Type: "
              name="type"
              className={classes.textField}
              value={this.state.type}
              onChange={this.handleChange("type")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              //   helperText="Please select your currency"
              margin="normal"
            >
              {types.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <hr />
            <TextField
              required
              label="Meal Items"
              className={classes.textField}
              value={this.state.food}
              onChange={this.handleChange("food")}
              multiline
              margin="normal"
              variant="outlined"
            />
            <hr />
            <Button onClick={this.handleSubmit}>Add Activity</Button>
          </form>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

AddMeal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddMeal);
