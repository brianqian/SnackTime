module.exports = function(sequelize, DataTypes) {
    var Nap = sequelize.define('Nap', {
      startTime: {
        type: DataTypes.TIME,
        allowNull:false,
        validate: {
          notEmpty: true,
        },
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull:false,
        validate: {
          notEmpty: true,
        },
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
    Nap.associate = function(models) {
      models.Nap.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return Nap;
  };