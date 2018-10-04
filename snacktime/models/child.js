module.exports = function(sequelize, DataTypes) {
  var Child = sequelize.define('Child', {
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
      type: DataTypes.DATE, //YYYY-MM-DD
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    allergies : {
      type: DataTypes.STRING
    },
    medication: {
      type: DataTypes.STRING
    },
    doctor :{
      type: DataTypes.STRING
    }
  });
  Child.associate = function(models) {
    models.Child.hasMany(models.Parent, {
      onDelete: 'cascade',
    });
    models.Child.hasMany(models.Pickup, {
      onDelete: 'cascade',
    });
    models.Child.hasMany(models.Invoice, {
      onDelete: 'cascade',
    });
    models.Child.hasMany(models.Report, {
      onDelete: 'cascade',
    });
    models.Child.hasMany(models.Diapering, {
      onDelete: 'cascade',
    });
  };

  return Child;
};
