import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import notFound from './pages/notFound';
import AdminHome from './pages/AdminHome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/adminhome" component={AdminHome} />
            <Route component={notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
