// import React from 'react';
// import ReactDOM from 'react-dom';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import EditTable from 'material-ui-table-edit';
 

// const container = document.createElement('div')

// const headers = [
//   {value: 'Activity', type: 'TextField', width: 200},
//   {value: 'Type', type: 'TextField', width: 200},
//   {value: 'Time', type: 'TimePicker', width: 200},
//   {value: 'Enabled', type: 'Toggle', width: 50},
//   {value: 'Last Edited By', type: 'ReadOnly', width: 100}
// ]
 
// const rows = []
 
// const onChange = (row) => {
//   console.log(row)
// }
 
// class Table extends React.Component {
  
//   getChildContext () {
//     return {muiTheme: getMuiTheme(baseTheme)}
//   };

//   childContextTypes: {
//     muiTheme: React.PropTypes.object.isRequired
//   };
 
//   render () {
//     return (
//       <EditTable
//         onChange={onChange}
//         rows={rows}
//         headerColumns={headers}
//         enableDelete={true}
//       />
//     )
//   }
// }
 


// //   DateTimeSelector.propTypes = {
// //     classes: PropTypes.object.isRequired
// //   };
  
//   export default Table;