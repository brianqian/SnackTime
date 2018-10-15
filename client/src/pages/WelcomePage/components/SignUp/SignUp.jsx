import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector';
import TextField from '@material-ui/core/TextField';

export default class SignUp extends React.Component {
  state = {
    orgName: '',
    orgPhoneNum: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    openTime: '',
    closeTime: '',
    firstName: '',
    lastName: '',
    adminEmail: '',
    password: '',
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  capitalize = name =>{
    const names = name.split(" ");
    for(var i =0;i<names.length;i++){
      names[i]=names[i].charAt(0).toUpperCase()+ names[i].slice(1)
    }
    return names.join(" ")
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    //const { name, email, password, orgName } = this.state;
    fetch('/auth/organization', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({orgName: this.capitalize(this.state.orgName), orgPhoneNum: this.state.orgPhoneNum, closeTime: this.state.closeTime, openTime: this.state.openTime, orgAddress: this.state.streetAddress+ ", "+this.state.city+", "+ this.state.zipCode}),
    })
      .then(res => res.json())
      .then(res => {
        console.log('orgid',res.id);
        fetch('/auth/signup/staff', {
          method: 'POST',
          headers: {
            "Content-type": 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name: this.capitalize(this.state.firstName + " " + this.state.lastName),
            email: this.state.adminEmail,
            password: this.state.password,
            orgId: res.id,
          }),
        });
      })
      .then(res => {
        console.log('signup success')
        // window.location.href="/StaffHomePage";
      })
      .catch(err=>console.log(err))
  };

  handleSubmitClose = e => {
    this.handleSubmit(e);
    this.handleClose();
  }
  setOpenTime = time => {
    this.setState({ openTime: time })
  }

  setCloseTime = time => {
    this.setState({ closeTime: time })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Create a snacktime account for your organization!</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Organization Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  All fields are required to create your Organization.
                </DialogContentText>            
              
              <form>
                
                <TextField
                  onChange={this.handleChange}
                  value={this.state.orgName}
                  id="orgSignup-Name"
                  name="orgName"
                  type="text"
                  label="Organization Name"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                
                <TextField
                  onChange={this.handleChange}
                  value={this.state.orgPhoneNum}
                  id="orgSignup-phoneNum"
                  name="orgPhoneNum"
                  type="number"
                  label="Organization Phone"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                {/* <label htmlFor="orgSignup-email">Email: </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.orgEmail}
                  id="orgSignup-email"
                  name="email"
                  type="text"
                /> */}
                
                <TextField
                  onChange={this.handleChange}
                  value={this.state.streetAddress}
                  id="orgSignup-streetAddress"
                  name="streetAddress"
                  type="text"
                  label="Street Address"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                
                <TextField
                  onChange={this.handleChange}
                  value={this.state.city}
                  id="orgSignup-City"
                  name="city"
                  type="text"
                  label="City"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                
                <TextField
                  onChange={this.handleChange}
                  value={this.state.zipCode}
                  id="orgSignup-zipCode"
                  type="number"
                  name="zipCode"
                  onInput={(e)=>{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
                  }}
                  label="Zip"
                  margin="normal"
                  variant="outlined"
                />
                
                <DateTimeSelector
                  //onChange={this.handleChange}
                  setTime={this.setOpenTime}
                  value={this.state.openTime}
                  id="orgSignup-openTime"
                  name="openTime"
                  type="time"
                  label="Open Time"
                />
         
                
                <DateTimeSelector
                  //onChange={this.handleChange}
                  value={this.state.closeTime}
                  setTime={this.setCloseTime}
                  id="orgSignup-closeTime"
                  name="closeTime"
                  type="time"
                  label="Close Time"
                />
              </form>
              <hr/>
              <DialogTitle id="form-dialog-title">Administrator Information</DialogTitle>
              <DialogContentText>
                All fields are required to create your Admin account.
              </DialogContentText>  
              <form>
                
                <TextField
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  id="adminSignup-firstName"
                  name="firstName"
                  type="text"
                  label="Your First Name"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
               
                <TextField
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  id="adminSignup-lastName"
                  name="lastName"
                  type="text"
                  label="Your Last Name"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                
                <TextField
                  onChange={this.handleChange}
                  value={this.state.adminEmail}
                  id="adminSignup-email"
                  name="adminEmail"
                  type="text"
                  label="Your Email"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
               
                <TextField
                  onChange={this.handleChange}
                  value={this.state.password}
                  id="adminSignup-password"
                  name="password"
                  type="password"
                  label="Enter Password"
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                <input onClick={this.handleSubmitClose} id="signup-submit" type="submit" />
              </form>
            </DialogContent>
          </Dialog>  
      </div>
    );
  }
}

