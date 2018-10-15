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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import TimePicker from "../../components/TimePicker/TimePicker";
import Auth from '../../utils/Auth';
import DaySchedule from "./components/DaySchedule"
import DayScheduleForm from "./components/DayScheduleForm"

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
    role: "",
    orgName: "",
    orgPhone: "",
    orgOpenTime: "",
    orgCloseTime: "",
    userType: "",
    orgId:"",
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

  renderActivityInput = day =>{
    if(this.state.userType === "staff"){
    
      return(
        <DayScheduleForm day={day} orgId={this.state.orgId} />
      )
    }
    else if(this.state.userType === "staff")
        return (<div></div>)
  }

  render() {
    const { classes } = this.props;
    console.log("OrgId from schedule:",this.state.orgId)
    if(this.state.loggedIn){
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
                  <DaySchedule day={day} orgId={this.state.orgId} />
                </ExpansionPanelDetails>
                {this.renderActivityInput(day)}
              </ExpansionPanel>)              
            })}
          </div>
      </div>
    );
          }
          else{
            return(<div></div>)
          }
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Schedule);
