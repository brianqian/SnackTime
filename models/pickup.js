module.exports = function(sequelize, DataTypes) {
  var Pickup = sequelize.define('Pickup', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        len: 10,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  Pickup.associate = function(models) {
    models.Pickup.belongsTo(models.Student, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Pickup;
};
