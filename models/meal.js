module.exports = function(sequelize, DataTypes) {
    var Meal = sequelize.define('Meal', {
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      type:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      food: {
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
    Meal.associate = function(models) {
      models.Meal.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return Meal;
  };