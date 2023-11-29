const { DataTypes, Model,Sequelize } = require('sequelize')
const { sequelize } = require('../database/db_connection')
const { v4: uuid } = require('uuid')
const Persona = require('./persona.model')
const Taller = require('./taller.model')
const Vehiculo = require('./vehiculos.model')


class Solicitud_Asistencia extends Model { }

Solicitud_Asistencia.init({
    uid: {type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:()=>uuid()},
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue:Sequelize.fn('now')
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue:Sequelize.fn('now')
    },
    latitud: {
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    longitud: {
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    estado: {
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    uid_taller: {
        type:DataTypes.UUID,
        references:{
            model:Taller,
            key:'uid'
        }
    },
    uid_cliente: {
        type:DataTypes.UUID,
        references:{
            model:Persona,
            key:'uid'
        }
    },
    uid_vehiculo: {
        type:DataTypes.UUID,
        references:{
            model:Vehiculo,
            key:'uid'
        }
    },
}, {
    sequelize,
    modelName: 'Solicitud_Asistencia',
    tableName: 'solicitad_asistencias',
    timestamps:false
})

Solicitud_Asistencia.belongsTo(Taller,{foreignKey:'uid_taller'})
Solicitud_Asistencia.belongsTo(Persona,{foreignKey:'uid_cliente'})
Solicitud_Asistencia.belongsTo(Vehiculo,{foreignKey:'uid_vehiculo'})

module.exports=Solicitud_Asistencia
