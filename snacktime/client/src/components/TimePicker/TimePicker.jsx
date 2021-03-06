import React, { Component } from 'react';
import './TimePicker.css';
import moment from 'moment';

class TimePicker extends Component {
  state = {
    hours: [],
    minutes: [],
    ampm: ['AM', 'PM'],
    selectedHour: '',
    selectedMin: '',
    selectedAmpm: '',
    hide: false,
  };
  componentWillMount() {
    let now = moment().format('LT');
    now = now.split(':');
    now = [now[0], ...now[1].split(' ')];
    console.log(now);
    this.setState({
      selectedHour: now[0],
      selectedMin: now[1],
      selectedAmpm: now[2],
    });
    this.populateState();
  }

  returnTime = () => {
    let selectedHour = parseInt(this.state.selectedHour);
    let selectedMin = parseInt(this.state.selectedMin);

    if (this.state.selectedAmpm === 'AM') {
      if (selectedHour === 12)
        selectedHour = '00';
      return `${selectedHour}:${selectedMin}:00`;
    } else {
      let hour = parseInt(selectedHour);
      if (hour!== 12) hour += 12;
      return `${hour}:${selectedMin}:00`;
    }
  };

  populateState = () => {
    const hourArray = [];
    const minArray = [];
    for (let i = 1; i < 13; i++) {
      let num = i + '';
      if (num.length === 1) num = '0' + num;
      hourArray.push(num);
    }
    for (let i = 0; i < 60; i += 10) {
      let num = i + '';
      if (num.length === 1) num = '0' + num;
      minArray.push(num);
    }
    this.setState({ hours: hourArray, minutes: minArray });
  };
  openCloseSelector = () => {
    let toggle = this.state.hide;
    this.setState({ hide: !toggle });
  };
  handleSelect = async e => {
    const value = e.target.getAttribute('value');
    const name = e.target.getAttribute('class');
    console.log(value, name);
    const parent = e.target.parentElement;
    const prevSelect = parent.querySelectorAll(`.${name}`);
    prevSelect.forEach(num => num.classList.remove('timepicker__selected'));
    e.target.classList.add('timepicker__selected');
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="timepicker-container">
        <div onClick={this.openCloseSelector} className="timepicker-display">
          <div className="tp-display-hour">{this.state.selectedHour}</div>
          <div className="tp-display-min">{this.state.selectedMin}</div>
          <div className="tp-display-ampm">{this.state.selectedAmpm}</div>
        </div>
        <div
          className={`${
            this.state.hide ? 'timepicker__hidden' : ''
            } timepicker timepicker-Hour`}
        >
          {this.state.hours.map(hour => {
            return (
              <div
                className="selectedHour"
                onClick={this.handleSelect}
                value={hour}
              >
                {hour}
              </div>
            );
          })}
        </div>
        <div
          className={`${
            this.state.hide ? 'timepicker__hidden' : ''
            }  timepicker timepicker-Min`}
        >
          {this.state.minutes.map(minute => {
            return (
              <div
                className="selectedMin"
                onClick={this.handleSelect}
                value={minute}
              >
                {minute}
              </div>
            );
          })}
        </div>
        <div
          className={`${
            this.state.hide ? 'timepicker__hidden' : ''
            } timepicker timepicker-Ampm`}
        >
          {this.state.ampm.map(ampm => {
            return (
              <div
                className="selectedAmpm"
                onClick={this.handleSelect}
                value={ampm}
              >
                {ampm}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TimePicker;
