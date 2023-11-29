const { DataTypes, Model, Sequelize } = require('sequelize')
const { sequelize } = require('../database/db_connection')
const { v4: uuid } = require('uuid')

class Servicio extends Model { }

Servicio.init({

    uid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuid()
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,

    }
}, {
    sequelize,
    modelName: 'Servicio',
    tableName: 'servicios',
    timestamps: false
})

module.exports = Servicio

