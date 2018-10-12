import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import DashboardItem from "../../../components/DashboardItem/DashboardItem";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import indigo from '@material-ui/core/colors/indigo';
import './Card.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: indigo[500],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
    card: {
      width: '75vw',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

  class SingleStudentCard extends React.Component {
    state = { 
      diaperings:[],
      meals: [],
      naps: [],
      medicines:[],
      incidents:[],
      date: '',
      status: '',   
      noteForStaff:null ,
      noteForParents:null,   
      highlight:null
    };

    componentWillMount(){
      console.log('ID', this.props.studentId)
      console.log("component will mount log")
      this.getDiapering();
      this.getMeals();
      this.getNaps();
      this.getMedicines();
      this.getIncidents();
      if(this.props.role =="staff")
        this.getNotesForStaff();
      else if(this.props.role === "parent")
        this.getNotesForParents();
    }

    

    handleExpandClick = () => {
      console.log("handle expand click");
      this.setState(state => ({ expanded: !state.expanded }));
    };

    getDiapering= () =>{
      console.log("start of get diapering function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      console.log("Date:",date);
      console.log("Id",this.props.studentId)
      this.setState({date: date});
      fetch(`/api/student/${this.props.studentId}/diapering/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No diaperings') {
            this.setState({ status: 'No diapering found :(' });
          } else {
            console.log(resp)
            this.setState({ diaperings: resp });
          }
        }
      });
    }


    getMeals= () =>{
      console.log("start of get meals function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      console.log("Date:",date);
      console.log("Id",this.props.studentId)
      fetch(`/api/student/${this.props.studentId}/meal/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No meals') {
            this.setState({ status: 'No Meal found :(' });
          } else {
            console.log(resp)
            this.setState({ meals: resp });
          }
        }
      });
    }

    getNaps= () =>{
      console.log("start of get naps function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      console.log("Date:",date);
      console.log("Id",this.props.studentId)
      fetch(`/api/student/${this.props.studentId}/nap/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No naps') {
            this.setState({ status: 'No Naps found :(' });
          } else {
            console.log(resp)
            this.setState({ naps: resp });
          }
        }
      });
    }

    getMedicines= () =>{
      console.log("start of get medicines function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      console.log("Date:",date);
      console.log("Id",this.props.studentId)
      this.setState({date: date});
      fetch(`/api/student/${this.props.studentId}/medicine/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No medicines') {
            this.setState({ status: 'No medicines found :(' });
          } else {
            console.log(resp)
            this.setState({ medicines: resp });
          }
        }
      });
    }

    getIncidents= () =>{
      console.log("start of get incidents function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      console.log("Date:",date);
      console.log("Id",this.props.studentId)
      this.setState({date: date});
      fetch(`/api/student/${this.props.studentId}/incident/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No incidents') {
            this.setState({ status: 'No incident found :(' });
          } else {
            console.log(resp)
            this.setState({ incidents: resp });
          }
        }
      });
    }

    
    getNotesForStaff = () =>{
      console.log("start of get note for staff function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
   
      this.setState({date: date});

      fetch(`/api/student/${this.props.studentId}/report/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log("Resp from notes: ",resp)
        if (resp) {
          if (resp === 'No Notes') {
            this.setState({ status: 'No report found :(' });
          } else {
            console.log(resp)
            this.setState({ noteForStaff: resp.noteForStaff});
          }
        }
      });
    }

    getNotesForParents = () =>{
      console.log("start of get note for parents function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
   
      this.setState({date: date});

      fetch(`/api/student/${this.props.studentId}/report/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log("Resp from notes: ",resp)
        if (resp) {
          if (resp === 'No Notes') {
            this.setState({ status: 'No report found :(' });
          } else {
            console.log(resp)
            this.setState({noteForParents: resp.noteForParents, highlight:resp.highlight });
          }
        }
      });
    }


    renderNoteForStaff() {
      if(this.props.role =="staff"){
        const { classes } = this.props;
      if(!this.state.noteForStaff) {
        return <div></div>;
      } else {
        return (
          <div>
            <strong>Note from Parents</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Note</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <CustomTableCell>{this.state.noteForStaff}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Paper>
            <br/>
          </div>);

      }
    }
  }


    renderNoteForParents() {
      if(this.props.role=="parent"){
        const { classes } = this.props;
        if(!this.state.noteForParents && !this.state.highlight) {
          return <div></div>;
        } 
        if(this.state.noteForParents && this.state.highlight) {
          return (
            <div>
            <strong>Note for Parents</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Note</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <CustomTableCell>{this.state.noteForParents}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Paper>
            <br/>
            <strong>Highlight</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Highlight</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <CustomTableCell>{this.state.highlight}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Paper>
            <br/>
              </div>
          );
        }
        if(this.state.highlight) {
          return (
            <div>
            <strong>Highlight</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Highlight</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <CustomTableCell>{this.state.highlight}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Paper>
            <br/>
              </div>
          );
        }
        if(this.state.noteForParents) {
          return (
            <div>
            <strong>Note for Parents</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Note</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <CustomTableCell>{this.state.noteForParents}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Paper>
            <br/>
              </div>
          );
        }
      }
    }

    renderDiaperings() {
      const { classes } = this.props;
      if(this.state.diaperings.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
            <strong>Diapering/Toilet</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Time</CustomTableCell>
                      <CustomTableCell>Place</CustomTableCell>
                      <CustomTableCell>Type</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.diaperings.map(diapering => {
                  return (
                    <TableRow>
                      <CustomTableCell>{diapering.time}</CustomTableCell>
                      <CustomTableCell>{diapering.place}</CustomTableCell>
                      <CustomTableCell>{diapering.type}</CustomTableCell>
                    </TableRow>
                  );
                  })}
                  </TableBody>
                </Table>
            </Paper>
            <br/>
          </div>
        );
      }
    }

    renderMeals(){
      const { classes } = this.props;
      if(this.state.meals.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
            <strong>Meals</strong>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Time</CustomTableCell>
                    <CustomTableCell>Meal</CustomTableCell>
                    <CustomTableCell>Food</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {this.state.meals.map(meal => {
                    return (
                      <TableRow>
                        <CustomTableCell>{meal.time}</CustomTableCell>
                        <CustomTableCell>{meal.type}</CustomTableCell>
                        <CustomTableCell>{meal.food}</CustomTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            <br/>
          </div>
        );
      }
    }

    renderNaps(){
      const { classes } = this.props;
      if(this.state.naps.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
            <strong>Naps</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Start Time</CustomTableCell>
                      <CustomTableCell>End Time</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.naps.map(nap => {
                  return (
                    <TableRow>
                      <CustomTableCell>{nap.startTime}</CustomTableCell>
                      <CustomTableCell>{nap.endTime}</CustomTableCell>
                    </TableRow>
                  );
                  })}
                  </TableBody>
                </Table>
            </Paper>
            <br/>
          </div>
        );
      }
    }

    renderMeds(){
      const { classes } = this.props;
      if(this.state.medicines.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
            <strong>Medicines Administered</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Time</CustomTableCell>
                      <CustomTableCell>Medicine</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.medicines.map(medicine => {
                  return (
                    <TableRow>
                      <CustomTableCell>{medicine.time}</CustomTableCell>
                      <CustomTableCell>{medicine.medName}</CustomTableCell>
                    </TableRow>
                  );
                  })}
                  </TableBody>
                </Table>
            </Paper>
            <br/>
          </div>
        );
      }
    }

    renderIncidents(){
      const { classes } = this.props;
      if(this.state.incidents.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
            <strong>Incidents</strong>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Time</CustomTableCell>
                      <CustomTableCell>Incident</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.incidents.map(incident => {
                  return (
                    <TableRow>
                      <CustomTableCell>{incident.time}</CustomTableCell>
                      <CustomTableCell>{incident.incident}</CustomTableCell>
                    </TableRow>
                  );
                  })}
                  </TableBody>
                </Table>
            </Paper>
            <br/>
          </div>
        );
      }
    }

    renderNoteButton(){
      if(this.props.role=="staff")
      return (
        <div>
          <DashboardItem
          destination="/addnote"
          title="Note to Parents"
          image="/img/message.png"
          id={this.props.studentId}
          name={this.props.name}
          role="staff"
          />
          <DashboardItem
          destination="/addhighlight"
          title="Today's Highlight"
          image="/img/highlight.png"
          id={this.props.studentId}
          name={this.props.name}
          role="staff"
          />
        </div>
        )
      else if(this.props.role=="parent")
      return (<DashboardItem
        destination="/addnote"
        title="Note to Staff"
        image="/img/message.png"
        id={this.props.studentId}
        name={this.props.name}
        role="parent"
        />)
    }




  
    render() {
      const { classes } = this.props;
      if (this.props.studentId){
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Student" className={classes.avatar}>
                Rrr
              </Avatar>
            }
            title={this.props.name}
            subheader={this.state.date}
            action={this.renderNoteButton()}
          />
          <CardContent>
            {this.renderNoteForStaff()}
            {this.renderNoteForParents()}          
            {this.renderDiaperings()}
            {this.renderMeals()}
            {this.renderNaps()}
            {this.renderMeds()}
            {this.renderIncidents()}
            
                    
          </CardContent>
        </Card>
      );
    }else{
      return <div/>
    }
  }
  }
  
  SingleStudentCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SingleStudentCard);