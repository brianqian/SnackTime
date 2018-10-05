import React, { Component } from 'react'
import Card from './components/Card'
import './SingleStudent.css'


export default class SingleStudent extends Component {
  state = {
    student :[]
  }

  componentDidMount(){
    this.getSingleStudent()
  }

  getSingleStudent = () =>{
    fetch('/allinfo/student/:studentId')
    .then(res =>res.json())
    .then(this.setState({student}))
  }

  render() {
    return (
      <div className='student-container'>
      {this.state.student.map(student=>{
        <Card
          className='student__item'
          title={student.name}
          destination="DailyReportPage"
          image={student.image}
        />
      })}
        
      </div>
    )
  }
}