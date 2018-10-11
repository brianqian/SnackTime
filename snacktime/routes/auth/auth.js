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
    name: req.body.orgName,
    phone: req.body.orgPhoneNum,
    openTime:req.body.openTime,
    closeTime:req.body.closeTime,
    address: req.body.orgAddress
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
    // console.log("in the post", req.body);
    var email = req.body.email,
      password = req.body.password;

    db[req.params.role]
      .findOne({ where: { email: email } })
      .then(function(staff) {
        // console.log("validate function", staff.validPassword(password));
        // console.log(staff);
        if (!staff) {
          res.send("Email does not exist in our database");
        } else if (!staff.validPassword(password)) {
          console.log("incorrect password");
          res.send("Incorrect Password");
        } else if (staff.validPassword(password)) {
          req.session.staff = staff.dataValues;
          // console.log("REQ.SESSION.STAFF", req.session.staff);
          res.send("Success");
        }
      });
  });
// route for staff logout
// router.get("/logout/staff", (req, res) => {
//   if (req.session.staff && req.cookies.user_sid) {
//     res.clearCookie("user_sid");
//     res.redirect("/");
//   } else {
//     res.redirect("/login");
//   }
// });

// route for parent signup
router.route("/signup/parent").post((req, res) => {
  db.Parent.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone
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

// logout
router.get("/logout", (req, res) => {
  if (req.session.parent || req.session.staff) {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.json("Logged out.");
  } else {
    res.json("Not logged in.");
  }
});

router.post("/forgot/:role", (req, res) => {
  let role = req.params.role;
  // console.log(role);
  let { email, baseUrl } = req.body; // same as let email = req.body.email
  console.log(role);
  let passResetKey = shortid.generate();
  let passKeyExpires = new Date().getTime() + 20 * 60 * 1000;
  db[req.params.role]
    .findOne({
      where: {
        email: email
      }
    })
    .then(user => {
      user
        .update({
          passResetKey: passResetKey,
          passKeyExpires: passKeyExpires
        })
        .then(() => {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            type: "SMTP",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
              user: "snacktimeemail@gmail.com",
              pass: process.env.EMAIL_PASSWORD
            }
          });
          let mailOptions = {
            subject: `Snack Time | Password reset`,
            to: email,
            from: `Snack Time <snacktimeemail@gmail.com>`,
            html: `
                <h1>Hi, ${user.name}</h1>
                <h2>Click the link below to reset your password.</h2>
                <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0"><a href='${baseUrl}resetpassword/${role}/${passResetKey}'>Click here to reset your password.</a></code></h2>
                <p>Please ignore if you didn't try to reset your password on our platform</p>`
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              res.json("Please check your email.");
            }
          });
        });
    });
});

router.post("/resetpass", (req, res) => {
  let { resetKey, newPassword, role } = req.body;
  db[role]
    .findOne({
      where: {
        passResetKey: resetKey
      }
    })
    .then(user => {
      if (user) {
        let now = new Date().getTime();
        if (user.passKeyExpires > now) {
          user.getHash(newPassword);
          db[role]
            .update(
              {
                passResetKey: null,
                passKeyExpires: null
              },
              {
                where: {
                  passResetKey: resetKey
                }
              }
            )
            .then(user => {
              if (user) {
                res.status(200).json("Password reset successful");
              } else {
                res.status(500).json("error resetting your password");
              }
            });
        } else {
          res
            .status(400)
            .json(
              "Sorry, pass key has expired. Please initiate the request for a new one"
            );
        }
      } else {
        res.status(400).json("invalid pass key!");
      }
    });
});

function changedPassword(name, email, role, baseUrl, passResetKey) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    type: "SMTP",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "snacktimeemail@gmail.com",
      pass: process.env.EMAIL_PASSWORD
    }
  });
  let mailOptions = {
    subject: `Snack Time | Password reset`,
    to: email,
    from: `Snack Time <snacktimeemail@gmail.com>`,
    html: `
        <h1>Hi, ${name}</h1>
        <h2>Your password was recently changed.</h2>
        <p>If you did not make this change please reset your password.</p>
        <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0"><a href='${baseUrl}resetpassword/${role}/${passResetKey}'>Click here to reset your password.</a></code></h2>`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json("Please check your email.");
    }
  });
}

router.post("/changepass", (req, res) => {
  console.log("route hit");
  let { password, newPassword, baseUrl } = req.body;
  let passResetKey = shortid.generate();
  let passKeyExpires = new Date().getTime() + 20 * 60 * 1000;
  if (req.session) {
    if (req.session.staff) {
      if (req.session.staff.email) {
        let email = req.session.staff.email;
        db.Staff.findOne({
          where: {
            email: email
          }
        }).then(staff => {
          if (staff.validPassword(password)) {
            staff.getHash(newPassword);
            staff.update({
              passResetKey: passResetKey,
              passKeyExpires: passKeyExpires
            });
          } else {
            return res.json("Invalid password");
          }
          try {
            console.log("trying to email");
            changedPassword(
              staff.name,
              staff.email,
              "Staff",
              baseUrl,
              passResetKey
            );
          } catch (error) {
            console.log(error);
            console.log("email failed");
          }
          return res.json("Password successfully changed!");
        });
        // .catch(err => {
        //   res.json("Something went wrong, please relog to try again.");
        // })
      }
    }
    if (req.session.parent) {
      if (req.session.parent.email === email) {
        let email = req.session.parent.email;
        db.Parent.findOne({
          where: {
            email: email
          }
        }).then(parent => {
          parent.getHash(newPassword);
          parent.update({
            passResetKey: passResetKey,
            passKeyExpires: passKeyExpires
          });
          try {
            console.log("trying to email");
            changedPassword(
              parent.name,
              parent.email,
              "Parent",
              baseUrl,
              passResetKey
            );
          } catch (error) {
            console.log(error);
            console.log("email failed");
          }
          return res.json("Password successfully changed!");
        });
      }
    }
  } else {
    return res.json("Unauthorized");
  }
});

function changedEmail(name, email, newEmail) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    type: "SMTP",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "snacktimeemail@gmail.com",
      pass: process.env.EMAIL_PASSWORD
    }
  });
  let mailOptions = {
    subject: `Snack Time | Email Change`,
    to: email,
    from: `Snack Time <snacktimeemail@gmail.com>`,
    html: `
        <h1>Hi, ${name}</h1>
        <h2>Your email was successfully changed.</h2>
        <h2>Your new email is now ${newEmail}.</h2>
        <h3>Thank you for using Snack Time</h3>`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json("Please check your email.");
    }
  });
}

router.post("/changeemail", (req, res) => {
  console.log("route hit");
  let { password, newEmail, baseUrl } = req.body;
  // let passResetKey = shortid.generate();
  // let passKeyExpires = new Date().getTime() + 20 * 60 * 1000;
  if (req.session) {
    if (req.session.staff) {
      if (req.session.staff.email) {
        let email = req.session.staff.email;
        db.Staff.findOne({
          where: {
            email: email
          }
        }).then(staff => {
          if (staff.validPassword(password)) {
            // staff.getHash(newPassword);
            staff.update({
              email: newEmail
            });
          } else {
            return res.json("Invalid password");
          }
          try {
            console.log("trying to email");
            // changedPassword(
            //   staff.name,
            //   staff.email,
            //   "Staff",
            //   baseUrl,
            //   passResetKey
            // );
            changedEmail(staff.name, staff.email, newEmail);
          } catch (error) {
            console.log(error);
            console.log("email failed");
          }
          return res.json("Email successfully changed!");
        });
        // .catch(err => {
        //   res.json("Something went wrong, please relog to try again.");
        // })
      }
    }
    if (req.session.parent) {
      if (req.session.parent.email === email) {
        let email = req.session.parent.email;
        db.Parent.findOne({
          where: {
            email: email
          }
        }).then(parent => {
          // parent.getHash(newPassword);
          if(parent.validPassword(password)) {
            parent.update({
              email: newEmail
            });
          } else {
            res.json("Invalid Password");
          }
          try {
            console.log("trying to email");
            // changedPassword(
            //   parent.name,
            //   parent.email,
            //   "Parent",
            //   baseUrl,
            //   passResetKey
            // );
            changedEmail(parent.name, parent.email, newEmail);
          } catch (error) {
            console.log(error);
            console.log("email failed");
          }
          return res.json("Email successfully changed!");
        });
      }
    }
  } else {
    return res.json("Unauthorized");
  }
});

//
module.exports = router;
