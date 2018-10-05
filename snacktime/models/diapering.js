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
  });
  Diapering.associate = function(models) {
    models.Diapering.belongsTo(models.Report, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Diapering;
};
