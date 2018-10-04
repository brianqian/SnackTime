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
      <div>
        <DashboardItem
          title=""
          destination="DailyReportPage"
          image=""
          notifications={this.state.studentNotifications}
        />
      </div>
    )
  }
}
