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
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import ChangePassword from "../../ForgotPassword/components/ChangePassword";
import ChangeEmail from "../../Settings/ChangeEmail";
// import InputMask from "react-input-mask";

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
  }
});

class Settings extends React.Component {
  state = {
    expanded: null,
    value: 0
  };

  handlePanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleTab = (event, value) => {
    this.setState({ value });
  };

  handleClick = () => {};

  handleChange = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    console.log(name);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  changeOrg = () => {
    let address = `${this.state.orgaddress}, ${this.state.orgcity}, ${
      this.state.orgstate
    } ${this.state.orgzip}`;
    fetch("/api/changeorg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.orgname,
        phone: this.state.orgphone,
        address: address,
        openTime: this.state.orgopen,
        closeTime: this.state.orgclose
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const { classes, theme } = this.props;
    const { expanded } = this.state;
    const { value } = this.state;
    return (
      <div>
        <HeaderBar />
        <div className={classes.root}>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handlePanelChange("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Organization</Typography>
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
                      label="New Organization Name"
                      placeholder="Name"
                      name="orgname"
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      label="Address"
                      placeholder="Address"
                      name="orgaddress"
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="City"
                      placeholder="City"
                      name="orgcity"
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="State"
                      placeholder="State"
                      name="orgstate"
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="Zip Code"
                      placeholder="Zip Code"
                      name="orgzip"
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      type="number"
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      label="Open"
                      type="time"
                      name="orgopen"
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      label="Close"
                      type="time"
                      name="orgclose"
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <br />
                    <TextField
                      className={classes.textField}
                      margin="normal"
                      label="Phone"
                      name="orgphone"
                      type="number"
                      onChange={this.handleChange}
                      // value={this.state.phone}
                      // onChange={this.onChange}
                    >
                      {/* <InputMask mask="(999)999-9999" maskChar=" " /> */}
                    </TextField>
                    <br />
                    <Button
                      onClick={this.changeOrg}
                      variant="contained"
                      size="small"
                      className={classes.button}
                    >
                      Send
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
            expanded={expanded === "panel2"}
            onChange={this.handlePanelChange("panel2")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Staff</Typography>
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
                  <Tab label="" />
                  <Tab label="Item Two" />
                  <Tab label="Item Three" />
                </Tabs>
              </AppBar>
              {value === 0 && <TabContainer>Item One</TabContainer>}
              {value === 1 && <TabContainer>Item Two</TabContainer>}
              {value === 2 && <TabContainer>Item Three</TabContainer>}
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
                    {/* <TextField
                      
                      label="New Email"
                      placeholder="example@email.com"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      
                      label="Current Password"
                      placeholder="Password"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <br></br>
                    <Button
                      onClick={this.handleSubmit}
                      variant="contained"
                      size="small"
                      className={classes.button}
                    >
                      Send
                      <Send
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall
                        )}
                      />
                    </Button> */}
                    <ChangeEmail />
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
                    {/* <TextField
                      
                      label="Current Password"
                      placeholder="Password"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      
                      label="New Password"
                      placeholder="Password"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <br></br>
                    <Button
                      onClick={this.handleSubmit}
                      variant="contained"
                      size="small"
                      className={classes.button}
                    >
                      Send
                      <Send
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall
                        )}
                      />
                    </Button> */}
                    <ChangePassword />
                  </form>
                </TabContainer>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Settings);
