const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/db_connection')
const { v4: uuid } = require('uuid')
const Taller = require('./taller.model')



class Persona extends Model { }
Persona.init({
    uid: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:()=>uuid()
    },
    nombre: {
        type:DataTypes.STRING,
        allowNull:false
    },
    correo: {
        type:DataTypes.STRING,
        allowNull:false
    },
    password_user: {
        type:DataTypes.STRING,
        allowNull:false
    },
    telefono: {
        type:DataTypes.INTEGER,
        allowNull:true,
        
    },
    latitud: {
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    longitud: {
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    disponibilidad_tecnico: {
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    tipo_persona: {
        type:DataTypes.STRING,
        allowNull:false
        
    },
    uid_taller: {
        type:DataTypes.UUID,
        references:{
            model:Taller,
            key:'uid'
        }
    },
}, {
    sequelize,
    modelName: 'Persona',
    tableName: 'personas',
    timestamps: false
})


Persona.belongsTo(Taller,{foreignKey:'uid_taller'})

module.exports={Persona}

