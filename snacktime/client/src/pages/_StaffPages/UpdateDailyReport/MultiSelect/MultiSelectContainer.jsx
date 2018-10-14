import React, { Component } from "react";
import MultiSelectItem from "./MultiSelectItem";
import "./MultiSelectContainer.css";

export default class MultiSelectContainer extends Component {
  state = {
    allStudents: [],
    allSelected: false
  };
  componentWillMount() {
    this.getAllStudents();
  }

  async getAllStudents() {
    let response = await (await fetch(
      `/api/student/${this.props.orgId}`
    )).json();
    console.log("RESPONSE", response);
    let stateArray = [];
    response.forEach(student => {
      stateArray.push({ name: student.name, selected: false, id: student.id });
    });
    await this.setState({ allStudents: stateArray });
    this.props.updateStudents(stateArray);
    console.log(response);
    console.log(this.state);
  }

  selectStudent = e => {
    let item = e.currentTarget;
    console.log(item);
    console.log(e.target.getAttribute('value'))
    let studentArray = this.state.allStudents.slice();
    console.log('STUDENT ARRAY', studentArray);
    if (item.classList.contains("selected")) {
      let result = studentArray.find(student => student.id == item.getAttribute("value"))
      result.selected = false;
    } else {
      let result = studentArray.find(student => student.id == item.getAttribute("value"))
      result.selected = true;
    }

    // this.setState({ allStudents: studentArray });
    item.classList.toggle("selected");
  };

  selectAll = () => {
    let studentArray = this.state.allStudents.slice();
    if (!this.state.allSelected) {
      studentArray.forEach(student => (student.selected = true));
      this.setState({ allSelected: true });
    } else {
      studentArray.forEach(student => (student.selected = false));
      this.setState({ allSelected: false });
    }
    this.setState({ allStudents: studentArray });
  };

  render() {
    if (this.state.allStudents.length > 0) {
      return (
        <div>
          <div className="multiselect-container">
            {this.state.allStudents.map(student => {
              return (
                <MultiSelectItem
                  name={student.name}
                  value={student.id}
                  selected={student.selected}
                  selectStudent={this.selectStudent}
                />
              );
            })}
          </div>
          <button onClick={this.selectAll}>{`${this.state.allSelected ? "Unselect All" : "Select All"}`}</button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
