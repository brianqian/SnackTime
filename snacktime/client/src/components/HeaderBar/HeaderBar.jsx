import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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


function HeaderBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Home"
            href="/staffhomepage"
          >
            <i className="material-icons">
            home
            </i>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Snack Time
          </Typography>
          <Button color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
  HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (HeaderBar);
