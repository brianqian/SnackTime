import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import DashboardItem from "../../../components/DashboardItem/DashboardItem";
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
        
        this.getMonthAsString(today.getMonth()+1) +
        ' ' +
        today.getDate()+
         ', '+
        today.getFullYear();
  
      this.setState({date: date});
    }

    getMonthAsString(monthInInt){
      switch(monthInInt){
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
      }
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