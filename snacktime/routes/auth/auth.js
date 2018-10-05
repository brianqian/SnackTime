const router = require('express').Router();
var db = require('../../models');

var sessionChecker = (req, res, next) => {
  console.log('session', req.session.staff, req.cookies.user_sid);
  if (req.session.staff && req.cookies.user_sid) {
    db.Staff.findOne({
      where: {
        id: req.session.staff.id,
      },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.Organization,
        }
        // { model: db.Student },
        // {
        //   model: db.Parent,
        //   attributes: { exclude: ['password'] },
        // },
      ],
    }).then(staff => {
      console.log(staff);
      res.json(staff.dataValues);
    });
  } else {
    next();
  }
};

// route for Home-Page
// router.get('/', sessionChecker, (req, res) => {
//   res.send('test');
// });

// route for checking currently logged in user
router.route('/loggedin').get(sessionChecker, (req, res) => {
  res.redirect('/notauthorized');
});

// route for creating Organization
router.route('/Organization').post((req, res) => {
  console.log(req.body);
  db.Organization.create({
    name: req.body.orgName,
  }).then(org => {
    res.json(org);
  });
});

// route for staff signup
router.route('/signup/staff').post((req, res) => {
  db.Staff.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    OrganizationId: req.body.orgId,
  })
    .then(staff => {
      req.session.staff = staff.dataValues;
      let { email, id, name } = req.session.staff;
      let obj = { email, id, name };
      console.log("sign up", req.session.staff);
      res.json(obj);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

// route for staff Login
router
  .route('/login/staff')
  .get(sessionChecker, (req, res) => {
    res.send('go to staff login');
  })
  .post((req, res) => {
    var email = req.body.email,
      password = req.body.password;

    db.Staff.findOne({ where: { email: email } }).then(function(staff) {
      if (!staff) {
        res.redirect('/login');
      } else if (!staff.validPassword(password)) {
        res.redirect('/login');
      } else {
        req.session.staff = staff.dataValues;
        res.send('staff logged in');
      }
    });
  });

// route for staff logout
router.get('/logout/staff', (req, res) => {
  if (req.session.staff && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// route for parent signup
router.route('/signup/parent').post((req, res) => {
  db.Parent.create({
    email: req.body.email,
    password: req.body.password,
    OrganzationID: req.body.org,
  })
    .then(parent => {
      req.session.parent = parent.dataValues;
      let { email, id, name } = req.session.parent;
      let obj = { email, id, name };
      res.json(obj);
    })
    .catch(error => {
      res.redirect('/');
    });
});

// route for parent Login
router
  .route('/login/parent')
  .get(sessionChecker, (req, res) => {
    res.send('go to parent login');
  })
  .post((req, res) => {
    var email = req.body.email,
      password = req.body.password;

    db.Parent.findOne({ where: { email: email } }).then(function(parent) {
      if (!parent) {
        res.redirect('/login');
      } else if (!parent.validPassword(password)) {
        res.redirect('/login');
      } else {
        req.session.parent = parent.dataValues;
        res.send('parent logged in');
      }
    });
  });

// route for parent logout
router.get('/logout/parent', (req, res) => {
  if (req.session.parent && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
