module.exports = function(sequelize, DataTypes) {
  var Diapering = sequelize.define('Diapering', {
    time: {
      type: DataTypes.TIME,
    },
    place: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE,
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
