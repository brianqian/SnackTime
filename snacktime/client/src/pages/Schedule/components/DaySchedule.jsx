import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import DashboardItem from "../../../components/DashboardItem/DashboardItem";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import indigo from "@material-ui/core/colors/indigo";
import moment from "moment";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import TimePicker from "../../../components/TimePicker/TimePicker";
import TextField from "@material-ui/core/TextField";
import ResponsiveTable from "../../SingleStudent/components/ResponsiveTable"

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
  class DaySchedule extends React.Component {
    state = { 
      day: this.props.day,
      activities:[[null]],
      orgId:this.props.orgId,
      role:this.props.role
    };

        timepickerState1 = React.createRef();
    timepickerState2 = React.createRef();

     componentDidMount(){
      this.renderInfo();
        
    }
    renderInfo = async ()=>{
      await this.setState({orgId: this.props.orgId})
      fetch(`/api/orgschedule/${this.state.orgId}/day/${this.state.day}`)
      .then(res=>res.json())
      .then(resp =>{
        let allActivities = [];
        resp.forEach(activity => {
          let activityRow = [];
          activityRow.push(moment(activity.activityStartTime, "HH:mm:ss").format("hh:mm A"),moment(activity.activityEndTime, "HH:mm:ss").format("hh:mm A"), activity.activityCategory, activity.activityName);
          allActivities.push(activityRow);
        });
        this.setState({ activityData: allActivities})})
    }

    handleChange = e =>{
      const { name, value } = e.target;

  this.setState({
    [name]: value
  });
  }

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
        day: day,
        orgId: this.state.orgId
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
            this.renderInfo()
          } 
        });
    };

    render() {
        const {classes} = this.props
        console.log(this.props.orgId)
        if (this.state.activities.length > 0) {
            return (
              <div>
                <div>
                  <ResponsiveTable title="Schedule" columns={["Start Time", "End Time", "Category","Activity"]} data={this.state.activityData} />
                </div>
                {this.state.role=== 'staff'&& <div className="add-daily-activity">
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
                      onClick={(e) => {this.handleSubmitNewActivity(e, this.state.day)}}
                      type="submit"
                    >
                      Add Activity to Schedule
                    </Button>
                  </form>
                </div>
              }
              </div>  
            );
          } else {
            return <div><div>No Scheduled Activities!</div>
            {this.state.role=== 'staff'&& <div className="add-daily-activity">
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
                      onClick={(e) => {this.handleSubmitNewActivity(e, this.state.day)}}
                      type="submit"
                    >
                      Add Activity to Schedule
                    </Button>
                  </form>
                </div>
              }</div>;
          }
  }
  }
  
  DaySchedule.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DaySchedule);