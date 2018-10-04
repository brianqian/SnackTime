const db = require('../models');

module.exports = {
  getAllStudents: function(req, res) {
    db.Student.findAll({})
      .then(dbStudents => res.json(dbStudents))
      .catch(err => res.status(422).json(err));
  },

  getAllParents: function(req, res) {
    db.Parent.findAll({})
      .then(dbParents => res.json(dbParents))
      .catch(err => res.status(422).json(err));
  },

  saveStudent: function(req, res) {
    db.Student.create({
      name: req.body.name,
      address: req.body.address,
      dob: req.body.dob,
      notes: req.body.notes,
      allergies: req.body.allergies,
      medication: req.body.medication,
      gender: req.body.gender,
      doctor: req.body.doctor,
    })
      .then(dbStudent => res.json(dbStudent))
      .catch(err => res.status(422).json(err));
  },

  saveParent: function(req, res) {
    db.Parent.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      StudentId: req.params.studentId,
    })
      .then(dbParent => res.json(dbParent))
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

  getReport: function(req, res) {
    db.Report.findAll({
      include: [db.Diapering],
      where: {
        StudentID: req.params.studentId,
        date: req.params.date,
      },
    })
      .then(dbReport => res.json(dbReport))
      .catch(err => res.status(422).json(err));
  },

  getStudentAllInfo: function(req,res){
    db.Student.find
  }

  
};
