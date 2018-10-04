import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import notFound from './pages/notFound';
import StaffHomePage from './pages/StaffHomePage/StaffHomePage';
import notAuthorized from './pages/notAuthorized';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/staffhomepage" component={StaffHomePage} />
            <Route exact path="/notauthorized" component={notAuthorized} />
            <Route component={notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
