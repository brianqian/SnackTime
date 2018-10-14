import React, { Component } from 'react';
import Auth from '../../utils/Auth';
import { Redirect } from 'react-router';
import { withStyles } from "@material-ui/core/styles";
import Calendar from 'react-calendar'
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import indigo from "@material-ui/core/colors/indigo";
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import moment from "moment";
import './DailyReportArchive.css'
import Grid from '@material-ui/core/Grid';

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
  registerParent: {
    marginTop: "25px"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});


class DailyReportArchive extends Component {
  state = {
    date: new Date(),
    studentId: this.props.location.state.studentId,
    report:{},
    reportExists:false,
    name:this.props.location.state.name
  }
 
  onChange = date => {
    this.setState({ date },function(){
      let date =
      this.state.date.getFullYear() +
      '-' +
      (this.state.date.getMonth() + 1) +
      '-' +
      this.state.date.getDate();
      console.log("Date: ",date);
      fetch(`api/student/${this.state.studentId}/reportconsolidated/${date}`)
      .then(res => res.json())
      .then(res => this.setState({report:res}, function(){
        if(res.Meals.length>0 || res.Diaperings.length>0 || res.Incidents.length>0 || res.Medicines.length>0 || res.Naps.length>0 || res.Reports.length>0)
          this.setState({reportExists:true})
        else
          this.setState({reportExists:false})
      }))
    })
    }

    componentDidMount = () => {
        let today = new Date();
        let todayDate =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
        console.log("Date: ",todayDate);
        fetch(`api/student/${this.state.studentId}/reportconsolidated/${todayDate}`)
        .then(res => res.json())
        .then(res => this.setState({report:res}, function(){
          if(res.Meals.length>0 || res.Diaperings.length>0 || res.Incidents.length>0 || res.Medicines.length>0 || res.Naps.length>0 || res.Reports.length>0)
            this.setState({reportExists:true})
          else
            this.setState({reportExists:false})
        }))
      }

  componentWillMount = async () => {
    let user = await fetch('/auth/loggedin');
    const { userType } = await user.json();
    if (userType === 'staff') {
      await Auth.StaffAuthorize(this);
      console.log(this.state);
    } else {
      await Auth.ParentAuthorize(this);
      console.log(this.state);
    }
  };

  renderIncidents() {
    const { classes } = this.props;
    if (this.state.report.Incidents.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <br />
          <strong>Incidents</strong>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow key="header">
                  <CustomTableCell>Time</CustomTableCell>
                  <CustomTableCell>Incident</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.report.Incidents.map(incident => {
                  return (
                    <TableRow key={incident.id}>
                      <CustomTableCell>{moment(incident.time,"HH:mm:ss").format("hh:mm A")}</CustomTableCell>
                      <CustomTableCell>{incident.incident}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <br />
        </div>
      );
    }
  }

  renderMeds() {
    const { classes } = this.props;
    if (this.state.report.Medicines.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <br />
          <strong>Medicines Administered</strong>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow key="header">
                  <CustomTableCell>Time</CustomTableCell>
                  <CustomTableCell>Medicine</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.report.Medicines.map(medicine => {
                  return (
                    <TableRow key={medicine.id}>
                      <CustomTableCell>{moment(medicine.time,"HH:mm:ss").format("hh:mm A")}</CustomTableCell>
                      <CustomTableCell>{medicine.medName}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <br />
        </div>
      );
    }
  }

  renderNaps() {
    const { classes } = this.props;
    if (this.state.report.Naps.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <br />
          <strong>Naps</strong>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow key="header">
                  <CustomTableCell>Start Time</CustomTableCell>
                  <CustomTableCell>End Time</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.report.Naps.map(nap => {
                  return (
                    <TableRow key={nap.id}>
                      <CustomTableCell>{moment(nap.startTime,"HH:mm:ss").format("hh:mm A")}</CustomTableCell>
                      <CustomTableCell>{moment(nap.endTime,"HH:mm:ss").format("hh:mm A")}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <br />
        </div>
      );
    }
  }

  renderMeals() {
    const { classes } = this.props;
    if (this.state.report.Meals.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <br />
          <strong>Meals</strong>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow key="header">
                  <CustomTableCell>Time</CustomTableCell>
                  <CustomTableCell>Meal</CustomTableCell>
                  <CustomTableCell>Food</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.report.Meals.map(meal => {
                  return (
                    <TableRow key={meal.id}>
                      <CustomTableCell>{moment(meal.time,"HH:mm:ss").format("hh:mm A")}</CustomTableCell>
                      <CustomTableCell>{meal.type}</CustomTableCell>
                      <CustomTableCell>{meal.food}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
  }

  renderDiaperings() {
    const { classes } = this.props;
    if (this.state.report.Diaperings.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <br />
          <strong>Diaper/Toilet</strong>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow key="header">
                  <CustomTableCell>Time</CustomTableCell>
                  <CustomTableCell>Place</CustomTableCell>
                  <CustomTableCell>Type</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.report.Diaperings.map(diapering => {
                  return (
                    <TableRow key={diapering.id}>
                      <CustomTableCell>{moment(diapering.time,"HH:mm:ss").format("hh:mm A")}</CustomTableCell>
                      <CustomTableCell>{diapering.place}</CustomTableCell>
                      <CustomTableCell>{diapering.type}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
  }

  renderNotesForStaff(){
    const { classes } = this.props;
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForStaff) {
      return (<div>
        <br />
        <strong>Notes For Staff</strong>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow key="header">
                <CustomTableCell>Note</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <CustomTableCell>{this.state.report.Reports[0].noteForStaff}</CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>)
    } else {
      return (
        <div></div>
      );
    }
  }
  renderNotesForParents(){
    const { classes } = this.props;
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForParents) {
      return (<div>
        <br />
        <strong>Notes For Parents</strong>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow key="header">
                <CustomTableCell>Note</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <CustomTableCell>{this.state.report.Reports[0].noteForParents}</CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>)
    } else {
      return (
        <div></div>
      );
    }
  }

  renderHighlight(){
    const { classes } = this.props;
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].highlight) {
      return (<div>
        <br />
        <strong>Highlight</strong>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow key="header">
                <CustomTableCell>Highlight</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <CustomTableCell>{this.state.report.Reports[0].highlight}</CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>)
    } else {
      return (
        <div></div>
      );
    }
  }

  renderFullReport = ()=>{
    console.log("Full report: ", this.state.report)
    console.log("report exists: ", this.state.reportExists)
    if(!this.state.reportExists)
      return (<div><p>No report available for selected date</p></div>)
    else{
      return (
        <div>
          {this.renderNotesForStaff()}
          {this.renderNotesForParents()}
          {this.renderHighlight()}
          {this.renderDiaperings()}
          {this.renderMeals()}
          {this.renderNaps()}
          {this.renderMeds()}
          {this.renderIncidents()}
        </div>
      )
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.loggedIn) {
      return <div>
        <HeaderBar type={this.props.location.state.role} />
        <br />
        <h2>{this.state.name}'s Report Archive</h2>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ marginTop: '25px' }}
        >
          <Grid item>
            <Calendar
              onChange={this.onChange}
              value={this.state.date}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ marginTop: '25px', marginBottom:'40px' }}
        >
          <Grid item>
          {this.renderFullReport()}
          </Grid>
        </Grid> 

        
       
      </div>;
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: '/notAuthorized',
            state: { location: '/dailyreportarchive' },
          }}
        />
      );
    }else{
      return <div/>
    }
  }
}

DailyReportArchive.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DailyReportArchive);
