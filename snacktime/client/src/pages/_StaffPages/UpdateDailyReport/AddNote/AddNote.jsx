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


class AddNote extends React.Component {
  state = {
    selectedStudents: this.props.location.state.selectedStudents,
    time: '',
    note: '',
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setNoteTime = time => {
    this.setState({ time: time })
  }

  postNote = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: this.state.studentId,
        time: this.state.time,
        note: this.state.medName,
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

    this.state.selectedStudents.map(id => this.postNap(id));
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
          setTime={this.setNoteTime}
        //   onChange={this.handleSelectorChange}
        //   margin="normal"
        //   variant="outlined"
        />
        <hr/>
        <TextField
          required
          label="Note"
          className={classes.textField}
          value={this.state.medName}
          onChange={this.handleChange('note')}
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

AddNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNote);