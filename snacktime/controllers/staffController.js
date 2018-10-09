const db = require('../models');
const shortid = require('shortid');
const nodemailer = require('nodemailer');

module.exports = {
  /************student**************/
  getAllStudents: function(req, res) {
    console.log(
      'GETALLSTUDENTSCONTROLEER--------------------------------------------------'
    );
    db.Student.findAll({
      order: [['name', 'ASC']],
      where: {
        OrganizationId: req.params.orgId,
      },
      include: [
        {
          all: true,
        },
      ],
    })
      .then(dbStudents => {
        if (dbStudents) {
          return res.json(dbStudents);
        } else {
          return res.json({ notFound: true });
        }
      })
      .catch(err => {
        console.log('+++++++++++++++++++++++++++++++EMPTYDATABASEERROR???');
        return res.status(422).json(err);
      });
  },

  saveStudent: function(req, res) {
    db.Student.create({
      name: req.body.name,
      address: req.body.address,
      dob: req.body.dob,
      notes: req.body.notes,
      allergies: req.body.allergies,
      medication: req.body.medication,
      doctor: req.body.doctor,
      OrganizationId: req.body.orgId,
    })
      .then(dbStudent => res.json(dbStudent))
      .catch(err => res.status(422).json(err));
  },

  deleteStudent: function(req, res) {
    db.Student.destroy({
      where: {
        id: req.params.studentId,
      },
    })
      .then(dbStudent => res.json(dbStudent))
      .catch(err => res.status(422).json(err));
  },

  updateStudent: function(req, res) {
    db.Student.update(
      {
        name: req.body.name,
        address: req.body.address,
        dob: req.body.dob,
        notes: req.body.notes,
        allergies: req.body.allergies,
        medication: req.body.medication,
        doctor: req.body.doctor,
      },
      {
        where: {
          id: req.params.studentId,
        },
      }
    )
      .then(dbStudent => res.json(dbStudent))
      .catch(err => res.status(422).json(err));
  },

  getStudentInfo: function(req, res) {
    db.Student.findOne({
      where: {
        id: req.params.studentId,
      },
    })
      .then(dbStudent => res.json(dbStudent))
      .catch(err => res.status(422).json(err));
  },

  getStudentsInfo: function(req,res){
    console.log("I am here")
    db.Student.findAll({
      attributes:['name'],
      where:{
        id:req.params.users
      }
    })
    .then(dbStudent => res.json(dbStudent))
    .catch(err => res.status(422).json(err));
  },

  /************student**************/

  /************parents**************/
  getAllParents: function(req, res) {
    db.Parent.findAll({})
      .then(dbParents => res.json(dbParents))
      .catch(err => res.status(422).json(err));
  },

  saveParent: function(req, res) {
    console.log('body', req.body);
    let baseUrl = req.body.baseUrl;
    let tempPass = shortid.generate();
    db.Parent.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      password: tempPass,
      phone: req.body.phone,
    })
      .then(parent => {
        console.log('created new parent', parent);
        try {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            type: 'SMTP',
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
              user: 'snacktimeemail@gmail.com',
              pass: process.env.EMAIL_PASSWORD,
            },
          });
          let mailOptions = {
            subject: `Snack Time | Password reset`,
            to: email,
            from: `Snack Time <snacktimeemail@gmail.com>`,
            html: `
              <h1>Hi, ${parent.name}</h1>
              <h2>Thank you for joining Snack Time!</h2>
              <h3>Your temporary password is ${tempPass}</h3>
              <h3>Please change your password under your settings the next time you log in.</h3>`,
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.json('Please check your email.');
            }
          });
        } catch {
          console.log('email failed');
        }
        db.Student.findOne({
          where: {
            id: req.params.studentId,
          },
        })
          .then(student => {
            parent.setStudents([student]);
            res.json(student);
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },

  getStudentParentInfo: function(req, res) {
    db.Student.findOne({
      where: {
        id: req.params.studentId,
      },
      include: [
        {
          model: db.Parent,
        },
      ],
    })
      .then(dbParent => {
        if (dbParent) {
          res.json(dbParent);
        } else {
          res.json('No parent found');
        }
      })
      .catch(err => res.status(422).json(err));
  },

  updateParent: function(req, res) {
    db.Parent.update(
      {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
      },
      {
        where: {
          id: req.params.parentId,
        },
      }
    )
      .then(dbParent => res.json(dbParent))
      .catch(err => res.status(422).json(err));
  },

  checkParentEmail: function(req, res) {
    db.Parent.findOne({
      where: {
        email: req.params.email,
      },
    })
      .then(dbParent => {
        if (dbParent) return res.json(dbParent);
        else return res.json('Parent does not exist in database');
      })
      .catch(err => res.status(422).json(err));
  },

  createStudentParentAssociation: function(req, res) {
    db.Parent.findOne({
      where: {
        id: req.body.parentId,
      },
    })
      .then(parent => {
        db.Student.findOne({
          where: {
            id: req.body.studentId,
          },
        }).then(student => {
          parent.setStudents([student]);
          res.json(student);
        });
      })
      .catch(err => res.status(422).json(err));
  },
  /************parents**************/

  /************pickups**************/

  savePickup: function(req, res) {
    db.Pickup.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      StudentId: req.params.studentId,
    })
      .then(dbPickup => res.json(dbPickup))
      .catch(err => res.status(422).json(err));
  },

  getStudentPickupInfo: function(req, res) {
    db.Pickup.findAll({
      where: {
        StudentId: req.params.studentId,
      },
    })
      .then(dbPickup => res.json(dbPickup))
      .catch(err => res.status(422).json(err));
  },

  updatePickup: function(req, res) {
    db.Pickup.update(
      {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
      },
      {
        where: {
          id: req.params.pickupId,
        },
      }
    )
      .then(dbPickup => res.json(dbPickup))
      .catch(err => res.status(422).json(err));
  },

  deletePickup: function(req, res) {
    db.Pickup.destroy({
      where: {
        id: req.params.pickupId,
      },
    });
  },
  /************pickups**************/

  /************report**************/
  getReport: function(req, res) {
    console.log("Req ",req.params)
    db.Student.findAll({
      include: [
        {model: db.Diapering, as: 'Diapering'}
      ],
      where: {
        StudentID: req.params.studentId,
        '$Diapering.date': req.params.date
      },
    })
      .then(dbStudent => {res.json(dbStudent)})
      .catch(err => res.status(422).json(err));
  },

  saveReport: function(req, res) {
    db.Report.create({
      StudentId: req.params.studentId,
      date: req.body.date,
      highlight: req.body.highlight,
      noteForParents: req.body.noteForParents,
    })
      .then(dbReport => res.json(dbReport))
      .catch(err => res.status(422).json(err));
  },

  updateReport: function(req, res) {
    db.Report.update(
      {
        highlight: req.body.highlight,
        noteForParents: req.body.noteForParents,
      },
      {
        where: {
          id: req.params.reportId,
        },
      }
    )
      .then(dbReport => res.json(dbReport))
      .catch(err => res.status(422).json(err));
  },
  /************report**************/

  /************diapering**************/
  getDiapering: function(req, res) {
    db.Diapering.findAll({
      where: {
        StudentId: req.params.studentId,
        date: req.params.date,
      },
    })
      .then(dbDiapering => res.json(dbDiapering))
      .catch(err => res.status(422).json(err));
  },

  saveDiapering: function(req, res) {
    db.Diapering.create({
      place: req.body.place,
      type: req.body.type,
      time: req.body.time,
      date: req.body.date,
      StudentId: req.params.studentId,
    })
      .then(dbDiapering => res.json(dbDiapering))
      .catch(err => res.status(422).json(err));
  },
  /************diapering**************/

  /************Nap**************/
  getNap: function(req, res) {
    db.Nap.findAll({
      where: {
        StudentId: req.params.studentId,
        date: req.params.date,
      },
    })
      .then(dbNap => res.json(dbNap))
      .catch(err => res.status(422).json(err));
  },

  saveNap: function(req, res) {
    console.log('NAP BODY', req.body);
    console.log('NAP BODY', req.params);
    db.Nap.create({
      startTime: req.body.napStart,
      endTime: req.body.napEnd,
      date: req.body.date,
      StudentId: req.params.studentId,
    })
      .then(dbNap => res.json(dbNap))
      .catch(err => res.status(422).json(err));
  },
  /************Nap**************/

  /************Meal**************/
  getMeal: function(req, res) {
    db.Meal.findAll({
      where: {
        StudentId: req.params.studentId,
        date: req.params.date,
      },
    })
      .then(dbMeal => res.json(dbMeal))
      .catch(err => res.status(422).json(err));
  },

  saveMeal: function(req, res) {
    db.Meal.create({
      time: req.body.time,
      type: req.body.type,
      food: req.body.food,
      date: req.body.date,
      StudentId: req.params.studentId,
    })
      .then(dbMeal => res.json(dbMeal))
      .catch(err => res.status(422).json(err));
  },
  /************Meal**************/

  /************Incident**************/
  getIncident: function(req, res) {
    db.Incident.findAll({
      where: {
        StudentId: req.params.studentId,
        date: req.params.date,
      },
    })
      .then(dbIncident => res.json(dbIncident))
      .catch(err => res.status(422).json(err));
  },

  saveIncident: function(req, res) {
    db.Incident.create({
      time: req.body.time,
      incident: req.body.incident,
      date: req.body.date,
      StudentId: req.params.studentId,
    })
      .then(dbIncident => res.json(dbIncident))
      .catch(err => res.status(422).json(err));
  },
  /************Incident**************/

  /************Medicine**************/
  getMedicine: function(req, res) {
    db.Medicine.findAll({
      where: {
        StudentId: req.params.studentId,
        date: req.params.date,
      },
    })
      .then(dbMedicine => res.json(dbMedicine))
      .catch(err => res.status(422).json(err));
  },

  saveMedicine: function(req, res) {
    db.Medicine.create({
      time: req.body.time,
      medName: req.body.medName,
      date: req.body.date,
      StudentId: req.params.studentId,
    })
      .then(dbMedicine => res.json(dbMedicine))
      .catch(err => res.status(422).json(err));
  },
  /************Medicine**************/

  /************invoice**************/

  createInvoice: function(req, res) {
    db.Invoice.create({
      StudentId: req.params.studentId,
      month: req.body.month,
      amount: req.body.amount,
    })
      .then(dbInvoice => res.json(dbInvoice))
      .catch(err => res.status(422).json(err));
  },

  updateInvoice: function(req, res) {
    db.Invoice.update(
      {
        month: req.body.month,
        amount: req.body.amount,
      },
      {
        where: {
          id: req.params.invoiceId,
        },
      }
    )
      .then(dbInvoice => res.json(dbInvoice))
      .catch(err => res.status(422).json(err));
  },
  /************invoice**************/

  /************fixedsnack**************/
  saveSnacks: function(req, res) {
    db.Snack.create({
      day: req.body.day,
      morningSnack: req.body.morningSnack,
      lunch: req.body.lunch,
      afternoonSnack: req.body.afternoonSnack,
      eveningSnack: req.body.eveningSnack,
    })
      .then(dbSnack => res.json(dbSnack))
      .catch(err => res.status(422).json(err));
  },

  updateSnacks: function(req, res) {
    db.Snack.update(
      {
        day: req.body.day,
        morningSnack: req.body.morningSnack,
        lunch: req.body.lunch,
        afternoonSnack: req.body.afternoonSnack,
        eveningSnack: req.body.eveningSnack,
      },
      {
        where: {
          id: req.params.snackId,
        },
      }
    )
      .then(dbSnack => res.json(dbSnack))
      .catch(err => res.status(422).json(err));
  },
  /************fixedsnack**************/
};
