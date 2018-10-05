module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    notes: {
      type: DataTypes.TEXT,
    },
    dob: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    allergies: {
      type: DataTypes.STRING,
    },
    medication: {
      type: DataTypes.STRING,
    },
    doctor: {
      type: DataTypes.STRING,
    },
  });
  Student.associate = function(models) {
    models.Student.hasMany(models.Parent, {
      onDelete: 'cascade',
    });
    models.Student.hasMany(models.Pickup, {
      onDelete: 'cascade',
    });
    models.Student.hasMany(models.Invoice, {
      onDelete: 'cascade',
    });
    models.Student.hasMany(models.Report, {
      onDelete: 'cascade',
    });
    models.Student.belongsTo(models.Organization, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Student;
};
