import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
// import Label from '@material-ui/core/Label';
import DateTimeSelector from '../../../../components/DateTimeSelector/DateTimeSelector';
import { Redirect } from 'react-router-dom';
import Auth from '../../../../utils/Auth';
import MultiSelectContainer from '../MultiSelect/MultiSelectContainer';
import Timepicker from '../../../../components/TimePicker/TimePicker';
import './AddPotty.css';
// import ButtonBase from '@material-ui/core/ButtonBase';


var bgColors = {
  Default: '#81b71a',
  Blue: '#00B1E1',
  Cyan: '#37BC9B',
  Green: '#8CC152',
  Red: '#E9573F',
  Yellow: '#F6BB42',
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  submitbutton: {
    height: 10,
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

class AddPotty extends React.Component {
  state = {
    //selectedStudents: this.props.location.state.selectedStudents,
    allStudents: [],
    studentIdsToSubmit: [],
    pottyTime: '',
    place: '',
    type: '',
    multiline: 'Controlled',
    variant: '',
    clickedDiaper: 'classes.notclickked',
    clickedPotty: 'classes.notclicked',
    clickedAccident: 'classes.notclicked',
  };

  async componentWillMount() {
    Auth.StaffAuthorize(this);
  }

  timepickerState = React.createRef();

  updateStudents = newArray => {
    this.setState({ allStudents: newArray });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const returnTime = this.timepickerState.current.returnTime();
    await this.setState({ pottyTime: returnTime });
    let idArray = [];
    this.state.allStudents.map(student => {
      if (student.selected === true) {
        idArray.push(student.id);
      }
    });
    console.log(idArray);
    await this.setState({ studentIdsToSubmit: idArray });
    if (this.state.studentIdsToSubmit.length === 0)
      alert('No student selected');
    else this.state.studentIdsToSubmit.map(id => this.postPotty(id));
  };

  handleClick = async (e, name, value) => {
    this.setState({ [name]: value });
    console.log(e.currentTarget)
    const prevSelect = document.querySelectorAll(`.${name}`)
    prevSelect.forEach(selected=> selected.setAttribute('color', 'default'))
    e.currentTarget.setAttribute('color', 'primary')
    
  };

  postPotty = id => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    console.log(date);
    console.log(`PLACE`, this.state.place);
    console.log(`TYPE`, this.state.type);
    fetch(`/api/student/${id}/diapering`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time: this.state.pottyTime,
        place: this.state.pottyPlace,
        type: this.state.pottyType,
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
    const { classes } = this.props;
    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar type={this.state.userType} />
          <MultiSelectContainer
            orgId={this.state.orgId}
            allStudents={this.state.allStudents}
            updateStudents={this.updateStudents}
          />

          <div className="addpotty-container">
            <div className="addpotty-item1">
              <Timepicker ref={this.timepickerState} setTime={this.setPottyTime} />
            </div>
            <div className="addpotty-item2">
              <Button
                variant="contained"
                className="pottyPlace"
                color='default'
                onClick={(e) => this.handleClick(e,'pottyPlace', 'Diaper')}
              >
                Diaper
              </Button>
              <Button
                variant="contained"
                className="pottyPlace"
                color='default'
                onClick={(e) => this.handleClick(e, 'pottyPlace', 'Potty')}
              >
                Potty
              </Button>
              <Button
                variant="contained"
                className="pottyPlace"
                color='default'
                onClick={(e) => this.handleClick(e, 'pottyPlace', 'Accident')}
              >
                Accident
              </Button>
            </div>
            <div className="addpotty-item3">
              <Button
                variant="contained"
                className="pottyType"
                color='default'
                onClick={(e) => this.handleClick(e, 'pottyType', 'Wet')}
              >
                Wet
              </Button>
              <Button
                variant="contained"
                className="pottyType"
                color='default'
                onClick={(e) => this.handleClick(e, 'pottyType', 'BM')}
              >
                BM
              </Button>
              <Button
                variant="contained"
                className="pottyType"
                color='default'
                onClick={(e) => this.handleClick('pottyType', 'Dry')}
              >
                Dry
              </Button>
            </div>
            <Button
              className={classes.submitbutton}
              onClick={this.handleSubmit}
              color='default'
            >
              Add Activity
            </Button>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

AddPotty.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPotty);
