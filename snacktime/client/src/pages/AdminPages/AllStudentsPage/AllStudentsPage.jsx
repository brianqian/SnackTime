import React, { Component } from 'react';
import { Router } from 'react-router';
import {Link} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import './AllStudentsPage.css';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
// import DashboardItem from '../../components/DashboardItem/DashboardItem';



export default class AllStudentsPage extends Component {
  state = {
    allStudents: [],
  };

  componentWillMount() {
    this.getAllStudents();
  };


  // componentDidMount(){
  //   this.getAllChildren()
  // }
  getAllStudents = () =>{
    fetch('/api/student')
    .then(res =>res.json())
    .then(res => 
      this.setState({allStudents: res}, function() {
        console.log(this.state.allStudents);
      })
    );
  };

  render() {
    return (
      <div className="students-container">
      <HeaderBar />
        {this.state.allStudents.length > 0
          ? this.state.allStudents.map(student => (
            <Link 
              to={`/allstudentspage/${student.id}`}
            >
            <Chip
              avatar={<FaceIcon />}
              label={student.name}
              clickable
              variant="outlined"
              color="primary"
              className="student__item"
              // image="/img/boy.png"
              // notifications={student.notifications}
            />
            </Link>
            ))
          : 'No students to display'}
      </div>
    )
  }
}
