module.exports = function(sequelize, DataTypes) {
  var Parent = sequelize.define('Parent', {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
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
  Parent.associate = function(models) {
    models.Parent.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Parent;
};
