const { DataTypes } = require('sequelize')

const sequelize = require('../utils/db-connection')

const users = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
    {
        tableName:"users",
        timestamps:false
    }
)

module.exports =users;