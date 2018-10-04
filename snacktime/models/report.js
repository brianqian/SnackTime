module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define('Report', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    napStartTime: {
      type: DataTypes.TIME,
    },
    napEndTime: {
      type: DataTypes.TIME,
    },
    highlight: {
      type: DataTypes.TEXT,
    },
    noteForParents: {
      type: DataTypes.TEXT,
    },
    noteForStaff: {
      type: DataTypes.TEXT,
    },
    meal1Time: {
      type: DataTypes.TIME,
    },
    meal1Food: {
      type: DataTypes.TEXT,
    },
    meal2Time: {
      type: DataTypes.TIME,
    },
    meal2Food: {
      type: DataTypes.TEXT,
    },
    meal3Time: {
      type: DataTypes.TIME,
    },
    meal3Food: {
      type: DataTypes.TEXT,
    },
    meal4Time: {
      type: DataTypes.TIME,
    },
    meal4Food: {
      type: DataTypes.TEXT,
    },
    meal5Time: {
      type: DataTypes.TIME,
    },
    meal5Food: {
      type: DataTypes.TEXT,
    },
    meal6Time: {
      type: DataTypes.TIME,
    },
    meal6Food: {
      type: DataTypes.TEXT,
    },
    attendance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
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
  };
  return Report;
};
