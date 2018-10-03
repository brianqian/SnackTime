var bcrypt = require('bcrypt');
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
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          Staff.password = bcrypt.hashSync(Staff.password, salt);
        },
      },
      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        },
      },
    }
  );
  Staff.associate = function (models) {
    models.Staff.belongsTo(models.Organization, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Staff;
};