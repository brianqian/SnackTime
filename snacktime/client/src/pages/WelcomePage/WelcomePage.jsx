import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';

class WelcomePage extends Component {
  componentDidMount(){

    console.log('welcome page',this.props)
  }
  render() {
    return (
      <NavBar updateState={this.props.updateState}>
        <About />
      </NavBar>
    );
  }
}

export default WelcomePage;
