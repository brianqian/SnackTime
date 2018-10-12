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
    console.log('HOUR', moment().hours())
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
    if (this.state.selectedAmpm === 'AM') {
      return `${this.state.selectedHour}:${this.state.selectedMin}:00`;
    } else {
      let hour = parseInt(this.state.selectedHour);
      hour += 12;
      if (hour===24) hour = '00';
      return `${hour}:${this.state.selectedMin}:00`;
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
    for (let i = 0; i < 60; i++) {
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
    const prevSelect = document.querySelectorAll(`.${name}`);
    prevSelect.forEach(num => num.classList.remove('timepicker__selected'));
    e.target.classList.add('timepicker__selected');
    await this.setState({ [name]: value });
    this.props.setTime(this.returnTime());
  };
  render() {
    return (
      <div className="timepicker-container">
        <div onClick={this.openCloseSelector} className="timepicker-display">
          <div className="tp-display-hour">{this.state.selectedHour}</div>
          <div>:</div>
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
