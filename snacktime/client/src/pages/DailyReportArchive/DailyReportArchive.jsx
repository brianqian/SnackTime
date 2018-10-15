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
import ResponsiveTable from "../SingleStudent/components/ResponsiveTable"

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
    studentId: '',
    report: {},
    reportExists: false,
    // name: this.props.location.state.name
  }

  onChange = date => {
    this.setState({ date }, function () {
      let date =
        this.state.date.getFullYear() +
        '-' +
        (this.state.date.getMonth() + 1) +
        '-' +
        this.state.date.getDate();
      console.log("Date: ", date);
      fetch(`api/student/${this.state.studentId}/reportconsolidated/${date}`)
        .then(res => res.json())
        .then(res => this.setState({ report: res }, function () {
          if (res.Meals.length > 0 || res.Diaperings.length > 0 || res.Incidents.length > 0 || res.Medicines.length > 0 || res.Naps.length > 0 || res.Reports.length > 0)
            this.setState({ reportExists: true })
          else
            this.setState({ reportExists: false })
        }))
    })
  }

  // componentDidMount = () => {
    
  // }

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
    if (this.props.location.state){
      this.setState({studentId: this.props.location.state.studentId, name: this.props.location.state.name})                
      }
      console.log('PROP', this.props);
      let today = new Date();
      let todayDate =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      console.log("Date: ", todayDate);
      fetch(`/api/student/${this.state.studentId}/reportconsolidated/${todayDate}`)
        .then(res => res.json())
        .then(res => this.setState({ report: res }, function () {
          console.log(res)
          if (res.Meals.length > 0 || res.Diaperings.length > 0 || res.Incidents.length > 0 || res.Medicines.length > 0 || res.Naps.length > 0 || res.Reports.length > 0)
            this.setState({ reportExists: true })
          else
            this.setState({ reportExists: false })
        }))
  };

  renderIncidents() {
    let allincidents = [];
    this.state.report.Incidents.map(incident => {
      let incidentRow = [];
      incidentRow.push(moment(incident.time, "HH:mm:ss").format("hh:mm A"), incident.incident);
      allincidents.push(incidentRow);
    });
    const { classes } = this.props;
    if (this.state.report.Incidents.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Incidents" columns={["Time", "Incident"]} data={allincidents} />
        </div>
      );
    }
  }

  renderMeds() {
    let allmedicines = [];
    this.state.report.Medicines.map(medicine => {
      let medicineRow = [];
      medicineRow.push(moment(medicine.time, "HH:mm:ss").format("hh:mm A"), medicine.medName);
      allmedicines.push(medicineRow);
    });
    const { classes } = this.props;
    if (this.state.report.Medicines.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Medicines Administered" data={allmedicines} columns={["Time", "Medicine"]} />
        </div>
      );
    }
  }

  renderNaps() {
    let allnaps = [];
    this.state.report.Naps.map(nap => {
      let napRow = [];
      napRow.push(moment(nap.startTime, "HH:mm:ss").format("hh:mm A"), moment(nap.endTime, "HH:mm:ss").format("hh:mm: A"));
      allnaps.push(napRow);
    });
    const { classes } = this.props;
    if (this.state.report.Naps.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Naps" data={allnaps} columns={["Start Time", "End Time"]} />
        </div>
      );
    }
  }

  renderMeals() {
    let allMeals = [];
    this.state.report.Meals.map(meal => {
      let mealRow = [];
      mealRow.push(moment(meal.time, "HH:mm:ss").format("hh:mm A"), meal.type, meal.food);
      allMeals.push(mealRow);
    });
    const { classes } = this.props;
    if (this.state.report.Meals.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Meals" data={allMeals} columns={["Time", "Meal", "Food"]} />
        </div>
      );
    }
  }

  renderDiaperings() {
    let allDiaperings = [];
    this.state.report.Diaperings.map(diapering => {
      let diaperingRow = [];
      diaperingRow.push(moment(diapering.time, "HH:mm:ss").format("hh:mm A"), diapering.place, diapering.type);
      allDiaperings.push(diaperingRow);
    });
    const { classes } = this.props;
    if (this.state.report.Diaperings.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Diaper/Toilet" columns={["Time", "Place", "Type"]} data={allDiaperings} />
        </div>
      );
    }
  }

  renderNotesForStaff() {
    let noteForstaff =[];
    if(this.state.report.Reports.length >0 && this.state.report.Reports[0].noteForStaff)
      noteForstaff.push([this.state.report.Reports[0].noteForStaff]);

    const { classes } = this.props;
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForStaff) {
      return (<div>
          <ResponsiveTable title="Note For Staff" columns={["Note"]} data={noteForstaff} />
        </div>)
    } else {
      return (
        <div></div>
      );
    }
  }

  renderNotesForParents() {
    let noteForparent =[];
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForParents)
      noteForparent.push([this.state.report.Reports[0].noteForParents])

    const { classes } = this.props;
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForParents) {
      return (<div>
          <ResponsiveTable title="Note For Parents" columns={["Note"]} data={noteForparent} />
        </div>)
    } else {
      return (
        <div></div>
      );
    }
  }

  renderHighlight() {
    let highlight =[];
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].highlight)
      highlight.push([this.state.report.Reports[0].highlight])

    const { classes } = this.props;
    if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].highlight) {
      return (<div>
          <ResponsiveTable title="Highlight of the day" columns={["Highlight"]} data={highlight} />
        </div>)
    } else {
      return (
        <div></div>
      );
    }
  }

  renderFullReport = () => {
    console.log("Full report: ", this.state.report)
    console.log("report exists: ", this.state.reportExists)
    if (!this.state.reportExists)
      return (<div><p>No report available for selected date</p></div>)
    else {
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
          style={{ marginTop: '25px', marginBottom: '40px' }}
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
    } else {
      return <div />
    }
  }
}

DailyReportArchive.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DailyReportArchive);




// import React, { Component } from 'react';
// import Auth from '../../utils/Auth';
// import { Redirect } from 'react-router';
// import { withStyles } from "@material-ui/core/styles";
// import Calendar from 'react-calendar'
// import PropTypes from "prop-types";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import indigo from "@material-ui/core/colors/indigo";
// import HeaderBar from '../../components/HeaderBar/HeaderBar';
// import moment from "moment";
// import './DailyReportArchive.css'
// import Grid from '@material-ui/core/Grid';
// import ResponsiveTable from "./../SingleStudent/components/ResponsiveTable"

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: indigo[500],
//     color: theme.palette.common.white
//   },
//   body: {
//     fontSize: 14
//   }
// }))(TableCell);

// const styles = theme => ({
//   root: {
//     width: "75vw",
//     marginTop: theme.spacing.unit * 3
//     // overflowX: 'auto',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular
//   },
//   childInfo: {
//     margin: "15px"
//   },
//   table: {
//     minWidth: 700
//   },
//   searchSubmit: {
//     marginTop: "25px"
//   },
//   submitGuardian: {
//     marginTop: "25px"
//   },
//   registerParent: {
//     marginTop: "25px"
//   },
//   row: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.background.default
//     }
//   }
// });


// class DailyReportArchive extends Component {
//   state = {
//     date: new Date(),
//     studentId: this.props.location.state.studentId,

//     exists: "test",
//     name: this.props.location.state.name,
//     mealData: [],
//     napData: [],
//     medicineData: [],
//     diaperingData: [],
//     incidentData: [],
//     noteForStaffData: [],
//     noteForParentsData: [],
//     highlightData: []
//   }

//   onChange = date => {
//     this.setState({ date }, function () {
//       let date =
//         this.state.date.getFullYear() +
//         '-' +
//         (this.state.date.getMonth() + 1) +
//         '-' +
//         this.state.date.getDate();
//       console.log("Date: ", date);
//       fetch(`/api/student/${this.state.studentId}/reportconsolidated/${date}`)
//         .then(res => res.json())
//         .then(res => this.setState({ report: res }, function () {
//           if (res.Meals.length > 0 || res.Diaperings.length > 0 || res.Incidents.length > 0 || res.Medicines.length > 0 || res.Naps.length > 0 || res.Reports.length > 0)
//             this.setState({ exists: true })
//           else
//             this.setState({ exists: false })
//         }))
//     })
//   }

//   componentWillMount = async () => {
//     let user = await fetch('/auth/loggedin');
//     const { userType } = await user.json();
//     if (userType === 'staff') {
//       await Auth.StaffAuthorize(this);
//       console.log(this.state);
//     } else {
//       await Auth.ParentAuthorize(this);
//       console.log(this.state);
//     }
//   };

//   componentDidMount = () => {
//     // console.log("COMPONENT WILL MOUNT 134235325135")
//     // let user = await fetch('/auth/loggedin');
//     // const { userType } = await user.json();
//     // if (userType === 'staff') {
//     //   console.log('authorizing Staff')
//     //   await Auth.StaffAuthorize(this);
//     //   console.log('PAGE STATE', this.state);
//     // } else {
//     //   console.log('authorizing parent')
//     //   await Auth.ParentAuthorize(this);
//     //   console.log(this.state);
//     // }
//     // console.log("AFTER AUTHORIZING");
//     let today = new Date();
//     let todayDate =
//       today.getFullYear() +
//       '-' +
//       (today.getMonth() + 1) +
//       '-' +
//       today.getDate();
//     console.log("Date: ", todayDate);
//     fetch(`/api/student/${this.state.studentId}/reportconsolidated/${todayDate}`)
//       .then(res => res.json())
//       .then(response => {
//         // if (response.Meals.length > 0 || response.Diaperings.length > 0 || response.Incidents.length > 0 || response.Medicines.length > 0 || response.Naps.length > 0 || response.Reports.length > 0) {
//         //   // console.log('test')
//         // }
//         console.log("AFATER FETCH ", response)
//         this.setState({ report: response }, function () {
//           console.log("This.state.report", this.state.report)
//         })
//         //this.setState({ exists: "test" })
//         // else {
//         //   this.setState({ exists: false })
//         // }
//       })
//   }

//   getIncidents() {
//     let allIncidents = [];
//     this.state.report.Incidents.map(incident => {
//       let incidentRow = [];
//       incidentRow.push(moment(incident.time, "HH:mm:ss").format("hh:mm A"), incident.incident);
//       allIncidents.push(incidentRow);
//     });
//     this.setState({ incidentData: allIncidents }, this.renderIncidents());
//   }

//   renderIncidents() {
//     const { classes } = this.props;
//     if (this.state.report.Incidents.length === 0) {
//       return <div />;
//     } else {
//       return (
//         <div>
//           <ResponsiveTable
//             title="Incidents"
//             columns={["Time", "Incident"]}
//             data={this.state.incidentData}
//           />
//         </div>
//       );
//     }
//   }

//   getMeds() {
//     let allMeds = [];
//     this.state.report.Medicines.map(medicine => {
//       let medicineRow = [];
//       medicineRow.push(moment(medicine.time, "HH:mm:ss").format("hh:mm A"), medicine.medName);
//       allMeds.push(medicineRow);
//     });
//     this.setState({ medicineData: allMeds }, this.renderMeds());
//   }

//   renderMeds() {
//     const { classes } = this.props;
//     if (this.state.report.Medicines.length === 0) {
//       return <div />;
//     } else {
//       return (
//         <div>
//           <ResponsiveTable
//             title="Medicine"
//             columns={["Time", "Medicine Name"]}
//             data={this.state.medicineData}
//           />
//         </div>
//       );
//     }
//   }

//   getNaps() {
//     let allNaps = [];
//     this.state.report.Naps.map(nap => {
//       let napRow = [];
//       napRow.push(moment(nap.startTime, "HH:mm:ss").format("hh:mm A"), moment(nap.endTime, "HH:mm:ss").format("hh:mm A"));
//       allNaps.push(napRow);
//     });
//     this.setState({ napData: allNaps }, this.renderNaps());
//   }

//   renderNaps() {
//     const { classes } = this.props;
//     if (this.state.report.Naps.length === 0) {
//       return <div />;
//     } else {
//       return (
//         <div>
//           <ResponsiveTable
//             title="Naps"
//             columns={["Start Time", "End Meal"]}
//             data={this.state.napData}
//           />
//         </div>
//       );
//     }
//   }

//   getMeals() {
//     let allMeals = [];
//     this.state.report.Meals.map(meal => {
//       let mealRow = [];
//       mealRow.push(moment(meal.time, "HH:mm:ss").format("hh:mm A"), meal.type, meal.food);
//       allMeals.push(mealRow);
//     });
//     this.setState({ mealData: allMeals }, this.renderMeals());

//   }

//   renderMeals() {
//     const { classes } = this.props;
//     if (this.state.report.Meals.length === 0) {
//       return <div />;
//     } else {
//       return (
//         <div>
//           <ResponsiveTable
//             title="Meals"
//             columns={["Time", "Meal", "Food"]}
//             data={this.state.mealData}
//           />
//         </div>
//       );
//     }
//   }

//   getDiaperings() {
//     let allDiaperings = [];
//     this.state.report.Diaperings.map(diapering => {
//       let diaperingRow = [];
//       diaperingRow.push(moment(diapering.time, "HH:mm:ss").format("hh:mm A"), diapering.place, diapering.type);
//       allDiaperings.push(diaperingRow);
//     });
//     this.setState({ diaperingData: allDiaperings }, this.renderDiaperings());
//   }

//   renderDiaperings() {
//     const { classes } = this.props;
//     if (this.state.report.Diaperings.length === 0) {
//       return <div />;
//     } else {
//       return (
//         <div>
//           <ResponsiveTable
//             title="Diaper/Toilet"
//             columns={["Time", "Place", "Type"]}
//             data={this.state.diaperingData}
//           />
//         </div>
//       );
//     }
//   }

//   getNotesForStaff() {
//     let noteForStaffRow = []
//     if (this.state.report) {
//       if (this.state.report.Reports) {
//         if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForStaff)
//           noteForStaffRow.push(this.state.report.Reports[0].noteForStaff)
//       }
//       this.setState({ noteForStaffData: noteForStaffRow }, this.renderNotesForStaff());
//     }


//   }

//   renderNotesForStaff() {
//     const { classes } = this.props;
//     if (this.state.report) {
//       if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForStaff) {
//         return (<div>
//         <ResponsiveTable
//           title="Note for Staff"
//           columns={["Note"]}
//           data={this.state.noteForStaffData}
//           />
//       </div>)
//     } else {
//       return (
//         <div></div>
//         );
//       }
//     }
//   }

//   getNotesForParents() {
//     let noteForParentsRow = []
//     if (this.state.report) {
//       if (this.state.report.Reports) {
//         if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForParents)
//           noteForParentsRow.push(this.state.report.Reports[0].noteForParents)
//         }
//         this.setState({ noteForParentsData: noteForParentsRow }, this.renderNotesForParents());  
//     }
//   }
//   renderNotesForParents() {
//     const { classes } = this.props;
//     if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].noteForParents) {
//       return (<div>
//         <ResponsiveTable
//           title="Note for Parents"
//           columns={["Note"]}
//           data={this.state.noteForParentsData}
//         />
//       </div>)
//     } else {
//       return (
//         <div></div>
//       );
//     }
//   }

//   getHighlight() {
//     let highlightRow = []
//     console.log('IN HIGHLIGHT', this.state);
//     if (this.state.report) {
//       if (this.state.report.Reports) {
//         if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].highlight)
//           highlightRow.push(this.state.report.Reports[0].highlight)
//       }
//       this.setState({ highlightData: highlightRow }, this.renderHighlight());
//   }
// }

//   renderHighlight() {
//     const { classes } = this.props;
//     if (this.state.report.Reports.length > 0 && this.state.report.Reports[0].highlight) {
//       return (<div>
//         <ResponsiveTable
//           title="Highlight of day"
//           columns={["Highlight"]}
//           data={this.state.highlightData}
//         />
//       </div>)
//     } else {
//       return (
//         <div></div>
//       );
//     }
//   }

//   renderFullReport = () => {
//     console.log("Full report: ", this.state.report)
//     console.log("report exists: ", this.state.exists)
//     // if (!this.state.exists)
//     //   return (<div><p>No report available for selected date</p></div>)
//     // else {
//     return (
//       <div>
//         {this.getNotesForStaff()}
//         {this.getNotesForParents()}
//         {this.getHighlight()}
//         {this.getDiaperings()}
//         {this.getMeals()}
//         {this.getNaps()}
//         {this.getMeds()}
//         {this.getIncidents()}
//       </div>
//     )
//     //}
//   }

//   render() {
//     const { classes } = this.props;
//     if (this.state.loggedIn) {
//       return <div>
//         <HeaderBar type={this.props.location.state.role} />
//         <br />
//         <h2>{this.state.name}'s Report Archive</h2>
//         <Grid
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justify="center"
//           style={{ marginTop: '25px' }}
//         >
//           <Grid item>
//             <Calendar
//               onChange={this.onChange}
//               value={this.state.date}
//             />
//           </Grid>
//         </Grid>
//         <Grid
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justify="center"
//           style={{ marginTop: '25px', marginBottom: '40px' }}
//         >
//           <Grid item>
//             {this.renderFullReport()}
//           </Grid>
//         </Grid>



//       </div>;
//     } else if (this.state.loginRejected) {
//       return (
//         <Redirect
//           to={{
//             pathname: '/notAuthorized',
//             state: { location: '/archive' },
//           }}
//         />
//       );
//     } else {
//       return <div />
//     }
//   }
// }

// DailyReportArchive.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(DailyReportArchive);
