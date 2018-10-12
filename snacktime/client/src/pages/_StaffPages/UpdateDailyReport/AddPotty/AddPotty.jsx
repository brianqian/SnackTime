import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HeaderBar from "../../../../components/HeaderBar/HeaderBar";
// import Label from '@material-ui/core/Label';
import DateTimeSelector from "../../../../components/DateTimeSelector/DateTimeSelector";
import { Redirect } from "react-router-dom";
import Auth from "../../../../utils/Auth";
import MultiSelectContainer from "../MultiSelect/MultiSelectContainer";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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

class AddPotty extends React.Component {
  state = {
    //selectedStudents: this.props.location.state.selectedStudents,
    allStudents: [],
    studentIdsToSubmit: [],
    pottyTime: "",
    place: "",
    type: "",
    multiline: "Controlled"
  };

  async componentWillMount() {
    Auth.StaffAuthorize(this);
  }

  updateStudents = newArray => {
    this.setState({ allStudents: newArray });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let idArray = []
    this.state.allStudents.map(student => {
      if (student.selected === true) {
        idArray.push(student.id);
      }
    });
    console.log(idArray);
    await this.setState({ studentIdsToSubmit: idArray });

    this.state.studentIdsToSubmit.map(id => this.postPotty(id));
  };
  logState = () => {
    console.log(this.state);
  };
  handleClick = (name, value) => {
    // console.log("Sasha says this has been clicked");
    this.setState({ [name]: value });
  };
  // handleClick = event => {
  //   console.log(event.target);
  //   const name = event.target.name
  //   event.preventDefault();
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  setPottyTime = time => {
    this.setState({ pottyTime: time });
  };

  postPotty = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    console.log(`PLACE`, this.state.place);
    console.log(`TYPE`, this.state.type);
    fetch(`/api/student/${id}/diapering`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time: this.state.pottyTime,
        place: this.state.place,
        type: this.state.type,
        date: date
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
    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar type={this.state.userType} />
          <MultiSelectContainer
            orgId={this.state.orgId}
            allStudents={this.state.allStudents}
            updateStudents={this.updateStudents}
          />
          <button onClick={this.logState} />

          <form className={classes.container} noValidate autoComplete="off">
            <DateTimeSelector
              label="Potty Time: "
              name="pottyTime"
              className={classes.textField}
              value={this.state.pottyTime}
              setTime={this.setPottyTime}
              //onChange={this.handleChange}
              //   onChange={this.handleSelectorChange}
              //   margin="normal"
              //   variant="outlined"
            />
            <hr />
            <Button
              name="place"
              value="Diaper"
              onClick={() => this.handleClick("place", "Diaper")}
            >
              Diaper
            </Button>
            <Button
              name="place"
              value="Potty"
              onClick={() => this.handleClick("place", "Potty")}
            >
              Potty
            </Button>
            <Button
              name="place"
              value="Accident"
              onClick={() => this.handleClick("place", "Accident")}
            >
              Accident
            </Button>
            <hr />
            <Button
              name="type"
              value="Wet"
              onClick={() => this.handleClick("type", "Wet")}
            >
              Wet
            </Button>
            <Button
              name="type"
              value="BM"
              onClick={() => this.handleClick("type", "BM")}
            >
              BM
            </Button>
            <Button
              name="type"
              value="Dry"
              onClick={() => this.handleClick("type", "Dry")}
            >
              Dry
            </Button>
            <hr />
            <Button onClick={this.handleSubmit}>Add Activity</Button>
          </form>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

AddPotty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddPotty);
