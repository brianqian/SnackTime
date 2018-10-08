module.exports = function(sequelize, DataTypes) {
  var ParentStudent = sequelize.define("ParentStudent", {
    
  });

  ParentStudent.associate = function (models) {
    models.Parent.belongsToMany(models.Student, { through: ParentStudent });
    models.Student.belongsToMany(models.Parent, { through: ParentStudent });
  }

  return ParentStudent;
};
