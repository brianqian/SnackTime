import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import notFound from './pages/notFound';
import StaffHomePage from './pages/_StaffPages/StaffHomePage/StaffHomePage';
import ParentHomePage from './pages/_ParentPages/ParentHomePage/ParentHomePage';
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
import MultiSelectContainer from './pages/_StaffPages/UpdateDailyReport/MultiSelect/MultiSelectContainer';
import Settings from "./pages/_StaffPages/StaffSettings/StaffSettingsPage";
import UpdateCalendar from './pages/_StaffPages/UpdateCalendar/UpdateCalendar';
import MessageParents from './pages/_StaffPages/MessageParents/MessageParents';
import AddHighlight from './pages/_StaffPages/UpdateDailyReport/AddHighlight/AddHighlight';
import Timepicker from './components/TimePicker/TimePicker'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/staffhomepage" component={StaffHomePage} />
            <Route exact path="/parenthomepage" component={ParentHomePage} />
            <Route exact path="/staffhome" component={StaffHomePage} />
            <Route exact path="/addstaff" component={AddStaff} />
            <Route exact path="/dailyreportmenu" component={DailyReportMenu} />
            <Route exact path="/messageparents" component={MessageParents} />
            <Route exact path="/studentselect" component={MultiStudentSelect} />
            <Route exact path="/dailyreport/addnap" component={AddNap} />
            <Route exact path="/dailyreport/addpotty" component={AddPotty} />
            <Route exact path="/dailyreport/addmeds" component={AddMeds} />
            <Route exact path="/dailyreport/addmeal" component={AddMeal} />
            <Route exact path="/addnote" component={AddNote} />
            <Route exact path="/addhighlight" component={AddHighlight} />
            <Route exact path="/dailyreport/addincident" component={AddIncident} />
            <Route exact path="/notauthorized" component={notAuthorized} />
            <Route exact path="/addstudent" component={AddStudent} />
            <Route exact path="/allstudentspage" component={AllStudents} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword/:key" component={ResetPassword} />
            <Route path="/allstudentspage/:student" component={SingleStudent} />
            <Route exact path="/staffsettings" component={StaffSettingsPage} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route exact path="/multiselect" component={MultiSelectContainer} /> {/*TEST ROUTE*/}
            <Route exact path="/staffsettings" component={Settings} />
            <Route exact path="/updatecalendar" component={UpdateCalendar} />
            <Route exact path="/picker" component={Timepicker} /> {/*TEST ROUTE*/}
            <Route component={notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
