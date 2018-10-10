import React, { Component } from 'react';
import MultiSelectItem from './MultiSelectItem';
import './MultiSelectContainer.css'

export default class MultiSelectContainer extends Component {
  state = {
    allStudents: []
  };
  async componentWillMount() {
    await this.getAllStudents();
  }

  async getAllStudents() {
    console.log('PROPS', this.props);
    let response = await (await fetch(
      `/api/student/${this.props.orgId}`
    )).json();
    let stateArray = []
    response.forEach(student=> {
      stateArray.push({name: student.name, selected: false, id: student.id})
    })
    await this.setState({ allStudents: stateArray });
    await console.log(response);
    await console.log(this.state);
  }
  selectStudent = (e) => {
    let item = e.target;
    let studentArray = this.state.allStudents.slice();
    console.log(item.getAttribute('value'))
    console.log(item.classList.contains('selected'))
    if (item.classList.contains('selected')){
      studentArray.find(student=>student.name === item.getAttribute('value')).selected = false;
    } else{
      studentArray.find(student=>student.name === item.getAttribute('value')).selected = true;
    }
    
    this.setState({allStudents: studentArray})
    item.classList.toggle('selected')

  };

  selectAll=()=>{
    let studentArray = this.state.allStudents.slice();
    studentArray.forEach(student=> student.selected = true)
    this.setState({allStudents: studentArray}, ()=>console.log(this.state.allStudents))
  }

  render() {
    if (this.state.allStudents.length > 0) {
      console.log('hello ',this.props)
      return (
        <div className="multiselect-container">
          {this.state.allStudents.map(student => {
            return (
              <MultiSelectItem
                name={student.name}
                value={student.name}
                selected={student.selected}
                selectStudent={this.props.selectStudent}
              />
            );
          })}
          <button onClick={this.selectAll} >Select All</button>
          <input id='multiselect-submit' type="submit"/>
        </div>
      );
    }else{
      return <div>You have no kids :(</div>
    }
  }
}
