import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import StudentDOB from "./components/NativeSelect";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import Auth from "../../../utils/Auth";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    padding: "0 10px",
    width: "75vw",
    margin: "auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  one: {

    gridRow: 1
  },
  two: {
    gridColumnEnd: "4",
    gridRow: 1
  },
  rowTwo: {

    gridRow: 2
  },
  rowThree: {

    gridRow: 3
  },
  button: {
    gridRow: 4,
    gridColumn: "2/4",
    background: "transparent",
    boxShadow: "0 0 0"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  center: {
  
  }
});

class OutlinedTextFields extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    month: "",
    day: "",
    year: "",
    notes: "",
    allergies: "",
    meds: "",
    doctor: "",
    address: "",
    city: "",
    zip: "",
    orgId: "",
    loggedIn: false,
    loginRejected: false,
    multiline: "Controlled"
    //staffs:[]
  };

  componentWillMount = () => {
    Auth.StaffAuthorize(this);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSelectorChange = (type, data) => {
    console.log("Inside handleSelectorChangex");
    console.log("data: ", data);
    console.log("type: ", type);
    if (type[0] === "month") {
      console.log("inside month");
      this.setState({ month: data });
    } else if (type[0] === "day") {
      console.log("inside day");
      this.setState({ day: data });
    } else if (type[0] === "year") {
      console.log("inside year");
      this.setState({ year: data });
    }
  };

  capitalize = name => {
    const names = name.split(" ");
    for (var i = 0; i < names.length; i++) {
      names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
    }
    return names.join(" ");
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(`/api/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.capitalize(this.state.firstName + " " + this.state.lastName),
        address: `${this.state.address},  ${this.state.city}, ${this.state.state} ${this.state.zip}`,
        dob: `${this.state.month}, ${this.state.day}, ${this.state.year}`,
        notes: this.state.notes,
        allergies: this.state.allergies,
        medication: this.state.meds,
        doctor: this.capitalize(this.state.doctor),
        orgId: this.state.orgId
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.name !== "SequelizeValidationError") {
          this.handleClick();
        }
      });
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

    return (
      <div className={classes.center}>
        <HeaderBar type={this.state.userType} />
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            id="outlined-name"
            label="firstName"
            name="firstName"
            className={`${classes.textField} ${classes.one}`}
            value={this.state.firstName}
            onChange={this.handleChange("firstName")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-name"
            label="lastName"
            name="lastName"
            className={`${classes.textField} ${classes.one}`}
            value={this.state.lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
            variant="outlined"
          />
          <StudentDOB
            required
            id="outlined-birthday"
            label="DOB"
            className={`${classes.textField} ${classes.two}`}
            value={this.state.dob}
            onChange={this.handleSelectorChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-notes"
            label="Notes"
            defaultValue=""
            className={`${classes.textField} ${classes.rowTwo}`}
            value={this.state.notes}
            onChange={this.handleChange("notes")}
            multiline
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-allergies"
            label="Allergies"
            defaultValue=""
            className={`${classes.textField} ${classes.rowTwo}`}
            value={this.state.allergies}
            onChange={this.handleChange("allergies")}
            multiline
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-meds"
            label="Medications"
            defaultValue=""
            className={`${classes.textField} ${classes.rowTwo}`}
            value={this.state.meds}
            onChange={this.handleChange("meds")}
            multiline
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-doctor"
            label="Doctor"
            defaultValue=""
            className={`${classes.textField} ${classes.rowTwo}`}
            value={this.state.doctor}
            onChange={this.handleChange("doctor")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-address"
            label="Address"
            defaultValue=""
            className={`${classes.textField} ${classes.rowThree}`}
            value={this.state.address}
            onChange={this.handleChange("address")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-city"
            label="City"
            defaultValue=""
            className={`${classes.textField} ${classes.rowThree}`}
            value={this.state.city}
            onChange={this.handleChange("city")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-city"
            label="State"
            defaultValue=""
            className={`${classes.textField} ${classes.rowThree}`}
            value={this.state.state}
            onChange={this.handleChange("state")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-zip"
            label="Zip / Postal Code"
            defaultValue=""
            className={`${classes.textField} ${classes.rowThree}`}
            value={this.state.zip}
            onChange={this.handleChange("zip")}
            margin="normal"
            variant="outlined"
          />
          {/* <InputLabel htmlFor="age-simple">Staff</InputLabel>
          <Select
            native
            name='staff'
            value=""
            //onChange={this.handleChange}
            inputProps={{
              name: 'staff',
              id: 'age-simple',
            }}
          >
          <option value=""></option>
          <option></option>

          </Select> */}
          <Button
            variant="contained"
            size="small"
            onClick={this.handleSubmit}
            className={`${classes.button}`}
          >
            <SaveIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Save
          </Button>
        </form>
        {/* <Button onClick={this.handleClick}>Open simple snackbar</Button> */}
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
          message={<span id="message-id">Student Added</span>}
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
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedTextFields);
