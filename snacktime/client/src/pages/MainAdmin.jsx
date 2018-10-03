import React, { Component } from 'react';
import Header from "../components/Header/Header";
import LoginBar from "../components/LoginBar/LoginBar";
import About from "../components/About/About";
import Login from "../components/Login/Login";

class MainAdmin extends Component {
  render() {
    return (
      <Header>
        <LoginBar />
        <About />
      </Header>  
    );
  }
}

export default MainAdmin;