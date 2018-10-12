export default {


  StaffAuthorize: async function(page, studentOrg) {
    let data = await (await fetch('/auth/loggedin')).json();
    //If user is not logged in, send them to login
    console.log('data', data)
    if (!data.orgId) {
      console.log('LOGIN REJECTED org id')
      page.setState({
        loginRejected: true,
      });
    } else if (data.userType !== 'staff'){
      console.log('LOGIN REJECTED user type')
      page.setState({
        orgUserCheck: false,
      });
      //If we are checking a student page, check to make sure user and student are from same organization
    }else if (studentOrg && data.orgId !== studentOrg) {
      console.log('LOGIN REJECTED same org')

      page.setState({
        orgUserCheck: false,
      });
      //Validate user/student have same organization or only user if no student organization is provided
    } else if (
      (studentOrg && data.orgId === studentOrg) ||
      (data.userId && !studentOrg)
    ) {
      console.log('USER AUTHORIZED');
      console.log(data.userType)

      page.setState({
        userName: data.name,
        userId: data.userId,
        userType: data.userType,
        orgName: data.orgName,
        orgId: data.orgId,
        loginRejected: false,
        loggedIn: true,
        orgUserCheck: true,
      }, ()=>{console.log(page.state)});
    }
  },

  ParentAuthorize: async function(page) {
    console.log('parent authorize')
    let data = await (await fetch('/auth/loggedin')).json();
    //If user is not logged in, send them to login
    console.log('data', data);
    if (!data.userId) {
      console.log('LOGIN REJECTED ')
      page.setState({
        loginRejected: true,
      });
    } else if (data.userType !== 'parent'){
      page.setState({
        orgUserCheck: false,
      });
      //If we are checking a student page, check to make sure user and student are from same organization
    }else if (data.userId){
      console.log('USER AUTHORIZED');
      console.log(data.userType)
      page.setState({
        userName: data.name,
        userId: data.userId,
        userType: data.userType,
        orgName: data.orgName,
        students: data.student,
        loginRejected: false,
        loggedIn: true,
        orgUserCheck: true,
      });
    }
  },
};
