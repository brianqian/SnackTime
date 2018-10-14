import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';

class WelcomePage extends Component {
  componentWillMount() {
    console.log('welcome page', this.props);
  }
  render() {
    return (
      <div className="welcomepage-container">
        <div className="welcomepage-header-image">
          {/* <About /> */}
          <div className="welcomepage-header-text">
            <p>Welcome to SnackTime</p>
          </div>
        </div>
        <div className="welcomepage-intro">

        </div>
      </div>
    );
  }
}

export default WelcomePage;
