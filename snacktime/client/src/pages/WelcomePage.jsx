import React, { Component } from 'react';
import MainHeader from '../components/MainHeader/MainHeader';
import LoginBar from '../components/LoginBar/LoginBar';
import About from '../components/About/About';

class WelcomePage extends Component {
  render() {
    return (
      <MainHeader>
        <LoginBar />
        <About />
      </MainHeader>
    );
  }
}

export default WelcomePage;
