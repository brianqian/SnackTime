import React, { Component } from 'react'
import './AllStudentsPage.css'
import DashboardItem from '../../components/DashboardItem/DashboardItem'

export default class AllStudentsPage extends Component {
  state = {
    allStudents :[]
  }


  componentDidMount(){
    this.getAllChildren()
  }
  getAllChildren = () =>{
    fetch('/api/student')
    .then(res =>res.json())
    .then(this.setState({allStudents}))
  }

  render() {
    return (
      <div className='students-container'>
      {this.state.allStudents.map(student=>{
        <DashboardItem
          className='student__item'
          title={student.name}
          destination="DailyReportPage"
          image={student.image}
          notifications={student.notifications}
        />
      })}
        
      </div>
    )
  }
}
