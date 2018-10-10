export default {
  loggedIn: function(page, callback=()=>{}) {
    fetch('/auth/loggedin').then(res =>
      res.json().then(data => {
        if (data.userId) {
          console.log('USER AUTHORIZED');
          page.setState({
            name: data.name,
            userId: data.userId,
            userType: data.role,
            orgName: data.orgName,
            orgId: data.orgId,
            loginRejected: false,
            loggedIn: true,
          }, ()=>callback());
        } else {
          page.setState({
            loginRejected: true,
          }, ()=> console.log('not logged in :', this.state));
        }
  
      })
    );
  },
};
