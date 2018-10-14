module.exports = function(sequelize, DataTypes) {
    var OrgSchedule = sequelize.define('OrgSchedule', {
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      activityStartTime: {
        type: DataTypes.TIME,//hh:mm:ss
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      activityEndTime: {
        type: DataTypes.TIME,//hh:mm:ss
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      activityName: {
        type: DataTypes.STRING, 
        allowNull:false, 
        validate: {
          notEmpty: true,
        },
      },
      activityCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isClosed: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
      },
    });
  
    return OrgSchedule;
  };
  