import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';

class WelcomePage extends Component {
  render() {
    return (
      <NavBar>
        <About />
      </NavBar>
    );
  }
}

export default WelcomePage;
