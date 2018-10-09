module.exports = function(sequelize, DataTypes) {
    var Meal = sequelize.define('Meal', {
      time: {
        type: DataTypes.TIME,
      },
      type:{
        type: DataTypes.STRING,
      },
      food: {
        type: DataTypes.STRING,
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