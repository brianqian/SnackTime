import React, { Component } from 'react';
import './TimePicker.css'
import moment from 'moment'

class TimePicker extends Component {
  state ={
    hours: [],
    minutes : [],
    ampm: ['AM', 'PM'],
    selectedHour: '',
    selectedMin: '',
    selectedAmpm: '',
    now: moment().format('LT')

  }
  componentDidMount() {
   this.populateState();
  }
  
  populateState=()=>{
    const hourArray = [];
    const minArray = [];
    for (let i=1; i<13; i++){
      let num=i+'';
      if (num.length===1) num='0'+num;
      hourArray.push(num)
    }
    for (let i=0; i<60; i++){
      let num=i+'';
      if (num.length===1) num='0'+num;
      minArray.push(num)

    }
    this.setState({hours: hourArray, minutes: minArray})
    const now = moment().format('LT');
    console.log(now);
  }

  handleSelect = (e) => {

    console.log(e.target.getAttribute('value'))
    console.log(e.target.getAttribute('name'));
    const value = e.target.getAttribute('value')
    const name = e.target.getAttribute('name')
    e.target.classList.add('timepicker__selected')
    this.setState({ [name]: value })
  }
  handleButton = () => {
    console.log('hour', this.state.selectedHour);
    console.log('min', this.state.selectedMin);
    console.log('ampm', this.state.selectedAmpm);
  }

  render() {
    return (
      <div className='timepicker-container'>
      <div className="timepicker-display">
        <div className='tp-display-hour'></div>
        <div className='tp-display-min'></div>
        <div className='tp-display-ampm'></div>
      </div>
        <div className='timepicker timepicker-hour'>
        {this.state.hours.map(hour=>{
          return <div name='selectedHour' onClick={this.handleSelect} value={hour}>{hour}</div>
        })}
        </div>
        <div className='timepicker timepicker-min'>
        {this.state.minutes.map(minute=>{
          return <div name='selectedMin' onClick={this.handleSelect} value={minute}>{minute}</div>
        })}
        </div>
        <div className='timepicker timepicker-ampm'>
        {this.state.ampm.map(ampm=>{
          return <div name='selectedAmpm' onClick={this.handleSelect} value={ampm}>{ampm}</div>
        })}
        </div>
        <button onClick={this.handleButton}></button>

      </div>
    );
  }
}

export default TimePicker;