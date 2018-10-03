module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
    name: {
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
    openTime: {
      type: DataTypes.TIME, //hh:mm:ss
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    closeTime: {
      type: DataTypes.TIME, //hh:mm:ss
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Organization.associate = function(models) {
    models.Organization.hasMany(models.Staff, {
      onDelete: 'cascade',
    });
  };
  return Organization;
};
