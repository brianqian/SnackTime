import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
// import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector'
// import { Redirect } from "react-router-dom";
import Auth from '../../../../utils/Auth';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


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


class AddHighlight extends React.Component {
  state = {
    time: '',
    highlight: null,
    id: this.props.location.state.id,
    name:this.props.location.state.name,
    role:this.props.location.state.role,
    reportId: '',
    multiline: 'Controlled',
    noteExists:false,
    snackbarMessage:""
  };
  componentWillMount() {
    console.log(this.state.id);
    Auth.StaffAuthorize(this);

    if(this.state.role ==="staff")
      this.getHighlights();
    console.log("Log:" ,this.state.id, this.state.name, this.state.role)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getHighlights= () =>{
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    fetch(`/api/student/${this.state.id}/report/${date}`)
    .then(resp=>resp.json())
    .then(resp=>{
      console.log(resp);
      if(resp !== "No Notes"){
        this.setState({highlight:resp.highlight, noteExists:true, reportId: resp.id})
      }
    })
  }

  handleClickSnackbar = () => {
    this.setState({ open: true });
  };
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  postHighlight =() => {
    console.log("In post highlight")
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    if(this.state.role === "staff"){
    fetch(`/api/student/${this.state.id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: this.state.id,
        highlight: this.state.highlight,
        noteForParents:null,
        date: date
      })
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => {
        this.setState({snackbarMessage:"Highlight added"},this.handleClickSnackbar())
      });
    }
  };

  updateHighlight = () => {
    console.log("In update highlight")
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    if(this.state.role === "staff"){
      fetch(`/api/report/highlight/${this.state.reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          highlight: this.state.highlight,
        })
      }).then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => {
        this.setState({snackbarMessage:"Highlight added"},this.handleClickSnackbar())
      });
    }
  };


  handleSubmit = event => {
    event.preventDefault();
    if(this.state.highlight.trim() === ""){
      this.setState({snackbarMessage:"Please write highlight"}, this.handleClickSnackbar())
    }
    else{
      if(this.state.noteExists)
        this.updateHighlight()
      else
        this.postHighlight();
    }
  };  

  renderTexField(){
    const { classes } = this.props;
    if(this.state.role==="staff") 
      return(<div>
        <TextField
          required
          name="highlight"
          label={this.state.name}
          className={classes.textField}
          value={this.state.highlight}
          onChange={this.handleChange('highlight')}
          margin="normal"
          variant="outlined"  
        />
        </div>)
  }
  render() {
    const { classes } = this.props;
    return (
      <div>  
      <HeaderBar type={this.state.userType} />  
      <form className={classes.container} noValidate autoComplete="off">
      {this.renderTexField()}
        
        <Button className={classes.submitbutton}
        onClick={this.handleSubmit}
        >
        Add Activity
        </Button>
      </form>
      <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

AddHighlight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddHighlight);