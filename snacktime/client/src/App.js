import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainParent from './pages/MainParent';
import MainAdmin from './pages/MainAdmin';
import notFound from './pages/notFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={MainAdmin} />
            <Route exact path="/parents" component={MainParent} />
            <Route component={notFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
