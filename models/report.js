module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define('Report', {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    highlight: {
      type: DataTypes.TEXT,
    },
    noteForParents: {
      type: DataTypes.TEXT,
    },
    noteForStaff: {
      type: DataTypes.TEXT,
    }
  });
  Report.associate = function(models) {
      models.Report.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
        },
      });
  };
  return Report;
};
