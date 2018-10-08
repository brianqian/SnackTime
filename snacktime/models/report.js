module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define('Report', {
    date: {
      type: DataTypes.DATE,
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
      }),
      models.Report.hasMany(models.Diapering, {
        onDelete: 'cascade',
      });
      models.Report.hasMany(models.Nap, {
        onDelete: 'cascade',
      });
      models.Report.hasMany(models.Meal, {
        onDelete: 'cascade',
      });
      models.Report.hasMany(models.Activity, {
        onDelete: 'cascade',
      });
  };
  return Report;
};
