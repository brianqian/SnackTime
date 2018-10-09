import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
});

class DateTimeSelector extends React.Component {
  state = {
    time: "",
  }
handleChange = event => {
  this.setState({
    [name]: event.target.value,
  });
  this.props.setNap(this)
}

  const { classes } = this.props;
  render() {
  return (
    <form className={classes.container} noValidate>
      <TextField
        label={props.label}
        id="datetime-local"
        type="datetime-local"
        name="time"
        onChange={this.handleChange}
        value={this.state.time}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

DateTimeSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateTimeSelector);
