const db = require('../models');

module.exports = {

getStudentInfo : function(req,res){
    db.Student.findAll({
        include : [{
            model: db.ParentStudent,
            as :'Parents'
        }],
        where:
        {
            '$Parents.id$' :req.params.parentId
        }
    })
    .then(dbStudent => res.json(dbStudent))
    .catch(err => res.status(422).json(err));
},

updateStudentInfo: function(req,res){
    db.Student.update({
        name: req.body.name,
        address: req.body.address,
        dob: req.body.dob,
        notes: req.body.notes,
        allergies: req.body.allergies,
        medication: req.body.medication,
        doctor: req.body.doctor
      },{
        where:
        {
          id:req.params.studentId
        }
      })
        .then(dbStudent => res.json(dbStudent))
        .catch(err => res.status(422).json(err));
},

getSnacks: function(req,res){
    db.Snack.findAll({})
    .then(dbSnack => res.json(dbSnack))
    .catch(err => res.status(422).json(err));
},

getReport: function(req,res){
    db.Report.findOne({
      where:{
        StudentId: req.params.studentId,
        date: req.body.date
      }
    }).then(dbReport => {res.json(dbReport)})
    .catch(err => res.status(422).json(err));
  },

updateParentInfo: function(req,res){
    db.Parent.update({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone
    },{
        where:{
            id:req.params.parentId
        }
    })
    .then(dbParent => res.json(dbParent))
    .catch(err => res.status(422).json(err));

},

deletePickup: function(req,res){
    db.Pickup.destroy({
      where:{
        id:req.params.pickupId
      }
    })
    .then(dbPickup => res.json(dbPickup))
    .catch(err => res.status(422).json(err));
},

updatePickupInfo: function(req,res){
    db.Pickup.update({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone
    },{
        where:{
        id:req.params.pickupId
        }
    })
    .then(dbPickup => res.json(dbPickup))
    .catch(err => res.status(422).json(err));
},

getChildOrg: function(req,res){
    db.Organization.findOne({
        include : [{
            model: Student,
            as :'Student'
        }],
        where:
        {
            '$Student.id$' :req.params.studentId
        }
    })
    .then(dbPickup => res.json(dbPickup))
    .catch(err => res.status(422).json(err));
},

getOrgStaff: function(req,res){
    db.Staff.findAll({
        inlcude:[db.Organization],
        where:{
            OrganizationId: req.params.orgId
        }
    })
    .then(dbPickup => res.json(dbPickup))
    .catch(err => res.status(422).json(err));
},

saveReport: function(req, res) {
    db.Report.create({
      StudentId: req.params.studentId,
      date: req.body.date,
      noteForStaff: req.body.noteForStaff
    })
      .then(dbReport => res.json(dbReport))
      .catch(err => res.status(422).json(err));
  },

  updateReport: function(req, res) {
    db.Report.update(
      {
        noteForStaff: req.body.noteForStaff
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
};
