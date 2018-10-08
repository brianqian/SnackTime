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
    selectedStudents: [],
    selectedStudentsId: [],
    napStart: '',
    napEnd: '',
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(`/report/:reportId`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json'},
      body: JSON.stringify({
        studentId: this.state.studentId,
        napStart: this.state.napStart,
        napEnd: this.state.napEnd,
      }),
    });  
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <HeaderBar />
      <form className={classes.container} noValidate autoComplete="off">

        <DateTimeSelector
          label="Start Time: "
          className={classes.textField}
          value={this.state.napStart}
        //   onChange={this.handleSelectorChange}
        //   margin="normal"
        //   variant="outlined"
        />
        <hr/>
        <DateTimeSelector
          label="End Time: "
          className={classes.textField}
          value={this.state.napEnd}
        //   onChange={this.handleSelectorChange}
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