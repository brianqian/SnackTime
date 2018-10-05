import React, { Component } from 'react'
import Card from './components/Card'
import './SingleStudent.css'


export default class SingleStudent extends Component {
  state = {
    student :this.props.studentId
  }

  componentWillMount(){
    this.getSingleStudent()
  }

  getSingleStudent = () =>{
    fetch('/api/allinfo/student/' + this.state.student.id)
    .then(res =>res.json())
    .then(res=>this.setState({student:res}))
  }

  render() {
    return (
      <div className='student-container'>
        <Card
          className='student__item'
          // title={student.name}
          destination="DailyReportPage"
          // image={student.image}
        />
        
      </div>
    )
  }
}