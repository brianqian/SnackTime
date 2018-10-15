module.exports = function(sequelize, DataTypes) {
  var Invoice = sequelize.define('Invoice', {
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  });
  Invoice.associate = function(models) {
    models.Invoice.belongsTo(models.Student, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Invoice;
};
