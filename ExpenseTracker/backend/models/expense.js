const { DataTypes } = require('sequelize')

const sequelize = require('../utils/db-connection')

const expense = sequelize.define('expense',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
    {
        tableName:'expense',
        timestamps:false
    }
)

module.exports =  expense 