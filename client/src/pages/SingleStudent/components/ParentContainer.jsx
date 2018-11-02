import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import "./ParentContainer.css";
// import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
// import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import indigo from "@material-ui/core/colors/indigo";
import moment from "moment";
import { Link } from "react-router-dom";
import ResponsiveTable from "./ResponsiveTable"

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: indigo[500],
//     color: theme.palette.common.white
//   },
//   body: {
//     fontSize: 14
//   }
// }))(TableCell);

const styles = theme => ({
  root: {
    width: "75vw",
    marginTop: theme.spacing.unit * 3
    // overflowX: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  childInfo: {
    margin: "15px"
  },
  table: {
    minWidth: 700
  },
  searchSubmit: {
    marginTop: "25px"
  },
  submitGuardian: {
    marginTop: "25px"
  },
  registerParent: {
    marginTop: "25px"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  block: {
    display: "block"
  }
});

class ParentContainer extends Component {
  state = {
    searchEmail: "",
    parents: [],
    email: "",
    status: "",
    showAddNewParent: true,
    parentName: "",
    parentEmail: "",
    parentAddress: "",
    parentPhone: "",
    guardians: [],
    showAddNewGuardian: true,
    guardianName: "",
    guardianEmail: "",
    guardianAddress: "",
    guardianPhone: "",
    role: this.props.role,
    staffs: [],
    orgName: "",
    orgAddress: "",
    orgPhone: "",
    orgOpenTime: "",
    orgCloseTime: "",
    hideSearchParent: false,
    diaperings: [],
    meals: [],
    naps: [],
    medicines: [],
    incidents: [],
    date: "",
    noteForStaff: [[null]],
    noteForParents: [[null]],
    highlight: [[null]],
    validationErrorMssg: "",
    guardianValidationErrorMssg: ""
  };

  componentDidMount() {
    this.getExistingParent();
    this.getExistingPickup();
    this.getSchoolInfo();
    this.getStaffInfo();
    this.getDiapering();
    this.getMeals();
    this.getNaps();
    this.getMedicines();
    this.getIncidents();
    if (this.props.role === "staff") this.getNotesForStaff();
    else if (this.props.role === "parent") this.getNotesForParents();
    console.log(this.props.studentId, "STUDENT ID");
  }

  getDiapering = () => {
    console.log("start of get diapering function");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log("Date:", date);
    console.log("Id", this.props.studentId);
    this.setState({ date: date });
    fetch(`/api/student/${this.props.studentId}/diapering/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === "No diaperings") {
            this.setState({ status: "No diapering found :(" });
          } else {
            let allDiaperings = [];
            resp.forEach(diapering => {
              let diaperingRow = [];
              diaperingRow.push(moment(diapering.time, "HH:mm:ss").format("hh:mm A"), diapering.place, diapering.type);
              allDiaperings.push(diaperingRow);
            });
            this.setState({ diaperingData: allDiaperings, diaperings: resp });
          }
        }
      });
  };

  getMeals = () => {
    console.log("start of get meals function");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log("Date:", date);
    console.log("Id", this.props.studentId);
    fetch(`/api/student/${this.props.studentId}/meal/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === "No meals") {
            this.setState({ status: "No Meal found :(" });
          } else {
            let allMeals = [];
            resp.forEach(meal => {
              let mealRow = [];
              mealRow.push(moment(meal.time, "HH:mm:ss").format("hh:mm A"), meal.type, meal.food);
              allMeals.push(mealRow);
            });
            this.setState({ mealData: allMeals, meals: resp });
          }
        }
      });
  };

  getNaps = () => {
    console.log("start of get naps function");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log("Date:", date);
    console.log("Id", this.props.studentId);
    fetch(`/api/student/${this.props.studentId}/nap/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === "No naps") {
            this.setState({ status: "No Naps found :(" });
          } else {
            let allnaps = [];
            resp.forEach(nap => {
              let napRow = [];
              napRow.push(moment(nap.startTime, "HH:mm:ss").format("hh:mm A"), moment(nap.endTime, "HH:mm:ss").format("hh:mm: A"));
              allnaps.push(napRow);
            });
            this.setState({ napData: allnaps, naps: resp });
          }
        }
      });
  };

  getMedicines = () => {
    console.log("start of get medicines function");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log("Date:", date);
    console.log("Id", this.props.studentId);
    this.setState({ date: date });
    fetch(`/api/student/${this.props.studentId}/medicine/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === "No medicines") {
            this.setState({ status: "No medicines found :(" });
          } else {
            let allmedicines = [];
            resp.forEach(medicine => {
              let medicineRow = [];
              medicineRow.push(moment(medicine.time, "HH:mm:ss").format("hh:mm A"), medicine.medName);
              allmedicines.push(medicineRow);
            });
            this.setState({ medicineData: allmedicines, medicines: resp });
          }
        }
      });
  };

  getIncidents = () => {
    console.log("start of get incidents function");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log("Date:", date);
    console.log("Id", this.props.studentId);
    this.setState({ date: date });
    fetch(`/api/student/${this.props.studentId}/incident/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === "No incidents") {
            this.setState({ status: "No incident found :(" });
          } else {
            let allincidents = [];
            resp.forEach(incident => {
              let incidentRow = [];
              incidentRow.push(moment(incident.time, "HH:mm:ss").format("hh:mm A"), incident.incident);
              allincidents.push(incidentRow);
            });
            this.setState({ incidentData: allincidents, incidents: resp });
          }
        }
      });
  };

  getNotesForStaff = () => {
    console.log("start of get note for staff function");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    this.setState({ date: date });

    fetch(`/api/student/${this.props.studentId}/report/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log("Resp from notes: ", resp);
        if (resp) {
          if (resp !== "No Notes") {
            console.log(resp);
            this.setState({ noteForStaff: [[resp.noteForStaff]] });
          }
        }
      });
  };

  getNotesForParents = () => {
    console.log("start of get note for parents function");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    this.setState({ date: date });

    fetch(`/api/student/${this.props.studentId}/report/${date}`)
      .then(resp => resp.json())
      .then(resp => {
        console.log("Resp from notes: ", resp);
        if (resp) {
          if (resp === "No Notes") {
            this.setState({ status: "No report found :(" });
          } else {
            console.log(resp);
            this.setState({
              noteForParents: [[resp.noteForParents]],
              highlight: [[resp.highlight]]
            });
          }
        }
      });
  };

  getSchoolInfo = () => {
    //use this.props.orgId as parameter to fetch and assign it to appropriate states
    fetch(`/api/parent/org/${this.props.orgId}`)
      .then(resp => resp.json())
      .then(resp =>
        this.setState({
          orgName: resp.name,
          orgAddress: resp.address,
          orgPhone: resp.phone,
          orgOpenTime: moment(resp.openTime,"HH:mm:ss").format("hh:mm A"),
          orgCloseTime: moment(resp.closeTime,"HH:mm:ss").format("hh:mm A"),
        })
      );
  };

  getStaffInfo = () => {
    //use this.props.orgId as parameter to fetch and assign to state staffs
    fetch(`/api/parent/orgstaff/${this.props.orgId}`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === "No staffs found") {
            this.setState({ status: "No staffs found :(" });
          } else {
            let allStaffs = [];
            resp.forEach(staff => {
              let staffRow=[];
              staffRow.push(staff.name, staff.email)
              allStaffs.push(staffRow)
            });
            this.setState({ staffs:allStaffs });
          }
        }
      });
  };

  getExistingPickup = () => {
    fetch(`/api/student/${this.props.studentId}/pickup`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          if (resp === "No pickup found") {
            this.setState({ status: "No pickup found :(" });
          } else {
            let allGuardians = [];
            resp.Pickups.forEach(guardian => {
              let guardianRow =[];
              guardianRow.push(guardian.name, guardian.phone, guardian.email, guardian.address)
              allGuardians.push(guardianRow)
            });
            this.setState({ guardians:allGuardians });
          }
        }
      });
  };

  getExistingParent = () => {
    fetch(`/api/student/${this.props.studentId}/parent`)
      .then(resp => resp.json())
      .then(resp => {
        if (resp) {
          console.log("resp:", resp)
          if (resp === "No parent found") {
            this.setState({ status: "No parents found :(" });
          } else {
            let allParents = [];
            resp.Parents.forEach(parent => {
              let parentRow=[];
              parentRow.push(parent.name,parent.phone,parent.email,parent.address)
              allParents.push(parentRow);
            });
            this.setState({ parents: allParents });
          }
        }
      });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSearch = e => {
    e.preventDefault();
    if (this.state.searchEmail.trim() === "")
      this.setState({ status: "Email can't be empty" })
    else {
      console.log(this.state.searchEmail, "PARENT EMAIL");
      fetch(`/api/parent/email/${this.state.searchEmail}`)
        .then(resp => resp.json())
        .then(resp => {
          if (resp.name) {
            this.setState({ existingParent: resp });
            const { name, email, phone, address, id } = this.state.existingParent;
            this.setState({
              parentId: id,
              status: `${name}, ${email}, ${phone}, ${address}`
            });
          } else {
            this.setState({ status: "That email doesn't exist in our database" });
          }
        });
    }
  };

  capitalize = name => {
    const names = name.split(" ");
    for (var i = 0; i < names.length; i++) {
      names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
    }
    return names.join(" ");
  };

  handleSubmitNewParent = e => {
    e.preventDefault();
    let url = window.location.href;
    url = url.substring(0, url.length - 14);

    let newObj = {
      email: this.state.parentEmail,
      address: this.state.parentAddress,
      phone: this.state.parentPhone,
      name: this.capitalize(this.state.parentName),
      baseUrl: url
    };
    console.log(newObj);
    this.setState({ addParentForm: newObj });
    console.log("ADD PARENT FORM", this.state.addParentForm);
    console.log("STudnet IDDddddddd", this.props.studentId);
    fetch(`/api/student/${this.props.studentId}/parent`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newObj)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (resp.id) {
          this.setState(
            {
              status: "Parent Added!",
              parentName: "",
              parentEmail: "",
              parentAddress: "",
              parentPhone: "",
              validationErrorMssg: ""
            },
            //() => this.getExistingParent()
          );
        } else {
          if (resp.errors) {
            if (resp.errors[0].message === "email must be unique")
              this.setState({ validationErrorMssg: "Email already exists in database", status: "" });
            else if (resp.errors[0].message === "Validation isEmail on email failed")
              this.setState({ validationErrorMssg: "Invalid email address", status: "" });
            else if (resp.errors[0].message === "Validation notEmpty on name failed")
              this.setState({ validationErrorMssg: "Name is required", status: "" });
            else if (resp.errors[0].message === "Validation len on phone failed")
              this.setState({ validationErrorMssg: "Invalid phone number", status: "" });
            else if (resp.errors[0].message === "Validation notEmpty on address failed")
              this.setState({ validationErrorMssg: "Address is required", status: "" });
          }
          else
            this.setState({ validationErrorMssg: "Parent could not be added, please check the entered values", status: "" });
        }
        this.getExistingParent();
      });
  };

  handleSubmitNewGuardian = e => {
    e.preventDefault();
    // let url = window.location.href;
    // url = url.substring(0, url.length - 14);

    let newObj = {
      email: this.state.guardianEmail,
      address: this.state.guardianAddress,
      phone: this.state.guardianPhone,
      name: this.capitalize(this.state.guardianName)
      //baseUrl: url
    };

    this.setState({ addGuardianForm: newObj });
    fetch(`/api/student/${this.props.studentId}/pickup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newObj)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        if (resp.id) {
          this.setState(
            {
              status: "Guardian Added!",
              guardianName: "",
              guardianEmail: "",
              guardianAddress: "",
              guardianPhone: "",
              guardianValidationErrorMssg: ""
            },
            //() => this.getExistingPickup()
          );
        } else {
          if (resp.errors) {
            if (resp.errors[0].message === "Validation isEmail on email failed")
              this.setState({ guardianValidationErrorMssg: "Invalid email address", status: "" });
            else if (resp.errors[0].message === "Validation notEmpty on name failed")
              this.setState({ guardianValidationErrorMssg: "Name is required", status: "" });
            else if (resp.errors[0].message === "Validation len on phone failed")
              this.setState({ guardianValidationErrorMssg: "Invalid phone number", status: "" });
            else if (resp.errors[0].message === "Validation notEmpty on address failed")
              this.setState({ guardianValidationErrorMssg: "Address is required", status: "" });
          }
          else
            this.setState({ guardianValidationErrorMssg: "Guardian could not be added, please check the entered values", status: "" });
        }
        this.getExistingPickup();
      });
  };

  handleAddNewParent = e => {
    e.preventDefault();
    this.setState({
      addParentForm: {},
      showAddNewParent: false,
      hideSearchParent: true,
      status: ""
    });
  };

  handleAddNewGuardian = e => {
    e.preventDefault();
    this.setState({
      addGuardianForm: {},
      showAddNewGuardian: false,
      status: ""
    });
  };

  makeAssociation = async e => {
    console.log("association func")
    e.preventDefault();
    await fetch("/api/parentstudent", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        parentId: this.state.parentId,
        studentId: this.props.studentId
      })
    }).then(this.getExistingParent());
  };

  deleteAssociation = e => {
    const data = {
      studentId: this.props.studentId,
      parentId: e.target.name
    };
    console.log(data);
    fetch("/api/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => this.getExistingParent());
  };

  editParentInfo = e => {
    const data = { parentId: e.target.name };
    fetch("/api/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => this.getExistingParent());
  };

  renderSearchParentByEmailForm = () => {
    const { classes } = this.props;
    if (!this.state.hideSearchParent)
      return (
        <form>
          <TextField
            name="searchEmail"
            value={this.state.searchEmail}
            onChange={this.handleChange}
            id="addParents"
            label="Add Parents by Email"
            margin="normal"
            variant="outlined"
          />
          <Button
            className={classes.searchSubmit}
            onClick={this.handleSearch}
            type="submit"
          >
            Search
          </Button>
        </form>
      );
  };

  renderAddParentForm() {
    const { classes } = this.props;
    if (this.state.role === "staff")
      return (
        <div className="add-new-parent">
          {this.renderSearchParentByEmailForm()}

          {this.state.addParentForm && (
            <form>
              <TextField
                name="parentName"
                onChange={this.handleChange}
                value={this.state.parentName}
                id="ParentName"
                label="Parent's Name"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="parentPhone"
                onChange={this.handleChange}
                value={this.state.parentPhone}
                id="ParentPhone"
                label="Parent's Phone"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="parentEmail"
                onChange={this.handleChange}
                value={this.state.parentEmail}
                id="ParentEmail"
                label="Parent's Email"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="parentAddress"
                onChange={this.handleChange}
                value={this.state.parentAddress}
                id="ParentAddress"
                label="Parent's Address"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <Button
                className={classes.registerParent}
                onClick={this.handleSubmitNewParent}
                type="submit"
              >
                Register and Email New Parent
              </Button>
            </form>
          )}
          <div>{this.state.status}</div>
          <div className="validationerror">{this.state.validationErrorMssg}</div>
          {this.state.existingParent && (
            <Button onClick={this.makeAssociation}>
              Add Existing Parent to Child
            </Button>
          )}
          {this.state.showAddNewParent && (
            <Button name="new" onClick={this.handleAddNewParent}>
              Create New Parent Account
            </Button>
          )}
        </div>
      );
    else if (this.state.role === "parent") return <div />;
  }

  renderGuardianForm() {
    const { classes } = this.props;
    if (this.state.role === "parent")
      return (
        <div>
          {this.state.addGuardianForm && (
            <form>
              <TextField
                name="guardianName"
                onChange={this.handleChange}
                value={this.state.guardianName}
                id="GuardianName"
                label="Guardian's Name"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="guardianPhone"
                onChange={this.handleChange}
                value={this.state.guardianPhone}
                id="GuardianPhone"
                label="Guardian's Phone"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="guardianEmail"
                onChange={this.handleChange}
                value={this.state.guardianEmail}
                id="GuardianEmail"
                label="Guardian's Email"
                margin="normal"
                variant="outlined"
                type="text"
              />

              <TextField
                name="guardianAddress"
                onChange={this.handleChange}
                value={this.state.guardianAddress}
                id="GuardianAddress"
                label="Guardian's Address"
                margin="normal"
                variant="outlined"
                type="text"
              />
              <div>{this.state.status}</div>
              <div>{this.state.guardianValidationErrorMssg}</div>
              <Button
                className={classes.submitGuardian}
                onClick={this.handleSubmitNewGuardian}
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
          {this.state.showAddNewGuardian && (
            <Button name="new" onClick={this.handleAddNewGuardian}>
              Add a Guardian
            </Button>
          )}
        </div>
      );
    else if (this.state.role === "staff") return <div />;
  }

  renderSchoolInfo() {
    const { classes } = this.props;
    if (this.state.role === "parent")
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>School</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
        <div>
          <ResponsiveTable title="School Information" columns={["Name", "Phone", "Address", "Open Time", "Close Time"]} data={[[this.state.orgName, this.state.orgPhone, this.state.orgAddress, this.state.orgOpenTime, this.state.orgCloseTime]]} />
        </div>
        </ExpansionPanelDetails>
        </ExpansionPanel>
      );
  }

  renderStaffInfo() {
    const { classes } = this.props;
    if (this.state.role === "parent")
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Staff</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <ResponsiveTable title="Staff" columns={["Name", "Email"]} data={this.state.staffs} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
  }

  renderIncidents() {
    
    if (this.state.incidents.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Incidents" columns={["Time", "Incident"]} data={this.state.incidentData} />
        </div>
      );
    }
  }

  renderMeds() {
    
    if (this.state.medicines.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Medicines Administered" data={this.state.medicineData} columns={["Time", "Medicine"]} />
        </div>
      );
    }
  }

  renderNaps() {
    
    if (this.state.naps.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Naps" data={this.state.napData} columns={["Start Time", "End Time"]} />
        </div>
      );
    }
  }

  renderMeals() {
    
    if (this.state.meals.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable
            title="Meals"
            columns={["Time", "Meal", "Food"]}
            data={this.state.mealData}
          />
        </div>
      );
    }
  }

  renderDiaperings() {
    
    if (this.state.diaperings.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <ResponsiveTable title="Diaper/Toilet" columns={["Time", "Place", "Type"]} data={this.state.diaperingData} />
        </div>
      );
    }
  }

  renderNoteForParents() {
    
    if (this.props.role === "parent") {

      if (!this.state.noteForParents[0][0] && !this.state.highlight[0][0]) {
        return <div />;
      }
      if (this.state.noteForParents[0][0] && this.state.highlight[0][0]) {
        return (
          <div>
            <div>
              <ResponsiveTable title="Note for Parents" columns={["Note"]} data={this.state.noteForParents} />
            </div>
            <div>
              <ResponsiveTable title="Highlight of the day" columns={["Highlight"]} data={this.state.highlight} />
            </div>
          </div>
        );
      }
      if (this.state.highlight[0][0]) {
        return (
          <div>
              <ResponsiveTable title="Highlight of the day" columns={["Highlight"]} data={this.state.highlight} />
            </div>
        );
      }
      if (this.state.noteForParents[0][0]) {
        return (
          <div>
              <ResponsiveTable title="Note for Parents" columns={["Note"]} data={this.state.noteForParents} />
            </div>
        );
      }
    }
  }

  renderNoteForStaff() {
    if (this.props.role === "staff") {

      if (!this.state.noteForStaff[0][0]) {
        return <div />;
      } else {
        return (
          <div>
          <ResponsiveTable title="Note for Staff" columns={["Note"]} data={this.state.noteForStaff} />
        </div>
        );
      }
    }
  }

  renderGuardianTable() {
    
    if (this.state.guardians.length > 0) {
      return (
        <div>
          <ResponsiveTable title="Guardians" columns={["Name", "Phone", "Email","Address"]} data={this.state.guardians} />
       </div>
      );
    } else {
      return <div>No Guardian added</div>;
    }
  }

  renderParentTable() {
    
    if (this.state.parents.length > 0) {
      return (
       <div>
          <ResponsiveTable title="Parents" columns={["Name", "Phone", "Email","Address"]} data={this.state.parents} />
       </div>
      );
    } else {
      return <div>No Parents added</div>;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Today's Report
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.block}>
              <div>
                {this.renderNoteForStaff()}
                {this.renderNoteForParents()}
                {this.renderDiaperings()}
                {this.renderMeals()}
                {this.renderNaps()}
                {this.renderMeds()}
                {this.renderIncidents()}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Student Information
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.block}>
        
              <div>
                <ResponsiveTable title="Student Information" columns={["Address", "DOB", "Allergies", "Medications", "Note", "Doctor"]} data={[[this.props.address, this.props.dob, this.props.allergies, this.props.medication, this.props.notes, this.props.doctor]]} />
              </div>
    
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Parents</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.block}>
              {this.renderParentTable()}
            </ExpansionPanelDetails>
            {this.renderAddParentForm()}
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Guardians</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.block}>
              {this.renderGuardianTable()}
            </ExpansionPanelDetails>
            {this.renderGuardianForm()}
          </ExpansionPanel>

          {this.renderSchoolInfo()}
          {this.renderStaffInfo()}
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Report Archive
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.block}>
              <div>
                <Link to={{ pathname: '/archive', state: { studentId: this.props.studentId, role: this.props.role, name: this.props.name } }}>Click here to see {this.props.name}'s report archive </Link>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

ParentContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ParentContainer);
