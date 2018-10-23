import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";

function mobileCheck() {
  if (window.innerWidth < 700) {
    return "stacked";
  } else {
    return "scroll";
  }
}

const options = {
  search: false,
  download: false,
  pagination: false,
  selectableRows: false,
  responsive: mobileCheck()
};

class ResponsiveTable extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
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
        <br />
      </div>
    );
  }
}

export default ResponsiveTable;
