import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultiStudentSelect extends React.Component {
  state = {
    students: [],
    selectedStudents: [],
    orgId: '',
    loginRejected: false,
    loggedIn: false,
  };

  componentDidMount = () => {
    console.log('mounted');
    console.log(this.props.location.state.activity);
    this.getUserId();
  };

  getUserId = () => {
    fetch('/auth/loggedin').then(res =>
      res.json().then(data => {
        if (data.userId) {
          console.log('USER AUTHORIZED');
          this.setState({
            orgId: data.orgId,
            loginRejected: false,
            loggedIn: true,
          });
        } else {
          this.setState({
            loginRejected: true,
          });
        }
        this.getAllStudents();
      })
    );
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   <Redirect
  //   to=({
  //     pathname: {this.props.activity},
  //     state: {selectedStudents: this.state.selectedStudents},
  //   })
  //   />
  // }

  getAllStudents = () => {
    fetch(`/api/student/${this.state.orgId}`)
      .then(res => res.json())
      .then(result => {
        console.log('Res:', result);
        this.setState({ students: result }, function() {
          console.log('State', this.state.students);
        });
      });
  };

  handleChange = event => {
    this.setState({ selectedStudents: event.target.value });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">
            Select Students
          </InputLabel>
          <Select
            multiple
            value={this.state.selectedStudents}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.state.students.map(student => (
              <MenuItem
                key={student.id}
                value={student.name}
                style={{
                  fontWeight:
                    this.state.students.indexOf(student.name) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {student.name}
              </MenuItem>
            ))}
          </Select>
          <Link
            to={{
              pathname: `${this.props.location.state.activity}`,
              state: { selectedStudents: this.state.selectedStudents },
            }}
          >
            <button>Next</button>
          </Link>
        </FormControl>
      </div>
    );
  }
}

MultiStudentSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultiStudentSelect);
