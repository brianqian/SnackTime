import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
// import { Redirect } from "react-router-dom";
import Auth from '../../../utils/Auth'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  submitbutton:{
    marginTop:25,
    height:10
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
    this.sendEmail();
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

  sendEmail = () => {
    fetch(`/api/emailparents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emails: this.state.allEmails,
        subject: this.state.subject,
        body: this.state.messageBody,
      })
    })
    .then(resp =>
      resp.json()
    )
    .then(resp => console.log(resp));
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
        
        <Button className={classes.submitbutton}
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