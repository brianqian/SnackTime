import React, { Component } from 'react';
import Card from './components/Card';
import './SingleStudent.css';
import ParentContainer from './components/ParentContainer';
import Auth from '../../utils/Auth';
import {Redirect} from 'react-router-dom'

export default class SingleStudent extends Component {
  state = {
    OrganizationId: '',
    address: '',
    allergies: '',
    createdAt: '',
    dob: '',
    doctor: '',
    id: '',
    medication: '',
    name: '',
    notes: '',
    updatedAt: '',
    orgUserCheck: true
  };

  async componentWillMount() {
    await this.getSingleStudent();
  }
  
  async getSingleStudent() {
    let result = await (await fetch(
      `/api/allinfo/student/${this.props.match.params.student}`
      )).json();
    await Auth.StaffAuthorize(this, result.OrganizationId);
    await this.setState(result);
    return result.OrganizationId;
  }

  handleAddParentClick = e => {
    console.log(e.target.name);
  };

  handleAddParentClick = e => {
    console.log(e.target.name);
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="student-container">
          <Card
            className="student__item"
            name={this.state.name}
            destination="DailyReportPage"
            id={this.state.id}
            address={this.state.address}
            allergies={this.state.allergies}
            medication={this.state.medication}
            doctor={this.state.doctor}
            dob={this.state.dob}
            notes={this.state.notes}

            // image={this.state.image}
          />
          <ParentContainer studentId={this.props.match.params.student} />
        </div>
      );
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: '/notAuthorized',
            state: { type: 'Staff' },
          }}
        />
      );
    } else if (!this.state.orgUserCheck) {
      console.log(this.state)
      return <Redirect to="/staffhomepage" />;
    } else {
      return <div />;
    }
  }
}
