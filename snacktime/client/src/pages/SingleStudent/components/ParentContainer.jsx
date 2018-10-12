import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import './ParentContainer.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import indigo from '@material-ui/core/colors/indigo';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: indigo[500],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  childInfo: {
    margin: "15px",
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class ParentContainer extends Component {
  state = {
    parents: [],
    email: '',
    status: '',
    showAddNewParent: true,
    parentName: '',
    parentEmail: '',
    parentPassword: 'testpass',
    parentAddress: '',
    parentPhone: '',
    guardians: [],
    showAddNewGuardian: true,
    guardianName: '',
    guardianEmail: '',
    guardianAddress: '',
    guardianPhone: '',
    role: this.props.role,
    staffs:[],
    orgName:'',
    orgAddress:'',
    orgPhone:'',
    orgOpenTime:'',
    orgCloseTime:''
  };

  componentDidMount() {
    this.getExistingParent();
    this.getExistingPickup();
    this.getSchoolInfo();
    this.getStaffInfo();
    console.log(this.props.studentId, "STUDENT ID");
  }

  getSchoolInfo = () =>{
    //use this.props.orgId as parameter to fetch and assign it to appropriate states
    fetch(`/api/parent/org/${this.props.orgId}`)
      .then(resp => resp.json())
      .then(resp => this.setState({ orgName:resp.name, orgAddress: resp.address, orgPhone: resp.phone, orgOpenTime: resp.openTime, orgCloseTime: resp.closeTime  }))
  }

  getStaffInfo = () => {
    //use this.props.orgId as parameter to fetch and assign to state staffs
    fetch(`/api/parent/orgstaff/${this.props.orgId}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No staffs found') {
            this.setState({ status: 'No staffs found :(' });
          } else {
            const staffs = [];
            resp.map(staff => staffs.push(staff));
            this.setState({ staffs });
          }
        }
      });
  }

  getExistingPickup = () => {
    fetch(`/api/student/${this.props.studentId}/pickup`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No pickup found') {
            this.setState({ status: 'No pickup found :(' });
          } else {
            const guardians = [];
            resp.Pickups.map(guardian => guardians.push(guardian));
            this.setState({ guardians });
          }
        }
      });
  };

  getExistingParent = () => {
    fetch(`/api/student/${this.props.studentId}/parent`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === 'No parent found') {
            this.setState({ status: 'No parents found :(' });
          } else {
            const parents = [];
            resp.Parents.map(parent => parents.push(parent));
            this.setState({ parents });
          }
        }
      });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    console.log(this.state.email, "PARENT EMAIL");
    fetch(`/api/parent/email/${this.state.parentEmail}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.name) {
          this.setState({ existingParent: resp });
          const { name, email, phone, address, id } = this.state.existingParent;
          this.setState({
            parentId: id,
            status: `${name}, ${email}, ${phone}, ${address}`,
          });
        } else {
          this.setState({ status: "That email doesn't exist" });
        }
      });
  };

  capitalize = name => {
    const names = name.split(" ");
    for (var i = 0; i < names.length; i++) {
      names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1)
    }
    return names.join(" ")
  }

  handleSubmitNewParent = e => {
    e.preventDefault();
    let url = window.location.href;
    url = url.substring(0, url.length - 14);

    let newObj = {
      email: this.state.parentEmail,
      password: this.state.parentPassword,
      address: this.state.parentAddress,
      phone: this.state.parentPhone,
      name: this.capitalize(this.state.parentName),
      baseUrl: url

    };
    console.log(newObj);
    this.setState({ addParentForm: newObj });
    console.log('ADD PARENT FORM', this.state.addParentForm);
    console.log("STudnet IDDddddddd", this.props.studentId);
    fetch(`/api/student/${this.props.studentId}/parent`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newObj),
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (resp) {
          this.setState({
            status: 'Parent Added!',
            parentName: '',
            parentEmail: '',
            parentPassword: 'testpass',
            parentAddress: '',
            parentPhone: '',
          }, () => this.getExistingParent());
        } else {
          this.setState({ status: 'Parent not added' });
        }
        this.getExistingParent();
      });
  };

  handleSubmitNewGuardian = e => {
    e.preventDefault();
    // let url = window.location.href;
    // url = url.substring(0, url.length - 14);

    let newObj = {
      email: this.state.guardianEmail,
      //password: this.state.guardianPassword,
      address: this.state.guardianAddress,
      phone: this.state.guardianPhone,
      name: this.capitalize(this.state.guardianName),
      //baseUrl: url

    };

    this.setState({ addGuardianForm: newObj });
    fetch(`/api/student/${this.props.studentId}/pickup`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newObj),
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (resp) {
          this.setState({
            status: 'Pickup Added!',
            guardianName: '',
            guardianEmail: '',
            guardianPassword: 'testpass',
            guardianAddress: '',
            guardianPhone: '',
          }, () => this.getExistingPickup());
        } else {
          this.setState({ status: 'Pickup not added' });
        }
        this.getExistingPickup();
      });

  };

  handleAddNewParent = e => {
    e.preventDefault();
    this.setState({ addParentForm: {}, showAddNewParent: false, status: '' });
  };

  handleAddNewGuardian = e => {
    e.preventDefault();
    this.setState({ addGuardianForm: {}, showAddNewGuardian: false, status: '' });
  };

  makeAssociation = e => {
    e.preventDefault();
    fetch('/api/parentstudent', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        parentId: this.state.parentId,
        studentId: this.props.studentId,
      }),
    }).then(() => this.getExistingParent());
  };

  deleteAssociation = e => {
    const data = {
      studentId: this.props.studentId,
      parentId: e.target.name,
    };
    console.log(data);
    fetch('/api/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => this.getExistingParent());
  };

  editParentInfo = e => {
    const data = { parentId: e.target.name };
    fetch('/api/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => this.getExistingParent());
  };

  renderAddParentForm() {
    if (this.state.role === "staff")
      return (
        <div>
          <form>
            <TextField
              name="parentEmail"
              value={this.state.parentEmail}
              onChange={this.handleChange}
              id="addParents"
              label="Add Parents by Email"
              margin="normal"
              variant="outlined"
            />
            <button onClick={this.handleSearch} type="submit">
              Search
      </button>
          </form>
          {this.state.addParentForm && (
            <form>

              <TextField
                name="parentName"
                onChange={this.handleChange}
                value={this.state.parentName}
                id="ParentName"
                label="Parent's Name"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="parentPhone"
                onChange={this.handleChange}
                value={this.state.parentPhone}
                id="ParentPhone"
                label="Parent's Phone"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="parentEmail"
                onChange={this.handleChange}
                value={this.state.parentEmail}
                id="ParentEmail"
                label="Parent's Email"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="parentAddress"
                onChange={this.handleChange}
                value={this.state.parentAddress}
                id="ParentAddress"
                label="Parent's Address"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <input
                onClick={this.handleSubmitNewParent}
                value="Register and Email New Parent"
                type="submit"
              />
            </form>
          )}
          <p>{this.state.status}</p>
          {this.state.existingParent && (
            <button onClick={this.makeAssociation}>
              Add Existing Parent to Child
      </button>
          )}
          {this.state.showAddNewParent && (
            <button name="new" onClick={this.handleAddNewParent}>
              Create New Parent Account
      </button>
          )}
        </div>)

    else if (this.state.role === "parent")
      return (<div></div>)
  }

  renderGuardianForm() {
    if (this.state.role === "parent")
      return (
        <div>
          {this.state.addGuardianForm && (
            <form>

              <TextField
                name="guardianName"
                onChange={this.handleChange}
                value={this.state.guardianName}
                id="GuardianName"
                label="Guardian's Name"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="guardianPhone"
                onChange={this.handleChange}
                value={this.state.guardianPhone}
                id="GuardianPhone"
                label="Guardian's Phone"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="guardianEmail"
                onChange={this.handleChange}
                value={this.state.guardianEmail}
                id="GuardianEmail"
                label="Guardian's Email"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="guardianAddress"
                onChange={this.handleChange}
                value={this.state.guardianAddress}
                id="GuardianAddress"
                label="Guardian's Address"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <input
                onClick={this.handleSubmitNewGuardian}
                value="Add Guardian"
                type="submit"
              />
            </form>
          )}
          {this.state.showAddNewGuardian && (
            <button name="new" onClick={this.handleAddNewGuardian}>
              Add a Guardian
      </button>
          )}
        </div>)

    else if (this.state.role === "staff")
      return (<div></div>)
  }

  renderSchoolInfo(){
    const { classes } = this.props;
    if(this.state.role === "parent")
      return(
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>School</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Name</CustomTableCell>
                      <CustomTableCell>Phone</CustomTableCell>
                      <CustomTableCell>Address</CustomTableCell>
                      <CustomTableCell>Open Time</CustomTableCell>
                      <CustomTableCell>Close Time</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <CustomTableCell>{this.state.orgName}</CustomTableCell>
                      <CustomTableCell>{this.state.orgPhone}</CustomTableCell>
                      <CustomTableCell>{this.state.orgAddress}</CustomTableCell>
                      <CustomTableCell>{this.state.orgOpenTime}</CustomTableCell>
                      <CustomTableCell>{this.state.orgCloseTime}</CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Paper>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>)
  }

  renderStaffInfo(){
    const { classes } = this.props;
    if(this.state.role==="parent")
      return (
        <div>
    <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>Staff</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell>Email</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.staffs.map(staff => {
            return (
              <TableRow>
                <CustomTableCell>{staff.name}</CustomTableCell>
                <CustomTableCell>{staff.email}</CustomTableCell>
              </TableRow>
            );
            })}
            </TableBody>
          </Table>
      </Paper>
    </ExpansionPanelDetails>
  </ExpansionPanel>
  </div>)
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Student Information</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Address</CustomTableCell>
                      <CustomTableCell>DOB</CustomTableCell>
                      <CustomTableCell>Allergies</CustomTableCell>
                      <CustomTableCell>Medications</CustomTableCell>
                      <CustomTableCell>Note</CustomTableCell>
                      <CustomTableCell>Doctor</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  
                    <TableRow>
                      <CustomTableCell>{this.props.address}</CustomTableCell>
                      <CustomTableCell>{this.props.dob}</CustomTableCell>
                      <CustomTableCell>{this.props.allergies}</CustomTableCell>
                      <CustomTableCell>{this.props.medication}</CustomTableCell>
                      <CustomTableCell>{this.props.notes}</CustomTableCell>
                      <CustomTableCell>{this.props.doctor}</CustomTableCell>
                    </TableRow>
                  
                 
                  </TableBody>
                </Table>
            </Paper>

            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Parents</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Name</CustomTableCell>
                      <CustomTableCell>Phone</CustomTableCell>
                      <CustomTableCell>Email</CustomTableCell>
                      <CustomTableCell>Address</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.parents.map(parent => {
                  return (
                    <TableRow>
                      <CustomTableCell>{parent.name}</CustomTableCell>
                      <CustomTableCell>{parent.phone}</CustomTableCell>
                      <CustomTableCell>{parent.email}</CustomTableCell>
                      <CustomTableCell>{parent.address}</CustomTableCell>
                    </TableRow>
                  );
                  })}
                  </TableBody>
                </Table>
            </Paper>
                  
                {this.renderAddParentForm()}

              {/* </Typography> */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Guardians</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Name</CustomTableCell>
                      <CustomTableCell>Phone</CustomTableCell>
                      <CustomTableCell>Email</CustomTableCell>
                      <CustomTableCell>Address</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.guardians.map(guardian => {
                  return (
                    <TableRow>
                      <CustomTableCell>{guardian.name}</CustomTableCell>
                      <CustomTableCell>{guardian.phone}</CustomTableCell>
                      <CustomTableCell>{guardian.email}</CustomTableCell>
                      <CustomTableCell>{guardian.address}</CustomTableCell>
                    </TableRow>
                  );
                  })}
                  </TableBody>
                </Table>
            </Paper>

                {this.renderGuardianForm()}

            </ExpansionPanelDetails>
          </ExpansionPanel>
                
          {this.renderSchoolInfo()}
          {this.renderStaffInfo()}

         
          
        </div>
      </div>
    );
  }
}

ParentContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParentContainer);
