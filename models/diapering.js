module.exports = function(sequelize, DataTypes) {
  var Diapering = sequelize.define('Diapering', {
    time: {
      type: DataTypes.TIME,
      allowNull:false
    },
    place: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING,
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
  Diapering.associate = function(models) {
    models.Diapering.belongsTo(models.Student, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Diapering;
};
