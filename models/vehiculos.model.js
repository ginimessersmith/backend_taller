const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/db_connection')
const { v4: uuid } = require('uuid')
const Persona = require('./persona.model')


class Vehiculo extends Model{}

Vehiculo.init({
    uid:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:()=>uuid()
    },
	marca:{
        type:DataTypes.STRING,
        allowNull:true
    },
	modelo:{
        type:DataTypes.STRING,
        allowNull:true
    },
	placa:{
        type:DataTypes.STRING,
        allowNull:true
    },
	year_vehiculo:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0
    },
	img_url:{
        type:DataTypes.STRING,
        allowNull:false
    },
	uid_cliente:{
        type:DataTypes.UUID,
        references:{
            model:Persona,
            key:'uid'
        }
    },
},{
    sequelize,
    modelName: 'Vehiculo',
    tableName: 'vehiculos',
    timestamps: false
})

Vehiculo.belongsTo(Persona,{foreignKey:'uid_cliente'})

module.exports=Vehiculo
