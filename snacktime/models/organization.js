module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.BIGINT,
      defaultValue:0000000000

      // validate: {
      //   len: 10,
      // },
    },
    address: {
      type: DataTypes.STRING,
      defaultValue:""

      // validate: {
      //   notEmpty: true,
      // },
    },
    openTime: {
      type: DataTypes.TIME, //hh:mm:ss
      defaultValue:"00:00:00"
      // validate: {
      //   notEmpty: true,
      // },
    },
    closeTime: {
      type: DataTypes.TIME, //hh:mm:ss
      defaultValue:"00:00:00"
      // validate: {
      //   notEmpty: true,
      // },
    },
  });

  Organization.associate = function(models) {
    models.Organization.hasMany(models.Staff, {
      onDelete: 'cascade',
    });
    models.Organization.hasMany(models.Student, {
      onDelete: 'cascade',
    });
  };
  return Organization;
};
