module.exports = function(sequelize, DataTypes) {
    var Snack = sequelize.define("Snack", {
        day :{
            type: DataTypes.STRING,
            allowNull :false
        },
        morningSnack :{
            type: DataTypes.STRING
        },
        lunch :{
            type: DataTypes.STRING
        },
        afternoonSnack :{
            type: DataTypes.STRING
        },
        eveningSnack :{
            type: DataTypes.STRING
        }
        
    })
    return Snack;
}