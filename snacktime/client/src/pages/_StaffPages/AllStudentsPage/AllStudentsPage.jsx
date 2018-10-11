import React, { Component } from 'react';
import { Redirect, Router } from 'react-router';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import './AllStudentsPage.css';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import Auth from '../../../utils/Auth';
// import DashboardItem from '../../components/DashboardItem/DashboardItem';

export default class AllStudentsPage extends Component {
  state = {
    name: '',
    userId: '',
    orgName: '',
    orgId: '',
    loggedIn: false,
    loginRejected: false,
    allStudents: [],
  };

  async componentWillMount() {
    await Auth.StaffAuthorize(this);
    await this.getAllStudents();
  }

  getAllStudents = () => {
    fetch(`/api/student/${this.state.orgId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ allStudents: res }, function() {
          console.log(this.state.allStudents);
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="students-container">
          <HeaderBar />
          {this.state.allStudents.length > 0
            ? this.state.allStudents.map(student => (
                <Link to={`/allstudentspage/${student.id}`}>
                  <Chip
                    studentId={student.id}
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
      );
    }
    if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: '/notAuthorized',
            state: { type: 'Staff' },
          }}
        />
      );
    }
    return <div />;
  }
}
