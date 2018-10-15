import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import TimePicker from "../../../components/TimePicker/TimePicker";
import TextField from "@material-ui/core/TextField";



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
  class DayScheduleForm extends React.Component {
    state = { 
      day: this.props.day,
      orgId: this.props.orgId
    };

    timepickerState1 = React.createRef();
    timepickerState2 = React.createRef();

    componentWillMount(){
       
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
            } 
          });
      };
    

    render() {
        const {classes} = this.props
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
                onClick={(e) => {this.handleSubmitNewActivity(e, this.state.day)}}
                type="submit"
              >
                Add Activity to Schedule
              </Button>
            </form>
            </div>
        )
        
  }
}
  
  DayScheduleForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DayScheduleForm);