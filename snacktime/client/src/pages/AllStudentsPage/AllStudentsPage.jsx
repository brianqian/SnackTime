import React, { Component } from 'react';
import './AllStudentsPage.css';
import DashboardItem from '../../components/DashboardItem/DashboardItem';

class AllStudentsPage extends Component {
  state = {
    allStudents: [],
  };

  componentWillMount() {
    this.getAllStudents();
  }

  getAllStudents = () => {
    fetch('/api/student')
      .then(res => res.json())
      .then(res =>
        this.setState({ allStudents: res }, function() {
          console.log(this.state.allStudents);
        })
      );
  };

  render() {
    console.log('Students: ', this.state.allStudents);
    return (
      <div className="students-container">
        {this.state.allStudents.length > 0
          ? this.state.allStudents.map(student => (
              <DashboardItem
                className="student__item"
                title={student.name}
                destination={`/allstudentspage/${student.id}`}
                image="/img/boy.png"
                // notifications={student.notifications}
              />
            ))
          : 'No students to display'}
      </div>
    );
  }
}
//
export default AllStudentsPage;
