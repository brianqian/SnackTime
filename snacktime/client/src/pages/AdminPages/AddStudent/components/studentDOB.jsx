import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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

class StudentDOB extends React.Component {
  state = {
    month: '',
    day: '',
    year: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log("state ",this.state.month);
    console.log("name " ,[name]);
    console.log("value ",event.target.value)
    this.props.onChange([name], event.target.value)
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="month-native-simple">Month</InputLabel>
          <Select
            native
            key={this.state.month}
            name='month'
            value={this.state.month}
            onChange={this.handleChange("month")}
            inputProps={{
                name: 'Month',
                id: 'month-native-simple',
            }}
          >
            <option value="" />
            <option value={'January'}>January</option>
            <option value={'February'}>February</option>
            <option value={'March'}>March</option>
            <option value={'April'}>April</option>
            <option value={'May'}>May</option>
            <option value={'June'}>June</option>
            <option value={'July'}>July</option>
            <option value={'August'}>August</option>
            <option value={'September'}>September</option>
            <option value={'October'}>October</option>
            <option value={'November'}>November</option>
            <option value={'December'}>December</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="day-native-simple">Day</InputLabel>
          <Select
            native
            name='day'
            value={this.state.day}
            onChange={this.handleChange("day")}
            inputProps={{
                name: 'Day',
                id: 'day-native-simple',
            }}
          >
            <option value="" />
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
            <option value={'4'}>4</option>
            <option value={'5'}>5</option>
            <option value={'6'}>6</option>
            <option value={'7'}>7</option>
            <option value={'8'}>8</option>
            <option value={'9'}>9</option>
            <option value={'10'}>10</option>
            <option value={'11'}>11</option>
            <option value={'12'}>12</option>
            <option value={'13'}>13</option>
            <option value={'14'}>14</option>
            <option value={'15'}>15</option>
            <option value={'16'}>16</option>
            <option value={'17'}>17</option>
            <option value={'18'}>18</option>
            <option value={'19'}>19</option>
            <option value={'20'}>20</option>
            <option value={'21'}>21</option>
            <option value={'22'}>22</option>
            <option value={'23'}>23</option>
            <option value={'24'}>24</option>
            <option value={'25'}>25</option>
            <option value={'26'}>26</option>
            <option value={'27'}>27</option>
            <option value={'28'}>28</option>
            <option value={'29'}>29</option>
            <option value={'30'}>30</option>
            <option value={'31'}>31</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="year-native-simple">Year</InputLabel>
          <Select
            native
            name='year'
            value={this.state.year}
            onChange={this.handleChange("year")}
            inputProps={{
                name: 'Year',
                id: 'year-native-simple',
            }}
          >
            <option value="" />
            <option value={'2005'}>2005</option>
            <option value={'2006'}>2006</option>
            <option value={'2007'}>2007</option>
            <option value={'2008'}>2008</option>
            <option value={'2009'}>2009</option>
            <option value={'2010'}>2010</option>
            <option value={'2011'}>2011</option>
            <option value={'2012'}>2012</option>
            <option value={'2013'}>2013</option>
            <option value={'2014'}>2014</option>
            <option value={'2015'}>2015</option>
            <option value={'2016'}>2016</option>
            <option value={'2017'}>2017</option>
            <option value={'2018'}>2018</option>
          </Select>
        </FormControl>
      </div>
    );
  }
}

StudentDOB.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(StudentDOB);