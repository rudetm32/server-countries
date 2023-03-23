const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    
    sequelize.define('activity', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre : {
            type: DataTypes.STRING,
            allowNull: false
        },
        dificultad : {
            type: DataTypes.INTEGER,
            allowNull: false,        
        },
        duracion : {
            type: DataTypes.TIME,      
        },
        temporada : {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        timestamps:false,
    })
};

