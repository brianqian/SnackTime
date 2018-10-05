var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var Parent = sequelize.define(
    'Parent',
    {
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
      role: {
        type: DataTypes.STRING,
        defaultValue: 'parent',
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      // defaultScope: {
      //   attributes: { exclude: ['password'] },
      // },
      hooks: {
        beforeCreate: Parent => {
          const salt = bcrypt.genSaltSync();
          Parent.password = bcrypt.hashSync(Parent.password, salt);
        },
      },
    }
  );
  Parent.associate = function(models) {
    models.Parent.belongsTo(models.Student, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  Parent.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  return Parent;
};
