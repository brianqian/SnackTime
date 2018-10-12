import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function toJSONLocal(date) {
  var local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 16);
}

var d = new Date(); // 
var n = toJSONLocal(d);
// console.log(n);

class TimePicker extends React.Component {
  state = {
    time: n
  };

  handleChange = (event,name) => {
    console.log("event.target.value", event.target.value);
    console.log("name:",name)
    this.setState({
      [name]: event.target.value
    }, function(){this.props.setTime(this.state.time)});
    
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          label={this.props.label}
          type="time"
          name="time"
          onChange={(e) => {
            this.handleChange(e, "time")}}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    );
  }
}

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimePicker);
