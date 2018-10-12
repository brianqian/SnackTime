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
import indigo from '@material-ui/core/colors/indigo';
import './Card.css';


const styles = theme => ({
    card: {
      width: '75vw',
    },
    title :{
      fontSize:"35px"
    },
    subheader:{
      fontSize:"20px"
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
  });

  // const Name = () => (
  //     <div style={{ fontSize:'64px' }}> {this.props.children} </div>
  // );

  class SingleStudentCard extends React.Component {
    state = { 
      date: '',
      status: ''
    };

    componentWillMount(){
      console.log('ID', this.props.studentId)
      console.log("component will mount log")
      console.log("start of get note for parents function");
      let today = new Date();
      let date =
        
        (today.getMonth() + 1) +
        '-' +
        today.getDate()+
         '-'+
          today.getFullYear();
  
      this.setState({date: date});
    }

    

    handleExpandClick = () => {
      console.log("handle expand click");
      this.setState(state => ({ expanded: !state.expanded }));
    };


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
                BB
              </Avatar>
            }
         
            action={this.renderNoteButton()}
              classes={{
                  title: classes.title,
                 subheader: classes.subheader,
                }}
            title={this.props.name}
            subheader={this.state.date} 
          />
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