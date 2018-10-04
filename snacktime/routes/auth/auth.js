const router = require('express').Router();
// var staff = require('./models/staff');
var db = require('./models');

var sessionChecker = (req, res, next) => {
  if (req.session.staff && req.cookies.staff_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

// route for Home-Page
router.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

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
      res.redirect('/');
    })
    .catch(error => {
      res.redirect('/');
    });
});

// route for staff Login
router
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
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
        res.redirect('/dashboard');
      }
    });
  });

// route for staff's dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.staff && req.cookies.staff_sid) {
    res.sendFile(__dirname + '/public/dashboard.html');
  } else {
    res.redirect('/login');
  }
});

// route for staff logout
router.get('/logout', (req, res) => {
  if (req.session.staff && req.cookies.staff_sid) {
    res.clearCookie('staff_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});
