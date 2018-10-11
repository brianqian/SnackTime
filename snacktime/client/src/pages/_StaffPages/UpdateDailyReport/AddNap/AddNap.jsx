import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector';
import { Redirect } from 'react-router-dom';
//import MultiStudentSelect from "../../MultiStudentSelect/MultiStudentSelect";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
//import Button from '@material-ui/core/Button';
//import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from "../MultiSelect/MultiSelectContainer";



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class AddNap extends React.Component {
  state = {
    //selectedStudents: this.props.location.state.selectedStudents,
    napStart: '',
    napEnd: '',
    multiline: 'Controlled',
    allStudents: [],
    studentIdsToSubmit:[],
    loginRejected: false,
    loggedIn: false,
  };

  async componentWillMount() {
    await Auth.StaffAuthorize(this);
    console.log(this.state.orgId)
  }

  updateStudents = (newArray) => {
    this.setState({ allStudents: newArray });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let idArray = []
    this.state.allStudents.map(student=> {
      if (student.selected === true){
         idArray.push(student.id)
      }
    })
    console.log(idArray);
    await this.setState({studentIdsToSubmit: idArray})

    this.state.studentIdsToSubmit.map(id => this.postNap(id));
  };
  logState=()=>{
  console.log(this.state)
  }

  handleChange = event => {
    console.log(event.target);
    // this.setState({
    //   [name]: event.target.value,
    // });
    console.log('NAP START, END', this.state.napStart, this.state.napEnd);
  };

  setNapStart = time => {
    this.setState({ napStart: time });
  };

  setNapEnd = time => {
    this.setState({ napEnd: time });
  };

  postNap = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    console.log(date);
    fetch(`/api/student/${id}/nap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        napStart: this.state.napStart,
        napEnd: this.state.napEnd,
        date: date,
      }),
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(resp => console.log(resp));
  };


  render() {
    const { classes, theme } = this.props;

    if (this.state.loggedIn) {
        return (
          <div>
            <HeaderBar type={this.state.userType} />
            <MultiSelectContainer
            orgId={this.state.orgId}
            allStudents={this.state.allStudents}
            updateStudents={this.updateStudents}
          />
          <button onClick={this.logState}/>
            <div>
              <Paper className={classes.root} elevation={1} />
              <form className={classes.container} noValidate autoComplete="off">
                <DateTimeSelector
                  label="Start Time: "
                  name="napStart"
                  className={classes.textField}
                  value={this.state.napStart}
                  setTime={this.setNapStart}
                  onChange={this.handleChange}
                  //   margin="normal"
                  //   variant="outlined"
                />
                <hr />
                <DateTimeSelector
                  label="End Time: "
                  name="napEnd"
                  className={classes.textField}
                  value={this.state.napEnd}
                  setTime={this.setNapEnd}
                  // onChange={this.handleChange}
                  //   margin="normal"
                  //   variant="outlined"
                />
                <hr />
                <Button onClick={this.handleSubmit}>Add Activity</Button>
              </form>
            </div>
          </div>
        );
      
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: '/notAuthorized',
            state: { type: 'Staff' },
          }}
        />
      );
    } else {
      return <div />;
    }

    //const { classes } = this.props;

    // return (
    //   <div>
    //     <HeaderBar type={this.state.userType} />
    //     <Paper
    //       className={classes.root}
    //       elevation={1}
    //     />
    //     <form className={classes.container} noValidate autoComplete="off">
    //       <DateTimeSelector
    //         label="Start Time: "
    //         name="napStart"
    //         className={classes.textField}
    //         value={this.state.napStart}
    //         setTime={this.setNapStart}
    //         onChange={this.handleChange}
    //         //   margin="normal"
    //         //   variant="outlined"
    //       />
    //       <hr />
    //       <DateTimeSelector
    //         label="End Time: "
    //         name="napEnd"
    //         className={classes.textField}
    //         value={this.state.napEnd}
    //         setTime={this.setNapEnd}
    //         // onChange={this.handleChange}
    //         //   margin="normal"
    //         //   variant="outlined"
    //       />
    //       <hr />
    //       <Button onClick={this.handleSubmit}>Add Activity</Button>
    //     </form>
    //   </div>
    // );
  }
}

AddNap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNap);

// import React from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import { withStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
// import TextField from "@material-ui/core/TextField";
// import Paper from '@material-ui/core/Paper';
// import Button from "@material-ui/core/Button";
// import HeaderBar from "../../../../components/HeaderBar/HeaderBar";
// // import Label from '@material-ui/core/Label';
// import DateTimeSelector from "../../../../components/DateTimeSelector/DateTimeSelector";

// const styles = theme => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200
//   },
//   dense: {
//     marginTop: 19
//   },
//   menu: {
//     width: 200
//   }
// });

// class AddNap extends React.Component {
//   state = {
//     selectedStudents: this.props.location.state.selectedStudents,
//     napStart: "",
//     napEnd: "",
//     multiline: "Controlled",
//     //selectedStudentsName:[]
//   };

//   // componentDidMount =()=>{
//   //   console.log("student ids from component mount:",this.state.selectedStudents);
//   //   fetch(`/api/allinfo/students?users=${this.state.selectedStudents}`)
//   //   .then(res => res)
//   //   .then(result => {
//   //     console.log('Res:', result);
//   //     //this.setState({ selectedStudentsName: result });
//   //   });
//   // }

//   handleChange = event => {
//     console.log(event.target);
//     // this.setState({
//     //   [name]: event.target.value,
//     // });
//     console.log("NAP START, END", this.state.napStart, this.state.napEnd);
//   };

//   setNapStart = time => {
//     console.log("start", time);

//     this.setState({ napStart: time });
//   };

//   setNapEnd = time => {
//     console.log("end", time);
//     this.setState({ napEnd: time });
//   };

//   postNap = id => {
//     let today = new Date();
//     let date =
//       today.getFullYear() +
//       "-" +
//       (today.getMonth() + 1) +
//       "-" +
//       today.getDate();
//     console.log(date);
//     fetch(`/api/student/${id}/nap`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         napStart: this.state.napStart,
//         napEnd: this.state.napEnd,
//         date: date
//       })
//     })
//       .then(resp => {
//         console.log(resp);
//         return resp.json();
//       })
//       .then(resp => console.log(resp));
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     this.state.selectedStudents.map(id => this.postNap(id));
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <div>
//         <HeaderBar type={this.state.userType} />
//         <Paper
//           className={classes.root}
//           elevation={1}
//         />
//         <form className={classes.container} noValidate autoComplete="off">
//           <DateTimeSelector
//             label="Start Time: "
//             name="napStart"
//             className={classes.textField}
//             value={this.state.napStart}
//             setTime={this.setNapStart}
//             onChange={this.handleChange}
//             //   margin="normal"
//             //   variant="outlined"
//           />
//           <hr />
//           <DateTimeSelector
//             label="End Time: "
//             name="napEnd"
//             className={classes.textField}
//             value={this.state.napEnd}
//             setTime={this.setNapEnd}
//             // onChange={this.handleChange}
//             //   margin="normal"
//             //   variant="outlined"
//           />
//           <hr />
//           <Button onClick={this.handleSubmit}>Add Activity</Button>
//         </form>
//       </div>
//     );
//   }
// }

// AddNap.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(AddNap);
