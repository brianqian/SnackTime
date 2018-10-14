import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

function mobileCheck() {
  if (window.innerWidth < 700) {
    return "stacked";
  } else {
    return "scroll";
  }
}

const options = {
  filterType: "checkbox",
  pagination: false,
  selectableRows: false,
  responsive: mobileCheck()
};

class ResponsiveTable extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            // backgroundColor: "#FF0000"
          }
        },
        MUIDataTableToolbar: {
          root: {
            backgroundColor: "#3f51b5",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px"
          }
        },
        MuiTypography: {
          title: {
            color: "#FFF"
          }
        },
        MuiTableRow: {
          root: {
            "& td:last-child": {
              // backgroundColor: "#3f51b5"
              paddingRight: "56px"
            }
          }
        }
      }
    });

  render() {
    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={this.props.title}
            data={this.props.data}
            columns={this.props.columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ResponsiveTable;
