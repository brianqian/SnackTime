import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import './AllStudentsPage.css';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import Auth from '../../../utils/Auth';
import Avatar from '@material-ui/core/Avatar';
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
    loadingMessage: "Loading..."
  };

  async componentWillMount() {
    let data = await (await fetch('/auth/loggedin')).json();
    if (data.userType === 'staff') {
      await Auth.StaffAuthorize(this);
    } else {
      await Auth.ParentAuthorize(this);
      console.log(this.state);
    }
    if (this.state.userType === 'staff') {
      this.getOrgStudents();
    } else {
      this.getUserStudents();
    }
  }

  getUserStudents = () => {
    console.log(this.state.userId);
    fetch(`/api/parent/parentinfo/${this.state.userId}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.setState({ allStudents: resp })
      })
      .catch(err => console.log(err))
  }

  getOrgStudents = () => {
    fetch(`/api/student/${this.state.orgId}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (resp.length > 0)
          this.setState({ allStudents: resp });
        else
          this.setState({ loadingMessage: "No students to display" });
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="students-container">
          <HeaderBar type={this.state.userType} />

          {this.state.allStudents.length > 0
            ? this.state.allStudents.map(student => (
              <Link key={student.id} to={{ pathname: `/allstudentspage/${student.id}`, state: { role: this.state.userType } }}>
                <Chip
                  // studentId={student.id}
                  avatar={
                    <Avatar>
                      <FaceIcon />
                    </Avatar> 
                  }
                  label={student.name}
                  // clickable
                  variant="outlined"
                  color="primary"
                  className="student__item"
                // image="/img/boy.png"
                // notifications={student.notifications}
                />
              </Link>
            ))
            : <div>{this.state.loadingMessage}</div>}
        </div>
      );
    }
    if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: '/notAuthorized'
          }}
        />
      );
    }
    return <div />;
  }
}
