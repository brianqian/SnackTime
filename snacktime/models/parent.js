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
      address: {
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
