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


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    height: 200,
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
    time: '',
    note: '',
    id: this.props.location.state.id,
    name:this.props.location.state.name,
    reportId: '',
    multiline: 'Controlled',
    noteExists:false
  };
  componentWillMount() {
    console.log(this.state.id);
    Auth.StaffAuthorize(this);
    this.getNote();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getNote= () =>{
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    fetch(`/api/student/${this.state.id}/report/${date}`)
    .then(resp=>resp.json())
    .then(resp=>{
      console.log(resp);
      if(resp !== "No Notes"){
        this.setState({note:resp.noteForParents, noteExists:true, reportId: resp.id})
      }
    })
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
    fetch(`/api/student/${this.state.id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: this.state.id,
        noteForParents: this.state.note,
        date: date
      })
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => console.log(resp));
  };

  updateNote = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    fetch(`/api/report/${this.state.reportId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        noteForParents: this.state.note,
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
    if(this.state.noteExists)
      this.updateNote(this.state.id)
    else
      this.postNote(this.state.id);
  };  

  render() {
    const { classes } = this.props;
    return (
      <div>  
      <HeaderBar />  
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          label={this.state.name}
          className={classes.textField}
          value={this.state.note}
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