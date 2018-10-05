import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import notFound from './pages/notFound';
import StaffHomePage from './pages/StaffHomePage/StaffHomePage';
import notAuthorized from './pages/notAuthorized';
import AddStudent from './pages/AddStudent/AddStudent';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AllStudents from './pages/AllStudentsPage/AllStudentsPage';
import SingleStudent from './pages/SingleStudent/SingleStudent'

class App extends Component {
  state = {
      userId: '',
      userType: '',
      orgId: ''

    }
    updateAppState = dataObject =>{
      this.setState({

      })
    }
  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={WelcomePage}/>
            <Route exact path="/staffhomepage" component={StaffHomePage}  role={this.state.userType} organizationId={this.state.orgId} />
            <Route exact path="/notauthorized" component={notAuthorized} />
            <Route exact path="/addstudent" component={AddStudent} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/allstudentspage" component={AllStudents} />
            <Route exact path="/singlestudent" component={SingleStudent} />
            <Route component={notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
