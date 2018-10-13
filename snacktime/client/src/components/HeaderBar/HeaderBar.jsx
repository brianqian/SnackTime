import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Redirect } from 'react-router-dom';
import './HeaderBar.css';



const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
class HeaderBar extends React.Component {
  state = {};

  logOut = () => {
    console.log('test');
    fetch('/auth/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ status: res });
      });
  };
  render() {
    const { classes } = this.props;
    if (!this.state.status) {
      return (
        <div className={classes.root}>

            <AppBar color='primary' position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  aria-label="Menu"
                  href={`/${this.props.type}homepage`}
                >
                  <HomeIcon
                    className="{classes.icon}"
                    style={{ fontSize: 40 }}
                  />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  Snack Time
                </Typography>
                <Button onClick={this.logOut} value="Log Out" color="inherit">
                  Log Out
                </Button>
              </Toolbar>
            </AppBar>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);
