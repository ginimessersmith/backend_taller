const { DataTypes, Model,Sequelize } = require('sequelize')
const { sequelize } = require('../database/db_connection')
const { v4: uuid } = require('uuid')
const Solicitud_Asistencia = require('./solicitad_asistencia.model')

class Servicio_img extends Model{}

Servicio_img.init({
	uid:{type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:()=>uuid()}, 
	img_url:{
        type:DataTypes.STRING,
        allowNull:true
    }, 
	uid_solicitud_asistencia:{
        type:DataTypes.UUID,
        references:{
            model:Solicitud_Asistencia,
            key:'uid'
        }
    }, 
},{
    sequelize,
    modelName:'Servicio_img',
    tableName:'servicio_imgs',
    timestamps:false
})

module.exports=Servicio_img

