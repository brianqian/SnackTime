import React, { Component } from 'react';
import Card from './components/Card';
import './SingleStudent.css';
import ParentContainer from './components/ParentContainer';
import Auth from '../../utils/Auth';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import {Redirect} from 'react-router-dom'

export default class SingleStudent extends Component {
  state = {
    OrganizationId: '',
    address: '',
    allergies: '',
    createdAt: '',
    dob: '',
    doctor: '',
    studentId: '',
    medication: '',
    name: '',
    notes: '',
    updatedAt: '',
    orgUserCheck: true,
    role:this.props.location.state.role
  };

  componentWillMount() {
    console.log("single student page will mount");
     this.getSingleStudent();
  }
  
  async getSingleStudent() {
    let result = await (await fetch(
      `/api/allinfo/student/${this.props.match.params.student}`
      )).json();
      await this.setState(result);
      if (this.props.location.state.role === 'staff'){
      await Auth.StaffAuthorize(this, result.OrganizationId);
      }else{
        await Auth.ParentAuthorize(this); 
        console.log('STATE', this.state);
      }
      console.log(this.state)
      var binary = '';
        var bytes = this.state.image.data;
        var len = bytes.length;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        let img64bitStr = await window.btoa( binary )
        this.setState({img64bitStr:img64bitStr});
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
      // if (true){
        
      return (
        <div>
            <HeaderBar type={`${this.state.userType}`}/>
          
        <div className="student-container">
          {/* <img src={`data:image/png;base64,${this.state.img64bitStr}`}/> */}
          <Card
            studentId={this.props.match.params.student}
            name={this.state.name}
            role={this.state.role}
            image = {this.state.img64bitStr}
          />
          <ParentContainer
            className="student__item"
            name={this.state.name}
            destination="DailyReportPage"
            studentId={this.props.match.params.student}
            address={this.state.address}
            allergies={this.state.allergies}
            medication={this.state.medication}
            doctor={this.state.doctor}
            dob={this.state.dob}
            notes={this.state.notes}
            role={this.state.role}
            orgId={this.state.OrganizationId}

            // image={this.state.image}
          />
        </div>
        </div> 
      );
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: '/notAuthorized',
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
