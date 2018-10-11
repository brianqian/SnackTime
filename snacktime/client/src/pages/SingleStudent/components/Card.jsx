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
  });

  class SingleStudentCard extends React.Component {
    state = { 
      expanded: false,
      diaperings:[],
      meals: [],
      naps: [],
      medicines:[],
      incidents:[],
      date: '',
      status: '',   
      noteForStaff:null ,
      noteForParents:null         
    };

    componentWillMount(){
      console.log("component will mount log")
      this.getDiapering();
      this.getMeals();
      this.getNaps();
      this.getMedicines();
      this.getIncidents();
      this.getNotes();
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
      console.log("Id",this.props.id)
      this.setState({date: date});
      fetch(`/api/student/${this.props.id}/diapering/${date}`)
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
      console.log("Id",this.props.id)
      fetch(`/api/student/${this.props.id}/meal/${date}`)
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
      console.log("Id",this.props.id)
      fetch(`/api/student/${this.props.id}/nap/${date}`)
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
      console.log("Id",this.props.id)
      this.setState({date: date});
      fetch(`/api/student/${this.props.id}/medicine/${date}`)
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
      console.log("Id",this.props.id)
      this.setState({date: date});
      fetch(`/api/student/${this.props.id}/incident/${date}`)
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

    
    getNotes = () =>{
      console.log("start of get note for staff function");
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
   
      this.setState({date: date});

      fetch(`/api/student/${this.props.id}/report/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log("Resp from notes: ",resp)
        if (resp) {
          if (resp === 'No Notes') {
            this.setState({ status: 'No report found :(' });
          } else {
            console.log(resp)
            this.setState({ noteForStaff: resp.noteForStaff, noteForParents: resp.noteForParents });
          }
        }
      });
    }


  //this needs a check for the role
    renderNoteForStaff() {
      if(!this.state.noteForStaff) {
        return <div></div>;
      } else {
        return (
          <div>
          <strong>Note from Parents:</strong>
            <Typography component="p">
               {this.state.noteForStaff}   
            </Typography>
            <hr />
            </div>
        );
      }
    }

      //this needs a check for the role
    renderNoteForParents() {
      if(!this.state.noteForParents) {
        return <div></div>;
      } else {
        return (
          <div>
          <strong>Note for Parents:</strong>
            <Typography component="p">
               {this.state.noteForParents}   
            </Typography>
            <hr />
            </div>
        );
      }
    }

    renderDiaperings() {
      if(this.state.diaperings.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
          <strong>Diapering:</strong>
          {this.state.diaperings.map(diapering => (

            <Typography component="p">
              Time: {diapering.time} &emsp;  
              Type: {diapering.type} &emsp;
              Place: {diapering.place} 
            </Typography>
          ))}
          <hr/>
            </div>
        );
      }
    }

    renderMeals(){
      if(this.state.meals.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
           <strong>Meals:</strong>
          {this.state.meals.map(meal => (

            <Typography component="p">
              Time:{meal.time} &emsp;
              Had {meal.food} for {meal.type} 
            </Typography>
          ))}
          <hr/>   
            </div>
        );
      }
    }

    renderNaps(){
      if(this.state.naps.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
           <strong>Naps:</strong>
          {this.state.naps.map(nap => (

            <Typography component="p">
              Started: {nap.startTime} &emsp;
              Ended: {nap.endTime}
            </Typography>
          ))}
          <hr/>
            </div>
        );
      }
    }

    renderMeds(){
      if(this.state.medicines.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
           <strong>Meds Administered:</strong>
          {this.state.medicines.map(medicine => (

            <Typography component="p">
              Time: {medicine.time} &emsp;
              Med: {medicine.medName}
            </Typography>
          ))}
          <hr/>
            </div>
        );
      }
    }

    renderIncidents(){
      if(this.state.incidents.length===0) {
        return <div></div>;
      } else {
        return (
          <div>
           <strong>Incidents:</strong>
          {this.state.incidents.map(incident => (

            <Typography component="p">
              Time: {incident.time} &emsp;
              Incident: {incident.incident}
            </Typography>
          ))}
          <hr/>
            </div>
        );
      }
    }


  
    render() {
      const { classes } = this.props;
      if (this.props.id){
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
            action={<DashboardItem
            destination="/addnote"
            title="Note"
            image="/img/message.png"
            id={this.props.id}
            name={this.props.name}
            />}
          />
          {/* <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          /> */}
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