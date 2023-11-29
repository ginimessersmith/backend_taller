const {DataTypes,Model} = require('sequelize')
const {sequelize}= require('../database/db_connection')
const {v4:uuid}=require('uuid')

class Taller extends Model{}

Taller.init({
    uid:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:()=>uuid()
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,   
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    correo:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    password_user:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:false, 
    },
    latitud:{
        type:DataTypes.DOUBLE,
        allowNull:true, 
    },
    longitud:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
},{sequelize,
    modelName:'Taller',
    tableName:'tallers',
    timestamps:false})

module.exports=Taller