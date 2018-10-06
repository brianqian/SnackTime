import React, { Component } from 'react';
import Card from './components/Card';
import './SingleStudent.css';

export default class SingleStudent extends Component {
  state = {
    
  };

  componentWillMount() {
    this.getSingleStudent();
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

  render() {
    return (
      <div className="student-container">
        <Card
          className="student__item"
          title={this.state.name}
          destination="DailyReportPage"
          // image={this.state.image}
        />
      </div>
    );
  }
}
