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
import Schedule from './pages/Schedule/Schedule';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AllStudents from './pages/_StaffPages/AllStudentsPage/AllStudentsPage';
import SingleStudent from './pages/SingleStudent/SingleStudent';
import ResetPassword from './pages/ForgotPassword/components/ResetPassword';
import DailyReportMenu from './pages/_StaffPages/UpdateDailyReport/DailyReportMenu/DailyReportMenu';
import AddNap from './pages/_StaffPages/UpdateDailyReport/AddNap/AddNap';
import AddPotty from './pages/_StaffPages/UpdateDailyReport/AddPotty/AddPotty';
import AddMeds from './pages/_StaffPages/UpdateDailyReport/AddMeds/AddMeds';
import AddMeal from './pages/_StaffPages/UpdateDailyReport/AddMeal/AddMeal';
import AddNote from './pages/_StaffPages/UpdateDailyReport/AddNote/AddNote';
import AddIncident from './pages/_StaffPages/UpdateDailyReport/AddIncident/AddIncident';
import StaffSettingsPage from './pages/_StaffPages/StaffSettings/StaffSettingsPage';
import ChangePassword from './pages/ForgotPassword/components/ChangePassword';
import Settings from './pages/_StaffPages/StaffSettings/StaffSettingsPage';
import UpdateCalendar from './pages/_StaffPages/UpdateCalendar/UpdateCalendar';
import MessageParents from './pages/_StaffPages/MessageParents/MessageParents';
import AddHighlight from './pages/_StaffPages/UpdateDailyReport/AddHighlight/AddHighlight';
import DailyReportArchive from './pages/DailyReportArchive/DailyReportArchive';
import ParentSettings from './pages/_ParentPages/ParentHomePage/components/ParentSettings';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './pages/WelcomePage/components/NavBar/NavBar';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact path="/"
              render={() => {
                return(
                <MuiThemeProvider theme={theme}>
                  <NavBar/>
                </MuiThemeProvider>)
              }}
            />
            <Route exact path="/staffhomepage" component={StaffHomePage} />
            <Route exact path="/parenthomepage" component={ParentHomePage} />
            <Route exact path="/staffhome" component={StaffHomePage} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/addstaff" component={AddStaff} />
            <Route exact path="/dailyreportmenu" component={DailyReportMenu} />
            <Route exact path="/messageparents" component={MessageParents} />
            <Route exact path="/dailyreport/addnap" component={AddNap} />
            <Route exact path="/dailyreport/addpotty" component={AddPotty} />
            <Route exact path="/dailyreport/addmeds" component={AddMeds} />
            <Route exact path="/dailyreport/addmeal" component={AddMeal} />
            <Route exact path="/addnote" component={AddNote} />
            <Route exact path="/addhighlight" component={AddHighlight} />
            <Route exact path="/dailyreport/addincident" component={AddIncident}
            />
            <Route exact path="/notauthorized" component={notAuthorized} />
            <Route exact path="/addstudent" component={AddStudent} />
            <Route exact path="/allstudentspage" component={AllStudents} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword/:key" component={ResetPassword} />
            <Route path="/allstudentspage/:student" component={SingleStudent} />
            <Route exact path="/staffsettings" component={StaffSettingsPage} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route exact path="/staffsettings" component={Settings} />
            <Route exact path="/updatecalendar" component={UpdateCalendar} />
            <Route exact path="/archive" component={DailyReportArchive} />
            <Route exact path="/parentsettings" component={ParentSettings} />
            <Route exact path="/schedule" component={Schedule} />
            <Route component={notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
