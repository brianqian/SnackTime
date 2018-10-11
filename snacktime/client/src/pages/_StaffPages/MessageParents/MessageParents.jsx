import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
import { Redirect } from "react-router-dom";
import Auth from '../../../utils/Auth'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    height: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class MessageParents extends React.Component {
  state = { 
    orgId: '',  
    subject: '',  
    messageBody: '', 
    allEmails: [], 
    multiline: 'Controlled',
  };
  async componentWillMount() {
    console.log("START OF COMPONENT")  
    await Auth.StaffAuthorize(this);
    this.getParentEmailAddress();
    console.log("END OF COMPONENT")
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleSubmit = event => {
    event.preventDefault();
  };  

  getParentEmailAddress = () => {
    console.log("IN PARENT EMAIL GET")
    const emailArray = [] 
    fetch(`/api/parentemails/${this.state.orgId}`)
    .then(resp => resp.json())
    .then(resp => {
      console.log("RESP", resp)  
      resp.map(element => {
        if(emailArray.indexOf(element.email)===-1)
          return emailArray.push(element.email)
      })
      console.log(emailArray);
      this.setState({allEmails: emailArray})
    })    
  }
 
  render() {
    const { classes } = this.props;
    return (
      <div>  
      <HeaderBar type={this.state.userType} />  
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
        required
        name="subject"
        label="Subject"
        className={classes.textField}
        value={this.state.subject}
        onChange={this.handleChange('subject')}
        margin="normal"
        variant="outlined"
      />
      <TextField
          required
          multiline
          name="messageBody"
          label="Body"
          className={classes.textField}
          value={this.state.messageBody}
          onChange={this.handleChange('messageBody')}
          margin="normal"
          variant="outlined"  
        />
        
        <Button
        onClick={this.handleSubmit}
        >
        Send E-Mail
        </Button>
      </form>
      </div>
    );
  }
}

MessageParents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageParents);