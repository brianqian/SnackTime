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
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../../../utils/Auth';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 500,
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

  async componentDidMount() {
    await Auth.StaffAuthorize(this);
    if (this.state.orgId) this.getAllStudents();
  }
  
  async getAllStudents() {
    let data = await (await fetch(`/api/student/${this.state.orgId}`)).json();
    const nameArray = [];
    data.forEach(elem => nameArray.push({name: elem.name, id: elem.id}));
    this.setState({ students: nameArray });
    console.log(this.state)
  }

  // getAllStudents = () => {
  //   console.log('get all students running');
  //   console.log(this.state);
  //   fetch(`/api/student/${this.state.orgId}`)
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log('Res:', result);
  //       this.setState({ students: result }, function() {});

  //     });
  // };

  handleChange = event => {
    console.log('Multiselect :', event.target.value);
    this.setState({ selectedStudents: event.target.value }, function() {
      console.log(this.state.selectedStudents);
    });
  };

  render() {
    const { classes, theme } = this.props;
    if (this.state.loggedIn) {
      if (this.props.location.state) {
        return (
          <div>
            <HeaderBar />
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
                  MenuProps={MenuProps}
                >
                  {this.state.students.map(student => (
                    <MenuItem
                      key={student.id}
                      value={student.id}
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
          </div>
        );
      } else {
        console.log('hello');
        window.location.href = '/dailyreportmenu';
      }
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
  }
}

MultiStudentSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultiStudentSelect);
