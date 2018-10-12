module.exports = function(sequelize, DataTypes) {
    var Medicine = sequelize.define('Medicine', {
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      medName: {
        type: DataTypes.STRING,
        allowNull: false,
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
    Medicine.associate = function(models) {
      models.Medicine.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return Medicine;
  };