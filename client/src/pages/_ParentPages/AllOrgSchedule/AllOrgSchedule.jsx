import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Auth from '../../../utils/Auth'
import HeaderBar from "../../../components/HeaderBar/HeaderBar"
import { Redirect } from 'react-router';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DaySchedule from "../../Schedule/components/DaySchedule"

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: "#fff",
//   },
// });
const styles = theme => ({
    root: {
            flexGrow: 1,
            backgroundColor: "#fff",
          },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  });

class SimpleTabs extends React.Component {
  state = {
    value: 0,
    hasOrgs:false,
    days:["Monday","Tuesday","Wednesday","Thursday","Friday"]
  };

  componentWillMount = async () => {
    console.log('test');
    await Auth.ParentAuthorize(this);
    console.log(this.state)
    console.log('navbar', this.props.updateState);
    console.log(`/api/parent/allstudentorg/${this.state.userId}`)
    fetch(`/api/parent/allstudentorg/${this.state.userId}`)
    .then(resp => resp.json())
      .then(resp => {
        console.log("Resp:",resp);
        this.setState({ allOrgs: resp, hasOrgs:true })
        console.log(this.state.allOrgs)
      })
      .catch(err => console.log(err))
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log(value)
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (this.state.loggedIn && this.state.hasOrgs) {
    return (
      <div className={classes.root}>
      <HeaderBar type="parent"/>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
          {this.state.allOrgs.map(org=> <Tab label={org.name} />)}
          </Tabs>
        </AppBar>
        {this.state.allOrgs.map((org,index)=>{
            if(value === index)
                return(
                <TabContainer>
                    {this.state.days.map(day=>
                        <ExpansionPanel key={day}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                {day}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <DaySchedule day={day} orgId={org.id} role="parent" />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    )}
                </TabContainer>
                )
        })}
        </div>
        )}
        if (this.state.loginRejected) {
        return (
          <Redirect
            to={{
              pathname: '/notAuthorized',
              state: { type: 'Parent' }
            }}
          />
        );
        }
        return (<div>Loading...</div>)
    }
}


SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
