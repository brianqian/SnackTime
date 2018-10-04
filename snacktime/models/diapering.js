module.exports = function(sequelize, DataTypes) {
    var Diapering = sequelize.define("Diapering", {
        date :{
            type: DataTypes.DATE,
            allowNull :false,
            validate : 
                    {
                        notEmpty:true
                    }
        },
        time: {
            type:DataTypes.TIME
        },
        place: {
            type:DataTypes.STRING,
            validate :
                    {
                        isIn: [['Toilet', 'Diaper']],
                    }
        },
        type : {
            type:DataTypes.STRING,
            validate :
                    {
                        isIn: [['BM', 'P', 'None']],
                    }
        }
    })
    Diapering.associate = function (models) {
        models.Diapering.belongsTo(models.Child, {
          foreignKey: {
            allowNull: false
          }
        });
    };
    return Diapering;
}