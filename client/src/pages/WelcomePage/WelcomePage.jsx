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
            {/* <p>Welcome to SnackTime</p> */}
          </div>
        </div>
        <div className="welcomepage-intro">
          <h1>Welcome to SnackTime</h1>
          <p>SnackTime is a platform created to help caretakers and parents communicate important information about the children they care about. We allow caretakers to quickly update profiles of children with their daily activities so they can spend more time with the kids and less time at the desk. As a parent of a young child, it can be difficult to be involved in your child's daily activities because you don't know what's going on during the day. Best of all? It's completely free to use. </p>
          <h2>Caretaker Features</h2>
          <ul>
            <li><p>Save time and reduce waste by updating activities online. </p>
            </li>
            <li><p>Keep a permanent online log of all activities. </p>
            </li>
            <li><p>Quickly access important such as contact info, allergies, medications, and more! </p>
            </li>
            <li><p>Send notes and highlights of the day to parents along with activity info</p>
            </li>
            <li><p>Send notifications/announcements to all the parents of the organization</p>
            </li>
            <li><p>Add new student, new staff, new parent to organization's student</p>
            </li>
            <li><p>Add organization's schedule day-wise</p>
            </li>


          </ul>
          <h2>Parent Features</h2>
          <ul>
            <li><p>Check in on your child's activities throughout the day.</p>
            </li>
            <li><p>Easy communication with your child's caretakers & official organization information.</p>
            </li>
            <li><p>Allows your child's caretaker immediate access to medical & emergency contact information.</p>
            </li>
            <li><p>Add guardians so your child's caretakers know who are allowed to do pick-ups.</p>
            </li>
            <li><p>Historical data about your child's meals, snacks, naps & activities.</p>
            </li>
            <li><p>Receive emails/notifications from your child's organization</p>
            </li>

          </ul>

        </div>
      </div>
    );
  }
}

export default WelcomePage;
