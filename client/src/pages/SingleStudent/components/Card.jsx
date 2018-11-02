import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import DashboardItem from '../../../components/DashboardItem/DashboardItem';
import './Card.css';

const styles = theme => ({
  card: {
    width: '75vw',
  },
  title: {
    fontSize: '35px',
    minWidth: '',
  },
  subheader: {
    fontSize: '20px',
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
  bigAvatar: {
    width: 180,
    height: 180,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

class SingleStudentCard extends React.Component {
  state = {
    date: '',
    status: '',
  };

  componentWillMount() {
    let today = new Date();
    let date =
      this.getMonthAsString(today.getMonth() + 1) +
      ' ' +
      today.getDate() +
      ', ' +
      today.getFullYear();

    this.setState({ date: date });
  }

  getMonthAsString(monthInInt) {
    switch (monthInInt) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  renderNoteButton() {
    if (this.props.role == 'staff')
      return (
        <div className="singlestudent-card-icons">
          <DashboardItem
            destination="/addnote"
            title="Notes"
            image="/img/message.png"
            id={this.props.studentId}
            name={this.props.name}
            role="staff"
          />
          <DashboardItem
            destination="/addhighlight"
            title="Highlights"
            image="/img/highlight.png"
            id={this.props.studentId}
            name={this.props.name}
            role="staff"
          />
        </div>
      );
    else if (this.props.role == 'parent')
      return (
        <div className="singlestudent-card-icons">
          <DashboardItem
            destination="/addnote"
            title="Notes"
            image="/img/message.png"
            id={this.props.studentId}
            name={this.props.name}
            role="parent"
          />
        </div>
      );
  }

  render() {
    const { classes } = this.props;
    if (this.props.studentId) {
      return (
        <Card className={classes.card}>
          <CardHeader
           avatar={
            <Avatar
                alt={this.props.name}
                src={`data:image/png;base64,${this.props.image}`}
                className={classes.bigAvatar}
            />
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
    } else {
      return <div />;
    }
  }
}

SingleStudentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleStudentCard);
