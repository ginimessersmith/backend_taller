const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/db_connection')
const { v4: uuid } = require('uuid')


class Tecnico_Solicitud extends Model { }

Tecnico_Solicitud.init({
    uid_tecnico: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    uid_solicitud_asistencia: {
        type: DataTypes.UUID,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'Tecnico_Solicitud',
    tableName: 'tecnico_asistencias',
    timestamps: false,
    primaryKey:['uid_tecnico','uid_solicitud_asistencia']
})

module.exports= Tecnico_Solicitud