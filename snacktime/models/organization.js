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
      validate: {
        len: 10,
      },
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    openTime: {
      type: DataTypes.TIME, //hh:mm:ss
      validate: {
        notEmpty: true,
      },
    },
    closeTime: {
      type: DataTypes.TIME, //hh:mm:ss
      validate: {
        notEmpty: true,
      },
    },
  });

  Organization.associate = function(models) {
    models.Organization.hasMany(models.Staff, {
      onDelete: 'cascade',
    });
    models.Organization.hasMany(models.Student, {
      onDelete: 'cascade',
    });
    models.Organization.hasMany(models.OrgSchedule, {
      onDelete: 'cascade',
    });
  };
  return Organization;
};
