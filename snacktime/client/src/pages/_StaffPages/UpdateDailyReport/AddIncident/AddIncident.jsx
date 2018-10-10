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


class AddIncident extends React.Component {
  state = {
    selectedStudents: this.props.location.state.selectedStudents,
    time: '',
    incident: '',
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setIncidentTime = time => {
    this.setState({ time: time })
  }

  postIncident = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/incident`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time: this.state.time,
        incident: this.state.incident,
        date: date
      })
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => console.log(resp));
  };

  handleSubmit = event => {
    event.preventDefault();

    this.state.selectedStudents.map(id => this.postIncident(id));
  };  

  render() {
    const { classes } = this.props;

    return (
      <div>  
      <HeaderBar />  
      <form className={classes.container} noValidate autoComplete="off">

        <DateTimeSelector
          label="Time: "
          name="time"
          className={classes.textField}
          value={this.state.time}
          setTime={this.setIncidentTime}
        //   onChange={this.handleSelectorChange}
        //   margin="normal"
        //   variant="outlined"
        />
        <hr/>
        <TextField
          required
          label="Indcident"
          className={classes.textField}
          value={this.state.medName}
          onChange={this.handleChange('incident')}
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
  }
}

AddIncident.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddIncident);