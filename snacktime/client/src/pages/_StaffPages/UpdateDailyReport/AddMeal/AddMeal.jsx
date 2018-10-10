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
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from '../MultiSelect/MultiSelectContainer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
    studentId: '',
    time: '',
    food: '',
    type: 'Breakfast',
    multiline: 'Controlled',
  };

  async componentWillMount() {
    await Auth.StaffAuthorize(this);
  }
  selectStudent = (e) => {
    let item = e.target;
    let studentArray = this.state.allStudents.slice();
    console.log(item.getAttribute('value'))
    console.log(item.classList.contains('selected'))
    if (item.classList.contains('selected')){
      studentArray.find(student=>student.name === item.getAttribute('value')).selected = false;
    } else{
      studentArray.find(student=>student.name === item.getAttribute('value')).selected = true;
    }
    this.setState({allStudents: studentArray})
    item.classList.toggle('selected')

  };
  returnSelectedStudents = student => {
    let array = this.state.allStudents.slice();
    array.push(student);
    this.setState({ allStudents: array });
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

  postMeal = id => {
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
        date: date,
      }),
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => console.log(resp));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.state.allStudents.map(id => this.postMeal(id));
  };

  render() {
    const { classes } = this.props;

    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar />

          <MultiSelectContainer
            selectStudent={this.selectStudent}
            orgId={this.state.orgId}
          />

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
            {/* <hr/>
        <Button
          onClick={this.handleClick}
          name 
          value="food">
          Food
        </Button> 
        <Button
          onClick={this.handleClick} 
          value="bottle">
          Bottle
        </Button>  */}
            <hr />
            {/* <Button value="all">
          All
        </Button> 
        <Button value="most">
          Most
        </Button> 
        <Button value="some">
          Some
        </Button> 
        <Button value="none">
          None
        </Button> 
        <hr/> */}
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
              onChange={this.handleChange('food')}
              margin="normal"
              variant="outlined"
            />
            <hr />
            <Button onClick={this.handleSubmit}>Add Activity</Button>
          </form>
        </div>
      );
    }else{
      return <div/>
    }
  }
  
}

AddMeal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMeal);
