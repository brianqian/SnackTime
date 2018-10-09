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


class AddNap extends React.Component {
  state = {
    selectedStudents: this.props.location.state.selectedStudents,
    napStart: '',
    napEnd: '',
    multiline: 'Controlled',
  };

  handleChange = event => {
    console.log(event.target);
    // this.setState({
    //   [name]: event.target.value,
    // });
    console.log('NAP START, END', this.state.napStart, this.state.napEnd);
  };

  setNapStart = (time) => {
    this.setState({ napStart: time })
  }

  setNapEnd = (time) => {
    this.setState({ napEnd: time })
  }

  postNap = id =>{
    let today= new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/nap`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          napStart: this.state.napStart,
          napEnd: this.state.napEnd,
          date: date,
        }),
      })
      .then(resp=>{
        console.log(resp);
        return resp.json()
        })
      .then(resp=> console.log(resp));
  }

  handleSubmit = event => {
    event.preventDefault();

    this.state.selectedStudents.map(id=> this.postNap(id));

    // fetch(`/student/:student/nap`, {
    //   method: 'POST',
    //   headers: { 'Content-Type':'application/json'},
    //   body: JSON.stringify({
    //     studentId: this.state.studentId,
    //     napStart: this.state.napStart,
    //     napEnd: this.state.napEnd,
    //   }),
    // }  
  }



  render() {
    const { classes } = this.props;

    return (
      <div>
      <HeaderBar />
      <form className={classes.container} noValidate autoComplete="off">

        <DateTimeSelector
          label="Start Time: "
          name="napStart"
          className={classes.textField}
          value={this.state.napStart}
          setNapStart={()=> this.setNapStart}
          onChange={this.handleChange}
        //   margin="normal"
        //   variant="outlined"
        />
        <hr/>
        <DateTimeSelector
          label="End Time: "
          name="napEnd"
          className={classes.textField}
          value={this.state.napEnd}
          setNapEnd={()=> this.setNapEnd}
          onChange={this.handleChange}
        //   margin="normal"
        //   variant="outlined" 
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

AddNap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNap);