var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var Staff = sequelize.define(
    "Staff",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "staff"
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      passResetKey: {
        type: DataTypes.STRING
      },
      passKeyExpires: {
        type: DataTypes.BIGINT
      }
    },
    {
      // defaultScope: {
      //   attributes: { exclude: ['password'] },
      // },
      hooks: {
        beforeCreate: async Staff => {
          const salt = await bcrypt.genSaltSync();
          Staff.password = await bcrypt.hashSync(Staff.password, salt);
        }
      }
    }
  );
  Staff.associate = function(models) {
    models.Staff.belongsTo(models.Organization, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Staff.prototype.validPassword = function(password) {
    console.log(password, this.password);
    return bcrypt.compareSync(password, this.password);
  };

  Staff.prototype.getHash = function(word) {
    const salt = bcrypt.genSaltSync();
    let newPassword = bcrypt.hashSync(word, salt);
    this.password = newPassword;
    this.save().then(() => {});
  };

  return Staff;
};
