import React, { Component } from "react";

class DeleteStaff extends Component {
    componentDidMount() {
        console.log("did mouint");
        this.getAllStaff();
    }

    getAllStaff = () => {
        console.log("funciton run");
        fetch("/api/getallstaff").then(res => res.json()).then(staffs => console.log("Get all staffs", staffs));
    }
    render() {
        return (
            <div>Hi</div>
        )
    }
}

export default DeleteStaff;