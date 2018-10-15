import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import "./Schedule.css";
import Table from "@material-ui/core/Table";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import indigo from "@material-ui/core/colors/indigo";
import moment from "moment";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import TimePicker from "../../components/TimePicker/TimePicker";
import Auth from '../../utils/Auth';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: indigo[500],
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "75vw",
    marginTop: theme.spacing.unit * 3
    // overflowX: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  childInfo: {
    margin: "15px"
  },
  table: {
    minWidth: 700
  },
  searchSubmit: {
    marginTop: "25px"
  },
  submitGuardian: {
    marginTop: "25px"
  },
  submitActivity: {
    marginTop: "25px"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class Schedule extends Component {
  state = {
    category: "",
    startTime: "",
    endTime: "",
    description: "",
    role: "",
    scheduledActivities: [],
    monActivities: [],
    tuesActivities: [],
    wedActivities: [],
    thursActivities: [],
    friActivities: [],
    orgName: "",
    orgPhone: "",
    orgOpenTime: "",
    orgCloseTime: "",
    userType: "",
    validationErrorMssg:"",
    guardianValidationErrorMssg:"",
    days:["Monday","Tuesday","Wednesday","Thursday","Friday"]
  };

  timepickerState1 = React.createRef();
  timepickerState2 = React.createRef();

  async componentWillMount() {
    let data = await (await fetch('/auth/loggedin')).json();
    if (data.userType === 'staff') {
      await Auth.StaffAuthorize(this);
      this.setState({userType: data.userType})
    } else {
      await Auth.ParentAuthorize(this);
      console.log(this.state);
      this.setState({userType: data.userType})


    }  
  }

  getActivities = day => {
    fetch(`/api/orgschedule/${day}`)
      .then(resp => resp.json())
      .then(resp => {
            console.log(resp);
            switch(day){
              case "Moday": this.setState({ monActivities: resp }); break;
              case "Tuesday": this.setState({ tuesActivities: resp }); break;
              case "Wednesday": this.setState({ wedActivities: resp }); break;
              case "Thursday": this.setState({ thursActivities: resp }); break;
              case "Friday": this.setState({ friActivities: resp }); break;
            }
            
          })
  }

 
  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmitNewActivity = async (e, day) => {
    e.preventDefault();
    let startTime = this.timepickerState1.current.returnTime();
    let endTime = this.timepickerState2.current.returnTime();
    console.log('START AND END', startTime, endTime);
    await this.setState({startTime: startTime, endTime: endTime})
    let url = window.location.href;
    url = url.substring(0, url.length - 14);

    let newObj = {
      category: this.state.category,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description,
      day: day
    };
    console.log(newObj);
    await this.setState({ addActivity: newObj });
    fetch(`/api/orgschedule`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newObj)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (resp.id) {
          this.setState(
            {
              status: "Activity Added!",
              category: "",
              startTime: "",
              endTime: "",
              description: "",
              validationErrorMssg:""
            },
          );
        } 
      });
  };

  renderActivityInput = day => {
    const { classes } = this.props;
    if (this.state.userType === "staff")
      return (
        <div className="add-daily-activity">
            <form>
              <InputLabel htmlFor="activity-category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                inputProps={{
                  name: 'category',
                  id: 'category-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Snack"}>Snack</MenuItem>
                <MenuItem value={"Nap"}>Nap</MenuItem>
                <MenuItem value={"Recreation"}>Recreation</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
              </Select>

              <div className="addactivity-starttime">
                <TimePicker ref={this.timepickerState1} setTime={this.setstartTime} />
              </div>

              <div className="addactivity-endtime">
                <TimePicker ref={this.timepickerState2} setTime={this.setendTime} />
              </div>

              <TextField
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
                id="description"
                label="Activity Description"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <Button
                className={classes.submitActivity}
                onClick={(e) => {this.handleSubmitNewActivity(e, day)}}
                type="submit"
              >
                Add Activity to Schedule
              </Button>
            </form>
          
          <div>{this.state.status}</div>
          <div className="validationerror">{this.state.validationErrorMssg}</div>
        </div>
      );
    else if (this.state.role === "parent") return <div />;
  }

  renderDaySchedule = day =>  {
    const { classes } = this.props;
    // switch(day){
    //   case "Moday": this.setState({scheduledActivities: this.state.monActivities});
    //   case "Tuesday": this.setState({scheduledActivities: this.state.tuesActivities});
    //   case "Wednesday": this.setState({scheduledActivities: this.state.wedActivities});
    //   case "Thursday": this.setState({scheduledActivities: this.state.thursActivities});
    //   case "Friday": this.setState({scheduledActivities: this.state.friActivities});
    // }
    if (this.state.monActivities.length > 0) {
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow key="header">
                <CustomTableCell>Category</CustomTableCell>
                <CustomTableCell>Start Time</CustomTableCell>
                <CustomTableCell>End Time</CustomTableCell>
                <CustomTableCell>Activity</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.monActivities.map(activity => {
                return (
                  <TableRow key={activity.id}>
                    <CustomTableCell>{activity.name}</CustomTableCell>
                    <CustomTableCell>{activity.phone}</CustomTableCell>
                    <CustomTableCell>{activity.email}</CustomTableCell>
                    <CustomTableCell>{activity.address}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      );
    } else {
      return <div>No Scheduled Activities Today!</div>;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <HeaderBar />  
          <div className={classes.root}>
            {this.state.days.map(day=>{
              return(<ExpansionPanel key={day}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    {day}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    {this.renderDaySchedule(day)}
                  </div>
                </ExpansionPanelDetails>
                {this.renderActivityInput(day)}
              </ExpansionPanel>)              
            })}



            
            {/* <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Monday
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {this.renderDaySchedule()}
                </div>
              </ExpansionPanelDetails>
              {this.renderActivityInput()}
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Tuesday
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {this.renderDaySchedule()}
                </div>            
              </ExpansionPanelDetails>
              {this.renderActivityInput()}
            </ExpansionPanel>
          
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Wednesday
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {this.renderDaySchedule()}
                </div>  
              </ExpansionPanelDetails>
              {this.renderActivityInput()}
            </ExpansionPanel>
            
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Thursday
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {this.renderDaySchedule()}
                </div>  
              </ExpansionPanelDetails>
              {this.renderActivityInput()}
            </ExpansionPanel>
            
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Friday
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {this.renderDaySchedule()}
                </div>  
              </ExpansionPanelDetails>
              {this.renderActivityInput()}
            </ExpansionPanel> */}

            {/* <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Upcoming Dates to Note
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {/* render Monday table & input fields */}
                {/* </div>
              </ExpansionPanelDetails>
            </ExpansionPanel> */}
          </div>
      </div>
    );
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Schedule);
