var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var Staff = sequelize.define(
    'Staff',
    {
      email: {
        type: DataTypes.STRING,
        isUnique: true,
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
      role: {
        type: DataTypes.STRING,
        defaultValue: "staff",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      hooks: {
        beforeCreate: Staff => {
          const salt = bcrypt.genSaltSync();
          Staff.password = bcrypt.hashSync(Staff.password, salt);
        },
      },
    }
  );
  Staff.associate = function(models) {
    models.Staff.belongsTo(models.Organization, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  Staff.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  return Staff;
};
