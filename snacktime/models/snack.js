module.exports = function(sequelize, DataTypes) {
    var Snack = sequelize.define("Snack", {
        day :{
            type: DataTypes.STRING,
            allowNull :false
        },
        time :{
            type: DataTypes.TIME
        },
        snackType:{
            type: DataTypes.STRING
        },
        snackFood :{
            type: DataTypes.STRING
        }
    })
    return Snack;
}