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
    };

    componentWillMount(){
      console.log("component will mount log")
      this.getDiapering();
      this.getMeals();
      this.getNaps();
      this.getMedicines();
      this.getIncidents();
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
            />}
          />
          {/* <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          /> */}
          <CardContent>
            <strong>Diapering:</strong>
          {this.state.diaperings.map(diapering => (

            <Typography component="p">
              Time: {diapering.time} &emsp;  
              Type: {diapering.type} &emsp;
              Place: {diapering.place} 
            </Typography>
          ))}
          <hr/>
          <strong>Meals:</strong>
          {this.state.meals.map(meal => (

            <Typography component="p">
              Time: {meal.time} &emsp;
              Meal Type: {meal.type} &emsp;
              Food: {meal.food}
            </Typography>
          ))}
          <hr/>   
          <strong>Naps:</strong>
          {this.state.naps.map(nap => (

            <Typography component="p">
              Nap Started: {nap.startTime} &emsp;
              Nap Ended: {nap.endTime}
            </Typography>
          ))}
          <hr/>
          <strong>Meds Administered:</strong>
          {this.state.medicines.map(medicine => (

            <Typography component="p">
              Time: {medicine.time} &emsp;
              Type: {medicine.medName}
            </Typography>
          ))}
          <hr/>
          <strong>Incidents:</strong>
          {this.state.incidents.map(incident => (

            <Typography component="p">
              Time: {incident.time} &emsp;
              Incident: {incident.incident}
            </Typography>
          ))}               
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