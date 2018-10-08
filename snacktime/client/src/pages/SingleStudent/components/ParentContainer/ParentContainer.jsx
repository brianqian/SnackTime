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
    // addParentForm: {
    //   name: 'test',
    //   phone: '',
    //   email: '',
    //   address: '',
    // },
  };

  checkIfExistingParent() {
    fetch('/api/parent');
  }
  handleChange = e => {
    const { name, value } = e.target;
    if (name.includes('add')) {
      this.setState({ addParentForm: { [name]: value } });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSearch = e => {
    e.preventDefault();
    fetch(`/api/parent/?email=${this.state.email}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.name) {
          this.setState({ addParentForm: resp })
        }else{
          
        }
      });
  };

  handleAddNewParent = e =>{
    e.preventDefault();
    this.setState({addParentForm: {}})
  }

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
                      value={this.state.addParentForm.name}
                      name="addName"
                      type="text"
                    />
                    <label htmlFor="phone">Phone: </label>
                    <input
                      onChange={this.handleChange}
                      value={this.state.addParentForm.phone}
                      name="addPhone"
                      type="text"
                    />
                    <label htmlFor="email">Email: </label>
                    <input
                      onChange={this.handleChange}
                      value={this.state.addParentForm.email}
                      name="addEmail"
                      type="text"
                    />
                    <label htmlFor="address">Address: </label>
                    <input
                      onChange={this.handleChange}
                      value={this.state.addParentForm.address}
                      name="addAddress"
                      type="text"
                    />
                    <input onClick={this.submitNewParent}value="Submit New Parent"type="submit"/>
                  </form>
                )}
                <button name="new" onClick={this.handleAddNewParent}>
                  Add New Parent
                </button>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

// export default ParentContainer;

// function SimpleExpansionPanel(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <ExpansionPanel>
//         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography className={classes.heading}>Parents</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>

//     </div>
//   );
// }

ParentContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParentContainer);
