const router = require('express').Router();
var db = require('../../models');

var sessionChecker = (req, res, next) => {
  if (req.session.staff && req.cookies.user_sid) {
    db.staff
      .findOne({
        where: {
          id: req.session.staff.id,
        },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: organization,
            model: student,
            model: parent,
            attributes: { exclude: ['password'] },
          },
        ],
      })
      .then(staff => {
        res.json(staff);
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

// route for creating organization
router.route('/organization').post((req, res) => {
  db.organization
    .create({
      name: req.body.name,
    })
    .then(org => {
      res.json(org.id);
    });
});

// route for staff signup
router.route('/signup').post((req, res) => {
  db.staff
    .create({
      email: req.body.email,
      password: req.body.password,
      OrganzationID: req.body.org,
    })
    .then(staff => {
      req.session.staff = staff.dataValues;
      let { email, id, name } = req.session.staff;
      let obj = { email, id, name };
      res.json(obj);
    })
    .catch(error => {
      res.redirect('/');
    });
});

// route for staff Login
router
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.send('go to staff login');
  })
  .post((req, res) => {
    var email = req.body.email,
      password = req.body.password;

    db.staff.findOne({ where: { email: email } }).then(function(staff) {
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
router.get('/logout', (req, res) => {
  if (req.session.staff && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// route for parent signup
router.route('/signup').post((req, res) => {
  db.parent
    .create({
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
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.send('go to parent login');
  })
  .post((req, res) => {
    var email = req.body.email,
      password = req.body.password;

    db.parent.findOne({ where: { email: email } }).then(function(parent) {
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
router.get('/logout', (req, res) => {
  if (req.session.parent && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
