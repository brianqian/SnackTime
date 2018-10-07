const router = require("express").Router();
const shortid = require("shortid");
const nodemailer = require("nodemailer");
var db = require("../../models");

//Every page is checked via sessionChecker
var sessionChecker = (req, res, next) => {
  if (req.session.staff && req.cookies.user_sid) {
    db.Staff.findOne({
      where: {
        id: req.session.staff.id
      },
      include: [
        {
          model: db.Organization
        }
      ]
    }).then(staff => {
      console.log("session checked");
      // console.log(staff.dataValues.Organization.dataValues.name);
      const returnObj = {
        userId: staff.dataValues.id,
        userType: staff.dataValues.role,
        name: staff.dataValues.name,
        orgName: staff.dataValues.Organization.dataValues.name,
        orgId: staff.dataValues.Organization.dataValues.id
      };
      console.log(returnObj);
      res.json(returnObj);
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
router.route("/loggedin").get(sessionChecker, (req, res) => {
  res.json({ loggedIn: false });
});

// route for creating Organization
router.route("/Organization").post((req, res) => {
  console.log(req.body);
  db.Organization.create({
    name: req.body.orgName
  }).then(org => {
    res.json(org);
  });
});

// Testing Routes
router.route("/getallorg").get((req, res) => {
  db.Organization.findAll({
    include: {
      all: true
    }
  }).then(data => res.send(data));
});
router.route("/getallstaff").get((req, res) => {
  db.Staff.findAll({
    include: {
      all: true
    }
  }).then(data => res.send(data));
});

// route for staff signup
router.route("/signup/staff").post((req, res) => {
  console.log("orgID", req.body.orgId);
  db.Staff.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    OrganizationId: req.body.orgId
  })
    .then(staff => {
      req.session.staff = staff.dataValues;
      let { email, id, name } = req.session.staff;
      let obj = { email, id, name };
      res.json(obj);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

// route for staff Login
router
  .route("/login/:role")
  .get(sessionChecker, (req, res) => {
    res.send("go to staff login");
  })
  .post((req, res) => {
    console.log("in the post", req.body);
    var email = req.body.email,
      password = req.body.password;

    db[req.params.role]
      .findOne({ where: { email: email } })
      .then(function(staff) {
        // console.log("validate function", staff.validPassword(password));
        console.log(staff);
        if (!staff) {
          res.send("Email does not exist in our database");
        } else if (!staff.validPassword(password)) {
          console.log("incorrect password");
          res.send("Incorrect Password");
        } else if (staff.validPassword(password)) {
          req.session.staff = staff.dataValues;
          res.send("Success");
        }
      });
  });
// route for staff logout
router.get("/logout/staff", (req, res) => {
  if (req.session.staff && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

// route for parent signup
router.route("/signup/parent").post((req, res) => {
  db.Parent.create({
    email: req.body.email,
    password: req.body.password,
    OrganizationId: req.body.org
  })
    .then(parent => {
      req.session.parent = parent.dataValues;
      let { email, id, name } = req.session.parent;
      let obj = { email, id, name };
      res.json(obj);
    })
    .catch(error => {
      res.redirect("/");
    });
});

// route for parent Login
router
  .route("/login/parent")
  .get(sessionChecker, (req, res) => {
    res.send("go to parent login");
  })
  .post((req, res) => {
    var email = req.body.email,
      password = req.body.password;

    db.Parent.findOne({ where: { email: email } })
      .then(function(parent) {
        if (!parent) {
          res.redirect("/login");
        } else if (!parent.validPassword(password)) {
          res.redirect("/login");
        } else {
          req.session.parent = parent.dataValues;
          res.send("parent logged in");
        }
      })
      .catch(err => console.log(err));
  });

// route for parent logout
router.get("/logout/parent", (req, res) => {
  if (req.session.parent && req.cookies.user_sid) {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

router.post("/forgot", (req, res) => {
  let { email } = req.body; // same as let email = req.body.email
  console.log("forgot", email);
  let passResetKey = shortid.generate();
  let passKeyExpires = new Date().getTime() + 20 * 60 * 1000;
  db.Staff.update(
    { passResetKey: passResetKey, passKeyExpires: passKeyExpires },
    {
      where: {
        email: email
      }
    }
  ).then(() => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      type: "SMTP",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: "snacktimeemail@gmail.com",
        pass: "$$SnackTime33"
      }
    });
    let mailOptions = {
      subject: `Snack Time | Password reset`,
      to: email,
      from: `Snack Time <snacktimeemail@gmail.com>`,
      html: `
                <h1>Hi,</h1>
                <h2>Here is your password reset key</h2>
                <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${passResetKey}</code></h4>
                <p>Please ignore if you didn't try to reset your password on our platform</p>`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
});

router.post("/resetpass", (req, res) => {
  let { resetKey, newPassword } = req.body;
  db.Staff.findOne({
    where: {
      passResetKey: resetKey
    }
  }).then(staff => {
    if (staff) {
      let now = new Date().getTime();
      if (staff.passKeyExpires > now) {
        staff.getHash(newPassword);
        db.Staff.update(
          {
            passResetKey: null,
            passKeyExpires: null
          },
          {
            where: {
              passResetKey: resetKey
            }
          }
        ).then(staff => {
          if (staff) {
            res.status(200).send("Password reset successful");
          } else {
            res.status(500).send("error resetting your password");
          }
        });
      } else {
        res
          .status(400)
          .send(
            "Sorry, pass key has expired. Please initiate the request for a new one"
          );
      }
    } else {
      res.status(400).send("invalid pass key!");
    }
  });
});
//
module.exports = router;
