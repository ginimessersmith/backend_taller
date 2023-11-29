const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/dbConnection')

class Servicio_Solicitudes extends Model { }

Servicio_Solicitudes.init({
    uid_servicio: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    uid_solicitud_asistencia: {
        type: DataTypes.UUID,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'Servicio_Solicitudes',
    tableName: 'servicios_solicitudes'
    ,timestamps:false,
    primaryKey:['uid_servicio','uid_solicitud_asistencia']
})