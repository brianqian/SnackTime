import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '75vw',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class ParentContainer extends Component {
  state = {
    parents: [],
    email: '',
    status: '',
    showAddNewParent: true,
    addName: '',
    addEmail: '',
    addPassword: 'testpass',
    addAddress: '',
    addPhone: '',
  };

  componentDidMount() {
    this.getExistingParent();
  }

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
    fetch(`/api/parent/email/${this.state.email}`)
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

  capitalize = name =>{
    const names = name.split(" ");
    for(var i =0;i<names.length;i++){
      names[i]=names[i].charAt(0).toUpperCase()+ names[i].slice(1)
    }
    return names.join(" ")
  }

  handleSubmitNewParent = e => {
    e.preventDefault();
    let url = window.location.href;
    url = url.substring(0, url.length - 14);
    // this.setState({ showAddNewParent: true });
    // let newObj = Object.assign({}, this.state.addParentForm);
    // newObj.password = 'asdf';
    let newObj = {
      email: this.state.addEmail,
      password: this.state.addPassword,
      address: this.state.addAddress,
      phone: this.state.addPhone,
      name: this.capitalize(this.state.addName),
      baseUrl: url

    };
    console.log(newObj);
    this.setState({ addParentForm: newObj });
    console.log('ADD PARENT FORM', this.state.addParentForm);
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
            addName: '',
            addEmail: '',
            addPassword: 'testpass',
            addAddress: '',
            addPhone: '',
          });
        } else {
          this.setState({ status: 'Parent not added' });
        }
        this.getExistingParent();
      });
  };

  handleAddNewParent = e => {
    e.preventDefault();
    this.setState({ addParentForm: {}, showAddNewParent: false, status: '' });
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

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Parents</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {this.state.parents.map(parent => {
                  return (
                    <div className="existing-parent-info">
                      <p>Name: {parent.name}</p>
                      <p>Phone: {parent.phone}</p>
                      <p>Email: {parent.email}</p>
                      <p>Address: {parent.address}</p>
                      <button name={parent.id} onClick={this.deleteAssociation}>
                        X
                      </button>
                      <button name={parent.id} onClick={this.editParentInfo}>
                        Edit
                      </button>
                    </div>
                  );
                })}
                <form>
                  <label htmlFor="existing">Add Parent by Email: </label>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <button onClick={this.handleSearch} type="submit">
                    Search
                  </button>
                </form>
                {this.state.addParentForm && (
                  <form>
                    <label htmlFor="name">Name: </label>
                    <input
                      onChange={this.handleChange}
                      value={this.state.addName}
                      name="addName"
                      type="text"
                    />
                    <label htmlFor="phone">Phone: </label>
                    <input
                      onChange={this.handleChange}
                      value={this.state.addPhone}
                      name="addPhone"
                      type="text"
                    />
                    <label htmlFor="email">Email: </label>
                    <input
                      onChange={this.handleChange}
                      value={this.state.addEmail}
                      name="addEmail"
                      type="text"
                    />
                    <label htmlFor="address">Address: </label>
                    <input
                      onChange={this.handleChange}
                      value={this.state.addAddress}
                      name="addAddress"
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
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

ParentContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParentContainer);
