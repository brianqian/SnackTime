export default {
  // loggedIn: function(page, callback = () => {}) {
  //   fetch('/auth/loggedin').then(res =>
  //     res.json().then(data => {
  //       if (data.userId) {
  //         console.log('USER AUTHORIZED');
  //         page.setState(
  //           {
  //             name: data.name,
  //             userId: data.userId,
  //             userType: data.userType,
  //             orgName: data.orgName,
  //             orgId: data.orgId,
  //             loginRejected: false,
  //             loggedIn: true,
  //           },
  //           () => callback()
  //         );
  //       } else {
  //         page.setState(
  //           {
  //             loginRejected: true,
  //           },
  //           () => console.log('not logged in :', this.state)
  //         );
  //       }
  //     })
  //   );
  // },

  StaffAuthorize: async function(page, studentOrg) {
    let data = await (await fetch('/auth/loggedin')).json();
    //If user is not logged in, send them to login
    if (!data.orgId) {
      page.setState({
        loginRejected: true,
      });
      //If we are checking a student page, check to make sure user and student are from same organization and are staff
    } else if (data.userType !== 'staff' && studentOrg && data.orgId !== studentOrg) {
      console.log(data.userType);
      page.setState({
        orgUserCheck: false,
      });
      //Validate user/student have same organization or only user if no student organization is provided
    } else if (
      (data.userType === 'staff' && (studentOrg && data.orgId === studentOrg) ||
      (data.orgId && !studentOrg))
    ) {
      console.log('USER AUTHORIZED');
      page.setState({
        name: data.name,
        userId: data.userId,
        userType: data.userType,
        orgName: data.orgName,
        orgId: data.orgId,
        loginRejected: false,
        loggedIn: true,
        orgUserCheck: true,
      });
    }
  },
};