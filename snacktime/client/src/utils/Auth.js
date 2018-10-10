export default {
  loggedIn: function(page, callback = () => {}) {
    fetch('/auth/loggedin').then(res =>
      res.json().then(data => {
        if (data.userId) {
          console.log('USER AUTHORIZED');
          page.setState(
            {
              name: data.name,
              userId: data.userId,
              userType: data.userType,
              orgName: data.orgName,
              orgId: data.orgId,
              loginRejected: false,
              loggedIn: true,
            },
            () => callback()
          );
        } else {
          page.setState(
            {
              loginRejected: true,
            },
            () => console.log('not logged in :', this.state)
          );
        }
      })
    );
  },

  StaffAuthorize: async function(page, studentOrg) {
    let data = await (await fetch('/auth/loggedin')).json();
    if (!data.orgId) {
      page.setState({
        loginRejected: true,
      });
    }else if (studentOrg && data.orgId !== studentOrg){
      page.setState({
        sameOrg: false,
      });
    }else if ((studentOrg && data.orgId===studentOrg) || (data.orgId && !studentOrg)) {
      console.log('USER AUTHORIZED');
      page.setState({
        name: data.name,
        userId: data.userId,
        userType: data.userType,
        orgName: data.orgName,
        orgId: data.orgId,
        loginRejected: false,
        loggedIn: true,
        sameOrg: true,
      });
    }
    //needs to check for correct org, and usertype staff

    console.log(data);
  },
};
