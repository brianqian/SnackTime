import React, { Component } from 'react';
import Card from './components/Card';
import './SingleStudent.css';
import ParentContainer from './components/ParentContainer/ParentContainer'

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

  };

  componentWillMount() {
    this.getSingleStudent();
    this.getParentsInfo();
    console.log(this.props.match.params.student);
  }

  getSingleStudent = () => {
    fetch(`/api/allinfo/student/${this.props.match.params.student}`)
      .then(res => res.json())
      .then(res => {
        const stateObj = Object.assign({}, res);
        //if stateobj.orgid === user.orgid then...
        this.setState(stateObj);
        console.log(this.state);
      });
  };

  getParentsInfo = ()=>{
    //return an array of objects containing parent info
    fetch(`/student/${this.props.match.params.student}/parent`)
    .then(res=>res.text())
    // .then(res=>this.setState({parents: res}))
    .then((res)=>console.log(res))
    
  }

  handleAddParentClick = (e)=>{
    console.log(e.target.name)
  }

  render() {
    return (
      <div className="student-container">
        <Card
          className="student__item"
          name={this.state.name}
          destination="DailyReportPage"
          address={this.state.address}
          allergies={this.state.allergies}
          medication={this.state.medication}
          doctor={this.state.doctor}
          dob={this.state.dob}
          notes={this.state.notes}
          // image={this.state.image}
        />
        <ParentContainer onClick={this.handleAddParentClick}/>
      </div>
    );
  }
}
