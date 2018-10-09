module.exports = function(sequelize, DataTypes) {
    var Meal = sequelize.define('Meal', {
      time: {
        type: DataTypes.TIME,
      },
      food: {
        type: DataTypes.STRING,
      },
      quantity:{
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
    Meal.associate = function(models) {
      models.Meal.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return Meal;
  };