module.exports = function(sequelize, DataTypes) {
  var Invoice = sequelize.define('Invoice', {
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createDate: {
        type:DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
  });
  Invoice.associate = function(models) {
    models.Invoice.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Invoice;
};
