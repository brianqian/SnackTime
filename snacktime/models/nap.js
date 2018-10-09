module.exports = function(sequelize, DataTypes) {
    var Nap = sequelize.define('Nap', {
      startTime: {
        type: DataTypes.TIME,
      },
      endTime: {
        type: DataTypes.TIME,
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