import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector'
import { Redirect } from "react-router-dom";
import Auth from '../../../../utils/Auth'
import MultiSelectContainer from "../MultiSelect/MultiSelectContainer";


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

  updateStudents = (newArray) => {
    this.setState({ allStudents: newArray });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let idArray = []
    this.state.allStudents.map(student=> {
      if (student.selected === true){
         idArray.push(student.id)
      }
    })
    console.log(idArray);
    await this.setState({studentIdsToSubmit: idArray})

    this.state.studentIdsToSubmit.map(id => this.postMeds(id));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setMedTime = time => {
    this.setState({ time: time })
  }

  postMeds = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/medicine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time: this.state.time,
        medName: this.state.medName,
        date: date,
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
    if(this.state.loggedIn){
    return (
      <div>  
      <HeaderBar type={this.state.userType} />  
      <MultiSelectContainer
            orgId={this.state.orgId}
            allStudents={this.state.allStudents}
            updateStudents={this.updateStudents}
          />

      <form className={classes.container} noValidate autoComplete="off">
        <DateTimeSelector
          label="Time: "
          name="time"
          className={classes.textField}
          value={this.state.time}
          setTime={this.setMedTime}
        //   onChange={this.handleSelectorChange}
        //   margin="normal"
        //   variant="outlined"
        />
        <hr/>
        <TextField
          required
          label="Medications Administered"
          className={classes.textField}
          value={this.state.medName}
          onChange={this.handleChange('medName')}
          multiline
          margin="normal"
          variant="outlined" 
        />
        <hr/>
        <Button
        onClick={this.handleSubmit}
        >
        Add Activity
        </Button>
      </form>
      </div>
    );
    }else{
      return <div/>
    }
  }
}

AddMeds.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMeds);