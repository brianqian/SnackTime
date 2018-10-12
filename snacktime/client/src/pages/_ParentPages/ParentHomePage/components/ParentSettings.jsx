import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HeaderBar from "../../../../components/HeaderBar/HeaderBar";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import ChangePassword from "../../../ForgotPassword/components/ChangePassword";
import ChangeEmail from "../../../../pages/Settings/ChangeEmail";
import Auth from "../../../../utils/Auth";
import { Redirect } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    margin: "auto",
    width: "75%",
    textAlign: "center"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "100%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  chip: {
    margin: theme.spacing.unit
  },
  spacing: {
    display: "inline-block",
    margin: "auto"
  },
  textCenter: {
    display: "block",
    textAlign: "center"
  },
  button: {
    marginTop: "10px"
  },
  textField: {
    marginLeft: "5px",
    marginRight: "5px"
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class ParentSettings extends React.Component {
  state = {
    expanded: null,
    name: "",
    userId: "",
    userType: "parent",
    orgName: "",
    orgId: "",
    loggedIn: false,
    loginRejected: false,
    value: 0
  };

  componentWillMount = async () => {
    console.log("test");
    await Auth.ParentAuthorize(this);
    console.log(this.state);
  };

  updateContact = () => {
    fetch(`/api/parent/parentinfo/${this.state.userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        address: `${this.state.address}, ${this.state.city}, ${
          this.state.state
        } ${this.state.zip}`,
        phone: this.state.phone
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.name !== "SequelizeValidationError") {
          this.handleClick();
        }
      });
  };

  handlePanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleChange = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    // console.log(name);
  };

  handleTab = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { expanded } = this.state;
    const { value } = this.state;

    if (this.state.loggedIn) {
      return (
        <div>
          <HeaderBar type={this.state.userType} />
          <div className={classes.root}>
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={this.handlePanelChange("panel1")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Change Contact Information
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.textCenter}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={this.handleTab}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    scrollable
                    scrollButtons="auto"
                  >
                    <Tab label="Change Information" />
                  </Tabs>
                </AppBar>
                {value === 0 && (
                  <TabContainer>
                    <form
                      className={classes.container}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="Full Name"
                        placeholder="Full Name"
                        name="name"
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        label="Address"
                        placeholder="Address"
                        name="address"
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        label="City"
                        placeholder="City"
                        name="city"
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        label="State"
                        placeholder="State"
                        name="state"
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        label="Zip Code"
                        placeholder="Zip Code"
                        name="zip"
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        type="number"
                        variant="outlined"
                      />
                      <br />

                      <TextField
                        className={classes.textField}
                        margin="normal"
                        label="Phone"
                        name="phone"
                        type="number"
                        onChange={this.handleChange}
                        // value={this.state.phone}
                        // onChange={this.onChange}
                      >
                        {/* <InputMask mask="(999)999-9999" maskChar=" " /> */}
                      </TextField>
                      <br />
                      <Button
                        onClick={this.updateContact}
                        variant="contained"
                        size="small"
                        className={classes.button}
                      >
                        Save
                        <Send
                          className={classNames(
                            classes.leftIcon,
                            classes.iconSmall
                          )}
                        />
                      </Button>
                    </form>
                  </TabContainer>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={this.handlePanelChange("panel3")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Account</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.textCenter}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={this.handleTab}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                    scrollable
                    scrollButtons="auto"
                  >
                    <Tab label="Change Email" />
                    <Tab label="Change Password" />
                  </Tabs>
                </AppBar>
                {value === 0 && (
                  <TabContainer>
                    <form
                      className={classes.container}
                      noValidate
                      autoComplete="off"
                    >
                      <ChangeEmail role="parent" />
                    </form>
                  </TabContainer>
                )}
                {value === 1 && (
                  <TabContainer>
                    <form
                      className={classes.container}
                      noValidate
                      autoComplete="off"
                    >
                      <ChangePassword role="parent" />
                    </form>
                  </TabContainer>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Information Updated</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      );
    } else if (this.state.loginRejected) {
      return (
        <Redirect
          to={{
            pathname: "/notAuthorized",
            state: { type: "Parent" }
          }}
        />
      );
    } else {
      return <div />;
    }
  }
}

ParentSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ParentSettings);
