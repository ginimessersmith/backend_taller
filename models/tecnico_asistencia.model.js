const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/db_connection')
const { v4: uuid } = require('uuid')
const Persona = require('./persona.model')