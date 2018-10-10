import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import notFound from './pages/notFound';
import StaffHomePage from './pages/_StaffPages/StaffHomePage/StaffHomePage';
import notAuthorized from './pages/notAuthorized';
import AddStudent from './pages/_StaffPages/AddStudent/AddStudent';
import AddStaff from './pages/_StaffPages/AddStaff/AddStaff';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AllStudents from './pages/_StaffPages/AllStudentsPage/AllStudentsPage';
import SingleStudent from './pages/SingleStudent/SingleStudent';
import ResetPassword from './pages/ForgotPassword/components/ResetPassword';
import DailyReportMenu from './pages/_StaffPages/UpdateDailyReport/DailyReportMenu/DailyReportMenu';
import MultiStudentSelect from './pages/_StaffPages/MultiStudentSelect/MultiStudentSelect';
import AddNap from './pages/_StaffPages/UpdateDailyReport/AddNap/AddNap';
import AddPotty from './pages/_StaffPages/UpdateDailyReport/AddPotty/AddPotty';
import AddMeds from './pages/_StaffPages/UpdateDailyReport/AddMeds/AddMeds';
import AddMeal from './pages/_StaffPages/UpdateDailyReport/AddMeal/AddMeal';
import AddNote from './pages/_StaffPages/UpdateDailyReport/AddNote/AddNote';
import AddIncident from './pages/_StaffPages/UpdateDailyReport/AddIncident/AddIncident';
import StaffSettingsPage from './pages/_StaffPages/StaffSettings/StaffSettingsPage';
import ChangePassword from './pages/ForgotPassword/components/ChangePassword';

class App extends Component {
  state = {};

  updateState = dataObject => {
    console.log('running');
    const { userId, userType, orgId } = dataObject;
    console.log(dataObject);
    this.setState(
      {
        userId,
        userType,
        orgId,
      },
      function() {
        console.log('APP STATE', this.state);
      }
    );
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/staffhomepage" component={StaffHomePage} />
            <Route exact path="/addstaff" component={AddStaff} />
            <Route exact path="/dailyreportmenu" component={DailyReportMenu} />
            <Route exact path="/studentselect" component={MultiStudentSelect} />
            <Route exact path="/dailyreport/addnap" component={AddNap} />
            <Route exact path="/dailyreport/addpotty" component={AddPotty} />
            <Route exact path="/dailyreport/addmeds" component={AddMeds} />
            <Route exact path="/dailyreport/addmeal" component={AddMeal} />
            <Route exact path="/dailyreport/addnote" component={AddNote} />
            <Route
              exact
              path="/dailyreport/addincident"
              component={AddIncident}
            />
            <Route exact path="/notauthorized" component={notAuthorized} />
            <Route exact path="/addstudent" component={AddStudent} />
            <Route exact path="/allstudentspage" component={AllStudents} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword/:key" component={ResetPassword} />
            <Route path="/allstudentspage/:student" component={SingleStudent} />
            <Route exact path="/staffsettings" component={StaffSettingsPage} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route component={notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
