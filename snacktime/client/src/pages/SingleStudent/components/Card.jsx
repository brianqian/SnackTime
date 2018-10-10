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
      status: '',             
    };
    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    getDiapering= () =>{
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      console.log("Date:",date);
      fetch(`/api/student/${this.props.id}/diapering/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No diaperings') {
            this.setState({ status: 'No diapering found :(' });
          } else {
            console.log("Resp: ",resp);
            const diaperings = [];
            resp.map(diapering => diaperings.push(diapering));
            this.setState({ diaperings: diaperings });
          }
        }
      });
    }

    ComponentWillMount = () => {
      this.getDiapering();
    }
  
    render() {
      const { classes } = this.props;
  
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Student" className={classes.avatar}>
                Rrr
              </Avatar>
            }
            title={this.props.name}
            subheader="September 14, 2016"
          />
          {/* <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          /> */}
          <CardContent>
            <Typography component="p">
            {/* render daily activities */}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Address: {this.props.address}
              </Typography>
              <Typography paragraph>
                Allergies: {this.props.allergies}
              </Typography>
              <Typography paragraph>
                Medication: {this.props.medication}
              </Typography>
              <Typography>
                Birthday: {this.props.dob}
              </Typography>
              {this.props.notes && <Typography>
                Additional Notes: {this.props.notes}
              </Typography>}
              {this.props.doctor && <Typography>
                Doctor: {this.props.doctor}
              </Typography>}
            </CardContent>
          </Collapse>
        </Card>
      );
    }
  }
  
  SingleStudentCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SingleStudentCard);