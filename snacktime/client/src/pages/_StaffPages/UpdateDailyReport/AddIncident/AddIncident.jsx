import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HeaderBar from "../../../../components/HeaderBar/HeaderBar";
import { Redirect } from "react-router-dom";
import Auth from "../../../../utils/Auth";
import MultiSelectContainer from "../MultiSelect/MultiSelectContainer";
import Timepicker from "../../../../components/TimePicker/TimePicker";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import './AddIncident.css'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  submitbutton:{
    marginTop:25,
    height:10
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

class AddIncident extends React.Component {
  state = {
    selectedStudents: [],
    time: "",
    incident: "",
    multiline: "Controlled",
    allStudents: [],
    studentIdsToSubmit: []
  };

  timepickerState = React.createRef();

  async componentWillMount() {
    Auth.StaffAuthorize(this);
    console.log("hello");
  }
  updateStudents = newArray => {
    this.setState({ allStudents: newArray });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const time = this.timepickerState.current.returnTime();
    await this.setState({time})
    let idArray = [];
    this.state.allStudents.map(student => {
      if (student.selected === true) {
        idArray.push(student.id);
      }
    });
    console.log(idArray);
    await this.setState({ studentIdsToSubmit: idArray });
    if(this.state.studentIdsToSubmit.length===0)
      this.handleClick();
    else
      this.state.studentIdsToSubmit.map(id => this.postIncident(id));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
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

  handleClick = () => {
    this.setState({ open: true });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
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

          <form className={classes.container} noValidate autoComplete="off">
            <Timepicker ref={this.timepickerState} setTime={this.setIncidentTime} />

            <hr />
            <TextField
              required
              label="Indcident"
              className={classes.textField}
              value={this.state.medName}
              onChange={this.handleChange("incident")}
              multiline
              margin="normal"
              variant="outlined"
            />
            <hr />
            <Button className={classes.submitbutton} onClick={this.handleSubmit}>Add Activity</Button>
          </form>
          <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">No Student Selected</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        </div>
      );
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: "/notAuthorized",
            state: {
              type: "Staff",
              location: "/dailyreport/addincident"
            }
          }}
        />
      );
    } else {
      return <div />;
    }
  }
}

AddIncident.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddIncident);
