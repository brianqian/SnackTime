module.exports = function(sequelize, DataTypes) {
    var Incident = sequelize.define('Incident', {
      time: {
        type: DataTypes.TIME,
      },
      incident: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
    Incident.associate = function(models) {
      models.Incident.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return Incident;
  };