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
      activities:[],
      orgId:this.props.orgId
    };

    async componentDidMount(){
        console.log(this.props)
        await this.setState({orgId: this.props.orgId})
        console.log(this.state)
        console.log(`/api/orgschedule/${this.state.orgId}/day/${this.state.day}`)
        fetch(`/api/orgschedule/${this.state.orgId}/day/${this.state.day}`)
        .then(res=>res.json())
        .then(resp =>{
            this.setState({activities: resp})})
        
    }

    render() {
        const {classes} = this.props
        console.log(this.props.orgId)
        if (this.state.activities.length > 0) {
            return (
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow key="header">
                      <CustomTableCell>Start Time</CustomTableCell>
                      <CustomTableCell>End Time</CustomTableCell>
                      <CustomTableCell>Activity</CustomTableCell>
                      <CustomTableCell>Category</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.activities.map(activity => {
                      return (
                        <TableRow key={activity.id}>
                          <CustomTableCell>{activity.activityStartTime}</CustomTableCell>
                          <CustomTableCell>{activity.activityEndTime}</CustomTableCell>
                          <CustomTableCell>{activity.activityName}</CustomTableCell>
                          <CustomTableCell>{activity.activityCategory}</CustomTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            );
          } else {
            return <div>No Scheduled Activities!</div>;
          }
  }
  }
  
  DaySchedule.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DaySchedule);